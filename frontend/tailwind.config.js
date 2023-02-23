// /** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          base: "#1DA1F2",
          dark: "#2FC1F3",
          light: "#ADD8E6",
        },
        gray: {
          dark: "#657786",
          light: "AAB8C2",
          extraLight: "#E1E8ED",
          lightest: "#F5F8FA",
        },
        black: "#14171A",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
