import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export const UPDATE_CHECK_SCHEMA_VERSION = 1 as const;
export const UPDATE_CHECK_TTL_MS = 24 * 60 * 60 * 1000;

export type UpdateCheckStatus = "ok" | "error" | "not_modified";

export type UpdateCheckCache = {
  schema_version: typeof UPDATE_CHECK_SCHEMA_VERSION;
  checked_at: string;
  latest_version: string | null;
  etag: string | null;
  status: UpdateCheckStatus;
};

type RawCache = Partial<Record<keyof UpdateCheckCache, unknown>>;

export function resolveUpdateCheckCachePath(agentplaneHome: string): string {
  return path.join(agentplaneHome, "cache", "update-check.json");
}

export function shouldCheckNow(
  checkedAt: string | null | undefined,
  now: Date,
  ttlMs: number,
): boolean {
  if (!checkedAt) return true;
  const timestamp = Date.parse(checkedAt);
  if (!Number.isFinite(timestamp)) return true;
  return now.getTime() - timestamp >= ttlMs;
}

export async function readUpdateCheckCache(filePath: string): Promise<UpdateCheckCache | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as RawCache;
    return coerceCache(parsed);
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    return null;
  }
}

export async function writeUpdateCheckCache(
  filePath: string,
  cache: UpdateCheckCache,
): Promise<void> {
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });
  const tmpName = `.update-check.${process.pid}.${randomBytes(6).toString("hex")}.tmp`;
  const tmpPath = path.join(dir, tmpName);
  const payload = JSON.stringify(cache, null, 2);
  await writeFile(tmpPath, payload, "utf8");
  await rename(tmpPath, filePath);
}

function coerceCache(raw: RawCache): UpdateCheckCache | null {
  if (raw.schema_version !== UPDATE_CHECK_SCHEMA_VERSION) return null;
  const checkedAt = typeof raw.checked_at === "string" ? raw.checked_at : null;
  if (!checkedAt) return null;
  const status = raw.status;
  if (status !== "ok" && status !== "error" && status !== "not_modified") return null;
  const latestVersion = typeof raw.latest_version === "string" ? raw.latest_version : null;
  const etag = typeof raw.etag === "string" ? raw.etag : null;
  return {
    schema_version: UPDATE_CHECK_SCHEMA_VERSION,
    checked_at: checkedAt,
    latest_version: latestVersion,
    etag,
    status,
  };
}
