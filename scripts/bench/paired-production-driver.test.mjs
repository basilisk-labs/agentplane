import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { stableJson } from "../lib/agent-efficiency-baseline.mjs";
import {
  PAIRED_CAMPAIGN_ARMS,
  runPairedProductionCampaign,
  validatePairedCampaignManifest,
} from "./paired-production-driver.mjs";
import { buildPairedResultReport } from "./paired-result-report.mjs";

const DIGEST = `sha256:${"a".repeat(64)}`;

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function git(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

function makeExecutable(root, name, source) {
  const filePath = path.join(root, name);
  writeFileSync(filePath, source);
  chmodSync(filePath, 0o755);
  return { path: filePath, digest: sha256(readFileSync(filePath)) };
}

function fixture() {
  const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-paired-driver-"));
  const targetRoot = path.join(root, "target");
  mkdirSync(targetRoot);
  git(targetRoot, ["init", "-q"]);
  git(targetRoot, ["config", "user.name", "AgentPlane Test"]);
  git(targetRoot, ["config", "user.email", "test@example.invalid"]);
  writeFileSync(path.join(targetRoot, "README.md"), "paired target\n");
  git(targetRoot, ["add", "README.md"]);
  git(targetRoot, ["commit", "-m", "target"]);
  const commit = git(targetRoot, ["rev-parse", "HEAD"]);
  const tree = git(targetRoot, ["rev-parse", "HEAD^{tree}"]);
  const productSource = [
    "#!/usr/bin/env node",
    'import { mkdirSync, writeFileSync } from "node:fs";',
    'if (process.env.AGENTPLANE_PAIRED_MODE !== "offline") process.exit(9);',
    'if (process.env.AGENTPLANE_PAIRED_FAKE_PROVIDER !== "1") process.exit(10);',
    'if (process.env.AGENTPLANE_PAIRED_NETWORK !== "deny") process.exit(11);',
    'if (process.argv.slice(2).join(" ") !== "task new paired-objective") process.exit(12);',
    'mkdirSync("work", { recursive: true });',
    'writeFileSync("work/result.txt", "VERIFIED\\n");',
    `process.stdout.write(JSON.stringify({ status: "completed", result_digest: "${DIGEST}", violations: [], stages: [{ id: "task_entrypoint", duration_ms: 2 }], raw_cost: { state: "observed", amount: 1, currency: process.env.AGENTPLANE_PAIRED_RAW_COST_CURRENCY, basis_digest: process.env.AGENTPLANE_PAIRED_RAW_COST_BASIS_DIGEST }, observed_identity: { adapter: process.env.AGENTPLANE_PAIRED_ADAPTER, model: process.env.AGENTPLANE_PAIRED_MODEL, reasoning_effort: process.env.AGENTPLANE_PAIRED_REASONING_EFFORT, authority_digest: process.env.AGENTPLANE_PAIRED_AUTHORITY_DIGEST, check_ids: JSON.parse(process.env.AGENTPLANE_PAIRED_CHECK_IDS), retry_limit: Number(process.env.AGENTPLANE_PAIRED_RETRY_LIMIT), runtime_profile: JSON.parse(process.env.AGENTPLANE_PAIRED_RUNTIME_PROFILE) } }));`,
    "",
  ].join("\n");
  const products = Object.fromEntries(
    PAIRED_CAMPAIGN_ARMS.map((arm, index) => {
      const artifact = makeExecutable(root, `${arm}.mjs`, productSource);
      return [
        arm,
        {
          artifact_path: artifact.path,
          artifact_sha256: artifact.digest,
          source_sha: String(index + 1).repeat(40),
          entrypoint: [artifact.path],
        },
      ];
    }),
  );
  const verifier = makeExecutable(
    root,
    "oracle.mjs",
    [
      "#!/usr/bin/env node",
      'import { readFileSync } from "node:fs";',
      'const verified = readFileSync("work/result.txt", "utf8") === "VERIFIED\\n";',
      `process.stdout.write(JSON.stringify({ verified, outcome_digest: "${DIGEST}", verifier_digest: process.env.AGENTPLANE_PAIRED_VERIFIER_DIGEST, duration_ms: 1 }));`,
      "",
    ].join("\n"),
  );
  const constants = {
    adapter: "codex",
    model: "gpt-test",
    reasoning_effort: "high",
    authority_digest: DIGEST,
    check_ids: ["independent-oracle"],
    retry_limit: 1,
    runtime_profile: { node: process.version, platform: process.platform, warm: false },
    cache_policy: "cold",
    session_policy: "isolated",
    sandbox: "workspace-write",
    network: "deny",
    raw_cost_basis_digest: DIGEST,
    raw_cost_currency: "USD",
  };
  const runs = [];
  let order = 0;
  for (const transport of ["managed", "external"]) {
    for (const arm of PAIRED_CAMPAIGN_ARMS) {
      order += 1;
      runs.push({
        id: `${transport}-${arm}`,
        pair_id: "pair-01",
        arm,
        transport,
        order,
        target_commit: commit,
        target_tree: tree,
        product_source_sha: products[arm].source_sha,
        product_artifact_sha256: products[arm].artifact_sha256,
        adapter: constants.adapter,
        model: constants.model,
        reasoning_effort: constants.reasoning_effort,
        authority_digest: constants.authority_digest,
        check_ids: constants.check_ids,
        retry_limit: constants.retry_limit,
        runtime_profile: constants.runtime_profile,
        verifier_digest: verifier.digest,
      });
    }
  }
  const manifest = {
    schema_version: 1,
    kind: "agentplane.paired_production_campaign",
    campaign_id: "offline-three-arm",
    target: { repository_path: targetRoot, commit, tree },
    task: {
      objective: "paired-objective",
      objective_digest: sha256("paired-objective"),
      argv: ["task", "new", "paired-objective"],
    },
    products,
    claim_policy: {
      minimum_paired_successes: 1,
      max_candidate_to_previous_cost_ratio: 1.05,
      require_candidate_better_than_minimal: true,
    },
    constants,
    verifier: {
      id: "fixed-independent-oracle",
      artifact_path: verifier.path,
      artifact_sha256: verifier.digest,
      entrypoint: [verifier.path],
    },
    runs,
    randomization_digest: sha256(canonicalBytes(runs.map((run) => run.id))),
  };
  return { manifest, root };
}

test("runs the pinned three-arm task entrypoints offline and keeps transports stratified", async () => {
  const { manifest, root } = fixture();
  const evidence = await runPairedProductionCampaign(manifest, {
    mode: "offline",
    concurrency: 2,
    temporaryRoot: path.join(root, "fixtures"),
  });

  assert.equal(evidence.attempts.length, 6);
  assert.deepEqual(Object.keys(evidence.strata).toSorted(), ["external", "managed"]);
  assert.equal(evidence.strata.managed.length, 3);
  assert.equal(evidence.strata.external.length, 3);
  assert.ok(evidence.attempts.every((attempt) => attempt.agent.status === "completed"));
  assert.ok(evidence.attempts.every((attempt) => attempt.oracle.verified === true));
  assert.ok(
    evidence.attempts.every(
      (attempt) => attempt.oracle.verifier_digest === manifest.verifier.artifact_sha256,
    ),
  );
  assert.deepEqual(evidence.claim_policy, manifest.claim_policy);
  assert.equal("maximum_authorized_spend" in manifest.constants, false);
  const report = buildPairedResultReport(evidence);
  assert.equal(report.numeric_cost_claim_complete, true);
  assert.deepEqual(Object.keys(report.strata).toSorted(), ["external", "managed"]);
});

test("rejects every mismatched run identity field", () => {
  const { manifest } = fixture();
  const mutations = [
    ["target", (run) => (run.target_tree = "f".repeat(40))],
    ["product source", (run) => (run.product_source_sha = "f".repeat(40))],
    ["product artifact", (run) => (run.product_artifact_sha256 = `sha256:${"b".repeat(64)}`)],
    ["adapter", (run) => (run.adapter = "other-adapter")],
    ["model", (run) => (run.model = "other-model")],
    ["reasoning effort", (run) => (run.reasoning_effort = "low")],
    ["runtime", (run) => (run.runtime_profile = { node: "other" })],
    ["authority", (run) => (run.authority_digest = `sha256:${"b".repeat(64)}`)],
    ["checks", (run) => (run.check_ids = ["other-check"])],
    ["verifier", (run) => (run.verifier_digest = `sha256:${"b".repeat(64)}`)],
    ["retry", (run) => (run.retry_limit = 99)],
  ];
  for (const [label, mutate] of mutations) {
    const changed = structuredClone(manifest);
    mutate(changed.runs[0]);
    assert.throws(
      () => validatePairedCampaignManifest(changed),
      undefined,
      `${label} mismatch must fail closed`,
    );
  }
});

test("rejects missing or mismatched observed raw cost", async () => {
  const { manifest, root } = fixture();
  for (const [label, rawCost] of [
    ["missing", undefined],
    [
      "basis mismatch",
      { state: "observed", amount: 1, currency: "USD", basis_digest: `sha256:${"b".repeat(64)}` },
    ],
    ["currency mismatch", { state: "observed", amount: 1, currency: "EUR", basis_digest: DIGEST }],
  ]) {
    await assert.rejects(
      () =>
        runPairedProductionCampaign(
          manifest,
          { mode: "offline", temporaryRoot: path.join(root, `fixtures-${label}`) },
          {
            executeAttempt: () => ({
              status: "completed",
              result_digest: DIGEST,
              violations: [],
              stages: [],
              raw_cost: rawCost,
              observed_identity: {
                adapter: manifest.constants.adapter,
                model: manifest.constants.model,
                reasoning_effort: manifest.constants.reasoning_effort,
                authority_digest: manifest.constants.authority_digest,
                check_ids: manifest.constants.check_ids,
                retry_limit: manifest.constants.retry_limit,
                runtime_profile: manifest.constants.runtime_profile,
              },
            }),
          },
        ),
      undefined,
      `${label} must fail closed`,
    );
  }
});

test("requires a trusted authority callback before live execution", async () => {
  const { manifest, root } = fixture();
  await assert.rejects(
    () =>
      runPairedProductionCampaign(manifest, {
        mode: "live",
        temporaryRoot: path.join(root, "fixtures"),
      }),
    /trusted external authority check/u,
  );
});

test("rejects an observed execution identity that differs from the campaign", async () => {
  const { manifest, root } = fixture();
  await assert.rejects(
    () =>
      runPairedProductionCampaign(
        manifest,
        { mode: "offline", temporaryRoot: path.join(root, "fixtures-identity") },
        {
          executeAttempt: () => ({
            status: "completed",
            result_digest: DIGEST,
            violations: [],
            stages: [],
            raw_cost: {
              state: "observed",
              amount: 1,
              currency: manifest.constants.raw_cost_currency,
              basis_digest: manifest.constants.raw_cost_basis_digest,
            },
            observed_identity: {
              adapter: manifest.constants.adapter,
              model: "different-model",
              reasoning_effort: manifest.constants.reasoning_effort,
              authority_digest: manifest.constants.authority_digest,
              check_ids: manifest.constants.check_ids,
              retry_limit: manifest.constants.retry_limit,
              runtime_profile: manifest.constants.runtime_profile,
            },
          }),
        },
      ),
    /observed identity does not match/u,
  );
});
