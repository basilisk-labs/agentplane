import { mapBackendError } from "../cli/error-map.js";
import { createCliEmitter } from "../cli/output.js";
import { loadCommandContext, type CommandContext } from "../commands/shared/task-backend.js";
import { runTaskNewParsed, type TaskCreationResult } from "../commands/task/new.js";
import { CliError } from "../shared/errors.js";

import { createTaskNewParsed } from "./ingest-task.js";
import { writeContextTaskCreationReceipt, writeContextTaskPack } from "./ingest-task-pack.js";
import {
  buildTaskIdHint,
  defaultWorkspaceHash,
  readContextWorkspaceMode,
  readManifest,
  statusHistogram,
  toStatusLabel,
  writeManifest,
  type ContextIngestParsed,
  type ManifestLock,
} from "./ingest-manifest.js";
import {
  buildIndexModeSourceRows,
  collectCandidateRows,
  finalizeManifestRows,
  mergeCompleteSourceInventory,
} from "./ingest-sources.js";
import {
  renderContextReindexResult,
  runContextReindex,
  type ContextReindexResult,
} from "./reindex.js";
import {
  claimContextIngestRunExecution,
  releaseContextIngestRunExecution,
} from "./ingest-run-execution-lease.js";
import {
  acquireContextIngestRun,
  advanceContextIngestRun,
  assertContextIngestRunManifest,
  assertContextIngestRunSourceSet,
  contextIngestManifestFingerprint,
  releaseContextIngestRunLease,
  type ContextIngestRunPhase,
} from "./ingest-run-journal.js";

export type { ContextIngestParsed, ManifestEntry } from "./ingest-manifest.js";

const output = createCliEmitter();

export type ContextIngestResult =
  | {
      kind: "dry_run";
      mode: ContextIngestParsed["mode"];
      source_hints: number;
      total_rows: number;
      status: ReturnType<typeof statusHistogram>;
      selected: { path: string; status: string; sha256: string }[];
    }
  | { kind: "index_only"; reindex: ContextReindexResult }
  | { kind: "no_changes" }
  | { kind: "task_created"; task_id: string; hint: string; span_count: number };

function renderContextIngestResult(result: ContextIngestResult): void {
  switch (result.kind) {
    case "dry_run": {
      output.line(
        [
          `context ingest dry-run (${result.mode})`,
          `- mode: ${result.mode}`,
          `- source hints: ${result.source_hints}`,
          `- total rows: ${result.total_rows}`,
          `- status: ${JSON.stringify(result.status)}`,
          "- allowed outputs: context task README + manifest.lock + reindex",
          "- dry-run writes: none",
          "- manifest update: skipped",
          "- task: skipped (preview)",
          ...(result.selected.length > 0
            ? [
                "- selected:",
                ...result.selected.map((row) => `  - ${row.path} (${row.status}, ${row.sha256})`),
              ]
            : []),
        ].join("\n"),
      );
      return;
    }
    case "index_only": {
      renderContextReindexResult(result.reindex);
      return;
    }
    case "no_changes": {
      output.line("no new or changed sources detected for context assimilation");
      return;
    }
    case "task_created": {
      output.line(
        `context ingestion task created: ${result.task_id} (${result.hint}; task pack spans=${result.span_count})`,
      );
    }
  }
}

export async function runContextIngest(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: ContextIngestParsed;
  createTask?: typeof runTaskNewParsed;
  afterJournalPhase?: (phase: ContextIngestRunPhase) => Promise<void> | void;
  writeTaskPack?: typeof writeContextTaskPack;
}): Promise<ContextIngestResult> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const root = ctx.resolvedProject.gitRoot;

  try {
    const lock = await readManifest(root);
    const rows = finalizeManifestRows(await collectCandidateRows(root, opts.parsed, lock));
    const completeRows = await mergeCompleteSourceInventory(root, lock, rows);

    const indexModeRows = buildIndexModeSourceRows(opts.parsed, rows);
    if (opts.parsed.dryRun) {
      const histogram = statusHistogram(rows);
      return {
        kind: "dry_run",
        mode: opts.parsed.mode,
        source_hints: indexModeRows.length,
        total_rows: completeRows.length,
        status: histogram,
        selected: indexModeRows.map((row) => ({
          path: row.path,
          status: toStatusLabel(row.status),
          sha256: row.sha256,
        })),
      };
    }

    const sourceLockedManifest: ManifestLock = {
      version: lock.version ?? 1,
      generated_at: new Date().toISOString(),
      workspace_hash: defaultWorkspaceHash(root),
      wiki_scaffold: lock.wiki_scaffold,
      sources: completeRows,
    };
    if (opts.parsed.indexOnly) {
      await writeManifest(root, sourceLockedManifest);
      const reindex = await runContextReindex({
        cwd: root,
        rootOverride: opts.rootOverride,
        parsed: {
          includeTasks: false,
          includeRaw: true,
          reset: false,
        },
      });
      return { kind: "index_only", reindex };
    }

    const run = await acquireContextIngestRun({
      allowCreate: indexModeRows.length > 0,
      manifest: sourceLockedManifest,
      parsed: opts.parsed,
      previousManifest: lock,
      root,
      selected: indexModeRows,
    });
    if (run === null) {
      await writeManifest(root, sourceLockedManifest);
      return { kind: "no_changes" };
    }
    const execution = await claimContextIngestRunExecution(root, run);
    try {
      assertContextIngestRunSourceSet(run, completeRows);

      if (run.phase === "task_creating") {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message:
            `context ingest run ${run.run_id} has an unknown task creation outcome. ` +
            "Run context doctor and inspect the task backend before retrying.",
        });
      }

      if (run.phase !== "planned") {
        assertContextIngestRunManifest(run, lock);
      }

      if (run.phase === "planned") {
        const currentFingerprint = contextIngestManifestFingerprint(lock);
        if (
          currentFingerprint !== run.source_set.previous_manifest_fingerprint &&
          currentFingerprint !== run.source_set.manifest_fingerprint
        ) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message:
              `context ingest run ${run.run_id} cannot lock sources because the manifest changed concurrently. ` +
              "Run context doctor before retrying.",
          });
        }
        if (currentFingerprint !== run.source_set.manifest_fingerprint) {
          await writeManifest(root, run.source_set.manifest);
        }
        const locked = await advanceContextIngestRun(root, run, { phase: "source_set_locked" });
        await opts.afterJournalPhase?.(locked.phase);
        return await continueContextIngest(opts, ctx, root, locked);
      }

      return await continueContextIngest(opts, ctx, root, run);
    } finally {
      await releaseContextIngestRunExecution(root, execution);
    }
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "context ingest", root: opts.rootOverride ?? null });
  }
}

async function continueContextIngest(
  opts: {
    cwd: string;
    rootOverride?: string;
    parsed: ContextIngestParsed;
    createTask?: typeof runTaskNewParsed;
    afterJournalPhase?: (phase: ContextIngestRunPhase) => Promise<void> | void;
    writeTaskPack?: typeof writeContextTaskPack;
  },
  ctx: CommandContext,
  root: string,
  initialRun: Exclude<Awaited<ReturnType<typeof acquireContextIngestRun>>, null>,
): Promise<ContextIngestResult> {
  let run = initialRun;
  if (run.phase === "source_set_locked") {
    run = await advanceContextIngestRun(root, run, { phase: "task_creating" });
    const workspaceMode = await readContextWorkspaceMode(root);
    const taskParsed = createTaskNewParsed(opts.parsed, run.source_set.selected, workspaceMode);
    const createTask = opts.createTask ?? runTaskNewParsed;
    const contextCreated: TaskCreationResult = await createTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      parsed: taskParsed,
    });
    run = await advanceContextIngestRun(root, run, {
      phase: "task_created",
      task: contextCreated,
    });
    await opts.afterJournalPhase?.(run.phase);
  }

  if (run.phase === "task_created") {
    if (run.task === undefined) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `context ingest run ${run.run_id} is missing its task creation receipt.`,
      });
    }
    await writeContextTaskCreationReceipt({ root, result: run.task });
    run = await advanceContextIngestRun(root, run, { phase: "pack_writing" });
    await opts.afterJournalPhase?.(run.phase);
  }

  if (run.phase === "pack_writing") {
    if (run.task === undefined) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `context ingest run ${run.run_id} cannot write a task pack without a task receipt.`,
      });
    }
    const writeTaskPack = opts.writeTaskPack ?? writeContextTaskPack;
    let pack: Awaited<ReturnType<typeof writeContextTaskPack>>;
    try {
      pack = await writeTaskPack({
        root,
        taskId: run.task.task_id,
        sources: run.source_set.selected,
        creation: run.task,
      });
    } catch (error) {
      await advanceContextIngestRun(root, run, { phase: "task_created" });
      throw error;
    }
    run = await advanceContextIngestRun(root, run, {
      pack: { span_count: pack.spanCount },
      phase: "pack_written",
    });
    await opts.afterJournalPhase?.(run.phase);
    await releaseContextIngestRunLease(root, run);
  }

  if (run.phase === "pack_written") {
    if (run.task === undefined || run.pack === undefined) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `context ingest run ${run.run_id} is missing completed task-pack evidence.`,
      });
    }
    return {
      kind: "task_created",
      task_id: run.task.task_id,
      hint: buildTaskIdHint({ mode: opts.parsed.mode, sources: opts.parsed.sources }),
      span_count: run.pack.span_count,
    };
  }

  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: `context ingest run ${run.run_id} is not resumable from phase ${run.phase}.`,
  });
}

export async function cmdContextIngest(
  opts: Parameters<typeof runContextIngest>[0],
): Promise<number> {
  renderContextIngestResult(await runContextIngest(opts));
  return 0;
}
