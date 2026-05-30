import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import JoinTVKForm from '../components/JoinTVKForm'
import { Users, Heart, Zap, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const JoinTVK = () => {
    const { language } = useLanguage()

    const benefits = [
        {
            icon: <Users className="text-tvk-red" />,
            title: language === 'en' ? "Collective Strength" : "கூட்டு வலிமை",
            desc: language === 'en'
                ? "Your active participation strengthens our mission to serve the people."
                : "மக்களுக்குச் சேவை செய்யும் எங்களது பணியை உங்கள் பங்கேற்பு மேலும் வலுப்படுத்துகிறது."
        },
        {
            icon: <Heart className="text-tvk-red" />,
            title: language === 'en' ? "People First" : "மக்களே முதலில்",
            desc: language === 'en'
                ? "Our policies, welfare initiatives, and actions are always centered around social welfare."
                : "நமது கொள்கைகளும் திட்டங்களும் எப்போதும் மக்கள் நலனை மட்டுமே மையமாகக் கொண்டவை."
        },
        {
            icon: <Zap className="text-tvk-red" />,
            title: language === 'en' ? "Dynamic Leadership" : "துடிப்பான தலைமை",
            desc: language === 'en'
                ? "Be part of a vision that embraces modern solutions for our constituency's issues."
                : "நமது தொகுதியின் பிரச்சினைகளுக்கு நவீன தீர்வுகளை ஏற்கும் ஒரு தொலைநோக்கு பார்வையின் அங்கமாகுங்கள்."
        },
        {
            icon: <Globe className="text-tvk-red" />,
            title: language === 'en' ? "Statewide Impact" : "மாநில அளவிலான தாக்கம்",
            desc: language === 'en'
                ? "Work with us at the grassroots level to bring real change to every single corner."
                : "ஒவ்வொரு பகுதியிலும் உண்மையான மாற்றத்தைக் கொண்டுவர எங்களோடு இணைந்து அடித்தட்டு அளவில் பணியாற்றுங்கள்."
        },
    ]

    const listBenefits = [
        language === 'en' ? "Direct participation in local public welfare initiatives" : "உள்ளூர் பொதுநலத் திட்டங்களில் நேரடிப் பங்கேற்பு",
        language === 'en' ? "Access to constituency level party meetings and conventions" : "தொகுதி அளவிலான கட்சி கூட்டங்கள் மற்றும் மாநாடுகளில் பங்கேற்கும் வாய்ப்பு",
        language === 'en' ? "Regular official updates on party activities and policies" : "கட்சியின் செயல்பாடுகள் மற்றும் கொள்கைகள் பற்றிய அதிகாரப்பூர்வ தகவல்கள்",
        language === 'en' ? "Opportunity to contribute directly to local policy discussions" : "உள்ளூர் கொள்கை ஆலோசனைகளில் நேரடியாக பங்களிப்பதற்கான வாய்ப்பு",
        language === 'en' ? "Connect with active, like-minded individuals across the state" : "மாநிலம் முழுவதும் உள்ள துடிப்பான, ஒத்த கருத்துடையவர்களுடன் தொடர்பு கொள்ளும் வாய்ப்பு"
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-40 md:pt-48 pb-20 bg-white"
        >
            <SEO
                title={language === 'en' ? "Join TVK Membership" : "உறுப்பினர் சேர்க்கை முகாம் | TVK"}
                description={language === 'en'
                    ? "Become a member of Thamizhaga Vettri Kazhagam (TVK) with Prasanna TVK. Join the movement for a better Tamil Nadu."
                    : "பிரசன்னா TVK-உடன் இணைந்து தமிழக வெற்றி கழகத்தில் (TVK) உறுப்பினராகுங்கள். ஒரு சிறந்த தமிழ்நாட்டிற்கான இயக்கத்தில் சேருங்கள்."
                }
                url="/join-tvk"
            />
            <section className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Side: Info */}
                    <div className="w-full lg:w-1/3">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-tvk-dark">
                            {language === 'en' ? (
                                <>Join the <span className="text-tvk-red">Movement</span></>
                            ) : (
                                <>இயக்கத்தில் <span className="text-tvk-red">இணையுங்கள்</span></>
                            )}
                        </h1>
                        <p className="text-lg text-tvk-dark/70 mb-12 leading-relaxed">
                            {language === 'en'
                                ? "Thamizhaga Vettri Kazhagam is not just a political party; it's a collective voice for positive change. Join us in our journey to build a prosperous and equitable future for all citizens of Tamil Nadu."
                                : "தமிழக வெற்றி கழகம் என்பது வெறும் அரசியல் கட்சி அல்ல; அது நேர்மறையான மாற்றத்திற்கான கூட்டுக்குரல். தமிழ்நாட்டின் அனைத்து குடிமக்களுக்கும் ஒரு வளமான மற்றும் சமத்துவமான எதிர்காலத்தை உருவாக்க எங்களது பயணத்தில் இணையுங்கள்."
                            }
                        </p>

                        <div className="space-y-8">
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

                        <div className="mt-16 p-8 bg-tvk-red/5 rounded-2xl border-2 border-dashed border-tvk-red/20">
                            <h3 className="font-bold text-tvk-dark mb-4">
                                {language === 'en' ? 'Membership Benefits:' : 'உறுப்பினர் நன்மைகள்:'}
                            </h3>
                            <ul className="text-sm text-tvk-dark/70 space-y-2 list-disc pl-4 font-medium">
                                {listBenefits.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
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
