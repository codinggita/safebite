/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#0D0F0E',
        },
        surface: {
          DEFAULT: '#f9f9f9',
          dark: '#1A1F1D',
        },
        primary: {
          DEFAULT: '#0F766E', // teal-700 / deep green
          dark: '#14B8A6', // teal-500
        },
        accent: {
          DEFAULT: '#F97316', // orange-500
          dark: '#FB923C', // orange-400
        },
        'safe-green': '#10B981', // emerald-500
        'warning-yellow': '#F59E0B', // amber-500
        'risk-orange': '#EF4444', // red-500
        'danger-red': '#DC2626', // red-600
        'health-blue': '#3B82F6', // blue-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 4px 30px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
