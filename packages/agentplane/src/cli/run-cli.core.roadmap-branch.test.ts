import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { expect, it } from "vitest";

import { stripAnsi } from "../shared/ansi.js";

const exec = promisify(execFile);

it(
  "binds branch completion identities and rejects stale hosted evidence",
  { timeout: 60_000 },
  async () => {
    const result = await exec(
      "bun",
      [
        "run",
        "test:project",
        "agentplane",
        "--maxWorkers=1",
        "packages/agentplane/src/commands/task/branch-task-supervisor.test.ts",
        "packages/agentplane/src/commands/pr/integrate/queue-state.test.ts",
        "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts",
        "-t",
        "runs semantic roles|returns merge authority|maps late checks|does not replay a completed hosted-close|records merged provider truth|invalidates a queued entry whenever the pinned base moves|keeps a newer unpublished head publishable",
      ],
      { cwd: process.cwd() },
    );

    expect(stripAnsi(result.stdout)).toMatch(/\bTests\s+7 passed\b/);
  },
);
