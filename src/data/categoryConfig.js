// Grievance Categories Configuration with Alphabet Codes (A - H)

export const GRIEVANCE_CATEGORIES = [
  {
    code: 'A',
    id_alias: 'cat_a',
    name_en: 'A - Corporation Complaint / Roads',
    name_ta: 'A - மாநகராட்சி புகார் / சாலைகள்',
    title_en: 'Corporation Complaint / Roads',
    title_ta: 'மாநகராட்சி புகார் / சாலைகள்',
    icon: 'Construction',
    color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600',
    sort_order: 1
  },
  {
    code: 'B',
    id_alias: 'cat_b',
    name_en: 'B - Electricity Board (EB)',
    name_ta: 'B - மின்சார வாரியம் (EB)',
    title_en: 'Electricity Board (EB)',
    title_ta: 'மின்சார வாரியம் (EB)',
    icon: 'Zap',
    color: 'bg-yellow-50 text-yellow-600 group-hover:bg-yellow-600',
    sort_order: 2
  },
  {
    code: 'C',
    id_alias: 'cat_c',
    name_en: 'C - Metro Water / Drainage',
    name_ta: 'C - குடிநீர் / கழிவுநீர் மற்றும் வடிகால்',
    title_en: 'Metro Water / Drainage',
    title_ta: 'குடிநீர் / கழிவுநீர் மற்றும் வடிகால்',
    icon: 'Droplets',
    color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
    sort_order: 3
  },
  {
    code: 'D',
    id_alias: 'cat_d',
    name_en: 'D - Civil Works & General Issues',
    name_ta: 'D - குடிமைப் பணிகள் & பொதுப் பிரச்சனைகள்',
    title_en: 'Civil Works & General Issues',
    title_ta: 'குடிமைப் பணிகள் & பொதுப் பிரச்சனைகள்',
    icon: 'Building2',
    color: 'bg-slate-50 text-slate-600 group-hover:bg-slate-600',
    sort_order: 4
  },
  {
    code: 'E',
    id_alias: 'cat_e',
    name_en: 'E - Forest & Environment [Pallikaranai, RAMSAR]',
    name_ta: 'E - வனம் & சுற்றுச்சூழல் [பள்ளிக்கரணை, RAMSAR]',
    title_en: 'Forest & Environment [Pallikaranai, RAMSAR]',
    title_ta: 'வனம் & சுற்றுச்சூழல் [பள்ளிக்கரணை, RAMSAR]',
    icon: 'TreePine',
    color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600',
    sort_order: 5
  },
  {
    code: 'F',
    id_alias: 'cat_f',
    name_en: 'F - PATTA & Land Revenue',
    name_ta: 'F - பட்டா & நில வருவாய் சேவைகள்',
    title_en: 'PATTA & Land Revenue',
    title_ta: 'பட்டா & நில வருவாய் சேவைகள்',
    icon: 'FileText',
    color: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600',
    sort_order: 6
  },
  {
    code: 'G',
    id_alias: 'cat_g',
    name_en: 'G - Welfare Help & Donations',
    name_ta: 'G - நலத்திட்ட உதவி / நன்கொடைகள்',
    title_en: 'Welfare Help & Donations',
    title_ta: 'நலத்திட்ட உதவி / நன்கொடைகள்',
    icon: 'HeartHandshake',
    color: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600',
    sort_order: 7
  },
  {
    code: 'H',
    id_alias: 'cat_h',
    name_en: 'H - Storm Water Drainage',
    name_ta: 'H - மழைநீர் வடிகால் வசதிகள்',
    title_en: 'Storm Water Drainage',
    title_ta: 'மழைநீர் வடிகால் வசதிகள்',
    icon: 'CloudRain',
    color: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600',
    sort_order: 8
  }
];

export const getCategoryByCode = (code) => {
  return GRIEVANCE_CATEGORIES.find(c => c.code === code) || null;
};
