import { supabase } from '../lib/supabaseClient'

export const grievanceService = {
    /**
     * Fetch all active categories from Supabase
     */
    async getCategories() {
        const { data, error } = await supabase
            .from('complaint_categories')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (error) {
            console.error('Error fetching categories:', error)
            throw error
        }
        return data
    },

    /**
     * Submit a grievance, upload files to Supabase Storage, and trigger WhatsApp notification
     */
    async submitGrievance(formData, files = []) {
        // 1. Insert grievance record to generate ID
        const { data: grievance, error: insertError } = await supabase
            .from('grievances')
            .insert({
                name: formData.name,
                phone: formData.phone,
                email: formData.email || null,
                area: formData.area,
                category_id: formData.category_id || null,
                title: formData.title,
                description: formData.description,
                status: 'pending',
                priority: 'medium',
                attachments: []
            })
            .select()
            .single()

        if (insertError) {
            console.error('Error inserting grievance:', insertError)
            throw insertError
        }

        const grievanceId = grievance.id
        const attachmentUrls = []

        // 2. Upload files if any
        if (files.length > 0) {
            for (const file of files) {
                // Generate a unique path: grievances/{grievance_uuid}/{timestamp}_{filename}
                const fileExt = file.name.split('.').pop()
                const fileName = file.name.split('.').slice(0, -1).join('.')
                const cleanFileName = fileName.replace(/[^a-zA-Z0-9]/g, '_')
                const path = `grievances/${grievanceId}/${Date.now()}_${cleanFileName}.${fileExt}`

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('evidence-media')
                    .upload(path, file, {
                        cacheControl: '3600',
                        upsert: false
                    })

                if (uploadError) {
                    console.error(`Error uploading file ${file.name}:`, uploadError)
                    // Continue uploading other files even if one fails
                    continue
                }

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('evidence-media')
                    .getPublicUrl(path)

                attachmentUrls.push({
                    name: file.name,
                    path: path,
                    url: publicUrl
                })
            }

            // 3. Update grievance with attachments list if we successfully uploaded files
            if (attachmentUrls.length > 0) {
                const { error: updateError } = await supabase
                    .from('grievances')
                    .update({ attachments: attachmentUrls })
                    .eq('id', grievanceId)

                if (updateError) {
                    console.error('Error updating attachments:', updateError)
                } else {
                    grievance.attachments = attachmentUrls
                }
            }
        }

        // 4. Fetch the final record to make sure we have reference_id
        const { data: finalGrievance, error: fetchError } = await supabase
            .from('grievances')
            .select('*, complaint_categories(name_en, name_ta)')
            .eq('id', grievanceId)
            .single()

        const grievanceToNotify = fetchError ? grievance : finalGrievance

        // 5. Trigger Twilio Edge Function notification asynchronously (don't block the user)
        try {
            const categoryName = grievanceToNotify.complaint_categories
                ? `${grievanceToNotify.complaint_categories.name_en} / ${grievanceToNotify.complaint_categories.name_ta}`
                : formData.title

            supabase.functions.invoke('send-whatsapp-notification', {
                body: {
                    id: grievanceToNotify.id,
                    reference_id: grievanceToNotify.reference_id,
                    name: grievanceToNotify.name,
                    phone: grievanceToNotify.phone,
                    area: grievanceToNotify.area,
                    category: categoryName,
                    title: grievanceToNotify.title,
                    description: grievanceToNotify.description
                }
            }).then(({ data, error }) => {
                if (error) {
                    console.error('WhatsApp Edge Function error:', error)
                } else {
                    console.log('WhatsApp notification response:', data)
                    // Optionally update notification status in DB
                    supabase
                        .from('grievances')
                        .update({ whatsapp_notified: true })
                        .eq('id', grievanceId)
                        .then(() => {})
                }
            })
        } catch (funcErr) {
            console.error('Failed to trigger WhatsApp edge function:', funcErr)
        }

        return grievanceToNotify
    },

    /**
     * Track a grievance by its reference ID
     */
    async trackGrievance(referenceId) {
        const { data, error } = await supabase
            .from('grievances')
            .select('*, complaint_categories(name_en, name_ta)')
            .eq('reference_id', referenceId.trim().toUpperCase())
            .single()

        if (error) {
            console.error('Error tracking grievance:', error)
            throw error
        }
        return data
    },

    /**
     * Get live grievance statistics via Postgres function RPC
     */
    async getGrievanceStats() {
        const { data, error } = await supabase.rpc('get_grievance_stats')

        if (error) {
            console.error('Error fetching grievance stats:', error)
            throw error
        }

        // Return first row of query result
        if (data && data.length > 0) {
            return data[0]
        }
        
        // Fallback default statistics
        return {
            total_complaints: 0,
            resolved_complaints: 0,
            pending_complaints: 0,
            today_complaints: 0,
            avg_resolution_days: 2.4
        }
    }
}
