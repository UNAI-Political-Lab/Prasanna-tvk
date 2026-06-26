import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Paperclip, X, FileText, Image, Video, File, User, Phone, MapPin, Tag, Copy, Check } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { grievanceService } from '../services/grievanceService'

const FALLBACK_CATEGORIES = [
    { id: 'water', name_en: 'Water Supply', name_ta: 'குடிநீர்', icon: 'Droplets' },
    { id: 'roads', name_en: 'Roads', name_ta: 'சாலைகள்', icon: 'Construction' },
    { id: 'health', name_en: 'Healthcare', name_ta: 'மருத்துவ வசதிகள்', icon: 'Stethoscope' },
    { id: 'enquiry', name_en: 'Enquiry', name_ta: 'தேர்வு விசாரணை', icon: 'Search' },
    { id: 'rural', name_en: 'Rural Plan', name_ta: 'ஊரக அமைப்பு', icon: 'Building2' },
    { id: 'youth', name_en: 'Youth', name_ta: 'இளைஞர்', icon: 'Users' },
    { id: 'women', name_en: 'Women', name_ta: 'பெண்கள் புரவலர்', icon: 'HeartHandshake' },
    { id: 'sanitation', name_en: 'Sanitation', name_ta: 'சுகாதாரம்', icon: 'Recycle' }
]

const PetitionForm = ({ compact = false }) => {
    const { language } = useLanguage()
    const [searchParams] = useSearchParams()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [submittedData, setSubmittedData] = useState(null)
    const [copied, setCopied] = useState(false)
    const [categories, setCategories] = useState(FALLBACK_CATEGORIES)
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        area: '',
        category_id: '',
        title: '',
        description: ''
    })

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const dbCats = await grievanceService.getCategories()
                if (dbCats && dbCats.length > 0) {
                    setCategories(dbCats)
                }
            } catch (err) {
                console.warn('Failed to fetch categories from database, using fallbacks.', err)
            }
        }
        fetchCategories()
    }, [])

    // Handle query param category selection
    useEffect(() => {
        const categoryParam = searchParams.get('category')
        if (categoryParam && categories.length > 0) {
            const matched = categories.find(
                cat => cat.name_en === categoryParam || cat.name_ta === categoryParam
            )
            if (matched) {
                setFormData(prev => ({
                    ...prev,
                    category_id: matched.id,
                    title: language === 'en' ? matched.name_en : matched.name_ta
                }))
            }
        }
    }, [searchParams, categories, language])

    const [mediaFiles, setMediaFiles] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [fileError, setFileError] = useState(null)
    const fileInputRef = useRef(null)

    const MAX_FILES = 5
    const MAX_SIZE_MB = 10

    const getFileIcon = (file) => {
        if (file.type.startsWith('image/')) return <Image size={18} className="text-blue-500" />
        if (file.type.startsWith('video/')) return <Video size={18} className="text-purple-500" />
        if (file.type.includes('pdf') || file.type.includes('text') || file.type.includes('document'))
            return <FileText size={18} className="text-orange-500" />
        return <File size={18} className="text-gray-400" />
    }

    const processFiles = useCallback((incoming) => {
        setFileError(null)
        const valid = []
        for (const file of incoming) {
            if (mediaFiles.length + valid.length >= MAX_FILES) {
                setFileError(language === 'en' ? `Max limit is ${MAX_FILES} files.` : `அதிகபட்சம் ${MAX_FILES} கோப்புகள் மட்டுமே.`)
                break
            }
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                setFileError(language === 'en' ? `"${file.name}" exceeds ${MAX_SIZE_MB} MB limit.` : `"${file.name}" ${MAX_SIZE_MB} MB வரம்பை மீறுகிறது.`)
                continue
            }
            valid.push(file)
        }
        setMediaFiles(prev => [...prev, ...valid])
    }, [mediaFiles, language])

    const handleFileInput = (e) => {
        processFiles(Array.from(e.target.files))
        e.target.value = ''
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        processFiles(Array.from(e.dataTransfer.files))
    }

    const removeFile = (index) => {
        setMediaFiles(prev => prev.filter((_, i) => i !== index))
        setFileError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            // Find selected category details
            const selectedCat = categories.find(cat => cat.id === formData.category_id)
            
            // Prepare submission payload
            const payload = {
                ...formData,
                // Ensure title has a value (either selected category name or custom title)
                title: formData.title || (selectedCat ? (language === 'en' ? selectedCat.name_en : selectedCat.name_ta) : 'Grievance'),
                // If it is fallback local category (UUID check), set category_id to null or try parsing
                category_id: (formData.category_id && formData.category_id.length === 36) ? formData.category_id : null
            }

            const result = await grievanceService.submitGrievance(payload, mediaFiles)
            
            setSubmittedData(result)
            setIsSubmitted(true)
            
            // Clear form
            setFormData({
                name: '',
                phone: '',
                email: '',
                area: '',
                category_id: '',
                title: '',
                description: ''
            })
            setMediaFiles([])
        } catch (err) {
            console.error('Submission error:', err)
            setError(language === 'en' ? 'Failed to submit grievance. Please try again later.' : 'புகார் சமர்ப்பிப்பதில் பிழை ஏற்பட்டது. தயவுசெய்து பின்னர் முயற்சிக்கவும்.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        
        if (id === 'category_id') {
            const selected = categories.find(cat => cat.id === value)
            setFormData(prev => ({
                ...prev,
                category_id: value,
                title: selected ? (language === 'en' ? selected.name_en : selected.name_ta) : ''
            }))
        } else {
            setFormData(prev => ({ ...prev, [id]: value }))
        }
    }

    const copyReferenceId = () => {
        if (submittedData?.reference_id) {
            navigator.clipboard.writeText(submittedData.reference_id)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    // Areas list (centralized for dropdowns)
    const areas = [
        { value: 'Sholinganallur', en: 'Sholinganallur', ta: 'சோலிங்கநல்லூர்' },
        { value: 'Karapakkam', en: 'Karapakkam', ta: 'கரப்பாக்கம்' },
        { value: 'Perungudi', en: 'Perungudi', ta: 'பெருங்குடி' },
        { value: 'Okkiyam Thoraipakkam', en: 'Okkiyam Thoraipakkam', ta: 'ஓக்கியம் தொரைப்பாக்கம்' },
        { value: 'Navalur', en: 'Navalur', ta: 'நாவலூர்' },
        { value: 'ECR', en: 'ECR Corridor', ta: 'ECR' }
    ]

    // Compact version for Home page sidebar
    if (compact) {
        return (
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {/* Name */}
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tvk-dark/30" />
                            <input
                                required
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={language === 'en' ? 'Full Name' : 'முழு பெயர்'}
                                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-tvk-red/10 rounded-xl outline-none focus:border-tvk-red/30 focus:ring-2 focus:ring-tvk-red/10 text-sm font-medium transition-all"
                            />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tvk-dark/30" />
                            <input
                                required
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder={language === 'en' ? 'Mobile Number' : 'கைபேசி எண்'}
                                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-tvk-red/10 rounded-xl outline-none focus:border-tvk-red/30 focus:ring-2 focus:ring-tvk-red/10 text-sm font-medium transition-all"
                            />
                        </div>

                        {/* Area Dropdown */}
                        <div className="relative">
                            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tvk-dark/30" />
                            <select
                                required
                                id="area"
                                value={formData.area}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-tvk-red/10 rounded-xl outline-none focus:border-tvk-red/30 text-sm font-medium transition-all appearance-none"
                            >
                                <option value="">{language === 'en' ? 'Select Area / Location' : 'பகுதியை தேர்வு செய்யவும்'}</option>
                                {areas.map(a => (
                                    <option key={a.value} value={a.value}>
                                        {language === 'en' ? a.en : a.ta}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Issue Category Dropdown */}
                        <div className="relative">
                            <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tvk-dark/30" />
                            <select
                                required
                                id="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-tvk-red/10 rounded-xl outline-none focus:border-tvk-red/30 text-sm font-medium transition-all appearance-none"
                            >
                                <option value="">{language === 'en' ? 'Select Issue Category' : 'சிக்கலின் வகையை தேர்வு செய்க'}</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {language === 'en' ? cat.name_en : cat.name_ta}
                                    </option>
                                ))}
                                <option value="other">{language === 'en' ? 'Other Issue' : 'பிற'}</option>
                            </select>
                        </div>

                        {/* Custom Title Input if "other" is selected */}
                        {formData.category_id === 'other' && (
                            <div className="relative">
                                <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tvk-dark/30" />
                                <input
                                    required
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder={language === 'en' ? 'Enter Issue Title' : 'சிக்கலின் தலைப்பை உள்ளிடுக'}
                                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-tvk-red/10 rounded-xl outline-none focus:border-tvk-red/30 focus:ring-2 focus:ring-tvk-red/10 text-sm font-medium transition-all"
                                />
                            </div>
                        )}

                        {/* Description */}
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder={language === 'en' ? 'Describe your issue or grievance here...' : 'உங்கள் பிரச்சினையை விவரிக்கவும்...'}
                            className="w-full px-4 py-3 bg-white border-2 border-tvk-red/10 rounded-xl outline-none focus:border-tvk-red/30 focus:ring-2 focus:ring-tvk-red/10 text-sm font-medium transition-all resize-none"
                        />

                        {/* File Upload */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full border-2 border-dashed border-tvk-red/15 rounded-xl px-4 py-4 flex items-center gap-3 cursor-pointer hover:border-tvk-red/30 transition-colors bg-white/50"
                        >
                            <Paperclip size={18} className="text-tvk-red/40 shrink-0" />
                            <span className="text-xs text-tvk-dark/40 font-medium">
                                {language === 'en' ? 'Upload Photo / Video / Doc (Optional)' : 'புகைப்படம் / வீடியோ பதிவேற்றவும் (விருப்ப தேர்வு)'}
                            </span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*,video/*,.pdf"
                                className="hidden"
                                onChange={handleFileInput}
                            />
                        </div>

                        {/* File list */}
                        {mediaFiles.length > 0 && (
                            <div className="space-y-1">
                                {mediaFiles.map((file, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs bg-white rounded-lg px-3 py-2 border border-gray-100">
                                        {getFileIcon(file)}
                                        <span className="truncate flex-1 text-tvk-dark/70">{file.name}</span>
                                        <button type="button" onClick={() => removeFile(idx)} className="text-tvk-dark/30 hover:text-tvk-red"><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full ${isLoading ? 'bg-tvk-dark/20' : 'bg-tvk-red'} text-white font-extrabold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm`}
                        >
                            {isLoading 
                                ? (language === 'en' ? 'Submitting...' : 'சமர்ப்பிக்கிறது...') 
                                : (language === 'en' ? 'Submit Grievance' : 'புகார் சமர்ப்பிக்கவும்')}{' '}
                            <Send size={16} className={isLoading ? 'animate-pulse' : ''} />
                        </button>

                        {error && (
                            <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                                <AlertCircle size={13} /> {error}
                            </p>
                        )}
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-8 flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle size={36} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            {language === 'en' ? 'Grievance Registered Successfully!' : 'புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!'}
                        </h3>
                        
                        {submittedData?.reference_id && (
                            <div className="bg-tvk-red/5 border border-tvk-red/10 rounded-xl p-3 my-3 w-full flex flex-col items-center gap-1">
                                <span className="text-[10px] uppercase tracking-wider text-tvk-red font-bold">
                                    {language === 'en' ? 'Your Complaint ID' : 'உங்கள் புகார் எண்'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-base font-extrabold text-tvk-dark select-all">
                                        {submittedData.reference_id}
                                    </span>
                                    <button 
                                        onClick={copyReferenceId}
                                        type="button" 
                                        className="p-1 hover:bg-tvk-red/10 rounded transition-colors text-tvk-red"
                                        title={language === 'en' ? 'Copy Complaint ID' : 'நகலெடுக்க'}
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        )}

                        <p className="text-tvk-dark/60 text-xs mb-4">
                            {language === 'en' 
                                ? 'Use the ID above in the Complaint Tracker on the homepage to monitor resolution progress.' 
                                : 'புகார் தீர்க்கப்படும் முன்னேற்றத்தைக் கண்காணிக்க முகப்பு பக்கத்தில் உள்ள கண்காணிப்பானில் இந்த எண்ணைப் பயன்படுத்தவும்.'}
                        </p>
                        <button onClick={() => setIsSubmitted(false)} className="text-tvk-red font-bold text-sm hover:underline">
                            {language === 'en' ? 'Submit Another Grievance' : 'மற்றொரு புகார் சமர்ப்பிக்க'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }

    // Full version for Petition page
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
                                <label htmlFor="name" className="text-sm font-black text-tvk-dark uppercase tracking-widest">
                                    {language === 'en' ? 'Full Name' : 'முழு பெயர்'}
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={language === 'en' ? 'Enter your full name' : 'உங்கள் பெயரை உள்ளிடவும்'}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="phone" className="text-sm font-black text-tvk-dark uppercase tracking-widest">
                                    {language === 'en' ? 'Mobile Number' : 'கைபேசி எண்'}
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
                                <label htmlFor="email" className="text-sm font-black text-tvk-dark uppercase tracking-widest">
                                    {language === 'en' ? 'Email Address' : 'மின்னஞ்சல்'}
                                </label>
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={language === 'en' ? 'Enter your email address' : 'உங்கள் மின்னஞ்சலை உள்ளிடவும்'}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="area" className="text-sm font-black text-tvk-dark uppercase tracking-widest">
                                    {language === 'en' ? 'Area / Location' : 'பகுதி / இடம்'}
                                </label>
                                <select
                                    required
                                    id="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm appearance-none cursor-pointer"
                                >
                                    <option value="">{language === 'en' ? 'Select Area / Location' : 'பகுதியை தேர்வு செய்யவும்'}</option>
                                    {areas.map(a => (
                                        <option key={a.value} value={a.value}>
                                            {language === 'en' ? a.en : a.ta}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Category Dropdown */}
                            <div className="space-y-3">
                                <label htmlFor="category_id" className="text-sm font-black text-tvk-dark uppercase tracking-widest">
                                    {language === 'en' ? 'Grievance Category' : 'புகார் வகை'}
                                </label>
                                <select
                                    required
                                    id="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm appearance-none cursor-pointer"
                                >
                                    <option value="">{language === 'en' ? 'Select Category' : 'வகை தேர்ந்தெடுக்கவும்'}</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {language === 'en' ? cat.name_en : cat.name_ta}
                                        </option>
                                    ))}
                                    <option value="other">{language === 'en' ? 'Other Issue' : 'பிற'}</option>
                                </select>
                            </div>

                            {/* Grievance Title */}
                            <div className="space-y-3">
                                <label htmlFor="title" className="text-sm font-black text-tvk-dark uppercase tracking-widest">
                                    {language === 'en' ? 'Grievance Title' : 'புகார் தலைப்பு'}
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    disabled={formData.category_id !== 'other' && formData.category_id !== ''}
                                    placeholder={language === 'en' ? 'Enter a brief title of the grievance' : 'உங்கள் புகாரின் சுருக்கமான தலைப்பு'}
                                    className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-100"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="description" className="text-sm font-black text-tvk-dark uppercase tracking-widest">
                                {language === 'en' ? 'Grievance Description' : 'புகார் விவரம்'}
                            </label>
                            <textarea
                                required
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="6"
                                placeholder={language === 'en' ? 'Please describe your concern or request in detail...' : 'உங்கள் கவலை அல்லது கோரிக்கையை விரிவாக விவரிக்கவும்...'}
                                className="w-full bg-white border-2 border-tvk-red/5 rounded-2xl px-5 py-4 outline-none focus:border-tvk-red/20 focus:ring-4 focus:ring-tvk-red/5 transition-all text-tvk-dark font-medium shadow-sm resize-none"
                            ></textarea>
                        </div>

                        {/* Media Attachment Section */}
                        <div className="space-y-3">
                            <label className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                <Paperclip size={15} /> {language === 'en' ? 'Evidence Media' : 'ஆதார ஊடகம்'} <span className="font-normal normal-case opacity-50 tracking-normal">({language === 'en' ? `Optional · Max ${MAX_FILES} files · ${MAX_SIZE_MB} MB each` : `விருப்ப · ${MAX_FILES} கோப்புகள் · ${MAX_SIZE_MB} MB ஒவ்வொன்றும்`})</span>
                            </label>

                            <motion.div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                animate={{ borderColor: isDragging ? 'rgba(145,9,5,0.4)' : 'rgba(145,9,5,0.1)', backgroundColor: isDragging ? 'rgba(145,9,5,0.04)' : 'rgba(255,255,255,0.6)' }}
                                transition={{ duration: 0.2 }}
                                className="w-full border-2 border-dashed rounded-2xl px-5 py-8 flex flex-col items-center justify-center gap-2 cursor-pointer select-none"
                            >
                                <Paperclip size={28} className="text-tvk-red/40" />
                                <p className="text-sm font-bold text-tvk-dark/50">
                                    {isDragging 
                                        ? (language === 'en' ? 'Drop files here...' : 'இங்கே கோப்புகளை விடவும்…') 
                                        : (language === 'en' ? 'Click to select or drag and drop files here' : 'கிளிக் செய்யவும் அல்லது இழுத்து விடவும்')}
                                </p>
                                <p className="text-xs text-tvk-dark/30">
                                    {language === 'en' ? 'Accepts images, videos, and PDFs' : 'படங்கள், வீடியோக்கள், PDFs ஏற்றுக்கொள்ளப்படும்'}
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                                    className="hidden"
                                    onChange={handleFileInput}
                                />
                            </motion.div>

                            <AnimatePresence>
                                {fileError && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-xs text-red-500 font-semibold flex items-center gap-1"
                                    >
                                        <AlertCircle size={13} /> {fileError}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {mediaFiles.length > 0 && (
                                    <motion.ul
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-2"
                                    >
                                        {mediaFiles.map((file, idx) => (
                                            <motion.li
                                                key={file.name + idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                className="flex items-center gap-3 bg-white border border-tvk-red/10 rounded-xl px-4 py-3 shadow-sm"
                                            >
                                                {file.type.startsWith('image/') ? (
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                                                        {getFileIcon(file)}
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-tvk-dark truncate">{file.name}</p>
                                                    <p className="text-xs text-tvk-dark/40">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(idx)}
                                                    className="text-tvk-dark/30 hover:text-tvk-red transition-colors flex-shrink-0"
                                                    aria-label="Remove file"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`w-full ${isLoading ? 'bg-tvk-dark/20' : 'bg-tvk-red'} text-white font-black py-5 text-lg rounded-2xl shadow-[0_10px_30px_rgba(145,9,5,0.2)] hover:shadow-[0_15px_40px_rgba(145,9,5,0.3)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest disabled:cursor-not-allowed`}
                        >
                            {isLoading 
                                ? (language === 'en' ? 'Submitting...' : 'சமர்ப்பிக்கிறது...') 
                                : (language === 'en' ? 'Submit Grievance' : 'புகார் சமர்ப்பிக்கவும்')}{' '}
                            <Send size={20} className={isLoading ? 'animate-pulse' : ''} />
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
                                ? 'By submitting, you consent to our constituency office contacting you regarding this concern.' 
                                : 'சமர்ப்பிப்பதன் மூலம், இந்த புகார் தொடர்பாக எங்கள் அலுவலகம் உங்களை தொடர்பு கொள்வதை ஒப்புக்கொள்கிறீர்கள்.'}
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
                            {language === 'en' ? 'Grievance Registered Successfully!' : 'புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!'}
                        </h2>

                        {submittedData?.reference_id && (
                            <div className="bg-tvk-red/5 border border-tvk-red/10 rounded-2xl p-6 my-6 max-w-md w-full flex flex-col items-center gap-2 shadow-sm">
                                <span className="text-xs uppercase tracking-widest text-tvk-red font-black">
                                    {language === 'en' ? 'Your Unique Complaint ID' : 'உங்கள் தனித்துவமான புகார் எண்'}
                                </span>
                                <div className="flex items-center gap-3 mt-1 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-inner">
                                    <span className="text-2xl font-black text-tvk-dark select-all tracking-wider font-mono">
                                        {submittedData.reference_id}
                                    </span>
                                    <button 
                                        onClick={copyReferenceId}
                                        type="button" 
                                        className="p-2 hover:bg-tvk-red/10 rounded-lg transition-colors text-tvk-red"
                                        title={language === 'en' ? 'Copy Complaint ID' : 'நகலெடுக்க'}
                                    >
                                        {copied ? <Check size={20} /> : <Copy size={20} />}
                                    </button>
                                </div>
                                <p className="text-xs text-tvk-dark/50 mt-2 text-center leading-relaxed">
                                    {language === 'en'
                                        ? 'Please save this ID to track your complaint status on the homepage tracker.'
                                        : 'உங்கள் புகாரின் நிலையைக் கண்காணிக்க இந்த எண்ணைச் சேமித்து முகப்பு பக்கத்தில் உள்ள கண்காணிப்பானில் பயன்படுத்தவும்.'}
                                </p>
                            </div>
                        )}

                        <p className="text-tvk-dark/60 max-w-md mx-auto mb-10 text-lg">
                            {language === 'en' 
                                ? 'Thank you for raising your voice. We have securely registered your grievance and our ward volunteer network will review it shortly.' 
                                : 'உங்கள் குரலை எழுப்பியதற்கு நன்றி. உங்கள் புகாரை நாங்கள் பெற்றுள்ளோம், விரைவில் மதிப்பாய்வு செய்வோம்.'}
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-tvk-red font-bold hover:underline"
                        >
                            {language === 'en' ? 'Submit Another Grievance' : 'மற்றொரு புகார் சமர்ப்பிக்க'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PetitionForm
