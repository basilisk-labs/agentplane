import * as fsPromises from "node:fs/promises";
import {
  staleClaim,
  writeActiveClaim,
} from "../../runner/usecases/task-run-active-claim.testkit.js";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { runJson } from "../../cli/task-create-planner-intent.testkit.js";
import { ensureRuntimeGitignore } from "../../runtime/shared/runtime-gitignore.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import { cancelWithdrawnScope } from "./kernel-cancellation.js";
import {
  acquireTaskRunnerActiveClaim,
  readTaskRunnerActiveClaim,
  releaseTaskRunnerActiveClaim,
} from "../../runner/usecases/task-run-active-claim.js";
import { CliError } from "../../shared/errors.js";

vi.mock("node:fs/promises", async (original) => ({ ...(await original<typeof fsPromises>()) }));
installRunCliIntegrationHarness();
describe("public scope-withdrawal cancellation", { timeout: 180_000 }, () => {
  it("requires pinned USER approval and preserves a genuine blocked execution with its planned successor", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await ensureRuntimeGitignore({ gitRoot: root });
    await writeFile(path.join(root, "source.ts"), "export const value = 1;\n");
    await commitAll(root, "cancellation fixture");
    const created = await runJson(root, [
      "task",
      "create",
      "Withdrawal fixture",
      "--route",
      "direct",
      "--task-kind",
      "code",
      "--mutation-scope",
      "code",
      "--scope-root",
      "source.ts",
      "--repository-effect",
      "source_code",
      "--capability",
      "repository_write",
      "--json",
    ]);
    const id = String(created.task_id);
    let packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
    const submit = async (fields: Record<string, unknown>) => {
      const exchange = packet.exchange as { directory: string; result_path: string };
      const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
        JSON.parse(await readFile(path.join(exchange.directory, "work-order.json"), "utf8")),
      );
      await writeFile(
        exchange.result_path,
        JSON.stringify({
          work_order_id: order.work_order_id,
          status: "completed",
          summary: "fixture",
          findings: [],
          uncertainty: [],
          ...fields,
        }),
      );
      packet = await runJson(root, [
        "task",
        "advance",
        id,
        "--result",
        exchange.result_path,
        "--agent-json",
      ]);
      return exchange;
    };
    const item = {
      id: "first",
      depends_on: [] as string[],
      required_inputs: [],
      expected_outputs: ["report"],
      optional: false,
      execution_requirements: {
        scope_roots: ["source.ts"],
        repository_effects: ["source_code"],
        external_effects: [],
        capabilities: ["repository_write"],
        resources: [],
      },
      contract: {
        role: "EXECUTOR",
        objective: "Inspect fixture",
        acceptance_criteria: ["Report fixture"],
        verification_commands: ["node --version"],
      },
    };
    await submit({
      canonical_plan: {
        work_items: [
          item,
          { ...item, id: "successor", depends_on: ["first"], expected_outputs: ["next-report"] },
        ],
      },
    });
    expect(
      await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", root]),
    ).toBe(0);
    packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
    expect(packet.authority).toMatchObject({ role: "EXECUTOR" });
    const exchange = await submit({
      status: "blocked",
      blocker: { summary: "Mandatory scope withdrawn" },
    });
    const retainedResult = await readFile(
      path.join(exchange.directory, "received-result.json"),
      "utf8",
    );
    const command = await loadCommandContext({ cwd: root, rootOverride: null });
    const runtime = await createKernelRuntime({
      command,
      task_id: id,
      transport: "manual",
      operation_id: "fixture-read",
    });
    const before = await runtime.adapter.read(id);
    if (before.kind !== "canonical") throw new Error("canonical missing");
    expect(before.record.aggregate.work_items.first?.state).toBe("BLOCKED");
    expect(before.record.aggregate.work_items.successor?.state).toBe("PLANNED");
    const reason = "Owner withdrew mandatory scope";
    let recovery: string[] = [];
    try {
      await cancelWithdrawnScope({ command, taskId: id, reason });
    } catch (error) {
      expect(error).toBeInstanceOf(CliError);
      recovery = (error as CliError).context?.recovery_argv as string[];
    }
    expect(recovery.slice(0, 4)).toEqual(["agentplane", "task", "cancel", id]);
    const invoke = (argv = recovery) => runCliSilent([...argv.slice(1), "--root", root]);
    const forged = [...recovery];
    forged[forged.indexOf("--request-digest") + 1] = k.kernelDigest("forged");
    expect(await invoke(forged)).not.toBe(0);
    const claimOpts = {
      git_root: root,
      workflow_dir: config.paths.workflow_dir,
      task_id: id,
      run_id: "fixture-active",
    };
    const active = await acquireTaskRunnerActiveClaim({ ...claimOpts, operation: "execute" });
    try {
      const bytes = await readFile(active.claim_path, "utf8");
      expect(await invoke()).not.toBe(0);
      expect(await readFile(active.claim_path, "utf8")).toBe(bytes);
    } finally {
      await releaseTaskRunnerActiveClaim(active);
    }
    expect(await invoke()).toBe(0);
    const after = await runtime.adapter.read(id);
    if (after.kind !== "canonical") throw new Error("canonical missing");
    expect(after.record.aggregate.state).toBe("CANCELLED");
    for (const field of [
      "current_plan",
      "plan_history",
      "work_items",
      "effects",
      "final_validation",
    ] as const)
      expect(after.record.aggregate[field]).toEqual(before.record.aggregate[field]);
    expect(after.record.events.slice(0, before.record.events.length)).toEqual(before.record.events);
    for (const [key, value] of Object.entries(before.record.aggregate.mutation_receipts))
      expect(after.record.aggregate.mutation_receipts[key]).toEqual(value);
    expect(await readFile(path.join(exchange.directory, "received-result.json"), "utf8")).toBe(
      retainedResult,
    );
    expect(await readTaskRunnerActiveClaim(claimOpts)).toBeNull();
    expect(await invoke()).toBe(0);
    expect(await runtime.adapter.read(id)).toEqual(after);
    expect(await invoke(forged)).not.toBe(0);
    expect(
      await runCliSilent([
        "task",
        "advance",
        id,
        "--result",
        exchange.result_path,
        "--agent-json",
        "--root",
        root,
      ]),
    ).not.toBe(0);
    expect(await runtime.adapter.read(id)).toEqual(after);
  });
});

describe("strict cancellation claim", () => {
  it.each(["stale", "unverifiable", "racing-stale"])(
    "preserves an existing %s claim",
    async (variant) => {
      const root = await mkGitRepoRootWithBranch("main");
      const taskId = "202610160500-CANCEL";
      const claim = staleClaim({ task_id: taskId, run_id: "old-run" });
      if (variant === "unverifiable") {
        claim.owner_pid = process.pid;
        claim.owner_command = null;
        claim.owner_started_at = null;
      }
      let file: string | undefined;
      const publish = async () => {
        const written = await writeActiveClaim(root, claim);
        file = written.claim_path;
      };
      let restore: (() => void) | undefined;
      if (variant === "racing-stale") {
        const original = fsPromises.link;
        const spy = vi.spyOn(fsPromises, "link").mockImplementation(async (...args) => {
          if (String(args[1]).endsWith("active-run-claim.json")) {
            restore?.();
            await publish();
          }
          return original(...args);
        });
        restore = () => spy.mockRestore();
      } else await publish();
      try {
        await expect(
          acquireTaskRunnerActiveClaim({
            git_root: root,
            workflow_dir: ".agentplane/tasks",
            task_id: taskId,
            run_id: "cancellation",
            operation: "cancel",
          }),
        ).rejects.toThrow();
        expect(JSON.parse(await readFile(file!, "utf8"))).toEqual(claim);
      } finally {
        restore?.();
      }
    },
  );
  it("excludes another runner while cancellation holds the real lease", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const opts = {
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: "202610160500-CANCEL",
      run_id: "cancellation",
    };
    const lease = await acquireTaskRunnerActiveClaim({ ...opts, operation: "cancel" });
    try {
      const observed = await readTaskRunnerActiveClaim(opts);
      expect(observed?.operation).toBe("cancel");
      await expect(
        acquireTaskRunnerActiveClaim({ ...opts, run_id: "writer", operation: "execute" }),
      ).rejects.toThrow();
    } finally {
      await releaseTaskRunnerActiveClaim(lease);
    }
    expect(await readTaskRunnerActiveClaim(opts)).toBeNull();
  });
});
