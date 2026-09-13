import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";

import { stableJson } from "../lib/agent-efficiency-baseline.mjs";
import { isDirectRun, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import { validatePairedCampaignManifest } from "./paired-production-driver.mjs";

const PREVIOUS_SOURCE_SHA = "81b3fe507426d82ea903d7a63fd6335b583d81b5";
const DEFAULT_CAMPAIGN_ID = "M01-0.7.9-token-pilot-v1";
const FIXED_COMMIT_DATE = "2026-09-13T00:00:00Z";
const OBJECTIVE = "Set work/result.txt to exactly VERIFIED followed by one newline.";
const RUN_ORDER = [
  ["pair-01", "candidate"],
  ["pair-01", "previous_release"],
  ["pair-01", "minimal_agent"],
  ["pair-02", "minimal_agent"],
  ["pair-02", "candidate"],
  ["pair-02", "previous_release"],
  ["pair-03", "previous_release"],
  ["pair-03", "minimal_agent"],
  ["pair-03", "candidate"],
  ["pair-04", "candidate"],
  ["pair-04", "minimal_agent"],
  ["pair-04", "previous_release"],
  ["pair-05", "previous_release"],
  ["pair-05", "candidate"],
  ["pair-05", "minimal_agent"],
];

function hash(algorithm, value) {
  return createHash(algorithm).update(value).digest("hex");
}

function sha256(value) {
  return `sha256:${hash("sha256", value)}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function digestFile(filePath) {
  return sha256(readFileSync(path.resolve(filePath)));
}

function git(cwd, args, env = process.env) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    env,
    maxBuffer: 16 * 1024 * 1024,
  }).trim();
}

function writeImmutable(filePath, value, replace = false) {
  const bytes = typeof value === "string" ? value : canonicalBytes(value);
  try {
    if (readFileSync(filePath, "utf8") !== bytes && !replace) {
      throw new Error(`${filePath} already exists with different bytes.`);
    }
    if (replace) writeFileSync(filePath, bytes, { encoding: "utf8", mode: 0o600 });
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    writeFileSync(filePath, bytes, { encoding: "utf8", mode: 0o600 });
  }
  return { path: path.resolve(filePath), sha256: digestFile(filePath) };
}

function createTargetBundle(outputRoot, replace) {
  const temporaryRoot = mkdtempSync(path.join(outputRoot, ".target-source-"));
  try {
    mkdirSync(path.join(temporaryRoot, "work"), { recursive: true });
    writeFileSync(
      path.join(temporaryRoot, "README.md"),
      "# M01 fixed target\n\nOnly `work/result.txt` is mutable during the measured task.\n",
    );
    writeFileSync(path.join(temporaryRoot, "work", "result.txt"), "INITIAL\n");
    git(temporaryRoot, ["init", "--quiet"]);
    git(temporaryRoot, ["config", "core.hooksPath", "/dev/null"]);
    git(temporaryRoot, ["config", "user.name", "AgentPlane M01 Supervisor"]);
    git(temporaryRoot, ["config", "user.email", "m01-supervisor@invalid.local"]);
    git(temporaryRoot, ["add", "README.md", "work/result.txt"]);
    git(
      temporaryRoot,
      ["-c", "commit.gpgsign=false", "commit", "--quiet", "-m", "M01 fixed target"],
      {
        ...process.env,
        GIT_AUTHOR_DATE: FIXED_COMMIT_DATE,
        GIT_COMMITTER_DATE: FIXED_COMMIT_DATE,
      },
    );
    const commit = git(temporaryRoot, ["rev-parse", "HEAD"]);
    const tree = git(temporaryRoot, ["rev-parse", "HEAD^{tree}"]);
    const bundlePath = path.join(outputRoot, "target.bundle");
    if (existsSync(bundlePath) && !replace) {
      throw new Error(`${bundlePath} already exists.`);
    }
    const temporaryBundlePath = `${bundlePath}.tmp-${process.pid}`;
    execFileSync("git", ["bundle", "create", temporaryBundlePath, "HEAD"], {
      cwd: temporaryRoot,
      stdio: "pipe",
    });
    renameSync(temporaryBundlePath, bundlePath);
    return { bundlePath: path.resolve(bundlePath), commit, tree };
  } finally {
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

function runtimeFile(filePath) {
  return { path: path.resolve(filePath), sha256: digestFile(filePath) };
}

function createProductArtifacts(options) {
  const codexBytes = readFileSync(options.codexPath);
  const minimalSourceSha = hash("sha1", codexBytes);
  const values = {
    minimal_agent: {
      schema_version: 1,
      kind: "agentplane.m01_product_artifact",
      arm: "minimal_agent",
      source_sha: minimalSourceSha,
      runtime: { type: "codex", binary: runtimeFile(options.codexPath) },
    },
    previous_release: {
      schema_version: 1,
      kind: "agentplane.m01_product_artifact",
      arm: "previous_release",
      source_sha: PREVIOUS_SOURCE_SHA,
      runtime: {
        type: "npm_package",
        version: "0.7.8",
        package_archive: runtimeFile(path.join(options.previousRuntimeRoot, "agentplane.tgz")),
        package_json: runtimeFile(path.join(options.previousRuntimeRoot, "package.json")),
        package_lock: runtimeFile(path.join(options.previousRuntimeRoot, "package-lock.json")),
      },
    },
    candidate: {
      schema_version: 1,
      kind: "agentplane.m01_product_artifact",
      arm: "candidate",
      source_sha: options.candidateSourceSha,
      runtime: {
        type: "agentplane_cli",
        binary: runtimeFile(options.candidateCliPath),
        closure: [
          "package.json",
          "dist/.build-manifest.json",
          "dist/cli.js",
          "dist/deferred-runtime.js",
          "dist/command-catalog.js",
        ].map((relativePath) =>
          runtimeFile(path.resolve(path.dirname(options.candidateCliPath), "..", relativePath)),
        ),
      },
    },
  };
  return Object.fromEntries(
    Object.entries(values).map(([arm, value]) => [
      arm,
      writeImmutable(path.join(options.outputRoot, `product-${arm}.json`), value, options.replace),
    ]),
  );
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: [
      "authority",
      "campaign-id",
      "candidate-cli",
      "candidate-source-sha",
      "codex",
      "launcher",
      "oracle",
      "output-root",
      "previous-runtime-root",
    ],
    booleanFlags: ["help", "replace"],
  });
  if (flags.help === true) return { help: true };
  if (positionals.length > 0)
    throw new Error("M01 materializer does not accept positional arguments.");
  const requiredPath = (name) => {
    const value = flags[name];
    if (typeof value !== "string" || value.length === 0) throw new Error(`--${name} is required.`);
    return path.resolve(value);
  };
  if (!/^[a-f0-9]{40}$/u.test(flags["candidate-source-sha"] ?? "")) {
    throw new Error("--candidate-source-sha must be a full Git commit SHA.");
  }
  const campaignId = flags["campaign-id"] ?? DEFAULT_CAMPAIGN_ID;
  if (!/^[A-Za-z0-9._-]+$/u.test(campaignId)) {
    throw new Error(
      "--campaign-id must contain only letters, digits, dots, underscores, or dashes.",
    );
  }
  return {
    authorityPath: requiredPath("authority"),
    campaignId,
    candidateCliPath: requiredPath("candidate-cli"),
    candidateSourceSha: flags["candidate-source-sha"],
    codexPath: requiredPath("codex"),
    help: false,
    launcherPath: requiredPath("launcher"),
    oraclePath: requiredPath("oracle"),
    outputRoot: requiredPath("output-root"),
    previousRuntimeRoot: requiredPath("previous-runtime-root"),
    replace: flags.replace === true,
  };
}

export function materializeM01Campaign(options) {
  mkdirSync(options.outputRoot, { recursive: true });
  const target = createTargetBundle(options.outputRoot, options.replace === true);
  const products = createProductArtifacts(options);
  const launcherDigest = digestFile(options.launcherPath);
  const verifierDigest = digestFile(options.oraclePath);
  const authorityDigest = digestFile(options.authorityPath);
  const constants = {
    adapter: "codex-exec-jsonl-supervisor",
    model: "gpt-5.6-terra",
    reasoning_effort: "low",
    authority_digest: authorityDigest,
    check_ids: ["m01-exact-file-oracle"],
    retry_limit: 0,
    runtime_profile: {
      codex_cli: "0.153.4",
      node: process.version,
      platform: `${process.platform}-${process.arch}`,
    },
    cache_policy: "ephemeral-provider-default",
    session_policy: "one_fresh_session_per_attempt",
    sandbox: "workspace-write",
    network: "deny",
  };
  const productEntries = Object.fromEntries(
    Object.entries(products).map(([arm, descriptor]) => [
      arm,
      {
        artifact_path: descriptor.path,
        artifact_sha256: descriptor.sha256,
        source_sha:
          arm === "minimal_agent"
            ? JSON.parse(readFileSync(descriptor.path, "utf8")).source_sha
            : arm === "previous_release"
              ? PREVIOUS_SOURCE_SHA
              : options.candidateSourceSha,
        entrypoint: [path.resolve(options.launcherPath)],
        entrypoint_sha256: launcherDigest,
      },
    ]),
  );
  const runs = RUN_ORDER.map(([pairId, arm], index) => ({
    id: `${pairId}-${arm}`,
    pair_id: pairId,
    arm,
    transport: "external",
    order: index + 1,
    target_commit: target.commit,
    target_tree: target.tree,
    product_source_sha: productEntries[arm].source_sha,
    product_artifact_sha256: productEntries[arm].artifact_sha256,
    adapter: constants.adapter,
    model: constants.model,
    reasoning_effort: constants.reasoning_effort,
    authority_digest: constants.authority_digest,
    check_ids: constants.check_ids,
    retry_limit: constants.retry_limit,
    runtime_profile: constants.runtime_profile,
    verifier_digest: verifierDigest,
  }));
  const manifest = {
    schema_version: 1,
    kind: "agentplane.paired_production_campaign",
    campaign_id: options.campaignId ?? DEFAULT_CAMPAIGN_ID,
    target: {
      repository_path: target.bundlePath,
      repository_sha256: digestFile(target.bundlePath),
      commit: target.commit,
      tree: target.tree,
    },
    task: {
      objective: OBJECTIVE,
      objective_digest: sha256(OBJECTIVE),
      argv: [OBJECTIVE],
    },
    products: productEntries,
    claim_policy: {
      minimum_paired_successes: 5,
      max_candidate_to_previous_token_ratio: 1.05,
      require_candidate_better_than_minimal: true,
    },
    constants,
    verifier: {
      id: "m01-exact-file-oracle-v1",
      artifact_path: path.resolve(options.oraclePath),
      artifact_sha256: verifierDigest,
      entrypoint: [path.resolve(options.oraclePath)],
    },
    runs,
    randomization_digest: sha256(canonicalBytes(runs.map((run) => run.id))),
  };
  validatePairedCampaignManifest(manifest);
  const output = writeImmutable(
    path.join(options.outputRoot, "campaign.lock.json"),
    manifest,
    options.replace === true,
  );
  return { manifest, output };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(
      "Usage: node scripts/bench/paired-m01-materialize.mjs --output-root <directory> --authority <authority.json> --previous-runtime-root <directory> --candidate-cli <file> --candidate-source-sha <sha> --codex <file> --launcher <file> --oracle <file> [--campaign-id <id>] [--replace]\n",
    );
    return;
  }
  const result = materializeM01Campaign(options);
  process.stdout.write(`${result.output.sha256}\n`);
}

if (isDirectRun(import.meta.url)) runScriptMain(main);

export const M01_FIXED_OBJECTIVE = OBJECTIVE;
export const M01_RUN_ORDER = RUN_ORDER;
export const M01_TEMP_ROOT = os.tmpdir();
