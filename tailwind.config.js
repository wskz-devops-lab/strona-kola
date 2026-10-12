/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#090a0f',
        panel: '#11131a',
        edge: '#1f2330',
        neon: '#10b981',
        cyanic: '#06b6d4',
        violet: '#8b5cf6',
        danger: '#ef4444',
        amber: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink: 'blink 1.1s step-end infinite',
        scanline: 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 2.4s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(16,185,129,0.35)' },
          '50%': { boxShadow: '0 0 28px rgba(16,185,129,0.65)' },
        },
      },
      boxShadow: {
        'neon-sm': '0 0 10px rgba(16,185,129,0.35)',
        'neon-md': '0 0 24px rgba(16,185,129,0.45)',
        'cyan-md': '0 0 24px rgba(6,182,212,0.4)',
        'violet-md': '0 0 24px rgba(139,92,246,0.4)',
      },
    },
  },
  plugins: [],
};
