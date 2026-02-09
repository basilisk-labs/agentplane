import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CliError } from "../shared/errors.js";
import { downloadToFile, fetchJson } from "./http.js";

describe("cli/http", () => {
  const fetchMock = vi.fn();
  const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

  beforeEach(() => {
    fetchMock.mockReset();
    setTimeoutSpy.mockClear();
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetchJson returns parsed JSON for ok responses", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: vi.fn(() => ({ ok: true })),
    });

    await expect(fetchJson("https://example.test")).resolves.toEqual({ ok: true });
  });

  it("fetchJson throws a CliError when response is not ok", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Boom",
      json: vi.fn(() => ({ ok: false })),
    });

    await expect(fetchJson("https://example.test")).rejects.toEqual(
      expect.objectContaining({
        code: "E_NETWORK",
        message: "Failed to fetch https://example.test (500 Boom)",
      }),
    );
  });

  it("fetchJson wraps unexpected errors in a CliError", async () => {
    fetchMock.mockRejectedValue(new Error("nope"));

    await expect(fetchJson("https://example.test")).rejects.toBeInstanceOf(CliError);
  });

  it("downloadToFile writes response bytes to disk", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-http-test-"));
    const dest = path.join(tempDir, "download.bin");
    const data = new TextEncoder().encode("payload").buffer;

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      arrayBuffer: vi.fn(() => data),
    });

    await downloadToFile("https://example.test", dest);

    const contents = await readFile(dest, "utf8");
    expect(contents).toBe("payload");

    await rm(tempDir, { recursive: true, force: true });
  });

  it("downloadToFile uses the provided timeoutMs", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-http-timeout-test-"));
    const dest = path.join(tempDir, "download.bin");

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      arrayBuffer: vi.fn(() => new ArrayBuffer(0)),
    });

    await downloadToFile("https://example.test", dest, 12_345);

    // Note: setTimeout is also called by other tests; only assert that a call exists with this value.
    expect(setTimeoutSpy.mock.calls.some((c) => c[1] === 12_345)).toBe(true);

    await rm(tempDir, { recursive: true, force: true });
  });

  it("downloadToFile throws a CliError when response is not ok", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Missing",
      arrayBuffer: vi.fn(() => new ArrayBuffer(0)),
    });

    await expect(downloadToFile("https://example.test", "./out")).rejects.toEqual(
      expect.objectContaining({
        code: "E_NETWORK",
        message: "Failed to download https://example.test (404 Missing)",
      }),
    );
  });

  it("downloadToFile wraps unexpected errors in a CliError", async () => {
    fetchMock.mockRejectedValue(new Error("nope"));

    await expect(downloadToFile("https://example.test", "./out")).rejects.toBeInstanceOf(CliError);
  });
});
