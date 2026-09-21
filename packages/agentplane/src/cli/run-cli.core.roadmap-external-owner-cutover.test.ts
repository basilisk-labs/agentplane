import { writeFile } from "node:fs/promises";
import path from "node:path";

import { TASK_KERNEL_EXTENSION } from "../adapters/task-backend/kernel-record.js";
import {
  captureStdIO,
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { makeTaskFixture } from "@agentplane/testkit/task";
import { describe, expect, it } from "vitest";

import { loadCommandContext } from "../commands/shared/task-backend.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

async function repository(): Promise<string> {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  await writeConfig(root, defaultConfig());
  await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
  await commitAll(root, "seed Kernel owner cutover");
  return root;
}

async function invoke(root: string, args: string[]) {
  const io = captureStdIO();
  try {
    const code = await runCli([...args, "--root", root]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

describe("LC-15 external owner cutover", { timeout: 120_000 }, () => {
  it("creates a Kernel-owned record and advances only through the canonical coordinator", async () => {
    const root = await repository();
    const created = await invoke(root, [
      "task",
      "new",
      "--title",
      "Kernel owner cutover",
      "--description",
      "Exercise the canonical external route.",
      "--owner",
      "CODER",
      "--priority",
      "med",
      "--tag",
      "code",
      "--verify",
      "bun run test:critical",
    ]);
    expect(created.code, created.stderr).toBe(0);
    const taskId = created.stdout.trim();
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = await command.taskBackend.getTask(taskId);
    expect(task?.extensions).toHaveProperty(TASK_KERNEL_EXTENSION);

    const advanced = await invoke(root, ["task", "advance", taskId, "--agent-json"]);
    expect(advanced.code, advanced.stderr).toBe(0);
    expect(JSON.parse(advanced.stdout)).toMatchObject({
      task_id: taskId,
      action: { kind: "agent_episode" },
      authority: { role: "PLANNER" },
      exchange: { work_order_ref: "work-order.json", result_ref: "result.json" },
    });
  });

  it("gives an exact migration command for a legacy record instead of selecting its executor", async () => {
    const root = await repository();
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = makeTaskFixture({ id: "202609210001-ABC1", status: "TODO" });
    await command.taskBackend.writeTask(task);

    const result = await invoke(root, ["task", "advance", task.id, "--agent-json"]);
    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain(`agentplane task kernel-migrate ${task.id}`);
    expect(result.stderr).toContain("Ordinary advancement is disabled");
  });

  it("rejects an unknown Kernel record version without falling back to legacy advancement", async () => {
    const root = await repository();
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = makeTaskFixture({
      id: "202609210002-XYZ1",
      status: "TODO",
      extensions: {
        [TASK_KERNEL_EXTENSION]: { schema_version: 999, kind: "canonical_task" },
      },
    });
    await command.taskBackend.writeTask(task);

    const result = await invoke(root, ["task", "advance", task.id, "--agent-json"]);
    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain("unsupported or malformed Task Kernel record");
    expect(result.stderr).toContain("No fallback executor was selected");
  });
});
