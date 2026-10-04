import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { createKernelRuntime } from "../commands/task/kernel-runtime-context.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import { runJson } from "./task-create-planner-intent.testkit.js";

installRunCliIntegrationHarness();

async function createTask(root: string) {
  const created = await runJson(root, [
    "task",
    "create",
    "Renew policy fixture",
    "--task-kind",
    "code",
    "--mutation-scope",
    "code",
    "--scope-root",
    "result.txt",
    "--repository-effect",
    "source_code",
    "--capability",
    "repository_write",
    "--verify",
    "node --version",
    "--json",
  ]);
  return String(created.task_id);
}

async function refused(root: string, argv: string[], message: string) {
  const io = captureStdIO();
  try {
    expect(await runCli([...argv, "--root", root])).not.toBe(0);
    expect(io.stderr).toContain(message);
  } finally {
    io.restore();
  }
}

describe("operator policy authority renewal", () => {
  it("renews changed repository policy through the explicit operator CLI", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeConfig(root, defaultConfig());
    const taskId = await createTask(root);
    const command = await loadCommandContext({ cwd: root });
    const runtime = await createKernelRuntime({
      command,
      task_id: taskId,
      transport: "manual",
      operation_id: "renewal-fixture",
    });
    const contract = {
      objective: "Build a fixture result",
      acceptance_criteria: ["Result is validated"],
      verification_commands: ["node --version"],
      role: "EXECUTOR" as const,
    };
    const definitions = [
      {
        id: "build",
        contract_digest: k.kernelDigest(contract),
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["result"],
        optional: false,
        execution_requirements: {
          scope_roots: ["result.txt"],
          repository_effects: ["source_code"],
          external_effects: [],
          capabilities: ["repository_write"],
          resources: [],
        },
      },
    ];
    const plan = {
      revision: 1,
      digest: k.kernelDigest({ revision: 1, work_items: definitions }),
      state: "PROPOSED" as const,
      approval_actor_id: null,
      approval_evidence_digest: null,
      work_items: definitions,
    };
    expect(
      await runtime.lifecycle.apply(
        await runtime.input({ kind: "propose_plan", plan }, "renewal-proposal", true),
        [contract],
      ),
    ).toMatchObject({ kind: "committed" });
    expect(
      await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
    ).toBe(0);
    expect(
      await runtime.lifecycle.apply(
        await runtime.input(
          {
            kind: "materialize_work_items",
            plan_revision: plan.revision,
            plan_digest: plan.digest,
          },
          "renewal-work-items",
        ),
      ),
    ).toMatchObject({ kind: "committed" });
    const before = await runtime.adapter.read(taskId);
    if (before.kind !== "canonical") throw new Error(before.kind);
    await mkdir(path.join(root, ".agentplane/policy"), { recursive: true });
    await writeFile(path.join(root, ".agentplane/policy/local.md"), "Reviewed local policy.\n");
    await expect(runtime.authority.resolve(taskId)).rejects.toThrow("native_policy_changed");
    await refused(
      root,
      ["task", "plan", "approve", taskId, "--renew-authority", "--by", "EXECUTOR"],
      "explicit --by USER",
    );
    expect(
      await runCliSilent([
        "task",
        "plan",
        "approve",
        taskId,
        "--renew-authority",
        "--by",
        "USER",
        "--root",
        root,
      ]),
    ).toBe(0);
    const after = await runtime.adapter.read(taskId);
    if (after.kind !== "canonical") throw new Error(after.kind);
    expect(after.record.aggregate.current_plan).toEqual(before.record.aggregate.current_plan);
    expect(after.record.aggregate.work_items).toEqual(before.record.aggregate.work_items);
    expect(after.record.aggregate.authority_lineage).toHaveLength(2);
    await expect(runtime.authority.resolve(taskId)).resolves.toMatchObject({
      authority: { plan_digest: plan.digest },
    });
  });
});
