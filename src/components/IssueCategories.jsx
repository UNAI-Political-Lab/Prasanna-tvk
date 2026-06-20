import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import {
    Droplets, Construction, Stethoscope, Search,
    Building2, Users, HeartHandshake, Recycle, ChevronRight
} from 'lucide-react'

const IssueCategories = () => {
    const { language } = useLanguage()

    const categories = [
        { icon: <Droplets size={26} />, label: language === 'en' ? 'Water Supply' : 'குடிநீர்', color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600' },
        { icon: <Construction size={26} />, label: language === 'en' ? 'Roads' : 'சாலைகள்', color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600' },
        { icon: <Stethoscope size={26} />, label: language === 'en' ? 'Healthcare' : 'மருத்துவ வசதிகள்', color: 'bg-green-50 text-green-600 group-hover:bg-green-600' },
        { icon: <Search size={26} />, label: language === 'en' ? 'Enquiry' : 'தேர்வு விசாரணை', color: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600' },
        { icon: <Building2 size={26} />, label: language === 'en' ? 'Rural Plan' : 'ஊரக அமைப்பு', color: 'bg-teal-50 text-teal-600 group-hover:bg-teal-600' },
        { icon: <Users size={26} />, label: language === 'en' ? 'Youth' : 'இளைஞர்', color: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600' },
        { icon: <HeartHandshake size={26} />, label: language === 'en' ? 'Women' : 'பெண்கள் புரவலர்', color: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600' },
        { icon: <Recycle size={26} />, label: language === 'en' ? 'Sanitation' : 'சுகாதாரம்', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600' },
    ]

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg md:text-xl font-extrabold text-tvk-dark">
                    {language === 'en' ? 'Common Issue Categories' : 'பொதுவான பிரச்சினைகள்'}
                </h3>
                <Link to="/services" className="text-tvk-red text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    {language === 'en' ? 'View All' : 'அனைத்தையும் பார்க்க'} <ChevronRight size={16} />
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                {categories.map((cat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                    >
                        <Link to={`/petition?category=${encodeURIComponent(cat.label)}`} className="category-card">
                            <div className={`icon-wrap ${cat.color} group-hover:text-white`}>
                                {cat.icon}
                            </div>
                            <span className="text-[11px] md:text-xs font-bold text-tvk-dark/70 leading-tight text-center">
                                {cat.label}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default IssueCategories
