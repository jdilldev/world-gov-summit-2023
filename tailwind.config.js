/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ['Avenir'],
      dreamscape: ['Dreamscape'],
      agelast: ['Agelast'],
      equinox: ['Equinox'],
      nebula: ['Nebula'],
      'nebula-hollow': ['Nebula-Hollow'],
      stacker: ['Stacker'],
      progress: ['Progress'],
      axeon: ['Axeon'],
      exodar: ['Exodar'],
      varino: ['Varino']
    },
    extend: {
      backgroundImage:
      {
        'starry-mountain': "url('/public/starry-mountain-bg.jpg)"
      }
    },
    screens: {
      xs: '250px',
      sm: '300',
      'md': '750px',
      'lg': '1243',
    }
  },
  plugins: [],
}
