import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  COMPATIBILITY_BASELINE_ID,
  COMPATIBILITY_CONTRACT_SCHEMA_VERSION,
  PUBLISHED_TAG,
  PUBLISHED_TAG_SHA,
  PUBLISHED_PACKAGES,
  TASK_PARENT_MAIN_SHA,
  assertGitRefMatchesSha,
  changedSurfaceSections,
  compatibilitySurfaceDigest,
  collectCompatibilitySurface,
  createGitSource,
  createWorktreeSource,
  diffJsonPaths,
  gitReferenceAvailable,
  hashJson,
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
  "v0.7-workflow-contract-candidate.json",
);

function readBaseline() {
  return JSON.parse(readFileSync(baselinePath, "utf8"));
}

function readCandidate() {
  return JSON.parse(readFileSync(candidatePath, "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertOnlyKeys(value, required, optional, label) {
  assert(value && typeof value === "object" && !Array.isArray(value), `${label}: object missing`);
  const allowed = new Set([...required, ...optional]);
  for (const key of Object.keys(value)) {
    assert(allowed.has(key), `${label}: unsupported field ${key}`);
  }
  for (const key of required) {
    assert(Object.hasOwn(value, key), `${label}: required field ${key} missing`);
  }
}

function validateRegistry(registry) {
  assert(registry?.source === "npm_registry", "published registry source must be npm_registry");
  assert(registry?.version === "0.6.24", "published registry version must be 0.6.24");
  assert(registry?.network_required_for_ci_check === false, "CI registry check must be offline");
  assert(registry?.network_used_for_capture === true, "registry capture provenance is missing");
  assert(/^\d{4}-\d{2}-\d{2}$/u.test(registry?.captured_on), "registry capture date is invalid");
  assert(Array.isArray(registry?.packages), "published registry packages are missing");
  assert(
    registry.packages.length === PUBLISHED_PACKAGES.length,
    "published registry package count drift",
  );
  let fileCount = 0;
  for (const [index, pkg] of registry.packages.entries()) {
    const expected = PUBLISHED_PACKAGES[index];
    assert(pkg.name === expected.name, `published registry package order/name drift at ${index}`);
    for (const field of ["version", "entry_count", "integrity", "shasum"]) {
      assert(pkg[field] === expected[field], `${pkg.name}: immutable published ${field} drift`);
    }
    assert(Array.isArray(pkg.files), `${pkg.name ?? "unknown"}: registry files are missing`);
    assert(pkg.entry_count === pkg.files.length, `${pkg.name}: entry_count drift`);
    assert(pkg.files_sha256 === hashJson(pkg.files), `${pkg.name}: files_sha256 drift`);
    assert(
      typeof pkg.integrity === "string" && pkg.integrity.startsWith("sha512-"),
      `${pkg.name}: integrity missing`,
    );
    assert(/^[a-f0-9]{40}$/u.test(pkg.shasum), `${pkg.name}: shasum missing`);
    fileCount += pkg.files.length;
  }
  return { packageCount: registry.packages.length, fileCount };
}

function validateSurface(surface, label) {
  const cli = surface?.cli_topology;
  assert(
    cli?.source === "source_command_catalog_rendered_as_help_json_all_structural",
    `${label}: CLI topology source drift`,
  );
  assert(Array.isArray(cli?.commands), `${label}: CLI command catalog is missing`);
  assert(cli.command_count === cli.commands.length, `${label}: CLI command count drift`);
  assert(cli.command_count >= 240, `${label}: CLI command coverage is unexpectedly narrow`);
  assert(cli.positional_count >= 160, `${label}: CLI positional coverage is unexpectedly narrow`);
  assert(cli.option_count >= 760, `${label}: CLI option coverage is unexpectedly narrow`);
  assert(cli.normalized_sha256 === hashJson(cli.commands), `${label}: CLI topology digest drift`);
  const visibilityCounts = {};
  for (const [commandIndex, command] of cli.commands.entries()) {
    const commandLabel = `${label}: CLI command ${commandIndex}`;
    assertOnlyKeys(command, ["id", "visibility", "group", "args", "options"], [], commandLabel);
    assert(Array.isArray(command.id) && command.id.length > 0, `${commandLabel}: id missing`);
    assert(Array.isArray(command.args), `${commandLabel}: args missing`);
    assert(Array.isArray(command.options), `${commandLabel}: options missing`);
    visibilityCounts[command.visibility] = (visibilityCounts[command.visibility] ?? 0) + 1;
    for (const [argIndex, arg] of command.args.entries()) {
      assertOnlyKeys(
        arg,
        ["name", "required", "variadic", "valueHint"],
        [],
        `${commandLabel} arg ${argIndex}`,
      );
    }
    for (const [optionIndex, option] of command.options.entries()) {
      assertOnlyKeys(
        option,
        ["name", "kind", "valueHint"],
        ["required", "default", "choices", "repeatable"],
        `${commandLabel} option ${optionIndex}`,
      );
    }
  }
  assert(
    hashJson(visibilityCounts) === hashJson(cli.visibility_counts),
    `${label}: CLI visibility counts drift`,
  );
  assert(
    cli.commands.some((command) => command.id?.join(" ") === "help"),
    `${label}: synthetic help command is missing`,
  );
  assert(
    cli.commands.some((command) => command.id?.join(" ") === "evaluator run"),
    `${label}: evaluator run command is missing`,
  );

  const machineOutput = surface?.machine_output_contract;
  assert(
    machineOutput?.success_envelope?.mode === "agent_json_v1",
    `${label}: success envelope drift`,
  );
  assert(machineOutput?.error_envelope?.root_field === "error", `${label}: error envelope drift`);
  assert(
    machineOutput.normalized_sha256 ===
      hashJson({
        scope: machineOutput.scope,
        success_envelope: machineOutput.success_envelope,
        error_envelope: machineOutput.error_envelope,
        source_contracts: machineOutput.source_contracts,
      }),
    `${label}: machine output digest drift`,
  );

  const context = surface?.agent_facing_context_contracts;
  assert(Array.isArray(context?.contracts), `${label}: context contracts are missing`);
  assert(context.contracts.length === 4, `${label}: context contract coverage drift`);
  assert(
    context.normalized_sha256 === hashJson(context.contracts),
    `${label}: context digest drift`,
  );

  const requiredManifestFields = [
    "type",
    "types",
    "main",
    "module",
    "dependencies",
    "peerDependencies",
    "optionalDependencies",
    "publishConfig",
    "license",
    "sideEffects",
  ];
  for (const manifest of surface?.package_manifests ?? []) {
    for (const field of requiredManifestFields) {
      assert(
        Object.hasOwn(manifest, field),
        `${label}: ${manifest.name ?? manifest.path} omits ${field}`,
      );
    }
  }
}

function validateBaseline(baseline) {
  assert(
    baseline.schema_version === COMPATIBILITY_CONTRACT_SCHEMA_VERSION,
    "compatibility baseline schema_version drift",
  );
  assert(baseline.baseline_id === COMPATIBILITY_BASELINE_ID, "compatibility baseline id drift");
  assert(
    baseline.references?.published_tag?.commit_sha === PUBLISHED_TAG_SHA,
    "published tag SHA drift",
  );
  assert(
    baseline.references?.exact_main?.commit_sha === TASK_PARENT_MAIN_SHA,
    "task-parent main SHA drift",
  );
  assert(baseline.ratchet?.reference === "exact_main", "ratchet must use exact_main");
  assert(
    baseline.ratchet?.comparison === "normalized_surface_exact",
    "ratchet comparison must remain exact",
  );

  for (const [digest, section] of Object.entries(baseline.sections ?? {})) {
    assert(hashJson(section) === digest, `frozen section digest mismatch: ${digest}`);
  }

  const publishedSurface = reconstructCompatibilitySurface(
    baseline.sections,
    baseline.references.published_tag.section_digests,
  );
  const exactMainSurface = reconstructCompatibilitySurface(
    baseline.sections,
    baseline.references.exact_main.section_digests,
  );
  assert(
    compatibilitySurfaceDigest(baseline.references.published_tag.section_digests) ===
      baseline.references.published_tag.surface_sha256,
    "published tag surface digest mismatch",
  );
  assert(
    compatibilitySurfaceDigest(baseline.references.exact_main.section_digests) ===
      baseline.references.exact_main.surface_sha256,
    "exact-main surface digest mismatch",
  );
  validateSurface(publishedSurface, "published tag");
  validateSurface(exactMainSurface, "exact main");
  const changedSections = changedSurfaceSections(publishedSurface, exactMainSurface);
  assert(
    hashJson(changedSections) === hashJson(baseline.preexisting_drift.changed_sections),
    "preexisting drift section inventory is stale",
  );
  assert(
    baseline.preexisting_drift.surface_changed ===
      (baseline.references.published_tag.surface_sha256 !==
        baseline.references.exact_main.surface_sha256),
    "preexisting drift surface_changed is stale",
  );
  assert(
    baseline.preexisting_drift.commit_sha_changed ===
      (baseline.references.published_tag.commit_sha !== baseline.references.exact_main.commit_sha),
    "preexisting drift commit_sha_changed is stale",
  );
  assert(
    baseline.ratchet.surface_sha256 === baseline.references.exact_main.surface_sha256,
    "ratchet digest does not point at exact-main surface",
  );
  return {
    exactMainSurface,
    registry: validateRegistry(baseline.published_registry),
  };
}

function validateReviewedCandidate({
  baseline,
  candidate,
  exactMainSurface,
  currentSurface,
  currentDigest,
  currentSectionDigests,
}) {
  assertOnlyKeys(
    candidate,
    ["schema_version", "candidate_id", "source_task", "base", "candidate", "review", "deltas"],
    [],
    "compatibility candidate",
  );
  assert(candidate.schema_version === 1, "compatibility candidate schema_version drift");
  assert(
    candidate.candidate_id === "agentplane.compatibility.v0.7.workflow-contract",
    "compatibility candidate id drift",
  );
  assert(candidate.source_task === "202607221846-4VB97J", "compatibility source task drift");

  assertOnlyKeys(
    candidate.base,
    ["baseline_id", "reference", "commit_sha", "surface_sha256"],
    [],
    "compatibility candidate base",
  );
  assert(candidate.base.baseline_id === baseline.baseline_id, "candidate baseline id drift");
  assert(candidate.base.reference === "exact_main", "candidate base reference must be exact_main");
  assert(
    candidate.base.commit_sha === baseline.references.exact_main.commit_sha,
    "candidate base commit drift",
  );
  assert(
    candidate.base.surface_sha256 === baseline.references.exact_main.surface_sha256,
    "candidate base surface drift",
  );

  assertOnlyKeys(
    candidate.candidate,
    ["surface_sha256", "section_digests"],
    [],
    "compatibility candidate surface",
  );
  assert(candidate.candidate.surface_sha256 === currentDigest, "candidate surface digest drift");
  assert(
    hashJson(candidate.candidate.section_digests) === hashJson(currentSectionDigests),
    "candidate section digest inventory drift",
  );

  assertOnlyKeys(
    candidate.review,
    ["state", "reviewed_by", "scope", "conditions"],
    [],
    "compatibility candidate review",
  );
  assert(candidate.review.state === "approved", "compatibility candidate is not approved");
  assert(candidate.review.reviewed_by === "ORCHESTRATOR", "candidate reviewer drift");
  assert(candidate.review.scope === "exact_delta_set", "candidate review scope drift");
  assert(
    hashJson(candidate.review.conditions) ===
      hashJson(["final_focused_tests_pass", "baseline_anchor_byte_identical"]),
    "candidate review conditions drift",
  );

  assert(Array.isArray(candidate.deltas), "compatibility candidate deltas are missing");
  const changedSections = changedSurfaceSections(exactMainSurface, currentSurface).toSorted();
  const deltaSections = candidate.deltas.map((delta) => delta.section).toSorted();
  assert(
    hashJson(deltaSections) === hashJson(changedSections),
    `candidate delta set drift: expected ${changedSections.join(", ")}, got ${deltaSections.join(", ")}`,
  );
  assert(new Set(deltaSections).size === deltaSections.length, "candidate delta sections repeat");

  for (const delta of candidate.deltas) {
    assertOnlyKeys(
      delta,
      ["section", "from_sha256", "to_sha256", "classification", "summary", "evidence"],
      [],
      `compatibility delta ${delta.section ?? "unknown"}`,
    );
    assert(
      delta.from_sha256 === baseline.references.exact_main.section_digests[delta.section],
      `${delta.section}: candidate from digest drift`,
    );
    assert(
      delta.to_sha256 === currentSectionDigests[delta.section],
      `${delta.section}: candidate to digest drift`,
    );
    assert(
      typeof delta.summary === "string" && delta.summary.length > 0,
      `${delta.section}: summary missing`,
    );
  }

  const cliDelta = candidate.deltas.find((delta) => delta.section === "cli_topology");
  const beforeCommands = new Set(
    exactMainSurface.cli_topology.commands.map((command) => command.id.join(" ")),
  );
  const afterCommands = new Set(
    currentSurface.cli_topology.commands.map((command) => command.id.join(" ")),
  );
  const addedCommands = [...afterCommands].filter((id) => !beforeCommands.has(id)).toSorted();
  const removedCommands = [...beforeCommands].filter((id) => !afterCommands.has(id)).toSorted();
  assert(cliDelta?.classification === "additive", "CLI candidate delta must be additive");
  assert(
    hashJson(cliDelta.evidence) ===
      hashJson({
        command_count: {
          from: exactMainSurface.cli_topology.command_count,
          to: currentSurface.cli_topology.command_count,
        },
        option_count: {
          from: exactMainSurface.cli_topology.option_count,
          to: currentSurface.cli_topology.option_count,
        },
        added_commands: addedCommands,
        removed_commands: removedCommands,
      }),
    "CLI candidate evidence drift",
  );
  assert(hashJson(addedCommands) === hashJson(["workflow migrate"]), "unexpected CLI addition");
  assert(removedCommands.length === 0, "candidate removes an existing CLI command");

  const schemaDelta = candidate.deltas.find((delta) => delta.section === "workflow_schema");
  const workflowSchema = JSON.parse(
    readFileSync(path.join(repoRoot, "schemas", "workflow.schema.json"), "utf8"),
  );
  const supportedInputVersions = (workflowSchema.anyOf ?? [])
    .map((branch) => branch?.properties?.version?.const)
    .filter((value) => Number.isInteger(value));
  assert(schemaDelta?.classification === "backward_compatible", "workflow schema review drift");
  assert(
    hashJson(schemaDelta.evidence) ===
      hashJson({
        schema_id: workflowSchema.$id,
        title: workflowSchema.title,
        supported_input_versions: supportedInputVersions,
      }),
    "workflow schema candidate evidence drift",
  );
  assert(hashJson(supportedInputVersions) === hashJson([1, 2]), "workflow schema versions drift");
  assert(
    currentSurface.workflow_schema.schema_id === exactMainSurface.workflow_schema.schema_id &&
      currentSurface.workflow_schema.title === exactMainSurface.workflow_schema.title &&
      currentSurface.workflow_schema.schema_uri === exactMainSurface.workflow_schema.schema_uri,
    "workflow schema identity drift is not approved",
  );

  const tarballDelta = candidate.deltas.find((delta) => delta.section === "tarball_policy");
  const packageName = "@agentplaneorg/core";
  const beforePackage = exactMainSurface.tarball_policy.packages.find(
    (pkg) => pkg.name === packageName,
  );
  const afterPackage = currentSurface.tarball_policy.packages.find(
    (pkg) => pkg.name === packageName,
  );
  assert(beforePackage && afterPackage, "core tarball policy package missing");
  const addedSourceFiles = afterPackage.source_files
    .filter((file) => !beforePackage.source_files.includes(file))
    .toSorted();
  const removedSourceFiles = beforePackage.source_files
    .filter((file) => !afterPackage.source_files.includes(file))
    .toSorted();
  assert(tarballDelta?.classification === "additive", "tarball candidate delta must be additive");
  assert(
    hashJson(tarballDelta.evidence) ===
      hashJson({
        package: packageName,
        source_file_count: {
          from: beforePackage.source_file_count,
          to: afterPackage.source_file_count,
        },
        added_source_files: addedSourceFiles,
        removed_source_files: removedSourceFiles,
      }),
    "tarball candidate evidence drift",
  );
  assert(
    hashJson(addedSourceFiles) === hashJson(["schemas/workflow.schema.json"]),
    "unexpected core tarball source-file addition",
  );
  assert(removedSourceFiles.length === 0, "candidate removes a core tarball source file");
}

function verifyLocalReferenceIfAvailable(ref, expectedDigest, expectedCommitSha = null) {
  if (!gitReferenceAvailable(repoRoot, ref)) return "offline-frozen";
  if (expectedCommitSha) assertGitRefMatchesSha(repoRoot, ref, expectedCommitSha);
  const surface = collectCompatibilitySurface(createGitSource(repoRoot, ref));
  const digest = compatibilitySurfaceDigest(surfaceSectionDigests(surface));
  assert(digest === expectedDigest, `${ref}: local Git surface differs from frozen reference`);
  return "verified-local";
}

try {
  const baseline = readBaseline();
  const { exactMainSurface, registry } = validateBaseline(baseline);
  const currentSurface = collectCompatibilitySurface(createWorktreeSource(repoRoot));
  validateSurface(currentSurface, "working tree");
  const currentSectionDigests = surfaceSectionDigests(currentSurface);
  const currentDigest = compatibilitySurfaceDigest(currentSectionDigests);
  const expectedDigest = baseline.references.exact_main.surface_sha256;
  let candidateStatus = "not-required";
  if (currentDigest !== expectedDigest) {
    try {
      const candidate = readCandidate();
      validateReviewedCandidate({
        baseline,
        candidate,
        exactMainSurface,
        currentSurface,
        currentDigest,
        currentSectionDigests,
      });
      candidateStatus = `approved:${candidate.candidate_id}`;
    } catch (error) {
      const sections = changedSurfaceSections(exactMainSurface, currentSurface);
      const paths = diffJsonPaths(exactMainSurface, currentSurface).slice(0, 20);
      throw new Error(
        [
          "compatibility contract ratchet failed against task-parent main.",
          `expected=${expectedDigest}`,
          `current=${currentDigest}`,
          `changed_sections=${sections.join(", ") || "unknown"}`,
          ...paths.map((entry) => `  - ${entry}`),
          `candidate=${error instanceof Error ? error.message : String(error)}`,
          "Record an exact reviewed candidate without modifying the immutable baseline anchor.",
        ].join("\n"),
      );
    }
  }

  const publishedStatus = verifyLocalReferenceIfAvailable(
    PUBLISHED_TAG,
    baseline.references.published_tag.surface_sha256,
    PUBLISHED_TAG_SHA,
  );
  const exactMainStatus = verifyLocalReferenceIfAvailable(TASK_PARENT_MAIN_SHA, expectedDigest);
  const driftLabel = baseline.preexisting_drift.surface_changed
    ? `surface:${baseline.preexisting_drift.changed_sections.join(",")}`
    : "commit-only";
  process.stdout.write(
    [
      "compatibility contract baseline OK",
      `current=${currentDigest}`,
      `candidate=${candidateStatus}`,
      `published_tag=${publishedStatus}`,
      `exact_main=${exactMainStatus}`,
      `preexisting_drift=${driftLabel}`,
      `cli=${currentSurface.cli_topology.command_count}commands/${currentSurface.cli_topology.positional_count}args/${currentSurface.cli_topology.option_count}options`,
      `npm_registry=offline-frozen:${registry.packageCount}packages/${registry.fileCount}files`,
    ].join(" ") + "\n",
  );
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
