import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BiographyTimeline from '../components/BiographyTimeline'
import { Target, Lightbulb, ShieldCheck, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

// ── Bio-Img imports ────────────────────────────────────────────────────────────
import bio1 from '../assets/Bio-Img/1.jpeg'
import bio2 from '../assets/Bio-Img/2.jpeg'
import bio3 from '../assets/Bio-Img/3.jpeg'
import bio4 from '../assets/Bio-Img/4.jpeg'
import bio5 from '../assets/Bio-Img/5.jpeg'
import bio6 from '../assets/Bio-Img/6.jpeg'
import bio7 from '../assets/Bio-Img/7.jpeg'
import bio8 from '../assets/Bio-Img/8.jpeg'
import bio9 from '../assets/Bio-Img/9.jpeg'
import bio10 from '../assets/Bio-Img/10.jpeg'
import bio11 from '../assets/Bio-Img/11.jpeg'
import bio12 from '../assets/Bio-Img/12.jpeg'
import bio13 from '../assets/Bio-Img/13.jpeg'
import bio14 from '../assets/Bio-Img/14.jpeg'
import bio15 from '../assets/Bio-Img/15.jpeg'
import bio16 from '../assets/Bio-Img/16.jpeg'
import bio17 from '../assets/Bio-Img/17.jpeg'
import bio18 from '../assets/Bio-Img/18.jpeg'
import bio19 from '../assets/Bio-Img/19.jpeg'
import bio20 from '../assets/Bio-Img/20.jpeg'
import bio21 from '../assets/Bio-Img/21.jpeg'
import bio22 from '../assets/Bio-Img/22.jpeg'
import bio23 from '../assets/Bio-Img/23.jpeg'
import bio24 from '../assets/Bio-Img/24.jpeg'
import bio25 from '../assets/Bio-Img/25.jpeg'
import bio26 from '../assets/Bio-Img/26.jpeg'
import bio27 from '../assets/Bio-Img/27.jpeg'
import bio28 from '../assets/Bio-Img/28.jpeg'
import bio29 from '../assets/Bio-Img/29.jpeg'
import bio30 from '../assets/Bio-Img/30.jpeg'
import bio31 from '../assets/Bio-Img/31.jpeg'
import bio32 from '../assets/Bio-Img/32.jpeg'
import bio33 from '../assets/Bio-Img/33.jpeg'
import bio34 from '../assets/Bio-Img/34.jpeg'
import bio35 from '../assets/Bio-Img/35.jpeg'
import bio36 from '../assets/Bio-Img/36.jpeg'
import bio37 from '../assets/Bio-Img/37.jpeg'
import bio38 from '../assets/Bio-Img/38.jpeg'
import bio39 from '../assets/Bio-Img/39.jpeg'

// ── Gallery data ───────────────────────────────────────────────────────────────
const galleryItems = [
    { id: 1, src: bio1, category: 'Public Life', title: 'Community Engagement — 1', tag: 'Public Life' },
    { id: 2, src: bio2, category: 'Party Events', title: 'TVK Party Event — 2', tag: 'Party Events' },
    { id: 3, src: bio3, category: 'Welfare', title: 'Welfare Initiative — 3', tag: 'Welfare' },
    { id: 4, src: bio4, category: 'Public Life', title: 'Field Visit — 4', tag: 'Public Life' },
    { id: 5, src: bio5, category: 'Party Events', title: 'Party Campaign — 5', tag: 'Party Events' },
    { id: 6, src: bio6, category: 'Welfare', title: 'Aid Programme — 6', tag: 'Welfare' },
    { id: 7, src: bio7, category: 'Public Life', title: 'Public Address — 7', tag: 'Public Life' },
    { id: 8, src: bio8, category: 'Party Events', title: 'Constituency Meet — 8', tag: 'Party Events' },
    { id: 9, src: bio9, category: 'Welfare', title: 'Community Service — 9', tag: 'Welfare' },
    { id: 10, src: bio10, category: 'Public Life', title: 'Outreach Day — 10', tag: 'Public Life' },
    { id: 11, src: bio11, category: 'Party Events', title: 'Cultural Event — 11', tag: 'Party Events' },
    { id: 12, src: bio12, category: 'Welfare', title: 'Medical Camp — 12', tag: 'Welfare' },
    { id: 13, src: bio13, category: 'Public Life', title: 'Public Gathering — 13', tag: 'Public Life' },
    { id: 14, src: bio14, category: 'Party Events', title: 'Party Rally — 14', tag: 'Party Events' },
    { id: 15, src: bio15, category: 'Welfare', title: 'Scheme Distribution — 15', tag: 'Welfare' },
    { id: 16, src: bio16, category: 'Public Life', title: 'Interactive Session — 16', tag: 'Public Life' },
    { id: 17, src: bio17, category: 'Party Events', title: 'State Conference — 17', tag: 'Party Events' },
    { id: 18, src: bio18, category: 'Welfare', title: 'Youth Drive — 18', tag: 'Welfare' },
    { id: 19, src: bio19, category: 'Public Life', title: 'Grassroots Connect — 19', tag: 'Public Life' },
    { id: 20, src: bio20, category: 'Party Events', title: 'Inauguration Ceremony — 20', tag: 'Party Events' },
    { id: 21, src: bio21, category: 'Welfare', title: 'Women Empowerment — 21', tag: 'Welfare' },
    { id: 22, src: bio22, category: 'Public Life', title: 'Community Dialogue — 22', tag: 'Public Life' },
    { id: 23, src: bio23, category: 'Party Events', title: 'Membership Drive — 23', tag: 'Party Events' },
    { id: 24, src: bio24, category: 'Welfare', title: 'Awareness Camp — 24', tag: 'Welfare' },
    { id: 25, src: bio25, category: 'Public Life', title: 'Constituency Walk — 25', tag: 'Public Life' },
    { id: 26, src: bio26, category: 'Party Events', title: 'Campaign Launch — 26', tag: 'Party Events' },
    { id: 27, src: bio27, category: 'Welfare', title: 'Relief Distribution — 27', tag: 'Welfare' },
    { id: 28, src: bio28, category: 'Public Life', title: 'Civic Dialogue — 28', tag: 'Public Life' },
    { id: 29, src: bio29, category: 'Party Events', title: 'TVK Meet — 29', tag: 'Party Events' },
    { id: 30, src: bio30, category: 'Welfare', title: 'Health Initiative — 30', tag: 'Welfare' },
    { id: 31, src: bio31, category: 'Public Life', title: 'Street Meeting — 31', tag: 'Public Life' },
    { id: 32, src: bio32, category: 'Party Events', title: 'District Conference — 32', tag: 'Party Events' },
    { id: 33, src: bio33, category: 'Welfare', title: 'Education Support — 33', tag: 'Welfare' },
    { id: 34, src: bio34, category: 'Public Life', title: 'Public Felicitation — 34', tag: 'Public Life' },
    { id: 35, src: bio35, category: 'Party Events', title: 'Awareness Rally — 35', tag: 'Party Events' },
    { id: 36, src: bio36, category: 'Welfare', title: 'Aid Camp — 36', tag: 'Welfare' },
    { id: 37, src: bio37, category: 'Public Life', title: 'Leadership Meet — 37', tag: 'Public Life' },
    { id: 38, src: bio38, category: 'Party Events', title: 'Velachery Event — 38', tag: 'Party Events' },
    { id: 39, src: bio39, category: 'Welfare', title: 'Community Aid — 39', tag: 'Welfare' },
]

const CATEGORIES = ['All', 'Public Life', 'Party Events', 'Welfare']

// ── Bio Lightbox ───────────────────────────────────────────────────────────────
const BioLightbox = ({ items, index, onClose, onPrev, onNext }) => {
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
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/93 backdrop-blur-xl p-4"
            onClick={onClose}
        >
            {/* Close */}
            <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 }}
                onClick={onClose}
                className="absolute top-5 right-5 w-11 h-11 bg-white/10 hover:bg-tvk-red text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
                <X size={20} />
            </motion.button>

            {/* Prev */}
            <motion.button
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 }}
                onClick={(e) => { e.stopPropagation(); onPrev() }}
                className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-tvk-red text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
                <ChevronLeft size={24} />
            </motion.button>

            {/* Next */}
            <motion.button
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 }}
                onClick={(e) => { e.stopPropagation(); onNext() }}
                className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-tvk-red text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
                <ChevronRight size={24} />
            </motion.button>

            {/* Image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.93, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: -16 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="relative max-w-5xl w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={item.src}
                        alt={item.title}
                        className="w-full max-h-[78vh] object-contain rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                    />
                    {/* Caption bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl px-6 py-5">
                        <span className="text-[11px] font-black text-tvk-yellow uppercase tracking-widest">{item.tag}</span>
                        <p className="text-white font-bold text-lg mt-0.5">{item.title}</p>
                        <p className="text-white/40 text-sm mt-1">{index + 1} / {items.length}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dot strip */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-sm">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => e.stopPropagation()}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-tvk-red w-5' : 'bg-white/25 w-1.5'}`}
                    />
                ))}
            </div>
        </motion.div>
    )
}

// ── Page ───────────────────────────────────────────────────────────────────────
const Biography = () => {
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
            {/* ── Bio Header ── */}
            <section className="container mx-auto px-4 md:px-6 mb-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full md:w-1/3 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative"
                    >
                        <img
                            src="/prasannatvk-bio.jpeg"
                            alt="TVK Candidate Mr. S. Prasanna"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-tvk-yellow text-tvk-red font-bold px-4 py-1 rounded-full text-xs uppercase tracking-tighter">
                            A Leader for All
                        </div>
                    </motion.div>

                    <div className="w-full md:w-2/3">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="bg-tvk-red/10 text-tvk-red font-black px-4 py-1 rounded-lg text-sm uppercase">Age: 35</span>
                            <span className="bg-tvk-red/10 text-tvk-red font-black px-4 py-1 rounded-lg text-sm uppercase">Father's Name: Mr. L. Sekar</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-tvk-dark leading-tight">
                            Mr. S. <span className="text-tvk-red italic">Prasanna</span>
                        </h1>
                        <p className="text-xl text-tvk-dark/80 mb-8 leading-relaxed font-medium">
                            A dynamic entrepreneur and committed social activist with over 15 years of experience in the premium automobile industry.
                        </p>
                        <p className="text-tvk-dark/60 leading-relaxed mb-10">
                            Operating under the leadership of his business <strong>AUTO BOURN</strong> in Velachery, Mr. Prasanna has built a reputation for trust, transparency, and excellence. His journey reflects a perfect blend of professional success and a deep-rooted commitment to public welfare and social justice.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { label: "Business Experience", value: "15+ Years" },
                                { label: "Premium Vehicles Sold", value: "5000+" },
                                { label: "New Party Members", value: "500+" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border-2 border-tvk-red/5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col items-center group hover:border-tvk-yellow/30 transition-colors">
                                    <p className="text-tvk-red font-black text-3xl mb-1 group-hover:scale-110 transition-transform">{stat.value}</p>
                                    <p className="text-tvk-dark/50 text-xs font-black uppercase tracking-widest text-center">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Timeline ── */}
            <section className="bg-white py-24 border-y border-tvk-red/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-tvk-red/5 blur-[120px] -z-10 pointer-events-none" />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-tvk-dark">Social <span className="text-tvk-red italic">Impact</span></h2>
                        <div className="w-24 h-2 bg-tvk-yellow mx-auto mb-6 rounded-full" />
                        <p className="text-tvk-dark/60 font-medium text-lg">A consistent record of grassroots development and public engagement.</p>
                    </div>
                    <BiographyTimeline />
                </div>
            </section>

            {/* ── Vision ── */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <Target />, title: "Vision", desc: "Generating youth employment and supporting small/micro businesses to build a self-reliant Tamil Nadu." },
                            { icon: <Lightbulb />, title: "Mission", desc: "Action-driven resolution of public grievances and improving core infrastructure like drinking water accessibility." },
                            { icon: <ShieldCheck />, title: "Philosophy", desc: "Service with Commitment. Leadership with Responsibility. Politics with Purpose." },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-20 h-20 bg-tvk-red/10 rounded-3xl flex items-center justify-center text-tvk-red mx-auto mb-8 group-hover:bg-tvk-red group-hover:text-white transition-all duration-300">
                                    {React.cloneElement(item.icon, { size: 40 })}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-tvk-dark/60 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Leader Section ── */}
            <section className="bg-white py-32 text-tvk-dark overflow-hidden relative border-t border-tvk-red/5">
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-tvk-yellow/5 blur-[120px] pointer-events-none -z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-tvk-red/5 blur-[100px] pointer-events-none -z-10" />
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl md:text-6xl font-black mb-10 text-tvk-red leading-tight">Politics with <span className="text-tvk-dark italic">Purpose</span></h2>
                            <p className="text-tvk-dark/70 text-xl leading-relaxed mb-10 font-medium italic border-l-4 border-tvk-yellow pl-8">
                                "Our strength lies in our field-level participation and our ability to mobilize for the common good. We lead through action and accountability."
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-2 bg-tvk-red rounded-full" />
                                <span className="font-black text-2xl uppercase tracking-widest text-tvk-dark/40">The Leadership Vision</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-tvk-yellow/10 rounded-full blur-2xl" />
                                <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border-[12px] border-white overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative z-10 bg-gray-50">
                                    <img src="/thalapathy.png" alt="Thalapathy Vijay" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-tvk-red/5 to-transparent pointer-events-none" />
                                </div>
                                <div className="absolute -inset-8 border border-tvk-red/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                ── IMMERSIVE GALLERY ──
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-32 bg-tvk-dark relative overflow-hidden">
                {/* Ambient glows */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-tvk-red/10 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-tvk-yellow/5 blur-[140px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">

                    {/* Section header */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs font-black text-tvk-yellow uppercase tracking-[0.35em] mb-4"
                        >
                            Life in Pictures
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.06 }}
                            className="text-4xl md:text-5xl font-extrabold text-white mb-5"
                        >
                            The <span className="text-tvk-red">Journey</span> Gallery
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.12 }}
                            className="text-white/50 text-lg leading-relaxed"
                        >
                            From grassroots campaigns to party events — an intimate visual record of Mr. S. Prasanna's public life and leadership.
                        </motion.p>
                    </div>

                    {/* Filter tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 mb-14"
                    >
                        {CATEGORIES.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => { setActiveCategory(cat); setLightboxIndex(null) }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                                className={`relative px-7 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-tvk-red text-white shadow-[0_6px_24px_rgba(145,9,5,0.5)]'
                                        : 'bg-white/8 text-white/50 hover:bg-white/15 hover:text-white border border-white/10'
                                    }`}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <motion.span
                                        layoutId="bioCat"
                                        className="absolute inset-0 bg-tvk-red rounded-full -z-10"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Masonry grid */}
                    <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.85, y: 24 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.85 }}
                                    transition={{ duration: 0.32, delay: idx * 0.03, ease: 'easeOut' }}
                                    className="group relative rounded-xl overflow-hidden cursor-pointer break-inside-avoid ring-1 ring-white/5 hover:ring-tvk-red/40 transition-all duration-500"
                                    onClick={() => openLightbox(idx)}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            whileHover={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <span className="text-[10px] font-black text-tvk-yellow uppercase tracking-widest">{item.tag}</span>
                                            <p className="text-white font-bold text-sm mt-0.5 leading-snug">{item.title}</p>
                                        </motion.div>
                                        <div className="absolute top-3 right-3 w-8 h-8 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center">
                                            <ZoomIn size={14} className="text-white" />
                                        </div>
                                    </div>

                                    {/* Category chip */}
                                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {item.category}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filtered.length === 0 && (
                        <p className="text-center text-white/30 mt-16 font-bold">No photos in this category.</p>
                    )}

                    {/* Photo count */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-white/25 text-sm font-bold mt-10 uppercase tracking-widest"
                    >
                        {filtered.length} Photo{filtered.length !== 1 ? 's' : ''}
                    </motion.p>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <BioLightbox
                        items={filtered}
                        index={lightboxIndex}
                        onClose={closeLightbox}
                        onPrev={prevPhoto}
                        onNext={nextPhoto}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Biography
