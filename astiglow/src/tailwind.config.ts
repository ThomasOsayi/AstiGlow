import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds
        cream: {
          DEFAULT: '#FAFAF8',
          dark: '#F0EDE8',
        },
        // Text colors
        charcoal: {
          DEFAULT: '#2D2A26',
          light: '#6B6560',
        },
        // Accent - Rose Gold
        gold: {
          DEFAULT: '#C9A27C',
          light: 'rgba(201, 162, 124, 0.15)',
        },
        // Border color
        border: '#E8E6E1',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        // Custom sizes matching the design
        'display-xl': ['clamp(48px, 5vw, 72px)', { lineHeight: '1.1' }],
        'display-lg': ['clamp(40px, 4vw, 56px)', { lineHeight: '1.2' }],
        'display-md': ['42px', { lineHeight: '1.2' }],
        'display-sm': ['32px', { lineHeight: '1.3' }],
        'body-lg': ['16px', { lineHeight: '1.8' }],
        'body-md': ['15px', { lineHeight: '1.7' }],
        'body-sm': ['14px', { lineHeight: '1.6' }],
        'caption': ['13px', { lineHeight: '1.5' }],
        'label': ['12px', { lineHeight: '1.5', letterSpacing: '0.1em' }],
        'label-sm': ['11px', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },
      letterSpacing: {
        'caps': '0.08em',
        'caps-wide': '0.1em',
        'caps-wider': '0.15em',
        'caps-widest': '0.2em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'curve': '120px',
        'curve-sm': '80px',
        'curve-xs': '60px',
      },
      boxShadow: {
        'card': '0 20px 40px rgba(45, 42, 38, 0.08)',
        'card-hover': '0 20px 60px rgba(45, 42, 38, 0.1)',
        'float': '0 10px 30px rgba(45, 42, 38, 0.06)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;