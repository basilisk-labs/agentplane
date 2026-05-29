import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { parse as parseYaml } from "yaml";

import { writeJsonStableIfChanged } from "../shared/write-if-changed.js";

import type { ContextWorkspaceMode } from "./ingest-task.js";

export type ContextIngestMode = "changed" | "all" | "sources";

export type ManifestSourceStatus =
  | "new"
  | "changed"
  | "unchanged"
  | "deleted"
  // Legacy lock files may still contain this status from older AgentPlane versions.
  | "private"
  | "unsupported"
  | "error";

export type ManifestEntry = {
  path: string;
  sha256: string;
  size_bytes: number;
  mtime: string;
  content_type: string;
  status: ManifestSourceStatus;
};

export type ManifestLock = {
  version: number;
  generated_at: string;
  workspace_hash: string;
  sources: ManifestEntry[];
  wiki_scaffold?: {
    starter_created_at: string;
  };
};

export type ContextIngestParsed = {
  sources: string[];
  mode: ContextIngestMode;
  dryRun: boolean;
  indexOnly: boolean;
};

export function defaultWorkspaceHash(root: string): string {
  return `sha256:${createHash("sha256").update(root).digest("hex").slice(0, 16)}`;
}

export function statusHistogram(rows: ManifestEntry[]): Record<ManifestSourceStatus, number> {
  const counts: Record<ManifestSourceStatus, number> = {
    new: 0,
    changed: 0,
    unchanged: 0,
    deleted: 0,
    private: 0,
    unsupported: 0,
    error: 0,
  };
  for (const row of rows) {
    counts[row.status] += 1;
  }
  return counts;
}

export function buildTaskIdHint(opts: { mode: ContextIngestMode; sources: string[] }): string {
  if (opts.mode === "sources" && opts.sources.length > 0) {
    return `${opts.mode}: ${opts.sources.join(", ")}`;
  }
  return opts.mode;
}

export function toPosix(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

export function toStatusLabel(status: ManifestSourceStatus): string {
  return `${status.toUpperCase()}${status === "error" ? " (skipped)" : ""}`;
}

export function contentTypeForPath(filePath: string): string {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".md") || lower.endsWith(".mdx")) return "text/markdown";
  if (lower.endsWith(".txt") || lower.endsWith(".rst")) return "text/plain";
  if (lower.endsWith(".json")) return "application/json";
  if (lower.endsWith(".yaml") || lower.endsWith(".yml")) return "text/yaml";
  if (/\.(ts|tsx|js|jsx|py|rs|go|sh|java|cpp|c|h|cs|rb|php|swift|kt|scala|yaml|yml)$/.test(lower)) {
    return "text/plain";
  }
  return "application/octet-stream";
}

export function isUnsupportedPath(filePath: string): boolean {
  const lower = filePath.toLowerCase();
  return (
    lower.includes(".git/") ||
    lower.includes("/service/") ||
    path.basename(lower).startsWith(".") ||
    lower.endsWith(".pdf") ||
    lower.endsWith(".docx") ||
    lower.endsWith(".png") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".jpeg") ||
    lower.endsWith(".zip") ||
    lower.endsWith(".tar")
  );
}

export function isServiceCandidate(filePath: string): boolean {
  const parts = toPosix(filePath).split("/");
  return parts.some((part) => part.startsWith(".")) || parts.includes("service");
}

export function ensureWithinRoot(root: string, candidate: string): boolean {
  const absRoot = path.resolve(root);
  const abs = path.resolve(candidate);
  return abs === absRoot || abs.startsWith(`${absRoot}${path.sep}`);
}

async function readJsonIfExists(filePath: string): Promise<unknown> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "ENOENT") return null;
    return null;
  }
}

export async function readContextWorkspaceMode(
  root: string,
): Promise<ContextWorkspaceMode | undefined> {
  const manifestPath = path.join(root, ".agentplane", "context", "agentplane.context.yaml");
  try {
    const manifestText = await readFile(manifestPath, "utf8");
    const parsed = parseYaml(manifestText) as unknown;
    if (!parsed || typeof parsed !== "object") return undefined;
    const workspace = (parsed as { workspace?: unknown }).workspace;
    if (!workspace || typeof workspace !== "object") return undefined;
    const mode = (workspace as { mode?: unknown }).mode;
    return typeof mode === "string" ? (mode as ContextWorkspaceMode) : undefined;
  } catch {
    return undefined;
  }
}

export async function readManifest(root: string): Promise<ManifestLock> {
  const lockPath = path.join(root, ".agentplane", "context", "manifest.lock.json");
  const raw = await readJsonIfExists(lockPath);
  if (!raw || typeof raw !== "object") {
    return {
      version: 1,
      generated_at: new Date(0).toISOString(),
      workspace_hash: defaultWorkspaceHash(root),
      sources: [],
    };
  }
  const lock = raw as Record<string, unknown>;
  if (typeof lock.version !== "number" || !Array.isArray(lock.sources)) {
    return {
      version: 1,
      generated_at: new Date(0).toISOString(),
      workspace_hash: defaultWorkspaceHash(root),
      sources: [],
    };
  }
  return {
    version: lock.version,
    generated_at:
      typeof lock.generated_at === "string" ? lock.generated_at : new Date(0).toISOString(),
    workspace_hash:
      typeof lock.workspace_hash === "string" ? lock.workspace_hash : defaultWorkspaceHash(root),
    wiki_scaffold:
      typeof (lock.wiki_scaffold as { starter_created_at?: unknown } | undefined)
        ?.starter_created_at === "string"
        ? {
            starter_created_at: (lock.wiki_scaffold as { starter_created_at: string })
              .starter_created_at,
          }
        : undefined,
    sources: lock.sources
      .map((rawSource) => {
        const source = rawSource as Record<string, unknown>;
        const sourcePath = typeof source.path === "string" ? source.path : "";
        if (!sourcePath) return null;
        return {
          path: sourcePath,
          sha256: typeof source.sha256 === "string" ? source.sha256 : "sha256:0",
          size_bytes:
            typeof source.size_bytes === "number" && Number.isFinite(source.size_bytes)
              ? source.size_bytes
              : 0,
          mtime: typeof source.mtime === "string" ? source.mtime : new Date(0).toISOString(),
          content_type:
            typeof source.content_type === "string"
              ? source.content_type
              : "application/octet-stream",
          status:
            typeof source.status === "string"
              ? (source.status as ManifestSourceStatus)
              : "unsupported",
        };
      })
      .filter((source): source is ManifestEntry => source !== null),
  };
}

export async function writeManifest(root: string, manifest: ManifestLock): Promise<void> {
  const lockPath = path.join(root, ".agentplane", "context", "manifest.lock.json");
  await writeJsonStableIfChanged(lockPath, {
    version: manifest.version,
    generated_at: new Date().toISOString(),
    workspace_hash: manifest.workspace_hash || defaultWorkspaceHash(root),
    ...(manifest.wiki_scaffold ? { wiki_scaffold: manifest.wiki_scaffold } : {}),
    sources: manifest.sources,
  });
}

export async function calculateSha256(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  return await new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on("data", (chunk: Buffer) => hash.update(chunk));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(`sha256:${hash.digest("hex")}`));
  });
}
