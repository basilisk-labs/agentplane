import { createWriteStream } from "node:fs";
import { writeFile } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

import { exitCodeForError } from "./exit-codes.js";
import { CliError } from "../shared/errors.js";

const DEFAULT_FETCH_TIMEOUT_MS = 5000;
const DEFAULT_DOWNLOAD_TIMEOUT_MS = 30_000;
const FETCH_ATTEMPTS = 2;
const FETCH_RETRY_BACKOFF_MS = 100;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      headers: { "User-Agent": "agentplane" },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchWithRetry(url: string, timeoutMs: number): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt += 1) {
    try {
      return await fetchWithTimeout(url, timeoutMs);
    } catch (err) {
      lastError = err;
      if (attempt < FETCH_ATTEMPTS) {
        await delay(FETCH_RETRY_BACKOFF_MS * attempt);
      }
    }
  }
  throw lastError;
}

export async function fetchJson(
  url: string,
  timeoutMs = DEFAULT_FETCH_TIMEOUT_MS,
): Promise<unknown> {
  try {
    const res = await fetchWithRetry(url, timeoutMs);
    if (!res.ok) {
      throw new CliError({
        exitCode: exitCodeForError("E_NETWORK"),
        code: "E_NETWORK",
        message: `Failed to fetch ${url} (${res.status} ${res.statusText})`,
      });
    }
    return await res.json();
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw new CliError({
      exitCode: exitCodeForError("E_NETWORK"),
      code: "E_NETWORK",
      message: `Failed to fetch ${url}`,
    });
  }
}

export async function fetchText(
  url: string,
  timeoutMs = DEFAULT_FETCH_TIMEOUT_MS,
): Promise<string> {
  try {
    const res = await fetchWithRetry(url, timeoutMs);
    if (!res.ok) {
      throw new CliError({
        exitCode: exitCodeForError("E_NETWORK"),
        code: "E_NETWORK",
        message: `Failed to fetch ${url} (${res.status} ${res.statusText})`,
      });
    }
    return await res.text();
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw new CliError({
      exitCode: exitCodeForError("E_NETWORK"),
      code: "E_NETWORK",
      message: `Failed to fetch ${url}`,
    });
  }
}

export async function downloadToFile(
  url: string,
  destPath: string,
  timeoutMs = DEFAULT_DOWNLOAD_TIMEOUT_MS,
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "agentplane" },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new CliError({
        exitCode: exitCodeForError("E_NETWORK"),
        code: "E_NETWORK",
        message: `Failed to download ${url} (${res.status} ${res.statusText})`,
      });
    }
    // Prefer streaming to disk to avoid buffering large downloads in memory.
    // Keep an arrayBuffer fallback for environments/mocks without a body stream.
    if (res.body) {
      const readable = Readable.fromWeb(res.body as unknown as ReadableStream<Uint8Array>);
      await pipeline(readable, createWriteStream(destPath));
    } else {
      const buffer = Buffer.from(await res.arrayBuffer());
      await writeFile(destPath, buffer);
    }
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw new CliError({
      exitCode: exitCodeForError("E_NETWORK"),
      code: "E_NETWORK",
      message: `Failed to download ${url}`,
    });
  } finally {
    clearTimeout(timeout);
  }
}
