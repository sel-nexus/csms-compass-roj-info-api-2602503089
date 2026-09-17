import { Router, json } from "express";
import type { RuntimeConfig } from "../config";
import type { LookupService } from "../domain/contracts";
import { createRojController } from "../controllers/roj.controller";
import { authorizeApiKey, correlationGate, enforceRateLimit, mediaGate, validateLookup } from "../middleware/gates";
/** Creates the sole protected ROJ lookup route in required gate order. */
export function createRojRoute(config: RuntimeConfig, service: LookupService): Router { const router = Router(); router.post("/getROJInfo", correlationGate, mediaGate, json({ limit: config.maxRequestBytes }), authorizeApiKey(config), enforceRateLimit(config.apiKeys.length * 1000), validateLookup(service), createRojController(service)); return router; }
