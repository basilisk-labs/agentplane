import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { createTask } from "@agentplaneorg/core";
import { describe, expect, it } from "vitest";

import {
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../../cli/run-cli.test-helpers.js";
import { loadCommandContext, loadTaskFromContext } from "../../commands/shared/task-backend.js";
import { assembleRunnerTaskContext } from "./task-context.js";

installRunCliIntegrationHarness();

async function writeLocalBackendConfig(root: string): Promise<void> {
  const configPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
  await mkdir(path.dirname(configPath), { recursive: true });
  await writeFile(
    configPath,
    JSON.stringify({ id: "local", version: 1, settings: { dir: ".agentplane/tasks" } }, null, 2),
    "utf8",
  );
}

describe("assembleRunnerTaskContext", () => {
  it("assembles canonical task context from the configured local backend", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeLocalBackendConfig(root);

    const dep = await createTask({
      cwd: root,
      rootOverride: root,
      title: "Dependency task",
      description: "Dependency task for runner context tests",
      owner: "CODER",
      priority: "med",
      tags: ["code"],
      dependsOn: [],
      verify: [],
    });
    const main = await createTask({
      cwd: root,
      rootOverride: root,
      title: "Main task",
      description: "Main task for runner context tests",
      owner: "CODER",
      priority: "high",
      tags: ["code", "runner"],
      dependsOn: [dep.id],
      verify: ["bunx vitest run packages/agentplane/src/runner/context/task-context.test.ts"],
    });

    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const depTask = await loadTaskFromContext({ ctx, taskId: dep.id });
    await ctx.taskBackend.writeTask({
      ...depTask,
      status: "DONE",
    });
    const mainTask = await loadTaskFromContext({ ctx, taskId: main.id });
    await ctx.taskBackend.writeTask({
      ...mainTask,
      status: "DOING",
      comments: [{ author: "CODER", body: "Start: assemble runner task context." }],
      events: [
        {
          type: "status",
          at: "2026-03-23T14:05:00.000Z",
          author: "CODER",
          from: "TODO",
          to: "DOING",
          note: "Start: assemble runner task context.",
        },
      ],
    });

    const assembled = await assembleRunnerTaskContext({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: main.id,
    });

    expect(assembled.repository.git_root).toBe(root);
    expect(assembled.repository.workflow_dir).toBe(".agentplane/tasks");
    expect(assembled.repository.backend_id).toBe("local");
    expect(assembled.task.task_id).toBe(main.id);
    expect(assembled.task.frontmatter.id).toBe(main.id);
    expect(assembled.task.data.title).toBe("Main task");
    expect(Object.keys(assembled.task.sections)).toContain("Summary");
    expect(assembled.task.comments).toEqual([
      { author: "CODER", body: "Start: assemble runner task context." },
    ]);
    expect(assembled.task.events).toEqual([
      {
        type: "status",
        at: "2026-03-23T14:05:00.000Z",
        author: "CODER",
        from: "TODO",
        to: "DOING",
        note: "Start: assemble runner task context.",
      },
    ]);
    expect(assembled.task.dependency_state).toEqual({
      ready: true,
      missing: [],
      incomplete: [],
      completed: [dep.id],
    });
    expect(assembled.task.readme_path).toBe(
      path.join(root, ".agentplane/tasks", main.id, "README.md"),
    );
    expect(assembled.task.doc).toContain("## Summary");
  });

  it("returns a typed failure when the task is missing", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeLocalBackendConfig(root);

    await expect(
      assembleRunnerTaskContext({
        cwd: root,
        rootOverride: root,
        task_id: "202603231500-MISSING0",
      }),
    ).rejects.toMatchObject({
      exitCode: 4,
      code: "E_IO",
    });
  });
});
