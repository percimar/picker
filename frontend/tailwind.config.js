/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
      boxShadow: {
        "purple-glow": "0 4px 10px rgba(255, 0, 182, 0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
