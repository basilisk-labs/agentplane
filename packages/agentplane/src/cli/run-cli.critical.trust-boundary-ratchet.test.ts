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
const REVIEWED_CAPTURE_COMMIT = "5e4f067fd5d1d3ef9238540231ce9306133b4161";
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
    baseBaseline?: Record<string, unknown> | null;
    violations: Violation[];
    expectedOriginDigest: string;
    expectedCapturedFromCommit?: string;
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
  await writeFixture(
    root,
    "packages/agentplane/src/runner/result-manifest-reader.ts",
    [
      `type SyntheticManifest = { status?: string; metrics?: { duration_ms?: number }; evidence?: unknown };`,
      `export function decodeResultEnvelope(raw: Record<string, unknown>): SyntheticManifest {`,
      `  return { status: raw.status as string, metrics: raw.metrics as { duration_ms?: number } };`,
      `}`,
      `export function mergeResultManifest(base: Record<string, unknown>, manifest: SyntheticManifest) {`,
      `  const accepted = manifest;`,
      `  return { ...base, status: accepted.status, evidence: accepted.evidence };`,
      `}`,
      ``,
    ].join("\n"),
  );
  await writeFixture(
    root,
    "packages/agentplane/src/commands/task/work-context.ts",
    [
      `export type AgentWorkContextContract = { kind: "agentplane"; version: 1 };`,
      `export type TaskBrief = {`,
      `  contract: AgentWorkContextContract;`,
      `  task: { id: string };`,
      `  workflow: { mode: string };`,
      `  route: { next: string };`,
      `  execution_packet: { argv: string[] };`,
      `};`,
      `export function bootstrap(bundle: { route_decision: unknown }) {`,
      `  const route = bundle.route_decision as { oracle?: { nextCommand?: string } };`,
      `  return route?.oracle?.nextCommand ?? "route_decision.oracle.nextCommand";`,
      `}`,
      ``,
    ].join("\n"),
  );
  await writeFixture(
    root,
    "packages/agentplane/src/runner/context/task-context.ts",
    [
      `export function buildTaskContext(data: Record<string, unknown>) {`,
      `  const task = { data, doc: "task", events: [] };`,
      `  return { task };`,
      `}`,
      ``,
    ].join("\n"),
  );
}

function makeBaseline(module: RatchetLibrary, violations: Violation[]) {
  const ids = violations.map((entry) => entry.violation_id);
  return {
    schema_version: 1,
    baseline_id: "agentplane.trust-boundary.v0.7",
    captured_from_commit: REVIEWED_CAPTURE_COMMIT,
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
        `const sandbox = (explicitDangerApproved: boolean) =>`,
        `  explicitDangerApproved ? "danger-full-access" : "workspace-write";`,
        `export { sandbox };`,
        ``,
      ].join("\n"),
    );
    expect(module.collectTrustBoundaryViolations(safeRoot)).toEqual([]);
    await writeFixture(
      safeRoot,
      "packages/agentplane/src/runner/adapters/missing-sandbox.ts",
      [
        `export const missing = (value?: string) => value ? value : "danger-full-access";`,
        `export const nullish = (value: string | null) =>`,
        `  value === null ? "danger-full-access" : value;`,
        `export const empty = (value: string) =>`,
        `  value.trim() ? value : "danger-full-access";`,
        ``,
      ].join("\n"),
    );
    expect(
      module
        .collectTrustBoundaryViolations(safeRoot)
        .filter((entry) => entry.rule_id === "trust.no-implicit-danger-sandbox"),
    ).toHaveLength(3);

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
    expect(
      violations.some(
        (entry) =>
          entry.path === "packages/agentplane/src/runner/types/invocation.ts" &&
          entry.locator.startsWith("type:RunnerResultManifest.exit_code:ast:"),
      ),
    ).toBe(true);
    expect(
      violations.some(
        (entry) =>
          entry.path === "packages/agentplane/src/runner/types/context.ts" &&
          entry.locator.startsWith("type:RunnerTaskContext.data+doc:ast:"),
      ),
    ).toBe(true);
    for (const locator of [
      /^parser:decodeResultEnvelope\.status:ast:/u,
      /^override:mergeResultManifest\.status:ast:/u,
      /^contract:AgentWorkContextContract:nominal-only:ast:/u,
      /^contract:TaskBrief:duplicated-durable-shape:ast:/u,
      /^assertion:route:route-decision-inline-shape:ast:/u,
      /^builder:buildTaskContext\.data\+doc:ast:/u,
    ]) {
      expect(violations.some((entry) => locator.test(entry.locator))).toBe(true);
    }
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

  it("allows debt shrink but rejects reactivation relative to the checked-out base", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeUnsafeFixtures(root);
    const original = module.collectTrustBoundaryViolations(root);
    const reviewedBaseline = makeBaseline(module, original);
    const reduced = original.slice(1);
    const shrunkBaseline = structuredClone(reviewedBaseline);
    shrunkBaseline.violations = reduced.map((violation) =>
      module.baselineViolationEntry(violation),
    );
    expect(
      module.validateTrustBoundaryBaseline({
        baseline: shrunkBaseline,
        baseBaseline: reviewedBaseline,
        violations: reduced,
        expectedOriginDigest: reviewedBaseline.origin.violation_ids_sha256,
        expectedCapturedFromCommit: REVIEWED_CAPTURE_COMMIT,
      }),
    ).toEqual([]);

    const reactivationErrors = module.validateTrustBoundaryBaseline({
      baseline: reviewedBaseline,
      baseBaseline: shrunkBaseline,
      violations: original,
      expectedOriginDigest: reviewedBaseline.origin.violation_ids_sha256,
      expectedCapturedFromCommit: REVIEWED_CAPTURE_COMMIT,
    });
    expect(reactivationErrors.join("\n")).toContain(
      "baseline reactivation or growth is forbidden relative to the checked-out base",
    );
  });

  it("rejects duplicate IDs and any active-entry metadata retag", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeUnsafeFixtures(root);
    const violations = module.collectTrustBoundaryViolations(root);
    const baseline = makeBaseline(module, violations);
    const digest = baseline.origin.violation_ids_sha256;

    const duplicateCurrent = module.validateTrustBoundaryBaseline({
      baseline,
      violations: [violations[0]!, violations[0]!, ...violations.slice(1)],
      expectedOriginDigest: digest,
      expectedCapturedFromCommit: REVIEWED_CAPTURE_COMMIT,
    });
    expect(duplicateCurrent.join("\n")).toContain("duplicate collected violation_id");

    const duplicateBaseline = structuredClone(baseline);
    duplicateBaseline.violations.push(structuredClone(duplicateBaseline.violations[0]!));
    expect(
      module
        .validateTrustBoundaryBaseline({
          baseline: duplicateBaseline,
          violations,
          expectedOriginDigest: digest,
          expectedCapturedFromCommit: REVIEWED_CAPTURE_COMMIT,
        })
        .join("\n"),
    ).toContain("duplicate baseline entry");

    const fields = ["rule_id", "path", "locator", "rationale"] as const;
    for (const field of fields) {
      const tampered = structuredClone(baseline);
      tampered.violations[0]![field] = `${String(tampered.violations[0]![field])}:tampered`;
      expect(
        module
          .validateTrustBoundaryBaseline({
            baseline: tampered,
            violations,
            expectedOriginDigest: digest,
            expectedCapturedFromCommit: REVIEWED_CAPTURE_COMMIT,
          })
          .join("\n"),
      ).toContain(`${field} does not match the collected violation`);
    }

    for (const field of ["rf_owners", "owner_task_ids"] as const) {
      const tampered = structuredClone(baseline);
      tampered.violations[0]![field] = ["retagged"];
      expect(
        module
          .validateTrustBoundaryBaseline({
            baseline: tampered,
            violations,
            expectedOriginDigest: digest,
            expectedCapturedFromCommit: REVIEWED_CAPTURE_COMMIT,
          })
          .join("\n"),
      ).toContain(`${field} do not match the collected violation`);
    }

    const recaptured = structuredClone(baseline);
    recaptured.captured_from_commit = "0000000000000000000000000000000000000000";
    expect(
      module
        .validateTrustBoundaryBaseline({
          baseline: recaptured,
          violations,
          expectedOriginDigest: digest,
          expectedCapturedFromCommit: REVIEWED_CAPTURE_COMMIT,
        })
        .join("\n"),
    ).toContain("captured_from_commit must remain");
  });

  it("assigns distinct stable IDs to equivalent shell dispatches in one function", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeFixture(
      root,
      "packages/agentplane/src/harness/duplicate-shells.ts",
      [
        `declare function startProcess(value: unknown): void;`,
        `export function dispatch(command: string) {`,
        `  startProcess({ command: "sh", args: ["-lc", command] });`,
        `  startProcess({ command: "sh", args: ["-lc", command] });`,
        `}`,
        ``,
      ].join("\n"),
    );
    const violations = module
      .collectTrustBoundaryViolations(root)
      .filter((entry) => entry.rule_id === "trust.no-rendered-command-orchestration");
    expect(violations).toHaveLength(2);
    expect(new Set(violations.map((entry) => entry.violation_id)).size).toBe(2);
    expect(violations.map((entry) => entry.locator)).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/:ast:CallExpression:[a-f0-9]{12}:1$/u),
        expect.stringMatching(/:ast:CallExpression:[a-f0-9]{12}:2$/u),
      ]),
    );
  });

  it("accepts the reviewed repository baseline through the executable checker", async () => {
    const result = await execFileAsync(process.execPath, [CHECKER], {
      cwd: REPO_ROOT,
      env: process.env,
    });
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("trust-boundary ratchet OK (");
  });
});
