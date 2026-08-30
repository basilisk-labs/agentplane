import fs from "node:fs";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";

function pushUnique(entries: string[], value: string): void {
  const trimmed = value.trim();
  if (!trimmed || entries.includes(trimmed)) return;
  entries.push(trimmed);
}

export function withPreferredRuntimePath(
  baseEnv: NodeJS.ProcessEnv = process.env,
  overrides: NodeJS.ProcessEnv = {},
): NodeJS.ProcessEnv {
  const env = { ...baseEnv, ...overrides };
  const entries: string[] = [];
  // Explicit profile PATH remains first. Inherited PATH keeps its original order.
  for (const entry of String(overrides.PATH ?? "").split(path.delimiter))
    pushUnique(entries, entry);
  for (const [key, suffix] of [
    ["NVM_BIN", ""],
    ["VOLTA_HOME", "bin"],
    ["BUN_INSTALL", "bin"],
  ]) {
    const root = env[key!]?.trim();
    if (root && path.isAbsolute(root)) pushUnique(entries, path.join(root, suffix!));
  }
  for (const entry of String(baseEnv.PATH ?? "").split(path.delimiter)) pushUnique(entries, entry);
  const home = env.HOME ?? os.homedir();
  if (home && path.isAbsolute(home)) {
    const nvmNode = readLatestNvmNodeBin(home);
    if (nvmNode) pushUnique(entries, path.dirname(nvmNode));
    pushUnique(entries, path.join(home, ".bun", "bin"));
  }
  pushUnique(entries, path.dirname(process.execPath));
  env.PATH = entries.join(path.delimiter);
  return env;
}

function isExecutableFile(filePath: string): boolean {
  try {
    if (!path.isAbsolute(filePath) || !fs.statSync(filePath).isFile()) return false;
    fs.accessSync(filePath, process.platform === "win32" ? fs.constants.F_OK : fs.constants.X_OK);
    return true;
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

  const versions = entries
    .filter((entry) => /^v\d+\.\d+\.\d+$/.test(entry))
    .toSorted((a, b) => {
      const left = a.slice(1).split(".").map(Number);
      const right = b.slice(1).split(".").map(Number);
      for (let i = 0; i < 3; i++) {
        const difference = right[i]! - left[i]!;
        if (difference) return difference;
      }
      return 0;
    });
  for (const version of versions) {
    const candidate = path.join(versionsDir, version, "bin", "node");
    if (isExecutableFile(candidate)) return candidate;
  }
  return null;
}

export function resolvePreferredNodeExecutable(baseEnv: NodeJS.ProcessEnv = process.env): string {
  const homeDir = String(baseEnv.HOME ?? os.homedir() ?? "").trim();
  const candidates = [
    baseEnv.NVM_BIN ? path.join(baseEnv.NVM_BIN, "node") : null,
    baseEnv.VOLTA_HOME ? path.join(baseEnv.VOLTA_HOME, "bin", "node") : null,
    resolveLocalExecutable("node", baseEnv),
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

export function resolveLocalExecutable(command: string, env: NodeJS.ProcessEnv): string | null {
  if (path.isAbsolute(command)) return isExecutableFile(command) ? command : null;
  if (command.includes("/") || command.includes("\\")) return null;
  const extensions =
    process.platform === "win32"
      ? ["", ...(env.PATHEXT ?? ".EXE;.CMD;.BAT;.COM").split(";")]
      : [""];
  for (const directory of (env.PATH ?? "").split(path.delimiter)) {
    if (!path.isAbsolute(directory)) continue;
    for (const extension of extensions) {
      const candidate = path.join(directory, command + extension);
      if (isExecutableFile(candidate)) return candidate;
    }
  }
  return null;
}

export type LocalRuntimeEvidence = {
  kind: "local_runtime_resolution";
  status: "resolved" | "unavailable";
  executable_digest: string | null;
  environment_digest: string;
};

function digest(value: string | Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

export function localRuntimeEvidence(
  command: string,
  env: NodeJS.ProcessEnv,
  cwd?: string,
): LocalRuntimeEvidence {
  const candidate =
    cwd && (command.includes("/") || command.includes("\\")) ? path.resolve(cwd, command) : command;
  const executable = resolveLocalExecutable(candidate, env);
  let executableDigest: string | null = null;
  if (executable) {
    try {
      executableDigest = digest(fs.readFileSync(executable));
    } catch {
      /* Unreadable identity remains unqualified. */
    }
  }
  return {
    kind: "local_runtime_resolution",
    status: executableDigest ? "resolved" : "unavailable",
    executable_digest: executableDigest,
    // Only runtime-selection inputs are bound. Secret environment values are never retained.
    environment_digest: digest(
      JSON.stringify([
        env.PATH ?? "",
        env.HOME ?? "",
        env.NVM_BIN ?? "",
        env.VOLTA_HOME ?? "",
        env.BUN_INSTALL ?? "",
        env.PATHEXT ?? "",
      ]),
    ),
  };
}

export function isRuntimeInfrastructureError(error: unknown): boolean {
  const code = (error as NodeJS.ErrnoException | null)?.code;
  return code === "ENOENT" || code === "EACCES" || code === "ENOEXEC";
}
