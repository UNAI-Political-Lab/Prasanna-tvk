import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import StatsDashboard from '../components/StatsDashboard'
import IssueCategories from '../components/IssueCategories'
import ComplaintTracker from '../components/ComplaintTracker'
import AreaMap from '../components/AreaMap'
import QuickAccessBar from '../components/QuickAccessBar'
import PetitionForm from '../components/PetitionForm'
import { Link } from 'react-router-dom'
import {
    Users, Award, Shield, Heart,
    CheckCircle2, Quote, ChevronLeft, ChevronRight,
    ArrowRight, Lightbulb, Zap, Globe
} from 'lucide-react'
import JoinTVKCTA from '../components/JoinTVKCTA'
import { useLanguage } from '../context/LanguageContext'

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

const TestimonialsSection = () => {
    const { language } = useLanguage()
    const [idx, setIdx] = useState(0)

    const testimonials = [
        {
            name: language === 'en' ? "K. Rajendran" : "K. ராஜேந்திரன்",
            role: language === 'en' ? "Velachery Resident" : "வேளாச்சேரி குடியிருப்பாளர்",
            text: language === 'en'
                ? "Mr. Prasanna is always the first to act when needed. His genuine care for the people is unmatched."
                : "திரு. பிரசன்னா எப்போதும் தேவையான நேரத்தில் முதலில் செயல்படுவார். மக்கள் மீது அவரது உண்மையான அக்கறை ஒப்பற்றது."
        },
        {
            name: language === 'en' ? "S. Meenakshi" : "S. மீனாட்சி",
            role: language === 'en' ? "Self-Help Group Leader" : "சுய உதவி குழு தலைவர்",
            text: language === 'en'
                ? "Thanks to his support, our group received training and started a small business. He truly empowers women."
                : "அவரது ஆதரவால், எங்கள் குழு பயிற்சி பெற்று ஒரு சிறிய வணிகத்தை தொடங்கியது. அவர் உண்மையிலேயே பெண்களை வலிமைப்படுத்துகிறார்."
        },
        {
            name: language === 'en' ? "R. Arjun" : "R. அர்ஜுன்",
            role: language === 'en' ? "Youth Volunteer" : "இளைஞர் தன்னார்வலர்",
            text: language === 'en'
                ? "As a youth in Chennai, I feel heard. Prasanna Anna speaks for us and delivers on his promises."
                : "சென்னையில் ஒரு இளைஞனாக, நான் கேட்கப்படுகிறேன். பிரசன்னா அண்ணா எங்களுக்காக பேசுகிறார், வாக்குறுதி அளித்தபடி செயல்படுகிறார்."
        },
        {
            name: language === 'en' ? "T. Lakshmi" : "T. லட்சுமி",
            role: language === 'en' ? "Senior Citizen" : "மூத்த குடிமகன்",
            text: language === 'en'
                ? "He helped resolve our pension issue in a few days. I have never seen such a responsive leader."
                : "எங்கள் ஓய்வூதியத்தை சில நாட்களில் சரி செய்ய உதவினார். இவ்வளவு நேரடியாக செயல்படும் தலைவரை நான் பார்த்ததே இல்லை."
        },
    ]

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
    const { language } = useLanguage()

    const priorities = [
        {
            icon: <Zap size={22} />,
            title: language === 'en' ? "Youth Employment" : "இளையோர் வேலைவாய்ப்பு",
            desc: language === 'en'
                ? "Creating local job opportunities and skill development programs for the youth in Chennai."
                : "சென்னையில் இளைஞர்களுக்கான உள்ளூர் வேலைவாய்ப்புகள் மற்றும் திறன் மேம்பாட்டு திட்டங்கள்."
        },
        {
            icon: <Globe size={22} />,
            title: language === 'en' ? "Digital Access" : "டிஜிட்டல் அணுகல்",
            desc: language === 'en'
                ? "Bridging the digital divide through free internet hubs and technology literacy drives."
                : "இலவச இணைய மையங்கள் மற்றும் தொழில்நுட்ப எழுத்தறிவு இயக்கங்கள் மூலம் டிஜிட்டல் பிளவை குறைத்தல்."
        },
        {
            icon: <Lightbulb size={22} />,
            title: language === 'en' ? "Infrastructure" : "உட்கட்டமைப்பு",
            desc: language === 'en'
                ? "Better roads, reliable drinking water connectivity, and smart street lighting in every ward."
                : "வேகமான சாலைகள், நம்பகமான நீர் வழங்கல், மற்றும் ஒவ்வொரு வார்டிலும் ஸ்மார்ட் தெரு விளக்குகள்."
        },
        {
            icon: <Heart size={22} />,
            title: language === 'en' ? "Healthcare For All" : "அனைவருக்கும் சுகாதாரம்",
            desc: language === 'en'
                ? "Providing free medical camps and facilitating government healthcare welfare schemes."
                : "இலவச மருத்துவ முகாம்கள் மற்றும் அரசு சுகாதார திட்ட வசதிகள்."
        },
        {
            icon: <Shield size={22} />,
            title: language === 'en' ? "Women Safety" : "பெண்கள் பாதுகாப்பு",
            desc: language === 'en'
                ? "Enhancing women's security, street surveillance, and supporting local self-help group networks."
                : "பெண்கள் பாதுகாப்பு கண்காணிப்பு மற்றும் சுய உதவி குழு ஆதரவு நெட்வொர்க்குகள்."
        },
        {
            icon: <Users size={22} />,
            title: language === 'en' ? "Senior Citizens Support" : "மூத்த குடிமக்கள் ஆதரவு",
            desc: language === 'en'
                ? "Accelerating pension processing and setting up dedicated helpdesks for the elderly."
                : "விரைவுபடுத்தப்பட்ட ஓய்வூதிய செயலாக்கம் மற்றும் மூத்த குடிமக்களுக்கான உதவி மேசைகள்."
        },
    ]

    const bioBullets = [
        language === 'en' ? "Grassroots campaigner with direct community connection" : "நேரடி சமூக தொடர்புகளுடன் அடித்தள பிரச்சாரகர்",
        language === 'en' ? "Enrolled 500+ TVK party members directly in our ward" : "500+ TVK உறுப்பினர் சேர்க்கைகள் நேரடியாக நடத்தப்பட்டவை",
        language === 'en' ? "Coordinated 50+ community welfare and free medical camps" : "50+ நலன்புரி மற்றும் சுகாதார திட்டங்கள் ஒருங்கிணைப்பு",
        language === 'en' ? "Dedicated to the welfare of youth, women, and senior citizens" : "இளைஞர், பெண்கள் மற்றும் மூத்த குடிமக்கள் நலனுக்கு அர்ப்பணிப்பு"
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white">
            <SEO
                title={language === 'en' ? "TVK – Sholinganallur ECR | Public Services Portal" : "TVK – சோலிங்கநல்லூர் ECR | மக்கள் சேவை போர்டல்"}
                url="/"
                description={language === 'en'
                    ? "TVK Sholinganallur ECR Public Service Portal. File grievances, track petition status, access government schemes, and connect with public services."
                    : "TVK சோலிங்கநல்லூர் ECR மக்கள் சேவை போர்டல். புகார் பதிவு, நிலை கண்காணிப்பு, அரசு திட்டங்கள், மற்றும் பொது சேவைகள்."
                }
                schema={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Person",
                            "@id": "https://www.prasannatvk.com/#prasannatvk",
                            "name": "Prasanna TVK",
                            "alternateName": ["TVK Prasanna", "S. Prasanna"],
                            "description": "Prasanna TVK is an Indian politician, TVK (Tamilaga Vettri Kazhagam) member, and the founder of Autobourn Cars.",
                            "jobTitle": "Politician & Entrepreneur",
                            "url": "https://www.prasannatvk.com",
                            "image": "https://www.prasannatvk.com/prasannatvk-bio.jpeg",
                        },
                        {
                            "@type": "Organization",
                            "name": "Autobourn Cars",
                            "alternateName": "AUTO BOURN",
                            "description": "Premium automobile dealership founded by Prasanna TVK.",
                            "founder": {
                                "@type": "Person",
                                "name": "Prasanna TVK",
                                "url": "https://www.prasannatvk.com"
                            },
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Velachery",
                                "addressRegion": "Chennai, Tamil Nadu",
                                "addressCountry": "IN"
                            }
                        }
                    ]
                }}
            />

            {/* ── 1. Hero Section ── */}
            <Hero />

            {/* ── 2. Statistics Dashboard ── */}
            <StatsDashboard />

            {/* ── 3. Complaint Form + Issue Categories ── */}
            <section className="py-10 md:py-14 bg-gray-50/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left: Complaint Form */}
                        <div className="lg:col-span-2">
                            <div className="complaint-form-card">
                                <h2 className="text-xl md:text-2xl font-extrabold text-tvk-dark mb-2">
                                    {language === 'en' ? 'Register a Grievance' : 'புகார் பதிவு செய்யவும்'}
                                </h2>
                                <p className="text-sm text-tvk-dark/50 mb-6">
                                    {language === 'en' ? 'Easy, fast, and secure.' : 'எளிதாக, விரைவாக மற்றும் பாதுகாப்பாக.'}
                                </p>
                                <PetitionForm compact />
                            </div>
                        </div>

                        {/* Right: Issue Categories */}
                        <div className="lg:col-span-3 space-y-8">
                            <IssueCategories />

                            {/* Tracking + Map Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ComplaintTracker />
                                <AreaMap />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. Quick Access Bar ── */}
            <QuickAccessBar />

            {/* ── 5. Photo Spotlight Strip ── */}
            <section className="py-0 overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
                    {spotlightImages.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 1.05 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`h-48 md:h-80 overflow-hidden relative group ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
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

            {/* ── 6. About / Intro ── */}
            <section className="py-16 md:py-24 bg-white relative overflow-hidden">
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
                            <p className="text-xs font-black text-tvk-red uppercase tracking-[0.3em] mb-4 text-center lg:text-left">
                                {language === 'en' ? 'WHO WE ARE' : 'நாங்கள் யார்'}
                            </p>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-tvk-dark mb-6 leading-tight text-center lg:text-left">
                                {language === 'en' ? (
                                    <>Leader <span className="text-tvk-red">Rooted</span> in the People</>
                                ) : (
                                    <>மக்களில் <span className="text-tvk-red">வேரூன்றிய</span> தலைவர்</>
                                )}
                            </h2>
                            <p className="text-tvk-dark/65 text-lg leading-relaxed mb-6">
                                {language === 'en' ? (
                                    <>Mr. S. Prasanna is a 35-year-old entrepreneur and dedicated TVK member from Velachery, Chennai. As the founder of <strong>AUTO BOURN</strong>, he has built deep trust and established strong credibility in our local community through dedicated service for over 15 years.</>
                                ) : (
                                    <>திரு. S. பிரசன்னா 35 வயது தொழிலதிபர் மற்றும் வேளாச்சேரி, சென்னையைச் சேர்ந்த TVK உறுப்பினர். <strong>AUTO BOURN</strong> நிறுவனத்தின் நிறுவனர் என்ற முறையில், 15 ஆண்டுகளுக்கும் மேலாக சேவை மூலம் நம்பிக்கையை கட்டியெழுப்பியுள்ளார்.</>
                                )}
                            </p>
                            <ul className="space-y-3 mb-10">
                                {bioBullets.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-tvk-dark/70 font-medium">
                                        <CheckCircle2 size={20} className="text-tvk-red shrink-0 mt-0.5" />
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/biography" className="inline-flex items-center gap-3 bg-tvk-red text-white font-black py-4 px-10 rounded-2xl hover:bg-tvk-dark transition-colors shadow-[0_10px_30px_rgba(145,9,5,0.2)]">
                                {language === 'en' ? 'Full Biography' : 'முழு வாழ்க்கை வரலாறு'} <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── 7. Campaign Priorities ── */}
            <section className="py-16 md:py-24 bg-tvk-lightBg/40">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                        <p className="text-xs font-black text-tvk-red uppercase tracking-[0.3em] mb-3">
                            {language === 'en' ? 'OUR AGENDA' : 'எங்கள் நிகழ்ச்சி நிரல்'}
                        </p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-tvk-dark mb-4">
                            {language === 'en' ? (
                                <>Campaign <span className="text-tvk-red">Priorities</span></>
                            ) : (
                                <>பிரச்சார <span className="text-tvk-red">முன்னுரிமைகள்</span></>
                            )}
                        </h2>
                        <p className="text-tvk-dark/55 text-lg">
                            {language === 'en'
                                ? "Six major sectors designed to deliver measurable change for all residents from day one."
                                : "முதல் நாளிலிருந்தே அளவிடக்கூடிய மாற்றத்தை வழங்கும் ஆறு துறைகள்."
                            }
                        </p>
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

            {/* ── 8. Moments Grid ── */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
                        <p className="text-xs font-black text-tvk-red uppercase tracking-[0.3em] mb-3">
                            {language === 'en' ? 'CAPTURED MOMENTS' : 'கைப்பற்றப்பட்ட தருணங்கள்'}
                        </p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-tvk-dark">
                            {language === 'en' ? (
                                <>From the <span className="text-tvk-red">Field</span></>
                            ) : (
                                <>களத்தில் <span className="text-tvk-red">இருந்து</span></>
                            )}
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
                            {language === 'en' ? 'View Full Gallery' : 'முழு தொகுப்பு பார்க்க'} <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 9. Testimonials ── */}
            <section className="py-16 md:py-24 bg-tvk-lightBg/50 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-tvk-red/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-10 md:mb-14">
                        <p className="text-xs font-black text-tvk-red uppercase tracking-[0.3em] mb-3">
                            {language === 'en' ? 'WHAT PEOPLE SAY' : 'மக்கள் கூறுவது'}
                        </p>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-tvk-dark">
                            {language === 'en' ? (
                                <>Constituency <span className="text-tvk-red">Voices</span></>
                            ) : (
                                <>தொகுதியின் <span className="text-tvk-red">குரல்கள்</span></>
                            )}
                        </h2>
                    </div>
                    <TestimonialsSection />
                </div>
            </section>

            <JoinTVKCTA />
        </motion.div>
    )
}

export default Home
