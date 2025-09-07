import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.VITE_PUBLIC_PATH || "/", // usa "/" in locale
  plugins: [react()],
});
