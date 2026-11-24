import type { Config } from "tailwindcss";

/**
 * All colours come from CSS variables defined in src/app/globals.css.
 * Change the palette there (one place) and the whole template, including
 * the Three.js globe, follows.
 */
const withVar = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: withVar("bg"),
        fg: withVar("fg"),
        muted: withVar("muted"),
        card: withVar("card"),
        line: withVar("line"),
        accent: withVar("accent"),
        "accent-ink": withVar("accent-ink"),
        hot: withVar("hot"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        out: "cubic-bezier(.16,1,.3,1)",
      },
    },
  },
  plugins: [],
};
export default config;
