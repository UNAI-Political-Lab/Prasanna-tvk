import React from 'react'
import { motion } from 'framer-motion'

const ServiceCard = ({ icon, title, desc }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass-card p-10 flex flex-col h-full group relative overflow-hidden"
        >
            {/* Cinematic Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-tvk-yellow/5 blur-3xl -z-10 group-hover:bg-tvk-red/10 transition-colors duration-500" />

            <div className="w-16 h-16 bg-white border-2 border-tvk-yellow rounded-2xl flex items-center justify-center text-tvk-red mb-8 shadow-xl group-hover:border-tvk-red group-hover:scale-110 transition-all duration-500">
                {React.cloneElement(icon, { size: 32 })}
            </div>
            <h3 className="text-2xl font-black mb-4 group-hover:text-tvk-red transition-colors text-tvk-dark">{title}</h3>
            <p className="text-base text-tvk-dark/60 leading-relaxed font-medium">
                {desc}
            </p>
            <div className="mt-auto pt-6 flex items-center text-tvk-red font-bold text-sm">
                Learn More
                <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="ml-2"
                >
                    →
                </motion.span>
            </div>
        </motion.div>
    )
}

export default ServiceCard
