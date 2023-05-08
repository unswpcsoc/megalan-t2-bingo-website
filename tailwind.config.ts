import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { "sans": "sans-serif"  }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
