/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#283441",
        darkBlack: "#000",
        altBlack: "#130e3a",
        dayTimeDarkPurple: "#5d5989",
        dayTimeLightPurple: "#E5DEE2",
        nightTimeDarkPurple: "#313050",
        nightTimeLightPurple: "#615878",
        searchFormInputDayTimePurple: "#766e99",
        searchFormInputNightTimePurple: "#5A5973",
        purple: "#313050",
        darkPurple: "#1D1D30",
        mediumPurple: "#5A5973",
        blue: "#355773",
        darkBlue: "#05335B",
        darkestBlue: "#000026",
        navyBlue: "#14588B",
        skyBlue: "#3081A7",
        lightSkyBlue: "#D8EEEE",
        faded: "rgba(0, 0, 0, 0.6)",
        transparentPurple: "rgba(29, 29, 48, 0.3)",
        current: "currentColor",
        white: "#fff",
      },
      fontFamily: {
        notoSerif: ["Noto Serif", "serif"],
        notoSans: ["Noto Sans", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
        karla: ["Libre Franklin", "sans-serif"],
      },

      backgroundImage: {
        clouds: "url('/src/assets/images/cloudy.jpeg')",
        sunnyDay: "url('/src/assets/images/sunny-day.jpeg')",
        staryNight: "url('/src/assets/images/stary-night.jpeg')",
        purpleClouds: "url('/src/assets/images/purple-clouds.jpeg')",
        lightPurpleClouds: "url('/src/assets/images/light-purple-clouds.jpeg')",
      },
    },
  },
  plugins: [],
};
