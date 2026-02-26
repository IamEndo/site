import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#73A052",
          50: "#f4f8f0",
          100: "#e6efe0",
          200: "#ccdfc1",
          300: "#a8c995",
          400: "#8cb86f",
          500: "#73A052",
          600: "#5a8040",
          700: "#476534",
          800: "#3b512d",
          900: "#334428",
          950: "#192413",
        },
        "accent-dark": {
          DEFAULT: "#8C5FAD",
          50: "#f9f6fb",
          100: "#f2ecf6",
          200: "#e6dbef",
          300: "#d3bfe2",
          400: "#b898cf",
          500: "#8C5FAD",
          600: "#7a4d9a",
          700: "#673f80",
          800: "#56366a",
          900: "#482e58",
          950: "#2d1839",
        },
      },
    },
  },
  plugins: [],
};

export default config;
