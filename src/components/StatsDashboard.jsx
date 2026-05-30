import React from 'react'
import { motion } from 'framer-motion'
import { FileText, CheckCircle2, Clock, CalendarDays, Timer } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const StatsDashboard = () => {
    const { language } = useLanguage()

    const stats = [
        { icon: <FileText size={22} />, value: '2,458', label: language === 'en' ? 'Total Complaints' : 'மொத்து புகார்கள்', color: 'bg-blue-500' },
        { icon: <CheckCircle2 size={22} />, value: '1,879', label: language === 'en' ? 'Resolved' : 'தீர்க்கப்பட்டவை', color: 'bg-green-500' },
        { icon: <Clock size={22} />, value: '458', label: language === 'en' ? 'Pending' : 'நிலுவையில்', color: 'bg-orange-500' },
        { icon: <CalendarDays size={22} />, value: '32', label: language === 'en' ? 'Today' : 'இன்றைய புகார்கள்', color: 'bg-purple-500' },
        { icon: <Timer size={22} />, value: language === 'en' ? '2.4 Days' : '2.4 நாட்கள்', label: language === 'en' ? 'Avg Resolution' : 'சராசரி தீர்வு நேரம்', color: 'bg-tvk-red' },
    ]

    return (
        <section className="py-6 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`stat-card ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-xl ${stat.color} text-white flex items-center justify-center shrink-0`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xl md:text-2xl font-extrabold text-tvk-dark leading-tight">{stat.value}</p>
                                <p className="text-[11px] text-tvk-dark/60 font-semibold leading-tight">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsDashboard
