import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import type { TaskCreationResult } from "../commands/task/new.js";
import { CliError } from "../shared/errors.js";

import {
  readManifest,
  type ContextIngestParsed,
  type ManifestEntry,
  type ManifestLock,
} from "./ingest-manifest.js";

const JOURNAL_DIRECTORY = ".agentplane/context/ingest-runs";
const ACTIVE_DIRECTORY = `${JOURNAL_DIRECTORY}/active`;

const PREPARATION_PHASES = [
  "planned",
  "source_set_locked",
  "task_creating",
  "task_created",
  "pack_writing",
] as const;

const CONTEXT_INGEST_RUN_PHASES = [
  ...PREPARATION_PHASES,
  "pack_written",
  "curator_running",
  "semantic_result_received",
  "artifacts_applied",
  "validated",
  "evaluated",
  "finalized",
] as const;

export type ContextIngestRunPhase = (typeof CONTEXT_INGEST_RUN_PHASES)[number];

type ContextIngestRequest = {
  fingerprint: string;
  mode: ContextIngestParsed["mode"];
  sources: string[];
};

type ContextIngestSourceSet = {
  full_inventory: ManifestEntry[];
  manifest: ManifestLock;
  manifest_fingerprint: string;
  previous_manifest_fingerprint: string;
  selected: ManifestEntry[];
  selected_fingerprint: string;
};

export type ContextIngestRunJournal = {
  created_at: string;
  pack?: { span_count: number };
  phase: ContextIngestRunPhase;
  request: ContextIngestRequest;
  run_id: string;
  semantic?: { extraction_file: string; extraction_fingerprint?: string };
  source_set: ContextIngestSourceSet;
  task?: TaskCreationResult;
  updated_at: string;
  version: 1;
};

type ContextIngestRunLease = {
  acquired_at: string;
  request_fingerprint: string;
  run_id: string;
  version: 1;
};

export type ContextIngestRunDiagnostic = {
  level: "issue" | "warning";
  message: string;
};

function contextIngestRequestFingerprint(
  parsed: Pick<ContextIngestParsed, "mode" | "sources">,
): string {
  return fingerprint({ mode: parsed.mode, sources: [...parsed.sources].toSorted() });
}

export function contextIngestManifestFingerprint(manifest: ManifestLock): string {
  return fingerprint({
    sources: normalizeEntries(manifest.sources),
    version: manifest.version,
    wiki_scaffold: manifest.wiki_scaffold ?? null,
    workspace_hash: manifest.workspace_hash,
  });
}

function contextIngestSourceFingerprint(entries: ManifestEntry[]): string {
  return fingerprint(normalizeEntries(entries));
}

export function contextIngestSemanticFingerprint(raw: string): string {
  return `sha256:${createHash("sha256").update(raw).digest("hex")}`;
}

export async function acquireContextIngestRun(opts: {
  allowCreate: boolean;
  manifest: ManifestLock;
  parsed: Pick<ContextIngestParsed, "mode" | "sources">;
  previousManifest: ManifestLock;
  root: string;
  selected: ManifestEntry[];
}): Promise<ContextIngestRunJournal | null> {
  const requestFingerprint = contextIngestRequestFingerprint(opts.parsed);
  const activePath = activeLeasePath(opts.root);
  await mkdir(path.dirname(activePath), { recursive: true });

  const existingLease = await readLease(activePath);
  if (existingLease !== null) {
    const run = await readContextIngestRun(opts.root, existingLease.run_id);
    if (run === null) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message:
          `context ingest lease points to a missing run journal: ${existingLease.run_id}. ` +
          "Run context doctor and repair the journal before retrying.",
      });
    }
    if (isResumableContextIngestPhase(run.phase)) {
      if (run.request.fingerprint !== requestFingerprint) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message:
            `context ingest run ${run.run_id} owns the source-set lock. ` +
            "Run context doctor before starting a different ingestion request.",
        });
      }
      return run;
    }
    await releaseContextIngestRunLease(opts.root, run);
  }

  if (!opts.allowCreate) return null;

  const now = new Date().toISOString();
  const run: ContextIngestRunJournal = {
    created_at: now,
    phase: "planned",
    request: {
      fingerprint: requestFingerprint,
      mode: opts.parsed.mode,
      sources: [...opts.parsed.sources].toSorted(),
    },
    run_id: `ingest-${randomUUID()}`,
    source_set: {
      full_inventory: cloneEntries(opts.manifest.sources),
      manifest: cloneManifest(opts.manifest),
      manifest_fingerprint: contextIngestManifestFingerprint(opts.manifest),
      previous_manifest_fingerprint: contextIngestManifestFingerprint(opts.previousManifest),
      selected: cloneEntries(opts.selected),
      selected_fingerprint: contextIngestSourceFingerprint(opts.selected),
    },
    updated_at: now,
    version: 1,
  };
  await writeContextIngestRun(opts.root, run);
  const lease: ContextIngestRunLease = {
    acquired_at: now,
    request_fingerprint: requestFingerprint,
    run_id: run.run_id,
    version: 1,
  };
  try {
    await writeFile(activePath, `${JSON.stringify(lease, null, 2)}\n`, {
      encoding: "utf8",
      flag: "wx",
    });
    return run;
  } catch (error) {
    if (!isAlreadyExistsError(error)) throw error;
    await unlink(runPath(opts.root, run.run_id)).catch((cleanupError: unknown) => {
      if (isMissingError(cleanupError)) return;
      throw cleanupError;
    });
    const winner = await readLease(activePath);
    if (winner === null) throw error;
    const winnerRun = await readContextIngestRun(opts.root, winner.run_id);
    if (winnerRun === null) throw error;
    if (winnerRun.request.fingerprint !== requestFingerprint) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message:
          `context ingest run ${winnerRun.run_id} owns the source-set lock. ` +
          "Run context doctor before starting a different ingestion request.",
      });
    }
    return winnerRun;
  }
}

export async function advanceContextIngestRun(
  root: string,
  run: ContextIngestRunJournal,
  update: {
    pack?: { span_count: number };
    phase: ContextIngestRunPhase;
    semantic?: { extraction_file: string };
    task?: TaskCreationResult;
  },
): Promise<ContextIngestRunJournal> {
  const next: ContextIngestRunJournal = {
    ...run,
    ...(update.pack === undefined ? {} : { pack: update.pack }),
    ...(update.semantic === undefined ? {} : { semantic: update.semantic }),
    ...(update.task === undefined ? {} : { task: update.task }),
    phase: update.phase,
    updated_at: new Date().toISOString(),
  };
  await writeContextIngestRun(root, next);
  return next;
}

export async function advanceContextIngestRunForTask(
  root: string,
  taskId: string,
  update: {
    phase: ContextIngestRunPhase;
    semantic?: { extraction_file: string; extraction_fingerprint: string };
  },
): Promise<ContextIngestRunJournal | null> {
  const runs = await readContextIngestRuns(root);
  const matches = runs
    .filter((run) => run.task?.task_id === taskId)
    .toSorted((left, right) => left.updated_at.localeCompare(right.updated_at));
  const run = matches.at(-1);
  if (run === undefined) return null;

  if (
    update.semantic !== undefined &&
    run.semantic !== undefined &&
    run.semantic.extraction_fingerprint !== update.semantic.extraction_fingerprint
  ) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `context ingest run ${run.run_id} cannot apply changed semantic input after ${run.phase}. ` +
        "Start a new assimilation run explicitly instead of rewriting the existing journal.",
    });
  }

  const currentIndex = CONTEXT_INGEST_RUN_PHASES.indexOf(run.phase);
  const requestedIndex = CONTEXT_INGEST_RUN_PHASES.indexOf(update.phase);
  if (requestedIndex <= currentIndex) return run;
  return await advanceContextIngestRun(root, run, update);
}

export async function releaseContextIngestRunLease(
  root: string,
  run: ContextIngestRunJournal,
): Promise<void> {
  const activePath = activeLeasePath(root);
  const lease = await readLease(activePath);
  if (lease?.run_id !== run.run_id) return;
  await unlink(activePath).catch((error: unknown) => {
    if (isMissingError(error)) return;
    throw error;
  });
}

function isResumableContextIngestPhase(phase: ContextIngestRunPhase): boolean {
  return (PREPARATION_PHASES as readonly string[]).includes(phase);
}

function contextIngestRunRetryCommand(run: ContextIngestRunJournal): string {
  if (run.request.mode === "all") return "agentplane context ingest --all";
  if (run.request.mode === "changed") return "agentplane context ingest --changed";
  return `agentplane context ingest ${run.request.sources.map((source) => JSON.stringify(source)).join(" ")}`;
}

export async function inspectContextIngestRuns(
  root: string,
): Promise<ContextIngestRunDiagnostic[]> {
  const entries = await readContextIngestRuns(root);
  const manifest = await readManifest(root);
  const diagnostics: ContextIngestRunDiagnostic[] = [];
  for (const run of entries) {
    if (run.phase === "finalized") continue;
    const retry = contextIngestRunRetryCommand(run);
    const taskId = run.task?.task_id;
    if (
      run.phase !== "planned" &&
      isResumableContextIngestPhase(run.phase) &&
      contextIngestManifestFingerprint(manifest) !== run.source_set.manifest_fingerprint
    ) {
      diagnostics.push({
        level: "issue",
        message:
          `context ingest run ${run.run_id} has manifest/run divergence; inspect the locked source set ` +
          `before repairing and resuming with ${retry}.`,
      });
      continue;
    }
    if (run.phase === "pack_written" && taskId !== undefined) {
      diagnostics.push({
        level: "warning",
        message: `context ingest run ${run.run_id} prepared CURATOR task ${taskId}; await semantic work.`,
      });
      continue;
    }
    if (run.phase === "semantic_result_received" && taskId !== undefined) {
      const extraction = run.semantic?.extraction_file ?? "the original extraction SGR file";
      diagnostics.push({
        level: "warning",
        message:
          `context ingest run ${run.run_id} received semantic output for ${taskId}; ` +
          `repeat context extraction apply for ${extraction} if artifacts were not applied.`,
      });
      continue;
    }
    if (
      (run.phase === "artifacts_applied" ||
        run.phase === "validated" ||
        run.phase === "evaluated") &&
      taskId !== undefined
    ) {
      diagnostics.push({
        level: "warning",
        message:
          `context ingest run ${run.run_id} is incomplete at ${run.phase}; ` +
          `continue with agentplane context finalize-task ${taskId}.`,
      });
      continue;
    }
    if (!isResumableContextIngestPhase(run.phase)) continue;
    if (run.phase === "task_creating") {
      diagnostics.push({
        level: "issue",
        message:
          `context ingest run ${run.run_id} has unknown task creation outcome; inspect the task backend ` +
          `before retrying (${retry}).`,
      });
      continue;
    }
    if (run.phase === "task_created" && run.task !== undefined) {
      const receiptPath = path.join(
        root,
        ".agentplane/tasks",
        run.task.task_id,
        "task-creation.json",
      );
      if (!(await fileExists(receiptPath))) {
        diagnostics.push({
          level: "issue",
          message:
            `context ingest run ${run.run_id} has task/receipt divergence for ${run.task.task_id}; ` +
            `resume with ${retry}.`,
        });
        continue;
      }
    }
    if (run.phase === "pack_writing" && run.task !== undefined) {
      const packPath = path.join(root, ".agentplane/tasks", run.task.task_id, "context-pack.md");
      if (!(await fileExists(packPath))) {
        diagnostics.push({
          level: "issue",
          message:
            `context ingest run ${run.run_id} has task/pack divergence for ${run.task.task_id}; ` +
            `resume with ${retry}.`,
        });
        continue;
      }
    }
    diagnostics.push({
      level: "warning",
      message: `context ingest run ${run.run_id} is incomplete at ${run.phase}; resume with ${retry}.`,
    });
  }
  return diagnostics;
}

export function assertContextIngestRunSourceSet(
  run: ContextIngestRunJournal,
  currentEntries: ManifestEntry[],
): void {
  const currentByPath = new Map(currentEntries.map((entry) => [entry.path, entry]));
  for (const locked of run.source_set.selected) {
    const current = currentByPath.get(locked.path);
    if (current?.sha256 === locked.sha256) continue;
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `context ingest run ${run.run_id} cannot resume because selected source fingerprint changed: ` +
        `${locked.path}. Run context doctor, then repair or start a new assimilation run explicitly.`,
    });
  }
}

export function assertContextIngestRunManifest(
  run: ContextIngestRunJournal,
  currentManifest: ManifestLock,
): void {
  if (contextIngestManifestFingerprint(currentManifest) === run.source_set.manifest_fingerprint) {
    return;
  }
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `context ingest run ${run.run_id} cannot resume because manifest/run fingerprints diverged. ` +
      "Run context doctor, then repair the manifest or start a new assimilation run explicitly.",
  });
}

async function readContextIngestRun(
  root: string,
  runId: string,
): Promise<ContextIngestRunJournal | null> {
  try {
    const raw = await readFile(runPath(root, runId), "utf8");
    return parseRun(raw);
  } catch (error) {
    if (isMissingError(error)) return null;
    throw error;
  }
}

async function readContextIngestRuns(root: string): Promise<ContextIngestRunJournal[]> {
  const directory = path.join(root, JOURNAL_DIRECTORY);
  let entries: string[] = [];
  try {
    entries = await readdir(directory);
  } catch (error) {
    if (isMissingError(error)) return [];
    throw error;
  }
  const runs: ContextIngestRunJournal[] = [];
  for (const entry of entries.filter((name) => name.endsWith(".json")).toSorted()) {
    const run = await readContextIngestRun(root, entry.slice(0, -".json".length));
    if (run !== null) runs.push(run);
  }
  return runs;
}

async function writeContextIngestRun(root: string, run: ContextIngestRunJournal): Promise<void> {
  const target = runPath(root, run.run_id);
  await mkdir(path.dirname(target), { recursive: true });
  const temporary = `${target}.${randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(run, null, 2)}\n`, "utf8");
  await rename(temporary, target);
}

async function readLease(activePath: string): Promise<ContextIngestRunLease | null> {
  try {
    const raw = await readFile(activePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<ContextIngestRunLease>;
    if (
      parsed.version !== 1 ||
      typeof parsed.request_fingerprint !== "string" ||
      typeof parsed.run_id !== "string" ||
      typeof parsed.acquired_at !== "string"
    ) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `context ingest lease is malformed: ${activePath}`,
      });
    }
    return parsed as ContextIngestRunLease;
  } catch (error) {
    if (isMissingError(error)) return null;
    throw error;
  }
}

function parseRun(raw: string): ContextIngestRunJournal {
  const parsed = JSON.parse(raw) as Partial<ContextIngestRunJournal>;
  if (
    parsed.version !== 1 ||
    typeof parsed.run_id !== "string" ||
    typeof parsed.phase !== "string" ||
    !CONTEXT_INGEST_RUN_PHASES.includes(parsed.phase as ContextIngestRunPhase) ||
    parsed.request === undefined ||
    parsed.source_set === undefined ||
    typeof parsed.created_at !== "string" ||
    typeof parsed.updated_at !== "string"
  ) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: "context ingest run journal is malformed",
    });
  }
  return parsed as ContextIngestRunJournal;
}

function activeLeasePath(root: string): string {
  return path.join(root, ACTIVE_DIRECTORY, "source-set.lock.json");
}

function runPath(root: string, runId: string): string {
  return path.join(root, JOURNAL_DIRECTORY, `${runId}.json`);
}

function cloneManifest(manifest: ManifestLock): ManifestLock {
  return {
    ...manifest,
    sources: cloneEntries(manifest.sources),
  };
}

function cloneEntries(entries: ManifestEntry[]): ManifestEntry[] {
  return entries.map((entry) => ({ ...entry }));
}

function normalizeEntries(entries: ManifestEntry[]): ManifestEntry[] {
  return cloneEntries(entries).toSorted((left, right) => left.path.localeCompare(right.path));
}

function fingerprint(value: unknown): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(value)).digest("hex")}`;
}

async function fileExists(candidate: string): Promise<boolean> {
  try {
    await readFile(candidate);
    return true;
  } catch (error) {
    if (isMissingError(error)) return false;
    throw error;
  }
}

function isAlreadyExistsError(error: unknown): boolean {
  return isNodeError(error, "EEXIST");
}

function isMissingError(error: unknown): boolean {
  return isNodeError(error, "ENOENT");
}

function isNodeError(error: unknown, code: string): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === code;
}
