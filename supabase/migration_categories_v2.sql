-- Migration Script: Categories A-H, Ward Number, and Street support for Grievances

-- 1. Add category_code to complaint_categories if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'complaint_categories' AND column_name = 'category_code') THEN
        ALTER TABLE complaint_categories ADD COLUMN category_code VARCHAR(5);
    END IF;
END $$;

-- 2. Add ward_number and street to grievances table if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'grievances' AND column_name = 'ward_number') THEN
        ALTER TABLE grievances ADD COLUMN ward_number VARCHAR(20);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'grievances' AND column_name = 'street') THEN
        ALTER TABLE grievances ADD COLUMN street TEXT;
    END IF;
END $$;

-- 3. Upsert Categories A through H
-- We update existing categories or insert new ones
INSERT INTO complaint_categories (category_code, name_en, name_ta, icon, color, sort_order, is_active) VALUES
('A', 'A - Corporation complain / Road', 'A - மாநகராட்சி புகார் / சாலை', 'Construction', 'bg-amber-50 text-amber-600 group-hover:bg-amber-600', 1, true),
('B', 'B - EB', 'B - மின்வாரியம் (EB)', 'Zap', 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-600', 2, true),
('C', 'C - Metro water/ drinage', 'C - குடிநீர் / கழிவுநீர்', 'Droplets', 'bg-blue-50 text-blue-600 group-hover:bg-blue-600', 3, true),
('D', 'D - Civil/others', 'D - குடிமை / பிற', 'Building2', 'bg-slate-50 text-slate-600 group-hover:bg-slate-600', 4, true),
('E', 'E - Forest [palikaranai, RAMSAR]', 'E - வனம் [பள்ளிக்கரணை, RAMSAR]', 'TreePine', 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600', 5, true),
('F', 'F - PATTA', 'F - பட்டா (PATTA)', 'FileText', 'bg-violet-50 text-violet-600 group-hover:bg-violet-600', 6, true),
('G', 'G - Help/Donation', 'G - உதவி / நன்கொடை', 'HeartHandshake', 'bg-pink-50 text-pink-600 group-hover:bg-pink-600', 7, true),
('H', 'H - Storm Water Drinage', 'H - மழைநீர் வடிகால்', 'CloudRain', 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600', 8, true)
ON CONFLICT (name_en) DO UPDATE 
SET category_code = EXCLUDED.category_code,
    name_ta = EXCLUDED.name_ta,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    sort_order = EXCLUDED.sort_order,
    is_active = true;

-- Ensure category_code uniqueness index if not existing
CREATE UNIQUE INDEX IF NOT EXISTS idx_complaint_categories_code ON complaint_categories(category_code);
