import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import {
  ensureDocSections,
  lintTasksFile,
  loadConfig,
  normalizeDocSectionName,
  parseDocSections,
  renderTaskReadme,
  resolveProject,
  setMarkdownSection,
  taskReadmePath,
  validateTaskDocMetadata,
  type AgentplaneConfig,
} from "@agentplaneorg/core";

import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { promptYesNo } from "../../cli/prompts.js";
import {
  backendNotSupportedMessage,
  infoMessage,
  invalidValueForFlag,
  invalidValueMessage,
  missingValueMessage,
  successMessage,
  unknownEntityMessage,
  usageMessage,
  warnMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadTaskBackend, type TaskBackend, type TaskData } from "../../backends/task-backend.js";
import { commitFromComment, gitStatusChangedPaths } from "../guard/index.js";
import {
  loadBackendTask,
  resolveDocUpdatedBy,
  taskDataToFrontmatter,
} from "../shared/task-backend.js";
import { gitRevParse } from "../shared/git-ops.js";
import {
  parsePrMeta,
  extractLastVerifiedSha,
  appendVerifyLog,
  runShellCommand,
  type PrMeta,
} from "../shared/pr-meta.js";
import { isPathWithin } from "../shared/path.js";

const execFileAsync = promisify(execFile);

type TaskNewFlags = {
  title?: string;
  description?: string;
  owner?: string;
  priority?: "low" | "normal" | "med" | "high";
  tags: string[];
  dependsOn: string[];
  verify: string[];
};

export const TASK_NEW_USAGE =
  "Usage: agentplane task new --title <text> --description <text> --priority <low|normal|med|high> --owner <id> --tag <tag> [--tag <tag>...]";
export const TASK_NEW_USAGE_EXAMPLE =
  'agentplane task new --title "Refactor CLI" --description "Improve CLI output" --priority med --owner CODER --tag cli';
export const TASK_ADD_USAGE =
  "Usage: agentplane task add <task-id> [<task-id> ...] --title <text> --description <text> --priority <low|normal|med|high> --owner <id> --tag <tag> [--tag <tag>...]";
export const TASK_ADD_USAGE_EXAMPLE =
  'agentplane task add 202602030608-F1Q8AB --title "..." --description "..." --priority med --owner CODER --tag cli';
export const TASK_SCRUB_USAGE =
  "Usage: agentplane task scrub --find <text> --replace <text> [flags]";
export const TASK_SCRUB_USAGE_EXAMPLE =
  'agentplane task scrub --find "agentctl" --replace "agentplane" --dry-run';
export const TASK_UPDATE_USAGE = "Usage: agentplane task update <task-id> [flags]";
export const TASK_UPDATE_USAGE_EXAMPLE =
  'agentplane task update 202602030608-F1Q8AB --title "..." --owner CODER';
export const TASK_SCAFFOLD_USAGE =
  "Usage: agentplane task scaffold <task-id> [--title <text>] [--overwrite] [--force]";
export const TASK_SCAFFOLD_USAGE_EXAMPLE = "agentplane task scaffold 202602030608-F1Q8AB";

function normalizeDependsOnInput(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "[]") return [];
  return [trimmed];
}

function parseTaskNewFlags(args: string[]): TaskNewFlags {
  const out: TaskNewFlags = { tags: [], dependsOn: [], verify: [] };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unexpected argument: ${arg}`,
      });
    }

    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }

    switch (arg) {
      case "--title": {
        out.title = next;
        break;
      }
      case "--description": {
        out.description = next;
        break;
      }
      case "--owner": {
        out.owner = next;
        break;
      }
      case "--priority": {
        out.priority = next as TaskNewFlags["priority"];
        break;
      }
      case "--tag": {
        out.tags.push(next);
        break;
      }
      case "--depends-on": {
        out.dependsOn.push(...normalizeDependsOnInput(next));
        break;
      }
      case "--verify": {
        out.verify.push(next);
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }

    i++;
  }

  return out;
}

export async function cmdTaskNew(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskNewFlags(opts.args);
  const priority = flags.priority ?? "med";

  if (!flags.title || !flags.description || !flags.owner || flags.tags.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_NEW_USAGE, TASK_NEW_USAGE_EXAMPLE),
    });
  }

  try {
    const { backend, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const suffixLength = config.tasks.id_suffix_length_default;
    if (!backend.generateTaskId) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: backendNotSupportedMessage("generateTaskId()"),
      });
    }
    const taskId = await backend.generateTaskId({ length: suffixLength, attempts: 1000 });
    const task: TaskData = {
      id: taskId,
      title: flags.title,
      description: flags.description,
      status: "TODO",
      priority,
      owner: flags.owner,
      tags: flags.tags,
      depends_on: flags.dependsOn,
      verify: flags.verify,
      comments: [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: flags.owner,
      id_source: "generated",
    };
    if (
      requiresVerify(flags.tags, config.tasks.verify.required_tags) &&
      flags.verify.length === 0
    ) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Missing verify commands for tasks with code/backend/frontend tags (use --verify)",
      });
    }
    await backend.writeTask(task);
    process.stdout.write(`${taskId}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task new", root: opts.rootOverride ?? null });
  }
}

type TaskAddFlags = {
  taskIds: string[];
  title: string;
  description: string;
  status: string;
  priority: string;
  owner: string;
  tags: string[];
  dependsOn: string[];
  verify: string[];
  commentAuthor?: string;
  commentBody?: string;
};

function parseTaskAddFlags(args: string[]): TaskAddFlags {
  const out: TaskAddFlags = {
    taskIds: [],
    title: "",
    description: "",
    status: "TODO",
    priority: "",
    owner: "",
    tags: [],
    dependsOn: [],
    verify: [],
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      out.taskIds.push(arg);
      continue;
    }
    const next = args[i + 1];
    if (arg === "--replace-tags" || arg === "--replace-depends-on" || arg === "--replace-verify") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_ADD_USAGE, TASK_ADD_USAGE_EXAMPLE),
      });
    }
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--title": {
        out.title = next;
        break;
      }
      case "--description": {
        out.description = next;
        break;
      }
      case "--status": {
        out.status = next;
        break;
      }
      case "--priority": {
        out.priority = next;
        break;
      }
      case "--owner": {
        out.owner = next;
        break;
      }
      case "--tag": {
        out.tags.push(next);
        break;
      }
      case "--depends-on": {
        out.dependsOn.push(...normalizeDependsOnInput(next));
        break;
      }
      case "--verify": {
        out.verify.push(next);
        break;
      }
      case "--comment-author": {
        out.commentAuthor = next;
        break;
      }
      case "--comment-body": {
        out.commentBody = next;
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }
    i++;
  }
  return out;
}

export async function cmdTaskAdd(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskAddFlags(opts.args);
  if (
    flags.taskIds.length === 0 ||
    !flags.title ||
    !flags.description ||
    !flags.priority ||
    !flags.owner ||
    flags.tags.length === 0
  ) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_ADD_USAGE, TASK_ADD_USAGE_EXAMPLE),
    });
  }

  try {
    const { backend, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const status = normalizeTaskStatus(flags.status);
    const existing = await backend.listTasks();
    const existingIds = new Set(existing.map((task) => task.id));
    for (const taskId of flags.taskIds) {
      if (existingIds.has(taskId)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task already exists: ${taskId}`,
        });
      }
    }

    const tags = dedupeStrings(flags.tags);
    const dependsOn = dedupeStrings(flags.dependsOn);
    const verify = dedupeStrings(flags.verify);
    const docUpdatedBy = (flags.commentAuthor ?? "").trim() || flags.owner;
    if (requiresVerify(tags, config.tasks.verify.required_tags) && verify.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "verify commands are required for tasks with code/backend/frontend tags",
      });
    }

    const tasks: TaskData[] = flags.taskIds.map((taskId) => ({
      id: taskId,
      title: flags.title,
      description: flags.description,
      status,
      priority: flags.priority,
      owner: flags.owner,
      tags,
      depends_on: dependsOn,
      verify,
      comments:
        flags.commentAuthor && flags.commentBody
          ? [{ author: flags.commentAuthor, body: flags.commentBody }]
          : [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: docUpdatedBy,
      id_source: "explicit",
    }));
    if (backend.writeTasks) {
      await backend.writeTasks(tasks);
    } else {
      for (const task of tasks) {
        await backend.writeTask(task);
      }
    }
    for (const task of tasks) {
      process.stdout.write(`${task.id}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task add", root: opts.rootOverride ?? null });
  }
}

type TaskUpdateFlags = {
  taskId: string;
  title?: string;
  description?: string;
  priority?: string;
  owner?: string;
  tags: string[];
  replaceTags: boolean;
  dependsOn: string[];
  replaceDependsOn: boolean;
  verify: string[];
  replaceVerify: boolean;
};

function parseTaskUpdateFlags(args: string[]): TaskUpdateFlags {
  const [taskId, ...rest] = args;
  if (!taskId) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_UPDATE_USAGE, TASK_UPDATE_USAGE_EXAMPLE),
    });
  }
  const out: TaskUpdateFlags = {
    taskId,
    tags: [],
    replaceTags: false,
    dependsOn: [],
    replaceDependsOn: false,
    verify: [],
    replaceVerify: false,
  };

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (!arg) continue;
    if (arg === "--replace-tags") {
      out.replaceTags = true;
      continue;
    }
    if (arg === "--replace-depends-on") {
      out.replaceDependsOn = true;
      continue;
    }
    if (arg === "--replace-verify") {
      out.replaceVerify = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_UPDATE_USAGE, TASK_UPDATE_USAGE_EXAMPLE),
      });
    }
    const next = rest[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--title": {
        out.title = next;
        break;
      }
      case "--description": {
        out.description = next;
        break;
      }
      case "--priority": {
        out.priority = next;
        break;
      }
      case "--owner": {
        out.owner = next;
        break;
      }
      case "--tag": {
        out.tags.push(next);
        break;
      }
      case "--depends-on": {
        out.dependsOn.push(...normalizeDependsOnInput(next));
        break;
      }
      case "--verify": {
        out.verify.push(next);
        break;
      }
      default: {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Unknown flag: ${arg}`,
        });
      }
    }
    i++;
  }
  return out;
}

export async function cmdTaskUpdate(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskUpdateFlags(opts.args);
  try {
    const { backend, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const task = await backend.getTask(flags.taskId);
    if (!task) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("task id", flags.taskId),
      });
    }
    const next: TaskData = { ...task };
    if (flags.title !== undefined) next.title = flags.title;
    if (flags.description !== undefined) next.description = flags.description;
    if (flags.priority !== undefined) next.priority = flags.priority;
    if (flags.owner !== undefined) next.owner = flags.owner;

    const existingTags = flags.replaceTags ? [] : dedupeStrings(toStringArray(next.tags));
    const mergedTags = dedupeStrings([...existingTags, ...flags.tags]);
    next.tags = mergedTags;

    const existingDepends = flags.replaceDependsOn
      ? []
      : dedupeStrings(toStringArray(next.depends_on));
    const mergedDepends = dedupeStrings([...existingDepends, ...flags.dependsOn]);
    next.depends_on = mergedDepends;

    const existingVerify = flags.replaceVerify ? [] : dedupeStrings(toStringArray(next.verify));
    const mergedVerify = dedupeStrings([...existingVerify, ...flags.verify]);
    next.verify = mergedVerify;

    if (
      requiresVerify(mergedTags, config.tasks.verify.required_tags) &&
      mergedVerify.length === 0
    ) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "verify commands are required for tasks with code/backend/frontend tags",
      });
    }

    await backend.writeTask(next);
    process.stdout.write(`${successMessage("updated", flags.taskId)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task update", root: opts.rootOverride ?? null });
  }
}

type TaskScrubFlags = {
  find: string;
  replace: string;
  dryRun: boolean;
  quiet: boolean;
};

function parseTaskScrubFlags(args: string[]): TaskScrubFlags {
  const out: TaskScrubFlags = {
    find: "",
    replace: "",
    dryRun: false,
    quiet: false,
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--dry-run") {
      out.dryRun = true;
      continue;
    }
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_SCRUB_USAGE, TASK_SCRUB_USAGE_EXAMPLE),
      });
    }
    const next = args[i + 1];
    if (!next)
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    if (arg === "--find") {
      out.find = next;
    } else if (arg === "--replace") {
      out.replace = next;
    } else {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
    }
    i++;
  }
  return out;
}

function scrubValue(value: unknown, find: string, replace: string): unknown {
  if (typeof value === "string") return value.replaceAll(find, replace);
  if (Array.isArray(value)) return value.map((item) => scrubValue(item, find, replace));
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    const out: Record<string, unknown> = {};
    for (const [key, val] of entries) {
      out[key] = scrubValue(val, find, replace);
    }
    return out;
  }
  return value;
}

export async function cmdTaskScrub(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskScrubFlags(opts.args);
  if (!flags.find) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_SCRUB_USAGE, TASK_SCRUB_USAGE_EXAMPLE),
    });
  }
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const updated: TaskData[] = [];
    const changedIds = new Set<string>();
    for (const task of tasks) {
      const before = JSON.stringify(task);
      const scrubbed = scrubValue(task, flags.find, flags.replace);
      if (scrubbed && typeof scrubbed === "object") {
        const next = scrubbed as TaskData;
        updated.push(next);
        const after = JSON.stringify(next);
        if (before !== after) changedIds.add(next.id);
      } else {
        updated.push(task);
      }
    }
    if (flags.dryRun) {
      if (!flags.quiet) {
        process.stdout.write(
          `${infoMessage(`dry-run: would update ${changedIds.size} task(s)`)}` + "\n",
        );
        for (const id of [...changedIds].toSorted()) {
          process.stdout.write(`${id}\n`);
        }
      }
      return 0;
    }
    if (backend.writeTasks) {
      await backend.writeTasks(updated);
    } else {
      for (const task of updated) {
        await backend.writeTask(task);
      }
    }
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("updated tasks", undefined, `count=${changedIds.size}`)}` + "\n",
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task scrub", root: opts.rootOverride ?? null });
  }
}

type TaskListFilters = {
  status: string[];
  owner: string[];
  tag: string[];
  limit?: number;
  quiet: boolean;
};

function parseTaskListFilters(args: string[], opts?: { allowLimit?: boolean }): TaskListFilters {
  const out: TaskListFilters = { status: [], owner: [], tag: [], quiet: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--status") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--status"),
        });
      out.status.push(next);
      i++;
      continue;
    }
    if (arg === "--owner") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--owner"),
        });
      out.owner.push(next);
      i++;
      continue;
    }
    if (arg === "--tag") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage("--tag") });
      out.tag.push(next);
      i++;
      continue;
    }
    if (opts?.allowLimit && arg === "--limit") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--limit"),
        });
      const parsed = Number.parseInt(next, 10);
      if (!Number.isFinite(parsed)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: invalidValueForFlag("--limit", next, "integer"),
        });
      }
      out.limit = parsed;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
    }
  }
  return out;
}

export async function cmdTaskListWithFilters(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const filters = parseTaskListFilters(opts.args);
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const depState = buildDependencyState(tasks);
    let filtered = tasks;
    if (filters.status.length > 0) {
      const wanted = new Set(filters.status.map((s) => s.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.status || "TODO").toUpperCase()));
    }
    if (filters.owner.length > 0) {
      const wanted = new Set(filters.owner.map((o) => o.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.owner || "").toUpperCase()));
    }
    if (filters.tag.length > 0) {
      const wanted = new Set(filters.tag.map((t) => t.trim()).filter(Boolean));
      filtered = filtered.filter((task) => {
        const tags = dedupeStrings(toStringArray(task.tags));
        return tags.some((tag) => wanted.has(tag));
      });
    }
    const sorted = filtered.toSorted((a, b) => a.id.localeCompare(b.id));
    for (const task of sorted) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    if (!filters.quiet) {
      const counts: Record<string, number> = {};
      for (const task of sorted) {
        const status = String(task.status || "TODO").toUpperCase();
        counts[status] = (counts[status] ?? 0) + 1;
      }
      const total = sorted.length;
      const summary = Object.keys(counts)
        .toSorted()
        .map((key) => `${key}=${counts[key]}`)
        .join(", ");
      process.stdout.write(`Total: ${total}${summary ? ` (${summary})` : ""}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task list", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskNext(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const filters = parseTaskListFilters(opts.args, { allowLimit: true });
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const depState = buildDependencyState(tasks);
    const statuses =
      filters.status.length > 0
        ? new Set(filters.status.map((s) => s.trim().toUpperCase()))
        : new Set(["TODO"]);
    let filtered = tasks.filter((task) =>
      statuses.has(String(task.status || "TODO").toUpperCase()),
    );
    if (filters.owner.length > 0) {
      const wanted = new Set(filters.owner.map((o) => o.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.owner || "").toUpperCase()));
    }
    if (filters.tag.length > 0) {
      const wanted = new Set(filters.tag.map((t) => t.trim()).filter(Boolean));
      filtered = filtered.filter((task) => {
        const tags = dedupeStrings(toStringArray(task.tags));
        return tags.some((tag) => wanted.has(tag));
      });
    }
    const sorted = filtered.toSorted((a, b) => a.id.localeCompare(b.id));
    const ready = sorted.filter((task) => {
      const dep = depState.get(task.id);
      return !dep || (dep.missing.length === 0 && dep.incomplete.length === 0);
    });
    const limited =
      filters.limit !== undefined && filters.limit >= 0 ? ready.slice(0, filters.limit) : ready;
    for (const task of limited) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    if (!filters.quiet) {
      process.stdout.write(`Ready: ${limited.length} / ${filtered.length}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task next", root: opts.rootOverride ?? null });
  }
}

export async function cmdReady(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const depState = buildDependencyState(tasks);
    const task = tasks.find((item) => item.id === opts.taskId);
    const warnings: string[] = [];
    if (task) {
      const dep = depState.get(task.id);
      const missing = dep?.missing ?? [];
      const incomplete = dep?.incomplete ?? [];
      if (missing.length > 0) {
        warnings.push(`${task.id}: missing deps: ${missing.join(", ")}`);
      }
      if (incomplete.length > 0) {
        warnings.push(`${task.id}: incomplete deps: ${incomplete.join(", ")}`);
      }
    } else {
      warnings.push(unknownEntityMessage("task id", opts.taskId));
    }

    for (const warning of warnings) {
      process.stdout.write(`${warnMessage(warning)}\n`);
    }

    if (task) {
      const status = String(task.status || "TODO").toUpperCase();
      const title = task.title?.trim() || "(untitled task)";
      const owner = task.owner?.trim() || "-";
      const dep = depState.get(task.id);
      const dependsOn = dep?.dependsOn ?? [];
      process.stdout.write(`Task: ${task.id} [${status}] ${title}\n`);
      process.stdout.write(`Owner: ${owner}\n`);
      process.stdout.write(`Depends on: ${dependsOn.length > 0 ? dependsOn.join(", ") : "-"}\n`);
      const missing = dep?.missing ?? [];
      const incomplete = dep?.incomplete ?? [];
      if (missing.length > 0) {
        process.stdout.write(`${warnMessage(`missing deps: ${missing.join(", ")}`)}\n`);
      }
      if (incomplete.length > 0) {
        process.stdout.write(`${warnMessage(`incomplete deps: ${incomplete.join(", ")}`)}\n`);
      }
    }

    const ready = warnings.length === 0;
    process.stdout.write(`${ready ? successMessage("ready") : warnMessage("not ready")}` + "\n");
    return ready ? 0 : 2;
  } catch (err) {
    throw mapBackendError(err, { command: "ready", root: opts.rootOverride ?? null });
  }
}

function taskTextBlob(task: TaskData): string {
  const parts: string[] = [];
  for (const key of ["id", "title", "description", "status", "priority", "owner"] as const) {
    const value = (task as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) parts.push(value.trim());
  }
  const tags = toStringArray(task.tags);
  parts.push(...tags.filter(Boolean));
  const comments = Array.isArray(task.comments) ? task.comments : [];
  for (const comment of comments) {
    if (comment && typeof comment.author === "string") parts.push(comment.author);
    if (comment && typeof comment.body === "string") parts.push(comment.body);
  }
  const commit = task.commit ?? null;
  if (commit && typeof commit.hash === "string") parts.push(commit.hash);
  if (commit && typeof commit.message === "string") parts.push(commit.message);
  return parts.join("\n");
}

export async function cmdTaskSearch(opts: {
  cwd: string;
  rootOverride?: string;
  query: string;
  args: string[];
}): Promise<number> {
  const query = opts.query.trim();
  if (!query) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Missing query (expected non-empty text)",
    });
  }
  let regex = false;
  const restArgs = [...opts.args];
  if (restArgs.includes("--regex")) {
    regex = true;
    restArgs.splice(restArgs.indexOf("--regex"), 1);
  }
  const filters = parseTaskListFilters(restArgs, { allowLimit: true });
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const depState = buildDependencyState(tasks);
    let filtered = tasks;
    if (filters.status.length > 0) {
      const wanted = new Set(filters.status.map((s) => s.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.status || "TODO").toUpperCase()));
    }
    if (filters.owner.length > 0) {
      const wanted = new Set(filters.owner.map((o) => o.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.owner || "").toUpperCase()));
    }
    if (filters.tag.length > 0) {
      const wanted = new Set(filters.tag.map((t) => t.trim()).filter(Boolean));
      filtered = filtered.filter((task) => {
        const tags = dedupeStrings(toStringArray(task.tags));
        return tags.some((tag) => wanted.has(tag));
      });
    }
    let matches: TaskData[] = [];
    if (regex) {
      let pattern: RegExp;
      try {
        pattern = new RegExp(query, "i");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid regex";
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: invalidValueMessage("regex", message, "valid pattern"),
        });
      }
      matches = filtered.filter((task) => pattern.test(taskTextBlob(task)));
    } else {
      const needle = query.toLowerCase();
      matches = filtered.filter((task) => taskTextBlob(task).toLowerCase().includes(needle));
    }
    if (filters.limit !== undefined && filters.limit >= 0) {
      matches = matches.slice(0, filters.limit);
    }
    const sorted = matches.toSorted((a, b) => a.id.localeCompare(b.id));
    for (const task of sorted) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task search", root: opts.rootOverride ?? null });
  }
}

type TaskScaffoldFlags = {
  taskId: string;
  title?: string;
  overwrite: boolean;
  force: boolean;
  quiet: boolean;
};

function parseTaskScaffoldFlags(args: string[]): TaskScaffoldFlags {
  const [taskId, ...rest] = args;
  if (!taskId) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_SCAFFOLD_USAGE, TASK_SCAFFOLD_USAGE_EXAMPLE),
    });
  }
  const out: TaskScaffoldFlags = { taskId, overwrite: false, force: false, quiet: false };
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (!arg) continue;
    if (arg === "--overwrite") {
      out.overwrite = true;
      continue;
    }
    if (arg === "--force") {
      out.force = true;
      continue;
    }
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--title") {
      const next = rest[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--title"),
        });
      out.title = next;
      i++;
      continue;
    }
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown flag: ${arg}`,
    });
  }
  return out;
}

export async function cmdTaskScaffold(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskScaffoldFlags(opts.args);
  try {
    const { backend, resolved, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const task = await backend.getTask(flags.taskId);
    if (!task && !flags.force) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("task id", flags.taskId),
      });
    }
    const readmePath = taskReadmePath(
      path.join(resolved.gitRoot, config.paths.workflow_dir),
      flags.taskId,
    );
    try {
      await readFile(readmePath, "utf8");
      if (!flags.overwrite) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `File already exists: ${readmePath}`,
        });
      }
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      if (code !== "ENOENT") {
        if (err instanceof CliError) throw err;
        throw err;
      }
    }

    const baseTask: TaskData =
      task ??
      ({
        id: flags.taskId,
        title: flags.title ?? "",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "",
        depends_on: [],
        tags: [],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: nowIso(),
        doc_updated_by: "UNKNOWN",
      } satisfies TaskData);
    if (flags.title) baseTask.title = flags.title;
    if (
      typeof baseTask.doc_updated_by !== "string" ||
      baseTask.doc_updated_by.trim().length === 0 ||
      baseTask.doc_updated_by.trim().toLowerCase() === "agentplane"
    ) {
      baseTask.doc_updated_by = baseTask.owner?.trim() ? baseTask.owner : "UNKNOWN";
    }

    const frontmatter = taskDataToFrontmatter(baseTask);
    const body = ensureDocSections("", config.tasks.doc.required_sections);
    const text = renderTaskReadme(frontmatter, body);
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeFile(readmePath, text.endsWith("\n") ? text : `${text}\n`, "utf8");
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("wrote", path.relative(resolved.gitRoot, readmePath))}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task scaffold", root: opts.rootOverride ?? null });
  }
}

type TaskNormalizeFlags = { quiet: boolean; force: boolean };

function parseTaskNormalizeFlags(args: string[]): TaskNormalizeFlags {
  const out: TaskNormalizeFlags = { quiet: false, force: false };
  for (const arg of args) {
    if (!arg) continue;
    if (arg === "--quiet") out.quiet = true;
    else if (arg === "--force") out.force = true;
    else if (arg.startsWith("--"))
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
  }
  return out;
}

export async function cmdTaskNormalize(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskNormalizeFlags(opts.args);
  if (flags.force) {
    // Force is accepted for parity; no additional checks in node CLI.
  }
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    if (backend.writeTasks) {
      await backend.writeTasks(tasks);
    } else {
      for (const task of tasks) await backend.writeTask(task);
    }
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("normalized tasks", undefined, `count=${tasks.length}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task normalize", root: opts.rootOverride ?? null });
  }
}

type TaskMigrateFlags = { source?: string; quiet: boolean; force: boolean };

function parseTaskMigrateFlags(args: string[]): TaskMigrateFlags {
  const out: TaskMigrateFlags = { quiet: false, force: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--force") {
      out.force = true;
      continue;
    }
    if (arg === "--source") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--source"),
        });
      out.source = next;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
    }
  }
  return out;
}

export async function cmdTaskMigrate(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskMigrateFlags(opts.args);
  if (flags.force) {
    // Force is accepted for parity; no additional checks in node CLI.
  }
  try {
    const { backend, resolved, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const source = flags.source ?? config.paths.tasks_path;
    const sourcePath = path.join(resolved.gitRoot, source);
    const raw = await readFile(sourcePath, "utf8");
    const parsed = JSON.parse(raw) as { tasks?: TaskData[] };
    const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
    if (backend.writeTasks) {
      await backend.writeTasks(tasks);
    } else {
      for (const task of tasks) await backend.writeTask(task);
    }
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("migrated tasks into backend", undefined, `count=${tasks.length}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task migrate", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskComment(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
}): Promise<number> {
  try {
    const { backend, task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
    const existing = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    const next: TaskData = {
      ...task,
      comments: [...existing, { author: opts.author, body: opts.body }],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: opts.author,
    };
    await backend.writeTask(next);
    process.stdout.write(`${successMessage("commented", opts.taskId)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task comment", root: opts.rootOverride ?? null });
  }
}

async function readCommitInfo(
  cwd: string,
  rev: string,
): Promise<{ hash: string; message: string }> {
  const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H:%s", rev], { cwd });
  const trimmed = stdout.trim();
  const [hash, message] = trimmed.split(":", 2);
  if (!hash || !message) {
    throw new Error("Unable to read git commit");
  }
  return { hash, message };
}

function defaultCommitEmojiForStatus(status: string): string {
  const normalized = status.trim().toUpperCase();
  if (normalized === "DOING") return "🚧";
  if (normalized === "DONE") return "✅";
  if (normalized === "BLOCKED") return "⛔";
  return "🧩";
}

export async function cmdTaskSetStatus(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  status: string;
  author?: string;
  body?: string;
  commit?: string;
  force: boolean;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  quiet: boolean;
}): Promise<number> {
  const nextStatus = normalizeTaskStatus(opts.status);
  if (nextStatus === "DONE" && !opts.force) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Use `agentplane finish` to mark DONE (use --force to override)",
    });
  }
  if ((opts.author && !opts.body) || (opts.body && !opts.author)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--author and --body must be provided together",
    });
  }

  try {
    const { backend, task, config, resolved } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
    if (opts.commitFromComment) {
      enforceStatusCommitPolicy({
        policy: config.status_commit_policy,
        action: "task set-status",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }

    const currentStatus = String(task.status || "TODO").toUpperCase();
    if (!opts.force && !isTransitionAllowed(currentStatus, nextStatus)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Refusing status transition ${currentStatus} -> ${nextStatus} (use --force to override)`,
      });
    }

    if (!opts.force && (nextStatus === "DOING" || nextStatus === "DONE")) {
      const allTasks = await backend.listTasks();
      const depState = buildDependencyState(allTasks);
      const dep = depState.get(task.id);
      if (dep && (dep.missing.length > 0 || dep.incomplete.length > 0)) {
        if (!opts.quiet) {
          if (dep.missing.length > 0) {
            process.stderr.write(`${warnMessage(`missing deps: ${dep.missing.join(", ")}`)}\n`);
          }
          if (dep.incomplete.length > 0) {
            process.stderr.write(
              `${warnMessage(`incomplete deps: ${dep.incomplete.join(", ")}`)}\n`,
            );
          }
        }
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task is not ready: ${task.id} (use --force to override)`,
        });
      }
    }

    const existingComments = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    let comments = existingComments;
    if (opts.author && opts.body) {
      const commentBody = opts.commitFromComment
        ? formatCommentBodyForCommit(opts.body, config)
        : opts.body;
      comments = [...existingComments, { author: opts.author, body: commentBody }];
    }

    const next: TaskData = {
      ...task,
      status: nextStatus,
      comments,
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: resolveDocUpdatedBy(task, opts.author),
    };
    if (opts.commit) {
      const commitInfo = await readCommitInfo(resolved.gitRoot, opts.commit);
      next.commit = { hash: commitInfo.hash, message: commitInfo.message };
    }
    await backend.writeTask(next);

    // tasks.json is export-only; generated via `agentplane task export`.

    if (opts.commitFromComment) {
      if (!opts.body) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "--body is required when using --commit-from-comment",
        });
      }
      await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, config),
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus(nextStatus),
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config,
      });
    }

    if (!opts.quiet) {
      process.stdout.write(`${successMessage("status", opts.taskId, `next=${nextStatus}`)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task set-status", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskShow(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const { task, backendId } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const frontmatter = taskDataToFrontmatter(task);
    if (backendId === "local") {
      const metadataErrors = validateTaskDocMetadata(frontmatter);
      if (metadataErrors.length > 0) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Invalid task README metadata: ${metadataErrors.join("; ")}`,
        });
      }
    }
    process.stdout.write(`${JSON.stringify(frontmatter, null, 2)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task show",
      root: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
  }
}

export async function cmdTaskList(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  return await cmdTaskListWithFilters(opts);
}

export async function cmdTaskExport(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const { backend, resolved, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const outPath = path.join(resolved.gitRoot, config.paths.tasks_path);
    if (!backend.exportTasksJson) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: backendNotSupportedMessage("exportTasksJson()"),
      });
    }
    await backend.exportTasksJson(outPath);
    process.stdout.write(`${path.relative(resolved.gitRoot, outPath)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task export", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskLint(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const result = await lintTasksFile({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
    if (result.errors.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: result.errors.join("\n"),
      });
    }
    process.stdout.write("OK\n");
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "task lint", root: opts.rootOverride ?? null });
  }
}

export const START_USAGE = "Usage: agentplane start <task-id> --author <id> --body <text> [flags]";
export const START_USAGE_EXAMPLE =
  'agentplane start 202602030608-F1Q8AB --author CODER --body "Start: ..."';
export const BLOCK_USAGE = "Usage: agentplane block <task-id> --author <id> --body <text> [flags]";
export const BLOCK_USAGE_EXAMPLE =
  'agentplane block 202602030608-F1Q8AB --author CODER --body "Blocked: ..."';
export const FINISH_USAGE =
  "Usage: agentplane finish <task-id> [<task-id>...] --author <id> --body <text> [flags]";
export const FINISH_USAGE_EXAMPLE =
  'agentplane finish 202602030608-F1Q8AB --author INTEGRATOR --body "Verified: ..."';
export const VERIFY_USAGE =
  "Usage: agentplane verify <task-id> [--cwd <path>] [--log <path>] [--skip-if-unchanged] [--quiet] [--require] [--yes]";
export const VERIFY_USAGE_EXAMPLE = "agentplane verify 202602030608-F1Q8AB";

function nowIso(): string {
  return new Date().toISOString();
}

const ALLOWED_TASK_STATUSES = new Set(["TODO", "DOING", "DONE", "BLOCKED"]);

type DependencyState = {
  dependsOn: string[];
  missing: string[];
  incomplete: string[];
};

function normalizeTaskStatus(value: string): string {
  const normalized = value.trim().toUpperCase();
  if (!ALLOWED_TASK_STATUSES.has(normalized)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: invalidValueMessage(
        "status",
        value,
        `one of ${[...ALLOWED_TASK_STATUSES].join(", ")}`,
      ),
    });
  }
  return normalized;
}

export function dedupeStrings(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const trimmed = item.trim();
    if (!trimmed) continue;
    if (seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out;
}

function extractDocSection(doc: string, sectionName: string): string | null {
  const target = normalizeDocSectionName(sectionName);
  if (!target) return null;
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  let capturing = false;
  const out: string[] = [];

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      const key = normalizeDocSectionName(match[1] ?? "");
      if (capturing) break;
      capturing = key === target;
      continue;
    }
    if (capturing) out.push(line);
  }

  if (!capturing) return null;
  return out.join("\n").trimEnd();
}

function stripListMarker(line: string): string {
  return line.replace(/^(?:[-*]|\d+\.)\s+/, "");
}

function parseVerifyStepsFromDoc(doc: string): { commands: string[]; steps: string[] } {
  const section = extractDocSection(doc, "Verify Steps");
  if (!section) return { commands: [], steps: [] };

  const commands: string[] = [];
  const steps: string[] = [];
  const lines = section.split("\n");
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const normalized = stripListMarker(trimmed);
    const lower = normalized.toLowerCase();
    if (lower.startsWith("cmd:")) {
      const command = normalized.slice(4).trim();
      if (command) commands.push(command);
      continue;
    }
    steps.push(normalized);
  }

  return { commands, steps };
}

function renderVerificationSection(opts: {
  status: "pass" | "fail";
  verifiedAt: string;
  verifiedSha?: string | null;
  commands: string[];
  steps: string[];
  details?: string | null;
}): string {
  const lines = [
    `Status: ${opts.status}`,
    `Verified at: ${opts.verifiedAt}`,
    ...(opts.verifiedSha ? [`Verified sha: ${opts.verifiedSha}`] : []),
    ...(opts.commands.length > 0
      ? ["", "Commands:", ...opts.commands.map((command) => `- ${command}`)]
      : []),
    ...(opts.steps.length > 0
      ? ["", "Manual steps:", ...opts.steps.map((step) => `- ${step}`)]
      : []),
    ...(opts.details ? ["", `Details: ${opts.details}`] : []),
  ];
  return lines.join("\n");
}

async function writeVerificationSection(opts: {
  backend: TaskBackend;
  taskId: string;
  config: AgentplaneConfig;
  baseDoc: string;
  content: string;
  updatedBy: string;
}): Promise<void> {
  if (!opts.backend.getTaskDoc || !opts.backend.setTaskDoc) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage("task docs"),
    });
  }
  const baseDoc = ensureDocSections(opts.baseDoc ?? "", opts.config.tasks.doc.required_sections);
  const nextDoc = setMarkdownSection(baseDoc, "Verification", opts.content);
  const normalized = ensureDocSections(nextDoc, opts.config.tasks.doc.required_sections);
  await opts.backend.setTaskDoc(opts.taskId, normalized, opts.updatedBy);
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim());
}

function requiresVerify(tags: string[], requiredTags: string[]): boolean {
  const required = new Set(requiredTags.map((tag) => tag.trim().toLowerCase()).filter(Boolean));
  if (required.size === 0) return false;
  return tags.some((tag) => required.has(tag.trim().toLowerCase()));
}

function buildDependencyState(tasks: TaskData[]): Map<string, DependencyState> {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const state = new Map<string, DependencyState>();
  for (const task of tasks) {
    const dependsOn = dedupeStrings(toStringArray(task.depends_on));
    const missing: string[] = [];
    const incomplete: string[] = [];
    for (const depId of dependsOn) {
      const dep = byId.get(depId);
      if (!dep) {
        missing.push(depId);
        continue;
      }
      const status = String(dep.status || "TODO").toUpperCase();
      if (status !== "DONE") {
        incomplete.push(depId);
      }
    }
    state.set(task.id, { dependsOn, missing, incomplete });
  }
  return state;
}

function formatDepsSummary(dep: DependencyState | undefined): string | null {
  if (!dep) return null;
  if (dep.dependsOn.length === 0) return "deps=none";
  if (dep.missing.length === 0 && dep.incomplete.length === 0) return "deps=ready";
  const parts: string[] = [];
  if (dep.missing.length > 0) {
    parts.push(`missing:${dep.missing.join(",")}`);
  }
  if (dep.incomplete.length > 0) {
    parts.push(`wait:${dep.incomplete.join(",")}`);
  }
  return `deps=${parts.join(",")}`;
}

function formatTaskLine(task: TaskData, depState?: DependencyState): string {
  const status = String(task.status || "TODO").toUpperCase();
  const title = task.title?.trim() || "(untitled task)";
  const extras: string[] = [];
  if (task.owner?.trim()) extras.push(`owner=${task.owner.trim()}`);
  if (task.priority !== undefined && String(task.priority).trim()) {
    extras.push(`prio=${String(task.priority).trim()}`);
  }
  const depsSummary = formatDepsSummary(depState);
  if (depsSummary) extras.push(depsSummary);
  const tags = dedupeStrings(toStringArray(task.tags));
  if (tags.length > 0) extras.push(`tags=${tags.join(",")}`);
  const verify = dedupeStrings(toStringArray(task.verify));
  if (verify.length > 0) extras.push(`verify=${verify.length}`);
  const suffix = extras.length > 0 ? ` (${extras.join(", ")})` : "";
  return `${task.id} [${status}] ${title}${suffix}`;
}

function isTransitionAllowed(current: string, next: string): boolean {
  if (current === next) return true;
  if (current === "TODO") return next === "DOING" || next === "BLOCKED";
  if (current === "DOING") return next === "DONE" || next === "BLOCKED";
  if (current === "BLOCKED") return next === "TODO" || next === "DOING";
  if (current === "DONE") return false;
  return false;
}

function requireStructuredComment(body: string, prefix: string, minChars: number): void {
  const normalized = body.trim();
  if (!normalized.toLowerCase().startsWith(prefix.toLowerCase())) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Comment body must start with ${prefix}`,
    });
  }
  if (normalized.length < minChars) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Comment body must be at least ${minChars} characters`,
    });
  }
}

async function readHeadCommit(cwd: string): Promise<{ hash: string; message: string }> {
  const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H:%s"], { cwd });
  const trimmed = stdout.trim();
  const [hash, message] = trimmed.split(":", 2);
  if (!hash || !message) {
    throw new Error("Unable to read git HEAD commit");
  }
  return { hash, message };
}

function enforceStatusCommitPolicy(opts: {
  policy: AgentplaneConfig["status_commit_policy"];
  action: string;
  confirmed: boolean;
  quiet: boolean;
}): void {
  if (opts.policy === "off") return;
  if (opts.policy === "warn") {
    if (!opts.quiet && !opts.confirmed) {
      process.stderr.write(
        `${warnMessage(
          `${opts.action}: status/comment-driven commit requested; policy=warn (pass --confirm-status-commit to acknowledge)`,
        )}\n`,
      );
    }
    return;
  }
  if (opts.policy === "confirm" && !opts.confirmed) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `${opts.action}: status/comment-driven commit blocked by status_commit_policy='confirm' ` +
        "(pass --confirm-status-commit to proceed)",
    });
  }
}

export async function cmdStart(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  force: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);

    if (opts.commitFromComment) {
      enforceStatusCommitPolicy({
        policy: loaded.config.status_commit_policy,
        action: "start",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }

    const { prefix, min_chars: minChars } = loaded.config.tasks.comments.start;
    requireStructuredComment(opts.body, prefix, minChars);

    const { backend, task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });

    const currentStatus = String(task.status || "TODO").toUpperCase();
    if (!opts.force && !isTransitionAllowed(currentStatus, "DOING")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Refusing status transition ${currentStatus} -> DOING (use --force to override)`,
      });
    }

    if (!opts.force) {
      const allTasks = await backend.listTasks();
      const depState = buildDependencyState(allTasks);
      const dep = depState.get(task.id);
      if (dep && (dep.missing.length > 0 || dep.incomplete.length > 0)) {
        if (!opts.quiet) {
          if (dep.missing.length > 0) {
            process.stderr.write(`${warnMessage(`missing deps: ${dep.missing.join(", ")}`)}\n`);
          }
          if (dep.incomplete.length > 0) {
            process.stderr.write(
              `${warnMessage(`incomplete deps: ${dep.incomplete.join(", ")}`)}\n`,
            );
          }
        }
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task is not ready: ${task.id} (use --force to override)`,
        });
      }
    }

    const formattedComment = opts.commitFromComment
      ? formatCommentBodyForCommit(opts.body, loaded.config)
      : null;
    const commentBody = formattedComment ?? opts.body;

    const existingComments = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    const commentsValue: { author: string; body: string }[] = [
      ...existingComments,
      { author: opts.author, body: commentBody },
    ];

    const nextTask: TaskData = {
      ...task,
      status: "DOING",
      comments: commentsValue,
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: opts.author,
    };

    await backend.writeTask(nextTask);

    let commitInfo: { hash: string; message: string } | null = null;
    if (opts.commitFromComment) {
      commitInfo = await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        commentBody: opts.body,
        formattedComment,
        emoji: opts.commitEmoji ?? "🚧",
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config: loaded.config,
      });
    }

    if (!opts.quiet) {
      const suffix = commitInfo ? ` (commit=${commitInfo.hash.slice(0, 12)})` : "";
      process.stdout.write(`${successMessage("started", `${opts.taskId}${suffix}`)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "start", root: opts.rootOverride ?? null });
  }
}

export async function cmdBlock(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  force: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);

    if (opts.commitFromComment) {
      enforceStatusCommitPolicy({
        policy: loaded.config.status_commit_policy,
        action: "block",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }

    const { prefix, min_chars: minChars } = loaded.config.tasks.comments.blocked;
    requireStructuredComment(opts.body, prefix, minChars);

    const { backend, task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });

    const currentStatus = String(task.status || "TODO").toUpperCase();
    if (!opts.force && !isTransitionAllowed(currentStatus, "BLOCKED")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Refusing status transition ${currentStatus} -> BLOCKED (use --force to override)`,
      });
    }

    const formattedComment = opts.commitFromComment
      ? formatCommentBodyForCommit(opts.body, loaded.config)
      : null;
    const commentBody = formattedComment ?? opts.body;

    const existingComments = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    const commentsValue = [...existingComments, { author: opts.author, body: commentBody }];
    const nextTask: TaskData = {
      ...task,
      status: "BLOCKED",
      comments: commentsValue,
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: opts.author,
    };

    await backend.writeTask(nextTask);

    let commitInfo: { hash: string; message: string } | null = null;
    if (opts.commitFromComment) {
      commitInfo = await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        commentBody: opts.body,
        formattedComment,
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("BLOCKED"),
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config: loaded.config,
      });
    }

    if (!opts.quiet) {
      const suffix = commitInfo ? ` (commit=${commitInfo.hash.slice(0, 12)})` : "";
      process.stdout.write(`${successMessage("blocked", `${opts.taskId}${suffix}`)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "block", root: opts.rootOverride ?? null });
  }
}

export async function cmdFinish(opts: {
  cwd: string;
  rootOverride?: string;
  taskIds: string[];
  author: string;
  body: string;
  commit?: string;
  skipVerify: boolean;
  force: boolean;
  noRequireTaskIdInCommit: boolean;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  statusCommit: boolean;
  statusCommitEmoji?: string;
  statusCommitAllow: string[];
  statusCommitAutoAllow: boolean;
  statusCommitRequireClean: boolean;
  confirmStatusCommit: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    if (opts.noRequireTaskIdInCommit) {
      // Parity flag (commit subject checks are not enforced in node CLI).
    }
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const { prefix, min_chars: minChars } = loaded.config.tasks.comments.verified;
    requireStructuredComment(opts.body, prefix, minChars);
    if (opts.commitFromComment || opts.statusCommit) {
      enforceStatusCommitPolicy({
        policy: loaded.config.status_commit_policy,
        action: "finish",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }
    if ((opts.commitFromComment || opts.statusCommit) && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }
    const primaryTaskId = opts.taskIds[0] ?? "";
    if ((opts.commitFromComment || opts.statusCommit) && !primaryTaskId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }

    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });

    const commitInfo = opts.commit
      ? await readCommitInfo(resolved.gitRoot, opts.commit)
      : await readHeadCommit(resolved.gitRoot);

    for (const taskId of opts.taskIds) {
      const { task } = await loadBackendTask({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId,
      });

      if (!opts.force) {
        const currentStatus = String(task.status || "TODO").toUpperCase();
        if (currentStatus === "DONE") {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: `Task is already DONE: ${task.id} (use --force to override)`,
          });
        }
      }

      const existingComments = Array.isArray(task.comments)
        ? task.comments.filter(
            (item): item is { author: string; body: string } =>
              !!item && typeof item.author === "string" && typeof item.body === "string",
          )
        : [];
      const commentsValue = [...existingComments, { author: opts.author, body: opts.body }];
      const nextTask: TaskData = {
        ...task,
        status: "DONE",
        commit: { hash: commitInfo.hash, message: commitInfo.message },
        comments: commentsValue,
        doc_version: 2,
        doc_updated_at: nowIso(),
        doc_updated_by: opts.author,
      };
      await backend.writeTask(nextTask);
    }

    if (!opts.skipVerify) {
      // No-op for parity; verify is handled by `agentplane verify`.
    }

    // tasks.json is export-only; generated via `agentplane task export`.

    if (opts.commitFromComment) {
      await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, loaded.config),
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config: loaded.config,
      });
    }

    if (opts.statusCommit) {
      await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, loaded.config),
        emoji: opts.statusCommitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.statusCommitAllow,
        autoAllow: opts.statusCommitAutoAllow || opts.statusCommitAllow.length === 0,
        allowTasks: true,
        requireClean: opts.statusCommitRequireClean,
        quiet: opts.quiet,
        config: loaded.config,
      });
    }

    if (!opts.quiet) {
      process.stdout.write(`${successMessage("finished")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "finish", root: opts.rootOverride ?? null });
  }
}

export async function cmdVerify(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  execCwd?: string;
  logPath?: string;
  skipIfUnchanged: boolean;
  quiet: boolean;
  require: boolean;
  yes: boolean;
}): Promise<number> {
  try {
    const { task, backend, config, resolved } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });

    const docText = typeof task.doc === "string" ? task.doc : "";
    const { commands: docCommands, steps: docSteps } = parseVerifyStepsFromDoc(docText);

    const rawVerify = task.verify;
    if (rawVerify !== undefined && rawVerify !== null && !Array.isArray(rawVerify)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `${task.id}: verify must be a list of strings`,
      });
    }
    const taskCommands = Array.isArray(rawVerify)
      ? rawVerify
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    const commands = docCommands.length > 0 ? docCommands : taskCommands;
    let baseDoc = typeof task.doc === "string" ? task.doc : "";

    if (docSteps.length > 0 && !opts.quiet) {
      process.stdout.write(`${infoMessage(`${task.id}: manual verify steps:`)}\n`);
      for (const step of docSteps) {
        process.stdout.write(`- ${step}\n`);
      }
    }

    if (commands.length === 0) {
      if (opts.require) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `${task.id}: no verify commands configured`,
        });
      }
      if (!opts.quiet) {
        process.stdout.write(`${infoMessage(`${task.id}: no verify commands configured`)}\n`);
      }
      return 0;
    }

    const requireVerifyApproval = config.agents?.approvals?.require_verify === true;
    if (requireVerifyApproval && !opts.yes) {
      if (!process.stdin.isTTY || opts.quiet) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message:
            "Verification requires explicit approval (use --yes in non-interactive mode or set agents.approvals.require_verify=false).",
        });
      }
      const approved = await promptYesNo(
        "Require explicit approval for verification. Proceed?",
        false,
      );
      if (!approved) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Verification cancelled by user.",
        });
      }
    }

    if (!backend.getTaskDoc || !backend.setTaskDoc) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }
    if (!baseDoc) {
      const fetched = await backend.getTaskDoc(task.id);
      if (typeof fetched === "string") baseDoc = fetched;
    }

    const execCwd = opts.execCwd ? path.resolve(opts.cwd, opts.execCwd) : resolved.gitRoot;
    if (!isPathWithin(resolved.gitRoot, execCwd)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `--cwd must stay under repo root: ${execCwd}`,
      });
    }

    const taskDir = path.join(resolved.gitRoot, config.paths.workflow_dir, opts.taskId);
    const prDir = path.join(taskDir, "pr");
    const metaPath = path.join(prDir, "meta.json");

    let logPath: string | null = null;
    if (opts.logPath) {
      logPath = path.resolve(opts.cwd, opts.logPath);
      if (!isPathWithin(resolved.gitRoot, logPath)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `--log must stay under repo root: ${logPath}`,
        });
      }
    } else if (await fileExists(prDir)) {
      logPath = path.join(prDir, "verify.log");
    }

    let meta: PrMeta | null = null;
    if (await fileExists(metaPath)) {
      const rawMeta = await readFile(metaPath, "utf8");
      meta = parsePrMeta(rawMeta, opts.taskId);
    }

    const headSha = await gitRevParse(execCwd, ["HEAD"]);
    const currentSha = headSha;

    if (opts.skipIfUnchanged) {
      const changed = await gitStatusChangedPaths({
        cwd: execCwd,
        rootOverride: opts.rootOverride,
      });
      if (changed.length > 0) {
        if (!opts.quiet) {
          process.stdout.write(
            `${warnMessage(`${task.id}: working tree is dirty; ignoring --skip-if-unchanged`)}\n`,
          );
        }
      } else {
        let lastVerifiedSha = meta?.last_verified_sha ?? null;
        if (!lastVerifiedSha && logPath && (await fileExists(logPath))) {
          const logText = await readFile(logPath, "utf8");
          lastVerifiedSha = extractLastVerifiedSha(logText);
        }
        if (lastVerifiedSha && lastVerifiedSha === currentSha) {
          const header = `[${nowIso()}] ℹ️ skipped (unchanged verified_sha=${currentSha})`;
          if (logPath) {
            await appendVerifyLog(logPath, header, "");
          }
          if (!opts.quiet) {
            process.stdout.write(
              `${infoMessage(
                `${task.id}: verify skipped (unchanged sha ${currentSha.slice(0, 12)})`,
              )}\n`,
            );
          }
          if (meta) {
            const nextMeta: PrMeta = {
              ...meta,
              last_verified_sha: currentSha,
              last_verified_at: nowIso(),
              verify: meta.verify ? { ...meta.verify, status: "pass" } : { status: "pass" },
            };
            await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");
          }
          return 0;
        }
      }
    }

    let verifyError: Error | null = null;
    let failedCommand: string | null = null;
    for (const command of commands) {
      try {
        if (!opts.quiet) {
          process.stdout.write(`$ ${command}\n`);
        }
        const timestamp = nowIso();
        const result = await runShellCommand(command, execCwd);
        const shaPrefix = currentSha ? `sha=${currentSha} ` : "";
        const header = `[${timestamp}] ${shaPrefix}$ ${command}`.trimEnd();
        if (logPath) {
          await appendVerifyLog(logPath, header, result.output);
        }
        if (result.code !== 0) {
          throw new CliError({
            exitCode: result.code || 1,
            code: "E_IO",
            message: `Verify command failed: ${command}`,
          });
        }
      } catch (err) {
        verifyError = err instanceof Error ? err : new Error(String(err));
        failedCommand = command;
        break;
      }
    }

    if (verifyError) {
      const details = verifyError.message;
      const failureAt = nowIso();
      const content = renderVerificationSection({
        status: "fail",
        verifiedAt: failureAt,
        verifiedSha: null,
        commands,
        steps: docSteps,
        details: failedCommand ? `${details} (command: ${failedCommand})` : details,
      });
      await writeVerificationSection({
        backend,
        taskId: task.id,
        config,
        baseDoc,
        content,
        updatedBy: "VERIFY",
      });
      if (meta) {
        const nextMeta: PrMeta = {
          ...meta,
          last_verified_at: failureAt,
          verify: meta.verify
            ? { ...meta.verify, status: "fail", command: commands.join(" && ") }
            : { status: "fail", command: commands.join(" && ") },
        };
        await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");
      }
      const existingComments = Array.isArray(task.comments)
        ? task.comments.filter(
            (item): item is { author: string; body: string } =>
              !!item && typeof item.author === "string" && typeof item.body === "string",
          )
        : [];
      const failureBody = failedCommand
        ? `Verify failed: ${details} (command: ${failedCommand})`
        : `Verify failed: ${details}`;
      const nextTask: TaskData = {
        ...task,
        status: "DOING",
        comments: [...existingComments, { author: "VERIFY", body: failureBody }],
        doc_version: 2,
        doc_updated_at: failureAt,
        doc_updated_by: "VERIFY",
      };
      await backend.writeTask(nextTask);
      throw verifyError;
    }

    if (currentSha) {
      const header = `[${nowIso()}] ✅ verified_sha=${currentSha}`;
      if (logPath) {
        await appendVerifyLog(logPath, header, "");
      }
    }
    if (!opts.quiet) {
      process.stdout.write(`${successMessage("verify passed", task.id)}\n`);
    }

    const successAt = nowIso();
    const successContent = renderVerificationSection({
      status: "pass",
      verifiedAt: successAt,
      verifiedSha: currentSha,
      commands,
      steps: docSteps,
      details: null,
    });
    await writeVerificationSection({
      backend,
      taskId: task.id,
      config,
      baseDoc,
      content: successContent,
      updatedBy: "VERIFY",
    });

    if (meta) {
      const nextMeta: PrMeta = {
        ...meta,
        last_verified_sha: currentSha,
        last_verified_at: successAt,
        verify: meta.verify
          ? { ...meta.verify, status: "pass", command: commands.join(" && ") }
          : { status: "pass", command: commands.join(" && ") },
      };
      await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");
    }

    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "verify", root: opts.rootOverride ?? null });
  }
}

export const TASK_DOC_SET_USAGE =
  "Usage: agentplane task doc set <task-id> --section <name> (--text <text> | --file <path>)";
export const TASK_DOC_SET_USAGE_EXAMPLE =
  'agentplane task doc set 202602030608-F1Q8AB --section Summary --text "..."';
export const TASK_DOC_SHOW_USAGE =
  "Usage: agentplane task doc show <task-id> [--section <name>] [--quiet]";
export const TASK_DOC_SHOW_USAGE_EXAMPLE =
  "agentplane task doc show 202602030608-F1Q8AB --section Summary";

type TaskDocSetFlags = {
  section?: string;
  text?: string;
  file?: string;
  updatedBy?: string;
};

type TaskDocShowFlags = {
  section?: string;
  quiet: boolean;
};

function parseTaskDocShowFlags(args: string[]): TaskDocShowFlags {
  const out: TaskDocShowFlags = { quiet: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--section") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
      }
      out.section = next;
      i++;
      continue;
    }
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
  }
  return out;
}

function parseTaskDocSetFlags(args: string[]): TaskDocSetFlags {
  const out: TaskDocSetFlags = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unexpected argument: ${arg}` });
    }

    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }

    switch (arg) {
      case "--section": {
        out.section = next;
        break;
      }
      case "--text": {
        out.text = next;
        break;
      }
      case "--file": {
        out.file = next;
        break;
      }
      case "--updated-by": {
        out.updatedBy = next;
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }

    i++;
  }

  return out;
}

export async function cmdTaskDocSet(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskDocSetFlags(opts.args);

  if (!flags.section) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_DOC_SET_USAGE, TASK_DOC_SET_USAGE_EXAMPLE),
    });
  }

  const hasText = flags.text !== undefined;
  const hasFile = flags.file !== undefined;
  if (hasText === hasFile) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_DOC_SET_USAGE, TASK_DOC_SET_USAGE_EXAMPLE),
    });
  }

  let updatedBy: string | undefined;
  if (flags.updatedBy !== undefined) {
    const trimmed = flags.updatedBy.trim();
    if (trimmed.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--updated-by must be non-empty",
      });
    }
    updatedBy = trimmed;
  }

  let text = flags.text ?? "";
  if (hasFile) {
    try {
      text = await readFile(path.resolve(opts.cwd, flags.file ?? ""), "utf8");
    } catch (err) {
      throw mapCoreError(err, { command: "task doc set", filePath: flags.file ?? "" });
    }
  }

  try {
    const { backend, resolved, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (!backend.getTaskDoc || !backend.setTaskDoc) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }
    const allowed = config.tasks.doc.sections;
    if (!allowed.includes(flags.section)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("doc section", flags.section),
      });
    }
    const normalizedAllowed = new Set(allowed.map((section) => normalizeDocSectionName(section)));
    const targetKey = normalizeDocSectionName(flags.section);
    const headingKeys = new Set<string>();
    for (const line of text.replaceAll("\r\n", "\n").split("\n")) {
      const match = /^##\s+(.*)$/.exec(line.trim());
      if (!match) continue;
      const key = normalizeDocSectionName(match[1] ?? "");
      if (key && normalizedAllowed.has(key)) headingKeys.add(key);
    }
    const existing = await backend.getTaskDoc(opts.taskId);
    const baseDoc = ensureDocSections(existing ?? "", config.tasks.doc.required_sections);
    if (headingKeys.size > 0 && (headingKeys.size > 1 || !headingKeys.has(targetKey))) {
      const fullDoc = ensureDocSections(text, config.tasks.doc.required_sections);
      await backend.setTaskDoc(opts.taskId, fullDoc, updatedBy);
    } else {
      let nextText = text;
      if (headingKeys.size > 0 && headingKeys.has(targetKey)) {
        const lines = nextText.replaceAll("\r\n", "\n").split("\n");
        let firstContent = 0;
        while (firstContent < lines.length && lines[firstContent]?.trim() === "") firstContent++;
        if ((lines[firstContent]?.trim() ?? "") === `## ${flags.section}`) {
          lines.splice(firstContent, 1);
          if (lines[firstContent]?.trim() === "") lines.splice(firstContent, 1);
          nextText = lines.join("\n");
        }
      }
      const nextDoc = setMarkdownSection(baseDoc, flags.section, nextText);
      const normalized = ensureDocSections(nextDoc, config.tasks.doc.required_sections);
      await backend.setTaskDoc(opts.taskId, normalized, updatedBy);
    }
    const tasksDir = path.join(resolved.gitRoot, config.paths.workflow_dir);
    process.stdout.write(`${path.join(tasksDir, opts.taskId, "README.md")}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task doc set", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskDocShow(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskDocShowFlags(opts.args);
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (!backend.getTaskDoc) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }
    const doc = (await backend.getTaskDoc(opts.taskId)) ?? "";
    if (flags.section) {
      const sectionKey = normalizeDocSectionName(flags.section);
      const { sections } = parseDocSections(doc);
      const entry = sections.get(sectionKey);
      const content = entry?.lines ?? [];
      if (content.length > 0) {
        process.stdout.write(`${content.join("\n").trimEnd()}\n`);
        return 0;
      }
      if (!flags.quiet) {
        process.stdout.write(`${infoMessage(`section has no content: ${flags.section}`)}\n`);
      }
      return 0;
    }
    if (doc.trim()) {
      process.stdout.write(`${doc.trimEnd()}\n`);
      return 0;
    }
    if (!flags.quiet) {
      process.stdout.write(`${infoMessage("task doc metadata missing")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task doc show", root: opts.rootOverride ?? null });
  }
}
