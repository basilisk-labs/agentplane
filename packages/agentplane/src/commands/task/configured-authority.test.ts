import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import type { SideEffectAuthorityConfig } from "@agentplaneorg/core/config";
import { buildStateFingerprint } from "@agentplaneorg/core/schemas";
import {
  createExecutionGrant,
  createPlanProposal,
  createTaskExecutionBaseIdentity,
  type TaskExecutionContract,
} from "@agentplaneorg/core/tasks";
import { mkGitRepoRootWithBranch } from "@agentplane/testkit";

import { loadSideEffectAuthorityState } from "../shared/side-effect-authority-store.js";
import {
  workflowAuthorityStateScopeDigest,
  workflowOperationAuthorityDigest,
} from "../shared/side-effect-authority.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { createTaskScopeExtensionRequestState } from "../shared/task-scope-extension-request.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import {
  isOperationAuthorizedByPolicy,
  isOperationAuthorizedByExecutionGrant,
  isScopeExtensionCoveredByExecutionGrant,
  executionGrantOperationLeaseId,
  resolveConfiguredAuthority,
} from "./configured-authority.js";

const REPOSITORY_IDENTITY = `sha256:${"f".repeat(64)}`;
const execFileAsync = promisify(execFile);

function authority(overrides: Partial<SideEffectAuthorityConfig>): SideEffectAuthorityConfig {
  return {
    mode: "manual",
    actor: "POLICY:repository",
    allow_operations: [],
    deny_operations: [],
    ttl_minutes: 15,
    ...overrides,
  };
}

describe("configured repository authority", () => {
  it("uses a replay-stable lease id and changes it on material operation scope drift", () => {
    const input = {
      grant_digest: `sha256:${"a".repeat(64)}`,
      task_id: "TASK-1",
      operation_id: "pr.open",
      operation_digest: `sha256:${"b".repeat(64)}`,
      state_scope_digest: `sha256:${"c".repeat(64)}`,
    };

    expect(executionGrantOperationLeaseId(input)).toBe(executionGrantOperationLeaseId(input));
    expect(
      executionGrantOperationLeaseId({
        ...input,
        state_scope_digest: `sha256:${"d".repeat(64)}`,
      }),
    ).not.toBe(executionGrantOperationLeaseId(input));
  });

  it("replays one grant-covered authority transition without duplicating durable effects", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "base"], { cwd: root });
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const repositoryIdentity = await resolveLogicalRepositoryIdentity({ git_root: root, task: {} });
    const taskId = "202608211500-REPLAY";
    const plan = "Open and integrate the approved task PR.";
    const executionContract = {
      selected_mode: "branch_pr",
      declaration: {
        repository_effects: ["repository_write"],
        external_effects: ["external_write"],
      },
      authority: {
        writable_roots: ["packages/app"],
        allowed_repository_effects: ["repository_write"],
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
    const executionGrant = createExecutionGrant({
      proposal,
      execution_contract: executionContract,
      actor: "HOST:codex:USER",
      approval_kind: "host_user_decision",
      issued_at: "2026-08-21T10:00:00.000Z",
    });
    const task = {
      id: taskId,
      title: "Replay authority",
      status: "DOING",
      owner: "CODER",
      revision: 2,
      sections: { Plan: plan },
      execution_contract: executionContract,
      extensions: {
        "agentplane.execution_grant": executionGrant,
        task_execution_context: createTaskExecutionBaseIdentity({
          base_ref: "main",
          base_sha: stdout.trim(),
          source: "explicit",
          repository_identity: repositoryIdentity,
        }),
      },
    } as unknown as Awaited<ReturnType<CommandContext["taskBackend"]["getTask"]>>;
    const command = {
      resolvedProject: { gitRoot: root },
      config: {
        paths: { workflow_dir: ".agentplane/tasks" },
        authority: authority({ mode: "manual" }),
      },
      taskBackend: { getTask: () => Promise.resolve(task) },
      backendId: "local",
      memo: {},
    } as unknown as CommandContext;
    const fingerprint = buildStateFingerprint({
      task_id: taskId,
      task_revision: 2,
      git_head: stdout.trim(),
      worktree: root,
      components: {
        task: { state: "present", source: "fixture", value: { plan } },
        git: { state: "present", source: "fixture", value: { tree: "approved" } },
        backend_projection: { state: "present", source: "fixture", value: { revision: 2 } },
        policy: { state: "present", source: "fixture", value: { route: "branch_pr" } },
        blueprint: { state: "present", source: "fixture", value: { id: "code.branch_pr" } },
        knowledge: { state: "present", source: "fixture", value: {} },
        provider: { state: "present", source: "fixture", value: { pr: "missing" } },
        authority: { state: "present", source: "fixture", value: { grant: executionGrant.digest } },
      },
    });
    const operation = {
      id: "pr.open" as const,
      type: "pr_sync" as const,
      params: { taskId, author: "CODER", includeTaskIds: [] },
    };
    const decision = {
      workflowMode: "direct",
      workflowStep: {
        kind: "approval",
        preconditionFingerprint: fingerprint,
        request: {
          type: "side_effect",
          taskId,
          authorityRef: `route:${fingerprint.digest}`,
          operationId: operation.id,
          operation,
          operationDigest: workflowOperationAuthorityDigest(operation),
          stateFingerprintDigest: fingerprint.digest,
          stateScopeDigest: workflowAuthorityStateScopeDigest(fingerprint),
          policyRule: "workflow.external_reversible",
        },
      },
    } as unknown as TaskRouteDecision;

    expect(await resolveConfiguredAuthority({ command, decision })).toMatchObject({
      state: "granted",
      source: "execution_grant",
    });
    expect(await resolveConfiguredAuthority({ command, decision })).toMatchObject({
      state: "granted",
      source: "execution_grant",
    });
    const persisted = await loadSideEffectAuthorityState({
      gitRoot: root,
      taskId,
      task: task!,
    });
    expect(persisted.state?.grants).toHaveLength(1);
    expect(persisted.state?.audit).toHaveLength(1);
    expect(persisted.state?.grants[0]?.operationLease?.lease_id).toBe(
      executionGrantOperationLeaseId({
        grant_digest: executionGrant.digest,
        task_id: taskId,
        operation_id: operation.id,
        operation_digest: workflowOperationAuthorityDigest(operation),
        state_scope_digest: workflowAuthorityStateScopeDigest(fingerprint),
      }),
    );
  });

  it("compiles plan authority into provider operations and bounded scope expansion", () => {
    const contract = {
      selected_mode: "branch_pr",
      declaration: {
        repository_effects: ["repository_write"],
        external_effects: ["network_read", "external_write"],
      },
      authority: { writable_roots: ["packages/app"] },
    } as TaskExecutionContract;
    const grant = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: "TASK-1",
        task_revision: 2,
        plan: "Implement and verify.",
        execution_contract: contract,
        repository_identity: REPOSITORY_IDENTITY,
      }),
      execution_contract: contract,
      actor: "HOST:codex:USER",
      approval_kind: "host_user_decision",
      issued_at: "2026-08-21T10:00:00.000Z",
    });

    expect(isOperationAuthorizedByExecutionGrant(grant, "pr.open")).toBe(true);
    expect(isOperationAuthorizedByExecutionGrant(grant, "integration.enqueue")).toBe(true);
    expect(isOperationAuthorizedByExecutionGrant(grant, "task.scope.extend")).toBe(true);
  });

  it("covers only user-approved scope extensions whose effects stay inside the grant", () => {
    const executionContract = {
      selected_mode: "branch_pr",
      declaration: {
        repository_effects: ["repository_write", "source_code"],
        external_effects: [],
      },
      authority: {
        writable_roots: ["packages/app"],
        allowed_repository_effects: ["repository_write", "source_code"],
      },
    } as TaskExecutionContract;
    const grant = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: "TASK-1",
        task_revision: 2,
        plan: "Implement and verify.",
        execution_contract: executionContract,
        repository_identity: REPOSITORY_IDENTITY,
      }),
      execution_contract: executionContract,
      actor: "USER",
      approval_kind: "manual_operator",
      issued_at: "2026-08-21T10:00:00.000Z",
    });
    const task = {
      execution_contract: executionContract,
      extensions: {
        "agentplane.scope_extension_request": createTaskScopeExtensionRequestState({
          transition_id: `tr_${"a".repeat(32)}`,
          state_fingerprint: `sha256:${"b".repeat(64)}`,
          request: {
            schema_version: 1,
            scope_roots: ["packages/agentplane/src/commands/pr"],
            repository_effects: ["repository_write", "source_code"],
            rationale: "The approved implementation reaches the PR command boundary.",
          },
        }),
      },
    } as unknown as Awaited<ReturnType<CommandContext["taskBackend"]["getTask"]>>;

    expect(isScopeExtensionCoveredByExecutionGrant({ grant, task })).toBe(true);
  });

  it("never resolves primary plan approval from repository policy", async () => {
    const result = await resolveConfiguredAuthority({
      command: {} as CommandContext,
      decision: {
        workflowStep: {
          kind: "approval",
          request: { type: "plan_approval" },
        },
      } as TaskRouteDecision,
    });

    expect(result).toEqual({
      state: "user_required",
      reason: "semantic approvals remain operator-owned",
    });
  });

  it("keeps manual mode closed", () => {
    expect(isOperationAuthorizedByPolicy(authority({}), "pr.open")).toBe(false);
  });

  it("allows only explicitly listed operations in policy mode", () => {
    const config = authority({ mode: "policy", allow_operations: ["pr.open"] });
    expect(isOperationAuthorizedByPolicy(config, "pr.open")).toBe(true);
    expect(isOperationAuthorizedByPolicy(config, "pr.head.publish")).toBe(false);
  });

  it("lets deny rules override explicit all mode", () => {
    const config = authority({ mode: "all", deny_operations: ["integration.enqueue"] });
    expect(isOperationAuthorizedByPolicy(config, "pr.open")).toBe(true);
    expect(isOperationAuthorizedByPolicy(config, "integration.enqueue")).toBe(false);
  });

  it("keeps semantic scope expansion USER-owned even in all mode", () => {
    expect(isOperationAuthorizedByPolicy(authority({ mode: "all" }), "task.scope.extend")).toBe(
      false,
    );
  });

  it("allows autonomous integration enqueue in all mode unless explicitly denied", () => {
    expect(isOperationAuthorizedByPolicy(authority({ mode: "all" }), "integration.enqueue")).toBe(
      true,
    );
  });
});
