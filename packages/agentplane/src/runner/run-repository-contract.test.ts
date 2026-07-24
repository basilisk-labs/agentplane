import {
  buildStateFingerprint,
  evaluateStateFingerprintPrecondition,
  type StateFingerprint,
  type StateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";
import { makeRunnerContextBundle } from "@agentplane/testkit/runner";
import { describe, expect, it } from "vitest";

import { createRunnerRunState } from "./artifacts.js";
import { assertRunnerStateMatchesBundle } from "./run-repository-contract.js";

const POLICY: StateFingerprintPolicy = {
  required_components: [],
  provider: {
    required: false,
    unavailable: "reject",
  },
};

function presentComponent(source: string) {
  return {
    state: "present" as const,
    source,
    value: { source },
  };
}

function fingerprint(
  taskId: string,
  taskRevision = 1,
  taskSource = "task",
  worktree = "/repo",
): StateFingerprint {
  return buildStateFingerprint({
    task_id: taskId,
    task_revision: taskRevision,
    git_head: "a".repeat(40),
    worktree,
    components: {
      task: presentComponent(taskSource),
      git: presentComponent("git"),
      backend_projection: presentComponent("backend"),
      policy: presentComponent("policy"),
      blueprint: presentComponent("blueprint"),
      knowledge: presentComponent("knowledge"),
      provider: presentComponent("provider"),
      authority: presentComponent("authority"),
    },
  });
}

describe("runner repository state/bundle authority", () => {
  it("binds persisted fingerprint evidence to the prepared bundle", () => {
    const taskId = "T-1";
    const runId = "run-1";
    const bundle = makeRunnerContextBundle({
      taskId,
      runId,
      gitRoot: "/repo",
      mode: "execute",
    });
    bundle.state_fingerprint = fingerprint(taskId);
    bundle.state_fingerprint_policy = POLICY;
    const state = createRunnerRunState({ bundle });

    expect(() =>
      assertRunnerStateMatchesBundle(state, bundle, bundle.execution.artifact_paths, taskId, runId),
    ).not.toThrow();

    state.state_fingerprint = {
      ...state.state_fingerprint!,
      precondition_fingerprint: fingerprint("T-2"),
    };
    expect(() =>
      assertRunnerStateMatchesBundle(state, bundle, bundle.execution.artifact_paths, taskId, runId),
    ).toThrow("fingerprint authority mismatch");
  });

  it("keeps legacy bundle/state pairs without fingerprint fields readable", () => {
    const taskId = "T-1";
    const runId = "run-legacy";
    const bundle = makeRunnerContextBundle({
      taskId,
      runId,
      gitRoot: "/repo",
      mode: "execute",
    });
    const state = createRunnerRunState({ bundle });

    expect(() =>
      assertRunnerStateMatchesBundle(state, bundle, bundle.execution.artifact_paths, taskId, runId),
    ).not.toThrow();
  });

  it("rejects valid-looking runtime policies that differ from the prepared bundle", () => {
    const taskId = "T-1";
    const runId = "run-policy-mismatch";
    const bundle = makeRunnerContextBundle({
      taskId,
      runId,
      gitRoot: "/repo",
      mode: "execute",
    });
    const state = createRunnerRunState({ bundle });
    state.timeout_policy = {
      ...state.timeout_policy,
      wall_clock_ms: 0,
    };

    expect(() =>
      assertRunnerStateMatchesBundle(state, bundle, bundle.execution.artifact_paths, taskId, runId),
    ).toThrow("state/bundle mismatch");
  });

  it("allows a validated post-preparation fingerprint while keeping policy bundle-bound", () => {
    const taskId = "T-1";
    const runId = "run-replay-advance";
    const bundle = makeRunnerContextBundle({
      taskId,
      runId,
      gitRoot: "/repo",
      mode: "execute",
    });
    bundle.state_fingerprint = fingerprint(taskId);
    bundle.state_fingerprint_policy = POLICY;
    const state = createRunnerRunState({ bundle });
    const advanced = fingerprint(taskId, 2, "advanced-task");
    state.status = "success";
    state.state_fingerprint = {
      ...state.state_fingerprint!,
      outcome: "accepted",
      precondition_fingerprint: advanced,
      state_before: advanced,
      state_after: advanced,
      precondition: evaluateStateFingerprintPrecondition({
        expected: advanced,
        current: advanced,
        policy: POLICY,
      }),
      effect_applied: true,
    };

    expect(() =>
      assertRunnerStateMatchesBundle(state, bundle, bundle.execution.artifact_paths, taskId, runId),
    ).not.toThrow();
  });

  it("rejects a malformed bundle fingerprint even when terminal state evidence is valid", () => {
    const taskId = "T-1";
    const runId = "run-malformed-bundle-fingerprint";
    const bundle = makeRunnerContextBundle({
      taskId,
      runId,
      gitRoot: "/repo",
      mode: "execute",
    });
    bundle.state_fingerprint = fingerprint(taskId);
    bundle.state_fingerprint_policy = POLICY;
    const state = createRunnerRunState({ bundle });
    const accepted = fingerprint(taskId, 2, "advanced-task");
    state.status = "success";
    state.state_fingerprint = {
      ...state.state_fingerprint!,
      outcome: "accepted",
      precondition_fingerprint: accepted,
      state_before: accepted,
      state_after: accepted,
      precondition: evaluateStateFingerprintPrecondition({
        expected: accepted,
        current: accepted,
        policy: POLICY,
      }),
      effect_applied: true,
    };
    Reflect.set(bundle, "state_fingerprint", {});

    expect(() =>
      assertRunnerStateMatchesBundle(state, bundle, bundle.execution.artifact_paths, taskId, runId),
    ).toThrow("bundle/fingerprint authority is invalid");
  });

  it.each([
    {
      label: "another task",
      replacement: fingerprint("T-2"),
    },
    {
      label: "another worktree",
      replacement: fingerprint("T-1", 1, "task", "/other-repo"),
    },
  ])("rejects bundle fingerprint authority from $label", ({ replacement }) => {
    const taskId = "T-1";
    const runId = "run-wrong-bundle-authority";
    const bundle = makeRunnerContextBundle({
      taskId,
      runId,
      gitRoot: "/repo",
      mode: "execute",
    });
    bundle.state_fingerprint = fingerprint(taskId);
    bundle.state_fingerprint_policy = POLICY;
    const state = createRunnerRunState({ bundle });
    const accepted = fingerprint(taskId, 2, "advanced-task");
    state.status = "success";
    state.state_fingerprint = {
      ...state.state_fingerprint!,
      outcome: "accepted",
      precondition_fingerprint: accepted,
      state_before: accepted,
      state_after: accepted,
      precondition: evaluateStateFingerprintPrecondition({
        expected: accepted,
        current: accepted,
        policy: POLICY,
      }),
      effect_applied: true,
    };
    bundle.state_fingerprint = replacement;

    expect(() =>
      assertRunnerStateMatchesBundle(state, bundle, bundle.execution.artifact_paths, taskId, runId),
    ).toThrow("fingerprint authority mismatch");
  });

  it("rejects a non-replay fingerprint rewrite within the same task and worktree", () => {
    const taskId = "T-1";
    const runId = "run-unbounded-fingerprint-rewrite";
    const bundle = makeRunnerContextBundle({
      taskId,
      runId,
      gitRoot: "/repo",
      mode: "execute",
    });
    bundle.state_fingerprint = fingerprint(taskId);
    bundle.state_fingerprint_policy = POLICY;
    const state = createRunnerRunState({ bundle });
    const rewritten = fingerprint(taskId, 3, "rewritten-task");
    state.status = "success";
    state.state_fingerprint = {
      ...state.state_fingerprint!,
      outcome: "accepted",
      precondition_fingerprint: rewritten,
      state_before: rewritten,
      state_after: rewritten,
      precondition: evaluateStateFingerprintPrecondition({
        expected: rewritten,
        current: rewritten,
        policy: POLICY,
      }),
      effect_applied: true,
    };

    expect(() =>
      assertRunnerStateMatchesBundle(state, bundle, bundle.execution.artifact_paths, taskId, runId),
    ).toThrow("fingerprint authority mismatch");
  });
});
