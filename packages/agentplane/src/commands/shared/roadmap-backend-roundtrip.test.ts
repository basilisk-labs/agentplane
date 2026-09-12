import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { expect, it } from "vitest";

const exec = promisify(execFile);

it(
  "preserves task authority and verification across backend boundaries",
  { timeout: 60_000 },
  async () => {
    const result = await exec(
      "bun",
      [
        "run",
        "test:project",
        "agentplane",
        "--maxWorkers=1",
        "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts",
        "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts",
        "packages/agentplane/src/adapters/task-backend/task-backend-adapter.test.ts",
        "packages/agentplane/src/backends/task-backend/cloud-pull.test.ts",
        "-t",
        "creates through the kernel|does not turn legacy status|rejects malformed canonical state|refuses unsupported atomicity|matches cloud-fake atomic CAS|binds validation and evaluator|persists approved plan|retains the winning revision|persists claims, results|completes the one canonical Task|preserves projection-read capabilities|marks provider freshness unavailable|rejects a malformed nested conflict|keeps a conflict open",
      ],
      { cwd: process.cwd() },
    );

    expect(result.stdout).toContain("Tests  14 passed");
  },
);
