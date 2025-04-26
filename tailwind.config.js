
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'black1': '#1e1e1e',
        'black2': '#282828',
        'yellow': '#f6cb4a',
        'blue': '#275edd',
        'offwhite': '#f5f4f3',
        'red': '#d74e3d',
        'darkblue': '#22347e',
      },
      fontFamily: {
        merriweather: ['Merriweather Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
};
