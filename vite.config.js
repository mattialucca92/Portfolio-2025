import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Portfolio-2025/", // Deve corrispondere ESATTAMENTE al nome del repo
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
