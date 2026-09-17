import cors from "cors";
import express from "express";
import type { RuntimeConfig } from "./config";
import type { LookupService } from "./domain/contracts";
import { createRojRoute } from "./routes/roj.route";
/** Bundles injectable application dependencies for testable HTTP construction. */
export interface AppDependencies { config: RuntimeConfig; lookupService: LookupService; }
/** Creates the API process with health, security headers, and the one lookup route. */
export function createApp(deps: AppDependencies): express.Express { const app = express(); app.use(cors({ origin: deps.config.allowedOrigins })); app.use((_req, res, next) => { res.setHeader("X-Content-Type-Options", "nosniff"); res.setHeader("Cache-Control", "no-store"); next(); }); app.get("/api/health", (_req, res) => res.status(200).json({ status: "ok" })); app.use("/api/csms", createRojRoute(deps.config, deps.lookupService)); app.use((_req, res) => res.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found.", retryable: false } })); return app; }
