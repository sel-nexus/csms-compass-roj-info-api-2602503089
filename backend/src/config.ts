import "dotenv/config";
/** Loads safe runtime configuration with conservative development defaults. */
export interface RuntimeConfig { port: number; maxRequestBytes: number; apiKeys: string[]; allowedOrigins: string[]; compassBaseUrl: string; compassCredential: string; nodeEnv: "test" | "stage" | "prod"; }
/** Parses required process settings without exposing them to clients. */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): RuntimeConfig {
  const nodeEnv = env.NODE_ENV as RuntimeConfig["nodeEnv"];
  if (nodeEnv !== "test" && nodeEnv !== "stage" && nodeEnv !== "prod") throw new Error("Invalid runtime configuration");
  const port = Number(env.PORT ?? 8000); const maxRequestBytes = Number(env.MAX_REQUEST_BYTES ?? 10240);
  const apiKeys = (env.CLIENT_API_KEYS ?? "").split(",").filter(Boolean);
  const compassBaseUrl = env.COMPASS_BASE_URL ?? ""; const compassCredential = env.COMPASS_CREDENTIAL ?? "";
  const validCompassUrl = nodeEnv === "test" ? /^https?:\/\//.test(compassBaseUrl) : /^https:\/\//.test(compassBaseUrl);
  if (!Number.isInteger(port) || port <= 0 || !Number.isInteger(maxRequestBytes) || maxRequestBytes <= 0 || apiKeys.length === 0 || !validCompassUrl || !compassCredential) throw new Error("Invalid runtime configuration");
  return { port, maxRequestBytes, apiKeys, allowedOrigins: (env.CORS_ALLOWED_ORIGINS ?? "http://localhost:5173").split(","), compassBaseUrl, compassCredential, nodeEnv };
}
