import { beforeEach, describe, expect, it, vi } from "vitest";

import { parseCommandArgv } from "../../cli/spec/parse.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import type * as AgentWorkOrderModule from "../../runner/usecases/agent-work-order.js";
import type { CommandContext } from "../shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  prepareAgentWorkOrder: vi.fn(),
}));

vi.mock("../../runner/usecases/agent-work-order.js", async (importOriginal) => {
  const actual = await importOriginal<typeof AgentWorkOrderModule>();
  return { ...actual, prepareAgentWorkOrder: mocks.prepareAgentWorkOrder };
});

import {
  makeRunTaskAuthorityGrantHandler,
  taskAuthorityGrantSpec,
} from "./authority-grant.command.js";

describe("task authority grant", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.prepareAgentWorkOrder.mockRejectedValue(new Error("stop after context selection"));
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

  it("accepts a signed receipt in place of a direct actor", () => {
    expect(
      parseCommandArgv(taskAuthorityGrantSpec, [
        "T-1",
        "--operation",
        "pr.open",
        "--operation-digest",
        "sha256:operation",
        "--state-fingerprint",
        "sha256:fingerprint",
        "--state-scope-digest",
        "sha256:scope",
        "--approval-receipt",
        "signed-receipt",
      ]),
    ).toMatchObject({
      parsed: {
        taskId: "T-1",
        approvalReceipt: "signed-receipt",
        by: undefined,
      },
    });
  });

  it("requires exactly one user-evidence channel", () => {
    const base = [
      "T-1",
      "--operation",
      "pr.open",
      "--operation-digest",
      "sha256:operation",
      "--state-fingerprint",
      "sha256:fingerprint",
      "--state-scope-digest",
      "sha256:scope",
    ];

    expect(() => parseCommandArgv(taskAuthorityGrantSpec, base)).toThrow(
      "exactly one of --by or --approval-receipt",
    );
    expect(() =>
      parseCommandArgv(taskAuthorityGrantSpec, [
        ...base,
        "--by",
        "USER",
        "--approval-receipt",
        "signed-receipt",
      ]),
    ).toThrow("exactly one of --by or --approval-receipt");
  });

  it.each([
    { remote: false, selected: "local" },
    { remote: true, selected: "remote" },
  ] as const)(
    "selects the $selected route context before rebuilding authority",
    async (testCase) => {
      const commandContext = {} as CommandContext;
      const writeCommandContext = { config: {} } as CommandContext;
      const getLocalContext = vi.fn(() => Promise.resolve(commandContext));
      const getRemoteContext = vi.fn(() => Promise.resolve(commandContext));
      const getLocalWriteContext = vi.fn(() => Promise.resolve(writeCommandContext));
      const getRemoteWriteContext = vi.fn(() => Promise.resolve(writeCommandContext));
      const run = makeRunTaskAuthorityGrantHandler({
        getLocalContext,
        getRemoteContext,
        getLocalWriteContext,
        getRemoteWriteContext,
      });

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
      if (!testCase.remote) {
        expect(getLocalContext).toHaveBeenCalledWith("task authority grant", "/repo", null);
      }
      expect(getLocalWriteContext).not.toHaveBeenCalled();
      expect(getRemoteWriteContext).not.toHaveBeenCalled();
      expect(mocks.prepareAgentWorkOrder).toHaveBeenCalledWith({
        command_ctx: commandContext,
        cwd: "/repo",
        root_override: null,
        task_id: "T-1",
        ...(testCase.remote ? { include_remote: true } : {}),
      });
    },
  );

  it("rebuilds authority from the same canonical WorkOrder route as task next-action", async () => {
    const commandContext = {} as CommandContext;
    mocks.prepareAgentWorkOrder.mockResolvedValue({
      status: "prepared",
      value: {
        route_decision: {
          workflowStep: { kind: "cli_operation", id: "task.pre_merge_close" },
        },
      },
    });
    const run = makeRunTaskAuthorityGrantHandler({
      getLocalContext: vi.fn(() => Promise.resolve(commandContext)),
      getRemoteContext: vi.fn(() => Promise.resolve(commandContext)),
      getLocalWriteContext: vi.fn(() => Promise.resolve(commandContext)),
      getRemoteWriteContext: vi.fn(() => Promise.resolve(commandContext)),
    });

    await expect(
      run({ cwd: "/repo", rootOverride: null } as CommandCtx, {
        taskId: "T-1",
        operationId: "pr.open",
        operationDigest: "sha256:operation",
        stateFingerprintDigest: "sha256:fingerprint",
        stateScopeDigest: "sha256:scope",
        by: "USER",
        ttlMinutes: 15,
        remote: false,
      }),
    ).rejects.toThrow(/recomputed local route.*cli_operation:task\.pre_merge_close/su);
  });

  it("explains hosted route drift when the requested authority boundary has already moved", async () => {
    const commandContext = {} as CommandContext;
    mocks.prepareAgentWorkOrder.mockResolvedValue({
      status: "prepared",
      value: {
        route_decision: {
          workflowStep: { kind: "cli_operation", id: "task.pre_merge_close" },
        },
      },
    });
    const run = makeRunTaskAuthorityGrantHandler({
      getLocalContext: vi.fn(() => Promise.resolve(commandContext)),
      getRemoteContext: vi.fn(() => Promise.resolve(commandContext)),
      getLocalWriteContext: vi.fn(() => Promise.resolve(commandContext)),
      getRemoteWriteContext: vi.fn(() => Promise.resolve(commandContext)),
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
