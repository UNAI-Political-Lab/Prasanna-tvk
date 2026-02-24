import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import { Link } from 'react-router-dom'
import { Users, Award, Shield, Heart } from 'lucide-react'

const Home = () => {
    const highlights = [
        { icon: <Shield />, title: "Committed Service", desc: "15+ years of trusted leadership in business and grassroots social involvement." },
        { icon: <Users />, title: "People Mobilization", desc: "Proven capability in organizing mass gatherings and membership drives for TVK." },
        { icon: <Award />, title: "Accountability", desc: "A firm belief that leadership must be action-driven, transparent, and people-centric." },
        { icon: <Heart />, title: "Public Welfare", desc: "Dedicated to youth employment, infrastructure, and immediate grievance resolution." },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white"
        >
            <Hero />

            {/* Highlights Section */}
            <section className="py-24 bg-tvk-lightBg/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Core <span className="text-tvk-red">Philosophy</span></h2>
                        <div className="w-24 h-1.5 bg-tvk-red mx-auto mb-6 rounded-full"></div>
                        <p className="text-tvk-dark/60 max-w-2xl mx-auto text-lg">
                            **Service with Commitment. Leadership with Responsibility. Politics with Purpose.**
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-8 hover:bg-white transition-colors duration-300"
                            >
                                <div className="w-14 h-14 bg-tvk-red/10 rounded-2xl flex items-center justify-center text-tvk-red mb-6">
                                    {React.cloneElement(item.icon, { size: 28 })}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-tvk-dark/60 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-32 bg-white overflow-hidden relative border-t border-tvk-red/5">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-tvk-yellow/5 blur-[120px] pointer-events-none -z-10" />
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-tvk-red/5 blur-[100px] pointer-events-none -z-10" />

                <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-tvk-dark mb-8 leading-tight">Ready to Make a <span className="text-tvk-red italic">Difference?</span></h2>
                    <p className="text-tvk-dark/60 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Your voice matters. Submit your petitions, share your concerns, and let's build a better future together for all citizens.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-8">
                        <Link to="/petition" className="bg-tvk-yellow text-tvk-red font-black py-5 px-12 rounded-2xl shadow-[0_10px_30px_rgba(251,191,36,0.3)] hover:shadow-[0_15px_40px_rgba(251,191,36,0.4)] transition-all transform hover:-translate-y-1.5 text-lg">
                            Submit Your Petition
                        </Link>
                        <Link to="/contact" className="bg-white border-2 border-tvk-red/20 text-tvk-red font-black py-5 px-12 rounded-2xl hover:bg-tvk-red hover:text-white transition-all transform hover:-translate-y-1.5 text-lg shadow-xl">
                            Join the Campaign
                        </Link>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Home
