import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { createTask } from "@agentplaneorg/core";
import { describe, expect, it } from "vitest";

import { mkGitRepoRoot, writeDefaultConfig } from "../../cli/run-cli.test-helpers.js";
import { loadCommandContext, loadTaskFromContext } from "./task-backend.js";

async function writeLocalBackendConfig(root: string): Promise<void> {
  const configPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
  await mkdir(path.dirname(configPath), { recursive: true });
  await writeFile(
    configPath,
    JSON.stringify({ id: "local", version: 1, settings: { dir: ".agentplane/tasks" } }, null, 2),
    "utf8",
  );
}

describe("commands/shared/task-backend CommandContext", () => {
  it("loadCommandContext loads config/backend once and exposes backendConfigPath", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeLocalBackendConfig(root);

    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    expect(ctx.backendId).toBe("local");
    expect(ctx.resolved.gitRoot).toBe(root);
    expect(ctx.backendConfigPath).toBe(path.join(root, ".agentplane/backends/local/backend.json"));
  });

  it("loadTaskFromContext reads an existing task and throws a deterministic ENOENT when missing", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeLocalBackendConfig(root);

    const created = await createTask({
      cwd: root,
      rootOverride: root,
      title: "Context test",
      description: "Ensure CommandContext can load tasks from the configured backend",
      owner: "TESTER",
      priority: "med",
      tags: ["testing"],
      dependsOn: [],
      verify: [],
    });

    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = await loadTaskFromContext({ ctx, taskId: created.id });
    expect(task.id).toBe(created.id);

    await expect(
      loadTaskFromContext({ ctx, taskId: "202602061915-MISSING0" }),
    ).rejects.toMatchObject({
      exitCode: 4,
      code: "E_IO",
    });
  });
});
