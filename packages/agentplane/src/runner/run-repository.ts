import type { BigIntStats } from "node:fs";
import { lstat, mkdir, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";

import { CliError } from "../shared/errors.js";

import {
  appendRunnerEvent,
  readRunnerRunState,
  writePreparedRunnerArtifacts,
  writeRunnerRunState,
} from "./artifacts.js";
import {
  RUNNER_BLUEPRINT_EXECUTION_PLAN_FILENAME,
  RUNNER_BLUEPRINT_EXECUTION_STATE_FILENAME,
  RUNNER_BLUEPRINT_PLAN_FILENAME,
  RUNNER_CONTEXT_MANIFEST_FILENAME,
  RUNNER_EXECUTION_RECEIPT_FILENAME,
  assertSafeRunnerRunId,
  resolveSupervisorTaskRunnerPaths,
  resolveTaskRunnerPaths,
} from "./task-run-paths.js";
import { readTraceArtifactText } from "./trace-artifacts.js";
import type {
  RunnerArtifactPaths,
  RunnerContextBundle,
  RunnerEvent,
  RunnerInvocation,
  RunnerRunRecord,
  RunnerRunState,
} from "./types.js";
import {
  captureRunnerArtifactDirectoryBoundary,
  RunnerRunDirectoryBoundaryError,
  type RunnerRunDirectoryBoundary,
} from "./run-directory-boundary.js";
import {
  assertRunnerBundleArtifactPaths,
  assertRunnerBundleMatchesTask,
  assertRunnerStateMatchesBundle,
  parseRunnerEventsText,
  RUNNER_ARTIFACT_PATH_KEYS,
} from "./run-repository-contract.js";
import { readStableRegularTextNoFollow } from "./stable-file.js";

export {
  assertRunnerBundleArtifactPaths,
  assertRunnerBundleMatchesTask,
  assertRunnerStateMatchesBundle,
  parseRunnerEventsText,
} from "./run-repository-contract.js";

function pathIsInsideOrSame(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return (
    relative === "" ||
    (relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative))
  );
}

async function ensureStableDirectoryChain(
  repositoryRoot: string,
  targetDir: string,
): Promise<void> {
  const resolvedRoot = path.resolve(repositoryRoot);
  const resolvedTarget = path.resolve(targetDir);
  if (!pathIsInsideOrSame(resolvedRoot, resolvedTarget) || resolvedRoot === resolvedTarget) {
    throw new RunnerRunDirectoryBoundaryError(
      `Runner artifact parent must stay below repository_root: ${resolvedTarget}`,
    );
  }
  const physicalRoot = await realpath(resolvedRoot);
  let current = resolvedRoot;
  const relativeSegments = path.relative(resolvedRoot, resolvedTarget).split(path.sep);
  for (const segment of relativeSegments) {
    if (!segment || segment === "." || segment === "..") {
      throw new RunnerRunDirectoryBoundaryError(
        `Runner artifact parent contains an unsafe path segment: ${resolvedTarget}`,
      );
    }
    current = path.join(current, segment);
    let stats: BigIntStats;
    try {
      stats = await lstat(current, { bigint: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
      await mkdir(current, { recursive: false, mode: 0o700 });
      stats = await lstat(current, { bigint: true });
    }
    if (!stats.isDirectory() || stats.isSymbolicLink()) {
      throw new RunnerRunDirectoryBoundaryError(
        `Runner artifact parent must be a non-symlink directory: ${current}`,
      );
    }
    const physicalCurrent = await realpath(current);
    if (!pathIsInsideOrSame(physicalRoot, physicalCurrent)) {
      throw new RunnerRunDirectoryBoundaryError(
        `Runner artifact parent resolves outside repository_root: ${current}`,
      );
    }
  }
}

function parseTimestamp(value: string | null | undefined): number {
  const parsed = typeof value === "string" ? Date.parse(value) : Number.NaN;
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

async function readOptionalJson<T>(filePath: string): Promise<T | null> {
  try {
    return JSON.parse(await readStableRegularTextNoFollow(filePath, "runner JSON artifact")) as T;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

async function readRequiredText(opts: {
  file_path: string;
  task_id: string;
  run_id: string;
  artifact_label: string;
}): Promise<string> {
  try {
    return await readStableRegularTextNoFollow(opts.file_path, opts.artifact_label);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message:
          `Runner artifact not found for ${opts.task_id}:${opts.run_id} ` +
          `(${opts.artifact_label} at ${opts.file_path})`,
      });
    }
    throw err;
  }
}

export class RunnerRunRepository {
  private freshDirectoryOwned = false;

  constructor(
    readonly paths: RunnerArtifactPaths,
    private boundary?: RunnerRunDirectoryBoundary,
    private readonly artifactRoot: string = paths.artifact_root ?? "",
  ) {}

  static forTaskRun(opts: {
    git_root: string;
    workflow_dir: string;
    task_id: string;
    run_id: string;
  }): RunnerRunRepository {
    const paths = resolveTaskRunnerPaths({
      git_root: opts.git_root,
      workflow_dir: opts.workflow_dir,
      task_id: opts.task_id,
      run_id: opts.run_id,
    });
    return new RunnerRunRepository(paths, undefined, paths.artifact_root);
  }

  static async openExistingTaskRun(opts: {
    git_root: string;
    workflow_dir: string;
    task_id: string;
    run_id: string;
    storage?: "task" | "supervisor";
  }): Promise<RunnerRunRepository> {
    const storage = opts.storage ?? "supervisor";
    const paths =
      storage === "supervisor"
        ? await resolveSupervisorTaskRunnerPaths(opts)
        : resolveTaskRunnerPaths(opts);
    const boundary = await captureRunnerArtifactDirectoryBoundary({
      run_dir: paths.run_dir,
      artifact_root: paths.artifact_root,
      artifact_paths: RUNNER_ARTIFACT_PATH_KEYS.filter((key) => key !== "run_dir").map(
        (key) => paths[key],
      ),
    });
    return new RunnerRunRepository(paths, boundary, paths.artifact_root);
  }

  static fromBundle(bundle: RunnerContextBundle): RunnerRunRepository {
    return new RunnerRunRepository(
      bundle.execution.artifact_paths,
      undefined,
      bundle.execution.artifact_paths.artifact_root ?? bundle.repository.git_root,
    );
  }

  static fromInvocation(
    invocation: RunnerInvocation,
    boundary?: RunnerRunDirectoryBoundary,
  ): RunnerRunRepository {
    return new RunnerRunRepository(
      {
        run_dir: invocation.run_dir,
        bundle_path: invocation.bundle_path,
        blueprint_plan_path: path.join(invocation.run_dir, RUNNER_BLUEPRINT_PLAN_FILENAME),
        blueprint_execution_plan_path: path.join(
          invocation.run_dir,
          RUNNER_BLUEPRINT_EXECUTION_PLAN_FILENAME,
        ),
        blueprint_execution_state_path: path.join(
          invocation.run_dir,
          RUNNER_BLUEPRINT_EXECUTION_STATE_FILENAME,
        ),
        context_manifest_path: path.join(invocation.run_dir, RUNNER_CONTEXT_MANIFEST_FILENAME),
        bootstrap_path: invocation.bootstrap_path ?? "",
        state_path: invocation.state_path,
        events_path: invocation.events_path,
        result_path: invocation.result_path,
        receipt_path:
          invocation.receipt_path ||
          path.join(invocation.run_dir, RUNNER_EXECUTION_RECEIPT_FILENAME),
        trace_path: invocation.trace_path,
        stderr_path: invocation.stderr_path,
      },
      boundary,
      invocation.artifact_root ?? invocation.repository_root,
    );
  }

  async assertBoundary(phase: string): Promise<void> {
    await this.boundary?.assertStable(phase);
  }

  async createFreshDirectory(opts: { run_id: string }): Promise<void> {
    if (this.freshDirectoryOwned) {
      await this.assertBoundary("while reusing the freshly created run directory");
      return;
    }
    if (this.boundary) {
      throw new RunnerRunDirectoryBoundaryError(
        `Refusing to overwrite an existing runner run directory: ${this.paths.run_dir}`,
      );
    }
    const runId = assertSafeRunnerRunId(opts.run_id);
    if (path.basename(this.paths.run_dir) !== runId) {
      throw new RunnerRunDirectoryBoundaryError(
        `Runner run_dir does not match run_id=${JSON.stringify(runId)}: ${this.paths.run_dir}`,
      );
    }
    if (!this.artifactRoot) {
      throw new RunnerRunDirectoryBoundaryError(
        `Runner artifact_root is unavailable for run_dir: ${this.paths.run_dir}`,
      );
    }
    await ensureStableDirectoryChain(this.artifactRoot, path.dirname(this.paths.run_dir));
    try {
      await mkdir(this.paths.run_dir, { recursive: false, mode: 0o700 });
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
      throw new RunnerRunDirectoryBoundaryError(
        `Refusing to overwrite an existing runner run directory: ${this.paths.run_dir}`,
      );
    }
    this.boundary = await captureRunnerArtifactDirectoryBoundary({
      run_dir: this.paths.run_dir,
      artifact_root: this.artifactRoot,
      artifact_paths: RUNNER_ARTIFACT_PATH_KEYS.filter((key) => key !== "run_dir").map(
        (key) => this.paths[key],
      ),
    });
    this.freshDirectoryOwned = true;
  }

  async writePrepared(opts: {
    bundle: RunnerContextBundle;
    bootstrap_markdown?: string;
    created_at?: string;
    invocation?: RunnerInvocation;
  }): Promise<RunnerRunState> {
    assertRunnerBundleArtifactPaths(
      opts.bundle,
      this.paths,
      opts.bundle.task?.task_id ?? opts.bundle.execution.run_id,
      opts.bundle.execution.run_id,
    );
    await this.createFreshDirectory({
      run_id: opts.bundle.execution.run_id,
    });
    await this.assertBoundary("before writing prepared artifacts");
    const state = await writePreparedRunnerArtifacts({
      ...opts,
      assert_artifact_boundary: async (phase) => await this.assertBoundary(phase),
    });
    await this.assertBoundary("after writing prepared artifacts");
    return state;
  }

  async readBundle(): Promise<RunnerContextBundle | null> {
    await this.assertBoundary("before reading bundle");
    const bundle = await readOptionalJson<RunnerContextBundle>(this.paths.bundle_path);
    await this.assertBoundary("after reading bundle");
    return bundle;
  }

  async writeBundleText(bundleText: string): Promise<void> {
    await this.assertBoundary("before writing bundle");
    await atomicWriteFile(this.paths.bundle_path, bundleText, "utf8");
    await this.assertBoundary("after writing bundle");
  }

  async writeBootstrapText(bootstrapText: string): Promise<void> {
    await this.assertBoundary("before writing bootstrap");
    await atomicWriteFile(this.paths.bootstrap_path, bootstrapText, "utf8");
    await this.assertBoundary("after writing bootstrap");
  }

  async readState(): Promise<RunnerRunState | null> {
    await this.assertBoundary("before reading state");
    const state = await readRunnerRunState(this.paths.state_path);
    await this.assertBoundary("after reading state");
    return state;
  }

  async readRecord(): Promise<RunnerRunRecord | null> {
    const [bundle, state] = await Promise.all([this.readBundle(), this.readState()]);
    if (!bundle || !state) return null;
    return {
      bundle,
      state,
      result: state.result ?? null,
    };
  }

  async readRequiredRecord(opts: { task_id: string; run_id: string }): Promise<RunnerRunRecord> {
    const record = await this.readRecord();
    if (!record) {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message: `Runner artifact not found for ${opts.task_id}:${opts.run_id}`,
      });
    }
    assertRunnerBundleMatchesTask(record.bundle, opts.task_id, opts.run_id);
    assertRunnerBundleArtifactPaths(record.bundle, this.paths, opts.task_id, opts.run_id);
    assertRunnerStateMatchesBundle(
      record.state,
      record.bundle,
      this.paths,
      opts.task_id,
      opts.run_id,
    );
    return record;
  }

  async writeState(state: RunnerRunState): Promise<void> {
    await this.assertBoundary("before writing state");
    await writeRunnerRunState({
      state_path: this.paths.state_path,
      state,
    });
    await this.assertBoundary("after writing state");
  }

  async appendEvent(event: RunnerEvent): Promise<void> {
    await this.assertBoundary("before appending event");
    await appendRunnerEvent({
      events_path: this.paths.events_path,
      event,
    });
    await this.assertBoundary("after appending event");
  }

  async readEventsTextRequired(opts: { task_id: string; run_id: string }): Promise<string> {
    await this.assertBoundary("before reading events");
    const eventsText = await readRequiredText({
      file_path: this.paths.events_path,
      task_id: opts.task_id,
      run_id: opts.run_id,
      artifact_label: "events",
    });
    await this.assertBoundary("after reading events");
    return eventsText;
  }

  async readEventsRequired(opts: {
    task_id: string;
    run_id: string;
  }): Promise<{ events_text: string; events: RunnerEvent[] }> {
    const events_text = await this.readEventsTextRequired(opts);
    return {
      events_text,
      events: parseRunnerEventsText(events_text),
    };
  }

  async readTraceTextRequired(opts: { task_id: string; run_id: string }): Promise<string> {
    return await this.readTraceLikeTextRequired({
      ...opts,
      file_path: this.paths.trace_path,
      artifact_label: "trace",
    });
  }

  async readStderrTextRequired(opts: { task_id: string; run_id: string }): Promise<string> {
    return await this.readTraceLikeTextRequired({
      ...opts,
      file_path: this.paths.stderr_path,
      artifact_label: "stderr",
    });
  }

  private async readTraceLikeTextRequired(opts: {
    task_id: string;
    run_id: string;
    file_path: string;
    artifact_label: "trace" | "stderr";
  }): Promise<string> {
    try {
      await this.assertBoundary(`before reading ${opts.artifact_label}`);
      const text = await readTraceArtifactText(opts.file_path);
      await this.assertBoundary(`after reading ${opts.artifact_label}`);
      return text;
    } catch (err) {
      const code = (err as NodeJS.ErrnoException | null)?.code;
      if (code === "ENOENT") {
        throw new CliError({
          exitCode: 4,
          code: "E_IO",
          message:
            `Runner artifact not found for ${opts.task_id}:${opts.run_id} ` +
            `(${opts.artifact_label} at ${opts.file_path} or ${opts.file_path}.gz)`,
        });
      }
      throw err;
    }
  }
}

export async function openLatestRunnerRun(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  storage?: "task" | "supervisor";
}): Promise<{ run_id: string; repository: RunnerRunRepository }> {
  const storage = opts.storage ?? "supervisor";
  const probePaths =
    storage === "supervisor"
      ? await resolveSupervisorTaskRunnerPaths({ ...opts, run_id: "latest-probe" })
      : resolveTaskRunnerPaths({ ...opts, run_id: "latest-probe" });
  const runsDir = probePaths.runs_dir;
  let entries: string[] = [];
  try {
    const runEntries = await readdir(runsDir, { withFileTypes: true });
    entries = runEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message: `No runner runs found for task ${opts.task_id}`,
      });
    }
    throw err;
  }

  const candidates = await Promise.all(
    entries.map(async (runId) => {
      const repository = await RunnerRunRepository.openExistingTaskRun({
        git_root: opts.git_root,
        workflow_dir: opts.workflow_dir,
        task_id: opts.task_id,
        run_id: runId,
        storage,
      });
      const state = await repository.readState();
      if (!state) return null;
      return {
        run_id: runId,
        repository,
        updated_at: parseTimestamp(state.updated_at),
        created_at: parseTimestamp(state.created_at),
      };
    }),
  );

  const latest = candidates
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .toSorted(
      (left, right) =>
        right.updated_at - left.updated_at ||
        right.created_at - left.created_at ||
        right.run_id.localeCompare(left.run_id),
    )[0];
  if (!latest) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `No runner runs found for task ${opts.task_id}`,
    });
  }
  return {
    run_id: latest.run_id,
    repository: latest.repository,
  };
}

export async function resolveLatestRunnerRunId(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  storage?: "task" | "supervisor";
}): Promise<string> {
  const latest = await openLatestRunnerRun(opts);
  return latest.run_id;
}
