import { CliError } from "../../shared/errors.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { gitIsAncestor } from "@agentplaneorg/core/git";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import type { CommandContext } from "../shared/task-backend.js";
import { isTaskSetLocalOnlyAdvance } from "../shared/task-local-freshness.js";

import type { LoadedFinishTask, ResolvedCommitInfo } from "./finish-shared.js";
import { assertEvaluatorQualityReviewPassed } from "./quality-review-gate.js";

const BLUEPRINT_SNAPSHOT_REF_MARKER = "BlueprintSnapshotRef:";

export async function assertBlueprintEvidenceBeforeFinish(opts: {
  ctx: CommandContext;
  loadedTasks: readonly LoadedFinishTask[];
}): Promise<void> {
  for (const loaded of opts.loadedTasks) {
    const doc = typeof loaded.task.doc === "string" ? loaded.task.doc : "";
    const hasSnapshotRef = doc.includes(BLUEPRINT_SNAPSHOT_REF_MARKER);
    const snapshot = await checkTaskBlueprintSnapshotDrift({
      ctx: opts.ctx,
      task: loaded.task,
    });
    if (snapshot.state === "missing" && !hasSnapshotRef) {
      continue;
    }
    if (snapshot.state !== "current") {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: [
          "finish requires current blueprint snapshot evidence.",
          `task=${loaded.taskId}`,
          `snapshot_state=${snapshot.state}`,
          `snapshot_path=${snapshot.path}`,
          "Fix:",
          `  1) ${snapshot.safeCommand}`,
          `  2) agentplane verify ${loaded.taskId} --ok --by <ROLE> --note "Verified: ..."`,
          `  3) agentplane finish ${loaded.taskId} --author <ROLE> --body "Verified: ..." --result "..." --commit <hash>`,
        ].join("\n"),
      });
    }

    if (!hasSnapshotRef) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: [
          "finish requires recorded blueprint verification evidence.",
          `task=${loaded.taskId}`,
          `snapshot_digest=${snapshot.current.digest}`,
          "Fix:",
          `  1) agentplane verify ${loaded.taskId} --ok --by <ROLE> --note "Verified: ..."`,
          `  2) agentplane finish ${loaded.taskId} --author <ROLE> --body "Verified: ..." --result "..." --commit <hash>`,
        ].join("\n"),
      });
    }
  }
}

export async function assertQualityReviewBeforeFinish(opts: {
  ctx: CommandContext;
  loadedTasks: readonly LoadedFinishTask[];
  taskCommitInfo: ResolvedCommitInfo | null;
  implementationCommitInfo: ResolvedCommitInfo | null;
}): Promise<void> {
  const taskIds = opts.loadedTasks.map(({ taskId }) => taskId);
  for (const loaded of opts.loadedTasks) {
    const snapshot = await checkTaskBlueprintSnapshotDrift({
      ctx: opts.ctx,
      task: loaded.task,
    });
    const expectedSha = await resolveExpectedQualitySha({
      ctx: opts.ctx,
      loaded,
      taskIds,
      baselineSha:
        opts.implementationCommitInfo?.hash ??
        opts.taskCommitInfo?.hash ??
        loaded.task.commit?.hash ??
        null,
    });
    assertEvaluatorQualityReviewPassed({
      task: loaded.task,
      expectedSha,
      expectedBlueprintDigest: snapshot.previous.digest ? snapshot.current.digest : null,
      command: "finish",
    });
  }
}

async function resolveExpectedQualitySha(opts: {
  ctx: CommandContext;
  loaded: LoadedFinishTask;
  taskIds: readonly string[];
  baselineSha: string | null;
}): Promise<string | null> {
  const reviewedSha = opts.loaded.task.quality_review?.evaluated_sha ?? null;
  if (
    opts.taskIds.length <= 1 ||
    !opts.baselineSha ||
    !reviewedSha ||
    reviewedSha === opts.baselineSha
  ) {
    return opts.baselineSha;
  }

  const reviewedAfterBaseline = await gitIsAncestor(
    opts.ctx.resolvedProject.gitRoot,
    opts.baselineSha,
    reviewedSha,
  ).catch(() => false);
  if (!reviewedAfterBaseline) return opts.baselineSha;

  const taskArtifactsOnly = await isTaskSetLocalOnlyAdvance({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskIds: opts.taskIds,
    tasksPath: opts.ctx.config.paths.tasks_path,
    fromRef: opts.baselineSha,
    toRef: reviewedSha,
  }).catch(() => false);
  return taskArtifactsOnly ? reviewedSha : opts.baselineSha;
}
