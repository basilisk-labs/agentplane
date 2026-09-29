import { afterEach, describe, expect, it, vi } from "vitest";
import { captureStdIO, installRunCliIntegrationHarness, runCliSilent } from "@agentplane/testkit";
import { runJson } from "../../cli/task-create-planner-intent.testkit.js";
import { createSuppliedCliTask, readSuppliedCliOrder } from "../../cli/supplied-plan.testkit.js";
import { runCli } from "../../cli/run-cli.js";
import * as transport from "./kernel-run.js";
import * as adapters from "../../runner/adapters/index.js";
import { CustomRunnerAdapter } from "../../runner/adapters/custom.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";

installRunCliIntegrationHarness();
afterEach(() => vi.restoreAllMocks());

describe("managed supplied Plan decision", { timeout: 120_000 }, () => {
  it("reuses the external approval boundary without invoking an adapter or selector", async () => {
    const f = await createSuppliedCliTask();
    const adapter = vi.spyOn(adapters, "createRunnerAdapter");
    const managed = await runJson(f.root, ["task", "run", f.id, "--json"]);
    expect(managed.action).toMatchObject({ kind: "approval_required" });
    expect(managed).not.toHaveProperty("exchange");
    const external = await runJson(f.root, ["task", "advance", f.id, "--agent-json"]);
    expect(external.action).toEqual(managed.action);
    expect(adapter).not.toHaveBeenCalled();
    expect(
      await runCliSilent(["task", "plan", "approve", f.id, "--by", "USER", "--root", f.root]),
    ).toBe(0);
    // Observe transport selection only. Real managed admission is qualified separately.
    const dispatch = vi
      .spyOn(transport, "executeKernelPacket")
      .mockImplementation((_command, _id, packet) => Promise.resolve(packet));
    const executing = await runJson(f.root, ["task", "run", f.id, "--json"]);
    const { order } = await readSuppliedCliOrder(executing);
    expect(order.role).toBe("EXECUTOR");
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(adapter).not.toHaveBeenCalled();
  });

  it.each([{ missing: true }, { unresolved: true }, { requirePlanner: true }])(
    "uses the same required planning decision for %j",
    async (options) => {
      const f = await createSuppliedCliTask(options);
      const dispatch = vi
        .spyOn(transport, "executeKernelPacket")
        .mockImplementation((_command, _id, packet) => Promise.resolve(packet));
      const managed = await runJson(f.root, ["task", "run", f.id, "--json"]);
      const peer = await createSuppliedCliTask(options);
      const external = await runJson(peer.root, ["task", "advance", peer.id, "--agent-json"]);
      const m = await readSuppliedCliOrder(managed);
      const e = await readSuppliedCliOrder(external);
      expect(m.order.role).toBe("PLANNER");
      expect(e.order.role).toBe(m.order.role);
      expect(m.order.authority).toEqual(e.order.authority);
      expect(m.order.task.unresolved_questions).toEqual(e.order.task.unresolved_questions);
      expect(dispatch).toHaveBeenCalledTimes(1);
    },
  );

  it("does not reinterpret an adapter capability failure as a sufficient Plan", async () => {
    const f = await createSuppliedCliTask({ requirePlanner: true });
    const custom = new CustomRunnerAdapter({
      command: [process.execPath, "-e", "throw Error('unexpected launch')"],
      enforcement: { mode: "codex_sandbox_full_auto", platform: "auto" },
    });
    vi.spyOn(adapters, "createRunnerAdapter").mockReturnValue(custom);
    const prepare = vi.spyOn(custom, "prepare");
    const execute = vi.spyOn(custom, "execute");
    const io = captureStdIO();
    try {
      expect(await runCli(["task", "run", f.id, "--json", "--root", f.root])).not.toBe(0);
      expect(io.stderr).toContain("cannot enforce requested sandbox");
    } finally {
      io.restore();
    }
    expect(prepare).not.toHaveBeenCalled();
    expect(execute).not.toHaveBeenCalled();
    const command = await loadCommandContext({ cwd: f.root });
    const runtime = await createKernelRuntime({
      command,
      task_id: f.id,
      transport: "managed",
      operation_id: "inspect-failed-capability",
    });
    const read = await runtime.adapter.read(f.id);
    if (read.kind !== "canonical") throw new Error("Canonical task missing");
    expect(read.record.aggregate.current_plan).toBeNull();
    expect(read.record.aggregate.authority_lineage ?? []).toEqual([]);
    const peer = await createSuppliedCliTask({ requirePlanner: true });
    const external = await runJson(peer.root, ["task", "advance", peer.id, "--agent-json"]);
    const { order } = await readSuppliedCliOrder(external);
    expect(order.role).toBe("PLANNER");
  });
});
