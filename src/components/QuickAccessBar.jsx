import React from 'react'
import { motion } from 'framer-motion'
import { Mic, MessageCircle, Landmark, BarChart3, Globe, QrCode } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const QuickAccessBar = () => {
    const { language } = useLanguage()

    const cards = [
        {
            icon: <Mic size={28} />,
            title: language === 'en' ? 'Voice Complaint' : 'குரல் புகார்',
            desc: language === 'en' ? 'Call us to register your grievance. We will listen.' : 'உங்கள் புகாரை பதிவிடவும். நாங்கள் கவனிப்போம்.',
            color: 'bg-blue-500',
            link: 'tel:+919884770108'
        },
        {
            icon: <MessageCircle size={28} />,
            title: language === 'en' ? 'WhatsApp Complaint' : 'WhatsApp புகார்',
            desc: language === 'en' ? 'Send us details of your grievance on WhatsApp.' : 'WhatsApp மூலம் புகார் அனுப்பவும்.',
            color: 'bg-green-500',
            link: 'https://wa.me/919884770108'
        },
        {
            icon: <Landmark size={28} />,
            title: language === 'en' ? 'Govt Schemes' : 'அரசாங்க திட்டங்கள்',
            desc: language === 'en' ? 'Get information and assistance regarding government welfare schemes.' : 'அரசு திட்டங்கள் குறித்த தகவல் மற்றும் உதவி பெறுங்கள்.',
            color: 'bg-amber-500',
            link: null
        },
        {
            icon: <BarChart3 size={28} />,
            title: language === 'en' ? 'Public Survey' : 'பொது கருத்துக்கணிப்பு',
            desc: language === 'en' ? 'Take part in constituency survey polls to voice your demands.' : 'மக்கள் பிரச்சினைகளை அறிந்துகொள்ள கருத்துக்கணிப்பு.',
            color: 'bg-purple-500',
            link: null
        },
        {
            icon: <Globe size={28} />,
            title: language === 'en' ? 'Online Ward Connect' : 'ஆன்லைன்வாரியாக இணைக',
            desc: language === 'en' ? 'Connect with your local ward representatives online.' : 'இணைய வாரியாக இணைக.',
            color: 'bg-tvk-red',
            link: null
        },
        {
            icon: <QrCode size={28} />,
            title: language === 'en' ? 'QR Complaint Portal' : 'QR ஓலம் புகார்',
            desc: language === 'en' ? 'Scan to quickly register complaints from your mobile.' : 'QR மூலம் புகார் பதிவு செய்யுங்கள்.',
            color: 'bg-teal-500',
            link: null
        },
    ]

    return (
        <section className="py-10 md:py-14 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                        >
                            {card.link ? (
                                <a
                                    href={card.link}
                                    target={card.link.startsWith('http') ? '_blank' : '_self'}
                                    rel="noopener noreferrer"
                                    className="quick-card h-full"
                                >
                                    <div className={`w-14 h-14 rounded-2xl ${card.color} text-white flex items-center justify-center`}>
                                        {card.icon}
                                    </div>
                                    <h4 className="text-sm font-extrabold text-tvk-dark">{card.title}</h4>
                                    <p className="text-[11px] text-tvk-dark/50 leading-snug">{card.desc}</p>
                                </a>
                            ) : (
                                <div className="quick-card h-full">
                                    <div className={`w-14 h-14 rounded-2xl ${card.color} text-white flex items-center justify-center`}>
                                        {card.icon}
                                    </div>
                                    <h4 className="text-sm font-extrabold text-tvk-dark">{card.title}</h4>
                                    <p className="text-[11px] text-tvk-dark/50 leading-snug">{card.desc}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default QuickAccessBar
