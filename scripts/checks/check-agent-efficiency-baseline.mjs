import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  compareAgentEfficiencyMeasurements,
  fixtureArtifactPaths,
  readAgentEfficiencyMeasurement,
  readFixtureRegistry,
  relativeRepoPath,
  stableJson,
  structuralProjectionBytes,
} from "../lib/agent-efficiency-baseline.mjs";
import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import { measureAgentEfficiency } from "../bench/measure-agent-efficiency.mjs";

const SCRIPT_NAME = "check-agent-efficiency-baseline.mjs";
const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const DEFAULT_FIXTURES_PATH = path.join(
  repoRoot,
  "scripts",
  "bench",
  "agent-efficiency-fixtures.json",
);
const DEFAULT_BASELINE_PATH = path.join(
  repoRoot,
  "scripts",
  "baselines",
  "agent-efficiency-pre-v0.7-main.json",
);

function helpText() {
  return [
    `Usage: node scripts/checks/${SCRIPT_NAME} [options]`,
    "",
    "Rebuild the frozen pre-v0.7 baseline, validate Git-anchored telemetry provenance,",
    "and apply quality-aware observability and 10% structural-cost ratchets.",
    "Timing diagnostics are validated for separation but are never compared.",
    "",
    "Options:",
    "  --fixtures <path>    Historical fixture registry. Default: scripts/bench/agent-efficiency-fixtures.json",
    "  --baseline <path>    Frozen baseline. Default: scripts/baselines/agent-efficiency-pre-v0.7-main.json",
    "  --measurement <path> Candidate measurement; it is rebuilt from its own in-repo fixture registry.",
    "  --help               Show this help text.",
  ].join("\n");
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["fixtures", "baseline", "measurement"],
    booleanFlags: ["help"],
    aliases: { h: "help" },
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  return {
    fixturesPath: path.resolve(flags.fixtures ?? DEFAULT_FIXTURES_PATH),
    baselinePath: path.resolve(flags.baseline ?? DEFAULT_BASELINE_PATH),
    measurementPath: flags.measurement ? path.resolve(flags.measurement) : null,
    help: flags.help === true,
  };
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function assertCommit(anchor) {
  let type;
  try {
    type = execFileSync("git", ["cat-file", "-t", anchor], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    throw new Error(`efficiency anchor is not available in Git: ${anchor}`);
  }
  if (type !== "commit")
    throw new Error(`efficiency anchor must be a commit, got ${type}: ${anchor}`);
}

function anchorBlob(anchor, relativePath) {
  try {
    return execFileSync("git", ["show", `${anchor}:${relativePath}`], {
      cwd: repoRoot,
      encoding: null,
      maxBuffer: 10 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    const stderr =
      error && typeof error === "object" && Buffer.isBuffer(error.stderr)
        ? error.stderr.toString("utf8").trim()
        : "";
    throw new Error(
      `fixture artifact is not committed at efficiency anchor ${anchor}: ${relativePath}${
        stderr ? ` (${stderr})` : ""
      }`,
    );
  }
}

function sourceHashesByPath(measurement) {
  const hashes = new Map();
  for (const scenario of measurement.structural_projection.scenarios) {
    const source = scenario.source_artifact;
    if (!source) continue;
    hashes.set(source.paths.run_state, source.sha256.run_state);
    hashes.set(source.paths.bundle, source.sha256.bundle);
    hashes.set(source.paths.bootstrap, source.sha256.bootstrap);
  }
  return hashes;
}

function verifyArtifactProvenance(registry, measurement, label) {
  const anchor = registry.provenance.efficiency_anchor_commit;
  assertCommit(anchor);
  const hashes = sourceHashesByPath(measurement);
  const failures = [];
  for (const rawPath of fixtureArtifactPaths(registry)) {
    const artifactPath = relativeRepoPath(repoRoot, rawPath, `${label} artifact path`);
    const expectedHash = hashes.get(artifactPath);
    if (!expectedHash) {
      failures.push(`${label}.${artifactPath}: measurement omitted artifact hash`);
      continue;
    }
    const anchoredHash = sha256(anchorBlob(anchor, artifactPath));
    if (anchoredHash !== expectedHash) {
      failures.push(
        `${label}.${artifactPath}: working-tree sha256 ${expectedHash} differs from anchor sha256 ${anchoredHash}`,
      );
    }
  }
  return failures;
}

function verifyRegistryProvenance(registryPath, registry, measurement, label) {
  const anchor = registry.provenance.efficiency_anchor_commit;
  assertCommit(anchor);
  const relativePath = relativeRepoPath(repoRoot, registryPath, `${label} fixture registry`);
  let anchoredRegistry;
  try {
    anchoredRegistry = JSON.parse(anchorBlob(anchor, relativePath).toString("utf8"));
  } catch (error) {
    return [
      `${label}.${relativePath}: fixture registry is not valid JSON at candidate anchor ${anchor}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    ];
  }
  const anchoredDigest = `sha256:${sha256(`${stableJson(anchoredRegistry, 2)}\n`)}`;
  const failures = [];
  if (anchoredDigest !== measurement.fixture_registry_sha256) {
    failures.push(
      `${label}.${relativePath}: fixture registry digest differs from candidate anchor ${anchor}`,
    );
  }
  if (stableJson(anchoredRegistry) !== stableJson(registry)) {
    failures.push(
      `${label}.${relativePath}: working fixture registry differs from candidate anchor`,
    );
  }
  return failures;
}

function verifyTimingSeparation(measurement, label) {
  const failures = [];
  const structuralText = stableJson(measurement.structural_projection);
  if (structuralText.includes('"duration_ms"')) {
    failures.push(`${label}: duration_ms leaked into the structural projection`);
  }
  for (const timing of measurement.timing_diagnostics.scenarios) {
    if (timing.duration_ms?.sufficient_for_comparison !== false) {
      failures.push(`${label}.${timing.id}: timing must remain diagnostic-only`);
    }
  }
  return failures;
}

function candidateRegistryPath(candidate) {
  const relative = relativeRepoPath(
    repoRoot,
    candidate.fixture_registry,
    "candidate.fixture_registry",
  );
  return path.join(repoRoot, relative);
}

function exactRebuildFailures(actual, rebuilt, label) {
  if (stableJson(actual) === stableJson(rebuilt)) return [];
  return [
    `${label} is not the deterministic output of its fixture registry and anchored artifacts; ` +
      "self-rehashed or manually edited telemetry is not accepted",
  ];
}

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options, stdout }) {
    if (options.help) {
      stdout.write(`${helpText()}\n`);
      return;
    }

    const historicalRegistry = readFixtureRegistry(options.fixturesPath, {
      historicalBaseline: true,
    });
    const baseline = readAgentEfficiencyMeasurement(options.baselinePath, "frozen baseline", {
      historicalBaseline: true,
    });
    const first = measureAgentEfficiency({
      fixturesPath: options.fixturesPath,
      historicalBaseline: true,
    });
    const second = measureAgentEfficiency({
      fixturesPath: options.fixturesPath,
      historicalBaseline: true,
    });
    const failures = [];

    if (structuralProjectionBytes(first) !== structuralProjectionBytes(second)) {
      failures.push("structural projection is not byte-stable across two fixture runs");
    }
    failures.push(
      ...exactRebuildFailures(baseline, first, "frozen baseline"),
      ...verifyArtifactProvenance(historicalRegistry, first, "baseline"),
      ...verifyTimingSeparation(baseline, "baseline"),
    );

    let candidate = first;
    if (options.measurementPath) {
      candidate = readAgentEfficiencyMeasurement(options.measurementPath, "candidate measurement");
      const registryPath = candidateRegistryPath(candidate);
      const candidateRegistry = readFixtureRegistry(registryPath);
      const rebuiltCandidate = measureAgentEfficiency({
        fixturesPath: registryPath,
        historicalBaseline: false,
      });
      failures.push(
        ...exactRebuildFailures(candidate, rebuiltCandidate, "candidate measurement"),
        ...verifyArtifactProvenance(candidateRegistry, rebuiltCandidate, "candidate"),
      );
      if (stableJson(candidate) !== stableJson(baseline)) {
        failures.push(
          ...verifyRegistryProvenance(
            registryPath,
            candidateRegistry,
            rebuiltCandidate,
            "candidate",
          ),
        );
      }
    }
    failures.push(...verifyTimingSeparation(candidate, "candidate"));

    const comparison = compareAgentEfficiencyMeasurements(candidate, baseline);
    failures.push(...comparison.failures);
    if (failures.length > 0) {
      throw new Error(
        [
          "agent-efficiency baseline guard failed:",
          ...failures.map((failure) => `- ${failure}`),
          "",
          "Regressions fail. Quality/evidence improvements pass without cost comparison. " +
            "Exact quality enables the 10% cost ratchet. Timing is diagnostic-only.",
        ].join("\n"),
      );
    }

    stdout.write(
      `Agent-efficiency baseline OK (10 RF-04 scenarios; ${comparison.compared_metric_count} measured cost metrics; ` +
        `structural_sha256=${candidate.structural_projection_sha256}; timing_compared=false; ` +
        `summaries=${comparison.summaries.length})\n`,
    );
  },
});

runScriptMain(main);
