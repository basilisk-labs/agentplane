import { isDeepStrictEqual } from "node:util";

import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import { isRecord } from "../shared/guards.js";
import { RUNNER_DANGER_FULL_ACCESS_SANDBOX } from "./types.js";
import type {
  RunnerContextBundle,
  RunnerDangerFullAccessAuthority,
  RunnerSandboxPolicy,
  RunnerWriteScopePolicy,
} from "./types.js";

type RunnerExecutionConfigProjection = {
  workflow: {
    mode: AgentplaneConfig["workflow_mode"];
    status_commit_policy: AgentplaneConfig["status_commit_policy"];
    finish_auto_status_commit: AgentplaneConfig["finish_auto_status_commit"];
    task_prefix: AgentplaneConfig["branch"]["task_prefix"];
    task_close_prefix: AgentplaneConfig["branch"]["task_close_prefix"];
    paths: AgentplaneConfig["paths"];
  };
  task_outcome_projection: {
    allowed_doc_sections: AgentplaneConfig["tasks"]["doc"]["sections"];
    required_doc_sections: AgentplaneConfig["tasks"]["doc"]["required_sections"];
  };
  route_evidence: Record<string, unknown>;
  ambient_env_matches_prepared: boolean;
  default_adapter: AgentplaneConfig["runner"]["default_adapter"];
  custom: {
    command: string[];
    enforcement: {
      mode: "none" | "codex_sandbox_full_auto";
      platform: "auto" | "macos" | "linux" | "windows";
    };
    env_keys: string[];
    env_matches_prepared: boolean;
  } | null;
  trace: AgentplaneConfig["runner"]["trace"];
  timeouts: AgentplaneConfig["runner"]["timeouts"];
};

const preparedRunnerEnv = new WeakMap<RunnerContextBundle, Record<string, string>>();
const preparedAmbientEnv = new WeakMap<RunnerContextBundle, Record<string, string>>();

function ambientEnvironment(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(process.env)
      .filter((entry): entry is [string, string] => typeof entry[1] === "string")
      .toSorted(([left], [right]) => left.localeCompare(right)),
  );
}

function selectedRunnerEnv(config: AgentplaneConfig["runner"]): Record<string, string> {
  return config.default_adapter === "custom" || config.default_adapter === "hermes"
    ? structuredClone(config.custom?.env ?? {})
    : {};
}

function routeEvidenceProjection(routeDecision: Record<string, unknown>): Record<string, unknown> {
  const prFlow = isRecord(routeDecision.prFlow) ? structuredClone(routeDecision.prFlow) : null;
  if (prFlow && isRecord(prFlow.task)) Reflect.deleteProperty(prFlow, "task");
  if (prFlow && isRecord(prFlow.branch)) Reflect.deleteProperty(prFlow.branch, "headSha");
  const workspace = isRecord(routeDecision.workspace)
    ? structuredClone(routeDecision.workspace)
    : {};
  Reflect.deleteProperty(workspace, "root");
  Reflect.deleteProperty(workspace, "headSha");
  return {
    workflow_mode: routeDecision.workflowMode ?? null,
    agent_contract: {
      workspace,
      approval: structuredClone(routeDecision.approval ?? null),
      blockers: structuredClone(routeDecision.blockers ?? null),
      ambiguities: structuredClone(routeDecision.ambiguities ?? null),
      next_action: structuredClone(routeDecision.nextAction ?? null),
      oracle: structuredClone(routeDecision.oracle ?? null),
      execution_packet: structuredClone(routeDecision.executionPacket ?? null),
      repair_plan: structuredClone(routeDecision.repairPlan ?? null),
    },
    pr_flow: prFlow,
    batch_ownership: structuredClone(routeDecision.batchOwnership ?? null),
    cleanup_probe: structuredClone(routeDecision.cleanupProbe ?? null),
    source_confidence: structuredClone(routeDecision.sourceConfidence ?? null),
  };
}

function runnerExecutionConfigProjection(opts: {
  bundle: RunnerContextBundle;
  config: AgentplaneConfig;
  prepared: boolean;
  route_decision: RunnerContextBundle["route_decision"];
}): RunnerExecutionConfigProjection | null {
  if (!isRecord(opts.route_decision)) return null;
  const currentEnv = selectedRunnerEnv(opts.config.runner);
  const currentAmbientEnv = ambientEnvironment();
  if (opts.prepared) {
    preparedRunnerEnv.set(opts.bundle, structuredClone(currentEnv));
    preparedAmbientEnv.set(opts.bundle, currentAmbientEnv);
  }
  const expectedEnv = preparedRunnerEnv.get(opts.bundle);
  const expectedAmbientEnv = preparedAmbientEnv.get(opts.bundle);
  const custom =
    opts.config.runner.default_adapter === "custom" ||
    opts.config.runner.default_adapter === "hermes"
      ? {
          command: [...(opts.config.runner.custom?.command ?? [])],
          enforcement: {
            mode: opts.config.runner.custom?.enforcement?.mode ?? "none",
            platform: opts.config.runner.custom?.enforcement?.platform ?? "auto",
          },
          env_keys: Object.keys(currentEnv).toSorted(),
          // Raw values may contain secrets. Persist only whether the live values
          // still match the in-memory prepared authority, never a reusable verifier.
          env_matches_prepared:
            expectedEnv !== undefined && isDeepStrictEqual(currentEnv, expectedEnv),
        }
      : null;
  return {
    workflow: {
      mode: opts.config.workflow_mode,
      status_commit_policy: opts.config.status_commit_policy,
      finish_auto_status_commit: opts.config.finish_auto_status_commit,
      task_prefix: opts.config.branch.task_prefix,
      task_close_prefix: opts.config.branch.task_close_prefix,
      paths: structuredClone(opts.config.paths),
    },
    task_outcome_projection: {
      allowed_doc_sections: [...opts.config.tasks.doc.sections],
      required_doc_sections: [...opts.config.tasks.doc.required_sections],
    },
    route_evidence: routeEvidenceProjection(opts.route_decision),
    ambient_env_matches_prepared:
      expectedAmbientEnv !== undefined && isDeepStrictEqual(currentAmbientEnv, expectedAmbientEnv),
    default_adapter: opts.config.runner.default_adapter,
    custom,
    trace: structuredClone(opts.config.runner.trace),
    timeouts: structuredClone(opts.config.runner.timeouts),
  };
}

export function preparedRunnerExecutionConfigProjection(
  bundle: RunnerContextBundle,
  config: AgentplaneConfig,
): RunnerExecutionConfigProjection | null {
  return runnerExecutionConfigProjection({
    bundle,
    config,
    prepared: true,
    route_decision: bundle.route_decision,
  });
}

export function liveRunnerExecutionConfigProjection(
  bundle: RunnerContextBundle,
  config: AgentplaneConfig,
  route_decision: RunnerContextBundle["route_decision"],
): RunnerExecutionConfigProjection | null {
  return runnerExecutionConfigProjection({
    bundle,
    config,
    prepared: false,
    route_decision,
  });
}

function unavailableComponent(source: string, reason_code: string): StateFingerprintComponentInput {
  return {
    state: "unavailable",
    source,
    reason_code,
  };
}

function validApprovals(
  approvals: RunnerContextBundle["execution"]["approvals"] | null | undefined,
): approvals is NonNullable<RunnerContextBundle["execution"]["approvals"]> {
  return (
    isRecord(approvals) &&
    typeof approvals.require_plan === "boolean" &&
    typeof approvals.require_verify === "boolean" &&
    typeof approvals.require_network === "boolean"
  );
}

function validSandboxPolicy(value: unknown): value is RunnerSandboxPolicy {
  if (!isRecord(value) || !isRecord(value.authority)) return false;
  return (
    typeof value.requested === "string" &&
    value.requested.trim().length > 0 &&
    typeof value.source === "string" &&
    typeof value.role === "string" &&
    value.role.trim().length > 0 &&
    typeof value.authority.danger_full_access_authorized === "boolean" &&
    (value.authority.provenance === null || value.authority.provenance === "explicit_operator") &&
    (value.authority.source === null || typeof value.authority.source === "string")
  );
}

function validWriteScope(value: unknown): value is RunnerWriteScopePolicy {
  return (
    isRecord(value) &&
    Array.isArray(value.writable_roots) &&
    value.writable_roots.every((entry) => typeof entry === "string") &&
    Array.isArray(value.protected_paths) &&
    value.protected_paths.every((entry) => typeof entry === "string")
  );
}

export function authorityComponent(opts: {
  sandbox_policy?: RunnerSandboxPolicy | null;
  write_scope?: RunnerWriteScopePolicy | null;
  approvals?: RunnerContextBundle["execution"]["approvals"] | null;
  runner_execution_config?: RunnerExecutionConfigProjection | null;
}): StateFingerprintComponentInput {
  if (
    !validSandboxPolicy(opts.sandbox_policy) ||
    !validWriteScope(opts.write_scope) ||
    !validApprovals(opts.approvals) ||
    !isRecord(opts.runner_execution_config)
  ) {
    return unavailableComponent("runner_authority_resolution", "authority_projection_unavailable");
  }
  if (
    opts.sandbox_policy.requested === RUNNER_DANGER_FULL_ACCESS_SANDBOX &&
    opts.sandbox_policy.authority.danger_full_access_authorized !== true
  ) {
    return unavailableComponent(
      "runner_authority_resolution",
      "danger_full_access_authority_unavailable",
    );
  }
  return {
    state: "present",
    source: "runner_authority_resolution",
    value: {
      sandbox_policy: opts.sandbox_policy,
      write_scope: opts.write_scope,
      approvals: {
        require_plan: opts.approvals.require_plan,
        require_verify: opts.approvals.require_verify,
        require_network: opts.approvals.require_network,
        require_force: opts.approvals.require_force === true,
      },
      runner_execution_config: opts.runner_execution_config,
    },
  };
}

export function dangerAuthorityFromBundle(
  bundle: RunnerContextBundle,
): RunnerDangerFullAccessAuthority | null {
  const authority = bundle.execution.sandbox_policy?.authority;
  return authority?.danger_full_access_authorized === true &&
    authority.provenance === "explicit_operator" &&
    typeof authority.source === "string" &&
    authority.source.trim().length > 0
    ? {
        danger_full_access_authorized: true,
        provenance: "explicit_operator",
        source: authority.source,
      }
    : null;
}
