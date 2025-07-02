module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        lightBlue: "#4DB5F0",
        blue: "#4979D1",
        white: "#fefefe",
        gray: "#C9C5C5",
        darkGray: "#5D5D5F",
        dark: "#14183E",
        red: "red",
        deluxBLue: "#2776FD",
      },

      screens: {
        // Custom breakpoint at 1000px
        custom_mobile: "1095px",
        // Or if you want to redefine the 'md' breakpoint
      },
      backgroundImage: {
        "top-form": "url('../public/assets/icons/top_form.svg')",
      },
    },
    fontFamily: {
      Pretendard: ["Pretendard"],
      poppins: ["Poppins"],
      volkhov: ["Volkhov"],
    },
    fontSize: {
      xs: ["10px"],
      sm: ["14px"],
      xl: ["20px"],
      "2xl": ["40px"],
      "3xl": ["60px"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
