import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const COVERAGE_DIMENSIONS = [
  "workflow_modes",
  "supervisor_frontends",
  "lifecycle_states",
  "context_conditions",
  "semantic_stops",
  "recovery_states",
  "hosted_boundaries",
];

const TIERS = new Set(["core", "full", "provider"]);
const RELEASE_DISPOSITIONS = new Set(["block", "advisory"]);
const TASK_ID_PATTERN = /^\d{12}-[A-Z0-9]{6}$/u;

function assertNonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${label} must be a non-empty string`);
  }
}

function assertStringArray(value, label, options = {}) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new TypeError(`${label} must be a non-empty string array`);
  }
  for (const [index, item] of value.entries()) {
    assertNonEmptyString(item, `${label}[${index}]`);
  }
  if (options.unique !== false && new Set(value).size !== value.length) {
    throw new Error(`${label} must not contain duplicates`);
  }
}

function assertFailureContract(failure, label, options = {}) {
  if (!failure || typeof failure !== "object" || Array.isArray(failure)) {
    throw new TypeError(`${label} must be an object`);
  }
  for (const field of ["classification", "impact", "proposed_fix", "owner_task"]) {
    assertNonEmptyString(failure[field], `${label}.${field}`);
  }
  if (!TASK_ID_PATTERN.test(failure.owner_task)) {
    throw new Error(`${label}.owner_task must be an executable AgentPlane task id`);
  }
  if (
    options.repoRoot &&
    !existsSync(
      path.join(options.repoRoot, ".agentplane", "tasks", failure.owner_task, "README.md"),
    )
  ) {
    throw new Error(`${label}.owner_task does not exist: ${failure.owner_task}`);
  }
  if (!RELEASE_DISPOSITIONS.has(failure.release_disposition)) {
    throw new Error(`${label}.release_disposition must be block or advisory`);
  }
}

export function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map((item) => stableJson(item)).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .toSorted()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

export function assertQualificationSubjectIdentity({ subject, head, tree, statusPorcelain }) {
  if (!/^[a-f0-9]{40}$/u.test(subject)) {
    throw new Error("qualification subject must be a full 40-character Git commit SHA");
  }
  if (subject !== head) {
    throw new Error(`qualification subject ${subject} does not match repository HEAD ${head}`);
  }
  if (!/^[a-f0-9]{40}$/u.test(tree)) {
    throw new Error("qualification repository tree must be a full 40-character Git tree SHA");
  }
  if (statusPorcelain.trim().length > 0) {
    throw new Error(
      "qualification candidate repository must be clean before packaging or execution",
    );
  }
  return { commit: head, tree, clean: true };
}

export function readQualificationSubjectIdentity(repoRoot, subject) {
  const git = (...args) =>
    execFileSync("git", args, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  return assertQualificationSubjectIdentity({
    subject,
    head: git("rev-parse", "HEAD"),
    tree: git("rev-parse", "HEAD^{tree}"),
    statusPorcelain: git("status", "--porcelain=v1", "--untracked-files=all"),
  });
}

export function readQualificationManifest(filePath) {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(
      `failed to read qualification manifest ${filePath}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  validateQualificationManifest(manifest, {
    repoRoot: path.resolve(path.dirname(filePath), "../.."),
  });
  return manifest;
}

export function validateQualificationManifest(manifest, options = {}) {
  if (!manifest || manifest.schema_version !== 1) {
    throw new Error("qualification manifest must use schema_version=1");
  }
  assertNonEmptyString(manifest.release, "manifest.release");
  assertNonEmptyString(manifest.kind, "manifest.kind");
  if (!manifest.required_coverage || typeof manifest.required_coverage !== "object") {
    throw new TypeError("manifest.required_coverage must be an object");
  }
  for (const dimension of COVERAGE_DIMENSIONS) {
    assertStringArray(manifest.required_coverage[dimension], `required_coverage.${dimension}`);
  }
  if (!Array.isArray(manifest.scenarios) || manifest.scenarios.length === 0) {
    throw new TypeError("manifest.scenarios must be a non-empty array");
  }

  const scenarioIds = new Set();
  const observedCoverage = Object.fromEntries(
    COVERAGE_DIMENSIONS.map((dimension) => [dimension, new Set()]),
  );
  for (const [index, scenario] of manifest.scenarios.entries()) {
    const label = `scenarios[${index}]`;
    assertNonEmptyString(scenario.id, `${label}.id`);
    if (scenarioIds.has(scenario.id)) throw new Error(`duplicate scenario id: ${scenario.id}`);
    scenarioIds.add(scenario.id);
    assertNonEmptyString(scenario.title, `${label}.title`);
    if (!TIERS.has(scenario.tier)) {
      throw new Error(`${label}.tier must be core, full, or provider`);
    }
    assertStringArray(scenario.command, `${label}.command`, { unique: false });
    if (!Number.isSafeInteger(scenario.timeout_ms) || scenario.timeout_ms < 1000) {
      throw new Error(`${label}.timeout_ms must be an integer >= 1000`);
    }
    assertFailureContract(scenario.failure, `${label}.failure`, options);
    if (scenario.depends_on !== undefined) {
      assertStringArray(scenario.depends_on, `${label}.depends_on`);
    }
    if (!scenario.coverage || typeof scenario.coverage !== "object") {
      throw new TypeError(`${label}.coverage must be an object`);
    }
    for (const dimension of COVERAGE_DIMENSIONS) {
      const values = scenario.coverage[dimension] ?? [];
      if (!Array.isArray(values))
        throw new TypeError(`${label}.coverage.${dimension} must be an array`);
      for (const value of values) {
        assertNonEmptyString(value, `${label}.coverage.${dimension}`);
        if (!manifest.required_coverage[dimension].includes(value)) {
          throw new Error(`${scenario.id} declares unknown ${dimension} value: ${value}`);
        }
        observedCoverage[dimension].add(value);
      }
    }
  }

  for (const scenario of manifest.scenarios) {
    for (const dependency of scenario.depends_on ?? []) {
      if (!scenarioIds.has(dependency)) {
        throw new Error(`${scenario.id} depends on unknown scenario: ${dependency}`);
      }
      if (dependency === scenario.id) {
        throw new Error(`${scenario.id} cannot depend on itself`);
      }
    }
  }

  const missing = [];
  for (const dimension of COVERAGE_DIMENSIONS) {
    for (const value of manifest.required_coverage[dimension]) {
      if (!observedCoverage[dimension].has(value)) missing.push(`${dimension}.${value}`);
    }
  }
  if (missing.length > 0) {
    throw new Error(`qualification manifest has uncovered requirements: ${missing.join(", ")}`);
  }
  if (!manifest.scenarios.some((scenario) => scenario.tier === "provider")) {
    throw new Error("qualification manifest must declare at least one provider scenario");
  }
  return manifest;
}

export function selectQualificationScenarios(manifest, options) {
  const profile = options.profile ?? "full";
  if (!new Set(["core", "full"]).has(profile)) {
    throw new Error("qualification profile must be core or full");
  }
  const requested = new Set(options.scenarioIds);
  const unknown = [...requested].filter(
    (id) => !manifest.scenarios.some((scenario) => scenario.id === id),
  );
  if (unknown.length > 0) throw new Error(`unknown qualification scenarios: ${unknown.join(", ")}`);

  const selected = manifest.scenarios.filter((scenario) => {
    if (requested.size > 0) return requested.has(scenario.id);
    if (scenario.tier === "provider") return options.provider === true;
    if (scenario.tier === "full") return profile === "full";
    return true;
  });
  const selectedIds = new Set(selected.map((scenario) => scenario.id));
  const pending = [...selected];
  const ordered = [];
  while (pending.length > 0) {
    const nextIndex = pending.findIndex((scenario) =>
      (scenario.depends_on ?? []).every(
        (dependency) =>
          !selectedIds.has(dependency) || ordered.some((item) => item.id === dependency),
      ),
    );
    if (nextIndex === -1) throw new Error("qualification scenario dependencies contain a cycle");
    ordered.push(pending.splice(nextIndex, 1)[0]);
  }
  return ordered;
}

export function substituteQualificationCommand(command, variables) {
  return command.map((token) =>
    token.replaceAll(/\{([a-zA-Z][a-zA-Z0-9_]*)\}/gu, (match, name) => {
      const value = variables[name];
      if (typeof value !== "string" || value.length === 0) {
        throw new Error(`qualification command requires variable ${name}`);
      }
      return value;
    }),
  );
}

function posixRelative(root, target) {
  return path.relative(root, target).split(path.sep).join("/");
}

export function buildQualificationDefect({ repoRoot, result, scenario }) {
  const command = result.command.map((token) => JSON.stringify(token)).join(" ");
  return {
    id: `QR-${scenario.id}`,
    scenario_id: scenario.id,
    classification: scenario.failure.classification,
    reproduction: command,
    evidence: posixRelative(repoRoot, result.log_path),
    impact: scenario.failure.impact,
    proposed_fix: scenario.failure.proposed_fix,
    owner_task: scenario.failure.owner_task,
    release_disposition: scenario.failure.release_disposition,
    exit_code: result.exit_code,
    signal: result.signal,
    timed_out: result.timed_out,
  };
}

export function buildQualificationReport({
  manifest,
  manifestPath,
  repoRoot,
  mode,
  profile,
  provider,
  subject,
  startedAt,
  finishedAt,
  results,
  sourceIdentity,
}) {
  const defects = results
    .filter((result) => result.status === "failed")
    .map((result) => buildQualificationDefect({ repoRoot, result, scenario: result.scenario }));
  const blockingDefects = defects.filter((defect) => defect.release_disposition === "block");
  const providerResults = results.filter((result) => result.scenario.tier === "provider");
  const selectedIds = new Set(results.map((result) => result.scenario.id));
  const requiredLocalIds = manifest.scenarios
    .filter((scenario) => scenario.tier !== "provider")
    .map((scenario) => scenario.id);
  const requiredProviderIds = manifest.scenarios
    .filter((scenario) => scenario.tier === "provider")
    .map((scenario) => scenario.id);
  const localSelectionComplete = requiredLocalIds.every((id) => selectedIds.has(id));
  const providerSelectionComplete = requiredProviderIds.every((id) => selectedIds.has(id));
  const providerStatus =
    providerResults.length === 0
      ? "not_run"
      : providerResults.every((result) => result.status === "passed")
        ? "passed"
        : "failed";
  const localReady = blockingDefects.length === 0 && localSelectionComplete;
  const releaseReady = localReady && providerSelectionComplete && providerStatus === "passed";

  const report = {
    schema_version: 1,
    kind: "agentplane.release_qualification_report",
    release: manifest.release,
    mode,
    profile,
    subject,
    source_identity: sourceIdentity,
    manifest: {
      path: posixRelative(repoRoot, manifestPath),
      sha256: sha256(`${stableJson(manifest)}\n`),
    },
    started_at: startedAt,
    finished_at: finishedAt,
    duration_ms: Math.max(0, Date.parse(finishedAt) - Date.parse(startedAt)),
    verdict: releaseReady
      ? "ready"
      : localReady
        ? "ready_local_provider_not_run"
        : blockingDefects.length > 0
          ? "blocked"
          : "incomplete",
    release_ready: releaseReady,
    local_ready: localReady,
    provider: {
      requested: provider,
      status: providerStatus,
    },
    coverage: manifest.required_coverage,
    summary: {
      selected: results.length,
      declared: manifest.scenarios.length,
      passed: results.filter((result) => result.status === "passed").length,
      failed: defects.length,
      blocking: blockingDefects.length,
      local_selection_complete: localSelectionComplete,
      provider_selection_complete: providerSelectionComplete,
    },
    scenarios: results.map((result) => ({
      id: result.scenario.id,
      title: result.scenario.title,
      tier: result.scenario.tier,
      status: result.status,
      duration_ms: result.duration_ms,
      exit_code: result.exit_code,
      signal: result.signal,
      timed_out: result.timed_out,
      command: result.command,
      log: posixRelative(repoRoot, result.log_path),
      output_tail: result.output_tail,
    })),
    defects,
  };
  validateQualificationReport(report);
  return report;
}

export function validateQualificationReport(report) {
  if (
    !report ||
    report.schema_version !== 1 ||
    report.kind !== "agentplane.release_qualification_report"
  ) {
    throw new Error("qualification report must use the v1 report contract");
  }
  if (!Array.isArray(report.scenarios) || !Array.isArray(report.defects)) {
    throw new TypeError("qualification report must include scenarios and defects arrays");
  }
  if (
    report.source_identity?.commit !== report.subject ||
    report.source_identity?.clean !== true ||
    !/^[a-f0-9]{40}$/u.test(report.source_identity?.tree ?? "")
  ) {
    throw new Error("qualification report subject is not bound to a clean Git commit and tree");
  }
  for (const defect of report.defects) {
    for (const field of [
      "id",
      "scenario_id",
      "classification",
      "reproduction",
      "evidence",
      "impact",
      "proposed_fix",
      "owner_task",
      "release_disposition",
    ]) {
      assertNonEmptyString(defect[field], `defect.${field}`);
    }
  }
  const expectedBlocking = report.defects.filter(
    (defect) => defect.release_disposition === "block",
  ).length;
  if (report.summary.blocking !== expectedBlocking) {
    throw new Error("qualification report blocking summary differs from its defect ledger");
  }
  if (report.release_ready && report.provider.status !== "passed") {
    throw new Error("release_ready requires passed provider evidence");
  }
  return report;
}

export function renderDefectLedger(report) {
  const lines = [
    `# AgentPlane ${report.release} qualification defect ledger`,
    "",
    `- Verdict: \`${report.verdict}\``,
    `- Subject: \`${report.subject}\``,
    `- Scenarios: ${report.summary.passed}/${report.summary.selected} passed`,
    `- Blocking defects: ${report.summary.blocking}`,
    `- Provider evidence: \`${report.provider.status}\``,
  ];
  if (report.defects.length === 0) {
    lines.push("", "No defects were recorded.");
    return `${lines.join("\n")}\n`;
  }
  for (const defect of report.defects) {
    lines.push(
      "",
      `## ${defect.id}: ${defect.classification}`,
      "",
      `- Scenario: \`${defect.scenario_id}\``,
      `- Disposition: \`${defect.release_disposition}\``,
      `- Owner task: \`${defect.owner_task}\``,
      `- Impact: ${defect.impact}`,
      `- Proposed fix: ${defect.proposed_fix}`,
      `- Reproduction: \`${defect.reproduction.replaceAll("`", "\\`")}\``,
      `- Evidence: \`${defect.evidence}\``,
    );
  }
  return `${lines.join("\n")}\n`;
}

export function qualificationExitCode(report) {
  if (report.mode === "audit") return 0;
  return report.release_ready ? 0 : 1;
}

export const qualificationCoverageDimensions = [...COVERAGE_DIMENSIONS];
