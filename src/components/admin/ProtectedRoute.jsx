import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ requiredRole = 'admin' }) => {
    const { user, adminRole, loading, isAdmin, isSuperAdmin } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-tvk-red border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-400 text-sm font-medium">Verifying access...</p>
                </div>
            </div>
        )
    }

    if (!user || !isAdmin) {
        return <Navigate to="/admin/login" replace />
    }

    if (requiredRole === 'super_admin' && !isSuperAdmin) {
        return <Navigate to="/admin" replace />
    }

    return <Outlet />
}

export default ProtectedRoute
