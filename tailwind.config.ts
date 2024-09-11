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
        background: "var(--background)",
        foreground: "var(--foreground)",

        mainHeaderInLight: "#2F3645",
        mainPageInLight: '#eee',
        mainCardInLight: '#FFF',
        mainInputInLight: '#E6E6E6',
        
        mainHeaderInDark: '#0e141b',
        mainPageInDark: '#12181F',
        mainCardInDark: '#171D24',
        mainInputInDark: '#10161D',

        mainButtonHover: '#E6E6E6',
        mainActiveButton: '#508C9B',

        mainPurple: '#6366F1',
        mainPurpleHover: '#4F46E5'
      },
      fontFamily: {
        rubik: ["rubik"],
        lalezar: ["lalezar"],
        amiri: ["amiri"],
        geist: ["geist"],
        handjet: ["handjet"],
        marhey: ["marhey"],
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },   // Start fully transparent
          '50%': { opacity: '1' },  // Midway fully visible
          '100%': { opacity: '0' }, // End fully transparent
        },
      },
      animation: {
        fade: 'fade 1s ease-in-out forwards', // 1-second duration and run forwards only once
      },
    },
  },
  plugins: [],
};
export default config;
