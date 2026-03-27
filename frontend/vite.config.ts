import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import flashCss from "flashcss-vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), flashCss(), babel({ presets: [reactCompilerPreset()] })],
});
