import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat } from "node:fs/promises";
import path from "node:path";

import type { ExecutionReceiptArtifactObservation } from "@agentplaneorg/core/schemas";

import type { RunnerResultArtifact } from "../types.js";

const OBSERVED_PROVENANCE = "supervisor_observed" as const;

type ArtifactIdentity = {
  dev: number;
  ino: number;
  size: number;
  mtime_ms: number;
};

export type ObservedRunnerArtifacts = {
  observations: ExecutionReceiptArtifactObservation[];
  errors: string[];
};

function fileIdentity(stat: Awaited<ReturnType<typeof lstat>>): ArtifactIdentity {
  return {
    dev: Number(stat.dev),
    ino: Number(stat.ino),
    size: Number(stat.size),
    mtime_ms: Number(stat.mtimeMs),
  };
}

function identitiesMatch(left: ArtifactIdentity, right: ArtifactIdentity): boolean {
  return (
    left.dev === right.dev &&
    left.ino === right.ino &&
    left.size === right.size &&
    left.mtime_ms === right.mtime_ms
  );
}

async function sha256File(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  await new Promise<void>((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("error", reject);
    stream.on("end", resolve);
  });
  return `sha256:${hash.digest("hex")}`;
}

function normalizeSpecs(
  artifacts: RunnerResultArtifact[],
  excludedPaths: ReadonlySet<string>,
): RunnerResultArtifact[] {
  const unique = new Map<string, RunnerResultArtifact>();
  for (const artifact of artifacts) {
    const normalized = path.resolve(artifact.path);
    if (excludedPaths.has(normalized)) continue;
    if (!unique.has(normalized)) {
      unique.set(normalized, {
        path: normalized,
        ...(artifact.label ? { label: artifact.label } : {}),
      });
    }
  }
  return [...unique.values()].toSorted((left, right) => left.path.localeCompare(right.path));
}

async function observeArtifact(opts: {
  artifact: RunnerResultArtifact;
  required: boolean;
  expected_sha256?: string;
}): Promise<{ observation: ExecutionReceiptArtifactObservation; error?: string }> {
  const base = {
    provenance: OBSERVED_PROVENANCE,
    path: opts.artifact.path,
    ...(opts.artifact.label ? { label: opts.artifact.label } : {}),
    required: opts.required,
  } as const;
  let before: Awaited<ReturnType<typeof lstat>>;
  try {
    before = await lstat(opts.artifact.path);
  } catch (err) {
    if ((err as NodeJS.ErrnoException | null)?.code === "ENOENT") {
      return {
        observation: {
          ...base,
          state: "missing",
          bytes: null,
          sha256: null,
        },
        ...(opts.required ? { error: `required artifact is missing: ${opts.artifact.path}` } : {}),
      };
    }
    throw err;
  }

  if (!before.isFile() || before.isSymbolicLink()) {
    return {
      observation: {
        ...base,
        state: "unsupported",
        bytes: null,
        sha256: null,
      },
      ...(opts.required
        ? { error: `required artifact is not a regular file: ${opts.artifact.path}` }
        : {}),
    };
  }

  const beforeIdentity = fileIdentity(before);
  const digest = await sha256File(opts.artifact.path);
  const after = await lstat(opts.artifact.path);
  if (
    !after.isFile() ||
    after.isSymbolicLink() ||
    !identitiesMatch(beforeIdentity, fileIdentity(after))
  ) {
    return {
      observation: {
        ...base,
        state: "unsupported",
        bytes: null,
        sha256: null,
      },
      error: `artifact changed while it was observed: ${opts.artifact.path}`,
    };
  }

  const mismatch =
    opts.expected_sha256 !== undefined && opts.expected_sha256 !== digest
      ? `artifact digest mismatch for ${opts.artifact.path}: expected ${opts.expected_sha256}, observed ${digest}`
      : undefined;
  return {
    observation: {
      ...base,
      state: "present",
      bytes: after.size,
      sha256: digest,
    },
    ...(mismatch ? { error: mismatch } : {}),
  };
}

export async function observeRunnerArtifacts(opts: {
  artifacts: RunnerResultArtifact[];
  excluded_paths?: string[];
  optional_labels?: string[];
  expected_sha256_by_path?: ReadonlyMap<string, string>;
}): Promise<ObservedRunnerArtifacts> {
  const excludedPaths = new Set((opts.excluded_paths ?? []).map((entry) => path.resolve(entry)));
  const optionalLabels = new Set(opts.optional_labels);
  const observations: ExecutionReceiptArtifactObservation[] = [];
  const errors: string[] = [];

  for (const artifact of normalizeSpecs(opts.artifacts, excludedPaths)) {
    const observed = await observeArtifact({
      artifact,
      required: !artifact.label || !optionalLabels.has(artifact.label),
      expected_sha256: opts.expected_sha256_by_path?.get(path.resolve(artifact.path)),
    });
    observations.push(observed.observation);
    if (observed.error) errors.push(observed.error);
  }

  return { observations, errors };
}
