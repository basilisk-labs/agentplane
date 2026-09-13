import { describe, expect, it } from "vitest";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  writeConfig,
} from "@agentplane/testkit";

import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

describe("removed task supervisor budget-epoch command", () => {
  it("does not expose the removed renewal route", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeConfig(root, defaultConfig());
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "supervisor", "budget-epoch", "TASK-1", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown subcommand: supervisor");
      expect(io.stderr).not.toContain("task supervisor budget-epoch");
    } finally {
      io.restore();
    }
  });
});
