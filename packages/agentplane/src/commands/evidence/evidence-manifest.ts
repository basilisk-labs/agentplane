import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { getVersion } from "../../meta/version.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

type EvidenceFileRole =
  | "task_readme"
  | "acr"
  | "blueprint_snapshot"
  | "verification_log"
  | "pr_artifact"
  | "task_artifact";

type EvidenceManifestFile = {
  path: string;
  sha256: string;
  size_bytes: number;
  role: EvidenceFileRole;
};

export type EvidenceBundleManifest = {
  schema_version: 1;
  kind: "agentplane_evidence_bundle";
  task_id: string;
  created_at: string;
  producer: {
    name: "agentplane";
    version: string;
  };
  artifact_root: string;
  files: EvidenceManifestFile[];
  verification: {
    command: string;
  };
  integrity: {
    digest_algorithm: "sha256";
    canonicalization: "agentplane-canonical-json-v1";
    manifest_digest: string | null;
  };
};

export function defaultEvidenceManifestPath(ctx: CommandContext, taskId: string): string {
  return path.join(
    ctx.resolvedProject.gitRoot,
    ctx.config.paths.workflow_dir,
    taskId,
    "evidence",
    "manifest.json",
  );
}

export async function readTaskEvidenceBundleTrustExtension(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<Record<string, unknown> | null> {
  const manifestPath = defaultEvidenceManifestPath(opts.ctx, opts.taskId);
  try {
    await readEvidenceManifest(manifestPath);
    return {
      "agentplane.trust": {
        schema_version: 1,
        evidence_bundle: {
          path: toPosix(path.relative(opts.ctx.resolvedProject.gitRoot, manifestPath)),
          digest_algorithm: "sha256",
          verification_command: `agentplane evidence verify ${opts.taskId}`,
          status: "available",
        },
      },
    };
  } catch {
    return null;
  }
}

export async function buildEvidenceBundleManifest(opts: {
  root: string;
  taskRoot: string;
  taskId: string;
  manifestPath: string;
  existingManifest: EvidenceBundleManifest | null;
}): Promise<EvidenceBundleManifest> {
  const files = await collectTaskEvidenceFiles({
    root: opts.root,
    taskRoot: opts.taskRoot,
    manifestPath: opts.manifestPath,
  });
  const manifestWithoutDigest: EvidenceBundleManifest = {
    schema_version: 1,
    kind: "agentplane_evidence_bundle",
    task_id: opts.taskId,
    created_at: opts.existingManifest?.created_at ?? new Date().toISOString(),
    producer: {
      name: "agentplane",
      version: getVersion(),
    },
    artifact_root: toPosix(path.relative(opts.root, opts.taskRoot)),
    files,
    verification: {
      command: `agentplane evidence verify ${opts.taskId}`,
    },
    integrity: {
      digest_algorithm: "sha256",
      canonicalization: "agentplane-canonical-json-v1",
      manifest_digest: null,
    },
  };
  return {
    ...manifestWithoutDigest,
    integrity: {
      ...manifestWithoutDigest.integrity,
      manifest_digest: computeManifestDigest(manifestWithoutDigest),
    },
  };
}

export async function verifyEvidenceManifest(opts: {
  root: string;
  manifest: EvidenceBundleManifest;
  strict: boolean;
}): Promise<string[]> {
  const errors: string[] = [];
  if (opts.manifest.schema_version !== 1) errors.push("schema_version must be 1");
  if (opts.manifest.kind !== "agentplane_evidence_bundle") {
    errors.push("kind must be agentplane_evidence_bundle");
  }
  if (!opts.manifest.task_id) errors.push("task_id is required");
  const expectedDigest = computeManifestDigest({
    ...opts.manifest,
    integrity: { ...opts.manifest.integrity, manifest_digest: null },
  });
  if (opts.manifest.integrity.manifest_digest !== expectedDigest) {
    errors.push(
      `manifest digest mismatch: expected ${expectedDigest}, found ${opts.manifest.integrity.manifest_digest ?? "null"}`,
    );
  }
  if (opts.manifest.files.length === 0) errors.push("manifest contains no files");
  if (opts.strict && !opts.manifest.files.some((file) => file.role === "acr")) {
    errors.push("strict verification requires acr evidence");
  }
  const seen = new Set<string>();
  for (const file of opts.manifest.files) {
    if (seen.has(file.path)) errors.push(`duplicate file path: ${file.path}`);
    seen.add(file.path);
    if (!isRepositoryRelativePath(file.path)) {
      errors.push(`invalid repository-relative path: ${file.path}`);
      continue;
    }
    const abs = path.join(opts.root, file.path);
    let actual: string;
    try {
      actual = await sha256File(abs);
    } catch {
      errors.push(`missing file: ${file.path}`);
      continue;
    }
    if (actual !== file.sha256) {
      errors.push(`hash mismatch for ${file.path}: expected ${file.sha256}, found ${actual}`);
    }
  }
  return errors;
}

export async function readEvidenceManifest(filePath: string): Promise<EvidenceBundleManifest> {
  const parsed = JSON.parse(await readFile(filePath, "utf8")) as EvidenceBundleManifest;
  return {
    ...parsed,
    files: Array.isArray(parsed.files) ? parsed.files : [],
  };
}

export async function readEvidenceManifestOrNull(
  filePath: string,
): Promise<EvidenceBundleManifest | null> {
  try {
    return await readEvidenceManifest(filePath);
  } catch {
    return null;
  }
}

export function resolveManifestPath(
  root: string,
  cwd: string,
  workflowDir: string,
  taskId: string,
  out: string | undefined,
): string {
  if (out) return ensureWithinRoot(root, path.resolve(cwd, out));
  return path.join(root, workflowDir, taskId, "evidence", "manifest.json");
}

export function resolveVerifyTarget(
  root: string,
  cwd: string,
  workflowDir: string,
  target: string,
): string {
  if (target.includes("/") || target.endsWith(".json")) {
    return ensureWithinRoot(root, path.resolve(cwd, target));
  }
  return path.join(root, workflowDir, target, "evidence", "manifest.json");
}

export function toPosix(value: string): string {
  return value.split(path.sep).join("/");
}

async function collectTaskEvidenceFiles(opts: {
  root: string;
  taskRoot: string;
  manifestPath: string;
}): Promise<EvidenceManifestFile[]> {
  const files: EvidenceManifestFile[] = [];
  for (const filePath of await walkFiles(opts.taskRoot)) {
    if (path.resolve(filePath) === path.resolve(opts.manifestPath)) continue;
    const relativeToTask = toPosix(path.relative(opts.taskRoot, filePath));
    if (relativeToTask === ".DS_Store") continue;
    if (relativeToTask.startsWith("evidence/")) continue;
    files.push({
      path: toPosix(path.relative(opts.root, filePath)),
      sha256: await sha256File(filePath),
      size_bytes: (await fileStatSize(filePath)) ?? 0,
      role: inferEvidenceRole(relativeToTask),
    });
  }
  return files.toSorted((left, right) => left.path.localeCompare(right.path));
}

async function walkFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const entry of entries) {
    const next = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(next)));
      continue;
    }
    if (entry.isFile()) out.push(next);
  }
  return out;
}

function inferEvidenceRole(relativeToTask: string): EvidenceFileRole {
  if (relativeToTask === "README.md") return "task_readme";
  if (relativeToTask === "acr.json") return "acr";
  if (relativeToTask === "blueprint/resolved-snapshot.json") return "blueprint_snapshot";
  if (relativeToTask.includes("verify")) return "verification_log";
  if (relativeToTask.startsWith("pr/")) return "pr_artifact";
  return "task_artifact";
}

function ensureWithinRoot(root: string, candidate: string): string {
  const absRoot = path.resolve(root);
  const abs = path.resolve(candidate);
  if (abs === absRoot || abs.startsWith(`${absRoot}${path.sep}`)) return abs;
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: `evidence path outside repository root: ${candidate}`,
  });
}

function computeManifestDigest(manifest: EvidenceBundleManifest): string {
  const canonical = JSON.stringify(canonicalizeJson(manifest));
  return `sha256:${createHash("sha256").update(canonical).digest("hex")}`;
}

function isRepositoryRelativePath(value: string): boolean {
  return (
    value.length > 0 &&
    !value.startsWith("/") &&
    !value.startsWith("\\") &&
    !/^[A-Za-z]:/.test(value) &&
    !value.includes("\\") &&
    !value.split("/").includes("..")
  );
}

async function sha256File(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  return await new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on("data", (chunk: Buffer) => hash.update(chunk));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(`sha256:${hash.digest("hex")}`));
  });
}

async function fileStatSize(filePath: string): Promise<number | null> {
  const bytes = await readFile(filePath);
  return bytes.byteLength;
}
