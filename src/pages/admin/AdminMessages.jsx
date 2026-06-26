import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search, ChevronLeft, ChevronRight, MessageSquare,
    Phone, Mail, Calendar, Eye, EyeOff, X,
    Loader2, Circle
} from 'lucide-react'
import { adminService } from '../../services/adminService'

const AdminMessages = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [filters, setFilters] = useState({ isRead: '', search: '' })
    const [selectedItem, setSelectedItem] = useState(null)
    const [updating, setUpdating] = useState(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const result = await adminService.getMessages({ ...filters, page, pageSize: 20 })
            setData(result.data || [])
            setTotalPages(result.totalPages)
            setTotalCount(result.count || 0)
        } catch (err) {
            console.error('Error loading messages:', err)
        } finally {
            setLoading(false)
        }
    }, [filters, page])

    useEffect(() => { fetchData() }, [fetchData])

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
        setPage(1)
    }

    const toggleRead = async (id, currentIsRead) => {
        setUpdating(id)
        try {
            await adminService.markMessageRead(id, !currentIsRead)
            setData(prev => prev.map(item =>
                item.id === id ? { ...item, is_read: !currentIsRead } : item
            ))
            if (selectedItem?.id === id) {
                setSelectedItem(prev => ({ ...prev, is_read: !currentIsRead }))
            }
        } catch (err) {
            console.error('Failed to toggle read status:', err)
        } finally {
            setUpdating(null)
        }
    }

    const openMessage = async (item) => {
        setSelectedItem(item)
        // Auto-mark as read when opened
        if (!item.is_read) {
            await toggleRead(item.id, false)
        }
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
    }

    const formatTime = (dateStr) => {
        const date = new Date(dateStr)
        const now = new Date()
        const diff = Math.floor((now - date) / 1000)
        if (diff < 60) return 'Just now'
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-md shadow-slate-900/5">
                <div className="flex flex-wrap gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or message..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red transition-all font-semibold"
                        />
                    </div>
                    <select
                        value={filters.isRead}
                        onChange={(e) => handleFilterChange('isRead', e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red font-bold text-xs cursor-pointer min-w-[150px]"
                    >
                        <option value="">All Messages</option>
                        <option value="false">Unread</option>
                        <option value="true">Read</option>
                    </select>
                </div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-2.5">{totalCount} messages found</p>
            </div>

            {/* Messages List (Inbox Style) */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md shadow-slate-900/5">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-6 h-6 text-tvk-red animate-spin" />
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-16 text-slate-500">
                        <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40 text-tvk-red" />
                        <p className="text-xs font-bold uppercase tracking-wider">No messages found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {data.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => openMessage(item)}
                                className={`flex items-start gap-4 px-5 py-4 cursor-pointer transition-all duration-200 border-l-2 hover:bg-slate-50 ${!item.is_read ? 'bg-slate-50/50 border-l-tvk-red' : 'border-l-transparent bg-white'}`}
                            >
                                {/* Unread indicator */}
                                <div className="pt-1 shrink-0">
                                    {!item.is_read ? (
                                        <Circle className="w-2.5 h-2.5 fill-tvk-red text-tvk-red animate-pulse" />
                                    ) : (
                                        <Circle className="w-2.5 h-2.5 text-slate-200" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`text-sm ${!item.is_read ? 'text-slate-900 font-bold' : 'text-slate-700 font-semibold'}`}>
                                            {item.name}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase shrink-0 ml-3">
                                            {formatTime(item.created_at)}
                                        </span>
                                    </div>
                                    <p className={`text-sm truncate mt-1 ${!item.is_read ? 'text-slate-800 font-semibold' : 'text-slate-600 font-medium'}`}>
                                        {item.message}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                                        {item.phone && (
                                            <span className="flex items-center gap-1.5">
                                                <Phone className="w-3.5 h-3.5 text-slate-400" /> {item.phone}
                                            </span>
                                        )}
                                        {item.email && (
                                            <span className="flex items-center gap-1.5 normal-case tracking-normal">
                                                <Mail className="w-3.5 h-3.5 text-slate-400" /> {item.email}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Toggle read/unread */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleRead(item.id, item.is_read) }}
                                    disabled={updating === item.id}
                                    className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0 disabled:opacity-50"
                                    title={item.is_read ? 'Mark as unread' : 'Mark as read'}
                                >
                                    {item.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-4 border-t border-slate-200 bg-slate-50/50">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Page {page} of {totalPages}</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 transition-all"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/10 w-full max-w-lg overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
                                <div>
                                    <h3 className="text-slate-900 font-black text-lg font-heading tracking-wide uppercase">Message from {selectedItem.name}</h3>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{formatDate(selectedItem.created_at)}</span>
                                </div>
                                <button onClick={() => setSelectedItem(null)} className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        <span className="text-slate-550 font-semibold">Phone:</span>
                                        <span className="text-slate-900 font-mono font-semibold">{selectedItem.phone}</span>
                                    </div>
                                    {selectedItem.email && (
                                        <div className="flex items-center gap-2.5 text-sm">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-550 font-semibold">Email:</span>
                                            <span className="text-slate-900 select-all font-semibold">{selectedItem.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1.5">Message Content</label>
                                    <p className="text-slate-800 text-sm bg-slate-50 border border-slate-200 rounded-xl p-4 whitespace-pre-wrap leading-relaxed select-text font-medium">
                                        {selectedItem.message}
                                    </p>
                                </div>

                                <div className="flex justify-end pt-2 border-t border-slate-200">
                                    <button
                                        onClick={() => toggleRead(selectedItem.id, selectedItem.is_read)}
                                        disabled={updating === selectedItem.id}
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 hover:text-slate-900 px-4 py-2.5 rounded-xl transition-all disabled:opacity-50"
                                    >
                                        {selectedItem.is_read ? (
                                            <><EyeOff className="w-4 h-4 text-tvk-red" /> Mark Unread</>
                                        ) : (
                                            <><Eye className="w-4 h-4 text-tvk-red" /> Mark Read</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AdminMessages
