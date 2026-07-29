import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  REPLAY_ANCHOR_COMMIT,
  assertFrozenReplayBaseline,
  buildReplayBaseline,
  createReplayDriverIdentity,
  createReplayHarnessManifest,
  readReplayEvidenceRecords,
  readReplayEnvelopeRecords,
  replayBaselineBytes,
  replayDependencyClaimFromEnvelopeRecords,
  runtimeBridgePaths,
  runtimeBridgeTargetRoot,
} from "../lib/agent-efficiency-replay.mjs";
import {
  defineCheck,
  isDirectRun,
  parseScriptArgs,
  runScriptMain,
} from "../lib/script-runtime.mjs";
import { captureAgentEfficiencyReplay } from "./capture-agent-efficiency-replay.mjs";
import {
  CODEX_REPLAY_CLI_VERSION_ENV,
  assertCodexBinary,
  resolveCodexReplayCliVersion,
} from "./internal/agent-efficiency-codex-runtime.mjs";

const SCRIPT_NAME = "capture-agent-efficiency-runtime-bridge.mjs";
const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const driverPath = path.join(repoRoot, "scripts", "bench", "run-agent-efficiency-codex-replay.mjs");
const registryPath = path.join(repoRoot, "scripts", "bench", "agent-efficiency-fixtures.json");

function helpText() {
  return [
    `Usage: node scripts/bench/${SCRIPT_NAME} --codex-version <version> [options]`,
    "",
    "Capture an additive historical RF-04 baseline under one explicitly declared current Codex runtime.",
    "The frozen pre-v0.7 baseline remains unchanged; bridge artifacts are written only below",
    ".agentplane/cache/rf04-runtime-bridge/ and can qualify only a candidate with the same profile.",
    "",
    "Options:",
    "  --codex-version <version>  Required exact Codex CLI version.",
    "  --check                    Rebuild and validate an existing bridge without provider calls.",
    "  --replace                  Replace one complete unpublished bridge capture generation.",
    "  --help                     Show this help.",
  ].join("\n");
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["codex-version"],
    booleanFlags: ["check", "help", "replace"],
    aliases: { h: "help" },
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  return {
    check: flags.check === true,
    codexCliVersion: flags["codex-version"] ?? "",
    help: flags.help === true,
    replace: flags.replace === true,
  };
}

function resolveCodexCliVersion(value) {
  return resolveCodexReplayCliVersion({ [CODEX_REPLAY_CLI_VERSION_ENV]: value });
}

function assertRuntimeProfile(baseline, codexCliVersion) {
  if (baseline.capture_profile?.runtime_version !== `0.6.24/${codexCliVersion}`) {
    throw new Error("runtime bridge baseline does not bind the declared Codex runtime profile");
  }
}

function providerEpisodes(baseline) {
  return baseline.diagnostics.scenarios.reduce((total, scenario) => {
    const episodes = scenario.metrics?.llm_episodes;
    if (
      !Number.isInteger(episodes?.count) ||
      !Number.isInteger(episodes?.mean) ||
      episodes.count < 0 ||
      episodes.mean < 0
    ) {
      throw new Error("runtime bridge baseline has no exact provider-episode telemetry");
    }
    return total + episodes.count * episodes.mean;
  }, 0);
}

export function checkRuntimeBridge({ codexCliVersion }) {
  const paths = runtimeBridgePaths(repoRoot, codexCliVersion);
  const frozenBytes = readFileSync(paths.baselinePath, "utf8");
  const frozen = JSON.parse(frozenBytes);
  const envelopeRecords = readReplayEnvelopeRecords(repoRoot, paths.envelopeDirectory);
  const evidenceRecords = readReplayEvidenceRecords(repoRoot, paths.evidenceDirectory);
  const driverIdentity = createReplayDriverIdentity(repoRoot, frozen.anchor.driver.path);
  const dependencyClaim = replayDependencyClaimFromEnvelopeRecords(envelopeRecords);
  const harnessManifest = createReplayHarnessManifest(repoRoot, driverIdentity, {
    dependencyClaim,
  });
  const baseline = buildReplayBaseline({
    anchor: REPLAY_ANCHOR_COMMIT,
    driverIdentity,
    envelopeRecords,
    evidenceRecords,
    harnessManifest,
    registry: JSON.parse(readFileSync(registryPath, "utf8")),
  });
  if (frozenBytes !== replayBaselineBytes(frozen)) {
    throw new Error("runtime bridge baseline is not canonical JSON");
  }
  assertFrozenReplayBaseline(frozen, baseline, "runtime bridge baseline");
  assertRuntimeProfile(baseline, codexCliVersion);
  return baseline;
}

export function captureRuntimeBridge({ codexCliVersion, replace }) {
  const paths = runtimeBridgePaths(repoRoot, codexCliVersion);
  assertCodexBinary({ [CODEX_REPLAY_CLI_VERSION_ENV]: codexCliVersion });
  const baseline = captureAgentEfficiencyReplay({
    anchor: REPLAY_ANCHOR_COMMIT,
    codexCliVersion,
    driverPath,
    evidenceDirectory: paths.evidenceDirectory,
    outputPath: paths.baselinePath,
    registryPath,
    replace,
    runtimeBridgeTargetRoot: runtimeBridgeTargetRoot(repoRoot),
    runs: 5,
    sourceDirectory: paths.envelopeDirectory,
  });
  assertRuntimeProfile(baseline, codexCliVersion);
  return baseline;
}

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options, stdout }) {
    if (options.help) {
      stdout.write(`${helpText()}\n`);
      return;
    }
    const codexCliVersion = resolveCodexCliVersion(options.codexCliVersion);
    const baseline = options.check
      ? checkRuntimeBridge({ codexCliVersion })
      : captureRuntimeBridge({ codexCliVersion, replace: options.replace });
    stdout.write(
      `RF-04 runtime bridge ${options.check ? "validated" : "captured"} ` +
        `(runtime=${baseline.capture_profile.runtime_version}; runs=${baseline.coverage.replay_runs.actual}; ` +
        `episodes=${providerEpisodes(baseline)})\n`,
    );
  },
});

if (isDirectRun(import.meta.url)) {
  runScriptMain(main);
}
