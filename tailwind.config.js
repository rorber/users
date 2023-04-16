module.exports = {
  content: ["./App.tsx", "./public/index.html", "./src/**/*.{ts,tsx}"],
  safelist: ["bg-brand", "border-brand", "text-white"],
  theme: {
    fontFamily: {
      display: ["Aeonik"],
      mono: ["Aeonik"],
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "rgb(0, 0, 76)",
        },
        red: {
          DEFAULT: "rgb(255, 218, 205)",
          darker: "rgb(255, 82, 107)",
        },
        yellow: {
          DEFAULT: "#FFFAEE",
        },
        white: "rgb(255, 255, 255)",
      },
      fontSize: {
        base: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
      maxWidth: {
        content: "1230px",
      },
    },
  },
};
