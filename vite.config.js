import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
    proxy: process.env.NODE_ENV === "development" ? {
      "/api": {
        target: "https://gift-4-you.onrender.com/api",  // The backend URL on Render
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    } : {},
  },
});
