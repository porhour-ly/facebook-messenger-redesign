import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        messenger: {
          blue: "#0084FF",
          lightBlue: "#E7F3FF",
          gray: "#F0F2F5",
          darkGray: "#65676B",
          border: "#E4E6EB",
        },
      },
      animation: {
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.25s ease-out forwards",
        "bubble-in": "bubbleIn 0.25s ease-out",
        "list-in": "listIn 0.25s ease-out forwards",
        "banner-dismiss": "bannerDismiss 0.3s ease-in forwards",
        "slide-out-left": "slideOutLeft 0.3s ease-in forwards",
        "swipe-hint": "swipeHint 1.5s ease-in-out 2",
        "slide-down": "slideDown 0.3s ease-out",
        "check-pop": "checkPop 0.4s ease-out",
        "hint-label": "hintLabel 1.8s ease-out forwards",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bubbleIn: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        listIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bannerDismiss: {
          "0%": { maxHeight: "200px", opacity: "1", marginBottom: "0px" },
          "100%": { maxHeight: "0px", opacity: "0", marginBottom: "0px", padding: "0px" },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(0)", opacity: "1", maxHeight: "80px" },
          "100%": { transform: "translateX(-100%)", opacity: "0", maxHeight: "0px" },
        },
        swipeHint: {
          "0%": { transform: "translateX(0)" },
          "30%": { transform: "translateX(-60px)" },
          "60%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        checkPop: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        hintLabel: {
          "0%": { opacity: "0" },
          "10%": { opacity: "1" },
          "65%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
