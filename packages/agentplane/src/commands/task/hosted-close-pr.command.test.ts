import { describe, expect, it } from "vitest";

import { usageError } from "../../cli/spec/errors.js";

import { taskHostedClosePrSpec } from "./hosted-close-pr.command.js";

describe("taskHostedClosePrSpec", () => {
  it("parses multiple task ids for batch hosted-close-pr opening", () => {
    const parsed = taskHostedClosePrSpec.parse({
      args: { "task-id": ["202604091725-CB0Y6S", "202604091725-H21SCP"] },
      opts: {},
      tokens: [],
    } as never);

    expect(parsed).toEqual({
      taskIds: ["202604091725-CB0Y6S", "202604091725-H21SCP"],
      branch: null,
      repo: null,
    });
  });

  it("rejects empty task-id batches", () => {
    expect(() =>
      taskHostedClosePrSpec.validateRaw?.({
        args: { "task-id": [] },
        opts: {},
        tokens: [],
      } as never),
    ).toThrowError(usageError({ spec: taskHostedClosePrSpec, message: "Invalid value for task-id: empty." }).message);
  });
});
