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
      },
    });
  });
});
