// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // or for Next.js: "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1200px",
      },
    },
  },
  plugins: [],
};
