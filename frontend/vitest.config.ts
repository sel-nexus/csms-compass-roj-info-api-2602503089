import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
/** Configures browser-like component tests for the Vite UI. */
export default defineConfig({ plugins: [react()], test: { environment: "jsdom", setupFiles: ["./test/setup.ts"] } });
