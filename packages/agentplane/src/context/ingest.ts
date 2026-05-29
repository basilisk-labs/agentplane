import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

import { mapBackendError } from "../cli/error-map.js";
import { starterWikiPageFiles } from "../commands/context/init-wiki.js";
import { loadCommandContext, type CommandContext } from "../commands/shared/task-backend.js";
import { runTaskNewParsed } from "../commands/task/new.js";
import { CliError } from "../shared/errors.js";
import { writeTextIfChanged } from "../shared/write-if-changed.js";

import { createTaskNewParsed } from "./ingest-task.js";
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

export type { ContextIngestParsed, ManifestEntry } from "./ingest-manifest.js";

async function ensureFirstIngestWikiScaffold(root: string): Promise<string[]> {
  const created: string[] = [];
  for (const file of starterWikiPageFiles()) {
    if (file.relative === "context/wiki/index.md") continue;
    const abs = path.join(root, file.relative);
    try {
      await stat(abs);
      continue;
    } catch (err) {
      if ((err as { code?: string } | null)?.code !== "ENOENT") throw err;
    }
    await mkdir(path.dirname(abs), { recursive: true });
    await writeTextIfChanged(abs, file.content);
    created.push(file.relative);
  }
  return created;
}

export async function cmdContextIngest(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: ContextIngestParsed;
  createTask?: typeof runTaskNewParsed;
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
    await writeManifest(root, sourceLockedManifest);

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

    const workspaceMode = await readContextWorkspaceMode(root);
    if (
      workspaceMode !== "maximum-assimilation" &&
      !sourceLockedManifest.wiki_scaffold?.starter_created_at
    ) {
      const createdWikiScaffold = await ensureFirstIngestWikiScaffold(root);
      await writeManifest(root, {
        ...sourceLockedManifest,
        wiki_scaffold: { starter_created_at: new Date().toISOString() },
      });
      if (createdWikiScaffold.length > 0) {
        process.stdout.write(
          `context ingest wiki scaffold created: ${createdWikiScaffold.length} page(s)\n`,
        );
      }
    }

    const beforeTasks = await ctx.taskBackend.listTasks();
    const before = new Set(beforeTasks.map((task) => task.id));
    const taskParsed = createTaskNewParsed(opts.parsed, indexModeRows, workspaceMode);
    const createTask = opts.createTask ?? runTaskNewParsed;
    await createTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      parsed: taskParsed,
    });
    const after = await ctx.taskBackend.listTasks();
    const created = after
      .filter((task) => !before.has(task.id) && task.owner === "CURATOR")
      .toSorted((left, right) =>
        String(right.doc_updated_at ?? "").localeCompare(String(left.doc_updated_at ?? "")),
      );
    const contextCreated = created[0];
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

    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "context ingest", root: opts.rootOverride ?? null });
  }
}
