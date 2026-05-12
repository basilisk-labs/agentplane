import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CliError } from "../shared/errors.js";
import { downloadToFile, fetchJson, fetchText } from "./http.js";

describe("cli/http", () => {
  const fetchMock = vi.fn();
  const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
  let originalFetch: typeof fetch | undefined;

  beforeEach(() => {
    fetchMock.mockReset();
    setTimeoutSpy.mockClear();
    originalFetch = globalThis.fetch;
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("fetchJson returns parsed JSON for ok responses", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      json: vi.fn(() => ({ ok: true })),
    });

    await expect(fetchJson("https://example.test")).resolves.toEqual({ ok: true });
    expect(setTimeoutSpy.mock.calls.some((c) => c[1] === 5000)).toBe(true);
  });

  it("fetchJson retries transient fetch failures", async () => {
    fetchMock.mockRejectedValueOnce(new Error("temporary network failure")).mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      json: vi.fn(() => ({ ok: true })),
    });

    await expect(fetchJson("https://example.test")).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
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
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("fetchText retries transient fetch failures", async () => {
    fetchMock.mockRejectedValueOnce(new Error("temporary network failure")).mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      text: vi.fn(() => "payload"),
    });

    await expect(fetchText("https://example.test")).resolves.toBe("payload");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("downloadToFile writes response bytes to disk", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-http-test-"));
    const dest = path.join(tempDir, "download.bin");
    const payload = new TextEncoder().encode("payload");
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(payload);
        controller.close();
      },
    });

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      body: stream,
      arrayBuffer: vi.fn(() => payload.buffer),
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
      body: new ReadableStream<Uint8Array>({
        start(controller) {
          controller.close();
        },
      }),
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
      body: null,
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
