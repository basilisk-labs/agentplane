import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { buildRouteSourceConfidenceBase } from "../shared/source-confidence.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import {
  agentWorkContextContract,
  type AgentWorkContextContract,
  type AgentWorkContextSourceConfidence,
} from "./agent-work-context-contract.js";
import { resolveTaskBlueprintLifecycleSummary } from "./blueprint-summary.js";
import { extractDocSection, isVerifyStepsFilled, VERIFY_STEPS_PLACEHOLDER } from "./shared.js";

export type TaskBriefParsed = {
  taskId: string;
  json: boolean;
  remote: boolean;
};

type TaskBriefRoute = {
  workflow_mode: string;
  phase: string;
  authoritative_checkout: string;
  authoritative_checkout_path: string | null;
  mutation_path_hint: string | null;
  checkout_role: string;
  branch: string | null;
  base_branch: string | null;
  head_sha: string | null;
  pr_branch: string | null;
  next_action_code: string;
  blockers: { code: string; summary: string }[];
  ambiguities: { code: string; summary: string; resolution: string }[];
  repair_plan: { code: string; command: string | null; summary: string; mutates: boolean }[];
};

type TaskBriefBatchOwnership =
  | { role: "none" }
  | {
      role: "primary" | "included";
      primary_task_id: string;
      included_task_ids: string[];
      all_task_ids: string[];
      branch: string | null;
      task_states: {
        id: string;
        status: string;
        owner: string | null;
        verification: string | null;
      }[];
      next_owner_action: {
        code: string;
        summary: string;
        command: string | null;
        requires_approval: boolean;
      };
    };

type TaskBrief = {
  contract: AgentWorkContextContract;
  task: {
    id: string;
    title: string;
    status: string;
    owner: string;
    plan: string | null;
    verification: string | null;
  };
  workflow: {
    mode: string;
    checkout_role: string;
    branch: string | null;
    base_branch: string | null;
    pr_branch: string | null;
  };
  route: TaskBriefRoute;
  batch_ownership: TaskBriefBatchOwnership;
  next_action: {
    code: string;
    summary: string;
    command: string | null;
    requires_approval: boolean;
  };
  blockers: { code: string; summary: string }[];
  execution_packet: {
    schema_version: number;
    action_kind: string;
    safe_to_mutate: boolean;
    requires_provider_action: boolean;
    recommended_role: string;
    authoritative_checkout: string;
    authoritative_checkout_path: string | null;
    mutation_path_hint: string | null;
    evidence_missing: string[];
    verification_candidate: string | null;
    stop_reason: string | null;
  };
  verify_steps: {
    filled: boolean;
    quality: "missing" | "fallback" | "specific";
    text: string;
  };
  blueprint: Awaited<ReturnType<typeof resolveTaskBlueprintLifecycleSummary>>;
  policy_modules: string[];
  evidence_required: string[];
  snapshot: {
    state: string;
    path: string;
    digest: string | null;
    current_digest: string;
    route_changed: boolean | null;
    safe_command: string;
  };
  stop_rules: string[];
  remote: {
    enabled: boolean;
    note: string;
  };
  source_confidence: Record<string, AgentWorkContextSourceConfidence>;
};

export const taskBriefSpec: CommandSpec<TaskBriefParsed> = {
  id: ["task", "brief"],
  group: "Task",
  summary: "Print an agent-ready task brief without remote lookups by default.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
    {
      kind: "boolean",
      name: "remote",
      default: false,
      description: "Include hosted PR/check/review state using configured remote tools.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task brief 202602030608-F1Q8AB",
      why: "Get local route, Verify Steps, blueprint, blockers, and next command in one view.",
    },
    {
      cmd: "agentplane task brief 202602030608-F1Q8AB --json",
      why: "Emit a machine-readable agent work context.",
    },
    {
      cmd: "agentplane task brief 202602030608-F1Q8AB --remote",
      why: "Include hosted PR truth when remote access is explicitly intended.",
    },
  ],
  notes: [
    "JSON output follows the versioned `agentplane.agent_work_context` contract.",
    "`source_confidence` marks whether each field is local, cached, computed, remote-derived, or skipped.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
    remote: raw.opts.remote === true,
  }),
};

function splitNonEmptyLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildSourceConfidence(opts: {
  blueprintError?: string;
  remoteEnabled: boolean;
  remoteResolved: boolean;
  snapshotState: string;
  verifyStepsQuality: TaskBrief["verify_steps"]["quality"];
}): TaskBrief["source_confidence"] {
  const routeSourceConfidence = buildRouteSourceConfidenceBase({
    batchOwnershipSource: "local_git",
    remoteEnabled: opts.remoteEnabled,
    remoteResolved: opts.remoteResolved,
  });
  const snapshotConfidence =
    opts.snapshotState === "current" ? "high" : opts.snapshotState === "invalid" ? "low" : "medium";
  const snapshotFreshness = opts.snapshotState === "missing" ? "computed_local" : "cached_artifact";
  const snapshotNote =
    opts.snapshotState === "current"
      ? undefined
      : opts.snapshotState === "missing"
        ? "resolved snapshot artifact is missing"
        : `resolved snapshot artifact is ${opts.snapshotState}`;
  const verifyStepsConfidence =
    opts.verifyStepsQuality === "specific"
      ? "high"
      : opts.verifyStepsQuality === "fallback"
        ? "medium"
        : "low";
  const verifyStepsNote =
    opts.verifyStepsQuality === "specific"
      ? undefined
      : opts.verifyStepsQuality === "fallback"
        ? "Verify Steps are a PLANNER fallback scaffold; replace with task-specific checks when scope is known"
        : "Verify Steps are missing or still placeholder-only";
  return {
    contract: {
      source: "static",
      freshness: "static",
      confidence: "high",
    },
    ...routeSourceConfidence,
    verify_steps: {
      source: "task_doc",
      freshness: "live_local",
      confidence: verifyStepsConfidence,
      ...(verifyStepsNote ? { note: verifyStepsNote } : {}),
    },
    blueprint: {
      source: "blueprint_resolver",
      freshness: "computed_local",
      confidence: opts.blueprintError ? "low" : "high",
      ...(opts.blueprintError ? { note: opts.blueprintError } : {}),
    },
    policy_modules: {
      source: "blueprint_resolver",
      freshness: "computed_local",
      confidence: opts.blueprintError ? "low" : "high",
    },
    evidence_required: {
      source: "blueprint_resolver",
      freshness: "computed_local",
      confidence: opts.blueprintError ? "low" : "high",
    },
    snapshot: {
      source: "snapshot_digest",
      freshness: snapshotFreshness,
      confidence: snapshotConfidence,
      ...(snapshotNote ? { note: snapshotNote } : {}),
    },
    stop_rules: {
      source: "blueprint_resolver",
      freshness: "computed_local",
      confidence: opts.blueprintError ? "low" : "high",
    },
    remote: {
      ...routeSourceConfidence.remote,
    },
  };
}

function verifyStepsQuality(verifySteps: string): TaskBrief["verify_steps"]["quality"] {
  if (!isVerifyStepsFilled(verifySteps)) return "missing";
  if (verifySteps.includes(VERIFY_STEPS_PLACEHOLDER)) return "missing";
  if (/PLANNER fallback scaffold/i.test(verifySteps)) return "fallback";
  return "specific";
}

function formatSourceConfidence(sourceConfidence: TaskBrief["source_confidence"]): string {
  const keys = ["route", "next_action", "verify_steps", "snapshot", "remote"] as const;
  return keys
    .map((key) => {
      const value = sourceConfidence[key];
      return `${key}=${value?.confidence ?? "unknown"}/${value?.freshness ?? "unknown"}`;
    })
    .join(", ");
}

function hasRemoteProviderEvidence(
  route: Awaited<ReturnType<typeof buildTaskRouteDecision>>,
): boolean {
  const prFlow = route.prFlow;
  if (!prFlow) return false;
  return (
    prFlow.pr.source === "lookup" ||
    "provider" in prFlow.closeTail ||
    prFlow.hostedChecks.checked ||
    prFlow.reviewThreads.checked
  );
}

async function buildTaskBrief(opts: {
  commandCtx: CommandContext;
  cwd: string;
  parsed: TaskBriefParsed;
  rootOverride?: string | null;
}): Promise<TaskBrief> {
  const task = await loadTaskFromContext({ ctx: opts.commandCtx, taskId: opts.parsed.taskId });
  const doc =
    typeof task.doc === "string"
      ? task.doc
      : ((await opts.commandCtx.taskBackend.getTaskDoc?.(opts.parsed.taskId)) ?? "");
  const verifySteps = (extractDocSection(doc, "Verify Steps") ?? "").trim();
  const verifyQuality = verifyStepsQuality(verifySteps);
  const route = await buildTaskRouteDecision({
    ctx: opts.commandCtx,
    cwd: opts.cwd,
    includeRemote: opts.parsed.remote,
    rootOverride: opts.rootOverride ?? null,
    taskId: opts.parsed.taskId,
  });
  const blueprint = await resolveTaskBlueprintLifecycleSummary({
    task,
    config: opts.commandCtx.config,
    projectRoot: opts.commandCtx.resolvedProject.gitRoot,
  });
  const snapshot = await checkTaskBlueprintSnapshotDrift({ ctx: opts.commandCtx, task });
  const batchOwnership =
    route.batchOwnership.role === "none"
      ? ({ role: "none" } as const)
      : ({
          role: route.batchOwnership.role,
          primary_task_id: route.batchOwnership.primaryTaskId,
          included_task_ids: route.batchOwnership.includedTaskIds,
          all_task_ids: route.batchOwnership.allTaskIds,
          branch: route.batchOwnership.branch,
          task_states: route.batchOwnership.taskStates,
          next_owner_action: {
            code: route.batchOwnership.nextOwnerAction.code,
            summary: route.batchOwnership.nextOwnerAction.summary,
            command: route.batchOwnership.nextOwnerAction.command,
            requires_approval: route.batchOwnership.nextOwnerAction.requiresApproval,
          },
        } as const);

  return {
    contract: agentWorkContextContract(),
    task: {
      id: task.id,
      title: task.title,
      status: task.status,
      owner: task.owner,
      plan: task.plan_approval?.state ?? null,
      verification: task.verification?.state ?? null,
    },
    workflow: {
      mode: route.workflowMode,
      checkout_role: route.workspace.checkoutRole,
      branch: route.workspace.branch,
      base_branch: route.workspace.baseBranch,
      pr_branch: route.workspace.prBranch,
    },
    route: {
      workflow_mode: route.workflowMode,
      phase: route.oracle.phase,
      authoritative_checkout: route.oracle.authoritativeCheckout,
      authoritative_checkout_path: route.oracle.authoritativeCheckoutPath,
      mutation_path_hint: route.oracle.mutationPathHint,
      checkout_role: route.workspace.checkoutRole,
      branch: route.workspace.branch,
      base_branch: route.workspace.baseBranch,
      head_sha: route.workspace.headSha,
      pr_branch: route.workspace.prBranch,
      next_action_code: route.nextAction.code,
      blockers: route.blockers.map((blocker) => ({ ...blocker })),
      ambiguities: route.ambiguities.map((ambiguity) => ({ ...ambiguity })),
      repair_plan: route.repairPlan.map((step) => ({ ...step })),
    },
    batch_ownership: batchOwnership,
    next_action: {
      code: route.nextAction.code,
      summary: route.nextAction.summary,
      command: route.nextAction.command,
      requires_approval: route.nextAction.requiresApproval,
    },
    blockers: route.blockers.map((blocker) => ({ ...blocker })),
    execution_packet: {
      schema_version: route.executionPacket.schemaVersion,
      action_kind: route.executionPacket.actionKind,
      safe_to_mutate: route.executionPacket.safeToMutate,
      requires_provider_action: route.executionPacket.requiresProviderAction,
      recommended_role: route.executionPacket.recommendedRole,
      authoritative_checkout: route.executionPacket.authoritativeCheckout,
      authoritative_checkout_path: route.executionPacket.authoritativeCheckoutPath,
      mutation_path_hint: route.executionPacket.mutationPathHint,
      evidence_missing: route.executionPacket.evidenceMissing,
      verification_candidate: route.executionPacket.verificationCandidate,
      stop_reason: route.executionPacket.stopReason,
    },
    verify_steps: {
      filled: isVerifyStepsFilled(verifySteps),
      quality: verifyQuality,
      text: verifySteps,
    },
    blueprint,
    policy_modules: blueprint.policy_modules ?? [],
    evidence_required: blueprint.required_evidence ?? [],
    snapshot: {
      state: snapshot.state,
      path: snapshot.path,
      digest: snapshot.previous.digest,
      current_digest: snapshot.current.digest,
      route_changed: snapshot.routeChanged,
      safe_command: snapshot.safeCommand,
    },
    stop_rules: blueprint.stop_reasons ?? [],
    remote: {
      enabled: opts.parsed.remote,
      note: opts.parsed.remote
        ? "remote lookup explicitly enabled"
        : "remote lookup skipped; pass --remote for hosted PR/check/review truth",
    },
    source_confidence: buildSourceConfidence({
      blueprintError: blueprint.error,
      remoteEnabled: opts.parsed.remote,
      remoteResolved: hasRemoteProviderEvidence(route),
      snapshotState: snapshot.state,
      verifyStepsQuality: verifyQuality,
    }),
  };
}

export function makeRunTaskBriefHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskBriefParsed): Promise<number> => {
    const commandCtx = await getCtx("task brief");
    const brief = await buildTaskBrief({
      commandCtx,
      cwd: ctx.cwd,
      parsed,
      rootOverride: ctx.rootOverride ?? null,
    });
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(brief);
      return 0;
    }
    output.report(
      [
        { label: "task", value: `${brief.task.id} ${brief.task.status}` },
        { label: "title", value: brief.task.title },
        { label: "owner", value: brief.task.owner },
        { label: "workflow", value: brief.workflow.mode },
        { label: "phase", value: brief.route.phase },
        { label: "authoritative_checkout", value: brief.route.authoritative_checkout },
        {
          label: "authoritative_checkout_path",
          value: brief.route.authoritative_checkout_path ?? "unknown",
        },
        { label: "mutation_path_hint", value: brief.route.mutation_path_hint ?? "none" },
        { label: "checkout_role", value: brief.workflow.checkout_role },
        { label: "branch", value: brief.workflow.branch ?? "unknown" },
        { label: "base_branch", value: brief.workflow.base_branch ?? "unknown" },
        { label: "pr_branch", value: brief.workflow.pr_branch ?? "missing" },
        { label: "next_code", value: brief.next_action.code },
        { label: "next", value: brief.next_action.command ?? brief.next_action.summary },
        {
          label: "safe_to_mutate",
          value: String(brief.execution_packet.safe_to_mutate),
        },
        { label: "requires_approval", value: String(brief.next_action.requires_approval) },
        { label: "remote", value: brief.remote.note },
        { label: "confidence", value: formatSourceConfidence(brief.source_confidence) },
      ],
      { header: infoMessage(`task brief: ${parsed.taskId}`) },
    );
    if (brief.batch_ownership.role !== "none") {
      output.report([
        { label: "batch_role", value: brief.batch_ownership.role },
        { label: "batch_primary", value: brief.batch_ownership.primary_task_id },
        { label: "batch_branch", value: brief.batch_ownership.branch ?? "missing" },
        {
          label: "batch_included",
          value: brief.batch_ownership.included_task_ids.join(", ") || "none",
        },
        {
          label: "batch_states",
          value: brief.batch_ownership.task_states
            .map(
              (state) =>
                `${state.id}:${state.status}:verification=${state.verification ?? "pending"}`,
            )
            .join(", "),
        },
        {
          label: "batch_next",
          value:
            brief.batch_ownership.next_owner_action.command ??
            brief.batch_ownership.next_owner_action.summary,
        },
      ]);
    }
    for (const blocker of brief.blockers) {
      output.line(`blocker: ${blocker.code}: ${blocker.summary}`);
    }
    output.line(`verify_steps_quality: ${brief.verify_steps.quality}`);
    output.line("verify_steps:");
    for (const line of splitNonEmptyLines(brief.verify_steps.text)) {
      output.line(`  ${line}`);
    }
    output.report([
      { label: "blueprint_id", value: brief.blueprint.blueprint_id ?? "unresolved" },
      { label: "blueprint_route", value: brief.blueprint.route?.join(" -> ") ?? "none" },
      {
        label: "policy_modules",
        value: brief.policy_modules.join(", ") || "none",
      },
      {
        label: "required_evidence",
        value: brief.evidence_required.join(", ") || "none",
      },
      { label: "snapshot_state", value: brief.snapshot.state },
      { label: "snapshot_safe_command", value: brief.snapshot.safe_command },
      { label: "stop_rules", value: brief.stop_rules.join(", ") || "none" },
    ]);
    return 0;
  };
}
