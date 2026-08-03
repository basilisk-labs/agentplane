import type { CommandContext } from "../shared/task-backend.js";
import { cmdVerifyParsed } from "../task/verify-record.js";
import { findContextIngestRunForTask } from "../../context/ingest-run-journal.js";
import { CliError } from "../../shared/errors.js";

export async function recordContextSupervisorVerification(opts: {
  changedPaths: string[];
  command: CommandContext;
  cwd: string;
  extractionFile: string;
  root: string;
  taskId: string;
}): Promise<{ changed_paths: string[]; evidence: string }> {
  const ingestRun = await findContextIngestRunForTask(opts.root, opts.taskId);
  if (ingestRun === null) {
    throw new CliError({
      code: "E_RUNTIME",
      message: `Context ingest journal disappeared before recording verification for ${opts.taskId}.`,
    });
  }
  const evidencePath = `.agentplane/context/ingest-runs/${ingestRun.run_id}.json#task_verified`;
  const exitCode = await cmdVerifyParsed({
    ctx: opts.command,
    cwd: opts.cwd,
    rootOverride: opts.root,
    taskId: opts.taskId,
    state: "ok",
    by: "SUPERVISOR",
    note: "Verified: the context assimilation supervisor observed the live Git delta and all task-bound artifact checks passed.",
    details: [
      `Command: agentplane context supervise-task ${opts.taskId} --extraction ${opts.extractionFile}`,
      "Result: pass",
      `Evidence: ${evidencePath}`,
      `Scope: live context assimilation Git delta (${String(opts.changedPaths.length)} changed paths) and task-bound artifact validation`,
    ].join("\n"),
    localOnly: false,
    repoFixable: false,
    incidentTags: [],
    incidentMatch: [],
    quiet: true,
  });
  if (exitCode !== 0) {
    throw new CliError({
      code: "E_RUNTIME",
      message: `Context supervisor could not record formal verification for task ${opts.taskId}.`,
    });
  }
  return { changed_paths: opts.changedPaths, evidence: evidencePath };
}
