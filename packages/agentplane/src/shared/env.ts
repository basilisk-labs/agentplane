import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const DOTENV_LOADED_KEYS_ENV = "AGENTPLANE_DOTENV_LOADED_KEYS";

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

function readDotEnvLoadedKeys(env: NodeJS.ProcessEnv = process.env): Set<string> {
  const raw = env[DOTENV_LOADED_KEYS_ENV]?.trim() ?? "";
  if (!raw) return new Set<string>();
  return new Set(
    raw
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
  );
}

function recordDotEnvLoadedKey(key: string, env: NodeJS.ProcessEnv = process.env): void {
  const keys = readDotEnvLoadedKeys(env);
  keys.add(key);
  env[DOTENV_LOADED_KEYS_ENV] = [...keys].toSorted().join(",");
}

export function isDotEnvLoadedKey(key: string, env: NodeJS.ProcessEnv = process.env): boolean {
  return readDotEnvLoadedKeys(env).has(key);
}

export async function resolveDotEnvRoot(rootDir: string): Promise<string> {
  const resolvedRoot = path.resolve(rootDir);
  const gitPath = path.join(resolvedRoot, ".git");
  let gitPathStats;
  try {
    gitPathStats = await stat(gitPath);
  } catch {
    return resolvedRoot;
  }

  if (gitPathStats.isDirectory()) return resolvedRoot;
  if (!gitPathStats.isFile()) return resolvedRoot;

  let gitFile = "";
  try {
    gitFile = await readFile(gitPath, "utf8");
  } catch {
    return resolvedRoot;
  }

  const match = /^gitdir:\s*(.+)\s*$/imu.exec(gitFile);
  if (!match) return resolvedRoot;
  const gitDir = path.resolve(resolvedRoot, match[1]);
  const worktreesMarker = `${path.sep}.git${path.sep}worktrees${path.sep}`;
  const markerIndex = gitDir.indexOf(worktreesMarker);
  if (markerIndex < 0) return resolvedRoot;

  return gitDir.slice(0, markerIndex);
}

export async function loadDotEnv(rootDir: string): Promise<void> {
  const envRoot = await resolveDotEnvRoot(rootDir);
  const envPath = path.join(envRoot, ".env");
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
    if (process.env[key] !== undefined) continue;
    process.env[key] = value;
    recordDotEnvLoadedKey(key);
  }
}
