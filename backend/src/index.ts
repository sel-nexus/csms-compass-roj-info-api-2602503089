import { createApp } from "./app";
import { CompassAdapterImpl } from "./adapters/compass.adapter";
import { loadConfig } from "./config";
import { LookupServiceImpl } from "./services/lookup.service";
/** Starts the API with a real Compass adapter assembled from runtime configuration. */
const config = loadConfig();
const lookupService = new LookupServiceImpl(new CompassAdapterImpl(config.compassBaseUrl, config.compassCredential));
createApp({ config, lookupService }).listen(config.port, "0.0.0.0", () => console.log(`ROJ API listening on ${config.port}`));
