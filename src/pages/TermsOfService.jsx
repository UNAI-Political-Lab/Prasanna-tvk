import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import JoinTVKCTA from '../components/JoinTVKCTA'
import { useLanguage } from '../context/LanguageContext'
import { Scale, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react'

const TermsOfService = () => {
    const { language } = useLanguage()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 md:pt-40 pb-20 bg-gray-50/30"
        >
            <SEO
                title={language === 'en' ? "Terms of Service | TVK Sholinganallur ECR" : "சேவை விதிமுறைகள் | TVK சோலிங்கநல்லூர் ECR"}
                description={language === 'en'
                    ? "Terms of Service for the TVK Sholinganallur ECR Public Services Portal. Read rules and guidelines on grievance submission and portal usage."
                    : "TVK சோலிங்கநல்லூர் ECR மக்கள் சேவை தளத்தின் சேவை விதிமுறைகள் மற்றும் பயன்பாட்டு விதிகளை வாசியுங்கள்."
                }
                url="/terms-of-service"
            />
            <section className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-14">
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                        <div className="w-12 h-12 bg-tvk-red/10 rounded-2xl flex items-center justify-center text-tvk-red shrink-0">
                            <Scale size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-tvk-dark">
                                {language === 'en' ? 'Terms of Service' : 'சேவை விதிமுறைகள்'}
                            </h1>
                            <p className="text-xs text-tvk-dark/45 font-bold uppercase tracking-wider mt-1">
                                {language === 'en' ? 'Last Updated: June 20, 2026' : 'கடைசியாக புதுப்பிக்கப்பட்டது: ஜூன் 20, 2026'}
                            </p>
                        </div>
                    </div>

                    <div className="prose max-w-none text-tvk-dark/70 space-y-8 font-medium">
                        {language === 'en' ? (
                            <>
                                <p className="text-lg leading-relaxed text-tvk-dark/80">
                                    Welcome to the <strong>TVK Sholinganallur ECR Public Services Portal</strong>. By accessing this website or using our services (such as submitting grievances, tracking complaints, or joining as a volunteer), you agree to comply with and be bound by the following Terms of Service.
                                </p>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <CheckCircle2 size={18} className="text-tvk-red" /> 1. Portal Usage and Grievances
                                    </h2>
                                    <p className="leading-relaxed">
                                        Our platform is designed to facilitate local constituency development and resolve civic issues. By submitting a grievance, you represent that:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>The details and descriptions provided are authentic, accurate, and truthful.</li>
                                        <li>The issue reported pertains to the local area, public infrastructure, or genuine individual welfare concerns.</li>
                                        <li>You will not upload spam, offensive materials, or malicious files.</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <AlertTriangle size={18} className="text-tvk-red" /> 2. Volunteer & Community Participation
                                    </h2>
                                    <p className="leading-relaxed">
                                        Volunteering initiatives, memberships, and community group enrollments coordinated through this website are entirely on a goodwill basis. Participations must be centered around peaceful, constructive civic engagement and TVK's official guidelines for welfare work.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <Scale size={18} className="text-tvk-red" /> 3. Limitation of Liability & Facilitation
                                    </h2>
                                    <p className="leading-relaxed">
                                        This portal serves as an intermediary platform created by Prasanna TVK's constituency office to coordinate, verify, and highlight local problems with relevant civic and government bodies. While our team makes every effort to coordinate and follow up on your complaints, we do not guarantee immediate resolution or assume legal liability for public utility issues.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <HelpCircle size={18} className="text-tvk-red" /> 4. Modifications to the Portal
                                    </h2>
                                    <p className="leading-relaxed">
                                        We reserve the right to modify, suspend, or discontinue any feature, page, or service on this portal at any time to serve the public welfare better. The Terms of Service may be updated occasionally, and continued use signifies your acceptance.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-lg leading-relaxed text-tvk-dark/80">
                                    <strong>TVK சோலிங்கநல்லூர் ECR மக்கள் சேவை போர்ட்டலுக்கு</strong> உங்களை வரவேற்கிறோம். இந்த இணையதளத்தை அணுகுவதன் மூலமோ அல்லது எங்கள் சேவைகளைப் பயன்படுத்துவதன் மூலமோ (புகார் சமர்ப்பித்தல், கண்காணித்தல், அல்லது தன்னார்வலராக இணைதல்), நீங்கள் பின்வரும் சேவை விதிமுறைகளுக்கு இணங்க ஒப்புக்கொள்கிறீர்கள்.
                                </p>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <CheckCircle2 size={18} className="text-tvk-red" /> 1. போர்டல் பயன்பாடு மற்றும் புகார்கள்
                                    </h2>
                                    <p className="leading-relaxed">
                                        எங்கள் தளம் உள்ளூர் தொகுதி மேம்பாடு மற்றும் மக்கள் குறைகளைத் தீர்ப்பதற்கான ஒரு பாலமாக வடிவமைக்கப்பட்டுள்ளது. புகார் சமர்ப்பிப்பதன் மூலம், நீங்கள் உறுதியளிப்பது:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>வழங்கப்பட்ட விவரங்கள் மற்றும் விளக்கங்கள் உண்மையானவை, துல்லியமானவை மற்றும் நம்பகமானவை.</li>
                                        <li>புகார் உள்ளூர் பகுதி, பொது உள்கட்டமைப்பு அல்லது உண்மையான தனிநபர் நலன் சார்ந்த கவலைகளை மட்டுமே உள்ளடக்கியது.</li>
                                        <li>தேவையற்ற விளம்பரங்கள், புண்படுத்தும் ஆவணங்கள் அல்லது தீங்கிழைக்கும் கோப்புகளைப் பதிவேற்ற மாட்டீர்கள்.</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <AlertTriangle size={18} className="text-tvk-red" /> 2. தன்னார்வ & சமூகப் பங்களிப்பு
                                    </h2>
                                    <p className="leading-relaxed">
                                        இந்த இணையதளம் மூலம் ஒருங்கிணைக்கப்படும் தன்னார்வப் பணிகள் மற்றும் உறுப்பினர் சேர்க்கைகள் முற்றிலும் நல்லெண்ண அடிப்படையில் அமைந்தவை. பங்களிப்புகள் அனைத்தும் அமைதியான, ஆக்கபூர்வமான மக்கள் பணி மற்றும் TVK-ன் அதிகாரப்பூர்வ வழிகாட்டுதல்களின்படி மட்டுமே அமைய வேண்டும்.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <Scale size={18} className="text-tvk-red" /> 3. பொறுப்புத் துறப்பு மற்றும் ஒருங்கிணைப்பு
                                    </h2>
                                    <p className="leading-relaxed">
                                        இந்த போர்டல், பிரசன்னா TVK-ன் தொகுதி அலுவலகத்தால் உள்ளூர் பிரச்சனைகளைத் திரட்டி, உரிய அரசுத் துறைகளின் கவனத்திற்குக் கொண்டு செல்ல மட்டுமே உருவாக்கப்பட்டுள்ளது. புகார்களை ஒருங்கிணைக்க நாங்கள் அனைத்து முயற்சிகளையும் எடுப்போம், ஆனால் உடனடியாகத் தீர்வுக்கு சட்டப்பூர்வ உத்தரவாதத்தையோ அல்லது பொறுப்பையோ எங்களது அலுவலகம் ஏற்காது.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <HelpCircle size={18} className="text-tvk-red" /> 4. மாற்றங்கள்
                                    </h2>
                                    <p className="leading-relaxed">
                                        பொதுமக்கள் நலனுக்காக இந்த போர்ட்டலின் அம்சங்கள் அல்லது சேவைகளை எப்போது வேண்டுமானாலும் மாற்றியமைக்க எங்களுக்கு உரிமை உண்டு. இந்த விதிமுறைகளில் மாற்றங்கள் செய்யப்படும்போது தொடர்ந்து பயன்படுத்துவது உங்கள் ஒப்புதலைக் குறிக்கும்.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
            <JoinTVKCTA />
        </motion.div>
    )
}

export default TermsOfService
