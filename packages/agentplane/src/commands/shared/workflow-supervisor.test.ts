import { describe, expect, it } from "vitest";

import { buildStateFingerprint } from "@agentplaneorg/core/schemas";

import type { TaskRouteDecision } from "./route-decision-types.js";
import { projectWorkflowOperationArgv } from "./workflow-operation-projection.js";
import { superviseWorkflowStep } from "./workflow-supervisor.js";
import { WORKFLOW_OPERATION_REGISTRY, type WorkflowOperation } from "./workflow-step.js";

const taskId = "202607270245-SUPV09";

function fixtureDecision(opts?: {
  exactArgv?: string[] | null;
  kind?: "approval" | "agent_episode" | "wait";
}): TaskRouteDecision {
  const component = {
    state: "present",
    source: "workflow_supervisor_test",
    value: { taskId },
  } as const;
  const fingerprint = buildStateFingerprint({
    task_id: taskId,
    task_revision: 1,
    git_head: "0123456789abcdef0123456789abcdef01234567",
    worktree: "/repo",
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
  const operation: WorkflowOperation = {
    id: "runner.follow",
    type: "runner_follow",
    params: { mode: "run", taskId },
    preconditionFingerprint: fingerprint,
    authorityRef: `route:${taskId}:${fingerprint.digest}`,
    idempotencyKey: `runner.follow:${taskId}:${fingerprint.digest}:fixture`,
    expectedPostconditions: WORKFLOW_OPERATION_REGISTRY["runner.follow"].expectedPostconditions,
    triggersGitHooks: false,
  };
  const workflowStep = opts?.kind
    ? ({
        id: opts.kind,
        kind: opts.kind,
        summary: `blocked ${opts.kind}`,
        preconditionFingerprint: fingerprint,
      } as TaskRouteDecision["workflowStep"])
    : ({
        id: "runner.follow",
        kind: "cli_operation",
        summary: "run the typed task runner operation",
        preconditionFingerprint: fingerprint,
        operation,
        execution: { actionKind: "local_command" },
      } as TaskRouteDecision["workflowStep"]);
  return {
    task: {
      id: taskId,
      title: "Workflow supervisor fixture",
      status: "DOING",
      owner: "CODER",
      planApproval: "approved",
      verification: "pending",
      commit: null,
    },
    workflowStep,
    executionPacket: {
      actionKind: "local_command",
      safeToMutate: true,
      exactArgv: opts?.exactArgv ?? projectWorkflowOperationArgv(operation),
    },
  } as TaskRouteDecision;
}

describe("workflow supervisor", () => {
  it("executes one registered operation and refreshes the route with a normalized audit", async () => {
    const decision = fixtureDecision();
    const refreshed = fixtureDecision();
    const execution = await superviseWorkflowStep({
      decision,
      execute: () =>
        Promise.resolve({
          status: "succeeded" as const,
          observed_postconditions: ["runner_state_observed"],
          detail: "runner prepared",
          exit_code: 0,
        }),
      refresh: () => Promise.resolve(refreshed),
    });

    expect(execution.executable).toBe(true);
    expect(execution.stop_reason).toBeNull();
    expect(execution.refreshed_decision).toBe(refreshed);
    expect(execution.audit.map((entry) => entry.event)).toEqual([
      "decision_observed",
      "operation_executed",
      "route_refreshed",
    ]);
    expect(
      execution.audit.every(
        (entry) => entry.state_fingerprint === decision.workflowStep.preconditionFingerprint.digest,
      ),
    ).toBe(true);
  });

  it("rejects a route whose argv is not the registry projection before execution", async () => {
    let invoked = false;
    const execution = await superviseWorkflowStep({
      decision: fixtureDecision({ exactArgv: ["sh", "-c", "agentplane task run anything"] }),
      mode: "inspect",
      execute: () => {
        invoked = true;
        return Promise.reject(new Error("must not execute"));
      },
    });

    expect(invoked).toBe(false);
    expect(execution.executable).toBe(false);
    expect(execution.stop_reason).toContain("rendered argv");
  });

  it("rejects an unregistered operation and a registered operation for another task", async () => {
    const unregistered = fixtureDecision();
    const unregisteredOperation = (
      unregistered.workflowStep as Extract<
        typeof unregistered.workflowStep,
        { kind: "cli_operation" }
      >
    ).operation as unknown as { id: string };
    unregisteredOperation.id = "raw.shell";
    const unknown = await superviseWorkflowStep({
      decision: unregistered,
      mode: "inspect",
    });

    const crossTask = fixtureDecision();
    const crossTaskOperation = (
      crossTask.workflowStep as Extract<typeof crossTask.workflowStep, { kind: "cli_operation" }>
    ).operation;
    crossTaskOperation.params = { mode: "run", taskId: "202607270245-OTHER09" };
    crossTask.executionPacket.exactArgv = projectWorkflowOperationArgv(crossTaskOperation);
    const other = await superviseWorkflowStep({
      decision: crossTask,
      mode: "inspect",
    });

    expect(unknown.executable).toBe(false);
    expect(unknown.stop_reason).toContain("unregistered operation");
    expect(other.executable).toBe(false);
    expect(other.stop_reason).toContain("different task");
  });

  it.each(["approval", "agent_episode", "wait"] as const)(
    "stops %s routes before any operation",
    async (kind) => {
      const execution = await superviseWorkflowStep({
        decision: fixtureDecision({ kind }),
        mode: "inspect",
      });

      expect(execution.executable).toBe(false);
      expect(execution.operation).toBeNull();
      expect(execution.audit.at(-1)?.event).toBe("execution_rejected");
    },
  );

  it("rejects a repeated idempotency key without refreshing state", async () => {
    const decision = fixtureDecision();
    const key = (
      decision.workflowStep as Extract<typeof decision.workflowStep, { kind: "cli_operation" }>
    ).operation.idempotencyKey;
    let refreshed = false;
    const execution = await superviseWorkflowStep({
      decision,
      completed_idempotency_keys: new Set([key]),
      execute: () =>
        Promise.resolve({
          status: "succeeded" as const,
          observed_postconditions: ["runner_state_observed"],
          detail: "must not execute",
          exit_code: 0,
        }),
      refresh: () => {
        refreshed = true;
        return Promise.resolve(decision);
      },
    });

    expect(execution.executable).toBe(false);
    expect(execution.stop_reason).toContain("repeated idempotency key");
    expect(refreshed).toBe(false);
  });

  it("refreshes state after executor failure or absent postconditions without a second operation", async () => {
    const decision = fixtureDecision();
    let refreshed = false;
    const crash = await superviseWorkflowStep({
      decision,
      execute: () => Promise.reject(new Error("runner crash")),
      refresh: () => {
        refreshed = true;
        return Promise.resolve(decision);
      },
    });
    const missing = await superviseWorkflowStep({
      decision,
      execute: () =>
        Promise.resolve({
          status: "succeeded" as const,
          observed_postconditions: [],
          detail: "runner result lacks durable observation",
          exit_code: 0,
        }),
      refresh: () => {
        refreshed = true;
        return Promise.resolve(decision);
      },
    });

    expect(crash.stop_reason).toContain("executor crashed");
    expect(missing.stop_reason).toContain("missing observed postconditions");
    expect(missing.audit.some((entry) => entry.event === "postcondition_rejected")).toBe(true);
    expect(crash.audit.at(-1)?.event).toBe("route_refreshed");
    expect(missing.audit.at(-1)?.event).toBe("route_refreshed");
    expect(refreshed).toBe(true);
  });
});
