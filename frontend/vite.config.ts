import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/picker",
  plugins: [react(), checker({ typescript: { buildMode: true } })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
