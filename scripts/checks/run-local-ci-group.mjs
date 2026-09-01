import { execFileSync } from "node:child_process";
import { closeSync, mkdtempSync, openSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const group = process.argv[2];
const run = (command, args) => execFileSync(command, args, { env: process.env, stdio: "inherit" });
const bunScript = (name) => run("bun", ["run", name]);
const runCapturedShard = (command, args) => {
  const outputDir = mkdtempSync(path.join(tmpdir(), "agentplane-core-vitest-"));
  const outputPath = path.join(outputDir, "output.log");
  const outputFd = openSync(outputPath, "w");
  let failure = null;
  try {
    execFileSync(command, args, {
      env: process.env,
      stdio: ["ignore", outputFd, outputFd],
    });
  } catch (error) {
    failure = error;
  } finally {
    closeSync(outputFd);
  }
  const output = readFileSync(outputPath, "utf8");
  rmSync(outputDir, { recursive: true, force: true });
  if (failure) {
    process.stderr.write(output.slice(-128 * 1024));
    throw failure;
  }
  const summary = output
    .split(/\r?\n/u)
    .filter((line) => /^\s*(Test Files|Tests|Start at|Duration)\s/u.test(line))
    .slice(-4)
    .join("\n");
  process.stdout.write(`${summary}\n`);
};
const timeout = "60000";
const pooledCoreTimeout = "120000";
const corePoolWorkers = "4";
const isolatedCoreTest =
  "packages/agentplane/src/runner/usecases/task-run-state-fingerprint.integration.test.ts";
const isolatedProcessSupervisionTest = "packages/agentplane/src/runner/process-supervision.test.ts";

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
    const args = [
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
      "--exclude",
      isolatedCoreTest,
      "--exclude",
      isolatedProcessSupervisionTest,
      "--pool=threads",
      "--reporter=default",
      "--silent=passed-only",
      "--maxWorkers",
      corePoolWorkers,
      "--testTimeout",
      pooledCoreTimeout,
      "--hookTimeout",
      pooledCoreTimeout,
    ];
    // The fork scheduler can stall on the 600+ file selection, while restarting bounded
    // shards accumulates macOS execution-policy overhead. Keep the complete selection in one
    // bounded thread pool with limited subprocess pressure, then run the process-sensitive files
    // in isolated fork invocations with the stricter default timeout.
    process.stdout.write("core vitest pooled 1/1\n");
    runCapturedShard("bunx", args);
    process.stdout.write("core vitest process supervision isolated 1/1\n");
    runCapturedShard("bunx", [
      "vitest",
      "run",
      isolatedProcessSupervisionTest,
      "--pool=forks",
      "--reporter=verbose",
      "--silent=passed-only",
      "--maxWorkers",
      "1",
      "--testTimeout",
      timeout,
      "--hookTimeout",
      timeout,
    ]);
    process.stdout.write("core vitest isolated 1/1\n");
    runCapturedShard("bunx", [
      "vitest",
      "run",
      isolatedCoreTest,
      "--pool=forks",
      "--reporter=verbose",
      "--silent=passed-only",
      "--maxWorkers",
      "1",
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
