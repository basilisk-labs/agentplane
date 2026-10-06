import assert from "node:assert/strict";
import { format, resolveConfig } from "prettier";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmodSync,
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stableJson } from "../lib/agent-efficiency-baseline.mjs";
import { isDirectRun, runScriptMain } from "../lib/script-runtime.mjs";
import { RECIPE_CAMPAIGN_ARMS, runPairedProductionCampaign } from "./paired-production-driver.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const bytes = (value) => `${stableJson(value, 2)}\n`;
const hash = (value) => `sha256:${createHash("sha256").update(value).digest("hex")}`;
const fileHash = (file) => hash(readFileSync(file));
const git = (cwd, args) =>
  execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    env: {
      ...process.env,
      GIT_AUTHOR_DATE: "2026-10-06T00:00:00Z",
      GIT_COMMITTER_DATE: "2026-10-06T00:00:00Z",
    },
  }).trim();
async function writeJson(file, value) {
  const formatted = await format(bytes(value), { ...(await resolveConfig(file)), filepath: file });
  writeFileSync(file, formatted);
  return fileHash(file);
}

function workItem(id, objective, dependsOn = []) {
  return {
    id,
    objective,
    depends_on: dependsOn,
    required_inputs: [],
    expected_outputs: [`${id}-evidence`],
    scope_roots: ["work"],
    context: {
      required_sources: ["fixture.json"],
      optional_sources: [],
      symbol_hints: [],
      max_bytes: 4096,
    },
    criterion_ids: ["outcome", "authority"],
    check_ids: ["review"],
    risk: "low",
    capabilities: [],
    resource_claims: [],
    optional: false,
    priority: 0,
  };
}
export function normalizeM05Bundle(source) {
  return source.replaceAll(/^[\t ]+$/gm, "");
}

export function m05Corpus() {
  return [
    ["direct-fix", "Fix the off-by-one result in the bounded fixture", "exact"],
    ["branch-change", "Add the bounded report feature and preserve its contract", "exact"],
    ["recovery", "Repair the failed check while preserving completed evidence", "exact"],
    ["no-match", "Prepare the task with no exact installed Recipe match", "no_match"],
    ["near-match", "Prepare the task without inventing a missing required binding", "near_match"],
  ].map(([id, objective, selection]) => {
    const plan = {
      schema_version: 2,
      criteria: [
        { id: "outcome", description: objective, required: true, check_ids: ["review"] },
        {
          id: "authority",
          description: "Independent native review and approval remain required",
          required: true,
          check_ids: ["review"],
        },
      ],
      checks: [{ id: "review", kind: "semantic", required: true, capability: "task.verify" }],
      top_level_validation: { criterion_ids: ["outcome", "authority"], check_ids: ["review"] },
      work_items: [workItem("prepare", objective)],
      assumptions: [],
      unresolved_questions: [],
    };
    if (id === "branch-change" || id === "recovery")
      plan.work_items.push(
        workItem(
          "follow-up",
          id === "recovery" ? "Bounded check repair" : "Verify feature contract",
          ["prepare"],
        ),
      );
    const template = structuredClone(plan);
    template.work_items[0].objective = "{{objective}}";
    return {
      id,
      objective,
      selection,
      plan,
      requested_scenario: selection === "no_match" ? "absent" : "bounded",
      bindings: selection === "near_match" ? [] : [{ name: "objective", value: objective }],
      scenario: {
        schema_version: "2",
        id: "bounded",
        goal: "Prepare {{objective}}",
        parameters: [{ name: "objective", type: "string", required: true }],
        applicability: { required: [], excluded: [] },
        plan_template: template,
      },
    };
  });
}

export async function prepareM05Offline(outputRoot) {
  const output = path.resolve(outputRoot);
  assert.ok(
    output.startsWith(path.join(root, "artifacts") + path.sep),
    "M05 output must be inside repository artifacts",
  );
  assert.equal(
    existsSync(output),
    false,
    "Choose a new output directory; retained campaigns must not be overwritten",
  );
  let parent = root;
  for (const part of path.relative(root, path.dirname(output)).split(path.sep)) {
    parent = path.join(parent, part);
    mkdirSync(parent, { recursive: true });
    assert.ok(lstatSync(parent).isDirectory() && !lstatSync(parent).isSymbolicLink());
    assert.equal(realpathSync(parent), parent);
  }
  mkdirSync(output, { recursive: true });
  const candidate = git(root, ["rev-parse", "HEAD"]);
  const product = path.join(output, "product.mjs");
  execFileSync(
    "bun",
    [
      "build",
      "--target=node",
      "--format=esm",
      "scripts/bench/paired-m05-product.mjs",
      "--outfile",
      product,
    ],
    { cwd: root, stdio: "pipe" },
  );
  // Normalize newly generated blank lines before any artifact identity is pinned.
  writeFileSync(
    product,
    await format(normalizeM05Bundle(readFileSync(product, "utf8")), {
      ...(await resolveConfig(product)),
      filepath: product,
    }),
  );
  chmodSync(product, 0o700);
  const oracle = path.join(output, "oracle.mjs");
  copyFileSync(path.join(root, "scripts/bench/paired-m05-oracle.mjs"), oracle);
  chmodSync(oracle, 0o700);
  const policy = {
    kind: "offline_fixture_policy",
    network: "deny",
    provider_calls: false,
    scope: ["plan.json", "route.json"],
    native_approval: false,
    independent_oracle_required: true,
  };
  const policyDigest = await writeJson(path.join(output, "fixture-policy.json"), policy);
  const constants = {
    adapter: "deterministic_fixture",
    model: "none",
    reasoning_effort: "none",
    authority_digest: policyDigest,
    check_ids: ["independent-structural-oracle"],
    retry_limit: 0,
    runtime_profile: {
      node: process.version,
      platform: process.platform,
      purpose: "offline_plan_preparation",
    },
    cache_policy: "fresh-target-per-attempt; no provider cache",
    session_policy: "fresh-process-per-attempt",
    sandbox: "disposable-local-fixture; not a certified provider sandbox",
    network: "deny",
  };
  const productRef = {
    artifact_path: product,
    artifact_sha256: fileHash(product),
    source_sha: candidate,
    entrypoint: [product],
    entrypoint_sha256: fileHash(product),
  };
  const cases = [];
  for (const task of m05Corpus()) {
    const directory = path.join(output, task.id);
    mkdirSync(directory, { recursive: true });
    const target = path.join(directory, "target");
    rmSync(target, { recursive: true, force: true });
    mkdirSync(target);
    await writeJson(path.join(target, "fixture.json"), { ...task, policy_digest: policyDigest });
    git(target, ["init", "-q", "-b", "main"]);
    git(target, ["config", "user.name", "M05 Offline Fixture"]);
    git(target, ["config", "user.email", "m05-offline@invalid.local"]);
    git(target, ["add", "fixture.json"]);
    git(target, [
      "-c",
      "core.hooksPath=/dev/null",
      "-c",
      "commit.gpgsign=false",
      "commit",
      "-qm",
      "Frozen M05 offline target",
    ]);
    const commit = git(target, ["rev-parse", "HEAD"]),
      tree = git(target, ["rev-parse", "HEAD^{tree}"]);
    const bundle = path.join(directory, "target.bundle");
    git(target, ["bundle", "create", bundle, "HEAD"]);
    rmSync(target, { recursive: true, force: true });
    const runs = Array.from({ length: 5 }, (_, pair) =>
      RECIPE_CAMPAIGN_ARMS.map((arm) => ({
        id: `${task.id}-pair-${pair + 1}-${arm}`,
        pair_id: `pair-${pair + 1}`,
        arm,
        transport: "external",
        target_commit: commit,
        target_tree: tree,
        product_source_sha: candidate,
        product_artifact_sha256: productRef.artifact_sha256,
        adapter: constants.adapter,
        model: constants.model,
        reasoning_effort: constants.reasoning_effort,
        authority_digest: policyDigest,
        check_ids: constants.check_ids,
        retry_limit: 0,
        runtime_profile: constants.runtime_profile,
        verifier_digest: fileHash(oracle),
      })),
    )
      .flat()
      .toSorted((a, b) =>
        hash(`M05-offline-order-v1:${a.id}`).localeCompare(hash(`M05-offline-order-v1:${b.id}`)),
      )
      .map((run, index) => ({ ...run, order: index + 1 }));
    const manifest = {
      schema_version: 2,
      kind: "agentplane.paired_production_campaign",
      experiment: "M05",
      evidence_scope: "offline_structural",
      campaign_id: `M05-0.7.13-${task.id}-offline-v1`,
      target: { repository_path: bundle, repository_sha256: fileHash(bundle), commit, tree },
      task: {
        objective: task.objective,
        objective_digest: hash(task.objective),
        argv: ["fixture.json"],
      },
      products: Object.fromEntries(RECIPE_CAMPAIGN_ARMS.map((arm) => [arm, productRef])),
      constants,
      claim_policy: { minimum_paired_successes: 5, disposition: "NOT_ESTABLISHED" },
      verifier: {
        id: "independent-m05-structural-oracle",
        artifact_path: oracle,
        artifact_sha256: fileHash(oracle),
        entrypoint: [oracle],
      },
      runs,
      randomization_digest: hash(bytes(runs.map((run) => run.id))),
    };
    const manifestPath = path.join(directory, "campaign.offline.lock.json");
    await writeJson(manifestPath, manifest);
    const evidence = await runPairedProductionCampaign(manifest, {
      mode: "offline",
      concurrency: 1,
      temporaryRoot: path.join(directory, "attempts"),
    });
    const evidencePath = path.join(directory, "evidence.json");
    await writeJson(evidencePath, evidence);
    assert.equal(evidence.attempts.length, 15);
    assert.ok(evidence.attempts.every((attempt) => attempt.oracle.verified));
    cases.push({
      id: task.id,
      manifest: manifestPath,
      manifest_sha256: fileHash(manifestPath),
      evidence: evidencePath,
      evidence_sha256: fileHash(evidencePath),
      assigned: 15,
      verified: 15,
      provider_usage: "unavailable",
    });
    process.stdout.write(
      `${task.id}: 15 structural fixture attempts verified; no provider measurement\n`,
    );
  }
  const report = {
    schema_version: 1,
    kind: "agentplane.m05_offline_preparation",
    candidate_source_sha: candidate,
    preparation_sources: [
      "paired-production-driver.mjs",
      "paired-m05-product.mjs",
      "paired-m05-oracle.mjs",
      "paired-m05-offline.mjs",
    ].map((name) => ({
      path: `scripts/bench/${name}`,
      sha256: fileHash(path.join(root, "scripts/bench", name)),
    })),
    product_artifact_sha256: fileHash(product),
    oracle_sha256: fileHash(oracle),
    cases,
    efficiency: "NOT_ESTABLISHED",
    live_campaign_ready: false,
    release_owner_debt_acceptance: null,
    provider_attempts_assigned: 0,
    upstream_development_cost: null,
    limitations: [
      "Deterministic fixture specialization is not semantic model specialization.",
      "Offline Plans are never approved or executed; product correctness evidence is separately provided by RC16.",
      "The three normal corpus labels exercise planning structure only, not full coding/recovery workflows.",
      "No full-host cost or latency measurement is available; fixture stage times are diagnostics only.",
    ],
    live_requirements: [
      "Approve exact artifact/target/oracle and randomized campaign lock.",
      "Select and qualify provider, adapter, model, effort and sandbox; approve network scope and finite spend/retry caps.",
      "Add an authenticated M05 live launcher and full-host attempt ledger through existing campaign owners.",
      "Record complete selection/planning/retries/failures/review/host usage, separate setup and confirmation sample.",
    ],
  };
  await writeJson(path.join(output, "preparation.json"), report);
  return report;
}

if (isDirectRun(import.meta.url))
  runScriptMain(async () => {
    assert.equal(
      process.argv.length,
      3,
      "Usage: node scripts/bench/paired-m05-offline.mjs <artifacts/output-directory>",
    );
    await prepareM05Offline(process.argv[2]);
  });
