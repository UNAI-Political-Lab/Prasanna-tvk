import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [adminRole, setAdminRole] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchAdminRole = useCallback(async (userId) => {
        if (!isSupabaseConfigured) return null
        try {
            // Use RPC function (SECURITY DEFINER) to bypass RLS
            const { data, error } = await supabase.rpc('get_my_admin_role')

            if (error || !data || data.length === 0) {
                setAdminRole(null)
                return null
            }
            // RPC returns an array of rows; take the first
            const role = data[0]
            setAdminRole(role)
            return role
        } catch {
            setAdminRole(null)
            return null
        }
    }, [])

    useEffect(() => {
        // If Supabase is not configured, skip auth entirely
        if (!isSupabaseConfigured) {
            setLoading(false)
            return
        }

        // Check initial session
        const initAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (session?.user) {
                    setUser(session.user)
                    await fetchAdminRole(session.user.id)
                } else {
                    setUser(null)
                    setAdminRole(null)
                }
            } catch {
                setUser(null)
                setAdminRole(null)
            } finally {
                setLoading(false)
            }
        }

        initAuth()

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    setUser(session.user)
                    await fetchAdminRole(session.user.id)
                } else if (event === 'SIGNED_OUT') {
                    setUser(null)
                    setAdminRole(null)
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [fetchAdminRole])

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) throw error

        // Verify user is an admin
        const role = await fetchAdminRole(data.user.id)
        if (!role) {
            // Not an admin — sign them out immediately
            await supabase.auth.signOut()
            throw new Error('Access denied. You are not registered as an administrator.')
        }

        return data
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        setUser(null)
        setAdminRole(null)
    }

    const isAdmin = !!adminRole
    const isSuperAdmin = adminRole?.role === 'super_admin'

    const value = {
        user,
        adminRole,
        loading,
        isAdmin,
        isSuperAdmin,
        signIn,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
