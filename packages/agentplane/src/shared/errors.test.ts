import { describe, expect, it } from "vitest";

import {
  AgentplaneError,
  BackendCliError,
  CliError,
  GitError,
  InternalError,
  IoError,
  NetworkError,
  RuntimeError,
  UsageError,
  ValidationError,
  JSON_ERROR_CONTRACT,
  formatJsonError,
} from "./errors.js";

describe("errors", () => {
  it("domain subclasses preserve the CliError compatibility contract", () => {
    const cases = [
      [new UsageError({ message: "usage" }), "E_USAGE", 2],
      [new ValidationError({ message: "validation" }), "E_VALIDATION", 3],
      [new IoError({ message: "io" }), "E_IO", 4],
      [new GitError({ message: "git" }), "E_GIT", 5],
      [new BackendCliError({ message: "backend" }), "E_BACKEND", 6],
      [new NetworkError({ message: "network" }), "E_NETWORK", 7],
      [new RuntimeError({ message: "runtime" }), "E_RUNTIME", 8],
      [new InternalError({ message: "internal" }), "E_INTERNAL", 1],
    ] as const;

    for (const [err, code, exitCode] of cases) {
      expect(err).toBeInstanceOf(AgentplaneError);
      expect(err).toBeInstanceOf(CliError);
      expect(err.code).toBe(code);
      expect(err.exitCode).toBe(exitCode);
      expect(err.name).toBe(err.constructor.name);
    }
  });

  it("formatJsonError emits stable shape", () => {
    const err = new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Bad args",
      context: { command: "config set" },
    });

    const json = JSON.parse(
      formatJsonError(err, {
        hint: "See `agentplane help config set --compact` for usage.",
        nextAction: {
          command: "agentplane help config set --compact",
          reason: "inspect required arguments",
          reasonCode: "usage_help",
        },
        reasonDecode: {
          code: "usage_help",
          category: "usage",
          summary: "command invocation is incomplete or invalid",
          action: "open command help and fix required args/flags",
        },
      }),
    ) as unknown;
    expect(json).toEqual({
      error: {
        code: "E_USAGE",
        message: "Bad args",
        context: { command: "config set" },
        hint: "See `agentplane help config set --compact` for usage.",
        next_action: {
          command: "agentplane help config set --compact",
          reason: "inspect required arguments",
          reasonCode: "usage_help",
        },
        reason_decode: {
          code: "usage_help",
          category: "usage",
          summary: "command invocation is incomplete or invalid",
          action: "open command help and fix required args/flags",
        },
      },
    });
  });

  it("formatJsonError includes explicit state-oriented guidance when provided", () => {
    const err = new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: "Dirty tree",
      context: { command: "release apply" },
    });

    const json = JSON.parse(
      formatJsonError(err, {
        state: "release apply cannot start from a dirty tracked tree",
        likelyCause: "tracked edits already exist in the workspace",
        nextAction: {
          command: "git status --short --untracked-files=no",
          reason: "inspect tracked changes before rerunning release apply",
          reasonCode: "release_dirty_tree",
        },
      }),
    ) as {
      error?: { state?: string; likely_cause?: string; next_action?: { command?: string } };
    };

    expect(json.error?.state).toBe("release apply cannot start from a dirty tracked tree");
    expect(json.error?.likely_cause).toBe("tracked edits already exist in the workspace");
    expect(json.error?.next_action?.command).toBe("git status --short --untracked-files=no");
  });

  it("keeps runtime JSON metadata aligned with the fully populated envelope", () => {
    const json = JSON.parse(
      formatJsonError(
        new CliError({
          code: "E_GIT",
          message: "Git failed",
          context: { command: "work start" },
        }),
        {
          state: "base branch is stale",
          likelyCause: "origin/main advanced",
          hint: "Refresh the base branch.",
          remediation: {
            code: "stale_base",
            why: "Starting from stale state can produce an invalid PR.",
            fix: "Fast-forward the base branch.",
            safeCommand: "git pull --ff-only",
            stopCondition: "Stop if the pull is not a fast-forward.",
          },
          nextAction: Object.assign(
            {
              command: "git pull --ff-only",
              reason: "refresh the base branch",
              reasonCode: "stale_base",
            },
            { unexpected: "must not leak" },
          ),
          reasonDecode: Object.assign(
            {
              code: "stale_base",
              category: "git",
              summary: "base branch is behind its upstream",
              action: "refresh the base branch",
            },
            { unexpected: "must not leak" },
          ),
        },
      ),
    ) as {
      error: Record<string, unknown> & {
        remediation: Record<string, unknown>;
        next_action: Record<string, unknown>;
        reason_decode: Record<string, unknown>;
      };
    };

    expect(Object.keys(json)).toEqual([JSON_ERROR_CONTRACT.rootField]);
    expect(Object.keys(json.error)).toEqual([
      ...JSON_ERROR_CONTRACT.error.requiredFields,
      ...JSON_ERROR_CONTRACT.error.optionalFields,
    ]);
    for (const [field, contract] of Object.entries(JSON_ERROR_CONTRACT.nestedObjects)) {
      const nested = json.error[field] as Record<string, unknown>;
      expect(Object.keys(nested)).toEqual([...contract.requiredFields, ...contract.optionalFields]);
    }
  });
});
