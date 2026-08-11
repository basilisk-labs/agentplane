import { buildLocalCiExecutionPlan } from "./local-ci-selection.mjs";

export const GITHUB_CI_GATE_JOBS = [
  "plan",
  "verify-routed",
  "verify-contract",
  "verify-static",
  "verify-tests",
  "verify-package-node-runtime",
  "verify-docs",
  "verify-security",
  "test-windows",
  "recovery-validate",
  "release-ready",
];

const TASK_ARTIFACT_PATTERNS = [/^\.agentplane\/tasks\//u];
const DOCS_PATTERNS = [
  /^docs\//u,
  /^website\//u,
  /^packages\/[^/]+\/(?:README(?:\.[^.]+)?\.md|docs\/)/u,
  /^README(?:\.[^.]+)?\.md$/u,
  /^DESIGN\.md$/u,
  /^package\.json$/u,
  /^bun\.lock$/u,
  /^scripts\/(?:generate\/generate-(?:website-docs|llms-full)|checks\/check-(?:design-language|docs-ia))\.mjs$/u,
];
const DEPENDENCY_PATTERNS = [
  /^(?:package|bun)\.lock$/u,
  /^package\.json$/u,
  /^packages\/[^/]+\/package\.json$/u,
  /^website\/(?:package\.json|bun\.lock)$/u,
  /^\.github\/(?:dependabot\.yml|workflows\/)/u,
];
const WORKFLOW_PATTERNS = [
  /^\.github\/(?:workflows\/|actionlint\.yaml$|codeql\/)/u,
  /^scripts\/(?:workflow\/run-workflows-lint|checks\/(?:check-workflow-command-contract|check-critical-test-route|plan-github-ci|evaluate-github-ci))\.mjs$/u,
  /^scripts\/lib\/github-ci-capabilities\.mjs$/u,
];
const CODEQL_ACTION_PATTERNS = [/^\.github\/(?:workflows|actions)\//u];
const ROUTING_SENSITIVE_PATTERNS = [
  ...WORKFLOW_PATTERNS,
  /^\.github\/path-filters\.yml$/u,
  /^scripts\/lib\/(?:local-ci-selection|test-route-registry)\.mjs$/u,
  /^packages\/agentplane\/src\/cli\/local-ci-selection\.test\.ts$/u,
  /^packages\/agentplane\/src\/commands\/release\/(?:ci-workflow-contract|github-ci-(?:plan|aggregate)|workflow-node-version-contract)\.test\.ts$/u,
];
const JAVASCRIPT_SOURCE_PATTERNS = [
  /\.(?:[cm]?js|tsx?)$/u,
  /^packages\//u,
  /^scripts\//u,
  /^website\//u,
];
const CORE_RUNTIME_PATTERNS = [/^packages\/core\//u, /^packages\/core\/package\.json$/u];
const RECIPES_RUNTIME_PATTERNS = [
  /^packages\/recipes\//u,
  /^packages\/recipes\/package\.json$/u,
  /^agentplane-recipes$/u,
];
const SHARED_RUNTIME_PATTERNS = [/^package\.json$/u, /^bun\.lock$/u];
const WINDOWS_PATTERNS = [
  ...SHARED_RUNTIME_PATTERNS,
  /^packages\/core\//u,
  /^packages\/agentplane\/bin\//u,
  /^packages\/agentplane\/src\/(?:cli|commands\/(?:hooks|shared|work)|runner|runtime)\//u,
  /^scripts\/(?:checks|workflow)\//u,
];
const CORE_INCLUDE_PATTERNS = [
  /^packages\//u,
  /^schemas\//u,
  /^scripts\//u,
  /^\.agentplane\//u,
  /^package\.json$/u,
  /^bun\.lock$/u,
  /^tsconfig[^/]*\.json$/u,
  /^eslint\.config\.cjs$/u,
  /^vitest\.config\.ts$/u,
  /^\.github\/(?:workflows\/|path-filters\.yml$|actionlint\.yaml$|codeql\/)/u,
];
const CORE_EXCLUDE_PATTERNS = [
  /^scripts\/generate\/generate-(?:website-docs|llms-full)\.mjs$/u,
  /^scripts\/checks\/check-(?:design-language|docs-ia)\.mjs$/u,
  ...TASK_ARTIFACT_PATTERNS,
];
const KNOWN_PATH_PATTERNS = [
  ...TASK_ARTIFACT_PATTERNS,
  ...DOCS_PATTERNS,
  ...DEPENDENCY_PATTERNS,
  ...WORKFLOW_PATTERNS,
  /^\.agentplane\//u,
  /^\.github\//u,
  /^agentplane-recipes$/u,
  /^packages\//u,
  /^schemas\//u,
  /^scripts\//u,
  /^tsconfig[^/]*\.json$/u,
  /^eslint\.config\.cjs$/u,
  /^vitest\.config\.ts$/u,
  /^lefthook\.yml$/u,
  /^LICENSE$/u,
];

function anyMatch(files, patterns) {
  return files.some((filePath) => patterns.some((pattern) => pattern.test(filePath)));
}

function allMatch(files, patterns) {
  return files.every((filePath) => patterns.some((pattern) => pattern.test(filePath)));
}

function isCoreRelevant(files) {
  if (files.length === 0) return true;
  return files.some(
    (filePath) =>
      !CORE_EXCLUDE_PATTERNS.some((pattern) => pattern.test(filePath)) &&
      CORE_INCLUDE_PATTERNS.some((pattern) => pattern.test(filePath)),
  );
}

function isReleaseRef(headRef) {
  return /^release\//u.test(headRef) || /\/release-/u.test(headRef);
}

function asUniqueSorted(files) {
  return [...new Set(files.map((value) => value.trim()).filter(Boolean))].toSorted((a, b) =>
    a.localeCompare(b),
  );
}

function expectedGateJobs({ capabilities, exactShaRecovery, releaseReady, route }) {
  const jobs = ["plan"];
  if (exactShaRecovery) {
    jobs.push("recovery-validate", "release-ready");
    return jobs;
  }

  if (capabilities.core) {
    if (route === "full-fast") {
      jobs.push("verify-contract", "verify-static", "verify-tests");
    } else {
      jobs.push("verify-routed");
    }
  }
  if (capabilities.package_runtime_core || capabilities.package_runtime_recipes) {
    jobs.push("verify-package-node-runtime");
  }
  if (capabilities.docs && route !== "full-fast") jobs.push("verify-docs");
  if (
    capabilities.dependency_review ||
    capabilities.codeql_javascript ||
    capabilities.codeql_actions
  ) {
    jobs.push("verify-security");
  }
  if (capabilities.windows) jobs.push("test-windows");
  if (releaseReady) jobs.push("release-ready");
  return jobs;
}

export function buildGithubCiCapabilityPlan({
  changedFiles,
  eventName = "pull_request",
  headRef = "",
  exactShaRecovery = false,
}) {
  const files = asUniqueSorted(changedFiles);
  const effectiveFiles = files.filter(
    (filePath) => !TASK_ARTIFACT_PATTERNS.some((pattern) => pattern.test(filePath)),
  );
  const onlyTaskArtifacts = files.length > 0 && effectiveFiles.length === 0;
  const missingScope = files.length === 0 && !exactShaRecovery;
  const unknown = effectiveFiles.length > 0 && !allMatch(effectiveFiles, KNOWN_PATH_PATTERNS);
  const routingSensitive = anyMatch(effectiveFiles, ROUTING_SENSITIVE_PATTERNS);
  const releaseRef = isReleaseRef(headRef);
  const releaseReady = exactShaRecovery || releaseRef;
  const localPlan = buildLocalCiExecutionPlan({ mode: "fast", changedFiles: files });
  const forceFull = exactShaRecovery || releaseRef || routingSensitive || unknown || missingScope;
  const route = exactShaRecovery ? "recovery" : forceFull ? "full-fast" : localPlan.route;
  const failClosedFull = releaseRef || routingSensitive || unknown || missingScope;
  const core = onlyTaskArtifacts ? false : failClosedFull || isCoreRelevant(files);

  const capabilities = {
    core,
    docs: failClosedFull || anyMatch(effectiveFiles, DOCS_PATTERNS),
    dependency_review:
      eventName === "pull_request" &&
      (failClosedFull || anyMatch(effectiveFiles, DEPENDENCY_PATTERNS)),
    workflow_lint: failClosedFull || anyMatch(effectiveFiles, WORKFLOW_PATTERNS),
    windows: !onlyTaskArtifacts && (failClosedFull || anyMatch(effectiveFiles, WINDOWS_PATTERNS)),
    coverage: !onlyTaskArtifacts && (failClosedFull || route === "full-fast"),
    cli_critical: !onlyTaskArtifacts && (failClosedFull || route === "full-fast"),
    package_runtime_core:
      !onlyTaskArtifacts &&
      (failClosedFull ||
        anyMatch(effectiveFiles, CORE_RUNTIME_PATTERNS) ||
        anyMatch(effectiveFiles, SHARED_RUNTIME_PATTERNS)),
    package_runtime_recipes:
      !onlyTaskArtifacts &&
      (failClosedFull ||
        anyMatch(effectiveFiles, RECIPES_RUNTIME_PATTERNS) ||
        anyMatch(effectiveFiles, SHARED_RUNTIME_PATTERNS)),
    codeql_javascript:
      !onlyTaskArtifacts &&
      (failClosedFull ||
        effectiveFiles.some(
          (filePath) =>
            JAVASCRIPT_SOURCE_PATTERNS.some((pattern) => pattern.test(filePath)) &&
            /\.(?:[cm]?js|tsx?)$/u.test(filePath),
        )),
    codeql_actions:
      !onlyTaskArtifacts && (failClosedFull || anyMatch(effectiveFiles, CODEQL_ACTION_PATTERNS)),
  };

  if (exactShaRecovery) {
    for (const key of Object.keys(capabilities)) capabilities[key] = false;
  }

  const codeqlLanguages = [
    ...(capabilities.codeql_javascript ? ["javascript-typescript"] : []),
    ...(capabilities.codeql_actions ? ["actions"] : []),
  ];
  const expectedJobs = expectedGateJobs({
    capabilities,
    exactShaRecovery,
    releaseReady,
    route,
  });

  return {
    schema_version: 1,
    route,
    route_reason: exactShaRecovery
      ? "exact_sha_recovery"
      : releaseRef
        ? "release_ref_full"
        : routingSensitive
          ? "routing_change_full"
          : unknown
            ? "unknown_path_full"
            : missingScope
              ? "missing_change_scope_full"
              : localPlan.selector.reason,
    selector_kind: localPlan.selector.kind,
    bucket: localPlan.selector.bucket ?? "",
    buckets: localPlan.selector.buckets ?? [],
    changed_files: files,
    changed_files_count: files.length,
    exact_sha_recovery: exactShaRecovery,
    release_ready: releaseReady,
    unknown_paths: unknown,
    capabilities,
    codeql_languages: codeqlLanguages,
    expected_jobs: expectedJobs,
    executing_jobs_count: expectedJobs.length + 1,
    local_execution_plan: localPlan,
  };
}

export function evaluateGithubCiAggregate({ plan, jobResults }) {
  const expected = new Set(plan.expected_jobs);
  const findings = [];

  for (const job of GITHUB_CI_GATE_JOBS) {
    const result = jobResults[job] ?? "missing";
    if (expected.has(job)) {
      if (result !== "success") findings.push(`${job}: expected success, observed ${result}`);
      continue;
    }
    if (result !== "skipped") findings.push(`${job}: expected skipped, observed ${result}`);
  }

  return {
    ok: findings.length === 0,
    findings,
    expected_jobs: [...expected],
  };
}
