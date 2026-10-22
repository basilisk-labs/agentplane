import path from "node:path";
import { z } from "zod";
import { gitCurrentBranch, listWorktrees, parseTaskIdFromBranch } from "@agentplaneorg/core/git";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  observeKernelRepository,
  kernelRepositoryChangedPaths,
  type KernelRepositoryObservation,
} from "../../runner/observation/kernel-repository.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { CliError } from "../../shared/errors.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import { pathFromStatusLine } from "./git-status-path.js";
import { writeKernelArtifact } from "./kernel-exchange.js";

const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const receiptSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("canonical_worktree_preparation"),
  task_id: z.string().min(1),
  repository_identity: digest,
  parent_authority_digest: digest,
  before_fingerprint: digest,
  after_fingerprint: digest,
  source_checkout: z.string().min(1),
  target_checkout: z.string().min(1),
  target_head: z.string().regex(/^[a-f0-9]{40,64}$/u),
});
const intentSchema = receiptSchema
  .omit({ after_fingerprint: true, target_checkout: true, kind: true })
  .extend({
    kind: z.literal("canonical_worktree_preparation_intent"),
  });

export async function beginKernelWorktreePreparation(opts: {
  command: CommandContext;
  taskId: string;
  parent: k.ExecutionAuthority;
  before: KernelRepositoryObservation;
  targetHead: string;
}) {
  if (opts.before.fingerprint !== opts.parent.repository_fingerprint) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Worktree preparation requires the approved source fingerprint.",
    });
  }
  const intent = intentSchema.parse({
    schema_version: 1,
    kind: "canonical_worktree_preparation_intent",
    task_id: opts.taskId,
    repository_identity: opts.parent.repository_identity,
    parent_authority_digest: opts.parent.digest,
    before_fingerprint: opts.before.fingerprint,
    source_checkout: path.resolve(opts.command.resolvedProject.gitRoot),
    target_head: opts.targetHead,
  });
  await writeKernelArtifact(
    await directory(opts.command, opts.taskId),
    opts.parent.digest.slice(7) + "-intent.json",
    intent,
  );
}

async function recoverPreparation(opts: {
  command: CommandContext;
  taskId: string;
  parent: k.ExecutionAuthority;
}): Promise<boolean> {
  let intent: z.infer<typeof intentSchema>;
  try {
    intent = intentSchema.parse(
      JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(
            await directory(opts.command, opts.taskId),
            opts.parent.digest.slice(7) + "-intent.json",
          ),
          "canonical worktree preparation intent",
        ),
      ),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
  const target = opts.command.resolvedProject.gitRoot;
  const registered = await listWorktrees(target);
  if (
    intent.task_id !== opts.taskId ||
    intent.repository_identity !== opts.parent.repository_identity ||
    intent.parent_authority_digest !== opts.parent.digest ||
    intent.before_fingerprint !== opts.parent.repository_fingerprint ||
    intent.source_checkout === path.resolve(target) ||
    !registered.some((entry) => path.resolve(entry.path) === intent.source_checkout) ||
    intent.target_head !== (await readDirectTaskHead(target)) ||
    !(await cleanRegisteredTarget(opts.command, opts.taskId, target))
  )
    return false;
  const source = await observeKernelRepository({
    repository_root: intent.source_checkout,
    repository_identity: opts.parent.repository_identity,
    operational_paths: operationalPaths(opts.command),
  });
  if (source.fingerprint !== intent.before_fingerprint) return false;
  const after = await observeKernelRepository({
    repository_root: target,
    repository_identity: opts.parent.repository_identity,
    operational_paths: operationalPaths(opts.command),
  });
  const receipt = receiptSchema.parse({
    ...intent,
    kind: "canonical_worktree_preparation",
    target_checkout: path.resolve(target),
    after_fingerprint: after.fingerprint,
  });
  await writeKernelArtifact(
    await directory(opts.command, opts.taskId),
    opts.parent.digest.slice(7) + ".json",
    receipt,
  );
  return true;
}

function operationalPaths(command: CommandContext) {
  return [
    command.config.paths.workflow_dir,
    command.config.paths.tasks_path,
    command.config.paths.worktrees_dir,
  ];
}

async function directory(command: CommandContext, taskId: string) {
  return path.join(
    await resolveCommandGitCommonDir(command),
    "agentplane",
    "kernel",
    "worktree-preparations",
    taskId,
  );
}

async function cleanRegisteredTarget(command: CommandContext, taskId: string, target: string) {
  const branch = await gitCurrentBranch(target);
  const worktrees = await listWorktrees(command.resolvedProject.gitRoot);
  const registered = worktrees.some(
    (entry) =>
      path.resolve(entry.path) === path.resolve(target) &&
      (entry.branch === branch || entry.branch === `refs/heads/${branch}`),
  );
  const status = await readDirectRepositoryStatus(target);
  return (
    registered &&
    parseTaskIdFromBranch(command.config.branch.task_prefix, branch) === taskId &&
    status?.lines.every((line) => {
      const file = pathFromStatusLine(line);
      return operationalPaths(command).some((root) => file === root || file.startsWith(root + "/"));
    }) === true
  );
}

/** Persist only the observed result of the admitted native worktree preparation. */
export async function recordKernelWorktreePreparation(opts: {
  command: CommandContext;
  taskId: string;
  parent: k.ExecutionAuthority;
  before: KernelRepositoryObservation;
  target: string;
}) {
  const source = opts.command.resolvedProject.gitRoot;
  const intent = intentSchema.parse(
    JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(
          await directory(opts.command, opts.taskId),
          opts.parent.digest.slice(7) + "-intent.json",
        ),
        "canonical worktree preparation intent",
      ),
    ),
  );
  const observe = (root: string) =>
    observeKernelRepository({
      repository_root: root,
      repository_identity: opts.parent.repository_identity,
      operational_paths: operationalPaths(opts.command),
    });
  const unchanged = await observe(source);
  const after = await observe(opts.target);
  const checks = {
    source_unchanged: unchanged.fingerprint === opts.before.fingerprint,
    intent_identity:
      intent.task_id === opts.taskId &&
      intent.repository_identity === opts.parent.repository_identity &&
      intent.parent_authority_digest === opts.parent.digest &&
      intent.before_fingerprint === opts.before.fingerprint &&
      intent.source_checkout === path.resolve(source),
    target_head: intent.target_head === (await readDirectTaskHead(opts.target)),
    authority_fingerprint: opts.before.fingerprint === opts.parent.repository_fingerprint,
    distinct_checkout: path.resolve(source) !== path.resolve(opts.target),
    clean_registered_target: await cleanRegisteredTarget(opts.command, opts.taskId, opts.target),
  };
  const violations = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
  if (violations.length > 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Canonical worktree preparation could not prove an unchanged base and clean registered target: ${violations.join(", ")}.`,
      context: {
        reason_code: "canonical_worktree_preparation_unproven",
        task_id: opts.taskId,
        violations,
        changed_source_paths: kernelRepositoryChangedPaths(opts.before, unchanged),
      },
    });
  }
  const receipt = receiptSchema.parse({
    schema_version: 1,
    kind: "canonical_worktree_preparation",
    task_id: opts.taskId,
    repository_identity: opts.parent.repository_identity,
    parent_authority_digest: opts.parent.digest,
    before_fingerprint: opts.before.fingerprint,
    after_fingerprint: after.fingerprint,
    source_checkout: path.resolve(source),
    target_checkout: path.resolve(opts.target),
    target_head: await readDirectTaskHead(opts.target),
  });
  await writeKernelArtifact(
    await directory(opts.command, opts.taskId),
    opts.parent.digest.slice(7) + ".json",
    receipt,
  );
}

export async function observeKernelWorktreePreparation(opts: {
  command: CommandContext;
  taskId: string;
  parent: k.ExecutionAuthority;
  current: KernelRepositoryObservation;
}): Promise<k.AuthorityObservation | null> {
  let receipt: z.infer<typeof receiptSchema>;
  try {
    receipt = receiptSchema.parse(
      JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(
            await directory(opts.command, opts.taskId),
            opts.parent.digest.slice(7) + ".json",
          ),
          "canonical worktree preparation receipt",
        ),
      ),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      if (!(await recoverPreparation(opts))) return null;
      return observeKernelWorktreePreparation(opts);
    }
    throw error;
  }
  if (
    receipt.task_id !== opts.taskId ||
    receipt.repository_identity !== opts.parent.repository_identity ||
    receipt.parent_authority_digest !== opts.parent.digest ||
    receipt.before_fingerprint !== opts.parent.repository_fingerprint ||
    receipt.after_fingerprint !== opts.current.fingerprint ||
    receipt.target_checkout !== path.resolve(opts.command.resolvedProject.gitRoot) ||
    receipt.source_checkout === receipt.target_checkout ||
    receipt.target_head !== (await readDirectTaskHead(receipt.target_checkout)) ||
    !(await cleanRegisteredTarget(opts.command, opts.taskId, receipt.target_checkout))
  )
    return null;
  return {
    kind: "worktree_preparation",
    evidence_digest: k.kernelDigest(receipt),
    previous_fingerprint: opts.parent.repository_fingerprint,
    changed_paths: [],
  };
}
