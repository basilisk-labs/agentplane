import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import type { CommandContext } from "../shared/task-backend.js";

import { recoverTaskPlanRejection } from "./plan-rejection-recovery.js";

type Parsed = {
  taskId: string;
  expectedReadmeRevision: number;
  expectedAggregateRevision: number;
  rejectedPlanDigest: `sha256:${string}`;
  expectedStateFingerprint: `sha256:${string}`;
  by: string;
  note: string;
};

const digestPattern = /^sha256:[0-9a-f]{64}$/u;

export const taskPlanRecoverRejectionSpec: CommandSpec<Parsed> = {
  id: ["task", "plan", "recover-rejection"],
  group: "Task",
  summary: "Recover a verified split task-centric plan-rejection projection.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "expected-readme-revision",
      required: true,
      valueHint: "<n>",
      description: "Exact rejected README revision.",
    },
    {
      kind: "string",
      name: "expected-aggregate-revision",
      required: true,
      valueHint: "<n>",
      description: "Exact stale aggregate revision.",
    },
    {
      kind: "string",
      name: "rejected-plan-digest",
      required: true,
      valueHint: "<sha256>",
      description: "Rejected canonical plan digest.",
    },
    {
      kind: "string",
      name: "expected-state-fingerprint",
      required: true,
      valueHint: "<sha256>",
      description: "Exact current task route fingerprint.",
    },
    {
      kind: "string",
      name: "by",
      required: true,
      valueHint: "<id>",
      description: "Recovery operator id.",
    },
    {
      kind: "string",
      name: "note",
      required: true,
      valueHint: "<text>",
      description: "Auditable recovery reason.",
    },
  ],
  parse: (raw) => {
    const readme = Number(raw.opts["expected-readme-revision"]);
    const aggregate = Number(raw.opts["expected-aggregate-revision"]);
    const plan = String(raw.opts["rejected-plan-digest"]);
    const fingerprint = String(raw.opts["expected-state-fingerprint"]);
    if (!Number.isInteger(readme) || readme < 1 || !Number.isInteger(aggregate) || aggregate < 1) {
      throw usageError({
        spec: taskPlanRecoverRejectionSpec,
        message: "Expected revisions must be positive integers.",
      });
    }
    if (!digestPattern.test(plan) || !digestPattern.test(fingerprint)) {
      throw usageError({
        spec: taskPlanRecoverRejectionSpec,
        message: "Plan digest and state fingerprint must be SHA-256 digests.",
      });
    }
    return {
      taskId: String(raw.args["task-id"]),
      expectedReadmeRevision: readme,
      expectedAggregateRevision: aggregate,
      rejectedPlanDigest: plan as `sha256:${string}`,
      expectedStateFingerprint: fingerprint as `sha256:${string}`,
      by: String(raw.opts.by),
      note: String(raw.opts.note),
    };
  },
};

export function makeRunTaskPlanRecoverRejectionHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, parsed: Parsed): Promise<number> => {
    const command = await getCtx("task plan recover-rejection");
    const decision = await buildTaskRouteDecision({
      ctx: command,
      cwd: command.resolvedProject.gitRoot,
      rootOverride: null,
      includeRemote: false,
      taskId: parsed.taskId,
    });
    const receipt = await recoverTaskPlanRejection({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      ...parsed,
      observedStateFingerprint: decision.workflowStep.preconditionFingerprint
        .digest as `sha256:${string}`,
    });
    createCliEmitter().json({
      task_id: parsed.taskId,
      recovery: "plan_rejection_projection",
      receipt,
    });
    return 0;
  };
}
