import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

const ROOT = process.cwd();
const map = JSON.parse(
  readFileSync(path.join(ROOT, "scripts/checks/blueprint-retirement-map.json"), "utf8"),
);

const blueprintFields = [
  "id",
  "version",
  "title",
  "description",
  "taskKinds",
  "workflowModes",
  "allowedCommands",
  "policyModules",
  "contextBudget",
  "nodes",
  "edges",
  "requiredEvidence",
  "stopRules",
  "recipeExtensionPoints",
];
const contextBudgetFields = ["maxPolicyModules", "maxPromptBlocks", "rationale"];
const nodeFields = [
  "id",
  "kind",
  "mode",
  "required",
  "protected",
  "allowedCommands",
  "policyModules",
  "inputs",
  "outputs",
  "evidence",
  "recipeExtensions",
];
const edgeFields = ["from", "to", "condition"];
const evidenceFields = ["id", "kind", "required", "producedBy", "description"];
const stopFields = ["id", "reason", "severity"];
const recipeExtensionKinds = [
  "context_hint",
  "evidence_requirement",
  "check_suggestion",
  "output_schema",
  "artifact_template",
  "risk_hint",
  "preferred_blueprint",
];
const builtinPreferenceIds = [
  "analysis.light",
  "content.light",
  "docs.change",
  "code.direct",
  "code.branch_pr",
  "performance.benchmark",
  "quality.regression",
  "context.assimilation",
  "context.maximum_assimilation",
  "post_run.improvement_review",
  "release.strict",
  "ops.approval",
];
const nodeKinds = [
  "intake",
  "scope",
  "context_resolve",
  "approval_gate",
  "worktree_start",
  "work_unit",
  "deterministic_check",
  "fast_local_checks",
  "artifact_write",
  "pr_artifact",
  "hosted_checks",
  "publish_or_integrate",
  "verify_record",
  "quality_gate",
  "handoff",
  "finish",
];
const nodeModes = ["deterministic", "agentic", "approval", "record"];
const evidenceKinds = [
  "sources",
  "assumptions",
  "context_manifest",
  "changed_paths",
  "check_result",
  "artifact",
  "approval",
  "external_link",
  "commit",
  "final_output",
  "weak_links",
  "quality_report",
  "rollback",
];
const stopSeverities = ["stop", "approval_required", "warn"];

function expectedContractRows() {
  return [
    ...blueprintFields.map((field) => `Blueprint.${field}`),
    ...contextBudgetFields.map((field) => `BlueprintContextBudget.${field}`),
    ...nodeFields.map((field) => `BlueprintNode.${field}`),
    ...edgeFields.map((field) => `BlueprintEdge.${field}`),
    ...evidenceFields.map((field) => `EvidenceRequirement.${field}`),
    ...stopFields.map((field) => `StopRule.${field}`),
  ].toSorted();
}

function walkTypescriptFiles(root) {
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...walkTypescriptFiles(absolute));
    if (entry.isFile() && entry.name.endsWith(".ts")) files.push(absolute);
  }
  return files;
}

function activeConsumerPaths() {
  const consumerPattern =
    /(from ["'].*(?:blueprints|blueprint-extensions)|Blueprint[A-Z]|blueprint[A-Z_]|blueprint_)/u;
  return map.inventory.roots
    .flatMap((root) => walkTypescriptFiles(path.join(ROOT, root)))
    .filter((file) => !file.endsWith(".test.ts") && !file.endsWith(".testkit.ts"))
    .filter((file) => consumerPattern.test(readFileSync(file, "utf8")))
    .map((file) => path.relative(ROOT, file))
    .toSorted();
}

test("maps every Blueprint contract field and Recipe V1 extension kind", () => {
  assert.deepEqual(map.contract_rows.map((row) => row.source).toSorted(), expectedContractRows());
  assert.deepEqual(
    map.recipe_extension_rows.map((row) => row.kind).toSorted(),
    recipeExtensionKinds.toSorted(),
  );
  assert.deepEqual(
    map.builtin_preference_rows.map((row) => row.id).toSorted(),
    builtinPreferenceIds.toSorted(),
  );
  assert.deepEqual(map.node_kind_rows.map((row) => row.kind).toSorted(), nodeKinds.toSorted());
  assert.deepEqual(map.node_mode_rows.map((row) => row.mode).toSorted(), nodeModes.toSorted());
  assert.deepEqual(
    map.evidence_kind_rows.map((row) => row.kind).toSorted(),
    evidenceKinds.toSorted(),
  );
  assert.deepEqual(
    map.stop_severity_rows.map((row) => row.severity).toSorted(),
    stopSeverities.toSorted(),
  );
  for (const row of [
    ...map.contract_rows,
    ...map.recipe_extension_rows,
    ...map.builtin_preference_rows,
    ...map.node_kind_rows,
    ...map.node_mode_rows,
    ...map.evidence_kind_rows,
    ...map.stop_severity_rows,
  ]) {
    assert.ok(row.owner, `${row.source ?? row.kind}: missing replacement owner`);
    assert.ok(row.disposition, `${row.source ?? row.kind}: missing disposition`);
    assert.ok(row.verification, `${row.source ?? row.kind}: missing verification`);
  }
});

test("freezes mandatory lifecycle obligations independently of Blueprint", () => {
  assert.deepEqual(
    map.mandatory_stage_obligations.map((entry) => entry.obligation).toSorted(),
    [
      "planning",
      "user_approval",
      "implementation",
      "independent_evaluation",
      "deterministic_verification",
      "hosted_integration",
      "effect_in_doubt_stop",
    ].toSorted(),
  );
  for (const entry of map.mandatory_stage_obligations) {
    assert.ok(entry.owner);
    assert.ok(entry.verification);
  }
});

test("pins and classifies every active production consumer", () => {
  const consumers = activeConsumerPaths();
  const serialized = `${consumers.join("\n")}\n`;
  const digest = createHash("sha256").update(serialized).digest("hex");
  assert.equal(consumers.length, map.inventory.production_consumer_count);
  assert.equal(digest, map.inventory.production_consumer_sha256);
  for (const consumer of consumers) {
    const rule = map.consumer_rules.find(({ prefix }) => consumer.startsWith(prefix));
    assert.ok(rule, `unclassified active Blueprint consumer: ${consumer}`);
    assert.ok(rule.owner, `${consumer}: missing replacement owner`);
    assert.ok(rule.disposition, `${consumer}: missing disposition`);
    assert.ok(rule.verification, `${consumer}: missing verification`);
  }
});
