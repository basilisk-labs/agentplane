import type { Dirent, Stats } from "node:fs";
import { lstat, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export const TEMP_ROOT_CLEANUP_OPTIONS = {
  force: true,
  maxRetries: 5,
  recursive: true,
  retryDelay: 100,
} as const;

type TempRootRemover = (root: string, options: typeof TEMP_ROOT_CLEANUP_OPTIONS) => Promise<void>;

export const VITEST_TEMP_ROOT_PREFIX = "agentplane-vitest-run-";
export const VITEST_TEMP_ROOT_MARKER = ".agentplane-vitest-temp-root.json";
export const VITEST_TEMP_ROOT_STALE_MS = 24 * 60 * 60 * 1000;
const VITEST_TEMP_ROOT_RECOVERY_BATCH_SIZE = 16;

interface VitestTempRootMarker {
  schema_version: 1;
  root_name: string;
  owner_pid: number;
  created_at: string;
}

interface RecoverStaleVitestTempRootsOptions {
  nowMs?: number;
  staleAfterMs?: number;
  isProcessAlive?: (pid: number) => boolean;
}

interface InstallVitestTempRootOptions {
  parent?: string;
  recoverStale?: boolean;
}

type ProcessWithVitestRecovery = NodeJS.Process & {
  __agentplaneVitestTempRootRecovery?: Promise<void>;
};

export async function removeTempRoot(root: string, remover: TempRootRemover = rm): Promise<void> {
  await remover(root, TEMP_ROOT_CLEANUP_OPTIONS);
}

function parseVitestTempRootMarker(value: unknown): VitestTempRootMarker | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const marker = value as Record<string, unknown>;
  if (
    marker.schema_version !== 1 ||
    typeof marker.root_name !== "string" ||
    !marker.root_name.startsWith(VITEST_TEMP_ROOT_PREFIX) ||
    typeof marker.owner_pid !== "number" ||
    !Number.isSafeInteger(marker.owner_pid) ||
    marker.owner_pid <= 0 ||
    typeof marker.created_at !== "string" ||
    !Number.isFinite(Date.parse(marker.created_at))
  ) {
    return null;
  }
  return marker as unknown as VitestTempRootMarker;
}

function processIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code !== "ESRCH";
  }
}

export async function recoverStaleVitestTempRoots(
  parent: string,
  options: RecoverStaleVitestTempRootsOptions = {},
): Promise<void> {
  const nowMs = options.nowMs ?? Date.now();
  const staleAfterMs = options.staleAfterMs ?? VITEST_TEMP_ROOT_STALE_MS;
  const isProcessAlive = options.isProcessAlive ?? processIsAlive;
  let entries: Dirent[];
  try {
    entries = await readdir(parent, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
    throw error;
  }

  for (let index = 0; index < entries.length; index += VITEST_TEMP_ROOT_RECOVERY_BATCH_SIZE) {
    await Promise.all(
      entries.slice(index, index + VITEST_TEMP_ROOT_RECOVERY_BATCH_SIZE).map(async (entry) => {
        if (!entry.name.startsWith(VITEST_TEMP_ROOT_PREFIX) || entry.isSymbolicLink()) return;
        const root = path.join(parent, entry.name);
        let rootStat: Stats;
        let marker: VitestTempRootMarker | null;
        try {
          rootStat = await lstat(root);
          if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) return;
          marker = parseVitestTempRootMarker(
            JSON.parse(await readFile(path.join(root, VITEST_TEMP_ROOT_MARKER), "utf8")),
          );
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
          if (error instanceof SyntaxError) return;
          throw error;
        }
        if (marker?.root_name !== entry.name || isProcessAlive(marker.owner_pid)) return;
        const createdAtMs = Date.parse(marker.created_at);
        if (nowMs - createdAtMs < staleAfterMs || nowMs - rootStat.mtimeMs < staleAfterMs) return;
        await removeTempRoot(root);
      }),
    );
  }
}

export async function createOwnedVitestTempRoot(
  parent: string,
  createdAt = new Date(),
): Promise<string> {
  const root = await mkdtemp(path.join(parent, VITEST_TEMP_ROOT_PREFIX));
  try {
    const marker: VitestTempRootMarker = {
      schema_version: 1,
      root_name: path.basename(root),
      owner_pid: process.pid,
      created_at: createdAt.toISOString(),
    };
    await writeFile(path.join(root, VITEST_TEMP_ROOT_MARKER), `${JSON.stringify(marker)}\n`, {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });
  } catch (error) {
    await removeTempRoot(root);
    throw error;
  }
  return root;
}

function restoreEnv(name: "TMPDIR" | "TMP" | "TEMP", value: string | undefined): void {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

export async function installOwnedVitestTempRoot(
  options: InstallVitestTempRootOptions = {},
): Promise<() => Promise<void>> {
  const parent = options.parent ?? os.tmpdir();
  if (options.recoverStale !== false) {
    const processWithRecovery = process as ProcessWithVitestRecovery;
    processWithRecovery.__agentplaneVitestTempRootRecovery ??= recoverStaleVitestTempRoots(parent);
    await processWithRecovery.__agentplaneVitestTempRootRecovery;
  }

  const original = {
    TMPDIR: process.env.TMPDIR,
    TMP: process.env.TMP,
    TEMP: process.env.TEMP,
  };
  const root = await createOwnedVitestTempRoot(parent);
  process.env.TMPDIR = root;
  process.env.TMP = root;
  process.env.TEMP = root;

  let cleaned = false;
  return async () => {
    if (cleaned) return;
    restoreEnv("TMPDIR", original.TMPDIR);
    restoreEnv("TMP", original.TMP);
    restoreEnv("TEMP", original.TEMP);
    await removeTempRoot(root);
    cleaned = true;
  };
}
