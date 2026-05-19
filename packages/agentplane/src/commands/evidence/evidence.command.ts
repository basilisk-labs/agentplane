import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { getVersion } from "../../meta/version.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

export type EvidenceBundleParsed = {
  taskId: string;
  out?: string;
  json: boolean;
};

export type EvidenceVerifyParsed = {
  target: string;
  json: boolean;
  strict: boolean;
};

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

export const evidenceSpec: CommandSpec<GroupCommandParsed> = {
  id: ["evidence"],
  group: "Evidence",
  summary: "Create and verify deterministic task evidence bundle manifests.",
  description:
    "This is a command group. Use `agentplane evidence bundle <task-id>` or `agentplane evidence verify <task-id-or-manifest>`.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    {
      cmd: "agentplane evidence bundle 202605031625-886KZ6",
      why: "Write a task-local deterministic evidence manifest.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const evidenceBundleSpec: CommandSpec<EvidenceBundleParsed> = {
  id: ["evidence", "bundle"],
  group: "Evidence",
  summary: "Write a deterministic task evidence bundle manifest.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "out",
      valueHint: "<path>",
      description: "Write manifest to a custom repository-relative path.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane evidence bundle 202605031625-886KZ6",
      why: "Write `.agentplane/tasks/<task-id>/evidence/manifest.json`.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    out: typeof raw.opts.out === "string" ? raw.opts.out : undefined,
    json: raw.opts.json === true,
  }),
};

export const evidenceVerifySpec: CommandSpec<EvidenceVerifyParsed> = {
  id: ["evidence", "verify"],
  group: "Evidence",
  summary: "Verify a task evidence bundle manifest and referenced file hashes.",
  args: [{ name: "task-id-or-manifest", required: true, valueHint: "<task-id-or-manifest>" }],
  options: [
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
    {
      kind: "boolean",
      name: "strict",
      default: false,
      description: "Fail when the manifest contains no ACR evidence.",
    },
  ],
  examples: [
    {
      cmd: "agentplane evidence verify 202605031625-886KZ6",
      why: "Verify the task-local evidence manifest.",
    },
  ],
  parse: (raw) => ({
    target: String(raw.args["task-id-or-manifest"]),
    json: raw.opts.json === true,
    strict: raw.opts.strict === true,
  }),
};

export async function runEvidenceGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  return throwGroupCommandUsage({
    spec: evidenceSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["evidence"]),
    command: "evidence",
    contextCommand: "evidence",
  });
}

export function makeRunEvidenceBundleHandler(
  getCtx: (command: string) => Promise<CommandContext>,
): CommandHandler<EvidenceBundleParsed> {
  return async (ctx, parsed) => {
    const commandCtx = await getCtx("evidence bundle");
    return await cmdEvidenceBundle({ commandCtx, cwd: ctx.cwd, parsed });
  };
}

export function makeRunEvidenceVerifyHandler(
  getCtx: (command: string) => Promise<CommandContext>,
): CommandHandler<EvidenceVerifyParsed> {
  return async (ctx, parsed) => {
    const commandCtx = await getCtx("evidence verify");
    return await cmdEvidenceVerify({ commandCtx, cwd: ctx.cwd, parsed });
  };
}

export async function cmdEvidenceBundle(opts: {
  commandCtx: CommandContext;
  cwd: string;
  parsed: EvidenceBundleParsed;
}): Promise<number> {
  await loadTaskFromContext({ ctx: opts.commandCtx, taskId: opts.parsed.taskId });
  const root = opts.commandCtx.resolvedProject.gitRoot;
  const manifestPath = resolveManifestPath(root, opts.cwd, opts.parsed.taskId, opts.parsed.out);
  const manifest = await buildEvidenceBundleManifest({
    root,
    taskId: opts.parsed.taskId,
    manifestPath,
  });
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeJsonStableIfChanged(manifestPath, manifest);

  const relative = toPosix(path.relative(root, manifestPath));
  if (opts.parsed.json) {
    process.stdout.write(
      JSON.stringify(
        {
          task_id: opts.parsed.taskId,
          manifest_path: relative,
          manifest_digest: manifest.integrity.manifest_digest,
          files: manifest.files.length,
        },
        null,
        2,
      ) + "\n",
    );
    return 0;
  }
  process.stdout.write(
    `evidence bundle: ${relative}\n` +
      `manifest_digest: ${manifest.integrity.manifest_digest}\n` +
      `files: ${manifest.files.length}\n`,
  );
  return 0;
}

export async function cmdEvidenceVerify(opts: {
  commandCtx: CommandContext;
  cwd: string;
  parsed: EvidenceVerifyParsed;
}): Promise<number> {
  const root = opts.commandCtx.resolvedProject.gitRoot;
  const manifestPath = resolveVerifyTarget(root, opts.cwd, opts.parsed.target);
  const manifest = await readEvidenceManifest(manifestPath);
  const errors = await verifyEvidenceManifest({ root, manifest, strict: opts.parsed.strict });
  const relative = toPosix(path.relative(root, manifestPath));
  const ok = errors.length === 0;
  if (opts.parsed.json) {
    process.stdout.write(
      JSON.stringify(
        {
          ok,
          manifest_path: relative,
          task_id: manifest.task_id,
          manifest_digest: manifest.integrity.manifest_digest,
          files: manifest.files.length,
          errors,
        },
        null,
        2,
      ) + "\n",
    );
    if (!ok) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `evidence verify failed: ${errors.length} issue(s)`,
      });
    }
    return 0;
  }
  if (!ok) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `evidence verify failed for ${relative}: ${errors.length} issue(s)\n- ${errors.join("\n- ")}`,
    });
  }
  process.stdout.write(`evidence verify ${relative}: ok (${manifest.files.length} files)\n`);
  return 0;
}

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

async function buildEvidenceBundleManifest(opts: {
  root: string;
  taskId: string;
  manifestPath: string;
}): Promise<EvidenceBundleManifest> {
  const taskRoot = path.join(opts.root, ".agentplane", "tasks", opts.taskId);
  const files = await collectTaskEvidenceFiles({
    root: opts.root,
    taskRoot,
    manifestPath: opts.manifestPath,
  });
  const manifestWithoutDigest: EvidenceBundleManifest = {
    schema_version: 1,
    kind: "agentplane_evidence_bundle",
    task_id: opts.taskId,
    created_at: new Date().toISOString(),
    producer: {
      name: "agentplane",
      version: getVersion(),
    },
    artifact_root: toPosix(path.relative(opts.root, taskRoot)),
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

async function verifyEvidenceManifest(opts: {
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

async function readEvidenceManifest(filePath: string): Promise<EvidenceBundleManifest> {
  const parsed = JSON.parse(await readFile(filePath, "utf8")) as EvidenceBundleManifest;
  return {
    ...parsed,
    files: Array.isArray(parsed.files) ? parsed.files : [],
  };
}

function resolveManifestPath(
  root: string,
  cwd: string,
  taskId: string,
  out: string | undefined,
): string {
  if (out) return ensureWithinRoot(root, path.resolve(cwd, out));
  return path.join(root, ".agentplane", "tasks", taskId, "evidence", "manifest.json");
}

function resolveVerifyTarget(root: string, cwd: string, target: string): string {
  if (target.includes("/") || target.endsWith(".json")) {
    return ensureWithinRoot(root, path.resolve(cwd, target));
  }
  return path.join(root, ".agentplane", "tasks", target, "evidence", "manifest.json");
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

function toPosix(value: string): string {
  return value.split(path.sep).join("/");
}
