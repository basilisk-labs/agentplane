import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import type { TaskWorktreeCleanliness } from "../shared/task-worktree-cleanliness.js";
import {
  recoverDivergedConflictHead,
  type DivergedConflictHeadRecoveryGitOps,
} from "./conflict-rework-recovery.js";
import type { PrFlowStatusReport } from "./flow-status.js";

const taskId = "202607300150-MGCHE6";
const branch = `task/${taskId}/recover-diverged-task-pr-identities-safely`;
const localHead = "1111111111111111111111111111111111111111";
const providerHead = "2222222222222222222222222222222222222222";
const movedProviderHead = "3333333333333333333333333333333333333333";
const worktreePath = "/repo/.agentplane/worktrees/recovery";
const execFileAsync = promisify(execFile);

async function runGit(cwd: string, args: string[]) {
  return await execFileAsync("git", args, { cwd });
}

function report(overrides: Record<string, unknown> = {}): PrFlowStatusReport {
  return {
    branch: { name: branch, headSha: localHead, metaHeadSha: null },
    pr: { state: "OPEN" },
    providerObservation: {
      state: "found",
      pr: {
        status: "OPEN",
        headSha: providerHead,
        headRef: branch,
        mergeability: { state: "conflicting", mergeable: false, providerState: "dirty" },
      },
    },
    ...overrides,
  } as unknown as PrFlowStatusReport;
}

const cleanWorktree = {
  state: "clean",
  branch,
  worktreePath,
  changedPaths: [],
} as const satisfies TaskWorktreeCleanliness;

function createGit(opts: { fetchedHead?: string; archiveHead?: string | null } = {}) {
  const calls: string[] = [];
  const trackingRef = `refs/remotes/origin/${branch}`;
  const archiveHeads = new Map<string, string>();
  if (opts.archiveHead) {
    archiveHeads.set(`refs/agentplane/recovery/${taskId}/${localHead}`, opts.archiveHead);
  }
  const gitOps: DivergedConflictHeadRecoveryGitOps = {
    currentBranch: () => {
      calls.push("current-branch");
      return Promise.resolve(branch);
    },
    fetchBranch: () => {
      calls.push("fetch");
      return Promise.resolve();
    },
    refExists: (_root, ref) => {
      calls.push(`exists:${ref}`);
      return Promise.resolve(archiveHeads.has(ref));
    },
    resolveRef: (_cwd, ref) => {
      calls.push(`resolve:${ref}`);
      if (ref === "HEAD") return Promise.resolve(localHead);
      if (ref === trackingRef) return Promise.resolve(opts.fetchedHead ?? providerHead);
      return Promise.resolve(archiveHeads.get(ref) ?? "");
    },
    resetHard: (_worktree, ref) => {
      calls.push(`reset:${ref}`);
      return Promise.resolve();
    },
    setUpstream: (_worktree, upstreamBranch) => {
      calls.push(`upstream:${upstreamBranch}`);
      return Promise.resolve();
    },
    updateRef: (_root, ref, sha) => {
      calls.push(`archive:${ref}:${sha}`);
      archiveHeads.set(ref, sha);
      return Promise.resolve();
    },
  };
  return { calls, gitOps };
}

async function recover(
  opts: {
    report?: PrFlowStatusReport;
    expectedLocalHead?: string;
    expectedProviderHead?: string;
    taskWorktree?: TaskWorktreeCleanliness;
    git?: ReturnType<typeof createGit>;
  } = {},
) {
  const git = opts.git ?? createGit();
  const result = await recoverDivergedConflictHead({
    gitRoot: "/repo",
    taskId,
    report: opts.report ?? report(),
    taskWorktree: opts.taskWorktree ?? cleanWorktree,
    expectedLocalHead: opts.expectedLocalHead ?? localHead,
    expectedProviderHead: opts.expectedProviderHead ?? providerHead,
    gitOps: git.gitOps,
  });
  return { result, calls: git.calls };
}

describe("diverged conflict head recovery", () => {
  it("archives the exact local head before adopting the exact provider head", async () => {
    const { result, calls } = await recover();

    expect(result).toEqual({
      task_id: taskId,
      branch,
      archived_local_head: localHead,
      archive_ref: `refs/agentplane/recovery/${taskId}/${localHead}`,
      adopted_provider_head: providerHead,
      provider_tracking_ref: `refs/remotes/origin/${branch}`,
      next_command: `agentplane pr conflict-rework ${taskId} --json`,
    });
    const archiveCall = `archive:refs/agentplane/recovery/${taskId}/${localHead}:${localHead}`;
    const upstreamCall = `upstream:${branch}`;
    const resetCall = `reset:refs/remotes/origin/${branch}`;
    expect(calls).toContain(archiveCall);
    expect(calls).toContain(upstreamCall);
    expect(calls).toContain(resetCall);
    expect(calls.indexOf(archiveCall)).toBeLessThan(calls.indexOf(upstreamCall));
    expect(calls.indexOf(upstreamCall)).toBeLessThan(calls.indexOf(resetCall));
    expect(calls.some((call) => /(?:merge|rebase|push)/u.test(call))).toBe(false);
  });

  it("fails before fetch when the explicit observed identities are stale", async () => {
    const git = createGit();

    await expect(recover({ git, expectedProviderHead: movedProviderHead })).rejects.toThrow(
      "Observed task heads changed",
    );
    expect(git.calls).toEqual([]);
  });

  it("fails closed when the provider head moves during the bounded fetch", async () => {
    const git = createGit({ fetchedHead: movedProviderHead });

    await expect(recover({ git })).rejects.toThrow("Provider task head changed during fetch");
    expect(git.calls).toContain("fetch");
    expect(git.calls.some((call) => call.startsWith("archive:"))).toBe(false);
    expect(git.calls.some((call) => call.startsWith("reset:"))).toBe(false);
  });

  it("refuses an archive collision that does not preserve the exact local head", async () => {
    const git = createGit({ archiveHead: providerHead });

    await expect(recover({ git })).rejects.toThrow("Recovery archive collision");
    expect(git.calls).not.toContain("fetch");
    expect(git.calls.some((call) => call.startsWith("reset:"))).toBe(false);
  });

  it("recovers a clean real worktree from a local bare remote without pushing", async () => {
    const fixtureRoot = await mkdtemp(path.join(tmpdir(), "agentplane-conflict-recovery-"));
    const remote = path.join(fixtureRoot, "remote.git");
    const repo = path.join(fixtureRoot, "repo");
    try {
      await runGit(fixtureRoot, ["init", "--bare", remote]);
      await runGit(fixtureRoot, ["init", "--initial-branch=main", repo]);
      await runGit(repo, ["config", "user.email", "test@example.com"]);
      await runGit(repo, ["config", "user.name", "AgentPlane test"]);
      await writeFile(path.join(repo, "seed.txt"), "seed\n", "utf8");
      await runGit(repo, ["add", "seed.txt"]);
      await runGit(repo, ["commit", "-m", "seed"]);
      await runGit(repo, ["remote", "add", "origin", remote]);
      await runGit(repo, [
        "config",
        "remote.origin.fetch",
        "+refs/heads/main:refs/remotes/origin/main",
      ]);
      await runGit(repo, ["push", "-u", "origin", "main"]);
      await runGit(repo, ["checkout", "-b", branch]);
      await writeFile(path.join(repo, "remote.txt"), "provider head\n", "utf8");
      await runGit(repo, ["add", "remote.txt"]);
      await runGit(repo, ["commit", "-m", "provider head"]);
      await runGit(repo, ["push", "origin", `HEAD:${branch}`]);
      const { stdout: providerRaw } = await runGit(repo, ["rev-parse", "HEAD"]);
      const realProviderHead = providerRaw.trim();
      await writeFile(path.join(repo, "local.txt"), "unpublished local head\n", "utf8");
      await runGit(repo, ["add", "local.txt"]);
      await runGit(repo, ["commit", "-m", "unpublished local head"]);
      const { stdout: localRaw } = await runGit(repo, ["rev-parse", "HEAD"]);
      const realLocalHead = localRaw.trim();
      await expect(runGit(repo, ["config", "--get", `branch.${branch}.remote`])).rejects.toThrow();
      const providerTrackingRef = `refs/remotes/origin/${branch}`;
      await runGit(repo, ["update-ref", "-d", providerTrackingRef]);
      await expect(
        runGit(repo, ["show-ref", "--verify", "--quiet", providerTrackingRef]),
      ).rejects.toThrow();
      await runGit(repo, [
        "fetch",
        "--no-tags",
        "origin",
        `refs/heads/${branch}:${providerTrackingRef}`,
      ]);
      await expect(
        runGit(repo, ["branch", "--set-upstream-to", `origin/${branch}`]),
      ).rejects.toThrow();
      const result = await recoverDivergedConflictHead({
        gitRoot: repo,
        taskId,
        report: report({
          branch: { name: branch, headSha: realLocalHead, metaHeadSha: null },
          providerObservation: {
            state: "found",
            pr: {
              status: "OPEN",
              headSha: realProviderHead,
              headRef: branch,
              mergeability: { state: "conflicting", mergeable: false, providerState: "dirty" },
            },
          },
        }),
        taskWorktree: { ...cleanWorktree, worktreePath: repo },
        expectedLocalHead: realLocalHead,
        expectedProviderHead: realProviderHead,
      });

      const [
        { stdout: adoptedRaw },
        { stdout: archivedRaw },
        { stdout: statusRaw },
        { stdout: upstreamRemote },
        { stdout: upstreamMerge },
      ] = await Promise.all([
        runGit(repo, ["rev-parse", "HEAD"]),
        runGit(repo, ["rev-parse", result.archive_ref]),
        runGit(repo, ["status", "--porcelain"]),
        runGit(repo, ["config", "--get", `branch.${branch}.remote`]),
        runGit(repo, ["config", "--get", `branch.${branch}.merge`]),
      ]);
      expect(adoptedRaw.trim()).toBe(realProviderHead);
      expect(archivedRaw.trim()).toBe(realLocalHead);
      expect(statusRaw).toBe("");
      expect(upstreamRemote.trim()).toBe("origin");
      expect(upstreamMerge.trim()).toBe(`refs/heads/${branch}`);
    } finally {
      await rm(fixtureRoot, { recursive: true, force: true });
    }
  });
});
