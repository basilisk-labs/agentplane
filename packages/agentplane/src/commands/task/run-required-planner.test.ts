import { access } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { captureStdIO, installRunCliIntegrationHarness } from "@agentplane/testkit";
import { createSuppliedCliTask, readSuppliedCliOrder } from "../../cli/supplied-plan.testkit.js";
import { runJson } from "../../cli/task-create-planner-intent.testkit.js";
import { runCli } from "../../cli/run-cli.js";
import { CustomRunnerAdapter } from "../../runner/adapters/custom.js";
import * as adapters from "../../runner/adapters/index.js";
import { KernelTaskLifecycle } from "../../runner/usecases/kernel-task-lifecycle.js";
import { observeKernelTestRunner } from "./kernel-run.testkit.js";

installRunCliIntegrationHarness();
afterEach(() => vi.restoreAllMocks());

const plannerProgram = `
  const fs = require('node:fs');
  const assert = require('node:assert/strict');
  const bundle = JSON.parse(fs.readFileSync(process.env.AGENTPLANE_RUNNER_BUNDLE_PATH, 'utf8'));
  const order = bundle.work_order;
  assert.equal(order.role, 'PLANNER');
  assert.equal(order.authority.sandbox, 'read-only');
  assert.equal(order.authority.mutation_scope, 'none');
  assert.deepEqual(order.authority.writable_roots, []);
  const result = {
    schema_version: 2, kind: 'agent_semantic_result', work_order_id: order.work_order_id,
    canonical_binding: order.canonical_binding, status: 'completed',
    summary: 'Resolved report plan', findings: [], uncertainty: [],
    canonical_plan: { work_items: [{
      id: 'report', depends_on: [], required_inputs: [], expected_outputs: ['report'], optional: false,
      execution_requirements: { scope_roots: ['result.txt'], repository_effects: ['source_code'], external_effects: [], capabilities: [], resources: [] },
      contract: { role: 'EXECUTOR', objective: 'Write the report', acceptance_criteria: ['Report exists'], verification_commands: ['node --version'] }
    }] }
  };
  fs.writeFileSync(process.env.AGENTPLANE_RUNNER_RESULT_PATH, JSON.stringify(result));
`;

async function refused(root: string, id: string, message: string) {
  const io = captureStdIO();
  try {
    expect(await runCli(["task", "run", id, "--json", "--root", root])).not.toBe(0);
    expect(io.stderr).toContain(message);
  } finally {
    io.restore();
  }
}

describe("required managed initial planning", { timeout: 120_000 }, () => {
  it.each([false, true])(
    "runs once and preserves an accepted Plan across retry (crash=%s)",
    async (crash) => {
      const f = await createSuppliedCliTask({ missing: true });
      const config = { command: [process.execPath, "-e", plannerProgram] };
      vi.spyOn(adapters, "createRunnerAdapter").mockImplementation(
        () => new CustomRunnerAdapter(config),
      );
      // This qualifies the adapter contract and actual schema admission, not sandbox enforcement.
      const execute = observeKernelTestRunner(config, true);
      if (crash) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const apply = KernelTaskLifecycle.prototype.apply;
        const interrupted = vi
          .spyOn(KernelTaskLifecycle.prototype, "apply")
          .mockImplementation(async function (...args) {
            const result = await apply.apply(this, args);
            if (args[0].command.kind === "propose_plan")
              throw new Error("fixture crash after accepted plan");
            return result;
          });
        await refused(f.root, f.id, "fixture crash after accepted plan");
        interrupted.mockRestore();
      }
      const planned = await runJson(f.root, ["task", "run", f.id, "--json"]);
      expect(planned.action).toMatchObject({ kind: "approval_required" });
      expect(execute).toHaveBeenCalledTimes(1);
      await expect(access(path.join(f.root, "result.txt"))).rejects.toMatchObject({
        code: "ENOENT",
      });
      const before = await runJson(f.root, ["task", "show", f.id]);
      expect(before.planning).toMatchObject({
        outcome: "passed",
        plan_origin: "planner",
        plan_state: "PROPOSED",
        managed_attempts: 1,
      });
      const repeated = await runJson(f.root, ["task", "run", f.id, "--json"]);
      expect(repeated.action).toEqual(planned.action);
      expect(execute).toHaveBeenCalledTimes(1);
      const after = await runJson(f.root, ["task", "show", f.id]);
      expect(after.planning).toEqual(before.planning);
    },
  );

  it.each(["advisory", "missing_output", "wrong_sandbox"] as const)(
    "rejects %s capability before prepare or execute",
    async (failure) => {
      const f = await createSuppliedCliTask({ missing: true });
      const adapter = new CustomRunnerAdapter({
        command: [process.execPath, "-e", "throw Error('unexpected launch')"],
      });
      const capabilities = adapter.describeCapabilities({} as never);
      if (failure !== "advisory")
        capabilities.fields.sandbox = {
          level: "native",
          channel: "argv",
          supported_values: failure === "wrong_sandbox" ? ["workspace-write"] : ["read-only"],
        };
      if (failure === "missing_output") delete capabilities.phase_tools?.report_result;
      vi.spyOn(adapter, "describeCapabilities").mockReturnValue(capabilities);
      vi.spyOn(adapters, "createRunnerAdapter").mockReturnValue(adapter);
      const prepare = vi.spyOn(adapter, "prepare");
      const execute = vi.spyOn(adapter, "execute");
      await refused(
        f.root,
        f.id,
        failure === "wrong_sandbox" ? "sandbox" : "required read-only planning",
      );
      expect(prepare).not.toHaveBeenCalled();
      expect(execute).not.toHaveBeenCalled();
      const status = await runJson(f.root, ["task", "show", f.id]);
      expect(status.planning).toMatchObject({
        outcome: "missing",
        plan_digest: null,
        accepted_results: [],
      });
      const peer = await createSuppliedCliTask({ missing: true });
      const external = await runJson(peer.root, ["task", "advance", peer.id, "--agent-json"]);
      const { order } = await readSuppliedCliOrder(external);
      expect(order.role).toBe("PLANNER");
    },
  );

  it("still rejects an unverified execution receipt after declared capabilities pass", async () => {
    const f = await createSuppliedCliTask({ missing: true });
    const config = { command: [process.execPath, "-e", plannerProgram] };
    const adapter = new CustomRunnerAdapter(config);
    const capabilities = adapter.describeCapabilities({} as never);
    capabilities.fields.sandbox = {
      level: "native",
      channel: "argv",
      supported_values: ["read-only"],
    };
    vi.spyOn(adapter, "describeCapabilities").mockReturnValue(capabilities);
    vi.spyOn(adapters, "createRunnerAdapter").mockReturnValue(adapter);
    const execute = vi.spyOn(adapter, "execute");
    const result = await runJson(f.root, ["task", "run", f.id, "--json"]);
    expect(result.action).toMatchObject({
      kind: "human_required",
      reason: "canonical_runner_receipt_not_successful",
    });
    expect(execute).toHaveBeenCalledTimes(1);
    const show = await runJson(f.root, ["task", "show", f.id]);
    expect(show.planning).toMatchObject({
      plan_digest: null,
      accepted_results: [],
    });
  });
});
