import { readFileSync } from "node:fs";

let cachedVersion: string | null = null;

export function getVersion(): string {
  if (cachedVersion) return cachedVersion;
  try {
    const pkgUrl = new URL("../../package.json", import.meta.url);
    const raw = readFileSync(pkgUrl, "utf8");
    const parsed = JSON.parse(raw) as { version?: string };
    if (parsed.version) {
      cachedVersion = String(parsed.version).trim();
      if (cachedVersion) return cachedVersion;
    }
  } catch {
    // Fall through to default.
  }
  return "0.0.0";
}
