import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { useLanguage } from '../context/LanguageContext'
import { blogService } from '../services/blogService'
import {
    Plus, X, Upload, Image as ImageIcon, FileText, Clock, User,
    ChevronRight, Trash2, Edit3, Eye, Calendar, Tag, Search,
    BookOpen, PenTool, ArrowRight, Sparkles
} from 'lucide-react'

// ── Blog Storage (localStorage-based for offline/demo mode) ─────────────────
export const STORAGE_KEY = 'tvk_blogs'

export const loadBlogs = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

export const saveBlogs = (blogs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs))
}

// ── Blog Card Component ─────────────────────────────────────────────────────
export const BlogCard = ({ blog, language, onDelete, isAdminView = false }) => {
    const date = new Date(blog.createdAt)
    const formattedDate = date.toLocaleDateString(language === 'en' ? 'en-IN' : 'ta-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
    })

    const coverImage = blog.image || (blog.images && blog.images.length > 0 ? blog.images[0] : null)

    return (
        <Link 
            to={`/blogs/${blog.id}`}
            className="block group"
        >
            <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="h-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(145,9,5,0.12)] border border-gray-100 hover:border-tvk-red/20 transition-all duration-500 flex flex-col"
            >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10] shrink-0 bg-slate-100">
                    {coverImage ? (
                        <img
                            src={coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-tvk-red/10 via-red-50 to-yellow-50 flex items-center justify-center">
                            <BookOpen size={48} className="text-tvk-red/20" />
                        </div>
                    )}
                    {/* Category Tag */}
                    {blog.category && (
                        <span className="absolute top-3 left-3 bg-tvk-red text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            {blog.category}
                        </span>
                    )}
                    {/* Delete button (only for admin view) */}
                    {isAdminView && (
                        <button
                            type="button"
                            onClick={(e) => { 
                                e.preventDefault(); 
                                e.stopPropagation(); 
                                onDelete(blog.id); 
                            }}
                            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md z-10"
                            title={language === 'en' ? 'Delete' : 'நீக்கு'}
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 text-xs text-tvk-dark/50 mb-3">
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-1 font-semibold">
                                <User size={12} />
                                {blog.author || 'S. Prasanna'}
                            </span>
                        </div>

                        <h3 
                            className="text-lg font-bold text-tvk-dark mb-2 group-hover:text-tvk-red transition-colors duration-300 line-clamp-2"
                            style={{ fontFamily: "'Noto Sans Tamil', 'Inter', sans-serif", lineHeight: '1.5' }}
                        >
                            {blog.title}
                        </h3>

                        <p className="text-sm text-tvk-dark/60 leading-relaxed line-clamp-3 mb-4">
                            {blog.content}
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-tvk-red text-sm font-bold hover:gap-3 transition-all duration-300 mt-2">
                        {language === 'en' ? 'Read More' : 'மேலும் படிக்க'}
                        <ArrowRight size={14} />
                    </div>
                </div>
            </motion.article>
        </Link>
    )
}

// ── Blog Detail Modal ───────────────────────────────────────────────────────
export const BlogDetailModal = ({ blog, language, onClose }) => {
    if (!blog) return null

    const date = new Date(blog.createdAt)
    const formattedDate = date.toLocaleDateString(language === 'en' ? 'en-IN' : 'ta-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
    })

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-tvk-dark hover:bg-tvk-red hover:text-white transition-all shadow-md"
                >
                    <X size={18} />
                </button>

                {/* Image */}
                {blog.image && (
                    <div className="w-full aspect-[16/9] overflow-hidden">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content */}
                <div className="p-8 md:p-10">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-tvk-dark/50 mb-4">
                        {blog.category && (
                            <span className="bg-tvk-red/10 text-tvk-red font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                <Tag size={10} />
                                {blog.category}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formattedDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <User size={12} />
                            {blog.author || 'S. Prasanna'}
                        </span>
                    </div>

                    <h1 
                        className="text-2xl md:text-3xl font-black text-tvk-dark mb-6"
                        style={{ fontFamily: "'Noto Sans Tamil', 'Inter', sans-serif", lineHeight: '1.5' }}
                    >
                        {blog.title}
                    </h1>

                    <div className="prose prose-lg max-w-none text-tvk-dark/75 leading-relaxed whitespace-pre-wrap">
                        {blog.content}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export const CreateBlogForm = ({ language, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [author, setAuthor] = useState('')
    const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0])
    
    // Split image uploads
    const [coverImage, setCoverImage] = useState(null)
    const [eventPhotos, setEventPhotos] = useState([])
    
    const [isDraggingCover, setIsDraggingCover] = useState(false)
    const [isDraggingEvents, setIsDraggingEvents] = useState(false)
    
    const coverInputRef = useRef(null)
    const eventsInputRef = useRef(null)

    const handleCoverSelect = useCallback((file) => {
        if (!file || !file.type.startsWith('image/')) return
        if (file.size > 5 * 1024 * 1024) {
            alert(language === 'en' ? 'Cover image must be under 5MB' : 'அட்டை படம் 5MB-க்கும் குறைவாக இருக்க வேண்டும்')
            return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
            setCoverImage(e.target.result)
        }
        reader.readAsDataURL(file)
    }, [language])

    const handleEventsSelect = useCallback((files) => {
        if (!files || files.length === 0) return
        const fileArray = Array.from(files)
        const validFiles = fileArray.filter(file => file.type.startsWith('image/'))

        validFiles.forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                alert(language === 'en' ? `Event photo "${file.name}" must be under 5MB` : `நிகழ்வு படம் "${file.name}" 5MB-க்கும் குறைவாக இருக்க வேண்டும்`)
                return
            }
            const reader = new FileReader()
            reader.onload = (e) => {
                setEventPhotos(prev => [...prev, e.target.result])
            }
            reader.readAsDataURL(file)
        })
    }, [language])

    const removeEventPhoto = (idxToRemove) => {
        setEventPhotos(prev => prev.filter((_, idx) => idx !== idxToRemove))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) return

        onSubmit({
            id: Date.now().toString(),
            title: title.trim(),
            content: content.trim(),
            category: category.trim() || null,
            author: author.trim() || 'S. Prasanna',
            image: coverImage,
            images: eventPhotos,
            createdAt: customDate ? new Date(customDate).toISOString() : new Date().toISOString()
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8 px-4"
            onClick={onCancel}
        >
            <motion.form
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-tvk-red to-red-700 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <PenTool size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black">
                                {language === 'en' ? 'Create New Blog Post' : 'புதிய வலைப்பதிவு உருவாக்கவும்'}
                            </h2>
                            <p className="text-white/70 text-xs">
                                {language === 'en' ? 'Share your thoughts with the community' : 'சமூகத்துடன் உங்கள் எண்ணங்களைப் பகிரவும்'}
                            </p>
                        </div>
                    </div>
                    <button type="button" onClick={onCancel} className="text-white/80 hover:text-white transition-colors">
                        <X size={22} />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-5">
                    {/* Double Upload Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 1. Cover Image Section */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-tvk-dark/70 uppercase tracking-wider">
                                {language === 'en' ? 'Cover Image' : 'அட்டை படம்'}
                            </label>
                            <div
                                className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 min-h-[140px] flex flex-col items-center justify-center p-3 cursor-pointer overflow-hidden ${
                                    isDraggingCover ? 'border-tvk-red bg-tvk-red/5' : 'border-gray-200 hover:border-tvk-red/40'
                                }`}
                                onClick={() => coverInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setIsDraggingCover(true) }}
                                onDragLeave={() => setIsDraggingCover(false)}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    setIsDraggingCover(false)
                                    if (e.dataTransfer.files?.[0]) handleCoverSelect(e.dataTransfer.files[0])
                                }}
                            >
                                {coverImage ? (
                                    <div className="absolute inset-0 group">
                                        <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-bold text-xs">
                                                {language === 'en' ? 'Change Cover' : 'அட்டையை மாற்றவும்'}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setCoverImage(null) }}
                                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow hover:bg-red-600 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center flex flex-col items-center gap-1.5">
                                        <div className="w-9 h-9 bg-tvk-red/10 rounded-xl flex items-center justify-center">
                                            <Upload size={16} className="text-tvk-red" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-tvk-dark">
                                                {language === 'en' ? 'Upload Cover Image' : 'அட்டை படம் பதிவேற்றவும்'}
                                            </p>
                                            <p className="text-[10px] text-tvk-dark/40 mt-0.5">
                                                {language === 'en' ? 'Click or drag & drop (Max 5MB)' : 'கிளிக் செய்யவும் அல்லது இழுக்கவும்'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <input
                                    ref={coverInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => { if (e.target.files?.[0]) handleCoverSelect(e.target.files[0]); e.target.value = '' }}
                                />
                            </div>
                        </div>

                        {/* 2. Event Photos Section */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-tvk-dark/70 uppercase tracking-wider">
                                {language === 'en' ? 'Event Photos' : 'நிகழ்வு புகைப்படங்கள்'}
                            </label>
                            <div
                                className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 min-h-[140px] p-3 ${
                                    isDraggingEvents ? 'border-tvk-red bg-tvk-red/5' : 'border-gray-200 hover:border-tvk-red/40'
                                }`}
                                onDragOver={(e) => { e.preventDefault(); setIsDraggingEvents(true) }}
                                onDragLeave={() => setIsDraggingEvents(false)}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    setIsDraggingEvents(false)
                                    if (e.dataTransfer.files) handleEventsSelect(e.dataTransfer.files)
                                }}
                            >
                                {eventPhotos.length > 0 ? (
                                    <div className="space-y-2.5">
                                        <div className="grid grid-cols-4 gap-2 max-h-[85px] overflow-y-auto p-0.5">
                                            {eventPhotos.map((img, idx) => (
                                                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                                                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeEventPhoto(idx)}
                                                            className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                                        >
                                                            <X size={10} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="button"
                                                onClick={() => eventsInputRef.current?.click()}
                                                className="inline-flex items-center gap-1 text-[10px] text-tvk-red font-bold hover:text-red-700 transition-colors"
                                            >
                                                <Plus size={12} />
                                                {language === 'en' ? 'Add Event Photos' : 'புகைப்படங்களைச் சேர்க்கவும்'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div 
                                        className="h-full flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer py-4"
                                        onClick={() => eventsInputRef.current?.click()}
                                    >
                                        <div className="w-9 h-9 bg-tvk-red/10 rounded-xl flex items-center justify-center">
                                            <Plus size={16} className="text-tvk-red" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-tvk-dark">
                                                {language === 'en' ? 'Upload Event Photos' : 'நிகழ்வு புகைப்படங்கள்'}
                                            </p>
                                            <p className="text-[10px] text-tvk-dark/40 mt-0.5">
                                                {language === 'en' ? 'Upload multiple pictures' : 'பல படங்களை பதிவேற்றவும்'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <input
                                    ref={eventsInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => { if (e.target.files) handleEventsSelect(e.target.files); e.target.value = '' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-bold text-tvk-dark/70 mb-1.5 uppercase tracking-wider">
                            {language === 'en' ? 'Blog Title' : 'வலைப்பதிவு தலைப்பு'} *
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={language === 'en' ? 'Enter a compelling title...' : 'ஒரு கவர்ச்சியான தலைப்பை உள்ளிடவும்...'}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tvk-red focus:ring-2 focus:ring-tvk-red/10 outline-none text-tvk-dark font-semibold transition-all"
                            required
                        />
                    </div>

                    {/* Category, Author & Date Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-tvk-dark/70 mb-1.5 uppercase tracking-wider">
                                {language === 'en' ? 'Category' : 'வகை'}
                            </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder={language === 'en' ? 'e.g. Community' : 'எ.கா. சமூகம்'}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tvk-red focus:ring-2 focus:ring-tvk-red/10 outline-none text-sm transition-all font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-tvk-dark/70 mb-1.5 uppercase tracking-wider">
                                {language === 'en' ? 'Author' : 'ஆசிரியர்'}
                            </label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="S. Prasanna"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tvk-red focus:ring-2 focus:ring-tvk-red/10 outline-none text-sm transition-all font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-tvk-dark/70 mb-1.5 uppercase tracking-wider">
                                {language === 'en' ? 'Publish Date' : 'வெளியிடப்பட்ட தேதி'}
                            </label>
                            <input
                                type="date"
                                value={customDate}
                                onChange={(e) => setCustomDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tvk-red focus:ring-2 focus:ring-tvk-red/10 outline-none text-sm transition-all font-semibold"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-xs font-bold text-tvk-dark/70 mb-1.5 uppercase tracking-wider">
                            {language === 'en' ? 'Blog Content' : 'வலைப்பதிவு உள்ளடக்கம்'} *
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={language === 'en' ? 'Write your blog content here...' : 'உங்கள் வலைப்பதிவு உள்ளடக்கத்தை இங்கே எழுதவும்...'}
                            rows={8}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tvk-red focus:ring-2 focus:ring-tvk-red/10 outline-none text-sm leading-relaxed resize-none transition-all"
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-200 text-tvk-dark/70 font-bold text-sm hover:bg-gray-50 transition-all"
                        >
                            {language === 'en' ? 'Cancel' : 'ரத்து செய்'}
                        </button>
                        <button
                            type="submit"
                            disabled={!title.trim() || !content.trim()}
                            className="flex-1 py-3 px-6 rounded-xl bg-tvk-red text-white font-bold text-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            <Sparkles size={16} />
                            {language === 'en' ? 'Publish Blog' : 'வலைப்பதிவை வெளியிடு'}
                        </button>
                    </div>
                </div>
            </motion.form>
        </motion.div>
    )
}

// ── Empty State ─────────────────────────────────────────────────────────────
export const EmptyState = ({ language, onCreate }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
    >
        <div className="w-24 h-24 bg-tvk-red/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <BookOpen size={40} className="text-tvk-red/40" />
        </div>
        <h3 className="text-2xl font-black text-tvk-dark mb-3">
            {language === 'en' ? 'No Blog Posts Yet' : 'இதுவரை வலைப்பதிவுகள் இல்லை'}
        </h3>
        <p className="text-tvk-dark/50 text-sm max-w-md mx-auto mb-8">
            {language === 'en'
                ? (onCreate 
                    ? 'Start sharing your thoughts, updates, and community stories. Click below to create your first blog post.' 
                    : 'Check back soon for updates, community stories, and official announcements.')
                : (onCreate
                    ? 'உங்கள் எண்ணங்கள், புதுப்பிப்புகள் மற்றும் சமூகக் கதைகளைப் பகிரத் தொடங்குங்கள்.'
                    : 'சமீபத்திய செய்திகள், புதுப்பிப்புகள் மற்றும் அறிவிப்புகளுக்கு விரைவில் மீண்டும் சரிபார்க்கவும்.')}
        </p>
        {onCreate && (
            <button
                onClick={onCreate}
                className="inline-flex items-center gap-2 bg-tvk-red text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-tvk-red/20"
            >
                <Plus size={18} />
                {language === 'en' ? 'Create First Blog' : 'முதல் வலைப்பதிவை உருவாக்கவும்'}
            </button>
        )}
    </motion.div>
)

// ── Main Blogs Page ─────────────────────────────────────────────────────────
const Blogs = () => {
    const { language } = useLanguage()
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedBlog, setSelectedBlog] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        let isMounted = true
        const fetchBlogs = async () => {
            try {
                const data = await blogService.getBlogs()
                if (isMounted) {
                    setBlogs(data)
                }
            } catch (err) {
                console.error('Failed to load blogs:', err)
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }
        fetchBlogs()
        return () => {
            isMounted = false
        }
    }, [])

    const filteredBlogs = blogs.filter(blog => {
        if (!searchQuery.trim()) return true
        const q = searchQuery.toLowerCase()
        return (
            blog.title.toLowerCase().includes(q) ||
            blog.content.toLowerCase().includes(q) ||
            (blog.category && blog.category.toLowerCase().includes(q))
        )
    })

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white">
            <SEO
                title={language === 'en' ? 'Blogs | Prasanna TVK' : 'வலைப்பதிவுகள் | பிரசன்னா TVK'}
                url="/blogs"
                description={language === 'en'
                    ? 'Read the latest blogs, updates, and community stories from Prasanna TVK.'
                    : 'பிரசன்னா TVK இன் சமீபத்திய வலைப்பதிவுகள், புதுப்பிப்புகள் மற்றும் சமூகக் கதைகளைப் படிக்கவும்.'}
            />

            {/* Hero Header */}
            <section className="relative pt-28 md:pt-32 pb-16 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50/30" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-tvk-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 bg-tvk-red/10 text-tvk-red text-xs font-bold px-4 py-2 rounded-full mb-4">
                            <BookOpen size={14} />
                            {language === 'en' ? 'OUR BLOG' : 'எங்கள் வலைப்பதிவு'}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-tvk-dark leading-tight mb-4">
                            {language === 'en' ? (
                                <>Latest <span className="text-tvk-red">Updates</span> & Stories</>
                            ) : (
                                <>சமீபத்திய <span className="text-tvk-red">புதுப்பிப்புகள்</span> & கதைகள்</>
                            )}
                        </h1>
                        <p className="text-tvk-dark/50 text-sm md:text-base leading-relaxed">
                            {language === 'en'
                                ? 'Stay informed about our community initiatives, events, and development updates from Sholinganallur.'
                                : 'சோலிங்கநல்லூரின் சமூக முன்முயற்சிகள், நிகழ்வுகள் மற்றும் வளர்ச்சி புதுப்பிப்புகள் பற்றி தெரிந்து கொள்ளுங்கள்.'}
                        </p>
                    </motion.div>

                    {/* Search Row */}
                    <div className="flex items-center gap-3 max-w-xl mx-auto mt-8">
                        <div className="relative flex-1 w-full">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-tvk-dark/30" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={language === 'en' ? 'Search blogs...' : 'வலைப்பதிவுகளைத் தேடவும்...'}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-tvk-red focus:ring-2 focus:ring-tvk-red/10 outline-none text-sm transition-all bg-white font-semibold"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="pb-20">
                <div className="container mx-auto px-4 md:px-6">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] animate-pulse flex flex-col h-full">
                                    <div className="aspect-[16/10] bg-slate-200" />
                                    <div className="p-5 md:p-6 flex-grow flex flex-col justify-between space-y-4">
                                        <div className="space-y-3">
                                            <div className="h-3 bg-slate-200 rounded w-1/3 mb-1" />
                                            <div className="h-5 bg-slate-200 rounded w-3/4 mb-1" />
                                            <div className="space-y-2">
                                                <div className="h-3 bg-slate-200 rounded w-full" />
                                                <div className="h-3 bg-slate-200 rounded w-5/6" />
                                            </div>
                                        </div>
                                        <div className="h-4 bg-slate-200 rounded w-1/4 mt-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        searchQuery ? (
                            <div className="text-center py-16">
                                <Search size={40} className="text-tvk-dark/15 mx-auto mb-4" />
                                <p className="text-tvk-dark/50 text-sm">
                                    {language === 'en' ? 'No blogs found matching your search.' : 'உங்கள் தேடலுக்குப் பொருந்தும் வலைப்பதிவுகள் இல்லை.'}
                                </p>
                            </div>
                        ) : (
                            <EmptyState language={language} />
                        )
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredBlogs.map(blog => (
                                <BlogCard
                                    key={blog.id}
                                    blog={blog}
                                    language={language}
                                    onView={setSelectedBlog}
                                    isAdminView={false}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <AnimatePresence>
                {selectedBlog && (
                    <BlogDetailModal
                        blog={selectedBlog}
                        language={language}
                        onClose={() => setSelectedBlog(null)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Blogs
