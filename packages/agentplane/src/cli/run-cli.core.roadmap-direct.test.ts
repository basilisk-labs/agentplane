// This release characterization composes compatible production-CLI suites so
// maintained lifecycle fixtures remain the oracle instead of copied setup.
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { expect, it } from "vitest";

import { stripAnsi } from "../shared/ansi.js";
import "./run-cli.core.direct-task-supervision.test.js";
import "./run-cli.core.route-decision.direct-closeout.test.js";

const exec = promisify(execFile);

it(
  "retains independent evaluation, scoped finalization, and checked completion",
  { timeout: 60_000 },
  async () => {
    const result = await exec(
      "bun",
      [
        "run",
        "test:project",
        "agentplane",
        "--maxWorkers=1",
        "packages/agentplane/src/commands/task/direct-task-supervisor.test.ts",
        "packages/agentplane/src/commands/task/direct-task-finalization.test.ts",
        "packages/agentplane/src/commands/task/direct-task-verification.test.ts",
        "-t",
        "verifies before evaluation|does not let an EXECUTOR commit|does not treat an empty",
      ],
      { cwd: process.cwd() },
    );

    expect(stripAnsi(result.stdout)).toMatch(/\bTests\s+3 passed\b/);
  },
);
