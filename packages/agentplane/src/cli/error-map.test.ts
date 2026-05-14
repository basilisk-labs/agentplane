import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { mapBackendError, mapCoreError, writeError } from "./error-map.js";
import { ExitCode } from "./exit-codes.js";
import {
  BackendCliError,
  CliError,
  GitError,
  IoError,
  NetworkError,
  UsageError,
  ValidationError,
} from "../shared/errors.js";
import { BackendError } from "../backends/task-backend.js";

describe("core error mapping", () => {
  it("maps git repository errors to E_GIT", () => {
    const mapped = mapCoreError(new Error("Not a git repository"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(GitError);
    expect(mapped.code).toBe("E_GIT");
    expect(mapped.exitCode).toBe(ExitCode.Git);
  });

  it("maps detached HEAD branch-resolution errors to E_GIT", () => {
    const mapped = mapCoreError(new Error("Detached HEAD: failed to resolve current branch"), {
      cmd: "x",
    });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(GitError);
    expect(mapped.code).toBe("E_GIT");
    expect(mapped.exitCode).toBe(ExitCode.Git);
  });

  it("maps syntax errors to E_VALIDATION", () => {
    const mapped = mapCoreError(new SyntaxError("Unexpected token"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(ValidationError);
    expect(mapped.code).toBe("E_VALIDATION");
    expect(mapped.exitCode).toBe(ExitCode.Validation);
  });

  it("maps ZodError causes through zod-validation-error", () => {
    const parsed = z
      .object({ workflow_mode: z.enum(["direct", "branch_pr"]) })
      .safeParse({ workflow_mode: "invalid" });
    expect(parsed.success).toBe(false);
    if (parsed.success) return;

    const err = new Error("config/workflow_mode") as Error & { cause?: unknown };
    err.cause = parsed.error;

    const mapped = mapCoreError(err, { cmd: "config show" });
    expect(mapped).toBeInstanceOf(ValidationError);
    expect(mapped.code).toBe("E_VALIDATION");
    expect(mapped.message).toContain("Validation error:");
    expect(mapped.message).toContain("Invalid enum value");
    expect(mapped.message).toContain('"workflow_mode"');
  });

  it("maps other errors to E_IO", () => {
    const mapped = mapCoreError(new Error("boom"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(IoError);
    expect(mapped.code).toBe("E_IO");
    expect(mapped.exitCode).toBe(ExitCode.Io);
  });

  it("passes backend errors through", () => {
    const mapped = mapBackendError(new BackendError("nope", "E_BACKEND"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(BackendCliError);
    expect(mapped.code).toBe("E_BACKEND");
    expect(mapped.exitCode).toBe(ExitCode.Backend);
  });

  it("maps backend network errors to NetworkError", () => {
    const mapped = mapBackendError(new BackendError("offline", "E_NETWORK"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(NetworkError);
    expect(mapped.code).toBe("E_NETWORK");
    expect(mapped.exitCode).toBe(ExitCode.Network);
  });

  it("writes text errors with guidance from the central render pipeline", () => {
    let stderr = "";
    const spy = vi.spyOn(process.stderr, "write").mockImplementation((chunk) => {
      stderr += String(chunk);
      return true;
    });

    try {
      writeError(
        new GitError({ message: "bad branch", context: { command: "branch status" } }),
        false,
      );
    } finally {
      spy.mockRestore();
    }

    expect(stderr).toContain("error [E_GIT]: bad branch");
    expect(stderr).toContain(
      "hint: Check git repo/branch; run `git branch` or pass --root <path>.",
    );
    expect(stderr).toContain("next_action: git branch (inspect repository branch state)");
  });

  it("writes JSON errors with reason-code metadata from the central render pipeline", () => {
    let stdout = "";
    const spy = vi.spyOn(process.stdout, "write").mockImplementation((chunk) => {
      stdout += String(chunk);
      return true;
    });

    try {
      writeError(
        new UsageError({ message: "missing args", context: { command: "config set" } }),
        true,
      );
    } finally {
      spy.mockRestore();
    }

    const payload = JSON.parse(stdout) as {
      error?: {
        code?: string;
        next_action?: { command?: string };
        reason_decode?: { code?: string };
      };
    };
    expect(payload.error?.code).toBe("E_USAGE");
    expect(payload.error?.next_action?.command).toBe("agentplane help config set --compact");
    expect(payload.error?.reason_decode?.code).toBe("usage_help");
  });

  it("always suggests the opt-in feedback issue path for internal errors", () => {
    let stderr = "";
    const spy = vi.spyOn(process.stderr, "write").mockImplementation((chunk) => {
      stderr += String(chunk);
      return true;
    });

    try {
      writeError(new CliError({ code: "E_INTERNAL", message: "unexpected invariant" }), false);
    } finally {
      spy.mockRestore();
    }

    expect(stderr).toContain("error [E_INTERNAL]: unexpected invariant");
    expect(stderr).toContain("privacy-bounded GitHub issue");
    expect(stderr).toContain("agentplane insights issue --error-code E_INTERNAL --dry-run");
    expect(stderr).toContain("feedback.github_issues.enabled true");
    expect(stderr).toContain("reason_code: feedback_internal_error_report");
  });
});
