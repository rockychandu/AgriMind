/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          deep: '#166534',     // Deep agricultural green
          fresh: '#22C55E',    // Fresh green
          leaf: '#84CC16',     // Leaf green
          yellow: '#FACC15',   // Warm yellow
          brown: '#92400E',    // Earth brown
          cream: '#F7F8F2',    // Cream background
          card: '#FFFFFF',     // Pure white card
          dark: '#0F291E',     // Deep charcoal green text
          light: '#ECFDF5',    // Light green wash
          accent: '#059669',   // Emerald green accent
          amber: '#D97706',    // Warning amber
          sky: '#0284C7',      // Atmospheric sky blue
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Noto Serif"', 'serif'],
      },
      backgroundImage: {
        'farm-hero': "linear-gradient(to right, rgba(15, 41, 30, 0.88), rgba(22, 101, 52, 0.7)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop')",
        'field-pattern': "radial-gradient(#22C55E 0.75px, transparent 0.75px)",
      },
      boxShadow: {
        'agri-card': '0 10px 30px -10px rgba(22, 101, 52, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'agri-hover': '0 20px 40px -15px rgba(22, 101, 52, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.05)',
        'glow-green': '0 0 25px rgba(34, 197, 94, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
