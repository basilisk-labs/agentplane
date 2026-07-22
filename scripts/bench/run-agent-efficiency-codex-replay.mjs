import { createHash } from "node:crypto";
import { existsSync, readFileSync, watch, writeFileSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";

import { stableJson } from "../lib/agent-efficiency-baseline.mjs";
import { isDirectRun, parseScriptArgs } from "../lib/script-runtime.mjs";
import {
  ALLOWED_PATH,
  SCHEMA_PATH,
  WORK_DIRECTORY,
  buildReplayOutput,
  changedPaths,
  commitAll,
  createRoleTask,
  expectedAnchorPreparationCliCalls,
  git,
  initializeFixture,
  prepareEpisodeContext,
  writeCanonicalAtomic,
} from "./internal/agent-efficiency-anchor-supervisor.mjs";
import { buildAnchorRuntime } from "./internal/agent-efficiency-anchor-runtime.mjs";
import {
  CODEX_REPLAY_CLI_VERSION,
  ReplayDriverError,
  assertCodexBinary,
  fail,
  runCodexEpisode,
} from "./internal/agent-efficiency-codex-runtime.mjs";

export {
  expectedAnchorPreparationCliCalls,
  measurePreparedContext,
} from "./internal/agent-efficiency-anchor-supervisor.mjs";
export { buildAnchorProcessEnvironment } from "./internal/agent-efficiency-anchor-runtime.mjs";
export {
  CODEX_REPLAY_BINARY,
  CODEX_REPLAY_CLI_VERSION,
  CODEX_REPLAY_MODEL,
  CODEX_REPLAY_REASONING_EFFORT,
  CODEX_REPLAY_TURN_TIMEOUT_MS,
  acceptCodexJsonlLine,
  buildCodexReplayEnvironment,
  createCodexJsonlCollector,
  finalizeCodexJsonlCollector,
} from "./internal/agent-efficiency-codex-runtime.mjs";

const PROVIDER_FIELDS = ["input_tokens", "output_tokens", "reasoning_output_tokens"];

export const ANCHOR_CONTEXT_TELEMETRY = Object.freeze({
  context_search_latency_ms: null,
  retrieval_gaps: null,
  retrieval_hits: null,
  retrieval_recall_proxy: null,
});

const SCENARIO_BEHAVIOR = Object.freeze({
  direct: { target: "DIRECT_OK\n" },
  branch_pr: { target: "BRANCH_OK\n" },
  context_assimilation: { target: null },
  stale_state: { target: null },
  approval_required: { target: null },
  missing_knowledge: { target: null },
  evaluator_rework: { target: "REWORK_OK\n" },
  scope_violation: { target: "SCOPE_OK\n" },
  adapter_failure: { target: null },
  hermes_one_step: { target: "HERMES_OK\n" },
});

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function byteLength(value) {
  return Buffer.byteLength(value, "utf8");
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["scenario", "run-index", "output", "evidence-output"],
  });
  if (positionals.length > 0) fail("ARGUMENTS");
  const runIndex = Number.parseInt(flags["run-index"] ?? "", 10);
  if (!Number.isInteger(runIndex) || runIndex < 1) fail("RUN_INDEX");
  return {
    evidenceOutputPath: path.resolve(flags["evidence-output"] ?? ""),
    outputPath: path.resolve(flags.output ?? ""),
    runIndex,
    scenarioId: flags.scenario ?? "",
  };
}

export function buildEpisodeInstruction(scenarioId, episodeIndex, role) {
  const common = [
    "RF-04 deterministic episode contract:",
    `- act as ${role} for scenario ${scenarioId}, episode ${episodeIndex + 1};`,
    "- network access and external effects are forbidden;",
    "- work only in this fixture repository;",
    "- never inspect environment variables, auth, user directories, or parent directories;",
    "- return only the output-schema status object; the supervisor owns all outcomes.",
  ].join("\n");
  const action = {
    direct: "Set work/allowed.txt to exactly DIRECT_OK followed by one newline.",
    branch_pr:
      role === "EVALUATOR"
        ? "Inspect work/allowed.txt for exact BRANCH_OK content. Do not modify any file."
        : "Set work/allowed.txt to exactly BRANCH_OK followed by one newline.",
    missing_knowledge:
      "Check whether work/missing-context.txt exists. It is intentionally absent; do not modify any file.",
    evaluator_rework:
      role === "EVALUATOR"
        ? "Inspect work/allowed.txt against exact REWORK_OK content. Do not modify any file."
        : episodeIndex === 0
          ? "Set work/allowed.txt to exactly DRAFT followed by one newline."
          : "Replace work/allowed.txt with exactly REWORK_OK followed by one newline.",
    scope_violation: "Set work/allowed.txt to exactly SCOPE_OK followed by one newline.",
    adapter_failure:
      "Inspect rf04-control.json only. Do not modify any file; the supervisor injects the adapter receipt.",
    hermes_one_step: "Set work/allowed.txt to exactly HERMES_OK followed by one newline.",
  }[scenarioId];
  if (!action) fail("SCENARIO_EPISODE");
  return { common, prompt: `${common}\n${action}\n` };
}

export function composeEpisodePrompt(bootstrapBytes, instruction) {
  if (typeof bootstrapBytes !== "string" || bootstrapBytes.length === 0) {
    fail("EMPTY_PREPARED_BOOTSTRAP");
  }
  if (!instruction || typeof instruction.prompt !== "string") fail("EPISODE_INSTRUCTION");
  const prompt = `${bootstrapBytes}\n${instruction.prompt}`;
  return {
    bootstrap_sha256: sha256(bootstrapBytes),
    prompt,
    prompt_bytes: byteLength(prompt),
  };
}

export function partitionReplayClock({
  completedAt,
  firstMutationAt,
  harnessReadyAt,
  harnessStartedAt,
  preparationLatencyMs,
}) {
  const ordered = [harnessStartedAt, harnessReadyAt, preparationLatencyMs, completedAt];
  if (ordered.some((value) => !Number.isFinite(value))) fail("REPLAY_CLOCK_VALUE");
  if (
    harnessReadyAt < harnessStartedAt ||
    completedAt < harnessReadyAt ||
    preparationLatencyMs < 0 ||
    preparationLatencyMs > completedAt - harnessReadyAt ||
    (firstMutationAt !== null &&
      (!Number.isFinite(firstMutationAt) ||
        firstMutationAt < harnessReadyAt ||
        firstMutationAt > completedAt))
  ) {
    fail("REPLAY_CLOCK_ORDER");
  }
  return {
    harness_setup_latency_ms: Math.round(harnessReadyAt - harnessStartedAt),
    preparation_latency_ms: preparationLatencyMs,
    time_to_first_scoped_mutation_ms:
      firstMutationAt === null ? null : Math.round(firstMutationAt - harnessReadyAt),
    time_to_verified_result_ms: Math.round(completedAt - harnessReadyAt),
  };
}

function observeFirstScopedMutation(fixtureRoot) {
  let observedAt = null;
  let observationFailed = false;
  let watcher;
  try {
    watcher = watch(
      path.join(fixtureRoot, WORK_DIRECTORY),
      { persistent: false },
      (_, fileName) => {
        if (fileName === path.basename(ALLOWED_PATH) && observedAt === null) {
          observedAt = performance.now();
        }
      },
    );
    watcher.on("error", () => {
      observationFailed = true;
    });
  } catch {
    observationFailed = true;
  }
  return {
    close() {
      watcher?.close();
      return observationFailed ? null : observedAt;
    },
  };
}

function aggregateProviderUsage(episodeLedger, expectedRoles) {
  const result = Object.fromEntries(
    expectedRoles.map((role) => [
      role,
      {
        cached_input_tokens: 0,
        input_tokens: 0,
        output_tokens: 0,
        reasoning_output_tokens: 0,
      },
    ]),
  );
  for (const episode of episodeLedger) {
    for (const field of ["cached_input_tokens", ...PROVIDER_FIELDS]) {
      result[episode.role][field] += episode.provider_usage[field];
    }
  }
  return result;
}

function validateContract(options, registry) {
  const required = [
    "AGENTPLANE_RF04_REPLAY_ANCHOR",
    "AGENTPLANE_RF04_REPLAY_DRIVER_CONTRACT_VERSION",
    "AGENTPLANE_RF04_REPLAY_DRIVER_PATH",
    "AGENTPLANE_RF04_REPLAY_DRIVER_SHA256",
    "AGENTPLANE_RF04_REPLAY_EVIDENCE_PATH",
    "AGENTPLANE_RF04_REPLAY_EXPECTED_ROLES",
    "AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_SHA256",
    "AGENTPLANE_RF04_REPLAY_HARNESS_SHA256",
    "AGENTPLANE_RF04_REPLAY_RUN_ID",
  ];
  for (const name of required) {
    if (typeof process.env[name] !== "string" || process.env[name].length === 0) {
      fail("CONTRACT_ENV");
    }
  }
  const anchor = process.env.AGENTPLANE_RF04_REPLAY_ANCHOR;
  if (registry.provenance?.efficiency_anchor_commit !== anchor) fail("ANCHOR_CONTRACT");
  const scenario = registry.scenarios.find((item) => item.id === options.scenarioId);
  if (!scenario || !Object.hasOwn(SCENARIO_BEHAVIOR, options.scenarioId)) fail("SCENARIO");
  const runId = `${options.scenarioId}/run-${String(options.runIndex).padStart(2, "0")}`;
  if (process.env.AGENTPLANE_RF04_REPLAY_RUN_ID !== runId) fail("RUN_ID");
  const expectedRoles = [...new Set(scenario.expected_episode_trace)];
  let contractRoles;
  try {
    contractRoles = JSON.parse(process.env.AGENTPLANE_RF04_REPLAY_EXPECTED_ROLES);
  } catch {
    fail("EXPECTED_ROLES_JSON");
  }
  if (stableJson(contractRoles) !== stableJson(expectedRoles)) fail("EXPECTED_ROLES");
  if (
    path.resolve(process.env.AGENTPLANE_RF04_REPLAY_OUTPUT ?? "") !== options.outputPath ||
    path.resolve(process.env.AGENTPLANE_RF04_REPLAY_EVIDENCE_OUTPUT ?? "") !==
      options.evidenceOutputPath
  ) {
    fail("OUTPUT_CONTRACT");
  }
  return { anchor, expectedRoles, runId, scenario };
}

export async function runReplayDriver(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const subjectRoot = process.cwd();
  const registry = JSON.parse(
    readFileSync(path.join(subjectRoot, "scripts/bench/agent-efficiency-fixtures.json"), "utf8"),
  );
  const { anchor, expectedRoles, runId, scenario } = validateContract(options, registry);
  assertCodexBinary();
  const harnessStartedAt = performance.now();
  const cliPath = buildAnchorRuntime(subjectRoot, anchor);
  const counters = { anchorPreparationCliCalls: 0, metrics: {} };
  const fixtureRoot = initializeFixture(
    subjectRoot,
    options.scenarioId,
    options.runIndex,
    cliPath,
    counters,
  );
  const harnessReadyAt = performance.now();
  let preparationLatencyMs = 0;
  const measurePreparation = (operation) => {
    const startedAt = performance.now();
    try {
      return operation();
    } finally {
      preparationLatencyMs += performance.now() - startedAt;
    }
  };
  const roleTasks = Object.fromEntries(
    expectedRoles.map((role) => [
      role,
      measurePreparation(() =>
        createRoleTask(cliPath, fixtureRoot, options.scenarioId, role, counters),
      ),
    ]),
  );
  const preparationOnlyContexts = [];
  if (expectedRoles.length === 0) {
    const taskId = measurePreparation(() =>
      createRoleTask(cliPath, fixtureRoot, options.scenarioId, "ORCHESTRATOR", counters),
    );
    preparationOnlyContexts.push(
      measurePreparation(() => prepareEpisodeContext(cliPath, fixtureRoot, taskId, counters)),
    );
  }
  const episodeLedger = [];
  const allChangedPaths = new Set();
  let firstScopedMutationAt = null;
  let stdoutBytes = 0;
  let stderrBytes = 0;
  let bundleBytes = 0;
  let bootstrapBytes = 0;
  let promptBoilerplateBytes = 0;
  let fixtureInstructionBytes = 0;
  let promptInputBytes = 0;
  let duplicateInputBytes = 0;
  const preparedContextDigests = preparationOnlyContexts.map(
    (prepared) => prepared.telemetry.bootstrap_sha256,
  );
  const executedBootstrapDigests = [];
  const promptBoilerplateDefinitions = new Set();
  const promptBoilerplateSources = new Set();
  for (const prepared of preparationOnlyContexts) {
    bundleBytes += prepared.telemetry.bundle_bytes;
    bootstrapBytes += prepared.telemetry.bootstrap_bytes;
    duplicateInputBytes += prepared.telemetry.duplicate_input_bytes;
    promptBoilerplateBytes += prepared.telemetry.prompt_boilerplate_bytes;
    promptBoilerplateDefinitions.add(prepared.telemetry.prompt_boilerplate_definition);
    promptBoilerplateSources.add(prepared.telemetry.prompt_boilerplate_source);
  }
  for (const [episodeIndex, role] of scenario.expected_episode_trace.entries()) {
    const prepared = measurePreparation(() =>
      prepareEpisodeContext(cliPath, fixtureRoot, roleTasks[role], counters),
    );
    bundleBytes += prepared.telemetry.bundle_bytes;
    bootstrapBytes += prepared.telemetry.bootstrap_bytes;
    duplicateInputBytes += prepared.telemetry.duplicate_input_bytes;
    promptBoilerplateBytes += prepared.telemetry.prompt_boilerplate_bytes;
    promptBoilerplateDefinitions.add(prepared.telemetry.prompt_boilerplate_definition);
    promptBoilerplateSources.add(prepared.telemetry.prompt_boilerplate_source);
    const instruction = buildEpisodeInstruction(options.scenarioId, episodeIndex, role);
    const composed = composeEpisodePrompt(prepared.bootstrapBytes, instruction);
    preparedContextDigests.push(composed.bootstrap_sha256);
    executedBootstrapDigests.push(composed.bootstrap_sha256);
    promptInputBytes += composed.prompt_bytes;
    fixtureInstructionBytes += byteLength(instruction.prompt);
    const mutationObserver =
      firstScopedMutationAt === null ? observeFirstScopedMutation(fixtureRoot) : null;
    let result;
    try {
      result = await runCodexEpisode({
        fixtureRoot,
        prompt: composed.prompt,
        schemaPath: path.join(fixtureRoot, SCHEMA_PATH),
      });
    } finally {
      const observedAt = mutationObserver?.close() ?? null;
      if (firstScopedMutationAt === null && observedAt !== null) firstScopedMutationAt = observedAt;
    }
    stdoutBytes += result.stdout_bytes;
    stderrBytes += result.stderr_bytes;
    const episodePaths = changedPaths(fixtureRoot);
    for (const changedPath of episodePaths) allChangedPaths.add(changedPath);
    episodeLedger.push({
      episode_index: episodeIndex + 1,
      provider_usage: result.provider_usage,
      role,
    });
    commitAll(fixtureRoot, `RF-04 episode ${episodeIndex + 1}`);
  }
  const expectedCliCalls = expectedAnchorPreparationCliCalls(scenario.expected_episode_trace);
  if (counters.anchorPreparationCliCalls !== expectedCliCalls) {
    fail("ANCHOR_PREPARATION_CLI_COUNT");
  }

  let staleHeadDetected = false;
  let injectedScopeViolation = false;
  let injectedAdapterFailure = false;
  if (options.scenarioId === "stale_state") {
    const before = git(fixtureRoot, ["rev-parse", "HEAD"], "STALE_HEAD_BEFORE").trim();
    writeFileSync(path.join(fixtureRoot, WORK_DIRECTORY, "stale-marker.txt"), "STALE\n", "utf8");
    commitAll(fixtureRoot, "RF-04 injected stale head");
    const after = git(fixtureRoot, ["rev-parse", "HEAD"], "STALE_HEAD_AFTER").trim();
    staleHeadDetected = before !== after;
  }
  if (options.scenarioId === "scope_violation") {
    writeFileSync(path.join(fixtureRoot, WORK_DIRECTORY, "scope-leak.txt"), "INJECTED\n", "utf8");
    injectedScopeViolation = true;
    allChangedPaths.add(`${WORK_DIRECTORY}/scope-leak.txt`);
  }
  if (options.scenarioId === "adapter_failure") {
    writeFileSync(
      path.join(fixtureRoot, WORK_DIRECTORY, "adapter-failure.receipt"),
      "INJECTED_ADAPTER_FAILURE\n",
      "utf8",
    );
    injectedAdapterFailure = true;
  }

  const contextSearchStart = performance.now();
  const contextPath = path.join(fixtureRoot, WORK_DIRECTORY, "context.txt");
  const missingContextPath = path.join(fixtureRoot, WORK_DIRECTORY, "missing-context.txt");
  const contextRelevant =
    options.scenarioId === "context_assimilation" || options.scenarioId === "missing_knowledge";
  const retrievalGaps =
    options.scenarioId === "missing_knowledge" && !existsSync(missingContextPath) ? 1 : 0;
  const fixtureLookupLatencyMs = Math.round(performance.now() - contextSearchStart);
  const target = SCENARIO_BEHAVIOR[options.scenarioId].target;
  const targetMatched =
    target !== null && readFileSync(path.join(fixtureRoot, ALLOWED_PATH), "utf8") === target;
  const unexpectedPaths = [...allChangedPaths].filter(
    (changedPath) => changedPath !== ALLOWED_PATH,
  );
  const scopeViolation = unexpectedPaths.length > 0 || injectedScopeViolation;
  const verifiedSuccess =
    targetMatched &&
    !scopeViolation &&
    options.scenarioId !== "adapter_failure" &&
    options.scenarioId !== "missing_knowledge";
  const blocked =
    options.scenarioId === "stale_state" ||
    options.scenarioId === "approval_required" ||
    options.scenarioId === "missing_knowledge" ||
    options.scenarioId === "adapter_failure";
  const outcomes = {
    adapter_failure: injectedAdapterFailure,
    approval_respected: true,
    blocked,
    context_gap: options.scenarioId === "missing_knowledge" && retrievalGaps === 1,
    rework_required:
      options.scenarioId === "evaluator_rework" ||
      options.scenarioId === "stale_state" ||
      options.scenarioId === "missing_knowledge" ||
      options.scenarioId === "scope_violation" ||
      options.scenarioId === "adapter_failure" ||
      (target !== null && !targetMatched),
    scope_violation: scopeViolation,
    verified_success: verifiedSuccess,
  };
  const providerUsageByRole = aggregateProviderUsage(episodeLedger, expectedRoles);
  const completedAt = performance.now();
  const timing = partitionReplayClock({
    completedAt,
    firstMutationAt: firstScopedMutationAt,
    harnessReadyAt,
    harnessStartedAt,
    preparationLatencyMs,
  });
  const metrics = {
    bootstrap_bytes: bootstrapBytes,
    bundle_bytes: bundleBytes,
    duplicate_input_bytes: duplicateInputBytes,
    evidence_claimed_count: 0,
    evidence_observed_count: 1,
    evidence_observed_to_claimed_ratio: 1,
    lifecycle_calls: scenario.expected_lifecycle_trace.length,
    llm_episodes: episodeLedger.length,
    preparation_latency_ms: timing.preparation_latency_ms,
    prompt_boilerplate_bytes: promptBoilerplateBytes,
    prompt_count: episodeLedger.length,
    ...ANCHOR_CONTEXT_TELEMETRY,
    stderr_bytes: stderrBytes,
    stdout_bytes: stdoutBytes,
  };
  counters.metrics = metrics;
  const diagnostics = {
    captured_at: new Date().toISOString(),
    host_fingerprint: sha256(
      canonicalBytes({
        arch: process.arch,
        codex_cli_version: CODEX_REPLAY_CLI_VERSION,
        node: process.versions.node,
        platform: process.platform,
      }),
    ),
    latency_ms: {
      harness_setup_latency_ms: timing.harness_setup_latency_ms,
      time_to_first_scoped_mutation_ms: timing.time_to_first_scoped_mutation_ms,
      time_to_verified_result_ms: verifiedSuccess ? timing.time_to_verified_result_ms : null,
    },
  };
  const supervisorReceipt = {
    anchor_process_environment: "fixture_scoped_home_xdg_tmp_v1",
    anchor_preparation_cli_calls: counters.anchorPreparationCliCalls,
    anchor_cli_preparation: true,
    anchor_runtime_build: "typescript_plus_core_cli_bundle_manifest_v1",
    anchor_source_tree_committed: true,
    anchor_workspace_dependencies: "lock_matched_subject_local_links_v1",
    changed_paths: [...allChangedPaths].toSorted(),
    fixture_context_lookup: {
      context_exists: existsSync(contextPath),
      duration_ms: fixtureLookupLatencyMs,
      missing_context_exists: existsSync(missingContextPath),
      performed: contextRelevant,
    },
    external_effects: "fixture_backed",
    fixture_instruction_bytes: fixtureInstructionBytes,
    first_scoped_mutation_observation: "fs_watch_work_allowed_v1",
    first_scoped_mutation_observed: firstScopedMutationAt !== null,
    injected_adapter_failure: injectedAdapterFailure,
    injected_scope_violation: injectedScopeViolation,
    observed: true,
    executed_bootstrap_sha256: executedBootstrapDigests,
    prepared_context_sha256: preparedContextDigests,
    prompt_boilerplate_definition: [...promptBoilerplateDefinitions].toSorted(),
    prompt_boilerplate_source: [...promptBoilerplateSources].toSorted(),
    prompt_input_bytes: promptInputBytes,
    stale_head_detected: staleHeadDetected,
    target_matched: targetMatched,
  };
  const lifecycleControl = {
    call_count: scenario.expected_lifecycle_trace.length,
    provenance: "fixture_control",
    trace: scenario.expected_lifecycle_trace,
  };
  const driverIdentity = {
    contract_version: Number.parseInt(
      process.env.AGENTPLANE_RF04_REPLAY_DRIVER_CONTRACT_VERSION,
      10,
    ),
    path: process.env.AGENTPLANE_RF04_REPLAY_DRIVER_PATH,
    sha256: process.env.AGENTPLANE_RF04_REPLAY_DRIVER_SHA256,
  };
  const { envelope, evidenceBundle } = buildReplayOutput({
    anchor: process.env.AGENTPLANE_RF04_REPLAY_ANCHOR,
    counters,
    diagnostics,
    driverIdentity,
    episodeLedger,
    evidencePath: process.env.AGENTPLANE_RF04_REPLAY_EVIDENCE_PATH,
    fixtureDigest: process.env.AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_SHA256,
    harnessDigest: process.env.AGENTPLANE_RF04_REPLAY_HARNESS_SHA256,
    lifecycleControl,
    outcomes,
    providerUsageByRole,
    runId,
    runIndex: options.runIndex,
    scenarioId: options.scenarioId,
    supervisorReceipt,
  });
  writeCanonicalAtomic(options.evidenceOutputPath, evidenceBundle);
  writeCanonicalAtomic(options.outputPath, envelope);
}

if (isDirectRun(import.meta.url)) {
  runReplayDriver().catch((error) => {
    const code = error instanceof ReplayDriverError ? error.code : "UNEXPECTED";
    process.stderr.write(`RF04_DRIVER_ERROR:${code}\n`);
    process.exitCode = 1;
  });
}
