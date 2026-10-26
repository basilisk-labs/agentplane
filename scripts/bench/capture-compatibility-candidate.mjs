import { readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { format, resolveConfig } from "prettier";

import {
  canonicalizeJson,
  collectCompatibilitySurface,
  compatibilitySurfaceDigest,
  createWorktreeSource,
  diffCliTopology,
  diffJsonPaths,
  hashJson,
  reconstructCompatibilitySurface,
  surfaceSectionDigests,
} from "../lib/compatibility-contract.mjs";
import {
  normalizePackageVersions,
  reconstructHistoricalPackageSurface,
  reviewedPackageVersion,
} from "../lib/compatibility-incremental-package-delta.mjs";
import { resolveCompatibilityCandidatePath } from "../lib/compatibility-candidate-path.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const baselinePath = path.join(
  repoRoot,
  "scripts",
  "baselines",
  "v0.6.24-compatibility-contract.json",
);
function parseArgs(argv) {
  const options = { write: false, check: false, packageSourceTask: null, candidatePath: null };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--write") {
      options.write = true;
      continue;
    }
    if (argument === "--check") {
      options.check = true;
      continue;
    }
    if (argument === "--package-source-task") {
      const value = argv[index + 1]?.trim();
      if (!value) throw new Error("Missing value after --package-source-task");
      options.packageSourceTask = value;
      index += 1;
      continue;
    }
    if (argument === "--candidate-path") {
      const value = argv[index + 1]?.trim();
      if (!value) throw new Error("Missing value after --candidate-path");
      options.candidatePath = value;
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }
  if (options.write && options.check) throw new Error("Use either --write or --check, not both");
  return options;
}

function withSourceTask(values, sourceTask) {
  if (!sourceTask || values.includes(sourceTask)) return values;
  return [...values, sourceTask];
}

function verifyInternalVersionNormalization(manifests, baselineVersion) {
  const expected = hashJson(normalizePackageVersions(manifests, baselineVersion));
  const release = manifests.map((manifest) => {
    const next = structuredClone(manifest);
    next.version = "999.0.0";
    for (const name of ["@agentplaneorg/core", "@agentplaneorg/recipes"]) {
      if (Object.hasOwn(next.dependencies ?? {}, name)) next.dependencies[name] = next.version;
    }
    return next;
  });
  if (hashJson(normalizePackageVersions(release, baselineVersion)) !== expected) {
    throw new Error("Internal release version normalization drift");
  }
  const unexpected = structuredClone(manifests);
  unexpected.find((manifest) => manifest.path === "packages/recipes/package.json").dependencies[
    "@agentplaneorg/core"
  ] = "0.0.0-unreviewed";
  let rejected = false;
  try {
    normalizePackageVersions(unexpected, baselineVersion);
  } catch {
    rejected = true;
  }
  if (!rejected) throw new Error("Unexpected internal dependency version was normalized away");
}

function historicalReleaseSurface(releaseSurface, candidate) {
  const delta = candidate.incremental_package_delta;
  const reviewedVersion = reviewedPackageVersion(candidate);
  return delta
    ? reconstructHistoricalPackageSurface(releaseSurface, delta, reviewedVersion)
    : releaseSurface;
}

function buildCandidate({ baseline, candidate, packageSourceTask }) {
  const baseSurface = reconstructCompatibilitySurface(
    baseline.sections,
    baseline.references.exact_main.section_digests,
  );
  const releaseSurface = collectCompatibilitySurface(createWorktreeSource(repoRoot));
  const historicalSurface = historicalReleaseSurface(releaseSurface, candidate);
  const releaseSectionDigests = surfaceSectionDigests(historicalSurface);
  const baseVersion = candidate.release_version_delta.from_version;
  const releaseVersion = releaseSurface.package_manifests[0]?.version;
  if (typeof releaseVersion !== "string" || releaseVersion.length === 0) {
    throw new Error("Unable to resolve the current release version from package manifests");
  }
  verifyInternalVersionNormalization(historicalSurface.package_manifests, baseVersion);
  const preReleasePackageManifests = normalizePackageVersions(
    historicalSurface.package_manifests,
    baseVersion,
  );
  const preReleasePackageDigest = hashJson(preReleasePackageManifests);
  const candidateSectionDigests = {
    ...releaseSectionDigests,
    package_manifests: preReleasePackageDigest,
  };
  const releaseAllowedPaths = diffJsonPaths(
    preReleasePackageManifests,
    historicalSurface.package_manifests,
    "$.package_manifests",
  );
  const preReleaseAllowedPaths = diffJsonPaths(
    baseSurface.package_manifests,
    preReleasePackageManifests,
    "$.package_manifests",
  );
  const cliTopologyDelta = diffCliTopology(baseSurface, releaseSurface);
  const addedCommands = cliTopologyDelta.added_command_descriptors.map((command) =>
    command.id.join(" "),
  );
  const removedCommands = cliTopologyDelta.removed_command_descriptors.map((command) =>
    command.id.join(" "),
  );
  const addedCommandSet = new Set(addedCommands);
  const addedOptionSet = new Set(
    cliTopologyDelta.added_options.map((option) => `${option.command}\0${option.name}`),
  );

  return canonicalizeJson({
    ...candidate,
    ...(candidate.incremental_package_delta &&
    (Object.hasOwn(candidate, "incremental_package_delta_reviewed_version") ||
      releaseVersion !== candidate.release_version_delta.to_version)
      ? {
          incremental_package_delta_reviewed_version: reviewedPackageVersion(candidate),
        }
      : {}),
    source_tasks: withSourceTask(candidate.source_tasks, packageSourceTask),
    candidate: {
      surface_sha256: compatibilitySurfaceDigest(candidateSectionDigests),
      section_digests: candidateSectionDigests,
    },
    pre_release_package_delta: {
      ...candidate.pre_release_package_delta,
      source_tasks: withSourceTask(
        candidate.pre_release_package_delta.source_tasks,
        packageSourceTask,
      ),
      from_sha256: baseline.references.exact_main.section_digests.package_manifests,
      to_sha256: preReleasePackageDigest,
      allowed_json_paths: preReleaseAllowedPaths,
    },
    release_version_delta: {
      ...candidate.release_version_delta,
      to_version: releaseVersion,
      from_sha256: preReleasePackageDigest,
      to_sha256: releaseSectionDigests.package_manifests,
      surface_sha256: compatibilitySurfaceDigest(releaseSectionDigests),
      allowed_json_paths: releaseAllowedPaths,
    },
    deltas: candidate.deltas.map((delta) => ({
      ...delta,
      ...(delta.section === "cli_topology"
        ? {
            evidence: {
              command_count: {
                from: baseSurface.cli_topology.command_count,
                to: releaseSurface.cli_topology.command_count,
              },
              positional_count: {
                from: baseSurface.cli_topology.positional_count,
                to: releaseSurface.cli_topology.positional_count,
              },
              option_count: {
                from: baseSurface.cli_topology.option_count,
                to: releaseSurface.cli_topology.option_count,
              },
              added_commands: addedCommands,
              removed_commands: removedCommands,
              added_command_descriptors: cliTopologyDelta.added_command_descriptors,
              removed_command_descriptors: cliTopologyDelta.removed_command_descriptors,
              mutated_command_shells: cliTopologyDelta.mutated_command_shells,
              added_options: cliTopologyDelta.added_options,
              removed_options: cliTopologyDelta.removed_options,
              mutated_options: cliTopologyDelta.mutated_options,
              addition_sources: delta.evidence.addition_sources.filter((source) =>
                source.kind === "command"
                  ? addedCommandSet.has(source.command)
                  : addedOptionSet.has(`${source.command}\0${source.name}`),
              ),
            },
          }
        : {}),
      to_sha256: candidateSectionDigests[delta.section],
    })),
  });
}

try {
  const options = parseArgs(process.argv.slice(2));
  const candidatePath = resolveCompatibilityCandidatePath(repoRoot, options.candidatePath);
  const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
  const currentText = readFileSync(candidatePath, "utf8");
  const candidate = JSON.parse(currentText);
  const next = buildCandidate({
    baseline,
    candidate,
    packageSourceTask: options.packageSourceTask,
  });
  const prettierConfig = (await resolveConfig(candidatePath)) ?? {};
  const nextText = await format(JSON.stringify(next), {
    ...prettierConfig,
    filepath: candidatePath,
  });
  if (options.check) {
    if (nextText !== currentText)
      throw new Error("compatibility candidate is stale; run capture with --write");
    process.stdout.write("compatibility candidate is current\n");
  } else if (options.write) {
    const temporaryPath = `${candidatePath}.tmp`;
    writeFileSync(temporaryPath, nextText, "utf8");
    renameSync(temporaryPath, candidatePath);
    process.stdout.write(`wrote ${path.relative(repoRoot, candidatePath)}\n`);
  } else {
    process.stdout.write(nextText);
  }
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
