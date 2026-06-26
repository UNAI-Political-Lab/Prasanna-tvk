-- ============================================
-- ADMIN DASHBOARD SCHEMA MIGRATION
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. ADMIN USERS TABLE
-- Maps Supabase Auth users to admin roles
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
    display_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. SECURITY DEFINER HELPER FUNCTIONS
-- These bypass RLS to prevent infinite recursion
-- when policies need to check admin_users
-- ============================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users WHERE id = auth.uid()
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'super_admin'
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_my_admin_role()
RETURNS TABLE(role TEXT, display_name TEXT)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT au.role, au.display_name
    FROM public.admin_users au
    WHERE au.id = auth.uid();
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_admin_role() TO authenticated;


-- ============================================
-- 3. RLS POLICIES FOR admin_users
-- Use SECURITY DEFINER functions to avoid recursion
-- ============================================

-- Authenticated users can read their own admin row
DROP POLICY IF EXISTS "Admin users can read own row" ON admin_users;
CREATE POLICY "Admin users can read own row"
ON admin_users FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Super admins can insert new admin users
DROP POLICY IF EXISTS "Super admins can insert admin users" ON admin_users;
CREATE POLICY "Super admins can insert admin users"
ON admin_users FOR INSERT
TO authenticated
WITH CHECK (public.is_super_admin());

-- Super admins can update admin users
DROP POLICY IF EXISTS "Super admins can update admin users" ON admin_users;
CREATE POLICY "Super admins can update admin users"
ON admin_users FOR UPDATE
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- Super admins can delete admin users
DROP POLICY IF EXISTS "Super admins can delete admin users" ON admin_users;
CREATE POLICY "Super admins can delete admin users"
ON admin_users FOR DELETE
TO authenticated
USING (public.is_super_admin());


-- ============================================
-- 4. RLS POLICIES FOR EXISTING TABLES (authenticated role)
-- ============================================

-- GRIEVANCES: Anyone can read grievances (public tracking + insert)
DROP POLICY IF EXISTS "Admins can read all grievances" ON grievances;
DROP POLICY IF EXISTS "Allow public read for grievances" ON grievances;
CREATE POLICY "Allow public read for grievances"
ON grievances FOR SELECT
TO public
USING (true);

-- GRIEVANCES: Anyone can update grievances (needed for attachment flow)
DROP POLICY IF EXISTS "Admins can update grievances" ON grievances;
DROP POLICY IF EXISTS "Allow public update for grievances" ON grievances;
CREATE POLICY "Allow public update for grievances"
ON grievances FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- MEMBERSHIPS: Admins can read all memberships
DROP POLICY IF EXISTS "Admins can read all memberships" ON memberships;
CREATE POLICY "Admins can read all memberships"
ON memberships FOR SELECT
TO authenticated
USING (public.is_admin());

-- MEMBERSHIPS: Admins can update membership status
DROP POLICY IF EXISTS "Admins can update memberships" ON memberships;
CREATE POLICY "Admins can update memberships"
ON memberships FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- CONTACT MESSAGES: Admins can read all messages
DROP POLICY IF EXISTS "Admins can read all contact messages" ON contact_messages;
CREATE POLICY "Admins can read all contact messages"
ON contact_messages FOR SELECT
TO authenticated
USING (public.is_admin());

-- CONTACT MESSAGES: Admins can update (mark read/unread)
DROP POLICY IF EXISTS "Admins can update contact messages" ON contact_messages;
CREATE POLICY "Admins can update contact messages"
ON contact_messages FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- NOTIFICATION LOGS: Admins can read all logs
DROP POLICY IF EXISTS "Admins can read notification logs" ON notification_logs;
CREATE POLICY "Admins can read notification logs"
ON notification_logs FOR SELECT
TO authenticated
USING (public.is_admin());

-- COMPLAINT CATEGORIES: Admins can read all categories (including inactive)
DROP POLICY IF EXISTS "Admins can read all categories" ON complaint_categories;
CREATE POLICY "Admins can read all categories"
ON complaint_categories FOR SELECT
TO authenticated
USING (public.is_admin());


-- ============================================
-- 5. COMPREHENSIVE DASHBOARD STATS RPC
-- ============================================
CREATE OR REPLACE FUNCTION get_admin_dashboard_stats()
RETURNS JSON
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result JSON;
BEGIN
    -- Only allow admins
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied';
    END IF;

    SELECT json_build_object(
        -- Grievance totals
        'total_grievances', (SELECT COUNT(*) FROM grievances),
        'pending_grievances', (SELECT COUNT(*) FROM grievances WHERE status = 'pending'),
        'in_progress_grievances', (SELECT COUNT(*) FROM grievances WHERE status = 'in_progress'),
        'resolved_grievances', (SELECT COUNT(*) FROM grievances WHERE status = 'resolved'),
        'today_grievances', (SELECT COUNT(*) FROM grievances WHERE created_at >= CURRENT_DATE),
        
        -- Grievance priority breakdown
        'priority_low', (SELECT COUNT(*) FROM grievances WHERE priority = 'low'),
        'priority_medium', (SELECT COUNT(*) FROM grievances WHERE priority = 'medium'),
        'priority_high', (SELECT COUNT(*) FROM grievances WHERE priority = 'high'),
        'priority_urgent', (SELECT COUNT(*) FROM grievances WHERE priority = 'urgent'),
        
        -- Avg resolution time in days
        'avg_resolution_days', COALESCE(
            (SELECT AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 86400.0)
             FROM grievances WHERE resolved_at IS NOT NULL),
            0
        ),
        
        -- Membership totals
        'total_memberships', (SELECT COUNT(*) FROM memberships),
        'pending_memberships', (SELECT COUNT(*) FROM memberships WHERE status = 'pending'),
        'approved_memberships', (SELECT COUNT(*) FROM memberships WHERE status = 'approved'),
        'rejected_memberships', (SELECT COUNT(*) FROM memberships WHERE status = 'rejected'),
        'today_memberships', (SELECT COUNT(*) FROM memberships WHERE created_at >= CURRENT_DATE),
        
        -- Contact messages
        'total_messages', (SELECT COUNT(*) FROM contact_messages),
        'unread_messages', (SELECT COUNT(*) FROM contact_messages WHERE is_read = false),
        'today_messages', (SELECT COUNT(*) FROM contact_messages WHERE created_at >= CURRENT_DATE),
        
        -- Notifications
        'total_notifications', (SELECT COUNT(*) FROM notification_logs),
        'failed_notifications', (SELECT COUNT(*) FROM notification_logs WHERE status = 'failed'),
        
        -- Weekly trend: last 7 days of grievances
        'weekly_grievances', (
            SELECT COALESCE(json_agg(row_to_json(d)), '[]'::json) FROM (
                SELECT 
                    to_char(day, 'YYYY-MM-DD') as date,
                    to_char(day, 'Dy') as day_label,
                    COALESCE((
                        SELECT COUNT(*) FROM grievances 
                        WHERE created_at::date = day
                    ), 0) as count
                FROM generate_series(
                    CURRENT_DATE - INTERVAL '6 days', 
                    CURRENT_DATE, 
                    '1 day'
                ) AS day
            ) d
        ),
        
        -- Weekly trend: last 7 days of memberships
        'weekly_memberships', (
            SELECT COALESCE(json_agg(row_to_json(d)), '[]'::json) FROM (
                SELECT 
                    to_char(day, 'YYYY-MM-DD') as date,
                    to_char(day, 'Dy') as day_label,
                    COALESCE((
                        SELECT COUNT(*) FROM memberships 
                        WHERE created_at::date = day
                    ), 0) as count
                FROM generate_series(
                    CURRENT_DATE - INTERVAL '6 days', 
                    CURRENT_DATE, 
                    '1 day'
                ) AS day
            ) d
        ),

        -- Category breakdown for grievances
        'category_breakdown', (
            SELECT COALESCE(json_agg(row_to_json(c)), '[]'::json) FROM (
                SELECT 
                    cc.name_en as category,
                    COUNT(g.id) as count
                FROM complaint_categories cc
                LEFT JOIN grievances g ON g.category_id = cc.id
                WHERE cc.is_active = true
                GROUP BY cc.name_en
                ORDER BY count DESC
            ) c
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION get_admin_dashboard_stats() TO authenticated;


-- ============================================
-- INSTRUCTIONS FOR FIRST ADMIN SETUP
-- ============================================
-- 1. Go to Supabase Dashboard → Authentication → Users → Add User
-- 2. Create a user with email + password
-- 3. Copy the user's UUID from the dashboard
-- 4. Run this query (replace the values):
--
-- INSERT INTO admin_users (id, email, role, display_name)
-- VALUES (
--     'YOUR-USER-UUID-HERE',
--     'admin@example.com',
--     'super_admin',
--     'Admin Name'
-- );
