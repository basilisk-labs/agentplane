import type { CommandContext } from "../shared/task-backend.js";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { acceptKernelFinalTimingException } from "./kernel-final-timing-exception.js";

type Options = {
  taskId: string;
  stateDigest: string;
  failureEvidence: string;
  failedCommand: string;
  maxOverageMs: number;
  changeNumber: number;
  branch: string;
  headSha: string;
  outcomeReport: string;
  approvalReceipt?: string;
  approvalRequestDigest?: string;
  by?: string;
  note?: string;
};

export const taskFinalTimingExceptionSpec: CommandSpec<Options> = {
  id: ["task", "final-validation", "accept-timing"],
  group: "Task",
  summary:
    "Accept one exact FAILED timing-only final check under bounded USER authority and green hosted checks.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "state-digest",
      required: true,
      valueHint: "<sha256:...>",
      description: "Current canonical record digest.",
    },
    {
      kind: "string",
      name: "failure-evidence",
      required: true,
      valueHint: "<sha256:...>",
      description: "Digest of the original FAILED final-validation artifact.",
    },
    {
      kind: "string",
      name: "failed-command",
      required: true,
      valueHint: "<command>",
      description: "Exact failed declared check command.",
    },
    {
      kind: "string",
      name: "max-overage-ms",
      required: true,
      valueHint: "<milliseconds>",
      description: "USER-approved positive bound, at most 5% of budget and 60 seconds.",
    },
    {
      kind: "string",
      name: "change-number",
      required: true,
      valueHint: "<number>",
      description: "Hosted pull or merge request number.",
    },
    {
      kind: "string",
      name: "branch",
      required: true,
      valueHint: "<branch>",
      description: "Exact hosted source branch.",
    },
    {
      kind: "string",
      name: "head-sha",
      required: true,
      valueHint: "<sha>",
      description: "Exact implementation commit with green hosted checks.",
    },
    {
      kind: "string",
      name: "outcome-report",
      required: true,
      valueHint: "<base64url-json>",
      description: "Structured USER-attested aggregate outcome and required hosted checks.",
    },
    {
      kind: "string",
      name: "approval-receipt",
      valueHint: "<base64url-receipt>",
      description:
        "Signed USER receipt from a configured trusted issuer. Omit to inspect the exact request.",
    },
    {
      kind: "string",
      name: "approval-request-digest",
      valueHint: "<sha256:...>",
      description: "Exact request digest from read-only inspection for manual USER approval.",
    },
    {
      kind: "string",
      name: "by",
      valueHint: "USER",
      description: "USER operator attribution for the manual route.",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<reason>",
      description: "Reason for accepting this bounded timing overage.",
    },
  ],
  validateRaw(raw) {
    const digest = /^sha256:[a-f0-9]{64}$/u;
    const state = String(raw.opts["state-digest"]);
    const failure = String(raw.opts["failure-evidence"]);
    const head = String(raw.opts["head-sha"]);
    const overage = Number(raw.opts["max-overage-ms"]);
    const change = Number(raw.opts["change-number"]);
    const manual = ["approval-request-digest", "by", "note"].map((name) => raw.opts[name]);
    if (
      !digest.test(state) ||
      !digest.test(failure) ||
      !/^[a-f0-9]{40,64}$/u.test(head) ||
      !Number.isSafeInteger(overage) ||
      overage <= 0 ||
      !Number.isSafeInteger(change) ||
      change <= 0 ||
      !String(raw.opts["failed-command"]).trim() ||
      !String(raw.opts.branch).trim() ||
      !String(raw.opts["outcome-report"]).trim()
    )
      throw usageError({
        spec: taskFinalTimingExceptionSpec,
        message: "Exact digests, command, branch, head and positive integer bounds are required.",
      });
    if (
      manual.some((value) => value !== undefined) &&
      (manual.some((value) => typeof value !== "string" || !value.trim()) ||
        !digest.test(String(manual[0])) ||
        manual[1] !== "USER" ||
        raw.opts["approval-receipt"] !== undefined)
    )
      throw usageError({
        spec: taskFinalTimingExceptionSpec,
        message:
          "Manual approval requires --approval-request-digest, --by USER, and --note, without a signed receipt.",
      });
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    stateDigest: String(raw.opts["state-digest"]),
    failureEvidence: String(raw.opts["failure-evidence"]),
    failedCommand: String(raw.opts["failed-command"]),
    maxOverageMs: Number(raw.opts["max-overage-ms"]),
    changeNumber: Number(raw.opts["change-number"]),
    branch: String(raw.opts.branch),
    headSha: String(raw.opts["head-sha"]),
    outcomeReport: String(raw.opts["outcome-report"]),
    approvalReceipt:
      typeof raw.opts["approval-receipt"] === "string"
        ? raw.opts["approval-receipt"].trim()
        : undefined,
    approvalRequestDigest:
      typeof raw.opts["approval-request-digest"] === "string"
        ? raw.opts["approval-request-digest"]
        : undefined,
    by: typeof raw.opts.by === "string" ? raw.opts.by : undefined,
    note: typeof raw.opts.note === "string" ? raw.opts.note : undefined,
  }),
};

export function makeRunTaskFinalTimingExceptionHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, opts: Options) => {
    const result = await acceptKernelFinalTimingException(
      await getCtx("task final-validation accept-timing"),
      {
        task_id: opts.taskId,
        state_digest: opts.stateDigest,
        failure_evidence_digest: opts.failureEvidence,
        failed_command: opts.failedCommand,
        max_overage_ms: opts.maxOverageMs,
        change_number: opts.changeNumber,
        branch: opts.branch,
        head_sha: opts.headSha,
        outcome_report: opts.outcomeReport,
        approval_receipt: opts.approvalReceipt,
        approval_request_digest: opts.approvalRequestDigest,
        by: opts.by,
        note: opts.note,
      },
    );
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return 0;
  };
}
