import { unlink } from "node:fs/promises";
import path from "node:path";

import { findWorktreeForBranch, GitContext, toGitPath } from "@agentplaneorg/core/git";

import { validateTaskId } from "../../backends/task-backend/shared/id.js";
import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
  readContainedStableTextNoFollow,
  type ContainedPathChainIdentity,
} from "../../shared/contained-stable-file.js";
import { resolveTaskBranchFromContext, type CommandContext } from "./task-backend.js";
import {
  assertHistoricalProofUnchanged,
  proveHistoricalStartReadyReplica,
  type HistoricalForeignTaskReadmeReplicaProof,
} from "./task-worktree-foreign-artifact-history-proof.js";
import { contentSha256 } from "./task-worktree-foreign-artifact-lifecycle-proof.js";

const TASK_README_MAX_BYTES = 256 * 1024 * 1024;

export type ForeignTaskReadmeReplicaProof = "byte_identical" | "historical_start_ready_replica";

type StableTextProof = {
  path: string;
  identity: ContainedPathChainIdentity;
  content_sha256: string;
};

type AuthoritativeSourceProof = StableTextProof;
type ForeignTaskReadmeReplicaPathProof = StableTextProof;

type ResolvedAuthoritativeSource = {
  worktreePath: string;
  branch: string | null;
};

type ForeignTaskReadmeReplicaRepairEligible = {
  state: "eligible";
  activeTaskId: string;
  foreignTaskId: string;
  worktreePath: string;
  replicaPath: string;
  proof: ForeignTaskReadmeReplicaProof;
};

type ForeignTaskReadmeReplicaRepairNotApplicable = {
  state: "not_applicable";
  reason: string;
};

export type ForeignTaskReadmeReplicaRepair =
  | ForeignTaskReadmeReplicaRepairEligible
  | ForeignTaskReadmeReplicaRepairNotApplicable;

type InspectedForeignTaskReadmeReplicaRepair =
  | (ForeignTaskReadmeReplicaRepairEligible & {
      authoritativeSource: AuthoritativeSourceProof;
      replica: ForeignTaskReadmeReplicaPathProof;
      historicalProof: HistoricalForeignTaskReadmeReplicaProof | null;
    })
  | {
      state: "not_applicable";
      reason: string;
    };

export type ForeignTaskReadmeReplicaApplyResult =
  | {
      state: "applied";
      foreignTaskId: string;
      proof: ForeignTaskReadmeReplicaProof;
    }
  | {
      state: "skipped";
      reason: string;
    };

function sameContainedPathChain(
  left: ContainedPathChainIdentity,
  right: ContainedPathChainIdentity,
): boolean {
  return (
    left.repository_root === right.repository_root &&
    left.file_path === right.file_path &&
    left.target_exists === right.target_exists &&
    left.identities.length === right.identities.length &&
    left.identities.every(
      (entry, index) =>
        entry.path === right.identities[index]?.path &&
        entry.dev === right.identities[index]?.dev &&
        entry.ino === right.identities[index]?.ino &&
        entry.ctime_ns === right.identities[index]?.ctime_ns &&
        entry.mtime_ns === right.identities[index]?.mtime_ns,
    )
  );
}

function normalizedRelativePath(value: string): string {
  return value.replaceAll("\\", "/").replace(/^\.\//u, "").replace(/\/+$/u, "");
}

function foreignTaskIdFromReplicaPath(opts: {
  workflowDir: string;
  relativePath: string;
}): string | null {
  const workflowDir = normalizedRelativePath(opts.workflowDir);
  const relativePath = normalizedRelativePath(opts.relativePath);
  if (!workflowDir || !relativePath) return null;
  const expectedPrefix = `${workflowDir}/`;
  if (!relativePath.startsWith(expectedPrefix) || !relativePath.endsWith("/README.md")) {
    return null;
  }
  const remainder = relativePath.slice(expectedPrefix.length);
  const segments = remainder.split("/");
  if (segments.length !== 2 || segments[1] !== "README.md") return null;
  const taskId = segments[0]?.trim() ?? "";
  if (!taskId) return null;
  try {
    validateTaskId(taskId);
    return taskId;
  } catch {
    return null;
  }
}

export function classifyForeignTaskReadmeReplicaText(opts: {
  replicaText: string;
  sourceText: string;
}): ForeignTaskReadmeReplicaProof | null {
  if (opts.replicaText === opts.sourceText) return "byte_identical";
  return null;
}

async function resolveAuthoritativeSource(opts: {
  ctx: CommandContext;
  foreignTaskId: string;
  worktreePath: string;
  baseBranch: string | null;
}): Promise<ResolvedAuthoritativeSource | null> {
  const foreignBranch = await resolveTaskBranchFromContext({
    ctx: opts.ctx,
    taskId: opts.foreignTaskId,
  }).catch(() => null);
  const sourceWorktree = foreignBranch
    ? await findWorktreeForBranch(opts.ctx.resolvedProject.gitRoot, foreignBranch).catch(() => null)
    : opts.baseBranch
      ? await findWorktreeForBranch(opts.ctx.resolvedProject.gitRoot, opts.baseBranch).catch(
          () => null,
        )
      : null;
  if (!sourceWorktree || path.resolve(sourceWorktree) === path.resolve(opts.worktreePath))
    return null;
  return { worktreePath: sourceWorktree, branch: foreignBranch };
}

async function assertHistoricalProofContextUnchanged(opts: {
  ctx: CommandContext;
  foreignTaskId: string;
  proof: HistoricalForeignTaskReadmeReplicaProof;
}): Promise<void> {
  const currentBranch = await resolveTaskBranchFromContext({
    ctx: opts.ctx,
    taskId: opts.foreignTaskId,
  });
  if (currentBranch !== opts.proof.branch) {
    throw new Error("authoritative foreign task branch resolution changed after proof");
  }
  await assertHistoricalProofUnchanged(opts.proof, opts.ctx.resolvedProject.gitRoot);
}

function onlyForeignReplicaPath(opts: {
  changedPaths: readonly string[];
  untrackedPaths: readonly string[];
  workflowDir: string;
  activeTaskId: string;
}): { relativePath: string; foreignTaskId: string } | null {
  if (opts.changedPaths.length !== 1 || opts.untrackedPaths.length !== 1) return null;
  const changedPath = normalizedRelativePath(opts.changedPaths[0] ?? "");
  const untrackedPath = normalizedRelativePath(opts.untrackedPaths[0] ?? "");
  if (!changedPath || changedPath !== untrackedPath) return null;
  const foreignTaskId = foreignTaskIdFromReplicaPath({
    workflowDir: opts.workflowDir,
    relativePath: changedPath,
  });
  if (!foreignTaskId || foreignTaskId === opts.activeTaskId) return null;
  return { relativePath: changedPath, foreignTaskId };
}

async function inspectForeignTaskReadmeReplicaRepairForApply(opts: {
  ctx: CommandContext;
  activeTaskId: string;
  taskWorktreePath: string;
  baseBranch: string | null;
}): Promise<InspectedForeignTaskReadmeReplicaRepair> {
  const worktreePath = path.resolve(opts.taskWorktreePath);
  const git = new GitContext({ gitRoot: worktreePath });
  const [changedPaths, untrackedPaths] = await Promise.all([
    git.statusChangedPaths(),
    git.statusUntrackedPaths(),
  ]).catch(() => [[], []] as const);
  const candidate = onlyForeignReplicaPath({
    changedPaths,
    untrackedPaths,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    activeTaskId: opts.activeTaskId,
  });
  if (!candidate) return { state: "not_applicable", reason: "not_single_foreign_untracked_readme" };

  const replicaPath = path.join(worktreePath, ...candidate.relativePath.split("/"));
  let replicaIdentity: ContainedPathChainIdentity;
  let replicaText: string;
  try {
    replicaIdentity = await captureContainedPathChainIdentity({
      repository_root: worktreePath,
      file_path: replicaPath,
      label: "foreign task README replica",
    });
    if (!replicaIdentity.target_exists) {
      return { state: "not_applicable", reason: "foreign_replica_missing" };
    }
    replicaText = await readContainedStableTextNoFollow({
      repository_root: worktreePath,
      file_path: replicaPath,
      label: "foreign task README replica",
      max_bytes: TASK_README_MAX_BYTES,
    });
  } catch {
    return { state: "not_applicable", reason: "foreign_replica_not_regular" };
  }

  const authoritativeSource = await resolveAuthoritativeSource({
    ctx: opts.ctx,
    foreignTaskId: candidate.foreignTaskId,
    worktreePath,
    baseBranch: opts.baseBranch,
  });
  if (!authoritativeSource)
    return { state: "not_applicable", reason: "authoritative_source_unavailable" };

  const workflowDir = normalizedRelativePath(opts.ctx.config.paths.workflow_dir);
  const gitPath = toGitPath(`${workflowDir}/${candidate.foreignTaskId}/README.md`);
  const sourcePath = path.join(
    authoritativeSource.worktreePath,
    ...workflowDir.split("/"),
    candidate.foreignTaskId,
    "README.md",
  );
  let sourceIdentity: ContainedPathChainIdentity;
  let sourceText: string;
  try {
    sourceIdentity = await captureContainedPathChainIdentity({
      repository_root: authoritativeSource.worktreePath,
      file_path: sourcePath,
      label: "authoritative foreign task README",
    });
    if (!sourceIdentity.target_exists) {
      return { state: "not_applicable", reason: "authoritative_source_missing" };
    }
    sourceText = await readContainedStableTextNoFollow({
      repository_root: authoritativeSource.worktreePath,
      file_path: sourcePath,
      label: "authoritative foreign task README",
      max_bytes: TASK_README_MAX_BYTES,
    });
  } catch {
    return { state: "not_applicable", reason: "authoritative_source_not_regular" };
  }

  let proof = classifyForeignTaskReadmeReplicaText({
    replicaText,
    sourceText,
  });
  let historicalProof: HistoricalForeignTaskReadmeReplicaProof | null = null;
  if (!proof) {
    historicalProof = await proveHistoricalStartReadyReplica({
      ctx: opts.ctx,
      foreignTaskId: candidate.foreignTaskId,
      foreignBranch: authoritativeSource.branch,
      gitPath,
      replicaText,
      sourceText,
    });
    if (historicalProof) proof = "historical_start_ready_replica";
  }
  if (!proof) return { state: "not_applicable", reason: "foreign_replica_proof_failed" };

  const afterStatus = new GitContext({ gitRoot: worktreePath });
  const [changedAfter, untrackedAfter] = await Promise.all([
    afterStatus.statusChangedPaths(),
    afterStatus.statusUntrackedPaths(),
  ]).catch(() => [[], []] as const);
  const afterCandidate = onlyForeignReplicaPath({
    changedPaths: changedAfter,
    untrackedPaths: untrackedAfter,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    activeTaskId: opts.activeTaskId,
  });
  if (
    afterCandidate?.relativePath !== candidate.relativePath ||
    afterCandidate?.foreignTaskId !== candidate.foreignTaskId
  ) {
    return { state: "not_applicable", reason: "mixed_or_changed_worktree_state" };
  }
  try {
    await assertContainedPathChainIdentityUnchanged(replicaIdentity, "foreign task README replica");
  } catch {
    return { state: "not_applicable", reason: "foreign_replica_changed" };
  }
  if (historicalProof) {
    try {
      await assertHistoricalProofContextUnchanged({
        ctx: opts.ctx,
        foreignTaskId: candidate.foreignTaskId,
        proof: historicalProof,
      });
    } catch {
      return { state: "not_applicable", reason: "foreign_replica_proof_failed" };
    }
  }
  return {
    state: "eligible",
    activeTaskId: opts.activeTaskId,
    foreignTaskId: candidate.foreignTaskId,
    worktreePath,
    replicaPath,
    proof,
    historicalProof,
    replica: {
      path: replicaIdentity.file_path,
      identity: replicaIdentity,
      content_sha256: contentSha256(replicaText),
    },
    authoritativeSource: {
      path: sourceIdentity.file_path,
      identity: sourceIdentity,
      content_sha256: contentSha256(sourceText),
    },
  };
}

export async function inspectForeignTaskReadmeReplicaRepair(opts: {
  ctx: CommandContext;
  activeTaskId: string;
  taskWorktreePath: string;
  baseBranch: string | null;
}): Promise<ForeignTaskReadmeReplicaRepair> {
  const inspection = await inspectForeignTaskReadmeReplicaRepairForApply(opts);
  if (inspection.state !== "eligible") return inspection;
  const {
    authoritativeSource: _authoritativeSource,
    replica: _replica,
    historicalProof: _historicalProof,
    ...publicInspection
  } = inspection;
  return publicInspection;
}

async function assertStableTextProofUnchanged(opts: {
  proof: StableTextProof;
  label: string;
}): Promise<void> {
  const { proof, label } = opts;
  await assertContainedPathChainIdentityUnchanged(proof.identity, label);
  const sourceText = await readContainedStableTextNoFollow({
    repository_root: proof.identity.repository_root,
    file_path: proof.path,
    label,
    max_bytes: TASK_README_MAX_BYTES,
  });
  if (contentSha256(sourceText) !== proof.content_sha256) {
    throw new Error(`${label} changed after proof`);
  }
  const afterIdentity = await captureContainedPathChainIdentity({
    repository_root: proof.identity.repository_root,
    file_path: proof.path,
    label,
  });
  if (!afterIdentity.target_exists || !sameContainedPathChain(proof.identity, afterIdentity)) {
    throw new Error(`${label} path changed after proof`);
  }
}

async function assertAuthoritativeSourceProofUnchanged(
  proof: AuthoritativeSourceProof,
): Promise<void> {
  await assertStableTextProofUnchanged({
    proof,
    label: "authoritative foreign task README",
  });
}

async function assertForeignTaskReadmeReplicaProofUnchanged(
  proof: ForeignTaskReadmeReplicaPathProof,
): Promise<void> {
  await assertStableTextProofUnchanged({
    proof,
    label: "foreign task README replica",
  });
}

export async function applyForeignTaskReadmeReplicaRepair(opts: {
  ctx: CommandContext;
  activeTaskId: string;
  baseBranch: string | null;
  /** @internal Deterministic TOCTOU injection for security regression tests. */
  after_inspection?: () => Promise<void>;
  /** @internal Deterministic TOCTOU injection after source revalidation. */
  after_source_revalidation?: () => Promise<void>;
}): Promise<ForeignTaskReadmeReplicaApplyResult> {
  const inspection = await inspectForeignTaskReadmeReplicaRepairForApply({
    ctx: opts.ctx,
    activeTaskId: opts.activeTaskId,
    taskWorktreePath: opts.ctx.resolvedProject.gitRoot,
    baseBranch: opts.baseBranch,
  });
  if (inspection.state !== "eligible") {
    return { state: "skipped", reason: inspection.reason };
  }
  await opts.after_inspection?.();
  try {
    await assertForeignTaskReadmeReplicaProofUnchanged(inspection.replica);
  } catch {
    return { state: "skipped", reason: "foreign_replica_changed_before_remove" };
  }
  try {
    await assertAuthoritativeSourceProofUnchanged(inspection.authoritativeSource);
  } catch {
    return { state: "skipped", reason: "authoritative_source_changed_before_remove" };
  }
  if (inspection.historicalProof) {
    try {
      await assertHistoricalProofContextUnchanged({
        ctx: opts.ctx,
        foreignTaskId: inspection.foreignTaskId,
        proof: inspection.historicalProof,
      });
    } catch {
      return { state: "skipped", reason: "authoritative_branch_changed_before_remove" };
    }
  }
  await opts.after_source_revalidation?.();
  try {
    await assertAuthoritativeSourceProofUnchanged(inspection.authoritativeSource);
  } catch {
    return { state: "skipped", reason: "authoritative_source_changed_before_remove" };
  }
  if (inspection.historicalProof) {
    try {
      await assertHistoricalProofContextUnchanged({
        ctx: opts.ctx,
        foreignTaskId: inspection.foreignTaskId,
        proof: inspection.historicalProof,
      });
    } catch {
      return { state: "skipped", reason: "authoritative_branch_changed_before_remove" };
    }
  }
  try {
    await assertForeignTaskReadmeReplicaProofUnchanged(inspection.replica);
  } catch {
    return { state: "skipped", reason: "foreign_replica_changed_before_remove" };
  }
  try {
    await unlink(inspection.replicaPath);
  } catch {
    return { state: "skipped", reason: "foreign_replica_changed_before_remove" };
  }
  return {
    state: "applied",
    foreignTaskId: inspection.foreignTaskId,
    proof: inspection.proof,
  };
}
