import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search, ChevronLeft, ChevronRight,
    FileText, MapPin, Phone, Mail, Calendar,
    X, ExternalLink, Loader2, Image as ImageIcon,
    Download, FileDown, Filter, RefreshCw, Navigation
} from 'lucide-react'
import { adminService } from '../../services/adminService'
import { downloadSingleGrievancePDF, downloadBulkGrievancesPDF, downloadGrievancesCSV, getCategoryCodeAndName } from '../../utils/pdfGenerator'

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
    const [downloadingBulk, setDownloadingBulk] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        category: '',
        search: '',
        dateFrom: '',
        dateTo: ''
    })
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

    const resetFilters = () => {
        setFilters({ status: '', priority: '', category: '', search: '', dateFrom: '', dateTo: '' })
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

    const handleBulkDownloadPDF = async () => {
        setDownloadingBulk(true)
        try {
            const allFiltered = await adminService.getAllFilteredGrievances(filters)
            const catName = categories.find(c => c.id === filters.category)?.name_en || filters.category
            await downloadBulkGrievancesPDF(allFiltered, {
                ...filters,
                category: catName
            })
        } catch (err) {
            console.error('Bulk PDF export error:', err)
            alert('Failed to export grievances PDF.')
        } finally {
            setDownloadingBulk(false)
        }
    }

    const handleBulkDownloadCSV = async () => {
        setDownloadingBulk(true)
        try {
            const allFiltered = await adminService.getAllFilteredGrievances(filters)
            downloadGrievancesCSV(allFiltered)
        } catch (err) {
            console.error('Bulk CSV export error:', err)
            alert('Failed to export grievances CSV.')
        } finally {
            setDownloadingBulk(false)
        }
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return '—'
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
    }

    return (
        <div className="space-y-4">
            {/* Header & Bulk Actions */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md shadow-slate-900/5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                        <h2 className="text-slate-900 font-extrabold text-lg flex items-center gap-2">
                            <FileText className="w-5 h-5 text-tvk-red" />
                            Constituency Grievances Management
                        </h2>
                        <p className="text-slate-500 text-xs font-semibold">Filter, review, and download PDF reports for Wards 188 & 189</p>
                    </div>

                    {/* Bulk Downloads */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={handleBulkDownloadPDF}
                            disabled={downloadingBulk || totalCount === 0}
                            className="bg-tvk-red hover:bg-tvk-red/90 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {downloadingBulk ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                            {downloadingBulk ? 'Generating PDF...' : `Download PDF Documents (${totalCount})`}
                        </button>
                        <button
                            onClick={handleBulkDownloadCSV}
                            disabled={downloadingBulk || totalCount === 0}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                        >
                            <FileDown className="w-4 h-4 text-emerald-600" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                    {/* Search */}
                    <div className="relative sm:col-span-2">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search name, ref ID, street..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red transition-all"
                        />
                    </div>
                    {/* Status */}
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red font-bold uppercase cursor-pointer"
                    >
                        {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    {/* Priority */}
                    <select
                        value={filters.priority}
                        onChange={(e) => handleFilterChange('priority', e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red font-bold uppercase cursor-pointer"
                    >
                        {priorityOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    {/* Category A - H */}
                    <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red font-bold uppercase cursor-pointer"
                    >
                        <option value="">All Categories (A - H)</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name_en}</option>
                        ))}
                    </select>

                    {/* Date From & Date To */}
                    <div className="flex items-center gap-1.5 sm:col-span-2 lg:col-span-1">
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                            title="From Date"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-800 px-2 py-2 focus:outline-none"
                        />
                        <span className="text-slate-400 text-xs font-bold">-</span>
                        <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                            title="To Date"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-800 px-2 py-2 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-extrabold uppercase text-slate-500 pt-1">
                    <span>{totalCount} grievances found</span>
                    {(filters.status || filters.priority || filters.category || filters.search || filters.dateFrom || filters.dateTo) && (
                        <button onClick={resetFilters} className="text-tvk-red hover:underline flex items-center gap-1 cursor-pointer">
                            <RefreshCw className="w-3 h-3" /> Reset Filters
                        </button>
                    )}
                </div>
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
                        <p className="text-xs font-bold uppercase tracking-wider">No grievances found matching criteria</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Ref ID</th>
                                    <th className="text-center text-slate-500 font-bold uppercase tracking-wider text-[10px] px-3 py-4">Code</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Category</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Petitioner</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden md:table-cell">Ward & Street</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Status</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden sm:table-cell">Priority</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden lg:table-cell">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => {
                                    const { code, name: catName } = getCategoryCodeAndName(item)
                                    return (
                                        <tr
                                            key={item.id}
                                            onClick={() => setSelectedItem(item)}
                                            className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                                        >
                                            <td className="px-4 py-3.5">
                                                <span className="text-tvk-red font-mono text-xs font-bold">{item.reference_id}</span>
                                            </td>
                                            <td className="px-3 py-3.5 text-center">
                                                <span className="inline-block bg-tvk-red/10 text-tvk-red font-black text-xs px-2.5 py-0.5 rounded-md">
                                                    {code}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3.5 text-slate-800 font-semibold text-xs max-w-[200px] truncate">
                                                {catName}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="font-semibold text-slate-900 text-xs">{item.name}</div>
                                                <div className="text-[10px] text-slate-500 font-mono">{item.phone}</div>
                                            </td>
                                            <td className="px-4 py-3.5 text-slate-700 text-xs font-medium hidden md:table-cell">
                                                <div className="font-bold text-slate-900">{item.ward_number ? `Ward ${item.ward_number}` : '—'}</div>
                                                <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{item.street || item.area}</div>
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
                                            <td className="px-4 py-3.5 text-slate-500 font-bold text-[11px] hidden lg:table-cell">
                                                {formatDate(item.created_at)}
                                            </td>
                                        </tr>
                                    )
                                })}
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
                                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 transition-all cursor-pointer"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 transition-all cursor-pointer"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal with Single PDF Download */}
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
                            className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto shadow-slate-900/10"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-tvk-red text-white font-black text-sm px-3 py-1 rounded-md">
                                             {getCategoryCodeAndName(selectedItem).code}
                                         </span>
                                        <h3 className="text-slate-900 font-black uppercase tracking-wider text-base">{selectedItem.title}</h3>
                                    </div>
                                    <span className="text-tvk-red font-mono text-xs font-bold block mt-1">{selectedItem.reference_id}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => downloadSingleGrievancePDF(selectedItem)}
                                        className="bg-tvk-red hover:bg-tvk-red/90 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                                    >
                                        <Download className="w-4 h-4" /> Download Official PDF
                                    </button>
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-1.5 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-5">
                                {/* Contact & Ward Info */}
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
                                        <Navigation className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Ward Number:</span>
                                        <span className="text-slate-900 font-extrabold">{selectedItem.ward_number ? `Ward ${selectedItem.ward_number}` : 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm sm:col-span-2">
                                        <MapPin className="w-4 h-4 text-tvk-red shrink-0" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] shrink-0">Street & Location:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.street || selectedItem.area}</span>
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
                                        <span className="text-xs font-extrabold text-slate-900 block mt-1">
                                            {getCategoryCodeAndName(selectedItem).name}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1.5">Grievance Description</label>
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
                                            Evidence Media Attachments ({(Array.isArray(selectedItem.attachments) ? selectedItem.attachments : JSON.parse(selectedItem.attachments || '[]')).length})
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {(Array.isArray(selectedItem.attachments) ? selectedItem.attachments : JSON.parse(selectedItem.attachments || '[]')).map((att, i) => {
                                                const isImage = att.name?.match(/\.(jpg|jpeg|png|gif|webp)$/i) || att.url?.match(/\.(jpg|jpeg|png|gif|webp)/i)
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
