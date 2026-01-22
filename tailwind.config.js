/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                shadow: {
                    deep: '#050505',
                    blood: '#1a0f0f',
                    dark: '#0d0808',
                    medium: '#1f1414',
                },
                gold: {
                    light: '#F4D03F',
                    DEFAULT: '#D4AF37',
                    dark: '#AA8C2C',
                    ember: '#C9A227',
                },
                parchment: {
                    light: '#F5E6D3',
                    DEFAULT: '#E8D5B7',
                    dark: '#D4C4A8',
                },
            },
            fontFamily: {
                'cinzel': ['"Cinzel Decorative"', 'serif'],
                'spectral': ['Spectral', 'serif'],
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'ember': 'ember 8s ease-in-out infinite',
                'shimmer': 'shimmer 3s linear infinite',
                'rune-glow': 'rune-glow 1.5s ease-in-out infinite',
                'pan-slow': 'pan-slow 20s ease-in-out infinite alternate',
                'particle-float': 'particle-float 10s ease-in-out infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': {
                        boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
                        filter: 'brightness(1)',
                    },
                    '50%': {
                        boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)',
                        filter: 'brightness(1.1)',
                    },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'ember': {
                    '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'rune-glow': {
                    '0%, 100%': {
                        textShadow: '0 0 10px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)',
                    },
                    '50%': {
                        textShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.5)',
                    },
                },
                'pan-slow': {
                    '0%': { transform: 'scale(1.1) translate(0%, 0%)' },
                    '100%': { transform: 'scale(1.2) translate(-3%, -3%)' },
                },
                'particle-float': {
                    '0%, 100%': {
                        transform: 'translateY(0) translateX(0) rotate(0deg)',
                        opacity: '0.3',
                    },
                    '25%': {
                        transform: 'translateY(-20px) translateX(10px) rotate(90deg)',
                        opacity: '0.6',
                    },
                    '50%': {
                        transform: 'translateY(-10px) translateX(-5px) rotate(180deg)',
                        opacity: '0.4',
                    },
                    '75%': {
                        transform: 'translateY(-30px) translateX(15px) rotate(270deg)',
                        opacity: '0.7',
                    },
                },
            },
            backgroundImage: {
                'radial-gold': 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                'gradient-dark': 'linear-gradient(180deg, #050505 0%, #1a0f0f 50%, #050505 100%)',
            },
        },
    },
    plugins: [],
}
