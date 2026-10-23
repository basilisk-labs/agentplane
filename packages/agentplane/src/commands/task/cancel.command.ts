import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cancelWithdrawnScope, type CancellationOptions } from "./kernel-cancellation.js";

type Parsed = Omit<CancellationOptions, "command">;
const pins = [
  "request-digest",
  "record-digest",
  "plan-digest",
  "fingerprint",
  "approval-evidence",
] as const;
export const taskCancelSpec: CommandSpec<Parsed> = {
  id: ["task", "cancel"],
  group: "Task",
  summary: "Record withdrawn scope as CANCELLED while preserving unfulfilled work and history.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "reason",
      required: true,
      valueHint: "<text>",
      description: "Reason the required scope was withdrawn.",
    },
    {
      kind: "string",
      name: "approved-by",
      valueHint: "USER",
      description: "Explicit manual USER approval; requires all emitted state pins.",
    },
    ...pins.map((name) => ({
      kind: "string" as const,
      name,
      valueHint: "<sha256:digest>",
      description: "Exact pin from the cancellation approval boundary.",
    })),
    {
      kind: "string",
      name: "revision",
      valueHint: "<revision>",
      description: "Exact canonical task revision from the approval boundary.",
    },
  ],
  validateRaw: (raw) => {
    if (
      !String(raw.args["task-id"] ?? "").trim() ||
      typeof raw.opts.reason !== "string" ||
      !raw.opts.reason.trim()
    )
      throw usageError({
        spec: taskCancelSpec,
        message: "Task and withdrawal reason are required.",
      });
    if (raw.opts["approved-by"] !== undefined && raw.opts["approved-by"] !== "USER")
      throw usageError({
        spec: taskCancelSpec,
        message: "Only explicit manual USER approval is supported.",
      });
    for (const pin of pins)
      if (
        raw.opts[pin] !== undefined &&
        (typeof raw.opts[pin] !== "string" || !/^sha256:[a-f0-9]{64}$/u.test(raw.opts[pin]))
      )
        throw usageError({ spec: taskCancelSpec, message: `Invalid ${pin}.` });
    if (
      raw.opts.revision !== undefined &&
      (typeof raw.opts.revision !== "string" || !/^[1-9][0-9]*$/u.test(raw.opts.revision))
    )
      throw usageError({ spec: taskCancelSpec, message: "Invalid revision." });
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    reason: String(raw.opts.reason),
    approvedBy: raw.opts["approved-by"] as string | undefined,
    requestDigest: raw.opts["request-digest"] as string | undefined,
    recordDigest: raw.opts["record-digest"] as string | undefined,
    planDigest: raw.opts["plan-digest"] as string | undefined,
    fingerprint: raw.opts.fingerprint as string | undefined,
    approvalEvidence: raw.opts["approval-evidence"] as string | undefined,
    revision: raw.opts.revision === undefined ? undefined : Number(raw.opts.revision),
  }),
};
export function makeRunTaskCancelHandler(getCtx: (command: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, parsed: Parsed): Promise<number> =>
    cancelWithdrawnScope({ ...parsed, command: await getCtx("task cancel") });
}
