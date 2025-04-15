/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Untuk proyek React/Vite
    "./components/**/*.{js,ts,jsx,tsx}", // Jika ada folder komponen terpisah
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#f9f3ef',
          600: '#8B4513',
          700: '#6f3510',
          800: '#5a2c0d',
        },
      },
    },
  }
  
};
