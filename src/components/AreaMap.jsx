import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const AreaMap = () => {
    const { language } = useLanguage()

    const zones = [
        { name: language === 'en' ? 'Sholinganallur' : 'சோலிங்கநல்லூர்', eng: 'Sholinganallur', color: 'bg-red-500' },
        { name: language === 'en' ? 'Karapakkam' : 'கரப்பாக்கம்', eng: 'Karapakkam', color: 'bg-blue-500' },
        { name: language === 'en' ? 'Perungudi' : 'பெருங்குடி', eng: 'Perungudi', color: 'bg-green-500' },
        { name: language === 'en' ? 'Okkiyam Thoraipakkam' : 'ஓக்கியம் தொரைப்பாக்கம்', eng: 'Okkiyam Thoraipakkam', color: 'bg-amber-500' },
        { name: language === 'en' ? 'Navalur' : 'நாவலூர்', eng: 'Navalur', color: 'bg-purple-500' },
        { name: language === 'en' ? 'ECR Corridor' : 'ECR', eng: 'ECR Corridor', color: 'bg-tvk-red' },
    ]

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg md:text-xl font-extrabold text-tvk-dark">
                    {language === 'en' ? 'Constituency Status Map' : 'பகுதி வாரியான நிலை வரைபடம்'}
                </h3>
                <button className="text-tvk-red text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    {language === 'en' ? 'Full Map' : 'முழு வரைபடம் பார்க்க'} <ChevronRight size={16} />
                </button>
            </div>
            <p className="text-sm text-tvk-dark/50 mb-5">
                {language === 'en' ? 'View geographic status of grievances across local regions' : 'உங்கள் பகுதிக்கான புகார்களின் ஓரளவிலான மற்றும் பட்டியல்களைப் பார்க்கவும்'}
            </p>

            {/* Visual Map Area */}
            <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 min-h-[200px] md:min-h-[260px] overflow-hidden">
                {/* Zone markers */}
                {zones.map((zone, i) => {
                    const positions = [
                        'top-4 left-4 md:top-6 md:left-8',
                        'top-4 right-4 md:top-6 md:right-8',
                        'top-1/2 left-1/4 -translate-y-1/2',
                        'top-1/3 right-1/3',
                        'bottom-12 left-1/3',
                        'bottom-4 right-4 md:bottom-6 md:right-8',
                    ]
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.08, type: 'spring' }}
                            className={`absolute ${positions[i]}`}
                        >
                            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-md border border-white/50 hover:shadow-xl transition-shadow cursor-pointer group">
                                <div className={`w-2.5 h-2.5 rounded-full ${zone.color} shrink-0`} />
                                <div>
                                    <p className="text-[10px] md:text-[11px] font-bold text-tvk-dark leading-tight">{zone.name}</p>
                                    <p className="text-[8px] md:text-[9px] text-tvk-dark/40">{zone.eng}</p>
                                </div>
                                <MapPin size={12} className="text-tvk-dark/20 group-hover:text-tvk-red transition-colors" />
                            </div>
                        </motion.div>
                    )
                })}

                {/* Decorative road lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 260">
                    <path d="M 40 80 Q 120 40 200 90 Q 280 140 360 100" stroke="#910905" strokeWidth="2" fill="none" strokeDasharray="6 4" />
                    <path d="M 60 180 Q 140 130 240 170 Q 320 200 380 160" stroke="#910905" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
                    <path d="M 200 20 Q 190 100 210 200 Q 220 240 200 260" stroke="#FBBF24" strokeWidth="2" fill="none" strokeDasharray="8 4" />
                </svg>

                {/* ECR label badge */}
                <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 bg-tvk-red text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    {language === 'en' ? 'ECR Sholinganallur' : 'ECR சோலிங்கநல்லூர்'}
                </div>
            </div>
        </div>
    )
}

export default AreaMap
