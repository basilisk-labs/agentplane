import { describe, expect, it } from "vitest";

import type { SupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { requireIntegrationEffectResolution } from "./external-agent-workflow-recovery.js";

const taskId = "202610280201-Z9MAPZ";
const headSha = "a".repeat(40);
const baseSha = "b".repeat(40);
const operationKey = `sha256:${"c".repeat(64)}`;
const fingerprintDigest = `sha256:${"d".repeat(64)}`;
const effectRef = `integration.run_next:${taskId}:${fingerprintDigest}:${"e".repeat(64)}`;
const repositoryRoot = "/tmp/example-task-worktree";
const baseCheckout = "/tmp/example-base-checkout";
const prUrl = "https://github.com/example/project/pull/42";
const identity = {
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  sourceProject: "example/project",
  targetProject: "example/project",
  sourceUrl: "https://github.com/example/project.git",
  targetUrl: "https://github.com/example/project.git",
};

function fixture() {
  const branch = "task/example";
  const base = "main";
  const prNumber = 42;
  return {
    journal: {
      task_id: taskId,
      status: "running",
      cursor: {
        phase: "ready",
        replacement_of_operation_key: operationKey,
      },
      operations: [
        {
          operation_key: operationKey,
          authority_ref: "workflow-operation:integration.run_next",
          authority_digest: fingerprintDigest,
          precondition_fingerprint_digest: fingerprintDigest,
          effect_ref: effectRef,
          status: "failed",
          recovery: {
            operation_identity: {
              id: "integration.run_next",
              type: "integration_run_next",
              params: { taskId },
              preconditionFingerprint: { digest: fingerprintDigest },
              authorityRef: `route:${taskId}:${fingerprintDigest}`,
              idempotencyKey: effectRef,
            },
            context: {
              schema_version: 1,
              kind: "integration_run_next",
              task_id: taskId,
              repository_root: repositoryRoot,
              queue: {
                present: true,
                status: "queued",
                branch,
                base,
                headSha,
                baseSha,
                prNumber,
              },
              provider: {
                state: "found",
                pr: {
                  status: "OPEN",
                  prNumber,
                  prUrl,
                  headSha,
                  baseSha,
                  headRef: branch,
                  base,
                  identity,
                },
              },
              branch: { name: branch, headSha },
            },
          },
        },
      ],
    },
    decision: {
      task: { id: taskId },
      workspace: { taskWorktreePath: repositoryRoot, baseCheckoutPath: baseCheckout },
      prFlow: {
        pr: { state: "OPEN", prUrl },
        providerObservation: { state: "found", pr: { prUrl } },
      },
      executionPacket: { safeToMutate: true },
      workflowStep: {
        kind: "cli_operation",
        operation: {
          id: "provider.pr.update_branch",
          params: {
            taskId,
            identity,
            prNumber,
            branch,
            baseBranch: base,
            expectedHeadSha: headSha,
            expectedBaseSha: baseSha,
          },
        },
      },
    },
  };
}

type Fixture = ReturnType<typeof fixture>;

function requireResolution(input: Fixture) {
  return requireIntegrationEffectResolution({
    journal: input.journal as unknown as SupervisorExecutionEpisodeJournal,
    decision: input.decision as unknown as TaskRouteDecision,
  });
}

describe("failed integration successor", () => {
  it("allows only the exact authorized behind-PR branch update", () => {
    expect(() => requireResolution(fixture())).not.toThrow();
  });

  it("accepts the registered base checkout as the frozen integration root", () => {
    const input = fixture();
    input.journal.operations[0].recovery.context.repository_root = baseCheckout;
    expect(() => requireResolution(input)).not.toThrow();
  });

  it.each<[string, (input: Fixture) => void]>([
    ["task", (input) => (input.decision.task.id = "other-task")],
    ["PR number", (input) => (input.decision.workflowStep.operation.params.prNumber = 43)],
    ["branch", (input) => (input.decision.workflowStep.operation.params.branch = "task/other")],
    ["base branch", (input) => (input.decision.workflowStep.operation.params.baseBranch = "next")],
    [
      "head SHA",
      (input) => (input.decision.workflowStep.operation.params.expectedHeadSha = "d".repeat(40)),
    ],
    [
      "base SHA",
      (input) => (input.decision.workflowStep.operation.params.expectedBaseSha = "d".repeat(40)),
    ],
    [
      "provider identity",
      (input) =>
        (input.decision.workflowStep.operation.params.identity = {
          ...identity,
          sourceProject: "other/project",
        }),
    ],
    [
      "original operation type",
      (input) => {
        input.journal.operations[0].recovery.operation_identity.type = "other";
      },
    ],
    [
      "original operation authority",
      (input) => {
        input.journal.operations[0].recovery.operation_identity.authorityRef = "other";
      },
    ],
    [
      "original effect ref",
      (input) => {
        input.journal.operations[0].recovery.operation_identity.idempotencyKey = "other";
      },
    ],
    [
      "original fingerprint",
      (input) => {
        input.journal.operations[0].recovery.operation_identity.preconditionFingerprint.digest = `sha256:${"f".repeat(64)}`;
      },
    ],
    [
      "repository root",
      (input) => {
        input.journal.operations[0].recovery.context.repository_root = "/tmp/other";
      },
    ],
    [
      "PR URL",
      (input) => {
        input.decision.prFlow.pr.prUrl = "https://github.com/example/project/pull/43";
      },
    ],
    ["unsafe mutation authority", (input) => (input.decision.executionPacket.safeToMutate = false)],
    [
      "hosted mismatch reconciliation",
      (input) => (input.decision.workflowStep.operation.params.reconcileHeadSha = "d".repeat(40)),
    ],
    [
      "missing frozen snapshot",
      (input) => {
        input.journal.operations[0].recovery.context = null as never;
      },
    ],
    [
      "changed frozen PR",
      (input) => {
        input.journal.operations[0].recovery.context.provider.pr.prNumber = 43;
      },
    ],
  ])("rejects %s drift before a provider effect", (_name, mutate) => {
    const input = fixture();
    mutate(input);
    expect(() => requireResolution(input)).toThrow(
      "the recovered integration successor must remain semantic implementation rework",
    );
  });

  it("preserves the semantic implementation rework successor", () => {
    const input = fixture();
    input.decision.workflowStep = {
      kind: "agent_episode",
      episode: { purpose: "implementation_rework" },
    } as never;
    expect(() => requireResolution(input)).not.toThrow();
  });
});
