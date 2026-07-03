import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Search, Users, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

/* ── Animation Variants ─────────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: 'easeOut' },
    }),
}

const slideRight = {
    hidden: { opacity: 0, x: 80 },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.85, delay, ease: 'easeOut' },
    }),
}

const popIn = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: 'easeOut' },
    }),
}

/** Floating particles (decorative) */
const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
        <div className="hero-particle" />
    </div>
)

/** Soft radial background gradients */
const BackgroundGradients = () => (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* Top-left warm glow */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-tvk-primary/5 rounded-full blur-[120px]" />
        {/* Right-side soft gold glow */}
        <div className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-tvk-gold/8 rounded-full blur-[100px]" />
        {/* Bottom center subtle glow */}
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-tvk-lightGold/6 rounded-full blur-[140px]" />
    </div>
)

/** Top-center leaders and motto composite image */
const TopLeadersMotto = () => (
    <div className="absolute top-24 sm:top-28 left-1/2 -translate-x-1/2 z-30 w-[110px] sm:w-[140px] md:w-[185px] lg:w-[230px] pointer-events-none">
        <motion.div
            variants={popIn}
            initial="hidden"
            animate="visible"
            custom={0.3}
        >
            <img
                src="/tvk-leaders-motto.png"
                alt="TVK Leaders and Motto"
                className="w-full h-auto object-contain drop-shadow-sm"
                loading="eager"
            />
        </motion.div>
    </div>
)

/** Main heading block */
const HeroHeading = ({ language }) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.15}
        className="flex flex-col lg:flex-row gap-4 items-center lg:items-stretch pl-1 mb-4 text-center lg:text-left w-full justify-center lg:justify-start"
    >
        {/* Left vertical color ribbon/bar */}
        <div className="hidden lg:block w-1.5 bg-gradient-to-b from-[#D89C00] to-[#A50000] rounded-full shrink-0" />

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="mb-1 flex flex-col lg:flex-row items-center lg:items-baseline flex-wrap gap-x-3 gap-y-1">
                <span className="hero-heading-name block text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-black text-[#A50000] uppercase tracking-[0.03em] leading-[1] font-heading drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-center lg:text-left">
                    S. PRASANNA
                </span>
                <span className="text-[#333333] font-semibold text-xs sm:text-sm md:text-base lg:text-lg tracking-wide whitespace-nowrap text-center lg:text-left mt-0.5 lg:mt-0">
                    B.Com, MBA
                </span>
            </h1>
            <h2 className="hero-heading-title text-sm sm:text-base md:text-lg lg:text-[1.35rem] font-extrabold text-[#A50000] lg:text-[#D89C00] uppercase tracking-[0.02em] leading-tight mt-1 font-heading text-center lg:text-left">
                {language === 'en'
                    ? 'Sholinganallur North Zone Secretary'
                    : 'சோலிங்கநல்லூர் வட மண்டல செயலாளர்'}
            </h2>
        </div>
    </motion.div>
)

/** Paragraph below heading */
const HeroParagraph = ({ language }) => (
    <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
        className="text-[#555] text-sm md:text-base lg:text-[1.05rem] leading-relaxed max-w-xl mb-7 font-medium text-center lg:text-left mx-auto lg:mx-0"
    >
        {language === 'en'
            ? 'Together, let us raise our voice, stand for justice, and build a stronger Sholinganallur.'
            : 'நம் குரலை உயர்த்துவோம், நீதிக்காக நிற்போம், வலுவான சோலிங்கநல்லூரை கட்டமைப்போம்.'}
    </motion.p>
)

/** Three CTA cards */
const CTACards = ({ language }) => {
    const cards = [
        {
            to: '/petition',
            icon: <FileText size={20} />,
            title: language === 'en' ? 'Submit Complaint' : 'புகார் பதிவு',
            desc: language === 'en' ? 'Register local grievances' : 'உள்ளூர் புகார் பதிவு',
            style: 'hero-cta-card-red',
            textColor: 'text-white',
            descColor: 'text-white/70',
            iconBg: 'bg-white/20',
            iconColor: 'text-white',
        },
        {
            to: '/#track',
            icon: <Search size={20} />,
            title: language === 'en' ? 'Track Status' : 'நிலை அறிய',
            desc: language === 'en' ? 'Check complaint status' : 'புகார் நிலையை சரிபார்க்க',
            style: 'hero-cta-card-white',
            textColor: 'text-[#1F1F1F]',
            descColor: 'text-gray-500',
            iconBg: 'bg-gray-100',
            iconColor: 'text-[#1F1F1F]',
        },
        {
            to: '/join-tvk',
            icon: <Users size={20} />,
            title: language === 'en' ? 'Join as a Volunteer' : 'தன்னார்வலர் இணைக',
            desc: language === 'en' ? 'Connect with services' : 'சேவைகளுடன் இணைய',
            style: 'hero-cta-card-gold',
            textColor: 'text-white',
            descColor: 'text-white/70',
            iconBg: 'bg-white/20',
            iconColor: 'text-white',
        },
    ]

    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 max-w-xl mx-auto lg:mx-0"
        >
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    variants={popIn}
                    initial="hidden"
                    animate="visible"
                    custom={0.5 + i * 0.12}
                >
                    <Link
                        to={card.to}
                        className={`hero-cta-card ${card.style} flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-3 p-2 sm:px-4 sm:py-3.5 rounded-xl shadow-md block h-full`}
                    >
                        <div className={`${card.iconBg} w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0`}>
                            {React.cloneElement(card.icon, { className: `${card.iconColor} w-4 h-4 sm:w-5 sm:h-5` })}
                        </div>
                        <div className="min-w-0 text-center sm:text-left">
                            <span className={`block font-bold text-[9px] xs:text-[10px] sm:text-[13px] leading-tight ${card.textColor}`}>
                                {card.title}
                            </span>
                            <span className={`hidden sm:block text-[10px] mt-0.5 ${card.descColor} font-medium leading-tight`}>
                                {card.desc}
                            </span>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    )
}

/** Footer tagline */
const HeroTagline = ({ language }) => (
    <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.65}
        className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500 font-medium w-full text-center lg:text-left"
    >
        <MapPin size={14} className="text-tvk-primary shrink-0" />
        <span>
            {language === 'en' ? (
                <>For the People. With the People. <strong className="text-[#1F1F1F]">Always for Sholinganallur.</strong></>
            ) : (
                <>மக்களுக்காக. மக்களுடன். <strong className="text-[#1F1F1F]">எப்போதும் சோலிங்கநல்லூருக்காக.</strong></>
            )}
        </span>
    </motion.div>
)

/** Leaders Ribbon in the Left Corner */
const LeadersRibbonLeft = () => (
    <motion.div
        variants={popIn}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="absolute top-24 left-2 sm:left-4 lg:left-12 z-20 w-[90px] sm:w-[125px] md:w-[155px] lg:w-[180px] pointer-events-none"
    >
        <img
            src="/tvk-leaders-ribbon.png"
            alt="TVK Leaders and District Ribbon Banner"
            className="w-full h-auto object-contain drop-shadow-md"
            loading="eager"
        />
    </motion.div>
)

/** Leaders Photo in the Right Corner */
const LeadersRightCorner = () => (
    <motion.div
        variants={popIn}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="absolute top-24 right-2 sm:right-4 lg:right-12 z-20 w-[90px] sm:w-[125px] md:w-[155px] lg:w-[180px] pointer-events-none"
    >
        <img
            src="/tvk-leader-right.png"
            alt="TVK Leader Right"
            className="w-full h-auto object-contain drop-shadow-sm"
            loading="eager"
        />
    </motion.div>
)

/** Main candidate image with flag */
const PoliticianImageWithFlag = () => (
    <motion.div
        variants={slideRight}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="relative flex items-end justify-center w-full lg:h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[560px] pointer-events-none"
    >
        <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
            className="relative z-[5] w-[95%] sm:w-[85%] lg:w-full max-w-[560px] flex items-end pointer-events-none"
        >
            <img
                src="/prasanna-flag.png"
                alt="S. Prasanna with TVK Flag"
                className="w-full h-auto object-contain -mt-[22%] sm:-mt-[18%] lg:mt-0 pointer-events-none"
                loading="eager"
            />
        </motion.div>
    </motion.div>
)

/** Bottom-right floating photo card with red border */
const FloatingPhotoCardTvk = () => (
    <motion.div
        variants={popIn}
        initial="hidden"
        animate="visible"
        custom={0.7}
        className="absolute -bottom-6 -right-6 lg:-right-16 z-20 hidden lg:block"
    >

    </motion.div>
)

/* ── Main Hero Component ────────────────────────────────────────────── */
const Hero = () => {
    const { language } = useLanguage()

    return (
        <section
            id="hero"
            className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 lg:pt-20 pb-0 overflow-hidden"
            style={{
                backgroundImage: 'url(/hero-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#FFFFFF',
            }}
            aria-label="Hero Section"
        >
            {/* Background Effects */}
            <BackgroundGradients />
            <FloatingParticles />

            {/* Floating Elements (absolute positioned) */}
            <TopLeadersMotto />
            <LeadersRibbonLeft />
            <LeadersRightCorner />

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                {/* ── Desktop Layout (lg and up) ── */}
                <div className="hidden lg:flex flex-row items-end gap-2 pt-[105px] pb-0">
                    {/* Left Column: Content (~48%) */}
                    <div className="flex-shrink-0 w-[48%] text-left items-start flex flex-col pb-16 -translate-y-16">
                        <HeroHeading language={language} />
                        <HeroParagraph language={language} />
                        
                        <div className="w-full">
                            <CTACards language={language} />
                        </div>

                        <HeroTagline language={language} />
                    </div>

                    {/* Right Column: Image (~52%) */}
                    <div className="w-[52%] relative flex-shrink-0 flex items-end justify-center -translate-y-16">
                        <PoliticianImageWithFlag />
                        <FloatingPhotoCardTvk />
                    </div>
                </div>

                {/* ── Mobile Layout (under lg) ── */}
                <div className="flex lg:hidden flex-col items-center gap-6 pt-24 sm:pt-28 md:pt-32 pb-12">
                    {/* 1. Politician Image + Standing Card */}
                    <div className="w-full relative flex flex-col items-center justify-center">
                        <PoliticianImageWithFlag />
                        <FloatingPhotoCardTvk />
                    </div>

                    {/* 2. Mobile Heading (Name & Title) */}
                    <div className="w-full mt-2">
                        <HeroHeading language={language} />
                    </div>

                    {/* 3. Slogan Paragraph */}
                    <HeroParagraph language={language} />

                    {/* 4. Three CTA Buttons */}
                    <div className="w-full">
                        <CTACards language={language} />
                    </div>

                    {/* 5. Tagline */}
                    <HeroTagline language={language} />
                </div>
            </div>
        </section>
    )
}

export default Hero
