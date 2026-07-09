import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    FileText,
    Users,
    MessageSquare,
    Bell,
    LogOut,
    Menu,
    X,
    ChevronRight,
    BookOpen
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/logo.png'

const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { path: '/admin/blogs', label: 'Blogs', icon: BookOpen },
    { path: '/admin/grievances', label: 'Grievances', icon: FileText },
    { path: '/admin/memberships', label: 'Memberships', icon: Users },
    { path: '/admin/messages', label: 'Messages', icon: MessageSquare },
    { path: '/admin/notifications', label: 'Notifications', icon: Bell },
]

const AdminLayout = () => {
    const { user, adminRole, signOut } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleSignOut = async () => {
        try {
            await signOut()
            navigate('/admin/login', { replace: true })
        } catch (err) {
            console.error('Sign out error:', err)
        }
    }

    // Derive page title from path
    const getPageTitle = () => {
        const current = navItems.find(item =>
            item.end
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path)
        )
        return current?.label || 'Admin'
    }

    // Derive breadcrumbs
    const getBreadcrumbs = () => {
        const parts = location.pathname.split('/').filter(Boolean)
        return parts.map((part, index) => ({
            label: part.charAt(0).toUpperCase() + part.slice(1),
            path: '/' + parts.slice(0, index + 1).join('/'),
            isLast: index === parts.length - 1
        }))
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex font-sans antialiased text-slate-800">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen w-72
                bg-white border-r border-slate-200
                flex flex-col
                transition-transform duration-300 ease-in-out
                lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Sidebar Header */}
                <div className="p-5 border-b border-slate-200">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <img src={logo} alt="TVK Logo" className="h-10 md:h-11 w-auto object-contain" />
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors shrink-0 p-1.5 rounded-lg hover:bg-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="mt-3">
                        <h2 className="text-slate-900 font-black text-xs font-heading tracking-wide uppercase">TVK Admin Portal</h2>
                        <p className="text-slate-500 text-[9px] font-bold tracking-wider uppercase">Constituency Management</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                                transition-all duration-200 group border
                                ${isActive
                                    ? 'bg-tvk-red/10 text-tvk-red border-tvk-red/20 shadow-sm'
                                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100'
                                }
                            `}
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User Info */}
                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 px-3 py-2.5 mb-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="w-9 h-9 bg-tvk-red/10 border border-tvk-red/20 rounded-full flex items-center justify-center text-tvk-red font-extrabold text-sm shadow-inner">
                            {(adminRole?.display_name || user?.email || 'A').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-900 text-sm font-bold truncate">
                                {adminRole?.display_name || user?.email}
                            </p>
                            <span className={`
                                inline-flex items-center text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mt-0.5
                                ${adminRole?.role === 'super_admin'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                    : 'bg-tvk-red/10 text-tvk-red border border-tvk-red/20'
                                }
                            `}>
                                {adminRole?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        id="admin-sign-out"
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all duration-200"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200">
                    <div className="flex items-center justify-between px-4 md:px-6 h-16">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-slate-900 font-black text-lg font-heading tracking-wide uppercase">
                                    {getPageTitle()}
                                </h1>
                                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                    {getBreadcrumbs().map((crumb, index) => (
                                        <React.Fragment key={crumb.path}>
                                            {index > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                                            <span className={crumb.isLast ? 'text-tvk-red font-extrabold' : ''}>
                                                {crumb.label}
                                            </span>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Header Right */}
                        <div className="flex items-center gap-3">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-slate-600 hover:text-tvk-red font-bold uppercase tracking-wider transition-colors hidden sm:block border border-slate-200 hover:border-tvk-red/30 bg-white px-3 py-1.5 rounded-lg shadow-sm"
                            >
                                View Live Site →
                            </a>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 bg-[#F8F9FA]">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
