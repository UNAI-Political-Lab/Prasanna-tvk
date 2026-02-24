import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <footer className="bg-white text-tvk-dark pt-24 pb-12 border-t border-tvk-red/10 relative overflow-hidden">
            {/* Cinematic Background Gradient */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-tvk-yellow/5 blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-tvk-red/5 blur-[100px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="mb-8 block group w-fit">
                            <div className="flex items-center justify-center px-4 bg-white border border-tvk-red/10 rounded-xl transition-transform group-hover:scale-105 shadow-sm py-2 gap-3">
                                <img
                                    src={logo}
                                    alt="TVK Logo"
                                    className="h-10 object-contain"
                                />
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-tvk-red/10">
                                    <img src="/symbol.png" alt="TVK Symbol" className="w-full h-full object-contain" />
                                </div>
                            </div>
                        </Link>
                        <p className="text-tvk-dark/60 mb-8 leading-relaxed font-medium">
                            Dedicated TVK Member working towards the welfare and empowerment of our people. Leadership with integrity and vision for a progressive Tamil Nadu.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center bg-tvk-lightBg border border-tvk-red/10 text-tvk-red rounded-xl hover:bg-tvk-red hover:text-white hover:-translate-y-1 shadow-sm transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/919884770108"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center bg-tvk-lightBg border border-tvk-red/10 text-tvk-red rounded-xl hover:bg-tvk-red hover:text-white hover:-translate-y-1 shadow-sm transition-all duration-300"
                                aria-label="WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-black mb-8 text-tvk-red uppercase tracking-widest">Navigation</h3>
                        <ul className="space-y-4 font-bold">
                            {['Home', 'Biography', 'Services', 'Petition', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-tvk-dark/70 hover:text-tvk-red transition-all flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-tvk-yellow group-hover:scale-150 transition-transform" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-black mb-8 text-tvk-red uppercase tracking-widest">Connect</h3>
                        <ul className="space-y-6 font-bold">
                            <li className="flex gap-4 items-start">
                                <a
                                    href="https://maps.app.goo.gl/vT4vh4KcB7Cc8U3h6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 shrink-0 bg-tvk-lightBg border border-tvk-red/10 rounded-xl flex items-center justify-center text-tvk-red hover:bg-tvk-red hover:text-white transition-all"
                                >
                                    <MapPin size={18} />
                                </a>
                                <span className="text-tvk-dark/70 leading-relaxed">No 27 ,100 Feet Rd ,Taramani Link Road, Velachery, Chennai, Tamil Nadu 600042</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <a
                                    href="tel:+919884770108"
                                    className="w-10 h-10 shrink-0 bg-tvk-lightBg border border-tvk-red/10 rounded-xl flex items-center justify-center text-tvk-red hover:bg-tvk-red hover:text-white transition-all"
                                >
                                    <Phone size={18} />
                                </a>
                                <span className="text-tvk-dark/70">+91 9884770108</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-black mb-8 text-tvk-red uppercase tracking-widest">Official Updates</h3>
                        <p className="text-tvk-dark/60 mb-6 font-medium">Stay informed about our latest campaigns and town halls.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="bg-tvk-lightBg border border-tvk-red/10 rounded-xl px-4 py-3 w-full outline-none focus:ring-2 focus:ring-tvk-red/20 text-tvk-dark shadow-inner"
                            />
                            <button className="bg-tvk-red text-white font-black px-6 py-3 rounded-xl hover:bg-tvk-darkRed shadow-lg hover:shadow-tvk-maroon transition-all transform hover:-translate-y-0.5">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-tvk-red/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-tvk-dark/40 font-bold">
                    <p>© 2026 TVK Candidate Member. All Rights Reserved.</p>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-tvk-red transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-tvk-red transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
