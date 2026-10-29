/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Breakpoints — TDD Appendix C
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Toplin brand — PRD §2 / TDD Appendix A
        primary: {
          DEFAULT: '#E31E24',
          hover: '#C41A1F',
        },
        black: '#111111',
        white: '#FFFFFF',
        concrete: {
          DEFAULT: '#888888',
          light: '#F4F4F4',
          dark: '#333333',
        },
        border: {
          DEFAULT: '#E5E5E5',
        },
        // Functional colours — TDD Appendix A
        whatsapp: '#25D366',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        // Wired to next/font CSS variables in the root layout (Phase 2)
        heading: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        body: ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: '#E5E5E5',
      },
      borderRadius: {
        // Structural, industrial corners — Design Brief §5.1
        btn: '6px',
        card: '8px',
      },
      lineHeight: {
        body: '1.6',
      },
      boxShadow: {
        // Shadows reserved for hover states and modals — Design Brief §7
        card: '0 10px 30px -12px rgba(17, 17, 17, 0.18)',
        header: '0 4px 20px -8px rgba(17, 17, 17, 0.35)',
        modal: '0 24px 60px -20px rgba(17, 17, 17, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 400ms ease-out both',
        'fade-in': 'fade-in 400ms ease-out both',
        'slide-in-right': 'slide-in-right 300ms ease-out both',
        'scale-in': 'scale-in 300ms ease-out both',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
};
