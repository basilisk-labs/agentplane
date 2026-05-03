import os from "node:os";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  buildObservedGithubPrMeta,
  buildOpenedPrMeta,
  buildIntegratedPrMeta,
  buildUpdatedPrMeta,
  buildVerifiedPrMeta,
  derivePrArtifactLifecycleState,
  parsePrMetaForwardCompatible,
  parsePrMeta,
  resolvePrBatchIncludedTaskIds,
  resolvePrArtifactHeadSha,
  resolveShellInvocation,
  runShellCommand,
  withPrArtifactLifecycleState,
} from "./pr-meta.js";

describe("pr-meta shell invocations", () => {
  let originalComspec: string | undefined;
  let originalComSpec: string | undefined;

  beforeEach(() => {
    originalComspec = process.env.COMSPEC;
    originalComSpec = process.env.ComSpec;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env.COMSPEC = originalComspec;
    process.env.ComSpec = originalComSpec;
  });

  it("uses POSIX shell on non-Windows", () => {
    vi.spyOn(os, "platform").mockReturnValue("linux");
    expect(resolveShellInvocation("echo hello")).toEqual({
      command: "sh",
      args: ["-lc", "echo hello"],
    });
  });

  it("uses cmd.exe on Windows", () => {
    vi.spyOn(os, "platform").mockReturnValue("win32");
    delete process.env.COMSPEC;
    delete process.env.ComSpec;
    expect(resolveShellInvocation("echo hello")).toEqual({
      command: "cmd.exe",
      args: ["/d", "/s", "/c", "echo hello"],
    });
  });

  it("uses COMSPEC when provided", () => {
    vi.spyOn(os, "platform").mockReturnValue("win32");
    delete process.env.ComSpec;
    process.env.COMSPEC = "custom-cmd.exe";
    expect(resolveShellInvocation("echo hello")).toEqual({
      command: "custom-cmd.exe",
      args: ["/d", "/s", "/c", "echo hello"],
    });
  });

  it("uses current shell invocation for command execution", async () => {
    vi.spyOn(os, "platform").mockReturnValue("win32");
    delete process.env.COMSPEC;
    delete process.env.ComSpec;
    const gitProcess = await import("@agentplaneorg/core/process");
    const execFileAsync = vi.spyOn(gitProcess, "execFileAsync").mockResolvedValue({
      stdout: "ok",
      stderr: "",
    });

    const result = await runShellCommand("echo hello", process.cwd());

    expect(execFileAsync).toHaveBeenCalledWith(
      "cmd.exe",
      ["/d", "/s", "/c", "echo hello"],
      expect.objectContaining({ cwd: process.cwd() }),
    );
    expect(result).toEqual({ code: 0, output: "ok" });
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
          head_sha: "deadbeef",
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
        head_sha: "deadbeef",
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
      headSha: "deadbeef",
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
        head_sha: "deadbeef",
        verify: { status: "skipped" },
      },
      branch: "task/202601010101-ABCDE/example",
      base: "main",
      headSha: "deadbeef",
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
        head_sha: "deadbeef",
        merged_at: "2026-01-28T00:00:00Z",
        last_verified_sha: "deadbeef",
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
          head_sha: "deadbeef",
          verify: { status: "skipped" },
        },
        at: "2026-01-28T00:00:00Z",
        state: "pass",
      }),
    ).toEqual(
      expect.objectContaining({
        updated_at: "2026-01-27T00:00:00Z",
        head_sha: "deadbeef",
        last_verified_sha: "deadbeef",
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
          head_sha: "deadbeef",
          verify: { status: "skipped" },
        },
        observed: {
          prNumber: 321,
          prUrl: "https://github.com/example/repo/pull/321",
          status: "OPEN",
          base: "main",
          headSha: "deadbeef",
        },
        at: "2026-01-28T00:00:00Z",
      }),
    ).toEqual(
      expect.objectContaining({
        pr_number: 321,
        pr_url: "https://github.com/example/repo/pull/321",
        status: "OPEN",
        base: "main",
        head_sha: "deadbeef",
        updated_at: "2026-01-28T00:00:00Z",
      }),
    );
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
          head_sha: "deadbeef",
          verify: { status: "skipped" },
        },
        observed: {
          prNumber: 321,
          prUrl: "https://github.com/example/repo/pull/321",
          status: "OPEN",
          base: "main",
          headSha: "deadbeef",
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
          head_sha: "deadbeef",
          verify: { status: "skipped" },
        },
        observed: {
          prNumber: 321,
          prUrl: "https://github.com/example/repo/pull/321",
          status: "OPEN",
          base: "main",
          headSha: "cafebabe",
        },
        at: "2026-01-28T00:00:00Z",
      }).head_sha,
    ).toBe("deadbeef");
  });

  it("preserves the previous rendered head for task-local-only advances", () => {
    const effectiveHeadSha = resolvePrArtifactHeadSha({
      previousHeadSha: "deadbeef",
      currentHeadSha: "cafebabe",
      preservePrevious: true,
    });

    const nextMeta = buildUpdatedPrMeta({
      meta: {
        schema_version: 1,
        task_id: "202601010101-ABCDE",
        branch: "task/202601010101-ABCDE/example",
        created_at: "2026-01-27T00:00:00Z",
        updated_at: "2026-01-27T00:00:00Z",
        base: "main",
        head_sha: "deadbeef",
        verify: { status: "skipped" },
      },
      branch: "task/202601010101-ABCDE/example",
      base: "main",
      headSha: effectiveHeadSha,
      at: "2026-01-28T00:00:00Z",
    });

    expect(nextMeta.head_sha).toBe("deadbeef");
    expect(nextMeta.updated_at).toBe("2026-01-27T00:00:00Z");
  });
});
