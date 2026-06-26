import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search, ChevronLeft, ChevronRight, Users,
    Phone, Mail, MapPin, Calendar, CreditCard,
    GraduationCap, CheckCircle, XCircle, X,
    Loader2
} from 'lucide-react'
import { adminService } from '../../services/adminService'

const statusColors = {
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    rejected: 'bg-red-50 text-red-700 border border-red-200',
}

const AdminMemberships = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [filters, setFilters] = useState({ status: '', district: '', search: '' })
    const [selectedItem, setSelectedItem] = useState(null)
    const [updating, setUpdating] = useState(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const result = await adminService.getMemberships({ ...filters, page, pageSize: 20 })
            setData(result.data || [])
            setTotalPages(result.totalPages)
            setTotalCount(result.count || 0)
        } catch (err) {
            console.error('Error loading memberships:', err)
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
            await adminService.updateMembershipStatus(id, newStatus)
            setData(prev => prev.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            ))
            if (selectedItem?.id === id) {
                setSelectedItem(prev => ({ ...prev, status: newStatus }))
            }
        } catch (err) {
            console.error('Failed to update membership status:', err)
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
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, phone, email, or voter ID..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red transition-all font-semibold"
                        />
                    </div>
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-tvk-red/20 focus:border-tvk-red font-bold uppercase tracking-wider text-xs cursor-pointer min-w-[130px] text-center"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-2.5">{totalCount} membership applications found</p>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md shadow-slate-900/5">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-6 h-6 text-tvk-red animate-spin" />
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-16 text-slate-500">
                        <Users className="w-10 h-10 mx-auto mb-3 opacity-40 text-tvk-red" />
                        <p className="text-xs font-bold uppercase tracking-wider">No membership applications found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Name</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden sm:table-cell">Phone</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden md:table-cell">District</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4 hidden lg:table-cell">Ward</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Status</th>
                                    <th className="text-left text-slate-500 font-bold uppercase tracking-wider text-[10px] px-4 py-4">Actions</th>
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
                                            <span className="text-slate-900 font-semibold">{item.name}</span>
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-700 font-medium hidden sm:table-cell">{item.phone}</td>
                                        <td className="px-4 py-3.5 text-slate-700 font-medium hidden md:table-cell">{item.district}</td>
                                        <td className="px-4 py-3.5 text-slate-700 font-medium hidden lg:table-cell">{item.ward}</td>
                                        <td className="px-4 py-3.5">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border ${statusColors[item.status]}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                                                {item.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusChange(item.id, 'approved')}
                                                            disabled={updating === item.id}
                                                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(item.id, 'rejected')}
                                                            disabled={updating === item.id}
                                                            className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                {item.status === 'approved' && (
                                                    <button
                                                        onClick={() => handleStatusChange(item.id, 'rejected')}
                                                        disabled={updating === item.id}
                                                        className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50 text-xs"
                                                        title="Reject"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {item.status === 'rejected' && (
                                                    <button
                                                        onClick={() => handleStatusChange(item.id, 'approved')}
                                                        disabled={updating === item.id}
                                                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50 text-xs"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
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
                            className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-slate-900/10"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
                                <div>
                                    <h3 className="text-slate-900 font-black uppercase tracking-wider text-base">Membership Application</h3>
                                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${statusColors[selectedItem.status]} inline-block mt-1`}>
                                        {selectedItem.status}
                                    </span>
                                </div>
                                <button onClick={() => setSelectedItem(null)} className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <Users className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Name:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <Phone className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Phone:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <Mail className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Email:</span>
                                        <span className="text-slate-900 font-bold truncate select-all">{selectedItem.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <Calendar className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Age:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.age}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <MapPin className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">District:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.district}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <MapPin className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Taluk:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.taluk}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <MapPin className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Ward:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.ward}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <CreditCard className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Voter ID:</span>
                                        <span className="text-slate-900 font-bold select-all">{selectedItem.voter_id}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm sm:col-span-2">
                                        <GraduationCap className="w-4 h-4 text-tvk-red" />
                                        <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Qualification:</span>
                                        <span className="text-slate-900 font-bold">{selectedItem.qualification}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1.5">Message</label>
                                    <p className="text-slate-700 text-sm bg-slate-50 rounded-xl p-4 border border-slate-200 whitespace-pre-wrap leading-relaxed">
                                        {selectedItem.message}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-3 border-t border-slate-200">
                                    {selectedItem.status !== 'approved' && (
                                        <button
                                            onClick={() => handleStatusChange(selectedItem.id, 'approved')}
                                            disabled={updating === selectedItem.id}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-700 border border-emerald-200 font-black uppercase tracking-wider text-xs rounded-xl hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Approve
                                        </button>
                                    )}
                                    {selectedItem.status !== 'rejected' && (
                                        <button
                                            onClick={() => handleStatusChange(selectedItem.id, 'rejected')}
                                            disabled={updating === selectedItem.id}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-700 border border-red-200 font-black uppercase tracking-wider text-xs rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Reject
                                        </button>
                                    )}
                                </div>

                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pt-2">
                                    <Calendar className="w-3.5 h-3.5 text-tvk-red" />
                                    Applied: {formatDate(selectedItem.created_at)}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AdminMemberships
