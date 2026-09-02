import { afterEach, describe, expect, it, vi } from "vitest";
import { taskKernel } from "@agentplaneorg/core/tasks";
import {
  makeTaskBackendDouble,
  makeTaskCommandContext,
  makeTaskFixture,
} from "@agentplane/testkit/task";

import {
  makeKernelRecord,
  TASK_KERNEL_EXTENSION,
} from "../../adapters/task-backend/kernel-record.js";
import { cmdTaskShow } from "./show.js";
import { makeRunTaskStatusHandler } from "./status.command.js";
import { makeRunTaskBriefHandler } from "./brief.command.js";
import { makeRunTaskNextActionHandler } from "./next-action.command.js";
import { cmdReady } from "./ready.js";
import { readTaskKernel, projectTaskKernelRead } from "./kernel-read.js";
import { CliError } from "../../shared/errors.js";

const mocks = vi.hoisted(() => ({ load: vi.fn(), identity: vi.fn() }));
vi.mock("../shared/task-backend.js", () => ({ loadTaskFromContext: mocks.load }));
vi.mock("./execution-authority-context.js", () => ({
  resolveLogicalRepositoryIdentity: mocks.identity,
}));
afterEach(() => vi.restoreAllMocks());

const identity = taskKernel.kernelDigest("repository");
function capturedTask() {
  const aggregate: taskKernel.TaskAggregate = {
    schema_version: 1,
    id: "T-1",
    revision: 1,
    state: "PLANNING",
    intent_digest: taskKernel.kernelDigest("intent"),
    current_plan: null,
    plan_history: [],
    work_items: {},
    final_validation: null,
    effects: [],
    mutation_receipts: {},
    controller_transfer: null,
    migration_receipts: [],
  };
  return makeTaskFixture({
    status: "DONE",
    depends_on: ["LEGACY-MISSING"],
    extensions: { [TASK_KERNEL_EXTENSION]: makeKernelRecord(identity, aggregate, []) },
  });
}

describe("task show canonical projection", () => {
  it("uses the same read projection for status, brief, next-action and readiness", async () => {
    const task = capturedTask();
    mocks.identity.mockResolvedValue(identity);
    mocks.load.mockResolvedValue(task);
    const backend = makeTaskBackendDouble({ getTask: () => Promise.resolve(task) });
    const ctx = makeTaskCommandContext({ taskBackend: backend });
    const session = {
      getLocalContext: () => Promise.resolve(ctx),
      getRemoteContext: () => Promise.resolve(ctx),
    };
    const command = { cwd: "/repo" } as never;
    const parsed = { taskId: "T-1", json: true, remote: false, route: true, explain: true };
    const stdout = vi.spyOn(process.stdout, "write").mockReturnValue(true);
    for (const handler of [
      makeRunTaskStatusHandler(session),
      makeRunTaskBriefHandler(session),
      makeRunTaskNextActionHandler(session),
    ]) {
      stdout.mockClear();
      expect(await handler(command, parsed)).toBe(0);
      const output: unknown = JSON.parse(
        stdout.mock.calls.map(([value]) => String(value)).join(""),
      );
      expect(output).toMatchObject({
        source: "task_kernel",
        record_kind: "canonical",
        task: { state: "PLANNING", status: "TODO" },
        ready: false,
        next_action: {
          reason_code: "kernel_plan_required",
          command: null,
          grants_authority: false,
        },
      });
    }
    stdout.mockClear();
    expect(await cmdReady({ ctx, cwd: "/repo", taskId: "T-1" })).toBe(2);
    const text = stdout.mock.calls.map(([value]) => String(value)).join("");
    expect(text).toContain("kernel_plan_required");
    expect(text).not.toContain("LEGACY-MISSING");
    expect(mocks.identity).toHaveBeenLastCalledWith({
      git_root: "/repo",
      task: {},
      create_if_missing: false,
    });
  });

  it("keeps missing, malformed, archived and unmigrated reads explicit", async () => {
    const ctx = makeTaskCommandContext();
    mocks.load.mockRejectedValue(new CliError({ code: "E_IO", message: "ENOENT: no such file" }));
    expect(
      projectTaskKernelRead((await readTaskKernel(ctx, "T-1")) as { kind: "missing" }, "T-1")
        .next_action.reason_code,
    ).toBe("kernel_task_missing");
    const legacy = makeTaskFixture();
    mocks.load.mockResolvedValue(legacy);
    expect(await readTaskKernel(ctx, "T-1")).toEqual({ kind: "legacy_unmigrated", task: legacy });
    const task = capturedTask();
    mocks.identity.mockResolvedValue(identity);
    task.extensions = { task_kernel: { broken: true } };
    mocks.load.mockResolvedValue(task);
    const invalid = await readTaskKernel(ctx, "T-1");
    expect(invalid.kind).toBe("malformed");
    if (invalid.kind !== "malformed") throw new Error("Expected malformed read");
    expect(projectTaskKernelRead(invalid, "T-1").next_action.reason_code).toBe(
      "kernel_record_invalid",
    );
    const archiveValue = {
      schema_version: 1 as const,
      kind: "archived_task" as const,
      task_id: "T-1",
      repository_identity: identity,
      source_digest: taskKernel.kernelDigest("source"),
      migration_version: "v1",
      legacy_status: "DONE" as const,
      read_only: true as const,
    };
    task.extensions = {
      task_kernel: { ...archiveValue, digest: taskKernel.kernelDigest(archiveValue) },
    };
    const archive = await readTaskKernel(ctx, "T-1");
    expect(archive.kind).toBe("archived");
    if (archive.kind !== "archived") throw new Error("Expected archive read");
    expect(projectTaskKernelRead(archive, "T-1")).toMatchObject({
      ready: false,
      source: "task_kernel_archive",
      next_action: { reason_code: "kernel_task_archived", grants_authority: false },
    });
    mocks.load.mockRejectedValue(new Error("backend inaccessible"));
    await expect(readTaskKernel(ctx, "T-1")).rejects.toThrow("backend inaccessible");
  });
  it("ignores a contradictory legacy status and rejects corrupted canonical records", async () => {
    const identity = taskKernel.kernelDigest("repository");
    const aggregate: taskKernel.TaskAggregate = {
      schema_version: 1,
      id: "T-1",
      revision: 1,
      state: "PLANNING",
      intent_digest: taskKernel.kernelDigest("intent"),
      current_plan: null,
      plan_history: [],
      work_items: {},
      final_validation: null,
      effects: [],
      mutation_receipts: {},
      controller_transfer: null,
      migration_receipts: [],
    };
    const record = makeKernelRecord(identity, aggregate, []);
    mocks.identity.mockResolvedValue(identity);
    const fixture = makeTaskFixture({
      id: "T-1",
      status: "DONE",
      extensions: { [TASK_KERNEL_EXTENSION]: record },
    });
    mocks.load.mockResolvedValue(fixture);
    const ctx = makeTaskCommandContext({ taskBackend: makeTaskBackendDouble() });
    const stdout = vi.spyOn(process.stdout, "write").mockReturnValue(true);
    await expect(
      cmdTaskShow({ ctx, cwd: ctx.resolvedProject.gitRoot, taskId: "T-1" }),
    ).resolves.toBe(0);
    expect(JSON.parse(String(stdout.mock.calls[0]?.[0]))).toMatchObject({
      source: "task_kernel",
      state: "PLANNING",
      status: "TODO",
    });
    mocks.load.mockResolvedValue({
      ...fixture,
      extensions: {
        [TASK_KERNEL_EXTENSION]: { ...record, digest: taskKernel.kernelDigest("wrong") },
      },
    });
    await expect(
      cmdTaskShow({ ctx, cwd: ctx.resolvedProject.gitRoot, taskId: "T-1" }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
    expect(stdout).toHaveBeenCalledTimes(1);
  });
});
