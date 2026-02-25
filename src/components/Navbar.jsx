import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Flag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'

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

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Biography', path: '/biography' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                <Link to="/" className="group">
                    <div className="h-12 md:h-16 flex items-center justify-center px-6 bg-white rounded-xl transition-transform group-hover:scale-105 shadow-lg">
                        <div className="flex items-center gap-3">
                            <img
                                src={logo}
                                alt="TVK Logo"
                                className="h-10 md:h-14 w-auto object-contain"
                            />
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-tvk-red/10">
                                <img src="/symbol.png" alt="TVK Symbol" className="w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Desktop Menu - UI Card Style */}
                <div className="hidden md:flex items-center gap-2 bg-tvk-red/80 backdrop-blur-xl border border-tvk-yellow/20 p-2 rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-6 px-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link text-sm uppercase tracking-wider font-black transition-all duration-300 ${location.pathname === link.path
                                    ? 'text-tvk-yellow after:w-full scale-105'
                                    : 'text-white hover:text-tvk-yellow hover:scale-105'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <Link to="/petition" className="bg-tvk-yellow text-tvk-red py-2.5 px-6 text-sm rounded-xl font-black hover:bg-white transition-colors duration-300">
                        Action Center
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden p-2 ${isScrolled ? 'text-tvk-dark' : 'text-white'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-tvk-red/95 backdrop-blur-lg border-b border-tvk-yellow/20 overflow-hidden shadow-2xl mx-4 my-2 rounded-2xl"
                    >
                        <div className="flex flex-col p-4 gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-lg font-black px-5 py-4 rounded-2xl flex items-center gap-4 transition-all ${location.pathname === link.path
                                        ? 'bg-tvk-yellow text-tvk-red shadow-lg'
                                        : 'text-white hover:bg-white/10'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className={location.pathname === link.path ? 'text-tvk-red' : 'text-tvk-yellow'}>
                                        {link.icon}
                                    </span>
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/petition"
                                className="bg-tvk-yellow text-tvk-red text-center mt-3 py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3"
                                onClick={() => setIsOpen(false)}
                            >
                                <Flag size={20} /> Action Center
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
