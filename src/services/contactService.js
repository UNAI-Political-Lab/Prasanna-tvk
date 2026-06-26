import { supabase } from '../lib/supabaseClient'

export const contactService = {
    /**
     * Submit a contact message
     */
    async submitContactMessage(formData) {
        const { data, error } = await supabase
            .from('contact_messages')
            .insert({
                name: formData.from_name,
                phone: formData.phone,
                email: formData.from_email || null,
                message: formData.message,
                is_read: false
            })

        if (error) {
            console.error('Error submitting contact message:', error)
            throw error
        }
        return data
    }
}
