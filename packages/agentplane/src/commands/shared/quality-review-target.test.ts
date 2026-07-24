import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { mkGitRepoRoot } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { resolveQualityReviewTargetSha } from "./quality-review-target.js";

const execFileAsync = promisify(execFile);

async function commitPath(
  root: string,
  relPath: string,
  content: string,
  message: string,
): Promise<string> {
  const target = path.join(root, relPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
  await execFileAsync("git", ["add", "--", relPath], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return stdout.trim();
}

async function resolveTarget(opts: {
  root: string;
  taskId: string;
  previousEvaluatedSha?: string | null;
}): Promise<string | null> {
  return resolveQualityReviewTargetSha({
    gitRoot: opts.root,
    workflowDir: ".agentplane/tasks",
    taskId: opts.taskId,
    previousEvaluatedSha: opts.previousEvaluatedSha,
  });
}

describe("quality review target resolver", () => {
  it("preserves a reviewed metadata work unit across more than twenty managed artifact commits", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-TARGET";
    await commitPath(root, "src/base.ts", "export {};\n", "feat: establish semantic base");
    const reviewedSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/manual-note.md`,
      "reviewed metadata work unit\n",
      "docs: add metadata work unit",
    );

    for (let index = 0; index < 25; index += 1) {
      await commitPath(
        root,
        `.agentplane/tasks/${taskId}/quality/run-${index}/quality-report.json`,
        `${JSON.stringify({ index })}\n`,
        `test: add managed quality artifact ${index}`,
      );
    }

    await expect(resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha })).resolves.toBe(
      reviewedSha,
    );
  });

  it("selects a semantic commit created after the recorded review", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-SEMANTIC";
    const reviewedSha = await commitPath(
      root,
      "src/feature.ts",
      "export const value = 1;\n",
      "feat: add reviewed implementation",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/quality/run/quality-report.json`,
      "{}\n",
      "test: record managed review artifact",
    );
    const semanticSha = await commitPath(
      root,
      "src/feature.ts",
      "export const value = 2;\n",
      "fix: change implementation after review",
    );

    await expect(resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha })).resolves.toBe(
      semanticSha,
    );
  });

  it("selects a new independently reviewable task metadata work unit", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-METADATA";
    const reviewedSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/manual-note.md`,
      "reviewed metadata\n",
      "docs: add reviewed metadata",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/quality/run/quality-report.json`,
      "{}\n",
      "test: record managed review artifact",
    );
    const newMetadataSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/manual-note.md`,
      "new metadata work unit\n",
      "docs: change metadata after review",
    );

    await expect(resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha })).resolves.toBe(
      newMetadataSha,
    );
  });

  it("does not use an unrelated task artifact as the current task target", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-CURRENT";
    await commitPath(root, "src/base.ts", "export {};\n", "feat: establish semantic base");
    await commitPath(
      root,
      ".agentplane/tasks/202607240736-OTHER/manual-note.md",
      "unrelated task metadata\n",
      "docs: update unrelated task",
    );

    await expect(resolveTarget({ root, taskId })).resolves.toBeNull();
  });

  it("returns no singular target when unrelated task metadata follows the review", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-PRIMARY";
    const reviewedSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/manual-note.md`,
      "reviewed primary metadata\n",
      "docs: review primary metadata",
    );
    await commitPath(
      root,
      ".agentplane/tasks/202607240736-OTHER/manual-note.md",
      "unrelated task metadata\n",
      "docs: update unrelated task",
    );

    await expect(
      resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha }),
    ).resolves.toBeNull();
  });

  it("treats included-task metadata as a new batch review target", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-PRIMARY";
    const includedTaskId = "202607240736-INCLUDED";
    const reviewedSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/manual-note.md`,
      "reviewed primary metadata\n",
      "docs: review primary metadata",
    );
    const includedMetadataSha = await commitPath(
      root,
      `.agentplane/tasks/${includedTaskId}/manual-note.md`,
      "new included metadata\n",
      "docs: update included task",
    );

    await expect(
      resolveQualityReviewTargetSha({
        gitRoot: root,
        workflowDir: ".agentplane/tasks",
        taskId,
        taskIds: [taskId, includedTaskId],
        previousEvaluatedSha: reviewedSha,
      }),
    ).resolves.toBe(includedMetadataSha);
  });

  it("returns no target when the recorded review is not an ancestor of unrelated history", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-CURRENT";
    await commitPath(root, "src/base.ts", "export {};\n", "feat: establish semantic base");
    await commitPath(
      root,
      ".agentplane/tasks/202607240736-OTHER/manual-note.md",
      "unrelated task metadata\n",
      "docs: update unrelated task",
    );

    await expect(
      resolveTarget({
        root,
        taskId,
        previousEvaluatedSha: "f".repeat(40),
      }),
    ).resolves.toBeNull();
  });
});
