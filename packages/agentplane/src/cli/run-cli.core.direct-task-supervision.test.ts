import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  defaultConfig,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";
import { installRunCliIntegrationHarness } from "@agentplane/testkit";

installRunCliIntegrationHarness();

describe("runCli direct task supervision", () => {
  it("stops before starting an EXECUTOR when the plan still requires approval", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const createIo = captureStdIO();
    let taskId = "";
    try {
      expect(
        await runCli([
          "task",
          "new",
          "--title",
          "Direct supervision approval stop",
          "--description",
          "Ensure the direct supervisor never starts a provider before plan approval.",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "code",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = createIo.stdout.trim();
    } finally {
      createIo.restore();
    }

    const runIo = captureStdIO();
    try {
      expect(await runCli(["task", "run", taskId, "--json", "--root", root])).toBe(0);
      const payload = JSON.parse(runIo.stdout) as {
        schema: string;
        status: string;
        executor: unknown;
        evaluator: unknown;
        stop: { code: string; operation_id: string | null };
      };
      expect(payload).toMatchObject({
        schema: "agentplane.direct_task_supervision.v1",
        status: "stopped",
        executor: null,
        evaluator: null,
        stop: { code: "approval_required", operation_id: null },
      });
    } finally {
      runIo.restore();
    }
  });
});
