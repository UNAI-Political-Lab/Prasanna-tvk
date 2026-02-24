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
                            <div className="flex items-center justify-center px-4 bg-white border border-tvk-red/10 rounded-xl transition-transform group-hover:scale-105 shadow-sm py-2">
                                <img
                                    src={logo}
                                    alt="TVK Logo"
                                    className="h-10 object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-tvk-dark/60 mb-8 leading-relaxed font-medium">
                            Dedicated TVK Member working towards the welfare and empowerment of our people. Leadership with integrity and vision for a progressive Tamil Nadu.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center bg-tvk-lightBg border border-tvk-red/10 text-tvk-red rounded-xl hover:bg-tvk-red hover:text-white hover:-translate-y-1 shadow-sm transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
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
                                <div className="w-10 h-10 shrink-0 bg-tvk-lightBg border border-tvk-red/10 rounded-xl flex items-center justify-center text-tvk-red">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-tvk-dark/70 leading-relaxed">123 Victory Street, Tamil Nadu, India</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <div className="w-10 h-10 shrink-0 bg-tvk-lightBg border border-tvk-red/10 rounded-xl flex items-center justify-center text-tvk-red">
                                    <Phone size={18} />
                                </div>
                                <span className="text-tvk-dark/70">+91 98765 43210</span>
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
