import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { validateExecutionReceipt } from "@agentplaneorg/core/schemas";
import { execFileAsync } from "@agentplaneorg/core/process";
import { makeRunnerContextBundle } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it } from "vitest";

import { RunnerRunRepository } from "../run-repository.js";
import type { SupervisedProcessResult } from "../process-supervision/run.js";
import { createSupervisorExecutionReceiptLocator } from "../task-run-paths.js";
import { createRunnerAdapter } from "./index.js";
import {
  captureRunnerExecutionBefore,
  finalizeRunnerExecutionReceipt,
} from "./execution-receipt-runtime.js";

const tempRoots: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true, force: true })),
  );
});

async function createRepository(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-receipt-runtime-"));
  tempRoots.push(root);
  await execFileAsync("git", ["init", "--quiet", "--initial-branch=main"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "agentplane@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "AgentPlane"], { cwd: root });
  await writeFile(
    path.join(root, ".gitignore"),
    ".agentplane/policy/*.local\nignored-outside/\n",
    "utf8",
  );
  await writeFile(path.join(root, "tracked.txt"), "base\n", "utf8");
  await execFileAsync("git", ["add", "--", ".gitignore", "tracked.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "--quiet", "-m", "seed"], { cwd: root });
  return root;
}

async function prepareObservation(
  root: string,
  writeScope?: {
    mutation_scope: string;
    writable_roots: string[];
    protected_paths: string[];
  },
  nativeReadOnly = false,
) {
  const selectedWriteScope = writeScope ?? {
    mutation_scope: "code",
    writable_roots: ["."],
    protected_paths: [".agentplane/policy"],
  };
  const bundle = makeRunnerContextBundle({
    gitRoot: root,
    status: "DOING",
    mode: "execute",
  });
  bundle.task!.data.mutation_scope = selectedWriteScope.mutation_scope;
  bundle.execution.write_scope = selectedWriteScope;
  bundle.execution.sandbox_policy = {
    requested: nativeReadOnly ? "read-only" : "workspace-write",
    source: "role_default",
    role: nativeReadOnly ? "TESTER" : "CODER",
    authority: {
      danger_full_access_authorized: false,
      provenance: null,
      source: null,
    },
  };
  bundle.execution.policy_decision = {
    adapter_id: "codex",
    requested: { sandbox: nativeReadOnly ? "read-only" : "workspace-write" },
    effective: { sandbox: nativeReadOnly ? "read-only" : "workspace-write" },
    fields: {
      sandbox: {
        requested: nativeReadOnly ? "read-only" : "workspace-write",
        effective: nativeReadOnly ? "read-only" : "workspace-write",
        status: "enforced",
        capability_level: "native",
        channel: "argv",
      },
    },
    refusal_reason: null,
  };
  if (nativeReadOnly) {
    bundle.execution.adapter_capabilities = {
      adapter_id: "codex",
      fields: {
        sandbox: {
          level: "native",
          channel: "argv",
          supported_values: ["read-only", "workspace-write", "danger-full-access"],
        },
      },
      filesystem_effect_containment: {
        level: "native",
        supported_sandboxes: ["read-only"],
        boundary: "workspace",
        descendant_inheritance: "enforced",
        lifetime_containment: "not_provided",
      },
    };
  }
  const invocation = await createRunnerAdapter(defaultConfig()).prepare(bundle);
  if (nativeReadOnly) {
    invocation.filesystem_effect_containment = {
      mechanism: "native_inherited_sandbox",
      sandbox: "read-only",
      boundary: "workspace",
      descendant_inheritance: "enforced",
      lifetime_containment: "not_provided",
    };
  }
  const repository = RunnerRunRepository.fromBundle(bundle);
  await repository.writePrepared({ bundle, invocation });
  const observationBefore = await captureRunnerExecutionBefore({
    invocation,
    repository,
  });
  return { invocation, repository, observationBefore };
}

function cleanLimitedProcessResult(): SupervisedProcessResult {
  const startedAt = "2026-07-23T10:00:00.000Z";
  const endedAt = "2026-07-23T10:00:01.000Z";
  return {
    exit_code: 0,
    exit_signal: null,
    stdout_tail: "",
    stderr_tail: "",
    stdout_bytes: 0,
    stderr_bytes: 0,
    pid: 123,
    started_at: startedAt,
    ended_at: endedAt,
    cancel_requested_at: null,
    cancel_signal: null,
    timeout_reason: null,
    timeout_requested_at: null,
    terminate_sent_at: null,
    kill_sent_at: null,
    force_killed: false,
    process_tree: {
      scope: "posix_process_group",
      group_id: 123,
      cleanup_state: "not_needed",
      terminate_sent_at: null,
      kill_sent_at: null,
      completed_at: endedAt,
      residual_alive: false,
      error: null,
      containment_state: "limited",
      containment_limitation:
        "POSIX process-group cleanup cannot observe or terminate descendants that create a new session or process group.",
    },
    heartbeat_at: endedAt,
    trace_artifact_path: null,
    trace_archive_path: null,
    stderr_artifact_path: null,
    stderr_archive_path: null,
  };
}

function cleanDirectChildProcessResult(): SupervisedProcessResult {
  const result = cleanLimitedProcessResult();
  return {
    ...result,
    process_tree: {
      scope: "direct_child_only",
      group_id: null,
      cleanup_state: "not_needed",
      terminate_sent_at: null,
      kill_sent_at: null,
      completed_at: result.ended_at,
      residual_alive: false,
      error: null,
      containment_state: "limited",
      containment_limitation:
        "Direct-child supervision on Windows does not provide bounded descendant containment.",
    },
  };
}

describe("execution receipt protected filesystem observation", () => {
  it("skips supplemental scanning for an exact native read-only boundary", async () => {
    const root = await createRepository();
    const prepared = await prepareObservation(
      root,
      {
        mutation_scope: "none",
        writable_roots: [],
        protected_paths: [".agentplane/policy"],
      },
      true,
    );

    expect(prepared.observationBefore.filesystem_observation_prefixes).toEqual([]);
    expect(prepared.observationBefore.filesystem_observation_mode).toBeNull();
    expect(prepared.observationBefore.protected_filesystem).toBeNull();
  });

  it("rejects a gitignored protected-path mutation and reports it as an actual write", async () => {
    const root = await createRepository();
    const prepared = await prepareObservation(root);
    expect(prepared.observationBefore.filesystem_observation_prefixes).toEqual([
      ".agentplane/policy",
    ]);
    expect(prepared.observationBefore.filesystem_observation_mode).toBe("content_hash");
    expect(prepared.observationBefore.protected_filesystem?.capture_mode).toBe("content_hash");
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "ignored.local"),
      "mutated by agent\n",
      "utf8",
    );

    const finalized = await finalizeRunnerExecutionReceipt({
      ...prepared,
      observation_before: prepared.observationBefore,
      process_result: null,
      base_result: {
        status: "failed",
        exit_code: 1,
        started_at: "2026-07-23T10:00:00.000Z",
        ended_at: "2026-07-23T10:00:01.000Z",
        summary: "fixture",
      },
      artifacts: [],
      manifest_state: "not_reached",
      capabilities_used: [],
    });
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(prepared.invocation.receipt_path, "utf8")),
    );

    expect(finalized.result.execution_receipt?.path).toBe(
      createSupervisorExecutionReceiptLocator({
        task_id: prepared.observationBefore.bundle!.task!.task_id,
        run_id: prepared.invocation.run_id,
      }),
    );
    expect(receipt.git.state).toBe("observed");
    if (receipt.git.state === "observed") {
      expect(receipt.git.delta.changed_paths).not.toContain(".agentplane/policy/ignored.local");
    }
    expect(receipt.scope_evaluation.state).toBe("rejected");
    if (receipt.scope_evaluation.state === "rejected") {
      expect(receipt.scope_evaluation.violations).toContainEqual({
        path: ".agentplane/policy/ignored.local",
        kind: "protected_path",
      });
    }
    expect(receipt.checks).toContainEqual(
      expect.objectContaining({
        id: "runner.protected_filesystem.observed",
        required: true,
        status: "passed",
      }),
    );
    expect(receipt.checks).toContainEqual(
      expect.objectContaining({
        id: "runner.scope.within_authority",
        required: true,
        status: "failed",
      }),
    );
    expect(receipt.success_policy.outcome).toBe("rejected");
    expect(finalized.result.evidence?.changed_paths).toContain(".agentplane/policy/ignored.local");
  });

  it("rejects a gitignored out-of-scope write for narrow writable roots", async () => {
    const root = await createRepository();
    const prepared = await prepareObservation(root, {
      mutation_scope: "context",
      writable_roots: ["allowed"],
      protected_paths: [],
    });
    expect(prepared.observationBefore.filesystem_observation_prefixes).toEqual(["."]);
    expect(prepared.observationBefore.filesystem_observation_mode).toBe("metadata_only");
    expect(prepared.observationBefore.protected_filesystem?.capture_mode).toBe("metadata_only");
    await mkdir(path.join(root, "ignored-outside"), { recursive: true });
    await writeFile(
      path.join(root, "ignored-outside", "unreported.txt"),
      "unreported out-of-scope write\n",
      "utf8",
    );

    const finalized = await finalizeRunnerExecutionReceipt({
      ...prepared,
      observation_before: prepared.observationBefore,
      process_result: null,
      base_result: {
        status: "success",
        exit_code: 0,
        started_at: "2026-07-23T10:00:00.000Z",
        ended_at: "2026-07-23T10:00:01.000Z",
        summary: "fixture",
      },
      artifacts: [],
      manifest_state: "missing_allowed",
      capabilities_used: [],
    });
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(prepared.invocation.receipt_path, "utf8")),
    );

    expect(receipt.git.state).toBe("observed");
    if (receipt.git.state === "observed") {
      expect(receipt.git.delta.changed_paths).not.toContain("ignored-outside/unreported.txt");
    }
    expect(receipt.scope_evaluation).toMatchObject({
      state: "rejected",
    });
    expect(
      receipt.scope_evaluation.state === "rejected"
        ? receipt.scope_evaluation.violations
        : undefined,
    ).toEqual(
      expect.arrayContaining([
        {
          path: "ignored-outside/unreported.txt",
          kind: "out_of_scope",
        },
      ]),
    );
    expect(receipt.success_policy.outcome).toBe("rejected");
    expect(finalized.result.status).toBe("failed");
    expect(finalized.result.evidence?.changed_paths).toContain("ignored-outside/unreported.txt");
  });

  it("does not reject the parent-directory metadata effect of creating a narrow writable root", async () => {
    const root = await createRepository();
    const prepared = await prepareObservation(root, {
      mutation_scope: "context",
      writable_roots: ["allowed"],
      protected_paths: [],
    });
    await mkdir(path.join(root, "allowed"), { recursive: true });
    await writeFile(path.join(root, "allowed", "result.txt"), "allowed write\n", "utf8");

    await finalizeRunnerExecutionReceipt({
      ...prepared,
      observation_before: prepared.observationBefore,
      process_result: null,
      base_result: {
        status: "failed",
        exit_code: 1,
        started_at: "2026-07-23T10:00:00.000Z",
        ended_at: "2026-07-23T10:00:01.000Z",
        summary: "fixture",
      },
      artifacts: [],
      manifest_state: "not_reached",
      capabilities_used: [],
    });
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(prepared.invocation.receipt_path, "utf8")),
    );

    expect(receipt.scope_evaluation).toMatchObject({
      state: "passed",
      violations: [],
    });
  });

  it("rejects an out-of-scope tracked write hidden by skip-worktree", async () => {
    const root = await createRepository();
    await execFileAsync("git", ["update-index", "--skip-worktree", "tracked.txt"], { cwd: root });
    const prepared = await prepareObservation(root, {
      mutation_scope: "context",
      writable_roots: ["allowed"],
      protected_paths: [],
    });
    await writeFile(path.join(root, "tracked.txt"), "hidden tracked mutation\n", "utf8");

    const finalized = await finalizeRunnerExecutionReceipt({
      ...prepared,
      observation_before: prepared.observationBefore,
      process_result: null,
      base_result: {
        status: "success",
        exit_code: 0,
        started_at: "2026-07-23T10:00:00.000Z",
        ended_at: "2026-07-23T10:00:01.000Z",
        summary: "fixture",
      },
      artifacts: [],
      manifest_state: "missing_allowed",
      capabilities_used: [],
    });
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(prepared.invocation.receipt_path, "utf8")),
    );

    expect(receipt.git.state).toBe("observed");
    if (receipt.git.state === "observed") {
      expect(receipt.git.delta.changed_paths).not.toContain("tracked.txt");
    }
    expect(receipt.scope_evaluation).toMatchObject({
      state: "rejected",
      violations: [{ path: "tracked.txt", kind: "out_of_scope" }],
    });
    expect(receipt.success_policy.outcome).toBe("rejected");
    expect(finalized.result.status).toBe("failed");
    expect(finalized.result.evidence?.changed_paths).toContain("tracked.txt");
  });

  it("records a complete protected-path comparison when no protected file changes", async () => {
    const root = await createRepository();
    const prepared = await prepareObservation(root);

    await finalizeRunnerExecutionReceipt({
      ...prepared,
      observation_before: prepared.observationBefore,
      process_result: null,
      base_result: {
        status: "failed",
        exit_code: 1,
        started_at: "2026-07-23T10:00:00.000Z",
        ended_at: "2026-07-23T10:00:01.000Z",
        summary: "fixture",
      },
      artifacts: [],
      manifest_state: "not_reached",
      capabilities_used: [],
    });
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(prepared.invocation.receipt_path, "utf8")),
    );

    expect(receipt.checks).toContainEqual(
      expect.objectContaining({
        id: "runner.protected_filesystem.observed",
        required: true,
        status: "passed",
      }),
    );
    expect(receipt.scope_evaluation.state).toBe("passed");
  });

  it("preserves mechanical success when trust containment remains unverified", async () => {
    const root = await createRepository();
    const prepared = await prepareObservation(root);

    const finalized = await finalizeRunnerExecutionReceipt({
      ...prepared,
      observation_before: prepared.observationBefore,
      process_result: cleanLimitedProcessResult(),
      base_result: {
        status: "success",
        exit_code: 0,
        started_at: "2026-07-23T10:00:00.000Z",
        ended_at: "2026-07-23T10:00:01.000Z",
        summary: "mechanical success",
      },
      artifacts: [],
      manifest_state: "missing_allowed",
      capabilities_used: [],
    });
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(prepared.invocation.receipt_path, "utf8")),
    );

    expect(receipt.success_policy.outcome).toBe("unverified");
    expect(finalized.result.status).toBe("success");
    expect(finalized.result.execution_receipt?.verification_state).toBe("unverified");
  });

  it("records confirmed direct-child cleanup as unverified instead of rejected", async () => {
    const root = await createRepository();
    const prepared = await prepareObservation(root);

    const finalized = await finalizeRunnerExecutionReceipt({
      ...prepared,
      observation_before: prepared.observationBefore,
      process_result: cleanDirectChildProcessResult(),
      base_result: {
        status: "success",
        exit_code: 0,
        started_at: "2026-07-23T10:00:00.000Z",
        ended_at: "2026-07-23T10:00:01.000Z",
        summary: "direct-child mechanical success",
      },
      artifacts: [],
      manifest_state: "missing_allowed",
      capabilities_used: [],
    });
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(prepared.invocation.receipt_path, "utf8")),
    );

    expect(receipt.checks).toContainEqual(
      expect.objectContaining({
        id: "runner.process_group_cleanup",
        required: true,
        status: "not_run",
      }),
    );
    expect(receipt.success_policy.outcome).toBe("unverified");
    expect(
      receipt.success_policy.reasons.some((reason) =>
        reason.includes("residual descendant-lifetime risk"),
      ),
    ).toBe(true);
    expect(receipt.success_policy.reasons).toEqual(
      expect.arrayContaining([
        "required observed check was not run: runner.process_group_cleanup",
        "required observed check was not run: runner.process_containment",
      ]),
    );
    expect(finalized.result.status).toBe("success");
    expect(finalized.result.execution_receipt?.verification_state).toBe("unverified");
  });

  it("uses a native read-only effect boundary without claiming process-lifetime containment", async () => {
    const root = await createRepository();
    const prepared = await prepareObservation(
      root,
      {
        mutation_scope: "none",
        writable_roots: [],
        protected_paths: [".agentplane/policy"],
      },
      true,
    );

    const finalized = await finalizeRunnerExecutionReceipt({
      ...prepared,
      observation_before: prepared.observationBefore,
      process_result: cleanDirectChildProcessResult(),
      base_result: {
        status: "success",
        exit_code: 0,
        started_at: "2026-07-23T10:00:00.000Z",
        ended_at: "2026-07-23T10:00:01.000Z",
        summary: "read-only direct-child mechanical success",
      },
      artifacts: [],
      manifest_state: "missing_allowed",
      capabilities_used: [],
    });
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(prepared.invocation.receipt_path, "utf8")),
    );

    expect(receipt.checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "runner.process_group_cleanup",
          required: false,
          status: "not_run",
        }),
        expect.objectContaining({
          id: "runner.process_containment",
          required: false,
          status: "not_run",
        }),
        expect.objectContaining({
          id: "runner.sandbox.filesystem_effects_enforced",
          required: true,
          status: "passed",
        }),
      ]),
    );
    expect(
      receipt.checks
        .find((check) => check.id === "runner.process_containment")
        ?.details.includes("bounded descendant containment"),
    ).toBe(true);
    expect(receipt.process.process_tree).toMatchObject({
      scope: "direct_child_only",
      containment_state: "limited",
    });
    expect(receipt.success_policy.outcome).toBe("observed_success");
    expect(finalized.result.status).toBe("success");
  });

  it("uses the pre-spawn policy and digests when the agent tampers with run artifacts", async () => {
    const root = await createRepository();
    const prepared = await prepareObservation(root, {
      mutation_scope: "context",
      writable_roots: ["allowed"],
      protected_paths: [".agentplane/policy"],
    });
    const tamperedBundle = JSON.parse(await readFile(prepared.invocation.bundle_path, "utf8")) as {
      execution: {
        write_scope: {
          writable_roots: string[];
          protected_paths: string[];
        };
      };
    };
    tamperedBundle.execution.write_scope.writable_roots = ["."];
    tamperedBundle.execution.write_scope.protected_paths = [];
    await writeFile(
      prepared.invocation.bundle_path,
      `${JSON.stringify(tamperedBundle, null, 2)}\n`,
      "utf8",
    );
    const tamperedState = JSON.parse(await readFile(prepared.invocation.state_path, "utf8")) as {
      prepared_metadata?: {
        bundle_sha256?: string;
      };
    };
    if (tamperedState.prepared_metadata) {
      tamperedState.prepared_metadata.bundle_sha256 = "0".repeat(64);
    }
    await writeFile(
      prepared.invocation.state_path,
      `${JSON.stringify(tamperedState, null, 2)}\n`,
      "utf8",
    );
    await writeFile(path.join(root, "outside.txt"), "out of scope\n", "utf8");

    await finalizeRunnerExecutionReceipt({
      ...prepared,
      observation_before: prepared.observationBefore,
      process_result: null,
      base_result: {
        status: "failed",
        exit_code: 1,
        started_at: "2026-07-23T10:00:00.000Z",
        ended_at: "2026-07-23T10:00:01.000Z",
        summary: "fixture",
      },
      artifacts: [
        { path: prepared.invocation.bundle_path, label: "bundle" },
        { path: prepared.invocation.bootstrap_path!, label: "bootstrap" },
      ],
      manifest_state: "not_reached",
      capabilities_used: [],
    });
    const receipt = validateExecutionReceipt(
      JSON.parse(await readFile(prepared.invocation.receipt_path, "utf8")),
    );

    expect(receipt.scope_evaluation.state).toBe("rejected");
    if (receipt.scope_evaluation.state === "rejected") {
      expect(receipt.scope_evaluation.writable_roots).toEqual(["allowed"]);
      expect(receipt.scope_evaluation.protected_paths).toEqual([".agentplane/policy"]);
      expect(receipt.scope_evaluation.violations).toContainEqual({
        path: "outside.txt",
        kind: "out_of_scope",
      });
    }
    expect(receipt.checks).toContainEqual(
      expect.objectContaining({
        id: "runner.artifacts.integrity",
        required: true,
        status: "failed",
      }),
    );
    expect(receipt.collection).toMatchObject({
      status: "partial",
      errors: ["supervisor did not capture a completed child process observation"],
    });
    expect(receipt.success_policy.outcome).toBe("rejected");
  });
});
