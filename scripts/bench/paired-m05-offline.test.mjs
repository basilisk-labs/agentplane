import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// Run the existing core build before this Node test; no source-workspace fallback.
const coreRuntime = new URL("../../packages/core/dist/tasks/index.js", import.meta.url);
assert.ok(existsSync(coreRuntime), "Build @agentplaneorg/core before running the Node M05 tests.");
const { createRepositorySnapshot, normalizeTaskPlanProposal } = await import(coreRuntime.href);
import { m05Corpus, normalizeM05Bundle } from "./paired-m05-offline.mjs";
import { verifyM05Plan } from "./paired-m05-oracle.mjs";

const commit = "1".repeat(40);
function fixture() {
  const task = { ...m05Corpus()[1], policy_digest: `sha256:${"a".repeat(64)}` };
  const planning_baseline = createRepositorySnapshot({
    git: { kind: "commit", sha: commit, ref: "refs/heads/main" },
    dirty_paths: [],
    policy_digest: task.policy_digest,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: "2026-10-06T00:00:00.000Z",
  });
  const plan = normalizeTaskPlanProposal(task.plan, {
    task_id: "m05-offline-fixture",
    planning_baseline,
  });
  const route = {
    arm: "no_recipe",
    route: "inline",
    authority_granted: false,
    provider_invoked: false,
  };
  return { task, plan, route };
}
test("independent M05 oracle accepts the complete native normalized proposal", () => {
  const { task, plan, route } = fixture();
  assert.equal(verifyM05Plan(task, plan, route, "no_recipe", commit), true);
});
for (const [label, mutate] of [
  ["scope widening", (p) => p.work_items.work_items[0].scope_roots.push(".")],
  ["capability widening", (p) => p.work_items.work_items[0].capabilities.push("provider.write")],
  [
    "resource claim",
    (p) =>
      p.work_items.work_items[0].resource_claims.push({
        kind: "path",
        resource: ".",
        mode: "write",
      }),
  ],
  ["optional work", (p) => (p.work_items.work_items[0].optional = true)],
  ["item criterion removal", (p) => p.work_items.work_items[0].acceptance_criteria.pop()],
  ["item check removal", (p) => p.work_items.work_items[0].validation.checks.pop()],
  ["top-level check disconnection", (p) => (p.top_level_validation.criteria[0].check_ids = [])],
  ["check capability", (p) => (p.top_level_validation.checks[0].capability = "other")],
  ["forged approval", (p) => (p.approval = "USER")],
  ["different baseline", (p) => (p.planning_baseline.git.sha = "2".repeat(40))],
])
  test(`independent M05 oracle rejects ${label}`, () => {
    const { task, plan, route } = fixture();
    mutate(plan);
    assert.equal(verifyM05Plan(task, plan, route, "no_recipe", commit), false);
  });

test("M05 normalizes only generated whitespace-only lines before pinning", () => {
  const source = "  const x = `value`;\n \t \n\tcode();\n";
  const normalized = normalizeM05Bundle(source);
  assert.equal(normalized, "  const x = `value`;\n\n\tcode();\n");
  assert.equal(normalizeM05Bundle(normalized), normalized);
  assert.equal(/^[\t ]+$/m.test(normalized), false);
});

test(
  "M05 bundles real source entrypoints into an independently executable product",
  { timeout: 60_000 },
  () => {
    const root = fileURLToPath(new URL("../../", import.meta.url));
    const cache = path.join(root, "node_modules", ".cache");
    mkdirSync(cache, { recursive: true });
    const isolated = mkdtempSync(path.join(cache, "m05-bundle-"));
    try {
      const product = path.join(isolated, "product.mjs");
      execFileSync(
        "bun",
        ["build", "scripts/bench/paired-m05-product.mjs", "--target=node", `--outfile=${product}`],
        { cwd: root, timeout: 30_000, stdio: "pipe" },
      );
      // No generated dist import may survive into this portable executable.
      assert.doesNotMatch(
        readFileSync(product, "utf8"),
        /(?:from\s*|import\s*\()["'][^"']*packages\/(?:core|recipes)\/dist/u,
      );
      for (const task of m05Corpus()) {
        const bound = { ...task, policy_digest: `sha256:${"a".repeat(64)}` };
        writeFileSync(path.join(isolated, "fixture.json"), JSON.stringify(bound));
        for (const arm of ["no_recipe", "instantiate", "specialize"]) {
          const result = JSON.parse(
            execFileSync(process.execPath, [product], {
              cwd: isolated,
              timeout: 10_000,
              encoding: "utf8",
              env: {
                ...process.env,
                AGENTPLANE_PAIRED_MODE: "offline",
                AGENTPLANE_PAIRED_FAKE_PROVIDER: "1",
                AGENTPLANE_PAIRED_NETWORK: "deny",
                AGENTPLANE_PAIRED_ARM: arm,
                AGENTPLANE_PAIRED_TARGET_COMMIT: commit,
                AGENTPLANE_PAIRED_CHECK_IDS: "[]",
                AGENTPLANE_PAIRED_RUNTIME_PROFILE: "{}",
              },
            }),
          );
          assert.equal(result.status, "completed");
          assert.equal(result.token_usage.state, "unavailable");
          const plan = JSON.parse(readFileSync(path.join(isolated, "plan.json"), "utf8"));
          const route = JSON.parse(readFileSync(path.join(isolated, "route.json"), "utf8"));
          assert.equal(verifyM05Plan(bound, plan, route, arm, commit), true);
        }
      }
    } finally {
      rmSync(isolated, { recursive: true, force: true });
    }
  },
);
