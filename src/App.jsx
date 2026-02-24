import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Biography from './pages/Biography'
import Services from './pages/Services'
import Petition from './pages/Petition'
import Contact from './pages/Contact'

function App() {
    const location = useLocation();

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
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    )
}

export default App
