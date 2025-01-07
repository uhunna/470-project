import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8800", // URL of your backend server
        changeOrigin: true, // Ensures the origin of the host header matches the target
      },
    },
  },
});
