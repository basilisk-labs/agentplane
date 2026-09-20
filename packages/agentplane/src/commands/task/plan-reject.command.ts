import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";

import { cmdTaskPlanReject } from "./plan.js";

export type TaskPlanRejectParsed = {
  taskId: string;
  by: string;
  note: string;
};

export const taskPlanRejectSpec: CommandSpec<TaskPlanRejectParsed> = {
  id: ["task", "plan", "reject"],
  group: "Task",
  summary: "Reject the current task plan (requires a note).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "by",
      valueHint: "<id>",
      required: true,
      description: "Reviewer id.",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      required: true,
      description: "Required note explaining what needs to change.",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task plan reject 202602030608-F1Q8AB --by USER --note "Need clarification"',
      why: "Reject a plan with a note.",
    },
  ],
  validateRaw: (raw) => {
    const by = raw.opts.by;
    if (typeof by === "string" && by.trim().length === 0) {
      throw usageError({ spec: taskPlanRejectSpec, message: "Invalid value for --by: empty." });
    }
    const note = raw.opts.note;
    if (typeof note === "string" && note.trim().length === 0) {
      throw usageError({ spec: taskPlanRejectSpec, message: "Invalid value for --note: empty." });
    }
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      by: String(raw.opts.by),
      note: String(raw.opts.note),
    };
  },
};

export function makeRunTaskPlanRejectHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskPlanRejectParsed): Promise<number> => {
    const command = await getCtx("task plan reject");
    const source = await command.taskBackend.getTask(p.taskId);
    if (source?.extensions && Object.hasOwn(source.extensions, TASK_KERNEL_EXTENSION)) {
      if (!/^USER(?::[A-Za-z0-9._@-]+)?$/u.test(p.by)) {
        throw usageError({
          spec: taskPlanRejectSpec,
          message: "Canonical approved-plan rejection requires --by USER.",
        });
      }
      const invocationId = `task-plan-reject:${p.taskId}:${k.kernelDigest(p.note)}`;
      const runtime = await createKernelRuntime({
        command,
        task_id: p.taskId,
        transport: "manual",
        operation_id: `reject:${k.kernelDigest({ by: p.by, note: p.note })}`,
        approval: {
          kind: "manual_operator",
          actor_id: p.by,
          invocation_id: invocationId,
        },
      });
      await runtime.checkpoint(await runtime.observe());
      const read = await runtime.adapter.read(p.taskId);
      if (read.kind !== "canonical") throw new Error(`Explicit migration required: ${read.kind}`);
      const plan = read.record.aggregate.current_plan;
      if (!plan) throw new Error("Canonical task has no plan to reject");
      const rejectionEvidence = k.kernelDigest({
        task_id: p.taskId,
        plan_revision: plan.revision,
        plan_digest: plan.digest,
        actor: p.by,
        note: p.note,
      });
      const approval = await runtime.native.readApproval(p.taskId);
      if (
        approval?.kind !== "manual_operator" ||
        approval.actor_id !== p.by ||
        approval.invocation_id !== invocationId
      ) {
        throw new Error("Canonical plan rejection requires exact manual USER approval");
      }
      const rejectionInput = await runtime.input(
        {
          kind: "reject_plan",
          plan_revision: plan.revision,
          plan_digest: plan.digest,
          rejection_evidence_digest: rejectionEvidence,
        },
        `reject:${rejectionEvidence}`,
      );
      const result = requireKernelCommit(
        await runtime.lifecycle.apply({
          ...rejectionInput,
          actor: { ...rejectionInput.actor, id: approval.actor_id, kind: "USER" },
        }),
      );
      createCliEmitter().json({
        task_id: p.taskId,
        canonical_revision: result.record.aggregate.revision,
        plan_digest: plan.digest,
        rejection_evidence_digest: rejectionEvidence,
      });
      return 0;
    }
    return await cmdTaskPlanReject({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      by: p.by,
      note: p.note,
    });
  };
}
