import path from "node:path";

import { resolveProject } from "@agentplaneorg/core/project";

import { successMessage } from "../cli/output.js";
import type { CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import { applyWorkflowMigration, rollbackWorkflowMigration } from "../workflow-runtime/index.js";

export type WorkflowMigrateParsed = {
  dryRun: boolean;
  rollback: string | null;
};

export const workflowMigrateSpec: CommandSpec<WorkflowMigrateParsed> = {
  id: ["workflow", "migrate"],
  group: "Workflow",
  summary: "Migrate WORKFLOW.md v1 to v2 with an exact-byte rollback receipt.",
  options: [
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Print the v2 candidate without changing files.",
    },
    {
      kind: "string",
      name: "rollback",
      valueHint: "<receipt-path>",
      description: "Restore exact source bytes from a migration receipt.",
    },
  ],
  examples: [
    {
      cmd: "agentplane workflow migrate --dry-run",
      why: "Preview the normalized v2 contract without writing files.",
    },
    {
      cmd: "agentplane workflow migrate",
      why: "Apply v1 to v2 with receipt-backed recovery and an active-workflow commit point.",
    },
    {
      cmd: "agentplane workflow migrate --rollback .agentplane/workflows/migrations/workflow-v1-to-v2-<digest>.json",
      why: "Restore the exact pre-migration WORKFLOW.md bytes.",
    },
  ],
  parse: (raw) => ({
    dryRun: raw.opts["dry-run"] === true,
    rollback: typeof raw.opts.rollback === "string" ? raw.opts.rollback : null,
  }),
};

export const runWorkflowMigrate: CommandHandler<WorkflowMigrateParsed> = async (ctx, flags) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  if (flags.rollback) {
    const rollback = await rollbackWorkflowMigration(resolved.gitRoot, flags.rollback, {
      dryRun: flags.dryRun,
    });
    const action = flags.dryRun ? "validated rollback" : "restored exact source bytes";
    process.stdout.write(
      `${successMessage("workflow migrate", undefined, `${action}; source=${rollback.sourceSha256}`)}\n`,
    );
    return 0;
  }

  const migration = await applyWorkflowMigration(resolved.gitRoot, { dryRun: flags.dryRun });
  if (flags.dryRun) {
    process.stdout.write(migration.targetText);
    return 0;
  }
  if (!migration.applied) {
    process.stdout.write(
      `${successMessage("workflow migrate", undefined, "WORKFLOW.md is already v2; no changes.")}\n`,
    );
    return 0;
  }

  const receipt = migration.receiptPath
    ? path.relative(resolved.gitRoot, migration.receiptPath)
    : "receipt unavailable";
  process.stdout.write(
    `${successMessage("workflow migrate", undefined, `Migrated to v2; rollback receipt: ${receipt}`)}\n`,
  );
  return 0;
};
