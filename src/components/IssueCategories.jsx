import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import * as Icons from 'lucide-react'
import { grievanceService } from '../services/grievanceService'

const FALLBACK_CATEGORIES = [
    { icon: 'Droplets', label_en: 'Water Supply', label_ta: 'குடிநீர்', color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600' },
    { icon: 'Construction', label_en: 'Roads', label_ta: 'சாலைகள்', color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600' },
    { icon: 'Stethoscope', label_en: 'Healthcare', label_ta: 'மருத்துவ வசதிகள்', color: 'bg-green-50 text-green-600 group-hover:bg-green-600' },
    { icon: 'Search', label_en: 'Enquiry', label_ta: 'தேர்வு விசாரணை', color: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600' },
    { icon: 'Building2', label_en: 'Rural Plan', label_ta: 'ஊரக அமைப்பு', color: 'bg-teal-50 text-teal-600 group-hover:bg-teal-600' },
    { icon: 'Users', label_en: 'Youth', label_ta: 'இளைஞர்', color: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600' },
    { icon: 'HeartHandshake', label_en: 'Women', label_ta: 'பெண்கள் புரவலர்', color: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600' },
    { icon: 'Recycle', label_en: 'Sanitation', label_ta: 'சுகாதாரம்', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600' },
]

const IssueCategories = () => {
    const { language } = useLanguage()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const dbCats = await grievanceService.getCategories()
                if (dbCats && dbCats.length > 0) {
                    const formatted = dbCats.map(cat => ({
                        icon: cat.icon,
                        label_en: cat.name_en,
                        label_ta: cat.name_ta,
                        color: cat.color || 'bg-gray-50 text-gray-600 group-hover:bg-gray-600'
                    }))
                    setCategories(formatted)
                } else {
                    useFallback()
                }
            } catch (err) {
                console.warn('Failed to fetch categories for grid, using fallbacks.', err)
                useFallback()
            }
        }

        const useFallback = () => {
            setCategories(FALLBACK_CATEGORIES)
        }

        fetchCategories()
    }, [])

    const getIconComponent = (iconName) => {
        // Fallback for names that might not match Lucide precisely or changed names
        let name = iconName
        if (name === 'Sanitation') name = 'Recycle' // fallback map
        
        const LucideIcon = Icons[name] || Icons.HelpCircle
        return <LucideIcon size={26} />
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg md:text-xl font-extrabold text-tvk-dark">
                    {language === 'en' ? 'Common Issue Categories' : 'பொதுவான பிரச்சினைகள்'}
                </h3>
                <Link to="/services" className="text-tvk-red text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    {language === 'en' ? 'View All' : 'அனைத்தையும் பார்க்க'} <Icons.ChevronRight size={16} />
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                {categories.map((cat, i) => {
                    const label = language === 'en' ? cat.label_en : cat.label_ta
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <Link to={`/petition?category=${encodeURIComponent(label)}`} className="category-card group">
                                <div className={`icon-wrap ${cat.color} group-hover:text-white transition-all duration-300`}>
                                    {getIconComponent(cat.icon)}
                                </div>
                                <span className="text-[11px] md:text-xs font-bold text-tvk-dark/70 leading-tight text-center">
                                    {label}
                                </span>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default IssueCategories
