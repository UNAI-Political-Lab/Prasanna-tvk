import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'

const JoinTVKCTA = () => {
    return (
        <section className="py-20 md:py-28 bg-white overflow-hidden relative border-t border-tvk-red/5">
            {/* Background elements for premium feel */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-tvk-yellow/5 blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-tvk-red/5 blur-[100px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto glass-card p-8 md:p-16 text-center border-2 border-tvk-red/10"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-tvk-red/10 rounded-2xl text-tvk-red mb-8">
                        <Users size={32} />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-tvk-dark mb-6 leading-tight">
                        Become a Member of <span className="text-tvk-red italic">TVK Movement</span>
                    </h2>

                    <p className="text-tvk-dark/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Join hands with Prasanna TVK to bring real change to Tamil Nadu. Your participation is the foundation of our success.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        <Link
                            to="/join-tvk"
                            className="w-full sm:w-auto bg-tvk-red text-white font-black py-5 px-12 rounded-2xl shadow-[0_15px_40px_rgba(145,9,5,0.25)] hover:shadow-[0_20px_50px_rgba(145,9,5,0.35)] transition-all transform hover:-translate-y-1.5 uppercase tracking-widest flex items-center justify-center gap-3"
                        >
                            Join Now <ArrowRight size={22} />
                        </Link>

                        <Link
                            to="/petition"
                            className="w-full sm:w-auto bg-white border-2 border-tvk-yellow text-tvk-dark font-black py-5 px-12 rounded-2xl hover:bg-tvk-yellow/10 transition-all transform hover:-translate-y-1.5 uppercase tracking-widest flex items-center justify-center gap-3"
                        >
                            Submit Action
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-40">
                        <div className="h-0.5 w-12 bg-tvk-dark/20" />
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Thamizhaga Vettri Kazhagam</span>
                        <div className="h-0.5 w-12 bg-tvk-dark/20" />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default JoinTVKCTA
