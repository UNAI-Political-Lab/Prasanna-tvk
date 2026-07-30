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

-- 3. Safely Upsert Categories A through H by category_code or name_en
DO $$
DECLARE
    cat RECORD;
    categories_data JSONB := '[
      {"code": "A", "name_en": "A - Corporation Complaint / Roads", "name_ta": "A - மாநகராட்சி புகார் / சாலைகள்", "icon": "Construction", "color": "bg-amber-50 text-amber-600 group-hover:bg-amber-600", "sort_order": 1},
      {"code": "B", "name_en": "B - Electricity Board (EB)", "name_ta": "B - மின்சார வாரியம் (EB)", "icon": "Zap", "color": "bg-yellow-50 text-yellow-600 group-hover:bg-yellow-600", "sort_order": 2},
      {"code": "C", "name_en": "C - Metro Water / Drainage", "name_ta": "C - குடிநீர் / கழிவுநீர் மற்றும் வடிகால்", "icon": "Droplets", "color": "bg-blue-50 text-blue-600 group-hover:bg-blue-600", "sort_order": 3},
      {"code": "D", "name_en": "D - Civil Works & General Issues", "name_ta": "D - குடிமைப் பணிகள் & பொதுப் பிரச்சனைகள்", "icon": "Building2", "color": "bg-slate-50 text-slate-600 group-hover:bg-slate-600", "sort_order": 4},
      {"code": "E", "name_en": "E - Forest & Environment [Pallikaranai, RAMSAR]", "name_ta": "E - வனம் & சுற்றுச்சூழல் [பள்ளிக்கரணை, RAMSAR]", "icon": "TreePine", "color": "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600", "sort_order": 5},
      {"code": "F", "name_en": "F - PATTA & Land Revenue", "name_ta": "F - பட்டா & நில வருவாய் சேவைகள்", "icon": "FileText", "color": "bg-violet-50 text-violet-600 group-hover:bg-violet-600", "sort_order": 6},
      {"code": "G", "name_en": "G - Welfare Help & Donations", "name_ta": "G - நலத்திட்ட உதவி / நன்கொடைகள்", "icon": "HeartHandshake", "color": "bg-pink-50 text-pink-600 group-hover:bg-pink-600", "sort_order": 7},
      {"code": "H", "name_en": "H - Storm Water Drainage", "name_ta": "H - மழைநீர் வடிகால் வசதிகள்", "icon": "CloudRain", "color": "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600", "sort_order": 8}
    ]';
BEGIN
    FOR cat IN SELECT * FROM jsonb_to_recordset(categories_data) AS x(code text, name_en text, name_ta text, icon text, color text, sort_order int)
    LOOP
        -- Check if category with this category_code already exists
        IF EXISTS (SELECT 1 FROM complaint_categories WHERE category_code = cat.code) THEN
            UPDATE complaint_categories
            SET name_en = cat.name_en,
                name_ta = cat.name_ta,
                icon = cat.icon,
                color = cat.color,
                sort_order = cat.sort_order,
                is_active = true
            WHERE category_code = cat.code;
        -- Check if category with matching name_en exists
        ELSIF EXISTS (SELECT 1 FROM complaint_categories WHERE name_en = cat.name_en) THEN
            UPDATE complaint_categories
            SET category_code = cat.code,
                name_ta = cat.name_ta,
                icon = cat.icon,
                color = cat.color,
                sort_order = cat.sort_order,
                is_active = true
            WHERE name_en = cat.name_en;
        ELSE
            INSERT INTO complaint_categories (category_code, name_en, name_ta, icon, color, sort_order, is_active)
            VALUES (cat.code, cat.name_en, cat.name_ta, cat.icon, cat.color, cat.sort_order, true);
        END IF;
    END LOOP;
END $$;

-- 4. Ensure category_code unique index exists
CREATE UNIQUE INDEX IF NOT EXISTS idx_complaint_categories_code ON complaint_categories(category_code);
