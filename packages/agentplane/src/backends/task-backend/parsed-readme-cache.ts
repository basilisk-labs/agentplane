import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { parseTaskReadme } from "@agentplaneorg/core/tasks";

import { isRecord } from "../../shared/guards.js";
import { resolveTaskIndexPath } from "../task-index.js";

type ParsedTaskReadme = ReturnType<typeof parseTaskReadme>;

/**
 * Task READMEs with an embedded Task Kernel record can carry megabytes of YAML
 * frontmatter. YAML parsing dominates read commands such as `task active`, while
 * the parsed value is plain JSON data (verified lossless for every README in the
 * framework repository). Large READMEs therefore keep a rebuildable JSON copy of
 * the parse result in the local cache directory.
 *
 * Safety properties:
 * - the README is still read by the caller through the contained stable reader;
 * - an entry is used only when its SHA-256 equals the digest of the exact text
 *   just read, so an edited README never resolves to a stale parse;
 * - schema validation still runs on the returned frontmatter in the caller;
 * - one entry per README path bounds the cache size by the number of Tasks;
 * - every cache failure falls back to a normal parse.
 */
export const PARSED_README_CACHE_MIN_CHARS = 64 * 1024;
const CACHE_SCHEMA_VERSION = 1;
const CACHE_DIR_NAME = "parsed-readmes-v1";

type CacheEntry = {
  schema_version: typeof CACHE_SCHEMA_VERSION;
  digest: string;
  frontmatter: Record<string, unknown>;
  body: string;
};

export function parsedReadmeCacheDir(tasksDir: string): string {
  return path.join(path.dirname(resolveTaskIndexPath(tasksDir)), CACHE_DIR_NAME);
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function cacheEntryPath(tasksDir: string, readmePath: string): string {
  const relative = path.relative(tasksDir, readmePath).split(path.sep).join("/");
  return path.join(parsedReadmeCacheDir(tasksDir), `${sha256(relative).slice(0, 40)}.json`);
}

function usableEntry(value: unknown, digest: string, text: string): value is CacheEntry {
  return (
    isRecord(value) &&
    value.schema_version === CACHE_SCHEMA_VERSION &&
    value.digest === digest &&
    isRecord(value.frontmatter) &&
    typeof value.body === "string" &&
    text.endsWith(value.body)
  );
}

async function writeEntry(file: string, entry: CacheEntry): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const temporary = `${file}.tmp-${randomUUID()}`;
  try {
    await writeFile(temporary, JSON.stringify(entry), {
      encoding: "utf8",
      mode: 0o600,
      flag: "wx",
    });
    await rename(temporary, file);
  } finally {
    await rm(temporary, { force: true });
  }
}

function cacheDisabled(): boolean {
  return process.env.AGENTPLANE_README_PARSE_CACHE === "0";
}

/** Parse a Task README, reusing a digest-matched JSON parse result for large files. */
export async function parseTaskReadmeCached(opts: {
  tasksDir: string;
  readmePath: string;
  text: string;
}): Promise<ParsedTaskReadme> {
  const { tasksDir, readmePath, text } = opts;
  if (text.length < PARSED_README_CACHE_MIN_CHARS || cacheDisabled()) {
    return parseTaskReadme(text);
  }
  const digest = sha256(text);
  const file = cacheEntryPath(tasksDir, readmePath);
  const cached: unknown = await readFile(file, "utf8")
    .then((raw) => JSON.parse(raw) as unknown)
    .catch(() => null);
  if (usableEntry(cached, digest, text)) {
    return { frontmatter: cached.frontmatter, body: cached.body };
  }
  const parsed = parseTaskReadme(text);
  if (isRecord(parsed.frontmatter)) {
    await writeEntry(file, {
      schema_version: CACHE_SCHEMA_VERSION,
      digest,
      frontmatter: parsed.frontmatter,
      body: parsed.body,
    }).catch(() => {
      // Best-effort cache; the parse result above is authoritative.
    });
  }
  return parsed;
}
