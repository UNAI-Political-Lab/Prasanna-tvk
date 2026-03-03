import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import JoinTVKForm from '../components/JoinTVKForm'
import { Users, Heart, Zap, Globe } from 'lucide-react'

const JoinTVK = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-40 md:pt-48 pb-20 bg-white"
        >
            <SEO
                title="Join TVK Membership"
                description="Become a member of Thamizhaga Vettri Kazhagam (TVK). Join the movement for a better Tamil Nadu."
                url="/join-tvk"
            />
            <section className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Side: Info */}
                    <div className="w-full lg:w-1/3">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-tvk-dark">
                            Join the <span className="text-tvk-red">Movement</span>
                        </h1>
                        <p className="text-lg text-tvk-dark/70 mb-12 leading-relaxed">
                            Thamizhaga Vettri Kazhagam is not just a party; it's a collective voice for change. Join us in our journey to build a prosperous and equitable future for Tamil Nadu.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: <Users className="text-tvk-red" />, title: "Collective Strength", desc: "Your participation strengthens our mission to serve the people." },
                                { icon: <Heart className="text-tvk-red" />, title: "People First", desc: "Our policies and actions are always centered around social welfare." },
                                { icon: <Zap className="text-tvk-red" />, title: "Dynamic Leadership", desc: "Be part of a vision that embraces modern solutions for age-old issues." },
                                { icon: <Globe className="text-tvk-red" />, title: "Statewide Impact", desc: "Work with us at the grassroots level to bring real change to every corner." },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 bg-tvk-red/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-tvk-dark mb-1">{item.title}</h3>
                                        <p className="text-sm text-tvk-dark/60 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 p-8 bg-tvk-red/5 rounded-2xl border-2 border-dashed border-tvk-red/20">
                            <h3 className="font-bold text-tvk-dark mb-4">Membership Benefits:</h3>
                            <ul className="text-sm text-tvk-dark/70 space-y-2 list-disc pl-4 font-medium">
                                <li>Direct participation in local initiatives</li>
                                <li>Access to party meetings and conventions</li>
                                <li>Regular updates on party activities and policies</li>
                                <li>Opportunity to contribute to policy discussions</li>
                                <li>Connect with like-minded individuals across the state</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full lg:w-2/3">
                        <JoinTVKForm />
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default JoinTVK
