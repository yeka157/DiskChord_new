/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary: '#1B65A7',
        secondary : '#040615',
        third : '#3182CE',
        secondaryHover : '#F2F4F5',
        neutral : '#FFFFFF',
        telegram : '#0088cc',
        facebook : '#4267b2',
        bglight : '#F8F9FA',
        bgInput : '#EDF2F7'
      },
      fontFamily: {
        quicksand : ['Quicksand', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
