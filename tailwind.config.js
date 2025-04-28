/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          800: '#343C6A',
          500: '#868AA3',
          300: '#DFEAF2',
        },

        // Accent Colors
        accent: {
          red: '#FF4B4A',
          blue: '#2D60FF',
        },

        // Gray Scale
        gray: {
          600: '#888888',
          500: '#C3C3C3',
          400: '#DEDEDE',
          300: '#E8E9EF',
          200: '#F5F7FA',
          100: '#FAFBFC',
        },

        // Emotion Colors
        emotion: {
          happiness: '#FFCB24',
          sadness: '#2092F4',
          anger: '#FD3D3D',
          anxiety: '#5544FC',
          comfort: '#FC1B7E',
          satisfaction: '#16DBCC',
          exhaustion: '#686C80',
          anticipation: '#FF9243',
        },
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontWeight : {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700, 
      }
    },
  },
  plugins: [],
};
