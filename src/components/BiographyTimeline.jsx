import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Award, Star, TrendingUp } from 'lucide-react'

const TimelineItem = ({ year, title, description, icon, side }) => {
    return (
        <div className={`mb-12 flex justify-between items-center w-full ${side === 'right' ? 'flex-row-reverse' : ''}`}>
            <div className="hidden md:block w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-white shadow-2xl w-14 h-14 rounded-full border-4 border-tvk-yellow group-hover:scale-110 transition-transform duration-500">
                <div className="mx-auto text-tvk-red">
                    {icon}
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, x: side === 'right' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 glass-card w-full md:w-5/12 px-8 py-8"
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
    const events = [
        {
            year: "Dec 2023",
            title: "Flood Relief Mission",
            description: "Mobilized immediate relief and provided food for over 600 people during the devastating flood crisis.",
            icon: <Star size={20} />,
            side: "left"
        },
        {
            year: "Feb 2024",
            title: "Community Empowerment",
            description: "Donated 10 bicycles and 10 sewing machines on Anjalai Ammal Memorial Day to support local livelihoods.",
            icon: <TrendingUp size={20} />,
            side: "right"
        },
        {
            year: "May 2024",
            title: "Infrastructure & Welfare",
            description: "Installed drinking water supply systems in 13 different locations to ensure basic accessibility for all.",
            icon: <Award size={20} />,
            side: "left"
        },
        {
            year: "Oct 2024",
            title: "TVK Membership Drive",
            description: "Led a massive outreach campaign, successfully enrolling 500+ new members into the TVK movement.",
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
