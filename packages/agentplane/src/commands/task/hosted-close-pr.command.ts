import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { executeHostedClosePrPlan } from "./hosted-close-pr.execute.js";
import { postcheckHostedClosePrResult } from "./hosted-close-pr.postcheck.js";
import { precheckHostedClosePr } from "./hosted-close-pr.precheck.js";
import {
  reportHostedClosePrExecutionResult,
  reportHostedClosePrOutcome,
} from "./hosted-close-pr.report.js";
import type { TaskHostedClosePrParsed } from "./hosted-close-pr.types.js";

/**
 * Retained public command boundary: this module owns the CLI spec and handler
 * wiring; hosted-close-pr.* phase modules own execution details.
 */
export const taskHostedClosePrSpec: CommandSpec<TaskHostedClosePrParsed> = {
  id: ["task", "hosted-close-pr"],
  group: "Task",
  summary: "Open one or more follow-up hosted closure PRs from remote task-close branches.",
  args: [{ name: "task-id", required: true, variadic: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "branch",
      valueHint: "<name>",
      description:
        "Optional explicit task-close branch name (default: derive from task PR metadata or remote refs).",
    },
    {
      kind: "string",
      name: "repo",
      valueHint: "<owner/name>",
      description: "Optional GitHub owner/repo override (defaults to origin remote).",
    },
  ],
  examples: [
    {
      cmd: "agentplane task hosted-close-pr 202604091218-JREJ4K",
      why: "Open the hosted closure PR after the workflow left a manual handoff comment.",
    },
    {
      cmd: "agentplane task hosted-close-pr 202604091725-CB0Y6S 202604091725-H21SCP",
      why: "Open multiple pending hosted closure PRs in one batch after a closure-wave merge.",
    },
  ],
  validateRaw: (raw) => {
    const taskIds = Array.isArray(raw.args["task-id"])
      ? raw.args["task-id"]
      : typeof raw.args["task-id"] === "string"
        ? [raw.args["task-id"]]
        : [];
    const normalizedTaskIds = taskIds.map((taskId) => String(taskId).trim()).filter(Boolean);
    if (normalizedTaskIds.length === 0) {
      throw usageError({
        spec: taskHostedClosePrSpec,
        message: "Invalid value for task-id: empty.",
      });
    }
    if (typeof raw.opts.branch === "string" && raw.opts.branch.trim() === "") {
      throw usageError({
        spec: taskHostedClosePrSpec,
        message: "Invalid value for --branch: empty.",
      });
    }
    if (typeof raw.opts.repo === "string" && raw.opts.repo.trim() === "") {
      throw usageError({
        spec: taskHostedClosePrSpec,
        message: "Invalid value for --repo: empty.",
      });
    }
  },
  parse: (raw) => ({
    taskIds: (Array.isArray(raw.args["task-id"])
      ? raw.args["task-id"]
      : typeof raw.args["task-id"] === "string"
        ? [raw.args["task-id"]]
        : []
    )
      .map((taskId) => String(taskId).trim())
      .filter(Boolean),
    branch: typeof raw.opts.branch === "string" ? raw.opts.branch : null,
    repo: typeof raw.opts.repo === "string" ? raw.opts.repo : null,
  }),
};

async function openHostedClosePr(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  branch?: string | null;
  repo?: string | null;
}): Promise<number> {
  const precheck = await precheckHostedClosePr(opts);
  if (precheck.kind === "skip") {
    reportHostedClosePrOutcome(precheck.outcome);
    return 0;
  }

  const result = postcheckHostedClosePrResult(await executeHostedClosePrPlan(precheck.plan));
  reportHostedClosePrExecutionResult(result);
  return 0;
}

export function makeRunTaskHostedClosePrHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskHostedClosePrParsed): Promise<number> => {
    try {
      const commandCtx = await getCtx("task hosted-close-pr");
      for (const taskId of p.taskIds) {
        await openHostedClosePr({
          ctx: commandCtx,
          cwd: ctx.cwd,
          rootOverride: ctx.rootOverride,
          taskId,
          branch: p.branch,
          repo: p.repo,
        });
      }
      return 0;
    } catch (err) {
      if (err instanceof CliError) throw err;
      throw mapBackendError(err, {
        command: "task hosted-close-pr",
        root: ctx.rootOverride ?? null,
      });
    }
  };
}
