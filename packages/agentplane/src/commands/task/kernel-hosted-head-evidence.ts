import path from "node:path";
import { realpath } from "node:fs/promises";
import { runProcess } from "@agentplaneorg/core/process";
import { gitProofEnv } from "@agentplaneorg/core/git";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

type GitResult = Readonly<{ exitCode: number; stdout: string }>;
type GitRead = (cwd: string, args: readonly string[]) => Promise<GitResult>;
export type FreshHostedReadback = () => Promise<{
  identity: k.HostedPrIdentity;
  current_head: string;
  current_base: string;
  current_readback_digest: k.Sha256Digest;
}>;
export type HostedValidationRoute = Readonly<{
  checkout: string;
  fresh_readback: FreshHostedReadback;
}>;

const processGit: GitRead = async (cwd, args) => {
  const result = await runProcess({
    command: "git",
    args: [...args],
    cwd,
    env: gitProofEnv(),
    reject: false,
  });
  return { exitCode: result.exitCode, stdout: result.stdout };
};

async function requiredGit(git: GitRead, cwd: string, args: readonly string[]): Promise<string> {
  const result = await git(cwd, args);
  const value = result.stdout.trim();
  if (result.exitCode !== 0 || !value) {
    throw new Error(`Adopted hosted PR Git observation failed: ${args.join(" ")}`);
  }
  return value;
}

/** Inspect a supervisor-owned detached checkout. A provider response alone cannot attest its tree. */
export async function captureHostedPrHeadEvidence(opts: {
  repository_root: string;
  checkout: string;
  task_id: string;
  work_order_id: k.Sha256Digest;
  adoption_digest: k.Sha256Digest;
  identity: k.HostedPrIdentity;
  adopted_head: string;
  adopted_base: string;
  current_head: string;
  current_base: string;
  current_readback_digest: k.Sha256Digest;
  git?: GitRead;
}): Promise<k.HostedPrHeadEvidence> {
  const git = opts.git ?? processGit;
  const checkout = await realpath(opts.checkout);
  const repository = await realpath(opts.repository_root);
  if (checkout === repository || !checkout.startsWith(`${repository}${path.sep}`)) {
    throw new Error(
      "Adopted hosted PR verification checkout is not a separate repository worktree",
    );
  }
  const [head, tree, common, status, branch, sparse, headAncestry, baseAncestry] =
    await Promise.all([
      requiredGit(git, checkout, ["rev-parse", "HEAD^{commit}"]),
      requiredGit(git, checkout, ["rev-parse", "HEAD^{tree}"]),
      requiredGit(git, checkout, ["rev-parse", "--path-format=absolute", "--git-common-dir"]),
      git(checkout, ["status", "--porcelain=v1", "--untracked-files=all"]),
      git(checkout, ["symbolic-ref", "--quiet", "HEAD"]),
      git(checkout, ["config", "--bool", "core.sparseCheckout"]),
      git(checkout, ["merge-base", "--is-ancestor", opts.adopted_head, opts.current_head]),
      git(checkout, ["merge-base", "--is-ancestor", opts.adopted_base, opts.current_base]),
    ]);
  const repositoryCommon = await requiredGit(git, repository, [
    "rev-parse",
    "--path-format=absolute",
    "--git-common-dir",
  ]);
  if (
    (await realpath(common)) !== (await realpath(repositoryCommon)) ||
    status.exitCode !== 0 ||
    status.stdout.trim() !== "" ||
    branch.exitCode === 0 ||
    (sparse.exitCode !== 1 && (sparse.exitCode !== 0 || sparse.stdout.trim() !== "false")) ||
    headAncestry.exitCode !== 0 ||
    baseAncestry.exitCode !== 0
  ) {
    throw new Error("Adopted hosted PR checkout, cleanliness or ancestry changed");
  }
  return k.bindHostedPrHeadEvidence({
    task_id: opts.task_id,
    work_order_id: opts.work_order_id,
    adoption_digest: opts.adoption_digest,
    identity: opts.identity,
    adopted_head: opts.adopted_head,
    adopted_base: opts.adopted_base,
    current_head: opts.current_head,
    current_base: opts.current_base,
    current_readback_digest: opts.current_readback_digest,
    head_tree: tree,
    checkout_head: head,
    checkout_tree: tree,
    head_descends_from_adoption: true,
    base_descends_from_adoption: true,
  });
}

/** Recheck both provider identity and the exact checkout around each native validation. */
export async function assertCurrentHostedHead(opts: {
  repository_root: string;
  checkout: string;
  evidence: k.HostedPrHeadEvidence;
  fresh_readback: FreshHostedReadback;
  git?: GitRead;
}): Promise<void> {
  const retained = opts.evidence;
  const fresh = await opts.fresh_readback();
  if (
    !k.validateHostedPrHeadEvidence(retained, {
      task_id: retained.task_id,
      work_order_id: retained.work_order_id,
      adoption_digest: retained.adoption_digest,
      ...fresh,
    })
  ) {
    throw new Error("Adopted hosted PR provider identity or exact head changed");
  }
  const observed = await captureHostedPrHeadEvidence({
    repository_root: opts.repository_root,
    checkout: opts.checkout,
    task_id: retained.task_id,
    work_order_id: retained.work_order_id,
    adoption_digest: retained.adoption_digest,
    identity: retained.identity,
    adopted_head: retained.adopted_head,
    adopted_base: retained.adopted_base,
    current_head: retained.current_head,
    current_base: retained.current_base,
    current_readback_digest: retained.current_readback_digest,
    git: opts.git,
  });
  if (observed.digest !== retained.digest) {
    throw new Error("Adopted hosted PR verification checkout changed");
  }
}
