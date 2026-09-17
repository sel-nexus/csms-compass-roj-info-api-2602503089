import "dotenv/config";
/** Loads safe runtime configuration with conservative development defaults. */
export interface RuntimeConfig { port: number; maxRequestBytes: number; apiKeys: string[]; allowedOrigins: string[]; compassBaseUrl: string; compassCredential: string; }
/** Parses required process settings without exposing them to clients. */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): RuntimeConfig {
  const port = Number(env.PORT ?? 8000); const maxRequestBytes = Number(env.MAX_REQUEST_BYTES ?? 10240);
  const apiKeys = (env.CLIENT_API_KEYS ?? "dev-operator-key").split(",").filter(Boolean);
  if (!Number.isInteger(port) || port <= 0 || !Number.isInteger(maxRequestBytes) || maxRequestBytes <= 0 || apiKeys.length === 0) throw new Error("Invalid runtime configuration");
  const compassBaseUrl = env.COMPASS_BASE_URL ?? "http://127.0.0.1:9000"; const compassCredential = env.COMPASS_CREDENTIAL ?? "dev-compass-credential";
  if (!/^https?:\/\//.test(compassBaseUrl) || !compassCredential) throw new Error("Invalid runtime configuration");
  return { port, maxRequestBytes, apiKeys, allowedOrigins: (env.CORS_ALLOWED_ORIGINS ?? "http://localhost:5173").split(","), compassBaseUrl, compassCredential };
}
