import type { Config } from "tailwindcss";

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
      },
      backgroundColor: {
        "content": "#FFFFFF",
        "article": "#FFFFFF",
        "icon": "#FD4E4E",
        "btn": "#FD4E4E"
      },
      rotate: {
        'y-0': '0deg',
        'y-180': '180deg',
      }
    },
  },
  plugins: [],
  corePlugins: {
    transform: true,
  }
} satisfies Config;
