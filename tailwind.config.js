const defaultTheme = require('tailwindcss/defaultTheme');
//console.log(JSON.stringify(defaultTheme.fontSize.xl, null, ' '));

module.exports = {
  purge: {mode: 'all', content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}']},
  theme: {
    extend: {
      fontSize: {
        huge: '10rem',
        big: '8rem',
      },
      fontFamily: {
        sans2: ['Montserrat', ...defaultTheme.fontFamily.sans],
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        serif: ['Alegreya', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        neutral: {
          50: '#F7F7F7',
          100: '#E1E1E1',
          200: '#CFCFCF',
          300: '#B1B1B1',
          400: '#9E9E9E',
          500: '#7E7E7E',
          600: '#626262',
          700: '#515151',
          800: '#3B3B3B',
          900: '#222222',
        },
        primary: {
          50: '#FFFBEA',
          100: '#FFF3C4',
          200: '#FCE588',
          300: '#FADB5F',
          400: '#F7C948',
          500: '#F0B429',
          600: '#DE911D',
          700: '#CB6E17',
          800: '#B44D12',
          900: '#8D2B0B',
        },
      },
      height: {
        hero: `calc(100vh - 80px)`,
        header: '80px',
        px: '1px',
      },
      minHeight: {
        hero: '500px',
        header: '80px',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/ui')],
};
