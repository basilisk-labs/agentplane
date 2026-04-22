import path from "node:path";

import { applyExecutionToApprovals, type AgentplaneConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";

import type { TaskBackendCapabilities } from "../../backends/task-backend.js";
import { normalizeGitPathPrefix } from "../../shared/git-path.js";
import {
  resolvePolicyGatewayForRepo,
  type PolicyGatewayFlavor,
} from "../../shared/policy-gateway.js";
import {
  CI_PATH_PREFIXES,
  CONFIG_PATH_PREFIXES,
  HOOK_PATH_PREFIXES,
  POLICY_PATH_PREFIXES,
} from "../../shared/protected-paths.js";

import type {
  HarnessSourceRef,
  ResolvedHarnessContract,
  ResolvedHarnessTrace,
  ResolvedProtectedPathGroups,
} from "./types.js";

function source(id: HarnessSourceRef["id"], detail: string): HarnessSourceRef {
  return { id, detail };
}

function mergeSourceRefs(...groups: readonly HarnessSourceRef[][]): HarnessSourceRef[] {
  const out: HarnessSourceRef[] = [];
  const seen = new Set<string>();
  for (const group of groups) {
    for (const entry of group) {
      const key = `${entry.id}:${entry.detail}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(entry);
    }
  }
  return out;
}

function mergePathPrefixes(...groups: readonly string[][]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const group of groups) {
    for (const candidate of group) {
      const normalized = normalizeGitPathPrefix(candidate);
      if (!normalized || seen.has(normalized)) continue;
      seen.add(normalized);
      out.push(normalized);
    }
  }
  return out.toSorted((left, right) => left.localeCompare(right));
}

function backendRestrictions(
  capabilities: TaskBackendCapabilities | null | undefined,
): ResolvedHarnessContract["backend"]["restrictions"] {
  return {
    canonical_source: capabilities?.canonical_source ?? "local",
    projection: capabilities?.projection ?? "canonical",
    projection_read_mode: capabilities?.projection_read_mode ?? "native",
    reads_from_projection_by_default: capabilities?.reads_from_projection_by_default ?? false,
    writes_task_readmes: capabilities?.writes_task_readmes ?? false,
    supports_task_revisions: capabilities?.supports_task_revisions ?? false,
    supports_revision_guarded_writes: capabilities?.supports_revision_guarded_writes ?? false,
    may_access_network_on_read: capabilities?.may_access_network_on_read ?? false,
    may_access_network_on_write: capabilities?.may_access_network_on_write ?? false,
    supports_projection_refresh: capabilities?.supports_projection_refresh ?? false,
    supports_push_sync: capabilities?.supports_push_sync ?? false,
    supports_snapshot_export: capabilities?.supports_snapshot_export ?? false,
  };
}

function resolveProtectedPaths(opts: {
  config: AgentplaneConfig;
  policyGatewayFileName: string;
  backendConfigPath: string;
}): {
  groups: ResolvedProtectedPathGroups;
  trace: ResolvedHarnessTrace["protected_paths"];
} {
  const builtinSource = source("builtin", "shared protected path defaults");
  const configSource = source("config", ".agentplane/config.json");
  const gatewaySource = source("policy_gateway", opts.policyGatewayFileName);
  const backendSource = source("backend", opts.backendConfigPath);

  const tasks = mergePathPrefixes([opts.config.paths.tasks_path, opts.config.paths.workflow_dir]);
  const policy = mergePathPrefixes(
    [...POLICY_PATH_PREFIXES],
    [opts.policyGatewayFileName, opts.config.paths.agents_dir],
  );
  const backendConfigDir = normalizeGitPathPrefix(path.dirname(opts.backendConfigPath));
  const config = mergePathPrefixes(
    [...CONFIG_PATH_PREFIXES],
    [opts.backendConfigPath, backendConfigDir],
  );
  const hooks = mergePathPrefixes([...HOOK_PATH_PREFIXES]);
  const ci = mergePathPrefixes([...CI_PATH_PREFIXES]);

  return {
    groups: { tasks, policy, config, hooks, ci },
    trace: mergeSourceRefs(
      tasks.length > 0 ? [configSource] : [],
      policy.length > 0 ? [builtinSource, gatewaySource, configSource] : [],
      config.length > 0 ? [builtinSource, backendSource] : [],
      hooks.length > 0 ? [builtinSource] : [],
      ci.length > 0 ? [builtinSource] : [],
    ),
  };
}

function gatewaySource(fileName: string): HarnessSourceRef {
  return source("policy_gateway", fileName);
}

export async function resolveHarnessContract(opts: {
  project: ResolvedProject;
  config: AgentplaneConfig;
  backendId: string;
  backendConfigPath: string;
  backendCapabilities?: TaskBackendCapabilities | null;
  fallbackPolicyGatewayFlavor?: PolicyGatewayFlavor;
}): Promise<ResolvedHarnessContract> {
  const policyGateway = await resolvePolicyGatewayForRepo({
    gitRoot: opts.project.gitRoot,
    fallbackFlavor: opts.fallbackPolicyGatewayFlavor,
  });
  const approvals = applyExecutionToApprovals({
    execution: opts.config.execution,
    approvals: opts.config.agents?.approvals ?? {
      require_plan: false,
      require_network: false,
      require_verify: false,
      require_force: false,
    },
  });
  const protectedPaths = resolveProtectedPaths({
    config: opts.config,
    policyGatewayFileName: policyGateway.fileName,
    backendConfigPath: opts.backendConfigPath,
  });

  return {
    repo: {
      ...opts.project,
      policy_gateway: policyGateway,
      tasks_backend_config_path: opts.backendConfigPath,
    },
    workflow: {
      mode: opts.config.workflow_mode,
      status_commit_policy: opts.config.status_commit_policy,
      finish_auto_status_commit: opts.config.finish_auto_status_commit,
      task_prefix: opts.config.branch.task_prefix,
      paths: structuredClone(opts.config.paths),
    },
    task: {
      doc_sections: [...opts.config.tasks.doc.sections],
      required_doc_sections: [...opts.config.tasks.doc.required_sections],
      verify_required_tags: [...opts.config.tasks.verify.required_tags],
      verify_steps_required_tags: [...(opts.config.tasks.verify.require_steps_for_tags ?? [])],
      verify_steps_required_primary: [
        ...(opts.config.tasks.verify.require_steps_for_primary ?? []),
      ],
      verification_required_primary: [
        ...(opts.config.tasks.verify.require_verification_for_primary ?? []),
      ],
      spike_tag: opts.config.tasks.verify.spike_tag,
      enforce_verify_steps_on_plan_approve: opts.config.tasks.verify.enforce_on_plan_approve,
      enforce_verify_steps_on_start_without_plan:
        opts.config.tasks.verify.enforce_on_start_when_no_plan,
      comments: structuredClone(opts.config.tasks.comments),
      closure_commit_requires_approval: opts.config.closure_commit_requires_approval,
    },
    policy: {
      approvals,
      unsafe_actions_requiring_explicit_user_ok: [
        ...opts.config.execution.unsafe_actions_requiring_explicit_user_ok,
      ],
      protected_paths: protectedPaths.groups,
    },
    execution: structuredClone(opts.config.execution),
    backend: {
      id: opts.backendId,
      config_path: opts.backendConfigPath,
      capabilities: opts.backendCapabilities ? structuredClone(opts.backendCapabilities) : null,
      restrictions: backendRestrictions(opts.backendCapabilities),
    },
    trace: {
      repo: [source("project", opts.project.gitRoot)],
      workflow: [source("config", ".agentplane/config.json")],
      task_contract: [source("config", ".agentplane/config.json")],
      policy_gateway: [gatewaySource(policyGateway.fileName)],
      approval_requirements: mergeSourceRefs(
        [source("config", ".agentplane/config.json")],
        [source("execution_profile", opts.config.execution.profile)],
      ),
      protected_paths: protectedPaths.trace,
      execution: [source("config", ".agentplane/config.json")],
      backend: mergeSourceRefs(
        [source("backend", opts.backendId)],
        [source("config", opts.backendConfigPath)],
      ),
    },
  };
}
