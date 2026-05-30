import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Package, Settings, CheckCircle2, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const ComplaintTracker = () => {
    const { language } = useLanguage()
    const [complaintId, setComplaintId] = useState('')
    const [showDemo, setShowDemo] = useState(false)

    const handleTrack = (e) => {
        e.preventDefault()
        if (complaintId.trim()) {
            setShowDemo(true)
        }
    }

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-extrabold text-tvk-dark mb-2">
                {language === 'en' ? 'Track Your Complaint Status' : 'உங்கள் புகாரின் நிலையை கண்காணிக்கவும்'}
            </h3>
            <p className="text-sm text-tvk-dark/50 mb-5">
                {language === 'en' ? 'Enter your unique Complaint ID to check the resolution status' : 'நிலை தெரிந்துகொள்ள உங்கள் புகார் ID-ஐ உள்ளிடுகொள்ளவும்'}
            </p>

            <form onSubmit={handleTrack} className="flex gap-2 mb-6">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-tvk-dark/30" />
                    <input
                        type="text"
                        value={complaintId}
                        onChange={(e) => { setComplaintId(e.target.value); setShowDemo(false) }}
                        placeholder={language === 'en' ? 'Enter Complaint ID' : 'புகார் ID உள்ளிடவும்'}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tvk-red/30 focus:ring-2 focus:ring-tvk-red/10 outline-none text-sm font-semibold transition-all"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-tvk-red text-white font-bold px-6 py-3 rounded-xl hover:bg-tvk-darkRed transition-colors text-sm shrink-0"
                >
                    {language === 'en' ? 'Track' : 'கண்காணிக்கவும்'}
                </button>
            </form>

            {/* Tracking Flow Visualization */}
            <div className="flex items-center justify-between gap-2 md:gap-4">
                {/* Step 1 - Received */}
                <motion.div
                    className="track-step flex-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center ${showDemo ? 'bg-green-500 text-white' : 'bg-green-50 text-green-500'} transition-all`}>
                        <Package size={24} />
                    </div>
                    <p className="text-[11px] md:text-xs font-bold text-tvk-dark/70 mt-1">
                        {language === 'en' ? 'Received' : 'பெறப்பட்டது'}
                    </p>
                    <p className="text-[10px] text-tvk-dark/40">{language === 'en' ? 'Pending Review' : 'Received'}</p>
                </motion.div>

                {/* Arrow */}
                <div className="flex items-center gap-1 text-tvk-dark/20 pb-6">
                    <div className="w-4 md:w-8 h-0.5 bg-tvk-dark/10 rounded-full" />
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-tvk-dark/10 rounded-full" />
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-tvk-dark/10 rounded-full" />
                    <ArrowRight size={14} className="text-tvk-dark/20" />
                </div>

                {/* Step 2 - In Progress */}
                <motion.div
                    className="track-step flex-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center ${showDemo ? 'bg-orange-500 text-white animate-pulse' : 'bg-orange-50 text-orange-500'} transition-all`}>
                        <Settings size={24} />
                    </div>
                    <p className="text-[11px] md:text-xs font-bold text-tvk-dark/70 mt-1">
                        {language === 'en' ? 'In Progress' : 'நடவடிக்கையில்'}
                    </p>
                    <p className="text-[10px] text-tvk-dark/40">{language === 'en' ? 'Processing' : 'In Progress'}</p>
                </motion.div>

                {/* Arrow */}
                <div className="flex items-center gap-1 text-tvk-dark/20 pb-6">
                    <div className="w-4 md:w-8 h-0.5 bg-tvk-dark/10 rounded-full" />
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-tvk-dark/10 rounded-full" />
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-tvk-dark/10 rounded-full" />
                    <ArrowRight size={14} className="text-tvk-dark/20" />
                </div>

                {/* Step 3 - Resolved */}
                <motion.div
                    className="track-step flex-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-gray-50 text-gray-400 transition-all">
                        <CheckCircle2 size={24} />
                    </div>
                    <p className="text-[11px] md:text-xs font-bold text-tvk-dark/70 mt-1">
                        {language === 'en' ? 'Resolved' : 'தீர்க்கப்பட்டது'}
                    </p>
                    <p className="text-[10px] text-tvk-dark/40">{language === 'en' ? 'Completed' : 'Resolved'}</p>
                </motion.div>
            </div>
        </div>
    )
}

export default ComplaintTracker
