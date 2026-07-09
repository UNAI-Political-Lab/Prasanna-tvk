-- ==============================================================
-- BLOGS MIGRATION
-- Run this script in the Supabase Dashboard → SQL Editor
-- ==============================================================

-- 1. Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    author TEXT DEFAULT 'S. Prasanna',
    image TEXT, -- Cover image URL (public link to storage)
    images JSONB DEFAULT '[]'::jsonb, -- Array of additional event image URLs
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow public SELECT (anyone can read blog posts)
DROP POLICY IF EXISTS "Allow public read access to blogs" ON blogs;
CREATE POLICY "Allow public read access to blogs"
ON blogs FOR SELECT
TO public
USING (true);

-- Allow authenticated admin INSERT (only admins can create posts)
DROP POLICY IF EXISTS "Admins can insert blogs" ON blogs;
CREATE POLICY "Admins can insert blogs"
ON blogs FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Allow authenticated admin UPDATE (only admins can modify posts)
DROP POLICY IF EXISTS "Admins can update blogs" ON blogs;
CREATE POLICY "Admins can update blogs"
ON blogs FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Allow authenticated admin DELETE (only admins can delete posts)
DROP POLICY IF EXISTS "Admins can delete blogs" ON blogs;
CREATE POLICY "Admins can delete blogs"
ON blogs FOR DELETE
TO authenticated
USING (public.is_admin());

-- 4. Set up updated_at trigger to auto-update modification timestamps
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
