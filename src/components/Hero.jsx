import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
    const heroBg = "/hero-bg.png"
    const candidateImg = "/candidate.jpeg"

    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-black">
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                >
                    <source src="/tvk-intro.mp4" type="video/mp4" />
                    {/* Fallback image if video fails to load/not supported */}
                    <img
                        src={heroBg}
                        alt="TVK Cinematic Background"
                        className="w-full h-full object-cover opacity-40"
                        onError={(e) => {
                            if (e.target.src !== "https://images.unsplash.com/photo-1614850523296-e811d9fab042?auto=format&fit=crop&q=80&w=2070") {
                                e.target.src = "https://images.unsplash.com/photo-1614850523296-e811d9fab042?auto=format&fit=crop&q=80&w=2070";
                            }
                        }}
                    />
                </video>
                <motion.div
                    animate={{
                        opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-tvk-red/70 via-transparent to-transparent z-10"
                />
                <motion.div
                    animate={{
                        opacity: [0.7, 0.5, 0.7]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <div className="inline-block px-6 py-2 mb-8 bg-white text-tvk-red rounded-full font-black text-xs tracking-[0.2em] uppercase shadow-xl ring-1 ring-tvk-red/10">
                            Tamilaga Vettri Kazhagam
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-10 leading-none text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] tracking-tighter whitespace-nowrap">
                            Mr. S. <span className="text-tvk-yellow">Prasanna</span>
                        </h1>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                            {['Entrepreneur', 'Social Worker', 'Political Activist'].map((title, i) => (
                                <span key={i} className="text-tvk-yellow font-bold text-sm md:text-base uppercase tracking-widest border border-tvk-yellow/30 px-4 py-1.5 rounded-lg backdrop-blur-sm">
                                    {title}
                                </span>
                            ))}
                        </div>
                        <p className="text-xl text-white/90 mb-12 max-w-2xl leading-relaxed font-medium drop-shadow-lg lg:pr-12">
                            A dynamic entrepreneur and committed social activist with a deep commitment to public welfare. Leading with professional excellence and grassroots involvement.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to="/petition" className="relative overflow-hidden bg-tvk-yellow text-tvk-red font-black py-5 px-14 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)] transition-all duration-500 text-lg flex items-center gap-3 group">
                                    <span className="relative z-10 transition-colors group-hover:text-tvk-red">Submit Your Petition</span>
                                    <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                                    <motion.div
                                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                                        initial={false}
                                    />
                                    {/* Shimmer effect */}
                                    <motion.div
                                        animate={{
                                            left: ["-100%", "200%"],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatDelay: 1
                                        }}
                                        className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 pointer-events-none"
                                    />
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to="/biography" className="flex items-center gap-3 px-14 py-5 rounded-full font-black border-2 border-white/30 text-white backdrop-blur-xl hover:bg-white hover:text-tvk-red transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] text-lg group relative overflow-hidden">
                                    <FileText size={24} className="group-hover:rotate-12 transition-transform duration-500" />
                                    <span>Learn Our Story</span>
                                    {/* Animated border/glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Content - Circular Candidate Portrait */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="flex-1 relative mt-12 lg:mt-0 flex items-center justify-center p-8"
                    >
                        <div className="relative z-10 w-72 h-72 md:w-[480px] md:h-[480px] rounded-full border-[12px] border-white shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden ring-8 ring-tvk-yellow/10">
                            <img
                                src={candidateImg}
                                alt="TVK Candidate"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-in-out"
                                onError={(e) => {
                                    if (e.target.src !== "https://placehold.co/800x800?text=CANDIDATE+PORTRAIT") {
                                        e.target.src = "https://placehold.co/800x800?text=CANDIDATE+PORTRAIT";
                                    }
                                }}
                            />
                        </div>

                        {/* Decorative Cinematic Elements */}
                        <div className="absolute w-[110%] h-[110%] border-2 border-dashed border-tvk-yellow/30 rounded-full animate-[spin_30s_linear_infinite]" />
                        <div className="absolute w-[120%] h-[120%] border border-white/5 rounded-full animate-[spin_45s_linear_infinite_reverse]" />

                        {/* Ambient Glow */}
                        <div className="absolute w-full h-full bg-tvk-yellow/15 blur-[120px] -z-10 rounded-full" />
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade - Removed white overlay, using cinematic black transition */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        </section>
    )
}

export default Hero
