import {
  EXECUTION_RECEIPT_V2_VALID_FIXTURE,
  type ExecutionReceiptGitObservation,
} from "@agentplaneorg/core/schemas";
import { makeRunnerContextBundle } from "@agentplane/testkit/runner";
import { describe, expect, it } from "vitest";

import { RUNNER_DANGER_FULL_ACCESS_SANDBOX } from "./types.js";
import {
  evaluateRunnerWriteScope,
  type RunnerProtectedFilesystemObservation,
} from "./write-scope.js";

function gitWithChangedPaths(changedPaths: string[]): ExecutionReceiptGitObservation {
  const git = structuredClone(
    EXECUTION_RECEIPT_V2_VALID_FIXTURE.git,
  ) as ExecutionReceiptGitObservation;
  if (git.state === "observed") git.delta.changed_paths = changedPaths;
  return git;
}

function observedFilesystem(changed_paths: string[] = []): RunnerProtectedFilesystemObservation {
  return { state: "observed", changed_paths, errors: [] };
}

function enforcedBundle() {
  const bundle = makeRunnerContextBundle();
  bundle.task!.data.mutation_scope = "code";
  bundle.execution.write_scope = {
    mutation_scope: "code",
    writable_roots: ["."],
    protected_paths: [
      ".agentplane/config.json",
      ".agentplane/policy",
      ".agentplane/tasks",
      ".github/workflows",
      "AGENTS.md",
      "lefthook.yml",
    ],
  };
  bundle.execution.policy_decision = {
    adapter_id: "codex",
    requested: { sandbox: "workspace-write" },
    effective: { sandbox: "workspace-write" },
    fields: {
      sandbox: {
        requested: "workspace-write",
        effective: "workspace-write",
        status: "enforced",
        capability_level: "native",
        channel: "argv",
      },
    },
    refusal_reason: null,
  };
  return bundle;
}

describe("runner actual write scope", () => {
  it("passes an observed allowed write", () => {
    const result = evaluateRunnerWriteScope({
      bundle: enforcedBundle(),
      git: gitWithChangedPaths(["packages/agentplane/src/runner/write-scope.ts"]),
      protected_filesystem: observedFilesystem(),
    });

    expect(result).toMatchObject({ state: "passed", violations: [], limitations: [] });
  });

  it("rejects an unreported write outside narrow context roots", () => {
    const bundle = enforcedBundle();
    bundle.task!.data.mutation_scope = "context";
    bundle.execution.write_scope = {
      mutation_scope: "context",
      writable_roots: [".agentplane/context", "context"],
      protected_paths: bundle.execution.write_scope!.protected_paths,
    };
    const result = evaluateRunnerWriteScope({
      bundle,
      git: gitWithChangedPaths(["packages/agentplane/src/runner/write-scope.ts"]),
      protected_filesystem: observedFilesystem(),
    });

    expect(result).toMatchObject({
      state: "rejected",
      violations: [
        {
          path: "packages/agentplane/src/runner/write-scope.ts",
          kind: "out_of_scope",
        },
      ],
    });
  });

  it("does not reinterpret a literal backslash in an observed Git path as a separator", () => {
    const bundle = enforcedBundle();
    bundle.task!.data.mutation_scope = "context";
    bundle.execution.write_scope = {
      mutation_scope: "context",
      writable_roots: ["context"],
      protected_paths: bundle.execution.write_scope!.protected_paths,
    };
    const changedPath = String.raw`context\escape.md`;
    const result = evaluateRunnerWriteScope({
      bundle,
      git: gitWithChangedPaths([changedPath]),
      protected_filesystem: observedFilesystem(),
    });

    expect(result).toMatchObject({
      state: "rejected",
      violations: [{ path: changedPath, kind: "out_of_scope" }],
    });
  });

  it("rejects protected mutations from Git or filesystem observation", () => {
    const gitResult = evaluateRunnerWriteScope({
      bundle: enforcedBundle(),
      git: gitWithChangedPaths([".agentplane/config.json"]),
      protected_filesystem: observedFilesystem(),
    });
    const ignoredResult = evaluateRunnerWriteScope({
      bundle: enforcedBundle(),
      git: gitWithChangedPaths([]),
      protected_filesystem: observedFilesystem([".agentplane/policy/ignored.local"]),
    });

    expect(gitResult).toMatchObject({
      state: "rejected",
      violations: [{ path: ".agentplane/config.json", kind: "protected_path" }],
    });
    expect(ignoredResult).toMatchObject({
      state: "rejected",
      violations: [{ path: ".agentplane/policy/ignored.local", kind: "protected_path" }],
    });
  });

  it("reports adapter downgrade and authorized danger as unverified", () => {
    const advisory = enforcedBundle();
    advisory.execution.policy_decision!.effective = {};
    advisory.execution.policy_decision!.fields.sandbox = {
      requested: "workspace-write",
      status: "advisory",
      capability_level: "advisory",
      channel: "env",
    };
    const downgraded = evaluateRunnerWriteScope({
      bundle: advisory,
      git: gitWithChangedPaths([]),
      protected_filesystem: observedFilesystem(),
    });

    const danger = enforcedBundle();
    danger.execution.sandbox_policy = {
      requested: RUNNER_DANGER_FULL_ACCESS_SANDBOX,
      source: "recipe_run_profile",
      role: "CODER",
      authority: {
        danger_full_access_authorized: true,
        provenance: "explicit_operator",
        source: "task run --allow-danger-full-access",
      },
    };
    danger.execution.policy_decision!.requested.sandbox = RUNNER_DANGER_FULL_ACCESS_SANDBOX;
    danger.execution.policy_decision!.effective.sandbox = RUNNER_DANGER_FULL_ACCESS_SANDBOX;
    danger.execution.policy_decision!.fields.sandbox = {
      requested: RUNNER_DANGER_FULL_ACCESS_SANDBOX,
      effective: RUNNER_DANGER_FULL_ACCESS_SANDBOX,
      status: "enforced",
      capability_level: "native",
      channel: "argv",
    };
    const authorizedDanger = evaluateRunnerWriteScope({
      bundle: danger,
      git: gitWithChangedPaths([]),
      protected_filesystem: observedFilesystem(),
    });

    expect(downgraded).toMatchObject({
      state: "unverified",
      sandbox: { enforcement: "advisory", effective: null },
    });
    expect(authorizedDanger).toMatchObject({
      state: "unverified",
      sandbox: {
        requested: RUNNER_DANGER_FULL_ACCESS_SANDBOX,
        authority: { provenance: "explicit_operator" },
      },
    });
  });
});
