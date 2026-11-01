import { lstat } from "node:fs/promises";
import path from "node:path";
import { gitProofEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { parseTaskReadme, taskKernel as k } from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../backends/task-backend.js";
import { validateTaskId } from "../../backends/task-backend/shared.js";
import { taskBytesDigest } from "../../backends/task-backend/local-task-byte-store.js";
import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
} from "../../shared/contained-stable-file.js";
import { readStableRegularFileNoFollow } from "../../shared/stable-file.js";
import { resolveLogicalRepositoryIdentity } from "../task/execution-authority-context.js";
import {
  LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION,
  quarantineMarker,
} from "../task/migration-apply-conversion.js";
import {
  decodeLifecycleOwnerMigrationSource,
  previewLifecycleOwnerMigration,
} from "../task/migration-preview.js";
import { isRevisionSplitPreview, quarantineAfterimage } from "../task/migration-quarantine.js";

const oid = /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u;
const requiredEffects = ["repository_write", "security_boundary"] as const;

function relativePath(value: string): boolean {
  return (
    value.length > 0 &&
    !path.isAbsolute(value) &&
    !value.includes("\\") &&
    ![...value].some((character) => character.codePointAt(0)! < 32) &&
    value.split("/").every((part) => part !== "" && part !== "." && part !== "..")
  );
}

/** Prove the native byte projection, independently of the caller's publication authority. */
export function nativeQuarantineArtifactPair(opts: {
  taskId: string;
  repositoryIdentity: k.Sha256Digest;
  workflowDir: string;
  source: string;
  afterimage: string;
  backup: string;
}): readonly [string, string] | null {
  try {
    validateTaskId(opts.taskId);
    if (!relativePath(opts.workflowDir) || opts.backup !== opts.source) return null;
    const sourceBytes = Buffer.from(opts.source, "utf8");
    const preview = previewLifecycleOwnerMigration(sourceBytes);
    if (!isRevisionSplitPreview(preview, opts.taskId)) return null;
    const decoded = decodeLifecycleOwnerMigrationSource(sourceBytes);
    if (
      Object.hasOwn(decoded.source_record.frontmatter.extensions ?? {}, "task_kernel") ||
      decoded.runtime.leases.length > 0 ||
      decoded.runtime.pending_effects.length > 0 ||
      !Object.values(preview.formal_projection.work_items).every(
        (item) =>
          item.claim_id === null && ["PLANNED", "READY", "REWORK_READY"].includes(item.state),
      )
    )
      return null;
    const after = parseTaskReadme(opts.afterimage).frontmatter;
    const extensions = after.extensions as Record<string, unknown> | undefined;
    const marker = quarantineMarker(extensions?.[LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION]);
    if (!marker) return null;
    const backupLocation = `${opts.taskId}/migration-${preview.source_digest.slice(7)}.source`;
    const expected = {
      task_id: opts.taskId,
      repository_identity: opts.repositoryIdentity,
      backend_identity: "local-task-readme-v1",
      source_digest: preview.source_digest,
      source_revision: preview.source_revision,
      mapping_version: preview.mapping_version,
      mapping_digest: k.kernelDigest(preview.mapping),
      reason: "source_revision_mismatch",
      backup_location: backupLocation,
      output_revision: preview.source_revision + 1,
    };
    if (
      Object.entries(expected).some(
        ([key, value]) => marker[key as keyof typeof marker] !== value,
      ) ||
      k.kernelDigest(marker.semantic_assessment_request) !==
        k.kernelDigest(preview.semantic_assessment) ||
      after.id !== opts.taskId ||
      after.status !== "BLOCKED" ||
      quarantineAfterimage(opts.source, marker) !== opts.afterimage
    )
      return null;
    return [
      `${opts.workflowDir}/${opts.taskId}/README.md`,
      `${opts.workflowDir}/${backupLocation}`,
    ];
  } catch {
    return null;
  }
}

async function git(root: string, args: string[]): Promise<Buffer> {
  const result = await execFileAsync("git", args, {
    cwd: root,
    env: gitProofEnv(),
    encoding: "buffer",
    maxBuffer: 16 * 1024 * 1024,
  });
  return result.stdout;
}

async function gitText(root: string, commit: string, file: string): Promise<string | null> {
  const bytes = await git(root, ["ls-tree", "-z", commit, "--", file]);
  const entry = bytes.toString("utf8");
  if (!entry) return null;
  const [header, pathname] = entry.split("\t");
  if (!/^100(?:644|755) blob [a-f0-9]+$/u.test(header ?? "") || pathname !== `${file}\0`)
    throw new Error("Quarantine proof requires a regular Git blob");
  return new TextDecoder("utf-8", { fatal: true }).decode(
    await git(root, ["show", `${commit}:${file}`]),
  );
}

async function commitIdentity(root: string, ref: string): Promise<string> {
  const value = await git(root, ["rev-parse", "--verify", "--end-of-options", `${ref}^{commit}`]);
  return value.toString("utf8").trim();
}

async function stableText(root: string, file: string): Promise<string> {
  const rootBefore = await lstat(root, { bigint: true });
  if (!rootBefore.isDirectory() || rootBefore.isSymbolicLink())
    throw new Error("Quarantine proof requires a real checkout root");
  const target = path.join(root, file);
  const chain = await captureContainedPathChainIdentity({
    repository_root: root,
    file_path: target,
    label: "native quarantine artifact",
    path_policy: { exact_case: true },
  });
  const before = await lstat(target, { bigint: true });
  if (before.nlink !== 1n) throw new Error("Quarantine proof refuses linked artifacts");
  const bytes = await readStableRegularFileNoFollow(target, "native quarantine artifact", {
    max_bytes: 16 * 1024 * 1024,
    expected_identity: before,
  });
  const after = await lstat(target, { bigint: true });
  await assertContainedPathChainIdentityUnchanged(chain, "native quarantine artifact");
  const rootAfter = await lstat(root, { bigint: true });
  if (
    !rootAfter.isDirectory() ||
    rootAfter.isSymbolicLink() ||
    rootBefore.dev !== rootAfter.dev ||
    rootBefore.ino !== rootAfter.ino ||
    after.nlink !== 1n ||
    ["dev", "ino", "size", "mtimeNs", "ctimeNs"].some(
      (key) => before[key as keyof typeof before] !== after[key as keyof typeof after],
    )
  )
    throw new Error("Quarantine artifact changed during proof");
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function approvedRoots(task: TaskData, repositoryIdentity: k.Sha256Digest) {
  const read = readKernelRecord(task, repositoryIdentity);
  if (read.kind !== "canonical" || task.task_kind !== "ops" || task.mutation_scope !== "ops")
    return null;
  const aggregate = read.record.aggregate;
  const plan = aggregate.current_plan;
  const lineage = aggregate.authority_lineage ?? [];
  const authority = lineage.at(-1)?.authority;
  if (
    !["ACTIVE", "FINAL_VALIDATION", "COMPLETED"].includes(aggregate.state) ||
    plan?.state !== "APPROVED" ||
    authority?.plan_digest !== plan.digest ||
    authority.plan_revision !== plan.revision ||
    (authority.expires_at !== null && Date.parse(authority.expires_at) <= Date.now()) ||
    !requiredEffects.every((effect) => authority.repository_effects.includes(effect)) ||
    !authority.capabilities.includes("repository_write") ||
    !task.execution_contract?.authority.allowed_capabilities?.includes("repository_write") ||
    !requiredEffects.every((effect) =>
      task.execution_contract?.authority.allowed_repository_effects.includes(effect),
    )
  )
    return null;
  const roots = authority.scope_roots.filter(
    (root) =>
      task.execution_contract?.declaration.scope_roots.includes(root) &&
      task.execution_contract.authority.writable_roots.includes(root) &&
      lineage.some(
        (entry) => entry.approval_mode !== null && entry.authority.scope_roots.includes(root),
      ) &&
      plan.work_items.some(
        (item) =>
          item.execution_requirements.scope_roots.includes(root) &&
          requiredEffects.every((effect) =>
            item.execution_requirements.repository_effects.includes(effect),
          ),
      ),
  );
  return { roots, plan, authority, workItems: aggregate.work_items };
}

function matchesIssuedWorkOrder(
  task: TaskData,
  approved: NonNullable<ReturnType<typeof approvedRoots>>,
  order: AgentWorkOrderV2 | undefined,
  repositoryIdentity: k.Sha256Digest,
): boolean {
  const binding = order?.canonical_binding;
  if (!order || binding?.phase !== "implementation") return false;
  const item = approved.workItems[binding.work_item_id];
  // The coordinator authenticates the issued envelope against its immutable baseline.
  // This proof additionally binds the exact live claim and its approved foreign-Task scope.
  return Boolean(
    order?.role === "EXECUTOR" &&
    order.task.id === task.id &&
    order.task.revision === task.revision &&
    order.authority.sandbox === "workspace-write" &&
    order.authority.allowed_tool_classes.includes("workspace_write") &&
    binding?.repository_identity === repositoryIdentity &&
    binding.task_id === task.id &&
    binding.plan_digest === approved.plan.digest &&
    binding.plan_revision === approved.plan.revision &&
    binding.repository_fingerprint === approved.authority.repository_fingerprint &&
    /^sha256:[a-f0-9]{64}$/u.test(binding.authority_digest ?? "") &&
    binding.work_item_id === order.task.work_item_id &&
    item?.state === "EXECUTING" &&
    item.claim_id === binding.claim_id &&
    item.attempt === binding.attempt &&
    item.definition.contract_digest === binding.contract_digest,
  );
}

/** A failed proof grants no exception. The existing caller retains its normal ownership refusal. */
export async function nativeQuarantineArtifactPaths(opts: {
  gitRoot: string;
  baseCommit: string;
  evaluatedCommit?: string;
  primaryTaskId: string;
  workflowDir: string;
  changedPaths: readonly string[];
  workOrder?: AgentWorkOrderV2;
}): Promise<ReadonlySet<string>> {
  const admitted = new Set<string>();
  try {
    if (!oid.test(opts.baseCommit) || !relativePath(opts.workflowDir)) return admitted;
    validateTaskId(opts.primaryTaskId);
    const groups = new Map<string, string[]>();
    for (const file of opts.changedPaths) {
      if (!relativePath(file) || !file.startsWith(`${opts.workflowDir}/`)) continue;
      const id = file.slice(opts.workflowDir.length + 1).split("/")[0]!;
      if (id === opts.primaryTaskId) continue;
      validateTaskId(id);
      groups.set(id, [...(groups.get(id) ?? []), file]);
    }
    if (groups.size === 0) return admitted;
    const targetRef = opts.evaluatedCommit ?? "HEAD";
    const target = await commitIdentity(opts.gitRoot, targetRef);
    await git(opts.gitRoot, ["merge-base", "--is-ancestor", opts.baseCommit, target]);
    const evaluated = opts.evaluatedCommit ? target : null;
    const read = async (file: string) =>
      evaluated
        ? await gitText(opts.gitRoot, evaluated, file)
        : await stableText(opts.gitRoot, file);
    const primaryFile = `${opts.workflowDir}/${opts.primaryTaskId}/README.md`;
    const primaryBytes = await read(primaryFile);
    if (primaryBytes === null) return admitted;
    const task = parseTaskReadme(primaryBytes).frontmatter as unknown as TaskData;
    if (task.id !== opts.primaryTaskId) return admitted;
    const repositoryIdentity = (await resolveLogicalRepositoryIdentity({
      git_root: opts.gitRoot,
      task,
      create_if_missing: false,
    })) as k.Sha256Digest;
    const approved = approvedRoots(task, repositoryIdentity);
    if (!approved) return admitted;
    const order = opts.workOrder;
    if (!evaluated && !matchesIssuedWorkOrder(task, approved, order, repositoryIdentity))
      return admitted;
    for (const [taskId, changed] of groups) {
      const directory = `${opts.workflowDir}/${taskId}`;
      if (!approved.roots.includes(directory)) continue;
      if (order && !order.authority.writable_roots.includes(path.join(opts.gitRoot, directory)))
        continue;
      if (
        order &&
        !approved.workItems[
          order.task.work_item_id ?? ""
        ]?.definition.execution_requirements.scope_roots.includes(directory)
      )
        continue;
      const readme = `${directory}/README.md`;
      const source = await gitText(opts.gitRoot, opts.baseCommit, readme);
      if (source === null) continue;
      const backup = `${directory}/migration-${taskBytesDigest(source).slice(7)}.source`;
      if (!changed.includes(readme) || changed.some((file) => file !== readme && file !== backup))
        continue;
      const baseBackup = await gitText(opts.gitRoot, opts.baseCommit, backup);
      if (baseBackup !== null && baseBackup !== source) continue;
      if (baseBackup === null && !changed.includes(backup)) continue;
      const afterimage = await read(readme);
      const retained = await read(backup);
      if (afterimage === null || retained === null) continue;
      const pair = nativeQuarantineArtifactPair({
        taskId,
        repositoryIdentity,
        workflowDir: opts.workflowDir,
        source,
        afterimage,
        backup: retained,
      });
      if (!pair) continue;
      if ((await read(readme)) !== afterimage || (await read(backup)) !== retained) continue;
      for (const file of pair) admitted.add(file);
    }
    if ((await read(primaryFile)) !== primaryBytes) return new Set();
    if ((await commitIdentity(opts.gitRoot, targetRef)) !== target) return new Set();
    return admitted;
  } catch {
    return new Set();
  }
}
