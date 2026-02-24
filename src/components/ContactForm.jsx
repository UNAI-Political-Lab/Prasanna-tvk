import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'

const ContactForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setTimeout(() => setIsSubmitted(true), 1000)
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
                                <label className="text-sm font-black text-tvk-dark uppercase tracking-widest">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Name"
                                    className="w-full bg-tvk-lightBg/50 border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-black text-tvk-dark uppercase tracking-widest">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="+91 XXXXX XXXXX"
                                    className="w-full bg-tvk-lightBg/50 border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black text-tvk-dark uppercase tracking-widest">Email (Optional)</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-tvk-lightBg/50 border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black text-tvk-dark uppercase tracking-widest">How can we help you?</label>
                            <textarea
                                required
                                rows="5"
                                placeholder="Type your message here..."
                                className="w-full bg-tvk-lightBg/50 border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium resize-none shadow-inner"
                            ></textarea>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-tvk-red text-white font-black py-5 text-lg rounded-2xl shadow-[0_10px_30px_rgba(145,9,5,0.2)] hover:shadow-[0_15px_40px_rgba(145,9,5,0.3)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
                        >
                            Send Message <Send size={22} />
                        </motion.button>
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
                            onClick={() => setIsSubmitted(false)}
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
