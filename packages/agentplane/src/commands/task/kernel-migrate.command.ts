import path from "node:path";
import type { taskKernel } from "@agentplaneorg/core/tasks";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { LocalBackend } from "../../backends/task-backend.js";
import { LocalTaskByteStore } from "../../backends/task-backend/local-task-byte-store.js";
import {
  KernelMigration,
  kernelMigrationProofSchema,
} from "../../adapters/task-backend/kernel-migration.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { CliError } from "../../shared/errors.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

type Parsed = {
  taskId: string;
  apply: boolean;
  sourceDigest?: string;
  rollback?: string;
  yes: boolean;
};
export const taskKernelMigrateSpec: CommandSpec<Parsed> = {
  id: ["task", "kernel-migrate"],
  group: "Task",
  summary:
    "Inspect or explicitly migrate one legacy Task with an exact backup and guarded rollback.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "apply",
      default: false,
      description: "Apply one canary after comparing the dry-run source digest.",
    },
    {
      kind: "string",
      name: "source-digest",
      valueHint: "<sha256:digest>",
      description: "Exact source digest from the dry run. Required with --apply.",
    },
    {
      kind: "string",
      name: "rollback",
      valueHint: "<proof.json>",
      description:
        "Restore exact source bytes using the emitted migration proof inside this repository.",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Confirm the explicitly requested migration or rollback.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task kernel-migrate 202608300000-MGR001",
      why: "Classify the exact source without writing.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    apply: raw.opts.apply === true,
    sourceDigest:
      typeof raw.opts["source-digest"] === "string" ? raw.opts["source-digest"] : undefined,
    rollback: typeof raw.opts.rollback === "string" ? raw.opts.rollback : undefined,
    yes: raw.opts.yes === true,
  }),
};

export async function runKernelMigration(ctx: CommandContext, opts: Parsed): Promise<number> {
  if (!(ctx.taskBackend instanceof LocalBackend))
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Kernel migration requires a canonical local byte store. This backend has no proven byte CAS and backup capability.",
    });
  if (opts.apply && opts.rollback)
    throw new CliError({ code: "E_USAGE", message: "Select either --apply or --rollback." });
  if (opts.apply && !/^sha256:[a-f0-9]{64}$/u.test(opts.sourceDigest ?? ""))
    throw new CliError({
      code: "E_USAGE",
      message: "--apply requires the exact --source-digest from the dry run.",
    });
  const root = ctx.resolvedProject.gitRoot;
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: root,
    task: {},
  })) as taskKernel.Sha256Digest;
  const migration = new KernelMigration(new LocalTaskByteStore(ctx.taskBackend), identity);
  if (opts.apply || opts.rollback)
    await ensureActionApproved({
      action: "force_action",
      config: ctx.config,
      yes: opts.yes,
      reason: "explicit canonical Task migration",
    });
  if (opts.rollback) {
    const raw: unknown = JSON.parse(
      await readContainedStableTextNoFollow({
        repository_root: root,
        file_path: path.resolve(root, opts.rollback),
        label: "migration rollback proof",
        max_bytes: 1024 * 1024,
      }),
    );
    // Accept the entire emitted result or its proof member.
    const proof = kernelMigrationProofSchema.parse(
      typeof raw === "object" && raw !== null && "proof" in raw ? raw.proof : raw,
    );
    if (proof.receipt.task_id !== opts.taskId)
      throw new CliError({
        code: "E_VALIDATION",
        message: "Rollback proof belongs to a different Task.",
      });
    const result = await migration.rollback(proof);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return result.kind === "refused" ? 1 : 0;
  }
  if (opts.apply) {
    const result = await migration.apply(opts.taskId, opts.sourceDigest as taskKernel.Sha256Digest);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return result.kind === "refused" ? 1 : 0;
  }
  const report = await migration.dryRun(opts.taskId);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  return ["quarantined", "missing"].includes(report.classification) ? 1 : 0;
}

export function makeRunTaskKernelMigrateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, parsed: Parsed): Promise<number> =>
    runKernelMigration(await getCtx("task kernel-migrate"), parsed);
}
