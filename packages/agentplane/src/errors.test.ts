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

    const json = JSON.parse(formatJsonError(err)) as unknown;
    expect(json).toEqual({
      error: {
        code: "E_USAGE",
        message: "Bad args",
        context: { command: "config set" },
      },
    });
  });
});
