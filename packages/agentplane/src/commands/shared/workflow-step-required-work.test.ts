import { describe, expect, it } from "vitest";
import {
  approveTaskPlan,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  withTaskCentricAggregate,
  type WorkItemState,
} from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { recoveryPlanningProposal } from "../../cli/task-advance-effect-recovery.testkit.js";
import { reduceRouteState } from "./workflow-step-reducer.js";
import { prFlow, resume, routeState, task } from "./workflow-step.testkit.js";

function fixture(status = "DOING", itemState: WorkItemState = "READY", optional = false) {
  const at = "2026-08-28T00:00:00.000Z";
  const snapshot = createRepositorySnapshot({
    git: { kind: "commit", sha: resume.head_sha!, ref: null },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: "task-revision:1",
    captured_at: at,
  });
  const proposal = recoveryPlanningProposal(
    {
      task: { id: task.id },
      planning_context: { repository_snapshot: snapshot },
    } as AgentWorkOrderV2,
    "Recover the persisted source and exact result before closure.",
  );
  const adjusted = {
    ...proposal,
    work_items: {
      schema_version: 1 as const,
      work_items: proposal.work_items.work_items.map((item) => ({ ...item, optional })),
    },
  };
  const draft = createTaskPlanRevision({ proposal: adjusted, revision: 1, created_at: at });
  const plan = approveTaskPlan({
    plan: draft,
    expected_digest: draft.digest,
    actor: "USER",
    approved_at: at,
  });
  const aggregate = materializeApprovedWorkItems({
    task: createLegacyTaskAggregate({
      id: task.id,
      revision: 1,
      status,
      title: task.title,
      description: task.description,
      acceptance_criteria: [],
      captured_at: at,
      updated_at: at,
    }),
    plan,
    now: at,
  });
  const id = "exercise-recovery";
  const current = {
    ...aggregate,
    work_items: {
      ...aggregate.work_items,
      [id]: { ...aggregate.work_items[id]!, state: itemState },
    },
  };
  return routeState({
    task: {
      ...task,
      status,
      verification: { state: "ok" },
      commit: { hash: resume.head_sha!, message: "Persisted implementation" },
      extensions: withTaskCentricAggregate(undefined, current),
    },
    prFlow: prFlow("OPEN"),
    blockers: [
      {
        code: status === "DONE" ? "pre_merge_closure_stale" : "pre_merge_closure_missing",
        summary: "Closure must wait for required work.",
      },
    ],
  });
}

describe("required branch WorkItem routing", () => {
  it.each(["DOING", "DONE"])("resumes required work before stale verification for %s", (status) => {
    const state = fixture(status);
    expect(
      reduceRouteState({
        ...state,
        blockers: [{ code: "verification_required", summary: "Refresh checks" }],
      }),
    ).toMatchObject({ kind: "agent_episode", episode: { purpose: "implementation" } });
  });
  it.each(["DOING", "DONE"])(
    "resumes required work before %s closure despite existing proof",
    (status) => {
      expect(reduceRouteState(fixture(status))).toMatchObject({
        kind: "agent_episode",
        episode: { purpose: "implementation" },
      });
    },
  );

  it.each<WorkItemState>(["PLANNED", "REWORK_READY"])("resumes schedulable %s work", (state) => {
    expect(reduceRouteState(fixture("DOING", state))).toMatchObject({
      kind: "agent_episode",
      episode: { purpose: "implementation" },
    });
  });

  it.each<WorkItemState>([
    "CLAIMED",
    "EXECUTING",
    "RESULT_RECEIVED",
    "VALIDATING",
    "BLOCKED",
    "EFFECT_IN_DOUBT",
  ])("does not close or start another mutation for %s work", (state) => {
    const step = reduceRouteState(fixture("DOING", state));
    expect(step).toMatchObject({ kind: "terminal", execution: { semanticMutationAllowed: false } });
  });

  it.each([
    ["COMPLETED", false],
    ["READY", true],
  ] as const)("keeps the closure route for state=%s optional=%s", (state, optional) => {
    expect(reduceRouteState(fixture("DOING", state, optional)).compatibility.code).toBe(
      "record_pre_merge_closure",
    );
  });

  it("keeps missing-input work blocked without inventing outputs", () => {
    const state = fixture();
    const raw = state.task.extensions!["agentplane.task_centric"] as ReturnType<
      typeof materializeApprovedWorkItems
    >;
    const current = structuredClone(raw);
    Reflect.set(current.current_plan!.proposal.work_items.work_items[0]!, "required_inputs", [
      "missing-output",
    ]);
    state.task.extensions = withTaskCentricAggregate(undefined, current);
    expect(reduceRouteState(state)).toMatchObject({ kind: "terminal" });
  });

  it("preserves active-runner and dirty-worktree priority", () => {
    const state = fixture();
    expect(
      reduceRouteState({
        ...state,
        resume: { ...state.resume, runner: { ...state.resume.runner, next_action: "wait" } },
      }).id,
    ).toBe("wait.runner");
    expect(
      reduceRouteState({
        ...state,
        blockers: [{ code: "task_worktree_dirty", summary: "Dirty source" }],
        taskWorktree: {
          state: "dirty",
          branch: resume.pr_branch!,
          worktreePath: resume.workspace_root,
          changedPaths: ["feature.ts"],
        },
      }).id,
    ).toBe("agent.task_worktree_resolution");
  });

  it("does not execute under a stale canonical plan approval", () => {
    const state = fixture();
    const aggregate = structuredClone(
      state.task.extensions!["agentplane.task_centric"],
    ) as ReturnType<typeof materializeApprovedWorkItems>;
    Reflect.set(aggregate.current_plan!.approval, "approved_digest", `sha256:${"0".repeat(64)}`);
    state.task.extensions = withTaskCentricAggregate(undefined, aggregate);
    expect(reduceRouteState(state)).toMatchObject({ kind: "terminal" });
  });

  it("keeps dependency-blocked work non-mutable", () => {
    const state = fixture();
    const aggregate = structuredClone(
      state.task.extensions!["agentplane.task_centric"],
    ) as ReturnType<typeof materializeApprovedWorkItems>;
    Reflect.set(aggregate.current_plan!.proposal.work_items.work_items[0]!, "depends_on", [
      "unfinished-dependency",
    ]);
    state.task.extensions = withTaskCentricAggregate(undefined, aggregate);
    expect(reduceRouteState(state)).toMatchObject({ kind: "terminal" });
  });

  it.each(["pre_merge_closure_stale", "verification_required"] as const)(
    "requires live provider state before DONE recovery with %s",
    (code) => {
      const state = fixture("DONE");
      const flow = prFlow("OPEN");
      if (flow.pr.state === "OPEN") flow.pr.source = "metadata";
      expect(
        reduceRouteState({ ...state, prFlow: flow, blockers: [{ code, summary: code }] })
          .compatibility.code,
      ).toBe("refresh_remote_route");
    },
  );

  it("preserves merged hosted closure even with historical incomplete work", () => {
    const state = fixture("DONE");
    const flow = prFlow("OPEN");
    flow.pr = { ...flow.pr, state: "MERGED", source: "lookup" } as typeof flow.pr;
    flow.closeTail = { state: "not_found" } as typeof flow.closeTail;
    expect(reduceRouteState({ ...state, prFlow: flow }).compatibility.code).toBe("open_close_tail");
  });

  it("preserves legacy task behavior without a canonical plan", () => {
    const state = fixture();
    expect(
      reduceRouteState({ ...state, task: { ...state.task, extensions: undefined } }).compatibility
        .code,
    ).toBe("record_pre_merge_closure");
  });
});
