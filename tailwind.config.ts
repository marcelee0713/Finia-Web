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
        animfadeAbove: "fadeAbove 1.5s ease-in-out",
        animfadeBelow: "fadeBelow 1.5s ease-in-out",
        animfadeLeftSide: "fadeLeftSide 1.5s ease-in-out",
        animfadeRightSide: "fadeRightSide 1.5s ease-in-out",
        animFullHeight: "fullHeight 1.5s ease-in-out",
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
      colors: {
        primary: "#001220",
        secondary: "#F7DC2A",
        accent: "#DFDFDF",
        borderColor: "rgba(247, 220, 42, 0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
