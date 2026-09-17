import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
/** Configures the Vite operator UI and local API proxy. */
export default defineConfig(({ mode }) => { const env = loadEnv(mode, ".", ""); return { plugins: [react()], server: { proxy: { "/api": { target: env.VITE_DEV_API_PROXY || "http://localhost:8000", changeOrigin: true } } } }; });
