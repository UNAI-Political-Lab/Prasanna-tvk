-- Create Schema for TVK Political Website

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COMPLAINT CATEGORIES
CREATE TABLE IF NOT EXISTS complaint_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL UNIQUE,
    name_ta TEXT NOT NULL UNIQUE,
    icon TEXT,
    color TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for complaint_categories
ALTER TABLE complaint_categories ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read to categories
DROP POLICY IF EXISTS "Allow anonymous read to categories" ON complaint_categories;
CREATE POLICY "Allow anonymous read to categories" 
ON complaint_categories FOR SELECT 
TO anon 
USING (is_active = true);

-- 2. GRIEVANCES
CREATE TABLE IF NOT EXISTS grievances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT UNIQUE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    area TEXT NOT NULL,
    category_id UUID REFERENCES complaint_categories(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    attachments JSONB DEFAULT '[]'::jsonb,
    whatsapp_notified BOOLEAN DEFAULT false,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for grievances
ALTER TABLE grievances ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public) to insert/read/update grievances (public forms work when logged in)
DROP POLICY IF EXISTS "Allow anonymous insert for grievances" ON grievances;
DROP POLICY IF EXISTS "Allow authenticated insert for grievances" ON grievances;
DROP POLICY IF EXISTS "Allow public insert for grievances" ON grievances;
CREATE POLICY "Allow public insert for grievances"
ON grievances FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous tracking lookup for grievances" ON grievances;
DROP POLICY IF EXISTS "Allow authenticated read for grievances" ON grievances;
DROP POLICY IF EXISTS "Admins can read all grievances" ON grievances;
DROP POLICY IF EXISTS "Allow public read for grievances" ON grievances;
CREATE POLICY "Allow public read for grievances"
ON grievances FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Allow anonymous update for grievances" ON grievances;
DROP POLICY IF EXISTS "Allow authenticated update for grievances" ON grievances;
DROP POLICY IF EXISTS "Admins can update grievances" ON grievances;
DROP POLICY IF EXISTS "Allow public update for grievances" ON grievances;
CREATE POLICY "Allow public update for grievances"
ON grievances FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Trigger to automatically update updated_at on update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_grievances_updated_at ON grievances;
CREATE TRIGGER update_grievances_updated_at
BEFORE UPDATE ON grievances
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Function to generate a human-readable unique reference ID (e.g. GRV-YYYYMMDD-NNN)
CREATE OR REPLACE FUNCTION generate_grievance_reference_id()
RETURNS TRIGGER AS $$
DECLARE
    date_part TEXT;
    seq_part INTEGER;
    new_ref TEXT;
BEGIN
    date_part := to_char(NOW(), 'YYYYMMDD');
    
    -- Count grievances submitted today to get sequence
    SELECT COUNT(*) + 1 INTO seq_part 
    FROM grievances 
    WHERE to_char(created_at, 'YYYYMMDD') = date_part;
    
    new_ref := 'GRV-' || date_part || '-' || lpad(seq_part::text, 3, '0');
    NEW.reference_id := new_ref;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set reference_id on insert
DROP TRIGGER IF EXISTS set_grievance_reference_id ON grievances;
CREATE TRIGGER set_grievance_reference_id
BEFORE INSERT ON grievances
FOR EACH ROW
WHEN (NEW.reference_id IS NULL)
EXECUTE FUNCTION generate_grievance_reference_id();

-- 3. MEMBERSHIPS
CREATE TABLE IF NOT EXISTS memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    age INTEGER NOT NULL,
    district TEXT NOT NULL,
    taluk TEXT NOT NULL,
    ward TEXT NOT NULL,
    voter_id TEXT NOT NULL,
    qualification TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for memberships
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public) to insert memberships
DROP POLICY IF EXISTS "Allow anonymous insert for memberships" ON memberships;
DROP POLICY IF EXISTS "Allow authenticated insert for memberships" ON memberships;
DROP POLICY IF EXISTS "Allow public insert for memberships" ON memberships;
CREATE POLICY "Allow public insert for memberships" 
ON memberships FOR INSERT 
TO public 
WITH CHECK (true);

-- 4. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public) to insert contact messages
DROP POLICY IF EXISTS "Allow anonymous insert for contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated insert for contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public insert for contact_messages" ON contact_messages;
CREATE POLICY "Allow public insert for contact_messages" 
ON contact_messages FOR INSERT 
TO public 
WITH CHECK (true);

-- 5. FUNCTION FOR STATS DASHBOARD
CREATE OR REPLACE FUNCTION get_grievance_stats()
RETURNS TABLE (
    total_complaints BIGINT,
    resolved_complaints BIGINT,
    pending_complaints BIGINT,
    today_complaints BIGINT,
    avg_resolution_days DOUBLE PRECISION
) SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT as total_complaints,
        COUNT(CASE WHEN status = 'resolved' THEN 1 END)::BIGINT as resolved_complaints,
        COUNT(CASE WHEN status IN ('pending', 'in_progress') THEN 1 END)::BIGINT as pending_complaints,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '1 day' THEN 1 END)::BIGINT as today_complaints,
        COALESCE(
            AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 86400.0), 
            2.4
        )::DOUBLE PRECISION as avg_resolution_days
    FROM grievances;
END;
$$ LANGUAGE plpgsql;

-- Populate default complaint categories
INSERT INTO complaint_categories (name_en, name_ta, icon, color, sort_order) VALUES
('Water Supply', 'குடிநீர்', 'Droplets', 'bg-blue-50 text-blue-600 group-hover:bg-blue-600', 1),
('Roads', 'சாலைகள்', 'Construction', 'bg-amber-50 text-amber-600 group-hover:bg-amber-600', 2),
('Healthcare', 'மருத்துவ வசதிகள்', 'Stethoscope', 'bg-green-50 text-green-600 group-hover:bg-green-600', 3),
('Enquiry', 'தேர்வு விசாரணை', 'Search', 'bg-violet-50 text-violet-600 group-hover:bg-violet-600', 4),
('Rural Plan', 'ஊரக அமைப்பு', 'Building2', 'bg-teal-50 text-teal-600 group-hover:bg-teal-600', 5),
('Youth', 'இளைஞர்', 'Users', 'bg-sky-50 text-sky-600 group-hover:bg-sky-600', 6),
('Women', 'பெண்கள் புரவலர்', 'HeartHandshake', 'bg-pink-50 text-pink-600 group-hover:bg-pink-600', 7),
('Sanitation', 'சுகாதாரம்', 'Sanitation', 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600', 8)
ON CONFLICT (name_en) DO UPDATE 
SET name_ta = EXCLUDED.name_ta, icon = EXCLUDED.icon, color = EXCLUDED.color, sort_order = EXCLUDED.sort_order;

-- 6. PROGRAMMATIC STORAGE BUCKET CREATION & RLS POLICIES
-- Ensure storage bucket exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('evidence-media', 'evidence-media', true)
ON CONFLICT (id) DO NOTHING;

-- Enable storage RLS policies
-- Note: Supabase enables RLS on storage.objects by default, but let's make sure we define appropriate access.
DROP POLICY IF EXISTS "Allow anonymous upload to evidence-media" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload to evidence-media" ON storage.objects;
CREATE POLICY "Allow upload to evidence-media"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'evidence-media');

DROP POLICY IF EXISTS "Allow public read access to evidence-media" ON storage.objects;
DROP POLICY IF EXISTS "Allow read access to evidence-media" ON storage.objects;
CREATE POLICY "Allow read access to evidence-media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'evidence-media');

-- 7. NOTIFICATION LOGS
CREATE TABLE IF NOT EXISTS notification_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grievance_id UUID REFERENCES grievances(id) ON DELETE SET NULL,
    reference_id TEXT,
    recipient TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('success', 'failed')),
    response_payload JSONB,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Allow service role to perform all actions on logs
DROP POLICY IF EXISTS "Allow service role operations on logs" ON notification_logs;
CREATE POLICY "Allow service role operations on logs"
ON notification_logs FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

