import { prepareContinuityPlan } from "./task-continuity.testkit.js";

import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import { captureStdIO, defaultConfig, writeConfig } from "@agentplane/testkit/cli-core-pr-flow";
import { installRunCliIntegrationHarness, mkGitRepoRootWithCommit } from "@agentplane/testkit";

installRunCliIntegrationHarness();

describe("runCli direct task supervision", () => {
  it("stops before starting an EXECUTOR when the plan still requires approval", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const createIo = captureStdIO();
    let taskId = "";
    try {
      expect(
        await runCli([
          "task",
          "create",
          "Direct supervision approval stop",
          "--description",
          "Ensure the direct supervisor never starts a provider before plan approval.",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "code",
          "--task-kind",
          "code",
          "--mutation-scope",
          "code",
          "--scope-root",
          ".",
          "--repository-effect",
          "tests",
          "--capability",
          "task.verify",
          "--json",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = (JSON.parse(createIo.stdout) as { task_id: string }).task_id;
    } finally {
      createIo.restore();
    }

    await prepareContinuityPlan(
      root,
      taskId,
      "Stop before executor until explicit plan approval.",
      false,
    );

    const runIo = captureStdIO();
    try {
      expect(await runCli(["task", "run", taskId, "--json", "--root", root]), runIo.stderr).toBe(0);
      const payload = JSON.parse(runIo.stdout) as { action: { kind: string; reason: string } };
      expect(payload).toMatchObject({
        action: { kind: "approval_required", reason: "kernel_plan_approval_required" },
      });
      const advanceIo = captureStdIO();
      try {
        expect(
          await runCli(["task", "advance", taskId, "--agent-json", "--root", root]),
          advanceIo.stderr,
        ).toBe(0);
        const external = JSON.parse(advanceIo.stdout) as {
          action: { kind: string; reason: string };
        };
        expect(external).toMatchObject({
          action: { kind: "approval_required", reason: "kernel_plan_approval_required" },
        });
      } finally {
        advanceIo.restore();
      }
    } finally {
      runIo.restore();
    }
  });
});
