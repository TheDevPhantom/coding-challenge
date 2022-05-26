module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      colors: {
        primary: '#367FFF',
        indent: '#DCDCDC',
        modal: '#367FFF30',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'translate(-50px); opacity: 0;' },
          '100%': { transform: 'translate(0px); opacity: 1;' },
        },
        show: {
          '0%': { transform: 'translate(-75px); opacity: 0;' },
          '100%': { transform: 'translate(0px); opacity: 1;' },
        },
      },
      animation: {
        enter: 'enter 0.3s ease-in-out',
        show: 'show 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
