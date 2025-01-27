import type { Config } from "tailwindcss";
// const { mauve, violet } = require("@radix-ui/colors");
import { mauve, blackP3A, indigo, gray, violet } from "@radix-ui/colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ...mauve,
        ...blackP3A,
        ...gray,
        ...violet,
        ...indigo,
      },
    },
  },
  plugins: [],
} satisfies Config;
