import { readFile } from "node:fs/promises";
import path from "node:path";

import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { loadCommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";

import {
  addTask,
  commitPath,
  freezeTaskExecutionBase,
  execFileAsync,
  prepareTypedReview,
} from "./evaluator-test-helpers.js";

describe("evaluator verification contract", () => {
  it("fails closed when the persisted contract omits the exact evaluated diff", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV26";
    await commitPath(root, "README.md", "base\n", "chore: establish base");
    await addTask(root, taskId);
    await freezeTaskExecutionBase(root, taskId);
    await execFileAsync("git", ["switch", "-c", "task/evaluator-contract"], { cwd: root });
    await commitPath(root, "src/evaluated.ts", "export const evaluated = true;\n", "feat: target");
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    const contract = resolveTaskExecutionContract({
      config: command.config,
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      requestedMode: "repository",
    });
    await applyTaskMutation({
      ctx: command,
      taskId,
      build: () => ({
        intents: setTaskFieldsIntent({
          execution_contract: contract,
          verification: {
            state: "ok",
            updated_at: "2026-01-02T00:00:00.000Z",
            updated_by: "TESTER",
            note: "Verification with an undercomputed contract",
          },
        }),
      }),
    });

    await expect(prepareTypedReview(root, taskId)).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: {
        reason_code: "verification_contract_diff_incomplete",
        missing_paths: ["src/evaluated.ts"],
      },
    });
  });

  it("evaluates a branch from the current base merge point after base integration", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV27";
    await commitPath(root, "README.md", "base\n", "chore: establish base");
    await addTask(root, taskId);
    await freezeTaskExecutionBase(root, taskId);
    await execFileAsync("git", ["switch", "-c", "task/evaluator-current-base"], { cwd: root });
    await commitPath(root, "src/task-owned.ts", "export const taskOwned = true;\n", "feat: task");
    await execFileAsync("git", ["switch", "main"], { cwd: root });
    await commitPath(
      root,
      "src/unrelated-main.ts",
      "export const unrelated = true;\n",
      "feat: main",
    );
    await execFileAsync("git", ["switch", "task/evaluator-current-base"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-edit", "main"], { cwd: root });

    const { prepared } = await prepareTypedReview(root, taskId);
    const actualDiff = prepared.work_order.evidence.find((entry) => entry.kind === "actual_diff");
    if (!actualDiff) throw new Error("Missing actual-diff evidence.");
    const frozenDiff = await readFile(path.join(root, actualDiff.path), "utf8");

    expect(frozenDiff).toContain("src/task-owned.ts");
    expect(frozenDiff).not.toContain("src/unrelated-main.ts");
  });

  it("preserves the local merge base when base tracking cannot prove an integrated base", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV28";
    await commitPath(root, "README.md", "base\n", "chore: establish base");
    await addTask(root, taskId);
    const frozenBase = await freezeTaskExecutionBase(root, taskId);
    await execFileAsync("git", ["switch", "-c", "task/evaluator-stale-base"], { cwd: root });
    await commitPath(root, "src/task-owned.ts", "export const taskOwned = true;\n", "feat: task");
    await execFileAsync("git", ["switch", "main"], { cwd: root });
    await commitPath(
      root,
      "src/unrelated-main.ts",
      "export const unrelated = true;\n",
      "feat: main",
    );
    await execFileAsync("git", ["switch", "task/evaluator-stale-base"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-edit", "main"], { cwd: root });
    const { stdout: integratedStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const integratedHead = integratedStdout.trim();
    await execFileAsync("git", ["remote", "add", "origin", root], { cwd: root });
    await execFileAsync(
      "git",
      ["update-ref", "refs/remotes/origin/task/evaluator-stale-base", integratedHead],
      { cwd: root },
    );
    await execFileAsync(
      "git",
      ["branch", "--set-upstream-to", "origin/task/evaluator-stale-base"],
      { cwd: root },
    );
    await execFileAsync("git", ["update-ref", "refs/heads/main", frozenBase], { cwd: root });

    const { prepared } = await prepareTypedReview(root, taskId);
    const actualDiff = prepared.work_order.evidence.find((entry) => entry.kind === "actual_diff");
    if (!actualDiff) throw new Error("Missing actual-diff evidence.");
    const frozenDiff = await readFile(path.join(root, actualDiff.path), "utf8");

    expect(frozenDiff).toContain("src/task-owned.ts");
    expect(frozenDiff).toContain("src/unrelated-main.ts");
  });

  it("does not mistake a task-owned feature merge for an integrated base", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV29";
    await commitPath(root, "README.md", "base\n", "chore: establish base");
    await addTask(root, taskId);
    await freezeTaskExecutionBase(root, taskId);
    await execFileAsync("git", ["switch", "-c", "feature/task-owned"], { cwd: root });
    await commitPath(root, "src/feature-owned.ts", "export const featureOwned = true;\n", "feat: feature");
    await execFileAsync("git", ["switch", "main"], { cwd: root });
    await execFileAsync("git", ["switch", "-c", "task/evaluator-feature-merge"], { cwd: root });
    await commitPath(root, "src/task-owned.ts", "export const taskOwned = true;\n", "feat: task");
    await execFileAsync("git", ["merge", "--no-edit", "feature/task-owned"], { cwd: root });
    const { stdout: publishedStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    await execFileAsync("git", ["remote", "add", "origin", root], { cwd: root });
    await execFileAsync(
      "git",
      ["update-ref", "refs/remotes/origin/task/evaluator-feature-merge", publishedStdout.trim()],
      { cwd: root },
    );
    await execFileAsync(
      "git",
      ["branch", "--set-upstream-to", "origin/task/evaluator-feature-merge"],
      { cwd: root },
    );

    const { prepared } = await prepareTypedReview(root, taskId);
    const actualDiff = prepared.work_order.evidence.find((entry) => entry.kind === "actual_diff");
    if (!actualDiff) throw new Error("Missing actual-diff evidence.");
    const frozenDiff = await readFile(path.join(root, actualDiff.path), "utf8");

    expect(frozenDiff).toContain("src/task-owned.ts");
    expect(frozenDiff).toContain("src/feature-owned.ts");
  });

  it("uses the tracked base while retaining a later task-owned merge", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV30";
    await commitPath(root, "README.md", "base\n", "chore: establish base");
    await addTask(root, taskId);
    const frozenBase = await freezeTaskExecutionBase(root, taskId);
    await execFileAsync("git", ["switch", "-c", "task/evaluator-base-then-feature"], { cwd: root });
    await commitPath(root, "src/task-owned.ts", "export const taskOwned = true;\n", "feat: task");
    await execFileAsync("git", ["switch", "main"], { cwd: root });
    await commitPath(root, "src/integrated-main.ts", "export const integrated = true;\n", "feat: main");
    const { stdout: integratedStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    await execFileAsync("git", ["switch", "-c", "feature/later-task-owned", frozenBase], {
      cwd: root,
    });
    await commitPath(root, "src/feature-owned.ts", "export const featureOwned = true;\n", "feat: feature");
    await execFileAsync("git", ["switch", "task/evaluator-base-then-feature"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-edit", "main"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-edit", "feature/later-task-owned"], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", root], { cwd: root });
    await execFileAsync(
      "git",
      ["update-ref", "refs/remotes/origin/main", integratedStdout.trim()],
      { cwd: root },
    );
    await execFileAsync("git", ["branch", "--set-upstream-to", "origin/main", "main"], {
      cwd: root,
    });
    await execFileAsync("git", ["update-ref", "refs/heads/main", frozenBase], { cwd: root });

    const { prepared } = await prepareTypedReview(root, taskId);
    const actualDiff = prepared.work_order.evidence.find((entry) => entry.kind === "actual_diff");
    if (!actualDiff) throw new Error("Missing actual-diff evidence.");
    const frozenDiff = await readFile(path.join(root, actualDiff.path), "utf8");

    expect(frozenDiff).toContain("src/task-owned.ts");
    expect(frozenDiff).toContain("src/feature-owned.ts");
    expect(frozenDiff).not.toContain("src/integrated-main.ts");
  });
});
