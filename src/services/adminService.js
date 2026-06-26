import { supabase } from '../lib/supabaseClient'

export const adminService = {
    /**
     * Fetch comprehensive dashboard statistics via RPC
     */
    async getDashboardStats() {
        const { data, error } = await supabase.rpc('get_admin_dashboard_stats')
        if (error) {
            console.error('Error fetching admin dashboard stats:', error)
            throw error
        }
        return data
    },

    /**
     * Fetch paginated grievances with filters
     */
    async getGrievances({ status, priority, category, search, page = 1, pageSize = 20 } = {}) {
        let query = supabase
            .from('grievances')
            .select('*, complaint_categories(name_en, name_ta)', { count: 'exact' })

        if (status) query = query.eq('status', status)
        if (priority) query = query.eq('priority', priority)
        if (category) query = query.eq('category_id', category)
        if (search) {
            query = query.or(`name.ilike.%${search}%,reference_id.ilike.%${search}%,title.ilike.%${search}%,area.ilike.%${search}%`)
        }

        const from = (page - 1) * pageSize
        const to = from + pageSize - 1

        query = query.order('created_at', { ascending: false }).range(from, to)

        const { data, error, count } = await query
        if (error) {
            console.error('Error fetching grievances:', error)
            throw error
        }
        return { data, count, page, pageSize, totalPages: Math.ceil((count || 0) / pageSize) }
    },

    /**
     * Update grievance status
     */
    async updateGrievanceStatus(id, status) {
        const updates = { status }
        if (status === 'resolved') {
            updates.resolved_at = new Date().toISOString()
        }
        const { data, error } = await supabase
            .from('grievances')
            .update(updates)
            .eq('id', id)
            .select()
            .single()
        if (error) {
            console.error('Error updating grievance status:', error)
            throw error
        }
        return data
    },

    /**
     * Update grievance priority
     */
    async updateGrievancePriority(id, priority) {
        const { data, error } = await supabase
            .from('grievances')
            .update({ priority })
            .eq('id', id)
            .select()
            .single()
        if (error) {
            console.error('Error updating grievance priority:', error)
            throw error
        }
        return data
    },

    /**
     * Fetch paginated memberships with filters
     */
    async getMemberships({ status, district, search, page = 1, pageSize = 20 } = {}) {
        let query = supabase
            .from('memberships')
            .select('*', { count: 'exact' })

        if (status) query = query.eq('status', status)
        if (district) query = query.eq('district', district)
        if (search) {
            query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%,voter_id.ilike.%${search}%`)
        }

        const from = (page - 1) * pageSize
        const to = from + pageSize - 1

        query = query.order('created_at', { ascending: false }).range(from, to)

        const { data, error, count } = await query
        if (error) {
            console.error('Error fetching memberships:', error)
            throw error
        }
        return { data, count, page, pageSize, totalPages: Math.ceil((count || 0) / pageSize) }
    },

    /**
     * Update membership status (approve/reject)
     */
    async updateMembershipStatus(id, status) {
        const { data, error } = await supabase
            .from('memberships')
            .update({ status })
            .eq('id', id)
            .select()
            .single()
        if (error) {
            console.error('Error updating membership status:', error)
            throw error
        }
        return data
    },

    /**
     * Fetch paginated contact messages with filters
     */
    async getMessages({ isRead, search, page = 1, pageSize = 20 } = {}) {
        let query = supabase
            .from('contact_messages')
            .select('*', { count: 'exact' })

        if (isRead !== undefined && isRead !== null && isRead !== '') {
            query = query.eq('is_read', isRead === 'true' || isRead === true)
        }
        if (search) {
            query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,message.ilike.%${search}%`)
        }

        const from = (page - 1) * pageSize
        const to = from + pageSize - 1

        query = query.order('created_at', { ascending: false }).range(from, to)

        const { data, error, count } = await query
        if (error) {
            console.error('Error fetching messages:', error)
            throw error
        }
        return { data, count, page, pageSize, totalPages: Math.ceil((count || 0) / pageSize) }
    },

    /**
     * Toggle message read status
     */
    async markMessageRead(id, isRead) {
        const { data, error } = await supabase
            .from('contact_messages')
            .update({ is_read: isRead })
            .eq('id', id)
            .select()
            .single()
        if (error) {
            console.error('Error updating message read status:', error)
            throw error
        }
        return data
    },

    /**
     * Fetch paginated notification logs with filters
     */
    async getNotificationLogs({ status, search, page = 1, pageSize = 20 } = {}) {
        let query = supabase
            .from('notification_logs')
            .select('*', { count: 'exact' })

        if (status) query = query.eq('status', status)
        if (search) {
            query = query.or(`reference_id.ilike.%${search}%,recipient.ilike.%${search}%`)
        }

        const from = (page - 1) * pageSize
        const to = from + pageSize - 1

        query = query.order('created_at', { ascending: false }).range(from, to)

        const { data, error, count } = await query
        if (error) {
            console.error('Error fetching notification logs:', error)
            throw error
        }
        return { data, count, page, pageSize, totalPages: Math.ceil((count || 0) / pageSize) }
    },

    /**
     * Fetch recent activity across all tables
     */
    async getRecentActivity(limit = 10) {
        // Fetch recent items from each table in parallel
        const [grievances, memberships, messages] = await Promise.all([
            supabase
                .from('grievances')
                .select('id, reference_id, name, status, created_at')
                .order('created_at', { ascending: false })
                .limit(limit),
            supabase
                .from('memberships')
                .select('id, name, status, created_at')
                .order('created_at', { ascending: false })
                .limit(limit),
            supabase
                .from('contact_messages')
                .select('id, name, is_read, created_at')
                .order('created_at', { ascending: false })
                .limit(limit)
        ])

        // Merge and sort by created_at
        const activities = [
            ...(grievances.data || []).map(g => ({
                type: 'grievance',
                id: g.id,
                title: `Grievance ${g.reference_id || ''}`,
                name: g.name,
                status: g.status,
                created_at: g.created_at
            })),
            ...(memberships.data || []).map(m => ({
                type: 'membership',
                id: m.id,
                title: 'Membership Application',
                name: m.name,
                status: m.status,
                created_at: m.created_at
            })),
            ...(messages.data || []).map(c => ({
                type: 'message',
                id: c.id,
                title: 'Contact Message',
                name: c.name,
                status: c.is_read ? 'read' : 'unread',
                created_at: c.created_at
            }))
        ]

        activities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        return activities.slice(0, limit)
    },

    /**
     * Fetch all complaint categories (for filter dropdowns)
     */
    async getCategories() {
        const { data, error } = await supabase
            .from('complaint_categories')
            .select('id, name_en, name_ta')
            .order('sort_order', { ascending: true })
        if (error) {
            console.error('Error fetching categories:', error)
            throw error
        }
        return data
    }
}
