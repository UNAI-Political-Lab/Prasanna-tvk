import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Track whether Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'))

if (!isSupabaseConfigured) {
    console.info(
        '%c[Supabase] Running in offline/demo mode. ' +
        'To connect to a real database, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.',
        'color: #888; font-style: italic;'
    )
}

// Create a real client only when configured, otherwise use a dummy URL that won't be called
export const supabase = createClient(
    supabaseUrl || 'https://localhost.invalid',
    supabaseAnonKey || 'dummy-key'
)
