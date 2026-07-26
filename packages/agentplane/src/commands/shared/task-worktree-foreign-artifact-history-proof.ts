import { gitEnv, gitRevParse, gitShowFile } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { parseTaskReadme } from "@agentplaneorg/core/tasks";

import type { CommandContext } from "./task-backend.js";
import {
  contentSha256,
  validStartReadyTransition,
  validVerifiedDoneContinuation,
} from "./task-worktree-foreign-artifact-lifecycle-proof.js";

export type HistoricalForeignTaskReadmeReplicaProof = {
  branch: string;
  branchHead: string;
  gitPath: string;
  preStartCommit: string;
  preStartContentSha256: string;
  startCommit: string;
  startContentSha256: string;
  sourceContentSha256: string;
};

type FirstParentCommit = {
  commit: string;
  parents: string[];
};

type GitFileSnapshot =
  | { state: "present"; text: string }
  | { state: "missing" }
  | { state: "error" };

function isGitObjectId(value: string): boolean {
  return /^[0-9a-f]{40,64}$/u.test(value);
}

function lifecycleStatus(text: string): "TODO" | "DOING" | "DONE" | null {
  try {
    const status = parseTaskReadme(text).frontmatter.status;
    return status === "TODO" || status === "DOING" || status === "DONE" ? status : null;
  } catch {
    return null;
  }
}

async function readGitFileSnapshot(opts: {
  gitRoot: string;
  ref: string;
  gitPath: string;
}): Promise<GitFileSnapshot> {
  try {
    return {
      state: "present",
      text: await gitShowFile(opts.gitRoot, opts.ref, opts.gitPath),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return message.startsWith("Failed to resolve git blob:")
      ? { state: "missing" }
      : { state: "error" };
  }
}

async function firstParentCommits(opts: {
  gitRoot: string;
  branchHead: string;
  gitPath: string;
}): Promise<FirstParentCommit[] | null> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      [
        "log",
        "--first-parent",
        "--reverse",
        "--format=%H%x00%P",
        opts.branchHead,
        "--",
        opts.gitPath,
      ],
      { cwd: opts.gitRoot, env: gitEnv() },
    );
    const commits: FirstParentCommit[] = [];
    for (const line of String(stdout).split("\n")) {
      if (!line) continue;
      const [commit = "", parentText = ""] = line.split("\0", 2);
      const parents = parentText.trim().split(/\s+/u).filter(Boolean);
      if (!isGitObjectId(commit) || !parents.every((parent) => isGitObjectId(parent))) {
        return null;
      }
      commits.push({ commit, parents });
    }
    return commits.length > 0 ? commits : null;
  } catch {
    return null;
  }
}

export async function proveHistoricalStartReadyReplica(opts: {
  ctx: CommandContext;
  foreignTaskId: string;
  foreignBranch: string | null;
  gitPath: string;
  replicaText: string;
  sourceText: string;
}): Promise<HistoricalForeignTaskReadmeReplicaProof | null> {
  if (!opts.foreignBranch) return null;
  const branchHead = await gitRevParse(opts.ctx.resolvedProject.gitRoot, [
    "--verify",
    `${opts.foreignBranch}^{commit}`,
  ]).catch(() => null);
  if (!branchHead || !isGitObjectId(branchHead)) return null;

  const sourceAtHead = await readGitFileSnapshot({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    ref: branchHead,
    gitPath: opts.gitPath,
  });
  if (sourceAtHead.state !== "present" || sourceAtHead.text !== opts.sourceText) return null;

  const commits = await firstParentCommits({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    branchHead,
    gitPath: opts.gitPath,
  });
  if (!commits) return null;

  const candidates: {
    preStartCommit: string;
    preStartText: string;
    startCommit: string;
    startText: string;
  }[] = [];
  let seenStartedLifecycle = false;
  for (const entry of commits) {
    const snapshot = await readGitFileSnapshot({
      gitRoot: opts.ctx.resolvedProject.gitRoot,
      ref: entry.commit,
      gitPath: opts.gitPath,
    });
    if (snapshot.state !== "present") return null;

    if (entry.parents.length === 1) {
      const preStartCommit = entry.parents[0];
      if (!preStartCommit) return null;
      const predecessor = await readGitFileSnapshot({
        gitRoot: opts.ctx.resolvedProject.gitRoot,
        ref: preStartCommit,
        gitPath: opts.gitPath,
      });
      if (
        predecessor.state === "present" &&
        predecessor.text === opts.replicaText &&
        validStartReadyTransition({
          foreignTaskId: opts.foreignTaskId,
          replicaText: predecessor.text,
          sourceText: snapshot.text,
        })
      ) {
        if (seenStartedLifecycle) return null;
        candidates.push({
          preStartCommit,
          preStartText: predecessor.text,
          startCommit: entry.commit,
          startText: snapshot.text,
        });
      }
    }
    const status = lifecycleStatus(snapshot.text);
    if (!status) return null;
    if (status === "DOING" || status === "DONE") seenStartedLifecycle = true;
  }
  if (candidates.length !== 1) return null;

  const start = candidates[0];
  if (!start || start.startCommit === branchHead) return null;
  if (
    !validVerifiedDoneContinuation({
      foreignTaskId: opts.foreignTaskId,
      startedText: start.startText,
      sourceText: opts.sourceText,
    })
  ) {
    return null;
  }

  return {
    branch: opts.foreignBranch,
    branchHead,
    gitPath: opts.gitPath,
    preStartCommit: start.preStartCommit,
    preStartContentSha256: contentSha256(start.preStartText),
    startCommit: start.startCommit,
    startContentSha256: contentSha256(start.startText),
    sourceContentSha256: contentSha256(opts.sourceText),
  };
}

export async function assertHistoricalProofUnchanged(
  proof: HistoricalForeignTaskReadmeReplicaProof,
  gitRoot: string,
): Promise<void> {
  const branchHead = await gitRevParse(gitRoot, ["--verify", `${proof.branch}^{commit}`]);
  if (branchHead !== proof.branchHead) {
    throw new Error("authoritative foreign task branch changed after proof");
  }

  const [preStart, start, source] = await Promise.all([
    readGitFileSnapshot({
      gitRoot,
      ref: proof.preStartCommit,
      gitPath: proof.gitPath,
    }),
    readGitFileSnapshot({
      gitRoot,
      ref: proof.startCommit,
      gitPath: proof.gitPath,
    }),
    readGitFileSnapshot({
      gitRoot,
      ref: proof.branchHead,
      gitPath: proof.gitPath,
    }),
  ]);
  if (
    preStart.state !== "present" ||
    start.state !== "present" ||
    source.state !== "present" ||
    contentSha256(preStart.text) !== proof.preStartContentSha256 ||
    contentSha256(start.text) !== proof.startContentSha256 ||
    contentSha256(source.text) !== proof.sourceContentSha256
  ) {
    throw new Error("authoritative foreign task history changed after proof");
  }
}
