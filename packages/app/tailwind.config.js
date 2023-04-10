/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        defaultBlack: '#1f1f1f',
      },
      backgroundColor: {
        loginGradient: 'linear-gradient(to left, #CFDEF3, #E0EAFC);',
      },
      keyframes: {
        growingWidth: {
          from: {
            width: '0%',
          },
          to: {
            width: '100%',
          },
        },
      },
      animation: {
        growingWidth: 'growingWidth .25s linear',
      },
    },
  },
  plugins: [],
};

// background: #E0EAFC;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to left, #CFDEF3, #E0EAFC);  /* Chrome 10-25, Safari 5.1-6 */
// background:  linear-gradient(to left, #CFDEF3, #E0EAFC);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
