module.exports = {
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.vue',
    ],
    options: {
      whitelist: ['font-sans', 'bg-gray-900', 'text-white', 'antialiased'],
    }
  },
  theme: {
    extend: {
      width: {
        '96': '24rem',
      },
      height: {
        '80': '20rem'
      }
    },
  },
  variants: {},
  plugins: [],
}