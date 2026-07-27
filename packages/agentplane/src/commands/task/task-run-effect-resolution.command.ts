import { RUNNER_EFFECT_RESOLUTION_VERDICT_VALUES } from "@agentplaneorg/core/schemas";

import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { resumeTaskRunnerEffectExecution } from "../../runner/usecases/task-run-lifecycle.js";
import {
  acceptLegacyTaskRunnerEffect,
  resolveTaskRunnerEffect,
} from "../../runner/usecases/task-run-effect-resolution.js";
import type { CommandContext } from "../shared/task-backend.js";
import { renderTaskRunPayload, reportExecutedTaskRun } from "./run-render.js";

type TaskRunResolveEffectParsed = {
  taskId: string;
  runId: string;
  verdict: (typeof RUNNER_EFFECT_RESOLUTION_VERDICT_VALUES)[number];
  actor: string;
  observedAt: string;
  authorityRef: string;
  authorityDigest: string;
  preconditionFingerprintDigest: string;
  preconditionPolicyDigest: string;
  evidenceRef: string;
  evidenceText: string;
  claimGeneration: string;
  acceptLegacy: boolean;
  json: boolean;
};

type TaskRunResumeEffectParsed = {
  taskId: string;
  runId: string;
  newRunId?: string;
  json: boolean;
};

export const taskRunResolveEffectSpec: CommandSpec<TaskRunResolveEffectParsed> = {
  id: ["task", "run", "resolve-effect"],
  group: "Task",
  summary: "Record an operator-supplied verdict for a terminal uncertain runner effect.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "run-id",
      valueHint: "<run-id>",
      required: true,
      description: "Uncertain runner run.",
    },
    {
      kind: "string",
      name: "verdict",
      choices: [...RUNNER_EFFECT_RESOLUTION_VERDICT_VALUES],
      valueHint: "<applied|not_applied>",
      required: true,
      description: "Operator-supplied effect verdict.",
    },
    {
      kind: "string",
      name: "actor",
      valueHint: "<operator>",
      required: true,
      description: "Actor making the verdict.",
    },
    {
      kind: "string",
      name: "observed-at",
      valueHint: "<ISO-8601>",
      required: true,
      description: "When the operator observed the evidence.",
    },
    {
      kind: "string",
      name: "authority-ref",
      valueHint: "<ref>",
      required: true,
      description: "Exact operation authority reference.",
    },
    {
      kind: "string",
      name: "authority-digest",
      valueHint: "<sha256:...>",
      required: true,
      description: "Exact operation authority digest.",
    },
    {
      kind: "string",
      name: "precondition-fingerprint-digest",
      valueHint: "<sha256:...>",
      required: true,
      description: "Exact prepared state fingerprint digest.",
    },
    {
      kind: "string",
      name: "precondition-policy-digest",
      valueHint: "<sha256:...>",
      required: true,
      description: "Exact prepared fingerprint policy digest.",
    },
    {
      kind: "string",
      name: "evidence-ref",
      valueHint: "<ref>",
      required: true,
      description: "Stable locator for operator evidence.",
    },
    {
      kind: "string",
      name: "evidence-text",
      valueHint: "<text>",
      required: true,
      description: "Evidence content, retained only as a canonical digest.",
    },
    {
      kind: "string",
      name: "claim-generation",
      valueHint: "<generation>",
      required: true,
      description: "Exact active claim generation observed by the operator.",
    },
    {
      kind: "boolean",
      name: "accept-legacy",
      default: false,
      description:
        "Record a non-releasing acknowledgement for RF-06 evidence without a typed pre-effect operation.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane task run resolve-effect 202602030608-F1Q8AB --run-id run-1 --verdict applied --actor operator --observed-at 2026-07-27T00:00:00Z --authority-ref work-order:example --authority-digest sha256:... --precondition-fingerprint-digest sha256:... --precondition-policy-digest sha256:... --evidence-ref ticket:123 --evidence-text 'provider confirms completion' --claim-generation generation-1",
      why: "Attach a bounded operator verdict before retiring only the matching stale claim.",
    },
  ],
  notes: [
    "This command never invokes a runner adapter and never derives a verdict from logs.",
    "Generic reconcile, retry, resume, and cancellation retain unresolved effect authority.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: String(raw.opts["run-id"]),
    verdict: raw.opts.verdict as (typeof RUNNER_EFFECT_RESOLUTION_VERDICT_VALUES)[number],
    actor: String(raw.opts.actor),
    observedAt: String(raw.opts["observed-at"]),
    authorityRef: String(raw.opts["authority-ref"]),
    authorityDigest: String(raw.opts["authority-digest"]),
    preconditionFingerprintDigest: String(raw.opts["precondition-fingerprint-digest"]),
    preconditionPolicyDigest: String(raw.opts["precondition-policy-digest"]),
    evidenceRef: String(raw.opts["evidence-ref"]),
    evidenceText: String(raw.opts["evidence-text"]),
    claimGeneration: String(raw.opts["claim-generation"]),
    acceptLegacy: raw.opts["accept-legacy"] === true,
    json: raw.opts.json === true,
  }),
};

export const taskRunResumeEffectSpec: CommandSpec<TaskRunResumeEffectParsed> = {
  id: ["task", "run", "resume-effect"],
  group: "Task",
  summary: "Start one new operation only after an operator not_applied effect resolution.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "run-id",
      valueHint: "<run-id>",
      required: true,
      description: "Resolved source run.",
    },
    {
      kind: "string",
      name: "new-run-id",
      valueHint: "<run-id>",
      description: "Optional fresh destination run id.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  notes: [
    "Only an attached operator-supplied not_applied verdict permits this command.",
    "The destination receives a fresh operation key; applied and unresolved effects remain non-retryable.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: String(raw.opts["run-id"]),
    newRunId:
      typeof raw.opts["new-run-id"] === "string" ? String(raw.opts["new-run-id"]) : undefined,
    json: raw.opts.json === true,
  }),
};

export function makeRunTaskRunResolveEffectHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, parsed: TaskRunResolveEffectParsed): Promise<number> => {
    const commandCtx = await getCtx("task run resolve-effect");
    const input = {
      ctx: commandCtx,
      task_id: parsed.taskId,
      run_id: parsed.runId,
      verdict: parsed.verdict,
      actor: parsed.actor,
      observed_at: parsed.observedAt,
      authority_ref: parsed.authorityRef,
      authority_digest: parsed.authorityDigest,
      precondition_fingerprint_digest: parsed.preconditionFingerprintDigest,
      precondition_policy_digest: parsed.preconditionPolicyDigest,
      evidence_ref: parsed.evidenceRef,
      evidence_text: parsed.evidenceText,
      active_claim_generation: parsed.claimGeneration,
    };
    if (parsed.acceptLegacy) {
      const result = await acceptLegacyTaskRunnerEffect(input);
      const output = createCliEmitter();
      if (parsed.json) output.json(result);
      else
        output.report(
          [
            { label: "task", value: result.task_id },
            { label: "run", value: result.run_id },
            { label: "legacy_acceptance", value: result.acceptance_digest },
            { label: "active_claim_retained", value: result.active_claim_retained },
            { label: "next_safe_action", value: result.next_safe_action },
          ],
          { header: infoMessage(`task runner legacy effect acknowledgement: ${parsed.taskId}`) },
        );
      return 0;
    }
    const result = await resolveTaskRunnerEffect(input);
    const output = createCliEmitter();
    if (parsed.json) output.json(result);
    else
      output.report(
        [
          { label: "task", value: result.task_id },
          { label: "run", value: result.run_id },
          { label: "operation", value: result.operation_key },
          { label: "verdict", value: result.verdict },
          { label: "claim_retirement", value: result.claim_retirement },
          { label: "resolution", value: result.resolution.resolution_digest },
        ],
        { header: infoMessage(`task runner effect resolution: ${parsed.taskId}`) },
      );
    return 0;
  };
}

export function makeRunTaskRunResumeEffectHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, parsed: TaskRunResumeEffectParsed): Promise<number> => {
    const commandCtx = await getCtx("task run resume-effect");
    const resumed = await resumeTaskRunnerEffectExecution({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
      ...(parsed.newRunId ? { new_run_id: parsed.newRunId } : {}),
    });
    const payload = renderTaskRunPayload({
      taskId: parsed.taskId,
      mode: "execute",
      adapterId: resumed.invocation.adapter_id,
      runId: resumed.invocation.run_id,
      runDir: resumed.invocation.run_dir,
      bundlePath: resumed.invocation.bundle_path,
      bootstrapPath: resumed.invocation.bootstrap_path ?? "",
      resultPath: resumed.invocation.result_path,
      status: resumed.result.status,
      verificationState: resumed.result.execution_receipt?.verification_state,
      receiptPath: resumed.result.execution_receipt?.path,
      exitCode: resumed.result.exit_code,
      summary: resumed.result.summary,
      activeClaimCleanup: resumed.active_claim_cleanup,
    });
    const output = createCliEmitter();
    if (parsed.json) output.json(payload);
    else reportExecutedTaskRun(payload, parsed.taskId);
    return resumed.result.status === "success" && !resumed.active_claim_cleanup ? 0 : 1;
  };
}
