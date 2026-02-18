import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readdir } from "node:fs/promises";
import path from "node:path";

import { type AgentplaneConfig } from "@agentplaneorg/core";

import { resolveCommitEmojiForAgent } from "../../shared/agent-emoji.js";
import {
  invalidValueForFlag,
  invalidValueMessage,
  missingValueMessage,
  warnMessage,
} from "../../cli/output.js";
import { fileExists } from "../../cli/fs-utils.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { type TaskBackend, type TaskData, type TaskEvent } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { dedupeStrings } from "../../shared/strings.js";
import { parseGitLogHashSubject } from "../../shared/git-log.js";
import { isRecord } from "../../shared/guards.js";
import type { CommandContext } from "../shared/task-backend.js";

export { dedupeStrings } from "../../shared/strings.js";

export const execFileAsync = promisify(execFile);

async function listAgentIdsMemo(ctx: CommandContext): Promise<string[]> {
  ctx.memo.agentIds ??= (async () => {
    const agentsDir = path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.agents_dir);
    if (!(await fileExists(agentsDir))) return [];

    const entries = await readdir(agentsDir);
    return entries
      .filter((name) => name.endsWith(".json"))
      .map((name) => name.slice(0, -".json".length))
      .map((id) => id.trim())
      .filter((id) => id.length > 0);
  })();
  return await ctx.memo.agentIds;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export const VERIFY_STEPS_PLACEHOLDER = "<!-- TODO: FILL VERIFY STEPS -->";

export function extractDocSection(doc: string, sectionName: string): string | null {
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  let capturing = false;
  const out: string[] = [];

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      if (capturing) break;
      capturing = (match[1] ?? "").trim() === sectionName;
      continue;
    }
    if (capturing) out.push(line);
  }

  if (!capturing) return null;
  return out.join("\n").trimEnd();
}

export function isVerifyStepsFilled(sectionText: string | null): boolean {
  const normalized = (sectionText ?? "").trim();
  if (!normalized) return false;
  if (normalized.includes(VERIFY_STEPS_PLACEHOLDER)) return false;
  return true;
}

export function normalizeDependsOnInput(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "[]") return [];
  return [trimmed];
}

const ALLOWED_TASK_STATUSES = new Set(["TODO", "DOING", "DONE", "BLOCKED"]);

export function normalizeTaskStatus(value: string): string {
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

export function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim());
}

export function requiresVerify(tags: string[], requiredTags: string[]): boolean {
  const required = new Set(requiredTags.map((tag) => tag.trim().toLowerCase()).filter(Boolean));
  if (required.size === 0) return false;
  return tags.some((tag) => required.has(tag.trim().toLowerCase()));
}

export type PrimaryTagResolution = {
  primary: string;
  matched: string[];
  usedFallback: boolean;
};

export type TaskTagPolicy = {
  primaryAllowlist: string[];
  strictPrimary: boolean;
  fallbackPrimary: string;
  lockPrimaryOnUpdate: boolean;
};

type RawVerifyPolicy = {
  require_steps_for_primary?: unknown;
  require_verification_for_primary?: unknown;
  require_steps_for_tags?: unknown;
  required_tags?: unknown;
};

type RawTaskTags = {
  primary_allowlist?: unknown;
  strict_primary?: unknown;
  fallback_primary?: unknown;
  lock_primary_on_update?: unknown;
};

function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function readBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function readString(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function configFromInput(input: CommandContext | AgentplaneConfig): AgentplaneConfig {
  return "config" in input ? input.config : input;
}

export function readTaskTagPolicy(input: CommandContext | AgentplaneConfig): TaskTagPolicy {
  const config = configFromInput(input);
  const tasks: Record<string, unknown> = isRecord(config.tasks) ? config.tasks : {};
  const rawTagsCandidate = tasks.tags;
  const rawTags: RawTaskTags = isRecord(rawTagsCandidate) ? (rawTagsCandidate as RawTaskTags) : {};
  const fallbackAllowlist = ["code", "data", "research", "docs", "ops", "product", "meta"];
  const normalizedAllowlist = dedupeStrings(
    readStringArray(rawTags.primary_allowlist)
      .map((tag) => tag.toLowerCase())
      .filter(Boolean),
  );

  return {
    primaryAllowlist: normalizedAllowlist.length > 0 ? normalizedAllowlist : fallbackAllowlist,
    strictPrimary: readBoolean(rawTags.strict_primary, false),
    fallbackPrimary: readString(rawTags.fallback_primary, "meta").toLowerCase(),
    lockPrimaryOnUpdate: readBoolean(rawTags.lock_primary_on_update, true),
  };
}

function readVerifyPrimaryPolicy(config: AgentplaneConfig): {
  requireStepsForPrimary: Set<string>;
  requireVerificationForPrimary: Set<string>;
} {
  const tasks: Record<string, unknown> = isRecord(config.tasks) ? config.tasks : {};
  const rawVerifyCandidate = tasks.verify;
  const rawVerify: RawVerifyPolicy = isRecord(rawVerifyCandidate)
    ? (rawVerifyCandidate as RawVerifyPolicy)
    : {};

  const explicitSteps = dedupeStrings(
    readStringArray(rawVerify.require_steps_for_primary)
      .map((tag) => tag.toLowerCase())
      .filter(Boolean),
  );
  const legacySteps = dedupeStrings(
    readStringArray(rawVerify.require_steps_for_tags ?? rawVerify.required_tags)
      .map((tag) => tag.toLowerCase())
      .filter(Boolean),
  );
  const requireStepsForPrimary = new Set(explicitSteps.length > 0 ? explicitSteps : legacySteps);

  const explicitVerification = dedupeStrings(
    readStringArray(rawVerify.require_verification_for_primary)
      .map((tag) => tag.toLowerCase())
      .filter(Boolean),
  );
  const requireVerificationForPrimary = new Set(
    explicitVerification.length > 0 ? explicitVerification : [...requireStepsForPrimary.values()],
  );

  return { requireStepsForPrimary, requireVerificationForPrimary };
}

export function resolvePrimaryTagFromConfig(
  tags: string[],
  config: AgentplaneConfig,
): PrimaryTagResolution {
  const policy = readTaskTagPolicy(config);
  const allowlist = policy.primaryAllowlist;
  if (allowlist.length === 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: "tasks.tags.primary_allowlist must contain at least one tag.",
    });
  }

  const normalizedTags = dedupeStrings(tags.map((t) => t.trim().toLowerCase()).filter(Boolean));
  const matched = normalizedTags.filter((tag) => allowlist.includes(tag));
  if (matched.length > 1) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message:
        `Task must include exactly one primary tag from allowlist (${allowlist.join(", ")}); ` +
        `found multiple: ${matched.join(", ")}`,
    });
  }
  if (matched.length === 1) {
    return { primary: matched[0], matched, usedFallback: false };
  }

  const strict = policy.strictPrimary;
  if (strict) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message:
        `Task must include exactly one primary tag from allowlist (${allowlist.join(", ")}); ` +
        "none found and strict_primary=true",
    });
  }

  const fallback = policy.fallbackPrimary;
  if (!fallback || !allowlist.includes(fallback)) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `tasks.tags.fallback_primary=${JSON.stringify(policy.fallbackPrimary)} ` +
        `must be present in tasks.tags.primary_allowlist (${allowlist.join(", ")}).`,
    });
  }
  return { primary: fallback, matched, usedFallback: true };
}

export function requiresVerifyStepsByPrimary(tags: string[], config: AgentplaneConfig): boolean {
  const primary = resolvePrimaryTagFromConfig(tags, config).primary;
  return readVerifyPrimaryPolicy(config).requireStepsForPrimary.has(primary);
}

export function requiresVerificationByPrimary(tags: string[], config: AgentplaneConfig): boolean {
  const primary = resolvePrimaryTagFromConfig(tags, config).primary;
  return readVerifyPrimaryPolicy(config).requireVerificationForPrimary.has(primary);
}

export function resolvePrimaryTag(tags: string[], ctx: CommandContext): PrimaryTagResolution {
  return resolvePrimaryTagFromConfig(tags, ctx.config);
}

export async function warnIfUnknownOwner(ctx: CommandContext, owner: string): Promise<void> {
  const trimmed = owner.trim();
  if (!trimmed) return;

  const ids = await listAgentIdsMemo(ctx);
  if (ids.length === 0) return;

  if (ids.includes(trimmed)) return;

  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `unknown task owner id: ${trimmed} (not found under ${ctx.config.paths.agents_dir}; ` +
      `pick an existing agent id or create ${ctx.config.paths.agents_dir}/${trimmed}.json)`,
  });
}

export function appendTaskEvent(task: TaskData, event: TaskEvent): TaskEvent[] {
  const existing = Array.isArray(task.events)
    ? task.events.filter(
        (entry): entry is TaskEvent =>
          !!entry &&
          typeof entry.type === "string" &&
          typeof entry.at === "string" &&
          typeof entry.author === "string",
      )
    : [];
  return [...existing, event];
}

export function ensurePlanApprovedIfRequired(task: TaskData, config: AgentplaneConfig): void {
  if (config.agents?.approvals?.require_plan !== true) return;

  const state = task.plan_approval?.state ?? "missing";
  if (state === "approved") return;

  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `${task.id}: plan approval is required before work can proceed ` +
      `(plan_approval.state=${JSON.stringify(state)}; use \`agentplane task plan approve ${task.id} --by <USER>\` ` +
      "or set agents.approvals.require_plan=false).",
  });
}

export function ensureVerificationSatisfiedIfRequired(
  task: TaskData,
  config: AgentplaneConfig,
): void {
  if (config.agents?.approvals?.require_verify !== true) return;
  if (!requiresVerificationByPrimary(toStringArray(task.tags), config)) return;

  const state = task.verification?.state ?? "missing";
  if (state === "ok") return;

  const hint =
    `use \`agentplane verify ${task.id} --ok|--rework --by <ID> --note <TEXT>\` ` +
    `or \`agentplane task verify ok|rework ${task.id} --by <ID> --note <TEXT>\``;

  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `${task.id}: verification result is required before integration/closure can proceed ` +
      `(verification.state=${JSON.stringify(state)}; ${hint} or set agents.approvals.require_verify=false).`,
  });
}

export type DependencyState = {
  dependsOn: string[];
  missing: string[];
  incomplete: string[];
};

function hasDependsOnCycle(dependsOnMap: Map<string, string[]>): string[] | null {
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const stack: string[] = [];

  function dfs(taskId: string): string[] | null {
    if (visited.has(taskId)) return null;
    if (visiting.has(taskId)) {
      const start = stack.indexOf(taskId);
      return start === -1 ? [taskId] : [...stack.slice(start), taskId];
    }

    visiting.add(taskId);
    stack.push(taskId);
    const deps = dependsOnMap.get(taskId) ?? [];
    for (const depId of deps) {
      const cycle = dfs(depId);
      if (cycle) return cycle;
    }
    stack.pop();
    visiting.delete(taskId);
    visited.add(taskId);
    return null;
  }

  for (const taskId of dependsOnMap.keys()) {
    const cycle = dfs(taskId);
    if (cycle) return cycle;
  }
  return null;
}

export async function ensureTaskDependsOnGraphIsAcyclic(opts: {
  backend: Pick<TaskBackend, "listTasks">;
  taskId: string;
  dependsOn: string[];
}): Promise<void> {
  const nextDepends = dedupeStrings(opts.dependsOn);
  if (nextDepends.includes(opts.taskId)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `depends_on cannot include task itself (${opts.taskId})`,
    });
  }

  const allTasks = await opts.backend.listTasks();
  const depMap = new Map<string, string[]>();
  for (const task of allTasks) {
    const taskId = String(task.id || "").trim();
    if (!taskId) continue;
    if (taskId === opts.taskId) continue;
    depMap.set(taskId, dedupeStrings(toStringArray(task.depends_on)));
  }
  depMap.set(opts.taskId, nextDepends);

  const cycle = hasDependsOnCycle(depMap);
  if (!cycle) return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: `depends_on cycle detected: ${cycle.join(" -> ")}`,
  });
}

export async function resolveTaskDependencyState(
  task: TaskData,
  backend: Pick<TaskBackend, "getTask" | "getTasks">,
): Promise<DependencyState> {
  const dependsOn = dedupeStrings(toStringArray(task.depends_on));
  if (dependsOn.length === 0) {
    return { dependsOn, missing: [], incomplete: [] };
  }

  const loaded = backend.getTasks
    ? await backend.getTasks(dependsOn)
    : await Promise.all(dependsOn.map(async (depId) => await backend.getTask(depId)));

  const missing: string[] = [];
  const incomplete: string[] = [];
  for (const [idx, depId] of dependsOn.entries()) {
    const dep = loaded[idx] ?? null;
    if (!dep) {
      missing.push(depId);
      continue;
    }
    const status = String(dep.status || "TODO").toUpperCase();
    if (status !== "DONE") incomplete.push(depId);
  }

  return { dependsOn, missing, incomplete };
}

export function buildDependencyState(tasks: TaskData[]): Map<string, DependencyState> {
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

export function formatTaskLine(task: TaskData, depState?: DependencyState): string {
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

export function isTransitionAllowed(current: string, next: string): boolean {
  if (current === next) return true;
  if (current === "TODO") return next === "DOING" || next === "BLOCKED";
  if (current === "DOING") return next === "DONE" || next === "BLOCKED";
  if (current === "BLOCKED") return next === "TODO" || next === "DOING";
  if (current === "DONE") return false;
  return false;
}

export function ensureStatusTransitionAllowed(opts: {
  currentStatus: string;
  nextStatus: string;
  force: boolean;
}): void {
  if (opts.force) return;
  if (isTransitionAllowed(opts.currentStatus, opts.nextStatus)) return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `Refusing status transition ${opts.currentStatus} -> ${opts.nextStatus} ` +
      "(use --force to override)",
  });
}

export function ensureCommentCommitAllowed(opts: {
  enabled: boolean;
  config: AgentplaneConfig;
  action: string;
  confirmed: boolean;
  quiet: boolean;
  statusFrom: string;
  statusTo: string;
}): void {
  if (!opts.enabled) return;
  if (opts.config.commit_automation === "finish_only") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `${opts.action}: --commit-from-comment is disabled by commit_automation='finish_only' ` +
        "(allowed only in finish).",
    });
  }
  enforceStatusCommitPolicy({
    policy: opts.config.status_commit_policy,
    action: opts.action,
    confirmed: opts.confirmed,
    quiet: opts.quiet,
    statusFrom: opts.statusFrom,
    statusTo: opts.statusTo,
  });
}

export function requireStructuredComment(body: string, prefix: string, minChars: number): void {
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

export async function readHeadCommit(cwd: string): Promise<{ hash: string; message: string }> {
  const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H%x00%s"], { cwd });
  const { hash, subject } = parseGitLogHashSubject(stdout);
  return { hash, message: subject };
}

export function enforceStatusCommitPolicy(opts: {
  policy: AgentplaneConfig["status_commit_policy"];
  action: string;
  confirmed: boolean;
  quiet: boolean;
  statusFrom: string;
  statusTo: string;
}): void {
  if (!isMajorStatusCommitTransition(opts.statusFrom, opts.statusTo)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `${opts.action}: status/comment-driven commit is allowed only for major transitions ` +
        `(got ${opts.statusFrom.toUpperCase()} -> ${opts.statusTo.toUpperCase()})`,
    });
  }
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

const MAJOR_STATUS_COMMIT_TRANSITIONS = new Set([
  "READY->DOING",
  "TODO->DOING",
  "DOING->BLOCKED",
  "BLOCKED->DOING",
  "DOING->DONE",
]);

export function isMajorStatusCommitTransition(statusFrom: string, statusTo: string): boolean {
  const from = statusFrom.trim().toUpperCase();
  const to = statusTo.trim().toUpperCase();
  if (!from || !to) return false;
  return MAJOR_STATUS_COMMIT_TRANSITIONS.has(`${from}->${to}`);
}

export async function readCommitInfo(
  cwd: string,
  rev: string,
): Promise<{ hash: string; message: string }> {
  const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H%x00%s", rev], { cwd });
  const { hash, subject } = parseGitLogHashSubject(stdout);
  return { hash, message: subject };
}

export function defaultCommitEmojiForStatus(status: string): string {
  const normalized = status.trim().toUpperCase();
  if (normalized === "DOING") return "🚧";
  if (normalized === "DONE") return "✅";
  if (normalized === "BLOCKED") return "⛔";
  return "🧩";
}

export async function defaultCommitEmojiForAgentId(
  ctx: CommandContext,
  agentId: string,
): Promise<string> {
  const agentsDir = path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.agents_dir);
  return await resolveCommitEmojiForAgent({ agentsDirAbs: agentsDir, agentId });
}

export type TaskListFilters = {
  status: string[];
  owner: string[];
  tag: string[];
  limit?: number;
  quiet: boolean;
};

export function parseTaskListFilters(
  args: string[],
  opts?: { allowLimit?: boolean },
): TaskListFilters {
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
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--status"),
        });
      }
      out.status.push(next);
      i++;
      continue;
    }
    if (arg === "--owner") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--owner"),
        });
      }
      out.owner.push(next);
      i++;
      continue;
    }
    if (arg === "--tag") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--tag"),
        });
      }
      out.tag.push(next);
      i++;
      continue;
    }
    if (opts?.allowLimit && arg === "--limit") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: missingValueMessage("--limit"),
        });
      }
      const parsed = Number.parseInt(next, 10);
      if (!Number.isFinite(parsed)) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: invalidValueForFlag("--limit", next, "integer"),
        });
      }
      out.limit = parsed;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: `Unknown flag: ${arg}`,
      });
    }
  }
  return out;
}

export function taskTextBlob(task: TaskData): string {
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
