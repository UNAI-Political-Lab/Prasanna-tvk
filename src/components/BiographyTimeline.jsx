import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Award, Star, TrendingUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const TimelineItem = ({ year, title, description, icon, side }) => {
    return (
        <div className={`mb-12 flex justify-between items-center w-full ${side === 'right' ? 'md:flex-row-reverse' : ''}`}>
            <div className="hidden md:block w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-white shadow-2xl w-14 h-14 rounded-full border-4 border-tvk-yellow group-hover:scale-110 transition-transform duration-500 shrink-0 md:mx-0">
                <div className="mx-auto text-tvk-red">
                    {icon}
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, x: side === 'right' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 glass-card w-[calc(100%-4rem)] md:w-5/12 px-6 md:px-8 py-6 md:py-8 ml-4 md:ml-0"
            >
                <span className="mb-4 font-black text-tvk-red text-xs flex items-center gap-2 uppercase tracking-widest bg-tvk-red/5 w-fit px-3 py-1 rounded-full">
                    <Calendar size={14} /> {year}
                </span>
                <h4 className="mb-4 font-black text-2xl text-tvk-dark">{title}</h4>
                <p className="text-base leading-relaxed text-tvk-dark/60 font-medium">
                    {description}
                </p>
            </motion.div>
        </div>
    )
}

const BiographyTimeline = () => {
    const { language } = useLanguage()

    const events = [
        {
            year: language === 'en' ? "Dec 2023" : "டிச 2023",
            title: language === 'en' ? "Flood Relief Mission" : "வெள்ள நிவாரணப் பணி",
            description: language === 'en'
                ? "Mobilized immediate relief and provided food and essential supplies for over 600 families during the devastating flood crisis."
                : "கடுமையான வெள்ளப் பெருக்கின் போது 600-க்கும் மேற்பட்ட குடும்பங்களுக்கு உடனடி நிவாரணப் பொருட்களை வழங்கி உதவினார்.",
            icon: <Star size={20} />,
            side: "left"
        },
        {
            year: language === 'en' ? "Feb 2024" : "பிப் 2024",
            title: language === 'en' ? "Community Empowerment" : "சமூக மேம்பாடு",
            description: language === 'en'
                ? "Donated 10 bicycles and 10 sewing machines on Anjalai Ammal Memorial Day to support and uplift local livelihoods."
                : "அஞ்சலை அம்மாள் நினைவு நாளில் உள்ளூர் மக்களின் வாழ்வாதாரத்தை மேம்படுத்த 10 மிதிவண்டிகள் மற்றும் 10 தையல் இயந்திரங்களை வழங்கினார்.",
            icon: <TrendingUp size={20} />,
            side: "right"
        },
        {
            year: language === 'en' ? "May 2024" : "மே 2024",
            title: language === 'en' ? "Infrastructure & Welfare" : "உட்கட்டமைப்பு & மக்கள் நலம்",
            description: language === 'en'
                ? "Successfully installed clean drinking water supply systems in 13 different public locations to ensure basic accessibility."
                : "அடிப்படைத் தேவையைப் பூர்த்தி செய்யும் வகையில் 13 வெவ்வேறு பொது இடங்களில் குடிநீர் சுத்திகரிப்பு அமைப்புகளை நிறுவினார்.",
            icon: <Award size={20} />,
            side: "left"
        },
        {
            year: language === 'en' ? "Oct 2024" : "அக் 2024",
            title: language === 'en' ? "TVK Membership Drive" : "உறுப்பினர் சேர்க்கை இயக்கம்",
            description: language === 'en'
                ? "Led a massive constituency-wide outreach campaign, successfully enrolling over 500+ new members into the TVK movement."
                : "தொகுதி தழுவிய அளவில் ஒரு பெரிய பிரச்சாரத்தை முன்னெடுத்து 500-க்கும் மேற்பட்ட புதிய உறுப்பினர்களை TVK இயக்கத்தில் இணைத்தார்.",
            icon: <TrendingUp size={20} />,
            side: "right"
        }
    ]

    return (
        <div className="relative wrap overflow-hidden p-10 h-full">
            <div className="absolute border-opacity-20 border-tvk-red h-full border-2 left-1/2 -translate-x-1/2 hidden md:block"></div>
            <div className="absolute border-opacity-20 border-tvk-red h-full border-2 left-10 md:hidden"></div>

            {events.map((event, index) => (
                <TimelineItem
                    key={index}
                    {...event}
                    side={index % 2 === 0 ? 'left' : 'right'}
                />
            ))}
        </div>
    )
}

export default BiographyTimeline
