import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import {
  prepareAgentWorkOrder,
  requirePreparedAgentWorkOrder,
} from "../../runner/usecases/agent-work-order.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskPlanApprove } from "./plan.js";
import {
  userApprovalReceiptRequestForStep,
  verifyUserApprovalReceipt,
} from "./user-approval-receipt.js";

export type TaskPlanApproveParsed = {
  taskId: string;
  by?: string;
  approvalReceipt?: string;
  note?: string;
};

export const taskPlanApproveSpec: CommandSpec<TaskPlanApproveParsed> = {
  id: ["task", "plan", "approve"],
  group: "Task",
  summary: "Approve the current task plan (enforces Verify Steps gating when configured).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "by",
      valueHint: "<id>",
      description: "Approver id.",
    },
    {
      kind: "string",
      name: "approval-receipt",
      valueHint: "<base64url>",
      description: "Signed user approval receipt from a configured trusted bridge.",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      description: "Optional note (stored in plan_approval.note).",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task plan approve 202602030608-F1Q8AB --by USER --note "OK"',
      why: "Approve a plan with a note.",
    },
  ],
  validateRaw: (raw) => {
    const by = raw.opts.by;
    const receipt = raw.opts["approval-receipt"];
    const hasBy = typeof by === "string" && by.trim().length > 0;
    const hasReceipt = typeof receipt === "string" && receipt.trim().length > 0;
    if (hasBy === hasReceipt) {
      throw usageError({
        spec: taskPlanApproveSpec,
        message: "Provide exactly one of --by or --approval-receipt.",
      });
    }
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      by: typeof raw.opts.by === "string" ? raw.opts.by.trim() : undefined,
      approvalReceipt:
        typeof raw.opts["approval-receipt"] === "string"
          ? raw.opts["approval-receipt"].trim()
          : undefined,
      note: typeof raw.opts.note === "string" ? raw.opts.note : undefined,
    };
  },
};

export function makeRunTaskPlanApproveHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskPlanApproveParsed): Promise<number> => {
    const commandCtx = await getCtx("task plan approve");
    let by = p.by;
    let note = p.note;
    let expectedTaskRevision: number | undefined;
    if (p.approvalReceipt) {
      const prepared = requirePreparedAgentWorkOrder(
        await prepareAgentWorkOrder({
          command_ctx: commandCtx,
          cwd: ctx.cwd,
          root_override: ctx.rootOverride ?? null,
          task_id: p.taskId,
        }),
      );
      const step = prepared.route_decision.workflowStep;
      if (step.kind !== "approval" || step.request.type !== "plan_approval") {
        throw usageError({
          spec: taskPlanApproveSpec,
          message: "Approval receipt is stale: the current route no longer requests plan approval.",
        });
      }
      const verified = verifyUserApprovalReceipt({
        encoded: p.approvalReceipt,
        config: commandCtx.config.authority.approval_receipts,
        request: userApprovalReceiptRequestForStep(step),
      });
      if (step.preconditionFingerprint.task_revision === null) {
        throw usageError({
          spec: taskPlanApproveSpec,
          message: "Approval receipt cannot be applied without a revisioned task state.",
        });
      }
      by = verified.actor;
      expectedTaskRevision = step.preconditionFingerprint.task_revision;
      note = [p.note?.trim(), `approval_receipt=${verified.digest}`].filter(Boolean).join("; ");
    }
    return await cmdTaskPlanApprove({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      by: by ?? "",
      note,
      expectedTaskRevision,
    });
  };
}
