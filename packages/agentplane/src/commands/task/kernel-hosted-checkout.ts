import path from "node:path";
import { lstat, mkdir, realpath } from "node:fs/promises";
import { runProcess } from "@agentplaneorg/core/process";
import { gitProofEnv } from "@agentplaneorg/core/git";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { isPathWithin } from "../shared/path.js";
import {
  assertCurrentHostedHead,
  captureHostedPrHeadEvidence,
  type FreshHostedReadback,
} from "./kernel-hosted-head-evidence.js";

type GitResult = Readonly<{ exitCode: number; stdout: string }>;
type GitOperation = (cwd: string, args: readonly string[]) => Promise<GitResult>;
const gitProcess: GitOperation = async (cwd, args) => {
  const result = await runProcess({
    command: "git",
    args: [...args],
    cwd,
    env: { ...gitProofEnv(), GIT_TERMINAL_PROMPT: "0" },
    reject: false,
  });
  return { exitCode: result.exitCode, stdout: result.stdout };
};

async function requiredGit(git: GitOperation, cwd: string, args: readonly string[]) {
  const result = await git(cwd, args);
  if (result.exitCode !== 0) {
    throw new Error(`Adopted hosted PR checkout Git operation failed: ${args.join(" ")}`);
  }
  return result.stdout.trim();
}

/** Retain one exact-SHA detached checkout across native TESTER, EVALUATOR and final checks. */
export async function prepareKernelHostedCheckout(opts: {
  repository_root: string;
  worktrees_dir_rel: string;
  task_id: string;
  work_order_id: k.Sha256Digest;
  adoption_digest: k.Sha256Digest;
  identity: k.HostedPrIdentity;
  adopted_head: string;
  adopted_base: string;
  fresh_readback: FreshHostedReadback;
  git?: GitOperation;
}): Promise<{
  checkout: string;
  changed_paths: readonly string[];
  evidence: k.HostedPrHeadEvidence;
}> {
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/u.test(opts.task_id)) {
    throw new Error("Adopted hosted PR task identity is invalid");
  }
  const git = opts.git ?? gitProcess;
  const repository = await realpath(opts.repository_root);
  const worktrees = path.resolve(repository, opts.worktrees_dir_rel);
  if (!isPathWithin(repository, worktrees) || worktrees === repository) {
    throw new Error("Adopted hosted PR worktrees directory escapes the repository");
  }
  await mkdir(worktrees, { recursive: true, mode: 0o700 });
  if (!isPathWithin(repository, await realpath(worktrees))) {
    throw new Error("Adopted hosted PR worktrees directory resolves outside the repository");
  }
  const fresh = await opts.fresh_readback();
  if (k.kernelDigest(fresh.identity) !== k.kernelDigest(opts.identity)) {
    throw new Error("Adopted hosted PR provider identity changed before checkout");
  }
  const currentHead = fresh.current_head;
  const currentBase = fresh.current_base;
  if (!/^[a-f0-9]{40,64}$/u.test(currentHead) || !/^[a-f0-9]{40,64}$/u.test(currentBase)) {
    throw new Error("Adopted hosted PR exact provider object IDs are invalid");
  }
  const target = path.join(worktrees, `_adopted_${opts.task_id}_${currentHead.slice(0, 16)}`);
  const headRef = `refs/heads/${opts.identity.head_ref}`;
  const baseRef = `refs/heads/${opts.identity.base_ref}`;
  await requiredGit(git, repository, ["fetch", "--no-tags", opts.identity.remote, headRef]);
  if ((await requiredGit(git, repository, ["rev-parse", "FETCH_HEAD^{commit}"])) !== currentHead) {
    throw new Error("Fetched adopted hosted PR head differs from provider readback");
  }
  await requiredGit(git, repository, ["fetch", "--no-tags", opts.identity.remote, baseRef]);
  if ((await requiredGit(git, repository, ["rev-parse", "FETCH_HEAD^{commit}"])) !== currentBase) {
    throw new Error("Fetched adopted hosted PR base differs from provider readback");
  }
  let exists = false;
  try {
    await lstat(target);
    exists = true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  if (!exists)
    await requiredGit(git, repository, ["worktree", "add", "--detach", target, currentHead]);
  const evidence = await captureHostedPrHeadEvidence({
    repository_root: repository,
    checkout: target,
    task_id: opts.task_id,
    work_order_id: opts.work_order_id,
    adoption_digest: opts.adoption_digest,
    identity: opts.identity,
    adopted_head: opts.adopted_head,
    adopted_base: opts.adopted_base,
    current_head: currentHead,
    current_base: currentBase,
    current_readback_digest: fresh.current_readback_digest,
    git,
  });
  await assertCurrentHostedHead({
    repository_root: repository,
    checkout: target,
    evidence,
    fresh_readback: opts.fresh_readback,
    git,
  });
  const changed = await requiredGit(git, repository, [
    "diff",
    "--no-renames",
    "--name-only",
    `${currentBase}...${currentHead}`,
    "--",
  ]);
  return {
    checkout: target,
    changed_paths: changed ? changed.split("\n").filter(Boolean) : [],
    evidence,
  };
}
