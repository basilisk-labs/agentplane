import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import {
  createTask as createLegacyTask,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  parseTaskReadme,
  setTaskDocSection,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  writeConfig,
} from "@agentplane/testkit";

import { runCli } from "../../cli/run-cli.js";
import { loadCommandContext } from "../shared/task-backend.js";

installRunCliIntegrationHarness();

async function invoke(argv: string[]): Promise<{ code: number; stderr: string; stdout: string }> {
  const io = captureStdIO();
  try {
    const code = await runCli(argv);
    return { code, stderr: io.stderr, stdout: io.stdout };
  } finally {
    io.restore();
  }
}

describe("verification-only replanning revision consistency", () => {
  it.each([false, true])(
    "keeps one revision after a verification-only replan (replace=%s)",
    async (replace) => {
      const root = await mkGitRepoRootWithCommit();
      const config = defaultConfig();
      config.workflow_mode = "direct";
      await writeConfig(root, config);
      const task = await createLegacyTask({
        cwd: root,
        rootOverride: root,
        title: "Verification-only replan",
        description: "Preserve revision coherence",
        priority: "med",
        owner: "CODER",
        tags: ["code"],
        dependsOn: [],
        verify: ["bun --version"],
      });
      for (const [section, text] of [
        ["Summary", "Preserve revision coherence"],
        ["Scope", "- Verification-only refinement"],
        ["Plan", "Implement then verify"],
        ["Verify Steps", "Run bun --version; expect exit 0."],
        ["Rollback Plan", "Restore the previous plan."],
      ] as const) {
        await setTaskDocSection({
          cwd: root,
          rootOverride: root,
          taskId: task.id,
          section,
          text,
          updatedBy: "PLANNER",
        });
      }
      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      const current = (await ctx.taskBackend.getTask(task.id))!;
      const revision = current.revision ?? 1;
      const now = "2026-09-05T00:00:00.000Z";
      const plan = createTaskPlanRevision({
        revision: 1,
        created_at: now,
        proposal: {
          schema_version: 1,
          task_id: task.id,
          planning_baseline: createRepositorySnapshot({
            git: { kind: "commit", sha: "a".repeat(40), ref: "main" },
            dirty_paths: [],
            policy_digest: null,
            config_digest: null,
            context_digest: null,
            task_history_cursor: null,
            captured_at: now,
          }),
          work_items: { schema_version: 1, work_items: [] },
          assumptions: [],
          unresolved_questions: [],
          top_level_validation: {
            schema_version: 1,
            criteria: [],
            checks: [],
            evidence_fingerprint: taskCentricDigest("revision-coherence"),
          },
        },
      });
      await ctx.taskBackend.writeTask(
        {
          ...current,
          extensions: withTaskCentricAggregate(current.extensions, {
            ...createLegacyTaskAggregate({
              id: task.id,
              revision: revision + 1,
              title: current.title,
              description: current.description,
              status: current.status,
              acceptance_criteria: [],
              captured_at: now,
              updated_at: now,
            }),
            lifecycle: "AWAITING_PLAN_APPROVAL",
            current_plan: plan,
          }),
        },
        { expectedRevision: revision },
      );
      const pathToReadme = path.join(root, ".agentplane", "tasks", task.id, "README.md");
      const revisions: [number, number][] = [];
      const observe = async () => {
        const current = parseTaskReadme(await readFile(pathToReadme, "utf8")).frontmatter;
        const embedded = taskCentricAggregateFromExtensions(current.extensions);
        expect(embedded).not.toBeNull();
        revisions.push([current.revision!, embedded!.revision]);
        expect(current.revision, JSON.stringify(revisions)).toBe(embedded!.revision);
      };
      await observe();
      for (const command of [
        [
          "task",
          "plan",
          "approve",
          task.id,
          "--by",
          "USER",
          "--note",
          "Initial approval",
          "--root",
          root,
        ],
        [
          "task",
          "plan",
          "set",
          task.id,
          "--text",
          "Keep implementation; refine verification",
          "--updated-by",
          "PLANNER",
          "--root",
          root,
        ],
        [
          "task",
          "update",
          task.id,
          "--verify",
          "bun --version",
          ...(replace ? ["--replace-verify"] : []),
          "--root",
          root,
        ],
      ]) {
        const result = await invoke(command);
        expect(result.code, `${command.join(" ")}: ${result.stderr}`).toBe(0);
        await observe();
      }
      const approval = await invoke([
        "task",
        "plan",
        "approve",
        task.id,
        "--by",
        "USER",
        "--note",
        "Reapproved verification",
        "--root",
        root,
      ]);
      expect(approval.code).not.toBe(0);
      expect(approval.stderr).toMatch(/replan|replacement|planning/iu);
      await observe();
      const route = await invoke(["task", "next-action", task.id, "--explain", "--root", root]);
      expect(route.code).not.toBe(0);
      expect(route.stderr).toContain("explicit kernel migration");
      expect(route.stdout + route.stderr).not.toContain("task start-ready");
      const startReady = await invoke([
        "task",
        "start-ready",
        task.id,
        "--author",
        "CODER",
        "--body",
        "Start: verification-only replan",
        "--root",
        root,
      ]);
      expect(startReady.code).not.toBe(0);
      expect(startReady.stdout + startReady.stderr).not.toContain("✅ ready");
      await observe();
      expect(revisions).toHaveLength(6);

      const beforeSplit = (await ctx.taskBackend.getTask(task.id))!;
      await ctx.taskBackend.writeTask(
        { ...beforeSplit, description: "Retained foreign projection write" },
        { expectedRevision: beforeSplit.revision },
      );
      const splitReadme = await readFile(pathToReadme, "utf8");
      const split = parseTaskReadme(splitReadme).frontmatter;
      expect(split.revision).toBe(
        taskCentricAggregateFromExtensions(split.extensions)!.revision + 1,
      );
      const blocked = await invoke(["task", "next-action", task.id, "--explain", "--root", root]);
      expect(blocked.code).not.toBe(0);
      expect(blocked.stderr).toContain("Task-centric revision split blocks");
      expect(blocked.stderr).toContain("use only an evidence-specific recovery");
      expect(blocked.stdout + blocked.stderr).not.toContain("task start-ready");
      expect(await readFile(pathToReadme, "utf8")).toBe(splitReadme);
    },
    120_000,
  );
});
