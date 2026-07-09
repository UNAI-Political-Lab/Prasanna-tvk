import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft, Calendar, User, Tag, BookOpen, ChevronLeft, ChevronRight,
    MessageSquare, Share2, Facebook, Twitter, Link as LinkIcon
} from 'lucide-react'
import SEO from '../components/SEO'
import { useLanguage } from '../context/LanguageContext'
import { blogService } from '../services/blogService'

const BlogPostDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { language } = useLanguage()
    const [blog, setBlog] = useState(null)
    const [relatedBlogs, setRelatedBlogs] = useState([])
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true
        const fetchBlogAndRelated = async () => {
            if (isMounted) setLoading(true)
            try {
                const foundBlog = await blogService.getBlogById(id)
                if (!isMounted) return

                if (foundBlog) {
                    setBlog(foundBlog)
                    setActiveImageIndex(0)
                    
                    const allBlogs = await blogService.getBlogs()
                    if (!isMounted) return

                    // Find related blogs (same category first, or just recent ones, excluding current)
                    const others = allBlogs.filter(b => b.id !== id)
                    let related = others.filter(b => b.category && b.category === foundBlog.category)
                    if (related.length < 3) {
                        const remaining = others.filter(b => !related.includes(b))
                        related = [...related, ...remaining].slice(0, 3)
                    }
                    setRelatedBlogs(related)
                } else {
                    setBlog(null)
                }
            } catch (err) {
                console.error('Failed to load blog detail:', err)
                if (isMounted) setBlog(null)
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        fetchBlogAndRelated()
        return () => {
            isMounted = false
        }
    }, [id])

    // Scroll to top on load or post change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [id])

    // Auto carousel effect for event photos
    useEffect(() => {
        if (!blog) return
        const hasImages = blog.images && blog.images.length > 0
        const blogImages = hasImages ? blog.images : (blog.image ? [blog.image] : [])
        const imageCount = blogImages.length
        
        if (imageCount <= 1) return

        const interval = setInterval(() => {
            setActiveImageIndex(prev => (prev === imageCount - 1 ? 0 : prev + 1))
        }, 4000)

        return () => clearInterval(interval)
    }, [blog, id])

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 px-4">
                <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-sm w-full">
                    <div className="w-12 h-12 border-4 border-tvk-red border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Loading Blog Post...</p>
                </div>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24 px-4">
                <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
                    <div className="w-16 h-16 bg-tvk-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-tvk-red">
                        <BookOpen size={28} />
                    </div>
                    <h2 className="text-2xl font-black text-tvk-dark mb-2">
                        {language === 'en' ? 'Blog Post Not Found' : 'வலைப்பதிவு காணப்படவில்லை'}
                    </h2>
                    <p className="text-tvk-dark/50 text-sm mb-6">
                        {language === 'en' 
                            ? 'The blog post you are looking for does not exist or has been deleted.' 
                            : 'நீங்கள் தேடும் வலைப்பதிவு இல்லை அல்லது நீக்கப்பட்டுவிட்டது.'}
                    </p>
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 bg-tvk-red text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-md"
                    >
                        <ArrowLeft size={16} />
                        {language === 'en' ? 'Back to Blogs' : 'வலைப்பதிவுகளுக்குச் செல்லவும்'}
                    </Link>
                </div>
            </div>
        )
    }

    const date = new Date(blog.createdAt)
    const formattedDate = date.toLocaleDateString(language === 'en' ? 'en-IN' : 'ta-IN', {
        year: 'numeric', month: 'long', day: 'numeric'
    })

    const hasImages = blog.images && blog.images.length > 0
    const blogImages = hasImages ? blog.images : (blog.image ? [blog.image] : [])

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#FAFAFA] min-h-screen pt-24 pb-20"
        >
            <SEO
                title={`${blog.title} | Prasanna TVK`}
                url={`/blogs/${blog.id}`}
                description={blog.content.substring(0, 150)}
                image={blogImages[0]}
            />

            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                {/* Back Link & Breadcrumb */}
                <div className="flex items-center justify-between mb-6">
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 text-tvk-dark/60 hover:text-tvk-red font-bold text-sm transition-all group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        {language === 'en' ? 'Back to Blogs' : 'வலைப்பதிவுகளுக்குச் செல்லவும்'}
                    </Link>
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-tvk-dark/40 font-bold uppercase tracking-wider">
                        <Link to="/" className="hover:text-tvk-red transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/blogs" className="hover:text-tvk-red transition-colors">Blogs</Link>
                        <span>/</span>
                        <span className="text-tvk-red truncate max-w-[200px]">{blog.title}</span>
                    </div>
                </div>

                {/* Main Content Card */}
                <article className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] overflow-hidden">
                    {/* Header */}
                    <div className="p-6 md:p-10 border-b border-gray-50 bg-gradient-to-b from-gray-50/50 to-transparent">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-tvk-dark/50 mb-4 font-semibold uppercase tracking-wider">
                            {blog.category && (
                                <span className="bg-tvk-red/10 text-tvk-red font-black px-3 py-1 rounded-full flex items-center gap-1">
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
                            className="text-2xl md:text-4xl lg:text-5xl font-bold text-tvk-dark"
                            style={{ fontFamily: "'Noto Sans Tamil', 'Inter', sans-serif", lineHeight: '1.5' }}
                        >
                            {blog.title}
                        </h1>
                    </div>

                    {/* Image Gallery */}
                    {blogImages.length > 0 && (
                        <div className="p-4 md:p-8 bg-gray-50/30 border-b border-gray-50">
                            {/* Main Active Image */}
                            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md bg-slate-900 flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeImageIndex}
                                        src={blogImages[activeImageIndex]}
                                        alt={`${blog.title} - Image ${activeImageIndex + 1}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full object-contain"
                                    />
                                </AnimatePresence>

                                {/* Slide controls if multiple */}
                                {blogImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setActiveImageIndex(prev => (prev === 0 ? blogImages.length - 1 : prev - 1))}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-tvk-red hover:text-white rounded-full flex items-center justify-center text-tvk-dark shadow transition-all"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={() => setActiveImageIndex(prev => (prev === blogImages.length - 1 ? 0 : prev + 1))}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-tvk-red hover:text-white rounded-full flex items-center justify-center text-tvk-dark shadow transition-all"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Thumb Row */}
                            {blogImages.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto mt-4 pb-2 scrollbar-thin">
                                    {blogImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative w-20 md:w-24 aspect-[16/10] rounded-xl overflow-hidden shrink-0 border-2 transition-all shadow-sm ${
                                                activeImageIndex === idx ? 'border-tvk-red scale-[1.03]' : 'border-transparent hover:border-gray-300'
                                            }`}
                                        >
                                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Blog Body Content */}
                    <div className="p-6 md:p-10 lg:p-12">
                        <div className="prose prose-lg max-w-none text-tvk-dark/80 leading-relaxed font-medium whitespace-pre-wrap break-words">
                            {blog.content}
                        </div>

                        {/* Share / Footer Action Area */}
                        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-tvk-dark/40">Share this post:</span>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={handleShare}
                                        className="w-9 h-9 rounded-xl border border-gray-200 hover:border-tvk-red/30 hover:bg-tvk-red/5 flex items-center justify-center text-tvk-dark/60 hover:text-tvk-red transition-all shadow-sm"
                                        title={language === 'en' ? 'Copy Link' : 'இணைப்பை நகலெடு'}
                                    >
                                        <LinkIcon size={16} />
                                    </button>
                                    {copied && (
                                        <span className="text-xs text-emerald-600 font-bold ml-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                                            {language === 'en' ? 'Copied!' : 'நகலெடுக்கப்பட்டது!'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <Link
                                to="/blogs"
                                className="text-xs font-bold uppercase tracking-widest text-tvk-red hover:text-red-700 transition-colors flex items-center gap-1"
                            >
                                {language === 'en' ? '← Back to all posts' : '← அனைத்து இடுகைகளுக்கும்'}
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Related Blogs Section */}
                {relatedBlogs.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-gray-200">
                        <h2 className="text-2xl font-black text-tvk-dark mb-6 text-center md:text-left">
                            {language === 'en' ? 'Related Blog Posts' : 'தொடர்புடைய இடுகைகள்'}
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedBlogs.map(item => {
                                const itemImages = item.images && item.images.length > 0 ? item.images : (item.image ? [item.image] : [])
                                const itemCover = itemImages[0]
                                const itemDate = new Date(item.createdAt).toLocaleDateString(language === 'en' ? 'en-IN' : 'ta-IN', {
                                    year: 'numeric', month: 'short', day: 'numeric'
                                })

                                return (
                                    <Link
                                        key={item.id}
                                        to={`/blogs/${item.id}`}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 hover:border-tvk-red/10 transition-all duration-300 flex flex-col h-full"
                                    >
                                        {/* Image */}
                                        <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                                            {itemCover ? (
                                                <img
                                                    src={itemCover}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <BookOpen size={32} />
                                                </div>
                                            )}
                                            {item.category && (
                                                <span className="absolute top-2.5 left-2.5 bg-tvk-red text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>

                                        {/* Meta */}
                                        <div className="p-4 flex-grow flex flex-col justify-between">
                                            <div>
                                                <div className="text-[10px] text-tvk-dark/45 font-bold uppercase tracking-wider mb-2">
                                                    {itemDate}
                                                </div>
                                                <h3 className="text-sm font-extrabold text-tvk-dark leading-snug line-clamp-2 group-hover:text-tvk-red transition-colors duration-200">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            
                                            <span className="inline-flex items-center gap-1 text-[11px] text-tvk-red font-bold mt-3 group-hover:gap-2 transition-all">
                                                {language === 'en' ? 'Read' : 'படிக்க'} →
                                            </span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default BlogPostDetail
