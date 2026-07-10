import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { configureGitUser, mkGitRepoRoot } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { matchesMergedPreMergeClosure } from "./flow-status.js";

type RemotePrStatus = Parameters<typeof matchesMergedPreMergeClosure>[0]["pr"];
type MatchOptions = Parameters<typeof matchesMergedPreMergeClosure>[0];

const mergedPr: RemotePrStatus = {
  state: "MERGED",
  prNumber: 4567,
};

const execFileAsync = promisify(execFile);

async function gitStdout(root: string, args: string[]): Promise<string> {
  const result = await execFileAsync("git", args, { cwd: root });
  return result.stdout.trim();
}

async function createRepoCommits(): Promise<{
  root: string;
  basis: string;
  head: string;
  divergent: string;
}> {
  const root = await mkGitRepoRoot();
  await configureGitUser(root);
  await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
  await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
  const basis = await gitStdout(root, ["rev-parse", "HEAD"]);
  await writeFile(path.join(root, "next.txt"), "next\n", "utf8");
  await execFileAsync("git", ["add", "next.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "next"], { cwd: root });
  const head = await gitStdout(root, ["rev-parse", "HEAD"]);
  const tree = await gitStdout(root, ["rev-parse", "HEAD^{tree}"]);
  const divergent = await gitStdout(root, ["commit-tree", tree, "-m", "divergent"]);
  return { root, basis, head, divergent };
}

function buildOptions(opts: { root: string; basis: string; head: string }): MatchOptions {
  const branch = "task/T-1/work";
  return {
    gitRoot: opts.root,
    task: {
      id: "T-1",
      status: "DONE",
      commit: { hash: opts.basis, message: "closed" },
    } as MatchOptions["task"],
    meta: {
      schema_version: 1,
      task_id: "T-1",
      branch,
      pr_number: 4567,
      created_at: "2026-07-10T00:00:00.000Z",
      updated_at: "2026-07-10T00:00:00.000Z",
      pre_merge_closure: {
        state: "closed_before_merge",
        branch,
        basis_commit: opts.basis,
        pr_number: 4567,
      },
    } as MatchOptions["meta"],
    pr: { ...mergedPr, headSha: opts.head },
    branch,
  };
}

describe("pre-merge closure flow status", () => {
  it("accepts a merged, closed task whose closure basis is an ancestor of its head", async () => {
    const commits = await createRepoCommits();
    await expect(matchesMergedPreMergeClosure(buildOptions(commits))).resolves.toBe(true);
  });

  it("rejects open PRs, open tasks, mismatched identities, and divergent closure bases", async () => {
    const commits = await createRepoCommits();
    const options = buildOptions(commits);
    await expect(
      matchesMergedPreMergeClosure({ ...options, pr: { ...options.pr, state: "OPEN" } }),
    ).resolves.toBe(false);
    await expect(
      matchesMergedPreMergeClosure({
        ...options,
        task: { ...options.task, status: "DOING" },
      }),
    ).resolves.toBe(false);
    await expect(
      matchesMergedPreMergeClosure({ ...options, branch: "task/T-1/other" }),
    ).resolves.toBe(false);
    await expect(
      matchesMergedPreMergeClosure({
        ...options,
        pr: { ...options.pr, prNumber: 999 },
      }),
    ).resolves.toBe(false);
    await expect(
      matchesMergedPreMergeClosure({
        ...options,
        meta: {
          ...options.meta!,
          pre_merge_closure: {
            state: "closed_before_merge",
            branch: options.branch!,
            basis_commit: commits.divergent,
            pr_number: 4567,
          },
        },
      }),
    ).resolves.toBe(false);
  });
});
