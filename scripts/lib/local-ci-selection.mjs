import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DOCS_ONLY_PATTERNS = [
  /^docs\//,
  /^website\//,
  /^\.agentplane\/tasks\//,
  /^\.agentplane\/policy\//,
  /^AGENTS\.md$/,
  /^README(?:\.[^.]+)?\.md$/,
  /^DESIGN\.md$/,
];

const TASK_BUCKET_PATTERNS = [/^packages\/agentplane\/src\/commands\/task\//];

const DOCTOR_BUCKET_PATTERNS = [/^packages\/agentplane\/src\/commands\/doctor(?:\/|\.|$)/];

const BACKEND_BUCKET_PATTERNS = [
  /^packages\/agentplane\/src\/backends\/task-backend\//,
  /^packages\/agentplane\/src\/backends\/task-backend(?:\..+)?\.test\.ts$/,
  /^packages\/agentplane\/src\/backends\/task-backend\.test-helpers\.ts$/,
  /^packages\/agentplane\/src\/backends\/task-index\.ts$/,
  /^packages\/agentplane\/src\/commands\/backend(?:\/|\.|$)/,
  /^packages\/agentplane\/src\/commands\/shared\/task-backend(?:\.test)?\.ts$/,
  /^packages\/agentplane\/src\/commands\/task\/(?:export|migrate-doc)(?:\.test|\.unit\.test)?\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.backend-sync\.test\.ts$/,
];

const HOOKS_BUCKET_PATTERNS = [
  /^scripts\/run-(?:pre-push|pre-commit|commit-msg)-hook\.mjs$/,
  /^scripts\/run-local-ci\.mjs$/,
  /^scripts\/lib\/local-ci-selection\.mjs$/,
  /^scripts\/lib\/pre-push-scope\.mjs$/,
  /^lefthook\.yml$/,
  /^packages\/agentplane\/src\/cli\/local-ci-selection\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.hooks\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/pre-commit-staged-files\.test\.ts$/,
];

const WORKFLOW_BUCKET_PATTERNS = [
  /^\.github\/workflows\//,
  /^\.github\/actionlint\.yaml$/,
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
  /^packages\/agentplane\/src\/cli\/shared\//,
];
const CLI_HELP_DISCOVERY_PATTERNS = [
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.(?:docs-cli|help-contract|help-snap)\.test\.ts$/,
];

const CLI_CORE_BUCKET_PATTERNS = [
  /^packages\/agentplane\/src\/cli\/run-cli\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\/(?!commands\/init\/)/,
  /^packages\/agentplane\/src\/cli\/run-cli\.test-helpers\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.(?:boot|branch-meta(?:\..+)?|misc|pr-flow(?:\..+)?)\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.lifecycle(?:\..+)?\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.tasks(?:\..+)?\.test\.ts$/,
];
const CLI_CORE_DISCOVERY_PATTERNS = [
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.(?:boot|branch-meta(?:\..+)?|misc|pr-flow(?:\..+)?)\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.lifecycle(?:\..+)?\.test\.ts$/,
  /^packages\/agentplane\/src\/cli\/run-cli\.core\.tasks(?:\..+)?\.test\.ts$/,
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
const GUARD_DISCOVERY_PATTERNS = [
  /^packages\/agentplane\/src\/commands\/guard\/.+\.test\.ts$/,
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

const TASK_TEST_FILES = [
  "packages/agentplane/src/commands/task/shared.unit.test.ts",
  "packages/agentplane/src/commands/task/shared.verify-steps.test.ts",
  "packages/agentplane/src/commands/task/warn-owner.unit.test.ts",
  "packages/agentplane/src/commands/task/finish.unit.test.ts",
  "packages/agentplane/src/commands/task/verify-record.unit.test.ts",
  "packages/agentplane/src/commands/task/plan.unit.test.ts",
];

const DOCTOR_TEST_FILES = ["packages/agentplane/src/commands/doctor.fast.test.ts"];
const BACKEND_TEST_FILES = [
  "packages/agentplane/src/backends/task-backend.test.ts",
  "packages/agentplane/src/backends/task-backend.local.test.ts",
  "packages/agentplane/src/backends/task-backend.redmine.test.ts",
  "packages/agentplane/src/backends/task-backend.load.test.ts",
  "packages/agentplane/src/backends/task-backend/redmine/env.test.ts",
  "packages/agentplane/src/commands/backend.test.ts",
  "packages/agentplane/src/commands/shared/task-backend.test.ts",
  "packages/agentplane/src/commands/task/export.unit.test.ts",
  "packages/agentplane/src/commands/task/migrate-doc.test.ts",
  "packages/agentplane/src/commands/doctor.fast.test.ts",
  "packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts",
  "packages/agentplane/src/cli/run-cli.core.tasks.test.ts",
];
const HOOKS_TEST_FILES = [
  "packages/agentplane/src/cli/local-ci-selection.test.ts",
  "packages/agentplane/src/cli/run-cli.core.hooks.test.ts",
  "packages/agentplane/src/cli/pre-commit-staged-files.test.ts",
];
const WORKFLOW_TEST_FILES = [];
const SELECTOR_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function normalizeRepoPath(value) {
  return value.split(path.sep).join("/");
}

function listRepoFiles(relativeDir) {
  const root = path.join(SELECTOR_ROOT, relativeDir);
  const files = [];
  const pending = [root];

  while (pending.length > 0) {
    const current = pending.pop();
    if (!current) continue;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        pending.push(absolute);
        continue;
      }
      if (!entry.isFile()) continue;
      files.push(normalizeRepoPath(path.relative(SELECTOR_ROOT, absolute)));
    }
  }

  return files.toSorted((a, b) => a.localeCompare(b));
}

function discoverTestFiles(relativeDirs, patterns) {
  const matches = new Set();
  for (const relativeDir of relativeDirs) {
    for (const filePath of listRepoFiles(relativeDir)) {
      if (patterns.some((pattern) => pattern.test(filePath))) {
        matches.add(filePath);
      }
    }
  }
  return [...matches].toSorted((a, b) => a.localeCompare(b));
}

const CLI_HELP_TEST_FILES = [
  "packages/agentplane/src/cli/command-guide.test.ts",
  "packages/agentplane/src/cli/cli-contract.test.ts",
  "packages/agentplane/src/cli/help.all-commands.contract.test.ts",
  "packages/agentplane/src/cli/output.test.ts",
  "packages/agentplane/src/cli/error-map.test.ts",
  "packages/agentplane/src/cli/prompts.test.ts",
  "packages/agentplane/src/cli/spec/parse.test.ts",
  "packages/agentplane/src/cli/spec/help-render.test.ts",
  "packages/agentplane/src/cli/spec/registry.test.ts",
  "packages/agentplane/src/cli/spec/suggest.test.ts",
  "packages/agentplane/src/cli/shared/ansi.test.ts",
  ...discoverTestFiles(["packages/agentplane/src/cli"], CLI_HELP_DISCOVERY_PATTERNS),
];
const CLI_CORE_TEST_FILES = [
  ...discoverTestFiles(["packages/agentplane/src/cli"], CLI_CORE_DISCOVERY_PATTERNS),
  "packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts",
];
const CLI_RUNTIME_TEST_FILES = [
  "packages/agentplane/src/cli/runtime-context.test.ts",
  "packages/agentplane/src/cli/runtime-watch.test.ts",
  "packages/agentplane/src/cli/dist-guard.test.ts",
  "packages/agentplane/src/cli/stale-dist-policy.test.ts",
  "packages/agentplane/src/cli/stale-dist-readonly.test.ts",
  "packages/agentplane/src/cli/repo-local-handoff.test.ts",
  "packages/agentplane/src/cli/verify-global-install-script.test.ts",
];
const RELEASE_TEST_FILES = [
  "packages/agentplane/src/commands/release/plan.test.ts",
  "packages/agentplane/src/commands/release/release-check-script.test.ts",
  "packages/agentplane/src/commands/release/check-release-parity-script.test.ts",
  "packages/agentplane/src/commands/release/check-release-version-script.test.ts",
  "packages/agentplane/src/commands/release/apply.test.ts",
  "packages/agentplane/src/cli/release-recovery-script.test.ts",
];
const UPGRADE_TEST_FILES = [
  "packages/agentplane/src/commands/upgrade.agent-mode.test.ts",
  "packages/agentplane/src/commands/upgrade.cleanup.test.ts",
  "packages/agentplane/src/commands/upgrade.json-merge.stability.test.ts",
  "packages/agentplane/src/commands/upgrade.merge.test.ts",
  "packages/agentplane/src/commands/upgrade.release-assets.unit.test.ts",
  "packages/agentplane/src/commands/upgrade.safety.test.ts",
  "packages/agentplane/src/commands/upgrade.spec-parse.test.ts",
  "packages/agentplane/src/commands/upgrade.tarball-url.unit.test.ts",
  "packages/agentplane/src/commands/upgrade.unit.test.ts",
  "packages/agentplane/src/cli/run-cli.core.upgrade.test.ts",
];
const GUARD_TEST_FILES = discoverTestFiles(
  ["packages/agentplane/src/commands/guard", "packages/agentplane/src/cli"],
  GUARD_DISCOVERY_PATTERNS,
);
const CLI_DOCS_RELEVANT_PATTERNS = [
  /^packages\/agentplane\/src\/cli\//,
  /^packages\/agentplane\/src\/commands\/.+(?:command|spec)\.ts$/,
  /^docs\/user\/cli-reference\.generated\.mdx$/,
  /^docs\/user\/commands\.mdx$/,
  /^docs\/user\/agent-bootstrap\.generated\.mdx$/,
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

export function selectFastCiPlan(changedFiles) {
  const files = [...new Set(changedFiles.map((value) => value.trim()).filter(Boolean))];
  if (files.length === 0) {
    return { kind: "full-fast", reason: "no_changed_file_scope" };
  }

  if (everyPathMatches(files, DOCS_ONLY_PATTERNS)) {
    return { kind: "docs-only", reason: "docs_policy_website_only", files };
  }

  if (everyPathMatches(files, TASK_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "task",
      reason: "task_command_paths_only",
      files,
      lintTargets: files,
      testFiles: TASK_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(files, DOCTOR_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "doctor",
      reason: "doctor_command_paths_only",
      files,
      lintTargets: files,
      testFiles: DOCTOR_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(files, BACKEND_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "backend",
      reason: "backend_projection_paths_only",
      files,
      lintTargets: files,
      testFiles: BACKEND_TEST_FILES,
      vitestPool: "forks",
    };
  }

  if (everyPathMatches(files, HOOKS_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "hooks",
      reason: "hook_and_ci_routing_paths_only",
      files,
      lintTargets: files,
      testFiles: HOOKS_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(files, WORKFLOW_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "workflow",
      reason: "workflow_contract_paths_only",
      files,
      lintTargets: files,
      testFiles: WORKFLOW_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(files, CLI_HELP_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "cli-help",
      reason: "cli_help_and_spec_paths_only",
      files,
      lintTargets: files,
      testFiles: CLI_HELP_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(files, CLI_CORE_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "cli-core",
      reason: "cli_core_execution_paths_only",
      files,
      lintTargets: files,
      testFiles: CLI_CORE_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(files, CLI_RUNTIME_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "cli-runtime",
      reason: "cli_runtime_handoff_paths_only",
      files,
      lintTargets: files,
      testFiles: CLI_RUNTIME_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(files, RELEASE_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "release",
      reason: "release_paths_only",
      files,
      lintTargets: files,
      testFiles: RELEASE_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(files, UPGRADE_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "upgrade",
      reason: "upgrade_paths_only",
      files,
      lintTargets: files,
      testFiles: UPGRADE_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (everyPathMatches(files, GUARD_BUCKET_PATTERNS)) {
    return {
      kind: "targeted",
      bucket: "guard",
      reason: "guard_paths_only",
      files,
      lintTargets: files,
      testFiles: GUARD_TEST_FILES,
      vitestPool: "threads",
    };
  }

  if (anyPathMatches(files, BROAD_FALLBACK_PATTERNS)) {
    return { kind: "full-fast", reason: "broad_or_infra_sensitive_change", files };
  }

  return { kind: "full-fast", reason: "unclassified_changed_paths", files };
}

export function shouldRunCliDocsCheck(changedFiles) {
  const files = [...new Set(changedFiles.map((value) => value.trim()).filter(Boolean))];
  if (files.length === 0) return true;
  return anyPathMatches(files, CLI_DOCS_RELEVANT_PATTERNS);
}
