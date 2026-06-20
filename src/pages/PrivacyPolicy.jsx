import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import JoinTVKCTA from '../components/JoinTVKCTA'
import { useLanguage } from '../context/LanguageContext'
import { Shield, Lock, Eye, FileText } from 'lucide-react'

const PrivacyPolicy = () => {
    const { language } = useLanguage()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 md:pt-40 pb-20 bg-gray-50/30"
        >
            <SEO
                title={language === 'en' ? "Privacy Policy | TVK Sholinganallur ECR" : "தனியுரிமை கொள்கை | TVK சோலிங்கநல்லூர் ECR"}
                description={language === 'en'
                    ? "Privacy Policy for the TVK Sholinganallur ECR Public Services Portal. Learn how we secure your grievance details and personal information."
                    : "TVK சோலிங்கநல்லூர் ECR மக்கள் சேவை தளத்தின் தனியுரிமை கொள்கை. உங்கள் விவரங்கள் எவ்வாறு பாதுகாக்கப்படுகின்றன என்பதை அறியுங்கள்."
                }
                url="/privacy-policy"
            />
            <section className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-14">
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                        <div className="w-12 h-12 bg-tvk-red/10 rounded-2xl flex items-center justify-center text-tvk-red shrink-0">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-tvk-dark">
                                {language === 'en' ? 'Privacy Policy' : 'தனியுரிமை கொள்கை'}
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
                                    At the <strong>TVK Sholinganallur ECR Public Services Portal</strong>, we are committed to protecting the privacy and personal details of our constituency residents. This Privacy Policy outlines how we collect, handle, and secure your information when you register grievances, request assistance, or join our volunteer network.
                                </p>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <Lock size={18} className="text-tvk-red" /> 1. Information We Collect
                                    </h2>
                                    <p className="leading-relaxed">
                                        To process your complaints and welfare queries effectively, we collect the following details through our portal:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Personal Details:</strong> Full Name, Contact Mobile Number, and Email Address.</li>
                                        <li><strong>Location Details:</strong> Area, Ward number, or street address to identify the local region of the grievance.</li>
                                        <li><strong>Grievance Details:</strong> Title, description, and any uploaded evidence (photos, videos, or document attachments).</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <Eye size={18} className="text-tvk-red" /> 2. How We Use Your Information
                                    </h2>
                                    <p className="leading-relaxed">
                                        Your information is solely used to facilitate community welfare and development:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>To catalog, prioritize, and coordinate the resolution of your complaints.</li>
                                        <li>To share details with authorized TVK ward volunteers and constituency representatives for ground verification.</li>
                                        <li>To contact you via phone or email for updates, follow-ups, or clarification regarding your submissions.</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <Shield size={18} className="text-tvk-red" /> 3. Data Protection & Security
                                    </h2>
                                    <p className="leading-relaxed">
                                        We employ strict security practices to keep your data safe:
                                        All submitted data is transferred securely and stored in our protected database systems. Your details will never be sold, rented, or shared with commercial third parties.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <FileText size={18} className="text-tvk-red" /> 4. User Consent & Updates
                                    </h2>
                                    <p className="leading-relaxed">
                                        By using this website and submitting your details, you consent to our office contacting you regarding your concerns. If you wish to modify or request the deletion of your submitted grievance data from our records, you can reach out to us at our official contact address.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-lg leading-relaxed text-tvk-dark/80">
                                    <strong>TVK சோலிங்கநல்லூர் ECR மக்கள் சேவை போர்டலில்</strong>, எங்கள் தொகுதி குடியிருப்பாளர்களின் தனியுரிமை மற்றும் தனிப்பட்ட விவரங்களைப் பாதுகாப்பதில் நாங்கள் உறுதியாக இருக்கிறோம். நீங்கள் புகார்களைப் பதிவு செய்யும் போது, உதவி கோரும் போது அல்லது எங்களது தன்னார்வ அமைப்பில் இணையும் போது உங்கள் தகவல்களை நாங்கள் எவ்வாறு சேகரித்து, கையாள்கிறோம் என்பதை இந்தத் தனியுரிமைக் கொள்கை விளக்குகிறது.
                                </p>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <Lock size={18} className="text-tvk-red" /> 1. நாம் சேகரிக்கும் தகவல்கள்
                                    </h2>
                                    <p className="leading-relaxed">
                                        உங்கள் புகார்கள் மற்றும் நலன்புரி கோரிக்கைகளை திறம்பட செயல்படுத்த, பின்வரும் விவரங்களை இந்த போர்டல் மூலம் சேகரிக்கிறோம்:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>தனிப்பட்ட விவரங்கள்:</strong> முழுப் பெயர், தொடர்பு கைபேசி எண், மற்றும் மின்னஞ்சல் முகவரி.</li>
                                        <li><strong>இருப்பிட விவரங்கள்:</strong> புகாரின் உள்ளூர் பகுதியை அடையாளம் காண உதவும் வார்டு, பகுதி அல்லது தெரு முகவரி.</li>
                                        <li><strong>புகார் விவரங்கள்:</strong> தலைப்பு, புகார் விளக்கம், மற்றும் பதிவேற்றப்பட்ட ஆதாரங்கள் (புகைப்படங்கள், வீடியோக்கள் அல்லது ஆவணங்கள்).</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <Eye size={18} className="text-tvk-red" /> 2. தகவல்களை எவ்வாறு பயன்படுத்துகிறோம்
                                    </h2>
                                    <p className="leading-relaxed">
                                        உங்கள் தகவல்கள் தொகுதி மக்களின் நலன் மற்றும் மேம்பாட்டு நடவடிக்கைகளுக்காக மட்டுமே பயன்படுத்தப்படுகின்றன:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>உங்கள் புகார்களைப் பதிவு செய்து, முன்னுரிமை அளித்து, தீர்வுக்கான நடவடிக்கைகளை ஒருங்கிணைக்க.</li>
                                        <li>கள ஆய்வுக்காக அங்கீகரிக்கப்பட்ட TVK வார்டு தன்னார்வலர்கள் மற்றும் தொகுதி பிரதிநிதிகளுடன் விவரங்களைப் பகிர்ந்து கொள்ள.</li>
                                        <li>உங்கள் புகாரின் நிலை குறித்து புதுப்பிப்புகள் அல்லது கூடுதல் விளக்கங்கள் பெற உங்களைத் தொடர்பு கொள்ள.</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <Shield size={18} className="text-tvk-red" /> 3. தரவு பாதுகாப்பு & ரகசியம்
                                    </h2>
                                    <p className="leading-relaxed">
                                        உங்கள் தரவைப் பாதுகாப்பாக வைத்திருக்க கடுமையான பாதுகாப்பு நடைமுறைகளைப் பின்பற்றுகிறோம்:
                                        சமர்ப்பிக்கப்பட்ட அனைத்துத் தரவுகளும் பாதுகாப்பாக மாற்றப்பட்டு எங்கள் தரவுத்தள அமைப்புகளில் சேமிக்கப்படும். உங்கள் விவரங்கள் வணிக ரீதியான மூன்றாம் தரப்பினருடன் ஒருபோதும் விற்கப்படவோ அல்லது பகிரப்படவோ மாட்டாது.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-tvk-dark flex items-center gap-2">
                                        <FileText size={18} className="text-tvk-red" /> 4. பயனர் ஒப்புதல் & தரவு நீக்கம்
                                    </h2>
                                    <p className="leading-relaxed">
                                        இந்த இணையதளத்தைப் பயன்படுத்துவதன் மூலமும், உங்கள் விவரங்களைச் சமர்ப்பிப்பதன் மூலமும், உங்கள் கவலைகள் குறித்து எங்கள் அலுவலகம் உங்களைத் தொடர்பு கொள்ள ஒப்புக்கொள்கிறீர்கள். உங்கள் விவரங்களை மாற்றியமைக்க அல்லது எங்களது பதிவுகளிலிருந்து நீக்கக் கோர விரும்பினால், எங்களது அதிகாரப்பூர்வ முகவரிக்குத் தொடர்பு கொள்ளலாம்.
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

export default PrivacyPolicy
