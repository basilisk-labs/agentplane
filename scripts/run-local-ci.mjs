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

runStep("Format (check)", () => run("bun", ["run", "format:check"]));
runStep("Schemas (check)", () => run("bun", ["run", "schemas:check"]));
runStep("Agent templates (check)", () => run("bun", ["run", "agents:check"]));
runStep("Release parity (check)", () => run("bun", ["run", "release:parity"]));
runStep("Build", () => {
  run("bun", ["run", "--filter=@agentplaneorg/core", "build"]);
  run("bun", ["run", "--filter=agentplane", "build"]);
  run("bun", ["run", "build"]);
});
runStep("CLI docs freshness (check)", () =>
  run("bun", ["run", "docs:cli:check"], {
    ...process.env,
    AGENTPLANE_DEV_ALLOW_STALE_DIST: "1",
  }),
);
runStep("Workflows lint (actionlint)", () => run("bun", ["run", "workflows:lint"]));
runStep("Lint (core)", () => run("bun", ["run", "lint:core"]));
runStep("Unit tests (fast)", () => run("bun", ["run", "test:fast"], testEnv));
runStep("CLI E2E (critical)", () => run("bun", ["run", "test:critical"], testEnv));
runStep("Windows platform-critical tests", () =>
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
);
runStep("Significant file coverage (guard)", () =>
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
);
runStep("Coverage threshold (significant)", () => run("bun", ["run", "coverage:significant"]));
