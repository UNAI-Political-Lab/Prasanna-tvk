import React from 'react'
import { motion } from 'framer-motion'
import BiographyTimeline from '../components/BiographyTimeline'
import { Target, Lightbulb, ShieldCheck } from 'lucide-react'

const Biography = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 pb-20 bg-white"
        >
            {/* Bio Header */}
            <section className="container mx-auto px-4 md:px-6 mb-20">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full md:w-1/3 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative"
                    >
                        <img
                            src="/prasannatvk-bio.jpeg"
                            alt="TVK Candidate Mr. S. Prasanna"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-tvk-yellow text-tvk-red font-bold px-4 py-1 rounded-full text-xs uppercase tracking-tighter">
                            A Leader for All
                        </div>
                    </motion.div>

                    <div className="w-full md:w-2/3">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="bg-tvk-red/10 text-tvk-red font-black px-4 py-1 rounded-lg text-sm uppercase">Age: 35</span>
                            <span className="bg-tvk-red/10 text-tvk-red font-black px-4 py-1 rounded-lg text-sm uppercase">Father's Name: Mr. L. Sekar</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-tvk-dark leading-tight">
                            Mr. S. <span className="text-tvk-red italic">Prasanna</span>
                        </h1>
                        <p className="text-xl text-tvk-dark/80 mb-8 leading-relaxed font-medium">
                            A dynamic entrepreneur and committed social activist with over 15 years of experience in the premium automobile industry.
                        </p>
                        <p className="text-tvk-dark/60 leading-relaxed mb-10">
                            Operating under the leadership of his business **AUTO BOURN** in Velachery, Mr. Prasanna has built a reputation for trust, transparency, and excellence. His journey reflects a perfect blend of professional success and a deep-rooted commitment to public welfare and social justice.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { label: "Business Experience", value: "15+ Years" },
                                { label: "Premium Vehicles Sold", value: "5000+" },
                                { label: "New Party Members", value: "500+" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl border-2 border-tvk-red/5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col items-center group hover:border-tvk-yellow/30 transition-colors">
                                    <p className="text-tvk-red font-black text-3xl mb-1 group-hover:scale-110 transition-transform">{stat.value}</p>
                                    <p className="text-tvk-dark/50 text-xs font-black uppercase tracking-widest text-center">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section - Social Contributions */}
            <section className="bg-white py-24 border-y border-tvk-red/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-tvk-red/5 blur-[120px] -z-10 pointer-events-none" />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-tvk-dark">Social <span className="text-tvk-red italic">Impact</span></h2>
                        <div className="w-24 h-2 bg-tvk-yellow mx-auto mb-6 rounded-full"></div>
                        <p className="text-tvk-dark/60 font-medium text-lg">A consistent record of grassroots development and public engagement.</p>
                    </div>
                    <BiographyTimeline />
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <Target />, title: "Vision", desc: "Generating youth employment and supporting small/micro businesses to build a self-reliant Tamil Nadu." },
                            { icon: <Lightbulb />, title: "Mission", desc: "Action-driven resolution of public grievances and improving core infrastructure like drinking water accessibility." },
                            { icon: <ShieldCheck />, title: "Philosophy", desc: "Service with Commitment. Leadership with Responsibility. Politics with Purpose." },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-20 h-20 bg-tvk-red/10 rounded-3xl flex items-center justify-center text-tvk-red mx-auto mb-8 group-hover:bg-tvk-red group-hover:text-white transition-all duration-300">
                                    {React.cloneElement(item.icon, { size: 40 })}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-tvk-dark/60 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inspiration/Leader Section */}
            <section className="bg-white py-32 text-tvk-dark overflow-hidden relative border-t border-tvk-red/5">
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-tvk-yellow/5 blur-[120px] pointer-events-none -z-10" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-tvk-red/5 blur-[100px] pointer-events-none -z-10" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl md:text-6xl font-black mb-10 text-tvk-red leading-tight">Politics with <span className="text-tvk-dark italic">Purpose</span></h2>
                            <p className="text-tvk-dark/70 text-xl leading-relaxed mb-10 font-medium italic border-l-4 border-tvk-yellow pl-8">
                                "Our strength lies in our field-level participation and our ability to mobilize for the common good. We lead through action and accountability."
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-2 bg-tvk-red rounded-full" />
                                <span className="font-black text-2xl uppercase tracking-widest text-tvk-dark/40">The Leadership Vision</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-tvk-yellow/10 rounded-full blur-2xl" />
                                <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border-[12px] border-white overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative z-10 bg-gray-50">
                                    <img
                                        src="/thalapathy.png"
                                        alt="Thalapathy Vijay"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-tvk-red/5 to-transparent pointer-events-none" />
                                </div>
                                {/* Decorative Ring */}
                                <div className="absolute -inset-8 border border-tvk-red/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Biography
