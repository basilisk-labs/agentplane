import { createHash } from "node:crypto";
import path from "node:path";

import {
  buildStateFingerprint,
  type StateFingerprint,
  type StateFingerprintComponentInput,
  type StateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";

import { captureGitSnapshot } from "../../runner/observation/git-snapshot.js";
import { observeBackendProjection } from "../../runner/state-fingerprint-backend-projection.js";
import { observeKnowledgeProjection } from "../../runner/state-fingerprint-knowledge.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import type { CommandContext } from "./task-backend.js";
import { observeWorkflowBlueprint } from "./workflow-step-fingerprint-blueprint.js";
import {
  observeWorkflowPolicyScope,
  type WorkflowPolicyScopeObservation,
} from "./workflow-step-policy-scope.js";
import type { WorkflowCheckout, WorkflowRouteState, WorkflowStep } from "./workflow-step.js";

export type WorkflowRouteStateInput = Omit<WorkflowRouteState, "preconditionFingerprint">;

export const WORKFLOW_STATE_FINGERPRINT_POLICY = {
  required_components: [
    "task",
    "git",
    "backend_projection",
    "policy",
    "blueprint",
    "knowledge",
    "authority",
  ],
  provider: {
    required: false,
    unavailable: "allow_if_unchanged",
  },
} as const satisfies StateFingerprintPolicy;

type WorkflowFingerprintPaths = {
  baseCheckoutPath?: string | null;
  taskWorktreePath?: string | null;
  primaryTaskWorktreePath?: string | null;
  currentCheckoutPath?: string | null;
};

const ROUTE_PROJECTION_MAX_BYTES = 16 * 1024 * 1024;

function unavailableComponent(
  source: string,
  reason_code: string,
  evidence?: unknown,
): StateFingerprintComponentInput {
  return {
    state: "unavailable",
    source,
    reason_code,
    ...(evidence === undefined ? {} : { evidence }),
  };
}

function presentComponent(source: string, value: unknown): StateFingerprintComponentInput {
  return { state: "present", source, value };
}

function routeProjection(state: WorkflowRouteStateInput): Record<string, unknown> {
  return {
    task: state.task,
    workspace: {
      branch: state.resume.branch,
      baseBranch: state.resume.base_branch,
      headSha: state.resume.head_sha,
      prBranch: state.resume.pr_branch,
      workspaceRoot: state.resume.workspace_root,
    },
    runner: state.resume.runner,
    prFlow: state.prFlow,
    cleanup: state.cleanupProbe,
    blockers: state.blockers,
    batch: state.batchOwnership,
    taskWorktree: state.taskWorktree ?? null,
    workflowMode: state.workflowMode,
  };
}

function providerComponent(state: WorkflowRouteStateInput): StateFingerprintComponentInput {
  const flow = state.prFlow;
  if (!flow) {
    return unavailableComponent("workflow_route", "provider_not_observed", state.cleanupProbe);
  }
  const evidence = {
    observation: flow.providerObservation ?? null,
    pr: flow.pr,
    branch: flow.branch,
    closeTail: flow.closeTail,
    hostedChecks: flow.hostedChecks,
    reviewThreads: flow.reviewThreads,
    queue: flow.queue,
    cleanup: state.cleanupProbe,
  };
  if (flow.providerObservation?.state === "unavailable") {
    return unavailableComponent(
      "workflow_route_provider",
      "provider_observation_unavailable",
      evidence,
    );
  }
  if (flow.pr.source !== "lookup" && !flow.providerObservation) {
    return unavailableComponent("workflow_route_provider", "provider_metadata_only", evidence);
  }
  return presentComponent("workflow_route_provider", evidence);
}

function checkoutPath(checkout: WorkflowCheckout, paths: WorkflowFingerprintPaths): string | null {
  if (checkout === "base_checkout") return paths.baseCheckoutPath ?? null;
  if (checkout === "task_worktree") return paths.taskWorktreePath ?? null;
  if (checkout === "primary_task_worktree") {
    return paths.primaryTaskWorktreePath ?? null;
  }
  if (checkout === "current_checkout") return paths.currentCheckoutPath ?? null;
  return paths.baseCheckoutPath ?? paths.currentCheckoutPath ?? null;
}

function sha256(value: string | Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

async function observeRepositoryFile(
  repositoryRoot: string,
  relativePath: string,
  source: string,
): Promise<StateFingerprintComponentInput> {
  try {
    const content = await readContainedStableTextNoFollow({
      repository_root: repositoryRoot,
      file_path: path.join(repositoryRoot, relativePath),
      label: source,
      max_bytes: ROUTE_PROJECTION_MAX_BYTES,
    });
    return presentComponent(source, {
      path: relativePath,
      sha256: sha256(content),
    });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | null)?.code ?? "unknown";
    if (code === "ENOENT") {
      return {
        state: "missing",
        source,
        reason_code: "repository_projection_missing",
        evidence: { path: relativePath },
      };
    }
    return unavailableComponent(source, "repository_projection_unavailable", {
      path: relativePath,
      code,
    });
  }
}

function semanticTaskComponent(state: WorkflowRouteStateInput): StateFingerprintComponentInput {
  const task = structuredClone(state.task);
  Reflect.deleteProperty(task, "revision");
  if (task.sync) {
    Reflect.deleteProperty(task.sync, "freshness");
    task.sync.external_refs = task.sync.external_refs.map((externalRef) => {
      const semanticRef = { ...externalRef };
      Reflect.deleteProperty(semanticRef, "remote_revision");
      return semanticRef;
    });
  }
  return presentComponent("workflow_route_task", task);
}

function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values)].toSorted();
}

function workflowPolicyPaths(
  workflowMode: string,
  blueprintPolicyModules: readonly string[],
  changedPaths: readonly string[],
): string[] {
  const policyMutation = changedPaths.some(
    (changedPath) => changedPath === "AGENTS.md" || changedPath.startsWith(".agentplane/policy/"),
  );
  return uniqueSorted([
    "AGENTS.md",
    ".agentplane/WORKFLOW.md",
    workflowMode === "branch_pr"
      ? ".agentplane/policy/workflow.branch_pr.md"
      : ".agentplane/policy/workflow.direct.md",
    ...blueprintPolicyModules,
    ...(changedPaths.some((changedPath) => changedPath.startsWith(".agentplane/.upgrade/"))
      ? [".agentplane/policy/workflow.upgrade.md"]
      : []),
    ...(policyMutation
      ? [".agentplane/policy/dod.docs.md", ".agentplane/policy/governance.md"]
      : []),
    ...(changedPaths.includes(".agentplane/policy/incidents.md")
      ? [".agentplane/policy/incidents.md"]
      : []),
  ]);
}

async function observeWorkflowPolicy(opts: {
  ctx: CommandContext;
  repositoryRoot: string;
  policyPaths: readonly string[];
  scope: Extract<WorkflowPolicyScopeObservation, { state: "present" }>;
}): Promise<StateFingerprintComponentInput> {
  const modules = await Promise.all(
    opts.policyPaths.map((modulePath) =>
      observeRepositoryFile(opts.repositoryRoot, modulePath, "workflow_route_policy_module"),
    ),
  );
  const unavailable = modules.find((module) => module.state !== "present");
  if (unavailable) {
    return unavailableComponent(
      "workflow_route_policy",
      unavailable.state === "missing"
        ? "policy_module_missing"
        : "policy_module_observation_unavailable",
      { selectedPaths: opts.policyPaths, modules },
    );
  }
  return presentComponent("workflow_route_policy", {
    config: {
      workflowMode: opts.ctx.config.workflow_mode,
      approvals: opts.ctx.config.agents?.approvals ?? null,
      branch: opts.ctx.config.branch,
      paths: opts.ctx.config.paths,
    },
    selectedPaths: opts.policyPaths,
    changeScope: {
      changedPaths: opts.scope.changedPaths,
      sources: opts.scope.sources,
    },
    modules,
  });
}

function relativeRepositoryPath(repositoryRoot: string, filePath: string): string | null {
  const relative = path.relative(repositoryRoot, filePath).split(path.sep).join("/");
  if (
    relative === "" ||
    relative === ".." ||
    relative.startsWith("../") ||
    path.posix.isAbsolute(relative)
  ) {
    return null;
  }
  return relative;
}

function backendSemanticPaths(ctx: CommandContext): string[] {
  const paths = [ctx.backendConfigPath];
  const backend = ctx.taskBackend as CommandContext["taskBackend"] & { statePath?: unknown };
  if (typeof backend.statePath === "string" && backend.statePath.trim()) {
    paths.push(path.resolve(backend.statePath));
  }
  return paths.flatMap((filePath) => {
    const relative = relativeRepositoryPath(ctx.resolvedProject.gitRoot, filePath);
    return relative ? [relative] : [];
  });
}

function semanticGitExclusions(opts: {
  ctx: CommandContext;
  taskId: string;
  policyPaths: readonly string[];
}): string[] {
  return [
    path.join(opts.ctx.config.paths.workflow_dir, opts.taskId),
    ".agentplane/context/manifest.lock.json",
    ".agentplane/context/agentplane.context.yaml",
    ...opts.policyPaths,
    ...backendSemanticPaths(opts.ctx),
  ];
}

function workflowAuthority(step: WorkflowStep): Record<string, unknown> {
  const common = {
    stepKind: step.kind,
    stepId: step.id,
    phase: step.phase,
    authoritativeCheckout: step.authoritativeCheckout,
  };
  switch (step.kind) {
    case "cli_operation": {
      return {
        ...common,
        operation: {
          id: step.operation.id,
          type: step.operation.type,
          params: step.operation.params,
        },
      };
    }
    case "agent_episode": {
      return { ...common, episode: step.episode };
    }
    case "approval": {
      return {
        ...common,
        request: {
          type: step.request.type,
          taskId: step.request.taskId,
        },
      };
    }
    case "human_input": {
      return { ...common, request: step.request };
    }
    case "wait": {
      return { ...common, condition: step.condition };
    }
    case "terminal": {
      return { ...common, outcome: step.outcome };
    }
  }
}

function bootstrapFingerprint(state: WorkflowRouteStateInput): StateFingerprint {
  const projection = routeProjection(state);
  const worktree = state.resume.workspace_root.trim() || "workflow-route:bootstrap";
  return buildStateFingerprint({
    task_id: state.task.id,
    task_revision:
      typeof state.task.revision === "number" && state.task.revision > 0
        ? state.task.revision
        : null,
    git_head: state.resume.head_sha,
    worktree,
    components: {
      task: presentComponent("workflow_route_bootstrap", state.task),
      git: presentComponent("workflow_route_bootstrap", projection.workspace),
      backend_projection: presentComponent("workflow_route_bootstrap", {
        sync: state.task.sync ?? null,
      }),
      policy: presentComponent("workflow_route_bootstrap", {
        workflowMode: state.workflowMode,
      }),
      blueprint: presentComponent("workflow_route_bootstrap", {
        state: "not_observed",
      }),
      knowledge: presentComponent("workflow_route_bootstrap", {
        state: "not_observed",
      }),
      provider: providerComponent(state),
      authority: presentComponent("workflow_route_bootstrap", projection),
    },
  });
}

export function withBootstrapWorkflowFingerprint(
  state: WorkflowRouteStateInput,
): WorkflowRouteState {
  return { ...state, preconditionFingerprint: bootstrapFingerprint(state) };
}

export async function captureWorkflowStepFingerprint(opts: {
  ctx: CommandContext;
  state: WorkflowRouteStateInput;
  step: WorkflowStep;
  paths: WorkflowFingerprintPaths;
}): Promise<StateFingerprint> {
  const authoritativePath = checkoutPath(opts.step.authoritativeCheckout, opts.paths);
  const fallbackWorktree = `unavailable:${opts.step.authoritativeCheckout}`;
  const repositoryRoot = authoritativePath;
  const blueprintPath = path.join(
    opts.ctx.config.paths.workflow_dir,
    opts.state.task.id,
    "blueprint",
    "resolved-snapshot.json",
  );
  const blueprintObservation = repositoryRoot
    ? await observeWorkflowBlueprint({
        ctx: opts.ctx,
        repositoryRoot,
        task: opts.state.task,
        step: opts.step,
        workflowMode: opts.state.workflowMode,
        relativePath: blueprintPath,
      })
    : {
        component: unavailableComponent(
          "workflow_route_blueprint",
          "authoritative_checkout_unavailable",
        ),
        policyModules: [],
      };
  const policyScope = repositoryRoot
    ? await observeWorkflowPolicyScope({
        repositoryRoot,
        state: opts.state,
      })
    : {
        state: "unavailable" as const,
        reason: "authoritative_checkout_unavailable",
        evidence: { checkout: opts.step.authoritativeCheckout },
      };
  const selectedPolicyPaths = workflowPolicyPaths(
    opts.ctx.config.workflow_mode,
    blueprintObservation.policyModules,
    policyScope.state === "present" ? policyScope.changedPaths : [],
  );
  const [knowledge, policy, backendProjection] = repositoryRoot
    ? await Promise.all([
        observeKnowledgeProjection(repositoryRoot),
        policyScope.state === "present"
          ? observeWorkflowPolicy({
              ctx: opts.ctx,
              repositoryRoot,
              policyPaths: selectedPolicyPaths,
              scope: policyScope,
            })
          : Promise.resolve(
              unavailableComponent(
                "workflow_route_policy",
                "policy_graph_observation_unavailable",
                {
                  reason: policyScope.reason,
                  ...policyScope.evidence,
                },
              ),
            ),
        observeBackendProjection(opts.ctx, { repository_root: repositoryRoot }),
      ])
    : [
        unavailableComponent("context_manifest_lock", "authoritative_checkout_unavailable"),
        unavailableComponent("workflow_route_policy", "authoritative_checkout_unavailable"),
        unavailableComponent("task_backend_runtime", "authoritative_checkout_unavailable"),
      ];
  const git = repositoryRoot
    ? await captureGitSnapshot({
        repository_root: repositoryRoot,
        excluded_roots: semanticGitExclusions({
          ctx: opts.ctx,
          taskId: opts.state.task.id,
          policyPaths: selectedPolicyPaths,
        }),
      })
    : null;
  const gitComponent =
    git?.state === "available"
      ? presentComponent("workflow_route_git", {
          repositoryRoot: git.repository_root,
          snapshotSha256: git.snapshot_sha256,
          dirtyPaths: git.dirty_paths,
          statusEntries: git.status_entries,
          indexEntries: git.index_entries,
          pathFingerprints: git.path_fingerprints,
          excludedPaths: git.excluded_paths,
        })
      : unavailableComponent("workflow_route_git", "authoritative_checkout_unavailable", {
          checkout: opts.step.authoritativeCheckout,
          path: authoritativePath,
          errors: git?.errors ?? [],
        });
  return buildStateFingerprint({
    task_id: opts.state.task.id,
    task_revision:
      typeof opts.state.task.revision === "number" && opts.state.task.revision > 0
        ? opts.state.task.revision
        : null,
    git_head: git?.head_commit ?? null,
    worktree: authoritativePath ?? fallbackWorktree,
    components: {
      task: semanticTaskComponent(opts.state),
      git: gitComponent,
      backend_projection: backendProjection,
      policy,
      blueprint: blueprintObservation.component,
      knowledge,
      provider: providerComponent(opts.state),
      authority: presentComponent("workflow_route_authority", {
        planApproval: opts.state.task.plan_approval ?? null,
        owner: opts.state.task.owner,
        blockers: opts.state.blockers,
        batch: opts.state.batchOwnership,
        workflowMode: opts.state.workflowMode,
        step: workflowAuthority(opts.step),
      }),
    },
  });
}
