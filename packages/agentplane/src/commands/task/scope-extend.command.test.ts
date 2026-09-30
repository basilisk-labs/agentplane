import { afterEach, describe, expect, it, vi } from "vitest";
import * as taskBackend from "../shared/task-backend.js";
import * as kernelRuntime from "./kernel-runtime-context.js";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { cmdTaskScopeExtend } from "./scope-extend.js";
import { parseCommandArgv } from "../../cli/spec/parse.js";
import { taskScopeExtendSpec } from "./scope-extend.command.js";

const REQUEST_DIGEST = `sha256:${"1".repeat(64)}`;
const STATE_SCOPE_DIGEST = `sha256:${"2".repeat(64)}`;
const STATE_FINGERPRINT = `sha256:${"3".repeat(64)}`;

afterEach(() => vi.restoreAllMocks());

describe("canonical scope grant ownership", () => {
  it("uses the resolved owner context without changing the approval binding", async () => {
    const ctx = {
      taskBackend: {
        getTask: vi.fn().mockResolvedValue({ extensions: { [TASK_KERNEL_EXTENSION]: {} } }),
      },
    } as unknown as taskBackend.CommandContext;
    const owner = { ...ctx, backendId: "authoritative-test-backend" };
    const resolve = vi
      .spyOn(taskBackend, "resolveTaskOwnerCommandContext")
      .mockResolvedValue(owner);
    const approveDelta = vi.fn().mockResolvedValue({ kind: "committed" });
    const create = vi.spyOn(kernelRuntime, "createKernelRuntime").mockResolvedValue({
      authority: { approveDelta },
    } as never);
    await expect(
      cmdTaskScopeExtend({
        ctx,
        taskId: "T-1",
        scopeRoots: ["source.ts"],
        repositoryEffects: ["source_code"],
        requestDigest: REQUEST_DIGEST,
        stateScopeDigest: REQUEST_DIGEST,
        by: "USER",
        quiet: true,
      }),
    ).resolves.toBe(0);
    expect(resolve).toHaveBeenCalledWith({ ctx, taskId: "T-1" });
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        command: owner,
        approval: { kind: "manual_operator", actor_id: "USER", invocation_id: REQUEST_DIGEST },
      }),
    );
    expect(approveDelta).toHaveBeenCalledWith(
      expect.objectContaining({
        task_id: "T-1",
        scope_roots: ["source.ts"],
        repository_effects: ["source_code"],
        request_digest: REQUEST_DIGEST,
      }),
    );
  });

  it.each([
    { by: "EXECUTOR", stateScopeDigest: REQUEST_DIGEST },
    { by: "USER", stateScopeDigest: STATE_SCOPE_DIGEST },
  ])(
    "rejects invalid authority before resolving writable storage: $by $stateScopeDigest",
    async (approval) => {
      const ctx = {
        taskBackend: {
          getTask: vi.fn().mockResolvedValue({ extensions: { [TASK_KERNEL_EXTENSION]: {} } }),
        },
      } as unknown as taskBackend.CommandContext;
      const resolve = vi.spyOn(taskBackend, "resolveTaskOwnerCommandContext");
      const create = vi.spyOn(kernelRuntime, "createKernelRuntime");
      await expect(
        cmdTaskScopeExtend({
          ctx,
          taskId: "T-1",
          scopeRoots: ["source.ts"],
          repositoryEffects: ["source_code"],
          requestDigest: REQUEST_DIGEST,
          ...approval,
          quiet: true,
        }),
      ).rejects.toThrow("Canonical authority delta");
      expect(resolve).not.toHaveBeenCalled();
      expect(create).not.toHaveBeenCalled();
    },
  );
});

describe("task scope extend command parsing", () => {
  it.each(
    [
      { option: "--state-scope-digest", value: STATE_SCOPE_DIGEST, key: "stateScopeDigest" },
      { option: "--state-fingerprint", value: STATE_FINGERPRINT, key: "stateFingerprint" },
    ].flatMap((binding) => [false, true].map((padded) => ({ ...binding, padded }))),
  )(
    "preserves scalar $option after normalization (padded=$padded)",
    ({ option, value, key, padded }) => {
      expect(
        parseCommandArgv(taskScopeExtendSpec, [
          "T-1",
          "--scope-root",
          "packages/agentplane",
          "--request-digest",
          REQUEST_DIGEST,
          option,
          padded ? `  ${value}  ` : value,
          "--by",
          "USER",
        ]),
      ).toMatchObject({
        parsed: {
          taskId: "T-1",
          scopeRoots: ["packages/agentplane"],
          requestDigest: REQUEST_DIGEST,
          by: "USER",
          [key]: value,
        },
      });
    },
  );

  it("continues to reject a missing state binding", () => {
    const base = [
      "T-1",
      "--scope-root",
      "packages/agentplane",
      "--request-digest",
      REQUEST_DIGEST,
      "--by",
      "USER",
    ];

    expect(() => parseCommandArgv(taskScopeExtendSpec, base)).toThrow(
      "One of --state-scope-digest or --state-fingerprint is required.",
    );
  });

  it.each(["--state-scope-digest", "--state-fingerprint"] as const)(
    "treats whitespace-only %s as missing",
    (option) => {
      expect(() =>
        parseCommandArgv(taskScopeExtendSpec, [
          "T-1",
          "--scope-root",
          "packages/agentplane",
          "--request-digest",
          REQUEST_DIGEST,
          option,
          "   ",
          "--by",
          "USER",
        ]),
      ).toThrow("One of --state-scope-digest or --state-fingerprint is required.");
    },
  );

  it.each(["--state-scope-digest", "--state-fingerprint"] as const)(
    "continues to reject malformed %s",
    (option) => {
      const base = [
        "T-1",
        "--scope-root",
        "packages/agentplane",
        "--request-digest",
        REQUEST_DIGEST,
        "--by",
        "USER",
      ];

      expect(() =>
        parseCommandArgv(taskScopeExtendSpec, [...base, option, "sha256:not-a-digest"]),
      ).toThrow(`${option} must be an exact sha256:<64 lowercase hex> digest.`);
    },
  );
});
