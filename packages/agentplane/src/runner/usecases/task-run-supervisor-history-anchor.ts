import type { BigIntStats, Dirent } from "node:fs";
import { lstat, readdir } from "node:fs/promises";

import { CliError } from "../../shared/errors.js";
import {
  captureRunnerArtifactDirectoryBoundary,
  captureRunnerArtifactDirectoryBoundaryIfPresent,
  ensureStableRunnerArtifactDirectoryChain,
  RunnerRunDirectoryBoundaryError,
  type RunnerRunDirectoryBoundary,
} from "../run-directory-boundary.js";
import { assertSafeRunnerRunId, resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";

export type TaskRunnerSupervisorRunSnapshot = {
  run_id: string;
  run_dir: string;
  state_path: string;
  run_directory: BigIntStats;
  state_file: BigIntStats | null;
};

export type TaskRunnerSupervisorHistoryAnchor = {
  task_id: string;
  boundary: RunnerRunDirectoryBoundary;
  runs_directory: BigIntStats;
  runs: TaskRunnerSupervisorRunSnapshot[];
};

type InvalidHistoryReason =
  | "runner_runs_changed_during_scan"
  | "runner_run_artifacts_changed_during_scan"
  | "runner_runs_invalid_entries";

function invalidHistoryError(opts: {
  task_id: string;
  reason: InvalidHistoryReason;
  run_id?: string;
  invalid_entries?: string[];
}): CliError {
  return new CliError({
    exitCode: 4,
    code: "E_IO",
    message: `Runner supervisor history is not safe to scan for task ${opts.task_id}.`,
    context: {
      reason: opts.reason,
      task_id: opts.task_id,
      ...(opts.run_id ? { run_id: opts.run_id } : {}),
      ...(opts.invalid_entries ? { invalid_entries: opts.invalid_entries } : {}),
    },
  });
}

function stableEntryNames(entries: Dirent[], taskId: string): string[] {
  const invalid: string[] = [];
  const runIds: string[] = [];
  for (const entry of entries) {
    if (entry.isSymbolicLink()) {
      throw new RunnerRunDirectoryBoundaryError(
        `Runner supervisor history entry must not be a symlink: ${entry.name}`,
      );
    }
    if (!entry.isDirectory()) {
      invalid.push(entry.name);
      continue;
    }
    try {
      const runId = assertSafeRunnerRunId(entry.name);
      if (runId === entry.name) {
        runIds.push(runId);
      } else {
        invalid.push(entry.name);
      }
    } catch {
      invalid.push(entry.name);
    }
  }
  if (invalid.length > 0) {
    throw invalidHistoryError({
      task_id: taskId,
      reason: "runner_runs_invalid_entries",
      invalid_entries: invalid.toSorted(),
    });
  }
  return runIds.toSorted();
}

function sameArtifactSnapshot(expected: BigIntStats, current: BigIntStats): boolean {
  return (
    expected.dev === current.dev &&
    expected.ino === current.ino &&
    expected.size === current.size &&
    expected.ctimeNs === current.ctimeNs &&
    expected.mtimeNs === current.mtimeNs
  );
}

function sameOptionalArtifactSnapshot(
  expected: BigIntStats | null,
  current: BigIntStats | null,
): boolean {
  if (expected === null || current === null) return expected === current;
  return sameArtifactSnapshot(expected, current);
}

function sameTaskRunnerSupervisorRunSnapshot(
  left: TaskRunnerSupervisorRunSnapshot,
  right: TaskRunnerSupervisorRunSnapshot,
): boolean {
  return (
    left.run_id === right.run_id &&
    sameArtifactSnapshot(left.run_directory, right.run_directory) &&
    sameOptionalArtifactSnapshot(left.state_file, right.state_file)
  );
}

async function captureRunSnapshot(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  run_id: string;
}): Promise<TaskRunnerSupervisorRunSnapshot> {
  const paths = await resolveSupervisorTaskRunnerPaths(opts);
  let runDirectoryBefore: BigIntStats;
  try {
    runDirectoryBefore = await lstat(paths.run_dir, { bigint: true });
  } catch {
    throw invalidHistoryError({
      task_id: opts.task_id,
      run_id: opts.run_id,
      reason: "runner_run_artifacts_changed_during_scan",
    });
  }
  let stateFile: BigIntStats | null;
  try {
    stateFile = await lstat(paths.state_path, { bigint: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
      stateFile = null;
    } else {
      throw invalidHistoryError({
        task_id: opts.task_id,
        run_id: opts.run_id,
        reason: "runner_run_artifacts_changed_during_scan",
      });
    }
  }
  if (
    !runDirectoryBefore.isDirectory() ||
    runDirectoryBefore.isSymbolicLink() ||
    (stateFile !== null && (!stateFile.isFile() || stateFile.isSymbolicLink()))
  ) {
    throw invalidHistoryError({
      task_id: opts.task_id,
      run_id: opts.run_id,
      reason: "runner_run_artifacts_changed_during_scan",
    });
  }
  let runDirectoryAfter: BigIntStats;
  try {
    runDirectoryAfter = await lstat(paths.run_dir, { bigint: true });
  } catch {
    throw invalidHistoryError({
      task_id: opts.task_id,
      run_id: opts.run_id,
      reason: "runner_run_artifacts_changed_during_scan",
    });
  }
  if (
    !runDirectoryAfter.isDirectory() ||
    runDirectoryAfter.isSymbolicLink() ||
    !sameArtifactSnapshot(runDirectoryBefore, runDirectoryAfter)
  ) {
    throw invalidHistoryError({
      task_id: opts.task_id,
      run_id: opts.run_id,
      reason: "runner_run_artifacts_changed_during_scan",
    });
  }
  return {
    run_id: opts.run_id,
    run_dir: paths.run_dir,
    state_path: paths.state_path,
    run_directory: runDirectoryAfter,
    state_file: stateFile,
  };
}

type TaskRunnerSupervisorSnapshotSet = {
  runs_directory: BigIntStats;
  runs: TaskRunnerSupervisorRunSnapshot[];
};

async function readRunsDirectorySnapshot(opts: {
  boundary: RunnerRunDirectoryBoundary;
  task_id: string;
}): Promise<BigIntStats> {
  let snapshot: BigIntStats;
  try {
    snapshot = await lstat(opts.boundary.run_dir, { bigint: true });
  } catch {
    throw invalidHistoryError({
      task_id: opts.task_id,
      reason: "runner_runs_changed_during_scan",
    });
  }
  if (!snapshot.isDirectory() || snapshot.isSymbolicLink()) {
    throw invalidHistoryError({
      task_id: opts.task_id,
      reason: "runner_runs_changed_during_scan",
    });
  }
  return snapshot;
}

async function readCurrentSnapshots(opts: {
  anchor: Pick<TaskRunnerSupervisorHistoryAnchor, "task_id" | "boundary">;
  git_root: string;
  workflow_dir: string;
  expected_runs_directory?: BigIntStats;
  allowed_new_run_id?: string;
}): Promise<TaskRunnerSupervisorSnapshotSet> {
  await opts.anchor.boundary.assertStable("before scanning runner supervisor history");
  const runsDirectoryBefore = await readRunsDirectorySnapshot({
    boundary: opts.anchor.boundary,
    task_id: opts.anchor.task_id,
  });
  const entries = await readdir(opts.anchor.boundary.run_dir, { withFileTypes: true });
  const runIds = stableEntryNames(entries, opts.anchor.task_id);
  const allowedNewRunId = opts.allowed_new_run_id
    ? assertSafeRunnerRunId(opts.allowed_new_run_id)
    : null;
  const includesAllowedNewRun = allowedNewRunId !== null && runIds.includes(allowedNewRunId);
  if (
    opts.expected_runs_directory &&
    !includesAllowedNewRun &&
    !sameArtifactSnapshot(opts.expected_runs_directory, runsDirectoryBefore)
  ) {
    throw invalidHistoryError({
      task_id: opts.anchor.task_id,
      reason: "runner_runs_changed_during_scan",
    });
  }
  const snapshots = await Promise.all(
    runIds.map((runId) =>
      captureRunSnapshot({
        git_root: opts.git_root,
        workflow_dir: opts.workflow_dir,
        task_id: opts.anchor.task_id,
        run_id: runId,
      }),
    ),
  );
  const runsDirectoryAfter = await readRunsDirectorySnapshot({
    boundary: opts.anchor.boundary,
    task_id: opts.anchor.task_id,
  });
  if (
    !sameArtifactSnapshot(runsDirectoryBefore, runsDirectoryAfter) ||
    (opts.expected_runs_directory &&
      !includesAllowedNewRun &&
      !sameArtifactSnapshot(opts.expected_runs_directory, runsDirectoryAfter))
  ) {
    throw invalidHistoryError({
      task_id: opts.anchor.task_id,
      reason: "runner_runs_changed_during_scan",
    });
  }
  await opts.anchor.boundary.assertStable("after scanning runner supervisor history");
  return {
    runs_directory: runsDirectoryAfter,
    runs: snapshots,
  };
}

async function captureWithBoundary(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  boundary: RunnerRunDirectoryBoundary;
}): Promise<TaskRunnerSupervisorHistoryAnchor> {
  const captured = await readCurrentSnapshots({
    anchor: {
      task_id: opts.task_id,
      boundary: opts.boundary,
    },
    git_root: opts.git_root,
    workflow_dir: opts.workflow_dir,
  });
  const anchor: TaskRunnerSupervisorHistoryAnchor = {
    task_id: opts.task_id,
    boundary: opts.boundary,
    runs_directory: captured.runs_directory,
    runs: captured.runs,
  };
  await assertTaskRunnerSupervisorHistoryAnchorStable({
    anchor,
    git_root: opts.git_root,
    workflow_dir: opts.workflow_dir,
  });
  return anchor;
}

export async function captureTaskRunnerSupervisorHistoryAnchor(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
}): Promise<TaskRunnerSupervisorHistoryAnchor> {
  const paths = await resolveSupervisorTaskRunnerPaths({
    ...opts,
    run_id: "supervisor-history-anchor-probe",
  });
  await ensureStableRunnerArtifactDirectoryChain(paths.artifact_root, paths.runs_dir);
  const boundary = await captureRunnerArtifactDirectoryBoundary({
    run_dir: paths.runs_dir,
    artifact_root: paths.artifact_root,
    artifact_paths: [],
  });
  return await captureWithBoundary({ ...opts, boundary });
}

export async function captureTaskRunnerSupervisorHistoryAnchorIfPresent(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
}): Promise<TaskRunnerSupervisorHistoryAnchor | null> {
  const paths = await resolveSupervisorTaskRunnerPaths({
    ...opts,
    run_id: "supervisor-history-anchor-probe",
  });
  const boundary = await captureRunnerArtifactDirectoryBoundaryIfPresent({
    run_dir: paths.runs_dir,
    artifact_root: paths.artifact_root,
    artifact_paths: [],
  });
  return boundary ? await captureWithBoundary({ ...opts, boundary }) : null;
}

export async function assertTaskRunnerSupervisorHistoryAnchorStable(opts: {
  anchor: TaskRunnerSupervisorHistoryAnchor;
  git_root: string;
  workflow_dir: string;
  allowed_new_run_id?: string;
}): Promise<TaskRunnerSupervisorRunSnapshot[]> {
  const current = await readCurrentSnapshots({
    ...opts,
    expected_runs_directory: opts.anchor.runs_directory,
  });
  const expected = new Map(opts.anchor.runs.map((snapshot) => [snapshot.run_id, snapshot]));
  const allowedNewRunId = opts.allowed_new_run_id
    ? assertSafeRunnerRunId(opts.allowed_new_run_id)
    : null;
  const hasUnexpected = current.runs.some((snapshot) => {
    const expectedSnapshot = expected.get(snapshot.run_id);
    if (expectedSnapshot) {
      return !sameTaskRunnerSupervisorRunSnapshot(expectedSnapshot, snapshot);
    }
    return snapshot.run_id !== allowedNewRunId;
  });
  const hasMissing = opts.anchor.runs.some(
    (snapshot) => !current.runs.some((candidate) => candidate.run_id === snapshot.run_id),
  );
  if (hasUnexpected || hasMissing) {
    throw invalidHistoryError({
      task_id: opts.anchor.task_id,
      reason: "runner_runs_changed_during_scan",
    });
  }
  return current.runs;
}
