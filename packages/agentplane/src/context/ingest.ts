import { mapBackendError } from "../cli/error-map.js";
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
import { cmdContextReindex } from "./reindex.js";
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

export async function cmdContextIngest(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: ContextIngestParsed;
  createTask?: typeof runTaskNewParsed;
  afterJournalPhase?: (phase: ContextIngestRunPhase) => Promise<void> | void;
  writeTaskPack?: typeof writeContextTaskPack;
}): Promise<number> {
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
      process.stdout.write(
        `context ingest dry-run (${opts.parsed.mode})\n` +
          `- mode: ${opts.parsed.mode}\n` +
          `- source hints: ${indexModeRows.length}\n` +
          `- total rows: ${completeRows.length}\n` +
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

    const sourceLockedManifest: ManifestLock = {
      version: lock.version ?? 1,
      generated_at: new Date().toISOString(),
      workspace_hash: defaultWorkspaceHash(root),
      wiki_scaffold: lock.wiki_scaffold,
      sources: completeRows,
    };
    if (opts.parsed.indexOnly) {
      await writeManifest(root, sourceLockedManifest);
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
      process.stdout.write("no new or changed sources detected for context assimilation\n");
      return 0;
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
): Promise<number> {
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
    process.stdout.write(
      `context ingestion task created: ${run.task.task_id} (${buildTaskIdHint({ mode: opts.parsed.mode, sources: opts.parsed.sources })}; task pack spans=${run.pack.span_count})\n`,
    );
    return 0;
  }

  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: `context ingest run ${run.run_id} is not resumable from phase ${run.phase}.`,
  });
}
