import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import {
  readUpdateCheckCache,
  shouldCheckNow,
  UPDATE_CHECK_SCHEMA_VERSION,
  fetchLatestNpmVersion,
  writeUpdateCheckCache,
  type UpdateCheckCache,
} from "./update-check.js";

describe("update-check cache", () => {
  it("writes and reads cache entries", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-update-check-"));
    const cachePath = path.join(root, "update-check.json");
    const cache: UpdateCheckCache = {
      schema_version: UPDATE_CHECK_SCHEMA_VERSION,
      checked_at: new Date().toISOString(),
      latest_version: "1.2.3",
      etag: '"abc"',
      status: "ok",
    };

    await writeUpdateCheckCache(cachePath, cache);
    const loaded = await readUpdateCheckCache(cachePath);
    expect(loaded).toEqual(cache);
  });

  it("returns null for invalid cache json", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-update-check-"));
    const cachePath = path.join(root, "update-check.json");
    await writeFile(cachePath, "{not valid json", "utf8");
    const loaded = await readUpdateCheckCache(cachePath);
    expect(loaded).toBeNull();
  });

  it("returns null for wrong schema version", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-update-check-"));
    const cachePath = path.join(root, "update-check.json");
    await writeFile(
      cachePath,
      JSON.stringify({ schema_version: 999, checked_at: new Date().toISOString(), status: "ok" }),
      "utf8",
    );
    const loaded = await readUpdateCheckCache(cachePath);
    expect(loaded).toBeNull();
  });
});

describe("update-check TTL", () => {
  it("requires a check when missing or invalid", () => {
    const now = new Date("2026-02-05T00:00:00.000Z");
    expect(shouldCheckNow(null, now, 1000)).toBe(true);
    expect(shouldCheckNow("not-a-date", now, 1000)).toBe(true);
  });

  it("respects ttl window", () => {
    const now = new Date("2026-02-05T00:00:00.000Z");
    const fresh = new Date(now.getTime() - 500).toISOString();
    const stale = new Date(now.getTime() - 1500).toISOString();
    expect(shouldCheckNow(fresh, now, 1000)).toBe(false);
    expect(shouldCheckNow(stale, now, 1000)).toBe(true);
  });
});

describe("update-check fetch", () => {
  it("returns ok with version and etag", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Map([["etag", '"abc"']]),
      json: () => Promise.resolve({ version: "1.2.3" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchLatestNpmVersion({
      url: "https://registry.npmjs.org/agentplane/latest",
      timeoutMs: 50,
      etag: null,
    });

    expect(result).toEqual({ status: "ok", latestVersion: "1.2.3", etag: '"abc"' });
    vi.unstubAllGlobals();
  });

  it("returns not_modified on 304", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 304,
      headers: new Map(),
      json: () => Promise.resolve({}),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchLatestNpmVersion({
      url: "https://registry.npmjs.org/agentplane/latest",
      timeoutMs: 50,
      etag: '"prev"',
    });

    expect(result).toEqual({ status: "not_modified", etag: '"prev"' });
    vi.unstubAllGlobals();
  });

  it("returns error on bad response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      headers: new Map(),
      json: () => Promise.resolve({}),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchLatestNpmVersion({
      url: "https://registry.npmjs.org/agentplane/latest",
      timeoutMs: 50,
      etag: null,
    });

    expect(result).toEqual({ status: "error" });
    vi.unstubAllGlobals();
  });
});
