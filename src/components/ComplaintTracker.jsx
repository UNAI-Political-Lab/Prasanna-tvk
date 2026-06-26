import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Package, Settings, CheckCircle2, ArrowRight, AlertCircle, Calendar, MapPin, Tag, User } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { grievanceService } from '../services/grievanceService'

const ComplaintTracker = () => {
    const { language } = useLanguage()
    const [complaintId, setComplaintId] = useState('')
    const [complaint, setComplaint] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleTrack = async (e) => {
        e.preventDefault()
        if (!complaintId.trim()) return

        setIsLoading(true)
        setError(null)
        setComplaint(null)

        try {
            const data = await grievanceService.trackGrievance(complaintId)
            if (data) {
                setComplaint(data)
            } else {
                setError(language === 'en' ? 'Grievance not found. Please verify the ID.' : 'புகார் எண் கண்டறியப்படவில்லை. தயவுசெய்து எண்ணைச் சரிபார்க்கவும்.')
            }
        } catch (err) {
            console.error('Tracking error:', err)
            setError(language === 'en' ? 'Grievance not found. Please verify the ID.' : 'புகார் எண் கண்டறியப்படவில்லை. தயவுசெய்து எண்ணைச் சரிபார்க்கவும்.')
        } finally {
            setIsLoading(false)
        }
    }

    const status = complaint?.status || null

    // Determine status step styling
    const getStep1Class = () => {
        if (status) return 'bg-green-500 text-white'
        return 'bg-green-50 text-green-500'
    }

    const getStep2Class = () => {
        if (status === 'in_progress') return 'bg-orange-500 text-white animate-pulse'
        if (status === 'resolved') return 'bg-orange-500 text-white'
        return 'bg-orange-50 text-orange-500'
    }

    const getStep3Class = () => {
        if (status === 'resolved') return 'bg-green-600 text-white'
        return 'bg-gray-50 text-gray-400'
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ta-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
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
                        onChange={(e) => { setComplaintId(e.target.value); setError(null); if(!e.target.value) setComplaint(null); }}
                        placeholder={language === 'en' ? 'Enter Complaint ID (e.g. GRV-...)' : 'புகார் ID உள்ளிடவும்'}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tvk-red/30 focus:ring-2 focus:ring-tvk-red/10 outline-none text-sm font-semibold transition-all"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-tvk-red text-white font-bold px-6 py-3 rounded-xl hover:bg-tvk-darkRed transition-colors text-sm shrink-0 disabled:opacity-50"
                >
                    {isLoading ? (language === 'en' ? 'Searching...' : 'தேடுகிறது...') : (language === 'en' ? 'Track' : 'கண்காணிக்கவும்')}
                </button>
            </form>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 font-semibold text-xs mb-6">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            {/* Tracking Flow Visualization */}
            <div className="flex items-center justify-between gap-2 md:gap-4 mb-6">
                {/* Step 1 - Received */}
                <div className="track-step flex-1 text-center flex flex-col items-center">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center ${getStep1Class()} transition-all shadow-sm`}>
                        <Package size={24} />
                    </div>
                    <p className="text-[11px] md:text-xs font-bold text-tvk-dark/70 mt-2">
                        {language === 'en' ? 'Received' : 'பெறப்பட்டது'}
                    </p>
                    <p className="text-[10px] text-tvk-dark/40">
                        {status ? (language === 'en' ? 'Registered' : 'பதிவு செய்யப்பட்டது') : (language === 'en' ? 'Pending Review' : 'பார்வைக்கு')}
                    </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-1 text-tvk-dark/20 pb-6">
                    <div className={`w-4 md:w-8 h-0.5 ${status ? 'bg-green-500' : 'bg-tvk-dark/10'} rounded-full`} />
                    <ArrowRight size={14} className={status ? 'text-green-500' : 'text-tvk-dark/20'} />
                </div>

                {/* Step 2 - In Progress */}
                <div className="track-step flex-1 text-center flex flex-col items-center">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center ${getStep2Class()} transition-all shadow-sm`}>
                        <Settings size={24} />
                    </div>
                    <p className="text-[11px] md:text-xs font-bold text-tvk-dark/70 mt-2">
                        {language === 'en' ? 'In Progress' : 'நடவடிக்கையில்'}
                    </p>
                    <p className="text-[10px] text-tvk-dark/40">
                        {status === 'in_progress' ? (language === 'en' ? 'Processing' : 'நடவடிக்கை எடுக்கப்படுகிறது') : 
                         status === 'resolved' ? (language === 'en' ? 'Processed' : 'நடவடிக்கை எடுக்கப்பட்டது') : 
                         (language === 'en' ? 'Waiting' : 'காத்திருக்கிறது')}
                    </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-1 text-tvk-dark/20 pb-6">
                    <div className={`w-4 md:w-8 h-0.5 ${status === 'resolved' ? 'bg-green-500' : (status === 'in_progress' ? 'bg-orange-400' : 'bg-tvk-dark/10')} rounded-full`} />
                    <ArrowRight size={14} className={status === 'resolved' ? 'text-green-500' : (status === 'in_progress' ? 'text-orange-400' : 'text-tvk-dark/20')} />
                </div>

                {/* Step 3 - Resolved */}
                <div className="track-step flex-1 text-center flex flex-col items-center">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center ${getStep3Class()} transition-all shadow-sm`}>
                        <CheckCircle2 size={24} />
                    </div>
                    <p className="text-[11px] md:text-xs font-bold text-tvk-dark/70 mt-2">
                        {language === 'en' ? 'Resolved' : 'தீர்க்கப்பட்டது'}
                    </p>
                    <p className="text-[10px] text-tvk-dark/40">
                        {status === 'resolved' ? (language === 'en' ? 'Completed' : 'தீர்வு காணப்பட்டது') : (language === 'en' ? 'Unresolved' : 'தீர்க்கப்படவில்லை')}
                    </p>
                </div>
            </div>

            {/* Live Grievance Details display */}
            <AnimatePresence>
                {complaint && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-100 pt-6 mt-6 overflow-hidden"
                    >
                        <h4 className="font-extrabold text-tvk-dark text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-4 bg-tvk-red rounded-full"></span>
                            {language === 'en' ? 'Complaint Details' : 'புகார் விவரங்கள்'}
                        </h4>

                        <div className="bg-tvk-lightBg/40 border border-tvk-red/5 rounded-2xl p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                                <div className="space-y-1">
                                    <span className="text-tvk-dark/40 flex items-center gap-1">
                                        <User size={13} /> {language === 'en' ? 'Complainant' : 'புகார்தாரர்'}
                                    </span>
                                    <span className="text-tvk-dark text-sm font-bold block">{complaint.name}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-tvk-dark/40 flex items-center gap-1">
                                        <Calendar size={13} /> {language === 'en' ? 'Submitted On' : 'சமர்ப்பிக்கப்பட்ட தேதி'}
                                    </span>
                                    <span className="text-tvk-dark text-sm font-bold block">{formatDate(complaint.created_at)}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-tvk-dark/40 flex items-center gap-1">
                                        <MapPin size={13} /> {language === 'en' ? 'Area/Location' : 'பகுதி/இடம்'}
                                    </span>
                                    <span className="text-tvk-dark text-sm font-bold block">{complaint.area}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-tvk-dark/40 flex items-center gap-1">
                                        <Tag size={13} /> {language === 'en' ? 'Category' : 'வகை'}
                                    </span>
                                    <span className="text-tvk-dark text-sm font-bold block">
                                        {complaint.complaint_categories ? (
                                            language === 'en' ? complaint.complaint_categories.name_en : complaint.complaint_categories.name_ta
                                        ) : complaint.title}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200/50 pt-3">
                                <span className="text-xs text-tvk-dark/40 font-bold block mb-1">
                                    {language === 'en' ? 'Grievance Description' : 'புகார் விவரம்'}
                                </span>
                                <p className="text-xs text-tvk-dark/70 font-medium leading-relaxed bg-white p-3 rounded-xl border border-gray-50">
                                    {complaint.description}
                                </p>
                            </div>

                            {complaint.resolved_at && (
                                <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-xs font-semibold text-green-700 flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                                    <span>
                                        {language === 'en' 
                                            ? `Resolved on ${formatDate(complaint.resolved_at)}` 
                                            : `தீர்வு காணப்பட்ட தேதி: ${formatDate(complaint.resolved_at)}`}
                                    </span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ComplaintTracker
