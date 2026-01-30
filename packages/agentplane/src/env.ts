import { readFile } from "node:fs/promises";
import path from "node:path";

export function parseDotEnv(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  const lines = text.split(/\r?\n/u);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      const quote = value[0];
      value = value.slice(1, -1);
      if (quote === '"') {
        value = value
          .replaceAll(String.raw`\n`, "\n")
          .replaceAll(String.raw`\r`, "\r")
          .replaceAll(String.raw`\t`, "\t")
          .replaceAll(String.raw`\"`, '"')
          .replaceAll(String.raw`\\`, "\\");
      }
    }
    if (key) out[key] = value;
  }
  return out;
}

export async function loadDotEnv(rootDir: string): Promise<void> {
  const envPath = path.join(rootDir, ".env");
  let text = "";
  try {
    text = await readFile(envPath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return;
    throw err;
  }
  const parsed = parseDotEnv(text);
  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] ??= value;
  }
}
