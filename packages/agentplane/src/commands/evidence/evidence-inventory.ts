import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import { z } from "zod";

import { CliError } from "../../shared/errors.js";

const execFileAsync = promisify(execFile);
const OBJECT_NAME_PATTERN = /^(?<digest>[a-f0-9]{64})(?<extension>\.[a-z0-9][a-z0-9.-]{0,15})$/u;

const RETENTION_POLICY_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    objects: z
      .object({
        keep_success_days: z.number().int().min(1),
        keep_failure_days: z.number().int().min(1),
        deduplicate: z.boolean(),
        pin_release_evidence: z.boolean(),
      })
      .strict(),
  })
  .strict()
  .superRefine((policy, ctx) => {
    if (policy.objects.keep_failure_days < policy.objects.keep_success_days) {
      ctx.addIssue({
        code: "custom",
        path: ["objects", "keep_failure_days"],
        message: "must be greater than or equal to keep_success_days",
      });
    }
  });

export type EvidenceRetentionPolicy = z.infer<typeof RETENTION_POLICY_SCHEMA>;

export const DEFAULT_EVIDENCE_RETENTION_POLICY: EvidenceRetentionPolicy = {
  schema_version: 1,
  objects: {
    keep_success_days: 30,
    keep_failure_days: 180,
    deduplicate: true,
    pin_release_evidence: true,
  },
};

export type EvidenceObjectRecord = {
  path: string;
  absolute_path: string;
  task_id: string;
  digest: `sha256:${string}` | null;
  size_bytes: number;
  allocated_bytes: number;
  mtime_ms: number;
  inode_key: string | null;
  hash_valid: boolean;
  referenced: boolean;
  pinned_reason: "active_task" | "current_failure" | "release_evidence" | null;
  expired: boolean;
  collectible: boolean;
};

export type EvidenceInventory = {
  schema_version: 1;
  kind: "agentplane.evidence.inventory";
  generated_at: string;
  policy_path: string;
  policy: EvidenceRetentionPolicy;
  summary: {
    tasks_with_objects: number;
    tracked_evidence_files: number;
    tracked_evidence_bytes: number;
    object_count: number;
    logical_bytes: number;
    allocated_bytes: number;
    unique_contents: number;
    duplicate_objects: number;
    duplicate_bytes: number;
    reachable_objects: number;
    pinned_objects: number;
    expired_objects: number;
    collectible_objects: number;
    collectible_bytes: number;
    corrupt_objects: number;
    missing_references: number;
  };
  objects: EvidenceObjectRecord[];
  missing_references: string[];
};

type TaskRetentionState = {
  pin: EvidenceObjectRecord["pinned_reason"];
  failure: boolean;
};

function toPosix(value: string): string {
  return value.replaceAll(path.sep, "/");
}

async function sha256File(filePath: string): Promise<`sha256:${string}`> {
  const hash = createHash("sha256");
  return await new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on("data", (chunk: Buffer) => hash.update(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(`sha256:${hash.digest("hex")}`));
  });
}

async function readPolicy(root: string): Promise<{
  path: string;
  value: EvidenceRetentionPolicy;
}> {
  const relative = ".agentplane/evidence-retention.json";
  const absolute = path.join(root, relative);
  const entry = await lstat(absolute).catch(() => null);
  if (!entry) return { path: relative, value: DEFAULT_EVIDENCE_RETENTION_POLICY };
  if (!entry.isFile() || entry.isSymbolicLink()) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Evidence retention policy must be a regular file: ${relative}`,
    });
  }
  try {
    return {
      path: relative,
      value: RETENTION_POLICY_SCHEMA.parse(JSON.parse(await readFile(absolute, "utf8"))),
    };
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Invalid evidence retention policy: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
}

async function taskRetentionState(
  taskRoot: string,
  pinReleaseEvidence: boolean,
): Promise<TaskRetentionState> {
  try {
    const parsed = parseTaskReadme(await readFile(path.join(taskRoot, "README.md"), "utf8"));
    const frontmatter = parsed.frontmatter;
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    const isRelease = tags.includes("release");
    const verification =
      frontmatter.verification && typeof frontmatter.verification === "object"
        ? (frontmatter.verification as { state?: unknown }).state
        : null;
    const quality =
      frontmatter.quality_review && typeof frontmatter.quality_review === "object"
        ? (frontmatter.quality_review as { state?: unknown }).state
        : null;
    const failure =
      frontmatter.status === "BLOCKED" ||
      verification === "needs_rework" ||
      quality === "rework" ||
      quality === "blocked" ||
      quality === "human_review";
    if (pinReleaseEvidence && isRelease) return { pin: "release_evidence", failure };
    if (failure) return { pin: "current_failure", failure: true };
    if (frontmatter.status !== "DONE") return { pin: "active_task", failure: false };
    return { pin: null, failure: false };
  } catch {
    return { pin: "active_task", failure: false };
  }
}

async function collectManifestReferences(
  qualityRoot: string,
  root: string,
): Promise<{ references: Set<string>; errors: string[] }> {
  const references = new Set<string>();
  const errors: string[] = [];
  const visit = async (directory: string): Promise<void> => {
    const entries = await readdir(directory, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      if (entry.isSymbolicLink() || entry.name === "objects") continue;
      const candidate = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(candidate);
        continue;
      }
      if (!entry.isFile() || entry.name !== "evaluator-evidence-manifest.json") continue;
      try {
        const manifest = JSON.parse(await readFile(candidate, "utf8")) as {
          artifacts?: { path?: unknown }[];
        };
        for (const artifact of manifest.artifacts ?? []) {
          if (typeof artifact.path !== "string") continue;
          const normalized = toPosix(artifact.path);
          const absolute = path.resolve(root, normalized);
          if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`)) {
            errors.push(`unsafe_reference:${toPosix(path.relative(root, candidate))}`);
            continue;
          }
          references.add(normalized);
        }
      } catch {
        errors.push(`invalid_manifest:${toPosix(path.relative(root, candidate))}`);
      }
    }
  };
  await visit(qualityRoot);
  return { references, errors };
}

async function trackedEvidence(
  root: string,
  workflowDir: string,
): Promise<{
  files: number;
  bytes: number;
}> {
  const { stdout } = await execFileAsync(
    "git",
    ["ls-files", "-z", "--", workflowDir, ".agentplane/.release"],
    { cwd: root, encoding: "buffer", maxBuffer: 16 * 1024 * 1024 },
  );
  const paths = stdout.toString("utf8").split("\0").filter(Boolean);
  let bytes = 0;
  for (const relative of paths) {
    const entry = await lstat(path.join(root, relative)).catch(() => null);
    if (entry?.isFile() && !entry.isSymbolicLink()) bytes += entry.size;
  }
  return { files: paths.length, bytes };
}

export async function buildEvidenceInventory(opts: {
  root: string;
  workflowDir: string;
  now?: Date;
}): Promise<EvidenceInventory> {
  const now = opts.now ?? new Date();
  const policy = await readPolicy(opts.root);
  const tasksRoot = path.join(opts.root, opts.workflowDir);
  const taskEntries = await readdir(tasksRoot, { withFileTypes: true }).catch(() => []);
  const objects: EvidenceObjectRecord[] = [];
  const allReferences = new Set<string>();
  const referenceErrors: string[] = [];
  const tasksWithObjects = new Set<string>();

  for (const taskEntry of taskEntries.toSorted((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    if (!taskEntry.isDirectory() || taskEntry.isSymbolicLink()) continue;
    const taskRoot = path.join(tasksRoot, taskEntry.name);
    const qualityRoot = path.join(taskRoot, "quality");
    const objectRoot = path.join(qualityRoot, "objects", "sha256");
    const objectEntries = await readdir(objectRoot, { withFileTypes: true }).catch(() => []);
    if (objectEntries.length === 0) continue;
    tasksWithObjects.add(taskEntry.name);
    const manifestReferences = await collectManifestReferences(qualityRoot, opts.root);
    for (const reference of manifestReferences.references) {
      allReferences.add(reference);
    }
    referenceErrors.push(...manifestReferences.errors);
    const state = await taskRetentionState(taskRoot, policy.value.objects.pin_release_evidence);
    const retentionDays = state.failure
      ? policy.value.objects.keep_failure_days
      : policy.value.objects.keep_success_days;
    for (const objectEntry of objectEntries.toSorted((left, right) =>
      left.name.localeCompare(right.name),
    )) {
      const absolute = path.join(objectRoot, objectEntry.name);
      const relative = toPosix(path.relative(opts.root, absolute));
      const match = OBJECT_NAME_PATTERN.exec(objectEntry.name);
      const entry = await lstat(absolute, { bigint: true }).catch(() => null);
      const regular = Boolean(entry?.isFile() && !entry.isSymbolicLink());
      const expectedDigest = match?.groups?.digest ? `sha256:${match.groups.digest}` : null;
      const actualDigest = regular ? await sha256File(absolute).catch(() => null) : null;
      const hashValid = expectedDigest !== null && actualDigest === expectedDigest;
      const mtimeMs = entry ? Number(entry.mtimeNs / 1_000_000n) : 0;
      const ageMs = Math.max(0, now.getTime() - mtimeMs);
      const expired = ageMs >= retentionDays * 86_400_000;
      const referenced = allReferences.has(relative);
      objects.push({
        path: relative,
        absolute_path: absolute,
        task_id: taskEntry.name,
        digest: expectedDigest as `sha256:${string}` | null,
        size_bytes: entry ? Number(entry.size) : 0,
        allocated_bytes: entry ? Number(entry.blocks * 512n) : 0,
        mtime_ms: mtimeMs,
        inode_key: entry ? `${entry.dev}:${entry.ino}` : null,
        hash_valid: hashValid,
        referenced,
        pinned_reason: state.pin,
        expired,
        collectible: hashValid && !referenced && state.pin === null && expired,
      });
    }
  }

  for (const object of objects) {
    object.referenced = allReferences.has(object.path);
    object.collectible =
      object.hash_valid && !object.referenced && object.pinned_reason === null && object.expired;
  }
  const objectPaths = new Set(objects.map((object) => object.path));
  const missingReferences = [
    ...referenceErrors,
    ...[...allReferences].filter((reference) => !objectPaths.has(reference)),
  ].toSorted();
  const byDigest = new Map<string, EvidenceObjectRecord[]>();
  for (const object of objects) {
    if (!object.hash_valid || object.digest === null) continue;
    const group = byDigest.get(object.digest) ?? [];
    group.push(object);
    byDigest.set(object.digest, group);
  }
  let duplicateObjects = 0;
  let duplicateBytes = 0;
  for (const group of byDigest.values()) {
    const uniqueInodes = new Set(group.map((object) => object.inode_key));
    duplicateObjects += Math.max(0, uniqueInodes.size - 1);
    if (uniqueInodes.size > 1)
      duplicateBytes += (uniqueInodes.size - 1) * (group[0]?.size_bytes ?? 0);
  }
  const tracked = await trackedEvidence(opts.root, opts.workflowDir);
  return {
    schema_version: 1,
    kind: "agentplane.evidence.inventory",
    generated_at: now.toISOString(),
    policy_path: policy.path,
    policy: policy.value,
    summary: {
      tasks_with_objects: tasksWithObjects.size,
      tracked_evidence_files: tracked.files,
      tracked_evidence_bytes: tracked.bytes,
      object_count: objects.length,
      logical_bytes: objects.reduce((sum, object) => sum + object.size_bytes, 0),
      allocated_bytes: objects.reduce((sum, object) => sum + object.allocated_bytes, 0),
      unique_contents: byDigest.size,
      duplicate_objects: duplicateObjects,
      duplicate_bytes: duplicateBytes,
      reachable_objects: objects.filter((object) => object.referenced).length,
      pinned_objects: objects.filter((object) => object.pinned_reason !== null).length,
      expired_objects: objects.filter((object) => object.expired).length,
      collectible_objects: objects.filter((object) => object.collectible).length,
      collectible_bytes: objects
        .filter((object) => object.collectible)
        .reduce((sum, object) => sum + object.size_bytes, 0),
      corrupt_objects: objects.filter((object) => !object.hash_valid).length,
      missing_references: missingReferences.length,
    },
    objects: objects.toSorted((left, right) => left.path.localeCompare(right.path)),
    missing_references: missingReferences,
  };
}
