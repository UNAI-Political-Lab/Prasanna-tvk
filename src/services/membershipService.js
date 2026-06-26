import { supabase } from '../lib/supabaseClient'

export const membershipService = {
    /**
     * Submit membership application
     */
    async submitMembership(formData) {
        const { data, error } = await supabase
            .from('memberships')
            .insert({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                age: parseInt(formData.age, 10),
                district: formData.district,
                taluk: formData.taluk,
                ward: formData.ward,
                voter_id: formData.voterId,
                qualification: formData.qualification,
                message: formData.message,
                status: 'pending'
            })

        if (error) {
            console.error('Error submitting membership application:', error)
            throw error
        }
        return data
    }
}
