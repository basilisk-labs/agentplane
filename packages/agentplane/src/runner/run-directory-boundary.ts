import { type BigIntStats } from "node:fs";
import { lstat, realpath } from "node:fs/promises";
import path from "node:path";

import type { RunnerInvocation } from "./types.js";

type DirectoryIdentity = {
  dev: bigint;
  ino: bigint;
};

function identity(stat: BigIntStats): DirectoryIdentity {
  return {
    dev: BigInt(stat.dev),
    ino: BigInt(stat.ino),
  };
}

function sameIdentity(left: DirectoryIdentity, right: DirectoryIdentity): boolean {
  return left.dev === right.dev && left.ino === right.ino;
}

function isInside(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return (
    relative.length > 0 &&
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

export class RunnerRunDirectoryBoundaryError extends Error {
  readonly code = "RUNNER_RUN_DIRECTORY_BOUNDARY";

  constructor(message: string) {
    super(message);
    this.name = "RunnerRunDirectoryBoundaryError";
  }
}

export function isRunnerRunDirectoryBoundaryError(
  error: unknown,
): error is RunnerRunDirectoryBoundaryError {
  return (
    error instanceof RunnerRunDirectoryBoundaryError ||
    (error instanceof Error &&
      (error as Error & { code?: string }).code === "RUNNER_RUN_DIRECTORY_BOUNDARY")
  );
}

export type RunnerRunDirectoryBoundary = {
  run_dir: string;
  assertStable: (phase: string) => Promise<void>;
};

function invocationArtifactPaths(invocation: RunnerInvocation): string[] {
  return [
    invocation.bundle_path,
    invocation.state_path,
    invocation.events_path,
    invocation.result_path,
    invocation.receipt_path,
    invocation.trace_path,
    invocation.stderr_path,
    invocation.bootstrap_path,
    invocation.output_last_message_path,
    invocation.output_schema_path,
  ].filter((value): value is string => typeof value === "string" && value.trim().length > 0);
}

export async function captureRunnerArtifactDirectoryBoundary(opts: {
  run_dir: string;
  artifact_root: string;
  artifact_paths: readonly string[];
}): Promise<RunnerRunDirectoryBoundary> {
  const runDir = path.resolve(opts.run_dir);
  const artifactRoot = path.resolve(opts.artifact_root);
  for (const artifactPath of opts.artifact_paths) {
    if (!artifactPath.trim()) continue;
    if (path.dirname(path.resolve(artifactPath)) !== runDir) {
      throw new RunnerRunDirectoryBoundaryError(
        `Runner artifact path must be a direct child of run_dir: ${artifactPath}`,
      );
    }
  }

  const initial = await lstat(runDir, { bigint: true });
  if (!initial.isDirectory() || initial.isSymbolicLink()) {
    throw new RunnerRunDirectoryBoundaryError(
      `Runner run_dir must be a stable non-symlink directory: ${runDir}`,
    );
  }
  const physicalRunDir = await realpath(runDir);
  const physicalArtifactRoot = await realpath(artifactRoot);
  if (!isInside(physicalArtifactRoot, physicalRunDir)) {
    throw new RunnerRunDirectoryBoundaryError(
      `Runner run_dir resolves outside artifact_root: ${runDir}`,
    );
  }
  const initialIdentity = identity(initial);

  return {
    run_dir: runDir,
    async assertStable(phase: string): Promise<void> {
      let current: BigIntStats;
      let currentPhysicalPath: string;
      try {
        current = await lstat(runDir, { bigint: true });
        currentPhysicalPath = await realpath(runDir);
      } catch (error) {
        throw new RunnerRunDirectoryBoundaryError(
          `Runner run_dir became unavailable ${phase}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
      if (
        !current.isDirectory() ||
        current.isSymbolicLink() ||
        !sameIdentity(initialIdentity, identity(current)) ||
        currentPhysicalPath !== physicalRunDir
      ) {
        throw new RunnerRunDirectoryBoundaryError(
          `Runner run_dir identity changed ${phase}: ${runDir}`,
        );
      }
    },
  };
}

export async function captureRunnerRunDirectoryBoundary(
  invocation: RunnerInvocation,
): Promise<RunnerRunDirectoryBoundary> {
  return await captureRunnerArtifactDirectoryBoundary({
    run_dir: invocation.run_dir,
    artifact_root: invocation.artifact_root ?? invocation.repository_root,
    artifact_paths: invocationArtifactPaths(invocation),
  });
}
