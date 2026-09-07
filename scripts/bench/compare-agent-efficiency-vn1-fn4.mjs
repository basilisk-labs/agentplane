// Run with Bun because the matched context probe imports the current TypeScript implementation.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { buildAgentWorkOrderV2ValidFixture } from "../../packages/core/src/runner/agent-work-order-fixtures.ts";
import {
  buildWorkOrderContextManifest,
  resolveWorkOrderContextBlocks,
} from "../../packages/agentplane/src/runner/context/work-order-context.ts";

const root = new URL("../../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root));
const hash = (bytes) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const bytes = (value) => Buffer.byteLength(JSON.stringify(value));
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const prefix = "scripts/baselines/agent-efficiency-VN1FN4-";
const before = JSON.parse(read(`${prefix}before.json`));
const after = JSON.parse(read(`${prefix}after.json`));
assert.deepEqual(after, before, "The repeated committed snapshot must remain comparable.");
assert.equal(git("rev-parse", `${before.source.commit}^{commit}`), before.source.commit);

const order = buildAgentWorkOrderV2ValidFixture();
order.required_inputs = Array.from({ length: 500 }, (_, index) => ({
  id: `history-${index}`,
  kind: "source_artifact",
  description: "Optional full historical log",
  path: `logs/${index}.txt`,
  required: index === 499,
}));
const manifest = buildWorkOrderContextManifest(order, "/run/work-order.json");
const selected = resolveWorkOrderContextBlocks({ order, manifest });
const retained = {
  source_digest: manifest.source_digest,
  blocks: new Map(selected.map((block) => [block.id, block.digest])),
};
const sum = (blocks) => blocks.reduce((total, block) => total + block.bytes, 0);
const context = {
  fixture: "Existing lossless WorkOrder context selection scenario: 500 references, last required",
  fixture_digest: hash(JSON.stringify(order)),
  unit: "UTF-8 compact JSON bytes; referenced file contents and transport envelopes excluded",
  before_all_block_payload_bytes: sum(manifest.blocks),
  after_required_block_payload_bytes: sum(selected),
  after_same_process_retained_payload_bytes: sum(
    resolveWorkOrderContextBlocks({ order, manifest, retained }),
  ),
  after_restart_required_payload_bytes: sum(resolveWorkOrderContextBlocks({ order, manifest })),
  full_work_order_bytes: bytes(order),
  complete_manifest_bytes: bytes(manifest),
  after_manifest_plus_required_payload_bytes: bytes(manifest) + sum(selected),
  block_count: manifest.blocks.length,
  required_block_count: selected.length,
  provider_input_tokens: null,
  caveat:
    "Payload selection is measured, not provider savings. A consumer that reads the full discovery manifest can spend more bytes than the original WorkOrder. Fresh context reloads every required block. No paid provider replay was run.",
};
const sourcePaths = [
  ...git("diff", before.source.commit, "--name-only", "--diff-filter=ACMRT").split("\n"),
  ...git("ls-files", "--others", "--exclude-standard", "packages", "scripts/lib").split("\n"),
  "scripts/bench/compare-agent-efficiency-vn1-fn4.mjs",
].filter(
  (file) => /^(packages|scripts|schemas)\//u.test(file) && !file.startsWith("scripts/baselines/"),
);
const sources = [...new Set(sourcePaths)]
  .toSorted()
  .map((file) => ({ path: file, digest: hash(read(file)) }));
const report = {
  schema_version: 1,
  task_id: "202609071501-VN1FN4",
  status: "implementation_measured_schema_parity_verified",
  source: {
    committed_head: before.source.commit,
    committed_snapshot_digest: hash(read(`${prefix}before.json`)),
    repeated_snapshot_digest: hash(read(`${prefix}after.json`)),
    working_source_manifest_digest: hash(JSON.stringify(sources)),
    working_sources: sources,
    note: "Source digests identify current file contents relative to the historical snapshot, including committed and uncommitted changes.",
  },
  historical_snapshot: {
    before: before.totals,
    after: after.totals,
    change: "None: identical committed source, selection and measurement definitions",
    unavailable: [
      "delivered context bytes",
      "model-read context bytes",
      "cached input tokens",
      "WorkItem/role coverage for old task projections",
    ],
    provider_token_saving_percent: null,
  },
  matched_context_probe: context,
  service_commit_evidence: {
    definition:
      "Committed .agentplane-only change; the historical count does not imply removability",
    historical_before: before.totals.service_commits,
    historical_after: after.totals.service_commits,
    matched_provider_commit_reduction: null,
    verified_behavior:
      "Existing evidence-rework integration scenario persists passed declared checks in the evaluator-result commit. Unit coverage rejects deferral when durable local recovery or managed mode predicates are absent.",
    retained_cost:
      "Evaluator decision commit, implementation identity, verification journal and recovery boundaries remain. This report does not infer one fewer commit for every episode.",
  },
  artifact_evidence: {
    definition:
      "Canonical semantic-result schema payload copies for two exchanges with identical schema",
    before_payload_copies: 2,
    after_payload_objects: 1,
    after_descriptors: 2,
    live_schema_payload_bytes: 149_956,
    live_descriptor_bytes: 373,
    observed_descriptor_ref:
      ".git/agentplane/kernel/exchanges/202609071501-VN1FN4/b0a40bc66737eb05804278c567d56f4bcf304d62ab193be729a64f996a941efd/result-schema-object.json",
    observed_descriptor_digest:
      "sha256:c92fa78f3d80e5408a1811da5a68b32df035a6674b5d11232e4a8add3ba0da46",
    observed_payload_digest:
      "sha256:99d332e68d987a4eed07a0b25b6ed47cf0b520ad1424c7afcdc7d868dd2aa6a0",
    two_exchange_before_schema_bytes: 299_912,
    two_exchange_after_schema_and_descriptor_bytes: 150_702,
    classification:
      "Storage arithmetic over measured live payload/descriptor sizes, supported by the existing two-exchange integration test; not a whole-task artifact benchmark",
    retained_cost:
      "One immutable payload plus per-exchange references; distinct content adds an object. Historical copies and adapter-specific schemas remain untouched.",
  },
  deterministic_transition_evidence: {
    definition: "Mocked transport dispatches in existing managed canonical lifecycle scenarios",
    after_local_semantic_dispatches: 3,
    after_cloud_rework_semantic_dispatches: 5,
    after_final_validation_and_completion_dispatches: 0,
    after_terminal_replay_additional_dispatches: 0,
    before_final_validation_and_completion_dispatches: null,
    caveat:
      "The previous controller stopped at this route; no matched completed baseline exists. These are test call counts, not observed provider episodes or token savings.",
    retained_cost:
      "Native final checks and immutable evidence run; restart after persistence reruns checks. Independent evaluator and approval boundaries remain semantic/human stops.",
  },
  correctness_limits: [
    "Generated schema parity was synchronized through the separately USER-approved Q6MEAH task and now passes schemas:check. The current working-source manifest includes those generated mirrors.",
    "Legacy bootstrap task QCBB76 has a separate malformed scope-extension contract; its lifecycle and integration are not complete.",
    "This report records the local comparison only. Full repository CI, external provider effects, publication and integration are not established by these measurements.",
    "Missing usage stays null; native receipts, stale-state/CAS checks, authority, input/output digests and crash recovery remain required costs.",
  ],
};
writeFileSync(new URL(`${prefix}comparison.json`, root), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(context, null, 2));
