import { prepareContinuityPlan } from "./task-continuity.testkit.js";

import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import { agentTransitionId } from "../commands/task/agent-action-packet.js";
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

    await prepareContinuityPlan(
      root,
      taskId,
      "Stop before executor until explicit plan approval.",
      false,
    );

    const runIo = captureStdIO();
    try {
      expect(await runCli(["task", "run", taskId, "--json", "--root", root]), runIo.stderr).toBe(0);
      const payload = JSON.parse(runIo.stdout) as {
        schema: string;
        status: string;
        route: { step_id: string; state_fingerprint: string };
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
      const advanceIo = captureStdIO();
      try {
        expect(
          await runCli(["task", "advance", taskId, "--agent-json", "--root", root]),
          advanceIo.stderr,
        ).toBe(0);
        const external = JSON.parse(advanceIo.stdout) as {
          transition_id: string;
          state_fingerprint: string;
          action: { kind: string };
          stop: { reason: string };
        };
        expect(external).toMatchObject({
          transition_id: agentTransitionId(payload.route.step_id),
          state_fingerprint: payload.route.state_fingerprint,
          action: { kind: "approval_required" },
          stop: { reason: "authority_boundary" },
        });
      } finally {
        advanceIo.restore();
      }
    } finally {
      runIo.restore();
    }
  });
});
