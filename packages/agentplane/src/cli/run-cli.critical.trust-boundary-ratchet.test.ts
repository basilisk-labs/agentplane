import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

import { afterEach, expect, it } from "vitest";

import { describeCritical } from "@agentplane/testkit";

const execFileAsync = promisify(execFile);
const REPO_ROOT = process.cwd();
const LIBRARY_URL = pathToFileURL(
  path.join(REPO_ROOT, "scripts/lib/trust-boundary-ratchet.mjs"),
).href;
const CHECKER = path.join(REPO_ROOT, "scripts/checks/check-trust-boundary-ratchet.mjs");
const tempRoots: string[] = [];

type Violation = {
  violation_id: string;
  rule_id: string;
  rf_owners: string[];
  owner_task_ids: string[];
  path: string;
  locator: string;
  message: string;
};

type RatchetLibrary = {
  TRUST_BOUNDARY_RULES: {
    id: string;
    rf_owners: string[];
    owner_task_ids: string[];
    description: string;
  }[];
  baselineViolationEntry: (violation: Violation) => Record<string, unknown>;
  collectTrustBoundaryViolations: (root: string) => Violation[];
  trustBoundaryOriginDigest: (ids: string[]) => string;
  validateTrustBoundaryBaseline: (options: {
    baseline: Record<string, unknown>;
    violations: Violation[];
    expectedOriginDigest: string;
  }) => string[];
};

async function library(): Promise<RatchetLibrary> {
  return (await import(LIBRARY_URL)) as RatchetLibrary;
}

async function makeFixtureRoot(): Promise<string> {
  const cacheRoot = path.join(REPO_ROOT, ".agentplane", "cache");
  await mkdir(cacheRoot, { recursive: true });
  const root = await mkdtemp(path.join(cacheRoot, "trust-ratchet-critical-"));
  tempRoots.push(root);
  await mkdir(path.join(root, "packages/agentplane/src"), { recursive: true });
  await mkdir(path.join(root, "packages/agentplane/assets"), { recursive: true });
  return root;
}

async function writeFixture(root: string, relativePath: string, text: string): Promise<void> {
  const filePath = path.join(root, relativePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, text, "utf8");
}

async function writeUnsafeFixtures(root: string): Promise<void> {
  await writeFixture(
    root,
    "packages/agentplane/src/router.ts",
    `export const next = "agentplane evaluator run T --verdict pass --summary ok";\n`,
  );
  await writeFixture(
    root,
    "packages/agentplane/src/runner/types/invocation.ts",
    `export type RunnerResultManifest = { schema_version: 1; exit_code?: number | null };\n`,
  );
  await writeFixture(
    root,
    "packages/agentplane/src/runner/adapters/codex-preparation.ts",
    `export function sandbox(value?: string) { if (!value) return "danger-full-access"; return value; }\n`,
  );
  await writeFixture(
    root,
    "packages/agentplane/src/runner/types/context.ts",
    [
      `type TaskData = { doc?: string };`,
      `type RouteDecision = { kind: string };`,
      `export type RunnerTaskContext = { data: TaskData; doc: string };`,
      `export type RunnerContextBundle = { route_decision?: Record<string, unknown> };`,
      `export type SafeBundle = { route: RouteDecision };`,
      ``,
    ].join("\n"),
  );
  await writeFixture(
    root,
    "packages/agentplane/src/harness/hooks-lifecycle.ts",
    `declare function startProcess(value: unknown): void;\nexport function hook(command: string) { startProcess({ command: "sh", args: ["-lc", command] }); }\n`,
  );
}

function makeBaseline(module: RatchetLibrary, violations: Violation[]) {
  const ids = violations.map((entry) => entry.violation_id);
  return {
    schema_version: 1,
    baseline_id: "agentplane.trust-boundary.v0.7",
    origin: {
      violation_ids_sha256: module.trustBoundaryOriginDigest(ids),
      violation_ids: ids,
    },
    rules: module.TRUST_BOUNDARY_RULES,
    violations: violations.map((violation) => module.baselineViolationEntry(violation)),
  };
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describeCritical("critical: trust-boundary architecture ratchet", () => {
  it("keeps stable rule IDs and RF ownership", async () => {
    const module = await library();
    expect(
      Object.fromEntries(module.TRUST_BOUNDARY_RULES.map((rule) => [rule.id, rule.rf_owners])),
    ).toEqual({
      "trust.no-agent-writable-observed-fields": ["RF-01a", "RF-01b"],
      "trust.no-automatic-semantic-verdict": ["RF-00"],
      "trust.no-duplicate-runner-task-representation": ["RF-21"],
      "trust.no-implicit-danger-sandbox": ["RF-03"],
      "trust.no-rendered-command-orchestration": ["RF-06b", "RF-09", "RF-25"],
      "trust.no-untyped-durable-route-workorder": ["RF-05a", "RF-05b"],
    });
  });

  it("accepts safe typed fixtures and detects one synthetic violation per invariant", async () => {
    const module = await library();
    const safeRoot = await makeFixtureRoot();
    await writeFixture(
      safeRoot,
      "packages/agentplane/src/safe.ts",
      [
        `type RouteDecision = { kind: "operation" };`,
        `type RunnerResultManifest = { schema_version: 1; summary: string };`,
        `type RunnerTaskContext = { task_id: string; doc: string };`,
        `type RunnerContextBundle = { route_decision: RouteDecision };`,
        `const sandbox = "workspace-write";`,
        `export { sandbox };`,
        ``,
      ].join("\n"),
    );
    expect(module.collectTrustBoundaryViolations(safeRoot)).toEqual([]);

    const unsafeRoot = await makeFixtureRoot();
    await writeUnsafeFixtures(unsafeRoot);
    const violations = module.collectTrustBoundaryViolations(unsafeRoot);
    expect(new Set(violations.map((entry) => entry.rule_id))).toEqual(
      new Set(module.TRUST_BOUNDARY_RULES.map((rule) => rule.id)),
    );
    const emptyBaseline = makeBaseline(module, []);
    const errors = module.validateTrustBoundaryBaseline({
      baseline: emptyBaseline,
      violations,
      expectedOriginDigest: emptyBaseline.origin.violation_ids_sha256,
    });
    for (const rule of module.TRUST_BOUNDARY_RULES) {
      expect(errors.some((error) => error.includes(`new violation ${rule.id} at `))).toBe(true);
    }
    expect(violations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "packages/agentplane/src/runner/types/invocation.ts",
          locator: "type:RunnerResultManifest.exit_code",
        }),
        expect.objectContaining({
          path: "packages/agentplane/src/runner/types/context.ts",
          locator: "type:RunnerTaskContext.data+doc",
        }),
      ]),
    );
  });

  it("fails new violations and stale entries, then accepts an explicit baseline shrink", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeUnsafeFixtures(root);
    const original = module.collectTrustBoundaryViolations(root);
    const baseline = makeBaseline(module, original);
    const originDigest = baseline.origin.violation_ids_sha256;
    expect(
      module.validateTrustBoundaryBaseline({
        baseline,
        violations: original,
        expectedOriginDigest: originDigest,
      }),
    ).toEqual([]);

    await writeFixture(
      root,
      "packages/agentplane/src/second-router.ts",
      `export const next = "agentplane evaluator run U --verdict pass --summary ok";\n`,
    );
    const grown = module.collectTrustBoundaryViolations(root);
    expect(
      module
        .validateTrustBoundaryBaseline({
          baseline,
          violations: grown,
          expectedOriginDigest: originDigest,
        })
        .join("\n"),
    ).toContain("new violation trust.no-automatic-semantic-verdict");

    await writeFixture(
      root,
      "packages/agentplane/src/router.ts",
      `export const next = "review";\n`,
    );
    await writeFixture(
      root,
      "packages/agentplane/src/second-router.ts",
      `export const next = "review";\n`,
    );
    const reduced = module.collectTrustBoundaryViolations(root);
    const staleErrors = module.validateTrustBoundaryBaseline({
      baseline,
      violations: reduced,
      expectedOriginDigest: originDigest,
    });
    expect(staleErrors.join("\n")).toContain(
      "resolved violation remains in baseline; remove it to shrink debt",
    );

    baseline.violations = reduced.map((violation) => module.baselineViolationEntry(violation));
    expect(
      module.validateTrustBoundaryBaseline({
        baseline,
        violations: reduced,
        expectedOriginDigest: originDigest,
      }),
    ).toEqual([]);
  });

  it("rejects active baseline growth outside the reviewed origin", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeUnsafeFixtures(root);
    const violations = module.collectTrustBoundaryViolations(root);
    const baseline = makeBaseline(module, violations);
    baseline.violations.push({
      ...module.baselineViolationEntry(violations[0]!),
      violation_id: `${violations[0]!.violation_id}:new-debt`,
    });
    const errors = module.validateTrustBoundaryBaseline({
      baseline,
      violations,
      expectedOriginDigest: baseline.origin.violation_ids_sha256,
    });
    expect(errors.join("\n")).toContain("baseline growth is forbidden");
  });

  it("accepts the reviewed repository baseline through the executable checker", async () => {
    const result = await execFileAsync(process.execPath, [CHECKER], {
      cwd: REPO_ROOT,
      env: process.env,
    });
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("trust-boundary ratchet OK (28 reviewed violation(s)");
  });
});
