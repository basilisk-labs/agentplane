import { lstatSync, readFileSync, realpathSync } from "node:fs";
import path from "node:path";

import { stableJson } from "../../lib/agent-efficiency-baseline.mjs";
import { fixtureRegistrySha256 } from "../../lib/agent-efficiency-replay.mjs";
import { REPLAY_CONTRACT_ENV_KEYS } from "../../lib/agent-efficiency-replay-safety.mjs";
import { fail } from "./agent-efficiency-codex-runtime.mjs";
import { git } from "./agent-efficiency-anchor-supervisor.mjs";

const FIXTURE_REGISTRY_OVERLAY = ".rf04-runtime/fixture-control/agent-efficiency-fixtures.json";
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;

function readFixtureRegistryOverlay(subjectRoot) {
  if (
    process.env.AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_ORIGIN !== "fixture_control_overlay_v1" ||
    process.env.AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_PATH !== FIXTURE_REGISTRY_OVERLAY
  ) {
    fail("FIXTURE_REGISTRY_ORIGIN");
  }
  const root = path.resolve(realpathSync(subjectRoot));
  const filePath = path.resolve(subjectRoot, FIXTURE_REGISTRY_OVERLAY);
  if (!filePath.startsWith(`${root}${path.sep}`)) fail("FIXTURE_REGISTRY_PATH");
  let current = root;
  for (const segment of FIXTURE_REGISTRY_OVERLAY.split("/")) {
    current = path.join(current, segment);
    const stats = lstatSync(current, { throwIfNoEntry: false });
    if (!stats || stats.isSymbolicLink()) fail("FIXTURE_REGISTRY_PATH");
  }
  const stats = lstatSync(filePath);
  if (!stats.isFile() || path.resolve(realpathSync(filePath)) !== filePath) {
    fail("FIXTURE_REGISTRY_PATH");
  }
  if (
    git(subjectRoot, ["ls-files", "--", FIXTURE_REGISTRY_OVERLAY], "FIXTURE_REGISTRY_TRACKED") !==
    ""
  ) {
    fail("FIXTURE_REGISTRY_TRACKED");
  }
  const bytes = readFileSync(filePath, "utf8");
  let registry;
  try {
    registry = JSON.parse(bytes);
  } catch {
    fail("FIXTURE_REGISTRY_JSON");
  }
  if (`${stableJson(registry, 2)}\n` !== bytes) fail("FIXTURE_REGISTRY_CANONICAL");
  if (
    fixtureRegistrySha256(registry) !== process.env.AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_SHA256
  ) {
    fail("FIXTURE_REGISTRY_DIGEST");
  }
  return registry;
}

export function readReplayDriverContract(subjectRoot, options, supportedScenarioIds) {
  const contractKeys = Object.keys(process.env)
    .filter((name) => name.startsWith("AGENTPLANE_RF04_REPLAY_"))
    .toSorted();
  if (stableJson(contractKeys) !== stableJson([...REPLAY_CONTRACT_ENV_KEYS].toSorted())) {
    fail("CONTRACT_ENV_KEYS");
  }
  for (const name of REPLAY_CONTRACT_ENV_KEYS) {
    if (typeof process.env[name] !== "string" || process.env[name].length === 0) {
      fail("CONTRACT_ENV");
    }
  }
  const registry = readFixtureRegistryOverlay(subjectRoot);
  const anchor = process.env.AGENTPLANE_RF04_REPLAY_ANCHOR;
  if (registry.provenance?.efficiency_anchor_commit !== anchor) fail("ANCHOR_CONTRACT");
  const scenario = registry.scenarios.find((item) => item.id === options.scenarioId);
  if (!scenario || !supportedScenarioIds.has(options.scenarioId)) fail("SCENARIO");
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
  let capturePlatform;
  try {
    capturePlatform = JSON.parse(process.env.AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_PLATFORM);
  } catch {
    fail("DEPENDENCY_CAPTURE_PLATFORM");
  }
  const dependencyClaim = {
    capture_executable_sha256:
      process.env.AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_EXECUTABLE_SHA256,
    capture_platform: capturePlatform,
    capture_receipt_sha256: process.env.AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_RECEIPT_SHA256,
    portable_sha256: process.env.AGENTPLANE_RF04_REPLAY_DEPENDENCY_PORTABLE_SHA256,
  };
  if (
    stableJson(Object.keys(capturePlatform ?? {}).toSorted()) !==
      stableJson(["arch", "libc", "node_abi", "platform"]) ||
    !SHA256_PATTERN.test(dependencyClaim.capture_executable_sha256) ||
    !SHA256_PATTERN.test(dependencyClaim.capture_receipt_sha256) ||
    !SHA256_PATTERN.test(dependencyClaim.portable_sha256)
  ) {
    fail("DEPENDENCY_CAPTURE_CLAIM");
  }
  return { anchor, dependencyClaim, expectedRoles, registry, runId, scenario };
}
