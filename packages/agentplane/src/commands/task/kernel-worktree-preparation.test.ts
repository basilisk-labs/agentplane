import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, writeFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { configureGitUser, mockConfig, tempRepo } from "@agentplane/testkit";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
} from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import {
  observeKernelRepository,
  kernelRepositoryChangedPaths,
} from "../../runner/observation/kernel-repository.js";
import { loadCommandContext } from "../shared/task-backend.js";
import {
  beginKernelWorktreePreparation,
  observeKernelWorktreePreparation,
  recordKernelWorktreePreparation,
} from "./kernel-worktree-preparation.js";

const git = promisify(execFile);

describe("native clean worktree preparation evidence", { timeout: 120_000 }, () => {
  it.each([
    "unchanged",
    "source-changed",
    "target-head-changed",
    "interrupted",
    "interrupted-target-changed",
    "interrupted-source-changed",
  ])("binds the dirty source without granting its absent edits: %s", async (scenario) => {
    const repo = await tempRepo({ branch: "main" });
    await configureGitUser(repo.root);
    await repo.writeConfig(
      mockConfig((config) => {
        config.workflow_mode = "branch_pr";
      }),
    );
    await writeFile(path.join(repo.root, "outside.txt"), "committed\n");
    await git("git", ["add", "."], { cwd: repo.root });
    await git("git", ["-c", "core.hooksPath=/dev/null", "commit", "-m", "seed checkout"], {
      cwd: repo.root,
    });
    await writeFile(path.join(repo.root, "outside.txt"), "user tracked change\n");
    await writeFile(path.join(repo.root, "scratch.txt"), "user untracked change\n");
    const command = await loadCommandContext({ cwd: repo.root });
    const observe = (root: string) =>
      observeKernelRepository({
        repository_root: root,
        repository_identity: replayRepositoryIdentity,
        operational_paths: [
          command.config.paths.workflow_dir,
          command.config.paths.tasks_path,
          command.config.paths.worktrees_dir,
        ],
      });
    const before = await observe(repo.root);
    const journey = kernelReplayJourney("branch_pr");
    const taskId = journey.task.id;
    const parent = {
      ...journey.steps[2]!.input.authority!,
      scope_roots: ["src"],
      repository_fingerprint: before.fingerprint,
    };
    parent.digest = k.authorityDigest(parent);
    const target = path.join(repo.root, ".agentplane/worktrees/owner");
    if (scenario.startsWith("interrupted")) {
      await beginKernelWorktreePreparation({
        command,
        taskId,
        parent,
        before,
        targetHead: (await git("git", ["rev-parse", "HEAD"], { cwd: repo.root })).stdout.trim(),
      });
    }
    await git("git", ["worktree", "add", "-b", `task/${taskId}/owner`, target], { cwd: repo.root });
    const targetCommand = await loadCommandContext({ cwd: target });
    const current = await observe(target);
    expect(kernelRepositoryChangedPaths(before, current)).toEqual(["outside.txt", "scratch.txt"]);
    if (scenario === "interrupted-target-changed" || scenario === "interrupted-source-changed") {
      await writeFile(
        path.join(scenario === "interrupted-target-changed" ? target : repo.root, "outside.txt"),
        "concurrent change\n",
      );
      expect(
        await observeKernelWorktreePreparation({
          command: targetCommand,
          taskId,
          parent,
          current: await observe(target),
        }),
      ).toBeNull();
      return;
    }
    if (scenario !== "interrupted")
      expect(
        await observeKernelWorktreePreparation({ command: targetCommand, taskId, parent, current }),
      ).toBeNull();
    if (!scenario.startsWith("interrupted"))
      await beginKernelWorktreePreparation({
        command,
        taskId,
        parent,
        before,
        targetHead: (await git("git", ["rev-parse", "HEAD"], { cwd: repo.root })).stdout.trim(),
      });
    if (scenario === "target-head-changed") {
      await writeFile(path.join(target, "outside.txt"), "unauthorized committed change\n");
      await git("git", ["add", "outside.txt"], { cwd: target });
      await git(
        "git",
        ["-c", "core.hooksPath=/dev/null", "commit", "-m", "concurrent target change"],
        { cwd: target },
      );
      await expect(
        recordKernelWorktreePreparation({ command, taskId, parent, before, target }),
      ).rejects.toMatchObject({
        code: "E_VALIDATION",
        context: { reason_code: "canonical_worktree_preparation_unproven" },
      });
      return;
    }
    if (scenario === "source-changed") {
      await writeFile(path.join(repo.root, "outside.txt"), "concurrent user change\n");
      await expect(
        recordKernelWorktreePreparation({ command, taskId, parent, before, target }),
      ).rejects.toMatchObject({
        code: "E_VALIDATION",
        context: { reason_code: "canonical_worktree_preparation_unproven" },
      });
      return;
    }
    if (scenario !== "interrupted")
      await recordKernelWorktreePreparation({ command, taskId, parent, before, target });
    const observation = await observeKernelWorktreePreparation({
      command: targetCommand,
      taskId,
      parent,
      current,
    });
    expect(observation).toMatchObject({ kind: "worktree_preparation", changed_paths: [] });
    const child = {
      ...parent,
      repository_fingerprint: current.fingerprint,
      provenance: {
        ...parent.provenance,
        kind: "SYSTEM" as const,
        parent_authority_digest: parent.digest,
      },
    };
    child.digest = k.authorityDigest(child);
    expect(
      k.continuationIssues(parent, { authority: child, approval_mode: null, observation }),
    ).toEqual([]);
    expect(
      k.continuationIssues(parent, {
        authority: child,
        approval_mode: null,
        observation: { ...observation!, changed_paths: ["outside.txt"] },
      }),
    ).toContain("worktree_preparation_binding");
    expect(await readFile(path.join(repo.root, "outside.txt"), "utf8")).toBe(
      "user tracked change\n",
    );
    expect(await readFile(path.join(repo.root, "scratch.txt"), "utf8")).toBe(
      "user untracked change\n",
    );
    await writeFile(path.join(target, "outside.txt"), "later unauthorized mutation\n");
    const changed = await observe(target);
    expect(
      await observeKernelWorktreePreparation({
        command: targetCommand,
        taskId,
        parent,
        current: changed,
      }),
    ).toBeNull();
    expect(kernelRepositoryChangedPaths(current, changed)).toEqual(["outside.txt"]);
    expect(await readFile(path.join(repo.root, "outside.txt"), "utf8")).toBe(
      "user tracked change\n",
    );
  });
});
