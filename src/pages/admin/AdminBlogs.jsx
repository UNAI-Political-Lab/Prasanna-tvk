import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus, Search, BookOpen, PenTool, ArrowUpRight, Calendar, User, Trash2
} from 'lucide-react'
import {
    BlogCard,
    BlogDetailModal,
    CreateBlogForm,
    EmptyState
} from '../Blogs'
import { blogService } from '../../services/blogService'
import { useLanguage } from '../../context/LanguageContext'

const AdminBlogs = () => {
    const { language } = useLanguage()
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingBlog, setEditingBlog] = useState(null)
    const [selectedBlog, setSelectedBlog] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    const fetchBlogs = useCallback(async () => {
        setLoading(true)
        try {
            const data = await blogService.getBlogs()
            setBlogs(data)
        } catch (err) {
            console.error('Failed to fetch admin blogs:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchBlogs()
    }, [fetchBlogs])

    const filteredBlogs = blogs.filter(blog => {
        if (!searchQuery.trim()) return true
        const q = searchQuery.toLowerCase()
        return (
            blog.title.toLowerCase().includes(q) ||
            blog.content.toLowerCase().includes(q) ||
            (blog.category && blog.category.toLowerCase().includes(q))
        )
    })

    const handleCreate = async (newBlogData) => {
        setActionLoading(true)
        try {
            const created = await blogService.createBlog(newBlogData)
            setBlogs(prev => [created, ...prev])
            setShowCreateForm(false)
        } catch (err) {
            console.error('Failed to create blog:', err)
            alert(language === 'en' ? 'Failed to create blog post.' : 'வலைப்பதிவை உருவாக்க முடியவில்லை.')
        } finally {
            setActionLoading(false)
        }
    }

    const handleEdit = async (updatedBlogData) => {
        setActionLoading(true)
        try {
            const updated = await blogService.updateBlog(updatedBlogData.id, updatedBlogData)
            setBlogs(prev => prev.map(b => b.id === updated.id ? updated : b))
            setEditingBlog(null)
        } catch (err) {
            console.error('Failed to edit blog:', err)
            alert(language === 'en' ? 'Failed to update blog post.' : 'வலைப்பதிவை புதுப்பிக்க முடியவில்லை.')
        } finally {
            setActionLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm(language === 'en' ? 'Delete this blog post?' : 'இந்த வலைப்பதிவை நீக்கவா?')) return
        setActionLoading(true)
        try {
            await blogService.deleteBlog(id)
            setBlogs(prev => prev.filter(b => b.id !== id))
        } catch (err) {
            console.error('Failed to delete blog:', err)
            alert(language === 'en' ? 'Failed to delete blog post.' : 'வலைப்பதிவை நீக்க முடியவில்லை.')
        } finally {
            setActionLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-slate-900 font-black uppercase tracking-wider text-sm">Blog Management</h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">
                        Create, publish, and delete official TVK blog posts
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="flex items-center justify-center gap-2 bg-tvk-red hover:bg-[#7D0704] text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-tvk-red/20 transition-all duration-200"
                >
                    <Plus className="w-4 h-4" />
                    New Blog Post
                </button>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-tvk-red/10 rounded-xl flex items-center justify-center text-tvk-red">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Active
                        </span>
                    </div>
                    <div className="mt-3">
                        <p className="text-2xl font-black text-slate-900">{blogs.length}</p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">Total Published Posts</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                            Today
                        </span>
                    </div>
                    <div className="mt-3">
                        <p className="text-2xl font-black text-slate-900">
                            {blogs.filter(b => {
                                const d = new Date(b.createdAt)
                                const today = new Date()
                                return d.toDateString() === today.toDateString()
                            }).length}
                        </p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">Posts Added Today</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                            <User className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                            Author
                        </span>
                    </div>
                    <div className="mt-3">
                        <p className="text-xl font-black text-slate-900 truncate font-heading">S. Prasanna</p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">Default Author</p>
                    </div>
                </div>
            </div>

            {/* Filter / Search Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search posts by title, content, or category..."
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red transition-all font-semibold"
                    />
                </div>
            </div>

            {/* Blogs List */}
            <div>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm animate-pulse flex flex-col h-full min-h-[300px]">
                                <div className="aspect-[16/10] bg-slate-200" />
                                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                                    <div className="space-y-3">
                                        <div className="h-3 bg-slate-200 rounded w-1/3" />
                                        <div className="h-5 bg-slate-200 rounded w-3/4" />
                                        <div className="space-y-2">
                                            <div className="h-3 bg-slate-200 rounded w-full" />
                                            <div className="h-3 bg-slate-200 rounded w-5/6" />
                                        </div>
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded w-1/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    searchQuery ? (
                        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 text-sm font-semibold">
                                No blog posts matched your search filters.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                            <EmptyState language={language} onCreate={() => setShowCreateForm(true)} />
                        </div>
                    )
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBlogs.map(blog => (
                            <BlogCard
                                key={blog.id}
                                blog={blog}
                                language={language}
                                onView={setSelectedBlog}
                                onDelete={handleDelete}
                                onEdit={setEditingBlog}
                                isAdminView={true}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showCreateForm && (
                    <CreateBlogForm
                        language={language}
                        onSubmit={handleCreate}
                        onCancel={() => setShowCreateForm(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {editingBlog && (
                    <CreateBlogForm
                        blog={editingBlog}
                        language={language}
                        onSubmit={handleEdit}
                        onCancel={() => setEditingBlog(null)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedBlog && (
                    <BlogDetailModal
                        blog={selectedBlog}
                        language={language}
                        onClose={() => setSelectedBlog(null)}
                    />
                )}
            </AnimatePresence>

            {/* Action Loading Overlay */}
            {actionLoading && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center gap-3 border border-slate-100 max-w-xs text-center">
                        <div className="w-10 h-10 border-4 border-tvk-red border-t-transparent rounded-full animate-spin" />
                        <p className="text-slate-800 text-sm font-black uppercase tracking-wider">Processing Request...</p>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Uploading images and updating database</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminBlogs
