import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Search, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const Hero = () => {
    const { language } = useLanguage()
    const candidateImg = "/candidate.jpeg"

    return (
        <section className="relative min-h-[85vh] lg:min-h-[80vh] flex items-center pt-28 sm:pt-32 lg:pt-36 overflow-hidden bg-tvk-dark">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                >
                    <source src="/tvk-intro.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-tvk-red/80 via-tvk-red/50 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex-1 text-center lg:text-left"
                    >
                        {/* Tagline */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-3 leading-[1.15] drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                            {language === 'en' ? 'Your Voice.' : 'உங்கள் குரல்.'}
                            <br />
                            <span className="text-tvk-yellow">{language === 'en' ? 'Our Responsibility.' : 'எங்கள் பொறுப்பு.'}</span>
                        </h1>
                        <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl leading-relaxed font-medium">
                            {language === 'en' 
                                ? 'Your voice, our responsibility. Together, let us build a better Sholinganallur ECR.' 
                                : 'உங்கள் குரல், எங்கள் பொறுப்பு. இணைந்து, சிறந்த சோலிங்கநல்லூர் ECR-ஐ உருவாக்குவோம்.'}
                        </p>

                        {/* CTA Buttons */}
                        <div className="hidden lg:flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    to="/petition"
                                    className="flex items-center justify-center gap-2 bg-tvk-red text-white font-bold py-3.5 px-7 rounded-xl shadow-lg hover:bg-tvk-darkRed transition-all text-sm border border-white/20"
                                >
                                    <FileText size={18} />
                                    <div className="text-left">
                                        <span className="block font-extrabold">{language === 'en' ? 'Submit Complaint' : 'புகார் பதிவு செய்யவும்'}</span>
                                        <span className="block text-[10px] text-white/60 font-normal">{language === 'en' ? 'Register local grievances' : 'சிக்கல்களை பதிவு செய்யவும்'}</span>
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    to="/petition"
                                    className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white font-bold py-3.5 px-7 rounded-xl border border-white/20 hover:bg-white/25 transition-all text-sm"
                                >
                                    <Search size={18} />
                                    <div className="text-left">
                                        <span className="block font-extrabold">{language === 'en' ? 'Track Status' : 'புகார் நிலை அறியுங்கள்'}</span>
                                        <span className="block text-[10px] text-white/60 font-normal">{language === 'en' ? 'Check complaint status' : 'நிலையை சரிபார்க்கவும்'}</span>
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    to="/join-tvk"
                                    className="flex items-center justify-center gap-2 bg-tvk-yellow/20 backdrop-blur-sm text-tvk-yellow font-bold py-3.5 px-7 rounded-xl border border-tvk-yellow/30 hover:bg-tvk-yellow/30 transition-all text-sm"
                                >
                                    <HelpCircle size={18} />
                                    <div className="text-left">
                                        <span className="block font-extrabold">{language === 'en' ? 'Join as Volunteer' : 'தன்னார்வலோர் இணைக'}</span>
                                        <span className="block text-[10px] text-tvk-yellow/60 font-normal">{language === 'en' ? 'Connect with services' : 'அரசாங்க உதவி பெறுங்கள்'}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Content - MLA Portrait + Quote */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-shrink-0 w-full lg:w-auto max-w-[450px]"
                    >
                        <div className="bg-white/10 backdrop-blur-md rounded-[32px] p-5 sm:p-8 border border-white/15 shadow-2xl">
                            {/* Candidate info */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 text-center sm:text-left">
                                <div className="w-24 h-24 sm:w-28 md:w-32 sm:h-28 md:h-32 rounded-2xl overflow-hidden border-4 border-tvk-yellow shadow-xl bg-white shrink-0">
                                    <img
                                        src={candidateImg}
                                        alt={language === 'en' ? 'S. Prasanna' : 'S. பிரசன்னா'}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-white font-black text-xl sm:text-2xl md:text-3xl leading-tight">
                                        {language === 'en' ? 'S. Prasanna' : 'S. பிரசன்னா'}
                                    </h2>
                                    <p className="text-tvk-yellow text-xs sm:text-sm md:text-base font-extrabold mt-1">
                                        {language === 'en' ? 'Sholinganallur North Zone Secretary' : 'சோலிங்கநல்லூர் வட மண்டல செயலாளர்'}
                                    </p>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="relative mb-6">
                                <span className="text-tvk-yellow text-5xl sm:text-7xl font-black leading-none absolute -top-3 sm:-top-5 -left-1 sm:-left-2 opacity-40">"</span>
                                <p className="text-white/95 text-sm sm:text-base md:text-lg leading-relaxed pl-6 sm:pl-8 italic font-semibold">
                                    {language === 'en' ? (
                                        <>
                                            Your Trust,
                                            <br />Our Responsibility.
                                            <br />Your Progress,
                                            <br />Our Duty.
                                        </>
                                    ) : (
                                        <>
                                            உங்கள் நம்பிக்கை,
                                            <br />எங்கள் பொறுப்பு.
                                            <br />உங்கள் முன்னேற்றம்,
                                            <br />எங்கள் கடமை.
                                        </>
                                    )}
                                </p>
                            </div>

                            {/* Leaders Row */}
                            <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-6 pt-5 border-t border-white/10">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-tvk-yellow bg-white shrink-0">
                                    <img src="/anandtvk.png" alt="Anand TVK" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-tvk-yellow bg-white shrink-0">
                                    <img src="/ecrsaravanan.png" alt="ECR Saravanan" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-wider">{language === 'en' ? 'Leadership' : 'தலைமை'}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="lg:hidden mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                        <Link
                            to="/petition"
                            className="flex items-center justify-center gap-2 bg-tvk-red text-white font-bold py-3.5 px-7 rounded-xl shadow-lg hover:bg-tvk-darkRed transition-all text-sm border border-white/20"
                        >
                            <FileText size={18} />
                            <div className="text-left">
                                <span className="block font-extrabold text-sm sm:text-base">{language === 'en' ? 'Submit Complaint' : 'புகார் பதிவு செய்யவும்'}</span>
                                <span className="block text-[10px] text-white/60 font-normal">{language === 'en' ? 'Register local grievances' : 'சிக்கல்களை பதிவு செய்யவும்'}</span>
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                        <Link
                            to="/petition"
                            className="flex items-center justify-center gap-2 bg-white text-tvk-dark font-bold py-3.5 px-7 rounded-xl border-2 border-tvk-red/10 hover:bg-gray-50 hover:border-tvk-red/20 transition-all text-sm shadow-sm"
                        >
                            <Search size={18} className="text-tvk-red" />
                            <div className="text-left">
                                <span className="block font-extrabold text-sm sm:text-base text-tvk-dark">{language === 'en' ? 'Track Status' : 'புகார் நிலை அறியுங்கள்'}</span>
                                <span className="block text-[10px] text-tvk-dark/50 font-normal">{language === 'en' ? 'Check complaint status' : 'நிலையை சரிபார்க்கவும்'}</span>
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                        <Link
                            to="/join-tvk"
                            className="flex items-center justify-center gap-2 bg-tvk-yellow text-tvk-dark font-black py-3.5 px-7 rounded-xl border border-tvk-yellow hover:bg-yellow-400 transition-all text-sm shadow-md"
                        >
                            <HelpCircle size={18} className="text-tvk-red shrink-0" />
                            <div className="text-left">
                                <span className="block font-extrabold text-sm sm:text-base text-tvk-dark">{language === 'en' ? 'Join as Volunteer' : 'தன்னார்வலோர் இணைக'}</span>
                                <span className="block text-[10px] text-tvk-dark/65 font-bold">{language === 'en' ? 'Connect with services' : 'அரசாங்க உதவி பெறுங்கள்'}</span>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10" />
        </section>
    )
}

export default Hero
