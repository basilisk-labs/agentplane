import { warnMessage } from "../output.js";
import {
  fetchLatestNpmVersion,
  readUpdateCheckCache,
  resolveUpdateCheckCachePath,
  shouldCheckNow,
  UPDATE_CHECK_SCHEMA_VERSION,
  UPDATE_CHECK_TIMEOUT_MS,
  UPDATE_CHECK_TTL_MS,
  writeUpdateCheckCache,
  type UpdateCheckCache,
} from "../update-check.js";
import { resolveAgentplaneHome } from "./error-guidance.js";

const UPDATE_CHECK_PACKAGE = "agentplane";
const UPDATE_CHECK_URL = `https://registry.npmjs.org/${UPDATE_CHECK_PACKAGE}/latest`;

function parseVersionParts(version: string): { main: number[]; prerelease: string | null } {
  const cleaned = version.trim().replace(/^v/i, "").split("+")[0] ?? "";
  const [mainRaw, prereleaseRaw] = cleaned.split("-", 2);
  const main = (mainRaw ?? "")
    .split(".")
    .filter((part) => part.length > 0)
    .map((part) => {
      const parsed = Number.parseInt(part, 10);
      return Number.isFinite(parsed) ? parsed : 0;
    });
  return { main, prerelease: prereleaseRaw ? prereleaseRaw.trim() : null };
}

function compareVersions(left: string, right: string): number {
  const a = parseVersionParts(left);
  const b = parseVersionParts(right);
  const length = Math.max(a.main.length, b.main.length);
  for (let i = 0; i < length; i++) {
    const partA = a.main[i] ?? 0;
    const partB = b.main[i] ?? 0;
    if (partA !== partB) return partA > partB ? 1 : -1;
  }
  if (a.prerelease === b.prerelease) return 0;
  if (a.prerelease === null) return 1;
  if (b.prerelease === null) return -1;
  return a.prerelease.localeCompare(b.prerelease);
}

function isTruthyEnv(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

export async function maybeWarnOnUpdate(opts: {
  currentVersion: string;
  skip: boolean;
  jsonErrors: boolean;
}): Promise<void> {
  if (opts.skip || opts.jsonErrors) return;
  if (isTruthyEnv(process.env.AGENTPLANE_NO_UPDATE_CHECK)) return;
  const now = new Date();
  const cachePath = resolveUpdateCheckCachePath(resolveAgentplaneHome());
  const cache = await readUpdateCheckCache(cachePath);
  if (cache && !shouldCheckNow(cache.checked_at, now, UPDATE_CHECK_TTL_MS)) {
    if (
      cache.status === "ok" &&
      cache.latest_version &&
      compareVersions(cache.latest_version, opts.currentVersion) > 0
    ) {
      const message = `Update available: ${UPDATE_CHECK_PACKAGE} ${opts.currentVersion} → ${cache.latest_version}. Run: npm i -g ${UPDATE_CHECK_PACKAGE}@latest`;
      process.stderr.write(`${warnMessage(message)}\n`);
    }
    return;
  }

  const result = await fetchLatestNpmVersion({
    url: UPDATE_CHECK_URL,
    timeoutMs: UPDATE_CHECK_TIMEOUT_MS,
    etag: cache?.etag ?? null,
  });

  const nextCache: UpdateCheckCache = {
    schema_version: UPDATE_CHECK_SCHEMA_VERSION,
    checked_at: now.toISOString(),
    latest_version: cache?.latest_version ?? null,
    etag: cache?.etag ?? null,
    status: "error",
  };

  if (result.status === "ok") {
    nextCache.status = "ok";
    nextCache.latest_version = result.latestVersion;
    nextCache.etag = result.etag;
  } else if (result.status === "not_modified") {
    nextCache.status = "not_modified";
    nextCache.etag = result.etag ?? nextCache.etag;
  }

  try {
    await writeUpdateCheckCache(cachePath, nextCache);
  } catch {
    // Best-effort cache: ignore write failures.
  }

  const latest = result.status === "ok" ? result.latestVersion : nextCache.latest_version;
  if (!latest || result.status === "error") return;
  if (compareVersions(latest, opts.currentVersion) <= 0) return;
  const message = `Update available: ${UPDATE_CHECK_PACKAGE} ${opts.currentVersion} → ${latest}. Run: npm i -g ${UPDATE_CHECK_PACKAGE}@latest`;
  process.stderr.write(`${warnMessage(message)}\n`);
}
