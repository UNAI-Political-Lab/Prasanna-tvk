import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'
import { useLanguage } from '../context/LanguageContext'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const { language, toggleLanguage } = useLanguage()

    const navLinks = [
        { name: language === 'en' ? 'Home' : 'முகப்பு', path: '/' },
        { name: language === 'en' ? 'About' : 'எங்களைப் பற்றி', path: '/biography' },
        { name: language === 'en' ? 'Our Leader' : 'எங்கள் தலைவர்', path: '/biography#leader' },
        { name: language === 'en' ? 'Services' : 'சேவைகள்', path: '/services' },
        { name: language === 'en' ? 'Gallery' : 'புகைப்படங்கள்', path: '/services#gallery' },
        { name: language === 'en' ? 'Contact' : 'தொடர்பு கொள்ளுங்கள்', path: '/contact' },
    ]

    const isLinkActive = (linkPath) => {
        const hashIdx = linkPath.indexOf('#')
        const linkPathname = hashIdx !== -1 ? linkPath.substring(0, hashIdx) : linkPath
        const linkHash = hashIdx !== -1 ? linkPath.substring(hashIdx) : ''

        if (linkHash) {
            return location.pathname === linkPathname && location.hash === linkHash
        } else {
            if (location.pathname !== linkPathname) return false
            if (linkPathname === '/biography') {
                return location.hash !== '#leader'
            }
            if (linkPathname === '/services') {
                return location.hash !== '#gallery'
            }
            return !location.hash
        }
    }

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
            ? 'bg-white shadow-lg py-1'
            : 'bg-white/95 backdrop-blur-md py-2'
            }`}>

            {/* Main Navigation Bar */}
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between py-2">
                    {/* Logo + Leaders */}
                    <div className="flex items-center gap-3">
                        <Link to="/" className="shrink-0 flex items-center gap-2">
                            <div className={`flex items-center gap-1 transition-all duration-500 ${isScrolled ? 'h-8 md:h-9' : 'h-10 md:h-12'}`}>
                                <img src={logo} alt="TVK Logo" className="h-full w-auto object-contain" />
                                <div className="hidden sm:block w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border border-tvk-red/10">
                                    <img src="/symbol.png" alt="TVK Symbol" className="w-full h-full object-contain" />
                                </div>
                            </div>
                            <div className="border-l border-gray-200 pl-2">
                                <p className="text-xs md:text-sm font-extrabold text-tvk-red leading-tight">
                                    {language === 'en' ? 'S. Prasanna' : 'S. பிரசன்னா'}
                                </p>
                                <p className="text-[8px] md:text-[9px] text-gray-500 font-medium">
                                    {language === 'en' ? 'Tamilaga Vettri Kazhagam' : 'தமிழக வெற்றிக் கழகம்'}
                                </p>
                            </div>
                        </Link>
                        <div className={`hidden xl:block transition-all duration-500 ${isScrolled ? 'h-10' : 'h-14'}`}>
                            <img src="/leaders.png" alt="Historic Leaders" className="h-full w-auto object-contain pl-2" />
                        </div>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-xs font-bold px-3 py-2 rounded-lg transition-all duration-300 ${isLinkActive(link.path)
                                    ? 'bg-tvk-red text-white shadow-sm'
                                    : 'text-tvk-dark/70 hover:bg-tvk-red/5 hover:text-tvk-red'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden lg:flex items-center gap-2">
                        <button
                            onClick={toggleLanguage}
                            className="text-xs font-bold text-tvk-dark border border-gray-200 bg-gray-50 py-2 px-3 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-1.5 shadow-sm mr-1"
                        >
                            🌐 {language === 'en' ? 'தமிழ்' : 'English'}
                        </button>
                        <Link
                            to="/join-tvk"
                            className="text-xs font-bold text-tvk-red border border-tvk-red/20 py-2 px-4 rounded-lg hover:bg-tvk-red hover:text-white transition-all"
                        >
                            {language === 'en' ? 'Join TVK' : 'உறுப்பினர் சேர'}
                        </Link>
                        <Link
                            to="/petition"
                            className="text-xs font-bold bg-tvk-red text-white py-2 px-4 rounded-lg hover:bg-tvk-darkRed transition-all flex items-center gap-1.5"
                        >
                            <FileText size={13} />
                            {language === 'en' ? 'Complaint Portal' : 'புகார் பதிவு'}
                        </Link>
                    </div>

                    {/* Mobile Toggle with Language Button */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={toggleLanguage}
                            className="text-[10px] font-extrabold text-tvk-red bg-tvk-red/5 border border-tvk-red/10 py-1.5 px-2.5 rounded-lg shadow-sm"
                        >
                            🌐 {language === 'en' ? 'தமிழ்' : 'EN'}
                        </button>
                        <button
                            className="p-2 text-tvk-dark"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
                    >
                        <div className="flex flex-col p-4 gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-sm font-bold px-4 py-3 rounded-xl transition-all ${isLinkActive(link.path)
                                        ? 'bg-tvk-red text-white'
                                        : 'text-tvk-dark/70 hover:bg-tvk-red/5'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="mr-2">{link.name}</span>
                                </Link>
                            ))}
                            <div className="flex gap-2 mt-3">
                                <Link
                                    to="/join-tvk"
                                    className="flex-1 text-center bg-white text-tvk-red border-2 border-tvk-red py-3 rounded-xl font-bold text-sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {language === 'en' ? 'Join TVK' : 'உறுப்பினர் சேர'}
                                </Link>
                                <Link
                                    to="/petition"
                                    className="flex-1 text-center bg-tvk-red text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FileText size={14} />
                                    {language === 'en' ? 'Complaint Portal' : 'புகார் பதிவு'}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
