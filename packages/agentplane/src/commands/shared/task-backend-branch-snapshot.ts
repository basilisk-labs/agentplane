import { lstat } from "node:fs/promises";
import path from "node:path";

import {
  gitEnv,
  gitListTaskBranches,
  gitShowFile,
  gitRevParse,
  listWorktrees,
  parseTaskIdFromBranch,
  toGitPath,
} from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { taskKernel as k, parseTaskReadme, type TaskRecord } from "@agentplaneorg/core/tasks";
import {
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
} from "@agentplaneorg/core/schemas";

import {
  taskRecordToData,
  LocalBackend,
  toTaskSummary,
  type TaskData,
  type TaskSummary,
} from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import {
  TASK_KERNEL_EXTENSION,
  readKernelRecord,
} from "../../adapters/task-backend/kernel-record.js";
import {
  COMPLETED_SCOPE_ADMISSIONS,
  decodeCompletedScopeTask,
  transferCompletedScopePermit,
  type CompletedScopeSource,
} from "../../adapters/task-backend/completed-scope-admission.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { authenticateCompletedScopeSource } from "../task/completed-repair-scope-request.js";
import { resolveLogicalRepositoryIdentity } from "../task/execution-authority-context.js";
import { resolveCommandGitCommonDir, type CommandContext } from "./task-backend.js";

export async function readCompletedScopeCommandSource(
  command: CommandContext,
  taskId: string,
): Promise<CompletedScopeSource> {
  const root = command.resolvedProject.gitRoot;
  const readmePath = path.resolve(root, command.config.paths.workflow_dir, taskId, "README.md");
  const raw = await readContainedStableTextNoFollow({
    repository_root: root,
    file_path: readmePath,
    label: "completed scope Task",
    max_bytes: 64 * 1024 * 1024,
  });
  const task = decodeCompletedScopeTask(raw, readmePath, taskId);
  return {
    git_root: root,
    common_git_dir: await resolveCommandGitCommonDir(command),
    repository_identity: await resolveLogicalRepositoryIdentity({ git_root: root, task }),
    readme_path: readmePath,
    raw,
  };
}

function needsCompletedScopeAuthentication(task: TaskData): boolean {
  const record = task.extensions?.task_kernel as
    { aggregate?: { authority_lineage?: { observation?: { kind?: string } }[] } } | undefined;
  return (
    Object.hasOwn(task.extensions ?? {}, COMPLETED_SCOPE_ADMISSIONS) ||
    record?.aggregate?.authority_lineage?.some(
      (entry) => entry.observation?.kind === "prospective_scope_request",
    ) === true
  );
}
async function authenticateSource(
  ctx: CommandContext,
  task: TaskData,
  raw: string,
  readmePath: string,
  sourceRoot = ctx.resolvedProject.gitRoot,
) {
  if (!needsCompletedScopeAuthentication(task)) return task;
  try {
    const identity = await resolveLogicalRepositoryIdentity({
      git_root: sourceRoot,
      task,
    });
    await authenticateCompletedScopeSource(ctx, task, {
      git_root: sourceRoot,
      common_git_dir: await resolveCommandGitCommonDir(ctx),
      repository_identity: identity,
      raw,
      readme_path: readmePath,
    });
    const read = readKernelRecord(task, identity as k.Sha256Digest);
    if (read.kind !== "canonical")
      throw new Error(read.kind === "malformed" ? read.reason : read.kind);
    return task;
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Completed scope source authentication failed: ${error instanceof Error ? error.message : String(error)}`,
      context: { reason_code: "completed_scope_admission_unproven", task_id: task.id },
    });
  }
}

/** Preserve LocalBackend identity and authenticate each explicit raw source before exposing it. */
export function installCompletedScopeReaders(ctx: CommandContext) {
  const backend = ctx.taskBackend;
  if (!(backend instanceof LocalBackend)) return;
  const getTask = backend.getTask.bind(backend);
  const authenticate = async (task: TaskData | null) => {
    if (!task || !needsCompletedScopeAuthentication(task)) return task;
    let file = path.join(backend.root, task.id, "README.md");
    let sourceRoot = ctx.resolvedProject.gitRoot;
    try {
      await lstat(file);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT" || !backend.historyRoot) throw error;
      file = path.join(backend.historyRoot, task.id, "README.md");
      sourceRoot = path.resolve(backend.historyRoot, "../..");
    }
    const raw = await readContainedStableTextNoFollow({
      repository_root: sourceRoot,
      file_path: file,
      label: "completed scope source Task",
      max_bytes: 64 * 1024 * 1024,
    });
    return await authenticateSource(ctx, task, raw, file, sourceRoot);
  };
  backend.getTask = async (id) => await authenticate(await getTask(id));
  const list = backend.listTasksWithWarnings.bind(backend);
  backend.listTasksWithWarnings = async (opts) => {
    const result = await list(opts);
    return {
      ...result,
      tasks: await Promise.all(result.tasks.map(async (task) => (await authenticate(task))!)),
    };
  };
  const projection = backend.listProjectionTasks.bind(backend);
  backend.listProjectionTasks = async (opts) => {
    const summaries = await projection(opts);
    return await Promise.all(
      summaries.map(async (summary) => {
        if (!needsCompletedScopeAuthentication(summary)) return summary;
        const full = await authenticate(await getTask(summary.id));
        if (!full) throw new Error(`Completed scope source Task is missing: ${summary.id}`);
        return transferCompletedScopePermit(full, toTaskSummary(full));
      }),
    );
  };
}

/** A raw transactional copy needs its own source check before native metadata work. */
export async function authenticateTaskMetadataProjection(ctx: CommandContext, task: TaskData) {
  if (!Object.hasOwn(task.extensions ?? {}, COMPLETED_SCOPE_ADMISSIONS)) return task;
  const source = await ctx.taskBackend.getTask(task.id);
  if (!source || k.kernelDigest(source) !== k.kernelDigest(task))
    throw new CliError({
      code: "E_VALIDATION",
      message: "Completed scope metadata projection differs from its current authenticated source.",
    });
  return transferCompletedScopePermit(source, task);
}

function backendSupportsTaskBranchSnapshots(ctx: CommandContext): boolean {
  const capabilities = ctx.taskBackend?.capabilities;
  if (!capabilities) return ctx.backendId === "local";
  return capabilities.canonical_source === "local" && capabilities.writes_task_readmes === true;
}

async function loadTaskBranchInventory(ctx: CommandContext): Promise<{
  localBranches: string[];
  remoteBranches: string[];
}> {
  if (!ctx.memo.taskBranchInventory) {
    const prefix = ctx.config.branch.task_prefix;
    ctx.memo.taskBranchInventory = Promise.all([
      gitListTaskBranches(ctx.resolvedProject.gitRoot, prefix),
      listRemoteTaskBranches(ctx.resolvedProject.gitRoot, prefix),
    ]).then(([localBranches, remoteBranches]) => ({ localBranches, remoteBranches }));
  }
  return await ctx.memo.taskBranchInventory;
}

export async function resolveTaskBranchFromContext(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<string | null> {
  if (!backendSupportsTaskBranchSnapshots(opts.ctx)) {
    return null;
  }

  const prefix = opts.ctx.config.branch.task_prefix;
  const { localBranches, remoteBranches } = await loadTaskBranchInventory(opts.ctx);
  const matches = uniqueBranchCandidates([...localBranches, ...remoteBranches]).filter(
    (branch) => parseTaskIdFromBranch(prefix, stripOriginPrefix(branch)) === opts.taskId,
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

function normalizeBranch(branch: string): string {
  const withoutRemote = stripOriginPrefix(branch);
  return withoutRemote.startsWith("refs/heads/")
    ? withoutRemote.slice("refs/heads/".length)
    : withoutRemote;
}

export async function taskBranchHasLocalRef(opts: {
  ctx: CommandContext;
  branch: string;
}): Promise<boolean> {
  const { localBranches } = await loadTaskBranchInventory(opts.ctx);
  const expected = normalizeBranch(opts.branch);
  return localBranches.some((branch) => normalizeBranch(branch) === expected);
}

export async function resolveAuthoritativeTaskWorktree(opts: {
  ctx: CommandContext;
  taskId: string;
  branch: string;
  requireRegistration?: boolean;
}): Promise<{ path: string; branch: string } | null> {
  const expectedBranch = normalizeBranch(opts.branch);
  if (parseTaskIdFromBranch(opts.ctx.config.branch.task_prefix, expectedBranch) !== opts.taskId) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task branch ${expectedBranch} does not belong to ${opts.taskId}.`,
      context: {
        reason_code: "foreign_task_branch",
        task_id: opts.taskId,
        branch: expectedBranch,
      },
    });
  }

  opts.ctx.memo.taskWorktreeInventory ??= listWorktrees(opts.ctx.resolvedProject.gitRoot);
  const worktrees = await opts.ctx.memo.taskWorktreeInventory;
  const registrations = worktrees.filter(
    (entry) =>
      entry.branch !== null &&
      parseTaskIdFromBranch(opts.ctx.config.branch.task_prefix, entry.branch) === opts.taskId,
  );
  if (registrations.length > 1) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `Multiple worktrees are registered for task ${opts.taskId}: ` +
        registrations.map((entry) => entry.path).join(", "),
      context: {
        reason_code: "duplicate_task_worktree_registration",
        task_id: opts.taskId,
        worktrees: registrations.map((entry) => ({ path: entry.path, branch: entry.branch })),
      },
    });
  }

  const registration = registrations[0];
  if (!registration) {
    if (opts.requireRegistration) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Local task branch ${expectedBranch} has no registered authoritative worktree for ${opts.taskId}.`,
        context: {
          reason_code: "task_worktree_registration_missing",
          task_id: opts.taskId,
          branch: expectedBranch,
        },
      });
    }
    return null;
  }

  const registeredBranch = normalizeBranch(registration.branch!);
  if (registeredBranch !== expectedBranch) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task ${opts.taskId} is registered on ${registeredBranch}, not ${expectedBranch}.`,
      context: {
        reason_code: "task_worktree_branch_mismatch",
        task_id: opts.taskId,
        expected_branch: expectedBranch,
        registered_branch: registeredBranch,
        authoritative_worktree: registration.path,
      },
    });
  }
  return { path: registration.path, branch: registeredBranch };
}

function stripOriginPrefix(branch: string): string {
  return branch.startsWith("origin/") ? branch.slice("origin/".length) : branch;
}

function normalizeBranchPrefix(prefix: string): string {
  let start = 0;
  let end = prefix.length;
  while (start < end && prefix[start] === "/") start += 1;
  while (end > start && prefix[end - 1] === "/") end -= 1;
  return prefix.slice(start, end);
}

async function listRemoteTaskBranches(cwd: string, prefix: string): Promise<string[]> {
  const normalized = normalizeBranchPrefix(prefix);
  if (!normalized) return [];
  const remotePrefix = `origin/${normalized}`;
  const { stdout } = await execFileAsync(
    "git",
    ["for-each-ref", "--format=%(refname:short)", "refs/remotes/origin"],
    { cwd, env: gitEnv() },
  );
  return String(stdout)
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        (line === remotePrefix || line.startsWith(`${remotePrefix}/`)) && !line.endsWith("/HEAD"),
    );
}

function uniqueBranchCandidates(branches: string[]): string[] {
  const seen = new Set<string>();
  const candidates: string[] = [];
  for (const branch of branches) {
    const key = stripOriginPrefix(branch);
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push(key);
  }
  return candidates;
}

function taskDataFromReadmeText(opts: {
  taskId: string;
  readmePath: string;
  text: string;
}): TaskData {
  const parsed = parseTaskReadme(opts.text);
  const frontmatter = validateTaskReadmeFrontmatter(
    withTaskReadmeFrontmatterDefaults({
      ...parsed.frontmatter,
      id:
        typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
          ? parsed.frontmatter.id
          : opts.taskId,
    }),
  );
  if (frontmatter.id !== opts.taskId) {
    throw new Error(`Task branch README belongs to ${String(frontmatter.id)}, not ${opts.taskId}.`);
  }
  return taskRecordToData({
    id: opts.taskId,
    frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
    body: parsed.body,
    readmePath: opts.readmePath,
  });
}

export async function loadTaskFromBranchSnapshot(opts: {
  ctx: CommandContext;
  taskId: string;
  readmePath: string;
  branch?: string | null;
  requireWorktree?: boolean;
}): Promise<TaskData | null> {
  if (!backendSupportsTaskBranchSnapshots(opts.ctx)) {
    return null;
  }

  const branch =
    typeof opts.branch === "string" && opts.branch.trim().length > 0
      ? opts.branch.trim()
      : await resolveTaskBranchFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  if (!branch) return null;

  const localBranch = await taskBranchHasLocalRef({ ctx: opts.ctx, branch });
  const authoritativeWorktree = await resolveAuthoritativeTaskWorktree({
    ctx: opts.ctx,
    taskId: opts.taskId,
    branch,
    requireRegistration: localBranch && opts.requireWorktree !== false,
  });
  if (authoritativeWorktree) {
    const liveReadmePath = path.join(
      authoritativeWorktree.path,
      path.relative(opts.ctx.resolvedProject.gitRoot, opts.readmePath),
    );
    try {
      const liveText = await readContainedStableTextNoFollow({
        repository_root: authoritativeWorktree.path,
        file_path: liveReadmePath,
        label: "authoritative Task README",
        max_bytes: 64 * 1024 * 1024,
      });
      const task = taskDataFromReadmeText({
        taskId: opts.taskId,
        readmePath: opts.readmePath,
        text: liveText,
      });
      return await authenticateSource(
        opts.ctx,
        task,
        liveText,
        liveReadmePath,
        authoritativeWorktree.path,
      );
    } catch (error) {
      if (
        error instanceof CliError &&
        error.context?.reason_code === "completed_scope_admission_unproven"
      )
        throw error;
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message:
          `Authoritative task worktree ${authoritativeWorktree.path} does not contain a valid ` +
          `README for ${opts.taskId}.`,
        context: {
          reason_code: "authoritative_task_readme_unavailable",
          task_id: opts.taskId,
          branch: authoritativeWorktree.branch,
          authoritative_worktree: authoritativeWorktree.path,
          readme_path: liveReadmePath,
        },
      });
    }
  }

  const relReadmePath = toGitPath(path.relative(opts.ctx.resolvedProject.gitRoot, opts.readmePath));

  const expectedBranch = normalizeBranch(branch);
  const branchInventory = await loadTaskBranchInventory(opts.ctx);
  const refsToTry = [...branchInventory.localBranches, ...branchInventory.remoteBranches].filter(
    (ref, index, refs) => normalizeBranch(ref) === expectedBranch && refs.indexOf(ref) === index,
  );

  for (const ref of refsToTry) {
    let text: string;
    try {
      const commit = await gitRevParse(opts.ctx.resolvedProject.gitRoot, [`${ref}^{commit}`]);
      text = await gitShowFile(opts.ctx.resolvedProject.gitRoot, commit, relReadmePath);
    } catch {
      // Only unavailable Git candidates may fall back. Authentication failures are terminal.
      continue;
    }
    const task = taskDataFromReadmeText({
      taskId: opts.taskId,
      readmePath: opts.readmePath,
      text,
    });
    return await authenticateSource(opts.ctx, task, text, opts.readmePath);
  }
  return null;
}

/** Resolve canonical owner state and missing projections without copying task truth. */
export async function supplementTaskProjectionFromWorktrees(opts: {
  ctx: CommandContext;
  tasks: TaskSummary[];
  loadTask: (taskId: string, branch: string) => Promise<TaskData>;
}): Promise<TaskSummary[]> {
  if (!backendSupportsTaskBranchSnapshots(opts.ctx)) return opts.tasks;
  opts.ctx.memo.taskWorktreeInventory ??= listWorktrees(opts.ctx.resolvedProject.gitRoot);
  const worktrees = await opts.ctx.memo.taskWorktreeInventory;
  const ids = new Set(
    worktrees.flatMap((entry) => {
      const id = entry.branch
        ? parseTaskIdFromBranch(opts.ctx.config.branch.task_prefix, entry.branch)
        : null;
      return id ? [id] : [];
    }),
  );
  const tasks = new Map(opts.tasks.map((task) => [task.id, task]));
  for (const taskId of [...ids].toSorted()) {
    const known = tasks.get(taskId);
    const branch = await resolveTaskBranchFromContext({ ctx: opts.ctx, taskId });
    if (!branch) continue;
    const owner = await resolveAuthoritativeTaskWorktree({
      ctx: opts.ctx,
      taskId,
      branch,
      requireRegistration: true,
    });
    if (!owner) continue;
    const relativeReadme = path.join(opts.ctx.config.paths.workflow_dir, taskId, "README.md");
    const task = await opts.loadTask(taskId, branch);
    if (!task) continue;
    if (known && !Object.hasOwn(task.extensions ?? {}, TASK_KERNEL_EXTENSION)) continue;
    tasks.set(
      taskId,
      transferCompletedScopePermit(task, {
        ...toTaskSummary(task),
        extensions: {
          ...task.extensions,
          "agentplane.task_projection_source": {
            state: known ? "authoritative_worktree" : "local_projection_unavailable",
            readme_path: path.join(owner.path, relativeReadme),
          },
        },
      }),
    );
  }
  return [...tasks.values()];
}
