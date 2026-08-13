import { execFileSync } from "node:child_process";

const group = process.argv[2];
const run = (command, args) => execFileSync(command, args, { env: process.env, stdio: "inherit" });
const bunScript = (name) => run("bun", ["run", name]);
const timeout = "60000";
const maxWorkers = process.env.AGENTPLANE_FAST_VITEST_MAX_WORKERS || "4";

const groups = {
  "docs-schema": () => {
    for (const script of [
      "format:check",
      "schemas:check",
      "agents:check",
      "policy:routing:check",
      "release:parity",
      ...(process.env.AGENTPLANE_LOCAL_CI_RUN_CLI_DOCS === "1" ? ["docs:cli:check"] : []),
      "docs:recipes:check",
      "docs:scripts:check",
      "docs:onboarding:check",
      "hotspots:check",
      "vitest:projects:check",
    ]) {
      bunScript(script);
    }
  },
  core: () => {
    bunScript("lint:core");
    run("bunx", [
      "vitest",
      "run",
      "--exclude",
      "**/cli-smoke.test.ts",
      "--exclude",
      "**/run-cli*.test.ts",
      "--exclude",
      "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts",
      "--exclude",
      "packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts",
      "--pool=forks",
      "--maxWorkers",
      maxWorkers,
      "--testTimeout",
      timeout,
      "--hookTimeout",
      timeout,
    ]);
  },
  runtime: () =>
    run("bunx", [
      "vitest",
      "run",
      "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts",
      "packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts",
      "--pool=forks",
      "--maxWorkers",
      "1",
      "--testTimeout",
      timeout,
      "--hookTimeout",
      timeout,
    ]),
  cli: () => {
    bunScript("bench:cli:cold:check");
    bunScript("test:critical");
  },
};

if (!Object.hasOwn(groups, group)) {
  throw new Error(`Unknown local verification group: ${String(group)}`);
}
groups[group]();
