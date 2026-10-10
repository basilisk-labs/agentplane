import { beforeEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  aggregate,
  effect,
  input,
  manifest,
  resultDigest,
  runtime,
  transitionCommand,
  validation,
} from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { makeKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { parseCommandArgv } from "../../cli/spec/parse.js";
import type * as RuntimeModule from "./kernel-runtime-context.js";
import type * as BackendModule from "../shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  write: vi.fn(),
  commonDir: vi.fn().mockResolvedValue("/repo/.git"),
  nativeStop: vi.fn().mockResolvedValue({
    work_order_id: "sha256:" + "3".repeat(64),
    validation_digest: "sha256:" + "4".repeat(64),
  }),
  semanticStop: vi.fn().mockResolvedValue({
    work_order_id: "sha256:" + "1".repeat(64),
    result_digest: "sha256:" + "2".repeat(64),
  }),
}));
vi.mock("./kernel-recovery-evidence.js", () => ({
  captureKernelSemanticStop: mocks.semanticStop,
  captureKernelNativeValidation: mocks.nativeStop,
}));
vi.mock("./kernel-runtime-context.js", async (importOriginal) => ({
  ...(await importOriginal<typeof RuntimeModule>()),
  createKernelRuntime: mocks.create,
}));
vi.mock("./kernel-exchange.js", () => ({ writeKernelArtifact: mocks.write }));
vi.mock("../shared/task-backend.js", async (importOriginal) => ({
  ...(await importOriginal<typeof BackendModule>()),
  resolveCommandGitCommonDir: mocks.commonDir,
}));
import {
  assertWorkItemResume,
  cmdWorkItemResume,
  workItemResumeOperatorAction,
} from "./kernel-work-item-resume.js";
import { taskWorkItemResumeSpec } from "./kernel-work-item-resume.command.js";

function fixture(native = false) {
  const state = aggregate({
    work_items: {
      kernel: {
        ...runtime(native ? "VALIDATING" : "BLOCKED"),
        result_digest: resultDigest,
        output_manifests: [manifest()],
        validation: native
          ? {
              ...validation(resultDigest),
              status: "BLOCKED",
              identity: {
                ...validation(resultDigest).identity,
                check_id: "canonical-native-checks",
              },
            }
          : validation(resultDigest),
      },
    },
  });
  const record = makeKernelRecord(k.kernelDigest("repo"), state, []);
  const opts = {
    taskId: state.id,
    workItemId: "kernel",
    stateDigest: record.digest,
    by: "USER",
    note: "Installed and verified the missing check dependency.",
  };
  const commandInput = input(state, {
    ...transitionCommand(state, native ? "rework" : "resume"),
    claim_id: state.work_items.kernel!.claim_id,
  });
  const { aggregate: _aggregate, ...nativeInput } = commandInput;
  const apply = vi.fn().mockImplementation((value: Omit<k.KernelInput, "aggregate">) => {
    const result = k.reduceTaskCommand({ ...value, aggregate: state });
    if (result.kind !== "accepted") return Promise.resolve(result);
    return Promise.resolve({
      kind: "committed",
      record: makeKernelRecord(record.repository_identity, result.aggregate, result.events),
      receipts: [],
      replayed: false,
    });
  });
  const read = vi.fn().mockResolvedValue({ kind: "canonical", record });
  const makeInput = vi.fn().mockResolvedValue(nativeInput);
  mocks.create.mockResolvedValue({ adapter: { read }, input: makeInput, lifecycle: { apply } });
  return { state, record, opts, read, apply, makeInput };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("canonical WorkItem operator recovery", () => {
  it("emits state-bound argv and requires the operator resolution note", () => {
    const f = fixture();
    const action = workItemResumeOperatorAction(f.record, "kernel");
    expect(action.required_input.option).toBe("--note");
    const argv = [...action.argv.slice(4), "--note", f.opts.note];
    expect(parseCommandArgv(taskWorkItemResumeSpec, argv).parsed).toEqual(f.opts);
    expect(() => parseCommandArgv(taskWorkItemResumeSpec, action.argv.slice(4))).toThrow();
  });

  it.each(["AGENT", "SYSTEM", ""])("refuses attribution %s without writes", async (by) => {
    const f = fixture();
    await expect(cmdWorkItemResume({} as never, { ...f.opts, by })).rejects.toThrow("USER");
    expect(f.makeInput).not.toHaveBeenCalled();
    expect(f.apply).not.toHaveBeenCalled();
    expect(mocks.write).not.toHaveBeenCalled();
  });

  it("refuses stale state and empty notes without writes", async () => {
    const f = fixture();
    await expect(
      cmdWorkItemResume({} as never, { ...f.opts, stateDigest: k.kernelDigest("old") }),
    ).rejects.toThrow("stale");
    await expect(cmdWorkItemResume({} as never, { ...f.opts, note: " " })).rejects.toThrow("note");
    expect(f.apply).not.toHaveBeenCalled();
    expect(mocks.write).not.toHaveBeenCalled();
  });

  it.each(["READY", "EXECUTING", "COMPLETED", "EFFECT_IN_DOUBT"] as const)(
    "refuses state %s",
    (state) => {
      const f = fixture();
      f.record.aggregate.work_items.kernel!.state = state;
      expect(() => assertWorkItemResume(f.record, f.opts)).toThrow("blocked WorkItem");
    },
  );

  it.each(["PREPARED", "PENDING", "IN_DOUBT"] as const)(
    "refuses unresolved effect %s",
    async (state) => {
      const f = fixture();
      f.record.aggregate.effects.push(effect("publish", state));
      await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow("outstanding effects");
      expect(f.apply).not.toHaveBeenCalled();
      expect(mocks.write).not.toHaveBeenCalled();
    },
  );

  it("refuses noncanonical tasks and concurrent state changes", async () => {
    const f = fixture();
    f.read.mockResolvedValueOnce({ kind: "legacy_unmigrated" });
    await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow("canonical Task");
    f.read.mockResolvedValueOnce({ kind: "canonical", record: f.record }).mockResolvedValueOnce({
      kind: "canonical",
      record: { ...f.record, digest: k.kernelDigest("concurrent") },
    });
    await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow("stale");
    expect(f.apply).not.toHaveBeenCalled();
    expect(mocks.write).not.toHaveBeenCalled();
  });

  it("records the resolution and resumes through the kernel with a new attempt", async () => {
    const f = fixture();
    const before = structuredClone(f.record);
    await expect(cmdWorkItemResume({} as never, f.opts)).resolves.toBe(0);
    const submitted = f.apply.mock.calls[0]![0] as Omit<k.KernelInput, "aggregate">;
    expect(submitted.actor).toMatchObject({ kind: "USER", id: "USER", transport: "manual" });
    expect(submitted.command).toMatchObject({
      action: "resume",
      expected_task_revision: f.state.revision,
    });
    expect(mocks.write).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({ note: f.opts.note, state_digest: f.record.digest }),
    );
    expect(f.record).toEqual(before);
    const resumed = (await f.apply.mock.results[0]!.value) as { record: typeof f.record };
    expect(resumed.record.aggregate.work_items.kernel!.state).toBe("READY");
    const next = resumed.record.aggregate;
    const claimed = k.reduceTaskCommand(
      input(next, transitionCommand(next, "claim"), "fresh-claim"),
    );
    expect(claimed.kind).toBe("accepted");
    if (claimed.kind !== "accepted") throw new Error("claim rejected");
    expect(claimed.aggregate.work_items.kernel).toMatchObject({
      state: "CLAIMED",
      attempt: 2,
      claim_id: "claim-2",
      result_digest: null,
      validation: null,
      output_manifests: [],
    });
    expect(claimed.aggregate.current_plan).toEqual(f.state.current_plan);
  });
});

describe("blocked native validation recovery", () => {
  it("uses rework while retaining validation and binds the USER receipt to the transition", async () => {
    const f = fixture(true);
    const before = structuredClone(f.record);
    await cmdWorkItemResume({} as never, f.opts);
    const submitted = f.apply.mock.calls[0]![0] as Omit<k.KernelInput, "aggregate">;
    const recovered = (await f.apply.mock.results[0]!.value) as { record: typeof f.record };
    expect(submitted.command).toMatchObject({ action: "rework", claim_id: "claim-1" });
    expect(submitted.actor).toMatchObject({ kind: "USER", transport: "manual" });
    expect(mocks.write).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({
        native_validation: {
          work_order_id: "sha256:" + "3".repeat(64),
          validation_digest: "sha256:" + "4".repeat(64),
        },
        transition: submitted.command,
      }),
    );
    expect(recovered.record.aggregate.work_items.kernel).toMatchObject({
      state: "REWORK_READY",
      attempt: 1,
      validation: before.aggregate.work_items.kernel!.validation,
    });
    expect(f.record).toEqual(before);
    f.read.mockResolvedValue({ kind: "canonical", record: recovered.record });
    await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow("stale");
    expect(f.apply).toHaveBeenCalledOnce();
    expect(mocks.semanticStop).not.toHaveBeenCalled();
  });

  it.each(["PASSED", "FAILED", "STALE"] as const)("rejects %s validation", async (status) => {
    const f = fixture(true);
    f.record.aggregate.work_items.kernel!.validation!.status = status;
    await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow("blocked WorkItem");
    expect(f.apply).not.toHaveBeenCalled();
  });

  it("rejects missing evidence before writing or mutating", async () => {
    const f = fixture(true);
    mocks.nativeStop.mockRejectedValueOnce(new Error("Retained checks missing"));
    await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow("missing");
    expect(f.apply).not.toHaveBeenCalled();
    expect(mocks.write).not.toHaveBeenCalled();
  });

  it("rejects evidence changing during the state check", async () => {
    const f = fixture(true);
    mocks.nativeStop.mockResolvedValueOnce({
      work_order_id: k.kernelDigest("old"),
      validation_digest: k.kernelDigest("old"),
    });
    await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow("changed");
    expect(f.apply).not.toHaveBeenCalled();
    expect(mocks.write).not.toHaveBeenCalled();
  });
});
