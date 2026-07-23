import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  runProcess: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({
  runProcess: mocks.runProcess,
}));

import { waitForHostedChecks } from "./hosted-checks.js";

function result(exitCode: number, rows: unknown, stderr = "") {
  return {
    exitCode,
    stdout: JSON.stringify(rows),
    stderr,
  };
}

describe("waitForHostedChecks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("classifies unavailable provider checks as external unavailability", async () => {
    mocks.runProcess.mockResolvedValue(result(1, [], "authentication required"));

    await expect(
      waitForHostedChecks({
        gitRoot: "/repo",
        prNumber: 101,
        stablePolls: 1,
        pollIntervalMs: 0,
        timeoutMs: 1,
        quiet: true,
      }),
    ).rejects.toMatchObject({
      code: "E_NETWORK",
      context: { reason_code: "hosted_checks_unavailable" },
    });
  });

  it("keeps pending checks as a handoff at timeout", async () => {
    mocks.runProcess.mockResolvedValue(result(0, [{ name: "PR verification", state: "PENDING" }]));

    await expect(
      waitForHostedChecks({
        gitRoot: "/repo",
        prNumber: 101,
        stablePolls: 1,
        pollIntervalMs: 0,
        timeoutMs: 1,
        quiet: true,
      }),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
      context: { reason_code: "hosted_checks_pending" },
    });
  });

  it("keeps confirmed failing checks as semantic validation failure", async () => {
    mocks.runProcess.mockResolvedValue(result(0, [{ name: "PR verification", state: "FAILURE" }]));

    await expect(
      waitForHostedChecks({
        gitRoot: "/repo",
        prNumber: 101,
        stablePolls: 1,
        pollIntervalMs: 0,
        timeoutMs: 1,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it.each([null, "STALE", "NEW_PROVIDER_STATE"])(
    "keeps unknown check state %s non-ready",
    async (state) => {
      mocks.runProcess.mockResolvedValue(result(0, [{ name: "PR verification", state }]));

      await expect(
        waitForHostedChecks({
          gitRoot: "/repo",
          prNumber: 101,
          stablePolls: 1,
          pollIntervalMs: 0,
          timeoutMs: 1,
          quiet: true,
        }),
      ).rejects.toMatchObject({
        code: "E_HANDOFF",
        context: { reason_code: "hosted_checks_pending" },
      });
    },
  );

  it.each(["SKIPPED", "NEUTRAL"])("accepts documented successful state %s", async (state) => {
    mocks.runProcess.mockResolvedValue(result(0, [{ name: "PR verification", state }]));

    await expect(
      waitForHostedChecks({
        gitRoot: "/repo",
        prNumber: 101,
        stablePolls: 1,
        pollIntervalMs: 0,
        timeoutMs: 1,
        quiet: true,
      }),
    ).resolves.toMatchObject({ checked: true, passing: 1, pending: 0, failing: 0 });
  });
});
