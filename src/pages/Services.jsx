import React from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'
import {
    Users,
    BookOpen,
    Building2,
    Heart,
    Wrench,
    Baby,
    GraduationCap,
    Zap,
    Globe
} from 'lucide-react'

const Services = () => {
    const services = [
        {
            icon: <Users />,
            title: "Public Welfare Support",
            desc: "Direct assistance for family welfare schemes, pension processing, and emergency aid for those in need."
        },
        {
            icon: <GraduationCap />,
            title: "Youth Empowerment",
            desc: "Skill development centers, career counseling, and job placement assistance for the younger generation."
        },
        {
            icon: <BookOpen />,
            title: "Education Development",
            desc: "Supporting government schools with digital infrastructure, library upgrades, and scholarships for meritorious students."
        },
        {
            icon: <Building2 />,
            title: "Infrastructure Improvement",
            desc: "Monitoring and advocating for better roads, clean drinking water, and efficient drainage systems in our area."
        },
        {
            icon: <Baby />,
            title: "Women Empowerment",
            desc: "Financial literacy programs, self-help group support, and vocational training exclusively for women."
        },
        {
            icon: <Heart />,
            title: "Healthcare Initiatives",
            desc: "Organizing regular free medical camps, eye checkups, and facilitating access to quality healthcare for all."
        },
        {
            icon: <Zap />,
            title: "Rural Development",
            desc: "Transforming villages with smart lighting, sustainable waste management, and agricultural support systems."
        },
        {
            icon: <Globe />,
            title: "Digital Connectivity",
            desc: "Bringing high-speed internet and digital literacy to rural areas to bridge the technological divide."
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 pb-20 bg-white"
        >
            <section className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold mb-6 text-tvk-dark"
                    >
                        Public <span className="text-tvk-red">Services</span>
                    </motion.h1>
                    <div className="w-24 h-2 bg-tvk-red mx-auto mb-8 rounded-full"></div>
                    <p className="text-lg text-tvk-dark/60 leading-relaxed">
                        Our commitment is to serve. Explore the various initiatives and support programs designed to improve the quality of life for every citizen in our constituency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ServiceCard {...service} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Success Stats */}
            <section className="mt-24 bg-tvk-dark py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { label: "Business Experience", value: "15+ Yrs" },
                            { label: "Premium Vehicles Sold", value: "5000+" },
                            { label: "Active TVK Members", value: "500+" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center border-l-2 border-tvk-yellow/30 pl-8 first:border-0">
                                <p className="text-5xl font-black text-white mb-2">{stat.value}</p>
                                <p className="text-tvk-yellow/60 font-black uppercase tracking-widest text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Help Section */}
            <section className="container mx-auto px-4 md:px-6 mt-32">
                <div className="bg-tvk-dark border-2 border-tvk-red/10 rounded-[4rem] p-16 md:p-24 text-tvk-dark flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-tvk-yellow/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-tvk-red/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Mobilizing for <span className="text-white">Empowerment</span></h2>
                    <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Mr. S. Prasanna is committed to leveraging his organizational strength to improve infrastructure and ensure immediate resolution of public grievances.
                    </p>
                    <div className="flex gap-8">
                        <button className="bg-tvk-red text-white font-black py-5 px-12 rounded-2xl shadow-[0_10px_30px_rgba(145,9,5,0.2)] hover:shadow-[0_15px_40px_rgba(145,9,5,0.3)] transition-all transform hover:-translate-y-1.5 text-lg uppercase tracking-widest">
                            Contact Your Representative
                        </button>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Services
