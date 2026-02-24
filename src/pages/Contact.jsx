import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

const Contact = () => {
    const contactInfo = [
        {
            icon: <MapPin />,
            title: "Main Office",
            details: ["No 27 100 feet road taramani link road  ", "Velachery", "Chennai, TAMIL NADU 600042"]
        },
        {
            icon: <Phone />,
            title: "Helpline",
            details: ["+91 9884770108"]
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
                        <div className="mt-10 rounded-2xl overflow-hidden shadow-lg border-4 border-white h-72 relative group bg-gray-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.488314156!2d80.20755!3d12.9791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d8869c9b489%3A0x6bba46c53ed98322!2sVelachery%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale group-hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                            <div className="absolute inset-0 pointer-events-none border-2 border-tvk-red/10 rounded-2xl"></div>
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
