import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, User, Phone, Mail, Calendar, MapPin, GraduationCap, MessageSquare, CreditCard, Hash } from 'lucide-react'

const JoinTVKForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        age: '',
        district: '',
        taluk: '',
        ward: '',
        voterId: '',
        qualification: '',
        message: ''
    })

    // Using the same SCRIPT_URL as PetitionForm for now, 
    // though in a real scenario this might point to a different sheet/endpoint
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzIoHOUMvA5rgy0EZnLGgw5z0_cJVT6W4l2Gt1UIUtDB-ovfHDAvTKKbeEtk7cen9SQ/exec'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const params = new URLSearchParams()
            params.append('formType', 'Membership') // Distinguish from Petition
            for (const key in formData) {
                params.append(key, formData[key])
            }

            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString()
            })

            setIsSubmitted(true)
        } catch (err) {
            console.error('Submission error:', err)
            setError('There was an error submitting your application. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const districts = [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
        "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanniyakumari", "Karur",
        "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris",
        "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
        "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
        "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
        "Viluppuram", "Virudhunagar"
    ]

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
                                <label htmlFor="name" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <User size={16} className="text-tvk-red" /> Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="phone" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <Phone size={16} className="text-tvk-red" /> Phone Number
                                </label>
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
                                <label htmlFor="email" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <Mail size={16} className="text-tvk-red" /> Email Address
                                </label>
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
                                <label htmlFor="age" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <Calendar size={16} className="text-tvk-red" /> Age
                                </label>
                                <input
                                    required
                                    type="number"
                                    id="age"
                                    min="18"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Your age"
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="district" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={16} className="text-tvk-red" /> District
                                </label>
                                <select
                                    required
                                    id="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm appearance-none cursor-pointer"
                                >
                                    <option value="">Select District</option>
                                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="taluk" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={16} className="text-tvk-red" /> Taluk
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="taluk"
                                    value={formData.taluk}
                                    onChange={handleChange}
                                    placeholder="Your Taluk"
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="ward" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <Hash size={16} className="text-tvk-red" /> Ward Number
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="ward"
                                    value={formData.ward}
                                    onChange={handleChange}
                                    placeholder="Enter Ward Number"
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="voterId" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <CreditCard size={16} className="text-tvk-red" /> Voter ID Number
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="voterId"
                                    value={formData.voterId}
                                    onChange={handleChange}
                                    placeholder="Enter Voter ID"
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="qualification" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                <GraduationCap size={16} className="text-tvk-red" /> Educational Qualification
                            </label>
                            <input
                                required
                                type="text"
                                id="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                placeholder="Your highest qualification"
                                className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                            />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="message" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare size={16} className="text-tvk-red" /> Why do you want to join TVK?
                            </label>
                            <textarea
                                required
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Share your vision and why you want to be part of our movement..."
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
                            {isLoading ? 'Submitting...' : 'Join TVK Movement'} <Send size={20} className={isLoading ? 'animate-pulse' : ''} />
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
                            By joining, you agree to uphold the party's values and principles.
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
                        <h2 className="text-3xl font-bold mb-4">Welcome to the Movement!</h2>
                        <p className="text-tvk-dark/60 max-w-md mx-auto mb-10 text-lg">
                            Your application has been submitted successfully. We are excited to have you onboard. Our team will contact you soon with the next steps.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-tvk-red font-bold hover:underline"
                        >
                            Submit another application
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default JoinTVKForm
