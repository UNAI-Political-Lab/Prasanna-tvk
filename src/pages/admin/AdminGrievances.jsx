import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search, ChevronLeft, ChevronRight,
    FileText, MapPin, Phone, Mail, Calendar,
    X, ExternalLink, Loader2, Image as ImageIcon
} from 'lucide-react'
import { adminService } from '../../services/adminService'

const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
]

const priorityOptions = [
    { value: '', label: 'All Priority' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
]

const statusColors = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    in_progress: 'bg-tvk-red/5 text-tvk-red border-tvk-red/10',
    resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const priorityColors = {
    low: 'bg-slate-50 text-slate-600 border border-slate-200',
    medium: 'bg-tvk-red/5 text-tvk-red border border-tvk-red/10',
    high: 'bg-orange-50 text-orange-700 border border-orange-200',
    urgent: 'bg-red-50 text-red-700 border border-red-200',
}

const AdminGrievances = () => {
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [filters, setFilters] = useState({ status: '', priority: '', category: '', search: '' })
    const [selectedItem, setSelectedItem] = useState(null)
    const [updating, setUpdating] = useState(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const [result, cats] = await Promise.all([
                adminService.getGrievances({ ...filters, page, pageSize: 20 }),
                categories.length === 0 ? adminService.getCategories() : Promise.resolve(categories)
            ])
            setData(result.data || [])
            setTotalPages(result.totalPages)
            setTotalCount(result.count || 0)
            if (categories.length === 0 && Array.isArray(cats)) setCategories(cats)
        } catch (err) {
            console.error('Error loading grievances:', err)
        } finally {
            setLoading(false)
        }
    }, [filters, page])

    useEffect(() => { fetchData() }, [fetchData])

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
        setPage(1)
    }

    const handleStatusChange = async (id, newStatus) => {
        setUpdating(id)
        try {
            await adminService.updateGrievanceStatus(id, newStatus)
            setData(prev => prev.map(item =>
                item.id === id ? { ...item, status: newStatus, ...(newStatus === 'resolved' ? { resolved_at: new Date().toISOString() } : {}) } : item
            ))
            if (selectedItem?.id === id) {
                setSelectedItem(prev => ({ ...prev, status: newStatus }))
            }
        } catch (err) {
            console.error('Failed to update status:', err)
        } finally {
            setUpdating(null)
        }
    }

    const handlePriorityChange = async (id, newPriority) => {
        setUpdating(id)
        try {
            await adminService.updateGrievancePriority(id, newPriority)
            setData(prev => prev.map(item =>
                item.id === id ? { ...item, priority: newPriority } : item
            ))
            if (selectedItem?.id === id) {
                setSelectedItem(prev => ({ ...prev, priority: newPriority }))
            }
        } catch (err) {
            console.error('Failed to update priority:', err)
        } finally {
            setUpdating(null)
        }
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-md shadow-slate-900/5">
                <div className="flex flex-wrap gap-3">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, reference ID, or area..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red transition-all font-semibold"
                        />
                    </div>
                    {/* Status */}
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red font-bold uppercase tracking-wider text-xs cursor-pointer min-w-[130px] text-center"
                    >
                        {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    {/* Priority */}
                    <select
                        value={filters.priority}
                        onChange={(e) => handleFilterChange('priority', e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red font-bold uppercase tracking-wider text-xs cursor-pointer min-w-[130px] text-center"
                    >
                        {priorityOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    {/* Category */}
                    <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red font-bold uppercase tracking-wider text-xs cursor-pointer min-w-[150px] text-center"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name_en}</option>
                        ))}
                    </select>
                </div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-2.5">{totalCount} grievances found</p>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md shadow-slate-900/5">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-6 h-6 text-tvk-red animate-spin" />
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-16 text-slate-500">
                        <FileText className="w-10 h-10 mx-auto mb-3 opacity-40 text-tvk-red" />
                        <p className="text-xs font-bold uppercase tracking-wider">No grievances found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Reference</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Name</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden md:table-cell">Area</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden lg:table-cell">Category</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Status</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden sm:table-cell">Priority</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden lg:table-cell">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => setSelectedItem(item)}
                                        className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                                    >
                                        <td className="px-4 py-3.5">
                                            <span className="text-tvk-red font-mono text-xs font-bold">{item.reference_id}</span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className="text-slate-900 font-semibold">{item.name}</span>
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-700 font-medium hidden md:table-cell">{item.area}</td>
                                        <td className="px-4 py-3.5 text-slate-700 font-medium hidden lg:table-cell">
                                            {item.complaint_categories?.name_en || '—'}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <select
                                                value={item.status}
                                                onChange={(e) => { e.stopPropagation(); handleStatusChange(item.id, e.target.value) }}
                                                onClick={(e) => e.stopPropagation()}
                                                disabled={updating === item.id}
                                                className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border ${statusColors[item.status]} bg-slate-50 border-slate-200 cursor-pointer focus:outline-none disabled:opacity-50`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3.5 hidden sm:table-cell">
                                            <select
                                                value={item.priority}
                                                onChange={(e) => { e.stopPropagation(); handlePriorityChange(item.id, e.target.value) }}
                                                onClick={(e) => e.stopPropagation()}
                                                disabled={updating === item.id}
                                                className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg ${priorityColors[item.priority]} bg-slate-50 border-slate-200 cursor-pointer focus:outline-none disabled:opacity-50`}
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                                <option value="urgent">Urgent</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-500 font-bold text-xs hidden lg:table-cell">
                                            {formatDate(item.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200 bg-slate-50/50">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                            Page {page} of {totalPages}
                        </p>
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
                            className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-slate-900/10"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
                                <div>
                                    <h3 className="text-slate-900 font-black uppercase tracking-wider text-base">{selectedItem.title}</h3>
                                    <span className="text-tvk-red font-mono text-xs font-bold">{selectedItem.reference_id}</span>
                                </div>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-5">
                                {/* Contact Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <FileText className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Name:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <Phone className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Phone:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.phone}</span>
                                    </div>
                                    {selectedItem.email && (
                                        <div className="flex items-center gap-2.5 text-sm">
                                            <Mail className="w-4 h-4 text-tvk-red" />
                                            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Email:</span>
                                            <span className="text-slate-900 font-bold select-all">{selectedItem.email}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <MapPin className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Area:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.area}</span>
                                    </div>
                                </div>

                                {/* Status & Priority */}
                                <div className="flex flex-wrap gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
                                    <div>
                                        <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1.5">Status</label>
                                        <select
                                            value={selectedItem.status}
                                            onChange={(e) => handleStatusChange(selectedItem.id, e.target.value)}
                                            className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border ${statusColors[selectedItem.status]} bg-white border-slate-200 cursor-pointer focus:outline-none`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1.5">Priority</label>
                                        <select
                                            value={selectedItem.priority}
                                            onChange={(e) => handlePriorityChange(selectedItem.id, e.target.value)}
                                            className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg ${priorityColors[selectedItem.priority]} bg-white border-slate-200 cursor-pointer focus:outline-none`}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                            <option value="urgent">Urgent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1.5">Category</label>
                                        <span className="text-sm font-bold text-slate-900 block mt-1">
                                            {selectedItem.complaint_categories?.name_en || '—'}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1.5">Description</label>
                                    <p className="text-slate-700 text-sm bg-slate-50 rounded-xl p-4 border border-slate-200 whitespace-pre-wrap leading-relaxed">
                                        {selectedItem.description}
                                    </p>
                                </div>

                                {/* Attachments */}
                                {selectedItem.attachments && (
                                    Array.isArray(selectedItem.attachments) ? selectedItem.attachments : 
                                    (() => { try { return JSON.parse(selectedItem.attachments) } catch { return [] } })()
                                ).length > 0 && (
                                    <div>
                                        <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-2">
                                            Attachments ({(Array.isArray(selectedItem.attachments) ? selectedItem.attachments : JSON.parse(selectedItem.attachments || '[]')).length})
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {(Array.isArray(selectedItem.attachments) ? selectedItem.attachments : JSON.parse(selectedItem.attachments || '[]')).map((att, i) => {
                                                const isImage = att.name?.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) || att.url?.match(/\.(jpg|jpeg|png|gif|webp|svg)/i)
                                                return (
                                                    <a
                                                        key={i}
                                                        href={att.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:bg-slate-100/50 hover:border-tvk-red/20 transition-all group"
                                                    >
                                                        {isImage ? (
                                                            <div className="relative">
                                                                 <img
                                                                    src={att.url}
                                                                    alt={att.name || 'Attachment'}
                                                                    className="w-full h-32 object-cover"
                                                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                                                                />
                                                                <div className="hidden items-center justify-center h-32 bg-slate-100 text-slate-400">
                                                                    <ImageIcon className="w-8 h-8 text-tvk-red" />
                                                                </div>
                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                                    <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                        <div className="flex items-center gap-2 p-3 text-xs text-slate-700 font-bold uppercase tracking-wider group-hover:text-tvk-red">
                                                            <ImageIcon className="w-4 h-4 shrink-0 text-tvk-red" />
                                                            <span className="truncate flex-1">{att.name || 'File'}</span>
                                                            <ExternalLink className="w-3 h-3 shrink-0" />
                                                        </div>
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Timeline */}
                                <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 pt-4 border-t border-slate-200">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-tvk-red" />
                                        Created: {formatDate(selectedItem.created_at)}
                                    </div>
                                    {selectedItem.resolved_at && (
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-tvk-red" />
                                            Resolved: {formatDate(selectedItem.resolved_at)}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        WhatsApp: {selectedItem.whatsapp_notified ? '✅ Sent' : '❌ Not sent'}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AdminGrievances
