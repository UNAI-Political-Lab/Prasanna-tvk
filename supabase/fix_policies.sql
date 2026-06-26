-- ==============================================================
-- DATABASE & STORAGE POLICIES FIX MIGRATION
-- Run this script in the Supabase Dashboard → SQL Editor
-- ==============================================================

-- 1. FIX GRIEVANCES POLICIES (Allow public access for insert, read/track, and update)
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


-- 2. FIX MEMBERSHIPS POLICIES
DROP POLICY IF EXISTS "Allow anonymous insert for memberships" ON memberships;
DROP POLICY IF EXISTS "Allow authenticated insert for memberships" ON memberships;
DROP POLICY IF EXISTS "Allow public insert for memberships" ON memberships;
CREATE POLICY "Allow public insert for memberships" 
ON memberships FOR INSERT 
TO public 
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read all memberships" ON memberships;
DROP POLICY IF EXISTS "Allow public read for memberships" ON memberships;
CREATE POLICY "Allow public read for memberships"
ON memberships FOR SELECT
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update memberships" ON memberships;
DROP POLICY IF EXISTS "Allow public update for memberships" ON memberships;
CREATE POLICY "Allow admin update for memberships"
ON memberships FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());


-- 3. FIX CONTACT MESSAGES POLICIES
DROP POLICY IF EXISTS "Allow anonymous insert for contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated insert for contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public insert for contact_messages" ON contact_messages;
CREATE POLICY "Allow public insert for contact_messages" 
ON contact_messages FOR INSERT 
TO public 
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read all contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public read for contact_messages" ON contact_messages;
CREATE POLICY "Allow public read for contact_messages"
ON contact_messages FOR SELECT
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public update for contact_messages" ON contact_messages;
CREATE POLICY "Allow admin update for contact_messages"
ON contact_messages FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());


-- 4. FIX STORAGE BUCKET POLICIES FOR 'evidence-media' (Allows public upload and read for all roles)
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
