import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import ServiceCard from '../components/ServiceCard'
import {
    Users, BookOpen, Building2, Heart, Baby,
    GraduationCap, Zap, Globe,
    X, ChevronLeft, ChevronRight, ZoomIn
} from 'lucide-react'

// ── Local image imports ────────────────────────────────────────────────────────
import img1 from '../assets/Service-Img/1.jpeg'
import img2 from '../assets/Service-Img/2.jpeg'
import img3 from '../assets/Service-Img/3.jpeg'
import img4 from '../assets/Service-Img/4.jpeg'
import img5 from '../assets/Service-Img/5.jpeg'
import img6 from '../assets/Service-Img/6.jpeg'
import img7 from '../assets/Service-Img/7.jpeg'
import img8 from '../assets/Service-Img/8.jpeg'
import img9 from '../assets/Service-Img/9.jpeg'
import img10 from '../assets/Service-Img/10.jpeg'
import img11 from '../assets/Service-Img/11.jpeg'
import img12 from '../assets/Service-Img/12.jpeg'
import img13 from '../assets/Service-Img/13.jpeg'
import img14 from '../assets/Service-Img/14.jpeg'
import img15 from '../assets/Service-Img/15.jpeg'
import img16 from '../assets/Service-Img/16.jpeg'
import img17 from '../assets/Service-Img/17.jpeg'
import img18 from '../assets/Service-Img/18.jpeg'
import img19 from '../assets/Service-Img/19.jpeg'
import img20 from '../assets/Service-Img/20.jpeg'
import img21 from '../assets/Service-Img/21.jpeg'

// ── Gallery data ───────────────────────────────────────────────────────────────
const galleryItems = [
    { id: 1, src: img1, category: 'Events', title: 'Public Event — 1', tag: 'Events' },
    { id: 2, src: img2, category: 'Community', title: 'Community Outreach — 2', tag: 'Community' },
    { id: 3, src: img3, category: 'Welfare', title: 'Welfare Drive — 3', tag: 'Welfare' },
    { id: 4, src: img4, category: 'Events', title: 'Public Event — 4', tag: 'Events' },
    { id: 5, src: img5, category: 'Infrastructure', title: 'Infrastructure Work — 5', tag: 'Infrastructure' },
    { id: 6, src: img6, category: 'Community', title: 'Community Meet — 6', tag: 'Community' },
    { id: 7, src: img7, category: 'Welfare', title: 'Health Camp — 7', tag: 'Welfare' },
    { id: 8, src: img8, category: 'Events', title: 'Party Event — 8', tag: 'Events' },
    { id: 9, src: img9, category: 'Community', title: 'Community Programme — 9', tag: 'Community' },
    { id: 10, src: img10, category: 'Welfare', title: 'Aid Distribution — 10', tag: 'Welfare' },
    { id: 11, src: img11, category: 'Infrastructure', title: 'Development Work — 11', tag: 'Infrastructure' },
    { id: 12, src: img12, category: 'Events', title: 'Public Gathering — 12', tag: 'Events' },
    { id: 13, src: img13, category: 'Community', title: 'Outreach Day — 13', tag: 'Community' },
    { id: 14, src: img14, category: 'Welfare', title: 'Medical Camp — 14', tag: 'Welfare' },
    { id: 15, src: img15, category: 'Infrastructure', title: 'Road Project — 15', tag: 'Infrastructure' },
    { id: 16, src: img16, category: 'Events', title: 'Inauguration — 16', tag: 'Events' },
    { id: 17, src: img17, category: 'Community', title: 'Women Empowerment — 17', tag: 'Community' },
    { id: 18, src: img18, category: 'Welfare', title: 'Scheme Distribution — 18', tag: 'Welfare' },
    { id: 19, src: img19, category: 'Events', title: 'Campaign Event — 19', tag: 'Events' },
    { id: 20, src: img20, category: 'Community', title: 'Youth Meet — 20', tag: 'Community' },
    { id: 21, src: img21, category: 'Infrastructure', title: 'Civic Infrastructure — 21', tag: 'Infrastructure' },
]

const CATEGORIES = ['All', 'Events', 'Community', 'Welfare', 'Infrastructure']

// ── Lightbox ───────────────────────────────────────────────────────────────────
const Lightbox = ({ items, index, onClose, onPrev, onNext }) => {
    const item = items[index]

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onPrev()
            if (e.key === 'ArrowRight') onNext()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose, onPrev, onNext])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-lg p-4"
            onClick={onClose}
        >
            {/* Close */}
            <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                onClick={onClose}
                className="absolute top-5 right-5 w-11 h-11 bg-white/10 hover:bg-tvk-red text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
                <X size={20} />
            </motion.button>

            {/* Prev */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => { e.stopPropagation(); onPrev() }}
                className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-tvk-red text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
                <ChevronLeft size={24} />
            </motion.button>

            {/* Next */}
            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => { e.stopPropagation(); onNext() }}
                className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-tvk-red text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
                <ChevronRight size={24} />
            </motion.button>

            {/* Image panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.93, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: -18 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative max-w-5xl w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={item.src}
                        alt={item.title}
                        className="w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent rounded-b-2xl px-6 py-5">
                        <span className="text-[11px] font-black text-tvk-red uppercase tracking-widest">{item.tag}</span>
                        <p className="text-white font-bold text-lg mt-0.5">{item.title}</p>
                        <p className="text-white/40 text-sm mt-1">{index + 1} / {items.length}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dot strip */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-xs">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => e.stopPropagation()}
                        className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-tvk-red w-5' : 'bg-white/25 w-2'}`}
                    />
                ))}
            </div>
        </motion.div>
    )
}

// ── Page ───────────────────────────────────────────────────────────────────────
const Services = () => {
    const services = [
        { icon: <Users />, title: "Public Welfare Support", desc: "Direct assistance for family welfare schemes, pension processing, and emergency aid for those in need." },
        { icon: <GraduationCap />, title: "Youth Empowerment", desc: "Skill development centers, career counseling, and job placement assistance for the younger generation." },
        { icon: <BookOpen />, title: "Education Development", desc: "Supporting government schools with digital infrastructure, library upgrades, and scholarships." },
        { icon: <Building2 />, title: "Infrastructure Improvement", desc: "Advocating for better roads, clean drinking water, and efficient drainage systems in our area." },
        { icon: <Baby />, title: "Women Empowerment", desc: "Financial literacy programs, self-help group support, and vocational training for women." },
        { icon: <Heart />, title: "Healthcare Initiatives", desc: "Regular free medical camps, eye checkups, and facilitating access to quality healthcare for all." },
        { icon: <Zap />, title: "Rural Development", desc: "Smart lighting, sustainable waste management, and agricultural support systems for villages." },
        { icon: <Globe />, title: "Digital Connectivity", desc: "Bringing high-speed internet and digital literacy to rural areas to bridge the technological divide." },
    ]

    const [activeCategory, setActiveCategory] = useState('All')
    const [lightboxIndex, setLightboxIndex] = useState(null)

    const filtered = activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter(g => g.category === activeCategory)

    const openLightbox = (idx) => setLightboxIndex(idx)
    const closeLightbox = useCallback(() => setLightboxIndex(null), [])
    const prevPhoto = useCallback(() => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length), [filtered.length])
    const nextPhoto = useCallback(() => setLightboxIndex(i => (i + 1) % filtered.length), [filtered.length])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 pb-20 bg-white"
        >
            <SEO title="Services & Initiatives" description="Explore the public welfare services, infrastructure projects, and community initiatives led by Prasanna TVK." url="/services" />
            {/* ── Services Grid ── */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold mb-6 text-tvk-dark"
                    >
                        Public <span className="text-tvk-red">Services</span>
                    </motion.h1>
                    <div className="w-24 h-2 bg-tvk-red mx-auto mb-8 rounded-full" />
                    <p className="text-lg text-tvk-dark/60 leading-relaxed">
                        Our commitment is to serve. Explore the various initiatives and support programs designed to improve the quality of life for every citizen in our constituency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ServiceCard {...service} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <section className="mt-24 bg-tvk-dark py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { label: "Business Experience", value: "15+ Yrs" },
                            { label: "Premium Vehicles Sold", value: "5000+" },
                            { label: "Active TVK Members", value: "500+" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center border-l-2 border-tvk-yellow/30 pl-8 first:border-0">
                                <p className="text-5xl font-black text-white mb-2">{stat.value}</p>
                                <p className="text-tvk-yellow/60 font-black uppercase tracking-widest text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Gallery ── */}
            <section className="container mx-auto px-4 md:px-6 mt-32">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-black text-tvk-red uppercase tracking-[0.3em] mb-4"
                    >
                        On The Ground
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-4xl md:text-5xl font-extrabold text-tvk-dark mb-5"
                    >
                        Gallery of <span className="text-tvk-red">Impact</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-tvk-dark/55 text-lg"
                    >
                        A visual record of our work — events, community drives, welfare programmes, and infrastructure across the constituency.
                    </motion.p>
                </div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {CATEGORIES.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setLightboxIndex(null) }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat
                                ? 'bg-tvk-red text-white shadow-[0_6px_20px_rgba(145,9,5,0.3)]'
                                : 'bg-tvk-dark/5 text-tvk-dark/60 hover:bg-tvk-red/10 hover:text-tvk-red'
                                }`}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <motion.span
                                    layoutId="activeCat"
                                    className="absolute inset-0 bg-tvk-red rounded-full -z-10"
                                />
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Photo grid */}
                <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.88 }}
                                transition={{ duration: 0.35, delay: idx * 0.04, ease: 'easeOut' }}
                                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl break-inside-avoid transition-shadow duration-500"
                                onClick={() => openLightbox(idx)}
                            >
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                                    <motion.div
                                        initial={{ y: 12, opacity: 0 }}
                                        whileHover={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.28 }}
                                    >
                                        <span className="text-[10px] font-black text-tvk-red uppercase tracking-widest">{item.tag}</span>
                                        <p className="text-white font-bold text-sm mt-1 leading-snug">{item.title}</p>
                                    </motion.div>
                                    <div className="absolute top-4 right-4 w-9 h-9 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <ZoomIn size={16} className="text-white" />
                                    </div>
                                </div>

                                {/* Category pill */}
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-tvk-dark text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {item.category}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <p className="text-center text-tvk-dark/40 mt-16 font-bold">No photos in this category yet.</p>
                )}
            </section>

            {/* Lightbox portal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        items={filtered}
                        index={lightboxIndex}
                        onClose={closeLightbox}
                        onPrev={prevPhoto}
                        onNext={nextPhoto}
                    />
                )}
            </AnimatePresence>

            {/* ── CTA ── */}
            <section className="container mx-auto px-4 md:px-6 mt-32">
                <div className="bg-tvk-dark border-2 border-tvk-red/10 rounded-[4rem] p-16 md:p-24 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-tvk-yellow/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-tvk-red/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white">
                        Mobilizing for <span className="text-white">Empowerment</span>
                    </h2>
                    <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Mr. S. Prasanna is committed to leveraging his organizational strength to improve infrastructure and ensure immediate resolution of public grievances.
                    </p>
                    <button className="bg-tvk-red text-white font-black py-5 px-12 rounded-2xl shadow-[0_10px_30px_rgba(145,9,5,0.2)] hover:shadow-[0_15px_40px_rgba(145,9,5,0.3)] transition-all transform hover:-translate-y-1.5 text-lg uppercase tracking-widest">
                        Contact Your Representative
                    </button>
                </div>
            </section>
        </motion.div>
    )
}

export default Services
