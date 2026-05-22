import { describe, expect, it } from "vitest";

import { usageError } from "../../cli/spec/errors.js";
import { captureStdIO } from "@agentplane/testkit";

import { taskHostedClosePrSpec } from "./hosted-close-pr.command.js";
import { reportHostedClosePrExecutionResult } from "./hosted-close-pr.report.js";

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
    ).toThrowError(
      usageError({ spec: taskHostedClosePrSpec, message: "Invalid value for task-id: empty." })
        .message,
    );
  });

  it("suppresses hosted-close-pr report output in silent mode", () => {
    const io = captureStdIO();
    try {
      reportHostedClosePrExecutionResult(
        {
          notices: [{ level: "info", message: "opening close tail" }],
          outcome: {
            kind: "created-pr",
            taskId: "202604091725-CB0Y6S",
            closeBranch: "task-close/202604091725-CB0Y6S/abc123",
            prNumber: 123,
            prUrl: "https://example.invalid/pull/123",
          },
        },
        { silent: true },
      );
      expect(io.stdout).toBe("");
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }
  });
});
