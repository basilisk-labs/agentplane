import { readdir } from "node:fs/promises";
import path from "node:path";
import { getPinnedBaseBranch, gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { readKernelRecord } from "../../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../../backends/task-backend.js";
import { observeKernelRepository } from "../../../runner/observation/kernel-repository.js";
import { readStableRegularTextNoFollow } from "../../../shared/stable-file.js";
import { CliError } from "../../../shared/errors.js";
import { resolveLogicalRepositoryIdentity } from "../../task/execution-authority-context.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../../shared/task-backend.js";
import { resolveGitHostIdentity } from "./git-host-identity.js";

function refuse(reason: string): never {
  throw new CliError({
    code: "E_VALIDATION",
    exitCode: 3,
    message: `Reviewed publication base is unavailable: ${reason}`,
  });
}

async function retainedFinalEvidence(command: CommandContext, taskId: string, digest: string) {
  const directory = path.join(
    await resolveCommandGitCommonDir(command),
    "agentplane/kernel/exchanges",
    taskId,
  );
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || !/^[a-f0-9]{64}$/.test(entry.name)) continue;
    let text: string;
    try {
      text = await readStableRegularTextNoFollow(
        path.join(directory, entry.name, "final-validation.json"),
        "retained final validation",
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    const evidence = JSON.parse(text) as {
      binding: {
        task_id: string;
        plan_digest: string;
        repository_fingerprint: string;
        evaluator_target: string;
        commands: string[];
      };
      checks: { status: string; checks: { exit_code: number }[] };
    };
    if (k.kernelDigest(evidence) === digest) return evidence;
  }
  return refuse("authenticated final validation artifact is missing");
}

/** Publication routing is a projection of retained native evidence, never a new authority grant. */
export async function resolveReviewedPublicationBase(opts: {
  command: CommandContext;
  task: TaskData | null;
  branch: string;
  fallback: string | null;
}): Promise<{ comparisonBase: string; providerBase: string } | null> {
  if (!opts.task) return null;
  const raw = opts.task.extensions?.task_kernel as { aggregate?: k.TaskAggregate } | undefined;
  if (!raw?.aggregate?.authority_lineage?.some((entry) => entry.observation?.reviewed_base_import))
    return null;
  const root = opts.command.resolvedProject.gitRoot;
  const pin = await getPinnedBaseBranch({ cwd: root });
  if (!pin || pin === opts.fallback) return null;
  const identity = await resolveLogicalRepositoryIdentity({
    git_root: root,
    task: {},
    create_if_missing: false,
  });
  const read = readKernelRecord(opts.task, identity as k.Sha256Digest);
  if (read.kind !== "canonical") return refuse("canonical task record is invalid");
  const aggregate = read.record.aggregate;
  if (k.canonicalAuthorityIssues(aggregate).length > 0)
    return refuse("authority lineage is invalid");
  const validation = aggregate.final_validation;
  if (validation?.status !== "PASSED") return refuse("final validation has not passed");
  const imports = aggregate.authority_lineage!.flatMap((entry) =>
    entry.observation?.reviewed_base_import ? [entry.observation.reviewed_base_import] : [],
  );
  const latest = imports.at(-1)!;
  for (let index = 1; index < imports.length; index++) {
    if (imports[index]!.old_commit !== imports[index - 1]!.new_commit)
      return refuse("reviewed import chain is discontinuous");
  }
  const git = async (args: string[]) => {
    const result = await execFileAsync("git", args, { cwd: root, env: gitEnv() });
    return result.stdout.trim();
  };
  const head = await git(["rev-parse", "--verify", "HEAD^{commit}"]);
  if (latest.new_commit !== head) return refuse("reviewed import does not reach current HEAD");
  await git(["merge-base", "--is-ancestor", latest.old_commit, head]);
  const evidenceDigest = validation.evidence_digests.at(-1);
  if (!evidenceDigest) return refuse("final validation digest is missing");
  const evidence = await retainedFinalEvidence(opts.command, opts.task.id, evidenceDigest);
  const binding = evidence.binding;
  if (
    binding.task_id !== opts.task.id ||
    binding.plan_digest !== aggregate.current_plan?.digest ||
    binding.evaluator_target !== head ||
    binding.repository_fingerprint !== validation.identity.implementation_identity ||
    k.kernelDigest(binding.commands) !== validation.identity.command_digest ||
    evidence.checks.status !== "passed" ||
    evidence.checks.checks.length === 0 ||
    evidence.checks.checks.some((check) => check.exit_code !== 0)
  )
    return refuse("final validation does not authenticate this publication HEAD");
  const observation = await observeKernelRepository({
    repository_root: root,
    repository_identity: identity as k.Sha256Digest,
    operational_paths: [
      opts.command.config.paths.workflow_dir,
      opts.command.config.paths.tasks_path,
      opts.command.config.paths.worktrees_dir,
    ],
  });
  if (observation.fingerprint !== binding.repository_fingerprint)
    return refuse("verified repository contents changed");
  const provider = await resolveGitHostIdentity({ gitRoot: root, branch: opts.branch });
  const ref = `refs/heads/${pin}`;
  await git(["check-ref-format", ref]);
  const remote = await git(["ls-remote", "--exit-code", "--", provider.targetUrl, ref]);
  const lines = remote.split("\n");
  if (
    lines.length !== 1 ||
    lines[0] !== `${head}\t${ref}` ||
    (await git(["rev-parse", "--verify", "HEAD^{commit}"])) !== head
  )
    return refuse("explicit remote target does not equal the reviewed publication HEAD");
  return { comparisonBase: head, providerBase: pin };
}
