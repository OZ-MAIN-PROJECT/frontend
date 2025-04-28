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
        'primary-800': '#343C6A',
        'primary-500': '#868AA3',
        'primary-300': '#DFEAF2',

        // Accent Colors
        'accent-red': '#FF4B4A',
        'accent-blue': '#2D60FF',

        // Gray Scale
        'gray-600': '#888888',
        'gray-500': '#C3C3C3',
        'gray-400': '#DEDEDE',
        'gray-300': '#E8E9EF',
        'gray-200': '#F5F7FA',
        'gray-100': '#FAFBFC',

        // Emotion Colors
        'emotion-happiness': '#FFCB24',
        'emotion-sadness': '#2092F4',
        'emotion-anger': '#FD3D3D',
        'emotion-anxiety': '#5544FC',
        'emotion-comfort': '#FC1B7E',
        'emotion-satisfaction': '#16DBCC',
        'emotion-exhaustion': '#686C80',
        'emotion-anticipation': '#FF9243',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
