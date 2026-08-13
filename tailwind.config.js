/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
          extend: {
                  colors: {
                            cream: "#F7F4EF",
                            sand: "#ECE4D6",
                            ink: "#1B1A17",
                            ocean: {
                                        DEFAULT: "#08899E",
                                        light: "#2AA7BC",
                                        dark: "#066373",
                            },
                            clay: {
                                        DEFAULT: "#F5AB2B",
                                        light: "#F7BC55",
                                        dark: "#D48F16",
                            },
                            gold: "#F5AB2B",
                            fog: "#6B6B62",
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
                            soft: "0 10px 40px -12px rgba(8, 137, 158, 0.18)",
                            lift: "0 24px 60px -18px rgba(8, 137, 158, 0.28)",
                  },
          },
    },
    plugins: [],
};
