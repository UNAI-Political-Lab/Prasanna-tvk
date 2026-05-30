import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import PetitionForm from '../components/PetitionForm'
import { Shield, FileCheck, Users } from 'lucide-react'
import JoinTVKCTA from '../components/JoinTVKCTA'
import { useLanguage } from '../context/LanguageContext'

const Petition = () => {
    const { language } = useLanguage()

    const benefits = [
        {
            icon: <Shield className="text-tvk-red" />,
            title: language === 'en' ? "Secure & Confidential" : "பாதுகாப்பான & ரகசியம்",
            desc: language === 'en'
                ? "Your personal details are fully secured and handled with utmost confidentiality and care."
                : "உங்கள் தனிப்பட்ட தகவல்கள் முழுமையாக பாதுகாக்கப்பட்டு மிகுந்த ரகசியத்தன்மையுடன் கவனமாக கையாளப்படும்."
        },
        {
            icon: <FileCheck className="text-tvk-red" />,
            title: language === 'en' ? "Trackable Progress" : "கண்காணிக்கக்கூடிய முன்னேற்றம்",
            desc: language === 'en'
                ? "Every petition is assigned a unique reference ID to track its resolution status easily."
                : "ஒவ்வொரு புகாரும் ஒரு தனித்துவமான குறியீட்டு எண் கொண்டு எளிதாகக் கண்காணிக்கப்படும்."
        },
        {
            icon: <Users className="text-tvk-red" />,
            title: language === 'en' ? "Collective Impact" : "கூட்டு தாக்கம்",
            desc: language === 'en'
                ? "Shared grievances help us identify and prioritize issues affecting a larger group of citizens."
                : "பொதுவான கவலைகள் அதிகமான மக்களைப் பாதிக்கும் பிரச்சினைகளைக் கண்டறிந்து முன்னுரிமைப்படுத்த உதவுகின்றன."
        },
    ]

    const listTopics = [
        language === 'en' ? "Local Road Repair & Maintenance" : "உள்ளூர் சாலை பழுது & பராமரிப்பு",
        language === 'en' ? "Drinking Water Supply & Sanitation Issues" : "குடிநீர் விநியோகம் & சுகாதார சிக்கல்கள்",
        language === 'en' ? "Youth Sports & Public Playground Infrastructure" : "இளைஞர் விளையாட்டு & பொது மைதான உட்கட்டமைப்பு",
        language === 'en' ? "Women Safety & Street Light Improvements" : "பெண்கள் பாதுகாப்பு & தெருவிளக்கு மேம்பாடுகள்",
        language === 'en' ? "Digital Literacy & Community Training Center Projects" : "டிஜிட்டல் எழுத்தறிவு & சமூக பயிற்சி மைய திட்டங்கள்"
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 md:pt-40 pb-20 bg-white"
        >
            <SEO
                title={language === 'en' ? "Petition Center | TVK Sholinganallur ECR" : "புகார் பதிவு | TVK சோலிங்கநல்லூர் ECR"}
                description={language === 'en'
                    ? "Directly report your local constituency issues, submit welfare requests, or offer community development ideas to Prasanna TVK."
                    : "உங்கள் கவலைகளை நேரடியாக TVK-க்கு தெரிவிக்கவும். சமூக மேம்பாடு மற்றும் குறை தீர்ப்பதற்கான புகார்களை சமர்ப்பிக்கவும்."
                }
                url="/petition"
            />
            <section className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-14">
                    {/* Left Side: Info */}
                    <div className="w-full lg:w-1/3">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-tvk-dark">
                            {language === 'en' ? (
                                <>Petition <span className="text-tvk-red">Center</span></>
                            ) : (
                                <>புகார் <span className="text-tvk-red">மையம்</span></>
                            )}
                        </h1>
                        <p className="text-lg text-tvk-dark/70 mb-10 leading-relaxed">
                            {language === 'en'
                                ? "Your concerns are our top priority. Use this platform to easily report local issues, submit requests, or suggest community development ideas."
                                : "உங்கள் கவலைகள் எங்கள் முன்னுரிமை. உள்ளூர் பிரச்சினைகளை புகாரளிக்க, கோரிக்கைகளை முன்வைக்க, அல்லது சமூக வளர்ச்சிக்கான முன்மொழிவுகளைச் சமர்ப்பிக்க இந்தத் தளத்தைப் பயன்படுத்துங்கள்."
                            }
                        </p>

                        <div className="space-y-7">
                            {benefits.map((item, i) => (
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

                        <div className="mt-14 p-7 bg-tvk-yellow/10 rounded-2xl border-2 border-dashed border-tvk-yellow/30">
                            <h3 className="font-bold text-tvk-dark mb-4">
                                {language === 'en' ? 'Common Petition Issues:' : 'பொதுவான புகார் தலைப்புகள்:'}
                            </h3>
                            <ul className="text-sm text-tvk-dark/70 space-y-2 list-disc pl-4">
                                {listTopics.map((topic, idx) => (
                                    <li key={idx}>{topic}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full lg:w-2/3">
                        <PetitionForm />
                    </div>
                </div>
            </section>
            <JoinTVKCTA />
        </motion.div>
    )
}

export default Petition
