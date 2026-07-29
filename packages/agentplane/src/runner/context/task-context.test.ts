import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  createTask,
  renderTaskDocFromSections,
  taskDocToSectionMap,
} from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import {
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { loadCommandContext, loadTaskFromContext } from "../../commands/shared/task-backend.js";
import { assembleRunnerTaskContext, RUNNER_TASK_CONTEXT_BUDGETS } from "./task-context.js";

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
    expect(assembled.task.metadata.task_id).toBe(main.id);
    expect(assembled.task.narrative.title).toBe("Main task");
    expect(assembled.task.narrative.sections.map((section) => section.name)).not.toContain(
      "Summary",
    );
    expect(assembled.task.compaction.omissions).toEqual(
      expect.arrayContaining([
        {
          section: "Summary",
          required: true,
          reason_code: "required_section_unavailable",
        },
      ]),
    );
    expect(assembled.task.history.comments).toEqual([
      { author: "CODER", body: "Start: assemble runner task context." },
    ]);
    expect(assembled.task.history.events).toEqual([
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
    expect(assembled.task).not.toHaveProperty("data");
    expect(assembled.task).not.toHaveProperty("frontmatter");
    expect(assembled.task).not.toHaveProperty("doc");
    expect(assembled.source_task.title).toBe("Main task");
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

  it("compacts long task history and exposes truncation metadata deterministically", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeLocalBackendConfig(root);

    const main = await createTask({
      cwd: root,
      rootOverride: root,
      title: "Long history task",
      description: "Long task for runner compaction tests",
      owner: "CODER",
      priority: "high",
      tags: ["code", "runner"],
      dependsOn: [],
      verify: [],
    });

    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = await loadTaskFromContext({ ctx, taskId: main.id });
    const longBody = "Long comment payload ".repeat(180);
    const longNote = "Long event note ".repeat(120);
    const currentSections = task.sections ?? {};
    const longSections = {
      ...currentSections,
      Findings: "Long findings ".repeat(900),
    };
    const longDoc = renderTaskDocFromSections(longSections);
    await ctx.taskBackend.writeTask({
      ...task,
      status: "DOING",
      doc: longDoc,
      sections: taskDocToSectionMap(longDoc),
      comments: Array.from({ length: 28 }, (_, index) => ({
        author: "CODER",
        body: `${String(index).padStart(2, "0")} ${longBody}`,
      })),
      events: Array.from({ length: 52 }, (_, index) => ({
        type: "comment",
        at: `2026-03-23T14:${String(index % 60).padStart(2, "0")}:00.000Z`,
        author: "CODER",
        note: `${String(index).padStart(2, "0")} ${longNote}`,
      })),
    });

    const assembled = await assembleRunnerTaskContext({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: main.id,
    });

    expect(assembled.task.history.comments.length).toBeLessThanOrEqual(
      RUNNER_TASK_CONTEXT_BUDGETS.comments_max_count,
    );
    expect(assembled.task.history.events.length).toBeLessThanOrEqual(
      RUNNER_TASK_CONTEXT_BUDGETS.events_max_count,
    );
    expect(assembled.task.history.comments.at(-1)?.body).toContain("Long comment payload");
    expect(assembled.task.history.comments[0]?.body).not.toContain("00 Long comment payload");
    expect(assembled.task.compaction).toMatchObject({
      sections: { truncated: true },
      comments: {
        truncated: true,
        original_count: 28,
        emitted_count: assembled.task.history.comments.length,
      },
      events: {
        truncated: true,
        original_count: 52,
        emitted_count: assembled.task.history.events.length,
      },
    });
    expect(assembled.task.compaction.omissions).toEqual(
      expect.arrayContaining([
        {
          section: "Summary",
          required: true,
          reason_code: "required_section_unavailable",
        },
      ]),
    );
    expect(assembled.task.compaction.serialized.duplicate_bytes_removed).toBeGreaterThan(0);
    expect(assembled.task.compaction.serialized.emitted_bytes).toBeLessThan(
      assembled.task.compaction.serialized.source_bytes * 0.7,
    );
    expect(assembled.task.readme_path).toBe(
      path.join(root, ".agentplane/tasks", main.id, "README.md"),
    );
  });

  it("fails with a structured issue instead of truncating a required section", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeLocalBackendConfig(root);
    const task = await createTask({
      cwd: root,
      rootOverride: root,
      title: "Required section budget fixture",
      description: "Exercise required section compaction refusal.",
      owner: "CODER",
      priority: "high",
      tags: ["runner"],
      dependsOn: [],
      verify: [],
    });
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    ctx.config.tasks.doc.required_sections = ["Summary"];
    const loaded = await loadTaskFromContext({ ctx, taskId: task.id });
    const sections = { ...(loaded.sections ?? {}), Summary: "required ".repeat(500) };
    await ctx.taskBackend.writeTask({
      ...loaded,
      doc: renderTaskDocFromSections(sections),
      sections,
    });

    await expect(
      assembleRunnerTaskContext({ ctx, cwd: root, rootOverride: root, task_id: task.id }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: {
        reason_code: "task_episode_required_section_exceeds_budget",
        section: "Summary",
      },
    });
  });

  it("uses configured structural section metadata for custom non-English headings", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeLocalBackendConfig(root);
    const task = await createTask({
      cwd: root,
      rootOverride: root,
      title: "Локализованный контекст",
      description: "Проверяет структурный приоритет.",
      owner: "CODER",
      priority: "high",
      tags: ["runner"],
      dependsOn: [],
      verify: [],
    });
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    ctx.config.tasks.doc.required_sections = ["Контекст", "Проверка"];
    const loaded = await loadTaskFromContext({ ctx, taskId: task.id });
    const sections = {
      Summary: "Optional English heading must not outrank structural metadata.",
      Контекст: "Обязательный контекст.",
      Проверка: "Обязательная проверка.",
      Дополнительно: "Необязательная секция.",
    };
    await ctx.taskBackend.writeTask({
      ...loaded,
      doc: renderTaskDocFromSections(sections),
      sections,
    });

    const assembled = await assembleRunnerTaskContext({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: task.id,
    });

    expect(assembled.task.section_policy).toEqual({
      source: "task_document_schema",
      required_sections: ["Контекст", "Проверка"],
    });
    expect(assembled.task.narrative.sections.slice(0, 2)).toEqual([
      { name: "Контекст", text: "Обязательный контекст.", required: true },
      { name: "Проверка", text: "Обязательная проверка.", required: true },
    ]);
  });

  it("keeps CLI-managed verification history out of required episode input", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeLocalBackendConfig(root);
    const task = await createTask({
      cwd: root,
      rootOverride: root,
      title: "Verification history budget fixture",
      description: "Formal verification history stays outside the required semantic core.",
      owner: "CODER",
      priority: "high",
      tags: ["runner"],
      dependsOn: [],
      verify: [],
    });
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const loaded = await loadTaskFromContext({ ctx, taskId: task.id });
    const sections = {
      ...(loaded.sections ?? {}),
      Summary: "Required semantic summary.",
      Scope: "Required semantic scope.",
      Plan: "Required semantic plan.",
      "Verify Steps": "Required semantic acceptance checks.",
      Verification: [
        "<!-- BEGIN VERIFICATION RESULTS -->",
        "Formal lifecycle record ".repeat(400),
      ].join("\n"),
    };
    await ctx.taskBackend.writeTask({
      ...loaded,
      doc: renderTaskDocFromSections(sections),
      sections,
    });

    const assembled = await assembleRunnerTaskContext({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: task.id,
    });

    expect(assembled.task.section_policy.required_sections).not.toContain("Verification");
    const verificationSection = assembled.task.narrative.sections.find(
      (section) => section.name === "Verification",
    );
    expect(verificationSection).toMatchObject({ name: "Verification", required: false });
    expect(verificationSection?.text).toContain("Formal lifecycle record");
    expect(assembled.task.compaction.sections.truncated).toBe(true);
  });
});
