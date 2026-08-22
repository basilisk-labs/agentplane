import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { gitIsAncestor } from "@agentplaneorg/core/git";
import type { TaskExecutionRouteMode } from "@agentplaneorg/core/tasks";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  isTaskLocalOnlyAdvance,
  isTaskSetLocalOnlyAdvance,
} from "../shared/task-local-freshness.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import {
  hasAcceptedVerificationRecord,
  requiredVerificationContractChecks,
} from "../shared/task-verification-records.js";

import {
  resolveBatchArtifactTaskIds,
  type LoadedFinishTask,
  type ResolvedCommitInfo,
} from "./finish-shared.js";
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
  execution: TaskExecutionContext;
  workflowMode?: TaskExecutionRouteMode;
}): Promise<void> {
  const workflowMode = opts.workflowMode ?? opts.ctx.config.workflow_mode;
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
    const selectedChecks = requiredVerificationContractChecks(loaded.task);
    if (selectedChecks.length > 0) {
      const accepted = await hasAcceptedVerificationRecord({
        taskRoot: path.join(
          opts.ctx.resolvedProject.gitRoot,
          opts.ctx.config.paths.workflow_dir,
          loaded.task.id,
        ),
        task: loaded.task,
        evaluatedSha: expectedSha,
        targetContext: {
          gitRoot: opts.ctx.resolvedProject.gitRoot,
          workflowDir: opts.ctx.config.paths.workflow_dir,
          taskIds,
          workflowMode,
          execution: opts.execution,
        },
        snapshotRef: expectedSha,
      });
      if (!accepted) {
        throw new CliError({
          exitCode: exitCodeForError("E_VALIDATION"),
          code: "E_VALIDATION",
          message: [
            "finish requires a current verification record that satisfies the persisted Verification Contract.",
            `task=${loaded.task.id}`,
            `required_checks=${selectedChecks.join(",")}`,
            "Fix: record current verification with concrete evidence and a `Check: <check-id>` block for every required check.",
          ].join("\n"),
        });
      }
    }
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
  if (!opts.baselineSha || !reviewedSha || reviewedSha === opts.baselineSha) {
    return opts.baselineSha;
  }

  const reviewedAfterBaseline = await gitIsAncestor(
    opts.ctx.resolvedProject.gitRoot,
    opts.baselineSha,
    reviewedSha,
  ).catch(() => false);
  if (!reviewedAfterBaseline) return opts.baselineSha;

  const artifactTaskIds =
    opts.taskIds.length === 1 ? resolveBatchArtifactTaskIds(opts.loaded) : opts.taskIds;
  const taskArtifactsOnly = await (
    artifactTaskIds.length === 1
      ? isTaskLocalOnlyAdvance({
          gitRoot: opts.ctx.resolvedProject.gitRoot,
          workflowDir: opts.ctx.config.paths.workflow_dir,
          taskId: opts.loaded.taskId,
          tasksPath: opts.ctx.config.paths.tasks_path,
          fromRef: opts.baselineSha,
          toRef: reviewedSha,
        })
      : isTaskSetLocalOnlyAdvance({
          gitRoot: opts.ctx.resolvedProject.gitRoot,
          workflowDir: opts.ctx.config.paths.workflow_dir,
          taskIds: artifactTaskIds,
          tasksPath: opts.ctx.config.paths.tasks_path,
          fromRef: opts.baselineSha,
          toRef: reviewedSha,
        })
  ).catch(() => false);
  return taskArtifactsOnly ? reviewedSha : opts.baselineSha;
}
