import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { link, lstat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { CliError } from "../../shared/errors.js";
import {
  buildEvidenceInventory,
  type EvidenceInventory,
  type EvidenceObjectRecord,
} from "./evidence-inventory.js";
import { sha256EvidenceFile } from "./evidence-sha256.js";

const execFileAsync = promisify(execFile);

export type EvidenceMaintenanceResult = {
  schema_version: 1;
  kind: "agentplane.evidence.maintenance";
  operation: "compact" | "gc";
  applied: boolean;
  changed_objects: number;
  reclaimed_bytes: number;
  candidates: string[];
  inventory: EvidenceInventory;
};

function assertSafeInventory(inventory: EvidenceInventory): void {
  if (inventory.summary.corrupt_objects > 0 || inventory.summary.missing_references > 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Evidence maintenance refused an inconsistent object store: " +
        `corrupt_objects=${inventory.summary.corrupt_objects} ` +
        `missing_references=${inventory.summary.missing_references}.`,
    });
  }
}

async function assertCleanRepository(root: string): Promise<void> {
  const { stdout } = await execFileAsync(
    "git",
    ["status", "--porcelain=v1", "--untracked-files=all"],
    { cwd: root, maxBuffer: 16 * 1024 * 1024 },
  );
  if (stdout.trim().length > 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evidence maintenance apply requires a clean repository.",
    });
  }
}

async function assertOnlyExpectedGcChanges(
  root: string,
  deletedPaths: ReadonlySet<string>,
): Promise<void> {
  const { stdout } = await execFileAsync(
    "git",
    ["status", "--porcelain=v1", "-z", "--untracked-files=all"],
    { cwd: root, encoding: "buffer", maxBuffer: 16 * 1024 * 1024 },
  );
  const unexpected = stdout
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .filter((entry) => entry.startsWith(" D ") && deletedPaths.has(entry.slice(3)) === false);
  const nonDeletionChanges = stdout
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .filter((entry) => !entry.startsWith(" D "));
  if (unexpected.length > 0 || nonDeletionChanges.length > 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evidence maintenance stopped because repository state changed during GC.",
    });
  }
}

function assertApplyConfirmed(apply: boolean, yes: boolean): void {
  if (apply && !yes) {
    throw new CliError({
      code: "E_USAGE",
      message: "Evidence maintenance apply requires --yes. Omit --apply for a dry run.",
    });
  }
}

async function assertObjectUnchanged(object: EvidenceObjectRecord): Promise<void> {
  const entry = await lstat(object.absolute_path, { bigint: true }).catch(() => null);
  const inodeKey = entry ? `${entry.dev}:${entry.ino}` : null;
  if (
    !entry?.isFile() ||
    entry.isSymbolicLink() ||
    inodeKey !== object.inode_key ||
    Number(entry.size) !== object.size_bytes ||
    Number(entry.mtimeNs / 1_000_000n) !== object.mtime_ms ||
    (object.digest !== null && (await sha256EvidenceFile(object.absolute_path)) !== object.digest)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Evidence object changed during maintenance: ${object.path}`,
    });
  }
}

async function revalidateCollectibleObject(opts: {
  root: string;
  workflowDir: string;
  object: EvidenceObjectRecord;
  deletedPaths: ReadonlySet<string>;
  now?: Date;
}): Promise<EvidenceObjectRecord> {
  await assertObjectUnchanged(opts.object);
  await assertOnlyExpectedGcChanges(opts.root, opts.deletedPaths);
  const inventory = await buildEvidenceInventory(opts);
  assertSafeInventory(inventory);
  const current = inventory.objects.find((candidate) => candidate.path === opts.object.path);
  if (
    !current?.collectible ||
    current.digest !== opts.object.digest ||
    current.inode_key !== opts.object.inode_key
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Evidence object is no longer collectible: ${opts.object.path}`,
    });
  }
  await assertObjectUnchanged(current);
  await assertOnlyExpectedGcChanges(opts.root, opts.deletedPaths);
  return current;
}

function compactCandidates(inventory: EvidenceInventory): {
  canonical: EvidenceObjectRecord;
  duplicates: EvidenceObjectRecord[];
}[] {
  const byDigest = new Map<string, EvidenceObjectRecord[]>();
  for (const object of inventory.objects) {
    if (!object.hash_valid || object.digest === null) continue;
    const group = byDigest.get(object.digest) ?? [];
    group.push(object);
    byDigest.set(object.digest, group);
  }
  const groups: { canonical: EvidenceObjectRecord; duplicates: EvidenceObjectRecord[] }[] = [];
  for (const objects of byDigest.values()) {
    const sorted = objects.toSorted((left, right) => left.path.localeCompare(right.path));
    const canonical = sorted[0];
    if (!canonical) continue;
    const seenInodes = new Set([canonical.inode_key]);
    const duplicates = sorted.slice(1).filter((object) => {
      if (seenInodes.has(object.inode_key)) return false;
      seenInodes.add(object.inode_key);
      return true;
    });
    if (duplicates.length > 0) groups.push({ canonical, duplicates });
  }
  return groups;
}

async function replaceWithHardLink(
  canonical: EvidenceObjectRecord,
  duplicate: EvidenceObjectRecord,
): Promise<void> {
  await assertObjectUnchanged(canonical);
  await assertObjectUnchanged(duplicate);
  const stagingPath = path.join(
    path.dirname(duplicate.absolute_path),
    `.evidence-compact-${randomUUID()}.tmp`,
  );
  await link(canonical.absolute_path, stagingPath);
  try {
    await rename(stagingPath, duplicate.absolute_path);
  } catch (error) {
    try {
      await unlink(stagingPath);
    } catch {
      // Preserve the original atomic replacement failure.
    }
    throw error;
  }
  if ((await sha256EvidenceFile(duplicate.absolute_path)) !== duplicate.digest) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Compacted evidence object failed hash verification: ${duplicate.path}`,
    });
  }
}

export async function compactEvidenceObjects(opts: {
  root: string;
  workflowDir: string;
  apply: boolean;
  yes: boolean;
  now?: Date;
  beforeReplace?: (object: EvidenceObjectRecord) => Promise<void>;
}): Promise<EvidenceMaintenanceResult> {
  assertApplyConfirmed(opts.apply, opts.yes);
  const inventory = await buildEvidenceInventory(opts);
  assertSafeInventory(inventory);
  const groups = inventory.policy.objects.deduplicate ? compactCandidates(inventory) : [];
  const candidates = groups.flatMap((group) => group.duplicates.map((object) => object.path));
  const reclaimedBytes = groups.reduce(
    (total, group) =>
      total + group.duplicates.reduce((sum, object) => sum + object.allocated_bytes, 0),
    0,
  );
  if (opts.apply) {
    await assertCleanRepository(opts.root);
    for (const group of groups) {
      for (const duplicate of group.duplicates) {
        await opts.beforeReplace?.(duplicate);
        await replaceWithHardLink(group.canonical, duplicate);
      }
    }
  }
  return {
    schema_version: 1,
    kind: "agentplane.evidence.maintenance",
    operation: "compact",
    applied: opts.apply,
    changed_objects: opts.apply ? candidates.length : 0,
    reclaimed_bytes: opts.apply ? reclaimedBytes : 0,
    candidates,
    inventory,
  };
}

export async function garbageCollectEvidenceObjects(opts: {
  root: string;
  workflowDir: string;
  apply: boolean;
  yes: boolean;
  now?: Date;
  beforeUnlink?: (object: EvidenceObjectRecord) => Promise<void>;
}): Promise<EvidenceMaintenanceResult> {
  assertApplyConfirmed(opts.apply, opts.yes);
  const inventory = await buildEvidenceInventory(opts);
  assertSafeInventory(inventory);
  const collectible = inventory.objects.filter((object) => object.collectible);
  if (opts.apply) {
    await assertCleanRepository(opts.root);
    const deletedPaths = new Set<string>();
    for (const object of collectible) {
      await opts.beforeUnlink?.(object);
      const current = await revalidateCollectibleObject({
        root: opts.root,
        workflowDir: opts.workflowDir,
        object,
        deletedPaths,
        now: opts.now,
      });
      await unlink(current.absolute_path);
      deletedPaths.add(current.path);
    }
  }
  return {
    schema_version: 1,
    kind: "agentplane.evidence.maintenance",
    operation: "gc",
    applied: opts.apply,
    changed_objects: opts.apply ? collectible.length : 0,
    reclaimed_bytes: opts.apply
      ? collectible.reduce((sum, object) => sum + object.allocated_bytes, 0)
      : 0,
    candidates: collectible.map((object) => object.path),
    inventory,
  };
}
