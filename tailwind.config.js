/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- PTN brand palette (edit these to match Webflow exactly) ----
        cream: "#F7F4EF", // off-white brand background
        sand: "#ECE4D6", // warm section tint
        ink: "#1B1A17", // warm near-black text
        ocean: {
          DEFAULT: "#0E4B46", // deep teal — primary brand
          light: "#14615A",
          dark: "#093430",
        },
        clay: {
          DEFAULT: "#CC6B3E", // warm terracotta accent
          light: "#DA8256",
          dark: "#A9522C",
        },
        gold: "#C8A24C", // muted brass highlight
        fog: "#6B6B62", // muted body text
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(14, 75, 70, 0.18)",
        lift: "0 24px 60px -18px rgba(14, 75, 70, 0.28)",
      },
    },
  },
  plugins: [],
};
