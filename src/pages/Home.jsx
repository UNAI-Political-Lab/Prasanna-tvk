import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import { Link } from 'react-router-dom'
import {
    Users, Award, Shield, Heart,
    CheckCircle2, Quote, ChevronLeft, ChevronRight,
    ArrowRight, Lightbulb, Zap, Globe
} from 'lucide-react'

// ── Prasanna-TVK-Main image imports ──────────────────────────────────────────
import main1 from '../assets/Prasanna-TVK-Main/1.jpeg'
import main2 from '../assets/Prasanna-TVK-Main/2.jpeg'
import main3 from '../assets/Prasanna-TVK-Main/3.jpeg'
import main4 from '../assets/Prasanna-TVK-Main/4.jpeg'
import main5 from '../assets/Prasanna-TVK-Main/5.jpeg'
import main6 from '../assets/Prasanna-TVK-Main/6.jpeg'
import main7 from '../assets/Prasanna-TVK-Main/7.jpeg'
import main8 from '../assets/Prasanna-TVK-Main/8.jpeg'
import main9 from '../assets/Prasanna-TVK-Main/9.jpeg'
import main10 from '../assets/Prasanna-TVK-Main/10.jpeg'
import main11 from '../assets/Prasanna-TVK-Main/11.jpeg'

const spotlightImages = [main1, main2, main3, main4, main5]
const momentImages = [main6, main7, main8, main9, main10, main11]

// ── Testimonial Carousel ──────────────────────────────────────────────────────
const testimonials = [
    { name: "K. Rajendran", role: "Velachery Resident", text: "Mr. Prasanna has always been the first to respond in times of need. His genuine care for the people is unmatched." },
    { name: "S. Meenakshi", role: "Self-Help Group Leader", text: "Thanks to his support, our group received training and started a small business. He truly empowers women." },
    { name: "R. Arjun", role: "Youth Volunteer", text: "As a young person in Chennai, I feel heard. Prasanna anna speaks for us and acts on what he promises." },
    { name: "T. Lakshmi", role: "Senior Citizen", text: "He helped us get our pension sorted within days. I've never seen a leader so hands-on with problems." },
]

const Testimonials = () => {
    const [idx, setIdx] = useState(0)
    const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length)
    const next = () => setIdx(i => (i + 1) % testimonials.length)
    const t = testimonials[idx]

    return (
        <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-tvk-red/5 text-center"
                >
                    <Quote className="text-tvk-red/20 mx-auto mb-6" size={48} />
                    <p className="text-xl md:text-2xl font-medium text-tvk-dark/80 leading-relaxed italic mb-8">
                        "{t.text}"
                    </p>
                    <div className="flex flex-col items-center gap-1">
                        <span className="font-black text-tvk-dark text-lg">{t.name}</span>
                        <span className="text-tvk-red text-sm font-bold uppercase tracking-widest">{t.role}</span>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-center items-center gap-6 mt-8">
                <button onClick={prev} className="w-11 h-11 rounded-full bg-tvk-red/10 hover:bg-tvk-red text-tvk-red hover:text-white flex items-center justify-center transition-all">
                    <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                        <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'bg-tvk-red w-6' : 'bg-tvk-red/20 w-2'}`} />
                    ))}
                </div>
                <button onClick={next} className="w-11 h-11 rounded-full bg-tvk-red/10 hover:bg-tvk-red text-tvk-red hover:text-white flex items-center justify-center transition-all">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────
const Home = () => {
    const highlights = [
        { icon: <Shield />, title: "Committed Service", desc: "15+ years of trusted leadership in business and grassroots social involvement." },
        { icon: <Users />, title: "People Mobilization", desc: "Proven capability in organizing mass gatherings and membership drives for TVK." },
        { icon: <Award />, title: "Accountability", desc: "A firm belief that leadership must be action-driven, transparent, and people-centric." },
        { icon: <Heart />, title: "Public Welfare", desc: "Dedicated to youth employment, infrastructure, and immediate grievance resolution." },
    ]

    const achievements = [
        { value: "15+", label: "Years in Business" },
        { value: "5000+", label: "Vehicles Sold" },
        { value: "500+", label: "TVK Members Enrolled" },
        { value: "50+", label: "Welfare Programmes" },
    ]

    const priorities = [
        { icon: <Zap size={22} />, title: "Youth Employment", desc: "Creating local job opportunities and skilling programs for young people in Chennai." },
        { icon: <Globe size={22} />, title: "Digital Access", desc: "Bridging the digital divide with free internet hubs and tech literacy drives." },
        { icon: <Lightbulb size={22} />, title: "Infrastructure", desc: "Faster roads, reliable water supply, and smart street lighting in every ward." },
        { icon: <Heart size={22} />, title: "Healthcare for All", desc: "Free medical camps and government health scheme facilitation across the constituency." },
        { icon: <Shield size={22} />, title: "Women Safety", desc: "Strict monitoring of women safety and empowerment through SHG support networks." },
        { icon: <Users size={22} />, title: "Senior Citizen Support", desc: "Expedited pension processing and dedicated helpdesks for senior citizens." },
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white">
            <SEO title="Home" url="/" />
            <Hero />

            {/* ── Core Philosophy ── */}
            <section className="py-16 md:py-24 bg-tvk-lightBg/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Core <span className="text-tvk-red">Philosophy</span></h2>
                        <div className="w-24 h-1.5 bg-tvk-red mx-auto mb-6 rounded-full" />
                        <p className="text-tvk-dark/60 max-w-2xl mx-auto text-lg">
                            Service with Commitment. Leadership with Responsibility. Politics with Purpose.
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
                                <p className="text-tvk-dark/60 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Photo Spotlight Strip (images 1–5) ── */}
            <section className="py-0 overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
                    {spotlightImages.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 1.05 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`h-48 md:h-96 overflow-hidden relative group ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                        >
                            <img
                                src={img}
                                alt={`Campaign moment ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── About / Intro ── */}
            <section className="py-16 md:py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-tvk-yellow/5 blur-[120px] pointer-events-none" />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
                        {/* Image collage */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-1/2 grid grid-cols-2 gap-3 md:gap-4"
                        >
                            <img src={main6} alt="Prasanna in Action" className="rounded-2xl object-cover h-48 md:h-64 w-full shadow-lg col-span-2" />
                            <img src={main7} alt="Community Work" className="rounded-2xl object-cover h-36 md:h-48 w-full shadow-md" />
                            <img src={main8} alt="Party Event" className="rounded-2xl object-cover h-36 md:h-48 w-full shadow-md" />
                        </motion.div>

                        {/* Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-1/2"
                        >
                            <p className="text-xs font-black text-tvk-red uppercase tracking-[0.3em] mb-4 text-center lg:text-left">Who We Are</p>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-tvk-dark mb-6 leading-tight text-center lg:text-left">
                                A Leader Rooted in <span className="text-tvk-red">People</span>
                            </h2>
                            <p className="text-tvk-dark/65 text-lg leading-relaxed mb-6">
                                Mr. S. Prasanna is a 35-year-old entrepreneur and TVK member from Velachery, Chennai. As the founder of <strong>AUTO BOURN</strong>, he has spent over 15 years building trust through service — first in business, now in public life.
                            </p>
                            <p className="text-tvk-dark/65 leading-relaxed mb-8">
                                His campaign is built on one belief: that genuine leadership means being present, being accountable, and delivering real change to every household in the constituency.
                            </p>
                            <ul className="space-y-3 mb-10">
                                {[
                                    "Grassroots campaigner with direct community ties",
                                    "500+ TVK membership enrollments personally driven",
                                    "Organised 50+ welfare and healthcare programmes",
                                    "Committed to youth, women, and senior citizen welfare",
                                ].map((pt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-tvk-dark/70 font-medium">
                                        <CheckCircle2 size={20} className="text-tvk-red shrink-0 mt-0.5" />
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/biography" className="inline-flex items-center gap-3 bg-tvk-red text-white font-black py-4 px-10 rounded-2xl hover:bg-tvk-dark transition-colors shadow-[0_10px_30px_rgba(145,9,5,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                                Read Full Biography <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Achievements Counter ── */}
            <section className="bg-tvk-dark py-14 md:py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {achievements.map((a, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center border-l border-white/10 pl-4 md:pl-8 first:border-0 first:pl-0"
                            >
                                <p className="text-4xl md:text-5xl font-black text-tvk-yellow mb-2">{a.value}</p>
                                <p className="text-white/50 font-black uppercase tracking-widest text-[10px] md:text-xs">{a.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Campaign Priorities ── */}
            <section className="py-16 md:py-28 bg-tvk-lightBg/40">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                        <p className="text-xs font-black text-tvk-red uppercase tracking-[0.3em] mb-3">Our Agenda</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-tvk-dark mb-4">
                            Campaign <span className="text-tvk-red">Priorities</span>
                        </h2>
                        <p className="text-tvk-dark/55 text-lg">Six areas where we will deliver measurable change from day one.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {priorities.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="bg-white rounded-2xl p-8 border border-tvk-red/5 shadow-sm hover:shadow-xl hover:border-tvk-yellow/30 transition-all duration-400 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-tvk-red/10 group-hover:bg-tvk-red flex items-center justify-center text-tvk-red group-hover:text-white transition-all duration-300 mb-5">
                                    {p.icon}
                                </div>
                                <h3 className="font-black text-lg text-tvk-dark mb-2">{p.title}</h3>
                                <p className="text-tvk-dark/55 text-sm leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Moments Grid (images 9–11 + 6–8) ── */}
            <section className="py-16 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
                        <p className="text-xs font-black text-tvk-red uppercase tracking-[0.3em] mb-3">Captured Moments</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-tvk-dark">
                            On the <span className="text-tvk-red">Ground</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {momentImages.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.94 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className={`overflow-hidden rounded-2xl group relative ${i === 0 ? 'col-span-2 md:col-span-1' : ''}`}
                            >
                                <img
                                    src={img}
                                    alt={`Field moment ${i + 1}`}
                                    className="w-full h-56 md:h-72 object-cover transition-transform duration-700 group-hover:scale-108"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link to="/services" className="inline-flex items-center gap-2 text-tvk-red font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
                            View Full Gallery <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="py-16 md:py-28 bg-tvk-lightBg/50 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-tvk-red/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-10 md:mb-14">
                        <p className="text-xs font-black text-tvk-red uppercase tracking-[0.3em] mb-3">What People Say</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-tvk-dark">
                            Voices of the <span className="text-tvk-red">Constituency</span>
                        </h2>
                    </div>
                    <Testimonials />
                </div>
            </section>

            {/* ── Call to Action ── */}
            <section className="py-20 md:py-32 bg-white overflow-hidden relative border-t border-tvk-red/5">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-tvk-yellow/5 blur-[120px] pointer-events-none -z-10" />
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-tvk-red/5 blur-[100px] pointer-events-none -z-10" />
                <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-6xl font-black text-tvk-dark mb-6 md:mb-8 leading-tight">
                        Ready to Make a <span className="text-tvk-red italic">Difference?</span>
                    </h2>
                    <p className="text-tvk-dark/60 text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Your voice matters. Submit your petitions, share your concerns, and let's build a better future together for all citizens.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
                        <Link to="/petition" className="bg-tvk-yellow text-tvk-red font-black py-4 md:py-5 px-8 md:px-12 rounded-2xl shadow-[0_10px_30px_rgba(251,191,36,0.3)] hover:shadow-[0_15px_40px_rgba(251,191,36,0.4)] transition-all transform hover:-translate-y-1.5 text-base md:text-lg">
                            Submit Your Petition
                        </Link>
                        <Link to="/contact" className="bg-white border-2 border-tvk-red/20 text-tvk-red font-black py-4 md:py-5 px-8 md:px-12 rounded-2xl hover:bg-tvk-red hover:text-white transition-all transform hover:-translate-y-1.5 text-base md:text-lg shadow-xl">
                            Join the Campaign
                        </Link>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Home
