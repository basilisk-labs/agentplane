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

const DOCTOR_TEST_FILES = ["packages/agentplane/src/commands/doctor.command.test.ts"];
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

  if (anyPathMatches(files, BROAD_FALLBACK_PATTERNS)) {
    return { kind: "full-fast", reason: "broad_or_infra_sensitive_change", files };
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
    };
  }

  return { kind: "full-fast", reason: "unclassified_changed_paths", files };
}

export function shouldRunCliDocsCheck(changedFiles) {
  const files = [...new Set(changedFiles.map((value) => value.trim()).filter(Boolean))];
  if (files.length === 0) return true;
  return anyPathMatches(files, CLI_DOCS_RELEVANT_PATTERNS);
}
