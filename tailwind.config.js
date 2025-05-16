/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        gray: {
          100: '#f8f8f8',
          200: '#f3f3f3',
          300: '#e0e0e0',
          400: '#bcbcbc',
          500: '#939393',
          600: '#848484',
          700: '#747474',
          800: '#5a5a5a',
          900: '#454545',
          1000: '#323232',
          1100: '#262626',
        },
        'primary-color-btn': '#1A7D37',
        'primary-color': '#1A7D37',
        'primary-bg-color': '#e6f4ea',
        'c-danger': '#FF0000',
        'c-danger-bg': '#FFDCDC',
        'c-gray': '#DDDDDE',
        'c-boder': '#9C9C9C',
        'grey-btn': '#DDDDDE',
        'c-gray-bg': '#F5F5F5',
        'dark-100': '#606060',
        error: '#DA1E28',
      },
      keyframes: {
        growDown: {
          '0%': {
            transform: 'scaleY(0)',
          },
          '80%': {
            transform: 'scaleY(0.9)',
          },
          '100%': {
            transform: 'scaleY(1)',
          },
        },
      },
      animation: {
        growDown: 'growDown 200ms ease ',
      },
    },
    screens: {
      xs: '300px',
      sm: '431px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
  darkMode: 'class',
};
