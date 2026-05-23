import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import {
  agentWorkContextContract,
  type AgentWorkContextContract,
  type AgentWorkContextSourceConfidence,
} from "./agent-work-context-contract.js";
import { resolveTaskBlueprintLifecycleSummary } from "./blueprint-summary.js";
import { extractDocSection, isVerifyStepsFilled } from "./shared.js";

export type TaskBriefParsed = {
  taskId: string;
  json: boolean;
  remote: boolean;
};

type TaskBriefRoute = {
  workflow_mode: string;
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
  next_action: {
    code: string;
    summary: string;
    command: string | null;
    requires_approval: boolean;
  };
  blockers: { code: string; summary: string }[];
  verify_steps: {
    filled: boolean;
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
}): TaskBrief["source_confidence"] {
  const routeFreshness = opts.remoteResolved ? "remote_live" : "computed_local";
  const routeConfidence = opts.remoteResolved ? "medium" : opts.remoteEnabled ? "medium" : "high";
  const routeNote = opts.remoteResolved
    ? "route includes provider-derived PR/check state"
    : opts.remoteEnabled
      ? "remote lookup was requested but no provider state was available"
      : "route excludes hosted PR/check/review lookups";
  const remoteFreshness = opts.remoteResolved ? "remote_live" : "remote_skipped";
  const remoteConfidence = opts.remoteResolved ? "medium" : opts.remoteEnabled ? "low" : "skipped";
  const remoteNote = opts.remoteResolved
    ? "remote provider state fetched"
    : opts.remoteEnabled
      ? "remote lookup was requested but route resolution fell back to local data"
      : "remote lookup skipped by default";
  const snapshotConfidence =
    opts.snapshotState === "current" ? "high" : opts.snapshotState === "invalid" ? "low" : "medium";
  const snapshotFreshness = opts.snapshotState === "missing" ? "computed_local" : "cached_artifact";
  const snapshotNote =
    opts.snapshotState === "current"
      ? undefined
      : opts.snapshotState === "missing"
        ? "resolved snapshot artifact is missing"
        : `resolved snapshot artifact is ${opts.snapshotState}`;
  return {
    contract: {
      source: "static",
      freshness: "static",
      confidence: "high",
    },
    task: {
      source: "task_backend",
      freshness: "live_local",
      confidence: "high",
    },
    workflow: {
      source: "local_git",
      freshness: "live_local",
      confidence: "high",
    },
    route: {
      source: "local_git",
      freshness: routeFreshness,
      confidence: routeConfidence,
      note: routeNote,
    },
    next_action: {
      source: "local_git",
      freshness: routeFreshness,
      confidence: routeConfidence,
    },
    blockers: {
      source: "local_git",
      freshness: routeFreshness,
      confidence: routeConfidence,
    },
    verify_steps: {
      source: "task_doc",
      freshness: "live_local",
      confidence: "high",
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
      source: "remote_provider",
      freshness: remoteFreshness,
      confidence: remoteConfidence,
      note: remoteNote,
    },
  };
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
    next_action: {
      code: route.nextAction.code,
      summary: route.nextAction.summary,
      command: route.nextAction.command,
      requires_approval: route.nextAction.requiresApproval,
    },
    blockers: route.blockers.map((blocker) => ({ ...blocker })),
    verify_steps: {
      filled: isVerifyStepsFilled(verifySteps),
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
        { label: "checkout_role", value: brief.workflow.checkout_role },
        { label: "branch", value: brief.workflow.branch ?? "unknown" },
        { label: "base_branch", value: brief.workflow.base_branch ?? "unknown" },
        { label: "pr_branch", value: brief.workflow.pr_branch ?? "missing" },
        { label: "next_code", value: brief.next_action.code },
        { label: "next", value: brief.next_action.command ?? brief.next_action.summary },
        { label: "requires_approval", value: String(brief.next_action.requires_approval) },
        { label: "remote", value: brief.remote.note },
      ],
      { header: infoMessage(`task brief: ${parsed.taskId}`) },
    );
    for (const blocker of brief.blockers) {
      output.line(`blocker: ${blocker.code}: ${blocker.summary}`);
    }
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
