import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PassThrough } from "node:stream";

import {
  buildObservedGithubPrMeta,
  buildOpenedPrMeta,
  buildIntegratedPrMeta,
  buildUpdatedPrMeta,
  buildVerifiedPrMeta,
  derivePrArtifactLifecycleState,
  hasClosedPreMergeClosureMarker,
  parsePrMetaForwardCompatible,
  parsePrMeta,
  readPreMergeClosureMarker,
  resolvePrBatchIncludedTaskIds,
  resolveShellInvocation,
  runShellCommand,
  withPrArtifactLifecycleState,
} from "./pr-meta.js";

describe("pr-meta shell invocations", () => {
  let originalComspec: string | undefined;
  let originalComSpec: string | undefined;
  let originalCliAlias: string | undefined;
  let originalAgentMode: string | undefined;
  let originalRuntimeActiveBin: string | undefined;
  let originalRuntimeMode: string | undefined;
  let originalRuntimeHandoffFrom: string | undefined;
  let originalRepoLocalHandoff: string | undefined;
  let originalDevAutoBootstrapped: string | undefined;
  let originalFrameworkBuildLockPath: string | undefined;

  beforeEach(() => {
    originalComspec = process.env.COMSPEC;
    originalComSpec = process.env.ComSpec;
    originalCliAlias = process.env.AGENTPLANE_CLI_ALIAS;
    originalAgentMode = process.env.AGENTPLANE_AGENT_MODE;
    originalRuntimeActiveBin = process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
    originalRuntimeMode = process.env.AGENTPLANE_RUNTIME_MODE;
    originalRuntimeHandoffFrom = process.env.AGENTPLANE_RUNTIME_HANDOFF_FROM;
    originalRepoLocalHandoff = process.env.AGENTPLANE_REPO_LOCAL_HANDOFF;
    originalDevAutoBootstrapped = process.env.AGENTPLANE_DEV_AUTO_BOOTSTRAPPED;
    originalFrameworkBuildLockPath = process.env.AGENTPLANE_FRAMEWORK_BUILD_LOCK_PATH;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env.COMSPEC = originalComspec;
    process.env.ComSpec = originalComSpec;
    process.env.AGENTPLANE_CLI_ALIAS = originalCliAlias;
    process.env.AGENTPLANE_AGENT_MODE = originalAgentMode;
    process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = originalRuntimeActiveBin;
    process.env.AGENTPLANE_RUNTIME_MODE = originalRuntimeMode;
    process.env.AGENTPLANE_RUNTIME_HANDOFF_FROM = originalRuntimeHandoffFrom;
    process.env.AGENTPLANE_REPO_LOCAL_HANDOFF = originalRepoLocalHandoff;
    process.env.AGENTPLANE_DEV_AUTO_BOOTSTRAPPED = originalDevAutoBootstrapped;
    process.env.AGENTPLANE_FRAMEWORK_BUILD_LOCK_PATH = originalFrameworkBuildLockPath;
  });

  it("parses verify commands as argv without a shell", () => {
    expect(
      resolveShellInvocation("bun test 'packages/core/src/process/run-process.test.ts'"),
    ).toEqual({
      command: "bun",
      args: ["test", "packages/core/src/process/run-process.test.ts"],
    });
  });

  it("rejects shell metacharacters in verify commands", () => {
    expect(() => resolveShellInvocation("echo hello && rm -rf .")).toThrow(/argv syntax/);
  });

  it("does not use COMSPEC as executable input", () => {
    delete process.env.ComSpec;
    process.env.COMSPEC = "custom-cmd.exe";
    expect(resolveShellInvocation("echo hello")).toEqual({
      command: "echo",
      args: ["hello"],
    });
  });

  it("streams verify output without a fixed child-process buffer", async () => {
    delete process.env.COMSPEC;
    delete process.env.ComSpec;
    process.env.AGENTPLANE_CLI_ALIAS = "ap";
    process.env.AGENTPLANE_AGENT_MODE = "1";
    process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = "/maintenance/agentplane.js";
    process.env.AGENTPLANE_RUNTIME_MODE = "repo-local";
    process.env.AGENTPLANE_RUNTIME_HANDOFF_FROM = "/global/agentplane.js";
    process.env.AGENTPLANE_REPO_LOCAL_HANDOFF = "1";
    process.env.AGENTPLANE_DEV_AUTO_BOOTSTRAPPED = "1";
    process.env.AGENTPLANE_FRAMEWORK_BUILD_LOCK_PATH = "/tmp/agentplane-build.lock";
    const gitProcess = await import("@agentplaneorg/core/process");
    const stdout = new PassThrough();
    const stderr = new PassThrough();
    let resolveProcess: ((value: { exitCode: number }) => void) | undefined;
    const child = Object.assign(
      new Promise<{ exitCode: number }>((resolve) => {
        resolveProcess = resolve;
      }),
      { stdout, stderr },
    );
    const startProcess = vi.spyOn(gitProcess, "startProcess").mockReturnValue(child as never);

    const pending = runShellCommand("node --version", process.cwd());
    stdout.end("ok");
    stderr.end("");
    resolveProcess?.({ exitCode: 0 });
    const result = await pending;

    expect(startProcess).toHaveBeenCalledWith(
      expect.objectContaining({
        command: "node",
        args: ["--version"],
        cwd: process.cwd(),
        buffer: false,
        stdout: "pipe",
        stderr: "pipe",
      }),
    );
    const startOptions = startProcess.mock.calls[0]?.[0];
    expect(startOptions?.env).not.toHaveProperty("AGENTPLANE_CLI_ALIAS");
    expect(startOptions?.env).not.toHaveProperty("AGENTPLANE_AGENT_MODE");
    expect(startOptions?.env).not.toHaveProperty("AGENTPLANE_RUNTIME_ACTIVE_BIN");
    expect(startOptions?.env).not.toHaveProperty("AGENTPLANE_RUNTIME_MODE");
    expect(startOptions?.env).not.toHaveProperty("AGENTPLANE_RUNTIME_HANDOFF_FROM");
    expect(startOptions?.env).not.toHaveProperty("AGENTPLANE_REPO_LOCAL_HANDOFF");
    expect(startOptions?.env).not.toHaveProperty("AGENTPLANE_DEV_AUTO_BOOTSTRAPPED");
    expect(startOptions?.env).not.toHaveProperty("AGENTPLANE_FRAMEWORK_BUILD_LOCK_PATH");
    expect(result).toEqual({ code: 0, output: "ok" });
  });

  it("keeps only a bounded tail for release-sized verify output", async () => {
    const gitProcess = await import("@agentplaneorg/core/process");
    const stdout = new PassThrough();
    const stderr = new PassThrough();
    let resolveProcess: ((value: { exitCode: number }) => void) | undefined;
    const child = Object.assign(
      new Promise<{ exitCode: number }>((resolve) => {
        resolveProcess = resolve;
      }),
      { stdout, stderr },
    );
    vi.spyOn(gitProcess, "startProcess").mockReturnValue(child as never);

    const pending = runShellCommand("bun test", process.cwd());
    stdout.end(`discard-me${"x".repeat(1024 * 1024)}tail`);
    stderr.end("");
    resolveProcess?.({ exitCode: 0 });
    const result = await pending;

    expect(result.code).toBe(0);
    expect(result.output).toContain("[output truncated; showing last 1048576 bytes]");
    expect(result.output).not.toContain("discard-me");
    expect(result.output.endsWith("tail")).toBe(true);
  });

  it("rejects non-allowlisted verify executables before process start", async () => {
    const gitProcess = await import("@agentplaneorg/core/process");
    const startProcess = vi.spyOn(gitProcess, "startProcess");

    await expect(runShellCommand("custom-runner --version", process.cwd())).resolves.toEqual({
      code: 1,
      output: "verify command executable is not allowed: custom-runner",
    });
    expect(startProcess).not.toHaveBeenCalled();
  });

  it("rejects invalid pr/meta schema shapes", () => {
    expect(() =>
      parsePrMeta(
        JSON.stringify({
          schema_version: 1,
          task_id: "202601010101-ABCDE",
          created_at: 123,
          updated_at: "2026-01-27T00:00:00Z",
        }),
        "202601010101-ABCDE",
      ),
    ).toThrow(/pr\/meta\.json schema validation failed/u);
  });

  it("reads forward-compatible pr/meta variants for branch-artifact consumers", () => {
    expect(
      parsePrMetaForwardCompatible(
        JSON.stringify({
          schema_version: 1,
          task_id: "202601010101-ABCDE",
          branch: "task/202601010101-ABCDE/example",
          created_at: "2026-01-27T00:00:00Z",
          updated_at: "2026-01-28T00:00:00Z",
          status: "FUTURE_OPEN",
          verify: { status: "pass" },
          base: "main",
          artifact_state: "remote_staged",
          artifact_state_reason: "task branch is not published",
          artifact_state_updated_at: "2026-01-28T00:00:00Z",
        }),
        "202601010101-ABCDE",
      ),
    ).toEqual(
      expect.objectContaining({
        task_id: "202601010101-ABCDE",
        branch: "task/202601010101-ABCDE/example",
        created_at: "2026-01-27T00:00:00Z",
        updated_at: "2026-01-28T00:00:00Z",
        status: undefined,
        verify: { status: "pass" },
        base: "main",
        artifact_state: "remote_staged",
        artifact_state_reason: "task branch is not published",
        artifact_state_updated_at: "2026-01-28T00:00:00Z",
      }),
    );
  });

  it("records first-class branch_pr batch metadata alongside legacy related task ids", () => {
    const nextMeta = buildOpenedPrMeta({
      taskId: "202601010101-ABCDE",
      relatedTaskIds: [
        "202601010102-BBBBB",
        "202601010101-ABCDE",
        "202601010103-CCCCC",
        "202601010102-BBBBB",
      ],
      branch: "task/202601010101-ABCDE/example",
      at: "2026-01-27T00:00:00Z",
      previousMeta: null,
      base: "main",
    });

    expect(nextMeta.related_task_ids).toEqual(["202601010102-BBBBB", "202601010103-CCCCC"]);
    expect(nextMeta.batch).toEqual({
      schema_version: 1,
      primary_task_id: "202601010101-ABCDE",
      included_task_ids: ["202601010102-BBBBB", "202601010103-CCCCC"],
      closure_policy: "all_or_fail",
    });
    expect(resolvePrBatchIncludedTaskIds(nextMeta)).toEqual([
      "202601010102-BBBBB",
      "202601010103-CCCCC",
    ]);
  });

  it("preserves pre-merge closure markers when reopening PR metadata", () => {
    const nextMeta = buildOpenedPrMeta({
      taskId: "202601010101-ABCDE",
      branch: "task/202601010101-ABCDE/example",
      at: "2026-01-28T00:00:00Z",
      previousMeta: {
        schema_version: 1,
        task_id: "202601010101-ABCDE",
        branch: "task/202601010101-ABCDE/example",
        created_at: "2026-01-27T00:00:00Z",
        updated_at: "2026-01-27T00:00:00Z",
        verify: { status: "pass" },
        pre_merge_closure: {
          state: "closed_before_merge",
          branch: "task/202601010101-ABCDE/example",
          basis_commit: "abc1234",
          recorded_at: "2026-01-27T01:00:00Z",
        },
      } as never,
      base: "main",
    });

    expect((nextMeta as { pre_merge_closure?: { state?: string } }).pre_merge_closure).toEqual(
      expect.objectContaining({ state: "closed_before_merge" }),
    );
  });

  it("normalizes typed pre-merge closure markers for PR metadata consumers", () => {
    const meta = {
      pre_merge_closure: {
        state: "closed_before_merge",
        branch: " task/202601010101-ABCDE/example ",
        basis_commit: " abc123 ",
        extra_forward_compatible_field: true,
      },
    };

    expect(readPreMergeClosureMarker(meta)).toEqual({
      state: "closed_before_merge",
      branch: "task/202601010101-ABCDE/example",
      basisCommit: "abc123",
    });
    expect(hasClosedPreMergeClosureMarker(meta)).toBe(true);
  });

  it("rejects incomplete pre-merge closure markers", () => {
    for (const marker of [
      null,
      { state: "closed_before_merge", branch: "task/example" },
      { state: "closed_before_merge", basis_commit: "abc123" },
      { state: "closed_before_merge", branch: " ", basis_commit: "abc123" },
      { state: "closed_before_merge", branch: "task/example", basis_commit: " " },
      { state: "planned", branch: "task/example", basis_commit: "abc123" },
    ]) {
      expect(readPreMergeClosureMarker({ pre_merge_closure: marker })).toBeNull();
      expect(hasClosedPreMergeClosureMarker({ pre_merge_closure: marker })).toBe(false);
    }
  });

  it("hydrates batch metadata from legacy related task ids during updates", () => {
    const nextMeta = buildUpdatedPrMeta({
      meta: {
        schema_version: 1,
        task_id: "202601010101-ABCDE",
        related_task_ids: ["202601010102-BBBBB"],
        branch: "task/202601010101-ABCDE/example",
        created_at: "2026-01-27T00:00:00Z",
        updated_at: "2026-01-27T00:00:00Z",
        base: "main",
        verify: { status: "skipped" },
      },
      branch: "task/202601010101-ABCDE/example",
      base: "main",
      at: "2026-01-28T00:00:00Z",
    });

    expect(nextMeta.batch).toEqual({
      schema_version: 1,
      primary_task_id: "202601010101-ABCDE",
      included_task_ids: ["202601010102-BBBBB"],
      closure_policy: "all_or_fail",
    });
  });

  it("derives explicit branch_pr artifact lifecycle states from typed metadata", () => {
    const baseMeta = {
      schema_version: 1 as const,
      task_id: "202601010101-ABCDE",
      branch: "task/202601010101-ABCDE/example",
      created_at: "2026-01-27T00:00:00Z",
      updated_at: "2026-01-27T00:00:00Z",
      verify: { status: "skipped" as const },
    };

    expect(
      derivePrArtifactLifecycleState(
        withPrArtifactLifecycleState(
          baseMeta,
          { kind: "remote_failed", reason: "GitHub auth or permissions unavailable" },
          "2026-01-28T00:00:00Z",
        ),
      ),
    ).toEqual({
      kind: "remote_failed",
      reason: "GitHub auth or permissions unavailable",
    });

    expect(
      derivePrArtifactLifecycleState(
        withPrArtifactLifecycleState(
          baseMeta,
          { kind: "handoff", reason: "Protected base main requires GitHub pull-request merges." },
          "2026-01-28T00:00:00Z",
        ),
      ),
    ).toEqual({
      kind: "handoff",
      reason: "Protected base main requires GitHub pull-request merges.",
    });
  });

  it("builds typed merged PR metadata without record casts", () => {
    expect(
      buildIntegratedPrMeta({
        meta: {
          schema_version: 1,
          task_id: "202601010101-ABCDE",
          branch: "task/202601010101-ABCDE/example",
          created_at: "2026-01-27T00:00:00Z",
          updated_at: "2026-01-27T00:00:00Z",
          verify: { status: "skipped" },
        },
        branch: "task/202601010101-ABCDE/example",
        base: "main",
        mergeStrategy: "squash",
        mergeHash: "deadbeef",
        branchHeadSha: "deadbeef",
        at: "2026-01-28T00:00:00Z",
        verifyCommands: ["bun test"],
        shouldRunVerify: true,
        alreadyVerifiedSha: null,
      }),
    ).toEqual(
      expect.objectContaining({
        base: "main",
        status: "MERGED",
        artifact_state: "merged",
        merge_strategy: "squash",
        merge_commit: "deadbeef",
        merged_at: "2026-01-28T00:00:00Z",
        last_verified_at: "2026-01-28T00:00:00Z",
      }),
    );
  });

  it("records head-scoped verification metadata without changing render timestamps", () => {
    expect(
      buildVerifiedPrMeta({
        meta: {
          schema_version: 1,
          task_id: "202601010101-ABCDE",
          branch: "task/202601010101-ABCDE/example",
          created_at: "2026-01-27T00:00:00Z",
          updated_at: "2026-01-27T00:00:00Z",
          verify: { status: "skipped" },
        },
        at: "2026-01-28T00:00:00Z",
        state: "pass",
      }),
    ).toEqual(
      expect.objectContaining({
        updated_at: "2026-01-27T00:00:00Z",
        last_verified_at: "2026-01-28T00:00:00Z",
        verify: { status: "pass" },
      }),
    );
  });

  it("hydrates observed remote PR identity without disturbing stable timestamps", () => {
    expect(
      buildObservedGithubPrMeta({
        meta: {
          schema_version: 1,
          task_id: "202601010101-ABCDE",
          branch: "task/202601010101-ABCDE/example",
          created_at: "2026-01-27T00:00:00Z",
          updated_at: "2026-01-27T00:00:00Z",
          verify: { status: "skipped" },
        },
        observed: {
          prNumber: 321,
          prUrl: "https://github.com/example/repo/pull/321",
          status: "OPEN",
          base: "main",
        },
        at: "2026-01-28T00:00:00Z",
      }),
    ).toEqual(
      expect.objectContaining({
        pr_number: 321,
        pr_url: "https://github.com/example/repo/pull/321",
        status: "OPEN",
        base: "main",
        updated_at: "2026-01-28T00:00:00Z",
      }),
    );
  });

  it("clears stale remote failure lifecycle when an open GitHub PR is observed", () => {
    const meta = buildObservedGithubPrMeta({
      meta: {
        schema_version: 1,
        task_id: "202601010101-ABCDE",
        branch: "task/202601010101-ABCDE/example",
        created_at: "2026-01-27T00:00:00Z",
        updated_at: "2026-01-27T00:00:00Z",
        artifact_state: "remote_failed",
        artifact_state_reason: "GitHub auth or permissions unavailable",
        artifact_state_updated_at: "2026-01-27T00:10:00Z",
        verify: { status: "skipped" },
      },
      observed: {
        prNumber: 321,
        prUrl: "https://github.com/example/repo/pull/321",
        status: "OPEN",
        base: "main",
      },
      at: "2026-01-28T00:00:00Z",
    });

    expect(meta).toEqual(
      expect.objectContaining({
        pr_number: 321,
        pr_url: "https://github.com/example/repo/pull/321",
        status: "OPEN",
        base: "main",
        updated_at: "2026-01-28T00:00:00Z",
      }),
    );
    expect(meta.artifact_state).toBeUndefined();
    expect(meta.artifact_state_reason).toBeUndefined();
    expect(meta.artifact_state_updated_at).toBeUndefined();
  });

  it("keeps updated_at byte-stable when observed remote PR identity is unchanged", () => {
    expect(
      buildObservedGithubPrMeta({
        meta: {
          schema_version: 1,
          task_id: "202601010101-ABCDE",
          branch: "task/202601010101-ABCDE/example",
          created_at: "2026-01-27T00:00:00Z",
          updated_at: "2026-01-27T00:00:00Z",
          pr_number: 321,
          pr_url: "https://github.com/example/repo/pull/321",
          status: "OPEN",
          base: "main",
          verify: { status: "skipped" },
        },
        observed: {
          prNumber: 321,
          prUrl: "https://github.com/example/repo/pull/321",
          status: "OPEN",
          base: "main",
        },
        at: "2026-01-28T00:00:00Z",
      }).updated_at,
    ).toBe("2026-01-27T00:00:00Z");
  });

  it("preserves the local rendered head when GitHub still reports an older remote head", () => {
    expect(
      buildObservedGithubPrMeta({
        meta: {
          schema_version: 1,
          task_id: "202601010101-ABCDE",
          branch: "task/202601010101-ABCDE/example",
          created_at: "2026-01-27T00:00:00Z",
          updated_at: "2026-01-27T00:00:00Z",
          pr_number: 321,
          pr_url: "https://github.com/example/repo/pull/321",
          status: "OPEN",
          base: "main",
          verify: { status: "skipped" },
        },
        observed: {
          prNumber: 321,
          prUrl: "https://github.com/example/repo/pull/321",
          status: "OPEN",
          base: "main",
        },
        at: "2026-01-28T00:00:00Z",
      }).updated_at,
    ).toBe("2026-01-27T00:00:00Z");
  });

  it("keeps metadata byte-stable for task-local-only advances because live head is computed at runtime", () => {
    const nextMeta = buildUpdatedPrMeta({
      meta: {
        schema_version: 1,
        task_id: "202601010101-ABCDE",
        branch: "task/202601010101-ABCDE/example",
        created_at: "2026-01-27T00:00:00Z",
        updated_at: "2026-01-27T00:00:00Z",
        base: "main",
        verify: { status: "skipped" },
      },
      branch: "task/202601010101-ABCDE/example",
      base: "main",
      at: "2026-01-28T00:00:00Z",
    });

    expect(nextMeta.head_sha).toBeUndefined();
    expect(nextMeta.updated_at).toBe("2026-01-27T00:00:00Z");
  });
});
