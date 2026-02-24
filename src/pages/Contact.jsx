import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

const Contact = () => {
    const contactInfo = [
        {
            icon: <MapPin />,
            title: "Main Office",
            details: ["123 Victory Street,", "District Headquarters, Tamil Nadu, 600001"]
        },
        {
            icon: <Phone />,
            title: "Helpline",
            details: ["+91 98765 43210", "+91 94444 00000"]
        },
        {
            icon: <Mail />,
            title: "Email Us",
            details: ["contact@tvkcandidate.com", "grievance@tvk.org"]
        },
        {
            icon: <Clock />,
            title: "Office Hours",
            details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 2:00 PM"]
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
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-tvk-dark">
                        Get in <span className="text-tvk-red">Touch</span>
                    </h1>
                    <p className="text-lg text-tvk-dark/60">
                        Have questions or want to volunteer? Reach out to our office through any of the channels below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info Cards Side */}
                    <div className="order-2 lg:order-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {contactInfo.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-6 rounded-2xl shadow-md border border-tvk-red/5 group hover:border-tvk-red/20 transition-all"
                                >
                                    <div className="w-12 h-12 bg-tvk-red/10 rounded-xl flex items-center justify-center text-tvk-red mb-4 group-hover:bg-tvk-red group-hover:text-white transition-all">
                                        {React.cloneElement(item.icon, { size: 24 })}
                                    </div>
                                    <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                                    {item.details.map((line, idx) => (
                                        <p key={idx} className="text-tvk-dark/60 text-sm leading-relaxed">{line}</p>
                                    ))}
                                </motion.div>
                            ))}
                        </div>

                        {/* Map Placeholder */}
                        <div className="mt-10 rounded-2xl overflow-hidden shadow-lg border-4 border-white h-72 relative group">
                            <img
                                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1000"
                                alt="Map Placeholder"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-tvk-red/10 group-hover:bg-transparent transition-all" />
                            <div className="absolute bottom-4 right-4">
                                <a href="#" className="bg-white text-tvk-red font-bold px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm hover:scale-105 transition-all">
                                    Open in Maps <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="order-1 lg:order-2">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Contact
