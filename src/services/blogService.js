import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const STORAGE_KEY = 'tvk_blogs'

// Local storage fallback helpers
const loadLocalBlogs = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

const saveLocalBlogs = (blogs) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs))
    } catch (e) {
        console.error('Error saving local blogs:', e)
    }
}

// Convert base64 Data URL to a Blob
const base64ToBlob = (base64Data, contentType = '') => {
    const sliceSize = 1024
    const byteCharacters = atob(base64Data.split(',')[1])
    const byteArrays = []
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)
        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
    }
    return new Blob(byteArrays, { type: contentType })
}

// Upload a single base64 image (cover or event photo) to Supabase Storage
const uploadBase64Image = async (base64Str, pathPrefix = 'blogs') => {
    if (!base64Str || !base64Str.startsWith('data:')) {
        return base64Str // Already a URL or empty
    }
    try {
        const match = base64Str.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/)
        if (!match) return base64Str
        const contentType = match[1]
        const blob = base64ToBlob(base64Str, contentType)
        const fileExt = contentType.split('/')[1] || 'png'
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`
        const path = `${pathPrefix}/${fileName}`

        const { data, error } = await supabase.storage
            .from('evidence-media')
            .upload(path, blob, {
                contentType,
                cacheControl: '3600',
                upsert: false
            })

        if (error) throw error

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('evidence-media')
            .getPublicUrl(path)

        return publicUrl
    } catch (err) {
        console.error('Error uploading image to storage:', err)
        return base64Str // Return base64 as fallback if upload fails
    }
}

export const blogService = {
    async getBlogs() {
        if (!isSupabaseConfigured) {
            return loadLocalBlogs()
        }
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            // Map created_at to createdAt for frontend compatibility
            return data.map(b => ({
                ...b,
                createdAt: b.created_at
            }))
        } catch (err) {
            console.error('Error getting blogs from Supabase, falling back to local storage:', err)
            return loadLocalBlogs()
        }
    },

    async getBlogById(id) {
        if (!isSupabaseConfigured) {
            const local = loadLocalBlogs()
            return local.find(b => b.id === id) || null
        }
        try {
            // Check if it's a valid UUID
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
            if (!uuidRegex.test(id)) {
                // If it's not a UUID, check local blogs first as fallback
                const local = loadLocalBlogs()
                const found = local.find(b => b.id === id)
                if (found) return found
                return null
            }

            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            return {
                ...data,
                createdAt: data.created_at
            }
        } catch (err) {
            console.error(`Error getting blog by id ${id} from Supabase, falling back:`, err)
            const local = loadLocalBlogs()
            return local.find(b => b.id === id) || null
        }
    },

    async createBlog(blogData) {
        // Upload images if there are any
        let coverUrl = blogData.image || null
        if (coverUrl && coverUrl.startsWith('data:')) {
            coverUrl = await uploadBase64Image(coverUrl, 'blogs/covers')
        }

        let eventPhotosUrls = []
        if (blogData.images && Array.isArray(blogData.images)) {
            for (const img of blogData.images) {
                if (img && img.startsWith('data:')) {
                    const uploadedUrl = await uploadBase64Image(img, 'blogs/events')
                    eventPhotosUrls.push(uploadedUrl)
                } else {
                    eventPhotosUrls.push(img)
                }
            }
        }

        const newPost = {
            title: blogData.title,
            content: blogData.content,
            category: blogData.category,
            author: blogData.author,
            image: coverUrl,
            images: eventPhotosUrls,
            created_at: blogData.createdAt || new Date().toISOString()
        }

        if (!isSupabaseConfigured) {
            const local = loadLocalBlogs()
            const localPost = {
                ...newPost,
                id: Date.now().toString(),
                createdAt: newPost.created_at
            }
            const updated = [localPost, ...local]
            saveLocalBlogs(updated)
            return localPost
        }

        try {
            const { data, error } = await supabase
                .from('blogs')
                .insert(newPost)
                .select()
                .single()

            if (error) throw error
            return {
                ...data,
                createdAt: data.created_at
            }
        } catch (err) {
            console.error('Error inserting blog to Supabase, falling back:', err)
            const local = loadLocalBlogs()
            const localPost = {
                ...newPost,
                id: Date.now().toString(),
                createdAt: newPost.created_at
            }
            const updated = [localPost, ...local]
            saveLocalBlogs(updated)
            return localPost
        }
    },

    async deleteBlog(id) {
        if (!isSupabaseConfigured) {
            const local = loadLocalBlogs()
            const updated = local.filter(b => b.id !== id)
            saveLocalBlogs(updated)
            return true
        }

        try {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
            if (!uuidRegex.test(id)) {
                const local = loadLocalBlogs()
                const updated = local.filter(b => b.id !== id)
                saveLocalBlogs(updated)
                return true
            }

            const { error } = await supabase
                .from('blogs')
                .delete()
                .eq('id', id)

            if (error) throw error
            return true
        } catch (err) {
            console.error(`Error deleting blog ${id} from Supabase, falling back:`, err)
            const local = loadLocalBlogs()
            const updated = local.filter(b => b.id !== id)
            saveLocalBlogs(updated)
            return true
        }
    }
}
