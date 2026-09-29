import { describe, expect, it } from "vitest";

import { captureStdIO, installRunCliIntegrationHarness, mkGitRepoRoot } from "@agentplane/testkit";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

describe("task brief structured intent", { timeout: 300_000 }, () => {
  it("projects controlled ops intent in text and JSON output", async () => {
    const root = await mkGitRepoRoot();
    const createIo = captureStdIO();
    let taskId = "";
    try {
      expect(
        await runCli([
          "task",
          "new",
          "--title",
          "Restart a worker",
          "--description",
          "Restart one external worker",
          "--owner",
          "OPS",
          "--tag",
          "ops",
          "--task-kind",
          "ops",
          "--mutation-scope",
          "ops",
          "--risk",
          "external_system",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = createIo.stdout.trim();
    } finally {
      createIo.restore();
    }

    const textIo = captureStdIO();
    try {
      expect(await runCli(["task", "brief", taskId, "--root", root])).toBe(0);
      expect(textIo.stdout).toMatch(/task_kind:\s+ops/u);
      expect(textIo.stdout).toMatch(/mutation_scope:\s+ops/u);
      expect(textIo.stdout).toMatch(/risk_flags:\s+external_system/u);
    } finally {
      textIo.restore();
    }

    const jsonIo = captureStdIO();
    try {
      expect(await runCli(["task", "brief", taskId, "--json", "--root", root])).toBe(0);
      const brief = JSON.parse(jsonIo.stdout) as {
        task: { task_kind?: string; mutation_scope?: string; risk_flags?: string[] };
      };
      expect(brief.task).toMatchObject({
        task_kind: "ops",
        mutation_scope: "ops",
        risk_flags: ["external_system"],
      });
    } finally {
      jsonIo.restore();
    }
  });
});
