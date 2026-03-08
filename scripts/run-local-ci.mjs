import { execFileSync } from "node:child_process";

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
  [
    "CLI docs freshness (check)",
    () =>
      run("bun", ["run", "docs:cli:check"], {
        ...process.env,
        AGENTPLANE_DEV_ALLOW_STALE_DIST: "1",
      }),
  ],
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

process.stdout.write(`Local CI mode: ${mode}\n`);
for (const [label, fn] of fastSteps) {
  runStep(label, fn);
}
if (mode === "full") {
  for (const [label, fn] of fullOnlySteps) {
    runStep(label, fn);
  }
}
