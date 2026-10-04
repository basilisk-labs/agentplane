import { ensureRuntimeGitignore } from "../../runtime/shared/runtime-gitignore.js";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultConfig, loadConfig } from "@agentplaneorg/core/config";
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
import { loadCommandContext } from "../shared/task-backend.js";
import * as commits from "../guard/impl/commit.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import { acceptKernelSemanticResult } from "./kernel-semantic-result.js";

installRunCliIntegrationHarness();
afterEach(() => vi.restoreAllMocks());

describe("authorized policy result completion", { timeout: 180_000 }, () => {
  it("retries a failed protected commit under original authority from a fresh command context", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane/policy"), { recursive: true });
    await writeFile(path.join(root, ".agentplane/policy/local.md"), "Original\n");
    await ensureRuntimeGitignore({ gitRoot: root });
    await commitAll(root, "policy fixture");
    const created = await runJson(root, [
      "task",
      "create",
      "Update local policy",
      "--task-kind",
      "ops",
      "--mutation-scope",
      "ops",
      "--risk",
      "security",
      "--scope-root",
      ".agentplane/WORKFLOW.md",
      "--scope-root",
      ".agentplane/policy/local.md",
      "--repository-effect",
      "security_boundary",
      "--capability",
      "repository_write",
      "--verify",
      "node --version",
      "--json",
    ]);
    const id = String(created.task_id);
    let packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
    let cwd = root;
    const followCheckout = async () => {
      const action = packet.action as { must_run_from?: string };
      if (action.must_run_from) {
        cwd = action.must_run_from;
        packet = await runJson(cwd, ["task", "advance", id, "--agent-json"]);
      }
    };
    await followCheckout();
    const planning = packet.exchange as { directory: string; result_path: string };
    const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(await readFile(path.join(planning.directory, "work-order.json"), "utf8")),
    );
    await writeFile(
      planning.result_path,
      JSON.stringify({
        work_order_id: order.work_order_id,
        status: "completed",
        summary: "Update policy",
        findings: [],
        uncertainty: [],
        canonical_plan: {
          work_items: [
            {
              id: "policy",
              depends_on: [],
              required_inputs: [],
              expected_outputs: ["policy"],
              optional: false,
              execution_requirements: {
                scope_roots: [".agentplane/WORKFLOW.md", ".agentplane/policy/local.md"],
                repository_effects: ["security_boundary"],
                external_effects: [],
                capabilities: ["repository_write"],
                resources: [],
              },
              contract: {
                objective: "Update policy",
                acceptance_criteria: ["Policy updated"],
                verification_commands: ["node --version"],
                role: "EXECUTOR",
              },
            },
          ],
        },
      }),
    );
    packet = await runJson(cwd, [
      "task",
      "advance",
      id,
      "--result",
      planning.result_path,
      "--agent-json",
    ]);
    expect(packet.action).toMatchObject({ kind: "approval_required" });
    expect(await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", cwd])).toBe(
      0,
    );
    packet = await runJson(cwd, ["task", "advance", id, "--agent-json"]);
    await followCheckout();
    expect(packet.action).toMatchObject({ kind: "agent_episode" });
    const exchange = packet.exchange as { directory: string; result_path: string };
    const work = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(await readFile(path.join(exchange.directory, "work-order.json"), "utf8")),
    );
    expect(work.role).toBe("EXECUTOR");
    const { config: originalConfig } = await loadConfig(path.join(cwd, ".agentplane"));
    const workflow = path.join(cwd, ".agentplane/WORKFLOW.md");
    const workflowText = await readFile(workflow, "utf8");
    await writeFile(workflow, workflowText.replace("mode: manual", "mode: all"));
    await writeFile(path.join(cwd, ".agentplane/policy/local.md"), "Changed\n");
    await writeFile(
      exchange.result_path,
      JSON.stringify({
        work_order_id: work.work_order_id,
        status: "completed",
        summary: "Policy updated",
        findings: [],
        uncertainty: [],
        canonical_outputs: [{ id: "policy", kind: "report", digest: k.kernelDigest("changed") }],
      }),
    );
    const fresh = async () => {
      const command = await loadCommandContext({ cwd, rootOverride: cwd });
      const runtime = await createKernelRuntime({
        command,
        task_id: id,
        transport: "host",
        operation_id: "policy-result-test",
      });
      return { command, runtime };
    };
    for (const [transport, operation, actor, current] of [
      ["manual", `approve:${id}`, "USER", true],
      ["manual", `approve:${id}`, "EXECUTOR", false],
      ["host", `approve:${id}`, "USER", false],
      ["manual", "policy-result-test", "USER", false],
    ] as const) {
      const command = await loadCommandContext({ cwd, rootOverride: cwd });
      const approvalRuntime = await createKernelRuntime({
        command,
        task_id: id,
        transport,
        operation_id: operation,
        approval: { kind: "manual_operator", actor_id: actor, invocation_id: "policy-test" },
      });
      const context = await approvalRuntime.native.readContext(id);
      expect(approvalRuntime.command.config.authority.mode).toBe(
        current ? "all" : originalConfig.authority.mode,
      );
      const record = await approvalRuntime.adapter.read(id);
      if (record.kind !== "canonical") throw new Error("Missing approval fixture");
      const approvedDigest = record.record.aggregate.authority_lineage!.findLast(
        (entry) => entry.approval_mode !== null,
      )!.authority.policy_digests;
      if (current) expect(context.ceiling.policy_digests).not.toEqual(approvedDigest);
      else expect(context.ceiling.policy_digests).toEqual(approvedDigest);
      // Observing a pending operator approval cannot issue authority by itself.
      expect(record.record.aggregate.current_plan?.digest).toBe(
        work.canonical_binding?.plan_digest,
      );
    }
    const commit = vi
      .spyOn(commits, "cmdCommit")
      .mockRejectedValueOnce(new Error("simulated hook failure"));
    const first = await fresh();
    const before = await first.runtime.adapter.read(id);
    if (before.kind !== "canonical") throw new Error("Missing task");
    const parent = before.record.aggregate.authority_lineage!.at(-1)!.authority;
    const observation = await first.runtime.native.observeContinuation(id, parent);
    expect(observation).toMatchObject({
      changed_paths: [".agentplane/WORKFLOW.md", ".agentplane/policy/local.md"],
    });
    await expect(
      acceptKernelSemanticResult(first.command, id, first.runtime, exchange.result_path),
    ).rejects.toThrow("simulated hook failure");
    expect(first.runtime.command.config.authority.mode).toBe(originalConfig.authority.mode);
    expect(commit).toHaveBeenCalledWith(expect.objectContaining({ allowPolicy: true }));
    const retry = await fresh();
    await acceptKernelSemanticResult(retry.command, id, retry.runtime, exchange.result_path);
    const accepted = await retry.runtime.adapter.read(id);
    expect(accepted.kind).toBe("canonical");
    if (accepted.kind !== "canonical") throw new Error("Missing canonical state");
    expect(accepted.record.aggregate.work_items.policy.state).toBe("RESULT_RECEIVED");
    expect(retry.runtime.command.config.authority.mode).toBe(originalConfig.authority.mode);
    const replay = await fresh();
    await acceptKernelSemanticResult(replay.command, id, replay.runtime, exchange.result_path);
    expect(commit).toHaveBeenCalledTimes(2);
  });
});
