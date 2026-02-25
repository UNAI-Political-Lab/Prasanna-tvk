import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import PetitionForm from '../components/PetitionForm'
import { Shield, FileCheck, Users } from 'lucide-react'

const Petition = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 pb-20 bg-white"
        >
            <SEO title="Submit a Petition" description="Voice your concerns and submit petitions directly to Prasanna TVK for community improvements and grievance resolution." url="/petition" />
            <section className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Side: Info */}
                    <div className="w-full lg:w-1/3">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-tvk-dark">
                            Action <span className="text-tvk-red">Center</span>
                        </h1>
                        <p className="text-lg text-tvk-dark/70 mb-12 leading-relaxed">
                            Your concerns are our priority. Use this platform to voice your demands, report local issues, or propose initiatives for our community's development.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: <Shield className="text-tvk-red" />, title: "Secure & Confidential", desc: "Your personal information is protected and handled with utmost care." },
                                { icon: <FileCheck className="text-tvk-red" />, title: "Trackable Progress", desc: "Every petition is indexed and tracked for resolution by our team." },
                                { icon: <Users className="text-tvk-red" />, title: "Collective Impact", desc: "Shared concerns help us prioritize issues that affect the most people." },
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

                        <div className="mt-16 p-8 bg-tvk-yellow/10 rounded-2xl border-2 border-dashed border-tvk-yellow/30">
                            <h3 className="font-bold text-tvk-dark mb-4">Common Petition Topics:</h3>
                            <ul className="text-sm text-tvk-dark/70 space-y-2 list-disc pl-4">
                                <li>Local Road Repair & Maintenance</li>
                                <li>Water Supply & Sanitation Issues</li>
                                <li>Youth Sports Infrastructure Demands</li>
                                <li>Women's Safety & Lighting Concerns</li>
                                <li>Digital Literacy Center Proposals</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full lg:w-2/3">
                        <PetitionForm />
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Petition
