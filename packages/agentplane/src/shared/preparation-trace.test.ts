import { describe, expect, it } from "vitest";

import { PreparationTraceRecorder } from "./preparation-trace.js";

const base = {
  node: "git_snapshot",
  scope: "task:42",
  durationMs: 4,
  dependencies: ["task_backend_read"],
  cacheability: "exact" as const,
  cachePolicyReason: "Git state is fully fingerprinted.",
};

describe("PreparationTraceRecorder", () => {
  it("identifies cold, reusable, and independently stale observations", () => {
    const recorder = new PreparationTraceRecorder();
    const cold = recorder.record({
      ...base,
      fingerprintInputs: { head: "a", dirty_paths: [] },
      output: { head: "a" },
    });
    const reusable = recorder.record({
      ...base,
      fingerprintInputs: { dirty_paths: [], head: "a" },
      output: { head: "a" },
    });
    const staleGit = recorder.record({
      ...base,
      fingerprintInputs: { head: "b", dirty_paths: [] },
      output: { head: "b" },
    });

    expect(cold).toMatchObject({
      status: "resolved",
      invalidationReasons: ["no_prior_observation"],
    });
    expect(reusable).toMatchObject({
      status: "reuse_candidate",
      invalidationReasons: ["fingerprint_unchanged"],
    });
    expect(staleGit).toMatchObject({
      status: "invalidated",
      invalidationReasons: ["fingerprint_input_changed:head"],
    });
    expect(staleGit.fingerprintInputs.map((input) => input.name)).toEqual(["dirty_paths", "head"]);
    expect(staleGit.inputBytes).toBeGreaterThan(0);
    expect(staleGit.outputBytes).toBeGreaterThan(0);
  });

  it("does not classify semantic decisions as reusable", () => {
    const recorder = new PreparationTraceRecorder();
    const semantic = {
      node: "route_decision",
      scope: "task:42",
      durationMs: 2,
      fingerprintInputs: { state_fingerprint: "sha256:fixed" },
      output: { action: "approve" },
      cacheability: "none" as const,
      cachePolicyReason: "Authority decisions require live revalidation.",
    };
    recorder.record(semantic);
    const repeated = recorder.record(semantic);

    expect(repeated).toMatchObject({
      status: "resolved",
      invalidationReasons: ["non_cacheable_policy"],
      cacheability: "none",
    });
  });

  it("reports incomplete invalidation inputs when output changes behind a stable fingerprint", () => {
    const recorder = new PreparationTraceRecorder();
    recorder.record({
      ...base,
      fingerprintInputs: { head: "a" },
      output: { dirty_paths: [] },
    });
    const changed = recorder.record({
      ...base,
      fingerprintInputs: { head: "a" },
      output: { dirty_paths: ["src/a.ts"] },
    });

    expect(changed).toMatchObject({
      status: "invalidated",
      invalidationReasons: ["output_changed_without_fingerprint_change"],
    });
  });

  it("attributes task, Git, and provider staleness to the changed node only", () => {
    const recorder = new PreparationTraceRecorder();
    const nodes = [
      { node: "task_backend_read", input: "revision", before: 4, after: 5 },
      { node: "git_snapshot", input: "head", before: "a", after: "b" },
      { node: "remote_provider_state", input: "pr_state", before: "OPEN", after: "MERGED" },
    ] as const;

    for (const candidate of nodes) {
      const common = {
        node: candidate.node,
        scope: "task:42",
        durationMs: 1,
        cacheability:
          candidate.node === "remote_provider_state" ? ("ttl" as const) : ("exact" as const),
        cachePolicyReason: "fixture",
      };
      recorder.record({
        ...common,
        fingerprintInputs: { [candidate.input]: candidate.before },
        output: candidate.before,
      });
      const stale = recorder.record({
        ...common,
        fingerprintInputs: { [candidate.input]: candidate.after },
        output: candidate.after,
      });
      expect(stale).toMatchObject({
        node: candidate.node,
        status: "invalidated",
        invalidationReasons: [`fingerprint_input_changed:${candidate.input}`],
      });
    }
  });

  it("emits digests and sizes without retaining raw fingerprint values", () => {
    const emitted: unknown[] = [];
    const recorder = new PreparationTraceRecorder({ emit: (event) => emitted.push(event) });
    recorder.record({
      ...base,
      fingerprintInputs: { provider_token_candidate: "trace-secret-fixture" },
      output: { state: "available" },
    });

    const serialized = JSON.stringify(emitted);
    expect(serialized).not.toContain("trace-secret-fixture");
    expect(serialized).toContain("sha256:");
    expect(serialized).toContain('"bytes":');
  });
});
