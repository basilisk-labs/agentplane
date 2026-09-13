import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";

import { stableJson } from "../lib/agent-efficiency-baseline.mjs";
import { isDirectRun, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import {
  runCandidateCaptureJobs,
  withDisposableCandidateRepository,
} from "./capture-agent-efficiency-candidate.mjs";

export const PAIRED_CAMPAIGN_ARMS = Object.freeze([
  "minimal_agent",
  "previous_release",
  "candidate",
]);
export const PAIRED_CAMPAIGN_TRANSPORTS = Object.freeze(["managed", "external"]);

const SHA_PATTERN = /^[a-f0-9]{40}$/u;
const DIGEST_PATTERN = /^sha256:[a-f0-9]{64}$/u;
const COST_STATES = new Set(["observed", "unknown"]);

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function exactDigest(value, label) {
  if (typeof value !== "string" || !DIGEST_PATTERN.test(value)) {
    throw new Error(`${label} must be a sha256 digest.`);
  }
  return value;
}

function exactSha(value, label) {
  if (typeof value !== "string" || !SHA_PATTERN.test(value)) {
    throw new Error(`${label} must be a full Git commit SHA.`);
  }
  return value;
}

function exactNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value;
}

function exactStringArray(value, label) {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((entry) => typeof entry !== "string" || entry.length === 0)
  ) {
    throw new Error(`${label} must be a non-empty string array.`);
  }
  return value;
}

function same(left, right) {
  return stableJson(left) === stableJson(right);
}

function assertRegularArtifact(filePath, expectedDigest, label) {
  const resolved = path.resolve(filePath);
  const stats = lstatSync(resolved, { throwIfNoEntry: false });
  if (!stats?.isFile() || stats.isSymbolicLink()) {
    throw new Error(`${label} must be a regular non-symlink file.`);
  }
  const canonical = realpathSync(resolved);
  if (sha256(readFileSync(canonical)) !== expectedDigest) {
    throw new Error(`${label} does not match its pinned artifact digest.`);
  }
  return canonical;
}

function validateRawCost(value, label) {
  if (!isRecord(value) || !COST_STATES.has(value.state)) {
    throw new Error(`${label}.raw_cost must declare observed or unknown state.`);
  }
  exactDigest(value.basis_digest, `${label}.raw_cost.basis_digest`);
  exactNonEmptyString(value.currency, `${label}.raw_cost.currency`);
  if (value.state === "observed") {
    if (typeof value.amount !== "number" || !Number.isFinite(value.amount) || value.amount < 0) {
      throw new Error(`${label}.raw_cost.amount must be a non-negative finite number.`);
    }
    if (value.reason !== undefined) {
      throw new Error(`${label}.raw_cost observed state must not declare a reason.`);
    }
  } else {
    if (value.amount !== null) {
      throw new Error(`${label}.raw_cost unknown state must use amount=null.`);
    }
    exactNonEmptyString(value.reason, `${label}.raw_cost.reason`);
  }
  return value;
}

function validateCommand(value, label) {
  return exactStringArray(value, label).map(String);
}

function validateClaimPolicy(value) {
  if (
    !isRecord(value) ||
    !Number.isSafeInteger(value.minimum_paired_successes) ||
    value.minimum_paired_successes < 1 ||
    typeof value.max_candidate_to_previous_cost_ratio !== "number" ||
    !Number.isFinite(value.max_candidate_to_previous_cost_ratio) ||
    value.max_candidate_to_previous_cost_ratio <= 0 ||
    typeof value.require_candidate_better_than_minimal !== "boolean"
  ) {
    throw new Error("claim_policy must pin the paired coverage and efficiency thresholds.");
  }
  return value;
}

function validateProduct(product, arm) {
  if (!isRecord(product)) throw new Error(`products.${arm} must be an object.`);
  const artifactDigest = exactDigest(product.artifact_sha256, `products.${arm}.artifact_sha256`);
  const artifactPath = assertRegularArtifact(
    exactNonEmptyString(product.artifact_path, `products.${arm}.artifact_path`),
    artifactDigest,
    `products.${arm}.artifact_path`,
  );
  const entrypoint = validateCommand(product.entrypoint, `products.${arm}.entrypoint`);
  if (realpathSync(path.resolve(entrypoint[0])) !== artifactPath) {
    throw new Error(`products.${arm}.entrypoint must start with its pinned artifact_path.`);
  }
  return {
    arm,
    artifact_path: artifactPath,
    artifact_sha256: artifactDigest,
    source_sha: exactSha(product.source_sha, `products.${arm}.source_sha`),
    entrypoint,
  };
}

function validateRunIdentity(run, index, manifest) {
  const label = `runs[${index}]`;
  if (!isRecord(run)) throw new Error(`${label} must be an object.`);
  if (!PAIRED_CAMPAIGN_ARMS.includes(run.arm)) throw new Error(`${label}.arm is unsupported.`);
  if (!PAIRED_CAMPAIGN_TRANSPORTS.includes(run.transport)) {
    throw new Error(`${label}.transport is unsupported.`);
  }
  const product = manifest.products[run.arm];
  const expected = {
    target_commit: manifest.target.commit,
    target_tree: manifest.target.tree,
    product_source_sha: product.source_sha,
    product_artifact_sha256: product.artifact_sha256,
    adapter: manifest.constants.adapter,
    model: manifest.constants.model,
    reasoning_effort: manifest.constants.reasoning_effort,
    authority_digest: manifest.constants.authority_digest,
    check_ids: manifest.constants.check_ids,
    retry_limit: manifest.constants.retry_limit,
    runtime_profile: manifest.constants.runtime_profile,
    verifier_digest: manifest.verifier.artifact_sha256,
  };
  for (const [field, expectedValue] of Object.entries(expected)) {
    if (!same(run[field], expectedValue)) {
      throw new Error(`${label}.${field} does not match the fixed campaign identity.`);
    }
  }
  if (!Number.isSafeInteger(run.order) || run.order < 1) {
    throw new Error(`${label}.order must be a positive integer.`);
  }
  return {
    ...run,
    id: exactNonEmptyString(run.id, `${label}.id`),
    pair_id: exactNonEmptyString(run.pair_id, `${label}.pair_id`),
  };
}

export function validatePairedCampaignManifest(value) {
  if (!isRecord(value) || value.schema_version !== 1) {
    throw new Error("Paired campaign manifest must use schema_version=1.");
  }
  if (value.kind !== "agentplane.paired_production_campaign") {
    throw new Error("Paired campaign manifest has an unsupported kind.");
  }
  if (!isRecord(value.target)) throw new Error("target must be an object.");
  const repositoryPath = path.resolve(
    exactNonEmptyString(value.target.repository_path, "target.repository_path"),
  );
  const target = {
    repository_path: repositoryPath,
    commit: exactSha(value.target.commit, "target.commit"),
    tree: exactSha(value.target.tree, "target.tree"),
  };
  if (!isRecord(value.products)) throw new Error("products must be an object.");
  const products = Object.fromEntries(
    PAIRED_CAMPAIGN_ARMS.map((arm) => [arm, validateProduct(value.products[arm], arm)]),
  );
  if (!isRecord(value.constants)) throw new Error("constants must be an object.");
  const constants = {
    adapter: exactNonEmptyString(value.constants.adapter, "constants.adapter"),
    model: exactNonEmptyString(value.constants.model, "constants.model"),
    reasoning_effort: exactNonEmptyString(
      value.constants.reasoning_effort,
      "constants.reasoning_effort",
    ),
    authority_digest: exactDigest(value.constants.authority_digest, "constants.authority_digest"),
    check_ids: exactStringArray(value.constants.check_ids, "constants.check_ids"),
    retry_limit: value.constants.retry_limit,
    runtime_profile: value.constants.runtime_profile,
    cache_policy: exactNonEmptyString(value.constants.cache_policy, "constants.cache_policy"),
    session_policy: exactNonEmptyString(value.constants.session_policy, "constants.session_policy"),
    sandbox: exactNonEmptyString(value.constants.sandbox, "constants.sandbox"),
    network: exactNonEmptyString(value.constants.network, "constants.network"),
    raw_cost_basis_digest: exactDigest(
      value.constants.raw_cost_basis_digest,
      "constants.raw_cost_basis_digest",
    ),
    raw_cost_currency: exactNonEmptyString(
      value.constants.raw_cost_currency,
      "constants.raw_cost_currency",
    ),
    maximum_authorized_spend: value.constants.maximum_authorized_spend,
  };
  if (!Number.isSafeInteger(constants.retry_limit) || constants.retry_limit < 0) {
    throw new Error("constants.retry_limit must be a non-negative integer.");
  }
  if (!isRecord(constants.runtime_profile) || Object.keys(constants.runtime_profile).length === 0) {
    throw new Error("constants.runtime_profile must be a non-empty object.");
  }
  if (
    !isRecord(constants.maximum_authorized_spend) ||
    typeof constants.maximum_authorized_spend.amount !== "number" ||
    !Number.isFinite(constants.maximum_authorized_spend.amount) ||
    constants.maximum_authorized_spend.amount < 0 ||
    constants.maximum_authorized_spend.currency !== constants.raw_cost_currency
  ) {
    throw new Error(
      "constants.maximum_authorized_spend must pin a non-negative amount and matching currency.",
    );
  }
  if (constants.network !== "deny") {
    throw new Error("The offline-capable paired campaign must pin network=deny.");
  }
  if (!isRecord(value.verifier)) throw new Error("verifier must be an object.");
  const verifierDigest = exactDigest(value.verifier.artifact_sha256, "verifier.artifact_sha256");
  const verifierPath = assertRegularArtifact(
    exactNonEmptyString(value.verifier.artifact_path, "verifier.artifact_path"),
    verifierDigest,
    "verifier.artifact_path",
  );
  const verifier = {
    id: exactNonEmptyString(value.verifier.id, "verifier.id"),
    artifact_path: verifierPath,
    artifact_sha256: verifierDigest,
    entrypoint: validateCommand(value.verifier.entrypoint, "verifier.entrypoint"),
  };
  if (realpathSync(path.resolve(verifier.entrypoint[0])) !== verifierPath) {
    throw new Error("verifier.entrypoint must start with its pinned artifact_path.");
  }
  const normalized = {
    ...value,
    campaign_id: exactNonEmptyString(value.campaign_id, "campaign_id"),
    target,
    task: {
      objective: exactNonEmptyString(value.task?.objective, "task.objective"),
      objective_digest: exactDigest(value.task?.objective_digest, "task.objective_digest"),
      argv: exactStringArray(value.task?.argv, "task.argv"),
    },
    claim_policy: validateClaimPolicy(value.claim_policy),
    products,
    constants,
    verifier,
  };
  if (sha256(normalized.task.objective) !== normalized.task.objective_digest) {
    throw new Error("task.objective does not match task.objective_digest.");
  }
  if (!Array.isArray(value.runs) || value.runs.length < PAIRED_CAMPAIGN_ARMS.length) {
    throw new Error("runs must contain the three campaign arms.");
  }
  normalized.runs = value.runs.map((run, index) => validateRunIdentity(run, index, normalized));
  const ids = new Set(normalized.runs.map((run) => run.id));
  const orders = new Set(normalized.runs.map((run) => run.order));
  if (ids.size !== normalized.runs.length || orders.size !== normalized.runs.length) {
    throw new Error("Run IDs and randomized order positions must be unique.");
  }
  const sortedOrders = [...orders].toSorted((left, right) => left - right);
  if (sortedOrders.some((order, index) => order !== index + 1)) {
    throw new Error("Randomized order positions must be contiguous from 1.");
  }
  const strata = new Map();
  for (const run of normalized.runs) {
    const key = `${run.transport}\0${run.pair_id}`;
    const arms = strata.get(key) ?? [];
    arms.push(run.arm);
    strata.set(key, arms);
  }
  for (const [key, arms] of strata) {
    if (!same([...arms].toSorted(), [...PAIRED_CAMPAIGN_ARMS].toSorted())) {
      throw new Error(`Paired stratum ${JSON.stringify(key)} must contain each arm exactly once.`);
    }
  }
  const randomizedRunIds = normalized.runs
    .toSorted((left, right) => left.order - right.order)
    .map((run) => run.id);
  if (sha256(canonicalBytes(randomizedRunIds)) !== value.randomization_digest) {
    throw new Error("randomization_digest does not match the fixed run order.");
  }
  return normalized;
}

function git(repoRoot, args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  }).trim();
}

function assertTargetIdentity(manifest) {
  const commit = git(manifest.target.repository_path, [
    "rev-parse",
    "--verify",
    `${manifest.target.commit}^{commit}`,
  ]);
  const tree = git(manifest.target.repository_path, ["rev-parse", `${commit}^{tree}`]);
  if (commit !== manifest.target.commit || tree !== manifest.target.tree) {
    throw new Error("Target repository does not match its pinned commit and tree.");
  }
}

function parseProcessEvidence(result, label) {
  if (result.error || result.status !== 0) {
    throw new Error(`${label} failed with exit ${result.status ?? "unknown"}.`);
  }
  let evidence;
  try {
    evidence = JSON.parse(String(result.stdout));
  } catch {
    throw new Error(`${label} did not return one JSON evidence object.`);
  }
  if (!isRecord(evidence)) throw new Error(`${label} evidence must be an object.`);
  return evidence;
}

function executeProcess(entrypoint, argv, cwd, env, label) {
  return parseProcessEvidence(
    spawnSync(entrypoint[0], [...entrypoint.slice(1), ...argv], {
      cwd,
      encoding: "utf8",
      env,
      maxBuffer: 16 * 1024 * 1024,
    }),
    label,
  );
}

function validateAgentEvidence(value, run, constants) {
  if (
    !isRecord(value) ||
    !["completed", "failed", "blocked"].includes(value.status) ||
    !DIGEST_PATTERN.test(value.result_digest) ||
    !Array.isArray(value.violations) ||
    value.violations.some((entry) => typeof entry !== "string") ||
    !Array.isArray(value.stages) ||
    value.stages.some(
      (stage) =>
        !isRecord(stage) ||
        typeof stage.id !== "string" ||
        typeof stage.duration_ms !== "number" ||
        !Number.isFinite(stage.duration_ms) ||
        stage.duration_ms < 0,
    ) ||
    !isRecord(value.observed_identity)
  ) {
    throw new Error(`Run ${run.id} returned invalid agent evidence.`);
  }
  const expectedIdentity = {
    adapter: run.adapter,
    model: run.model,
    reasoning_effort: run.reasoning_effort,
    authority_digest: run.authority_digest,
    check_ids: run.check_ids,
    retry_limit: run.retry_limit,
    runtime_profile: run.runtime_profile,
  };
  if (!same(value.observed_identity, expectedIdentity)) {
    throw new Error(`Run ${run.id} observed identity does not match the fixed campaign identity.`);
  }
  const { raw_cost: rawCost, ...agent } = value;
  validateRawCost(rawCost, `Run ${run.id}`);
  if (
    rawCost.basis_digest !== constants.raw_cost_basis_digest ||
    rawCost.currency !== constants.raw_cost_currency
  ) {
    throw new Error(`Run ${run.id} raw cost does not match the fixed campaign identity.`);
  }
  return { agent, rawCost };
}

function validateOracleEvidence(value, run, verifier) {
  if (
    !isRecord(value) ||
    typeof value.verified !== "boolean" ||
    !DIGEST_PATTERN.test(value.outcome_digest) ||
    value.verifier_digest !== verifier.artifact_sha256 ||
    typeof value.duration_ms !== "number" ||
    !Number.isFinite(value.duration_ms) ||
    value.duration_ms < 0
  ) {
    throw new Error(`Run ${run.id} returned invalid independent oracle evidence.`);
  }
  return value;
}

function prepareFixture(manifest, fixtureRoot) {
  git(path.dirname(fixtureRoot), [
    "clone",
    "--quiet",
    "--no-hardlinks",
    manifest.target.repository_path,
    fixtureRoot,
  ]);
  git(fixtureRoot, ["checkout", "--quiet", "--detach", manifest.target.commit]);
  if (
    git(fixtureRoot, ["rev-parse", "HEAD"]) !== manifest.target.commit ||
    git(fixtureRoot, ["rev-parse", "HEAD^{tree}"]) !== manifest.target.tree
  ) {
    throw new Error("Disposable target fixture does not match the pinned target identity.");
  }
}

async function executeOneRun(manifest, run, fixtureRoot, dependencies, mode) {
  prepareFixture(manifest, fixtureRoot);
  const product = manifest.products[run.arm];
  const env = {
    ...process.env,
    AGENTPLANE_PAIRED_CAMPAIGN_ID: manifest.campaign_id,
    AGENTPLANE_PAIRED_RUN_ID: run.id,
    AGENTPLANE_PAIRED_ARM: run.arm,
    AGENTPLANE_PAIRED_TRANSPORT: run.transport,
    AGENTPLANE_PAIRED_MODE: mode,
    AGENTPLANE_PAIRED_FAKE_PROVIDER: mode === "offline" ? "1" : "0",
    AGENTPLANE_PAIRED_NETWORK: manifest.constants.network,
    AGENTPLANE_PAIRED_VERIFIER_DIGEST: manifest.verifier.artifact_sha256,
    AGENTPLANE_PAIRED_RAW_COST_BASIS_DIGEST: manifest.constants.raw_cost_basis_digest,
    AGENTPLANE_PAIRED_RAW_COST_CURRENCY: manifest.constants.raw_cost_currency,
    AGENTPLANE_PAIRED_MAXIMUM_AUTHORIZED_SPEND: String(
      manifest.constants.maximum_authorized_spend.amount,
    ),
    AGENTPLANE_PAIRED_ADAPTER: run.adapter,
    AGENTPLANE_PAIRED_MODEL: run.model,
    AGENTPLANE_PAIRED_REASONING_EFFORT: run.reasoning_effort,
    AGENTPLANE_PAIRED_AUTHORITY_DIGEST: run.authority_digest,
    AGENTPLANE_PAIRED_CHECK_IDS: JSON.stringify(run.check_ids),
    AGENTPLANE_PAIRED_RETRY_LIMIT: String(run.retry_limit),
    AGENTPLANE_PAIRED_RUNTIME_PROFILE: JSON.stringify(run.runtime_profile),
  };
  const { agent: agentEvidence, rawCost } = validateAgentEvidence(
    await (
      dependencies.executeAttempt ??
      ((opts) =>
        executeProcess(
          opts.product.entrypoint,
          opts.manifest.task.argv,
          opts.fixtureRoot,
          opts.env,
          `paired product ${opts.run.id}`,
        ))
    )({ manifest, product, run, fixtureRoot, env }),
    run,
    manifest.constants,
  );
  const oracleEvidence = validateOracleEvidence(
    await (
      dependencies.verifyAttempt ??
      ((opts) =>
        executeProcess(
          opts.manifest.verifier.entrypoint,
          [opts.run.id],
          opts.fixtureRoot,
          opts.env,
          `paired verifier ${opts.run.id}`,
        ))
    )({ manifest, run, fixtureRoot, env, agentEvidence }),
    run,
    manifest.verifier,
  );
  return {
    id: run.id,
    pair_id: run.pair_id,
    arm: run.arm,
    transport: run.transport,
    order: run.order,
    identity: {
      target_commit: run.target_commit,
      target_tree: run.target_tree,
      product_source_sha: run.product_source_sha,
      product_artifact_sha256: run.product_artifact_sha256,
      adapter: run.adapter,
      model: run.model,
      reasoning_effort: run.reasoning_effort,
      authority_digest: run.authority_digest,
      check_ids: run.check_ids,
      retry_limit: run.retry_limit,
      runtime_profile: run.runtime_profile,
      verifier_digest: run.verifier_digest,
    },
    raw_cost: rawCost,
    agent: agentEvidence,
    oracle: oracleEvidence,
  };
}

export async function runPairedProductionCampaign(value, options = {}, dependencies = {}) {
  const manifest = validatePairedCampaignManifest(value);
  const mode = options.mode ?? "offline";
  if (!new Set(["offline", "live"]).has(mode)) {
    throw new Error("Paired campaign mode must be offline or live.");
  }
  if (mode === "live") {
    if (typeof dependencies.assertLiveAuthority !== "function") {
      throw new TypeError("Live paired campaigns require a trusted external authority check.");
    }
    await dependencies.assertLiveAuthority(manifest);
  }
  assertTargetIdentity(manifest);
  const temporaryRoot = path.resolve(
    options.temporaryRoot ??
      path.join(manifest.target.repository_path, ".agentplane", "tmp", "paired-production"),
  );
  mkdirSync(temporaryRoot, { recursive: true });
  const runs = [...manifest.runs].toSorted((left, right) => left.order - right.order);
  const attempts = await runCandidateCaptureJobs(runs, options.concurrency ?? 1, async (run) => {
    const fixtureRoot = path.join(temporaryRoot, run.id.replaceAll(/[^A-Za-z0-9_.-]/gu, "_"));
    return await withDisposableCandidateRepository(
      fixtureRoot,
      async () => await executeOneRun(manifest, run, fixtureRoot, dependencies, mode),
    );
  });
  const strata = Object.fromEntries(
    PAIRED_CAMPAIGN_TRANSPORTS.flatMap((transport) => {
      const selected = attempts.filter((attempt) => attempt.transport === transport);
      return selected.length === 0 ? [] : [[transport, selected.map((attempt) => attempt.id)]];
    }),
  );
  const payload = {
    schema_version: 1,
    kind: "agentplane.paired_production_campaign_evidence",
    campaign_id: manifest.campaign_id,
    mode,
    manifest_digest: sha256(canonicalBytes(manifest)),
    target: manifest.target,
    constants: manifest.constants,
    verifier: {
      id: manifest.verifier.id,
      artifact_sha256: manifest.verifier.artifact_sha256,
    },
    claim_policy: manifest.claim_policy,
    randomized_run_ids: runs.map((run) => run.id),
    strata,
    attempts,
  };
  return { ...payload, digest: sha256(canonicalBytes(payload)) };
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["manifest", "mode", "output", "concurrency"],
    booleanFlags: ["help"],
  });
  if (flags.help === true) return { help: true };
  if (positionals.length > 0)
    throw new Error("Paired driver does not accept positional arguments.");
  const concurrency = Number.parseInt(flags.concurrency ?? "1", 10);
  if (!Number.isSafeInteger(concurrency) || concurrency < 1) {
    throw new Error("--concurrency must be a positive integer.");
  }
  return {
    help: false,
    manifestPath: path.resolve(exactNonEmptyString(flags.manifest, "--manifest")),
    mode: flags.mode ?? "offline",
    outputPath: path.resolve(exactNonEmptyString(flags.output, "--output")),
    concurrency,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(
      "Usage: node scripts/bench/paired-production-driver.mjs --manifest <campaign.lock.json> --mode offline --output <evidence.json> [--concurrency N]\n",
    );
    return;
  }
  const manifest = JSON.parse(readFileSync(options.manifestPath, "utf8"));
  const evidence = await runPairedProductionCampaign(manifest, options);
  writeFileSync(options.outputPath, canonicalBytes(evidence), { encoding: "utf8", mode: 0o600 });
  process.stdout.write(`${evidence.digest}\n`);
}

if (isDirectRun(import.meta.url)) runScriptMain(main);
