import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VITEST_TIMEOUT_MS = "60000";

const PRECOMMIT_FILES = [
  "packages/agentplane/src/commands/shared/network-approval.test.ts",
  "packages/agentplane/src/commands/shared/approval-requirements.test.ts",
  "packages/agentplane/src/commands/task/shared.unit.test.ts",
  "packages/agentplane/src/commands/task/shared.verify-steps.test.ts",
  "packages/agentplane/src/commands/task/warn-owner.unit.test.ts",
  "packages/agentplane/src/commands/shared/comment-format.test.ts",
  "packages/agentplane/src/shared/errors.test.ts",
  "packages/agentplane/src/cli/spec/parse.test.ts",
  "packages/agentplane/src/cli/spec/help-render.test.ts",
  "packages/agentplane/src/cli/spec/registry.test.ts",
  "packages/agentplane/src/cli/spec/suggest.test.ts",
  "packages/agentplane/src/cli/output.test.ts",
  "packages/agentplane/src/cli/prompts.test.ts",
  "packages/agentplane/src/cli/error-map.test.ts",
  "packages/agentplane/src/backends/task-backend/redmine/env.test.ts",
  "packages/core/src/config/execution-profile.test.ts",
  "packages/core/src/config/config.test.ts",
];

const PLATFORM_CRITICAL_FILES = [
  "packages/agentplane/src/commands/shared/pr-meta.test.ts",
  "packages/agentplane/src/commands/scenario/impl/commands.test.ts",
  "packages/agentplane/src/cli/run-cli.core.init.test.ts",
  "packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts",
  "packages/agentplane/src/cli/run-cli.core.init.validation-conflicts.test.ts",
  "packages/agentplane/src/cli/run-cli.core.upgrade.test.ts",
];

const BACKEND_CRITICAL_FILES = [
  "packages/agentplane/src/backends/task-backend.test.ts",
  "packages/agentplane/src/backends/task-backend.local.test.ts",
  "packages/agentplane/src/backends/task-backend.redmine.cache.test.ts",
  "packages/agentplane/src/backends/task-backend.redmine.docs.test.ts",
  "packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts",
  "packages/agentplane/src/backends/task-backend.redmine.remote.test.ts",
  "packages/agentplane/src/backends/task-backend.redmine.write.test.ts",
  "packages/agentplane/src/backends/task-backend.load.test.ts",
  "packages/agentplane/src/backends/task-backend/redmine/env.test.ts",
  "packages/agentplane/src/commands/backend.test.ts",
  "packages/agentplane/src/commands/shared/task-backend.test.ts",
  "packages/agentplane/src/commands/task/export.unit.test.ts",
  "packages/agentplane/src/commands/task/migrate-doc.test.ts",
  "packages/agentplane/src/commands/doctor.fast.test.ts",
  "packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts",
  "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts",
  "packages/agentplane/src/cli/run-cli.core.tasks.incidents.test.ts",
  "packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts",
  "packages/agentplane/src/cli/run-cli.core.tasks.update-scrub.test.ts",
];

const RELEASE_CRITICAL_FILES = [
  "packages/agentplane/src/cli/release-critical-lifecycle.test.ts",
  "packages/agentplane/src/cli/release-recovery-script.test.ts",
  "packages/agentplane/src/cli/release-smoke.test.ts",
  "packages/agentplane/src/cli/cli-smoke.test.ts",
];

const SIGNIFICANT_COVERAGE_FILES = [
  "packages/agentplane/src/commands/guard/impl/allow.test.ts",
  "packages/agentplane/src/commands/guard/impl/close-message.test.ts",
  "packages/agentplane/src/commands/guard/impl/commands.unit.test.ts",
  "packages/agentplane/src/commands/guard/impl/policy.test.ts",
  "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
  "packages/agentplane/src/cli/run-cli.core.guard.test.ts",
  "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts",
];

function normalizeRepoPath(value) {
  return value.split(path.sep).join("/");
}

function listFiles(relativeDir) {
  const root = path.join(REPO_ROOT, relativeDir);
  const files = [];
  const pending = [root];
  while (pending.length > 0) {
    const current = pending.pop();
    if (!current) continue;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        pending.push(absolute);
      } else if (entry.isFile()) {
        files.push(normalizeRepoPath(path.relative(REPO_ROOT, absolute)));
      }
    }
  }
  return files.toSorted((a, b) => a.localeCompare(b));
}

function discoverTests(relativeDirs, predicate) {
  const files = new Set();
  for (const relativeDir of relativeDirs) {
    for (const filePath of listFiles(relativeDir)) {
      if (predicate(filePath)) files.add(filePath);
    }
  }
  return [...files].toSorted((a, b) => a.localeCompare(b));
}

const WORKFLOW_COVERAGE_FILES = discoverTests(
  ["packages/agentplane/src/workflow-runtime", "packages/agentplane/src/harness"],
  (filePath) => filePath.endsWith(".test.ts"),
);

const RELEASE_CI_BASE_FILES = discoverTests(["packages"], (filePath) => {
  if (!filePath.endsWith(".test.ts")) return false;
  if (!filePath.includes("/src/")) return false;
  return ![
    /\/cli-smoke\.test\.ts$/,
    /\/release-recovery-script\.test\.ts$/,
    /\/run-cli\.core\.init(?:\..+)?\.test\.ts$/,
    /\/run-cli\.core\.upgrade\.test\.ts$/,
    /\/run-cli\.core\.backend-sync\.test\.ts$/,
  ].some((pattern) => pattern.test(filePath));
});

export const SUITES = {
  "backend-critical": {
    files: BACKEND_CRITICAL_FILES,
    maxWorkers: "4",
    pool: "forks",
  },
  "platform-critical": {
    files: PLATFORM_CRITICAL_FILES,
    maxWorkers: "4",
    pool: "forks",
  },
  precommit: {
    files: PRECOMMIT_FILES,
    maxWorkers: "4",
    pool: "threads",
  },
  "release-ci-base": {
    chunkSize: 40,
    files: RELEASE_CI_BASE_FILES,
    maxWorkers: "4",
    pool: "forks",
  },
  "release-critical": {
    files: RELEASE_CRITICAL_FILES,
    maxWorkers: "4",
    pool: "forks",
    testTimeout: "120000",
    hookTimeout: "120000",
  },
  "significant-coverage": {
    files: SIGNIFICANT_COVERAGE_FILES,
    maxWorkers: "4",
    pool: "threads",
  },
  "workflow-coverage": {
    files: WORKFLOW_COVERAGE_FILES,
    maxWorkers: "4",
    pool: "threads",
  },
};

export function listVitestSuiteFiles() {
  return Object.fromEntries(
    Object.entries(SUITES)
      .map(([suiteName, suite]) => [
        suiteName,
        [...suite.files].toSorted((a, b) => a.localeCompare(b)),
      ])
      .toSorted(([a], [b]) => a.localeCompare(b)),
  );
}

function printHelp() {
  process.stdout.write(`Usage: node scripts/run-vitest-suite.mjs <suite> [vitest args...]

Suites:
${Object.keys(SUITES)
  .toSorted((a, b) => a.localeCompare(b))
  .map((name) => `  - ${name}`)
  .join("\n")}
`);
}

function buildVitestArgs(suite, files, extraArgs) {
  return [
    "vitest",
    "--config",
    "vitest.workspace.ts",
    "run",
    ...files,
    `--pool=${suite.pool}`,
    "--maxWorkers",
    suite.maxWorkers,
    "--testTimeout",
    suite.testTimeout ?? VITEST_TIMEOUT_MS,
    "--hookTimeout",
    suite.hookTimeout ?? VITEST_TIMEOUT_MS,
    ...extraArgs,
  ];
}

function chunkFiles(files, chunkSize) {
  const chunks = [];
  for (let index = 0; index < files.length; index += chunkSize) {
    chunks.push(files.slice(index, index + chunkSize));
  }
  return chunks;
}

function runVitest(args) {
  execFileSync("bunx", args, {
    cwd: REPO_ROOT,
    env: process.env,
    stdio: "inherit",
  });
}

function runVitestCaptured(args) {
  const result = spawnSync("bunx", args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    env: process.env,
    maxBuffer: 64 * 1024 * 1024,
  });
  const output = [result.stdout, result.stderr].filter(Boolean).join("");
  if (result.error) {
    if (output) process.stdout.write(output);
    throw result.error;
  }
  if (result.status !== 0 || result.signal) {
    if (output) process.stdout.write(output);
    throw new Error(
      `Vitest failed with status=${result.status ?? "null"} signal=${result.signal ?? "none"}`,
    );
  }
  return output;
}

function summarizeVitestOutput(output) {
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^(Test Files|Tests|Duration)\b/.test(line))
    .join("; ");
}

function main(argv = process.argv.slice(2)) {
  const suiteName = argv[0];
  if (suiteName === "--help" || suiteName === "-h") {
    printHelp();
    return;
  } else if (suiteName) {
    const suite = SUITES[suiteName];
    if (!suite) {
      printHelp();
      throw new Error(`Unknown Vitest suite: ${suiteName}`);
    }

    if (suite.files.length === 0) {
      throw new Error(`Vitest suite has no test files: ${suiteName}`);
    }

    const missingFiles = suite.files.filter(
      (filePath) => !existsSync(path.join(REPO_ROOT, filePath)),
    );
    if (missingFiles.length > 0) {
      throw new Error(
        `Vitest suite ${suiteName} references missing files: ${missingFiles.join(", ")}`,
      );
    }

    const extraArgs = argv.slice(1);
    if (Number.isInteger(suite.chunkSize) && suite.chunkSize > 0) {
      const chunks = chunkFiles(suite.files, suite.chunkSize);
      for (const [index, files] of chunks.entries()) {
        process.stdout.write(
          `Vitest suite ${suiteName}: chunk ${index + 1}/${chunks.length} (${files.length} files)\n`,
        );
        const output = runVitestCaptured(buildVitestArgs(suite, files, extraArgs));
        const summary = summarizeVitestOutput(output);
        process.stdout.write(
          `Vitest suite ${suiteName}: chunk ${index + 1}/${chunks.length} passed${summary ? ` (${summary})` : ""}\n`,
        );
      }
    } else {
      runVitest(buildVitestArgs(suite, suite.files, extraArgs));
    }
  } else {
    printHelp();
    throw new Error("Missing Vitest suite name.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
