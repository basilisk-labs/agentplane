import os from "node:os";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as git from "./git.js";
import {
  buildObservedGithubPrMeta,
  buildIntegratedPrMeta,
  buildVerifiedPrMeta,
  parsePrMeta,
  resolveShellInvocation,
  runShellCommand,
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
    const execFileAsync = vi.spyOn(git, "execFileAsync").mockResolvedValue({
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
});
