import { LOCAL_CI_TARGET_TEST_FILES } from "./test-route-registry.mjs";

const {
  backend: BACKEND_TEST_FILES,
  "cli-core": CLI_CORE_TEST_FILES,
  "cli-help": CLI_HELP_TEST_FILES,
  "cli-runtime": CLI_RUNTIME_TEST_FILES,
  doctor: DOCTOR_TEST_FILES,
  guard: GUARD_TEST_FILES,
  hooks: HOOKS_TEST_FILES,
  pr: PR_TEST_FILES,
  release: RELEASE_TEST_FILES,
  task: TASK_TEST_FILES,
  upgrade: UPGRADE_TEST_FILES,
  workflow: WORKFLOW_TEST_FILES,
} = LOCAL_CI_TARGET_TEST_FILES;

const DOCS_ONLY_PATTERNS = [
  /^docs\//,
  /^website\//,
  /^\.agentplane\/tasks\//,
  /^\.agentplane\/policy\//,
  /^AGENTS\.md$/,
  /^README(?:\.[^.]+)?\.md$/,
  /^DESIGN\.md$/,
];

const NEUTRAL_TASK_ARTIFACT_PATTERNS = [/^\.agentplane\/tasks\//];

const TASK_BUCKET_PATTERNS = [/^packages\/agentplane\/src\/commands\/task\//];

const DOCTOR_BUCKET_PATTERNS = [/^packages\/agentplane\/src\/commands\/doctor(?:\/|\.|$)/];

const BACKEND_BUCKET_PATTERNS = [
  /^packages\/agentplane\/src\/backends\/task-backend\//,
  /^packages\/agentplane\/src\/backends\/task-backend(?:\..+)?\.test\.ts$/,
  /^packages\/agentplane\/src\/backends\/task-index\.ts$/,
  /^packages\/agentplane\/src\/commands\/backend(?:\/|\.|$)/,
  /^packages\/agentplane\/src\/commands\/shared\/task-backend(?:\.test)?\.ts$/,
  /^packages\/agentplane\/src\/commands\/task\/(?:export|migrate-doc)(?:\.test|\.unit\.test)?\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.backend-sync\.test\.ts$/,
];

const HOOKS_BUCKET_PATTERNS = [
  /^scripts\/run-pre-push-hook\.mjs$/,
  /^scripts\/run-pre-commit-hook\.mjs$/,
  /^scripts\/run-pre-commit-test-fast\.mjs$/,
  /^scripts\/run-commit-msg-hook\.mjs$/,
  /^scripts\/run-local-ci\.mjs$/,
  /^scripts\/lib\/local-ci-selection\.mjs$/,
  /^scripts\/lib\/pre-commit-staged-files\.mjs$/,
  /^scripts\/lib\/pre-push-scope\.mjs$/,
  /^lefthook\.yml$/,
  /^packages\/agentplane\/src\/cli\/local-ci-selection\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.hooks(?:\..+)?\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/pre-commit-staged-files\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/pre-commit-test-fast-script\.test\.ts$/,
];

const WORKFLOW_BUCKET_PATTERNS = [
  /^\.github\/workflows\//,
  /^\.github\/actionlint\.yaml$/,
  /^scripts\/check-critical-test-route\.mjs$/,
  /^scripts\/run-workflows-lint\.mjs$/,
  /^scripts\/check-workflow-command-contract\.mjs$/,
];

const CLI_HELP_BUCKET_PATTERNS = [
  /^packages\/agentplane\/src\/cli\/bootstrap-guide\.ts$/,
  /^packages\/agentplane\/src\/cli\/command-guide(?:\.test)?\.ts$/,
  /^packages\/agentplane\/src\/cli\/command-snippets\.ts$/,
  /^packages\/agentplane\/src\/cli\/output(?:\.test)?\.ts$/,
  /^packages\/agentplane\/src\/cli\/error-map(?:\.test)?\.ts$/,
  /^packages\/agentplane\/src\/cli\/prompts(?:\.test)?\.ts$/,
  /^packages\/agentplane\/src\/cli\/cli-contract\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/help\.all-commands\.contract\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.help-(?:contract|snap)\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.docs-cli\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/spec\//,
  /^packages\/agentplane\/src\/shared\/ansi(?:\.test)?\.ts$/,
];
const CLI_CORE_BUCKET_PATTERNS = [
  /^packages\/agentplane\/src\/cli\/run-cli\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\/(?!commands\/init\/)/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.(?:boot|branch-meta(?:\..+)?|misc|pr-flow(?:\..+)?)\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.lifecycle(?:\..+)?\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.tasks(?:\..+)?\.test\.ts$/,
];
const PR_BUCKET_PATTERNS = [
  /^packages\/agentplane\/src\/commands\/pr(?:\/|\.|$)/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.pr-flow(?:\..+)?\.test\.ts$/,
];

const CLI_RUNTIME_BUCKET_PATTERNS = [
  /^packages\/agentplane\/bin\//,
  /^packages\/agentplane\/src\/cli\/runtime-context\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/runtime-watch\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/dist-guard\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/stale-dist-policy\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/stale-dist-readonly\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/repo-local-handoff\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/verify-global-install-script\.test\.ts$/,
];

const RELEASE_BUCKET_PATTERNS = [
  /^packages\/agentplane\/src\/commands\/release\//,
  /^packages\/agentplane\/src\/cli\/release-recovery-script\.test\.ts$/,
  /^scripts\/check-release-(?:parity|version)\.mjs$/,
  /^scripts\/release-check\.mjs$/,
  /^scripts\/check-npm-version-availability\.mjs$/,
  /^scripts\/check-release-recovery-state\.mjs$/,
  /^scripts\/check-published-packages\.mjs$/,
];

const UPGRADE_BUCKET_PATTERNS = [
  /^packages\/agentplane\/src\/commands\/upgrade(?:\/|\.|$)/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.upgrade\.test\.ts$/,
  /^scripts\/check-upgrade-preview-fresh\.mjs$/,
];

const GUARD_BUCKET_PATTERNS = [
  /^packages\/agentplane\/src\/commands\/guard\//,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.guard(?:\..+)?\.test\.ts$/,
];

const BROAD_FALLBACK_PATTERNS = [
  /^package\.json$/,
  /^bun\.lock$/,
  /^tsconfig(?:\..+)?\.json$/,
  /^scripts\//,
  /^packages\/core\//,
  /^packages\/agentplane\/src\/cli\//,
  /^packages\/agentplane\/src\/commands\/shared\//,
  /^packages\/agentplane\/src\/commands\/release\//,
  /^packages\/agentplane\/src\/commands\/upgrade(?:\/|\.|$)/,
  /^packages\/agentplane\/bin\//,
];

const CLI_DOCS_RELEVANT_PATTERNS = [
  /^packages\/agentplane\/src\/cli\//,
  /^packages\/agentplane\/src\/commands\/.+(?:command|spec)\.ts$/,
  /^docs\/user\/cli-reference\.generated\.mdx$/,
  /^docs\/user\/commands\.mdx$/,
  /^docs\/user\/agent-bootstrap\.generated\.mdx$/,
];

const TARGET_BUCKET_DEFINITIONS = [
  {
    bucket: "task",
    reason: "task_command_paths_only",
    patterns: TASK_BUCKET_PATTERNS,
    testFiles: TASK_TEST_FILES,
    vitestPool: "threads",
  },
  {
    bucket: "doctor",
    reason: "doctor_command_paths_only",
    patterns: DOCTOR_BUCKET_PATTERNS,
    testFiles: DOCTOR_TEST_FILES,
    vitestPool: "threads",
  },
  {
    bucket: "backend",
    reason: "backend_projection_paths_only",
    patterns: BACKEND_BUCKET_PATTERNS,
    testFiles: BACKEND_TEST_FILES,
    vitestPool: "forks",
  },
  {
    bucket: "hooks",
    reason: "hook_and_ci_routing_paths_only",
    patterns: HOOKS_BUCKET_PATTERNS,
    testFiles: HOOKS_TEST_FILES,
    vitestPool: "threads",
  },
  {
    bucket: "workflow",
    reason: "workflow_contract_paths_only",
    patterns: WORKFLOW_BUCKET_PATTERNS,
    testFiles: WORKFLOW_TEST_FILES,
    vitestPool: "threads",
  },
  {
    bucket: "cli-help",
    reason: "cli_help_and_spec_paths_only",
    patterns: CLI_HELP_BUCKET_PATTERNS,
    testFiles: CLI_HELP_TEST_FILES,
    vitestPool: "threads",
  },
  {
    bucket: "cli-core",
    reason: "cli_core_execution_paths_only",
    patterns: CLI_CORE_BUCKET_PATTERNS,
    testFiles: CLI_CORE_TEST_FILES,
    vitestPool: "threads",
  },
  {
    bucket: "pr",
    reason: "pr_paths_only",
    patterns: PR_BUCKET_PATTERNS,
    testFiles: PR_TEST_FILES,
    vitestPool: "threads",
  },
  {
    bucket: "cli-runtime",
    reason: "cli_runtime_handoff_paths_only",
    patterns: CLI_RUNTIME_BUCKET_PATTERNS,
    testFiles: CLI_RUNTIME_TEST_FILES,
    vitestPool: "threads",
  },
  {
    bucket: "release",
    reason: "release_paths_only",
    patterns: RELEASE_BUCKET_PATTERNS,
    testFiles: RELEASE_TEST_FILES,
    vitestPool: "threads",
  },
  {
    bucket: "upgrade",
    reason: "upgrade_paths_only",
    patterns: UPGRADE_BUCKET_PATTERNS,
    testFiles: UPGRADE_TEST_FILES,
    vitestPool: "threads",
  },
  {
    bucket: "guard",
    reason: "guard_paths_only",
    patterns: GUARD_BUCKET_PATTERNS,
    testFiles: GUARD_TEST_FILES,
    vitestPool: "threads",
  },
];

export function parseChangedFilesEnv(rawValue) {
  const raw = String(rawValue ?? "").trim();
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function everyPathMatches(paths, patterns) {
  return paths.every((filePath) => patterns.some((pattern) => pattern.test(filePath)));
}

function anyPathMatches(paths, patterns) {
  return paths.some((filePath) => patterns.some((pattern) => pattern.test(filePath)));
}

function stripNeutralPaths(paths, neutralPatterns) {
  const filtered = paths.filter(
    (filePath) => !neutralPatterns.some((pattern) => pattern.test(filePath)),
  );
  return filtered.length > 0 ? filtered : paths;
}

function uniqueSorted(values) {
  return [...new Set(values)].toSorted((a, b) => a.localeCompare(b));
}

function collectCombinedTargetedPlan(files, effectiveFiles) {
  const matched = [];
  for (const filePath of effectiveFiles) {
    const bucket = TARGET_BUCKET_DEFINITIONS.find((entry) =>
      entry.patterns.some((pattern) => pattern.test(filePath)),
    );
    if (!bucket) return null;
    matched.push(bucket);
  }

  const buckets = uniqueSorted(matched.map((entry) => entry.bucket));
  if (buckets.length <= 1) return null;

  const selected = TARGET_BUCKET_DEFINITIONS.filter((entry) => buckets.includes(entry.bucket));
  return {
    kind: "targeted",
    bucket: "mixed",
    buckets,
    reason: "mixed_targeted_paths",
    files,
    lintTargets: effectiveFiles,
    testFiles: uniqueSorted(selected.flatMap((entry) => entry.testFiles)),
    vitestPool: selected.some((entry) => entry.vitestPool === "forks") ? "forks" : "threads",
  };
}

export function selectFastCiPlan(changedFiles) {
  const files = [...new Set(changedFiles.map((value) => value.trim()).filter(Boolean))];
  if (files.length === 0) {
    return { kind: "full-fast", reason: "no_changed_file_scope" };
  }
  const effectiveFiles = stripNeutralPaths(files, NEUTRAL_TASK_ARTIFACT_PATTERNS);

  if (everyPathMatches(effectiveFiles, DOCS_ONLY_PATTERNS)) {
    return { kind: "docs-only", reason: "docs_policy_website_only", files };
  }

  if (everyPathMatches(effectiveFiles, TASK_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "task",
      reason: "task_command_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: TASK_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(effectiveFiles, DOCTOR_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "doctor",
      reason: "doctor_command_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: DOCTOR_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(effectiveFiles, BACKEND_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "backend",
      reason: "backend_projection_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: BACKEND_TEST_FILES,
      vitestPool: "forks",
    };
  }

  if (everyPathMatches(effectiveFiles, HOOKS_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "hooks",
      reason: "hook_and_ci_routing_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: HOOKS_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(effectiveFiles, WORKFLOW_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "workflow",
      reason: "workflow_contract_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: WORKFLOW_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(effectiveFiles, CLI_HELP_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "cli-help",
      reason: "cli_help_and_spec_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: CLI_HELP_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(effectiveFiles, CLI_CORE_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "cli-core",
      reason: "cli_core_execution_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: CLI_CORE_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(effectiveFiles, PR_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "pr",
      reason: "pr_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: PR_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(effectiveFiles, CLI_RUNTIME_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "cli-runtime",
      reason: "cli_runtime_handoff_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: CLI_RUNTIME_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(effectiveFiles, RELEASE_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "release",
      reason: "release_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: RELEASE_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(effectiveFiles, UPGRADE_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "upgrade",
      reason: "upgrade_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: UPGRADE_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(effectiveFiles, GUARD_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "guard",
      reason: "guard_paths_only",
      files,
      lintTargets: effectiveFiles,
      testFiles: GUARD_TEST_FILES,
      vitestPool: "threads",
    };
  }

  const combinedPlan = collectCombinedTargetedPlan(files, effectiveFiles);
  if (combinedPlan) return combinedPlan;

  if (anyPathMatches(effectiveFiles, BROAD_FALLBACK_PATTERNS)) {
    return { kind: "full-fast", reason: "broad_or_infra_sensitive_change", files };
  }

  return { kind: "full-fast", reason: "unclassified_changed_paths", files };
}

export function shouldRunCliDocsCheck(changedFiles) {
  const files = [...new Set(changedFiles.map((value) => value.trim()).filter(Boolean))];
  if (files.length === 0) return true;
  return anyPathMatches(files, CLI_DOCS_RELEVANT_PATTERNS);
}

export function listLocalCiTargetTestFiles() {
  return {
    backend: [...BACKEND_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    "cli-core": [...CLI_CORE_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    "cli-help": [...CLI_HELP_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    "cli-runtime": [...CLI_RUNTIME_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    doctor: [...DOCTOR_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    guard: [...GUARD_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    hooks: [...HOOKS_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    pr: [...PR_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    release: [...RELEASE_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    task: [...TASK_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    upgrade: [...UPGRADE_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
    workflow: [...WORKFLOW_TEST_FILES].toSorted((a, b) => a.localeCompare(b)),
  };
}
