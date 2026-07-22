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
  line: number;
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
  readTrustBoundaryReferenceBaseline: (options: {
    root: string;
    reference: string;
    baselineRelativePath: string;
    allowedMissingAtCommit: string;
  }) => { baseline: Record<string, unknown> | null; referenceCommit: string };
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

async function git(root: string, args: string[]): Promise<string> {
  const result = await execFileAsync("git", args, { cwd: root, encoding: "utf8" });
  return String(result.stdout).trim();
}

function shellClassSource(className: string, padding: string): string {
  return [
    `declare function startProcess(value: unknown): void;`,
    padding,
    `export class ${className} {`,
    `  dispatch(command: string) {`,
    `    startProcess({ command: "sh", args: ["-lc", command] });`,
    `  }`,
    `}`,
    ``,
  ].join("\n");
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
    [
      `interface ObservedClaims { exit_code?: number | null }`,
      `type ClaimsAlias = ObservedClaims;`,
      `export interface RunnerResultManifest extends ClaimsAlias { schema_version: 1 }`,
      `export type RunnerResult = { status?: string; exit_code?: number | null; metrics?: unknown; evidence?: unknown };`,
      ``,
    ].join("\n"),
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
      `type TaskProjection = { data: TaskData; doc: string };`,
      `export interface RunnerTaskContext extends TaskProjection { task_id: string }`,
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
      `import type { RunnerResult, RunnerResultManifest as Claims } from "./types/invocation.js";`,
      `const STATUS = "status";`,
      `const identity = <T>(value: T): T => value;`,
      `export function decodeAnything(raw: Record<string, unknown>): Claims {`,
      `  const accepted = identity(raw);`,
      `  const { [STATUS]: status } = accepted;`,
      `  return { ...accepted, [STATUS]: status } as Claims;`,
      `}`,
      `export function combineAnything(base: RunnerResult, claims: Claims): RunnerResult {`,
      `  const accepted = identity(claims);`,
      `  const { [STATUS]: status } = accepted;`,
      `  return { ...base, ...accepted, [STATUS]: status };`,
      `}`,
      `type NestedClaims = { manifest: Claims };`,
      `export function combineNested(base: RunnerResult, options: NestedClaims): RunnerResult {`,
      `  const { manifest: claims } = options;`,
      `  return { ...base, ...claims };`,
      `}`,
      `export function negativeParser(raw: Record<string, unknown>): Claims {`,
      `  return { schema_version: 1, summary: String(raw.summary ?? "") } as Claims;`,
      `}`,
      `export function negativeMerge(base: RunnerResult, claims: Claims): RunnerResult {`,
      `  return { ...base, status: "failed", summary: String(claims.summary ?? "") };`,
      `}`,
      ``,
    ].join("\n"),
  );
  await writeFixture(
    root,
    "packages/agentplane/src/runner/types/decoy.ts",
    [
      `export type RunnerResultManifest = { summary: string };`,
      `export type RunnerTaskContext = { task_id: string };`,
      ``,
    ].join("\n"),
  );
  await writeFixture(
    root,
    "packages/agentplane/src/shadow/runner/types/invocation.ts",
    `export type RunnerResultManifest = { summary: string };\n`,
  );
  await writeFixture(
    root,
    "packages/agentplane/src/commands/task/agent-work-context-contract.ts",
    [
      `interface NominalContract { kind: "agentplane"; version: 1 }`,
      `export type AgentWorkContextContract = NominalContract;`,
      ``,
    ].join("\n"),
  );
  await writeFixture(
    root,
    "packages/agentplane/src/commands/task/brief-model.ts",
    [
      `import type { AgentWorkContextContract as Contract } from "./agent-work-context-contract.js";`,
      `interface DurableBrief {`,
      `  contract: Contract;`,
      `  task: { id: string };`,
      `  workflow: { mode: string };`,
      `  route: { next: string };`,
      `  execution_packet: { argv: string[] };`,
      `}`,
      `export type TaskBrief = DurableBrief;`,
      ``,
    ].join("\n"),
  );
  await writeFixture(
    root,
    "packages/agentplane/src/commands/task/work-context.ts",
    [
      `export function bootstrap(bundle: { route_decision: unknown }) {`,
      `  const route = bundle.route_decision as { oracle?: { nextCommand?: string } };`,
      `  return route?.oracle?.nextCommand ?? "route_decision.oracle.nextCommand";`,
      `}`,
      ``,
    ].join("\n"),
  );
  await writeFixture(
    root,
    "packages/agentplane/src/commands/task/decoy.ts",
    [
      `export type AgentWorkContextContract = { payload: string };`,
      `export type TaskBrief = { summary: string };`,
      ``,
    ].join("\n"),
  );
  await writeFixture(
    root,
    "packages/agentplane/src/runner/context/task-context.ts",
    [
      `export function buildTaskContext(data: Record<string, unknown>) {`,
      `  const task = { task_id: "T", data, doc: "task", events: [] };`,
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
        `type SandboxAuthority = { danger_full_access_approved: boolean };`,
        `const sandbox = (authority: SandboxAuthority) =>`,
        `  Boolean(authority.danger_full_access_approved)`,
        `    ? "danger-full-access"`,
        `    : "workspace-write";`,
        `export { sandbox };`,
        `type NestedAuthority = { sandbox: { danger_full_access_authorized: boolean } };`,
        `export function guarded(authority: NestedAuthority) {`,
        `  if (!Boolean(!!authority.sandbox.danger_full_access_authorized)) {`,
        `    return "workspace-write";`,
        `  }`,
        `  return "danger-full-access";`,
        `}`,
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
        `export const coerced = (value?: string) =>`,
        `  Boolean(value) ? "danger-full-access" : "workspace-write";`,
        `export const doubleBang = (value?: string) =>`,
        `  !!value ? "danger-full-access" : "workspace-write";`,
        `export function early(value?: string) {`,
        `  if (value) return "danger-full-access";`,
        `  return "workspace-write";`,
        `}`,
        `export const named = (requestedSandbox?: string) =>`,
        `  Boolean(requestedSandbox) ? "danger-full-access" : "workspace-write";`,
        `export const record = (authority: Record<string, unknown>) =>`,
        `  authority.danger_full_access_approved ? "danger-full-access" : "workspace-write";`,
        `export const arrayExecution = () => ["danger-full-access"][0];`,
        ``,
      ].join("\n"),
    );
    const sandboxViolations = module
      .collectTrustBoundaryViolations(safeRoot)
      .filter((entry) => entry.rule_id === "trust.no-implicit-danger-sandbox");
    expect(sandboxViolations).toHaveLength(9);
    for (const name of [
      "missing",
      "nullish",
      "empty",
      "coerced",
      "doubleBang",
      "early",
      "named",
      "record",
      "arrayExecution",
    ]) {
      expect(sandboxViolations.some((entry) => entry.locator.startsWith(`fallback:${name}:`))).toBe(
        true,
      );
    }

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
    const requiredLocators = [
      /^parser:decodeAnything\.status:ast:/u,
      /^parser:decodeAnything\.spread:ast:/u,
      /^override:combineAnything\.status:ast:/u,
      /^override:combineAnything\.spread:ast:/u,
      /^override:combineNested\.spread:ast:/u,
      /^contract:AgentWorkContextContract:nominal-only:ast:/u,
      /^contract:TaskBrief:duplicated-durable-shape:ast:/u,
      /^assertion:route:route-decision-inline-shape:ast:/u,
      /^builder:buildTaskContext\.data\+doc:ast:/u,
    ];
    expect(
      requiredLocators
        .filter((locator) => !violations.some((entry) => locator.test(entry.locator)))
        .map((locator) => locator.source),
    ).toEqual([]);
    expect(
      violations.some((entry) => /(?:negativeParser|negativeMerge)/u.test(entry.locator)),
    ).toBe(false);
  });

  it("fails closed on ambiguous canonical declarations", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeFixture(
      root,
      "packages/agentplane/src/runner/types/invocation.ts",
      [
        `export type RunnerResultManifest = { exit_code?: number };`,
        `export interface RunnerResultManifest { summary?: string }`,
        ``,
      ].join("\n"),
    );
    await writeFixture(
      root,
      "packages/agentplane/src/runner/types/context.ts",
      [
        `export type RunnerTaskContext = { data: unknown; doc: string };`,
        `export interface RunnerTaskContext { task_id: string }`,
        ``,
      ].join("\n"),
    );
    const resolutionLocators = module
      .collectTrustBoundaryViolations(root)
      .filter((entry) => entry.locator.startsWith("resolution:"));
    expect(
      resolutionLocators.filter((entry) =>
        entry.locator.startsWith("resolution:RunnerResultManifest:ambiguous_type_declaration:ast:"),
      ),
    ).toHaveLength(2);
    expect(
      resolutionLocators.filter((entry) =>
        entry.locator.startsWith("resolution:RunnerTaskContext:ambiguous_type_declaration:ast:"),
      ),
    ).toHaveLength(2);
    expect(new Set(resolutionLocators.map((entry) => entry.violation_id)).size).toBe(
      resolutionLocators.length,
    );
  });

  it("rejects a false shrink when renamed observed flows are reintroduced", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeUnsafeFixtures(root);
    const original = module.collectTrustBoundaryViolations(root);
    const baseline = makeBaseline(module, original);
    await writeFixture(
      root,
      "packages/agentplane/src/runner/result-manifest-reader.ts",
      [
        `import type { RunnerResult, RunnerResultManifest as Claims } from "./types/invocation.js";`,
        `export const decodeSafe = (raw: Record<string, unknown>): Claims =>`,
        `  ({ schema_version: 1, summary: String(raw.summary ?? "") }) as Claims;`,
        `export const mergeSafe = (base: RunnerResult): RunnerResult =>`,
        `  ({ ...base, status: "failed" });`,
        ``,
      ].join("\n"),
    );
    const reduced = module.collectTrustBoundaryViolations(root);
    const shrunkBaseline = structuredClone(baseline);
    shrunkBaseline.violations = reduced.map((violation) =>
      module.baselineViolationEntry(violation),
    );
    expect(
      module.validateTrustBoundaryBaseline({
        baseline: shrunkBaseline,
        violations: reduced,
        expectedOriginDigest: baseline.origin.violation_ids_sha256,
      }),
    ).toEqual([]);

    await writeFixture(
      root,
      "packages/agentplane/src/runner/result-manifest-reader.ts",
      [
        `import type { RunnerResult, RunnerResultManifest as Claims } from "./types/invocation.js";`,
        `const EXIT = "exit_code";`,
        `const relay = <T>(value: T): T => value;`,
        `export function decodeRenamed(raw: Record<string, unknown>): Claims {`,
        `  const source = relay(raw);`,
        `  return { schema_version: 1, [EXIT]: source[EXIT] } as Claims;`,
        `}`,
        `export function mergeRenamed(base: RunnerResult, claims: Claims): RunnerResult {`,
        `  const source = relay(claims);`,
        `  return { ...base, ...source };`,
        `}`,
        ``,
      ].join("\n"),
    );
    const reintroduced = module.collectTrustBoundaryViolations(root);
    const errors = module.validateTrustBoundaryBaseline({
      baseline: shrunkBaseline,
      violations: reintroduced,
      expectedOriginDigest: baseline.origin.violation_ids_sha256,
    });
    expect(errors.join("\n")).toContain("new violation trust.no-agent-writable-observed-fields");
    expect(
      reintroduced.some((entry) => entry.locator.startsWith("parser:decodeRenamed.exit_code:")),
    ).toBe(true);
    expect(
      reintroduced.some((entry) => entry.locator.startsWith("override:mergeRenamed.spread:")),
    ).toBe(true);
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

  it("allows debt shrink but rejects reactivation relative to the current base reference", async () => {
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
      "baseline reactivation or growth is forbidden relative to the current base reference",
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

  it("uses the current origin/main baseline even when the checked-out branch is stale", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeUnsafeFixtures(root);
    await git(root, ["init", "-b", "main"]);
    await git(root, ["config", "user.name", "Ratchet Test"]);
    await git(root, ["config", "user.email", "ratchet@example.test"]);
    await git(root, ["add", "."]);
    await git(root, ["commit", "-m", "initial reviewed code"]);
    const initialCommit = await git(root, ["rev-parse", "HEAD"]);
    await git(root, ["branch", "stale"]);
    await git(root, ["update-ref", "refs/remotes/origin/main", initialCommit]);

    expect(
      module.readTrustBoundaryReferenceBaseline({
        root,
        reference: "origin/main",
        baselineRelativePath: "scripts/baselines/trust-boundary-violations.json",
        allowedMissingAtCommit: initialCommit,
      }),
    ).toEqual({ baseline: null, referenceCommit: initialCommit });

    await writeFixture(root, "README.md", "origin advanced without the ratchet\n");
    await git(root, ["add", "README.md"]);
    await git(root, ["commit", "-m", "advance main"]);
    const advancedWithoutBaseline = await git(root, ["rev-parse", "HEAD"]);
    await git(root, ["update-ref", "refs/remotes/origin/main", advancedWithoutBaseline]);
    expect(() =>
      module.readTrustBoundaryReferenceBaseline({
        root,
        reference: "origin/main",
        baselineRelativePath: "scripts/baselines/trust-boundary-violations.json",
        allowedMissingAtCommit: initialCommit,
      }),
    ).toThrow("refusing to run without the monotonic base");

    const violations = module.collectTrustBoundaryViolations(root);
    const fullBaseline = makeBaseline(module, violations);
    const reducedBaseline = structuredClone(fullBaseline);
    reducedBaseline.violations = reducedBaseline.violations.slice(1);
    await writeFixture(
      root,
      "scripts/baselines/trust-boundary-violations.json",
      `${JSON.stringify(reducedBaseline, null, 2)}\n`,
    );
    await git(root, ["add", "scripts/baselines/trust-boundary-violations.json"]);
    await git(root, ["commit", "-m", "shrink reviewed debt"]);
    const currentOriginMain = await git(root, ["rev-parse", "HEAD"]);
    await git(root, ["update-ref", "refs/remotes/origin/main", currentOriginMain]);
    await git(root, ["checkout", "stale"]);
    expect(await git(root, ["rev-parse", "HEAD"])).toBe(initialCommit);
    expect(await git(root, ["merge-base", "HEAD", "origin/main"])).toBe(initialCommit);

    const loaded = module.readTrustBoundaryReferenceBaseline({
      root,
      reference: "origin/main",
      baselineRelativePath: "scripts/baselines/trust-boundary-violations.json",
      allowedMissingAtCommit: initialCommit,
    });
    expect(loaded.referenceCommit).toBe(currentOriginMain);
    const reactivationErrors = module.validateTrustBoundaryBaseline({
      baseline: fullBaseline,
      baseBaseline: loaded.baseline,
      violations,
      expectedOriginDigest: fullBaseline.origin.violation_ids_sha256,
    });
    expect(reactivationErrors.join("\n")).toContain(
      "baseline reactivation or growth is forbidden relative to the current base reference",
    );
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
    expect(
      violations.some((entry) =>
        /:ast:FunctionDeclaration:dispatch:1:CallExpression:[a-f0-9]{12}:1$/u.test(entry.locator),
      ),
    ).toBe(true);
    expect(
      violations.some((entry) =>
        /:ast:FunctionDeclaration:dispatch:1:CallExpression:[a-f0-9]{12}:2$/u.test(entry.locator),
      ),
    ).toBe(true);
  });

  it("keeps IDs stable across line shifts and changes them across class relocation", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    const relativePath = "packages/agentplane/src/harness/relocated-shell.ts";
    await writeFixture(root, relativePath, shellClassSource("Alpha", ""));
    const alpha = module
      .collectTrustBoundaryViolations(root)
      .find((entry) => entry.rule_id === "trust.no-rendered-command-orchestration")!;
    await writeFixture(root, relativePath, shellClassSource("Alpha", "\n\n"));
    const shifted = module
      .collectTrustBoundaryViolations(root)
      .find((entry) => entry.rule_id === "trust.no-rendered-command-orchestration")!;
    expect(shifted.line).not.toBe(alpha.line);
    expect(shifted.violation_id).toBe(alpha.violation_id);
    expect(shifted.locator).toContain("ClassDeclaration:Alpha:1/MethodDeclaration:dispatch:1");

    await writeFixture(root, relativePath, shellClassSource("Beta", "\n\n"));
    const beta = module
      .collectTrustBoundaryViolations(root)
      .find((entry) => entry.rule_id === "trust.no-rendered-command-orchestration")!;
    expect(beta.violation_id).not.toBe(alpha.violation_id);
    expect(beta.locator).toContain("ClassDeclaration:Beta:1/MethodDeclaration:dispatch:1");
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
