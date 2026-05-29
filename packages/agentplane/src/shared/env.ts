import { execFile } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const DOTENV_LOADED_KEYS_ENV = "AGENTPLANE_DOTENV_LOADED_KEYS";
const execFileAsync = promisify(execFile);

export type DotEnvLoadResult = {
  root: string;
  path: string;
  loaded: boolean;
  loadedKeys: string[];
};

function parseDotEnv(text: string): Record<string, string> {
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

async function gitStdout(rootDir: string, args: string[]): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["-C", rootDir, ...args], {
      timeout: 2000,
      maxBuffer: 1024 * 1024,
    });
    return stdout;
  } catch {
    return null;
  }
}

async function gitStdoutRaw(args: string[]): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", args, {
      timeout: 2000,
      maxBuffer: 1024 * 1024,
    });
    return stdout;
  } catch {
    return null;
  }
}

function firstPorcelainWorktree(output: string | null, ignoredPaths: string[] = []): string | null {
  if (!output) return null;
  const ignored = new Set(ignoredPaths.map((entry) => path.resolve(entry)));
  for (const line of output.split(/\r?\n/u)) {
    if (!line.startsWith("worktree ")) continue;
    const rawWorktree = line.slice("worktree ".length).trim();
    if (!rawWorktree) continue;
    const worktree = path.resolve(rawWorktree);
    if (ignored.has(worktree)) continue;
    return worktree;
  }
  return null;
}

async function resolveDotEnvRootFromGit(
  rootDir: string,
  ignoredPaths: string[] = [],
): Promise<string | null> {
  return firstPorcelainWorktree(
    await gitStdout(rootDir, ["worktree", "list", "--porcelain"]),
    ignoredPaths,
  );
}

async function readGitFileDir(resolvedRoot: string, gitPath: string): Promise<string | null> {
  let gitFile = "";
  try {
    gitFile = await readFile(gitPath, "utf8");
  } catch {
    return null;
  }

  const match = /^gitdir:\s*(.+)\s*$/imu.exec(gitFile);
  if (!match) return null;
  return path.resolve(resolvedRoot, match[1]);
}

async function resolveCommonGitDir(gitDir: string): Promise<string> {
  try {
    const commonDirText = await readFile(path.join(gitDir, "commondir"), "utf8");
    const commonDir = commonDirText.trim();
    if (commonDir) return path.resolve(gitDir, commonDir);
  } catch {
    // Non-linked or synthetic worktrees may not have commondir.
  }
  return gitDir;
}

async function resolveCoreWorktree(commonGitDir: string): Promise<string | null> {
  const output = await gitStdoutRaw([
    "config",
    "--file",
    path.join(commonGitDir, "config"),
    "--get",
    "core.worktree",
  ]);
  const raw = output?.trim();
  if (!raw) return null;
  return path.resolve(commonGitDir, raw);
}

async function resolveWorktreeFromCommonGitDir(commonGitDir: string): Promise<string | null> {
  const basename = path.basename(commonGitDir);
  const parent = path.dirname(commonGitDir);
  const candidate =
    basename === ".git"
      ? parent
      : basename.endsWith(".git")
        ? path.join(parent, basename.slice(0, -".git".length))
        : null;
  if (!candidate) return null;

  try {
    const candidateStats = await stat(candidate);
    if (candidateStats.isDirectory()) return path.resolve(candidate);
  } catch {
    return null;
  }
  return null;
}

function resolveDotEnvRootFromGitDirLayout(gitDir: string): string | null {
  const worktreesMarker = `${path.sep}.git${path.sep}worktrees${path.sep}`;
  const markerIndex = gitDir.indexOf(worktreesMarker);
  if (markerIndex === -1) return null;

  return gitDir.slice(0, markerIndex);
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

  const gitDir = await readGitFileDir(resolvedRoot, gitPath);
  if (!gitDir) return resolvedRoot;
  const commonGitDir = await resolveCommonGitDir(gitDir);

  return (
    (await resolveCoreWorktree(commonGitDir)) ??
    (await resolveWorktreeFromCommonGitDir(commonGitDir)) ??
    (await resolveDotEnvRootFromGit(resolvedRoot, [commonGitDir])) ??
    resolveDotEnvRootFromGitDirLayout(gitDir) ??
    resolvedRoot
  );
}

export async function loadDotEnv(rootDir: string): Promise<DotEnvLoadResult> {
  const envRoot = await resolveDotEnvRoot(rootDir);
  const envPath = path.join(envRoot, ".env");
  let text = "";
  try {
    text = await readFile(envPath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return { root: envRoot, path: envPath, loaded: false, loadedKeys: [] };
    throw err;
  }
  const parsed = parseDotEnv(text);
  const loadedKeys: string[] = [];
  for (const [key, value] of Object.entries(parsed)) {
    if (process.env[key] !== undefined) continue;
    process.env[key] = value;
    recordDotEnvLoadedKey(key);
    loadedKeys.push(key);
  }
  return { root: envRoot, path: envPath, loaded: true, loadedKeys };
}
