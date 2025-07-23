/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#2DD4BF", // teal-400
          500: "#14B8A6", // teal-500
          600: "#0D9488", // teal-600
        },
        success: "#22C55E", // green-500
        warning: "#F59E0B", // amber-500
        error: "#EF4444", // red-500
        info: "#3B82F6", // blue-500
        purple: "#A855F7", // purple-500
                jade: {
          50:  '#f2fcf9',
          100: '#d9f7ef',
          200: '#adf0dc',
          300: '#81e9c8',
          400: '#4ddfb1',
          500: '#19d798',
          600: '#17c78a',
          700: '#129b6e',
          800: '#0e7b57',
          900: '#0a593c',
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Montserrat",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.05)",
        elevated: "0 4px 12px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        card: "12px",
        button: "8px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}