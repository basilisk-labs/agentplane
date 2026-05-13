/* eslint-disable @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-unused-vars, unicorn/no-await-expression-member */
import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import type { TaskNewParsed } from "../task/new.js";
import { runTaskNewParsed } from "../task/new.js";
import { runTaskRun } from "../task/run.command.js";
import { cmdContextReindex } from "./reindex.js";

type ContextIngestMode = "changed" | "all" | "sources";

type ManifestSourceStatus =
  | "new"
  | "changed"
  | "unchanged"
  | "deleted"
  | "private"
  | "unsupported"
  | "error";

type ManifestEntry = {
  path: string;
  sha256: string;
  size_bytes: number;
  mtime: string;
  content_type: string;
  status: ManifestSourceStatus;
};

type ManifestLock = {
  version: number;
  generated_at: string;
  workspace_hash: string;
  sources: ManifestEntry[];
};

export type ContextIngestParsed = {
  sources: string[];
  mode: ContextIngestMode;
  dryRun: boolean;
  indexOnly: boolean;
  runTask: boolean;
  includePrivate: boolean;
};

function defaultWorkspaceHash(root: string): string {
  return `sha256:${createHash("sha256").update(root).digest("hex").slice(0, 16)}`;
}

function selectedSourceRows(
  opts: Pick<ContextIngestParsed, "mode" | "includePrivate">,
  sourceRows: ManifestEntry[],
): ManifestEntry[] {
  const visible = opts.includePrivate
    ? sourceRows
    : sourceRows.filter((entry) => entry.status !== "private");
  if (opts.mode === "changed") {
    return visible.filter(
      (entry) =>
        entry.status === "new" ||
        entry.status === "changed" ||
        (opts.includePrivate && entry.status === "private"),
    );
  }
  return visible;
}

function buildIngestMetadata(
  opts: Omit<ContextIngestParsed, "runTask">,
  sourceRows: ManifestEntry[],
): {
  title: string;
  description: string;
  verify: string[];
} {
  const modeLabel = {
    all: "all tracked sources",
    changed: "changed sources",
    sources: "explicit sources",
  }[opts.mode];
  const modeSource = selectedSourceRows(opts, sourceRows);
  const title = `context assimilation (${modeLabel})`;
  const description = [
    `Source context assimilation for ${modeLabel}.`,
    "This task is created by `context ingest`.",
    `Source set: ${JSON.stringify(modeSource.map((row) => row.path))}`,
    `Mode detail: mode=${opts.mode}, indexOnly=${opts.indexOnly}, dryRun=${opts.dryRun}`,
    `Total tracked candidates: ${sourceRows.length}`,
    `Changed/new candidates: ${modeSource.length}`,
    `private-only filtering: enabled`,
    `Run policy: task-owner CURATOR`,
  ].join("\n");
  return {
    title,
    description,
    verify: [
      "agentplane context verify-task <created-task-id>",
      "agentplane context doctor",
      "agentplane context graph validate",
      'agentplane context search "<smoke-query>" --format json',
      "agentplane acr generate <created-task-id> --write",
      "agentplane acr check <created-task-id>",
    ],
  };
}

function statusHistogram(rows: ManifestEntry[]): Record<ManifestSourceStatus, number> {
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

function createTaskNewParsed(
  opts: ContextIngestParsed,
  sourceRows: ManifestEntry[],
): TaskNewParsed {
  const metadata = buildIngestMetadata(opts, sourceRows);
  const now = new Date().toISOString();
  const selectedRows = selectedSourceRows(opts, sourceRows);
  const allowCapabilities = false;
  const allowedOutputs = [
    "context/wiki/**",
    ".agentplane/context/derived/facts/**",
    ".agentplane/context/derived/graph/**",
    ".agentplane/context/derived/reports/**",
    ".agentplane/tasks/${taskId}/README.md",
    ".agentplane/tasks/${taskId}/acr.json",
  ];
  if (allowCapabilities) {
    allowedOutputs.push("context/capabilities/**", ".agentplane/context/derived/capabilities/**");
  }
  return {
    title: metadata.title,
    description: metadata.description,
    owner: "CURATOR",
    priority: "med",
    tags: ["context", "assimilation"],
    taskKind: "context",
    mutationScope: "context",
    blueprintRequest: "context.assimilation",
    extensions: {
      "agentplane.context": {
        schema_version: 1,
        task_type: "context_assimilation",
        manifest: ".agentplane/context/agentplane.context.yaml",
        workspace: "context",
        mode: "wiki",
        source_set: {
          selection: opts.mode,
          include_private: opts.includePrivate,
          generated_at: now,
          files: selectedRows.map((row) => ({
            path: row.path,
            sha256: row.sha256,
            status: row.status,
            content_type: row.content_type,
            size_bytes: row.size_bytes,
          })),
        },
        allowed_outputs: allowedOutputs,
        assimilation: {
          update_wiki: true,
          extract_entities: true,
          extract_facts: true,
          extract_relations: true,
          detect_contradictions: true,
          detect_open_questions: true,
          propose_capabilities: allowCapabilities,
          update_capabilities: allowCapabilities,
          allow_raw_mutation: false,
        },
        forbidden_outputs: [
          "context/raw/**",
          "context/raw/private/**",
          ".agentplane/cache.sqlite",
          ".agentplane/context/service/**",
        ],
        policies: {
          context_rules: ".agentplane/context/policies/context.rules.md",
          wiki_rules: ".agentplane/context/policies/wiki.rules.md",
          capability_rules: ".agentplane/context/policies/capability.rules.md",
          redaction: ".agentplane/context/policies/redaction.rules.yaml",
        },
      },
    },
    dependsOn: [],
    verify: metadata.verify,
    showBlueprint: false,
    allowDuplicate: true,
    riskFlags: [],
  };
}

function buildTaskIdHint(opts: { mode: ContextIngestMode; sources: string[] }): string {
  if (opts.mode === "sources" && opts.sources.length > 0) {
    return `${opts.mode}: ${opts.sources.join(", ")}`;
  }
  return opts.mode;
}

function toPosix(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

function toStatusLabel(status: ManifestSourceStatus): string {
  return `${status.toUpperCase()}${status === "error" ? " (skipped)" : ""}`;
}

function contentTypeForPath(filePath: string): string {
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

function isUnsupportedPath(filePath: string): boolean {
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

function isPrivatePath(filePath: string): boolean {
  const lower = filePath.toLowerCase();
  return lower.includes("context/raw/private/");
}

function isServiceCandidate(filePath: string): boolean {
  const parts = toPosix(filePath).split("/");
  return parts.some((part) => part.startsWith(".")) || parts.includes("service");
}

function ensureWithinRoot(root: string, candidate: string): boolean {
  const absRoot = path.resolve(root);
  const abs = path.resolve(candidate);
  return abs === absRoot || abs.startsWith(`${absRoot}${path.sep}`);
}

async function readJsonIfExists(filePath: string): Promise<unknown | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "ENOENT") return null;
    return null;
  }
}

async function walkFiles(root: string, relDir: string): Promise<string[]> {
  const absolute = path.join(root, relDir);
  const entries = await readdir(absolute, { withFileTypes: true });
  const out: string[] = [];
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "service") continue;
    const nextRel = toPosix(path.join(relDir, entry.name));
    if (isServiceCandidate(nextRel)) continue;
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(root, nextRel)));
      continue;
    }
    if (!entry.isFile()) continue;
    out.push(nextRel);
  }
  return out;
}

async function readManifest(root: string): Promise<ManifestLock> {
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

async function writeManifest(root: string, manifest: ManifestLock): Promise<void> {
  const lockPath = path.join(root, ".agentplane", "context", "manifest.lock.json");
  await writeJsonStableIfChanged(lockPath, {
    version: manifest.version,
    generated_at: new Date().toISOString(),
    workspace_hash: manifest.workspace_hash || defaultWorkspaceHash(root),
    sources: manifest.sources,
  });
}

async function calculateSha256(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  return await new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on("data", (chunk: Buffer) => hash.update(chunk));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(`sha256:${hash.digest("hex")}`));
  });
}

async function collectCandidateRows(
  root: string,
  opts: ContextIngestParsed,
  lock: ManifestLock,
): Promise<ManifestEntry[]> {
  const requestedPaths =
    opts.mode === "sources" ? opts.sources : await walkFiles(root, "context/raw");

  const candidates = new Set<string>();
  for (const raw of requestedPaths) {
    if (opts.mode === "sources") {
      const abs = path.resolve(root, raw);
      if (!ensureWithinRoot(root, abs)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `source path outside project root: ${raw}`,
        });
      }
      let statRaw: { isDirectory: () => boolean };
      try {
        statRaw = await stat(abs);
      } catch {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `source path does not exist: ${raw}`,
        });
      }
      if (statRaw.isDirectory()) {
        for (const nested of await walkFiles(root, toPosix(path.relative(root, abs)))) {
          if (isServiceCandidate(nested)) continue;
          candidates.add(toPosix(nested));
        }
        continue;
      }
      const st = await stat(abs);
      candidates.add(toPosix(path.relative(root, abs)));
      continue;
    }
    candidates.add(toPosix(raw));
  }

  const lockByPath = new Map<string, ManifestEntry>(
    lock.sources.map((entry) => [entry.path, entry]),
  );
  const rows: ManifestEntry[] = [];
  const processed = new Set<string>();
  for (const candidate of candidates) {
    const abs = path.join(root, candidate);
    processed.add(candidate);
    try {
      const st = await stat(abs);
      if (!st.isFile()) continue;
      const sha256 = await calculateSha256(abs);
      const status = isPrivatePath(candidate)
        ? "private"
        : isUnsupportedPath(candidate)
          ? "unsupported"
          : lockByPath.has(candidate)
            ? lockByPath.get(candidate)?.sha256 === sha256
              ? "unchanged"
              : "changed"
            : "new";
      rows.push({
        path: candidate,
        sha256,
        size_bytes: st.size,
        mtime: new Date(st.mtimeMs).toISOString(),
        content_type: contentTypeForPath(candidate),
        status,
      });
    } catch {
      rows.push({
        path: candidate,
        sha256: "sha256:0",
        size_bytes: 0,
        mtime: new Date().toISOString(),
        content_type: contentTypeForPath(candidate),
        status: "error",
      });
    }
  }

  if (opts.mode === "changed") {
    for (const existing of lock.sources) {
      if (!processed.has(existing.path)) {
        rows.push({
          ...existing,
          status: "deleted",
        });
      }
    }
  }
  return rows;
}

function finalizeManifestRows(allRows: ManifestEntry[]): ManifestEntry[] {
  const seen = new Set<string>();
  const out: ManifestEntry[] = [];
  for (const row of allRows) {
    if (seen.has(row.path)) continue;
    seen.add(row.path);
    out.push({
      ...row,
      sha256: row.sha256 || "sha256:0",
      size_bytes: Number.isFinite(row.size_bytes) ? row.size_bytes : 0,
      mtime: row.mtime || new Date().toISOString(),
      status: row.status || "unsupported",
      content_type: row.content_type || contentTypeForPath(row.path),
    });
  }
  return out;
}

function buildIndexModeSourceRows(
  opts: ContextIngestParsed,
  rows: ManifestEntry[],
): ManifestEntry[] {
  return selectedSourceRows(opts, rows);
}

export async function cmdContextIngest(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: ContextIngestParsed;
  createTask?: typeof runTaskNewParsed;
  runTask?: typeof runTaskRun;
}): Promise<number> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const root = ctx.resolvedProject.gitRoot;

  try {
    const lock = await readManifest(root);
    const rows = finalizeManifestRows(await collectCandidateRows(root, opts.parsed, lock));

    const indexModeRows = buildIndexModeSourceRows(opts.parsed, rows);
    if (opts.parsed.dryRun) {
      const histogram = statusHistogram(rows);
      process.stdout.write(
        `context ingest dry-run (${opts.parsed.mode})\n` +
          `- mode: ${opts.parsed.mode}\n` +
          `- source hints: ${indexModeRows.length}\n` +
          `- total rows: ${rows.length}\n` +
          `- status: ${JSON.stringify(histogram)}\n` +
          `- allowed outputs: context task README + manifest.lock + reindex\n` +
          `- dry-run writes: none\n` +
          `- manifest update: skipped\n` +
          `- task: skipped (preview)\n`,
      );
      if (indexModeRows.length > 0) {
        process.stdout.write(`- selected:\n`);
        for (const row of indexModeRows) {
          process.stdout.write(`  - ${row.path} (${toStatusLabel(row.status)}, ${row.sha256})\n`);
        }
      }
      return 0;
    }

    await writeManifest(root, {
      version: lock.version ?? 1,
      generated_at: new Date().toISOString(),
      workspace_hash: defaultWorkspaceHash(root),
      sources: rows,
    });

    if (opts.parsed.indexOnly) {
      return cmdContextReindex({
        cwd: root,
        rootOverride: opts.rootOverride,
        parsed: {
          includeTasks: false,
          includeRaw: true,
          reset: false,
        },
      });
    }

    if (indexModeRows.length === 0) {
      process.stdout.write("no new or changed sources detected for context assimilation\n");
      return 0;
    }

    const before = new Set((await ctx.taskBackend.listTasks()).map((task) => task.id));
    const taskParsed = createTaskNewParsed(opts.parsed, indexModeRows);
    const createTask = opts.createTask ?? runTaskNewParsed;
    await createTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      parsed: taskParsed,
    });
    const after = await ctx.taskBackend.listTasks();
    const created = after.filter((task) => !before.has(task.id));
    const contextCreated = created.find((task) => task.owner === "CURATOR");
    if (!contextCreated) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: "context ingest created no task; cannot continue to run.",
      });
    }

    process.stdout.write(
      `context ingestion task created: ${contextCreated.id} (${buildTaskIdHint({ mode: opts.parsed.mode, sources: opts.parsed.sources })})\n`,
    );

    if (!opts.parsed.runTask) return 0;
    const runTask = opts.runTask ?? runTaskRun;
    return await runTask(
      { cwd: opts.cwd, rootOverride: opts.rootOverride },
      { taskId: contextCreated.id, dryRun: false },
    );
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "context ingest", root: opts.rootOverride ?? null });
  }
}
