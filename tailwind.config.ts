import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        animfadeAbove: "fadeAbove 800ms ease-in-out",
        animfadeBelow: "fadeBelow 800ms ease-in-out",
        animfadeLeftSide: "fadeLeftSide 800ms ease-in-out",
        animfadeRightSide: "fadeRightSide 800ms ease-in-out",
        animFullHeight: "fullHeight 800ms ease-in-out",
      },
      keyframes: {
        fadeAbove: {
          "100%": { transform: "translateY(0px)", opacity: "1" },
          "0%": {
            transform: "translateY(-15px)",
            opacity: "0",
          },
        },
        fadeBelow: {
          "100%": { transform: "translateY(0px)", opacity: "1" },
          "0%": {
            transform: "translateY(15px)",
            opacity: "0",
          },
        },
        fadeLeftSide: {
          "100%": { transform: "translateX(0px)", opacity: "1" },
          "0%": {
            transform: "translateX(-15px)",
            opacity: "0",
          },
        },
        fadeRightSide: {
          "100%": { transform: "translateX(0px)", opacity: "1" },
          "0%": {
            transform: "translateX(15px)",
            opacity: "0",
          },
        },
        fullHeight: {
          "100%": { height: "100%" },
          "0%": {
            height: "0px",
          },
        },
      },
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
      },
      colors: {
        primary: "#001220",
        secondary: "#F7DC2A",
        accent: "#DFDFDF",
      },
    },
  },
  plugins: [],
};
export default config;
