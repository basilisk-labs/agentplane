import { describe, expect, it } from "vitest";

import { CliError, formatJsonError } from "./errors.js";

describe("errors", () => {
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
});
