import path from "node:path";

import { resolveProject } from "@agentplaneorg/core";

import type { CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import { successMessage, warnMessage } from "../cli/output.js";
import {
  resolveWorkflowPaths,
  restoreWorkflowFromLastKnownGood,
} from "../workflow-runtime/index.js";

export type WorkflowRestoreParsed = Record<string, never>;

export const workflowRestoreSpec: CommandSpec<WorkflowRestoreParsed> = {
  id: ["workflow", "restore"],
  group: "Workflow",
  summary: "Restore WORKFLOW.md from last-known-good snapshot.",
  parse: () => ({}),
  examples: [
    {
      cmd: "agentplane workflow restore",
      why: "Restore active workflow from .agentplane/workflows/last-known-good.md.",
    },
  ],
};

export const runWorkflowRestore: CommandHandler<WorkflowRestoreParsed> = async (ctx) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const workflowPaths = resolveWorkflowPaths(resolved.gitRoot);

  const result = await restoreWorkflowFromLastKnownGood(resolved.gitRoot);
  if (!result.ok) {
    process.stderr.write(warnMessage("workflow restore failed") + "\n");
    for (const diagnostic of result.diagnostics) {
      process.stderr.write(
        `- [${diagnostic.severity}] ${diagnostic.code} ${diagnostic.path}: ${diagnostic.message}\n`,
      );
    }
    return 1;
  }

  process.stdout.write(
    successMessage(
      "workflow restore",
      undefined,
      `Restored ${path.relative(resolved.gitRoot, workflowPaths.workflowPath)} from snapshot.`,
    ) + "\n",
  );
  return 0;
};
