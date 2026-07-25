import { describe, expect, it } from "vitest";
import { evaluateStateFingerprintPrecondition } from "@agentplaneorg/core/schemas";
import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import { deriveRouteAmbiguities } from "./route-decision-repair.js";
import { projectWorkflowOperationArgv, renderCliArgv } from "./workflow-operation-projection.js";
import { cliOperationStep } from "./workflow-step-factory.js";
import {
  WORKFLOW_OPERATION_ARGV_PREFIX,
  WORKFLOW_OPERATION_REGISTRY,
  type WorkflowOperationId,
  type WorkflowOperationParams,
  type WorkflowRouteState,
} from "./workflow-step.js";
import {
  projectWorkflowStepExecutionPacket,
  projectWorkflowStepNextAction,
  projectWorkflowStepOracle,
} from "./workflow-step-projections.js";
import { reduceRouteState } from "./workflow-step-reducer.js";
import {
  WORKFLOW_STATE_FINGERPRINT_POLICY,
  withBootstrapWorkflowFingerprint,
  type WorkflowRouteStateInput,
} from "./workflow-step-fingerprint.js";

const task = {
  id: "202607250100-TYPED1",
  title: "Typed route fixture",
  description: "Exercise typed route state.",
  status: "DOING",
  priority: "high",
  owner: "CODER",
  revision: 7,
  depends_on: [],
  tags: ["code"],
  verify: ["bun test"],
  plan_approval: {
    state: "approved",
    approved_by: "ORCHESTRATOR",
    approved_at: "2026-07-25T00:00:00.000Z",
  },
  verification: { state: "pending" },
} satisfies TaskData;
const resume = {
  task_id: task.id,
  task_status: task.status,
  branch: `task/${task.id}/typed-route-fixture`,
  base_branch: "main",
  head_sha: "1111111111111111111111111111111111111111",
  workspace_root: `/repo/.agentplane/worktrees/${task.id}`,
  pr_branch: `task/${task.id}/typed-route-fixture`,
  latest_handoff: null,
  runner: {
    run_id: null,
    status: null,
    heartbeat_at: null,
    state_path: null,
    trace_path: null,
    next_action: "run",
    next_command: `agentplane task run ${task.id}`,
    resume_command: `agentplane task run ${task.id}`,
    retry_command: null,
  },
} satisfies TaskResumeContext;

function prFlow(state: "not_found" | "OPEN" = "not_found"): PrFlowStatusReport {
  return {
    task: { id: task.id, status: task.status, verification: "pending" },
    branch: {
      name: resume.pr_branch,
      headSha: resume.head_sha,
      metaHeadSha: state === "OPEN" ? resume.head_sha : null,
    },
    pr:
      state === "OPEN"
        ? {
            provider: "github",
            state: "OPEN",
            source: "lookup",
            prNumber: 4612,
            prUrl: "https://github.com/basilisk-labs/agentplane/pull/4612",
            base: "main",
            headSha: resume.head_sha,
            mergeCommit: null,
          }
        : { provider: "github", state: "not_found", source: "metadata" },
    closeTail: { state: "not_applicable", reason: "implementation PR is not merged" },
    hostedChecks: { checked: false, reason: "not requested" },
    reviewThreads: { checked: false, reason: "not requested" },
    queue: { present: false },
    handoff: { present: false },
    nextAction: "",
  };
}

function routeState(overrides: Partial<WorkflowRouteState> = {}): WorkflowRouteState {
  const base: WorkflowRouteStateInput = {
    task,
    resume,
    workflowMode: "branch_pr",
    prFlow: prFlow(),
    cleanupProbe: { state: "not_requested" },
    blockers: [{ code: "remote_pr_missing", summary: "remote PR is missing" }],
    batchOwnership: { role: "none" },
    taskWorktree: {
      state: "clean",
      branch: resume.pr_branch ?? "",
      worktreePath: resume.workspace_root,
      changedPaths: [],
    },
  };
  const { preconditionFingerprint, ...stateOverrides } = overrides;
  return {
    ...withBootstrapWorkflowFingerprint({ ...base, ...stateOverrides }),
    ...(preconditionFingerprint ? { preconditionFingerprint } : {}),
  };
}

describe("typed WorkflowStep reducer", () => {
  it("keeps every registered CLI operation idempotent and postcondition-bound", () => {
    for (const [operationId, spec] of Object.entries(WORKFLOW_OPERATION_REGISTRY)) {
      expect(operationId).not.toContain(" ");
      expect(
        WORKFLOW_OPERATION_ARGV_PREFIX[operationId as keyof typeof WORKFLOW_OPERATION_ARGV_PREFIX],
      ).toBeDefined();
      expect(spec.expectedPostconditions.length).toBeGreaterThan(0);
      expect(new Set(spec.expectedPostconditions.map((condition) => condition.id)).size).toBe(
        spec.expectedPostconditions.length,
      );
    }
    expect(WORKFLOW_OPERATION_REGISTRY["task.artifacts.commit"].triggersGitHooks).toBe(true);
    expect(WORKFLOW_OPERATION_REGISTRY["integration.enqueue"].triggersGitHooks).toBe(false);
    const branchStart = WORKFLOW_OPERATION_REGISTRY["task.branch.start"];
    expect(branchStart.phase).toBe("branch_execution");
    expect(branchStart.checkout).toBe("task_worktree");
    expect(branchStart.expectedPostconditions.map((condition) => condition.id)).toContain(
      "task_status_doing",
    );
    expect(
      WORKFLOW_OPERATION_REGISTRY["task.pre_merge_close"].expectedPostconditions.map(
        (condition) => condition.id,
      ),
    ).toContain("task_status_done");
    expect(
      WORKFLOW_OPERATION_REGISTRY["batch.reconcile_included"].expectedPostconditions.map(
        (condition) => condition.id,
      ),
    ).toContain("task_status_done");
  });

  it("projects every registered domain operation to exact CLI argv", () => {
    const fixtures: {
      [Id in WorkflowOperationId]: {
        params: WorkflowOperationParams[Id];
        argv: string[];
      };
    } = {
      "batch.collect_included": {
        params: { taskId: "INCLUDED" },
        argv: ["agentplane", "task", "brief", "INCLUDED"],
      },
      "batch.follow_primary": {
        params: { taskId: "PRIMARY" },
        argv: ["agentplane", "task", "brief", "PRIMARY"],
      },
      "batch.reconcile_included": {
        params: { taskId: "INCLUDED" },
        argv: ["agentplane", "release", "tasks", "reconcile", "--task-id", "INCLUDED"],
      },
      "integration.enqueue": {
        params: { taskId: task.id, branch: resume.pr_branch ?? "" },
        argv: [
          "agentplane",
          "integrate",
          "queue",
          "enqueue",
          task.id,
          "--branch",
          resume.pr_branch ?? "",
        ],
      },
      "pr.artifacts.update": {
        params: { taskId: task.id, includeTaskIds: ["INCLUDED"] },
        argv: ["agentplane", "pr", "update", task.id, "--include-task", "INCLUDED"],
      },
      "pr.head.publish": {
        params: { taskId: task.id, author: "CODER", includeTaskIds: ["INCLUDED"] },
        argv: [
          "agentplane",
          "pr",
          "open",
          task.id,
          "--author",
          "CODER",
          "--include-task",
          "INCLUDED",
        ],
      },
      "pr.open": {
        params: { taskId: task.id, author: "CODER", includeTaskIds: [] },
        argv: ["agentplane", "pr", "open", task.id, "--author", "CODER"],
      },
      "pr.sync_or_verify": {
        params: { taskId: task.id, includeTaskIds: [] },
        argv: ["agentplane", "pr", "update", task.id],
      },
      "provider.pr.refresh": {
        params: { taskId: task.id },
        argv: ["agentplane", "pr", "flow", "status", task.id],
      },
      "flow.repair.foreign_task_readme": {
        params: { taskId: task.id },
        argv: ["agentplane", "flow", "repair", task.id, "--safe-apply"],
      },
      "route.remote.refresh": {
        params: { taskId: task.id },
        argv: ["agentplane", "task", "next-action", task.id, "--remote", "--explain"],
      },
      "runner.follow": {
        params: { mode: "status", taskId: task.id, runId: "run-1" },
        argv: ["agentplane", "task", "run", "status", task.id, "--run-id", "run-1"],
      },
      "task.artifacts.commit": {
        params: { taskId: task.id },
        argv: ["agentplane", "commit", task.id, "--close", "--unstage-others"],
      },
      "task.branch.start": {
        params: { taskId: task.id, author: "CODER", body: "Start: branch work." },
        argv: [
          "agentplane",
          "task",
          "start-ready",
          task.id,
          "--author",
          "CODER",
          "--body",
          "Start: branch work.",
        ],
      },
      "task.hosted_close.open": {
        params: { taskId: task.id },
        argv: ["agentplane", "task", "hosted-close-pr", task.id],
      },
      "task.hosted_close.finalize": {
        params: { taskId: task.id, base: "main" },
        argv: [
          "agentplane",
          "cleanup",
          "merged",
          "--task-id",
          task.id,
          "--finalize",
          "--base",
          "main",
        ],
      },
      "task.pre_merge_close": {
        params: {
          taskId: task.id,
          author: "CODER",
          body: "Verified: current head.",
          result: "pre-merge closure",
          commit: resume.head_sha ?? "",
          force: true,
        },
        argv: [
          "agentplane",
          "finish",
          task.id,
          "--author",
          "CODER",
          "--body",
          "Verified: current head.",
          "--result",
          "pre-merge closure",
          "--commit",
          resume.head_sha ?? "",
          "--pre-merge-closure",
          "--force",
          "--yes",
        ],
      },
      "task.start": {
        params: { taskId: task.id, author: "CODER", body: "Start: execute." },
        argv: [
          "agentplane",
          "task",
          "start-ready",
          task.id,
          "--author",
          "CODER",
          "--body",
          "Start: execute.",
        ],
      },
      "task.verify.show": {
        params: { taskId: task.id },
        argv: ["agentplane", "task", "verify-show", task.id],
      },
      "task.worktree.cleanup": {
        params: { taskId: task.id, base: "main" },
        argv: [
          "agentplane",
          "cleanup",
          "merged",
          "--task-id",
          task.id,
          "--finalize",
          "--base",
          "main",
        ],
      },
      "worktree.prepare": {
        params: { taskId: task.id, agent: "CODER", slug: "typed-route" },
        argv: [
          "agentplane",
          "work",
          "start",
          task.id,
          "--agent",
          "CODER",
          "--slug",
          "typed-route",
          "--worktree",
        ],
      },
    };

    for (const id of Object.keys(fixtures) as WorkflowOperationId[]) {
      const fixture = fixtures[id];
      const step = cliOperationStep({
        state: routeState(),
        operationId: id,
        params: fixture.params as never,
        code: "test_projection",
        summary: "test exact operation projection",
      });
      if (step.kind !== "cli_operation") throw new Error("expected CLI operation");
      expect(projectWorkflowOperationArgv(step.operation), id).toEqual(fixture.argv);
      expect(step.compatibility.command, id).toBe(renderCliArgv(fixture.argv));
      expect(step.operation.triggersGitHooks, id).toBe(
        WORKFLOW_OPERATION_REGISTRY[id].triggersGitHooks,
      );
      expect(step.operation.expectedPostconditions, id).toEqual(
        WORKFLOW_OPERATION_REGISTRY[id].expectedPostconditions,
      );
    }
  });

  it("renders compatibility commands without shell interpolation", () => {
    expect(
      renderCliArgv([
        "agentplane",
        "task",
        "start-ready",
        task.id,
        "--body",
        "Start: $(touch /tmp/should-not-run); agent's work",
      ]),
    ).toBe(
      `agentplane task start-ready ${task.id} --body 'Start: $(touch /tmp/should-not-run); agent'"'"'s work'`,
    );
  });

  it("uses the canonical StateFingerprint contract with bounded provider uncertainty", () => {
    const step = reduceRouteState(routeState());
    expect(step.preconditionFingerprint).toMatchObject({
      kind: "state_fingerprint",
      task_id: task.id,
      task_revision: task.revision,
      git_head: resume.head_sha,
      components: {
        provider: {
          state: "unavailable",
          reason_code: "provider_metadata_only",
        },
      },
    });
    expect(
      evaluateStateFingerprintPrecondition({
        expected: step.preconditionFingerprint,
        current: step.preconditionFingerprint,
        policy: WORKFLOW_STATE_FINGERPRINT_POLICY,
      }),
    ).toMatchObject({
      status: "fresh_with_bounded_uncertainty",
      reason_code: "state_fingerprint_provider_uncertainty_allowed",
    });
  });

  it("covers cli operation, agent episode, approval, human input, wait, and terminal variants", () => {
    const cli = reduceRouteState(routeState());
    const agent = reduceRouteState(
      routeState({
        prFlow: prFlow("OPEN"),
        blockers: [
          {
            code: "verification_required",
            summary: "the implementation has no verification record",
          },
        ],
      }),
    );
    const approval = reduceRouteState(
      routeState({
        task: { ...task, plan_approval: undefined },
        prFlow: null,
        blockers: [{ code: "plan_not_approved", summary: "plan is not approved" }],
        taskWorktree: undefined,
      }),
    );
    const humanInput = reduceRouteState(
      routeState({
        task: {
          ...task,
          extensions: {
            "agentplane.human_input": {
              openQuestion: {
                id: "question-1",
                question: "Which provider should own publication?",
                askedAt: "2026-07-25T00:00:00.000Z",
                askedBy: "ORCHESTRATOR",
                previousStatus: "DOING",
              },
              history: [],
            },
          },
        },
        prFlow: null,
        blockers: [
          {
            code: "human_input_required",
            summary: "provider choice is required",
          },
        ],
      }),
    );
    const wait = reduceRouteState(
      routeState({
        resume: {
          ...resume,
          runner: {
            ...resume.runner,
            run_id: "run-1",
            status: "running",
            next_action: "wait",
            next_command: `agentplane task run status ${task.id} --run-id run-1`,
          },
        },
        blockers: [{ code: "runner_alive", summary: "runner is active" }],
      }),
    );
    const terminal = reduceRouteState(
      routeState({
        task: { ...task, status: "DONE" },
        workflowMode: "direct",
        prFlow: null,
        blockers: [],
        taskWorktree: undefined,
      }),
    );

    expect([
      cli.kind,
      agent.kind,
      approval.kind,
      humanInput.kind,
      wait.kind,
      terminal.kind,
    ]).toEqual(["cli_operation", "agent_episode", "approval", "human_input", "wait", "terminal"]);
  });

  it("never substitutes an unrelated blocker for human-input or runner-wait authority", () => {
    const unrelated = {
      code: "remote_pr_missing" as const,
      summary: "remote PR is missing",
    };
    const humanInput = reduceRouteState(
      routeState({
        task: {
          ...task,
          extensions: {
            "agentplane.human_input": {
              openQuestion: {
                id: "question-mismatch",
                question: "Which publication route should be used?",
                askedAt: "2026-07-25T00:00:00.000Z",
                askedBy: "ORCHESTRATOR",
                previousStatus: "DOING",
              },
              history: [],
            },
          },
        },
        blockers: [unrelated],
      }),
    );
    const wait = reduceRouteState(
      routeState({
        resume: {
          ...resume,
          runner: {
            ...resume.runner,
            run_id: "run-mismatch",
            status: "running",
            next_action: "wait",
          },
        },
        blockers: [unrelated],
      }),
    );

    expect(humanInput).toMatchObject({ kind: "human_input", selectedBlocker: null });
    expect(wait).toMatchObject({ kind: "wait", selectedBlocker: null });
  });

  it("opens the PR from an existing worktree when PR metadata is absent", () => {
    const step = reduceRouteState(routeState());
    expect(step).toMatchObject({
      kind: "cli_operation",
      phase: "pr_needed",
      authoritativeCheckout: "task_worktree",
      compatibility: {
        code: "open_pr",
        command: `agentplane pr open ${task.id} --author CODER`,
      },
    });
    if (step.kind !== "cli_operation") throw new Error("expected a CLI operation");
    expect(step.operation).toMatchObject({
      id: "pr.open",
      type: "pr_sync",
      params: { taskId: task.id, author: "CODER", includeTaskIds: [] },
    });
    expect(projectWorkflowOperationArgv(step.operation)).toEqual([
      "agentplane",
      "pr",
      "open",
      task.id,
      "--author",
      "CODER",
    ]);
    expect(step.operation.expectedPostconditions.map((condition) => condition.id)).toContain(
      "remote_pr_linked",
    );
  });

  it("starts an approved TODO task in its existing branch worktree before PR publication", () => {
    const step = reduceRouteState(
      routeState({
        task: { ...task, status: "TODO" },
      }),
    );

    expect(step).toMatchObject({
      kind: "cli_operation",
      id: "task.branch.start",
      phase: "branch_execution",
      authoritativeCheckout: "task_worktree",
      operation: {
        id: "task.branch.start",
        params: {
          taskId: task.id,
          author: "CODER",
        },
      },
    });
  });

  it("starts an approved TODO task from a base invocation when its task worktree already exists", () => {
    const step = reduceRouteState(
      routeState({
        task: { ...task, status: "TODO" },
        resume: {
          ...resume,
          branch: "main",
          workspace_root: "/repo",
        },
      }),
    );

    expect(step).toMatchObject({
      kind: "cli_operation",
      id: "task.branch.start",
      authoritativeCheckout: "task_worktree",
      operation: { id: "task.branch.start" },
    });
  });

  it("derives approval ambiguities from typed requests without flagging local plan approval", () => {
    const planApproval = reduceRouteState(
      routeState({
        task: {
          ...task,
          plan_approval: {
            state: "pending",
            approved_by: null,
            approved_at: null,
          },
        },
      }),
    );
    const providerMerge = reduceRouteState(
      routeState({
        prFlow: {
          ...prFlow("OPEN"),
          closeTail: { state: "open", prNumber: 4613, prUrl: "https://example.test/4613" },
        },
        blockers: [
          { code: "on_base_checkout", summary: "route invoked from base" },
          { code: "close_tail_open", summary: "close tail awaits provider merge" },
        ],
      }),
    );
    const decision = (workflowStep: typeof planApproval) =>
      ({
        workflowMode: "branch_pr",
        blockers: workflowStep.blockers,
        workflowStep,
      }) as Parameters<typeof deriveRouteAmbiguities>[0]["decision"];

    expect(deriveRouteAmbiguities({ decision: decision(planApproval) })).toEqual([]);
    expect(deriveRouteAmbiguities({ decision: decision(providerMerge) })).toMatchObject([
      { code: "approval_without_local_command" },
      { code: "close_tail_provider_lane" },
    ]);
  });

  it("stops for structured branch repair instead of synthesizing integration argv", () => {
    const openPr = prFlow("OPEN");
    const step = reduceRouteState(
      routeState({
        prFlow: {
          ...openPr,
          branch: { ...openPr.branch, name: null },
        },
        blockers: [],
      }),
    );

    expect(step).toMatchObject({
      kind: "terminal",
      phase: "pr_branch_metadata_missing",
      compatibility: { code: "repair_pr_branch_metadata", command: null },
      outcome: { type: "repair_required" },
    });
    expect(JSON.stringify(step)).not.toContain("<branch>");
  });

  it("recovers an existing branch without a worktree instead of opening a PR from nowhere", () => {
    const step = reduceRouteState(
      routeState({
        taskWorktree: {
          state: "not_present",
          branch: resume.pr_branch ?? "",
          worktreePath: null,
          changedPaths: [],
        },
      }),
    );
    expect(step).toMatchObject({
      kind: "cli_operation",
      phase: "worktree_needed",
      compatibility: { code: "start_or_recover_worktree" },
    });
    if (step.kind !== "cli_operation") throw new Error("expected a CLI operation");
    expect(step.operation.id).toBe("worktree.prepare");
  });

  it("does not infer included-batch ownership from task prose", () => {
    const step = reduceRouteState(
      routeState({
        task: {
          ...task,
          title: "Included in batch",
          description: "This task is included in the batch worktree.",
          verification: { state: "ok" },
        },
        prFlow: null,
        blockers: [{ code: "missing_pr_branch", summary: "no task branch" }],
        taskWorktree: {
          state: "not_present",
          branch: "",
          worktreePath: null,
          changedPaths: [],
        },
      }),
    );
    expect(step).toMatchObject({
      kind: "cli_operation",
      compatibility: { code: "start_or_recover_worktree" },
    });
  });

  it("turns malformed structured batch metadata into a typed repair outcome", () => {
    const step = reduceRouteState(
      routeState({
        task: {
          ...task,
          verification: { state: "ok" },
          extensions: { branch_pr_batch: { role: "included" } },
        },
        prFlow: null,
        blockers: [
          {
            code: "missing_included_batch_metadata",
            summary: "structured batch metadata is malformed",
          },
        ],
        taskWorktree: undefined,
      }),
    );
    expect(step).toMatchObject({
      kind: "terminal",
      phase: "included_task_metadata_missing",
      outcome: { type: "repair_required" },
      compatibility: { code: "repair_included_batch_metadata" },
    });
  });

  it("uses structured batch state for included-task verification", () => {
    const step = reduceRouteState(
      routeState({
        batchOwnership: {
          role: "included",
          primaryTaskId: "202607250100-PRIMARY",
          includedTaskIds: [task.id],
          allTaskIds: ["202607250100-PRIMARY", task.id],
          branch: "task/202607250100-PRIMARY/shared",
          taskStates: [
            {
              id: "202607250100-PRIMARY",
              status: "DOING",
              owner: "CODER",
              verification: "ok",
            },
            {
              id: task.id,
              status: "DOING",
              owner: "CODER",
              verification: "pending",
            },
          ],
          nextOwnerAction: {
            code: "ignored_compatibility_projection",
            command: null,
            summary: "must not drive the typed reducer",
            requiresApproval: false,
          },
        },
      }),
    );
    expect(step).toMatchObject({
      kind: "agent_episode",
      phase: "batch_delegate",
      episode: { purpose: "verification", role: "EVALUATOR" },
      compatibility: { code: "verify_included_task" },
    });
  });

  it("collects pending primary-batch verification before any PR mutation", () => {
    const step = reduceRouteState(
      routeState({
        prFlow: prFlow("OPEN"),
        blockers: [{ code: "pr_meta_stale", summary: "PR artifacts are stale" }],
        batchOwnership: {
          role: "primary",
          primaryTaskId: task.id,
          includedTaskIds: ["202607250100-INCLUDED"],
          allTaskIds: [task.id, "202607250100-INCLUDED"],
          branch: resume.pr_branch,
          taskStates: [
            {
              id: task.id,
              status: "DOING",
              owner: "CODER",
              verification: "ok",
            },
            {
              id: "202607250100-INCLUDED",
              status: "DOING",
              owner: "CODER",
              verification: "pending",
            },
          ],
          nextOwnerAction: {
            code: "intentionally_stale_compatibility_code",
            command: "agentplane pr update must-not-drive-routing",
            summary: "must not drive typed routing",
            requiresApproval: false,
          },
        },
      }),
    );

    expect(step).toMatchObject({
      kind: "cli_operation",
      phase: "batch_collect_verification",
      compatibility: {
        code: "collect_included_verification",
        command: "agentplane task brief 202607250100-INCLUDED",
      },
      operation: {
        id: "batch.collect_included",
        params: { taskId: "202607250100-INCLUDED" },
      },
    });
    if (step.kind !== "cli_operation") throw new Error("expected a CLI operation");
    expect(projectWorkflowOperationArgv(step.operation)).toEqual([
      "agentplane",
      "task",
      "brief",
      "202607250100-INCLUDED",
    ]);
  });

  it("materializes every primary batch include-task in PR argv", () => {
    const step = reduceRouteState(
      routeState({
        batchOwnership: {
          role: "primary",
          primaryTaskId: task.id,
          includedTaskIds: ["202607250100-I1", "202607250100-I2"],
          allTaskIds: [task.id, "202607250100-I1", "202607250100-I2"],
          branch: resume.pr_branch,
          taskStates: [
            { id: task.id, status: "DOING", owner: "CODER", verification: "ok" },
            {
              id: "202607250100-I1",
              status: "DOING",
              owner: "CODER",
              verification: "ok",
            },
            {
              id: "202607250100-I2",
              status: "DOING",
              owner: "CODER",
              verification: "ok",
            },
          ],
          nextOwnerAction: {
            code: "continue_primary_batch",
            command: null,
            summary: "continue",
            requiresApproval: false,
          },
        },
      }),
    );

    if (step.kind !== "cli_operation") throw new Error("expected PR CLI operation");
    expect(step.operation).toMatchObject({
      id: "pr.open",
      params: {
        taskId: task.id,
        author: "CODER",
        includeTaskIds: ["202607250100-I1", "202607250100-I2"],
      },
    });
    expect(projectWorkflowOperationArgv(step.operation)).toEqual([
      "agentplane",
      "pr",
      "open",
      task.id,
      "--author",
      "CODER",
      "--include-task",
      "202607250100-I1",
      "--include-task",
      "202607250100-I2",
    ]);
  });

  it("delegates a DONE included task to the primary instead of owning the shared PR", () => {
    const step = reduceRouteState(
      routeState({
        task: { ...task, status: "DONE", verification: { state: "ok" } },
        blockers: [],
        batchOwnership: {
          role: "included",
          primaryTaskId: "202607250100-PRIMARY",
          includedTaskIds: [task.id],
          allTaskIds: ["202607250100-PRIMARY", task.id],
          branch: resume.pr_branch,
          taskStates: [
            {
              id: "202607250100-PRIMARY",
              status: "DOING",
              owner: "CODER",
              verification: "ok",
            },
            { id: task.id, status: "DONE", owner: "CODER", verification: "ok" },
          ],
          nextOwnerAction: {
            code: "ignored",
            command: null,
            summary: "ignored",
            requiresApproval: false,
          },
        },
      }),
    );

    expect(step).toMatchObject({
      kind: "cli_operation",
      operation: {
        id: "batch.follow_primary",
        params: { taskId: "202607250100-PRIMARY" },
      },
    });
  });

  it("requires structured branch-head repair and never synthesizes HEAD argv", () => {
    const openPr = prFlow("OPEN");
    const step = reduceRouteState(
      routeState({
        prFlow: { ...openPr, branch: { ...openPr.branch, headSha: null } },
        blockers: [
          { code: "branch_head_missing", summary: "task branch head is unavailable" },
          { code: "pre_merge_closure_missing", summary: "closure is missing" },
        ],
      }),
    );

    expect(step).toMatchObject({
      kind: "terminal",
      phase: "branch_head_missing",
      compatibility: { code: "repair_branch_head", command: null },
      outcome: { type: "repair_required" },
    });
    expect(JSON.stringify(step)).not.toContain('"HEAD"');
  });

  it("keeps semantic quality review ahead of PR-head publication", () => {
    const step = reduceRouteState(
      routeState({
        task: { ...task, status: "DONE", verification: { state: "ok" } },
        prFlow: prFlow("OPEN"),
        blockers: [
          { code: "hosted_pr_head_mismatch", summary: "hosted PR head differs" },
          { code: "quality_review_stale", summary: "quality review is stale" },
        ],
      }),
    );

    expect(step).toMatchObject({
      kind: "agent_episode",
      phase: "quality_review_needed",
      episode: { purpose: "quality_review", role: "EVALUATOR" },
      selectedBlocker: { code: "quality_review_stale" },
    });
    expect(step.compatibility.command).toBeNull();
  });

  it("derives deterministic fingerprints, idempotency keys, and compatibility projections", () => {
    const first = reduceRouteState(routeState());
    const repeated = reduceRouteState(routeState());
    const changed = reduceRouteState(
      routeState({ resume: { ...resume, head_sha: "2222222222222222222222222222222222222222" } }),
    );
    expect(first.preconditionFingerprint).toEqual(repeated.preconditionFingerprint);
    expect(changed.preconditionFingerprint.digest).not.toBe(first.preconditionFingerprint.digest);
    if (
      first.kind !== "cli_operation" ||
      repeated.kind !== "cli_operation" ||
      changed.kind !== "cli_operation"
    ) {
      throw new Error("expected CLI operation fixtures");
    }
    expect(first.operation.idempotencyKey).toBe(repeated.operation.idempotencyKey);
    expect(changed.operation.idempotencyKey).not.toBe(first.operation.idempotencyKey);
    const blocker = routeState().blockers[0]!;
    const oracle = projectWorkflowStepOracle({
      step: first,
      paths: {
        baseCheckoutPath: "/repo",
        taskWorktreePath: resume.workspace_root,
        currentCheckoutPath: resume.workspace_root,
      },
    });
    const packet = projectWorkflowStepExecutionPacket({
      task,
      step: first,
      oracle,
    });
    expect(projectWorkflowStepNextAction(first)).toEqual(first.compatibility);
    expect(oracle).toMatchObject({
      phase: "pr_needed",
      authoritativeCheckout: "task_worktree",
      authoritativeCheckoutPath: resume.workspace_root,
      mutationPathHint: resume.workspace_root,
      blocker,
    });
    expect(packet).toMatchObject({
      actionKind: "local_command",
      exactArgv: ["agentplane", "pr", "open", task.id, "--author", "CODER"],
      recommendedRole: "CODER",
      safeToMutate: true,
      evidenceMissing: ["remote_pr"],
    });
  });
});
