import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import { z } from "zod";

import { CliError } from "../../shared/errors.js";
import {
  assertEvaluatorEvidencePathWithinRepository,
  publishEvaluatorEvidenceObject,
  readStableEvaluatorEvidenceFile,
  type EvaluatorEvidenceBoundaryHook,
  writeEvaluatorEvidenceFileAtomically,
} from "./evaluator-evidence-boundary.js";

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

function manifestDigest(manifest: EvaluatorPacketManifest): `sha256:${string}` {
  const canonical = JSON.stringify(
    canonicalizeJson({
      ...manifest,
      integrity: { ...manifest.integrity, manifest_digest: null },
    }),
  );
  return sha256(canonical);
}

export async function putEvaluatorEvidenceObject(opts: {
  gitRoot: string;
  taskQualityRoot: string;
  logicalName: string;
  kind: EvaluatorPacketArtifact["kind"];
  extension: string;
  mediaType: string;
  contents: string;
  boundaryHook?: EvaluatorEvidenceBoundaryHook;
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
  assertEvaluatorEvidencePathWithinRepository(
    opts.gitRoot,
    opts.taskQualityRoot,
    "Task quality root",
  );
  await publishEvaluatorEvidenceObject({
    gitRoot: opts.gitRoot,
    objectDirectoryPath: objectRoot,
    stagingDirectoryPath: stagingRoot,
    objectPath,
    stagingPath,
    contents: opts.contents,
    hook: opts.boundaryHook,
  });
  const stored = await readStableEvaluatorEvidenceFile({
    gitRoot: opts.gitRoot,
    filePath: objectPath,
    label: "Evaluator evidence object",
    hook: opts.boundaryHook,
  });
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
  boundaryHook?: EvaluatorEvidenceBoundaryHook;
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
  await writeEvaluatorEvidenceFileAtomically({
    gitRoot: opts.gitRoot,
    filePath: opts.manifestPath,
    label: "Evaluator packet manifest",
    contents,
    hook: opts.boundaryHook,
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
  boundaryHook?: EvaluatorEvidenceBoundaryHook;
}): Promise<EvaluatorPacketManifest> {
  const manifestAbsolutePath = resolveRepositoryPath(
    opts.gitRoot,
    opts.manifestPath,
    "Evaluator packet manifest",
  );
  const raw = await readStableEvaluatorEvidenceFile({
    gitRoot: opts.gitRoot,
    filePath: manifestAbsolutePath,
    label: "Evaluator packet manifest",
    hook: opts.boundaryHook,
  });
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
    const bytes = await readStableEvaluatorEvidenceFile({
      gitRoot: opts.gitRoot,
      filePath: artifactPath,
      label: `Evaluator packet artifact ${artifact.logical_name}`,
      hook: opts.boundaryHook,
    });
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
