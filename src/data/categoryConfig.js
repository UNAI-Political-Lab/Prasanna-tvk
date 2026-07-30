// Grievance Categories Configuration with Alphabet Codes (A - H)

export const GRIEVANCE_CATEGORIES = [
  {
    code: 'A',
    id_alias: 'cat_a',
    name_en: 'A - Corporation complain / Road',
    name_ta: 'A - மாநகராட்சி புகார் / சாலை',
    title_en: 'Corporation complain / Road',
    title_ta: 'மாநகராட்சி புகார் / சாலை',
    icon: 'Construction',
    color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600',
    sort_order: 1
  },
  {
    code: 'B',
    id_alias: 'cat_b',
    name_en: 'B - EB',
    name_ta: 'B - மின்வாரியம் (EB)',
    title_en: 'EB',
    title_ta: 'மின்வாரியம் (EB)',
    icon: 'Zap',
    color: 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-600',
    sort_order: 2
  },
  {
    code: 'C',
    id_alias: 'cat_c',
    name_en: 'C - Metro water/ drinage',
    name_ta: 'C - குடிநீர் / கழிவுநீர்',
    title_en: 'Metro water/ drinage',
    title_ta: 'குடிநீர் / கழிவுநீர்',
    icon: 'Droplets',
    color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
    sort_order: 3
  },
  {
    code: 'D',
    id_alias: 'cat_d',
    name_en: 'D - Civil/others',
    name_ta: 'D - குடிமை / பிற',
    title_en: 'Civil/others',
    title_ta: 'குடிமை / பிற',
    icon: 'Building2',
    color: 'bg-slate-50 text-slate-600 group-hover:bg-slate-600',
    sort_order: 4
  },
  {
    code: 'E',
    id_alias: 'cat_e',
    name_en: 'E - Forest [palikaranai, RAMSAR]',
    name_ta: 'E - வனம் [பள்ளிக்கரணை, RAMSAR]',
    title_en: 'Forest [palikaranai, RAMSAR]',
    title_ta: 'வனம் [பள்ளிக்கரணை, RAMSAR]',
    icon: 'TreePine',
    color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600',
    sort_order: 5
  },
  {
    code: 'F',
    id_alias: 'cat_f',
    name_en: 'F - PATTA',
    name_ta: 'F - பட்டா (PATTA)',
    title_en: 'PATTA',
    title_ta: 'பட்டா (PATTA)',
    icon: 'FileText',
    color: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600',
    sort_order: 6
  },
  {
    code: 'G',
    id_alias: 'cat_g',
    name_en: 'G - Help/Donation',
    name_ta: 'G - உதவி / நன்கொடை',
    title_en: 'Help/Donation',
    title_ta: 'உதவி / நன்கொடை',
    icon: 'HeartHandshake',
    color: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600',
    sort_order: 7
  },
  {
    code: 'H',
    id_alias: 'cat_h',
    name_en: 'H - Storm Water Drinage',
    name_ta: 'H - மழைநீர் வடிகால்',
    title_en: 'Storm Water Drinage',
    title_ta: 'மழைநீர் வடிகால்',
    icon: 'CloudRain',
    color: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600',
    sort_order: 8
  }
];

export const getCategoryByCode = (code) => {
  return GRIEVANCE_CATEGORIES.find(c => c.code === code) || null;
};
