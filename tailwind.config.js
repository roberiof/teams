module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          700: "#00875F",
          500: "#00B37E"
        },
        red: {
          dark: "#AA2834",
          regular: "#F75A68"
        },
        base: {
          gray: {
            700: "#121214",
            600: "#202024",
            500: "#29292E",
            400: "#323238",
            300: "#7C7C8A",
            200: "#C4C4CC",
            100: "#E1E1E6"
          }
        }
      }
    }
  },
  plugins: []
};
