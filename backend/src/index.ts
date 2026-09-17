import { createApp } from "./app";
import { loadConfig } from "./config";
import type { LookupService } from "./domain/contracts";
/** Provides a conservative startup service until the Compass adapter is wired. */
const unavailableService: LookupService = { async execute() { return { kind: "dependency_failure", category: "unreachable" } as const; } };
const config = loadConfig();
createApp({ config, lookupService: unavailableService }).listen(config.port, "0.0.0.0", () => console.log(`ROJ API listening on ${config.port}`));
