module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}',
    "./shared/components/*.{js,ts,jsx,tsx}",
    "./shared/utils/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        backgroundMain: '#F5F7FA96',
        logoSecond: '#9FB3C8',
        logoMain: '#102A43',
        linkMain: '#334E68',
        linkHover: '#627D98',
        bannerBackground: '#616E7C'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
