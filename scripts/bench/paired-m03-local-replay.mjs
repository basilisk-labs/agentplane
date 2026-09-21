import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { stableJson } from "../lib/agent-efficiency-baseline.mjs";
import { isDirectRun, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const defaultRepoRoot = path.resolve(path.dirname(scriptPath), "../..");
const DEFAULT_PREVIOUS_REVISION = "v0.7.10";
const DEFAULT_CANDIDATE_REVISION = "HEAD";
const M03_SCENARIOS = Object.freeze([
  { id: "direct", workflow: "direct", class: "normal" },
  { id: "branch_pr", workflow: "branch_pr", class: "normal" },
  { id: "evaluator_rework", workflow: "branch_pr", class: "recovery" },
  { id: "adapter_failure", workflow: "shared", class: "negative" },
]);
const PINNED_EQUAL_PATHS = Object.freeze([
  "packages/agentplane/src/workflow-lifecycle/contract.ts",
  "scripts/bench/paired-production-driver.mjs",
  "scripts/bench/paired-result-report.mjs",
  "scripts/bench/agent-efficiency-fixtures.json",
  "scripts/bench/agent-efficiency-replay-envelopes",
  "scripts/bench/agent-efficiency-replay-evidence",
  "scripts/baselines/agent-efficiency-pre-v0.7-replay.json",
]);
const DELTA_ROOTS = Object.freeze([
  "packages/agentplane/src/commands/task",
  "packages/agentplane/src/kernel",
  "packages/agentplane/src/runner",
]);

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function git(repoRoot, args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function resolveCommit(repoRoot, revision, label) {
  try {
    return git(repoRoot, ["rev-parse", "--verify", `${revision}^{commit}`]);
  } catch {
    throw new Error(`${label} revision is not an available commit: ${revision}`);
  }
}

function revisionBytes(repoRoot, revision, relativePath) {
  try {
    return execFileSync("git", ["show", `${revision}:${relativePath}`], {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch {
    throw new Error(`${relativePath} is unavailable at ${revision}`);
  }
}

function revisionObject(repoRoot, revision, relativePath) {
  try {
    return git(repoRoot, ["rev-parse", `${revision}:${relativePath}`]);
  } catch {
    throw new Error(`${relativePath} is unavailable at ${revision}`);
  }
}

export function extractWorkflowCommandObligations(source, workflow) {
  const startMarker = `  ${workflow}: {`;
  const start = source.indexOf(startMarker);
  if (start < 0) throw new Error(`Lifecycle contract is missing ${workflow}.`);
  const commandStart = source.indexOf("    commandSteps: [", start);
  const commandEnd = source.indexOf("    gatewayCommandOrder:", commandStart);
  if (commandStart < 0 || commandEnd < 0) {
    throw new Error(`Lifecycle contract has no bounded commandSteps block for ${workflow}.`);
  }
  const block = source.slice(commandStart, commandEnd);
  const obligations = [];
  const pattern = /id:\s*"([^"]+)"[\s\S]*?role:\s*"([^"]+)"/gu;
  for (const match of block.matchAll(pattern)) {
    obligations.push({ step: match[1], role: match[2] });
  }
  if (obligations.length === 0) {
    throw new Error(`Lifecycle contract has no role obligations for ${workflow}.`);
  }
  return obligations;
}

export function assertEqualMandatoryObligations(previous, candidate, workflow) {
  if (stableJson(previous) !== stableJson(candidate)) {
    throw new Error(`M03 mandatory role obligations changed for ${workflow}.`);
  }
}

function changedFiles(repoRoot, previousCommit, candidateCommit) {
  const output = git(repoRoot, [
    "diff",
    "--numstat",
    `${previousCommit}..${candidateCommit}`,
    "--",
    ...DELTA_ROOTS,
  ]);
  if (output.length === 0) return [];
  return output.split("\n").map((line) => {
    const [insertions, deletions, ...pathParts] = line.split("\t");
    const file = pathParts.join("\t");
    return {
      path: file,
      insertions: insertions === "-" ? null : Number.parseInt(insertions, 10),
      deletions: deletions === "-" ? null : Number.parseInt(deletions, 10),
    };
  });
}

function summarizeDeltas(files) {
  const totals = files.reduce(
    (summary, file) => ({
      files: summary.files + 1,
      insertions: summary.insertions + (file.insertions ?? 0),
      deletions: summary.deletions + (file.deletions ?? 0),
    }),
    { files: 0, insertions: 0, deletions: 0 },
  );
  const categories = {
    preparation: files.filter((file) =>
      /(?:materializ|readiness|admission|work-order)/u.test(file.path),
    ),
    observation: files.filter((file) => /(?:observ|evidence|receipt|journal)/u.test(file.path)),
    recovery: files.filter((file) => /(?:recover|rework|stale|migration|repair)/u.test(file.path)),
  };
  return {
    ...totals,
    categories: Object.fromEntries(
      Object.entries(categories).map(([category, selected]) => [
        category,
        { files: selected.length, paths: selected.map((file) => file.path).toSorted() },
      ]),
    ),
  };
}

function scenarioEvidence(repoRoot, candidateCommit, registry, scenario) {
  const registryScenario = registry.scenarios.find((entry) => entry.id === scenario.id);
  if (!registryScenario) throw new Error(`M03 registry is missing scenario ${scenario.id}.`);
  const envelopeRoot = `scripts/bench/agent-efficiency-replay-envelopes/${scenario.id}`;
  const evidenceRoot = `scripts/bench/agent-efficiency-replay-evidence/${scenario.id}`;
  const envelopes = git(repoRoot, ["ls-tree", "-r", "--name-only", candidateCommit, envelopeRoot])
    .split("\n")
    .filter(Boolean);
  const evidence = git(repoRoot, ["ls-tree", "-r", "--name-only", candidateCommit, evidenceRoot])
    .split("\n")
    .filter(Boolean);
  if (envelopes.length === 0 || envelopes.length !== evidence.length) {
    throw new Error(`M03 scenario ${scenario.id} has incomplete frozen replay coverage.`);
  }
  return {
    id: scenario.id,
    workflow: scenario.workflow,
    class: scenario.class,
    replay_runs: envelopes.length,
    mandatory_episode_obligations: registryScenario.expected_episode_trace,
    expected_outcomes: registryScenario.expected_outcomes,
    frozen_envelopes: envelopes,
    frozen_evidence: evidence,
    result: "unchanged",
  };
}

export function buildM03LocalReplayDisposition({
  repoRoot = defaultRepoRoot,
  previousRevision = DEFAULT_PREVIOUS_REVISION,
  candidateRevision = DEFAULT_CANDIDATE_REVISION,
} = {}) {
  const previousCommit = resolveCommit(repoRoot, previousRevision, "Previous release");
  const candidateCommit = resolveCommit(repoRoot, candidateRevision, "Candidate");
  if (previousCommit === candidateCommit) {
    throw new Error("M03 previous release and candidate must resolve to different commits.");
  }

  const pinnedArtifacts = Object.fromEntries(
    PINNED_EQUAL_PATHS.map((relativePath) => {
      const previousObject = revisionObject(repoRoot, previousCommit, relativePath);
      const candidateObject = revisionObject(repoRoot, candidateCommit, relativePath);
      if (previousObject !== candidateObject) {
        throw new Error(`M03 frozen contract changed: ${relativePath}`);
      }
      return [relativePath, { git_object: candidateObject, equal: true }];
    }),
  );

  const contractPath = "packages/agentplane/src/workflow-lifecycle/contract.ts";
  const previousContract = revisionBytes(repoRoot, previousCommit, contractPath);
  const candidateContract = revisionBytes(repoRoot, candidateCommit, contractPath);
  const mandatoryRoles = Object.fromEntries(
    ["direct", "branch_pr"].map((workflow) => {
      const previous = extractWorkflowCommandObligations(previousContract, workflow);
      const candidate = extractWorkflowCommandObligations(candidateContract, workflow);
      assertEqualMandatoryObligations(previous, candidate, workflow);
      return [workflow, { equal: true, obligations: candidate }];
    }),
  );

  const registry = JSON.parse(
    revisionBytes(repoRoot, candidateCommit, "scripts/bench/agent-efficiency-fixtures.json"),
  );
  const workflows = M03_SCENARIOS.map((scenario) =>
    scenarioEvidence(repoRoot, candidateCommit, registry, scenario),
  );
  const deltaFiles = changedFiles(repoRoot, previousCommit, candidateCommit);
  const payload = {
    schema_version: 1,
    kind: "agentplane.m03_local_replay_disposition",
    experiment: "M03",
    comparison: {
      previous_release: { version: "0.7.10", commit: previousCommit },
      candidate: { version: "0.7.11-unreleased", commit: candidateCommit },
      mode: "offline_local_replay",
      provider_calls: 0,
      network: "deny",
    },
    mandatory_role_obligations: mandatoryRoles,
    workflow_results: workflows,
    failed_attempt_accounting: {
      all_assigned_attempts_retained: true,
      failed_attempts_remain_in_cost_numerator: true,
      zero_success_has_finite_efficiency_score: false,
      contract: "scripts/bench/paired-result-report.mjs",
      limitation:
        "Frozen replay validates accounting and safety structure, not current provider cost.",
    },
    frozen_contracts: pinnedArtifacts,
    lifecycle_delta: summarizeDeltas(deltaFiles),
    disposition: {
      safety: "pass",
      efficiency: "not_established",
      release_gate: "measurement_debt_requires_release_owner_acceptance",
      performance_claim: null,
      reasons: [
        "No paid provider campaign was authorized by this work order.",
        "Local replay has no current provider token or monetary cost telemetry.",
        "Architectural deletion and source deltas are not evidence of cost reduction.",
      ],
    },
    required_checks: [
      "bun run bench:agent-efficiency:check",
      "bun run bench:agent-efficiency:replay:check",
    ],
  };
  return { ...payload, digest: sha256(canonicalBytes(payload)) };
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["previous", "candidate", "output"],
    booleanFlags: ["check", "help"],
  });
  if (positionals.length > 0) throw new Error("M03 replay does not accept positional arguments.");
  if (flags.help === true) return { help: true };
  if (typeof flags.output !== "string" || flags.output.length === 0) {
    throw new Error("--output is required.");
  }
  return {
    help: false,
    check: flags.check === true,
    previousRevision: flags.previous ?? DEFAULT_PREVIOUS_REVISION,
    candidateRevision: flags.candidate ?? DEFAULT_CANDIDATE_REVISION,
    outputPath: path.resolve(flags.output),
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(
      "Usage: node scripts/bench/paired-m03-local-replay.mjs --output <disposition.json> [--previous <ref>] [--candidate <ref>] [--check]\n",
    );
    return;
  }
  const disposition = buildM03LocalReplayDisposition({
    previousRevision: options.previousRevision,
    candidateRevision: options.candidateRevision,
  });
  const bytes = canonicalBytes(disposition);
  if (options.check) {
    const existing = readFileSync(options.outputPath, "utf8");
    if (existing !== bytes) throw new Error("M03 local replay disposition is stale.");
  } else {
    mkdirSync(path.dirname(options.outputPath), { recursive: true });
    writeFileSync(options.outputPath, bytes, { encoding: "utf8", mode: 0o600 });
  }
  process.stdout.write(`${disposition.digest}\n`);
}

if (isDirectRun(import.meta.url)) runScriptMain(main);
