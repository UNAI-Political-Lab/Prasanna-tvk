import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const PetitionForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        area: '',
        title: '',
        description: ''
    })

    // REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_XXXXXXXXXXXX/exec'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Apps Script requires no-cors for simple submissions or specific handling
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            // Since we're using no-cors, we won't get a proper response body, 
            // but the submission should still reach the script.
            setIsSubmitted(true)
        } catch (err) {
            console.error('Submission error:', err)
            setError('There was an error submitting your petition. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    return (
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="name" className="text-sm font-black text-tvk-dark uppercase tracking-widest">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="phone" className="text-sm font-black text-tvk-dark uppercase tracking-widest">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your contact number"
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="email" className="text-sm font-black text-tvk-dark uppercase tracking-widest">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="area" className="text-sm font-black text-tvk-dark uppercase tracking-widest">Area / Locality</label>
                                <input
                                    required
                                    type="text"
                                    id="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    placeholder="Which area are you from?"
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="title" className="text-sm font-black text-tvk-dark uppercase tracking-widest">Petition Title</label>
                            <input
                                required
                                type="text"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Brief title for your petition"
                                className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                            />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="description" className="text-sm font-black text-tvk-dark uppercase tracking-widest">Petition Description</label>
                            <textarea
                                required
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="6"
                                placeholder="Describe your concern or demand in detail..."
                                className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm resize-none"
                            ></textarea>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full ${isLoading ? 'bg-tvk-dark/20' : 'bg-tvk-red'} text-white font-black py-5 text-lg rounded-2xl shadow-[0_10px_30px_rgba(145,9,5,0.2)] hover:shadow-[0_15px_40px_rgba(145,9,5,0.3)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest disabled:cursor-not-allowed`}
                        >
                            {isLoading ? 'Submitting...' : 'Submit Petition'} <Send size={20} className={isLoading ? 'animate-pulse' : ''} />
                        </motion.button>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 font-bold text-sm"
                                >
                                    <AlertCircle size={20} />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <p className="text-center text-xs text-tvk-dark/40 mt-6 font-bold uppercase tracking-wider">
                            By submitting, you agree to being contacted by our office regarding this petition.
                        </p>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 flex flex-col items-center text-center"
                    >
                        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8">
                            <CheckCircle size={48} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Petition Submitted Successfully!</h2>
                        <p className="text-tvk-dark/60 max-w-md mx-auto mb-10 text-lg">
                            Thank you for raising your voice. We have received your petition and will review it shortly. You'll receive a confirmation email soon.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-tvk-red font-bold hover:underline"
                        >
                            Submit another petition
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PetitionForm
