module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fff7ed', // very light orange
          DEFAULT: '#f97316', // orange-500
          dark: '#ea580c', // orange-600
        },
        accent: {
          light: '#e0f2fe', // lighter blue for light theme
          DEFAULT: '#38bdf8', // sky-400
        },
        brand: {
          DEFAULT: '#f97316',
        },
        background: {
          light: '#fff',
          subtle: '#f8fafc', // very light gray
          card: '#f1f5f9', // light card background
        },
        text: {
          DEFAULT: '#1e293b', // slate-800
          subtle: '#64748b', // slate-500
        },
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
} 