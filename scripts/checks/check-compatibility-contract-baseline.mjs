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
  const cliSourceTasks = [
    "202607221846-4VB97J",
    "202607221846-YGWMA2",
    "202607230554-YFYT83",
    "202607221846-9XC1H0",
    "202607221848-0ZAB1F",
    "202607221848-VC4VVS",
    "202607221849-NWVCAG",
    "202607260007-DQM6AW",
    "202607260532-9M7RNH",
  ];
  const expectedSourceTasks = [
    "202607221846-4VB97J",
    "202607221846-YGWMA2",
    "202607230554-YFYT83",
    "202607221846-9XC1H0",
    "202607221848-ABG7SD",
    "202607221848-0ZAB1F",
    "202607221848-ER5H6N",
    "202607221848-T9B3PS",
    "202607221848-1HWR0R",
    "202607221848-VC4VVS",
    "202607221849-NWVCAG",
    "202607260007-DQM6AW",
    "202607260532-9M7RNH",
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
    [
      "execution_receipt_schema",
      "core_execution_receipt_exports",
      "knowledge_ref_schema",
      "core_knowledge_ref_exports",
      "agent_work_order_schema",
      "core_agent_work_order_exports",
    ],
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
    executionReceiptArtifact.source_task === "202607221849-NWVCAG",
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
  const knowledgeRefArtifact = candidate.contract_artifacts.knowledge_ref_schema;
  assertOnlyKeys(
    knowledgeRefArtifact,
    ["path", "sha256", "comparison", "source_task"],
    [],
    "KnowledgeRef contract artifact",
  );
  assert(
    knowledgeRefArtifact.path === "schemas/knowledge-ref.schema.json",
    "KnowledgeRef contract artifact path drift",
  );
  assert(
    knowledgeRefArtifact.comparison === "canonical_json_exact",
    "KnowledgeRef contract artifact comparison drift",
  );
  assert(
    knowledgeRefArtifact.source_task === "202607221848-ER5H6N",
    "KnowledgeRef contract artifact source task drift",
  );
  const knowledgeRefSchema = JSON.parse(
    readFileSync(path.join(repoRoot, knowledgeRefArtifact.path), "utf8"),
  );
  assert(
    knowledgeRefArtifact.sha256 === hashJson(knowledgeRefSchema),
    "KnowledgeRef contract artifact digest drift",
  );
  assert(
    knowledgeRefSchema.$id === "https://agentplane.org/schemas/knowledge-ref.schema.json" &&
      knowledgeRefSchema.additionalProperties === false,
    "KnowledgeRef public schema identity or strictness drift",
  );
  const knowledgeRefExports = candidate.contract_artifacts.core_knowledge_ref_exports;
  assertOnlyKeys(
    knowledgeRefExports,
    ["comparison", "source_task", "entrypoints"],
    [],
    "core KnowledgeRef export contract",
  );
  assert(
    knowledgeRefExports.comparison === "required_named_reexports",
    "core KnowledgeRef export comparison drift",
  );
  assert(
    knowledgeRefExports.source_task === "202607221848-ER5H6N",
    "core KnowledgeRef export source task drift",
  );
  assert(
    Array.isArray(knowledgeRefExports.entrypoints) && knowledgeRefExports.entrypoints.length === 2,
    "core KnowledgeRef export entrypoints drift",
  );
  for (const [index, entrypoint] of knowledgeRefExports.entrypoints.entries()) {
    assertOnlyKeys(
      entrypoint,
      ["path", "module", "required_symbols"],
      [],
      `core KnowledgeRef export entrypoint ${index}`,
    );
    assert(
      Array.isArray(entrypoint.required_symbols) &&
        entrypoint.required_symbols.length > 0 &&
        hashJson(entrypoint.required_symbols) ===
          hashJson([...new Set(entrypoint.required_symbols)].toSorted()),
      `core KnowledgeRef export entrypoint ${index} symbols must be unique and sorted`,
    );
    const exported = new Set(collectNamedReexports(entrypoint));
    for (const symbol of entrypoint.required_symbols) {
      assert(
        exported.has(symbol),
        `${entrypoint.path}: required KnowledgeRef export missing: ${symbol}`,
      );
    }
  }

  const agentWorkOrderArtifact = candidate.contract_artifacts.agent_work_order_schema;
  assertOnlyKeys(
    agentWorkOrderArtifact,
    ["path", "sha256", "comparison", "source_task"],
    [],
    "AgentWorkOrder contract artifact",
  );
  assert(
    agentWorkOrderArtifact.path === "schemas/agent-work-order-v2.schema.json",
    "AgentWorkOrder contract artifact path drift",
  );
  assert(
    agentWorkOrderArtifact.comparison === "canonical_json_exact",
    "AgentWorkOrder contract artifact comparison drift",
  );
  assert(
    agentWorkOrderArtifact.source_task === "202607221848-T9B3PS",
    "AgentWorkOrder contract artifact source task drift",
  );
  const agentWorkOrderSchema = JSON.parse(
    readFileSync(path.join(repoRoot, agentWorkOrderArtifact.path), "utf8"),
  );
  assert(
    agentWorkOrderArtifact.sha256 === hashJson(agentWorkOrderSchema),
    "AgentWorkOrder contract artifact digest drift",
  );
  assert(
    agentWorkOrderSchema.$id === "https://agentplane.org/schemas/agent-work-order-v2.schema.json" &&
      agentWorkOrderSchema.additionalProperties === false,
    "AgentWorkOrder public schema identity or strictness drift",
  );
  const agentWorkOrderExports = candidate.contract_artifacts.core_agent_work_order_exports;
  assertOnlyKeys(
    agentWorkOrderExports,
    ["comparison", "source_task", "entrypoints"],
    [],
    "core AgentWorkOrder export contract",
  );
  assert(
    agentWorkOrderExports.comparison === "required_named_reexports",
    "core AgentWorkOrder export comparison drift",
  );
  assert(
    agentWorkOrderExports.source_task === "202607221848-T9B3PS",
    "core AgentWorkOrder export source task drift",
  );
  assert(
    Array.isArray(agentWorkOrderExports.entrypoints) &&
      agentWorkOrderExports.entrypoints.length === 4,
    "core AgentWorkOrder export entrypoints drift",
  );
  for (const [index, entrypoint] of agentWorkOrderExports.entrypoints.entries()) {
    assertOnlyKeys(
      entrypoint,
      ["path", "module", "required_symbols"],
      [],
      `core AgentWorkOrder export entrypoint ${index}`,
    );
    assert(
      Array.isArray(entrypoint.required_symbols) &&
        entrypoint.required_symbols.length > 0 &&
        hashJson(entrypoint.required_symbols) ===
          hashJson([...new Set(entrypoint.required_symbols)].toSorted()),
      `core AgentWorkOrder export entrypoint ${index} symbols must be unique and sorted`,
    );
    const exported = new Set(collectNamedReexports(entrypoint));
    for (const symbol of entrypoint.required_symbols) {
      assert(
        exported.has(symbol),
        `${entrypoint.path}: required AgentWorkOrder export missing: ${symbol}`,
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
    agent_facing_context_contracts: ["202607221848-1HWR0R"],
    cli_topology: cliSourceTasks,
    machine_output_contract: ["202607221848-ABG7SD"],
    workflow_schema: ["202607221846-4VB97J"],
    tarball_policy: ["202607221846-4VB97J", "202607221848-ER5H6N", "202607221848-T9B3PS"],
  };
  for (const delta of candidate.deltas) {
    assert(
      hashJson(delta.source_tasks) === hashJson(expectedDeltaSources[delta.section]),
      `${delta.section}: source task provenance drift`,
    );
  }

  const contextDelta = candidate.deltas.find(
    (delta) => delta.section === "agent_facing_context_contracts",
  );
  assert(contextDelta, "context task-creation receipt candidate delta missing");
  const beforeContextContracts = exactMainSurface.agent_facing_context_contracts.contracts;
  const afterContextContracts = currentSurface.agent_facing_context_contracts.contracts;
  const expectedContextContractPaths = [
    "packages/agentplane/src/runtime/sgr/context-extraction-contract.ts",
    "packages/agentplane/src/runtime/sgr/context-extraction-payloads.ts",
    "packages/agentplane/src/runtime/sgr/contract-types.ts",
    "packages/agentplane/src/context/ingest-task-pack.ts",
  ];
  assert(
    hashJson(beforeContextContracts.map((contract) => contract.path)) ===
      hashJson(expectedContextContractPaths),
    "baseline context contract paths drift",
  );
  assert(
    hashJson(afterContextContracts.map((contract) => contract.path)) ===
      hashJson(expectedContextContractPaths),
    "candidate context contract paths drift",
  );
  const beforeContextByPath = new Map(
    beforeContextContracts.map((contract) => [contract.path, contract]),
  );
  const changedContextContracts = afterContextContracts.filter((contract) => {
    const beforeContract = beforeContextByPath.get(contract.path);
    return (
      !beforeContract ||
      beforeContract.normalized_bytes !== contract.normalized_bytes ||
      beforeContract.normalized_sha256 !== contract.normalized_sha256
    );
  });
  assert(
    hashJson(changedContextContracts.map((contract) => contract.path)) ===
      hashJson(["packages/agentplane/src/context/ingest-task-pack.ts"]),
    "task-creation receipt must be the only changed context source contract",
  );
  const unchangedContextPaths = expectedContextContractPaths.filter(
    (contractPath) => contractPath !== "packages/agentplane/src/context/ingest-task-pack.ts",
  );
  for (const contractPath of unchangedContextPaths) {
    const beforeContract = beforeContextByPath.get(contractPath);
    const afterContract = afterContextContracts.find((contract) => contract.path === contractPath);
    assert(beforeContract && afterContract, `${contractPath}: context contract is missing`);
    assert(
      hashJson(beforeContract) === hashJson(afterContract),
      `${contractPath}: unrelated context contract drift`,
    );
  }
  const beforeContextSource = beforeContextByPath.get(
    "packages/agentplane/src/context/ingest-task-pack.ts",
  );
  const afterContextSource = afterContextContracts.find(
    (contract) => contract.path === "packages/agentplane/src/context/ingest-task-pack.ts",
  );
  assert(beforeContextSource && afterContextSource, "task-pack context source contract missing");
  const expectedContextReceiptEvidence = {
    contract_count: expectedContextContractPaths.length,
    unchanged_contract_paths: unchangedContextPaths,
    source_contract: {
      path: afterContextSource.path,
      before: {
        normalized_bytes: beforeContextSource.normalized_bytes,
        normalized_sha256: beforeContextSource.normalized_sha256,
      },
      after: {
        normalized_bytes: afterContextSource.normalized_bytes,
        normalized_sha256: afterContextSource.normalized_sha256,
      },
    },
    task_creation_receipt: {
      path: ".agentplane/tasks/<task-id>/task-creation.json",
      version: 1,
      required_fields: ["task_id", "revision", "backend_id", "artifact_paths"],
      written_before_task_pack: true,
      agent_mutability: "cli_owned_read_only",
    },
  };
  assert(
    contextDelta.classification === "additive",
    "task-creation receipt candidate classification drift",
  );
  assert(
    hashJson(contextDelta.evidence) === hashJson(expectedContextReceiptEvidence),
    "task-creation receipt candidate evidence drift",
  );
  const taskPackSource = readFileSync(
    path.join(repoRoot, "packages/agentplane/src/context/ingest-task-pack.ts"),
    "utf8",
  );
  const receiptWrite =
    "await writeContextTaskCreationReceipt({ root: opts.root, result: opts.creation });";
  const sourceSpanBuild =
    "const spans = await buildSourceSpanSkeleton({ root: opts.root, sources: opts.sources });";
  assert(
    /const CONTEXT_TASK_PACK_FILES = \[[\s\S]*?"task-creation\.json",/u.test(taskPackSource),
    "task-creation receipt is not part of the generated task-pack file set",
  );
  for (const requiredField of [
    "version: 1,",
    "task_id: opts.result.task_id",
    "revision: opts.result.revision",
    "backend_id: opts.result.backend_id",
    "artifact_paths: opts.result.artifact_paths",
  ]) {
    assert(
      taskPackSource.includes(requiredField),
      `task-creation receipt field missing: ${requiredField}`,
    );
  }
  assert(taskPackSource.includes(receiptWrite), "task-creation receipt write is missing");
  assert(
    taskPackSource.includes(sourceSpanBuild),
    "context task-pack source-span build is missing",
  );
  assert(
    taskPackSource.indexOf(receiptWrite) < taskPackSource.indexOf(sourceSpanBuild),
    "task-creation receipt must be written before task-pack generation",
  );
  const ingestTaskSource = readFileSync(
    path.join(repoRoot, "packages/agentplane/src/context/ingest-task.ts"),
    "utf8",
  );
  const immutableReceipt = "CLI-owned `task-creation.json` (treat it as immutable)";
  assert(
    ingestTaskSource.split(immutableReceipt).length - 1 === 2,
    "executor task contract must identify the immutable CLI-owned receipt twice",
  );
  const allowedOutputs =
    /const allowedOutputs = \[([\s\S]*?)\];/u.exec(ingestTaskSource)?.[1] ?? "";
  assert(
    !allowedOutputs.includes("task-creation.json"),
    "task-creation receipt must not become an executor writable output",
  );

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
      id: ["integrate", "queue", "adopt-legacy-protected-conflict"],
      visibility: "user",
      group: "PR",
      args: [
        {
          name: "task-id",
          required: true,
          variadic: false,
          valueHint: "<task-id>",
        },
      ],
      options: [
        {
          name: "expect-adoption-token",
          kind: "string",
          valueHint: "<sha256:...>",
        },
      ],
    },
    {
      id: ["pr", "conflict-rework"],
      visibility: "user",
      group: "PR",
      args: [
        {
          name: "task-id",
          required: true,
          variadic: false,
          valueHint: "<task-id>",
        },
      ],
      options: [
        { name: "expect-freshness-token", kind: "string", valueHint: "<sha256-token>" },
        { name: "json", kind: "boolean", valueHint: null, default: false },
      ],
    },
    {
      id: ["task", "authority", "grant"],
      visibility: "advanced",
      group: "Task",
      args: [
        {
          name: "task-id",
          required: true,
          variadic: false,
          valueHint: "<task-id>",
        },
      ],
      options: [
        { name: "operation", kind: "string", valueHint: "<operation-id>", required: true },
        { name: "operation-digest", kind: "string", valueHint: "<sha256>", required: true },
        { name: "state-fingerprint", kind: "string", valueHint: "<sha256>", required: true },
        { name: "state-scope-digest", kind: "string", valueHint: "<sha256>", required: true },
        { name: "by", kind: "string", valueHint: "<actor>", required: true },
        { name: "ttl-minutes", kind: "string", valueHint: "<1-60>" },
        { name: "remote", kind: "boolean", valueHint: null, default: false },
      ],
    },
    {
      id: ["task", "run", "reconcile"],
      visibility: "internal",
      group: "Task",
      args: [
        {
          name: "task-id",
          required: true,
          variadic: false,
          valueHint: "<task-id>",
        },
      ],
      options: [{ name: "json", kind: "boolean", valueHint: null, default: false }],
    },
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
      command: "backend sync",
      name: "adopt-projection-identity",
      kind: "boolean",
      valueHint: null,
      default: false,
    },
    {
      command: "backend sync",
      name: "bootstrap-projection",
      kind: "boolean",
      valueHint: null,
      default: false,
    },
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
      command: "hermes supervise",
      name: "remote",
      kind: "boolean",
      valueHint: null,
      default: false,
    },
    {
      command: "integrate queue adopt-legacy-protected-conflict",
      name: "expect-adoption-token",
      kind: "string",
      valueHint: "<sha256:...>",
    },
    {
      command: "pr conflict-rework",
      name: "expect-freshness-token",
      kind: "string",
      valueHint: "<sha256-token>",
    },
    {
      command: "pr conflict-rework",
      name: "json",
      kind: "boolean",
      valueHint: null,
      default: false,
    },
    {
      command: "sync",
      name: "adopt-projection-identity",
      kind: "boolean",
      valueHint: null,
      default: false,
    },
    {
      command: "sync",
      name: "bootstrap-projection",
      kind: "boolean",
      valueHint: null,
      default: false,
    },
    {
      command: "task authority grant",
      name: "by",
      kind: "string",
      valueHint: "<actor>",
      required: true,
    },
    {
      command: "task authority grant",
      name: "operation",
      kind: "string",
      valueHint: "<operation-id>",
      required: true,
    },
    {
      command: "task authority grant",
      name: "operation-digest",
      kind: "string",
      valueHint: "<sha256>",
      required: true,
    },
    {
      command: "task authority grant",
      name: "remote",
      kind: "boolean",
      valueHint: null,
      default: false,
    },
    {
      command: "task authority grant",
      name: "state-fingerprint",
      kind: "string",
      valueHint: "<sha256>",
      required: true,
    },
    {
      command: "task authority grant",
      name: "state-scope-digest",
      kind: "string",
      valueHint: "<sha256>",
      required: true,
    },
    {
      command: "task authority grant",
      name: "ttl-minutes",
      kind: "string",
      valueHint: "<1-60>",
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
      name: "remote",
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
      command: "task run reconcile",
      name: "json",
      kind: "boolean",
      valueHint: null,
      default: false,
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
    {
      kind: "command",
      command: "integrate queue adopt-legacy-protected-conflict",
      source_task: "202607260532-9M7RNH",
    },
    {
      kind: "command",
      command: "pr conflict-rework",
      source_task: "202607260007-DQM6AW",
    },
    {
      kind: "command",
      command: "task authority grant",
      source_task: "202607221849-NWVCAG",
    },
    {
      kind: "command",
      command: "task run reconcile",
      source_task: "202607221846-9XC1H0",
    },
    { kind: "command", command: "workflow migrate", source_task: "202607221846-4VB97J" },
    {
      kind: "option",
      command: "backend sync",
      name: "adopt-projection-identity",
      source_task: "202607221848-0ZAB1F",
    },
    {
      kind: "option",
      command: "backend sync",
      name: "bootstrap-projection",
      source_task: "202607221848-0ZAB1F",
    },
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
      command: "hermes supervise",
      name: "remote",
      source_task: "202607221848-VC4VVS",
    },
    {
      kind: "option",
      command: "integrate queue adopt-legacy-protected-conflict",
      name: "expect-adoption-token",
      source_task: "202607260532-9M7RNH",
    },
    {
      kind: "option",
      command: "pr conflict-rework",
      name: "expect-freshness-token",
      source_task: "202607260007-DQM6AW",
    },
    {
      kind: "option",
      command: "pr conflict-rework",
      name: "json",
      source_task: "202607260007-DQM6AW",
    },
    {
      kind: "option",
      command: "sync",
      name: "adopt-projection-identity",
      source_task: "202607221848-0ZAB1F",
    },
    {
      kind: "option",
      command: "sync",
      name: "bootstrap-projection",
      source_task: "202607221848-0ZAB1F",
    },
    {
      kind: "option",
      command: "task authority grant",
      name: "by",
      source_task: "202607221849-NWVCAG",
    },
    {
      kind: "option",
      command: "task authority grant",
      name: "operation",
      source_task: "202607221849-NWVCAG",
    },
    {
      kind: "option",
      command: "task authority grant",
      name: "operation-digest",
      source_task: "202607221849-NWVCAG",
    },
    {
      kind: "option",
      command: "task authority grant",
      name: "remote",
      source_task: "202607221849-NWVCAG",
    },
    {
      kind: "option",
      command: "task authority grant",
      name: "state-fingerprint",
      source_task: "202607221849-NWVCAG",
    },
    {
      kind: "option",
      command: "task authority grant",
      name: "state-scope-digest",
      source_task: "202607221849-NWVCAG",
    },
    {
      kind: "option",
      command: "task authority grant",
      name: "ttl-minutes",
      source_task: "202607221849-NWVCAG",
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
      name: "remote",
      source_task: "202607221848-VC4VVS",
    },
    {
      kind: "option",
      command: "task run",
      name: "sandbox",
      source_task: "202607221846-9XC1H0",
    },
    {
      kind: "option",
      command: "task run reconcile",
      name: "json",
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
  assert(
    hashJson(addedCommands) ===
      hashJson([
        "integrate queue adopt-legacy-protected-conflict",
        "pr conflict-rework",
        "task authority grant",
        "task run reconcile",
        "workflow migrate",
      ]),
    "unexpected CLI addition",
  );
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

  const machineOutputDelta = candidate.deltas.find(
    (delta) => delta.section === "machine_output_contract",
  );
  const beforeJsonErrorSource = exactMainSurface.machine_output_contract.source_contracts.find(
    (contract) => contract.marker === "formatJsonError",
  );
  const afterJsonErrorSource = currentSurface.machine_output_contract.source_contracts.find(
    (contract) => contract.marker === "formatJsonError",
  );
  assert(beforeJsonErrorSource && afterJsonErrorSource, "formatJsonError source contract missing");
  assert(
    machineOutputDelta?.classification === "behavior_preserving_hardening",
    "machine output candidate classification drift",
  );
  assert(
    hashJson(machineOutputDelta.evidence) ===
      hashJson({
        envelope_contract_unchanged:
          hashJson(exactMainSurface.machine_output_contract.error_envelope) ===
            hashJson(currentSurface.machine_output_contract.error_envelope) &&
          hashJson(exactMainSurface.machine_output_contract.success_envelope) ===
            hashJson(currentSurface.machine_output_contract.success_envelope),
        source_contract: {
          path: afterJsonErrorSource.path,
          marker: afterJsonErrorSource.marker,
          from_sha256: beforeJsonErrorSource.normalized_sha256,
          to_sha256: afterJsonErrorSource.normalized_sha256,
        },
        projected_nested_fields: {
          next_action: ["command", "reason", "reasonCode"],
          reason_decode: ["code", "category", "summary", "action"],
        },
      }),
    "machine output candidate evidence drift",
  );

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
    hashJson(addedSourceFiles) ===
      hashJson([
        "schemas/agent-work-order-v2.schema.json",
        "schemas/knowledge-ref.schema.json",
        "schemas/workflow.schema.json",
      ]),
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
