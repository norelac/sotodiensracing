/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0D2453',
          red: '#EA4335',
          canvas: '#F7F9FC',
          muted: '#767676',
          border: '#EBEBEB',
          blue: '#3B82F6',
          lightBlue: '#DCE7F5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        cursive: ['MonteCarlo', 'cursive'],
      },
    },
  },
  plugins: [],
};
