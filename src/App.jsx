import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Biography from './pages/Biography'
import Services from './pages/Services'
import Petition from './pages/Petition'
import JoinTVK from './pages/JoinTVK'
import Contact from './pages/Contact'

function App() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            // Let the page render first before scrolling
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 150);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/biography" element={<Biography />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/petition" element={<Petition />} />
                        <Route path="/join-tvk" element={<JoinTVK />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    )
}

export default App
