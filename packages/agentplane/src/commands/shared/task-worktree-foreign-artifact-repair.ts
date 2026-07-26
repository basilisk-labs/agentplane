import { createHash } from "node:crypto";
import { unlink } from "node:fs/promises";
import path from "node:path";

import { findWorktreeForBranch, GitContext } from "@agentplaneorg/core/git";
import { canonicalizeJson, parseTaskReadme } from "@agentplaneorg/core/tasks";

import { validateTaskId } from "../../backends/task-backend/shared/id.js";
import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
  readContainedStableTextNoFollow,
  type ContainedPathChainIdentity,
} from "../../shared/contained-stable-file.js";
import { isRecord } from "../../shared/guards.js";
import { resolveTaskBranchFromContext, type CommandContext } from "./task-backend.js";

const TASK_README_MAX_BYTES = 256 * 1024 * 1024;

export type ForeignTaskReadmeReplicaProof = "byte_identical" | "start_ready_replica";

type StableTextProof = {
  path: string;
  identity: ContainedPathChainIdentity;
  content_sha256: string;
};

type AuthoritativeSourceProof = StableTextProof;
type ForeignTaskReadmeReplicaPathProof = StableTextProof;

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

function canonicalEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(canonicalizeJson(left)) === JSON.stringify(canonicalizeJson(right));
}

function contentSha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

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

function recordArray(value: unknown): Record<string, unknown>[] | null {
  if (!Array.isArray(value) || !value.every(isRecord)) return null;
  return value;
}

function requiredString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function exactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value).toSorted((left, right) => left.localeCompare(right));
  const expected = [...keys].toSorted((left, right) => left.localeCompare(right));
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function isWorkflowRouteBaseline(value: unknown): boolean {
  return (
    isRecord(value) &&
    exactKeys(value, ["version", "start_head_sha"]) &&
    value.version === 1 &&
    (value.start_head_sha === null || requiredString(value.start_head_sha) !== null)
  );
}

function withoutStartTransitionFields(
  frontmatter: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...frontmatter };
  delete result.status;
  delete result.revision;
  delete result.comments;
  delete result.events;
  delete result.doc_updated_at;
  delete result.doc_updated_by;
  delete result.extensions;
  return result;
}

function extensionFieldsWithoutBaseline(value: unknown): Record<string, unknown> | null {
  if (value === undefined) return {};
  if (!isRecord(value)) return null;
  const result = { ...value };
  delete result.workflow_route_baseline;
  return result;
}

function validStartReadyTransition(opts: {
  foreignTaskId: string;
  replicaText: string;
  sourceText: string;
}): boolean {
  let replica;
  let source;
  try {
    replica = parseTaskReadme(opts.replicaText);
    source = parseTaskReadme(opts.sourceText);
  } catch {
    return false;
  }
  if (replica.body !== source.body) return false;

  const replicaFrontmatter = replica.frontmatter;
  const sourceFrontmatter = source.frontmatter;
  if (
    replicaFrontmatter.id !== opts.foreignTaskId ||
    sourceFrontmatter.id !== opts.foreignTaskId ||
    replicaFrontmatter.status !== "TODO" ||
    sourceFrontmatter.status !== "DOING" ||
    typeof replicaFrontmatter.revision !== "number" ||
    typeof sourceFrontmatter.revision !== "number" ||
    sourceFrontmatter.revision !== replicaFrontmatter.revision + 1
  ) {
    return false;
  }

  if (
    !canonicalEqual(
      withoutStartTransitionFields(replicaFrontmatter),
      withoutStartTransitionFields(sourceFrontmatter),
    )
  ) {
    return false;
  }

  const replicaExtensions = extensionFieldsWithoutBaseline(replicaFrontmatter.extensions);
  const sourceExtensions = extensionFieldsWithoutBaseline(sourceFrontmatter.extensions);
  if (
    !replicaExtensions ||
    !sourceExtensions ||
    !canonicalEqual(replicaExtensions, sourceExtensions)
  ) {
    return false;
  }
  const replicaBaseline = isRecord(replicaFrontmatter.extensions)
    ? replicaFrontmatter.extensions.workflow_route_baseline
    : undefined;
  const sourceBaseline = isRecord(sourceFrontmatter.extensions)
    ? sourceFrontmatter.extensions.workflow_route_baseline
    : undefined;
  if (
    !isWorkflowRouteBaseline(sourceBaseline) ||
    (replicaBaseline !== undefined && !canonicalEqual(replicaBaseline, sourceBaseline))
  ) {
    return false;
  }

  const replicaComments = recordArray(replicaFrontmatter.comments);
  const sourceComments = recordArray(sourceFrontmatter.comments);
  const replicaEvents = recordArray(replicaFrontmatter.events);
  const sourceEvents = recordArray(sourceFrontmatter.events);
  if (!replicaComments || !sourceComments || !replicaEvents || !sourceEvents) return false;
  if (
    sourceComments.length !== replicaComments.length + 1 ||
    sourceEvents.length !== replicaEvents.length + 1 ||
    !canonicalEqual(replicaComments, sourceComments.slice(0, -1)) ||
    !canonicalEqual(replicaEvents, sourceEvents.slice(0, -1))
  ) {
    return false;
  }

  const comment = sourceComments.at(-1);
  const event = sourceEvents.at(-1);
  const eventAt = event && requiredString(event.at);
  const eventAuthor = event && requiredString(event.author);
  const commentBody = comment && requiredString(comment.body);
  if (
    !comment ||
    !event ||
    !exactKeys(comment, ["author", "body"]) ||
    !exactKeys(event, ["type", "at", "author", "from", "to", "note"]) ||
    !requiredString(comment.author) ||
    !commentBody ||
    !commentBody.startsWith("Start:") ||
    event.type !== "status" ||
    event.from !== "TODO" ||
    event.to !== "DOING" ||
    event.note !== commentBody ||
    !eventAt ||
    !eventAuthor ||
    sourceFrontmatter.doc_updated_at !== eventAt ||
    sourceFrontmatter.doc_updated_by !== eventAuthor
  ) {
    return false;
  }
  return true;
}

export function classifyForeignTaskReadmeReplicaText(opts: {
  foreignTaskId: string;
  replicaText: string;
  sourceText: string;
}): ForeignTaskReadmeReplicaProof | null {
  if (opts.replicaText === opts.sourceText) return "byte_identical";
  return validStartReadyTransition(opts) ? "start_ready_replica" : null;
}

async function resolveAuthoritativeSource(opts: {
  ctx: CommandContext;
  foreignTaskId: string;
  worktreePath: string;
  baseBranch: string | null;
}): Promise<string | null> {
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
  return sourceWorktree;
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

  const sourceWorktree = await resolveAuthoritativeSource({
    ctx: opts.ctx,
    foreignTaskId: candidate.foreignTaskId,
    worktreePath,
    baseBranch: opts.baseBranch,
  });
  if (!sourceWorktree)
    return { state: "not_applicable", reason: "authoritative_source_unavailable" };

  const sourcePath = path.join(
    sourceWorktree,
    ...normalizedRelativePath(opts.ctx.config.paths.workflow_dir).split("/"),
    candidate.foreignTaskId,
    "README.md",
  );
  let sourceIdentity: ContainedPathChainIdentity;
  let sourceText: string;
  try {
    sourceIdentity = await captureContainedPathChainIdentity({
      repository_root: sourceWorktree,
      file_path: sourcePath,
      label: "authoritative foreign task README",
    });
    if (!sourceIdentity.target_exists) {
      return { state: "not_applicable", reason: "authoritative_source_missing" };
    }
    sourceText = await readContainedStableTextNoFollow({
      repository_root: sourceWorktree,
      file_path: sourcePath,
      label: "authoritative foreign task README",
      max_bytes: TASK_README_MAX_BYTES,
    });
  } catch {
    return { state: "not_applicable", reason: "authoritative_source_not_regular" };
  }

  const proof = classifyForeignTaskReadmeReplicaText({
    foreignTaskId: candidate.foreignTaskId,
    replicaText,
    sourceText,
  });
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
  return {
    state: "eligible",
    activeTaskId: opts.activeTaskId,
    foreignTaskId: candidate.foreignTaskId,
    worktreePath,
    replicaPath,
    proof,
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
  await opts.after_source_revalidation?.();
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
