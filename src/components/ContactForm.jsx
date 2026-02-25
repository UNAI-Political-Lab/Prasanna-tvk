import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

// ─── EmailJS Configuration ───────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add a service (Gmail) and connect prasannatvkmla@gmail.com
// 3. Create an email template — use these variables in the template body:
//      {{from_name}}, {{phone}}, {{from_email}}, {{message}}
//    Set the "To Email" in the template to: prasannatvkmla@gmail.com
// 4. Replace the three placeholders below with your real IDs
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'   // e.g. 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // e.g. 'template_xxxxxxx'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'   // e.g. 'xxxxxxxxxxxxxxxxxxxx'
// ─────────────────────────────────────────────────────────────────────────────

const ContactForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        from_name: '',
        phone: '',
        from_email: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formData,
                EMAILJS_PUBLIC_KEY
            )
            setIsSubmitted(true)
        } catch (err) {
            console.error('EmailJS error:', err)
            setError('Failed to send your message. Please try again or call us directly.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-tvk-red/5 relative overflow-hidden">
            {/* Cinematic Blur Accent */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-tvk-red/5 blur-[100px] -z-10" />

            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.form
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="from_name" className="text-sm font-black text-tvk-dark uppercase tracking-widest">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    id="from_name"
                                    value={formData.from_name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="w-full bg-tvk-lightBg/50 border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium"
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
                                    placeholder="+91 XXXXX XXXXX"
                                    className="w-full bg-tvk-lightBg/50 border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="from_email" className="text-sm font-black text-tvk-dark uppercase tracking-widest">Email (Optional)</label>
                            <input
                                type="email"
                                id="from_email"
                                value={formData.from_email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full bg-tvk-lightBg/50 border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium"
                            />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="message" className="text-sm font-black text-tvk-dark uppercase tracking-widest">How can we help you?</label>
                            <textarea
                                required
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Type your message here..."
                                className="w-full bg-tvk-lightBg/50 border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium resize-none shadow-inner"
                            ></textarea>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full ${isLoading ? 'bg-tvk-dark/20' : 'bg-tvk-red'} text-white font-black py-5 text-lg rounded-2xl shadow-[0_10px_30px_rgba(145,9,5,0.2)] hover:shadow-[0_15px_40px_rgba(145,9,5,0.3)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest disabled:cursor-not-allowed`}
                        >
                            {isLoading ? 'Sending...' : 'Send Message'} <Send size={22} className={isLoading ? 'animate-pulse' : ''} />
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
                    </motion.form>
                ) : (
                    <motion.div
                        key="contact-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center"
                    >
                        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                        <p className="text-tvk-dark/60 mb-8">We've received your message and will get back to you shortly.</p>
                        <button
                            onClick={() => { setIsSubmitted(false); setFormData({ from_name: '', phone: '', from_email: '', message: '' }) }}
                            className="text-tvk-red font-bold hover:underline"
                        >
                            Send another message
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ContactForm
