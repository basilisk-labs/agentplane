import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import {
  OUTCOME_FIELDS,
  SCALAR_TELEMETRY_FIELDS,
  duplicateInputBytes,
  stableJson,
} from "../../lib/agent-efficiency-baseline.mjs";
import {
  AGENT_EFFICIENCY_REPLAY_EVIDENCE_MODE,
  AGENT_EFFICIENCY_REPLAY_MODE,
  AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION,
} from "../../lib/agent-efficiency-replay.mjs";
import {
  CODEX_REPLAY_CLI_VERSION,
  CODEX_REPLAY_MODEL,
  CODEX_REPLAY_REASONING_EFFORT,
  fail,
  runSanitizedCommand,
} from "./agent-efficiency-codex-runtime.mjs";
import {
  buildAnchorGitEnvironment,
  prepareAnchorProcessEnvironment,
} from "./agent-efficiency-anchor-runtime.mjs";

export const FIXTURE_DIRECTORY = ".rf04-fixture";
export const WORK_DIRECTORY = "work";
export const ALLOWED_PATH = `${WORK_DIRECTORY}/allowed.txt`;
export const SCHEMA_PATH = ".rf04-runtime/final.schema.json";

const FINAL_SCHEMA = Object.freeze({
  additionalProperties: false,
  properties: {
    status: { enum: ["blocked", "done", "reviewed"] },
  },
  required: ["status"],
  type: "object",
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

function integer(value, code) {
  if (!Number.isInteger(value) || value < 0) fail(code);
  return value;
}

export function git(cwd, args, code = "GIT_COMMAND") {
  return runSanitizedCommand("/usr/bin/git", args, {
    code,
    cwd,
    env: buildAnchorGitEnvironment(),
  });
}

export function commitAll(cwd, message) {
  git(cwd, ["add", "-f", "-A"], "GIT_STAGE");
  git(cwd, ["commit", "--quiet", "--allow-empty", "-m", message], "GIT_COMMIT");
}

export function changedPaths(cwd) {
  const tracked = git(cwd, ["diff", "--name-only", "-z", "HEAD"], "GIT_DIFF_PATHS");
  const untracked = git(
    cwd,
    ["ls-files", "--others", "--exclude-standard", "-z"],
    "GIT_UNTRACKED_PATHS",
  );
  return [...new Set(`${tracked}${untracked}`.split("\0").filter(Boolean))].toSorted();
}

function fixtureCandidatePath(fixtureRoot, candidate, code) {
  if (typeof candidate !== "string" || candidate.length === 0) fail(code);
  const root = path.resolve(realpathSync(fixtureRoot));
  const resolved = path.resolve(fixtureRoot, candidate);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) fail(code);
  return { resolved, root };
}

function fixtureFilePath(fixtureRoot, candidate, code) {
  const { resolved, root } = fixtureCandidatePath(fixtureRoot, candidate, code);
  const stats = lstatSync(resolved, { throwIfNoEntry: false });
  if (!stats?.isFile() || stats.isSymbolicLink()) fail(code);
  const real = path.resolve(realpathSync(resolved));
  if (!real.startsWith(`${root}${path.sep}`)) fail(code);
  return real;
}

export function agentplane(cliPath, fixtureRoot, args, code, counters) {
  const result = runSanitizedCommand(process.execPath, [cliPath, ...args], {
    code,
    cwd: fixtureRoot,
    env: prepareAnchorProcessEnvironment(fixtureRoot),
  });
  if (counters) counters.anchorPreparationCliCalls += 1;
  return result;
}

export function initializeFixture(subjectRoot, scenarioId, runIndex, cliPath, counters) {
  const fixtureRoot = path.join(subjectRoot, FIXTURE_DIRECTORY);
  mkdirSync(path.join(fixtureRoot, WORK_DIRECTORY), { recursive: true });
  writeFileSync(path.join(fixtureRoot, ALLOWED_PATH), "INITIAL\n", "utf8");
  if (scenarioId === "context_assimilation") {
    writeFileSync(path.join(fixtureRoot, WORK_DIRECTORY, "context.txt"), "KNOWN_CONTEXT\n", "utf8");
  }
  mkdirSync(path.join(fixtureRoot, path.dirname(SCHEMA_PATH)), { recursive: true });
  writeFileSync(path.join(fixtureRoot, SCHEMA_PATH), canonicalBytes(FINAL_SCHEMA), "utf8");
  writeFileSync(
    path.join(fixtureRoot, "rf04-control.json"),
    canonicalBytes({ run_index: runIndex, scenario_id: scenarioId }),
    "utf8",
  );
  git(fixtureRoot, ["init", "--quiet"], "FIXTURE_GIT_INIT");
  git(fixtureRoot, ["config", "core.hooksPath", "/dev/null"], "FIXTURE_GIT_HOOKS");
  git(fixtureRoot, ["config", "user.name", "AgentPlane RF-04 Supervisor"], "FIXTURE_GIT_USER");
  git(fixtureRoot, ["config", "user.email", "rf04-supervisor@invalid.local"], "FIXTURE_GIT_EMAIL");
  commitAll(fixtureRoot, "RF-04 deterministic fixture");
  agentplane(
    cliPath,
    fixtureRoot,
    [
      "init",
      "--setup-profile",
      "light",
      "--tool",
      "codex",
      "--workflow",
      "direct",
      "--hooks",
      "false",
      "--require-plan-approval",
      "false",
      "--require-network-approval",
      "true",
      "--recipes",
      "none",
      "--blueprints",
      "none",
      "--yes",
    ],
    "ANCHOR_INIT",
    counters,
  );
  commitAll(fixtureRoot, "RF-04 AgentPlane initialization");
  return fixtureRoot;
}

export function createRoleTask(cliPath, fixtureRoot, scenarioId, role, counters) {
  const taskId = agentplane(
    cliPath,
    fixtureRoot,
    [
      "task",
      "new",
      "--title",
      `RF-04 ${scenarioId} ${role}`,
      "--description",
      `Execute the deterministic ${scenarioId} fixture episode as ${role}.`,
      "--owner",
      role,
      "--priority",
      "med",
      "--tag",
      "rf04",
      "--verify",
      "Supervisor checks the exact fixture receipt.",
    ],
    "ANCHOR_TASK_NEW",
    counters,
  ).trim();
  if (!/^\d{12}-[A-Z0-9]{6}$/.test(taskId)) fail("ANCHOR_TASK_ID");
  agentplane(
    cliPath,
    fixtureRoot,
    [
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "1. Follow the bounded fixture episode.\n2. Leave verification to the supervisor.",
      "--updated-by",
      role,
    ],
    "ANCHOR_TASK_PLAN",
    counters,
  );
  agentplane(
    cliPath,
    fixtureRoot,
    ["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR"],
    "ANCHOR_TASK_APPROVE",
    counters,
  );
  agentplane(
    cliPath,
    fixtureRoot,
    [
      "task",
      "start-ready",
      taskId,
      "--author",
      role,
      "--body",
      "Start: execute the bounded RF-04 deterministic fixture episode.",
    ],
    "ANCHOR_TASK_START",
    counters,
  );
  commitAll(fixtureRoot, `RF-04 start ${role}`);
  return taskId;
}

export function measurePreparedContext(bundleBytes, bootstrapBytes, runState = null) {
  let bundle;
  try {
    bundle = JSON.parse(bundleBytes);
  } catch {
    fail("ANCHOR_BUNDLE_JSON");
  }
  if (!bootstrapBytes.includes("Use bundle.json as the complete runner input.")) {
    fail("ANCHOR_BOOTSTRAP_BUNDLE_REFERENCE");
  }
  if (!Array.isArray(bundle.base_prompts) || bundle.base_prompts.length === 0) {
    fail("ANCHOR_BASE_PROMPTS");
  }
  let computedBoilerplateBytes = 0;
  for (const prompt of bundle.base_prompts) {
    if (typeof prompt?.content !== "string" || prompt.content.length === 0) {
      fail("ANCHOR_BASE_PROMPT_CONTENT");
    }
    computedBoilerplateBytes += byteLength(prompt.content);
  }
  const emittedValue = runState?.prepared_metadata?.prompt_boilerplate_bytes;
  const emittedBoilerplateBytes =
    emittedValue === undefined || emittedValue === null
      ? null
      : integer(emittedValue, "ANCHOR_PROMPT_BOILERPLATE_BYTES");
  return {
    bootstrap_bytes: byteLength(bootstrapBytes),
    bootstrap_sha256: sha256(bootstrapBytes),
    bundle_bytes: byteLength(bundleBytes),
    duplicate_input_bytes: duplicateInputBytes(bundle),
    prompt_boilerplate_bytes: emittedBoilerplateBytes ?? computedBoilerplateBytes,
    prompt_boilerplate_definition:
      emittedBoilerplateBytes === null
        ? "bundle_base_prompt_content_utf8_v1"
        : "anchor_prepared_metadata_v1",
    prompt_boilerplate_source:
      emittedBoilerplateBytes === null
        ? "anchor_bundle.base_prompts.content"
        : "anchor_run_state.prepared_metadata.prompt_boilerplate_bytes",
  };
}

export function prepareEpisodeContext(cliPath, fixtureRoot, taskId, counters) {
  const preparedText = agentplane(
    cliPath,
    fixtureRoot,
    ["task", "run", taskId, "--dry-run", "--json"],
    "ANCHOR_RUN_PREPARE",
    counters,
  );
  let prepared;
  try {
    prepared = JSON.parse(preparedText);
  } catch {
    fail("ANCHOR_RUN_PREPARE_JSON");
  }
  const bootstrapPath = fixtureFilePath(
    fixtureRoot,
    prepared.bootstrap_path ?? prepared.bootstrapPath,
    "ANCHOR_RUN_PREPARE_PATHS",
  );
  const bundlePath = fixtureFilePath(
    fixtureRoot,
    prepared.bundle_path ?? prepared.bundlePath,
    "ANCHOR_RUN_PREPARE_PATHS",
  );
  const bootstrapBytes = readFileSync(bootstrapPath, "utf8");
  const bundleBytes = readFileSync(bundlePath, "utf8");
  const runDirectory = prepared.run_dir ?? path.dirname(bundlePath);
  const { resolved: runStatePath } = fixtureCandidatePath(
    fixtureRoot,
    path.join(runDirectory, "run-state.json"),
    "ANCHOR_RUN_STATE_PATH",
  );
  let runState = null;
  if (existsSync(runStatePath)) {
    const validatedRunStatePath = fixtureFilePath(
      fixtureRoot,
      runStatePath,
      "ANCHOR_RUN_STATE_PATH",
    );
    try {
      runState = JSON.parse(readFileSync(validatedRunStatePath, "utf8"));
    } catch {
      fail("ANCHOR_RUN_STATE_JSON");
    }
  }
  const telemetry = measurePreparedContext(bundleBytes, bootstrapBytes, runState);
  commitAll(fixtureRoot, "RF-04 prepared episode context");
  return { bootstrapBytes, bundleBytes, telemetry };
}

function applicabilityCell(reasonCode, source) {
  return {
    provenance: { category: "applicability_rule", source },
    reason_code: reasonCode,
    resolution: "not_applicable",
  };
}

function observedCell(value, artifactSha256, source, category = "supervisor_observed") {
  return {
    provenance: {
      artifact_id: "supervisor_receipt",
      artifact_sha256: artifactSha256,
      category,
      source,
    },
    resolution: "observed",
    value,
  };
}

export function writeCanonicalAtomic(filePath, value) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  writeFileSync(temporaryPath, canonicalBytes(value), "utf8");
  renameSync(temporaryPath, filePath);
}

export function buildReplayOutput({
  counters,
  diagnostics,
  driverIdentity,
  episodeLedger,
  evidencePath,
  fixtureDigest,
  harnessDigest,
  lifecycleControl,
  outcomes,
  providerUsageByRole,
  runId,
  runIndex,
  scenarioId,
  supervisorReceipt,
  anchor,
}) {
  const metricPayload = Object.fromEntries(
    Object.entries(counters.metrics).filter(([, value]) => value !== null),
  );
  const diagnosticPayload = Object.fromEntries(
    Object.entries(diagnostics.latency_ms).filter(([, value]) => value !== null),
  );
  const payload = {
    diagnostics: { latency_ms: diagnosticPayload },
    episode_ledger: episodeLedger,
    evidence: { supervisor_receipt: true },
    lifecycle_control: lifecycleControl,
    metrics: metricPayload,
    observed_outcomes: outcomes,
    provider_usage_by_role: providerUsageByRole,
    supervisor_receipt: supervisorReceipt,
  };
  const artifactSha256 = sha256(canonicalBytes(payload));
  const evidenceBundle = {
    artifacts: [
      {
        id: "supervisor_receipt",
        kind: "rf04_supervisor_receipt",
        payload,
        sha256: artifactSha256,
      },
    ],
    mode: AGENT_EFFICIENCY_REPLAY_EVIDENCE_MODE,
    run_id: runId,
    schema_version: AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION,
  };
  const evidenceBytes = canonicalBytes(evidenceBundle);
  const metricCells = Object.fromEntries(
    SCALAR_TELEMETRY_FIELDS.map((field) => [
      field,
      counters.metrics[field] === null
        ? applicabilityCell(`not_applicable_${field}`, `rf04.${scenarioId}.${field}.not_applicable`)
        : field === "lifecycle_calls"
          ? observedCell(
              counters.metrics[field],
              artifactSha256,
              "lifecycle_control.call_count",
              "fixture_control",
            )
          : observedCell(counters.metrics[field], artifactSha256, `metrics.${field}`),
    ]),
  );
  const outcomeCells = Object.fromEntries(
    OUTCOME_FIELDS.map((field) => [
      field,
      observedCell(outcomes[field], artifactSha256, `observed_outcomes.${field}`),
    ]),
  );
  const tokenCells = Object.fromEntries(
    Object.entries(providerUsageByRole).map(([role, usage]) => [
      role,
      {
        input_tokens: observedCell(
          usage.input_tokens,
          artifactSha256,
          `provider_usage_by_role.${role}.input_tokens`,
          "provider_reported",
        ),
        output_tokens: observedCell(
          usage.output_tokens,
          artifactSha256,
          `provider_usage_by_role.${role}.output_tokens`,
          "provider_reported",
        ),
        reasoning_tokens: observedCell(
          usage.reasoning_output_tokens,
          artifactSha256,
          `provider_usage_by_role.${role}.reasoning_output_tokens`,
          "provider_reported",
        ),
      },
    ]),
  );
  const latencyCells = Object.fromEntries(
    Object.entries(diagnostics.latency_ms).map(([field, value]) => [
      field,
      value === null
        ? applicabilityCell(`not_applicable_${field}`, `rf04.${scenarioId}.${field}.not_applicable`)
        : observedCell(value, artifactSha256, `diagnostics.latency_ms.${field}`),
    ]),
  );
  const envelope = {
    anchor: {
      disposable_repository: true,
      driver: driverIdentity,
      external_effects: "fixture_backed",
      fixture_registry_sha256: fixtureDigest,
      harness_sha256: harnessDigest,
      subject_sha: anchor,
    },
    artifacts: [
      {
        id: "supervisor_receipt",
        kind: "rf04_supervisor_receipt",
        sha256: artifactSha256,
      },
    ],
    diagnostics: {
      captured_at: diagnostics.captured_at,
      host_fingerprint: diagnostics.host_fingerprint,
      latency_ms: latencyCells,
    },
    evidence: [
      {
        id: "supervisor_receipt",
        provenance: {
          artifact_id: "supervisor_receipt",
          artifact_sha256: artifactSha256,
          category: "artifact_observed",
          source: "evidence.supervisor_receipt",
        },
      },
    ],
    evidence_bundle: { path: evidencePath, sha256: sha256(evidenceBytes) },
    metrics: metricCells,
    mode: AGENT_EFFICIENCY_REPLAY_MODE,
    observed_outcomes: outcomeCells,
    profile: {
      adapter_id: "codex-exec-jsonl-supervisor",
      cache_mode: "ephemeral-provider-default",
      model_id: CODEX_REPLAY_MODEL,
      provider_id: "openai-chatgpt",
      reasoning_effort: CODEX_REPLAY_REASONING_EFFORT,
      runtime_id: "agentplane-anchor-cli-preparation/codex-cli-execution",
      runtime_version: `0.6.24/${CODEX_REPLAY_CLI_VERSION}`,
      sandbox_mode: "workspace-write-network-disabled",
    },
    run_id: runId,
    run_index: runIndex,
    scenario_id: scenarioId,
    schema_version: AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION,
    token_usage_by_role: tokenCells,
  };
  return { envelope, evidenceBundle };
}

export function expectedAnchorPreparationCliCalls(expectedTrace) {
  if (!Array.isArray(expectedTrace)) fail("EXPECTED_TRACE");
  const taskCount = Math.max(1, new Set(expectedTrace).size);
  return 1 + taskCount * 4 + Math.max(1, expectedTrace.length);
}
