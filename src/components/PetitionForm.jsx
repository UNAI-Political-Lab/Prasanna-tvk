import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Paperclip, X, FileText, Image, Video, File } from 'lucide-react'

const PetitionForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
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
                setFileError(`You can attach a maximum of ${MAX_FILES} files.`)
                break
            }
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                setFileError(`"${file.name}" exceeds the ${MAX_SIZE_MB} MB limit.`)
                continue
            }
            valid.push(file)
        }
        setMediaFiles(prev => [...prev, ...valid])
    }, [mediaFiles])

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

    // REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzIoHOUMvA5rgy0EZnLGgw5z0_cJVT6W4l2Gt1UIUtDB-ovfHDAvTKKbeEtk7cen9SQ/exec'
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            // Using URLSearchParams is more compatible with GAS e.parameter in no-cors mode
            const params = new URLSearchParams()
            for (const key in formData) {
                params.append(key, formData[key])
            }
            // Attach file names (binary upload not possible in no-cors mode)
            if (mediaFiles.length > 0) {
                params.append('attachments', mediaFiles.map(f => f.name).join(', '))
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

                        {/* ── Media Attachment Section ── */}
                        <div className="space-y-3">
                            <label className="text-sm font-black text-tvk-dark uppercase tracking-widest flex items-center gap-2">
                                <Paperclip size={15} /> Supporting Media <span className="font-normal normal-case opacity-50 tracking-normal">(optional · up to {MAX_FILES} files · {MAX_SIZE_MB} MB each)</span>
                            </label>

                            {/* Drop Zone */}
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
                                    {isDragging ? 'Drop files here…' : 'Click or drag & drop files here'}
                                </p>
                                <p className="text-xs text-tvk-dark/30">Images, videos, PDFs & documents accepted</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                                    className="hidden"
                                    onChange={handleFileInput}
                                />
                            </motion.div>

                            {/* File Error */}
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

                            {/* File Preview List */}
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
                                                {/* Thumbnail for images */}
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
