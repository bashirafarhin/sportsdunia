/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Custom colors using CSS variables
        primary: {
          bg: 'var(--bg-primary)',
          text: 'var(--text-primary)',
        },
        secondary: {
          bg: 'var(--bg-secondary)',
          text: 'var(--text-secondary)',
        },
        custom: {
          border: 'var(--border-color)',
          accent: 'var(--accent-color)',
          card: 'var(--card-bg)',
          input: 'var(--input-bg)',
          hover: 'var(--hover-bg)',
        }
      },
      boxShadow: {
        'custom-sm': 'var(--shadow-sm)',
        'custom-md': 'var(--shadow-md)',
        'custom-lg': 'var(--shadow-lg)',
      }
    },
  },
  plugins: [],
}