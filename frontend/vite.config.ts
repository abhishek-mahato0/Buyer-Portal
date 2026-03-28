import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import flashCss from "flashcss-vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    flashCss({
      preDefinedClasses: ["border-red"],
      breakpoints: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
    }),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});
