import { createHash } from "node:crypto";
import path from "node:path";

import { captureGitSnapshot, type GitSnapshot } from "../observation/git-snapshot.js";
import {
  captureProtectedFilesystemSnapshot,
  type ProtectedFilesystemCaptureMode,
  type ProtectedFilesystemDelta,
  type ProtectedFilesystemObservationError,
} from "../observation/protected-filesystem.js";
import type { RunnerContextBundle, RunnerInvocation } from "../types.js";
import type { RunnerRunRepository } from "../run-repository.js";
import { type RunnerProtectedFilesystemObservation } from "../write-scope.js";
import { readStableRegularFileNoFollow } from "../stable-file.js";
import { validateNativeFilesystemEffectBoundary } from "./execution-receipt-containment.js";
import type { RunnerExecutionObservationBefore } from "./execution-receipt-runtime-types.js";

function protectedFilesystemError(error: ProtectedFilesystemObservationError): string {
  const entryPath = error.path ? ` (${error.path})` : "";
  return `protected filesystem ${error.source}.${error.operation}${entryPath}: ${error.message}`;
}

function isStrictDescendant(candidate: string, ancestor: string): boolean {
  return candidate !== ancestor && (ancestor === "." || candidate.startsWith(`${ancestor}/`));
}

function scopeRelevantFilesystemChanges(delta: ProtectedFilesystemDelta): string[] {
  return delta.entries.flatMap((entry) => {
    const entryKind = entry.after?.kind ?? entry.before?.kind;
    const redundantModifiedAncestor =
      entry.change === "modified" &&
      entryKind === "directory" &&
      delta.changed_paths.some((candidate) => isStrictDescendant(candidate, entry.path));
    return redundantModifiedAncestor ? [] : [entry.path];
  });
}

export function mapProtectedFilesystemObservation(
  delta: ProtectedFilesystemDelta | null,
  errors: readonly string[],
): RunnerProtectedFilesystemObservation {
  if (delta?.state === "available") {
    return {
      state: "observed",
      changed_paths: scopeRelevantFilesystemChanges(delta),
      errors: [],
    };
  }
  return {
    state: "unavailable",
    changed_paths: [],
    errors: [
      ...new Set([
        ...errors,
        ...(delta?.errors.map(protectedFilesystemError) ?? []),
        "Protected-path filesystem observation is unavailable.",
      ]),
    ],
  };
}

async function artifactSha256(filePath: string): Promise<string> {
  const content = await readStableRegularFileNoFollow(filePath, "prepared runner artifact");
  return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}

function pathIsStrictlyInside(root: string, candidate: string): boolean {
  const relative = path.relative(path.resolve(root), path.resolve(candidate));
  return (
    relative.length > 0 &&
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

export function containedRunDirectory(invocation: RunnerInvocation): string[] {
  return pathIsStrictlyInside(invocation.repository_root, invocation.run_dir)
    ? [invocation.run_dir]
    : [];
}

export function filesystemObservationExcludedRoots(invocation: RunnerInvocation): string[] {
  return [path.join(invocation.repository_root, ".git"), ...containedRunDirectory(invocation)];
}

async function captureRunnerGitBefore(invocation: RunnerInvocation): Promise<GitSnapshot> {
  return await captureGitSnapshot({
    repository_root: invocation.repository_root,
    excluded_roots: containedRunDirectory(invocation),
  });
}

export async function captureRunnerExecutionBeforeImpl(opts: {
  invocation: RunnerInvocation;
  repository: RunnerRunRepository;
}): Promise<RunnerExecutionObservationBefore> {
  const git = await captureRunnerGitBefore(opts.invocation);
  const errors: string[] = [];
  const preparedArtifactDigests = new Map<string, string>();
  const preparedInput = opts.invocation.supervisor_prepared_input;
  const expectedPreparedArtifacts = preparedInput
    ? [
        {
          path: opts.invocation.bundle_path,
          sha256: `sha256:${preparedInput.bundle_sha256}`,
        },
        ...(opts.invocation.bootstrap_path
          ? [
              {
                path: opts.invocation.bootstrap_path,
                sha256: `sha256:${preparedInput.bootstrap_sha256}`,
              },
            ]
          : []),
      ]
    : [];
  if (!preparedInput) {
    errors.push("process-local supervisor prepared input is unavailable before process spawn");
  }
  for (const artifact of expectedPreparedArtifacts) {
    preparedArtifactDigests.set(path.resolve(artifact.path), artifact.sha256);
    try {
      const observed = await artifactSha256(artifact.path);
      if (observed !== artifact.sha256) {
        errors.push(
          `prepared artifact digest mismatch (${artifact.path}): ` +
            `expected=${artifact.sha256}; observed=${observed}`,
        );
      }
    } catch (error) {
      errors.push(
        `prepared artifact snapshot failed (${artifact.path}): ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
  const bundle: RunnerContextBundle | null = preparedInput
    ? structuredClone(preparedInput.bundle)
    : null;
  let protectedPaths: string[] = [];
  let filesystemObservationPrefixes: string[] = [];
  let filesystemObservationMode: ProtectedFilesystemCaptureMode | null = null;
  if (!bundle) {
    return {
      git,
      bundle: null,
      prepared_artifact_digests: preparedArtifactDigests,
      protected_filesystem: null,
      protected_paths: [],
      filesystem_observation_prefixes: [],
      filesystem_observation_mode: null,
      errors,
    };
  }
  await opts.repository.assertBoundary("before using supervisor prepared write-scope input");
  const writeScope = bundle.execution.write_scope;
  protectedPaths = [...(writeScope?.protected_paths ?? [])];
  const writableRoots = writeScope?.writable_roots ?? [];
  const nativeReadOnlyBoundary = validateNativeFilesystemEffectBoundary(
    opts.invocation,
    bundle,
  ).valid;
  if (nativeReadOnlyBoundary) {
    filesystemObservationPrefixes = [];
    filesystemObservationMode = null;
  } else if (!writeScope) {
    filesystemObservationPrefixes = [];
    filesystemObservationMode = null;
  } else if (writableRoots.length === 0 || !writableRoots.includes(".")) {
    filesystemObservationPrefixes = ["."];
    filesystemObservationMode = "metadata_only";
  } else {
    filesystemObservationPrefixes = protectedPaths;
    filesystemObservationMode = filesystemObservationPrefixes.length > 0 ? "content_hash" : null;
  }
  await opts.repository.assertBoundary("after using supervisor prepared write-scope input");
  if (filesystemObservationPrefixes.length === 0) {
    return {
      git,
      bundle,
      prepared_artifact_digests: preparedArtifactDigests,
      protected_filesystem: null,
      protected_paths: [],
      filesystem_observation_prefixes: [],
      filesystem_observation_mode: null,
      errors,
    };
  }
  const protectedFilesystem = await captureProtectedFilesystemSnapshot({
    repository_root: opts.invocation.repository_root,
    protected_prefixes: filesystemObservationPrefixes,
    capture_mode: filesystemObservationMode ?? "content_hash",
    excluded_roots: filesystemObservationExcludedRoots(opts.invocation),
  });
  return {
    git,
    bundle,
    prepared_artifact_digests: preparedArtifactDigests,
    protected_filesystem: protectedFilesystem,
    protected_paths: protectedPaths,
    filesystem_observation_prefixes: filesystemObservationPrefixes,
    filesystem_observation_mode: filesystemObservationMode,
    errors:
      protectedFilesystem.state === "available"
        ? errors
        : [
            ...errors,
            ...protectedFilesystem.errors.map((error) => protectedFilesystemError(error)),
          ],
  };
}
