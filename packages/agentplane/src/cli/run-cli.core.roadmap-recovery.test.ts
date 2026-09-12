import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { expect, it } from "vitest";

const exec = promisify(execFile);

it("preserves accepted semantic work across recovery boundaries", { timeout: 60_000 }, async () => {
  const result = await exec(
    "bun",
    [
      "run",
      "test:project",
      "agentplane",
      "--maxWorkers=1",
      "packages/agentplane/src/commands/task/external-agent-exchange.test.ts",
      "packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts",
      "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts",
      "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts",
      "packages/agentplane/src/runner/usecases/task-knowledge-request-lifecycle.test.ts",
      "packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel-effect-in-doubt.test.ts",
      "packages/agentplane/src/runner/usecases/task-run-active-claim.test.ts",
      "packages/agentplane/src/runner/usecases/task-run-state-fingerprint.integration.test.ts",
      "-t",
      "requires issuance opt-in|re-derives current role|reconciles an exact approved|advances a recovered completed|serves and persists a bounded response|fails closed when supervisor history|does not auto-recover|retains an in-doubt claim",
    ],
    { cwd: process.cwd() },
  );

  expect(result.stdout).toContain("Tests  7 passed");
});
