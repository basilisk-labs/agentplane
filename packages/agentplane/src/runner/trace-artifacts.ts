import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { gunzip, gzip } from "node:zlib";
import { atomicWriteFile } from "@agentplaneorg/core/fs";

import type { RunnerResultStatus, RunnerTracePolicy } from "./types.js";

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);
const TRACE_REDACTION_TOKEN = "[REDACTED]";

export type FinalizedTraceArtifact = {
  artifact_path: string | null;
  archive_path: string | null;
};

function shouldRemoveRawTrace(opts: {
  retention: RunnerTracePolicy["retention"];
  run_status: RunnerResultStatus;
}): boolean {
  if (opts.retention === "remove_always") return true;
  if (opts.retention === "remove_on_success" && opts.run_status === "success") return true;
  return false;
}

export function compressedTraceArtifactPath(filePath: string): string {
  return `${filePath}.gz`;
}

export function redactTraceText(text: string, patterns: string[] | undefined): string {
  let redacted = text;
  for (const pattern of patterns ?? []) {
    const needle = pattern.trim();
    if (!needle) continue;
    redacted = redacted.split(needle).join(TRACE_REDACTION_TOKEN);
  }
  return redacted;
}

export async function finalizeTraceArtifact(opts: {
  file_path: string;
  policy: RunnerTracePolicy;
  run_status: RunnerResultStatus;
}): Promise<FinalizedTraceArtifact> {
  let rawContent: Buffer;
  try {
    rawContent = await readFile(opts.file_path);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") {
      return { artifact_path: null, archive_path: null };
    }
    throw err;
  }

  let archivePath: string | null = null;
  if (opts.policy.compression === "gzip") {
    archivePath = compressedTraceArtifactPath(opts.file_path);
    await mkdir(path.dirname(archivePath), { recursive: true });
    await atomicWriteFile(archivePath, await gzipAsync(rawContent));
  }

  if (shouldRemoveRawTrace({ retention: opts.policy.retention, run_status: opts.run_status })) {
    await rm(opts.file_path, { force: true });
    return {
      artifact_path: archivePath,
      archive_path: null,
    };
  }

  return {
    artifact_path: opts.file_path,
    archive_path: archivePath,
  };
}

export async function readTraceArtifactText(filePath: string): Promise<string> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code !== "ENOENT") throw err;
  }

  const archivePath = compressedTraceArtifactPath(filePath);
  try {
    const compressed = await readFile(archivePath);
    const decompressed = await gunzipAsync(compressed);
    return decompressed.toString("utf8");
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") throw err;
    throw err;
  }
}
