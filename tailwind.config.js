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
                }
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(to right, #910905, #FBBF24)',
                'gradient-overlay': 'linear-gradient(to bottom, rgba(45, 7, 7, 0.9), rgba(63, 10, 10, 0.7))',
            },
            boxShadow: {
                'tvk-maroon': '0 10px 30px rgba(145, 9, 5, 0.2)',
                'tvk-maroon-hover': '0 15px 40px rgba(145, 9, 5, 0.3)',
                'soft': '0 10px 40px rgba(0, 0, 0, 0.04)',
                'soft-hover': '0 20px 60px rgba(0, 0, 0, 0.08)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
                heading: ['Poppins', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '1rem',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
