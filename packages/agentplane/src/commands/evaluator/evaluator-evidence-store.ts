import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import { createHash, randomUUID } from "node:crypto";
import { constants } from "node:fs";
import { link, lstat, mkdir, open, realpath, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

import { CliError } from "../../shared/errors.js";

const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/u;
const OBJECT_EXTENSION_PATTERN = /^\.[a-z0-9][a-z0-9.-]{0,15}$/u;

const EVALUATOR_PACKET_ARTIFACT_SCHEMA = z
  .object({
    logical_name: z.string().trim().min(1),
    kind: z.enum(["actual_diff", "observed_checks", "blueprint", "prompt", "result_schema"]),
    path: z.string().trim().min(1),
    sha256: z.string().regex(SHA256_PATTERN),
    size_bytes: z.number().int().nonnegative(),
    media_type: z.string().trim().min(1),
  })
  .strict();

const EVALUATOR_PACKET_MANIFEST_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    kind: z.literal("evaluator_evidence_packet"),
    task_id: z.string().trim().min(1),
    work_order_id: z.string().trim().min(1),
    created_at: z.string().datetime({ offset: true }),
    object_root: z.string().trim().min(1),
    artifacts: z.array(EVALUATOR_PACKET_ARTIFACT_SCHEMA).min(1),
    integrity: z
      .object({
        digest_algorithm: z.literal("sha256"),
        canonicalization: z.literal("agentplane-canonical-json-v1"),
        manifest_digest: z.string().regex(SHA256_PATTERN).nullable(),
      })
      .strict(),
  })
  .strict();

export type EvaluatorPacketArtifact = z.infer<typeof EVALUATOR_PACKET_ARTIFACT_SCHEMA>;
export type EvaluatorPacketManifest = z.infer<typeof EVALUATOR_PACKET_MANIFEST_SCHEMA>;

function sha256(value: string | Buffer): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function toPosix(value: string): string {
  return value.replaceAll("\\", "/");
}

function relative(root: string, target: string): string {
  return toPosix(path.relative(root, target));
}

function isRepositoryRelativePath(value: string): boolean {
  return (
    value.length > 0 &&
    !value.startsWith("/") &&
    !value.startsWith("\\") &&
    !/^[A-Za-z]:/u.test(value) &&
    !value.includes("\\") &&
    !value.split("/").includes("..")
  );
}

function resolveRepositoryPath(root: string, value: string, label: string): string {
  if (!isRepositoryRelativePath(value)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${label} must be a repository-relative path: ${value}`,
    });
  }
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(root, value);
  if (resolved !== resolvedRoot && !resolved.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${label} is outside the repository root: ${value}`,
    });
  }
  return resolved;
}

function assertAbsolutePathWithinRepository(root: string, target: string, label: string): void {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(target);
  if (resolvedTarget !== resolvedRoot && !resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${label} is outside the repository root: ${target}`,
    });
  }
}

async function assertNoSymlinkSegments(opts: {
  gitRoot: string;
  targetPath: string;
  label: string;
  allowMissing: boolean;
}): Promise<void> {
  assertAbsolutePathWithinRepository(opts.gitRoot, opts.targetPath, opts.label);
  const resolvedRoot = path.resolve(opts.gitRoot);
  const resolvedTarget = path.resolve(opts.targetPath);
  const segments = path.relative(resolvedRoot, resolvedTarget).split(path.sep).filter(Boolean);
  let current = resolvedRoot;
  for (const [index, segment] of segments.entries()) {
    current = path.join(current, segment);
    let stats;
    try {
      stats = await lstat(current);
    } catch (error) {
      if (opts.allowMissing && (error as NodeJS.ErrnoException | null)?.code === "ENOENT") return;
      throw error;
    }
    if (stats.isSymbolicLink()) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `${opts.label} traverses a symbolic link: ${relative(opts.gitRoot, current)}`,
      });
    }
    if (index < segments.length - 1 && !stats.isDirectory()) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `${opts.label} traverses a non-directory path: ${relative(opts.gitRoot, current)}`,
      });
    }
  }
}

async function assertRealDirectoryWithinRepository(
  gitRoot: string,
  directoryPath: string,
  label: string,
): Promise<void> {
  await assertNoSymlinkSegments({
    gitRoot,
    targetPath: directoryPath,
    label,
    allowMissing: false,
  });
  const stats = await lstat(directoryPath);
  if (!stats.isDirectory()) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${label} is not a directory: ${relative(gitRoot, directoryPath)}`,
    });
  }
  const [repositoryRealPath, directoryRealPath] = await Promise.all([
    realpath(gitRoot),
    realpath(directoryPath),
  ]);
  assertAbsolutePathWithinRepository(repositoryRealPath, directoryRealPath, label);
}

async function ensureRepositoryDirectory(
  gitRoot: string,
  directoryPath: string,
  label: string,
): Promise<void> {
  await assertNoSymlinkSegments({
    gitRoot,
    targetPath: directoryPath,
    label,
    allowMissing: true,
  });
  await mkdir(directoryPath, { recursive: true });
  await assertRealDirectoryWithinRepository(gitRoot, directoryPath, label);
}

function manifestDigest(manifest: EvaluatorPacketManifest): `sha256:${string}` {
  const canonical = JSON.stringify(
    canonicalizeJson({
      ...manifest,
      integrity: { ...manifest.integrity, manifest_digest: null },
    }),
  );
  return sha256(canonical);
}

async function readRegularEvaluatorArtifact(
  gitRoot: string,
  filePath: string,
  label: string,
): Promise<Buffer> {
  await assertRealDirectoryWithinRepository(gitRoot, path.dirname(filePath), `${label} parent`);
  await assertNoSymlinkSegments({
    gitRoot,
    targetPath: filePath,
    label,
    allowMissing: false,
  });
  const handle = await open(filePath, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const stats = await handle.stat();
    if (!stats.isFile()) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `${label} is not a regular file: ${relative(gitRoot, filePath)}`,
      });
    }
    return await handle.readFile();
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ELOOP") {
      throw new CliError({
        code: "E_VALIDATION",
        message: `${label} is a symbolic link: ${relative(gitRoot, filePath)}`,
      });
    }
    throw error;
  } finally {
    await handle.close();
  }
}

async function writeRepositoryFileAtomically(opts: {
  gitRoot: string;
  filePath: string;
  label: string;
  contents: string;
}): Promise<void> {
  const directoryPath = path.dirname(opts.filePath);
  await ensureRepositoryDirectory(opts.gitRoot, directoryPath, `${opts.label} directory`);
  const temporaryPath = path.join(
    directoryPath,
    `.${path.basename(opts.filePath)}.${String(process.pid)}.${randomUUID()}.tmp`,
  );
  const handle = await open(
    temporaryPath,
    constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW,
    0o600,
  );
  try {
    await handle.writeFile(opts.contents, { encoding: "utf8" });
  } finally {
    await handle.close();
  }
  try {
    await assertRealDirectoryWithinRepository(
      opts.gitRoot,
      directoryPath,
      `${opts.label} directory`,
    );
    await rename(temporaryPath, opts.filePath);
  } finally {
    await removeStagingFile(temporaryPath);
  }
  const stored = await readRegularEvaluatorArtifact(opts.gitRoot, opts.filePath, opts.label);
  if (!stored.equals(Buffer.from(opts.contents, "utf8"))) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${opts.label} changed while it was written: ${relative(opts.gitRoot, opts.filePath)}`,
    });
  }
}

async function removeStagingFile(filePath: string): Promise<void> {
  try {
    await unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
  }
}

export async function putEvaluatorEvidenceObject(opts: {
  gitRoot: string;
  taskQualityRoot: string;
  logicalName: string;
  kind: EvaluatorPacketArtifact["kind"];
  extension: string;
  mediaType: string;
  contents: string;
}): Promise<EvaluatorPacketArtifact> {
  if (!OBJECT_EXTENSION_PATTERN.test(opts.extension)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Invalid evaluator evidence object extension: ${opts.extension}`,
    });
  }
  const digest = sha256(opts.contents);
  const digestHex = digest.slice("sha256:".length);
  const objectRoot = path.join(opts.taskQualityRoot, "objects", "sha256");
  const objectPath = path.join(objectRoot, `${digestHex}${opts.extension}`);
  const stagingRoot = path.join(opts.taskQualityRoot, "objects", ".staging");
  const stagingPath = path.join(
    stagingRoot,
    `${digestHex}.${String(process.pid)}.${randomUUID()}.tmp`,
  );
  assertAbsolutePathWithinRepository(opts.gitRoot, opts.taskQualityRoot, "Task quality root");
  await ensureRepositoryDirectory(opts.gitRoot, objectRoot, "Evaluator object directory");
  await ensureRepositoryDirectory(opts.gitRoot, stagingRoot, "Evaluator staging directory");
  const stagingHandle = await open(
    stagingPath,
    constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW,
    0o600,
  );
  try {
    await stagingHandle.writeFile(opts.contents, { encoding: "utf8" });
  } finally {
    await stagingHandle.close();
  }
  try {
    await assertRealDirectoryWithinRepository(
      opts.gitRoot,
      path.dirname(stagingPath),
      "Evaluator staging directory",
    );
    await assertRealDirectoryWithinRepository(
      opts.gitRoot,
      path.dirname(objectPath),
      "Evaluator object directory",
    );
    await link(stagingPath, objectPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
    const existing = await readRegularEvaluatorArtifact(
      opts.gitRoot,
      objectPath,
      "Evaluator evidence object",
    );
    if (sha256(existing) !== digest || !existing.equals(Buffer.from(opts.contents, "utf8"))) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Evaluator evidence object collision or tamper detected: ${relative(opts.gitRoot, objectPath)}`,
      });
    }
  } finally {
    await removeStagingFile(stagingPath);
  }
  const stored = await readRegularEvaluatorArtifact(
    opts.gitRoot,
    objectPath,
    "Evaluator evidence object",
  );
  if (sha256(stored) !== digest || !stored.equals(Buffer.from(opts.contents, "utf8"))) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Evaluator evidence object collision or tamper detected: ${relative(opts.gitRoot, objectPath)}`,
    });
  }
  return {
    logical_name: opts.logicalName,
    kind: opts.kind,
    path: relative(opts.gitRoot, objectPath),
    sha256: digest,
    size_bytes: Buffer.byteLength(opts.contents, "utf8"),
    media_type: opts.mediaType,
  };
}

export async function writeEvaluatorPacketManifest(opts: {
  gitRoot: string;
  taskId: string;
  workOrderId: string;
  createdAt: string;
  taskQualityRoot: string;
  manifestPath: string;
  artifacts: readonly EvaluatorPacketArtifact[];
}): Promise<{ manifest: EvaluatorPacketManifest; sha256: `sha256:${string}` }> {
  const withoutDigest = EVALUATOR_PACKET_MANIFEST_SCHEMA.parse({
    schema_version: 1,
    kind: "evaluator_evidence_packet",
    task_id: opts.taskId,
    work_order_id: opts.workOrderId,
    created_at: opts.createdAt,
    object_root: relative(opts.gitRoot, path.join(opts.taskQualityRoot, "objects")),
    artifacts: [...opts.artifacts].toSorted((left, right) =>
      left.logical_name.localeCompare(right.logical_name),
    ),
    integrity: {
      digest_algorithm: "sha256",
      canonicalization: "agentplane-canonical-json-v1",
      manifest_digest: null,
    },
  });
  const manifest = EVALUATOR_PACKET_MANIFEST_SCHEMA.parse({
    ...withoutDigest,
    integrity: { ...withoutDigest.integrity, manifest_digest: manifestDigest(withoutDigest) },
  });
  const contents = `${JSON.stringify(canonicalizeJson(manifest), null, 2)}\n`;
  await writeRepositoryFileAtomically({
    gitRoot: opts.gitRoot,
    filePath: opts.manifestPath,
    label: "Evaluator packet manifest",
    contents,
  });
  return { manifest, sha256: sha256(contents) };
}

export async function assertEvaluatorPacketCurrent(opts: {
  gitRoot: string;
  taskId: string;
  manifestPath: string;
  manifestSha256: string;
  promptPath: string;
  resultSchemaPath: string;
}): Promise<EvaluatorPacketManifest> {
  const manifestAbsolutePath = resolveRepositoryPath(
    opts.gitRoot,
    opts.manifestPath,
    "Evaluator packet manifest",
  );
  const raw = await readRegularEvaluatorArtifact(
    opts.gitRoot,
    manifestAbsolutePath,
    "Evaluator packet manifest",
  );
  if (sha256(raw) !== opts.manifestSha256) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Evaluator packet manifest changed after preparation: ${opts.manifestPath}`,
    });
  }
  let manifest: EvaluatorPacketManifest;
  try {
    manifest = EVALUATOR_PACKET_MANIFEST_SCHEMA.parse(JSON.parse(raw.toString("utf8")) as unknown);
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Invalid evaluator packet manifest: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
  if (
    manifest.task_id !== opts.taskId ||
    manifest.integrity.manifest_digest !== manifestDigest(manifest)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Evaluator packet manifest identity or digest mismatch: ${opts.manifestPath}`,
    });
  }
  const expectedObjectRoot = `${path.posix.dirname(path.posix.dirname(opts.manifestPath))}/objects`;
  if (manifest.object_root !== expectedObjectRoot) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Evaluator packet object root is not task-local: ${manifest.object_root}`,
    });
  }
  const names = new Set<string>();
  const objectPrefix = `${manifest.object_root.replaceAll(/\/+$/gu, "")}/sha256/`;
  for (const artifact of manifest.artifacts) {
    if (names.has(artifact.logical_name)) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Evaluator packet contains a duplicate logical artifact: ${artifact.logical_name}`,
      });
    }
    names.add(artifact.logical_name);
    if (!artifact.path.startsWith(objectPrefix)) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Evaluator packet object is outside its object root: ${artifact.path}`,
      });
    }
    const artifactPath = resolveRepositoryPath(
      opts.gitRoot,
      artifact.path,
      `Evaluator packet artifact ${artifact.logical_name}`,
    );
    const bytes = await readRegularEvaluatorArtifact(
      opts.gitRoot,
      artifactPath,
      `Evaluator packet artifact ${artifact.logical_name}`,
    );
    if (bytes.byteLength !== artifact.size_bytes || sha256(bytes) !== artifact.sha256) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Evaluator packet artifact changed after preparation: ${artifact.path}`,
      });
    }
  }
  for (const requiredName of [
    "evaluator-diff",
    "evaluator-observed-checks",
    "evaluator-blueprint",
    "evaluator-prompt",
    "evaluator-result-schema",
  ]) {
    if (!names.has(requiredName)) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Evaluator packet is missing required artifact: ${requiredName}`,
      });
    }
  }
  const prompt = manifest.artifacts.find(
    (artifact) => artifact.logical_name === "evaluator-prompt",
  );
  const schema = manifest.artifacts.find(
    (artifact) => artifact.logical_name === "evaluator-result-schema",
  );
  if (prompt?.path !== opts.promptPath || schema?.path !== opts.resultSchemaPath) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evaluator packet prompt or result-schema reference does not match its manifest.",
    });
  }
  return manifest;
}
