import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { expect, it } from "vitest";

import { stripAnsi } from "../../shared/ansi.js";

const exec = promisify(execFile);

it("conserves implementation work across verification retries", { timeout: 60_000 }, async () => {
  const result = await exec(
    "bun",
    [
      "run",
      "test:project",
      "agentplane",
      "--maxWorkers=1",
      "packages/agentplane/src/commands/task/verification-infrastructure.test.ts",
      "packages/agentplane/src/commands/task/branch-task-verification.test.ts",
      "packages/agentplane/src/commands/task/direct-task-verification.test.ts",
      "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts",
      "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts",
      "-t",
      "retains a failed check outside|freezes branch verification|reuses only the exact unchanged|refreshes deterministic evidence after|routes an unclassified semantic|returns direct verification rework|keeps rework semantic while|moves a newer implementation|accepts a newer supervisor|rejects a newer non-supervisor|does not match a populated task commit",
    ],
    { cwd: process.cwd() },
  );

  expect(stripAnsi(result.stdout)).toMatch(/\bTests\s+12 passed\b/);
});
