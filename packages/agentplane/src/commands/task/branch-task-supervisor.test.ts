import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { validateCommitSubject } from "@agentplaneorg/core/commit";
import { gitRevParse } from "@agentplaneorg/core/git";
import { buildStateFingerprint } from "@agentplaneorg/core/schemas";
import {
  createExecutionGrant,
  createPlanProposal,
  createTaskExecutionBaseIdentity,
  hostUserDecisionDigest,
  type HostUserDecision,
  type TaskExecutionContract,
} from "@agentplaneorg/core/tasks";
import { mkGitRepoRoot } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import {
  workflowAuthorityStateScopeDigest,
  workflowOperationAuthorityDigest,
  WORKFLOW_OPERATION_AUTHORITY_POLICY,
} from "../shared/side-effect-authority.js";
import { loadSideEffectAuthorityState } from "../shared/side-effect-authority-store.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { projectWorkflowOperationArgv } from "../shared/workflow-operation-projection.js";
import {
  WORKFLOW_OPERATION_REGISTRY,
  workflowOperationMutatesState,
  type WorkflowOperation,
  type WorkflowOperationId,
  type WorkflowOperationParams,
} from "../shared/workflow-step.js";
import {
  resolveBranchTaskDecisionWithAuthority,
  superviseBranchTaskRunWithPorts,
  type BranchTaskSupervisorPorts,
} from "./branch-task-supervisor.js";
import { branchSupervisorArtifactCommitMessage } from "./branch-task-supervisor-artifact-commit.js";
import { agentTransitionId, buildAgentActionPacket } from "./agent-action-packet.js";
import { resolveConfiguredAuthority } from "./configured-authority.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

const taskId = "202607310001-BRANCH";
const branch = `task/${taskId}/branch-supervisor`;
const execFileAsync = promisify(execFile);

function fingerprint(revision: number) {
  const component = {
    state: "present",
    source: "branch_task_supervisor_test",
    value: { taskId, revision },
  } as const;
  return buildStateFingerprint({
    task_id: taskId,
    task_revision: revision,
    git_head: String(revision).padStart(40, "0"),
    worktree: "/repo/task",
    components: {
      task: component,
      git: component,
      backend_projection: component,
      policy: component,
      blueprint: component,
      knowledge: component,
      provider: component,
      authority: component,
    },
  });
}

function baseDecision(revision: number) {
  return {
    task: {
      id: taskId,
      title: "Branch supervisor fixture",
      status: "DOING",
      owner: "CODER",
      planApproval: "approved",
      verification: null,
      commit: null,
    },
    workflowMode: "branch_pr",
    workspace: {
      root: "/repo",
      branch,
      baseBranch: "main",
      headSha: String(revision).padStart(40, "0"),
      prBranch: branch,
      checkoutRole: "task_worktree",
      baseCheckoutPath: "/repo",
      taskWorktreePath: "/repo/task",
    },
    approval: {
      runtime: { requirePlan: true, requireNetwork: true, requireVerify: true },
      gatewayMutationApprovalRequired: true,
      effectiveMutationApprovalRequired: false,
      routeRequiresApproval: false,
    },
    batchOwnership: { role: "none" },
    prFlow: {
      branch: {
        name: branch,
        headSha: String(revision).padStart(40, "0"),
        metaHeadSha: String(revision).padStart(40, "0"),
      },
      pr: {
        provider: "github",
        state: "OPEN",
        source: "lookup",
        prNumber: 4702,
        prUrl: "https://github.test/pull/4702",
        base: "main",
        headSha: String(revision).padStart(40, "0"),
        mergeCommit: null,
      },
      hostedChecks: { state: "success" },
      queue: { present: false },
      closeTail: { state: "not_applicable", reason: "implementation PR is open" },
    },
    conflictRework: null,
    cleanupProbe: { state: "not_requested" },
    cleanupCandidateCount: null,
    blockers: [],
    ambiguities: [],
    repairPlan: [],
    sourceConfidence: {},
  } as unknown as TaskRouteDecision;
}

function cliDecision<Id extends WorkflowOperationId>(
  revision: number,
  id: Id,
  params: WorkflowOperationParams[Id],
): TaskRouteDecision {
  const decision = baseDecision(revision);
  const stateFingerprint = fingerprint(revision);
  const spec = WORKFLOW_OPERATION_REGISTRY[id];
  const operation = {
    id,
    type: spec.type,
    params,
    preconditionFingerprint: stateFingerprint,
    authorityRef: `authority:${id}:${revision}`,
    idempotencyKey: `${id}:${taskId}:${stateFingerprint.digest}`,
    expectedPostconditions: spec.expectedPostconditions,
    triggersGitHooks: spec.triggersGitHooks,
  } as WorkflowOperation;
  decision.workflowStep = {
    schemaVersion: 1,
    id,
    kind: "cli_operation",
    phase: spec.phase,
    authoritativeCheckout: spec.checkout,
    summary: `execute ${id}`,
    blockers: [],
    selectedBlocker: null,
    compatibility: {
      code: id,
      command: null,
      summary: `execute ${id}`,
      requiresApproval: false,
    },
    preconditionFingerprint: stateFingerprint,
    operation,
    execution: {
      actionKind: "local_command",
      recommendedRole: spec.role,
      semanticMutationAllowed: false,
      mustNot: [],
      returnControlWhen: "after refresh",
      verificationCandidate: null,
      evidenceMissing: [],
      needsVerificationRecord: false,
    },
  };
  decision.executionPacket = {
    schemaVersion: 1,
    actionKind: "local_command",
    safeToMutate: workflowOperationMutatesState(operation),
    requiresProviderAction: false,
    recommendedRole: spec.role,
    authoritativeCheckout: spec.checkout,
    authoritativeCheckoutPath: spec.checkout === "base_checkout" ? "/repo" : "/repo/task",
    mutationPathHint: workflowOperationMutatesState(operation)
      ? spec.checkout === "base_checkout"
        ? "/repo"
        : "/repo/task"
      : null,
    mustRunFrom: spec.checkout === "base_checkout" ? "/repo" : "/repo/task",
    exactArgv: projectWorkflowOperationArgv(operation),
    mustNot: [],
    returnControlWhen: "after refresh",
    humanProviderAction: null,
    staleStateCheck: `agentplane task next-action ${taskId} --explain`,
    evidenceMissing: [],
    verificationCandidate: null,
    stopReason: null,
  };
  return decision;
}

function approvalDecisionFor(decision: TaskRouteDecision): TaskRouteDecision {
  if (decision.workflowStep.kind !== "cli_operation") {
    throw new Error("approval fixture requires a CLI operation");
  }
  const operation = decision.workflowStep.operation;
  const requirement = WORKFLOW_OPERATION_AUTHORITY_POLICY[operation.id];
  return {
    ...decision,
    workflowStep: {
      schemaVersion: 1,
      id: `approval.${operation.id}`,
      kind: "approval",
      phase: "side_effect_authority_required",
      authoritativeCheckout: decision.workflowStep.authoritativeCheckout,
      summary: `authorize ${operation.id} from the approved execution grant`,
      blockers: [],
      selectedBlocker: null,
      compatibility: {
        code: `approval.${operation.id}`,
        command: null,
        summary: `authorize ${operation.id}`,
        requiresApproval: true,
      },
      preconditionFingerprint: operation.preconditionFingerprint,
      request: {
        type: "side_effect",
        taskId,
        authorityRef: `route:${operation.preconditionFingerprint.digest}`,
        operationId: operation.id,
        operation: { id: operation.id, type: operation.type, params: operation.params },
        operationDigest: workflowOperationAuthorityDigest(operation),
        stateFingerprintDigest: operation.preconditionFingerprint.digest,
        stateScopeDigest: workflowAuthorityStateScopeDigest(operation.preconditionFingerprint),
        policyRule: requirement.policyRule,
      },
      execution: {
        actionKind: "provider_action",
        recommendedRole: "USER",
        semanticMutationAllowed: false,
        mustNot: [],
        returnControlWhen: "after authority resolution",
        verificationCandidate: null,
        evidenceMissing: [],
        needsVerificationRecord: false,
      },
    },
  } as TaskRouteDecision;
}

function agentDecision(
  revision: number,
  purpose: "implementation" | "implementation_rework" | "verification" | "quality_review",
): TaskRouteDecision {
  const decision = baseDecision(revision);
  const stateFingerprint = fingerprint(revision);
  decision.workflowStep = {
    schemaVersion: 1,
    id: `agent.${purpose}`,
    kind: "agent_episode",
    phase: purpose,
    authoritativeCheckout: "task_worktree",
    summary: `run ${purpose}`,
    blockers: [],
    selectedBlocker: null,
    compatibility: {
      code: purpose,
      command: null,
      summary: `run ${purpose}`,
      requiresApproval: false,
    },
    preconditionFingerprint: stateFingerprint,
    episode: {
      purpose,
      role:
        purpose === "quality_review"
          ? "EVALUATOR"
          : purpose === "verification"
            ? "TESTER"
            : "CODER",
      taskId,
      objective: `complete ${purpose}`,
    },
    execution: {
      actionKind: "stop",
      recommendedRole:
        purpose === "quality_review"
          ? "EVALUATOR"
          : purpose === "verification"
            ? "TESTER"
            : "CODER",
      semanticMutationAllowed: purpose === "implementation" || purpose === "implementation_rework",
      mustNot: [],
      returnControlWhen: "after episode",
      verificationCandidate: null,
      evidenceMissing: [],
      needsVerificationRecord: purpose === "verification",
    },
  };
  decision.executionPacket = {
    schemaVersion: 1,
    actionKind: "stop",
    safeToMutate: purpose === "implementation" || purpose === "implementation_rework",
    requiresProviderAction: false,
    recommendedRole:
      purpose === "quality_review" ? "EVALUATOR" : purpose === "verification" ? "TESTER" : "CODER",
    authoritativeCheckout: "task_worktree",
    authoritativeCheckoutPath: "/repo/task",
    mutationPathHint:
      purpose === "implementation" || purpose === "implementation_rework" ? "/repo/task" : null,
    mustRunFrom: "/repo/task",
    exactArgv: null,
    mustNot: [],
    returnControlWhen: "after episode",
    humanProviderAction: null,
    staleStateCheck: `agentplane task next-action ${taskId} --explain`,
    evidenceMissing: [],
    verificationCandidate: null,
    stopReason: null,
  };
  return decision;
}

function stopDecision(revision: number, kind: "approval" | "wait" | "terminal"): TaskRouteDecision {
  const decision = baseDecision(revision);
  const stateFingerprint = fingerprint(revision);
  decision.workflowStep =
    kind === "approval"
      ? ({
          schemaVersion: 1,
          id: "approval.integration.enqueue",
          kind,
          phase: "side_effect_authority_required",
          authoritativeCheckout: "task_worktree",
          summary: "merge authority is required",
          blockers: [],
          selectedBlocker: null,
          compatibility: {
            code: "wait_hosted_checks",
            command: "agentplane task authority grant",
            summary: "grant authority",
            requiresApproval: true,
          },
          preconditionFingerprint: stateFingerprint,
          request: {
            type: "side_effect",
            taskId,
            authorityRef: `route:${stateFingerprint.digest}`,
            operationId: "integration.enqueue",
            operation: {
              id: "integration.enqueue",
              type: "integration_enqueue",
              params: { taskId, branch },
            },
            operationDigest: stateFingerprint.digest,
            stateFingerprintDigest: stateFingerprint.digest,
            stateScopeDigest: stateFingerprint.digest,
            policyRule: "workflow.external_high_risk",
          },
          execution: {
            actionKind: "provider_action",
            recommendedRole: "USER",
            semanticMutationAllowed: false,
            mustNot: [],
            returnControlWhen: "after approval",
            verificationCandidate: null,
            evidenceMissing: [],
            needsVerificationRecord: false,
          },
        } as TaskRouteDecision["workflowStep"])
      : kind === "wait"
        ? ({
            schemaVersion: 1,
            id: "wait.runner",
            kind,
            phase: "provider_wait",
            authoritativeCheckout: "base_checkout",
            summary: "wait for hosted merge truth",
            blockers: [],
            selectedBlocker: null,
            compatibility: {
              code: "wait_hosted_checks",
              command: null,
              summary: "wait",
              requiresApproval: false,
            },
            preconditionFingerprint: stateFingerprint,
            condition: { type: "runner_terminal", taskId, runId: null },
            execution: {
              actionKind: "wait",
              recommendedRole: "INTEGRATOR",
              semanticMutationAllowed: false,
              mustNot: [],
              returnControlWhen: "after provider changes",
              verificationCandidate: null,
              evidenceMissing: [],
              needsVerificationRecord: false,
            },
          } as TaskRouteDecision["workflowStep"])
        : ({
            schemaVersion: 1,
            id: "terminal.done",
            kind,
            phase: "done",
            authoritativeCheckout: "base_checkout",
            summary: "task is done",
            blockers: [],
            selectedBlocker: null,
            compatibility: {
              code: "done",
              command: null,
              summary: "done",
              requiresApproval: false,
            },
            preconditionFingerprint: stateFingerprint,
            outcome: { type: "done", taskId },
            execution: {
              actionKind: "stop",
              recommendedRole: "INTEGRATOR",
              semanticMutationAllowed: false,
              mustNot: [],
              returnControlWhen: "terminal",
              verificationCandidate: null,
              evidenceMissing: [],
              needsVerificationRecord: false,
            },
          } as TaskRouteDecision["workflowStep"]);
  return decision;
}

function terminalAttentionDecision(revision: number): TaskRouteDecision {
  const decision = stopDecision(revision, "terminal");
  if (decision.workflowStep.kind !== "terminal") {
    throw new Error("terminal fixture must be terminal");
  }
  decision.workflowStep = {
    ...decision.workflowStep,
    id: "terminal.deleted_branch",
    phase: "attention_required",
    summary: "provider branch was deleted before hosted close",
    outcome: { type: "attention_required", taskId },
  };
  return decision;
}

function sequencePorts(
  gitRoot: string,
  decisions: TaskRouteDecision[],
  calls: string[],
): BranchTaskSupervisorPorts {
  let index = 0;
  return {
    git_root: gitRoot,
    task_id: taskId,
    decide: () => Promise.resolve(decisions[Math.min(index, decisions.length - 1)]!),
    execute_operation: ({ operation }) => {
      calls.push(operation.id);
      index += 1;
      return Promise.resolve({
        status: "succeeded",
        observed_postconditions: operation.expectedPostconditions
          .map((postcondition) => postcondition.id)
          .filter((id) => id !== "route_state_recomputed"),
        detail: `executed ${operation.id}`,
        exit_code: 0,
      });
    },
    execute_episode: ({ decision }) => {
      calls.push(decision.workflowStep.id);
      index += 1;
      const purpose =
        decision.workflowStep.kind === "agent_episode"
          ? decision.workflowStep.episode.purpose
          : "implementation";
      return Promise.resolve({
        status: "completed",
        decision: decisions[Math.min(index, decisions.length - 1)]!,
        ...(purpose === "implementation" || purpose === "implementation_rework"
          ? {
              executor: {
                run_id: "run-branch-golden",
                receipt: {
                  path: "agentplane-run://branch/receipt.json",
                  sha256: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                  verification_state: "observed_success" as const,
                  observed_by: "agentplane",
                },
                semantic_status: "completed" as const,
                implementation_commit: "a".repeat(40),
              },
              executor_lifecycle_event_delta: 0,
            }
          : {}),
        ...(purpose === "quality_review"
          ? {
              evaluator: {
                evaluator_id: "recovery-context",
                verdict: "pass" as const,
                result_path: "quality/result.json",
                report_path: "quality/report.json",
                receipt_path: "quality/evaluator-episode.json",
              },
            }
          : {}),
        journal: null,
        provider_episodes: purpose === "verification" ? 0 : 1,
        lifecycle_calls: 1,
      });
    },
  };
}

describe("branch_pr task supervisor", () => {
  it("generates policy-valid task artifact commit subjects", () => {
    for (const artifact of [
      "verification_pass",
      "verification_rework",
      "evaluator_verdict",
    ] as const) {
      expect(
        validateCommitSubject({
          subject: branchSupervisorArtifactCommitMessage(taskId, artifact),
          taskId,
          genericTokens: ["update", "tasks", "wip"],
          taskIntent: {
            taskKind: "release",
            mutationScope: "release",
            blueprintRequest: "release.strict",
            tags: ["code", "regression", "release"],
          },
        }),
      ).toEqual({ ok: true, errors: [] });
    }
  });

  it.each([
    ["planned approval", stopDecision(11, "approval"), "approval_required", "authority_boundary"],
    ["hosted wait", stopDecision(12, "wait"), "wait_required", "external_boundary"],
    ["done", stopDecision(13, "terminal"), null, "terminal"],
    ["blocked", terminalAttentionDecision(14), "terminal_attention", "terminal"],
  ] as const)(
    "keeps managed and external %s transition identity, fingerprint, and stop parity",
    async (_label, route, managedStop, externalStop) => {
      const root = await mkGitRepoRoot();
      const managed = await superviseBranchTaskRunWithPorts(sequencePorts(root, [route], []));
      const external = buildAgentActionPacket({
        decision: route,
        work_order: {
          role: "EXECUTOR",
          authority: { sandbox: "read-only", network: "deny" },
          required_inputs: [],
        } as never,
      });

      expect(managed.route).toMatchObject({
        step_id: route.workflowStep.id,
        state_fingerprint: route.workflowStep.preconditionFingerprint.digest,
      });
      expect(managed.stop?.code ?? null).toBe(managedStop);
      expect(external).toMatchObject({
        transition_id: agentTransitionId(managed.route.step_id),
        state_fingerprint: managed.route.state_fingerprint,
        stop: { reason: externalStop },
      });
    },
  );

  it("keeps evaluator rework and stale deterministic stops on the same canonical route evidence", async () => {
    const reworkRoot = await mkGitRepoRoot();
    const rework = agentDecision(15, "implementation_rework");
    const reworkPorts = sequencePorts(reworkRoot, [rework], []);
    reworkPorts.execute_episode = () =>
      Promise.resolve({
        status: "stopped",
        decision: rework,
        stop: {
          code: "evaluator_rework",
          reason: "persisted evaluator rework remains authoritative",
          route_step_id: rework.workflowStep.id,
          operation_id: null,
        },
        journal: null,
        provider_episodes: 0,
        lifecycle_calls: 0,
      });
    const managedRework = await superviseBranchTaskRunWithPorts(reworkPorts);
    const externalRework = buildAgentActionPacket({
      decision: rework,
      work_order: {
        role: "EXECUTOR",
        authority: { sandbox: "workspace-write", network: "deny" },
        required_inputs: [],
      } as never,
    });
    expect(managedRework).toMatchObject({
      route: {
        step_id: rework.workflowStep.id,
        state_fingerprint: rework.workflowStep.preconditionFingerprint.digest,
      },
      stop: { code: "evaluator_rework" },
    });
    expect(externalRework).toMatchObject({
      transition_id: agentTransitionId(managedRework.route.step_id),
      state_fingerprint: managedRework.route.state_fingerprint,
      action: { kind: "agent_episode" },
      stop: { reason: "semantic_boundary" },
    });

    const staleRoot = await mkGitRepoRoot();
    const stale = cliDecision(16, "integration.enqueue", { taskId, branch });
    const stalePorts = sequencePorts(staleRoot, [stale], []);
    stalePorts.execute_operation = () => Promise.reject(new Error("stale fingerprint"));
    const managedStale = await superviseBranchTaskRunWithPorts(stalePorts);
    const externalStale = buildAgentActionPacket({
      decision: stale,
      work_order: {
        role: "EXECUTOR",
        authority: { sandbox: "read-only", network: "deny" },
        required_inputs: [],
      } as never,
      recovery: {
        reason: "stale_state",
        evidence_digest: `sha256:${"c".repeat(64)}`,
      },
    });
    expect(managedStale).toMatchObject({
      route: {
        step_id: stale.workflowStep.id,
        state_fingerprint: stale.workflowStep.preconditionFingerprint.digest,
      },
      stop: { code: "operation_failed", operation_id: "integration.enqueue" },
    });
    expect(externalStale).toMatchObject({
      transition_id: agentTransitionId(managedStale.route.step_id),
      state_fingerprint: managedStale.route.state_fingerprint,
      action: { kind: "framework_transition" },
      recovery: { reason: "stale_state" },
      stop: { reason: "control_plane_boundary" },
    });
  });

  it("runs semantic roles, opens one PR, enqueues one exact head, and advances its queue", async () => {
    const root = await mkGitRepoRoot();
    const decisions = [
      agentDecision(1, "implementation"),
      agentDecision(2, "verification"),
      agentDecision(3, "quality_review"),
      cliDecision(4, "pr.open", { taskId, author: "CODER", includeTaskIds: [] }),
      cliDecision(5, "integration.enqueue", { taskId, branch }),
      cliDecision(6, "integration.run_next", { taskId }),
      stopDecision(7, "terminal"),
    ];
    const calls: string[] = [];
    const result = await superviseBranchTaskRunWithPorts(sequencePorts(root, decisions, calls));

    expect(result.status).toBe("finalized");
    expect(result.stop).toBeNull();
    expect(calls).toEqual([
      "agent.implementation",
      "agent.verification",
      "agent.quality_review",
      "pr.open",
      "integration.enqueue",
      "integration.run_next",
    ]);
    expect(result.executor).toMatchObject({
      implementation_commit: "a".repeat(40),
      semantic_status: "completed",
    });
    expect(result.metrics.executor_lifecycle_event_delta).toBe(0);
    expect(result.operation_receipts).toHaveLength(3);
    expect(result.operation_receipts[0]).toMatchObject({
      operation_id: "pr.open",
      provider: { state: "OPEN", pr_number: 4702 },
    });
    expect(result.operation_receipts[1]).toMatchObject({
      operation_id: "integration.enqueue",
      branch,
      task_head_sha: String(6).padStart(40, "0"),
    });
    expect(result.operation_receipts[2]).toMatchObject({
      operation_id: "integration.run_next",
    });
  });

  it("uses one host decision through provider integration, hosted close, and cleanup", async () => {
    const root = await mkGitRepoRoot();
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "base"], { cwd: root });
    const baseSha = await gitRevParse(root, ["HEAD^{commit}"]);
    const repositoryIdentity = await resolveLogicalRepositoryIdentity({ git_root: root, task: {} });
    const plan = "Implement, verify, publish, integrate, close, and clean the task.";
    const executionContract = {
      selected_mode: "branch_pr",
      declaration: {
        repository_effects: ["repository_write", "source_code", "tests"],
        external_effects: ["external_write"],
      },
      authority: {
        writable_roots: ["packages/app"],
        allowed_repository_effects: ["repository_write", "source_code", "tests"],
        forbidden_repository_effects: [],
        allowed_external_effects: ["external_write"],
        forbidden_external_effects: [],
      },
      verification: { required_evidence: ["hosted_integration", "task_outcome"] },
    } as TaskExecutionContract;
    const proposal = createPlanProposal({
      task_id: taskId,
      task_revision: 2,
      plan,
      execution_contract: executionContract,
      repository_identity: repositoryIdentity,
    });
    const hostDecision = {
      schema_version: 1,
      kind: "agentplane.host_user_decision",
      origin: "user",
      host_id: "codex",
      conversation_id: "one-confirmation-terminal-supervisor",
      message_id: "user-approval-1",
      task_id: taskId,
      plan_digest: proposal.plan_digest,
      state_fingerprint: `sha256:${"c".repeat(64)}`,
      decision: "approved",
      decided_at: "2026-08-21T10:00:00.000Z",
    } as const satisfies HostUserDecision;
    const executionGrant = createExecutionGrant({
      proposal,
      execution_contract: executionContract,
      actor: "HOST:codex:USER",
      approval_kind: "host_user_decision",
      approval_evidence_digest: hostUserDecisionDigest(hostDecision),
      issued_at: hostDecision.decided_at,
    });
    const task = {
      id: taskId,
      title: "One-confirmation terminal supervisor",
      status: "DOING",
      owner: "CODER",
      revision: 2,
      sections: { Plan: plan },
      execution_contract: executionContract,
      extensions: {
        "agentplane.execution_grant": executionGrant,
        task_execution_context: createTaskExecutionBaseIdentity({
          base_ref: "main",
          base_sha: baseSha,
          repository_identity: repositoryIdentity,
          source: "explicit",
        }),
      },
    } as unknown as NonNullable<Awaited<ReturnType<CommandContext["taskBackend"]["getTask"]>>>;
    const command = {
      resolvedProject: { gitRoot: root },
      config: {
        paths: { workflow_dir: ".agentplane/tasks" },
        branch: { task_prefix: "task/" },
        authority: {
          mode: "manual",
          actor: "POLICY:repository",
          allow_operations: [],
          deny_operations: [],
          ttl_minutes: 15,
        },
      },
      taskBackend: { getTask: () => Promise.resolve(task) },
      backendId: "local",
      memo: {},
    } as unknown as CommandContext;
    const prOpen = cliDecision(4, "pr.open", { taskId, author: "CODER", includeTaskIds: [] });
    const preMergeClose = cliDecision(5, "task.pre_merge_close", {
      taskId,
      author: "CODER",
      body: "Verified terminal supervisor fixture.",
      result: "One confirmation reached closeout.",
      commit: "a".repeat(40),
      force: true,
    });
    const enqueue = cliDecision(6, "integration.enqueue", { taskId, branch });
    const hostedClose = cliDecision(8, "task.hosted_close.open", { taskId });
    const rawDecisions = [
      agentDecision(1, "implementation"),
      agentDecision(2, "verification"),
      agentDecision(3, "quality_review"),
      approvalDecisionFor(prOpen),
      prOpen,
      approvalDecisionFor(preMergeClose),
      preMergeClose,
      approvalDecisionFor(enqueue),
      enqueue,
      cliDecision(7, "integration.run_next", { taskId }),
      approvalDecisionFor(hostedClose),
      hostedClose,
      cliDecision(9, "task.hosted_close.finalize", { taskId, base: "main" }),
      cliDecision(10, "task.worktree.cleanup", { taskId, base: "main" }),
      stopDecision(11, "terminal"),
    ];
    let rawIndex = 0;
    const decide = async () =>
      await resolveBranchTaskDecisionWithAuthority({
        decide: () => Promise.resolve(rawDecisions[Math.min(rawIndex++, rawDecisions.length - 1)]!),
        resolve_authority: async (decision) =>
          await resolveConfiguredAuthority({ command, decision }),
      });
    const calls: string[] = [];
    const result = await superviseBranchTaskRunWithPorts({
      git_root: root,
      task_id: taskId,
      decide,
      execute_operation: ({ operation }) => {
        calls.push(operation.id);
        return Promise.resolve({
          status: "succeeded",
          observed_postconditions: operation.expectedPostconditions
            .map((postcondition) => postcondition.id)
            .filter((id) => id !== "route_state_recomputed"),
          detail: `executed ${operation.id}`,
          exit_code: 0,
        });
      },
      execute_episode: async ({ decision }) => {
        calls.push(decision.workflowStep.id);
        const purpose =
          decision.workflowStep.kind === "agent_episode"
            ? decision.workflowStep.episode.purpose
            : "implementation";
        return {
          status: "completed",
          decision: await decide(),
          ...(purpose === "implementation"
            ? {
                executor: {
                  run_id: "one-confirmation-executor",
                  receipt: {
                    path: "agentplane-run://one-confirmation/receipt.json",
                    sha256: `sha256:${"a".repeat(64)}`,
                    verification_state: "observed_success" as const,
                    observed_by: "agentplane" as const,
                  },
                  semantic_status: "completed" as const,
                  implementation_commit: "a".repeat(40),
                },
                executor_lifecycle_event_delta: 0,
              }
            : {}),
          ...(purpose === "quality_review"
            ? {
                evaluator: {
                  evaluator_id: "recovery-context",
                  verdict: "pass" as const,
                  result_path: "quality/result.json",
                  report_path: "quality/report.json",
                  receipt_path: "quality/evaluator-episode.json",
                },
              }
            : {}),
          journal: null,
          provider_episodes: purpose === "verification" ? 0 : 1,
          lifecycle_calls: 1,
        };
      },
    });
    const persisted = await loadSideEffectAuthorityState({ gitRoot: root, taskId, task });

    expect(result).toMatchObject({
      status: "finalized",
      stop: null,
      route: { step_id: "terminal.done" },
    });
    expect(calls).toEqual([
      "agent.implementation",
      "agent.verification",
      "agent.quality_review",
      "pr.open",
      "task.pre_merge_close",
      "integration.enqueue",
      "integration.run_next",
      "task.hosted_close.open",
      "task.hosted_close.finalize",
      "task.worktree.cleanup",
    ]);
    expect(result.operation_receipts.map((receipt) => receipt.operation_id)).toEqual(
      calls.slice(3),
    );
    expect(persisted.state?.grants).toHaveLength(4);
    expect(persisted.state?.audit).toHaveLength(4);
    expect(
      persisted.state?.grants.every(
        (authority) => authority.operationLease?.grant_digest === executionGrant.digest,
      ),
    ).toBe(true);
    expect(executionGrant.approval_kind).toBe("host_user_decision");
  });

  it("returns merge authority to the user without imitating a provider action", async () => {
    const root = await mkGitRepoRoot();
    const calls: string[] = [];
    const result = await superviseBranchTaskRunWithPorts(
      sequencePorts(root, [stopDecision(1, "approval")], calls),
    );

    expect(result.stop?.code).toBe("approval_required");
    expect(result.operation_receipts).toEqual([]);
    expect(calls).toEqual([]);
  });

  it("finalizes only from explicit terminal provider and cleanup truth", async () => {
    const root = await mkGitRepoRoot();
    const calls: string[] = [];
    const result = await superviseBranchTaskRunWithPorts(
      sequencePorts(root, [stopDecision(1, "terminal")], calls),
    );

    expect(result).toMatchObject({
      status: "finalized",
      stop: null,
      route: { step_id: "terminal.done" },
    });
    expect(calls).toEqual([]);
  });

  it("maps late checks to a typed wait without provider or lifecycle calls", async () => {
    const root = await mkGitRepoRoot();
    const calls: string[] = [];
    const result = await superviseBranchTaskRunWithPorts(
      sequencePorts(root, [stopDecision(1, "wait")], calls),
    );

    expect(result.stop).toMatchObject({
      code: "wait_required",
      route_step_id: "wait.runner",
    });
    expect(result.metrics).toMatchObject({ lifecycle_calls: 0, provider_episodes: 0 });
    expect(calls).toEqual([]);
  });

  it("delegates stale-head or merge-conflict repair to one semantic rework episode", async () => {
    const root = await mkGitRepoRoot();
    const calls: string[] = [];
    const result = await superviseBranchTaskRunWithPorts(
      sequencePorts(
        root,
        [agentDecision(1, "implementation_rework"), stopDecision(2, "wait")],
        calls,
      ),
    );

    expect(result.stop?.code).toBe("wait_required");
    expect(result.executor?.semantic_status).toBe("completed");
    expect(result.metrics).toMatchObject({
      lifecycle_calls: 1,
      provider_episodes: 1,
      executor_lifecycle_event_delta: 0,
    });
    expect(calls).toEqual(["agent.implementation_rework"]);
  });

  it("continues bounded evaluator rework without creating another approval boundary", async () => {
    const root = await mkGitRepoRoot();
    const calls: string[] = [];
    const decisions = [
      agentDecision(1, "quality_review"),
      agentDecision(2, "implementation_rework"),
      agentDecision(3, "verification"),
      agentDecision(4, "quality_review"),
      stopDecision(5, "terminal"),
    ];
    const ports = sequencePorts(root, decisions, calls);
    const executeEpisode = ports.execute_episode;
    let evaluatorCount = 0;
    ports.execute_episode = async (input) => {
      const outcome = await executeEpisode(input);
      if (
        input.decision.workflowStep.kind === "agent_episode" &&
        input.decision.workflowStep.episode.purpose === "quality_review"
      ) {
        evaluatorCount += 1;
        if (evaluatorCount === 1 && outcome.status === "completed" && outcome.evaluator) {
          return {
            ...outcome,
            evaluator: { ...outcome.evaluator, verdict: "rework" as const },
          };
        }
      }
      return outcome;
    };

    const result = await superviseBranchTaskRunWithPorts(ports);

    expect(result.status).toBe("finalized");
    expect(result.stop).toBeNull();
    expect(calls).toEqual([
      "agent.quality_review",
      "agent.implementation_rework",
      "agent.verification",
      "agent.quality_review",
    ]);
    expect(calls).not.toContain("approval.integration.enqueue");
  });

  it("returns deleted provider branch truth as terminal attention", async () => {
    const root = await mkGitRepoRoot();
    const calls: string[] = [];
    const result = await superviseBranchTaskRunWithPorts(
      sequencePorts(root, [terminalAttentionDecision(1)], calls),
    );

    expect(result.status).toBe("stopped");
    expect(result.stop).toMatchObject({
      code: "terminal_attention",
      route_step_id: "terminal.deleted_branch",
    });
    expect(calls).toEqual([]);
  });

  it("stops queue contention after one durable operation intent", async () => {
    const root = await mkGitRepoRoot();
    const calls: string[] = [];
    const ports = sequencePorts(
      root,
      [cliDecision(1, "integration.enqueue", { taskId, branch }), stopDecision(2, "wait")],
      calls,
    );
    ports.execute_operation = ({ operation }) => {
      calls.push(operation.id);
      throw new Error("queue_contention");
    };
    const result = await superviseBranchTaskRunWithPorts(ports);

    expect(result.stop).toMatchObject({
      code: "operation_failed",
      operation_id: "integration.enqueue",
    });
    expect(result.operation_receipts).toEqual([]);
    expect(calls).toEqual(["integration.enqueue"]);
  });

  it("does not replay a completed hosted-close side effect on supervisor restart", async () => {
    const root = await mkGitRepoRoot();
    const decision = cliDecision(1, "task.hosted_close.open", { taskId });
    const firstCalls: string[] = [];
    const first = await superviseBranchTaskRunWithPorts(
      sequencePorts(root, [decision, stopDecision(2, "wait")], firstCalls),
    );
    const retryCalls: string[] = [];
    const retry = await superviseBranchTaskRunWithPorts(
      sequencePorts(root, [decision, stopDecision(2, "wait")], retryCalls),
    );

    expect(first.operation_receipts).toHaveLength(1);
    expect(firstCalls).toEqual(["task.hosted_close.open"]);
    expect(retry.stop?.code).toBe("supervisor_stopped");
    expect(retryCalls).toEqual([]);
  });

  it("records merged provider truth and the final main head in cleanup receipts", async () => {
    const root = await mkGitRepoRoot();
    const terminal = stopDecision(2, "terminal");
    const mainHead = "f".repeat(40);
    const mergeCommit = "e".repeat(40);
    terminal.workspace.headSha = mainHead;
    if (terminal.prFlow) {
      terminal.prFlow.pr = {
        provider: "github",
        state: "MERGED",
        source: "lookup",
        prNumber: 4702,
        prUrl: "https://github.test/pull/4702",
        base: "main",
        headSha: String(1).padStart(40, "0"),
        mergeCommit,
      };
      terminal.prFlow.closeTail = {
        state: "satisfied",
        reason: "hosted close and cleanup completed",
      };
    }
    const calls: string[] = [];
    const result = await superviseBranchTaskRunWithPorts(
      sequencePorts(
        root,
        [cliDecision(1, "task.hosted_close.finalize", { taskId, base: "main" }), terminal],
        calls,
      ),
    );

    expect(result.status).toBe("finalized");
    expect(result.operation_receipts[0]).toMatchObject({
      operation_id: "task.hosted_close.finalize",
      base_head_sha: mainHead,
      provider: {
        state: "MERGED",
        pr_number: 4702,
        merge_commit: mergeCommit,
        close_tail_state: "satisfied",
      },
    });
  });
});
