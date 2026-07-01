import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0D12",
        surface: "#12161D",
        surface2: "#171C25",
        border: "#232A36",
        signal: {
          DEFAULT: "#4C8DFF",
          soft: "#7FACFF",
          dim: "#1E3A66",
        },
        insight: {
          DEFAULT: "#F5A623",
          soft: "#FBC97A",
        },
        text: {
          DEFAULT: "#E8ECF3",
          muted: "#8B94A6",
          faint: "#5B6472",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        flow: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        flow: "flow 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
