/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'pink': {
            50: '#fdf4f5',
            100: '#fce7eb',
            200: '#f9d0d9',
            300: '#f5a8b8',
            400: '#ef7692',
            500: '#e34d6f',
            600: '#d0315e',
            700: '#b0234d',
            800: '#931f46',
            900: '#7e1e41',
          },
          'brown': {
            50: '#f7f4f2',
            100: '#ede6e0',
            200: '#dccdc0',
            300: '#c6ac98',
            400: '#b08b71',
            500: '#9f7456',
            600: '#92654a',
            700: '#79533f',
            800: '#644438',
            900: '#533a31',
          },
          'cream': '#FFF8F3',
          'dark-brown': '#3E2723',
        },
        fontFamily: {
          'playfair': ['Playfair Display', 'serif'],
          'cormorant': ['Cormorant Garamond', 'serif'],
          'poppins': ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };