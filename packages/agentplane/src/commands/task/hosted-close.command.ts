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
import { buildIntegratedPrMeta, parsePrMeta } from "../shared/pr-meta.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { createTaskCloseCommit, writeFinishedTasks } from "./finish-shared.js";
import { resolveHostedMergeTargetFromEvent } from "./hosted-merge-sync.js";
import { readCommitInfo } from "./shared.js";
import { collectTaskIncidents, renderIncidentCollectionOutcome } from "../incidents/shared.js";

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
  const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: target.taskId });
  const metaPath = path.join(gitRoot, taskDirRelative, "pr", "meta.json");
  if (!(await fileExists(metaPath))) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Hosted task closure could not find pr/meta.json for ${target.taskId}`,
    });
  }

  const rawMeta = await readFile(metaPath, "utf8");
  const meta = parsePrMeta(rawMeta, target.taskId);
  const alreadyClosed =
    String(task.status || "TODO").toUpperCase() === "DONE" &&
    (task.commit?.hash ?? "") === target.mergedPr.mergeCommit.oid &&
    meta.status === "MERGED" &&
    (meta.merge_commit ?? "") === target.mergedPr.mergeCommit.oid;
  if (
    String(task.status || "TODO").toUpperCase() === "DONE" &&
    (task.commit?.hash ?? "") !== "" &&
    (task.commit?.hash ?? "") !== target.mergedPr.mergeCommit.oid
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
      baseBranchOverride: target.mergedPr.baseRefName ?? meta.base ?? "main",
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
      `${infoMessage(renderIncidentCollectionOutcome(collectedIncidents.plan.promotable.length))}\n`,
    );
  }
  await createTaskCloseCommit({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: target.taskId,
    baseBranchOverride: target.mergedPr.baseRefName ?? meta.base ?? "main",
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
