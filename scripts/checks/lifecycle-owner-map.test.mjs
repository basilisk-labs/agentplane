import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

const ROOT = process.cwd();
const map = JSON.parse(
  readFileSync(path.join(ROOT, "scripts/checks/lifecycle-owner-map.json"), "utf8"),
);

const expectedOwnerRoles = ["application_coordinator", "domain_reducer", "state_writer"];
const expectedResponsibilities = [
  "authority_admission",
  "canonical_state_persistence",
  "command_event_reduction",
  "completion_eligibility",
  "effect_dispatch",
  "effect_observation",
  "effect_operation_admission",
  "effect_reconciliation",
  "final_validation_execution",
  "hosted_state_observation",
  "recovery_routing",
  "scheduling_readiness",
  "semantic_context_projection",
  "transition_admission",
];
const allowedClassifications = new Set([
  "canonical_owner",
  "compatibility_only",
  "coordinator_capability",
  "later_deletion_candidate",
  "retained_pure_helper",
]);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function sourceFor(relativePath) {
  const absolute = path.join(ROOT, relativePath);
  assert.ok(existsSync(absolute), `missing mapped source: ${relativePath}`);
  return readFileSync(absolute, "utf8");
}

function assertSymbolExists(relativePath, qualifiedSymbol) {
  const symbol = qualifiedSymbol.split(".").at(-1);
  const source = sourceFor(relativePath);
  const declaration = new RegExp(
    `\\b(?:function|class|const)\\s+${escapeRegex(symbol)}\\b|\\b${escapeRegex(symbol)}\\s*\\(`,
    "u",
  );
  assert.match(source, declaration, `${relativePath}: missing mapped symbol ${qualifiedSymbol}`);
}

function key(row) {
  return `${row.path}#${row.symbol}`;
}

function captures(relativePath, pattern) {
  const values = [];
  for (const match of sourceFor(relativePath).matchAll(pattern)) values.push(match[1]);
  return values.map((symbol) => `${relativePath}#${symbol}`);
}

test("pins one reducer, writer, and application coordinator", () => {
  assert.deepEqual(
    map.canonical_owners.map(({ role }) => role).toSorted(),
    expectedOwnerRoles,
  );
  assert.equal(new Set(map.canonical_owners.map(({ id }) => id)).size, 3);
  for (const owner of map.canonical_owners) assertSymbolExists(owner.path, owner.symbol);
});

test("maps every lifecycle responsibility to exactly one canonical owner", () => {
  assert.deepEqual(
    map.responsibilities.map(({ id }) => id).toSorted(),
    expectedResponsibilities,
  );
  assert.equal(new Set(map.responsibilities.map(({ id }) => id)).size, expectedResponsibilities.length);
  const ownerIds = new Set(map.canonical_owners.map(({ id }) => id));
  for (const responsibility of map.responsibilities) {
    assert.ok(ownerIds.has(responsibility.owner_id), `${responsibility.id}: unknown owner`);
    assertSymbolExists(responsibility.operation_path, responsibility.operation_symbol);
  }
});

test("maps every production task advance and run entrypoint", () => {
  const entrypointPattern =
    /export function (makeRunTask(?:Advance|Run)[A-Za-z0-9]*Handler)\b/gu;
  const discovered = [
    ...captures("packages/agentplane/src/commands/task/advance.command.ts", entrypointPattern),
    ...captures("packages/agentplane/src/commands/task/run.command.ts", entrypointPattern),
  ].toSorted();
  const mapped = map.production_entrypoints.map(key).toSorted();
  assert.deepEqual(mapped, discovered);
  for (const entrypoint of map.production_entrypoints) {
    assert.ok(entrypoint.mode === "mutating" || entrypoint.mode === "read_only");
    assertSymbolExists(entrypoint.path, entrypoint.symbol);
  }
});

test("classifies competing owners and every retained helper individually", () => {
  const keys = map.symbol_classifications.map(key);
  assert.equal(new Set(keys).size, keys.length, "a symbol has more than one classification");
  for (const row of map.symbol_classifications) {
    assert.ok(allowedClassifications.has(row.classification), `${key(row)}: unknown classification`);
    assert.ok(row.reason, `${key(row)}: missing classification reason`);
    assertSymbolExists(row.path, row.symbol);
  }
  for (const symbol of [
    "LifecycleEngine",
    "TaskCentricOrchestrator",
    "advanceCanonicalTask",
    "runCanonicalTask",
    "coordinateKernelEffect",
  ]) {
    const row = map.symbol_classifications.find((candidate) => candidate.symbol === symbol);
    assert.equal(row?.classification, "later_deletion_candidate", `${symbol}: competing owner retained`);
  }
  for (const symbol of [
    "WorkItemScheduler",
    "incompleteRequiredWorkItems",
    "evaluateTaskCompletion",
    "aggregateValidation",
  ]) {
    const row = map.symbol_classifications.find((candidate) => candidate.symbol === symbol);
    assert.equal(row?.classification, "retained_pure_helper", `${symbol}: pure helper not retained`);
  }
});

test("rejects an unmapped reducer, outer loop, scheduler, or coordinator", () => {
  const discovered = [
    ...captures(
      "packages/core/src/tasks/task-kernel/kernel.ts",
      /export function (reduce[A-Za-z0-9]*Command)\b/gu,
    ),
    ...captures(
      "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts",
      /export class (Kernel[A-Za-z0-9]*Adapter)\b/gu,
    ),
    ...captures(
      "packages/agentplane/src/commands/shared/workflow-supervisor.ts",
      /export async function (supervise[A-Za-z0-9]*Step)\b/gu,
    ),
    ...captures(
      "packages/core/src/tasks/task-centric/lifecycle.ts",
      /export class ([A-Za-z0-9]*(?:Engine|Orchestrator|Scheduler))\b/gu,
    ),
    ...captures(
      "packages/core/src/tasks/task-centric/orchestrator.ts",
      /export class ([A-Za-z0-9]*(?:Engine|Orchestrator|Scheduler))\b/gu,
    ),
    ...captures(
      "packages/core/src/tasks/task-centric/graph.ts",
      /export class ([A-Za-z0-9]*(?:Engine|Orchestrator|Scheduler))\b/gu,
    ),
    ...captures(
      "packages/agentplane/src/commands/task/kernel-advance.ts",
      /export async function ((?:advance|run|coordinate)[A-Za-z0-9]*(?:Task|Effect))\b/gu,
    ),
    ...captures(
      "packages/agentplane/src/commands/task/kernel-run.ts",
      /export async function ((?:advance|run|coordinate)[A-Za-z0-9]*(?:Task|Effect))\b/gu,
    ),
    ...captures(
      "packages/agentplane/src/commands/task/kernel-effect-coordinator.ts",
      /export async function ((?:advance|run|coordinate)[A-Za-z0-9]*(?:Task|Effect))\b/gu,
    ),
  ].toSorted();
  const mapped = map.boundary_inventory.map(key).toSorted();
  assert.deepEqual(mapped, discovered);
  assert.equal(
    map.boundary_inventory.filter(({ classification }) => classification === "canonical_owner")
      .length,
    3,
  );
  for (const row of map.boundary_inventory) {
    assert.ok(allowedClassifications.has(row.classification), `${key(row)}: unknown classification`);
    assertSymbolExists(row.path, row.symbol);
  }
});
