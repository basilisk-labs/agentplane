import { writeFile } from "node:fs/promises";

import { exitCodeForError } from "./exit-codes.js";
import { CliError } from "../shared/errors.js";

const DEFAULT_TIMEOUT_MS = 1500;

export async function fetchJson(url: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<unknown> {
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
  } finally {
    clearTimeout(timeout);
  }
}

export async function downloadToFile(
  url: string,
  destPath: string,
  timeoutMs = DEFAULT_TIMEOUT_MS,
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
    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(destPath, buffer);
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
