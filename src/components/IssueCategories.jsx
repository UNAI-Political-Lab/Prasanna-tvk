import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import * as Icons from 'lucide-react'
import { grievanceService } from '../services/grievanceService'
import { GRIEVANCE_CATEGORIES } from '../data/categoryConfig'

const IssueCategories = () => {
    const { language } = useLanguage()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const dbCats = await grievanceService.getCategories()
                if (dbCats && dbCats.length > 0) {
                    const formatted = dbCats.map(cat => {
                        const fallback = GRIEVANCE_CATEGORIES.find(c => c.code === cat.category_code) || {}
                        return {
                            icon: cat.icon || fallback.icon || 'FileText',
                            label_en: cat.name_en,
                            label_ta: cat.name_ta,
                            color: cat.color || fallback.color || 'bg-gray-50 text-gray-600 group-hover:bg-gray-600'
                        }
                    })
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
            setCategories(GRIEVANCE_CATEGORIES.map(cat => ({
                icon: cat.icon,
                label_en: cat.name_en,
                label_ta: cat.name_ta,
                color: cat.color
            })))
        }

        fetchCategories()
    }, [])

    const getIconComponent = (iconName) => {
        let name = iconName
        if (name === 'Sanitation') name = 'Recycle'
        const LucideIcon = Icons[name] || Icons.HelpCircle
        return <LucideIcon size={24} />
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg md:text-xl font-extrabold text-tvk-dark">
                    {language === 'en' ? 'Grievance Categories (A – H)' : 'புகார் வகைகள் (A – H)'}
                </h3>
                <Link to="/services" className="text-tvk-red text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    {language === 'en' ? 'View All' : 'அனைத்தையும் பார்க்க'} <Icons.ChevronRight size={16} />
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
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
                                <span className="text-[11px] md:text-xs font-bold text-tvk-dark/80 leading-tight text-center">
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
