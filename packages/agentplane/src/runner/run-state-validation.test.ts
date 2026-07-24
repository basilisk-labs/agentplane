import {
  buildStateFingerprint,
  evaluateStateFingerprintPrecondition,
  type StateFingerprint,
  type StateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";
import { describe, expect, it } from "vitest";

import { parseRunnerRunState } from "./run-state-validation.js";
import type { RunnerRunState, RunnerStateFingerprintRecord } from "./types.js";

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
  taskRevision: number,
  providerState: "present" | "unavailable" = "present",
  identity: {
    task_id?: string;
    worktree?: string;
  } = {},
): StateFingerprint {
  return buildStateFingerprint({
    task_id: identity.task_id ?? "T-1",
    task_revision: taskRevision,
    git_head: "a".repeat(40),
    worktree: identity.worktree ?? "/repo",
    components: {
      task: presentComponent("task"),
      git: presentComponent("git"),
      backend_projection: presentComponent("backend"),
      policy: presentComponent("policy"),
      blueprint: presentComponent("blueprint"),
      knowledge: presentComponent("knowledge"),
      provider:
        providerState === "present"
          ? presentComponent("provider")
          : {
              state: "unavailable",
              source: "provider",
              reason_code: "provider_observation_failed",
            },
      authority: presentComponent("authority"),
    },
  });
}

function baseState(): RunnerRunState {
  return {
    schema_version: 1,
    runner_api_version: "1",
    run_id: "run-1",
    adapter_id: "custom",
    target: { kind: "task", task_id: "T-1" },
    status: "success",
    mode: "execute",
    bundle_path: "/run/bundle.json",
    result_path: "/run/result.json",
    receipt_path: "/run/execution-receipt.json",
    events_path: "/run/events.jsonl",
    trace_path: "/run/trace.jsonl",
    stderr_path: "/run/stderr.log",
    trace_policy: {
      mode: "raw",
      max_tail_bytes: 65_536,
      capture_stderr: true,
    },
    timeout_policy: {
      wall_clock_ms: 60_000,
      idle_ms: 30_000,
      terminate_grace_ms: 1000,
    },
    created_at: "2026-07-24T00:00:00.000Z",
    updated_at: "2026-07-24T00:01:00.000Z",
  };
}

function acceptedRecord(): RunnerStateFingerprintRecord {
  const expected = fingerprint(1);
  return {
    schema_version: 1,
    kind: "runner_state_fingerprint_record",
    outcome: "accepted",
    precondition_fingerprint: expected,
    precondition_policy: POLICY,
    state_before: expected,
    state_after: expected,
    precondition: evaluateStateFingerprintPrecondition({
      expected,
      current: expected,
      policy: POLICY,
    }),
    effect_applied: true,
    post_state_reason_code: null,
  };
}

function successfulResult() {
  return {
    status: "success" as const,
    exit_code: 0,
    started_at: "2026-07-24T00:00:30.000Z",
    ended_at: "2026-07-24T00:01:00.000Z",
  };
}

function parse(state: unknown): RunnerRunState {
  return parseRunnerRunState(JSON.stringify(state), "/run/state.json");
}

describe("runner run-state validation", () => {
  it("keeps legacy terminal states without fingerprint or process-tree evidence readable", () => {
    const parsed = parse(baseState());
    expect(parsed).toMatchObject({
      run_id: "run-1",
      status: "success",
    });
    expect(parsed).not.toHaveProperty("state_fingerprint");
    expect(parsed).not.toHaveProperty("supervision");
  });

  it("validates a present legacy result without requiring it to exist", () => {
    expect(
      parse({
        ...baseState(),
        result: successfulResult(),
      }),
    ).toMatchObject({
      status: "success",
      result: { status: "success" },
    });
    expect(() =>
      parse({
        ...baseState(),
        result: {
          ...successfulResult(),
          status: "failed",
          exit_code: 1,
        },
      }),
    ).toThrow("invalid supervisor contract");
    expect(() =>
      parse({
        ...baseState(),
        result: {
          ...successfulResult(),
          artifacts: [{ path: 1 }],
        },
      }),
    ).toThrow("invalid supervisor contract");
  });

  it("rejects a result on a legacy non-terminal state", () => {
    expect(() =>
      parse({
        ...baseState(),
        status: "running",
        result: successfulResult(),
      }),
    ).toThrow("invalid supervisor contract");
  });

  it("allows pre-trace states only through the task-local legacy profile", () => {
    const legacy = baseState();
    Reflect.deleteProperty(legacy, "trace_path");
    Reflect.deleteProperty(legacy, "stderr_path");
    Reflect.deleteProperty(legacy, "trace_policy");
    Reflect.deleteProperty(legacy, "timeout_policy");
    Reflect.deleteProperty(legacy, "receipt_path");

    expect(() => parse(legacy)).toThrow("invalid supervisor contract");
    expect(
      parseRunnerRunState(JSON.stringify(legacy), "/run/state.json", {
        profile: "legacy_task_pre_trace",
      }),
    ).toEqual(legacy);
  });

  it("does not allow fingerprinted states to use the task-local legacy profile", () => {
    const modern = {
      ...baseState(),
      state_fingerprint: acceptedRecord(),
      result: successfulResult(),
    };
    Reflect.deleteProperty(modern, "trace_path");

    expect(() =>
      parseRunnerRunState(JSON.stringify(modern), "/run/state.json", {
        profile: "legacy_task_pre_trace",
      }),
    ).toThrow("invalid supervisor contract");
  });

  it("rejects malformed receipt and bootstrap paths before direct state consumers see them", () => {
    for (const replacement of [{ receipt_path: { forged: true } }, { bootstrap_path: 42 }]) {
      expect(() =>
        parse({
          ...baseState(),
          receipt_path: "/run/execution-receipt.json",
          ...replacement,
        }),
      ).toThrow("invalid supervisor contract");
    }
  });

  it("accepts a complete terminal fingerprint and cleanup observation", () => {
    const state: RunnerRunState = {
      ...baseState(),
      state_fingerprint: acceptedRecord(),
      result: successfulResult(),
      supervision: {
        process_tree: {
          scope: "direct_child_only",
          group_id: null,
          cleanup_state: "not_needed",
          terminate_sent_at: null,
          kill_sent_at: null,
          completed_at: "2026-07-24T00:01:00.000Z",
          residual_alive: false,
          error: null,
          containment_state: "limited",
          containment_limitation: "direct-child cleanup does not bound descendants",
        },
      },
    };

    expect(parse(state)).toEqual(state);
  });

  it("rejects a fingerprinted terminal state without a result", () => {
    expect(() =>
      parse({
        ...baseState(),
        state_fingerprint: acceptedRecord(),
      }),
    ).toThrow("invalid supervisor contract");
  });

  it("rejects a fingerprinted terminal state whose result contradicts its status", () => {
    expect(() =>
      parse({
        ...baseState(),
        state_fingerprint: acceptedRecord(),
        result: {
          ...successfulResult(),
          status: "failed",
          exit_code: 1,
        },
      }),
    ).toThrow("invalid supervisor contract");
  });

  it.each([
    {
      label: "negative exit code",
      result: { ...successfulResult(), exit_code: -1 },
    },
    {
      label: "result ends before it starts",
      result: {
        ...successfulResult(),
        ended_at: "2026-07-24T00:00:29.000Z",
      },
    },
  ])("rejects a fingerprinted terminal state with $label", ({ result }) => {
    expect(() =>
      parse({
        ...baseState(),
        state_fingerprint: acceptedRecord(),
        result,
      }),
    ).toThrow("invalid supervisor contract");
  });

  it("allows a result on a non-terminal state only for post-state-unknown evidence", () => {
    const expected = fingerprint(1);
    const state = {
      ...baseState(),
      status: "prepared",
      state_fingerprint: {
        schema_version: 1 as const,
        kind: "runner_state_fingerprint_record" as const,
        outcome: "post_state_unknown" as const,
        precondition_fingerprint: expected,
        precondition_policy: POLICY,
        state_before: expected,
        state_after: null,
        precondition: evaluateStateFingerprintPrecondition({
          expected,
          current: expected,
          policy: POLICY,
        }),
        effect_applied: true,
        post_state_reason_code: "post_state_unavailable" as const,
      },
      result: successfulResult(),
    };

    expect(parse(state)).toEqual(state);
    expect(() =>
      parse({
        ...state,
        state_fingerprint: {
          ...state.state_fingerprint,
          outcome: "effect_started",
          effect_applied: null,
          post_state_reason_code: null,
        },
      }),
    ).toThrow("invalid supervisor contract");
  });

  it("rejects terminal outcomes that the prepared journal cannot represent", () => {
    const expected = fingerprint(1);
    expect(() =>
      parse({
        ...baseState(),
        status: "blocked",
        result: {
          ...successfulResult(),
          status: "blocked",
          exit_code: 1,
        },
        state_fingerprint: {
          schema_version: 1,
          kind: "runner_state_fingerprint_record",
          outcome: "prepared",
          precondition_fingerprint: expected,
          precondition_policy: POLICY,
          state_before: null,
          state_after: null,
          precondition: null,
          effect_applied: null,
          post_state_reason_code: null,
        },
      }),
    ).toThrow("invalid supervisor contract");
  });

  it("requires effect-unknown evidence to be terminalized", () => {
    const expected = fingerprint(1);
    expect(() =>
      parse({
        ...baseState(),
        status: "running",
        state_fingerprint: {
          schema_version: 1,
          kind: "runner_state_fingerprint_record",
          outcome: "effect_unknown",
          precondition_fingerprint: expected,
          precondition_policy: POLICY,
          state_before: expected,
          state_after: null,
          precondition: evaluateStateFingerprintPrecondition({
            expected,
            current: expected,
            policy: POLICY,
          }),
          effect_applied: null,
          post_state_reason_code: null,
        },
      }),
    ).toThrow("invalid supervisor contract");
  });

  it("rejects a refused fingerprint that claims the effect was applied", () => {
    const expected = fingerprint(1);
    const current = fingerprint(2);
    const state = {
      ...baseState(),
      state_fingerprint: {
        schema_version: 1,
        kind: "runner_state_fingerprint_record",
        outcome: "refused",
        precondition_fingerprint: expected,
        precondition_policy: POLICY,
        state_before: current,
        state_after: current,
        precondition: evaluateStateFingerprintPrecondition({
          expected,
          current,
          policy: POLICY,
        }),
        effect_applied: true,
        post_state_reason_code: null,
      },
    };

    expect(() => parse(state)).toThrow("invalid supervisor contract");
  });

  it("rejects a terminal prepared fingerprint with contradictory effect evidence", () => {
    const expected = fingerprint(1);
    const state = {
      ...baseState(),
      state_fingerprint: {
        schema_version: 1,
        kind: "runner_state_fingerprint_record",
        outcome: "prepared",
        precondition_fingerprint: expected,
        precondition_policy: POLICY,
        state_before: null,
        state_after: null,
        precondition: null,
        effect_applied: true,
        post_state_reason_code: null,
      },
    };

    expect(() => parse(state)).toThrow("invalid supervisor contract");
  });

  it("accepts authority-valid post-state as bounded observation after required freshness expires", () => {
    const expected = fingerprint(1);
    const unavailablePostState = fingerprint(1, "unavailable");
    const policy: StateFingerprintPolicy = {
      required_components: ["provider"],
      provider: {
        required: true,
        unavailable: "reject",
      },
    };
    const state = {
      ...baseState(),
      result: successfulResult(),
      state_fingerprint: {
        schema_version: 1,
        kind: "runner_state_fingerprint_record",
        outcome: "accepted",
        precondition_fingerprint: expected,
        precondition_policy: policy,
        state_before: expected,
        state_after: unavailablePostState,
        precondition: evaluateStateFingerprintPrecondition({
          expected,
          current: expected,
          policy,
        }),
        effect_applied: true,
        post_state_reason_code: null,
      },
    };

    expect(parse(state)).toEqual(state);
  });

  it("rejects partial process-tree cleanup evidence that could otherwise look confirmed", () => {
    const state = {
      ...baseState(),
      state_fingerprint: acceptedRecord(),
      supervision: {
        process_tree: {
          scope: "direct_child_only",
          group_id: null,
          cleanup_state: "not_needed",
          residual_alive: false,
          error: null,
        },
      },
    };

    expect(() => parse(state)).toThrow("invalid supervisor contract");
  });

  it("rejects process-tree cleanup claims without matching semantic evidence", () => {
    const state = {
      ...baseState(),
      state_fingerprint: acceptedRecord(),
      supervision: {
        process_tree: {
          scope: "direct_child_only",
          group_id: null,
          cleanup_state: "terminated",
          terminate_sent_at: null,
          kill_sent_at: null,
          completed_at: "2026-07-24T00:01:00.000Z",
          residual_alive: false,
          error: null,
          containment_state: "limited",
          containment_limitation: "direct-child cleanup does not bound descendants",
        },
      },
    };

    expect(() => parse(state)).toThrow("invalid supervisor contract");
  });

  it("rejects successful process cleanup that also reports an error", () => {
    const state = {
      ...baseState(),
      state_fingerprint: acceptedRecord(),
      supervision: {
        process_tree: {
          scope: "posix_process_group",
          group_id: 4242,
          cleanup_state: "terminated",
          terminate_sent_at: "2026-07-24T00:00:59.000Z",
          kill_sent_at: null,
          completed_at: "2026-07-24T00:01:00.000Z",
          residual_alive: false,
          error: "cleanup was not actually confirmed",
          containment_state: "limited",
          containment_limitation: "process group may not include detached descendants",
        },
      },
    };

    expect(() => parse(state)).toThrow("invalid supervisor contract");
  });

  it.each([
    {
      cleanup_state: "terminated",
      terminate_sent_at: "2026-07-24T00:01:01.000Z",
      kill_sent_at: null,
    },
    {
      cleanup_state: "force_killed",
      terminate_sent_at: "2026-07-24T00:00:59.500Z",
      kill_sent_at: "2026-07-24T00:00:59.000Z",
    },
  ])("rejects causally impossible cleanup timestamps: %j", (cleanup) => {
    const state = {
      ...baseState(),
      state_fingerprint: acceptedRecord(),
      supervision: {
        process_tree: {
          scope: "posix_process_group",
          group_id: 4242,
          ...cleanup,
          completed_at: "2026-07-24T00:01:00.000Z",
          residual_alive: false,
          error: null,
          containment_state: "limited",
          containment_limitation: "process group may not include detached descendants",
        },
      },
    };

    expect(() => parse(state)).toThrow("invalid supervisor contract");
  });

  it("rejects accepted effect evidence on a pre-provider lifecycle state", () => {
    const state = {
      ...baseState(),
      status: "prepared",
      state_fingerprint: acceptedRecord(),
    };

    expect(() => parse(state)).toThrow("invalid supervisor contract");
  });

  it("rejects malformed trace and timeout policies before they control supervision", () => {
    expect(() =>
      parse({
        ...baseState(),
        trace_policy: {},
      }),
    ).toThrow("invalid supervisor contract");
    expect(() =>
      parse({
        ...baseState(),
        timeout_policy: {
          wall_clock_ms: -1,
          idle_ms: 30_000,
          terminate_grace_ms: 1000,
        },
      }),
    ).toThrow("invalid supervisor contract");
  });

  it.each([
    { mode: "none", max_tail_bytes: 1, capture_stderr: true },
    { mode: "raw", max_tail_bytes: Number.MAX_SAFE_INTEGER + 1, capture_stderr: true },
    { mode: "raw", max_tail_bytes: 1, capture_stderr: "true" },
    { mode: "raw", max_tail_bytes: 1, capture_stderr: true, unknown: true },
    { mode: "raw", max_tail_bytes: 1, capture_stderr: true, retention: "archive" },
    { mode: "raw", max_tail_bytes: 1, capture_stderr: true, compression: "zip" },
    { mode: "raw", max_tail_bytes: 1, capture_stderr: true, redact_patterns: [""] },
  ])("rejects an invalid trace policy: %j", (tracePolicy) => {
    expect(() =>
      parse({
        ...baseState(),
        trace_policy: tracePolicy,
      }),
    ).toThrow("invalid supervisor contract");
  });

  it.each([
    { wall_clock_ms: 1, idle_ms: 1 },
    { wall_clock_ms: 1.5, idle_ms: 1, terminate_grace_ms: 1 },
    { wall_clock_ms: 1, idle_ms: "1", terminate_grace_ms: 1 },
    {
      wall_clock_ms: Number.MAX_SAFE_INTEGER + 1,
      idle_ms: 1,
      terminate_grace_ms: 1,
    },
    { wall_clock_ms: 1, idle_ms: 1, terminate_grace_ms: 1, unknown: true },
  ])("rejects an invalid timeout policy: %j", (timeoutPolicy) => {
    expect(() =>
      parse({
        ...baseState(),
        timeout_policy: timeoutPolicy,
      }),
    ).toThrow("invalid supervisor contract");
  });

  it("keeps optional trace-policy fields compatible while validating their shape", () => {
    const state = {
      ...baseState(),
      trace_policy: {
        mode: "off",
        max_tail_bytes: 0,
        capture_stderr: false,
        retention: "remove_on_success",
        compression: "gzip",
        redact_patterns: ["secret=[^ ]+"],
      },
      timeout_policy: {
        wall_clock_ms: 0,
        idle_ms: 0,
        terminate_grace_ms: 0,
      },
    };

    expect(parse(state)).toEqual(state);
  });

  it("rejects fingerprint evidence for another task or worktree", () => {
    const wrongTask = acceptedRecord();
    wrongTask.precondition_fingerprint = fingerprint(1, "present", {
      task_id: "T-2",
    });
    wrongTask.state_before = wrongTask.precondition_fingerprint;
    wrongTask.state_after = wrongTask.precondition_fingerprint;
    wrongTask.precondition = evaluateStateFingerprintPrecondition({
      expected: wrongTask.precondition_fingerprint,
      current: wrongTask.precondition_fingerprint,
      policy: POLICY,
    });
    expect(() =>
      parse({
        ...baseState(),
        state_fingerprint: wrongTask,
      }),
    ).toThrow("invalid supervisor contract");

    const wrongWorktree = acceptedRecord();
    wrongWorktree.state_after = fingerprint(1, "present", {
      worktree: "/other-repo",
    });
    expect(() =>
      parse({
        ...baseState(),
        state_fingerprint: wrongWorktree,
      }),
    ).toThrow("invalid supervisor contract");
  });
});
