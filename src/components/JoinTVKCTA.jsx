import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const JoinTVKCTA = () => {
    const { language } = useLanguage()

    return (
        <section className="py-16 md:py-24 bg-white overflow-hidden relative border-t border-tvk-red/5">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-tvk-yellow/5 blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-tvk-red/5 blur-[100px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto glass-card p-8 md:p-14 text-center border-2 border-tvk-red/10"
                >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-tvk-red/10 rounded-2xl text-tvk-red mb-6">
                        <Users size={28} />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-tvk-dark mb-5 leading-tight">
                        {language === 'en' ? (
                            <>Become a <span className="text-tvk-red">TVK Member</span></>
                        ) : (
                            <><span className="text-tvk-red">TVK இயக்கத்தின்</span> உறுப்பினராகுங்கள்</>
                        )}
                    </h2>

                    <p className="text-tvk-dark/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                        {language === 'en'
                            ? "Join hands with Prasanna TVK to bring real change to Tamil Nadu. Your active participation is the foundation of our success."
                            : "தமிழ்நாட்டில் உண்மையான மாற்றத்தை கொண்டுவர பிரசன்னா TVK-யுடன் கைகோர்க்கவும். உங்கள் பங்கேற்பே எங்கள் வெற்றியின் அடிப்படை."
                        }
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                        <Link
                            to="/join-tvk"
                            className="w-full sm:w-auto bg-tvk-red text-white font-black py-4 px-10 rounded-2xl shadow-[0_15px_40px_rgba(145,9,5,0.25)] hover:shadow-[0_20px_50px_rgba(145,9,5,0.35)] transition-all transform hover:-translate-y-1 uppercase tracking-widest flex items-center justify-center gap-3"
                        >
                            {language === 'en' ? 'Join Now' : 'இப்போது சேர'} <ArrowRight size={20} />
                        </Link>

                        <Link
                            to="/petition"
                            className="w-full sm:w-auto bg-white border-2 border-tvk-yellow text-tvk-dark font-black py-4 px-10 rounded-2xl hover:bg-tvk-yellow/10 transition-all transform hover:-translate-y-1 uppercase tracking-widest flex items-center justify-center gap-3"
                        >
                            {language === 'en' ? 'Submit Petition' : 'புகார் சமர்ப்பிக்க'}
                        </Link>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-6 grayscale opacity-40">
                        <div className="h-0.5 w-10 bg-tvk-dark/20" />
                        <span className="text-xs font-black uppercase tracking-[0.3em]">
                            {language === 'en' ? 'TAMILAGA VETTRI KAZHAGAM' : 'தமிழக வெற்றி கழகம்'}
                        </span>
                        <div className="h-0.5 w-10 bg-tvk-dark/20" />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default JoinTVKCTA
