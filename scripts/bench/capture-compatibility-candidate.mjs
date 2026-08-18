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
  packageSurface,
  reconstructCompatibilitySurface,
  surfaceSectionDigests,
} from "../lib/compatibility-contract.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const baselinePath = path.join(
  repoRoot,
  "scripts",
  "baselines",
  "v0.6.24-compatibility-contract.json",
);
const candidatePath = path.join(
  repoRoot,
  "scripts",
  "baselines",
  "v0.7-compatibility-candidate.json",
);

function parseArgs(argv) {
  const options = { write: false, check: false, packageSourceTask: null };
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
    throw new Error(`Unknown argument: ${argument}`);
  }
  if (options.write && options.check) throw new Error("Use either --write or --check, not both");
  return options;
}

function withSourceTask(values, sourceTask) {
  if (!sourceTask || values.includes(sourceTask)) return values;
  return [...values, sourceTask];
}

function normalizePackageVersions(manifests, version) {
  return manifests.map((manifest) => {
    const normalized = structuredClone(manifest);
    delete normalized.path;
    delete normalized.normalized_sha256;
    normalized.version = version;
    if (manifest.path === "packages/agentplane/package.json") {
      normalized.dependencies["@agentplaneorg/core"] = version;
      normalized.dependencies["@agentplaneorg/recipes"] = version;
    }
    return packageSurface(manifest.path, normalized);
  });
}

function buildCandidate({ baseline, candidate, packageSourceTask }) {
  const baseSurface = reconstructCompatibilitySurface(
    baseline.sections,
    baseline.references.exact_main.section_digests,
  );
  const releaseSurface = collectCompatibilitySurface(createWorktreeSource(repoRoot));
  const releaseSectionDigests = surfaceSectionDigests(releaseSurface);
  const baseVersion = candidate.release_version_delta.from_version;
  const releaseVersion = releaseSurface.package_manifests[0]?.version;
  if (typeof releaseVersion !== "string" || releaseVersion.length === 0) {
    throw new Error("Unable to resolve the current release version from package manifests");
  }
  const preReleasePackageManifests = normalizePackageVersions(
    releaseSurface.package_manifests,
    baseVersion,
  );
  const preReleasePackageDigest = hashJson(preReleasePackageManifests);
  const candidateSectionDigests = {
    ...releaseSectionDigests,
    package_manifests: preReleasePackageDigest,
  };
  const releaseAllowedPaths = diffJsonPaths(
    preReleasePackageManifests,
    releaseSurface.package_manifests,
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

  return canonicalizeJson({
    ...candidate,
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
              addition_sources: delta.evidence.addition_sources,
            },
          }
        : {}),
      to_sha256: candidateSectionDigests[delta.section],
    })),
  });
}

try {
  const options = parseArgs(process.argv.slice(2));
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
