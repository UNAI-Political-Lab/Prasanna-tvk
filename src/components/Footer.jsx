import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import logo from '../assets/logo.png'
import { useLanguage } from '../context/LanguageContext'

const Footer = () => {
    const { language } = useLanguage()

    return (
        <footer className="bg-white text-tvk-dark pt-20 pb-10 border-t border-tvk-red/10 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-tvk-yellow/5 blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-tvk-red/5 blur-[100px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
                    {/* Brand */}
                    <div className="col-span-1">
                        <Link to="/" className="mb-6 block group w-fit">
                            <div className="flex items-center px-4 bg-white border border-tvk-red/10 rounded-xl transition-transform group-hover:scale-105 shadow-sm py-2 gap-3">
                                <img src={logo} alt="TVK Logo" className="h-10 object-contain" />
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-tvk-red/10">
                                    <img src="/symbol.png" alt="TVK Symbol" className="w-full h-full object-contain" />
                                </div>
                            </div>
                        </Link>
                        <p className="text-sm font-bold text-tvk-dark/70 mb-2">
                            {language === 'en' ? 'TVK – Sholinganallur ECR' : 'TVK – சோலிங்கநல்லூர் ECR'}
                        </p>
                        <p className="text-tvk-dark/50 mb-6 leading-relaxed text-sm">
                            {language === 'en'
                                ? 'Dedicated TVK member working for public welfare, community empowerment, and local development.'
                                : 'மக்கள் நலன் மற்றும் அதிகாரப்பூர்வ சேவைகளுக்காக அர்ப்பணிக்கப்பட்ட TVK உறுப்பினர்.'
                            }
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 flex items-center justify-center bg-tvk-lightBg border border-tvk-red/10 text-tvk-red rounded-lg hover:bg-tvk-red hover:text-white hover:-translate-y-0.5 shadow-sm transition-all duration-300">
                                    <Icon size={16} />
                                </a>
                            ))}
                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/919884770108"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center bg-tvk-lightBg border border-tvk-red/10 text-tvk-red rounded-lg hover:bg-tvk-red hover:text-white hover:-translate-y-0.5 shadow-sm transition-all duration-300"
                                aria-label="WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-base font-black mb-6 text-tvk-red uppercase tracking-widest">
                            {language === 'en' ? 'Navigation' : 'வழிசெலுத்தல்'}
                        </h3>
                        <ul className="space-y-3 font-bold text-sm">
                            {[
                                { name: language === 'en' ? 'Home' : 'முகப்பு', path: '/' },
                                { name: language === 'en' ? 'About Biography' : 'வாழ்க்கை வரலாறு', path: '/biography' },
                                { name: language === 'en' ? 'Our Leader' : 'எங்கள் தலைவர்', path: '/biography#leader' },
                                { name: language === 'en' ? 'Services' : 'சேவைகள்', path: '/services' },
                                { name: language === 'en' ? 'Complaint Portal' : 'புகார் பதிவு', path: '/petition' },
                                { name: language === 'en' ? 'Contact' : 'தொடர்பு', path: '/contact' },
                            ].map((item) => (
                                <li key={item.path}>
                                    <Link to={item.path} className="text-tvk-dark/60 hover:text-tvk-red transition-all flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-tvk-yellow group-hover:scale-150 transition-transform" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <h3 className="text-base font-black mb-6 text-tvk-red uppercase tracking-widest">
                            {language === 'en' ? 'Contact' : 'தொடர்பு'}
                        </h3>
                        <ul className="space-y-5 font-bold text-sm">
                            <li className="flex gap-3 items-start">
                                <a
                                    href="https://maps.app.goo.gl/vT4vh4KcB7Cc8U3h6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 shrink-0 bg-tvk-lightBg border border-tvk-red/10 rounded-lg flex items-center justify-center text-tvk-red hover:bg-tvk-red hover:text-white transition-all"
                                >
                                    <MapPin size={16} />
                                </a>
                                <span className="text-tvk-dark/60 leading-relaxed text-xs">No 27, 100 Feet Rd, Taramani Link Road, Velachery, Chennai, Tamil Nadu 600042</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <a
                                    href="tel:+919884770108"
                                    className="w-9 h-9 shrink-0 bg-tvk-lightBg border border-tvk-red/10 rounded-lg flex items-center justify-center text-tvk-red hover:bg-tvk-red hover:text-white transition-all"
                                >
                                    <Phone size={16} />
                                </a>
                                <span className="text-tvk-dark/60">+91 9884770108</span>
                            </li>
                        </ul>
                    </div>

                    {/* Updates */}
                    <div className="col-span-1">
                        <h3 className="text-base font-black mb-6 text-tvk-red uppercase tracking-widest">
                            {language === 'en' ? 'Official Updates' : 'அதிகாரப்பூர்வ புதுப்பிப்புகள்'}
                        </h3>
                        <p className="text-tvk-dark/50 mb-5 text-sm">
                            {language === 'en' ? 'Subscribe to receive the latest updates and announcements.' : 'எங்கள் சமீபத்திய பிரச்சாரங்கள் மற்றும் நிகழ்வுகள் பற்றி அறிய.'}
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder={language === 'en' ? 'Your email address' : 'உங்கள் மின்னஞ்சல்'}
                                className="bg-tvk-lightBg border border-tvk-red/10 rounded-lg px-3 py-2.5 w-full outline-none focus:ring-2 focus:ring-tvk-red/20 text-tvk-dark shadow-inner text-sm"
                            />
                            <button className="bg-tvk-red text-white font-bold px-4 py-2.5 rounded-lg hover:bg-tvk-darkRed shadow-md transition-all text-sm">
                                {language === 'en' ? 'Join' : 'சேர'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-tvk-red/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-tvk-dark/40 font-bold">
                    <p>© 2026 TVK – {language === 'en' ? 'Sholinganallur ECR' : 'சோலிங்கநல்லூர் ECR'}. {language === 'en' ? 'All rights reserved.' : 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'}</p>
                    <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="flex gap-8">
                            <Link to="/privacy-policy" className="hover:text-tvk-red transition-colors">{language === 'en' ? 'Privacy Policy' : 'தனியுரிமை கொள்கை'}</Link>
                            <Link to="/terms-of-service" className="hover:text-tvk-red transition-colors">{language === 'en' ? 'Terms of Service' : 'சேவை விதிமுறைகள்'}</Link>
                        </div>
                        <a
                            href="https://www.unaitech.com/services"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-5 bg-[#FAF8F5] border border-tvk-red/10 rounded-2xl py-3 px-5 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                        >
                            <div className="flex flex-col text-left">
                                <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-tvk-dark/40 group-hover:text-tvk-red transition-colors">
                                    {language === 'en' ? 'Crafted by' : 'உருவாக்கியது'}
                                </span>
                                <span className="text-base font-black tracking-tight leading-none mt-0.5">
                                    <span className="text-tvk-red">UNAI</span>
                                    <span className="text-tvk-dark">TECH</span>
                                </span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#EDEAE4] group-hover:bg-tvk-red/10 flex items-center justify-center text-tvk-red transition-colors">
                                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
