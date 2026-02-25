import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
    const heroBg = "/hero-bg.png"
    const candidateImg = "/candidate.jpeg"

    return (
        <section className="relative min-h-[100dvh] lg:min-h-[90vh] flex items-center pt-24 lg:pt-20 overflow-hidden bg-black py-10 lg:py-0">
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


                        {/* Primary Leaders Section */}
                        <div className="flex flex-wrap gap-4 md:gap-8 mb-8 lg:mb-12 justify-center lg:justify-start">
                            {[
                                { name: "Anand", img: "/anandtvk.png", role: "General Secretary" },
                                { name: "ECR Saravanan", img: "/ecrsaravanan.png", role: "State Secretary" }
                            ].map((leader, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-3">
                                    <div className="relative group">
                                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-tvk-yellow overflow-hidden shadow-[0_0_15px_rgba(251,191,36,0.3)] group-hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all duration-500 bg-white/10 ring-4 ring-white/10">
                                            <img
                                                src={leader.img}
                                                alt={leader.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    e.target.src = `https://placehold.co/200x200?text=${leader.name[0]}`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:hidden mb-6 flex justify-center"
                        >
                            <div className="relative z-10 w-44 h-44 rounded-full border-[8px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden ring-4 ring-tvk-yellow/10">
                                <img
                                    src={candidateImg}
                                    alt="TVK Candidate"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>

                        <h1 className="text-3xl md:text-7xl font-black mb-2 md:mb-4 leading-[1.1] md:leading-none text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] tracking-tighter">
                            Mr. S. <span className="text-tvk-yellow">Prasanna</span>
                        </h1>
                        <div className="flex items-center justify-center lg:justify-start mb-6 md:mb-8">
                            <span className="text-white font-black text-sm md:text-xl uppercase tracking-[0.2em] drop-shadow-lg whitespace-nowrap">Sholinganallur <span className="text-tvk-yellow">North Zone Secretary</span></span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-4 mb-6 md:mb-8">
                            {['Entrepreneur', 'Social Worker', 'Political Activist'].map((title, i) => (
                                <span key={i} className="text-tvk-yellow font-bold text-[10px] md:text-sm uppercase tracking-widest border border-tvk-yellow/30 px-3 md:px-4 py-1 md:py-1.5 rounded-lg backdrop-blur-sm">
                                    {title}
                                </span>
                            ))}
                        </div>
                        <p className="text-base md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl leading-relaxed font-medium drop-shadow-lg lg:pr-12">
                            A dynamic entrepreneur and committed social activist with a deep commitment to public welfare. Leading with professional excellence and grassroots involvement.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
                            <motion.div
                                className="w-full sm:w-auto"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to="/petition" className="relative overflow-hidden bg-tvk-yellow text-tvk-red font-black py-4 md:py-5 px-8 md:px-14 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)] transition-all duration-500 text-base md:text-lg flex items-center justify-center gap-3 group">
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
                                <Link to="/biography" className="flex items-center gap-3 px-10 md:px-14 py-4 md:py-5 rounded-full font-black border-2 border-white/30 text-white backdrop-blur-xl hover:bg-white hover:text-tvk-red transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] text-base md:text-lg group relative overflow-hidden">
                                    <FileText size={24} className="group-hover:rotate-12 transition-transform duration-500" />
                                    <span>Learn Our Story</span>
                                    {/* Animated border/glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Content - Circular Candidate Portrait (Desktop only) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="hidden lg:flex flex-1 relative mt-6 lg:mt-0 items-center justify-center p-8"
                    >
                        <div className="relative z-10 w-[480px] h-[480px] rounded-full border-[12px] border-white shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden ring-8 ring-tvk-yellow/10">
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
