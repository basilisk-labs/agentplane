import { readFile } from "node:fs/promises";
import path from "node:path";

import { readManifest } from "./ingest-manifest.js";
import {
  contextIngestManifestFingerprint,
  isResumableContextIngestPhase,
  readContextIngestRuns,
  type ContextIngestRunJournal,
} from "./ingest-run-journal.js";

export type ContextIngestRunDiagnostic = {
  level: "issue" | "warning";
  message: string;
};

const CLI_POST_PROCESSING_PHASES = new Set([
  "artifacts_applied",
  "wiki_report_started",
  "wiki_indexed",
  "wiki_reported",
  "wiki_linted",
  "reindexed",
  "graph_validated",
  "task_verified",
  "doctor_checked",
  "smoke_checked",
  "validated",
  "evaluator_requested",
  "evaluated",
  "acr_generated",
  "acr_checked",
]);

function retryCommand(run: ContextIngestRunJournal): string {
  if (run.request.mode === "all") return "agentplane context ingest --all";
  if (run.request.mode === "changed") return "agentplane context ingest --changed";
  return `agentplane context ingest ${run.request.sources.map((source) => JSON.stringify(source)).join(" ")}`;
}

async function fileExists(candidate: string): Promise<boolean> {
  try {
    await readFile(candidate);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return false;
    throw error;
  }
}

export async function inspectContextIngestRuns(
  root: string,
): Promise<ContextIngestRunDiagnostic[]> {
  const [entries, manifest] = await Promise.all([readContextIngestRuns(root), readManifest(root)]);
  const diagnostics: ContextIngestRunDiagnostic[] = [];
  for (const run of entries) {
    if (run.phase === "finalized") continue;
    const retry = retryCommand(run);
    const taskId = run.task?.task_id;
    if (
      run.phase !== "planned" &&
      isResumableContextIngestPhase(run.phase) &&
      contextIngestManifestFingerprint(manifest) !== run.source_set.manifest_fingerprint
    ) {
      diagnostics.push({
        level: "issue",
        message:
          `context ingest run ${run.run_id} has manifest/run divergence; inspect the locked source set ` +
          `before repairing and resuming with ${retry}.`,
      });
      continue;
    }
    if (run.phase === "pack_written" && taskId !== undefined) {
      diagnostics.push({
        level: "warning",
        message: `context ingest run ${run.run_id} prepared CURATOR task ${taskId}; await semantic work.`,
      });
      continue;
    }
    if (run.phase === "semantic_result_received" && taskId !== undefined) {
      const extraction = run.semantic?.extraction_file ?? "the original extraction SGR file";
      diagnostics.push({
        level: "warning",
        message:
          `context ingest run ${run.run_id} received semantic output for ${taskId}; ` +
          `resume CLI-owned post-processing with agentplane context supervise-task ${taskId} --extraction ${JSON.stringify(extraction)}.`,
      });
      continue;
    }
    if (run.phase === "semantic_rework_requested" && taskId !== undefined) {
      const workOrder =
        run.supervision?.rework.at(-1)?.work_order_file ?? "the recorded rework work order";
      diagnostics.push({
        level: "warning",
        message:
          `context ingest run ${run.run_id} awaits a new CURATOR semantic result for ${taskId}; ` +
          `use ${workOrder} and do not replay completed CLI operations.`,
      });
      continue;
    }
    if (taskId !== undefined && CLI_POST_PROCESSING_PHASES.has(run.phase)) {
      const extraction = run.semantic?.extraction_file ?? "<sgr-json>";
      diagnostics.push({
        level: "warning",
        message:
          `context ingest run ${run.run_id} is incomplete at ${run.phase}; ` +
          `resume with agentplane context supervise-task ${taskId} --extraction ${JSON.stringify(extraction)}.`,
      });
      continue;
    }
    if (run.phase === "task_creating") {
      diagnostics.push({
        level: "issue",
        message:
          `context ingest run ${run.run_id} has unknown task creation outcome; inspect the task backend ` +
          `before retrying (${retry}).`,
      });
      continue;
    }
    if (run.phase === "task_created" && run.task !== undefined) {
      const receiptPath = path.join(
        root,
        ".agentplane/tasks",
        run.task.task_id,
        "task-creation.json",
      );
      if (!(await fileExists(receiptPath))) {
        diagnostics.push({
          level: "issue",
          message:
            `context ingest run ${run.run_id} has task/receipt divergence for ${run.task.task_id}; ` +
            `resume with ${retry}.`,
        });
        continue;
      }
    }
    if (run.phase === "pack_writing" && run.task !== undefined) {
      const packPath = path.join(root, ".agentplane/tasks", run.task.task_id, "context-pack.md");
      if (!(await fileExists(packPath))) {
        diagnostics.push({
          level: "issue",
          message:
            `context ingest run ${run.run_id} has task/pack divergence for ${run.task.task_id}; ` +
            `resume with ${retry}.`,
        });
        continue;
      }
    }
    diagnostics.push({
      level: "warning",
      message: `context ingest run ${run.run_id} is incomplete at ${run.phase}; resume with ${retry}.`,
    });
  }
  return diagnostics;
}
