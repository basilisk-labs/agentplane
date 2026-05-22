import { execFile } from "node:child_process";
import { promisify } from "node:util";

import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { cmdPrUpdate } from "../pr/update.js";
import { executeHostedClosePrPlan } from "../task/hosted-close-pr.execute.js";
import { postcheckHostedClosePrResult } from "../task/hosted-close-pr.postcheck.js";
import { precheckHostedClosePr } from "../task/hosted-close-pr.precheck.js";
import {
  reportHostedClosePrExecutionResult,
  reportHostedClosePrOutcome,
} from "../task/hosted-close-pr.report.js";

const execFileAsync = promisify(execFile);

export type FlowRepairParsed = {
  taskId: string;
  dryRun: boolean;
  safeApply: boolean;
  json: boolean;
};

type FlowRepairApplyResult = {
  code: string;
  command: string | null;
  status: "applied" | "skipped";
  reason?: string;
};

export const flowRepairSpec: CommandSpec<FlowRepairParsed> = {
  id: ["flow", "repair"],
  group: "Workflow",
  summary: "Print or apply safe repair steps for task workflow drift.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "dry-run",
      default: true,
      description: "Print planned repairs without mutating.",
    },
    {
      kind: "boolean",
      name: "safe-apply",
      default: false,
      description:
        "Apply only deterministic safe repairs; approval and provider merge actions are never executed.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane flow repair 202602030608-F1Q8AB --dry-run",
      why: "Classify workflow drift and print safe next commands.",
    },
    {
      cmd: "agentplane flow repair 202602030608-F1Q8AB --safe-apply",
      why: "Apply safe local/lifecycle repairs and print any skipped provider or approval actions.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    dryRun: raw.opts["safe-apply"] === true ? false : raw.opts["dry-run"] !== false,
    safeApply: raw.opts["safe-apply"] === true,
    json: raw.opts.json === true,
  }),
};

async function runHostedClosePrRepair(opts: {
  commandCtx: CommandContext;
  cliCtx: CommandCtx;
  taskId: string;
  silent: boolean;
}): Promise<void> {
  const precheck = await precheckHostedClosePr({
    ctx: opts.commandCtx,
    cwd: opts.cliCtx.cwd,
    rootOverride: opts.cliCtx.rootOverride,
    taskId: opts.taskId,
  });
  if (precheck.kind === "skip") {
    reportHostedClosePrOutcome(precheck.outcome, { silent: opts.silent });
    return;
  }
  reportHostedClosePrExecutionResult(
    postcheckHostedClosePrResult(await executeHostedClosePrPlan(precheck.plan)),
    { silent: opts.silent },
  );
}

async function applySafeRepairStep(opts: {
  commandCtx: CommandContext;
  cliCtx: CommandCtx;
  taskId: string;
  step: { code: string; command: string | null };
  prBranch: string | null;
  json: boolean;
}): Promise<FlowRepairApplyResult> {
  const base = { code: opts.step.code, command: opts.step.command };
  if (opts.step.code === "update_pr_artifacts") {
    await cmdPrUpdate({
      ctx: opts.commandCtx,
      cwd: opts.cliCtx.cwd,
      rootOverride: opts.cliCtx.rootOverride,
      taskId: opts.taskId,
      silent: opts.json,
    });
    return { ...base, status: "applied" };
  }
  if (opts.step.code === "fetch_branch") {
    if (!opts.prBranch) {
      return { ...base, status: "skipped", reason: "missing_branch_name" };
    }
    await execFileAsync("git", ["fetch", "origin", opts.prBranch], {
      cwd: opts.commandCtx.resolvedProject.gitRoot,
    });
    return { ...base, status: "applied" };
  }
  if (opts.step.code === "open_close_tail") {
    await runHostedClosePrRepair({
      commandCtx: opts.commandCtx,
      cliCtx: opts.cliCtx,
      taskId: opts.taskId,
      silent: opts.json,
    });
    return { ...base, status: "applied" };
  }
  const unsafeCodes = new Set(["approve_plan", "merge_close_tail", "wait_close_tail"]);
  const reason = unsafeCodes.has(opts.step.code)
    ? "requires_approval_or_provider_action"
    : "not_in_safe_apply_allowlist";
  return { ...base, status: "skipped", reason };
}

export function makeRunFlowRepairHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: FlowRepairParsed): Promise<number> => {
    if (!parsed.dryRun && !parsed.safeApply) {
      throw usageError({
        spec: flowRepairSpec,
        message: "flow repair requires --dry-run or --safe-apply.",
        command: "flow repair",
      });
    }
    const commandCtx = await getCtx("flow repair");
    const decision = await buildTaskRouteDecision({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
    });
    const applied: FlowRepairApplyResult[] = [];
    if (parsed.safeApply) {
      for (const step of decision.repairPlan) {
        applied.push(
          await applySafeRepairStep({
            commandCtx,
            cliCtx: ctx,
            taskId: parsed.taskId,
            step,
            prBranch: decision.workspace.prBranch,
            json: parsed.json,
          }),
        );
      }
    }
    const output = createCliEmitter();
    if (parsed.json) {
      output.json({
        task: decision.task,
        blockers: decision.blockers,
        repair_plan: decision.repairPlan,
        applied,
        next_action: decision.nextAction,
      });
      return 0;
    }
    output.report(
      [
        { label: "dry_run", value: parsed.dryRun },
        { label: "safe_apply", value: parsed.safeApply },
        { label: "task", value: `${decision.task.id} ${decision.task.status}` },
        ...decision.blockers.map((blocker) => ({
          label: "blocker",
          value: `${blocker.code}: ${blocker.summary}`,
        })),
        ...decision.repairPlan.map((step) => ({
          label: step.mutates ? "would_run" : "inspect",
          value: step.command ?? `${step.code}: ${step.summary}`,
        })),
        ...applied.map((result) => ({
          label: result.status === "applied" ? "applied" : "skipped",
          value: result.reason
            ? `${result.code}: ${result.reason}`
            : (result.command ?? result.code),
        })),
      ],
      { header: infoMessage(`flow repair: ${parsed.taskId}`) },
    );
    return 0;
  };
}
