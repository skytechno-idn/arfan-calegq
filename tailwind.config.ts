import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
const konstaConfig = require("konsta/config");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/partials/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],


  plugins: [
    nextui({
    
  
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              foreground: "#fff",
              DEFAULT: "#990000",
            },
          },
        },
        dark: {
          colors: {
            background: "#0c0c0e",
            foreground: "#d2d3d4",
            primary: {
              DEFAULT: "#00ff6f",
              foreground: "#000",
            },
          },
        },
      },
    }),
  ],
};
module.exports = konstaConfig({
  ...config,
});

