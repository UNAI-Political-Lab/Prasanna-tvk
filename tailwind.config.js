/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                tvk: {
                    red: '#910905',
                    yellow: '#FBBF24',
                    darkRed: '#5A0604',
                    accentYellow: '#FCD34D',
                    dark: '#1A1A1A',
                    lightBg: '#FFFFFF',
                    primary: '#A50000',
                    secondary: '#C61F1F',
                    gold: '#D89C00',
                    lightGold: '#F4D06F',
                    'admin-bg': '#0F172A',
                    'admin-surface': '#1E293B',
                    'admin-accent': '#3B82F6',
                }
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(to right, #910905, #FBBF24)',
                'gradient-overlay': 'linear-gradient(to bottom, rgba(45, 7, 7, 0.9), rgba(63, 10, 10, 0.7))',
                'hero-red-gradient': 'linear-gradient(135deg, #A50000, #C61F1F)',
                'hero-gold-gradient': 'linear-gradient(135deg, #D89C00, #F4D06F)',
            },
            boxShadow: {
                'tvk-maroon': '0 10px 30px rgba(145, 9, 5, 0.2)',
                'tvk-maroon-hover': '0 15px 40px rgba(145, 9, 5, 0.3)',
                'soft': '0 10px 40px rgba(0, 0, 0, 0.04)',
                'soft-hover': '0 20px 60px rgba(0, 0, 0, 0.08)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'hero-card': '0 8px 32px rgba(165, 0, 0, 0.15)',
                'hero-float': '0 20px 60px rgba(0, 0, 0, 0.12)',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
                heading: ['Poppins', 'sans-serif'],
                tamil: ['"Noto Sans Tamil"', 'Inter', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '1rem',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'floatSlow 8s ease-in-out infinite',
                'float-delayed': 'floatDelayed 7s ease-in-out infinite',
                'flag-wave': 'flagWave 4s ease-in-out infinite',
                'glow-pulse': 'glowPulse 4s ease-in-out infinite',
                'particle-drift': 'particleDrift 12s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                floatSlow: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-12px) rotate(1deg)' },
                },
                floatDelayed: {
                    '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
                    '50%': { transform: 'translateY(-8px) rotate(2deg)' },
                },
                flagWave: {
                    '0%, 100%': { transform: 'rotate(-3deg) scale(1)' },
                    '50%': { transform: 'rotate(2deg) scale(1.02)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.7' },
                },
                particleDrift: {
                    '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
                    '10%': { opacity: '0.6' },
                    '90%': { opacity: '0.6' },
                    '100%': { transform: 'translateY(-400px) translateX(40px)', opacity: '0' },
                },
            }
        },
    },
    plugins: [],
}
