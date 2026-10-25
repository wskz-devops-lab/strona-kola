/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: 'var(--color-void)',
        panel: 'var(--color-panel)',
        surface: 'var(--color-surface)',
        edge: 'var(--color-edge)',
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        'ink-muted': 'var(--color-ink-muted)',
        neon: 'var(--color-neon)',
        cyanic: 'var(--color-cyanic)',
        violet: 'var(--color-violet)',
        danger: 'var(--color-danger)',
        amber: 'var(--color-amber)',
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
          '0%, 100%': { boxShadow: '0 0 12px rgba(16,185,129,0.28)' },
          '50%': { boxShadow: '0 0 24px rgba(16,185,129,0.52)' },
        },
      },
      boxShadow: {
        'neon-sm': 'var(--shadow-neon-sm)',
        'neon-md': 'var(--shadow-neon-md)',
        'cyan-md': 'var(--shadow-cyan-md)',
        'violet-md': 'var(--shadow-violet-md)',
      },
    },
  },
  plugins: [],
};
