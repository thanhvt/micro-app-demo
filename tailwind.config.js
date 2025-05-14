/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color-btn': '#1A7D37',
        'primary-color': '#1A7D37',
        'primary-bg-color': '#e6f4ea',
      },
    },
  },
  plugins: [],
};
