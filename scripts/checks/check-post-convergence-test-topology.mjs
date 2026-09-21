import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  buildTestInventory,
  classifyPrimaryTestRoutes,
  listVitestSuiteFiles,
} from "../lib/test-route-registry.mjs";

const ROOT = process.cwd();
const LEDGER_PATH = "scripts/checks/post-convergence-test-topology.json";
const ledger = JSON.parse(readFileSync(path.join(ROOT, LEDGER_PATH), "utf8"));

function source(filePath) {
  return readFileSync(path.join(ROOT, filePath), "utf8");
}

function assertExistingTest(filePath, label) {
  assert.ok(existsSync(path.join(ROOT, filePath)), `${label}: missing ${filePath}`);
  assert.match(filePath, /\.test\.(?:ts|mjs)$/u, `${label}: not a test file: ${filePath}`);
  assert.equal(
    classifyPrimaryTestRoutes(filePath).length,
    1,
    `${label}: ${filePath} must have exactly one primary route`,
  );
}

assert.equal(ledger.schema_version, 1);
assert.ok(ledger.deleted_cases.length > 0, "deleted case ledger must not be empty");
for (const entry of ledger.deleted_cases) {
  assertExistingTest(entry.file, "deleted case source");
  assertExistingTest(entry.retained_route, "deleted case retained route");
  assert.ok(entry.removed_behavior.trim().length > 0, `${entry.title}: missing removed behavior`);
  assert.ok(entry.evidence.trim().length > 0, `${entry.title}: missing deletion evidence`);
  assert.doesNotMatch(
    source(entry.file),
    new RegExp(entry.title.replaceAll(/[.*+?^${}()|[\]\\]/gu, "\\$&"), "u"),
  );
}

for (const surface of ledger.removed_test_only_production_surfaces) {
  assert.equal(existsSync(path.join(ROOT, surface.path)), false, `${surface.path} still exists`);
  assert.ok(surface.export.length > 0 && surface.replacement.length > 0);
}
assert.deepEqual(
  JSON.parse(source("scripts/checks/lifecycle-engine-retirement.json")).test_only_compatibility,
  [],
  "retirement ledger must not retain test-only production compatibility exports",
);

const inventory = buildTestInventory();
const invariantCounts = {};
const testTitlePattern =
  /\b(?:it|test)(?:\.(?:each|skipIf|todoIf)\([^)]*\))?\s*\(\s*(["'`])([^\n]*?)\1/gu;
for (const [category, ownership] of Object.entries(ledger.invariant_ownership)) {
  assert.equal(ownership.primary_routes_own_cases, true, `${category}: route ownership disabled`);
  const pattern = new RegExp(ownership.title_pattern, "iu");
  let count = 0;
  for (const entry of inventory) {
    const contents = source(entry.filePath);
    for (const match of contents.matchAll(testTitlePattern)) {
      if (!pattern.test(match[2])) continue;
      assert.equal(
        entry.primaryRoutes.length,
        1,
        `${category}: ${entry.filePath} has no unique primary owner`,
      );
      count += 1;
    }
  }
  assert.ok(count > 0, `${category}: classifier owns no retained invariant cases`);
  invariantCounts[category] = count;
  for (const filePath of ownership.representative_owners) {
    assertExistingTest(filePath, `${category} representative owner`);
  }
}

for (const [suiteName, files] of Object.entries(listVitestSuiteFiles())) {
  assert.ok(files.length > 0, `${suiteName}: configured suite has no tests`);
  for (const filePath of files) assertExistingTest(filePath, `${suiteName} suite`);
}

const skipPattern = /\b(?:describe|it|test)\s*\.\s*(?:skip|skipIf|todo|todoIf)\b/gu;
const todoPattern = /\b(?:describe|it|test)\s*\.\s*(?:todo|todoIf)\b/u;

function countMatches(contents, pattern) {
  return [...contents.matchAll(new RegExp(pattern.source, pattern.flags))].length;
}

export function validateExpectedSkipSites(contents, entry) {
  const expectedCount = entry.sites.reduce((total, site) => total + site.count, 0);
  assert.equal(
    countMatches(contents, skipPattern),
    expectedCount,
    `${entry.file}: unenumerated or stale skip site`,
  );
  for (const site of entry.sites) {
    assert.ok(site.reason.trim().length > 0, `${entry.file}: missing skip reason`);
    assert.ok(Number.isInteger(site.count) && site.count > 0, `${entry.file}: invalid skip count`);
    assert.equal(
      countMatches(contents, new RegExp(site.pattern, "gu")),
      site.count,
      `${entry.file}: skip site pattern count changed: ${site.pattern}`,
    );
  }
}

const expectedSkipsByFile = new Map();
for (const entry of ledger.expected_skip_sites) {
  assertExistingTest(entry.file, "expected skip site");
  assert.equal(expectedSkipsByFile.has(entry.file), false, `${entry.file}: duplicate skip entry`);
  assert.ok(Array.isArray(entry.sites) && entry.sites.length > 0, `${entry.file}: missing sites`);
  expectedSkipsByFile.set(entry.file, entry);
  validateExpectedSkipSites(source(entry.file), entry);
}
const observedSkipFiles = new Set();
for (const entry of inventory) {
  const contents = source(entry.filePath);
  assert.doesNotMatch(contents, todoPattern, `${entry.filePath}: todo tests are not allowed`);
  if (countMatches(contents, skipPattern) === 0) continue;
  observedSkipFiles.add(entry.filePath);
  assert.ok(expectedSkipsByFile.has(entry.filePath), `${entry.filePath}: unexpected skip site`);
}
assert.deepEqual(
  [...observedSkipFiles].toSorted(),
  [...expectedSkipsByFile.keys()].toSorted(),
  "skip allowlist contains a stale or unobserved path",
);
const mutationProbe = ledger.expected_skip_sites[0];
assert.throws(
  () =>
    validateExpectedSkipSites(
      `${source(mutationProbe.file)}\nit.skip("unexpected");\n`,
      mutationProbe,
    ),
  /unenumerated or stale skip site/u,
  "an additional skip in an already allowlisted file must fail closed",
);

for (const [suiteName, measurement] of Object.entries({
  fast: ledger.measurements.fast,
  release_critical: ledger.measurements.release_critical,
})) {
  for (const phase of ["before", "after"]) {
    const sample = measurement[phase];
    assert.ok(sample, `${suiteName}: missing ${phase} measurement`);
    assert.ok(sample.files > 0, `${suiteName}: ${phase} file count must be positive`);
    assert.ok(sample.cases > 0, `${suiteName}: ${phase} case count must be positive`);
    assert.equal(sample.wall_seconds.length, 3, `${suiteName}: ${phase} needs three wall runs`);
    assert.ok(
      sample.wall_seconds.every((duration) => Number.isFinite(duration) && duration > 0),
      `${suiteName}: ${phase} wall runs must be positive`,
    );
  }
}

process.stdout.write(
  `post-convergence test topology OK (${inventory.length} files; invariant owners ${JSON.stringify(invariantCounts)})\n`,
);
