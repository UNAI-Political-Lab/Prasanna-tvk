import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, CheckCircle2, Clock, CalendarDays, Timer } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { grievanceService } from '../services/grievanceService'

const StatsDashboard = () => {
    const { language } = useLanguage()
    const [statsData, setStatsData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await grievanceService.getGrievanceStats()
                setStatsData(data)
            } catch (err) {
                console.error('Failed to fetch stats, using fallbacks.', err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()

        // Refresh stats every 60 seconds
        const interval = setInterval(fetchStats, 60000)
        return () => clearInterval(interval)
    }, [])

    // Formatting helper
    const formatValue = (val) => {
        if (val === undefined || val === null) return '0'
        return Number(val).toLocaleString(language === 'en' ? 'en-US' : 'ta-IN')
    }

    const stats = [
        { 
            icon: <FileText size={22} />, 
            value: loading ? null : formatValue(statsData?.total_complaints), 
            label: language === 'en' ? 'Total Complaints' : 'மொத்த புகார்கள்', 
            color: 'bg-blue-500' 
        },
        { 
            icon: <CheckCircle2 size={22} />, 
            value: loading ? null : formatValue(statsData?.resolved_complaints), 
            label: language === 'en' ? 'Resolved' : 'தீர்க்கப்பட்டவை', 
            color: 'bg-green-500' 
        },
        { 
            icon: <Clock size={22} />, 
            value: loading ? null : formatValue(statsData?.pending_complaints), 
            label: language === 'en' ? 'Pending' : 'நிலுவையில்', 
            color: 'bg-orange-500' 
        },
        { 
            icon: <CalendarDays size={22} />, 
            value: loading ? null : formatValue(statsData?.today_complaints), 
            label: language === 'en' ? 'Today' : 'இன்றைய புகார்கள்', 
            color: 'bg-purple-500' 
        },
        { 
            icon: <Timer size={22} />, 
            value: loading ? null : (language === 'en' 
                ? `${Number(statsData?.avg_resolution_days || 2.4).toFixed(1)} Days` 
                : `${Number(statsData?.avg_resolution_days || 2.4).toFixed(1)} நாட்கள்`), 
            label: language === 'en' ? 'Avg Resolution' : 'சராசரி தீர்வு நேரம்', 
            color: 'bg-tvk-red' 
        },
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
                            <div className="flex-grow">
                                {loading || stat.value === null ? (
                                    <div className="space-y-1">
                                        <div className="h-6 w-16 bg-gray-100 animate-pulse rounded-md" />
                                        <div className="h-3 w-20 bg-gray-150 animate-pulse rounded-md" />
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-xl md:text-2xl font-extrabold text-tvk-dark leading-tight">{stat.value}</p>
                                        <p className="text-[11px] text-tvk-dark/60 font-semibold leading-tight">{stat.label}</p>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StatsDashboard
