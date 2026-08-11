import { describe, expect, it } from "vitest";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "@agentplane/testkit";

import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

describe("runCli config policy", () => {
  it("rejects mutable execution policy fields", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "config",
        "set",
        "execution.reasoning_effort",
        "low",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Execution policy is fixed");
    } finally {
      io.restore();
    }
  });
});
