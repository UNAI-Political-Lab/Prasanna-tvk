import React, { useState, useEffect, useCallback } from 'react'
import {
    Search, ChevronLeft, ChevronRight, Bell,
    CheckCircle, XCircle, Calendar, Loader2
} from 'lucide-react'
import { adminService } from '../../services/adminService'

const statusColors = {
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    failed: 'bg-red-50 text-red-700 border border-red-200',
}

const AdminNotifications = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [filters, setFilters] = useState({ status: '', search: '' })

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const result = await adminService.getNotificationLogs({ ...filters, page, pageSize: 20 })
            setData(result.data || [])
            setTotalPages(result.totalPages)
            setTotalCount(result.count || 0)
        } catch (err) {
            console.error('Error loading notification logs:', err)
        } finally {
            setLoading(false)
        }
    }, [filters, page])

    useEffect(() => { fetchData() }, [fetchData])

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
        setPage(1)
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
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by reference ID or recipient..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red transition-all font-semibold"
                        />
                    </div>
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red font-bold text-xs cursor-pointer min-w-[150px]"
                    >
                        <option value="">All Status</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-2.5">{totalCount} notification logs found</p>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md shadow-slate-900/5">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-6 h-6 text-tvk-red animate-spin" />
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-16 text-slate-500">
                        <Bell className="w-10 h-10 mx-auto mb-3 opacity-40 text-tvk-red" />
                        <p className="text-xs font-bold uppercase tracking-wider">No notification logs found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Status</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Reference ID</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Recipient</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden md:table-cell">Error</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-2">
                                                {item.status === 'success' ? (
                                                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                                                )}
                                                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${statusColors[item.status]}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className="text-tvk-red font-mono text-xs font-bold">{item.reference_id || '—'}</span>
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-900 font-semibold">{item.recipient}</td>
                                        <td className="px-4 py-3.5 text-slate-500 text-xs hidden md:table-cell max-w-xs truncate font-semibold">
                                            {item.error_message || '—'}
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-500 text-xs font-semibold">
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
        </div>
    )
}

export default AdminNotifications
