import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/persons/": {
        target: "https://phonebook-practice-backend.onrender.com/api/persons",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/persons/, ""),
      },
    },
  },
});
