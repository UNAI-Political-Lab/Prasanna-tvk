import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Biography from './pages/Biography'
import Services from './pages/Services'
import Petition from './pages/Petition'
import JoinTVK from './pages/JoinTVK'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'
import BlogPostDetail from './pages/BlogPostDetail'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

// Admin imports
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminGrievances from './pages/admin/AdminGrievances'
import AdminMemberships from './pages/admin/AdminMemberships'
import AdminMessages from './pages/admin/AdminMessages'
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminBlogs from './pages/admin/AdminBlogs'

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const isAdminRoute = location.pathname.startsWith('/admin');

    useEffect(() => {
        // Redirect to admin dashboard immediately if launched as PWA shortcut/standalone app
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        if (isStandalone && !location.pathname.startsWith('/admin')) {
            navigate('/admin', { replace: true });
        }
    }, [location.pathname, navigate]);

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

    // Admin routes — rendered without public Navbar/Footer
    if (isAdminRoute) {
        return (
            <Routes location={location}>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="blogs" element={<AdminBlogs />} />
                        <Route path="grievances" element={<AdminGrievances />} />
                        <Route path="memberships" element={<AdminMemberships />} />
                        <Route path="messages" element={<AdminMessages />} />
                        <Route path="notifications" element={<AdminNotifications />} />
                    </Route>
                </Route>
            </Routes>
        )
    }

    // Public routes
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/biography" element={<Biography />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/blogs/:id" element={<BlogPostDetail />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/petition" element={<Petition />} />
                        <Route path="/join-tvk" element={<JoinTVK />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    )
}

export default App
