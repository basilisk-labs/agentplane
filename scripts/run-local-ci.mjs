import { execFileSync } from "node:child_process";

import {
  parseChangedFilesEnv,
  selectFastCiPlan,
  shouldRunCliDocsCheck,
} from "./lib/local-ci-selection.mjs";

const testEnv = {
  ...process.env,
  GIT_AUTHOR_NAME: "agentplane-ci",
  GIT_AUTHOR_EMAIL: "agentplane-ci@example.com",
  GIT_COMMITTER_NAME: "agentplane-ci",
  GIT_COMMITTER_EMAIL: "agentplane-ci@example.com",
};

function run(cmd, args, env = process.env) {
  execFileSync(cmd, args, { stdio: "inherit", env });
}

function runStep(label, fn) {
  process.stdout.write(`\n== ${label} ==\n`);
  fn();
}

function runCommand(cmd, args, env = process.env) {
  run(cmd, args, env);
}

const modeFlagIndex = process.argv.indexOf("--mode");
const inlineModeArg = process.argv.find((arg) => arg.startsWith("--mode="));
const mode =
  modeFlagIndex === -1
    ? inlineModeArg
      ? inlineModeArg.slice("--mode=".length)
      : "full"
    : (process.argv[modeFlagIndex + 1] ?? "full");
if (mode !== "fast" && mode !== "full") {
  throw new Error(`Unsupported ci mode: ${mode}`);
}

const fastSteps = [
  ["Format (check)", () => run("bun", ["run", "format:check"])],
  ["Schemas (check)", () => run("bun", ["run", "schemas:check"])],
  ["Agent templates (check)", () => run("bun", ["run", "agents:check"])],
  ["Policy routing (check)", () => run("bun", ["run", "policy:routing:check"])],
  ["Release parity (check)", () => run("bun", ["run", "release:parity"])],
  [
    "Build",
    () => {
      run("bun", ["run", "--filter=@agentplaneorg/core", "build"]);
      run("bun", ["run", "--filter=agentplane", "build"]);
      run("bun", ["run", "build"]);
    },
  ],
  ["CLI docs freshness (check)", () => runCliDocsFreshnessStep()],
  ["Agent onboarding scenario (check)", () => run("bun", ["run", "docs:onboarding:check"])],
  ["Lint (core)", () => run("bun", ["run", "lint:core"])],
  ["Unit tests (fast)", () => run("bun", ["run", "test:fast"], testEnv)],
  ["CLI E2E (critical)", () => run("bun", ["run", "test:critical"], testEnv)],
];

const fullOnlySteps = [
  [
    "Docs site pipeline (generate + typecheck + build + design)",
    () => run("bun", ["run", "docs:site:check"]),
  ],
  ["Workflows lint (actionlint)", () => run("bun", ["run", "workflows:lint"])],
  [
    "Windows platform-critical tests",
    () =>
      run(
        "bun",
        [
          "test",
          "packages/agentplane/src/commands/shared/pr-meta.test.ts",
          "packages/agentplane/src/commands/scenario/impl/commands.test.ts",
          "packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts",
        ],
        testEnv,
      ),
  ],
  [
    "Significant file coverage (guard)",
    () =>
      run("bunx", [
        "vitest",
        "run",
        "packages/agentplane/src/commands/guard/impl/allow.test.ts",
        "packages/agentplane/src/commands/guard/impl/close-message.test.ts",
        "packages/agentplane/src/commands/guard/impl/commands.unit.test.ts",
        "packages/agentplane/src/commands/guard/impl/policy.test.ts",
        "packages/agentplane/src/commands/guard/impl/comment-commit.test.ts",
        "packages/agentplane/src/cli/run-cli.core.guard.test.ts",
        "--coverage",
        "--coverage.reporter=json",
        "--coverage.include=packages/agentplane/src/commands/guard/**",
      ]),
  ],
  ["Coverage threshold (significant)", () => run("bun", ["run", "coverage:significant"])],
];

const changedFiles = parseChangedFilesEnv(process.env.AGENTPLANE_FAST_CHANGED_FILES);
const fastPlan = selectFastCiPlan(changedFiles);
const runCliDocsCheck = shouldRunCliDocsCheck(changedFiles);

function runCliDocsFreshnessStep() {
  if (!runCliDocsCheck) {
    process.stdout.write("Skipping CLI docs freshness check for this changed-file bucket.\n");
    return;
  }
  runCommand("bun", ["run", "docs:cli:check"], {
    ...process.env,
    AGENTPLANE_DEV_ALLOW_STALE_DIST: "1",
  });
}

function runDocsOnlyFastPath() {
  runStep("Format (check)", () => runCommand("bun", ["run", "format:check"]));
  runStep("Schemas (check)", () => runCommand("bun", ["run", "schemas:check"]));
  runStep("Agent templates (check)", () => runCommand("bun", ["run", "agents:check"]));
  runStep("Policy routing (check)", () => runCommand("bun", ["run", "policy:routing:check"]));
  runStep("Release parity (check)", () => runCommand("bun", ["run", "release:parity"]));
  runStep("CLI docs freshness (check)", () => runCliDocsFreshnessStep());
  runStep("Agent onboarding scenario (check)", () =>
    runCommand("bun", ["run", "docs:onboarding:check"]),
  );
}

function runTargetedFastPath(plan) {
  runStep("Format (check)", () => runCommand("bun", ["run", "format:check"]));
  runStep("Schemas (check)", () => runCommand("bun", ["run", "schemas:check"]));
  runStep("Agent templates (check)", () => runCommand("bun", ["run", "agents:check"]));
  runStep("Policy routing (check)", () => runCommand("bun", ["run", "policy:routing:check"]));
  runStep("Release parity (check)", () => runCommand("bun", ["run", "release:parity"]));
  runStep("Build", () => {
    runCommand("bun", ["run", "--filter=@agentplaneorg/core", "build"]);
    runCommand("bun", ["run", "--filter=agentplane", "build"]);
    runCommand("bun", ["run", "build"]);
  });
  runStep("CLI docs freshness (check)", () => runCliDocsFreshnessStep());
  runStep("Agent onboarding scenario (check)", () =>
    runCommand("bun", ["run", "docs:onboarding:check"]),
  );
  if (plan.bucket === "workflow") {
    const scriptLintTargets = plan.lintTargets.filter(
      (target) => !target.startsWith(".github/workflows/") && !target.endsWith(".yml"),
    );
    if (scriptLintTargets.length > 0) {
      runStep(`Lint (targeted:${plan.bucket})`, () =>
        runCommand("bun", ["run", "lint:core", "--", ...scriptLintTargets]),
      );
    }
    runStep("Workflow lint + command contract", () => runCommand("bun", ["run", "workflows:lint"]));
    return;
  }
  runStep(`Lint (targeted:${plan.bucket})`, () =>
    runCommand("bun", ["run", "lint:core", "--", ...plan.lintTargets]),
  );
  runStep(`Unit tests (targeted:${plan.bucket})`, () =>
    runCommand(
      "bunx",
      [
        "vitest",
        "run",
        ...plan.testFiles,
        "--pool=threads",
        "--testTimeout",
        "60000",
        "--hookTimeout",
        "60000",
      ],
      testEnv,
    ),
  );
}

process.stdout.write(`Local CI mode: ${mode}\n`);
if (mode === "fast") {
  process.stdout.write(
    `Fast CI selector: ${fastPlan.kind}${fastPlan.bucket ? ` (${fastPlan.bucket})` : ""} [${fastPlan.reason}]\n`,
  );
}

if (mode === "fast" && fastPlan.kind === "docs-only") {
  runDocsOnlyFastPath();
} else if (mode === "fast" && fastPlan.kind === "targeted") {
  runTargetedFastPath(fastPlan);
} else {
  for (const [label, fn] of fastSteps) {
    runStep(label, fn);
  }
}
if (mode === "full") {
  for (const [label, fn] of fullOnlySteps) {
    runStep(label, fn);
  }
}
