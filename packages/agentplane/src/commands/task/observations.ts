import {
  TASK_OBSERVATION_ACTION_VALUES,
  TASK_OBSERVATION_KIND_VALUES,
  TASK_OBSERVATION_PHASE_VALUES,
  TASK_OBSERVATION_SEVERITY_VALUES,
  TASK_OBSERVATION_STATUS_VALUES,
  TASK_OBSERVATION_SCHEMA_VERSION,
  validateTaskObservation,
  type TaskObservation,
  type TaskObservationAction,
  type TaskObservationKind,
  type TaskObservationPhase,
  type TaskObservationSeverity,
  type TaskObservationStatus,
} from "@agentplaneorg/core/tasks";
import { mkdir, readFile, appendFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

const TASK_OBSERVATIONS_FILE = "observations.jsonl";

export type TaskObservationReadError = {
  line: number;
  message: string;
  raw: string;
};

export type TaskObservationsReadResult = {
  task: TaskData;
  artifactPath: string;
  observations: TaskObservation[];
  errors: TaskObservationReadError[];
};

export type TaskObservationBlockingIssue = {
  id: string;
  reason: string;
};

function taskObservationsPath(ctx: CommandContext, taskId: string): string {
  return path.join(
    ctx.resolvedProject.gitRoot,
    ctx.config.paths.workflow_dir,
    taskId,
    TASK_OBSERVATIONS_FILE,
  );
}

async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    if ((err as { code?: string }).code === "ENOENT") return null;
    throw err;
  }
}

async function requireTask(ctx: CommandContext, taskId: string): Promise<TaskData> {
  const task = await ctx.taskBackend.getTask(taskId);
  if (!task) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown task: ${taskId}`,
    });
  }
  return task;
}

function parseJsonLine(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export async function readTaskObservations(
  ctx: CommandContext,
  taskId: string,
): Promise<TaskObservationsReadResult> {
  const task = await requireTask(ctx, taskId);
  const artifactPath = taskObservationsPath(ctx, taskId);
  const text = await readTextIfExists(artifactPath);
  const observations: TaskObservation[] = [];
  const errors: TaskObservationReadError[] = [];
  if (text) {
    for (const [index, line] of text.replaceAll("\r\n", "\n").split("\n").entries()) {
      const raw = line.trim();
      if (!raw) continue;
      try {
        observations.push(validateTaskObservation(parseJsonLine(raw)));
      } catch (err) {
        errors.push({
          line: index + 1,
          message: (err as Error).message,
          raw,
        });
      }
    }
  }
  return { task, artifactPath, observations, errors };
}

function nextObservationId(now: Date): string {
  return `obs-${now.getTime().toString(36)}-${randomUUID()}`;
}

function cleanStringArray(values: readonly string[] | undefined): string[] | undefined {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of values ?? []) {
    const value = raw.trim();
    if (!value) continue;
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(value);
  }
  return out.length > 0 ? out : undefined;
}

function optionalTrimmed(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (trimmed === "") return undefined;
  return trimmed;
}

export async function appendTaskObservation(
  ctx: CommandContext,
  opts: {
    taskId: string;
    author: string;
    phase: TaskObservationPhase;
    kind: TaskObservationKind;
    severity: TaskObservationSeverity;
    summary: string;
    decision?: string;
    impact?: string;
    action: TaskObservationAction;
    actionTitle?: string;
    actionDetails?: string;
    evidenceFiles?: string[];
    evidenceCommands?: string[];
    refs?: string[];
    tags?: string[];
    status: TaskObservationStatus;
    now?: Date;
  },
): Promise<{ observation: TaskObservation; artifactPath: string }> {
  const existing = await readTaskObservations(ctx, opts.taskId);
  if (existing.errors.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: formatObservationReadErrors(opts.taskId, existing.errors),
    });
  }
  const evidence = {
    files: cleanStringArray(opts.evidenceFiles),
    commands: cleanStringArray(opts.evidenceCommands),
    refs: cleanStringArray(opts.refs),
  };
  const recommendedAction = {
    type: opts.action,
    title: optionalTrimmed(opts.actionTitle),
    details: optionalTrimmed(opts.actionDetails),
  };
  const now = opts.now ?? new Date();
  const observation = validateTaskObservation({
    schema_version: TASK_OBSERVATION_SCHEMA_VERSION,
    id: nextObservationId(now),
    task_id: opts.taskId,
    created_at: now.toISOString(),
    author: opts.author.trim(),
    phase: opts.phase,
    kind: opts.kind,
    severity: opts.severity,
    summary: opts.summary.trim(),
    ...(evidence.files || evidence.commands || evidence.refs ? { evidence } : {}),
    ...(optionalTrimmed(opts.decision) ? { decision: optionalTrimmed(opts.decision) } : {}),
    ...(optionalTrimmed(opts.impact) ? { impact: optionalTrimmed(opts.impact) } : {}),
    ...(recommendedAction.type !== "none" ||
    recommendedAction.title !== undefined ||
    recommendedAction.details !== undefined
      ? { recommended_action: recommendedAction }
      : {}),
    status: opts.status,
    ...(cleanStringArray(opts.tags) ? { tags: cleanStringArray(opts.tags) } : {}),
  });
  await mkdir(path.dirname(existing.artifactPath), { recursive: true });
  await appendFile(existing.artifactPath, `${JSON.stringify(observation)}\n`, "utf8");
  return { observation, artifactPath: existing.artifactPath };
}

export function findBlockingObservationIssues(
  observations: readonly TaskObservation[],
): TaskObservationBlockingIssue[] {
  const issues: TaskObservationBlockingIssue[] = [];
  for (const item of observations) {
    if (item.status !== "open") continue;
    if (item.severity === "high" || item.severity === "critical") {
      issues.push({ id: item.id, reason: `open ${item.severity} severity observation` });
    }
    if (item.kind === "deviation" && !item.decision?.trim()) {
      issues.push({ id: item.id, reason: "open deviation without decision" });
    }
    if (
      (item.kind === "incident_candidate" ||
        item.kind === "issue_candidate" ||
        item.kind === "agent_improvement_candidate") &&
      (!item.recommended_action || item.recommended_action.type === "none")
    ) {
      issues.push({ id: item.id, reason: `${item.kind} without actionable recommended_action` });
    }
  }
  return issues;
}

function formatObservationReadErrors(
  taskId: string,
  errors: readonly TaskObservationReadError[],
): string {
  return [
    `${taskId}: ${TASK_OBSERVATIONS_FILE} has invalid entries.`,
    ...errors.map((error) => `- line ${error.line}: ${error.message}`),
  ].join("\n");
}

export function formatObservationCheckSummary(opts: {
  taskId: string;
  observations: readonly TaskObservation[];
  errors: readonly TaskObservationReadError[];
  blocking: readonly TaskObservationBlockingIssue[];
}): string {
  if (opts.errors.length > 0) return formatObservationReadErrors(opts.taskId, opts.errors);
  if (opts.blocking.length > 0) {
    return [
      `${opts.taskId}: ${TASK_OBSERVATIONS_FILE} has unresolved blocking observations.`,
      ...opts.blocking.map((issue) => `- ${issue.id}: ${issue.reason}`),
    ].join("\n");
  }
  return `${opts.taskId}: observations OK (${opts.observations.length} entries)`;
}

export function summarizeObservationTriage(observations: readonly TaskObservation[]): Record<
  string,
  {
    total: number;
    open: number;
    ids: string[];
  }
> {
  const summary: Record<string, { total: number; open: number; ids: string[] }> = {};
  for (const item of observations) {
    const action = item.recommended_action?.type ?? "none";
    summary[action] ??= { total: 0, open: 0, ids: [] };
    summary[action].total += 1;
    if (item.status === "open") {
      summary[action].open += 1;
      summary[action].ids.push(item.id);
    }
  }
  return summary;
}

export function observationEnumValues() {
  return {
    kinds: TASK_OBSERVATION_KIND_VALUES,
    phases: TASK_OBSERVATION_PHASE_VALUES,
    severities: TASK_OBSERVATION_SEVERITY_VALUES,
    actions: TASK_OBSERVATION_ACTION_VALUES,
    statuses: TASK_OBSERVATION_STATUS_VALUES,
  };
}
