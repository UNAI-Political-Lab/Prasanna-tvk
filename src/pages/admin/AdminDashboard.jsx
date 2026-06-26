import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    FileText, Users, MessageSquare, Bell,
    TrendingUp, Clock, CheckCircle2,
    ArrowUpRight, RefreshCw, Loader2,
    CircleDot, Zap
} from 'lucide-react'
import { adminService } from '../../services/adminService'

const AdminDashboard = () => {
    const [stats, setStats] = useState(null)
    const [recentActivity, setRecentActivity] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const fetchData = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true)
        try {
            const [dashStats, activity] = await Promise.all([
                adminService.getDashboardStats(),
                adminService.getRecentActivity(10)
            ])
            setStats(dashStats)
            setRecentActivity(activity)
        } catch (err) {
            console.error('Dashboard fetch error:', err)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
        const interval = setInterval(() => fetchData(), 30000)
        return () => clearInterval(interval)
    }, [fetchData])

    const formatTime = (dateStr) => {
        const date = new Date(dateStr)
        const now = new Date()
        const diff = Math.floor((now - date) / 1000)
        if (diff < 60) return 'Just now'
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    }

    const statusColors = {
        pending: 'bg-amber-50 text-amber-700 border border-amber-200',
        in_progress: 'bg-tvk-red/5 text-tvk-red border border-tvk-red/10',
        resolved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        rejected: 'bg-red-50 text-red-700 border border-red-200',
        unread: 'bg-amber-50 text-amber-700 border border-amber-200',
        read: 'bg-slate-100 text-slate-600 border border-slate-200'
    }

    const activityIcons = {
        grievance: FileText,
        membership: Users,
        message: MessageSquare
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-tvk-red animate-spin" />
            </div>
        )
    }

    const kpiCards = [
        {
            title: 'Total Grievances',
            value: stats?.total_grievances || 0,
            today: stats?.today_grievances || 0,
            icon: FileText,
            color: 'from-tvk-red to-tvk-darkRed',
            shadow: 'shadow-tvk-red/20',
            link: '/admin/grievances'
        },
        {
            title: 'Pending',
            value: stats?.pending_grievances || 0,
            subtitle: `${stats?.in_progress_grievances || 0} in progress`,
            icon: Clock,
            color: 'from-amber-500 to-orange-600',
            shadow: 'shadow-amber-500/20',
            link: '/admin/grievances?status=pending'
        },
        {
            title: 'Resolved',
            value: stats?.resolved_grievances || 0,
            subtitle: `Avg ${Number(stats?.avg_resolution_days || 0).toFixed(1)} days`,
            icon: CheckCircle2,
            color: 'from-emerald-600 to-teal-600',
            shadow: 'shadow-emerald-500/20',
            link: '/admin/grievances?status=resolved'
        },
        {
            title: 'Members',
            value: stats?.total_memberships || 0,
            today: stats?.today_memberships || 0,
            icon: Users,
            color: 'from-tvk-yellow to-yellow-600',
            shadow: 'shadow-tvk-yellow/20',
            link: '/admin/memberships'
        },
        {
            title: 'Messages',
            value: stats?.total_messages || 0,
            subtitle: `${stats?.unread_messages || 0} unread`,
            icon: MessageSquare,
            color: 'from-rose-600 to-tvk-red',
            shadow: 'shadow-rose-500/20',
            link: '/admin/messages'
        },
        {
            title: 'Notifications',
            value: stats?.total_notifications || 0,
            subtitle: `${stats?.failed_notifications || 0} failed`,
            icon: Bell,
            color: 'from-slate-600 to-slate-700',
            shadow: 'shadow-slate-500/20',
            link: '/admin/notifications'
        },
    ]

    // Build bar chart from weekly data
    const weeklyData = stats?.weekly_grievances || []
    const maxWeekly = Math.max(...weeklyData.map(d => d.count), 1)

    // Priority data
    const priorityData = [
        { label: 'Low', count: stats?.priority_low || 0, color: 'bg-slate-600' },
        { label: 'Medium', count: stats?.priority_medium || 0, color: 'bg-tvk-yellow' },
        { label: 'High', count: stats?.priority_high || 0, color: 'bg-orange-500' },
        { label: 'Urgent', count: stats?.priority_urgent || 0, color: 'bg-tvk-red' },
    ]

    // Category data
    const categoryData = stats?.category_breakdown || []

    // Status donut data
    const totalGrv = (stats?.pending_grievances || 0) + (stats?.in_progress_grievances || 0) + (stats?.resolved_grievances || 0)
    const statusSegments = [
        { label: 'Pending', value: stats?.pending_grievances || 0, color: '#FBBF24' },      // TVK Yellow
        { label: 'In Progress', value: stats?.in_progress_grievances || 0, color: '#910905' },  // TVK Red
        { label: 'Resolved', value: stats?.resolved_grievances || 0, color: '#10B981' },     // Emerald
    ]

    // SVG Donut chart
    const renderDonut = () => {
        const radius = 60
        const circumference = 2 * Math.PI * radius
        let offset = 0

        return (
            <svg viewBox="0 0 160 160" className="w-36 h-36">
                {statusSegments.map((seg, i) => {
                    const percent = totalGrv > 0 ? seg.value / totalGrv : 0
                    const dashLength = percent * circumference
                    const dashOffset = -offset
                    offset += dashLength

                    return (
                        <circle
                            key={i}
                            cx="80" cy="80" r={radius}
                            fill="none"
                            stroke={seg.color}
                            strokeWidth="16"
                            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="round"
                            className="transition-all duration-700"
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '80px 80px' }}
                        />
                    )
                })}
                <text x="80" y="74" textAnchor="middle" className="fill-slate-900 text-2xl font-black" style={{ fontSize: '24px', fontWeight: '900' }}>
                    {totalGrv}
                </text>
                <text x="80" y="94" textAnchor="middle" className="fill-slate-400 font-bold uppercase tracking-wider" style={{ fontSize: '9px' }}>
                    Total
                </text>
            </svg>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-slate-900 font-black uppercase tracking-wider text-sm">Overview</h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">Real-time application statistics</p>
                </div>
                <button
                    onClick={() => fetchData(true)}
                    disabled={refreshing}
                    className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl transition-all disabled:opacity-50 shadow-sm w-full sm:w-auto"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {kpiCards.map((card, i) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Link
                            to={card.link}
                            className="block bg-white border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 hover:border-tvk-red/20 shadow-md shadow-slate-900/5 transition-all group"
                        >
                            <div className="flex items-start justify-between">
                                <div className={`w-11 h-11 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg ${card.shadow}`}>
                                    <card.icon className="w-5 h-5 text-white" />
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-tvk-red transition-colors" />
                            </div>
                            <div className="mt-4">
                                <p className="text-3xl font-black text-slate-900">{Number(card.value).toLocaleString()}</p>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{card.title}</p>
                            </div>
                            <div className="mt-2">
                                {card.today !== undefined && (
                                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        +{card.today} today
                                    </span>
                                )}
                                {card.subtitle && (
                                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">{card.subtitle}</span>
                                )}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Status Donut */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md shadow-slate-900/5"
                >
                    <h3 className="text-slate-900 font-black uppercase tracking-wider text-xs mb-5">Grievance Status</h3>
                    <div className="flex items-center justify-center">
                        {renderDonut()}
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        {statusSegments.map(seg => (
                            <div key={seg.label} className="flex items-center gap-1.5 text-xs text-slate-600 font-bold uppercase tracking-wider">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                                {seg.label} ({seg.value})
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Weekly Trend Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md shadow-slate-900/5"
                >
                    <h3 className="text-slate-900 font-black uppercase tracking-wider text-xs mb-5">Weekly Grievances</h3>
                    <div className="flex items-end gap-2 h-36 px-2">
                        {weeklyData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <span className="text-[10px] text-slate-500 font-extrabold">{d.count}</span>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${Math.max((d.count / maxWeekly) * 100, 4)}%` }}
                                    transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                                    className="w-full bg-gradient-to-t from-tvk-red to-tvk-yellow rounded-t-md min-h-[4px]"
                                />
                                <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider mt-1.5">{d.day_label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Priority Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md shadow-slate-900/5"
                >
                    <h3 className="text-slate-900 font-black uppercase tracking-wider text-xs mb-5">Priority Distribution</h3>
                    <div className="space-y-3.5">
                        {priorityData.map(p => {
                            const total = priorityData.reduce((s, x) => s + x.count, 0)
                            const pct = total > 0 ? (p.count / total) * 100 : 0
                            return (
                                <div key={p.label}>
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
                                        <span className="text-slate-700">{p.label}</span>
                                        <span className="text-slate-500 font-extrabold">{p.count}</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ delay: 0.5, duration: 0.6 }}
                                            className={`h-full ${p.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Category breakdown */}
                    {categoryData.length > 0 && (
                        <>
                            <h4 className="text-slate-900 font-black uppercase tracking-wider text-xs mt-6 mb-3">By Category</h4>
                            <div className="space-y-2 max-h-28 overflow-y-auto pr-1">
                                {categoryData.slice(0, 5).map((c, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                                        <span className="text-slate-500 truncate mr-2">{c.category}</span>
                                        <span className="text-slate-900 font-extrabold shrink-0">{c.count}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md shadow-slate-900/5"
            >
                <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                    <h3 className="text-slate-900 font-black uppercase tracking-wider text-xs">Recent Activity</h3>
                    <Zap className="w-4 h-4 text-tvk-red animate-pulse" />
                </div>

                {recentActivity.length === 0 ? (
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider text-center py-8">No recent activity</p>
                ) : (
                    <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                        {recentActivity.map((item) => {
                            const Icon = activityIcons[item.type] || CircleDot
                            return (
                                <div
                                    key={`${item.type}-${item.id}`}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center shrink-0 shadow-inner">
                                            <Icon className="w-4 h-4 text-tvk-red" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-800 truncate">
                                                {item.title}
                                                <span className="text-slate-500 font-normal"> · {item.name}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 pl-11 sm:pl-0 shrink-0">
                                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${statusColors[item.status] || 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                            {item.status}
                                        </span>
                                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider shrink-0 sm:w-16 sm:text-right">
                                            {formatTime(item.created_at)}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default AdminDashboard
