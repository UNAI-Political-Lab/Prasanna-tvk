import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import ServiceCard from '../components/ServiceCard'
import {
    Users, BookOpen, Building2, Heart, Baby,
    GraduationCap, Zap, Globe,
    X, ChevronLeft, ChevronRight, ZoomIn
} from 'lucide-react'
import JoinTVKCTA from '../components/JoinTVKCTA'
import { useLanguage } from '../context/LanguageContext'

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

// ── Lightbox ───────────────────────────────────────────────────────────────────
const Lightbox = ({ items, index, onClose, onPrev, onNext }) => {
    const item = items[index]
    const { language } = useLanguage()

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onPrev()
            if (e.key === 'ArrowRight') onNext()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose, onPrev, onNext])

    const getLocalTag = (tag) => {
        if (language === 'en') return tag
        if (tag === 'Events') return 'நிகழ்வுகள்'
        if (tag === 'Community') return 'சமூகம்'
        if (tag === 'Welfare') return 'மக்கள் நலம்'
        if (tag === 'Infrastructure') return 'உட்கட்டமைப்பு'
        return tag
    }

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
                        alt={language === 'en' ? item.titleEn : item.titleTa}
                        className="w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent rounded-b-2xl px-6 py-5">
                        <span className="text-[11px] font-black text-tvk-red uppercase tracking-widest">{getLocalTag(item.tag)}</span>
                        <p className="text-white font-bold text-lg mt-0.5">{language === 'en' ? item.titleEn : item.titleTa}</p>
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
    const { language } = useLanguage()
    const [activeCategory, setActiveCategory] = useState('All')
    const [lightboxIndex, setLightboxIndex] = useState(null)

    const services = [
        {
            icon: <Users />,
            title: language === 'en' ? "Public Welfare Support" : "பொது மக்கள் நல உதவி",
            desc: language === 'en'
                ? "Direct assistance for family welfare schemes, fast pension processing, and emergency aid for families in need."
                : "குடும்ப நலத் திட்டங்கள், விரைவான ஓய்வூதியச் செயலாக்கம் மற்றும் தேவைப்படும் குடும்பங்களுக்கான அவசர உதவிகள்."
        },
        {
            icon: <GraduationCap />,
            title: language === 'en' ? "Youth Empowerment" : "இளைஞர் மேம்பாடு",
            desc: language === 'en'
                ? "Skill development centers, career counseling, and job placement assistance for the younger generation in Velachery."
                : "வேளாச்சேரியில் உள்ள இளைய தலைமுறையினருக்கான திறன் மேம்பாட்டு மையங்கள், தொழில் வழிகாட்டுதல் மற்றும் வேலை வாய்ப்பு உதவிகள்."
        },
        {
            icon: <BookOpen />,
            title: language === 'en' ? "Education Development" : "கல்வி வளர்ச்சி",
            desc: language === 'en'
                ? "Supporting government schools with digital infrastructure, libraries, and direct student scholarships."
                : "அரசு பள்ளிகளுக்கு டிஜிட்டல் உள்கட்டமைப்பு, நூலக மேம்பாடு மற்றும் மாணவர்களுக்கான நேரடி கல்வி உதவித்தொகை."
        },
        {
            icon: <Building2 />,
            title: language === 'en' ? "Infrastructure Improvement" : "உட்கட்டமைப்பு மேம்பாடு",
            desc: language === 'en'
                ? "Advocating for roads maintenance, clean drinking water supply, and efficient street light systems."
                : "சிறந்த சாலைகள், சுத்தமான குடிநீர் விநியோகம் மற்றும் முறையான தெருவிளக்கு அமைப்புகளுக்காக பாடுபடுதல்."
        },
        {
            icon: <Baby />,
            title: language === 'en' ? "Women Empowerment" : "பெண்கள் முன்னேற்றம்",
            desc: language === 'en'
                ? "Financial literacy programs, local self-help group guidance, and vocational training for women."
                : "பெண்களுக்கான நிதி விழிப்புணர்வு திட்டங்கள், சுய உதவிக் குழு வழிகாட்டுதல்கள் மற்றும் தொழில்முறை பயிற்சிகள்."
        },
        {
            icon: <Heart />,
            title: language === 'en' ? "Healthcare Initiatives" : "சுகாதாரத் திட்டங்கள்",
            desc: language === 'en'
                ? "Regular free medical camps, eye checkups, and facilitating access to quality government healthcare."
                : "தொடர்ச்சியான இலவச மருத்துவ முகாம்கள், கண் பரிசோதனைகள் மற்றும் தரமான அரசு மருத்துவ வசதிகளைப் பெற்றுத் தருதல்."
        },
        {
            icon: <Zap />,
            title: language === 'en' ? "Constituency Development" : "தொகுதி மேம்பாடு",
            desc: language === 'en'
                ? "Smart street lighting, sustainable waste management, and youth playground support systems."
                : "ஸ்மார்ட் தெருவிளக்குகள், நிலையான கழிவு மேலாண்மை மற்றும் இளைஞர்களுக்கான விளையாட்டு மைதானங்களை உருவாக்குதல்."
        },
        {
            icon: <Globe />,
            title: language === 'en' ? "Digital Connectivity" : "டிஜிட்டல் இணைப்பு",
            desc: language === 'en'
                ? "Bringing high-speed internet centers and free digital literacy programs to youth."
                : "வேகமான இணைய சேவை மையங்கள் மற்றும் இளைஞர்களுக்கான இலவச கணினி விழிப்புணர்வு பயிற்சி திட்டங்களை வழங்குதல்."
        },
    ]

    const galleryItems = [
        { id: 1, src: img1, category: 'Events', titleEn: 'Public Event — 1', titleTa: 'பொது நிகழ்ச்சி — 1', tag: 'Events' },
        { id: 2, src: img2, category: 'Community', titleEn: 'Community Outreach — 2', titleTa: 'சமூக ஈடுபாடு — 2', tag: 'Community' },
        { id: 3, src: img3, category: 'Welfare', titleEn: 'Welfare Drive — 3', titleTa: 'நலத்திட்ட உதவி — 3', tag: 'Welfare' },
        { id: 4, src: img4, category: 'Events', titleEn: 'Public Event — 4', titleTa: 'பொது நிகழ்ச்சி — 4', tag: 'Events' },
        { id: 5, src: img5, category: 'Infrastructure', titleEn: 'Infrastructure Work — 5', titleTa: 'உட்கட்டமைப்பு பணி — 5', tag: 'Infrastructure' },
        { id: 6, src: img6, category: 'Community', titleEn: 'Community Meet — 6', titleTa: 'சமூக சந்திப்பு — 6', tag: 'Community' },
        { id: 7, src: img7, category: 'Welfare', titleEn: 'Health Camp — 7', titleTa: 'மருத்துவ முகாம் — 7', tag: 'Welfare' },
        { id: 8, src: img8, category: 'Events', titleEn: 'Party Event — 8', titleTa: 'கட்சி நிகழ்ச்சி — 8', tag: 'Events' },
        { id: 9, src: img9, category: 'Community', titleEn: 'Community Programme — 9', titleTa: 'சமூக நல நிகழ்ச்சி — 9', tag: 'Community' },
        { id: 10, src: img10, category: 'Welfare', titleEn: 'Aid Distribution — 10', titleTa: 'நல உதவி விநியோகம் — 10', tag: 'Welfare' },
        { id: 11, src: img11, category: 'Infrastructure', titleEn: 'Development Work — 11', titleTa: 'வார்டு மேம்பாட்டுப் பணி — 11', tag: 'Infrastructure' },
        { id: 12, src: img12, category: 'Events', titleEn: 'Public Gathering — 12', titleTa: 'பொதுக்கூட்டம் — 12', tag: 'Events' },
        { id: 13, src: img13, category: 'Community', titleEn: 'Outreach Day — 13', titleTa: 'மக்கள் தொடர்பு நாள் — 13', tag: 'Community' },
        { id: 14, src: img14, category: 'Welfare', titleEn: 'Medical Camp — 14', titleTa: 'இலவச மருத்துவ முகாம் — 14', tag: 'Welfare' },
        { id: 15, src: img15, category: 'Infrastructure', titleEn: 'Road Project — 15', titleTa: 'சாலை அமைக்கும் பணி — 15', tag: 'Infrastructure' },
        { id: 16, src: img16, category: 'Events', titleEn: 'Inauguration — 16', titleTa: 'துவக்க விழா — 16', tag: 'Events' },
        { id: 17, src: img17, category: 'Community', titleEn: 'Women Empowerment — 17', titleTa: 'பெண்கள் மேம்பாட்டு விழா — 17', tag: 'Community' },
        { id: 18, src: img18, category: 'Welfare', titleEn: 'Scheme Distribution — 18', titleTa: 'நலத்திட்ட உதவி வழங்கல் — 18', tag: 'Welfare' },
        { id: 19, src: img19, category: 'Events', titleEn: 'Campaign Event — 19', titleTa: 'தேர்தல் பிரச்சாரக் கூட்டம் — 19', tag: 'Events' },
        { id: 20, src: img20, category: 'Community', titleEn: 'Youth Meet — 20', titleTa: 'இளைஞர்கள் சந்திப்பு — 20', tag: 'Community' },
        { id: 21, src: img21, category: 'Infrastructure', titleEn: 'Civic Infrastructure — 21', titleTa: 'உள்ளூர் உட்கட்டமைப்பு பணி — 21', tag: 'Infrastructure' },
    ]

    const CATEGORIES = language === 'en'
        ? ['All', 'Events', 'Community', 'Welfare', 'Infrastructure']
        : ['அனைத்தும்', 'நிகழ்வுகள்', 'சமூகம்', 'மக்கள் நலம்', 'உட்கட்டமைப்பு']

    const getRawCategory = (cat) => {
        if (cat === 'அனைத்தும்') return 'All'
        if (cat === 'நிகழ்வுகள்') return 'Events'
        if (cat === 'சமூகம்') return 'Community'
        if (cat === 'மக்கள் நலம்') return 'Welfare'
        if (cat === 'உட்கட்டமைப்பு') return 'Infrastructure'
        return cat
    }

    const filtered = activeCategory === 'All' || activeCategory === 'அனைத்தும்'
        ? galleryItems
        : galleryItems.filter(g => g.category === getRawCategory(activeCategory))

    const openLightbox = (idx) => setLightboxIndex(idx)
    const closeLightbox = useCallback(() => setLightboxIndex(null), [])
    const prevPhoto = useCallback(() => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length), [filtered.length])
    const nextPhoto = useCallback(() => setLightboxIndex(i => (i + 1) % filtered.length), [filtered.length])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 md:pt-40 pb-20 bg-white"
        >
            <SEO
                title={language === 'en' ? "Services & Initiatives" : "சேவைகள் & திட்டங்கள் | பிரசன்னா TVK"}
                description={language === 'en'
                    ? "Explore the public welfare services, youth empowerment programs, education drives, and infrastructure improvements spearheaded by Prasanna TVK."
                    : "திரு. S. பிரசன்னா அவர்களின் உள்கட்டமைப்பு மேம்பாடு, சமூக நல திட்டங்கள் மற்றும் மக்கள் சேவைகள் பற்றி அறியவும்."
                }
                url="/services"
            />

            {/* ── Services Grid ── */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-6xl font-extrabold mb-4 md:mb-6 text-tvk-dark"
                    >
                        {language === 'en' ? (
                            <>Public <span className="text-tvk-red">Services</span></>
                        ) : (
                            <>மக்கள் <span className="text-tvk-red">சேவைகள்</span></>
                        )}
                    </motion.h1>
                    <div className="w-20 md:w-24 h-1.5 md:h-2 bg-tvk-red mx-auto mb-6 md:mb-8 rounded-full" />
                    <p className="text-base md:text-lg text-tvk-dark/60 leading-relaxed">
                        {language === 'en'
                            ? "Our commitment is to serve. Explore the various welfare initiatives, youth development, and support programs designed to improve the quality of life for every citizen in our ward."
                            : "சேவையே எங்கள் குறிக்கோள். எமது தொகுதிக்கு உட்பட்ட மக்களின் வாழ்வாதாரத்தை மேம்படுத்தும் வகையில் வடிவமைக்கப்பட்ட மக்கள் நலத்திட்டங்கள் மற்றும் வழிகாட்டுதல்களைப் பற்றி அறிந்துகொள்ளுங்கள்."
                        }
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
            <section className="mt-20 md:mt-24 bg-tvk-dark py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            {
                                label: language === 'en' ? "Business Experience" : "தொழில் அனுபவம்",
                                value: language === 'en' ? "15+ Yrs" : "15+ ஆண்டுகள்"
                            },
                            {
                                label: language === 'en' ? "Premium Vehicles Sold" : "விற்கப்பட்ட வாகனங்கள்",
                                value: "5000+"
                            },
                            {
                                label: language === 'en' ? "Active TVK Members" : "புதிய உறுப்பினர்கள்",
                                value: "500+"
                            },
                        ].map((stat, i) => (
                            <div key={i} className={`text-center border-l-2 border-tvk-yellow/30 pl-4 md:pl-8 first:border-0 ${i === 2 ? 'col-span-2 md:col-span-1 border-l-0 md:border-l-2' : ''}`}>
                                <p className="text-3xl md:text-5xl font-black text-white mb-1 md:mb-2">{stat.value}</p>
                                <p className="text-tvk-yellow/60 font-black uppercase tracking-widest text-[10px] md:text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Gallery ── */}
            <section id="gallery" className="container mx-auto px-4 md:px-6 mt-20 md:mt-32">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-black text-tvk-red uppercase tracking-[0.3em] mb-4"
                    >
                        {language === 'en' ? 'On The Ground' : 'களப்பணி'}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-3xl md:text-5xl font-extrabold text-tvk-dark mb-4 md:mb-5"
                    >
                        {language === 'en' ? (
                            <>Gallery of <span className="text-tvk-red">Impact</span></>
                        ) : (
                            <>தாக்கக் <span className="text-tvk-red">காட்சியகம்</span></>
                        )}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-tvk-dark/55 text-lg"
                    >
                        {language === 'en'
                            ? "A visual record of our work — events, community drives, welfare programmes, and infrastructure across the constituency."
                            : "நமது பணிகளின் ஒரு காட்சிப் பதிவு - தொகுதி முழுவதும் நடைபெற்ற நிகழ்ச்சிகள், சமூக இயக்கங்கள், நலத்திட்டங்கள் மற்றும் உள்கட்டமைப்புப் பணிகள்."
                        }
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
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: idx * 0.03, ease: 'easeOut' }}
                                className="group relative rounded-xl overflow-hidden cursor-pointer ring-1 ring-tvk-dark/5 hover:ring-tvk-red/30 transition-all duration-500 break-inside-avoid"
                                onClick={() => openLightbox(idx)}
                            >
                                <img
                                    src={item.src}
                                    alt={language === 'en' ? item.titleEn : item.titleTa}
                                    className="w-full object-cover transition-transform duration-750 group-hover:scale-106"
                                    loading="lazy"
                                />

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                                    <motion.div
                                        initial={{ y: 8, opacity: 0 }}
                                        whileHover={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span className="text-[10px] font-black text-tvk-yellow uppercase tracking-widest">
                                            {language === 'en' ? item.tag : (item.tag === 'Events' ? 'நிகழ்வுகள்' : (item.tag === 'Community' ? 'சமூகம்' : (item.tag === 'Welfare' ? 'மக்கள் நலம்' : 'உட்கட்டமைப்பு')))}
                                        </span>
                                        <p className="text-white font-bold text-sm mt-0.5 leading-snug">{language === 'en' ? item.titleEn : item.titleTa}</p>
                                    </motion.div>
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                                        <ZoomIn size={14} className="text-white" />
                                    </div>
                                </div>

                                {/* Floating category tag */}
                                <div className="absolute top-3 left-3 bg-black/45 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {language === 'en' ? item.category : (item.category === 'Events' ? 'நிகழ்வுகள்' : (item.category === 'Community' ? 'சமூகம்' : (item.category === 'Welfare' ? 'மக்கள் நலம்' : 'உட்கட்டமைப்பு')))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <p className="text-center text-tvk-dark/30 mt-16 font-bold">
                        {language === 'en' ? 'No photos in this category.' : 'இந்த பிரிவில் புகைப்படங்கள் இல்லை.'}
                    </p>
                )}

                {/* Photo count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-tvk-dark/25 text-sm font-bold mt-10 uppercase tracking-widest"
                >
                    {filtered.length} {language === 'en' ? `Photo${filtered.length !== 1 ? 's' : ''}` : 'புகைப்படங்கள்'}
                </motion.p>
            </section>

            {/* Lightbox */}
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
            <JoinTVKCTA />
        </motion.div>
    )
}

export default Services
