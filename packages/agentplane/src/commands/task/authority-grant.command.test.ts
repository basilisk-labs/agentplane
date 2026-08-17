import { beforeEach, describe, expect, it, vi } from "vitest";

import { parseCommandArgv } from "../../cli/spec/parse.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  buildTaskRouteDecision: vi.fn(),
}));

vi.mock("../shared/route-decision.js", () => ({
  buildTaskRouteDecision: mocks.buildTaskRouteDecision,
}));

import {
  makeRunTaskAuthorityGrantHandler,
  taskAuthorityGrantSpec,
} from "./authority-grant.command.js";

describe("task authority grant", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.buildTaskRouteDecision.mockRejectedValue(new Error("stop after context selection"));
  });

  it("preserves the explicit hosted-route context emitted by task next-action", () => {
    expect(
      parseCommandArgv(taskAuthorityGrantSpec, [
        "T-1",
        "--remote",
        "--operation",
        "task.pre_merge_close",
        "--operation-digest",
        "sha256:operation",
        "--state-fingerprint",
        "sha256:fingerprint",
        "--state-scope-digest",
        "sha256:scope",
        "--by",
        "USER",
      ]),
    ).toMatchObject({
      parsed: {
        taskId: "T-1",
        operationId: "task.pre_merge_close",
        remote: true,
      },
    });
  });

  it.each([
    { remote: false, selected: "local" },
    { remote: true, selected: "remote" },
  ] as const)(
    "selects the $selected route context before rebuilding authority",
    async (testCase) => {
      const commandContext = {} as CommandContext;
      const getLocalContext = vi.fn(() => Promise.resolve(commandContext));
      const getRemoteContext = vi.fn(() => Promise.resolve(commandContext));
      const run = makeRunTaskAuthorityGrantHandler({ getLocalContext, getRemoteContext });

      await expect(
        run({ cwd: "/repo", rootOverride: null } as CommandCtx, {
          taskId: "T-1",
          operationId: "pr.open",
          operationDigest: "sha256:operation",
          stateFingerprintDigest: "sha256:fingerprint",
          stateScopeDigest: "sha256:scope",
          by: "USER",
          ttlMinutes: 15,
          remote: testCase.remote,
        }),
      ).rejects.toThrow("stop after context selection");

      expect(getLocalContext).toHaveBeenCalledTimes(testCase.remote ? 0 : 1);
      expect(getRemoteContext).toHaveBeenCalledTimes(testCase.remote ? 1 : 0);
    },
  );

  it("explains hosted route drift when the requested authority boundary has already moved", async () => {
    const commandContext = {} as CommandContext;
    mocks.buildTaskRouteDecision.mockResolvedValue({
      workflowStep: { kind: "cli_operation", id: "task.pre_merge_close" },
    });
    const run = makeRunTaskAuthorityGrantHandler({
      getLocalContext: vi.fn(() => Promise.resolve(commandContext)),
      getRemoteContext: vi.fn(() => Promise.resolve(commandContext)),
    });

    await expect(
      run({ cwd: "/repo", rootOverride: null } as CommandCtx, {
        taskId: "T-1",
        operationId: "task.pre_merge_close",
        operationDigest: "sha256:operation",
        stateFingerprintDigest: "sha256:fingerprint",
        stateScopeDigest: "sha256:scope",
        by: "USER",
        ttlMinutes: 15,
        remote: true,
      }),
    ).rejects.toThrow(
      /Authority request is stale:.*cli_operation:task\.pre_merge_close.*next-action T-1 --remote --explain/su,
    );
  });
});
