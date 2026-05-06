import { normalizeTaskStatus, setMarkdownSection } from "@agentplaneorg/core/tasks";

import { mapBackendError } from "../../cli/error-map.js";
import { backendNotSupportedMessage, warnMessage } from "../../cli/output.js";
import {
  createClarificationContract,
  createTaskGraphDraft,
  createTaskIntakeContext,
  materializeTaskGraphDraft,
} from "../../runtime/task-intake/index.js";
import { makeReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import type { TaskData } from "../../backends/task-backend/shared/types.js";
import {
  ensureTaskDependsOnGraphIsAcyclic,
  nowIso,
  requiresVerifyStepsByPrimary,
  resolvePrimaryTag,
  warnIfUnknownOwner,
} from "./shared.js";
import {
  buildDefaultVerifyStepsSection,
  defaultTaskDocV3,
  TASK_DOC_VERSION_V3,
} from "./doc-template.js";
import {
  formatTaskBlueprintCreationPreview,
  resolveTaskBlueprintLifecycleSummary,
} from "./blueprint-summary.js";

export type TaskNewParsed = {
  title: string;
  description: string;
  owner: string;
  priority: "low" | "normal" | "med" | "high";
  tags: string[];
  taskKind?: TaskData["task_kind"];
  mutationScope?: TaskData["mutation_scope"];
  riskFlags?: NonNullable<TaskData["risk_flags"]>;
  blueprintRequest?: TaskData["blueprint_request"];
  dependsOn: string[];
  verify: string[];
  showBlueprint: boolean;
  allowDuplicate: boolean;
};

const TASK_KIND_VALUES = new Set(["analysis", "content", "docs", "code", "release", "ops"]);
const MUTATION_SCOPE_VALUES = new Set(["none", "docs", "code", "release", "ops", "unknown"]);
const RISK_FLAG_VALUES = new Set([
  "network",
  "credentials",
  "deploy",
  "publish",
  "merge",
  "security",
  "external_system",
]);
const BLUEPRINT_REQUEST_VALUES = new Set([
  "analysis.light",
  "content.light",
  "docs.change",
  "code.direct",
  "code.branch_pr",
  "release.strict",
  "ops.approval",
]);

const TASK_NEW_DUPLICATE_THRESHOLD = 0.75;
const TASK_NEW_DUPLICATE_STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "from",
  "in",
  "is",
  "of",
  "on",
  "the",
  "to",
  "when",
  "with",
]);

function dedupeTrimmed(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of values) {
    const value = String(raw ?? "").trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return out;
}

function validateOptionalEnum<T extends string>(
  flag: string,
  value: T | undefined,
  allowed: Set<string>,
): T | undefined {
  if (!value) return undefined;
  if (allowed.has(value)) return value;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: `Invalid value for --${flag}: ${value}.`,
  });
}

function validateEnumArray<T extends string>(flag: string, values: T[], allowed: Set<string>): T[] {
  const out = dedupeTrimmed(values) as T[];
  const invalid = out.find((value) => !allowed.has(value));
  if (invalid) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Invalid value for --${flag}: ${invalid}.`,
    });
  }
  return out;
}

function sanitizeTaskNewParsed(p: TaskNewParsed): TaskNewParsed {
  const title = p.title.trim();
  if (!title)
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Invalid value for --title: empty.",
    });
  const description = p.description.trim();
  if (!description) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Invalid value for --description: empty.",
    });
  }
  const owner = p.owner.trim();
  if (!owner)
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Invalid value for --owner: empty.",
    });
  const tags = dedupeTrimmed(p.tags);
  if (tags.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Invalid value for --tag: provide at least one non-empty tag.",
    });
  }
  const dependsOn = dedupeTrimmed(p.dependsOn);
  const verify = dedupeTrimmed(p.verify);
  const taskKind = validateOptionalEnum("task-kind", p.taskKind, TASK_KIND_VALUES);
  const mutationScope = validateOptionalEnum(
    "mutation-scope",
    p.mutationScope,
    MUTATION_SCOPE_VALUES,
  );
  const riskFlags = validateEnumArray("risk", p.riskFlags ?? [], RISK_FLAG_VALUES);
  const blueprintRequest = validateOptionalEnum(
    "blueprint-request",
    p.blueprintRequest,
    BLUEPRINT_REQUEST_VALUES,
  );

  return {
    ...p,
    title,
    description,
    owner,
    tags,
    taskKind,
    mutationScope,
    riskFlags,
    blueprintRequest,
    dependsOn,
    verify,
  };
}

function normalizeDuplicateTitleTokens(value: string): string[] {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(
      (token) =>
        token.length > 0 &&
        (token.length > 2 || /\d/.test(token)) &&
        !TASK_NEW_DUPLICATE_STOPWORDS.has(token),
    );
}

function duplicateSimilarity(left: string, right: string): number {
  const leftTokens = normalizeDuplicateTitleTokens(left);
  const rightTokens = normalizeDuplicateTitleTokens(right);
  if (leftTokens.length === 0 || rightTokens.length === 0) {
    return left.trim().toLowerCase() === right.trim().toLowerCase() ? 1 : 0;
  }
  const leftSet = new Set(leftTokens);
  const rightSet = new Set(rightTokens);
  const intersection = [...leftSet].filter((token) => rightSet.has(token)).length;
  const union = new Set([...leftSet, ...rightSet]).size;
  return union === 0 ? 0 : intersection / union;
}

function listOpenTaskDuplicates(
  tasks: TaskData[],
  title: string,
): { task: TaskData; score: number }[] {
  return tasks
    .filter((task) => normalizeTaskStatus(task.status) !== "DONE")
    .map((task) => ({
      task,
      score: duplicateSimilarity(task.title ?? "", title),
    }))
    .filter(({ score }) => score >= TASK_NEW_DUPLICATE_THRESHOLD)
    .toSorted(
      (left, right) => right.score - left.score || left.task.id.localeCompare(right.task.id),
    );
}

function formatDuplicateTaskMessage(
  duplicates: { task: TaskData; score: number }[],
  allowDuplicate: boolean,
): string {
  const summary = duplicates
    .slice(0, 3)
    .map(
      ({ task, score }) =>
        `${task.id} (${Math.round(score * 100)}% title overlap, status=${normalizeTaskStatus(task.status)}): ${task.title}`,
    )
    .join("; ");
  const tail = allowDuplicate
    ? "creating a duplicate because --allow-duplicate was passed"
    : "rerun with --allow-duplicate only when intentional or close the extra task with `agentplane task close-duplicate`";
  return `potential duplicate open task detected: ${summary}; ${tail}.`;
}

export async function runTaskNewParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: TaskNewParsed;
}): Promise<number> {
  const p = sanitizeTaskNewParsed(opts.parsed);
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const duplicateTasks = listOpenTaskDuplicates(await ctx.taskBackend.listTasks(), p.title);
    if (duplicateTasks.length > 0 && !p.allowDuplicate) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: formatDuplicateTaskMessage(duplicateTasks, false),
      });
    }
    if (duplicateTasks.length > 0 && p.allowDuplicate) {
      process.stderr.write(`${warnMessage(formatDuplicateTaskMessage(duplicateTasks, true))}\n`);
    }
    const suffixLength = ctx.config.tasks.id_suffix_length_default;
    if (!ctx.taskBackend.generateTaskId) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: backendNotSupportedMessage("generateTaskId()"),
      });
    }
    const taskId = await ctx.taskBackend.generateTaskId({ length: suffixLength, attempts: 1000 });
    const executionContext = await makeReadOnlyExecutionContext(ctx);
    const createdAt = nowIso();
    let taskDoc = defaultTaskDocV3({ title: p.title, description: p.description });

    const spikeTag = (ctx.config.tasks.verify.spike_tag ?? "spike").trim().toLowerCase();
    const primary = resolvePrimaryTag(p.tags, ctx);
    if (primary.usedFallback) {
      process.stderr.write(
        `${warnMessage(
          `primary tag not found in task tags; using fallback primary=${primary.primary}`,
        )}\n`,
      );
    }
    const requiresVerifySteps = requiresVerifyStepsByPrimary(p.tags, ctx.config);
    await warnIfUnknownOwner(ctx, p.owner);
    await ensureTaskDependsOnGraphIsAcyclic({
      backend: ctx.taskBackend,
      taskId,
      dependsOn: p.dependsOn,
    });
    if (requiresVerifySteps) {
      taskDoc = setMarkdownSection(
        taskDoc,
        "Verify Steps",
        buildDefaultVerifyStepsSection({
          primary: primary.primary,
          verifyCommands: p.verify,
        }),
      );
      process.stderr.write(
        `${warnMessage(
          "task requires Verify Steps by primary tag; seeded a concrete ## Verify Steps section in README (refine it only if the task needs stricter acceptance coverage)",
        )}\n`,
      );
    }
    const hasSpike = p.tags.some((tag) => tag.trim().toLowerCase() === spikeTag);
    const hasImplementationTags = requiresVerifyStepsByPrimary(p.tags, ctx.config);
    if (hasSpike && hasImplementationTags) {
      process.stderr.write(
        `${warnMessage(
          "spike is combined with a primary tag that requires verify steps; consider splitting spike vs implementation tasks",
        )}\n`,
      );
    }

    const intakeContext = createTaskIntakeContext({
      runtime: executionContext.taskIntake,
      source: {
        id: "task_new",
        detail: "task new",
      },
      requested_outcome: p.title,
      requested_owner: p.owner,
      requested_tags: p.tags,
      requested_verify: p.verify,
      requested_dependencies: p.dependsOn,
      inputs: [
        {
          kind: "text",
          label: "description",
          value: p.description,
          required: true,
        },
      ],
    });
    const clarification = createClarificationContract({
      context: intakeContext,
    });
    const draft = createTaskGraphDraft({
      context: intakeContext,
      clarification,
      summary: p.title,
      tasks: [
        {
          draft_id: "task_1",
          title: p.title,
          description: p.description,
          owner: p.owner,
          priority: p.priority,
          origin: { system: "manual" },
          tags: p.tags,
          ...(p.taskKind ? { task_kind: p.taskKind } : {}),
          ...(p.mutationScope ? { mutation_scope: p.mutationScope } : {}),
          ...(p.riskFlags && p.riskFlags.length > 0 ? { risk_flags: p.riskFlags } : {}),
          ...(p.blueprintRequest ? { blueprint_request: p.blueprintRequest } : {}),
          depends_on: p.dependsOn,
          verify: p.verify,
          doc: taskDoc,
          doc_version: TASK_DOC_VERSION_V3,
          id_source: "generated",
        },
      ],
    });
    const materialization = await materializeTaskGraphDraft({
      draft,
      task_ids: {
        task_1: taskId,
      },
      created_at: createdAt,
    });
    const task = materialization.tasks[0]?.task;
    if (!task) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: "Task intake materialization unexpectedly produced no tasks.",
      });
    }

    await ctx.taskBackend.writeTask(task);
    process.stdout.write(`${taskId}\n`);
    if (p.showBlueprint) {
      const summary = await resolveTaskBlueprintLifecycleSummary({
        task,
        config: ctx.config,
        projectRoot: ctx.resolvedProject.gitRoot,
      });
      process.stderr.write(formatTaskBlueprintCreationPreview(summary));
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task new", root: opts.rootOverride ?? null });
  }
}
