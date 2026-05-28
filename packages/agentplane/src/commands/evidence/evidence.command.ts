import { mkdir } from "node:fs/promises";
import path from "node:path";

import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import {
  buildEvidenceBundleManifest,
  readEvidenceManifest,
  readEvidenceManifestOrNull,
  resolveManifestPath,
  resolveVerifyTarget,
  toPosix,
  verifyEvidenceManifest,
} from "./evidence-manifest.js";

export {
  defaultEvidenceManifestPath,
  readTaskEvidenceBundleTrustExtension,
  type EvidenceBundleManifest,
} from "./evidence-manifest.js";

export type EvidenceBundleParsed = {
  taskId: string;
  out?: string;
  json: boolean;
  quiet?: boolean;
};

export type EvidenceVerifyParsed = {
  target: string;
  json: boolean;
  strict: boolean;
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
  const workflowDir = opts.commandCtx.config.paths.workflow_dir;
  const manifestPath = resolveManifestPath(
    root,
    opts.cwd,
    workflowDir,
    opts.parsed.taskId,
    opts.parsed.out,
  );
  const existingManifest = await readEvidenceManifestOrNull(manifestPath);
  const manifest = await buildEvidenceBundleManifest({
    root,
    taskRoot: path.join(root, workflowDir, opts.parsed.taskId),
    taskId: opts.parsed.taskId,
    manifestPath,
    existingManifest,
  });
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeJsonStableIfChanged(manifestPath, manifest);
  if (opts.parsed.quiet) return 0;

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
  const manifestPath = resolveVerifyTarget(
    root,
    opts.cwd,
    opts.commandCtx.config.paths.workflow_dir,
    opts.parsed.target,
  );
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
