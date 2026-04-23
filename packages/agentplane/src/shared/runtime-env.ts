import fs from "node:fs";
import os from "node:os";
import path from "node:path";

function pushUnique(entries: string[], value: string): void {
  const trimmed = value.trim();
  if (!trimmed || entries.includes(trimmed)) return;
  entries.push(trimmed);
}

export function withPreferredRuntimePath(
  baseEnv: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...baseEnv };
  const pathEntries = String(baseEnv.PATH ?? "")
    .split(path.delimiter)
    .map((entry) => entry.trim())
    .filter(Boolean);

  const preferredEntries: string[] = [];
  pushUnique(preferredEntries, path.dirname(resolvePreferredNodeExecutable(baseEnv)));

  const bunInstallDir = String(baseEnv.BUN_INSTALL ?? "").trim();
  if (bunInstallDir) {
    pushUnique(preferredEntries, path.join(bunInstallDir, "bin"));
  }

  const homeDir = String(baseEnv.HOME ?? os.homedir() ?? "").trim();
  if (homeDir) {
    pushUnique(preferredEntries, path.join(homeDir, ".bun", "bin"));
  }

  for (const entry of pathEntries) {
    pushUnique(preferredEntries, entry);
  }

  env.PATH = preferredEntries.join(path.delimiter);
  return env;
}

function isExecutableFile(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function readLatestNvmNodeBin(homeDir: string): string | null {
  const versionsDir = path.join(homeDir, ".nvm", "versions", "node");
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(versionsDir);
  } catch {
    return null;
  }

  const latest = entries
    .map((entry) => entry.trim())
    .filter(Boolean)
    .toSorted()
    .at(-1);
  if (!latest) return null;

  const candidate = path.join(versionsDir, latest, "bin", "node");
  return isExecutableFile(candidate) ? candidate : null;
}

export function resolvePreferredNodeExecutable(baseEnv: NodeJS.ProcessEnv = process.env): string {
  const homeDir = String(baseEnv.HOME ?? os.homedir() ?? "").trim();
  const candidates = [
    path.join(String(baseEnv.NVM_BIN ?? "").trim(), "node"),
    path.join(String(baseEnv.VOLTA_HOME ?? "").trim(), "bin", "node"),
    homeDir ? readLatestNvmNodeBin(homeDir) : null,
    process.execPath,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim() && isExecutableFile(candidate)) {
      return candidate;
    }
  }
  return process.execPath;
}
