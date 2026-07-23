import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import path from "node:path";

import {
  OUTCOME_FIELDS,
  PRE_V07_EFFICIENCY_ANCHOR_COMMIT,
  RF04_SCENARIO_IDS,
  SCALAR_TELEMETRY_FIELDS,
  assertFixtureRegistry,
  relativeRepoPath,
  stableJson,
} from "./agent-efficiency-baseline.mjs";
import {
  assertRepoPathNoSymlinkEscape,
  REPLAY_CONTRACT_ENV_KEYS,
  TRUSTED_REPLAY_DRIVER_PATH,
} from "./agent-efficiency-replay-safety.mjs";

export { createReplayHarnessManifest } from "./agent-efficiency-replay-harness.mjs";

export const AGENT_EFFICIENCY_REPLAY_MODE = "agent_efficiency_replay_v1";
export const AGENT_EFFICIENCY_REPLAY_EVIDENCE_MODE = "agent_efficiency_replay_evidence_v1";
export const AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION = 1;
export const REPLAY_DRIVER_CONTRACT_VERSION = 1;
export const MINIMUM_REPLAY_RUNS = 5;
export const REPLAY_ANCHOR_COMMIT = PRE_V07_EFFICIENCY_ANCHOR_COMMIT;
export const TOKEN_FIELDS = Object.freeze(["input_tokens", "output_tokens", "reasoning_tokens"]);
export const REPLAY_PROVIDER_USAGE_FIELDS = Object.freeze([
  "input_tokens",
  "output_tokens",
  "reasoning_output_tokens",
]);
export const DIAGNOSTIC_LATENCY_FIELDS = Object.freeze([
  "harness_setup_latency_ms",
  "time_to_first_scoped_mutation_ms",
  "time_to_verified_result_ms",
]);

const LATENCY_SCALAR_FIELDS = new Set(["preparation_latency_ms", "context_search_latency_ms"]);
const RATIO_FIELDS = new Set(["retrieval_recall_proxy", "evidence_observed_to_claimed_ratio"]);
const NON_INTEGER_FIELDS = new Set([...LATENCY_SCALAR_FIELDS, ...RATIO_FIELDS]);
const PROVENANCE_CATEGORIES = new Set([
  "provider_reported",
  "supervisor_observed",
  "artifact_observed",
  "agent_claimed",
  "human_supplied",
  "fixture_control",
  "applicability_rule",
  "test_control",
]);
const RESOLVED_OUTCOME_CATEGORIES = new Set([
  "supervisor_observed",
  "artifact_observed",
  "fixture_control",
]);
const OBSERVED_CELL_CATEGORIES = new Set(["supervisor_observed", "artifact_observed"]);
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;
const SECRET_PATTERN =
  /(?:sk-[A-Za-z0-9_-]{16,}|gh[pousr]_[A-Za-z0-9]{16,}|github_pat_[A-Za-z0-9_]{20,}|glpat-[A-Za-z0-9_-]{16,}|npm_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{12,}|AKIA[0-9A-Z]{16}|AIza[A-Za-z0-9_-]{20,}|dop_v1_[a-f0-9]{32,}|Bearer\s+[A-Za-z0-9._~+/=-]{12,}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{8,}|-----BEGIN [A-Z ]+PRIVATE KEY-----)/;
const EMBEDDED_POSIX_PATH = /(?:^|[\s"'=(])\/(?:[^/\s"'<>]+\/)+[^/\s"'<>]*/;
const EMBEDDED_WINDOWS_PATH = /(?:^|[\s"'=(])(?:[A-Za-z]:[\\/]|\\\\[^\\/\s]+[\\/])/;
const FORBIDDEN_SENSITIVE_KEYS =
  /^(?:access[_-]?token|api[_-]?key|auth|authorization|bearer|client[_-]?secret|credential|credentials|password|private[_-]?key|refresh[_-]?token|secret|secret[_-]?key|session[_-]?token|token)$/i;
const FORBIDDEN_PAYLOAD_KEYS = new Set([
  "chain_of_thought",
  "hostname",
  "prompt",
  "prompt_text",
  "raw_trace",
  "reasoning",
  "reasoning_text",
]);
const NO_EXPECTED_SOURCE_VALUE = Symbol("no-expected-source-value");

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function object(value, label) {
  if (!isObject(value)) throw new Error(`${label} must be an object`);
  return value;
}

function nonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function exactKeys(value, keys, label) {
  const actual = Object.keys(object(value, label)).toSorted();
  const expected = [...keys].toSorted();
  if (stableJson(actual) !== stableJson(expected)) {
    throw new Error(`${label} must contain exactly: ${expected.join(", ")}`);
  }
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function prefixedSha256(value) {
  return `sha256:${sha256(value)}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function assertSha256(value, label) {
  if (typeof value !== "string" || !SHA256_PATTERN.test(value)) {
    throw new Error(`${label} must be a lowercase sha256:<64 hex> digest`);
  }
  return value;
}

function assertCapturePlatform(value, label) {
  const platform = object(value, label);
  exactKeys(platform, ["arch", "libc", "node_abi", "platform"], label);
  if (!/^[a-z0-9_+-]+$/i.test(platform.arch) || !/^(?:[0-9]+|unknown)$/.test(platform.node_abi)) {
    throw new Error(`${label} has an invalid architecture or Node ABI`);
  }
  if (!new Set(["darwin", "linux", "win32"]).has(platform.platform)) {
    throw new Error(`${label}.platform is unsupported`);
  }
  if (!new Set(["glibc", "musl_or_unknown", "not_applicable"]).has(platform.libc)) {
    throw new Error(`${label}.libc is unsupported`);
  }
  if (platform.platform !== "linux" && platform.libc !== "not_applicable") {
    throw new Error(`${label}.libc must be not_applicable outside Linux`);
  }
  return platform;
}

function assertDependencyClaim(value, label) {
  const claim = object(value, label);
  exactKeys(
    claim,
    ["capture_executable_sha256", "capture_platform", "capture_receipt_sha256", "portable_sha256"],
    label,
  );
  assertSha256(claim.capture_executable_sha256, `${label}.capture_executable_sha256`);
  assertSha256(claim.capture_receipt_sha256, `${label}.capture_receipt_sha256`);
  assertSha256(claim.portable_sha256, `${label}.portable_sha256`);
  const capturePlatform = assertCapturePlatform(
    claim.capture_platform,
    `${label}.capture_platform`,
  );
  const receipt = {
    capture_platform: capturePlatform,
    executable_sha256: claim.capture_executable_sha256,
    portable_sha256: claim.portable_sha256,
    schema_version: 1,
  };
  if (prefixedSha256(canonicalBytes(receipt)) !== claim.capture_receipt_sha256) {
    throw new Error(`${label}.capture_receipt_sha256 does not link its platform and digests`);
  }
  return claim;
}

function assertSafeString(value, label) {
  nonEmptyString(value, label);
  if (EMBEDDED_POSIX_PATH.test(value) || EMBEDDED_WINDOWS_PATH.test(value)) {
    throw new Error(`${label} must not contain an absolute host path`);
  }
  if (SECRET_PATTERN.test(value)) {
    throw new Error(`${label} contains a credential-like value`);
  }
}

function assertSanitized(value, label = "replay envelope") {
  if (typeof value === "string") {
    if (SECRET_PATTERN.test(value)) throw new Error(`${label} contains a credential-like value`);
    if (EMBEDDED_POSIX_PATH.test(value) || EMBEDDED_WINDOWS_PATH.test(value)) {
      throw new Error(`${label} contains an absolute host path`);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      assertSanitized(item, `${label}[${index}]`);
    }
    return;
  }
  if (!isObject(value)) return;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_SENSITIVE_KEYS.test(key)) {
      throw new Error(`${label}.${key} is forbidden because it can contain a credential`);
    }
    if (FORBIDDEN_PAYLOAD_KEYS.has(key)) {
      throw new Error(
        `${label}.${key} is forbidden; prompts and hidden reasoning are not telemetry`,
      );
    }
    assertSanitized(child, `${label}.${key}`);
  }
}

function assertRelativePath(value, label) {
  assertSafeString(value, label);
  const portable = value.replaceAll("\\", "/");
  const normalized = path.posix.normalize(portable);
  if (
    normalized !== portable ||
    path.posix.isAbsolute(normalized) ||
    normalized === "." ||
    normalized.startsWith("../") ||
    normalized.includes("/../")
  ) {
    throw new Error(`${label} must remain inside the replay artifact root`);
  }
  return normalized;
}

function assertProvenance(value, label, options = {}) {
  const provenance = object(value, label);
  exactKeys(
    provenance,
    provenance.category === "applicability_rule"
      ? ["category", "source"]
      : ["artifact_id", "artifact_sha256", "category", "source"],
    label,
  );
  const category = nonEmptyString(provenance.category, `${label}.category`);
  if (!PROVENANCE_CATEGORIES.has(category)) {
    throw new Error(`${label}.category is not an allowed provenance category: ${category}`);
  }
  if (category === "test_control" && options.allowTestControls !== true) {
    throw new Error(`${label}.category=test_control is forbidden in a persisted replay baseline`);
  }
  assertSafeString(provenance.source, `${label}.source`);
  if (category !== "applicability_rule") {
    assertSafeString(provenance.artifact_id, `${label}.artifact_id`);
    assertSha256(provenance.artifact_sha256, `${label}.artifact_sha256`);
  }
  return provenance;
}

function artifactSourceValue(provenance, artifactById, label) {
  const artifact = artifactById.get(provenance.artifact_id);
  if (!artifact) {
    throw new Error(`${label}.artifact_id is absent from the committed evidence bundle`);
  }
  if (artifact.sha256 !== provenance.artifact_sha256) {
    throw new Error(`${label}.artifact_sha256 differs from the committed evidence payload`);
  }
  const segments = provenance.source.split(".");
  if (
    segments.length === 0 ||
    segments.some(
      (segment) =>
        !/^[A-Za-z0-9_-]+$/.test(segment) ||
        segment === "__proto__" ||
        segment === "constructor" ||
        segment === "prototype",
    )
  ) {
    throw new Error(`${label}.source must be a safe dotted path into the evidence payload`);
  }
  let current = artifact.payload;
  for (const segment of segments) {
    if (!isObject(current) || !Object.hasOwn(current, segment)) {
      throw new Error(`${label}.source is absent from the committed evidence payload`);
    }
    current = current[segment];
  }
  return current;
}

function assertArtifactSource(provenance, artifactById, expectedValue, label) {
  if (provenance.category === "applicability_rule") return;
  const sourceValue = artifactSourceValue(provenance, artifactById, label);
  if (
    expectedValue !== NO_EXPECTED_SOURCE_VALUE &&
    stableJson(sourceValue) !== stableJson(expectedValue)
  ) {
    throw new Error(`${label}.source value differs from the committed evidence payload`);
  }
}

function assertObservedCell(value, label, options = {}) {
  const cell = object(value, label);
  exactKeys(cell, ["provenance", "resolution", "value"], label);
  if (cell.resolution !== "observed") throw new Error(`${label}.resolution must be observed`);
  const provenance = assertProvenance(cell.provenance, `${label}.provenance`, options);
  return { cell, provenance };
}

function assertOutcomeCell(value, label, artifactById, options = {}) {
  const { cell, provenance } = assertObservedCell(value, label, options);
  if (typeof cell.value !== "boolean") throw new Error(`${label}.value must be a boolean`);
  if (
    !RESOLVED_OUTCOME_CATEGORIES.has(provenance.category) &&
    provenance.category !== "test_control"
  ) {
    throw new Error(
      `${label} must come from supervisor_observed, artifact_observed, or fixture_control evidence`,
    );
  }
  assertArtifactSource(provenance, artifactById, cell.value, `${label}.provenance`);
}

function assertNumber(value, label, field) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label}.value must be a finite number >= 0`);
  }
  if (!NON_INTEGER_FIELDS.has(field) && !Number.isInteger(value)) {
    throw new Error(`${label}.value must be an integer`);
  }
  if (RATIO_FIELDS.has(field) && value > 1) {
    throw new Error(`${label}.value must be between 0 and 1`);
  }
}

function assertScalarCell(value, label, field, artifactById, options = {}) {
  const cell = object(value, label);
  if (cell.resolution === "not_applicable") {
    exactKeys(cell, ["provenance", "reason_code", "resolution"], label);
    assertSafeString(cell.reason_code, `${label}.reason_code`);
    const provenance = assertProvenance(cell.provenance, `${label}.provenance`, options);
    if (provenance.category !== "applicability_rule") {
      throw new Error(`${label}.provenance.category must be applicability_rule`);
    }
    return;
  }
  const observed = assertObservedCell(cell, label, options);
  assertNumber(observed.cell.value, label, field);
  const testControl =
    options.allowTestControls === true && observed.provenance.category === "test_control";
  if (
    field === "lifecycle_calls" &&
    observed.provenance.category !== "fixture_control" &&
    !testControl
  ) {
    throw new Error(`${label} must use fixture_control provenance`);
  }
  if (
    field !== "lifecycle_calls" &&
    !OBSERVED_CELL_CATEGORIES.has(observed.provenance.category) &&
    !testControl
  ) {
    throw new Error(`${label} must use supervisor_observed or artifact_observed provenance`);
  }
  assertArtifactSource(
    observed.provenance,
    artifactById,
    observed.cell.value,
    `${label}.provenance`,
  );
}

function assertTokenCell(value, label, artifactById, options = {}) {
  const { cell, provenance } = assertObservedCell(value, label, options);
  if (!Number.isInteger(cell.value) || cell.value < 0) {
    throw new Error(`${label}.value must be a provider-reported integer >= 0`);
  }
  const allowed =
    provenance.category === "provider_reported" ||
    (options.allowTestControls === true && provenance.category === "test_control");
  if (!allowed) throw new Error(`${label} must use provider_reported provenance`);
  assertArtifactSource(provenance, artifactById, cell.value, `${label}.provenance`);
}

function expectedRoles(scenario) {
  return [...new Set(scenario.expected_episode_trace)];
}

function assertProfile(value, label) {
  const profile = object(value, label);
  exactKeys(
    profile,
    [
      "adapter_id",
      "cache_mode",
      "model_id",
      "provider_id",
      "reasoning_effort",
      "runtime_id",
      "runtime_version",
      "sandbox_mode",
    ],
    label,
  );
  for (const [key, item] of Object.entries(profile)) assertSafeString(item, `${label}.${key}`);
  return profile;
}

function assertEvidenceBundle(record, runId, label) {
  if (!record) throw new Error(`${label} is absent from the committed replay evidence directory`);
  if (record.bytes !== canonicalBytes(record.value)) {
    throw new Error(`${label} must use canonical stable JSON with one trailing newline`);
  }
  assertSanitized(record.value, label);
  const bundle = object(record.value, label);
  exactKeys(bundle, ["artifacts", "mode", "run_id", "schema_version"], label);
  if (bundle.mode !== AGENT_EFFICIENCY_REPLAY_EVIDENCE_MODE) {
    throw new Error(`${label}.mode must be ${AGENT_EFFICIENCY_REPLAY_EVIDENCE_MODE}`);
  }
  if (bundle.schema_version !== AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION) {
    throw new Error(`${label}.schema_version must be ${AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION}`);
  }
  if (bundle.run_id !== runId) throw new Error(`${label}.run_id must be ${runId}`);
  if (!Array.isArray(bundle.artifacts) || bundle.artifacts.length === 0) {
    throw new Error(`${label}.artifacts must contain sanitized evidence payloads`);
  }
  const artifactById = new Map();
  for (const [index, raw] of bundle.artifacts.entries()) {
    const artifact = object(raw, `${label}.artifacts[${index}]`);
    exactKeys(artifact, ["id", "kind", "payload", "sha256"], `${label}.artifacts[${index}]`);
    assertSafeString(artifact.id, `${label}.artifacts[${index}].id`);
    assertSafeString(artifact.kind, `${label}.artifacts[${index}].kind`);
    object(artifact.payload, `${label}.artifacts[${index}].payload`);
    if (artifactById.has(artifact.id)) {
      throw new Error(`${label}.artifacts contains duplicate id ${artifact.id}`);
    }
    const actualSha256 = prefixedSha256(canonicalBytes(artifact.payload));
    if (artifact.sha256 !== actualSha256) {
      throw new Error(`${label}.artifacts[${index}].sha256 differs from sanitized payload bytes`);
    }
    artifactById.set(artifact.id, artifact);
  }
  return { artifactById, bundle };
}

function assertArtifacts(value, label, artifactById) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must contain at least one hashed evidence artifact`);
  }
  const ids = new Set();
  for (const [index, raw] of value.entries()) {
    const artifact = object(raw, `${label}[${index}]`);
    exactKeys(artifact, ["id", "kind", "sha256"], `${label}[${index}]`);
    assertSafeString(artifact.id, `${label}[${index}].id`);
    assertSafeString(artifact.kind, `${label}[${index}].kind`);
    if (ids.has(artifact.id)) throw new Error(`${label} contains duplicate id ${artifact.id}`);
    ids.add(artifact.id);
    assertSha256(artifact.sha256, `${label}[${index}].sha256`);
    const bundled = artifactById.get(artifact.id);
    if (!bundled)
      throw new Error(`${label}[${index}] is absent from the committed evidence bundle`);
    if (bundled.kind !== artifact.kind || bundled.sha256 !== artifact.sha256) {
      throw new Error(`${label}[${index}] differs from the committed evidence bundle`);
    }
  }
  if (ids.size !== artifactById.size) {
    throw new Error(`${label} must list every artifact in the committed evidence bundle`);
  }
}

function assertEvidence(value, label, artifactById, options = {}) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must contain at least one evidence item`);
  }
  const ids = new Set();
  for (const [index, raw] of value.entries()) {
    const item = object(raw, `${label}[${index}]`);
    exactKeys(item, ["id", "provenance"], `${label}[${index}]`);
    assertSafeString(item.id, `${label}[${index}].id`);
    if (ids.has(item.id)) throw new Error(`${label} contains duplicate id ${item.id}`);
    ids.add(item.id);
    const provenance = assertProvenance(item.provenance, `${label}[${index}].provenance`, options);
    assertArtifactSource(
      provenance,
      artifactById,
      NO_EXPECTED_SOURCE_VALUE,
      `${label}[${index}].provenance`,
    );
  }
}

function expectedEpisodeContract(scenarioId, role) {
  const readOnly =
    role === "EVALUATOR" || scenarioId === "missing_knowledge" || scenarioId === "adapter_failure";
  return {
    allowedPaths: readOnly ? [] : ["work/allowed.txt"],
    finalStatus:
      role === "EVALUATOR"
        ? "reviewed"
        : scenarioId === "missing_knowledge" || scenarioId === "adapter_failure"
          ? "blocked"
          : "done",
    policy: readOnly ? "read_only" : "scoped_write",
  };
}

function assertSortedUniquePaths(value, label) {
  if (!Array.isArray(value)) throw new TypeError(`${label} must be an array`);
  for (const item of value) assertRelativePath(item, label);
  const normalized = [...new Set(value)].toSorted();
  if (stableJson(value) !== stableJson(normalized)) {
    throw new Error(`${label} must contain sorted unique relative paths`);
  }
  return value;
}

function assertEpisodeLedger(artifactById, scenario, label) {
  const candidates = [...artifactById.values()].filter((artifact) =>
    Object.hasOwn(artifact.payload, "episode_ledger"),
  );
  if (candidates.length !== 1) {
    throw new Error(`${label} must have exactly one evidence artifact with an episode_ledger`);
  }
  const artifact = candidates[0];
  const ledger = artifact.payload.episode_ledger;
  if (!Array.isArray(ledger)) throw new TypeError(`${label}.episode_ledger must be an array`);
  const expectedTrace = scenario.expected_episode_trace;
  if (ledger.length !== expectedTrace.length) {
    throw new Error(
      `${label}.episode_ledger has ${ledger.length}/${expectedTrace.length} expected episodes`,
    );
  }
  const aggregate = Object.fromEntries(
    [...new Set(expectedTrace)].map((role) => [
      role,
      {
        cached_input_tokens: 0,
        input_tokens: 0,
        output_tokens: 0,
        reasoning_output_tokens: 0,
      },
    ]),
  );
  for (const [index, rawEpisode] of ledger.entries()) {
    const episode = object(rawEpisode, `${label}.episode_ledger[${index}]`);
    exactKeys(
      episode,
      [
        "effect_observation",
        "episode_index",
        "expected_final_status",
        "final_status",
        "provider_usage",
        "role",
        "status_violation",
        "target_matched_after_episode",
      ],
      `${label}.episode_ledger[${index}]`,
    );
    if (episode.episode_index !== index + 1) {
      throw new Error(`${label}.episode_ledger[${index}].episode_index must be ${index + 1}`);
    }
    if (episode.role !== expectedTrace[index]) {
      throw new Error(
        `${label}.episode_ledger[${index}].role must preserve expected trace role ${expectedTrace[index]}`,
      );
    }
    if (!["blocked", "done", "reviewed"].includes(episode.final_status)) {
      throw new Error(`${label}.episode_ledger[${index}].final_status is invalid`);
    }
    if (!["blocked", "done", "reviewed"].includes(episode.expected_final_status)) {
      throw new Error(`${label}.episode_ledger[${index}].expected_final_status is invalid`);
    }
    const expectedContract = expectedEpisodeContract(scenario.id, episode.role);
    if (episode.expected_final_status !== expectedContract.finalStatus) {
      throw new Error(
        `${label}.episode_ledger[${index}].expected_final_status must be ${expectedContract.finalStatus}`,
      );
    }
    if (
      typeof episode.status_violation !== "boolean" ||
      episode.status_violation !== (episode.final_status !== episode.expected_final_status)
    ) {
      throw new Error(`${label}.episode_ledger[${index}].status_violation is inconsistent`);
    }
    if (
      episode.target_matched_after_episode !== null &&
      typeof episode.target_matched_after_episode !== "boolean"
    ) {
      throw new Error(`${label}.episode_ledger[${index}].target_matched_after_episode is invalid`);
    }
    const effect = object(
      episode.effect_observation,
      `${label}.episode_ledger[${index}].effect_observation`,
    );
    exactKeys(
      effect,
      [
        "allowed_paths",
        "changed_paths",
        "policy",
        "same_content_rewrites",
        "unsafe_allowed_paths",
        "violation_paths",
      ],
      `${label}.episode_ledger[${index}].effect_observation`,
    );
    for (const field of [
      "allowed_paths",
      "changed_paths",
      "same_content_rewrites",
      "unsafe_allowed_paths",
      "violation_paths",
    ]) {
      assertSortedUniquePaths(
        effect[field],
        `${label}.episode_ledger[${index}].effect_observation.${field}`,
      );
    }
    if (!["read_only", "scoped_write"].includes(effect.policy)) {
      throw new Error(`${label}.episode_ledger[${index}].effect_observation.policy is invalid`);
    }
    if (
      effect.policy !== expectedContract.policy ||
      stableJson(effect.allowed_paths) !== stableJson(expectedContract.allowedPaths)
    ) {
      throw new Error(
        `${label}.episode_ledger[${index}].effect_observation must use the role-specific policy`,
      );
    }
    if (
      effect.unsafe_allowed_paths.some(
        (candidate) =>
          !effect.allowed_paths.includes(candidate) ||
          !effect.changed_paths.includes(candidate) ||
          !effect.violation_paths.includes(candidate),
      )
    ) {
      throw new Error(
        `${label}.episode_ledger[${index}].effect_observation.unsafe_allowed_paths is inconsistent`,
      );
    }
    const requiredViolations = effect.changed_paths.filter(
      (candidate) =>
        effect.policy === "read_only" ||
        !effect.allowed_paths.includes(candidate) ||
        effect.unsafe_allowed_paths.includes(candidate),
    );
    if (requiredViolations.some((candidate) => !effect.violation_paths.includes(candidate))) {
      throw new Error(
        `${label}.episode_ledger[${index}].effect_observation.violation_paths omits a forbidden path`,
      );
    }
    if (effect.violation_paths.some((candidate) => !effect.changed_paths.includes(candidate))) {
      throw new Error(
        `${label}.episode_ledger[${index}].effect_observation.violation_paths must be changed paths`,
      );
    }
    if (
      effect.same_content_rewrites.some((candidate) => !effect.changed_paths.includes(candidate))
    ) {
      throw new Error(
        `${label}.episode_ledger[${index}].effect_observation.same_content_rewrites must be changed paths`,
      );
    }
    const usage = object(
      episode.provider_usage,
      `${label}.episode_ledger[${index}].provider_usage`,
    );
    exactKeys(
      usage,
      [...REPLAY_PROVIDER_USAGE_FIELDS, "cached_input_tokens", "turn_completed_events"],
      `${label}.episode_ledger[${index}].provider_usage`,
    );
    for (const field of [...REPLAY_PROVIDER_USAGE_FIELDS, "cached_input_tokens"]) {
      if (!Number.isInteger(usage[field]) || usage[field] < 0) {
        throw new Error(
          `${label}.episode_ledger[${index}].provider_usage.${field} must be an integer >= 0`,
        );
      }
      aggregate[episode.role][field] += usage[field];
    }
    if (usage.turn_completed_events !== 1) {
      throw new Error(
        `${label}.episode_ledger[${index}] must contain exactly one final turn.completed event`,
      );
    }
  }
  const providerUsageByRole = object(
    artifact.payload.provider_usage_by_role,
    `${label}.provider_usage_by_role`,
  );
  exactKeys(providerUsageByRole, Object.keys(aggregate), `${label}.provider_usage_by_role`);
  for (const [role, expectedUsage] of Object.entries(aggregate)) {
    const usage = object(providerUsageByRole[role], `${label}.provider_usage_by_role.${role}`);
    exactKeys(
      usage,
      [...REPLAY_PROVIDER_USAGE_FIELDS, "cached_input_tokens"],
      `${label}.provider_usage_by_role.${role}`,
    );
    if (stableJson(usage) !== stableJson(expectedUsage)) {
      throw new Error(
        `${label}.provider_usage_by_role.${role} must equal the exact episode ledger sum`,
      );
    }
  }
  const metrics = object(artifact.payload.metrics, `${label}.metrics`);
  if (metrics.llm_episodes !== ledger.length || metrics.prompt_count !== ledger.length) {
    throw new Error(`${label}.metrics must count the exact episode ledger length`);
  }
  return { artifact, episodeLedger: ledger, providerUsageByRole };
}

function assertResolvedOutcomeImplications(resolvedOutcomes, episodeLedger, label, options = {}) {
  const effectViolation = episodeLedger.some(
    (episode) => episode.effect_observation.violation_paths.length > 0,
  );
  const statusViolation = episodeLedger.some((episode) => episode.status_violation);
  const blocked = episodeLedger.some((episode) => episode.final_status === "blocked");
  const values = Object.fromEntries(
    Object.entries(resolvedOutcomes).map(([field, cell]) => [field, cell.value]),
  );
  const isObservedProvenance = (cell) =>
    cell.provenance.category === "supervisor_observed" ||
    (options.allowTestControls === true && cell.provenance.category === "test_control");
  if (effectViolation && values.scope_violation !== true) {
    throw new Error(`${label}.scope_violation must include actual episode effect violations`);
  }
  if (effectViolation && !isObservedProvenance(resolvedOutcomes.scope_violation)) {
    throw new Error(`${label}.scope_violation must identify its observed episode provenance`);
  }
  if ((effectViolation || statusViolation) && values.rework_required !== true) {
    throw new Error(`${label}.rework_required must include actual episode contract violations`);
  }
  if (
    (effectViolation || statusViolation) &&
    !isObservedProvenance(resolvedOutcomes.rework_required)
  ) {
    throw new Error(`${label}.rework_required must identify its observed episode provenance`);
  }
  if ((effectViolation || statusViolation) && values.verified_success !== false) {
    throw new Error(`${label}.verified_success must reject actual episode contract violations`);
  }
  if (blocked && values.blocked !== true) {
    throw new Error(`${label}.blocked must include an observed blocked final status`);
  }
  if (blocked && !isObservedProvenance(resolvedOutcomes.blocked)) {
    throw new Error(`${label}.blocked must identify its observed final-status provenance`);
  }
}

function assertLifecycleControl(artifact, scenario, label) {
  const control = object(artifact.payload.lifecycle_control, `${label}.lifecycle_control`);
  exactKeys(control, ["call_count", "provenance", "trace"], `${label}.lifecycle_control`);
  if (control.provenance !== "fixture_control") {
    throw new Error(`${label}.lifecycle_control.provenance must be fixture_control`);
  }
  if (stableJson(control.trace) !== stableJson(scenario.expected_lifecycle_trace)) {
    throw new Error(`${label}.lifecycle_control.trace must equal the exact registry control`);
  }
  if (control.call_count !== scenario.expected_lifecycle_trace.length) {
    throw new Error(`${label}.lifecycle_control.call_count must equal its exact trace length`);
  }
}

function assertDiagnostics(value, label, artifactById, options = {}) {
  const diagnostics = object(value, label);
  exactKeys(diagnostics, ["captured_at", "host_fingerprint", "latency_ms"], label);
  const capturedAt = nonEmptyString(diagnostics.captured_at, `${label}.captured_at`);
  if (!Number.isFinite(Date.parse(capturedAt))) {
    throw new TypeError(`${label}.captured_at must be an ISO timestamp`);
  }
  assertSha256(diagnostics.host_fingerprint, `${label}.host_fingerprint`);
  exactKeys(diagnostics.latency_ms, DIAGNOSTIC_LATENCY_FIELDS, `${label}.latency_ms`);
  for (const field of DIAGNOSTIC_LATENCY_FIELDS) {
    assertScalarCell(
      diagnostics.latency_ms[field],
      `${label}.latency_ms.${field}`,
      field,
      artifactById,
      options,
    );
  }
}

export function fixtureRegistrySha256(registry) {
  return prefixedSha256(canonicalBytes(registry));
}

export function createReplayDriverIdentity(repoRoot, driverPath) {
  const safeDriverPath = assertRepoPathNoSymlinkEscape(repoRoot, driverPath, "replay driver", {
    kind: "file",
  });
  const relativePath = relativeRepoPath(repoRoot, safeDriverPath, "replay driver");
  if (!relativePath.startsWith("scripts/bench/")) {
    throw new Error("replay driver must remain inside the reviewed scripts/bench task scope");
  }
  const absolutePath = path.join(repoRoot, relativePath);
  const stats = lstatSync(absolutePath, { throwIfNoEntry: false });
  if (!stats?.isFile() || stats.isSymbolicLink()) {
    throw new Error("replay driver must be a regular non-symlink file inside the repository");
  }
  const realPath = realpathSync(absolutePath);
  if (path.resolve(realPath) !== path.resolve(absolutePath)) {
    throw new Error("replay driver path must not escape through a symlinked parent");
  }
  return {
    contract_version: REPLAY_DRIVER_CONTRACT_VERSION,
    path: relativePath,
    sha256: prefixedSha256(readFileSync(absolutePath)),
  };
}

export function replayDriverIdentityFromEnvelopeRecords(repoRoot, records) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error("replay driver identity is unavailable because no envelopes were captured");
  }
  const declared = object(records[0].value?.anchor?.driver, "replay envelope.anchor.driver");
  const actual = createReplayDriverIdentity(repoRoot, declared.path);
  for (const record of records) {
    if (stableJson(record.value?.anchor?.driver) !== stableJson(actual)) {
      throw new Error(`${record.path} driver identity differs from exact reviewed driver bytes`);
    }
  }
  return actual;
}

export function replayDependencyClaimFromEnvelopeRecords(records) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error("replay dependency claim is unavailable because no envelopes were captured");
  }
  const claims = records.map((record) => ({
    capture_executable_sha256: record.value?.anchor?.dependency_capture_executable_sha256,
    capture_platform: record.value?.anchor?.capture_platform,
    capture_receipt_sha256: record.value?.anchor?.dependency_capture_receipt_sha256,
    portable_sha256: record.value?.anchor?.dependency_portable_sha256,
  }));
  const values = [...new Set(claims.map((claim) => stableJson(claim)))];
  if (values.length !== 1) throw new Error("replay envelopes use inconsistent dependency claims");
  return assertDependencyClaim(claims[0], "replay envelope dependency claim");
}

export function buildReplayDriverEnvironment(sourceEnv, contractEnv) {
  const actualKeys = Object.keys(contractEnv).toSorted();
  if (stableJson(actualKeys) !== stableJson([...REPLAY_CONTRACT_ENV_KEYS].toSorted())) {
    throw new Error("replay driver contract environment must contain the exact reviewed key set");
  }
  const result = {
    LANG: sourceEnv.LANG || "C.UTF-8",
    LC_ALL: sourceEnv.LC_ALL || "C.UTF-8",
    PATH: TRUSTED_REPLAY_DRIVER_PATH,
    TZ: "UTC",
  };
  for (const name of REPLAY_CONTRACT_ENV_KEYS) {
    const value = contractEnv[name];
    if (typeof value !== "string" || value.length === 0) {
      throw new Error(`invalid replay driver contract environment field: ${name}`);
    }
    result[name] = value;
  }
  return result;
}

export function assertReplayEnvelope(envelope, context) {
  assertSanitized(envelope);
  const value = object(envelope, "replay envelope");
  exactKeys(
    value,
    [
      "anchor",
      "artifacts",
      "diagnostics",
      "evidence",
      "evidence_bundle",
      "metrics",
      "mode",
      "resolved_outcomes",
      "profile",
      "run_id",
      "run_index",
      "scenario_id",
      "schema_version",
      "token_usage_by_role",
    ],
    "replay envelope",
  );
  if (value.mode !== AGENT_EFFICIENCY_REPLAY_MODE) {
    throw new Error(`replay envelope.mode must be ${AGENT_EFFICIENCY_REPLAY_MODE}`);
  }
  if (value.schema_version !== AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION) {
    throw new Error(
      `replay envelope.schema_version must be ${AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION}`,
    );
  }
  const scenario = context.scenarioById.get(value.scenario_id);
  if (!scenario) throw new Error(`unknown RF-04 scenario: ${value.scenario_id}`);
  if (!Number.isInteger(value.run_index) || value.run_index < 1 || value.run_index > context.runs) {
    throw new Error(`replay envelope.run_index must be between 1 and ${context.runs}`);
  }
  const expectedRunId = `${value.scenario_id}/run-${String(value.run_index).padStart(2, "0")}`;
  if (value.run_id !== expectedRunId) {
    throw new Error(`replay envelope.run_id must be ${expectedRunId}`);
  }
  exactKeys(
    value.anchor,
    [
      "capture_platform",
      "dependency_capture_executable_sha256",
      "dependency_capture_receipt_sha256",
      "dependency_portable_sha256",
      "disposable_repository",
      "driver",
      "external_effects",
      "fixture_registry_origin",
      "fixture_registry_sha256",
      "harness_sha256",
      "subject_sha",
    ],
    "replay envelope.anchor",
  );
  if (value.anchor.subject_sha !== context.anchor) {
    throw new Error(`replay envelope anchor must be exact commit ${context.anchor}`);
  }
  if (value.anchor.fixture_registry_sha256 !== context.fixtureRegistrySha256) {
    throw new Error("replay envelope fixture registry digest does not match the capture registry");
  }
  if (value.anchor.fixture_registry_origin !== "fixture_control_overlay_v1") {
    throw new Error("replay envelope fixture registry must come from the capture control overlay");
  }
  const envelopeDependencyClaim = assertDependencyClaim(
    {
      capture_executable_sha256: value.anchor.dependency_capture_executable_sha256,
      capture_platform: value.anchor.capture_platform,
      capture_receipt_sha256: value.anchor.dependency_capture_receipt_sha256,
      portable_sha256: value.anchor.dependency_portable_sha256,
    },
    "replay envelope dependency claim",
  );
  if (stableJson(envelopeDependencyClaim) !== stableJson(context.dependencyClaim)) {
    throw new Error("replay envelope dependency claim does not match the capture harness");
  }
  if (value.anchor.harness_sha256 !== context.harnessSha256) {
    throw new Error("replay envelope harness digest does not match the capture harness");
  }
  if (stableJson(value.anchor.driver) !== stableJson(context.driverIdentity)) {
    throw new Error("replay envelope driver identity differs from exact reviewed driver bytes");
  }
  if (value.anchor.disposable_repository !== true) {
    throw new Error("replay envelope must come from a disposable repository");
  }
  if (value.anchor.external_effects !== "fixture_backed") {
    throw new Error("replay envelope external effects must be fixture_backed");
  }

  const profile = assertProfile(value.profile, "replay envelope.profile");
  exactKeys(value.evidence_bundle, ["path", "sha256"], "replay envelope.evidence_bundle");
  const evidencePath = assertRelativePath(
    value.evidence_bundle.path,
    "replay envelope.evidence_bundle.path",
  );
  const evidenceRecord = context.evidenceByPath.get(evidencePath);
  if (!evidenceRecord) {
    throw new Error("replay envelope evidence bundle is absent from committed evidence bytes");
  }
  if (value.evidence_bundle.sha256 !== prefixedSha256(evidenceRecord.bytes)) {
    throw new Error("replay envelope evidence bundle hash differs from committed evidence bytes");
  }
  const { artifactById } = assertEvidenceBundle(
    evidenceRecord,
    value.run_id,
    `evidence bundle ${evidencePath}`,
  );
  assertArtifacts(value.artifacts, "replay envelope.artifacts", artifactById);
  assertEvidence(value.evidence, "replay envelope.evidence", artifactById, context);
  const {
    artifact: episodeArtifact,
    episodeLedger,
    providerUsageByRole,
  } = assertEpisodeLedger(artifactById, scenario, "replay evidence");
  assertLifecycleControl(episodeArtifact, scenario, "replay evidence");
  const supervisorReceipt = object(
    episodeArtifact.payload.supervisor_receipt,
    "replay evidence.supervisor_receipt",
  );
  const anchorRuntimeIntegrity = object(
    supervisorReceipt.anchor_runtime_integrity,
    "replay evidence.supervisor_receipt.anchor_runtime_integrity",
  );
  if (stableJson(anchorRuntimeIntegrity.dependency_claim) !== stableJson(context.dependencyClaim)) {
    throw new Error("replay evidence anchor runtime receipt does not link the dependency claim");
  }

  exactKeys(value.resolved_outcomes, OUTCOME_FIELDS, "replay envelope.resolved_outcomes");
  for (const field of OUTCOME_FIELDS) {
    assertOutcomeCell(
      value.resolved_outcomes[field],
      `replay envelope.resolved_outcomes.${field}`,
      artifactById,
      context,
    );
  }
  assertResolvedOutcomeImplications(
    value.resolved_outcomes,
    episodeLedger,
    "replay envelope.resolved_outcomes",
    context,
  );

  exactKeys(value.metrics, SCALAR_TELEMETRY_FIELDS, "replay envelope.metrics");
  for (const field of SCALAR_TELEMETRY_FIELDS) {
    assertScalarCell(
      value.metrics[field],
      `replay envelope.metrics.${field}`,
      field,
      artifactById,
      context,
    );
  }

  const roles = expectedRoles(scenario);
  exactKeys(value.token_usage_by_role, roles, "replay envelope.token_usage_by_role");
  for (const role of roles) {
    exactKeys(
      value.token_usage_by_role[role],
      TOKEN_FIELDS,
      `replay envelope.token_usage_by_role.${role}`,
    );
    for (const field of TOKEN_FIELDS) {
      assertTokenCell(
        value.token_usage_by_role[role][field],
        `replay envelope.token_usage_by_role.${role}.${field}`,
        artifactById,
        context,
      );
      const providerField = field === "reasoning_tokens" ? "reasoning_output_tokens" : field;
      const cell = value.token_usage_by_role[role][field];
      const expectedSource = `provider_usage_by_role.${role}.${providerField}`;
      if (
        cell.value !== providerUsageByRole[role][providerField] ||
        cell.provenance.artifact_id !== episodeArtifact.id ||
        cell.provenance.source !== expectedSource
      ) {
        throw new Error(
          `replay envelope.token_usage_by_role.${role}.${field} must map exact provider field ${expectedSource}`,
        );
      }
    }
  }
  assertDiagnostics(value.diagnostics, "replay envelope.diagnostics", artifactById, context);
  return { evidenceRecord, profile, scenario };
}

function valuesForCells(envelopes, selector) {
  return envelopes.map((envelope) => selector(envelope));
}

function round(value) {
  return Number(value.toFixed(6));
}

function distribution(values) {
  if (values.length === 0) return null;
  const sorted = [...values].toSorted((left, right) => left - right);
  const mean = sorted.reduce((sum, value) => sum + value, 0) / sorted.length;
  const variance = sorted.reduce((sum, value) => sum + (value - mean) ** 2, 0) / sorted.length;
  return {
    count: sorted.length,
    max: sorted.at(-1),
    mean: round(mean),
    median:
      sorted.length % 2 === 1
        ? sorted[(sorted.length - 1) / 2]
        : round((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2),
    min: sorted[0],
    p95: sorted[Math.max(0, Math.ceil(sorted.length * 0.95) - 1)],
    standard_deviation: round(Math.sqrt(variance)),
  };
}

function resolutionProjection(cells, label, options = {}) {
  const resolutions = [...new Set(cells.map((cell) => cell.resolution))];
  if (resolutions.length !== 1) throw new Error(`${label} mixes observed and not_applicable runs`);
  const provenanceCategories = [
    ...new Set(cells.map((cell) => cell.provenance.category)),
  ].toSorted();
  if (resolutions[0] === "not_applicable") {
    const rules = [
      ...new Set(cells.map((cell) => `${cell.reason_code}:${cell.provenance.source}`)),
    ].toSorted();
    if (rules.length !== 1) throw new Error(`${label} uses inconsistent applicability rules`);
    return {
      applicability_rule: rules[0],
      provenance_categories: provenanceCategories,
      resolution: "not_applicable",
    };
  }
  return {
    ...(options.diagnosticOnly === true
      ? { diagnostic_only: true }
      : { distribution: distribution(cells.map((cell) => cell.value)) }),
    provenance_categories: provenanceCategories,
    resolution: "observed",
  };
}

function evidenceProjection(envelopes) {
  const counts = {};
  for (const envelope of envelopes) {
    for (const item of envelope.evidence) {
      const category = item.provenance.category;
      counts[category] = (counts[category] ?? 0) + 1;
    }
  }
  return Object.fromEntries(
    Object.entries(counts).toSorted(([left], [right]) => left.localeCompare(right)),
  );
}

function scenarioProjection(scenario, envelopes) {
  const outcomes = {};
  for (const field of OUTCOME_FIELDS) {
    const cells = valuesForCells(envelopes, (envelope) => envelope.resolved_outcomes[field]);
    const expected = scenario.expected_outcomes[field];
    const trueCount = cells.filter((cell) => cell.value === true).length;
    const matchCount = cells.filter((cell) => cell.value === expected).length;
    outcomes[field] = {
      false_count: cells.length - trueCount,
      golden_expected: expected,
      golden_match_count: matchCount,
      golden_mismatch_count: cells.length - matchCount,
      provenance_categories: [...new Set(cells.map((cell) => cell.provenance.category))].toSorted(),
      true_count: trueCount,
    };
  }

  const metrics = {};
  for (const field of SCALAR_TELEMETRY_FIELDS) {
    metrics[field] = resolutionProjection(
      valuesForCells(envelopes, (envelope) => envelope.metrics[field]),
      `${scenario.id}.metrics.${field}`,
      { diagnosticOnly: LATENCY_SCALAR_FIELDS.has(field) },
    );
  }

  const tokenUsage = {};
  for (const role of expectedRoles(scenario)) {
    tokenUsage[role] = {};
    for (const field of TOKEN_FIELDS) {
      tokenUsage[role][field] = resolutionProjection(
        valuesForCells(envelopes, (envelope) => envelope.token_usage_by_role[role][field]),
        `${scenario.id}.token_usage_by_role.${role}.${field}`,
        { diagnosticOnly: true },
      );
    }
  }

  return {
    evidence_provenance_counts: evidenceProjection(envelopes),
    id: scenario.id,
    metrics,
    resolved_outcomes: outcomes,
    run_count: envelopes.length,
    token_usage_by_role: tokenUsage,
  };
}

function goldenOutcomeComparison(registry, grouped) {
  const mismatches = [];
  let resolvedCells = 0;
  for (const scenario of registry.scenarios) {
    for (const envelope of grouped.get(scenario.id) ?? []) {
      for (const field of OUTCOME_FIELDS) {
        resolvedCells += 1;
        const expected = scenario.expected_outcomes[field];
        const actual = envelope.resolved_outcomes[field].value;
        if (actual !== expected) {
          mismatches.push({
            actual,
            expected,
            field,
            run_id: envelope.run_id,
            scenario_id: scenario.id,
          });
        }
      }
    }
  }
  return {
    golden_match_count: resolvedCells - mismatches.length,
    golden_mismatch_count: mismatches.length,
    mismatches,
    resolved_run_outcome_cells: resolvedCells,
    verdict: mismatches.length === 0 ? "matches_control" : "regression_observed",
  };
}

function scenarioDiagnostics(scenario, envelopes) {
  const metricDistributions = {};
  for (const field of SCALAR_TELEMETRY_FIELDS) {
    const cells = valuesForCells(envelopes, (envelope) => envelope.metrics[field]);
    metricDistributions[field] =
      cells[0].resolution === "observed" ? distribution(cells.map((cell) => cell.value)) : null;
  }
  const tokenDistributions = {};
  for (const role of expectedRoles(scenario)) {
    tokenDistributions[role] = {};
    for (const field of TOKEN_FIELDS) {
      tokenDistributions[role][field] = distribution(
        envelopes.map((envelope) => envelope.token_usage_by_role[role][field].value),
      );
    }
  }
  const latencyDistributions = {};
  for (const field of DIAGNOSTIC_LATENCY_FIELDS) {
    const cells = envelopes.map((envelope) => envelope.diagnostics.latency_ms[field]);
    latencyDistributions[field] =
      cells[0].resolution === "observed" ? distribution(cells.map((cell) => cell.value)) : null;
  }
  return {
    id: scenario.id,
    latency_ms: latencyDistributions,
    metrics: metricDistributions,
    token_usage_by_role: tokenDistributions,
  };
}

function coverageFor(registry, grouped, runs) {
  let outcomes = 0;
  let scalars = 0;
  let tokens = 0;
  for (const scenario of registry.scenarios) {
    const envelopes = grouped.get(scenario.id) ?? [];
    if (envelopes.length !== runs) continue;
    outcomes += OUTCOME_FIELDS.length;
    scalars += SCALAR_TELEMETRY_FIELDS.length;
    tokens += expectedRoles(scenario).length * TOKEN_FIELDS.length;
  }
  return {
    resolved_outcome_cells: { actual: outcomes, required: 70 },
    provider_token_cells: { actual: tokens, required: 27 },
    replay_runs: {
      actual: [...grouped.values()].flat().length,
      required: registry.scenarios.length * runs,
    },
    resolved_scalar_cells: { actual: scalars, required: 170 },
    scenarios: { actual: grouped.size, required: RF04_SCENARIO_IDS.length },
  };
}

function assertCoverage(coverage) {
  for (const [label, value] of Object.entries(coverage)) {
    if (value.actual !== value.required) {
      throw new Error(`${label} coverage is ${value.actual}/${value.required}`);
    }
  }
}

export function buildReplayBaseline({
  registry,
  envelopeRecords,
  evidenceRecords,
  driverIdentity,
  harnessManifest,
  anchor = REPLAY_ANCHOR_COMMIT,
  runs = MINIMUM_REPLAY_RUNS,
  allowTestControls = false,
}) {
  assertFixtureRegistry(registry, { historicalBaseline: true });
  if (!Array.isArray(envelopeRecords)) {
    throw new TypeError("replay envelope records must be an array");
  }
  if (!Array.isArray(evidenceRecords)) {
    throw new TypeError("replay evidence records must be an array");
  }
  const driver = object(driverIdentity, "replay driver identity");
  exactKeys(driver, ["contract_version", "path", "sha256"], "replay driver identity");
  assertRelativePath(driver.path, "replay driver identity.path");
  assertSha256(driver.sha256, "replay driver identity.sha256");
  if (anchor !== REPLAY_ANCHOR_COMMIT) {
    throw new Error(`replay anchor must remain exact commit ${REPLAY_ANCHOR_COMMIT}`);
  }
  if (!Number.isInteger(runs) || runs < MINIMUM_REPLAY_RUNS) {
    throw new Error(`replay requires at least ${MINIMUM_REPLAY_RUNS} runs per scenario`);
  }
  if (driver.contract_version !== REPLAY_DRIVER_CONTRACT_VERSION) {
    throw new Error(`replay driver contract must be version ${REPLAY_DRIVER_CONTRACT_VERSION}`);
  }
  const driverHarnessEntry = harnessManifest.files?.find((entry) => entry.path === driver.path);
  const dependencyClaim = assertDependencyClaim(
    harnessManifest.dependency_claim,
    "replay harness dependency claim",
  );
  if (
    harnessManifest.driver_contract_version !== REPLAY_DRIVER_CONTRACT_VERSION ||
    driverHarnessEntry?.sha256 !== driver.sha256
  ) {
    throw new Error("replay harness must include the exact reviewed driver bytes and contract");
  }
  const scenarioById = new Map(registry.scenarios.map((scenario) => [scenario.id, scenario]));
  const registryDigest = fixtureRegistrySha256(registry);
  const evidenceByPath = new Map();
  for (const record of evidenceRecords) {
    const evidencePath = assertRelativePath(record.path, "replay evidence bundle path");
    if (evidenceByPath.has(evidencePath)) {
      throw new Error(`duplicate replay evidence bundle path: ${evidencePath}`);
    }
    evidenceByPath.set(evidencePath, record);
  }
  const grouped = new Map();
  let fixedProfile = null;
  const runManifest = [];
  const seenRunIds = new Set();
  const usedEvidencePaths = new Set();

  for (const record of envelopeRecords) {
    const envelope = record.value;
    const canonical = canonicalBytes(envelope);
    if (record.bytes !== canonical) {
      throw new Error(`${record.path} must use canonical stable JSON with one trailing newline`);
    }
    const { evidenceRecord, profile } = assertReplayEnvelope(envelope, {
      allowTestControls,
      anchor,
      driverIdentity: driver,
      evidenceByPath,
      fixtureRegistrySha256: registryDigest,
      harnessSha256: harnessManifest.sha256,
      dependencyClaim,
      runs,
      scenarioById,
    });
    if (seenRunIds.has(envelope.run_id))
      throw new Error(`duplicate replay run: ${envelope.run_id}`);
    seenRunIds.add(envelope.run_id);
    const profileText = stableJson(profile);
    if (fixedProfile === null) fixedProfile = profileText;
    if (profileText !== fixedProfile) {
      throw new Error(`${envelope.run_id} does not use the fixed replay model/runtime profile`);
    }
    const scenarioRuns = grouped.get(envelope.scenario_id) ?? [];
    scenarioRuns.push(envelope);
    grouped.set(envelope.scenario_id, scenarioRuns);
    usedEvidencePaths.add(
      assertRelativePath(envelope.evidence_bundle.path, "replay envelope.evidence_bundle.path"),
    );
    runManifest.push({
      envelope: {
        path: assertRelativePath(record.path, "replay envelope path"),
        sha256: prefixedSha256(record.bytes),
      },
      evidence_bundle: {
        path: envelope.evidence_bundle.path,
        sha256: prefixedSha256(evidenceRecord.bytes),
      },
      run_id: envelope.run_id,
    });
  }

  if (usedEvidencePaths.size !== evidenceByPath.size) {
    throw new Error("replay evidence directory contains unreferenced or missing evidence bundles");
  }

  for (const scenario of registry.scenarios) {
    const envelopes = (grouped.get(scenario.id) ?? []).toSorted(
      (left, right) => left.run_index - right.run_index,
    );
    if (envelopes.length !== runs) {
      throw new Error(`${scenario.id} has ${envelopes.length}/${runs} required replay runs`);
    }
    const indices = envelopes.map((envelope) => envelope.run_index);
    const expected = Array.from({ length: runs }, (_, index) => index + 1);
    if (stableJson(indices) !== stableJson(expected)) {
      throw new Error(`${scenario.id} replay indices must be exactly 1..${runs}`);
    }
    grouped.set(scenario.id, envelopes);
  }

  const coverage = coverageFor(registry, grouped, runs);
  assertCoverage(coverage);
  const profile = JSON.parse(fixedProfile);
  const goldenComparison = goldenOutcomeComparison(registry, grouped);
  const structuralProjection = {
    anchor_commit: anchor,
    driver,
    fixture_registry_sha256: registryDigest,
    golden_outcome_comparison: goldenComparison,
    harness_sha256: harnessManifest.sha256,
    mode: AGENT_EFFICIENCY_REPLAY_MODE,
    profile_sha256: prefixedSha256(canonicalBytes(profile)),
    scenarios: registry.scenarios.map((scenario) =>
      scenarioProjection(scenario, grouped.get(scenario.id)),
    ),
    schema_version: AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION,
  };
  const diagnostics = {
    captured_at: {
      first: envelopeRecords.map((record) => record.value.diagnostics.captured_at).toSorted()[0],
      last: envelopeRecords
        .map((record) => record.value.diagnostics.captured_at)
        .toSorted()
        .at(-1),
    },
    host_fingerprints: [
      ...new Set(envelopeRecords.map((record) => record.value.diagnostics.host_fingerprint)),
    ].toSorted(),
    scenarios: registry.scenarios.map((scenario) =>
      scenarioDiagnostics(scenario, grouped.get(scenario.id)),
    ),
  };
  const sortedManifest = runManifest.toSorted((left, right) =>
    left.run_id.localeCompare(right.run_id),
  );
  return {
    anchor: {
      driver,
      fixture_registry_sha256: registryDigest,
      harness: harnessManifest,
      subject_sha: anchor,
    },
    capture_profile: profile,
    coverage,
    diagnostics,
    diagnostics_sha256: prefixedSha256(canonicalBytes(diagnostics)),
    golden_outcome_comparison: goldenComparison,
    mode: AGENT_EFFICIENCY_REPLAY_MODE,
    run_manifest: sortedManifest,
    run_manifest_sha256: prefixedSha256(canonicalBytes(sortedManifest)),
    schema_version: AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION,
    status: "complete",
    structural_projection: structuralProjection,
    structural_projection_sha256: prefixedSha256(canonicalBytes(structuralProjection)),
  };
}

export function assertFrozenReplayBaseline(frozen, rebuilt, label = "replay baseline") {
  if (stableJson(frozen) !== stableJson(rebuilt)) {
    throw new Error(
      `${label} is not the deterministic rebuild of its canonical envelopes; ` +
        "changed usage, outcome, provenance, run count, or artifact hashes are rejected",
    );
  }
}

function collectJsonFiles(directory) {
  const result = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...collectJsonFiles(fullPath));
    else if (entry.isSymbolicLink())
      throw new Error(`replay source must not contain symlink: ${fullPath}`);
    else if (entry.isFile() && entry.name.endsWith(".json")) result.push(fullPath);
  }
  return result;
}

function readReplayRecords(repoRoot, sourceDirectory, options) {
  assertRepoPathNoSymlinkEscape(repoRoot, sourceDirectory, `${options.kind} directory`, {
    kind: "directory",
  });
  const stats = lstatSync(sourceDirectory, { throwIfNoEntry: false });
  if (!stats?.isDirectory()) {
    throw new Error(
      `authoritative replay ${options.kind} is absent: provide committed sanitized bytes from an ` +
        "explicitly authorized driver whose provider events expose input_tokens, output_tokens, and reasoning_tokens",
    );
  }
  const files = collectJsonFiles(sourceDirectory).toSorted();
  const logicalRoot = options.logicalRoot
    ? assertRelativePath(options.logicalRoot, `${options.kind} logical root`)
    : relativeRepoPath(repoRoot, sourceDirectory, `${options.kind} directory`);
  return files.map((filePath) => {
    const bytes = readFileSync(filePath, "utf8");
    const relativeFile = path.relative(sourceDirectory, filePath).split(path.sep).join("/");
    return {
      bytes,
      path: path.posix.join(logicalRoot, relativeFile),
      value: JSON.parse(bytes),
    };
  });
}

export function readReplayEnvelopeRecords(repoRoot, sourceDirectory, options = {}) {
  return readReplayRecords(repoRoot, sourceDirectory, {
    kind: "envelopes",
    logicalRoot: options.logicalRoot,
  });
}

export function readReplayEvidenceRecords(repoRoot, sourceDirectory, options = {}) {
  return readReplayRecords(repoRoot, sourceDirectory, {
    kind: "evidence bundles",
    logicalRoot: options.logicalRoot,
  });
}

export function replayBaselineBytes(value) {
  return canonicalBytes(value);
}
