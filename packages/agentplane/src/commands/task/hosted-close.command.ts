import { readFile } from "node:fs/promises";
import path from "node:path";

import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { execFileAsync } from "../shared/git.js";
import { buildIntegratedPrMeta, parsePrMeta, type PrMeta } from "../shared/pr-meta.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { createTaskCloseCommit, writeFinishedTasks } from "./finish-shared.js";
import { resolveHostedMergeTargetFromEvent, type HostedMergeTarget } from "./hosted-merge-sync.js";
import { readCommitInfo } from "./shared.js";
import { collectTaskIncidents, renderIncidentCollectionPlanOutcome } from "../incidents/shared.js";
import type { TaskData } from "../../backends/task-backend.js";

export type TaskHostedCloseParsed = {
  eventJson: string;
  quiet: boolean;
};

export const taskHostedCloseSpec: CommandSpec<TaskHostedCloseParsed> = {
  id: ["task", "hosted-close"],
  group: "Task",
  summary: "Close a branch_pr task on the current branch from a merged hosted PR event payload.",
  options: [
    {
      kind: "string",
      name: "event-json",
      valueHint: "<path>",
      description: "Path to the GitHub pull_request closed event payload.",
    },
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress normal output (still prints errors).",
    },
  ],
  validateRaw: (raw) => {
    const value = raw.opts["event-json"];
    if (typeof value !== "string" || value.trim() === "") {
      throw usageError({
        spec: taskHostedCloseSpec,
        message: "Missing required option: --event-json.",
      });
    }
  },
  examples: [
    {
      cmd: 'agentplane task hosted-close --event-json "$GITHUB_EVENT_PATH"',
      why: "Apply the canonical branch_pr closure payload on an automation branch after a hosted PR merge.",
    },
  ],
  parse: (raw) => ({
    eventJson: String(raw.opts["event-json"]),
    quiet: raw.opts.quiet === true,
  }),
};

type HostedCloseOutcome =
  | { outcome: "noop"; detail: string }
  | { outcome: "closed"; taskId: string; mergeHash: string }
  | { outcome: "meta-only"; taskId: string; mergeHash: string };

function isMissingCommitObjectError(err: unknown): boolean {
  const stderr = (err as { stderr?: unknown }).stderr;
  const text =
    err instanceof Error
      ? [err.message, typeof stderr === "string" ? stderr : ""]
          .filter((part) => part.trim().length > 0)
          .join("\n")
      : String(err);
  return (
    /bad object/i.test(text) || /unknown revision/i.test(text) || /ambiguous argument/i.test(text)
  );
}

async function resolveHostedTaskCommitInfo(opts: {
  gitRoot: string;
  mergedPr: {
    number: number;
    title?: string | null;
    baseRefName?: string | null;
    mergeCommit?: { oid?: string | null } | null;
  };
}): Promise<{ hash: string; message: string }> {
  const mergeHash = opts.mergedPr.mergeCommit?.oid ?? "";
  try {
    return await readCommitInfo(opts.gitRoot, mergeHash);
  } catch (err) {
    if (!isMissingCommitObjectError(err)) throw err;
    return {
      hash: mergeHash,
      message:
        opts.mergedPr.title?.trim() ??
        `Hosted PR #${opts.mergedPr.number} merged on GitHub ${opts.mergedPr.baseRefName ?? "main"}`,
    };
  }
}

async function hasTaskArtifactChanges(opts: {
  gitRoot: string;
  taskDirRelative: string;
}): Promise<boolean> {
  const { stdout } = await execFileAsync("git", ["status", "--short", "--", opts.taskDirRelative], {
    cwd: opts.gitRoot,
    env: process.env,
  });
  return stdout.trim().length > 0;
}

function buildFallbackPrMeta(opts: {
  taskId: string;
  branch: string;
  mergedPr: HostedMergeTarget["mergedPr"];
}): PrMeta {
  const at = opts.mergedPr.mergedAt ?? new Date().toISOString();
  const headShaRaw = opts.mergedPr.headRefOid?.trim();
  const headSha = headShaRaw && headShaRaw.length > 0 ? headShaRaw : undefined;
  const prUrlRaw = opts.mergedPr.url?.trim();
  const prUrl = prUrlRaw && prUrlRaw.length > 0 ? prUrlRaw : undefined;
  return {
    schema_version: 1,
    task_id: opts.taskId,
    branch: opts.branch,
    ...(opts.mergedPr.baseRefName ? { base: opts.mergedPr.baseRefName } : {}),
    pr_number: opts.mergedPr.number,
    ...(prUrl ? { pr_url: prUrl } : {}),
    created_at: at,
    updated_at: at,
    status: "OPEN",
    ...(headSha ? { head_sha: headSha } : {}),
    last_verified_sha: null,
    last_verified_at: null,
    verify: { status: "skipped" },
  };
}

function escapeRegExp(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

function extractMarkdownSection(markdown: string, heading: string): string {
  const pattern = new RegExp(
    String.raw`^## ${escapeRegExp(heading)}\n\n([\s\S]*?)(?=\n## [^\n]+\n|$)`,
    "m",
  );
  const match = pattern.exec(markdown);
  return match?.[1]?.trim() ?? "";
}

function fallbackTaskTitleFromPrTitle(taskId: string, prTitle?: string | null): string {
  const trimmed = prTitle?.trim() ?? "";
  if (!trimmed) return `Hosted close recovery for ${taskId}`;
  const suffix = taskId.split("-").at(-1)?.trim();
  if (suffix) {
    const stripped = trimmed.replace(
      new RegExp(String.raw`\s*\(${escapeRegExp(suffix)}\)\s*$`),
      "",
    );
    if (stripped.trim().length > 0) return stripped.trim();
  }
  return trimmed;
}

function isMissingTaskReadmeError(err: unknown, readmePath: string): boolean {
  if (!(err instanceof CliError)) return false;
  return err.code === "E_IO" && err.message.includes(readmePath);
}

async function buildHostedTaskFromTrackedPrArtifacts(opts: {
  gitRoot: string;
  taskDirRelative: string;
  taskId: string;
  mergedPr: HostedMergeTarget["mergedPr"];
}): Promise<TaskData | null> {
  const bodyPath = path.join(opts.gitRoot, opts.taskDirRelative, "pr", "github-body.md");
  let bodyText = "";
  try {
    bodyText = await readFile(bodyPath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }

  const summary = extractMarkdownSection(bodyText, "Summary");
  const scope = extractMarkdownSection(bodyText, "Scope");
  const verification = extractMarkdownSection(bodyText, "Verification");
  const handoff = extractMarkdownSection(bodyText, "Handoff Notes");
  const summaryLines = summary
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const title = summaryLines[0] || fallbackTaskTitleFromPrTitle(opts.taskId, opts.mergedPr.title);
  const description =
    summaryLines.slice(1).join("\n").trim() ||
    `Recovered hosted-close state from tracked PR artifacts for merged PR #${opts.mergedPr.number}.`;
  const scopeText =
    scope || `- In scope: record canonical task closure for merged PR #${opts.mergedPr.number}.`;
  const verificationText =
    verification || "- State: pending\n- Note: Recovered during hosted-close.";
  const handoffText = handoff || "- No handoff notes recorded.";
  const planText = `Recovered hosted-close state from tracked PR artifacts for merged PR #${opts.mergedPr.number}.`;
  const rollbackText = [
    "- Revert the hosted closure commit if the merged PR metadata was recorded incorrectly.",
    "- Re-run the required checks after rollback.",
  ].join("\n");
  const doc = [
    "## Summary",
    "",
    title,
    "",
    description,
    "",
    "## Scope",
    "",
    scopeText,
    "",
    "## Plan",
    "",
    planText,
    "",
    "## Verification",
    "",
    verificationText,
    "",
    "## Rollback Plan",
    "",
    rollbackText,
    "",
    "## Handoff Notes",
    "",
    handoffText,
    "",
    "## Findings",
    "",
  ].join("\n");
  return {
    id: opts.taskId,
    title,
    description,
    status: "DOING",
    priority: "med",
    owner: "INTEGRATOR",
    revision: 1,
    origin: { system: "manual" },
    depends_on: [],
    tags: [],
    verify: [],
    plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
    verification: { state: "pending", updated_at: null, updated_by: null, note: null },
    commit: null,
    doc,
    doc_version: 3,
    doc_updated_at: opts.mergedPr.mergedAt ?? new Date().toISOString(),
    doc_updated_by: "INTEGRATOR",
    id_source: "generated",
  };
}

async function readHostedPrMetaOrFallback(opts: {
  gitRoot: string;
  taskDirRelative: string;
  target: HostedMergeTarget;
}): Promise<{ metaPath: string; meta: PrMeta }> {
  const metaPath = path.join(opts.gitRoot, opts.taskDirRelative, "pr", "meta.json");
  if (!(await fileExists(metaPath))) {
    return {
      metaPath,
      meta: buildFallbackPrMeta({
        taskId: opts.target.taskId,
        branch: opts.target.branch,
        mergedPr: opts.target.mergedPr,
      }),
    };
  }
  const rawMeta = await readFile(metaPath, "utf8");
  return {
    metaPath,
    meta: parsePrMeta(rawMeta, opts.target.taskId),
  };
}

async function closeHostedTask(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  eventJson: string;
  quiet: boolean;
}): Promise<HostedCloseOutcome> {
  const rawEvent = await readFile(opts.eventJson, "utf8");
  const parsedEvent = JSON.parse(rawEvent) as unknown;
  const target = resolveHostedMergeTargetFromEvent({
    event: parsedEvent,
    branchPrefix: opts.ctx.config.branch.task_prefix,
  });
  if (!target?.mergedPr.mergeCommit?.oid) {
    return { outcome: "noop", detail: "event is not a merged task PR" };
  }

  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const taskDirRelative = path.join(opts.ctx.config.paths.workflow_dir, target.taskId);
  const taskReadmePath = path.join(gitRoot, taskDirRelative, "README.md");
  let task: TaskData;
  try {
    task = await loadTaskFromContext({
      ctx: opts.ctx,
      taskId: target.taskId,
      preferBranchSnapshot: true,
      branchSnapshotBranch: target.branch,
    });
  } catch (err) {
    if (!isMissingTaskReadmeError(err, taskReadmePath)) throw err;
    const recovered = await buildHostedTaskFromTrackedPrArtifacts({
      gitRoot,
      taskDirRelative,
      taskId: target.taskId,
      mergedPr: target.mergedPr,
    });
    if (!recovered) throw err;
    task = recovered;
  }
  if (!(await fileExists(taskReadmePath))) {
    await opts.ctx.taskBackend.writeTask(task);
  }
  const { metaPath, meta } = await readHostedPrMetaOrFallback({
    gitRoot,
    taskDirRelative,
    target,
  });
  const taskStatus = String(task.status || "TODO").toUpperCase();
  const taskCommitHash = task.commit?.hash ?? "";
  const alreadyClosed = taskStatus === "DONE" && taskCommitHash === target.mergedPr.mergeCommit.oid;
  if (
    taskStatus === "DONE" &&
    taskCommitHash !== "" &&
    taskCommitHash !== target.mergedPr.mergeCommit.oid
  ) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `Hosted task closure found a conflicting DONE commit for ${target.taskId}: ` +
        `${task.commit?.hash} != ${target.mergedPr.mergeCommit.oid}`,
    });
  }

  const nextMeta = buildIntegratedPrMeta({
    meta,
    branch: target.branch,
    base: target.mergedPr.baseRefName ?? meta.base ?? "main",
    mergeStrategy: meta.merge_strategy ?? "squash",
    mergeHash: target.mergedPr.mergeCommit.oid,
    branchHeadSha: target.mergedPr.headRefOid ?? meta.head_sha ?? target.mergedPr.mergeCommit.oid,
    at: target.mergedPr.mergedAt ?? new Date().toISOString(),
    verifyCommands: [],
    shouldRunVerify: false,
    alreadyVerifiedSha: null,
  });
  await writeJsonStableIfChanged(metaPath, nextMeta);

  if (alreadyClosed) {
    if (!(await hasTaskArtifactChanges({ gitRoot, taskDirRelative }))) {
      return {
        outcome: "noop",
        detail: `${target.taskId} is already closed for merge ${target.mergedPr.mergeCommit.oid.slice(0, 12)}`,
      };
    }
    await createTaskCloseCommit({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: target.taskId,
      baseBranchOverride: nextMeta.base ?? "main",
      quiet: opts.quiet,
    });
    return {
      outcome: "meta-only",
      taskId: target.taskId,
      mergeHash: target.mergedPr.mergeCommit.oid,
    };
  }

  const taskCommitInfo = await resolveHostedTaskCommitInfo({
    gitRoot,
    mergedPr: target.mergedPr,
  });
  const prLabel = `PR #${target.mergedPr.number}`;
  const finishBody =
    `Verified: ${prLabel} merged on GitHub ${target.mergedPr.baseRefName ?? "main"}; ` +
    "hosted closure automation recorded canonical task artifacts.";
  await collectTaskIncidents({
    ctx: opts.ctx,
    taskId: target.taskId,
    task,
    write: false,
  });
  await writeFinishedTasks({
    ctx: opts.ctx,
    loadedTasks: [{ taskId: target.taskId, task }],
    metaTaskId: target.taskId,
    author: "INTEGRATOR",
    body: finishBody,
    force: false,
    resultProvided: true,
    resultSummary: `Merged via ${prLabel}.`,
    riskLevel: undefined,
    breaking: false,
    taskCommitInfo,
  });
  const collectedIncidents = await collectTaskIncidents({
    ctx: opts.ctx,
    taskId: target.taskId,
    write: true,
  });
  if (!opts.quiet) {
    process.stdout.write(
      `${infoMessage(
        renderIncidentCollectionPlanOutcome(collectedIncidents.plan, {
          wrote: collectedIncidents.wrote,
          context: "finish",
          promotedIds: collectedIncidents.plan.promotable.map((item) => item.entry.id),
          registryPaths: collectedIncidents.registryPaths,
        }),
      )}\n`,
    );
  }
  await createTaskCloseCommit({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: target.taskId,
    baseBranchOverride: nextMeta.base ?? "main",
    quiet: opts.quiet,
    allowPolicy: collectedIncidents.wrote,
  });
  return {
    outcome: "closed",
    taskId: target.taskId,
    mergeHash: target.mergedPr.mergeCommit.oid,
  };
}

export function makeRunTaskHostedCloseHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskHostedCloseParsed): Promise<number> => {
    try {
      const commandCtx = await getCtx("task hosted-close");
      const outcome = await closeHostedTask({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? undefined,
        eventJson: parsed.eventJson,
        quiet: parsed.quiet,
      });
      if (parsed.quiet) return 0;
      if (outcome.outcome === "noop") {
        process.stdout.write(`${infoMessage(`hosted close skipped: ${outcome.detail}`)}\n`);
        return 0;
      }
      const detail = `merge=${outcome.mergeHash.slice(0, 12)}`;
      process.stdout.write(`${successMessage("task hosted close", outcome.taskId, detail)}\n`);
      if (outcome.outcome === "meta-only") {
        process.stdout.write(
          `${infoMessage("task was already DONE; committed only the missing hosted PR metadata")}\n`,
        );
      }
      return 0;
    } catch (err) {
      throw mapBackendError(err, { command: "task hosted-close", root: ctx.rootOverride ?? null });
    }
  };
}
