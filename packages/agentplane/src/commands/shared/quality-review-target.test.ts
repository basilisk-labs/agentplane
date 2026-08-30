import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { mkGitRepoRoot } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import {
  recordedTaskImplementationCommitSha,
  resolveQualityReviewTargetSha,
} from "./quality-review-target.js";
import { baseSyncMergeReviewPaths } from "./quality-review-merge.js";

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
  baseRef?: string | null;
}): Promise<string | null> {
  return resolveQualityReviewTargetSha({
    gitRoot: opts.root,
    workflowDir: ".agentplane/tasks",
    taskId: opts.taskId,
    previousEvaluatedSha: opts.previousEvaluatedSha,
    workflowMode: "branch_pr",
    baseRef: opts.baseRef,
  });
}

function taskReadme(opts: {
  taskId: string;
  revision: number;
  title?: string;
  authority?: boolean;
}): string {
  const authority = opts.authority
    ? [
        "extensions:",
        "  agentplane.side_effect_authority:",
        "    grants:",
        "      - id: authority-1",
        "        operationId: route.remote.refresh",
      ].join("\n")
    : "";
  return [
    "---",
    `id: ${opts.taskId}`,
    `title: ${opts.title ?? "Quality target"}`,
    `revision: ${opts.revision}`,
    authority,
    "---",
    "# Quality target",
    "",
  ]
    .filter(Boolean)
    .join("\n");
}

function lifecycleTaskReadme(opts: {
  taskId: string;
  revision: number;
  status: "TODO" | "DOING";
}): string {
  return [
    "---",
    `id: ${opts.taskId}`,
    'title: "Lifecycle-only merge target"',
    `status: ${opts.status}`,
    `revision: ${opts.revision}`,
    "---",
    "# Lifecycle-only merge target",
    "",
  ].join("\n");
}

function implementationReceiptReadme(opts: {
  taskId: string;
  revision: number;
  title?: string;
  implementationSha?: string;
}): string {
  const timestamp = "2026-07-31T12:00:00.000Z";
  const receipt = opts.implementationSha
    ? [
        "commit:",
        `  hash: ${opts.implementationSha}`,
        '  message: "Implement reviewed task"',
        "comments:",
        "  - author: CODER",
        '    body: "Implementation committed"',
        "events:",
        "  - type: status",
        "    from: DOING",
        "    to: DOING",
        "    author: CODER",
        '    note: "Implementation committed"',
        `    at: "${timestamp}"`,
        `doc_updated_at: "${timestamp}"`,
        "doc_updated_by: CODER",
      ].join("\n")
    : "comments: []\nevents: []";
  return [
    "---",
    `id: ${opts.taskId}`,
    `title: ${opts.title ?? "Implementation receipt"}`,
    "status: DOING",
    `revision: ${opts.revision}`,
    receipt,
    "---",
    "# Implementation receipt",
    "",
  ].join("\n");
}

describe("quality review target resolver", () => {
  it("prefers the preserved implementation commit over a metadata-only task commit", () => {
    expect(
      recordedTaskImplementationCommitSha({
        commit: { hash: "metadata-head", message: "pre-merge closure" },
        extensions: {
          implementation_commit: {
            hash: "reviewed-implementation",
            message: "implement feature",
          },
        },
      }),
    ).toBe("reviewed-implementation");
  });

  it("falls back to task commit when no preserved implementation commit exists", () => {
    expect(
      recordedTaskImplementationCommitSha({
        commit: { hash: "implementation-head", message: "implement feature" },
        extensions: {},
      }),
    ).toBe("implementation-head");
  });

  it("preserves the reviewed semantic target across a strict CLI implementation receipt", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-IMPLEMENTATION-RECEIPT";
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      implementationReceiptReadme({ taskId, revision: 1 }),
      "docs: establish task state",
    );
    const reviewedSha = await commitPath(
      root,
      "src/reviewed.ts",
      "export const reviewed = true;\n",
      "feat: implement reviewed task",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      implementationReceiptReadme({
        taskId,
        revision: 2,
        implementationSha: reviewedSha,
      }),
      "chore: record implementation receipt",
    );

    await expect(resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha })).resolves.toBe(
      reviewedSha,
    );
  });

  it("keeps semantic README changes in an implementation receipt commit reviewable", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-IMPLEMENTATION-CHANGE";
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      implementationReceiptReadme({ taskId, revision: 1 }),
      "docs: establish task state",
    );
    const reviewedSha = await commitPath(
      root,
      "src/reviewed.ts",
      "export const reviewed = true;\n",
      "feat: implement reviewed task",
    );
    const receiptSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      implementationReceiptReadme({
        taskId,
        revision: 2,
        title: "Semantic title changed with receipt",
        implementationSha: reviewedSha,
      }),
      "docs: change task while recording receipt",
    );

    await expect(resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha })).resolves.toBe(
      receiptSha,
    );
  });

  it("preserves the prior reviewed target across an authority-only README advance", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-AUTHORITY";
    const reviewedSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      taskReadme({ taskId, revision: 1 }),
      "docs: establish reviewed task state",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      taskReadme({ taskId, revision: 2, authority: true }),
      "chore: record route authority",
    );

    await expect(resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha })).resolves.toBe(
      reviewedSha,
    );
  });

  it("keeps a non-authority README change reviewable", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-README";
    const reviewedSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      taskReadme({ taskId, revision: 1 }),
      "docs: establish reviewed task state",
    );
    const changedSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      taskReadme({ taskId, revision: 2, title: "Changed semantic task metadata" }),
      "docs: change reviewed task metadata",
    );

    await expect(resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha })).resolves.toBe(
      changedSha,
    );
  });

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

  it("preserves a reviewed target across a durable verification record", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-VERIFICATION";
    const reviewedSha = await commitPath(
      root,
      "src/reviewed.ts",
      "export const reviewed = true;\n",
      "feat: establish reviewed implementation",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/verification/command-results.json`,
      '{"kind":"task_verification_record"}\n',
      "test: record durable verification evidence",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/quality/run/quality-report.json`,
      "{}\n",
      "test: record managed review artifact",
    );

    await expect(resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha })).resolves.toBe(
      reviewedSha,
    );
  });

  it("preserves a reviewed target when verify appends a structured finding atomically", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-VERIFY-FINDING";
    const reviewedSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      lifecycleTaskReadme({ taskId, revision: 1, status: "DOING" }),
      "feat: establish reviewed implementation",
    );
    const withFinding = lifecycleTaskReadme({ taskId, revision: 2, status: "DOING" }).replace(
      "## Findings\n",
      "## Findings\n\n### Finding\n- Observation: atomic verify finding\n",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      withFinding,
      "test: record verification and finding",
    );

    await expect(resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha })).resolves.toBe(
      reviewedSha,
    );
  });

  it("preserves a reviewed target across lifecycle evidence and direct supervision artifacts", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-DIRECT-EVIDENCE";
    const reviewedSha = await commitPath(
      root,
      "src/reviewed.ts",
      "export const reviewed = true;\n",
      "feat: establish reviewed implementation",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/evidence/runtime-receipt.json`,
      '{"kind":"agentplane_evidence_bundle"}\n',
      "test: record task lifecycle evidence",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/supervision/declared-checks.json`,
      '{"kind":"direct_task_declared_checks","status":"pass"}\n',
      "test: record direct supervision checks",
    );

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

  it("selects a base-sync merge when the task work is visible only against the merged parent", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-BASE-SYNC";
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      taskReadme({ taskId, revision: 1 }),
      "docs: establish task state",
    );
    const { stdout: baseBranchOutput } = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: root,
    });
    const baseBranch = baseBranchOutput.trim();
    await execFileAsync("git", ["checkout", "-b", "task/base-sync"], { cwd: root });
    await commitPath(
      root,
      "src/reviewed.ts",
      "export const reviewed = true;\n",
      "feat: implement task",
    );
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await commitPath(
      root,
      ".agentplane/tasks/202607240736-OTHER/README.md",
      "unrelated base task state\n",
      "docs: advance unrelated base task",
    );
    await execFileAsync("git", ["checkout", "task/base-sync"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", baseBranch, "-m", "merge: sync base"], {
      cwd: root,
    });
    const { stdout: mergeShaOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });

    await expect(resolveTarget({ root, taskId, baseRef: baseBranch })).resolves.toBe(
      mergeShaOutput.trim(),
    );
  });

  it("ignores a base-sync merge whose task-side delta contains only managed artifacts", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-MANAGED-MERGE";
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      taskReadme({ taskId, revision: 1 }),
      "docs: establish task state",
    );
    const { stdout: baseBranchOutput } = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: root,
    });
    const baseBranch = baseBranchOutput.trim();
    await execFileAsync("git", ["checkout", "-b", "task/managed-base-sync"], { cwd: root });
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/quality/prior/quality-report.json`,
      "{}\n",
      "test: record managed evaluator artifact",
    );
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await commitPath(
      root,
      ".agentplane/tasks/202607240736-OTHER/README.md",
      "unrelated base task state\n",
      "docs: advance unrelated base task",
    );
    await execFileAsync("git", ["checkout", "task/managed-base-sync"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", baseBranch, "-m", "merge: sync base"], {
      cwd: root,
    });

    await expect(resolveTarget({ root, taskId, baseRef: baseBranch })).resolves.toBeNull();
  });

  it("ignores a base-sync merge whose task-side delta is lifecycle-only", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-LIFECYCLE-MERGE";
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      lifecycleTaskReadme({ taskId, revision: 1, status: "TODO" }),
      "docs: establish task state",
    );
    const { stdout: baseBranchOutput } = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: root,
    });
    const baseBranch = baseBranchOutput.trim();
    await execFileAsync("git", ["checkout", "-b", "task/lifecycle-base-sync"], { cwd: root });
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      lifecycleTaskReadme({ taskId, revision: 2, status: "DOING" }),
      "chore: advance task lifecycle",
    );
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await commitPath(
      root,
      ".agentplane/tasks/202607240736-OTHER/README.md",
      "unrelated base task state\n",
      "docs: advance unrelated base task",
    );
    await execFileAsync("git", ["checkout", "task/lifecycle-base-sync"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", baseBranch, "-m", "merge: sync base"], {
      cwd: root,
    });

    await expect(resolveTarget({ root, taskId, baseRef: baseBranch })).resolves.toBeNull();
  });

  it("preserves a previous review across a base-sync merge and later managed artifacts", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-REVIEWED-BASE-SYNC";
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      taskReadme({ taskId, revision: 1 }),
      "docs: establish task state",
    );
    const { stdout: baseBranchOutput } = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: root,
    });
    const baseBranch = baseBranchOutput.trim();
    await execFileAsync("git", ["checkout", "-b", "task/reviewed-base-sync"], { cwd: root });
    const reviewedSha = await commitPath(
      root,
      "src/reviewed-base-sync.ts",
      "export const reviewed = true;\n",
      "feat: implement reviewed task",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/quality/prior/quality-report.json`,
      "{}\n",
      "test: record managed evaluator artifact",
    );
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await commitPath(
      root,
      ".agentplane/tasks/202607240736-OTHER/README.md",
      "unrelated base task state\n",
      "docs: advance unrelated base task",
    );
    await execFileAsync("git", ["checkout", "task/reviewed-base-sync"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", baseBranch, "-m", "merge: sync base"], {
      cwd: root,
    });
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/verification/latest.json`,
      "{}\n",
      "test: record managed verification artifact",
    );

    await expect(
      resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha, baseRef: baseBranch }),
    ).resolves.toBe(reviewedSha);
  });

  it("detects task implementation added after a previous review and before a base-sync merge", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-CHANGED-BASE-SYNC";
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      taskReadme({ taskId, revision: 1 }),
      "docs: establish task state",
    );
    const { stdout: baseBranchOutput } = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: root,
    });
    const baseBranch = baseBranchOutput.trim();
    await execFileAsync("git", ["checkout", "-b", "task/changed-base-sync"], { cwd: root });
    const reviewedSha = await commitPath(
      root,
      "src/changed-base-sync.ts",
      "export const value = 1;\n",
      "feat: add reviewed implementation",
    );
    const changedSha = await commitPath(
      root,
      "src/changed-base-sync.ts",
      "export const value = 2;\n",
      "fix: change implementation after review",
    );
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await commitPath(
      root,
      ".agentplane/tasks/202607240736-OTHER/README.md",
      "unrelated base task state\n",
      "docs: advance unrelated base task",
    );
    await execFileAsync("git", ["checkout", "task/changed-base-sync"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", baseBranch, "-m", "merge: sync base"], {
      cwd: root,
    });

    await expect(
      resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha, baseRef: baseBranch }),
    ).resolves.toBe(changedSha);
  });

  it.each(["combined", "task", "base"])(
    "requires a fresh review when a conflict is resolved to %s content",
    async (resolution) => {
      const root = await mkGitRepoRoot();
      const taskId = "202608300559-MERGE-RESOLUTION";
      await commitPath(
        root,
        `.agentplane/tasks/${taskId}/README.md`,
        taskReadme({ taskId, revision: 1 }),
        "docs: task",
      );
      await commitPath(root, "src/shared.ts", "export const value = 0;\n", "feat: base");
      const { stdout: baseName } = await execFileAsync("git", ["branch", "--show-current"], {
        cwd: root,
      });
      const baseRef = baseName.trim();
      await execFileAsync("git", ["checkout", "-b", "task/conflict-resolution"], { cwd: root });
      const reviewedSha = await commitPath(
        root,
        "src/shared.ts",
        "export const value = 1;\n",
        "feat: task",
      );
      await execFileAsync("git", ["checkout", baseRef], { cwd: root });
      await commitPath(root, "src/shared.ts", "export const value = 2;\n", "feat: changed base");
      await execFileAsync("git", ["checkout", "task/conflict-resolution"], { cwd: root });
      await expect(
        execFileAsync("git", ["merge", "--no-commit", "--no-ff", baseRef], { cwd: root }),
      ).rejects.toThrow();
      const value = resolution === "task" ? 1 : resolution === "base" ? 2 : 3;
      const resolvedSha = await commitPath(
        root,
        "src/shared.ts",
        `export const value = ${value};\n`,
        "fix: resolve semantic conflict",
      );
      await commitPath(
        root,
        `.agentplane/tasks/${taskId}/quality/new/quality-report.json`,
        "{}\n",
        "test: managed artifact",
      );
      await expect(
        resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha, baseRef }),
      ).resolves.toBe(resolvedSha);
    },
  );

  it.each(["new", "base-only"])(
    "detects manual %s source edits inside an otherwise clean base merge",
    async (change) => {
      const root = await mkGitRepoRoot();
      const taskId = "202608300559-MERGE-MANUAL";
      await commitPath(
        root,
        `.agentplane/tasks/${taskId}/README.md`,
        taskReadme({ taskId, revision: 1 }),
        "docs: task",
      );
      const { stdout: baseName } = await execFileAsync("git", ["branch", "--show-current"], {
        cwd: root,
      });
      const baseRef = baseName.trim();
      await execFileAsync("git", ["checkout", "-b", "task/manual-merge"], { cwd: root });
      const reviewedSha = await commitPath(
        root,
        "src/task.ts",
        "export const task = true;\n",
        "feat: task",
      );
      await execFileAsync("git", ["checkout", baseRef], { cwd: root });
      await commitPath(root, "src/base.ts", "export const base = true;\n", "feat: base");
      await execFileAsync("git", ["checkout", "task/manual-merge"], { cwd: root });
      await execFileAsync("git", ["merge", "--no-commit", "--no-ff", baseRef], { cwd: root });
      const resolvedSha = await commitPath(
        root,
        change === "new" ? "src/new.ts" : "src/base.ts",
        "export const manual = true;\n",
        "fix: manual merge edit",
      );
      await expect(
        resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha, baseRef }),
      ).resolves.toBe(resolvedSha);
    },
  );

  it("preserves review reuse for clean base-only implementation changes", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202608300559-MERGE-CLEAN";
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      taskReadme({ taskId, revision: 1 }),
      "docs: task",
    );
    const { stdout: baseName } = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: root,
    });
    const baseRef = baseName.trim();
    await execFileAsync("git", ["checkout", "-b", "task/clean-source-merge"], { cwd: root });
    const reviewedSha = await commitPath(
      root,
      "src/task.ts",
      "export const task = true;\n",
      "feat: task",
    );
    await execFileAsync("git", ["checkout", baseRef], { cwd: root });
    await commitPath(root, "src/base.ts", "export const base = true;\n", "feat: base");
    await execFileAsync("git", ["checkout", "task/clean-source-merge"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", baseRef, "-m", "merge: clean base"], {
      cwd: root,
    });
    await expect(
      resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha, baseRef }),
    ).resolves.toBe(reviewedSha);
  });

  it.each(["task", "base"])(
    "reviews conflicting renames resolved to the %s parent",
    async (selected) => {
      const root = await mkGitRepoRoot();
      const taskId = "202608300559-RENAME";
      await commitPath(
        root,
        "src/original file.ts",
        "export const value = true;\n",
        "feat: original",
      );
      await execFileAsync("git", ["config", "diff.renames", "true"], { cwd: root });
      const { stdout: branch } = await execFileAsync("git", ["branch", "--show-current"], {
        cwd: root,
      });
      const baseRef = branch.trim();
      await execFileAsync("git", ["checkout", "-b", "task/rename"], { cwd: root });
      await execFileAsync("git", ["mv", "src/original file.ts", "src/task.ts"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feat: task rename"], { cwd: root });
      const { stdout: reviewed } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      await execFileAsync("git", ["checkout", baseRef], { cwd: root });
      await execFileAsync("git", ["mv", "src/original file.ts", "src/base.ts"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feat: base rename"], { cwd: root });
      await execFileAsync("git", ["checkout", "task/rename"], { cwd: root });
      await expect(
        execFileAsync("git", ["merge", "--no-commit", "--no-ff", baseRef], { cwd: root }),
      ).rejects.toThrow();
      await execFileAsync(
        "git",
        ["rm", "-f", selected === "task" ? "src/base.ts" : "src/task.ts"],
        { cwd: root },
      );
      await execFileAsync("git", ["add", "-A"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "merge: resolve divergent rename"], {
        cwd: root,
      });
      const { stdout: head } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      await expect(
        resolveTarget({ root, taskId, previousEvaluatedSha: reviewed.trim(), baseRef }),
      ).resolves.toBe(head.trim());
    },
  );

  it("requires fresh review for an octopus base merge without creating Git objects", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202608300559-MERGE-OCTOPUS";
    const initial = await commitPath(root, "src/start.ts", "export {};\n", "feat: initial");
    const { stdout: branch } = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: root,
    });
    const baseRef = branch.trim();
    await execFileAsync("git", ["checkout", "-b", "task/octopus"], { cwd: root });
    const reviewedSha = await commitPath(root, "src/task.ts", "export {};\n", "feat: task");
    await execFileAsync("git", ["checkout", baseRef], { cwd: root });
    await commitPath(root, "src/base.ts", "export {};\n", "feat: base");
    await execFileAsync("git", ["checkout", "-b", "support/octopus", initial], { cwd: root });
    await commitPath(root, "src/support.ts", "export {};\n", "feat: support");
    await execFileAsync("git", ["checkout", "task/octopus"], { cwd: root });
    await execFileAsync(
      "git",
      ["merge", "--no-ff", baseRef, "support/octopus", "-m", "merge: octopus"],
      { cwd: root },
    );
    const { stdout: head } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const before = await execFileAsync("git", ["count-objects", "-v"], { cwd: root });
    await expect(
      resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha, baseRef }),
    ).resolves.toBe(head.trim());
    const after = await execFileAsync("git", ["count-objects", "-v"], { cwd: root });
    expect(after.stdout).toBe(before.stdout);
  });

  it("does not infer clean synchronization from unavailable parent history", async () => {
    const root = await mkGitRepoRoot();
    const head = await commitPath(root, "src/start.ts", "export {};\n", "feat: initial");
    await expect(
      baseSyncMergeReviewPaths({
        gitRoot: root,
        merge: head,
        taskParent: head,
        baseParent: "0".repeat(40),
      }),
    ).resolves.toBeNull();
  });

  it("does not treat a non-base merge as a base-sync work unit", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-NON-BASE-MERGE";
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/README.md`,
      taskReadme({ taskId, revision: 1 }),
      "docs: establish task state",
    );
    const { stdout: baseBranchOutput } = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: root,
    });
    const baseBranch = baseBranchOutput.trim();
    await execFileAsync("git", ["checkout", "-b", "task/non-base-merge"], { cwd: root });
    const reviewedSha = await commitPath(
      root,
      "src/reviewed.ts",
      "export const reviewed = true;\n",
      "feat: implement reviewed task",
    );
    await execFileAsync("git", ["checkout", "-b", "support/lifecycle-artifacts", baseBranch], {
      cwd: root,
    });
    await commitPath(
      root,
      ".agentplane/tasks/202607240736-OTHER/README.md",
      "unrelated lifecycle state\n",
      "docs: advance unrelated lifecycle state",
    );
    await execFileAsync("git", ["checkout", "task/non-base-merge"], { cwd: root });
    await execFileAsync(
      "git",
      ["merge", "--no-ff", "support/lifecycle-artifacts", "-m", "merge: lifecycle artifacts"],
      { cwd: root },
    );

    await expect(
      resolveTarget({ root, taskId, previousEvaluatedSha: reviewedSha, baseRef: baseBranch }),
    ).resolves.toBe(reviewedSha);
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

  it("selects current task metadata layered over a semantic base before the first review", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202607240736-FIRST-METADATA";
    await commitPath(
      root,
      "src/feature.ts",
      "export const value = 1;\n",
      "feat: establish semantic base",
    );
    const metadataSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/manual-note.md`,
      "first review metadata\n",
      "docs: add first review metadata",
    );

    await expect(resolveTarget({ root, taskId })).resolves.toBe(metadataSha);
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
