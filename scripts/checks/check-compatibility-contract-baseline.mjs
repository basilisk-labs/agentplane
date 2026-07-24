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
  diffCliTopology,
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
  "v0.7-compatibility-candidate.json",
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

function escapeRegExp(value) {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function collectNamedReexports(entrypoint) {
  const source = readFileSync(path.join(repoRoot, entrypoint.path), "utf8");
  const pattern = new RegExp(
    String.raw`export\s*\{([^}]*)\}\s*from\s*["']${escapeRegExp(entrypoint.module)}["']`,
    "gu",
  );
  const names = [];
  for (const match of source.matchAll(pattern)) {
    for (const rawEntry of match[1].split(",")) {
      const entry = rawEntry.trim().replace(/^type\s+/u, "");
      if (!entry) continue;
      const alias = entry.split(/\s+as\s+/u);
      names.push(alias.at(-1));
    }
  }
  return [...new Set(names)].toSorted();
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
    [
      "schema_version",
      "candidate_id",
      "source_tasks",
      "base",
      "candidate",
      "contract_artifacts",
      "review",
      "deltas",
    ],
    [],
    "compatibility candidate",
  );
  assert(candidate.schema_version === 2, "compatibility candidate schema_version drift");
  assert(
    candidate.candidate_id === "agentplane.compatibility.v0.7.cumulative",
    "compatibility candidate id drift",
  );
  const expectedSourceTasks = [
    "202607221846-4VB97J",
    "202607221846-YGWMA2",
    "202607230554-YFYT83",
    "202607221846-9XC1H0",
  ];
  assert(
    hashJson(candidate.source_tasks) === hashJson(expectedSourceTasks),
    "compatibility source task inventory drift",
  );

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
    candidate.contract_artifacts,
    ["execution_receipt_schema", "core_execution_receipt_exports"],
    [],
    "compatibility candidate contract artifacts",
  );
  const executionReceiptArtifact = candidate.contract_artifacts.execution_receipt_schema;
  assertOnlyKeys(
    executionReceiptArtifact,
    ["path", "sha256", "comparison", "source_task"],
    [],
    "execution receipt contract artifact",
  );
  assert(
    executionReceiptArtifact.path === "schemas/execution-receipt.schema.json",
    "execution receipt contract artifact path drift",
  );
  assert(
    executionReceiptArtifact.comparison === "canonical_json_exact",
    "execution receipt contract artifact comparison drift",
  );
  assert(
    executionReceiptArtifact.source_task === "202607221846-9XC1H0",
    "execution receipt contract artifact source task drift",
  );
  const executionReceiptSchema = JSON.parse(
    readFileSync(path.join(repoRoot, executionReceiptArtifact.path), "utf8"),
  );
  assert(
    executionReceiptArtifact.sha256 === hashJson(executionReceiptSchema),
    "execution receipt contract artifact digest drift",
  );
  const executionReceiptExports = candidate.contract_artifacts.core_execution_receipt_exports;
  assertOnlyKeys(
    executionReceiptExports,
    ["comparison", "source_task", "entrypoints"],
    [],
    "core execution receipt export contract",
  );
  assert(
    executionReceiptExports.comparison === "required_named_reexports",
    "core execution receipt export comparison drift",
  );
  assert(
    executionReceiptExports.source_task === "202607221846-9XC1H0",
    "core execution receipt export source task drift",
  );
  assert(
    Array.isArray(executionReceiptExports.entrypoints) &&
      executionReceiptExports.entrypoints.length === 2,
    "core execution receipt export entrypoints drift",
  );
  for (const [index, entrypoint] of executionReceiptExports.entrypoints.entries()) {
    assertOnlyKeys(
      entrypoint,
      ["path", "module", "required_symbols"],
      [],
      `core execution receipt export entrypoint ${index}`,
    );
    assert(
      Array.isArray(entrypoint.required_symbols) &&
        entrypoint.required_symbols.length > 0 &&
        hashJson(entrypoint.required_symbols) ===
          hashJson([...new Set(entrypoint.required_symbols)].toSorted()),
      `core execution receipt export entrypoint ${index} symbols must be unique and sorted`,
    );
    const exported = new Set(collectNamedReexports(entrypoint));
    for (const symbol of entrypoint.required_symbols) {
      assert(
        exported.has(symbol),
        `${entrypoint.path}: required execution receipt export missing: ${symbol}`,
      );
    }
  }

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
      hashJson([
        "final_focused_tests_pass",
        "baseline_anchor_byte_identical",
        "source_task_provenance_exact",
      ]),
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
      [
        "section",
        "source_tasks",
        "from_sha256",
        "to_sha256",
        "classification",
        "summary",
        "evidence",
      ],
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
  const expectedDeltaSources = {
    cli_topology: expectedSourceTasks,
    workflow_schema: ["202607221846-4VB97J"],
    tarball_policy: ["202607221846-4VB97J"],
  };
  for (const delta of candidate.deltas) {
    assert(
      hashJson(delta.source_tasks) === hashJson(expectedDeltaSources[delta.section]),
      `${delta.section}: source task provenance drift`,
    );
  }

  const cliDelta = candidate.deltas.find((delta) => delta.section === "cli_topology");
  const cliTopologyDelta = diffCliTopology(exactMainSurface, currentSurface);
  const addedCommands = cliTopologyDelta.added_command_descriptors.map((command) =>
    command.id.join(" "),
  );
  const removedCommands = cliTopologyDelta.removed_command_descriptors.map((command) =>
    command.id.join(" "),
  );
  const expectedAddedCommandDescriptors = [
    {
      id: ["workflow", "migrate"],
      visibility: "user",
      group: "Workflow",
      args: [],
      options: [
        { name: "dry-run", kind: "boolean", valueHint: null, default: false },
        { name: "rollback", kind: "string", valueHint: "<receipt-path>" },
      ],
    },
  ];
  const expectedAddedOptions = [
    {
      command: "cleanup merged",
      name: "task-id",
      kind: "string",
      valueHint: "<task-id>",
      repeatable: true,
    },
    {
      command: "evaluator run",
      name: "provenance",
      kind: "string",
      valueHint: "<human_supplied|evaluator_supplied>",
      choices: ["human_supplied", "evaluator_supplied"],
    },
    {
      command: "task run",
      name: "allow-danger-full-access",
      kind: "boolean",
      valueHint: null,
      default: false,
    },
    {
      command: "task run",
      name: "sandbox",
      kind: "string",
      valueHint: "<read-only|workspace-write|danger-full-access>",
      choices: ["read-only", "workspace-write", "danger-full-access"],
    },
    {
      command: "workflow migrate",
      name: "dry-run",
      kind: "boolean",
      valueHint: null,
      default: false,
    },
    {
      command: "workflow migrate",
      name: "rollback",
      kind: "string",
      valueHint: "<receipt-path>",
    },
  ];
  const expectedAdditionSources = [
    { kind: "command", command: "workflow migrate", source_task: "202607221846-4VB97J" },
    {
      kind: "option",
      command: "cleanup merged",
      name: "task-id",
      source_task: "202607230554-YFYT83",
    },
    {
      kind: "option",
      command: "evaluator run",
      name: "provenance",
      source_task: "202607221846-YGWMA2",
    },
    {
      kind: "option",
      command: "task run",
      name: "allow-danger-full-access",
      source_task: "202607221846-9XC1H0",
    },
    {
      kind: "option",
      command: "task run",
      name: "sandbox",
      source_task: "202607221846-9XC1H0",
    },
    {
      kind: "option",
      command: "workflow migrate",
      name: "dry-run",
      source_task: "202607221846-4VB97J",
    },
    {
      kind: "option",
      command: "workflow migrate",
      name: "rollback",
      source_task: "202607221846-4VB97J",
    },
  ];
  assert(cliDelta?.classification === "additive", "CLI candidate delta must be additive");
  assert(
    hashJson(cliDelta.evidence) ===
      hashJson({
        command_count: {
          from: exactMainSurface.cli_topology.command_count,
          to: currentSurface.cli_topology.command_count,
        },
        positional_count: {
          from: exactMainSurface.cli_topology.positional_count,
          to: currentSurface.cli_topology.positional_count,
        },
        option_count: {
          from: exactMainSurface.cli_topology.option_count,
          to: currentSurface.cli_topology.option_count,
        },
        added_commands: addedCommands,
        removed_commands: removedCommands,
        added_command_descriptors: cliTopologyDelta.added_command_descriptors,
        removed_command_descriptors: cliTopologyDelta.removed_command_descriptors,
        mutated_command_shells: cliTopologyDelta.mutated_command_shells,
        added_options: cliTopologyDelta.added_options,
        removed_options: cliTopologyDelta.removed_options,
        mutated_options: cliTopologyDelta.mutated_options,
        addition_sources: expectedAdditionSources,
      }),
    "CLI candidate evidence drift",
  );
  assert(hashJson(addedCommands) === hashJson(["workflow migrate"]), "unexpected CLI addition");
  assert(
    hashJson(cliTopologyDelta.added_command_descriptors) ===
      hashJson(expectedAddedCommandDescriptors),
    "new CLI command descriptor is not in the approved delta",
  );
  assert(
    hashJson(cliTopologyDelta.added_options) === hashJson(expectedAddedOptions),
    "CLI option addition is not in the approved delta",
  );
  assert(
    hashJson(cliDelta.evidence.addition_sources) === hashJson(expectedAdditionSources),
    "CLI addition source-task provenance drift",
  );
  assert(removedCommands.length === 0, "candidate removes an existing CLI command");
  assert(
    cliTopologyDelta.removed_command_descriptors.length === 0,
    "candidate removes an existing CLI command descriptor",
  );
  assert(
    cliTopologyDelta.mutated_command_shells.length === 0,
    "candidate mutates an existing CLI command shell",
  );
  assert(cliTopologyDelta.removed_options.length === 0, "candidate removes an existing CLI option");
  assert(cliTopologyDelta.mutated_options.length === 0, "candidate mutates an existing CLI option");

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
