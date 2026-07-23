import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { afterEach, expect, it } from "vitest";

import { describeCritical } from "@agentplane/testkit";

const REPO_ROOT = process.cwd();
const LIBRARY_URL = pathToFileURL(
  path.join(REPO_ROOT, "scripts/lib/trust-boundary-ratchet.mjs"),
).href;
const tempRoots: string[] = [];

type Violation = {
  violation_id: string;
  rule_id: string;
  locator: string;
};

type RatchetLibrary = {
  collectTrustBoundaryViolations: (root: string) => Violation[];
};

async function library(): Promise<RatchetLibrary> {
  return (await import(LIBRARY_URL)) as RatchetLibrary;
}

async function makeFixtureRoot(): Promise<string> {
  const cacheRoot = path.join(REPO_ROOT, ".agentplane", "cache");
  await mkdir(cacheRoot, { recursive: true });
  const root = await mkdtemp(path.join(cacheRoot, "trust-ratchet-regression-"));
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

async function writeInvocationTypes(root: string): Promise<void> {
  await writeFixture(
    root,
    "packages/agentplane/src/runner/types/invocation.ts",
    [
      `export type RunnerExecutionMetrics = { duration_ms?: number; custom?: string };`,
      `export type RunnerResultEvidence = { tests_run?: string[]; note?: string };`,
      `export type RunnerResultArtifact = { path: string };`,
      `export type RunnerResultManifest = {`,
      `  schema_version: 1;`,
      `  status?: "success" | "failed";`,
      `  exit_code?: number | null;`,
      `  metrics?: RunnerExecutionMetrics;`,
      `  evidence?: RunnerResultEvidence;`,
      `  artifacts?: RunnerResultArtifact[];`,
      `  summary?: string;`,
      `};`,
      `export type RunnerResult = {`,
      `  status: "success" | "failed";`,
      `  exit_code: number | null;`,
      `  metrics?: RunnerExecutionMetrics;`,
      `  evidence?: RunnerResultEvidence;`,
      `  artifacts?: RunnerResultArtifact[];`,
      `  summary?: string;`,
      `};`,
      ``,
    ].join("\n"),
  );
}

function byRule(violations: Violation[], ruleId: string): Violation[] {
  return violations.filter((entry) => entry.rule_id === ruleId);
}

function pairedShellSource(padding: string): string {
  return [
    `import { spawn as launch } from "node:child_process";`,
    padding,
    `export function paired(flag: boolean, command: string): void {`,
    `  if (flag) {`,
    `    const execute = () => launch("sh", ["-lc", command]);`,
    `    execute();`,
    `  } else {`,
    `    const execute = () => launch("sh", ["-lc", command]);`,
    `    execute();`,
    `  }`,
    `}`,
    ``,
  ].join("\n");
}

function soleShellSource(branch: "then" | "else"): string {
  return [
    `import { spawn as launch } from "node:child_process";`,
    `export function sole(flag: boolean, command: string): void {`,
    `  if (flag) {`,
    branch === "then" ? `    launch("sh", ["-lc", command]);` : `    return;`,
    `  } else {`,
    branch === "else" ? `    launch("sh", ["-lc", command]);` : `    return;`,
    `  }`,
    `}`,
    ``,
  ].join("\n");
}

function stableSiblingShellSource(withSafeSibling: boolean): string {
  return [
    `import { spawn as launch } from "node:child_process";`,
    `export function stable(flag: boolean, command: string): void {`,
    ...(withSafeSibling ? [`  if (flag) {`, `    void command.trim();`, `  }`] : []),
    `  if (flag) {`,
    `    launch("sh", ["-lc", command]);`,
    `  }`,
    `}`,
    ``,
  ].join("\n");
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describeCritical("critical: trust-boundary ratchet correctness regressions", () => {
  it("constant-folds semantic pass verdicts without raw source-text matching", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeFixture(
      root,
      "packages/agentplane/src/commands/route-semantic-constants.ts",
      [
        `const PASS = "pass";`,
        `export const joined = ["agentplane evaluator run X --verdict", PASS].join(" ");`,
        `export const templated = \`agentplane evaluator run X --verdict \${PASS}\`;`,
        `export const concatenated = "agentplane evaluator run X --verdict " + PASS;`,
        `export const packet = { verdict: PASS };`,
        `export const safe = { verdict: "human_review" };`,
        ``,
      ].join("\n"),
    );

    const verdicts = byRule(
      module.collectTrustBoundaryViolations(root),
      "trust.no-automatic-semantic-verdict",
    );
    expect(verdicts.some((entry) => entry.locator.startsWith("literal:joined:"))).toBe(true);
    expect(verdicts.some((entry) => entry.locator.startsWith("literal:templated:"))).toBe(true);
    expect(verdicts.some((entry) => entry.locator.startsWith("literal:concatenated:"))).toBe(true);
    expect(
      verdicts.some((entry) => entry.locator.startsWith("property:packet:verdict-pass:")),
    ).toBe(true);
    expect(verdicts.some((entry) => entry.locator.includes("safe"))).toBe(false);
  });

  it("tracks aliased and contextual observed-field flows without flagging safe controls", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeInvocationTypes(root);
    await writeFixture(
      root,
      "packages/agentplane/src/runner/observed-regressions.ts",
      [
        `import type { RunnerResult, RunnerResultManifest } from "./types/invocation.js";`,
        `import type * as Invocation from "./types/invocation.js";`,
        `type Raw = Record<string, unknown>;`,
        `const STATUS = "status";`,
        `const COMPUTED_STATUS = STATUS;`,
        `const parsePayload = JSON.parse;`,
        `export function directDestructured(`,
        `  { exit_code }: Record<string, unknown>,`,
        `): RunnerResultManifest {`,
        `  return { schema_version: 1, exit_code } as RunnerResultManifest;`,
        `}`,
        `export function namedRaw({ status }: Raw): RunnerResultManifest {`,
        `  return { schema_version: 1, status } as RunnerResultManifest;`,
        `}`,
        `export function parsed(text: string): RunnerResultManifest {`,
        `  const raw = parsePayload(text) as Raw;`,
        `  return { schema_version: 1, status: raw.status } as RunnerResultManifest;`,
        `}`,
        `export function computedKey(raw: Raw): RunnerResultManifest {`,
        `  return { schema_version: 1, [COMPUTED_STATUS]: raw[COMPUTED_STATUS] } as RunnerResultManifest;`,
        `}`,
        `export function nested(raw: Raw): RunnerResultManifest {`,
        `  return {`,
        `    schema_version: 1,`,
        `    metrics: { duration_ms: raw.duration_ms },`,
        `    evidence: { tests_run: raw.tests_run },`,
        `    artifacts: [{ path: String(raw.path) }],`,
        `  } as RunnerResultManifest;`,
        `}`,
        `export function assigned(base: RunnerResult, claims: RunnerResultManifest): RunnerResult {`,
        `  return Object.assign({}, base, claims);`,
        `}`,
        `export function mutateAssigned(`,
        `  output: RunnerResult,`,
        `  claims: RunnerResultManifest,`,
        `): RunnerResult {`,
        `  Object.assign(output, claims);`,
        `  return output;`,
        `}`,
        `export function nestedMutation(output: RunnerResult, raw: Raw): RunnerResult {`,
        `  output.metrics!.duration_ms = raw.duration_ms as number;`,
        `  return output;`,
        `}`,
        `export function safeAssigned(`,
        `  base: RunnerResult,`,
        `  claims: RunnerResultManifest,`,
        `): RunnerResult {`,
        `  return Object.assign({}, base, { summary: claims.summary });`,
        `}`,
        `type Merge = (base: RunnerResult, claims: RunnerResultManifest) => RunnerResult;`,
        `export const contextual: Merge = (base, claims) => {`,
        `  const merged = { ...base, ...claims };`,
        `  return merged;`,
        `};`,
        `export function namespaced(`,
        `  base: Invocation.RunnerResult,`,
        `  claims: Invocation.RunnerResultManifest,`,
        `): Invocation.RunnerResult {`,
        `  return { ...base, ...claims };`,
        `}`,
        `export function safeParser(raw: Raw): RunnerResultManifest {`,
        `  return { schema_version: 1, summary: String(raw.summary ?? "") };`,
        `}`,
        `export function safeMerge(`,
        `  base: RunnerResult,`,
        `  claims: RunnerResultManifest,`,
        `): RunnerResult {`,
        `  return { ...base, status: "failed", summary: String(claims.summary ?? "") };`,
        `}`,
        ``,
      ].join("\n"),
    );

    const observed = byRule(
      module.collectTrustBoundaryViolations(root),
      "trust.no-agent-writable-observed-fields",
    );
    for (const prefix of [
      "parser:directDestructured.exit_code:",
      "parser:namedRaw.status:",
      "parser:parsed.status:",
      "parser:computedKey.status:",
      "parser:nested.metrics.duration_ms:",
      "parser:nested.evidence.tests_run:",
      "parser:nested.artifacts:",
      "override:assigned.assign:",
      "override:mutateAssigned.assign:",
      "parser:nestedMutation.metrics.duration_ms:",
      "override:contextual.spread:",
      "override:namespaced.spread:",
    ]) {
      expect(
        observed.some((entry) => entry.locator.startsWith(prefix)),
        prefix,
      ).toBe(true);
    }
    expect(
      observed.some((entry) => /(?:safeAssigned|safeParser|safeMerge)/u.test(entry.locator)),
    ).toBe(false);
  });

  it("evaluates computed danger values and recognizes dominating typed authority", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeFixture(
      root,
      "packages/agentplane/src/runner/adapters/sandbox-regressions.ts",
      [
        `type Authority = { sandbox: { danger_full_access_authorized: boolean } };`,
        `type FeatureFlags = { sandbox: { danger_full_access_authorized: boolean } };`,
        `type Choice = { sandbox: "danger-full-access" | "workspace-write" };`,
        `type PermissionChoice = {`,
        `  sandbox_permissions: "danger-full-access" | "workspace-write";`,
        `};`,
        `export const computed = () => ["danger", "full", "access"].join("-");`,
        `export const safeObject = (authority: Authority): Choice =>`,
        `  authority.sandbox.danger_full_access_authorized`,
        `    ? { sandbox: "danger-full-access" }`,
        `    : { sandbox: "workspace-write" };`,
        `export function guarded(authority: Authority, value?: string): string {`,
        `  if (!value) return "workspace-write";`,
        `  if (!authority.sandbox.danger_full_access_authorized) return "workspace-write";`,
        `  if (value.trim().length === 0) return "workspace-write";`,
        `  return "danger-full-access";`,
        `}`,
        `export const destructured = (`,
        `  { sandbox: { danger_full_access_authorized: authorized } }: Authority,`,
        `  enabled: boolean,`,
        `): string => authorized && enabled ? "danger-full-access" : "workspace-write";`,
        `export const typedLookalike = (`,
        `  { sandbox: { danger_full_access_authorized: authorized } }: FeatureFlags,`,
        `  enabled: boolean,`,
        `): string => authorized && enabled ? "danger-full-access" : "workspace-write";`,
        `export const lookalike = (`,
        `  { danger_full_access_authorized: authorized }: Record<string, unknown>,`,
        `  enabled: boolean,`,
        `): string => authorized && enabled ? "danger-full-access" : "workspace-write";`,
        `export function localDestructured(`,
        `  authority: Authority,`,
        `  enabled: boolean,`,
        `): PermissionChoice {`,
        `  const { sandbox: { danger_full_access_authorized: authorized } } = authority;`,
        `  return authorized && enabled`,
        `    ? { sandbox_permissions: "danger-full-access" }`,
        `    : { sandbox_permissions: "workspace-write" };`,
        `}`,
        `export function localLookalike(`,
        `  flags: FeatureFlags,`,
        `  enabled: boolean,`,
        `): PermissionChoice {`,
        `  const { sandbox: { danger_full_access_authorized: authorized } } = flags;`,
        `  return authorized && enabled`,
        `    ? { sandbox_permissions: "danger-full-access" }`,
        `    : { sandbox_permissions: "workspace-write" };`,
        `}`,
        `export function localUntyped(flags: any, enabled: boolean): PermissionChoice {`,
        `  const { sandbox: { danger_full_access_authorized: authorized } } = flags;`,
        `  return authorized && enabled`,
        `    ? { sandbox_permissions: "danger-full-access" }`,
        `    : { sandbox_permissions: "workspace-write" };`,
        `}`,
        ``,
      ].join("\n"),
    );

    const sandbox = byRule(
      module.collectTrustBoundaryViolations(root),
      "trust.no-implicit-danger-sandbox",
    );
    expect(sandbox.some((entry) => entry.locator.startsWith("fallback:computed:"))).toBe(true);
    expect(
      sandbox.some((entry) =>
        /(?:safeObject|guarded|destructured|localDestructured)/u.test(entry.locator),
      ),
    ).toBe(false);
    expect(sandbox.some((entry) => entry.locator.startsWith("fallback:lookalike:"))).toBe(true);
    expect(sandbox.some((entry) => entry.locator.startsWith("fallback:typedLookalike:"))).toBe(
      true,
    );
    expect(sandbox.some((entry) => entry.locator.startsWith("fallback:localLookalike:"))).toBe(
      true,
    );
    expect(sandbox.some((entry) => entry.locator.startsWith("fallback:localUntyped:"))).toBe(true);
  });

  it("makes branch structure part of stable IDs and resolves shell import aliases", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    const relativePath = "packages/agentplane/src/harness/branch-shell.ts";
    await writeFixture(root, relativePath, pairedShellSource(""));
    const initial = byRule(
      module.collectTrustBoundaryViolations(root),
      "trust.no-rendered-command-orchestration",
    );
    expect(initial).toHaveLength(2);
    expect(new Set(initial.map((entry) => entry.violation_id)).size).toBe(2);

    await writeFixture(root, relativePath, pairedShellSource("\n\n"));
    const shifted = byRule(
      module.collectTrustBoundaryViolations(root),
      "trust.no-rendered-command-orchestration",
    );
    expect(shifted.map((entry) => entry.violation_id).toSorted()).toEqual(
      initial.map((entry) => entry.violation_id).toSorted(),
    );

    await writeFixture(root, relativePath, soleShellSource("then"));
    const thenId = byRule(
      module.collectTrustBoundaryViolations(root),
      "trust.no-rendered-command-orchestration",
    )[0]!.violation_id;
    await writeFixture(root, relativePath, soleShellSource("else"));
    const elseId = byRule(
      module.collectTrustBoundaryViolations(root),
      "trust.no-rendered-command-orchestration",
    )[0]!.violation_id;
    expect(elseId).not.toBe(thenId);

    await writeFixture(root, relativePath, stableSiblingShellSource(false));
    const withoutSibling = byRule(
      module.collectTrustBoundaryViolations(root),
      "trust.no-rendered-command-orchestration",
    )[0]!.violation_id;
    await writeFixture(root, relativePath, stableSiblingShellSource(true));
    const withSibling = byRule(
      module.collectTrustBoundaryViolations(root),
      "trust.no-rendered-command-orchestration",
    )[0]!.violation_id;
    expect(withSibling).toBe(withoutSibling);
  });

  it("does not treat unrelated runner telemetry as a task-context projection", async () => {
    const module = await library();
    const root = await makeFixtureRoot();
    await writeFixture(
      root,
      "packages/agentplane/src/runner/types/context.ts",
      [
        `type TaskData = { title: string };`,
        `export type RunnerTaskContext = {`,
        `  task_id: string;`,
        `  data: TaskData;`,
        `  doc: string;`,
        `  events: unknown[];`,
        `};`,
        ``,
      ].join("\n"),
    );
    await writeFixture(
      root,
      "packages/agentplane/src/runner/telemetry.ts",
      [
        `import type { RunnerTaskContext } from "./types/context.js";`,
        `type TaskData = { title: string };`,
        `export function telemetry(data: unknown, events: unknown[]) {`,
        `  return { task_id: "telemetry", data, events, doc: "diagnostic payload" };`,
        `}`,
        `export function task(data: TaskData): RunnerTaskContext {`,
        `  return { task_id: "T", data, events: [], doc: "task" };`,
        `}`,
        `export const asserted = (data: TaskData) =>`,
        `  ({ task_id: "A", data, events: [], doc: "asserted" } as RunnerTaskContext);`,
        `export const satisfied = (data: TaskData) =>`,
        `  ({ task_id: "S", data, events: [], doc: "satisfied" } satisfies RunnerTaskContext);`,
        `export const contextual: (data: TaskData) => RunnerTaskContext = (data) => ({`,
        `  task_id: "C",`,
        `  data,`,
        `  events: [],`,
        `  doc: "contextual",`,
        `});`,
        ``,
      ].join("\n"),
    );

    const duplicate = byRule(
      module.collectTrustBoundaryViolations(root),
      "trust.no-duplicate-runner-task-representation",
    );
    expect(duplicate.some((entry) => entry.locator.startsWith("builder:telemetry."))).toBe(false);
    expect(duplicate.some((entry) => entry.locator.startsWith("builder:task.data+doc:"))).toBe(
      true,
    );
    expect(duplicate.some((entry) => entry.locator.startsWith("builder:task.data+events:"))).toBe(
      true,
    );
    for (const builder of ["asserted", "satisfied", "contextual"]) {
      expect(
        duplicate.some((entry) => entry.locator.startsWith(`builder:${builder}.data+doc:`)),
        builder,
      ).toBe(true);
      expect(
        duplicate.some((entry) => entry.locator.startsWith(`builder:${builder}.data+events:`)),
        builder,
      ).toBe(true);
    }
  });
});
