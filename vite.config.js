import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Portfolio-2025/", // Assicurati che sia esattamente così
  build: {
    outDir: "dist",
  },
});
