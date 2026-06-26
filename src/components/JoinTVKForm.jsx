import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, User, Phone, Mail, Calendar, MapPin, GraduationCap, MessageSquare, CreditCard, Hash } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { membershipService } from '../services/membershipService'

const JoinTVKForm = () => {
    const { language } = useLanguage()
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            await membershipService.submitMembership(formData)
            setIsSubmitted(true)
        } catch (err) {
            console.error('Submission error:', err)
            setError(
                language === 'en'
                    ? 'There was an error submitting your application. Please try again later.'
                    : 'உங்கள் விண்ணப்பத்தைச் சமர்ப்பிப்பதில் பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.'
            )
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
                                    <User size={16} className="text-tvk-red" /> {language === 'en' ? 'Full Name' : 'முழு பெயர்'}
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={language === 'en' ? 'Enter your full name' : 'உங்கள் முழு பெயரை உள்ளிடவும்'}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="phone" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <Phone size={16} className="text-tvk-red" /> {language === 'en' ? 'Phone Number' : 'தொலைபேசி எண்'}
                                </label>
                                <input
                                    required
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={language === 'en' ? 'Enter your contact number' : 'உங்கள் தொடர்பு எண்ணை உள்ளிடவும்'}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="email" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <Mail size={16} className="text-tvk-red" /> {language === 'en' ? 'Email Address' : 'மின்னஞ்சல் முகவரி'}
                                </label>
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={language === 'en' ? 'Enter your email' : 'உங்கள் மின்னஞ்சலை உள்ளிடவும்'}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="age" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <Calendar size={16} className="text-tvk-red" /> {language === 'en' ? 'Age' : 'வயது'}
                                </label>
                                <input
                                    required
                                    type="number"
                                    id="age"
                                    min="18"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder={language === 'en' ? 'Your age' : 'உங்கள் வயது'}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="district" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={16} className="text-tvk-red" /> {language === 'en' ? 'District' : 'மாவட்டம்'}
                                </label>
                                <select
                                    required
                                    id="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm appearance-none cursor-pointer"
                                >
                                    <option value="">{language === 'en' ? 'Select District' : 'மாவட்டம் தேர்ந்தெடுக்கவும்'}</option>
                                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="taluk" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={16} className="text-tvk-red" /> {language === 'en' ? 'Taluk' : 'தாலுகா'}
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="taluk"
                                    value={formData.taluk}
                                    onChange={handleChange}
                                    placeholder={language === 'en' ? 'Your Taluk' : 'உங்கள் தாலுகா'}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="ward" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <Hash size={16} className="text-tvk-red" /> {language === 'en' ? 'Ward Number' : 'வார்டு எண்'}
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="ward"
                                    value={formData.ward}
                                    onChange={handleChange}
                                    placeholder={language === 'en' ? 'Enter Ward Number' : 'வார்டு எண் உள்ளிடவும்'}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="voterId" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                    <CreditCard size={16} className="text-tvk-red" /> {language === 'en' ? 'Voter ID Number' : 'வாக்காளர் அடையாள அட்டை எண்'}
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="voterId"
                                    value={formData.voterId}
                                    onChange={handleChange}
                                    placeholder={language === 'en' ? 'Enter Voter ID' : 'வாக்காளர் அடையாள அட்டை எண் உள்ளிடவும்'}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="qualification" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                <GraduationCap size={16} className="text-tvk-red" /> {language === 'en' ? 'Educational Qualification' : 'கல்வி தகுதி'}
                            </label>
                            <input
                                required
                                type="text"
                                id="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                placeholder={language === 'en' ? 'Your highest qualification' : 'உங்கள் கல்வி தகுதி'}
                                className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                            />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="message" className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare size={16} className="text-tvk-red" /> {language === 'en' ? 'Why do you want to join TVK?' : 'நீங்கள் ஏன் TVK-இல் இணைய விரும்புகிறீர்கள்?'}
                            </label>
                            <textarea
                                required
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder={language === 'en' ? 'Share your vision and why you want to be part of our movement...' : 'உங்கள் எண்ணங்களையும் நீங்கள் ஏன் எங்கள் இயக்கத்தின் அங்கமாக விரும்புகிறீர்கள் என்பதையும் பகிரவும்...'}
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
                            {isLoading ? (language === 'en' ? 'Submitting...' : 'சமர்ப்பிக்கப்படுகிறது...') : (language === 'en' ? 'Join TVK Movement' : 'TVK இயக்கத்தில் சேரவும்')} <Send size={20} className={isLoading ? 'animate-pulse' : ''} />
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
                            {language === 'en'
                                ? "By joining, you agree to uphold the party's values and principles."
                                : "இணைவதன் மூலம், கட்சியின் கொள்கைகள் மற்றும் கோட்பாடுகளைப் பின்பற்ற ஒப்புக்கொள்கிறீர்கள்."
                            }
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
                        <h2 className="text-3xl font-bold mb-4">
                            {language === 'en' ? 'Welcome to the Movement!' : 'இயக்கத்திற்கு வரவேற்கிறோம்!'}
                        </h2>
                        <p className="text-tvk-dark/60 max-w-md mx-auto mb-10 text-lg">
                            {language === 'en'
                                ? "Your application has been submitted successfully. We are excited to have you onboard. Our team will contact you soon with the next steps."
                                : "உங்களது விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது. உங்களுடன் இணைவதில் நாங்கள் மகிழ்ச்சியடைகிறோம். எங்களது குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்."
                            }
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-tvk-red font-bold hover:underline"
                        >
                            {language === 'en' ? 'Submit another application' : 'மற்றொரு விண்ணப்பத்தை சமர்ப்பிக்க'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default JoinTVKForm
