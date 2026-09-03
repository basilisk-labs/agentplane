import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { readTask } from "@agentplaneorg/core/tasks";

import { runCli } from "../../cli/run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  gitBranchExists,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  pathExists,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import {
  emptyIntegrationQueue,
  readIntegrationQueue,
  upsertQueuedEntry,
  writeIntegrationQueue,
} from "../pr/integrate/queue-state.js";
import {
  commitAuthorityOnlyTail,
  configureFinalizationRemote,
  createTask,
  createTargetedFixture,
  installFakeGh,
  installFakeGithubOriginLookup,
  markDone,
  runTargetedCleanup,
  runWithFakeGh,
} from "./cleanup-merged.targeted.support.test.js";

installRunCliIntegrationHarness();
const execFileAsync = promisify(execFile);
const TEST_TIMEOUT_MS = 120_000;
const bunTestRuntime = (
  globalThis as typeof globalThis & {
    Bun?: { jest: (moduleUrl: string) => { setDefaultTimeout: (timeoutMs: number) => void } };
  }
).Bun;
bunTestRuntime?.jest(fileURLToPath(import.meta.url)).setDefaultTimeout(TEST_TIMEOUT_MS);
const TEST_WORKFLOW_GITIGNORE =
  ".agentplane/worktrees\n" +
  ".agentplane/cache\n" +
  ".agentplane/cache.sqlite\n" +
  ".agentplane/cache.sqlite-wal\n" +
  ".agentplane/cache.sqlite-shm\n";

describe("cleanup merged targeted provider proof", { timeout: TEST_TIMEOUT_MS }, () => {
  it("recovers a legacy missing PR number from an exact merged branch-and-base lookup", async () => {
    const fixture = await createTargetedFixture({ legacyMissingPrNumber: true });
    const fakeBin = await installFakeGh({ kind: "found", fixture });

    const result = await runTargetedCleanup(fakeBin, fixture);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain("proof=provider_merge");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(false);
    expect(await pathExists(fixture.worktreePath)).toBe(false);
  });

  it(
    "keeps legacy cleanup blocked when branch-and-base lookup returns multiple PRs",
    async () => {
      const fixture = await createTargetedFixture({ legacyMissingPrNumber: true });
      const fakeBin = await installFakeGh({
        additionalBranchPrNumbers: [456],
        kind: "found",
        fixture,
      });

      const result = await runTargetedCleanup(fakeBin, fixture);

      expect(result.code).toBe(5);
      expect(result.stderr).toContain("multiple PR records for the exact branch and base");
      expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
      expect(await pathExists(fixture.worktreePath)).toBe(true);
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "keeps legacy cleanup blocked after semantic local head drift",
    async () => {
      const fixture = await createTargetedFixture({ legacyMissingPrNumber: true });
      await writeFile(
        path.join(fixture.worktreePath, "legacy-semantic-tail.txt"),
        "preserve\n",
        "utf8",
      );
      await commitAll(fixture.worktreePath, `semantic ${fixture.taskId} legacy post-merge tail`);
      const fakeBin = await installFakeGh({ kind: "found", fixture });

      const result = await runTargetedCleanup(fakeBin, fixture);

      expect(result.code).toBe(5);
      expect(result.stderr).toContain(
        "provider merged head is not contained by the recorded merge commit",
      );
      expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
      expect(await pathExists(fixture.worktreePath)).toBe(true);
    },
    TEST_TIMEOUT_MS,
  );

  it(
    "keeps legacy cleanup blocked without exact pre-merge closure evidence",
    async () => {
      const fixture = await createTargetedFixture({ legacyMissingPrNumber: true });
      const metaPath = path.join(
        fixture.root,
        ".agentplane",
        "tasks",
        fixture.taskId,
        "pr",
        "meta.json",
      );
      const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
      delete meta.pre_merge_closure;
      await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");
      await commitAll(fixture.root, `chore ${fixture.taskId} remove legacy closure fixture`);
      const fakeBin = await installFakeGh({ kind: "found", fixture });

      const result = await runTargetedCleanup(fakeBin, fixture);

      expect(result.code).toBe(5);
      expect(result.stderr).toContain("exact pre-merge closure marker is unavailable");
      expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
      expect(await pathExists(fixture.worktreePath)).toBe(true);
    },
    TEST_TIMEOUT_MS,
  );

  it("keeps legacy cleanup blocked when the task commit is outside the closure basis", async () => {
    const fixture = await createTargetedFixture({ legacyMissingPrNumber: true });
    const task = await readTask({ cwd: fixture.root, taskId: fixture.taskId });
    const readme = await readFile(task.readmePath, "utf8");
    const corrupted = readme.replace(/hash: "[0-9a-f]{40}"/u, `hash: "${fixture.branchHead}"`);
    expect(corrupted).not.toBe(readme);
    await writeFile(task.readmePath, corrupted, "utf8");
    await commitAll(fixture.root, `chore ${fixture.taskId} corrupt task commit ancestry`);
    const fakeBin = await installFakeGh({ kind: "found", fixture });

    const result = await runTargetedCleanup(fakeBin, fixture);

    expect(result.code).toBe(5);
    expect(result.stderr).toContain("task commit is not covered by the pre-merge closure basis");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it.each([
    ["not_found", "provider PR was not found"],
    ["unavailable", "provider lookup is unavailable"],
  ] as const)(
    "keeps legacy cleanup blocked when the exact provider lookup is %s",
    async (kind, expectedReason) => {
      const fixture = await createTargetedFixture({ legacyMissingPrNumber: true });
      const fakeBin = await installFakeGh({ kind, fixture });

      const result = await runTargetedCleanup(fakeBin, fixture);

      expect(result.code).toBe(5);
      expect(result.stderr).toContain(expectedReason);
      expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
      expect(await pathExists(fixture.worktreePath)).toBe(true);
    },
  );

  it.each(["OPEN", "CLOSED"] as const)(
    "keeps legacy cleanup blocked when the exact provider PR is %s",
    async (providerStatus) => {
      const fixture = await createTargetedFixture({ legacyMissingPrNumber: true });
      const fakeBin = await installFakeGh({ kind: "found", fixture, providerStatus });

      const result = await runTargetedCleanup(fakeBin, fixture);

      expect(result.code).toBe(5);
      expect(result.stderr).toContain(`is ${providerStatus.toLowerCase()}, not merged`);
      expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
      expect(await pathExists(fixture.worktreePath)).toBe(true);
    },
  );

  it("keeps legacy cleanup blocked on provider base or head mismatch", async () => {
    for (const mismatch of ["base", "head"] as const) {
      const fixture = await createTargetedFixture({ legacyMissingPrNumber: true });
      const fakeBin = await installFakeGh({
        kind: "found",
        fixture,
        ...(mismatch === "base" ? { baseRef: "release" } : { headSha: fixture.mergeCommit }),
      });

      const result = await runTargetedCleanup(fakeBin, fixture);

      expect(result.code).toBe(5);
      expect(result.stderr).toContain(
        mismatch === "base"
          ? "provider PR was not found for the exact branch and base"
          : "provider merge does not expose a base parent for symmetric patch proof",
      );
      expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
      expect(await pathExists(fixture.worktreePath)).toBe(true);
    }
  });

  it("keeps a recorded PR number authoritative when the provider returns another identity", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({ kind: "found", fixture, prNumber: 456 });

    const result = await runTargetedCleanup(fakeBin, fixture);

    expect(result.code).toBe(5);
    expect(result.stderr).toContain("provider PR identity mismatch: expected=123 observed=456");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("deletes only the requested rebase-merged task and is idempotent", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({ kind: "found", fixture });
    const first = await runTargetedCleanup(fakeBin, fixture);
    expect(first.code).toBe(0);
    expect(first.stdout).toContain("proof=provider_merge");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(false);
    expect(await pathExists(fixture.worktreePath)).toBe(false);
    expect(await gitBranchExists(fixture.root, fixture.unrelatedBranch)).toBe(true);
    expect(await pathExists(fixture.unrelatedWorktreePath)).toBe(true);

    const second = await runTargetedCleanup(fakeBin, fixture);
    expect(second.code).toBe(0);
    expect(second.stdout).toContain(`already clean: task=${fixture.taskId}`);
  });

  it("allows a clean registered sibling worktree only for targeted finalization", async () => {
    const fixture = await createTargetedFixture({ nestedSiblingWorktree: true });
    expect(fixture.siblingBaseWorktreePath).not.toBeNull();
    await configureFinalizationRemote(fixture);
    const fakeBin = await installFakeGh({ kind: "found", fixture });
    await installFakeGithubOriginLookup(fakeBin);

    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--finalize",
      "--yes",
      "--root",
      fixture.root,
    ]);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain("proof=provider_merge");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(false);
    expect(await pathExists(fixture.worktreePath)).toBe(false);
    expect(await pathExists(fixture.siblingBaseWorktreePath!)).toBe(true);
    expect(await gitBranchExists(fixture.root, fixture.unrelatedBranch)).toBe(true);
    expect(await pathExists(fixture.unrelatedWorktreePath)).toBe(true);
  });

  it("synchronizes a stale base before cleanup and normalizes its completed queue entry", async () => {
    const fixture = await createTargetedFixture();
    const pullRemote = await configureFinalizationRemote(fixture);
    await execFileAsync(
      "git",
      ["remote", "set-url", "origin", "https://github.com/example/repo.git"],
      { cwd: fixture.root, env: cleanGitEnv() },
    );
    const fakeBin = await installFakeGh({ kind: "found", fixture });
    await installFakeGithubOriginLookup(fakeBin, pullRemote);

    const staleBaseResult = await execFileAsync("git", ["rev-parse", `${fixture.mergeCommit}^`], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    const staleBase = staleBaseResult.stdout.trim();
    await execFileAsync("git", ["reset", "--hard", staleBase], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    await writeIntegrationQueue(
      fixture.root,
      upsertQueuedEntry(emptyIntegrationQueue(), {
        task_id: fixture.taskId,
        branch: fixture.branch,
        base: "main",
        head_sha: fixture.branchHead,
        base_sha: staleBase,
        changed_paths: ["targeted-change.txt"],
        pr_number: 123,
        pr_url: "https://github.com/example/repo/pull/123",
        priority: 0,
      }),
    );

    const cleanupArgv = [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--finalize",
      "--yes",
      "--root",
      fixture.root,
    ];
    const result = await runWithFakeGh(fakeBin, cleanupArgv);

    expect(result.code, result.stderr).toBe(0);
    expect(result.stdout).toContain("proof=provider_merge");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(false);
    expect(await pathExists(fixture.worktreePath)).toBe(false);
    const queue = await readIntegrationQueue(fixture.root);
    expect(queue.entries[0]?.status).toBe("done");

    const replay = await runWithFakeGh(fakeBin, cleanupArgv);
    expect(replay.code, replay.stderr).toBe(0);
    expect(replay.stdout).toContain(`already clean: task=${fixture.taskId}`);
    const replayQueue = await readIntegrationQueue(fixture.root);
    expect(replayQueue.entries).toHaveLength(1);
    expect(replayQueue.entries[0]).toMatchObject({
      task_id: fixture.taskId,
      head_sha: fixture.branchHead,
      status: "done",
    });
  });

  it("keeps a directly registered /tmp worktree even for targeted finalization", async () => {
    const fixture = await createTargetedFixture({ directExternalWorktree: true });
    await configureFinalizationRemote(fixture);
    const fakeBin = await installFakeGh({ kind: "found", fixture });
    await installFakeGithubOriginLookup(fakeBin);

    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--finalize",
      "--yes",
      "--root",
      fixture.root,
    ]);

    expect(result.code).toBe(5);
    expect(result.stderr).toContain("Refusing to remove worktree outside repo");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("keeps a registered sibling worktree when targeted cleanup omits --finalize", async () => {
    const fixture = await createTargetedFixture({ nestedSiblingWorktree: true });
    const fakeBin = await installFakeGh({ kind: "found", fixture });

    const result = await runTargetedCleanup(fakeBin, fixture);

    expect(result.code).toBe(5);
    expect(result.stderr).toContain("Refusing to remove worktree outside repo");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("keeps a registered sibling worktree when broad finalization omits --task-id", async () => {
    const fixture = await createTargetedFixture({ nestedSiblingWorktree: true });
    await configureFinalizationRemote(fixture);

    const io = captureStdIO();
    try {
      expect(
        await runCli(["cleanup", "merged", "--finalize", "--yes", "--root", fixture.root]),
      ).toBe(5);
      expect(io.stderr).toContain("Refusing to remove worktree outside repo");
    } finally {
      io.restore();
    }
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("rejects a dirty registered sibling before archiving its PR artifacts", async () => {
    const fixture = await createTargetedFixture({ nestedSiblingWorktree: true });
    await configureFinalizationRemote(fixture);
    await writeFile(path.join(fixture.worktreePath, "uncommitted.txt"), "preserve me\n", "utf8");
    const fakeBin = await installFakeGh({ kind: "found", fixture });
    await installFakeGithubOriginLookup(fakeBin);

    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--finalize",
      "--archive",
      "--yes",
      "--root",
      fixture.root,
    ]);

    expect(result.code).toBe(5);
    expect(result.stderr).toContain("Refusing to remove dirty worktree");
    expect(
      await pathExists(
        path.join(fixture.root, ".agentplane", "tasks", fixture.taskId, "pr", "meta.json"),
      ),
    ).toBe(true);
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("fails closed on provider head mismatch before deleting any candidate", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({ kind: "found", fixture, headSha: "0".repeat(40) });
    const result = await runTargetedCleanup(fakeBin, fixture);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("provider head object is unavailable locally");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
    expect(await gitBranchExists(fixture.root, fixture.unrelatedBranch)).toBe(true);
  });

  it("cleans after a provider-generated update branch head merges the local task head with base", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({
      kind: "found",
      fixture,
      headSha: "1".repeat(40),
      providerUpdateBaseSha: fixture.mergeCommit,
    });
    const result = await runTargetedCleanup(fakeBin, fixture);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("proof=provider_merge");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(false);
    expect(await pathExists(fixture.worktreePath)).toBe(false);
  });

  it("keeps cleanup blocked when a provider update head lacks a base-ancestry parent", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({
      kind: "found",
      fixture,
      headSha: "2".repeat(40),
      providerUpdateBaseSha: "0".repeat(40),
    });
    const result = await runTargetedCleanup(fakeBin, fixture);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("provider head object is unavailable locally");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("cleans a provider-merged task with a local authority-only post-merge tail", async () => {
    const fixture = await createTargetedFixture();
    const localTail = await commitAuthorityOnlyTail(fixture);
    expect(localTail).not.toBe(fixture.branchHead);
    const fakeBin = await installFakeGh({ kind: "found", fixture });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("proof=provider_merge");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(false);
    expect(await pathExists(fixture.worktreePath)).toBe(false);
  });

  it("keeps a semantic post-merge tail blocked despite a matching provider head", async () => {
    const fixture = await createTargetedFixture();
    await writeFile(
      path.join(fixture.worktreePath, "semantic-tail.txt"),
      "must not clean\n",
      "utf8",
    );
    await commitAll(fixture.worktreePath, `semantic ${fixture.taskId} post-merge tail`);
    const fakeBin = await installFakeGh({ kind: "found", fixture });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("provider merged head is not contained");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("fails closed on provider base mismatch before deleting the worktree", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({ kind: "found", fixture, baseRef: "release" });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("provider PR was not found for the exact branch and base");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("fails closed when the provider merge commit is not on base", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({
      kind: "found",
      fixture,
      mergeCommitSha: fixture.branchHead,
    });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("provider merge commit is not on main");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("requires exact pre-merge closure evidence on base", async () => {
    const fixture = await createTargetedFixture();
    const metaPath = path.join(
      fixture.root,
      ".agentplane",
      "tasks",
      fixture.taskId,
      "pr",
      "meta.json",
    );
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
      pre_merge_closure: { branch: string };
    };
    meta.pre_merge_closure.branch = `${fixture.branch}-mismatch`;
    await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");
    await commitAll(fixture.root, `chore ${fixture.taskId} corrupt closure fixture`);

    const fakeBin = await installFakeGh({ kind: "found", fixture });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("exact pre-merge closure evidence is not recorded on base");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
  });

  it("distinguishes provider not-found from unavailable and fails closed for both", async () => {
    const fixture = await createTargetedFixture();
    for (const kind of ["not_found", "unavailable"] as const) {
      const fakeBin = await installFakeGh({ kind, fixture });
      const result = await runWithFakeGh(fakeBin, [
        "cleanup",
        "merged",
        "--task-id",
        fixture.taskId,
        "--yes",
        "--root",
        fixture.root,
      ]);
      expect(result.code).toBe(5);
      expect(result.stderr).toContain(
        kind === "not_found" ? "provider PR was not found" : "provider lookup is unavailable",
      );
      if (kind === "unavailable") expect(result.stderr).toContain("authentication required");
      expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    }
  });

  it("refuses a dirty requested worktree without touching unrelated candidates", async () => {
    const fixture = await createTargetedFixture();
    await writeFile(path.join(fixture.worktreePath, "uncommitted.txt"), "preserve me\n", "utf8");
    const fakeBin = await installFakeGh({ kind: "found", fixture });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("Refusing to remove dirty worktree");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(path.join(fixture.worktreePath, "uncommitted.txt"))).toBe(true);
    expect(await gitBranchExists(fixture.root, fixture.unrelatedBranch)).toBe(true);
  });

  it("cleans a provider-less task-close branch only after close evidence reaches base", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createTask(root, "Targeted close-tail cleanup");
    await commitAll(root, `chore ${taskId} scaffold`);
    const basisCommitResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const basisCommit = basisCommitResult.stdout.trim();
    const task = await readTask({ cwd: root, taskId });
    await writeFile(
      task.readmePath,
      markDone(await readFile(task.readmePath, "utf8"), basisCommit),
      "utf8",
    );
    await commitAll(root, `chore ${taskId} done without close proof`);

    const branch = `task-close/${taskId}/1234567890ab`;
    const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-close-tail`);
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const blockedIo = captureStdIO();
    try {
      expect(
        await runCli(["cleanup", "merged", "--task-id", taskId, "--yes", "--root", root]),
      ).toBe(5);
      expect(blockedIo.stderr).toContain("task-close evidence is not recorded on base");
    } finally {
      blockedIo.restore();
    }
    expect(await gitBranchExists(root, branch)).toBe(true);

    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "close-proof.txt"),
      "close evidence\n",
      "utf8",
    );
    await writeFile(task.readmePath, `${await readFile(task.readmePath, "utf8")}\n`, "utf8");
    const suffix = taskId.split("-").at(-1) ?? taskId;
    await commitAll(root, `✅ ${suffix} close: recorded (${taskId})`);

    const io = captureStdIO();
    try {
      const result = await runCli([
        "cleanup",
        "merged",
        "--task-id",
        taskId,
        "--yes",
        "--root",
        root,
      ]);
      expect(result, io.stderr).toBe(0);
      expect(io.stdout).toContain("proof=patch_equivalent");
    } finally {
      io.restore();
    }
    expect(await gitBranchExists(root, branch)).toBe(false);
    expect(await pathExists(worktreePath)).toBe(false);
  });
});
