import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  executeTaskRunnerExecution,
  prepareTaskRunnerExecution,
} from "../../runner/usecases/task-run.js";
import { RUNNER_SANDBOX_MODES } from "../../runner/types.js";
import {
  loadTaskRunnerDiagnosticInspection,
  loadTaskRunnerInspection,
} from "../../runner/usecases/task-run-inspect.js";
import { reconcileTaskRunnerActiveClaim } from "../../runner/usecases/task-run-active-claim-runtime.js";
import { type TaskRunLogsParsed, parsePositiveInteger } from "./run-parse.js";
import {
  loadRunnerLogText,
  reportRunnerStatus,
  renderRunnerDiagnosticInspectPayload,
  renderRunnerDiagnosticStatusPayload,
  renderRunnerStatusPayload,
  runnerReconciliationWarning,
  renderTaskRunPayload,
  reportExecutedTaskRun,
  reportPreparedTaskRun,
  tailText,
} from "./run-render.js";
import { followRunnerLogs } from "./run-logs-follow.js";
import {
  acceptLegacyTaskRunnerEffect,
  resolveTaskRunnerEffect,
} from "../../runner/usecases/task-run-effect-resolution.js";
import { RUNNER_EFFECT_RESOLUTION_VERDICT_VALUES } from "@agentplaneorg/core/schemas";
import { resumeTaskRunnerEffectExecution } from "../../runner/usecases/task-run-lifecycle.js";

export type TaskRunParsed = {
  taskId: string;
  dryRun: boolean;
  remote: boolean;
  sandbox?: string;
  allowDangerFullAccess: boolean;
  json: boolean;
};

export type TaskRunStatusParsed = {
  taskId: string;
  runId?: string;
  json: boolean;
};

export type TaskRunInspectParsed = {
  taskId: string;
  runId?: string;
  json: boolean;
  events: number;
};

export type TaskRunReconcileParsed = {
  taskId: string;
  json: boolean;
};

export type TaskRunResolveEffectParsed = {
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

export type TaskRunResumeEffectParsed = {
  taskId: string;
  runId: string;
  newRunId?: string;
  json: boolean;
};

export const taskRunSpec: CommandSpec<TaskRunParsed> = {
  id: ["task", "run"],
  group: "Task",
  summary: "Run an AgentPlane task through the configured runner adapter.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Prepare runner artifacts and invocation without executing the adapter.",
    },
    {
      kind: "boolean",
      name: "remote",
      default: false,
      description: "Include hosted PR/check/review state in the prepared work order.",
    },
    {
      kind: "string",
      name: "sandbox",
      choices: [...RUNNER_SANDBOX_MODES],
      valueHint: `<${RUNNER_SANDBOX_MODES.join("|")}>`,
      description: "Override the role-derived sandbox for this run.",
    },
    {
      kind: "boolean",
      name: "allow-danger-full-access",
      default: false,
      description:
        "Explicitly authorize a requested danger-full-access sandbox and record CLI provenance.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane task run 202602030608-F1Q8AB",
      why: "Execute the task with the configured runner adapter.",
    },
    {
      cmd: "agentplane task run 202602030608-F1Q8AB --dry-run --json",
      why: "Inspect the prepared runner invocation and artifact paths without starting the agent.",
    },
  ],
  notes: [
    "The task must already be DOING; use `agentplane task start-ready ...` first.",
    "With the default Codex adapter, the runner prompt starts with `/goal ...` and then includes the AgentPlane bundle contract.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    dryRun: raw.opts["dry-run"] === true,
    remote: raw.opts.remote === true,
    sandbox: typeof raw.opts.sandbox === "string" ? raw.opts.sandbox : undefined,
    allowDangerFullAccess: raw.opts["allow-danger-full-access"] === true,
    json: raw.opts.json === true,
  }),
};

export const taskRunStatusSpec: CommandSpec<TaskRunStatusParsed> = {
  id: ["task", "run", "status"],
  group: "Task",
  summary: "Show the latest or selected task runner run status.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "run-id",
      valueHint: "<run-id>",
      description: "Inspect a specific runner run id.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane task run status 202602030608-F1Q8AB --json",
      why: "Inspect the latest runner state for a task.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: typeof raw.opts["run-id"] === "string" ? String(raw.opts["run-id"]) : undefined,
    json: raw.opts.json === true,
  }),
};

export const taskRunInspectSpec: CommandSpec<TaskRunInspectParsed> = {
  id: ["task", "run", "inspect"],
  group: "Task",
  summary: "Inspect task runner artifacts, state, and recent events.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "run-id",
      valueHint: "<run-id>",
      description: "Inspect a specific runner run id.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
    {
      kind: "string",
      name: "events",
      valueHint: "<count>",
      default: "10",
      description: "Number of recent runner events to show.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task run inspect 202602030608-F1Q8AB",
      why: "Inspect artifact paths and recent runner events.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: typeof raw.opts["run-id"] === "string" ? String(raw.opts["run-id"]) : undefined,
    json: raw.opts.json === true,
    events: parsePositiveInteger(raw.opts.events, 10, "--events"),
  }),
};

export const taskRunReconcileSpec: CommandSpec<TaskRunReconcileParsed> = {
  id: ["task", "run", "reconcile"],
  group: "Task",
  summary: "Safely reconcile stale task runner authority without starting a provider.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  examples: [
    {
      cmd: "agentplane task run reconcile 202602030608-F1Q8AB --json",
      why: "Project or retire a provably stale claim without starting another agent run.",
    },
  ],
  notes: [
    "The command never starts a runner adapter and never sends a process termination signal.",
    "Active, unverified, running, spawn-authorized, and cleanup-unverified claims fail closed.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
  }),
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
      description: "Stable locator for the operator evidence.",
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

export const taskRunLogsSpec: CommandSpec<TaskRunLogsParsed> = {
  id: ["task", "run", "logs"],
  group: "Task",
  summary: "Print task runner events, trace, or stderr logs.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "run-id",
      valueHint: "<run-id>",
      description: "Inspect a specific runner run id.",
    },
    {
      kind: "string",
      name: "stream",
      valueHint: "<events|trace|stderr>",
      choices: ["events", "trace", "stderr"],
      default: "trace",
      description: "Runner log stream to print.",
    },
    {
      kind: "boolean",
      name: "follow",
      short: "f",
      default: false,
      description: "Follow log output until the run exits.",
    },
    {
      kind: "string",
      name: "tail",
      valueHint: "<lines>",
      default: "80",
      description: "Number of trailing lines to print before following.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task run logs 202602030608-F1Q8AB --stream events --follow",
      why: "Watch runner lifecycle events while a task run is active.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: typeof raw.opts["run-id"] === "string" ? String(raw.opts["run-id"]) : undefined,
    stream:
      raw.opts.stream === "events" || raw.opts.stream === "stderr" || raw.opts.stream === "trace"
        ? raw.opts.stream
        : "trace",
    follow: raw.opts.follow === true,
    tail: parsePositiveInteger(raw.opts.tail, 80, "--tail"),
  }),
};

export function makeRunTaskRunHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunParsed): Promise<number> => {
    const commandCtx = await getCtx("task run");
    const output = createCliEmitter();
    const dangerAuthority = parsed.allowDangerFullAccess
      ? {
          danger_full_access_authorized: true as const,
          provenance: "explicit_operator" as const,
          source: "task run --allow-danger-full-access",
        }
      : null;
    if (parsed.dryRun) {
      const prepared = await prepareTaskRunnerExecution({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? null,
        task_id: parsed.taskId,
        mode: "dry_run",
        ...(parsed.remote ? { include_remote: true } : {}),
        danger_authority: dangerAuthority,
        sandbox_override: parsed.sandbox,
      });
      const payload = renderTaskRunPayload({
        taskId: parsed.taskId,
        mode: "dry_run",
        adapterId: prepared.invocation.adapter_id,
        runId: prepared.invocation.run_id,
        runDir: prepared.invocation.run_dir,
        bundlePath: prepared.invocation.bundle_path,
        bootstrapPath: prepared.invocation.bootstrap_path ?? "",
        resultPath: prepared.invocation.result_path,
      });
      if (parsed.json) {
        output.json(payload);
      } else {
        reportPreparedTaskRun(payload, parsed.taskId);
      }
      return 0;
    }

    const executed = await executeTaskRunnerExecution({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      ...(parsed.remote ? { include_remote: true } : {}),
      danger_authority: dangerAuthority,
      sandbox_override: parsed.sandbox,
    });
    const payload = renderTaskRunPayload({
      taskId: parsed.taskId,
      mode: "execute",
      adapterId: executed.invocation.adapter_id,
      runId: executed.invocation.run_id,
      runDir: executed.invocation.run_dir,
      bundlePath: executed.invocation.bundle_path,
      bootstrapPath: executed.invocation.bootstrap_path ?? "",
      resultPath: executed.invocation.result_path,
      status: executed.result.status,
      verificationState: executed.result.execution_receipt?.verification_state,
      receiptPath: executed.result.execution_receipt?.path,
      exitCode: executed.result.exit_code,
      summary: executed.result.summary,
      activeClaimCleanup: executed.active_claim_cleanup,
    });
    if (parsed.json) {
      output.json(payload);
    } else {
      reportExecutedTaskRun(payload, parsed.taskId);
    }
    return executed.result.status === "success" && !executed.active_claim_cleanup ? 0 : 1;
  };
}

export function makeRunTaskRunStatusHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunStatusParsed): Promise<number> => {
    const commandCtx = await getCtx("task run status");
    const inspection = await loadTaskRunnerDiagnosticInspection({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    const payload = await renderRunnerDiagnosticStatusPayload(inspection);
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(payload);
    } else {
      reportRunnerStatus(payload, parsed.taskId);
    }
    return 0;
  };
}

export function makeRunTaskRunInspectHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunInspectParsed): Promise<number> => {
    const commandCtx = await getCtx("task run inspect");
    const inspection = await loadTaskRunnerDiagnosticInspection({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    const payload = await renderRunnerDiagnosticInspectPayload(inspection, parsed.events);
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(payload);
    } else {
      output.report(
        [
          { label: "task", value: payload.task_id },
          { label: "run", value: payload.run_id },
          { label: "storage", value: payload.storage },
          { label: "status", value: payload.status },
          { label: "active_claim_present", value: payload.active_claim_present },
          { label: "active_claim_retained", value: payload.active_claim_retained },
          { label: "active_claim_run", value: payload.active_claim?.run_id ?? null },
          { label: "projection_pending", value: payload.projection_pending },
          { label: "reconcile_required", value: payload.reconcile_required },
          { label: "adapter", value: payload.adapter_id },
          { label: "claimed_run_authority", value: payload.claimed_run_authority },
          { label: "recovery_lease", value: payload.recovery_lease?.status ?? null },
          { label: "recovery_lease_owner", value: payload.recovery_lease?.owner_status ?? null },
          { label: "execution_blocked", value: payload.execution_blocked },
          { label: "next_safe_action", value: payload.next_safe_action },
          { label: "run_dir", value: payload.paths?.run_dir ?? null },
          { label: "bundle", value: payload.paths?.bundle ?? null },
          { label: "bootstrap", value: payload.paths?.bootstrap ?? null },
          { label: "result", value: payload.paths?.result ?? null },
          { label: "events", value: payload.paths?.events ?? null },
          { label: "trace", value: payload.paths?.trace ?? null },
          { label: "stderr", value: payload.paths?.stderr ?? null },
        ],
        { header: infoMessage(`task runner inspect: ${parsed.taskId}`) },
      );
      if (payload.recent_events.length > 0) {
        output.line("recent_events:");
        output.lines(payload.recent_events.map((event) => JSON.stringify(event)));
      }
    }
    return 0;
  };
}

export function makeRunTaskRunReconcileHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, parsed: TaskRunReconcileParsed): Promise<number> => {
    const commandCtx = await getCtx("task run reconcile");
    const result = await reconcileTaskRunnerActiveClaim({
      ctx: commandCtx,
      task_id: parsed.taskId,
    });
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(result);
    } else {
      output.report(
        [
          { label: "task", value: result.task_id },
          { label: "status", value: result.status },
          { label: "run", value: result.run_id },
          { label: "claimed_run_authority", value: result.claimed_run_authority },
        ],
        { header: infoMessage(`task runner reconcile: ${parsed.taskId}`) },
      );
    }
    return 0;
  };
}

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
      else {
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
      }
      return 0;
    }
    const result = await resolveTaskRunnerEffect(input);
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(result);
    } else {
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
    }
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

export function makeRunTaskRunLogsHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunLogsParsed): Promise<number> => {
    const commandCtx = await getCtx("task run logs");
    const inspection = await loadTaskRunnerInspection({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    const output = createCliEmitter();
    const statusPayload = await renderRunnerStatusPayload(inspection);
    const reconciliationWarning = runnerReconciliationWarning(statusPayload);
    if (reconciliationWarning) output.warn(reconciliationWarning, "stderr");
    const text = await loadRunnerLogText(inspection, parsed.stream);
    const emittedChars = text.length;
    const initial = tailText(text, parsed.tail);
    if (initial) output.lines(initial.split("\n"));
    if (!parsed.follow) return 0;

    return await followRunnerLogs({
      initial_inspection: inspection,
      stream: parsed.stream,
      emitted_chars: emittedChars,
      output,
      reload: async (runId) =>
        await loadTaskRunnerInspection({
          ctx: commandCtx,
          cwd: ctx.cwd,
          rootOverride: ctx.rootOverride ?? null,
          task_id: parsed.taskId,
          run_id: runId,
        }),
    });
  };
}
