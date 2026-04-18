import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  resolveTaskDocUpdatedBy,
  parseTaskReadme,
  taskDocToSectionMap,
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
  type TaskRecord,
  type AgentplaneConfig,
  type ResolvedProject,
} from "@agentplaneorg/core";

import type { ResolvedHarnessContract } from "../../runtime/harness/index.js";
import { CliError } from "../../shared/errors.js";
import {
  loadTaskBackend,
  taskRecordToData,
  type TaskBackend,
  toTaskSummary,
  type TaskData,
  type TaskSummary,
} from "../../backends/task-backend.js";
import { gitShowFile, toGitPath } from "./git-diff.js";
import { GitContext } from "./git-context.js";
import {
  findWorktreeForBranch,
  gitListTaskBranches,
  parseTaskIdFromBranch,
} from "./git-worktree.js";

export type CommandMemo = {
  taskProjection?: Promise<TaskSummary[]>;
  changedPaths?: Promise<string[]>;
  headCommit?: Promise<string>;
  agentIds?: Promise<string[]>;
  harness?: Promise<ResolvedHarnessContract>;
};

export type CommandContext = {
  resolvedProject: Awaited<ReturnType<typeof loadTaskBackend>>["resolved"];
  config: Awaited<ReturnType<typeof loadTaskBackend>>["config"];
  taskBackend: Awaited<ReturnType<typeof loadTaskBackend>>["backend"];
  backendId: string;
  backendConfigPath: string;
  git: GitContext;

  memo: CommandMemo;
};

function normalizeDocUpdatedBy(value?: string): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  if (trimmed.toLowerCase() === "agentplane") return "";
  return trimmed;
}

export function resolveDocUpdatedBy(task: TaskData, author?: string): string {
  return normalizeDocUpdatedBy(
    resolveTaskDocUpdatedBy(
      {
        comments: task.comments ?? null,
        doc_updated_by: task.doc_updated_by,
        owner: task.owner,
      },
      author,
    ),
  );
}

export function taskDataToFrontmatter(task: TaskData): Record<string, unknown> {
  const planApproval =
    task.plan_approval ??
    ({ state: "pending", updated_at: null, updated_by: null, note: null } as const);
  const verification =
    task.verification ??
    ({ state: "pending", updated_at: null, updated_by: null, note: null } as const);
  const revision =
    Number.isInteger(task.revision) && Number(task.revision) > 0 ? Number(task.revision) : 1;
  const sections =
    task.doc === undefined
      ? task.sections && Object.keys(task.sections).length > 0
        ? task.sections
        : undefined
      : taskDocToSectionMap(task.doc);
  return {
    id: task.id,
    title: task.title,
    result_summary: task.result_summary,
    risk_level: task.risk_level,
    breaking: task.breaking,
    status: task.status,
    priority: task.priority,
    owner: task.owner,
    revision,
    origin: task.origin ?? undefined,
    depends_on: task.depends_on ?? [],
    tags: task.tags ?? [],
    verify: task.verify ?? [],
    plan_approval: planApproval,
    verification,
    runner: task.runner ?? undefined,
    commit: task.commit ?? null,
    comments: task.comments ?? [],
    events: task.events ?? [],
    doc_version: task.doc_version,
    doc_updated_at: task.doc_updated_at,
    doc_updated_by: task.doc_updated_by,
    description: task.description ?? "",
    sections,
    id_source: task.id_source,
    dirty: task.dirty,
  };
}

export function getTaskBackendCapabilities(ctx: CommandContext) {
  return ctx.taskBackend.capabilities;
}

export function backendHasLocalCanonicalSource(ctx: CommandContext): boolean {
  return getTaskBackendCapabilities(ctx).canonical_source === "local";
}

export function backendWritesTaskReadmes(ctx: CommandContext): boolean {
  return getTaskBackendCapabilities(ctx).writes_task_readmes === true;
}

export function backendSupportsTaskBranchSnapshots(ctx: CommandContext): boolean {
  return backendHasLocalCanonicalSource(ctx) && backendWritesTaskReadmes(ctx);
}

export function backendUsesLocalTaskStore(ctx: CommandContext): boolean {
  return backendSupportsTaskBranchSnapshots(ctx);
}

export async function loadCommandContext(opts: {
  cwd: string;
  rootOverride?: string | null;
  resolvedProject?: ResolvedProject;
  config?: AgentplaneConfig;
}): Promise<CommandContext> {
  const backendLoaded = await loadTaskBackend({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    resolvedProject: opts.resolvedProject,
    config: opts.config,
  });
  const { backend, backendId, backendConfigPath, resolved, config } = backendLoaded;
  return {
    resolvedProject: resolved,
    config,
    taskBackend: backend,
    backendId,
    backendConfigPath,
    git: new GitContext({ gitRoot: resolved.gitRoot }),
    memo: {},
  };
}

export async function loadTaskFromContext(opts: {
  ctx: CommandContext;
  taskId: string;
  preferBranchSnapshot?: boolean;
  branchSnapshotBranch?: string | null;
}): Promise<TaskData> {
  const tasksDir = path.join(opts.ctx.resolvedProject.gitRoot, opts.ctx.config.paths.workflow_dir);
  const readmePath = path.join(tasksDir, opts.taskId, "README.md");
  const branchFallback = () =>
    loadTaskFromBranchSnapshot({
      ctx: opts.ctx,
      taskId: opts.taskId,
      readmePath,
      branch: opts.branchSnapshotBranch ?? null,
    });

  if (opts.preferBranchSnapshot) {
    const preferredBranchTask = await branchFallback();
    if (preferredBranchTask) return preferredBranchTask;
  }

  const task = await opts.ctx.taskBackend.getTask(opts.taskId);
  if (task) return task;

  const fallbackTask = await branchFallback();
  if (fallbackTask) return fallbackTask;

  throw new CliError({
    exitCode: 4,
    code: "E_IO",
    message: `ENOENT: no such file or directory, open '${readmePath}'`,
  });
}

export async function resolveTaskBranchFromContext(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<string | null> {
  if (!backendSupportsTaskBranchSnapshots(opts.ctx)) {
    return null;
  }

  const prefix = opts.ctx.config.branch.task_prefix;
  const branches = await gitListTaskBranches(opts.ctx.resolvedProject.gitRoot, prefix);
  const matches = branches.filter(
    (branch) => parseTaskIdFromBranch(prefix, branch) === opts.taskId,
  );
  if (matches.length === 1) return matches[0] ?? null;
  if (matches.length > 1) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Multiple task branches match ${opts.taskId}: ${matches.join(", ")}`,
    });
  }
  return null;
}

export async function loadTaskFromBranchSnapshot(opts: {
  ctx: CommandContext;
  taskId: string;
  readmePath: string;
  branch?: string | null;
}): Promise<TaskData | null> {
  if (!backendSupportsTaskBranchSnapshots(opts.ctx)) {
    return null;
  }

  const branch =
    typeof opts.branch === "string" && opts.branch.trim().length > 0
      ? opts.branch.trim()
      : await resolveTaskBranchFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  if (!branch) return null;

  const liveWorktreePath = await findWorktreeForBranch(opts.ctx.resolvedProject.gitRoot, branch);
  if (liveWorktreePath) {
    const liveReadmePath = path.join(
      liveWorktreePath,
      path.relative(opts.ctx.resolvedProject.gitRoot, opts.readmePath),
    );
    try {
      const liveText = await readFile(liveReadmePath, "utf8");
      const parsed = parseTaskReadme(liveText);
      const frontmatter = validateTaskReadmeFrontmatter(
        withTaskReadmeFrontmatterDefaults({
          ...parsed.frontmatter,
          id:
            typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
              ? parsed.frontmatter.id
              : opts.taskId,
        }),
      );
      return taskRecordToData({
        id: opts.taskId,
        frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
        body: parsed.body,
        readmePath: opts.readmePath,
      });
    } catch {
      // Fall back to the committed branch snapshot when the live worktree lacks the README.
    }
  }

  const relReadmePath = toGitPath(path.relative(opts.ctx.resolvedProject.gitRoot, opts.readmePath));

  const refsToTry = [branch, branch.startsWith("origin/") ? null : `origin/${branch}`].filter(
    (ref): ref is string => Boolean(ref && ref.trim().length > 0),
  );

  let text = "";
  let loaded = false;
  for (const ref of refsToTry) {
    try {
      text = await gitShowFile(opts.ctx.resolvedProject.gitRoot, ref, relReadmePath);
      loaded = true;
      break;
    } catch {
      // Try the next candidate ref.
    }
  }
  if (!loaded) return null;

  const parsed = parseTaskReadme(text);
  const frontmatter = validateTaskReadmeFrontmatter(
    withTaskReadmeFrontmatterDefaults({
      ...parsed.frontmatter,
      id:
        typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
          ? parsed.frontmatter.id
          : opts.taskId,
    }),
  );
  return taskRecordToData({
    id: opts.taskId,
    frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
    body: parsed.body,
    readmePath: opts.readmePath,
  });
}

export async function loadBackendTask(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  taskId: string;
}): Promise<{
  backend: CommandContext["taskBackend"];
  backendId: string;
  backendConfigPath: string;
  resolved: CommandContext["resolvedProject"];
  config: CommandContext["config"];
  task: TaskData;
}> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
  return {
    backend: ctx.taskBackend,
    backendId: ctx.backendId,
    backendConfigPath: ctx.backendConfigPath,
    resolved: ctx.resolvedProject,
    config: ctx.config,
    task,
  };
}

export async function writeTasksOrFallback(
  backend: Pick<TaskBackend, "writeTask" | "writeTasks">,
  tasks: readonly TaskData[],
): Promise<void> {
  if (tasks.length === 0) return;
  if (backend.writeTasks) {
    await backend.writeTasks([...tasks]);
    return;
  }
  for (const task of tasks) {
    await backend.writeTask(task);
  }
}

export async function listTaskSummariesMemo(ctx: CommandContext): Promise<TaskSummary[]> {
  ctx.memo.taskProjection ??= (async () => {
    if (ctx.taskBackend.capabilities?.projection_read_mode === "native") {
      if (!ctx.taskBackend.listProjectionTasks) {
        throw new CliError({
          exitCode: 1,
          code: "E_INTERNAL",
          message: `Backend ${ctx.taskBackend.id} advertises native projection reads but does not implement listProjectionTasks()`,
        });
      }
      return await ctx.taskBackend.listProjectionTasks();
    }
    const tasks = await ctx.taskBackend.listTasks();
    return tasks.map((task) => toTaskSummary(task));
  })();
  return await ctx.memo.taskProjection;
}

export async function listTaskProjection(ctx: CommandContext): Promise<TaskSummary[] | null> {
  if (ctx.taskBackend.capabilities?.projection_read_mode === "native") {
    return await listTaskSummariesMemo(ctx);
  }
  if (ctx.taskBackend.capabilities?.reads_from_projection_by_default) {
    return await listTaskSummariesMemo(ctx);
  }
  return null;
}

export async function exportTaskProjectionSnapshot(opts: {
  ctx: CommandContext;
  outputPath: string;
}): Promise<void> {
  if (opts.ctx.taskBackend.exportProjectionSnapshot) {
    await opts.ctx.taskBackend.exportProjectionSnapshot(opts.outputPath);
    return;
  }
  if (opts.ctx.taskBackend.exportTasksJson) {
    await opts.ctx.taskBackend.exportTasksJson(opts.outputPath);
    return;
  }
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: "Configured backend does not support exporting a task snapshot",
  });
}
