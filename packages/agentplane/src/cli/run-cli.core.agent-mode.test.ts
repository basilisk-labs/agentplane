import { afterEach, describe, expect, it } from "vitest";

import { captureStdIO, installRunCliIntegrationHarness } from "@agentplane/testkit";

import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const envSnapshot = { ...process.env };

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in envSnapshot)) delete process.env[key];
  }
  for (const [key, value] of Object.entries(envSnapshot)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("runCli agent mode", () => {
  it("emits structured JSON for global parse errors", async () => {
    process.env.AGENTPLANE_CLI_ALIAS = "ap";
    const io = captureStdIO();
    try {
      const code = await runCli(["--output", "bogus", "help"]);
      expect(code).toBe(2);
      expect(io.stdout).toContain('"error"');
      expect(io.stdout).toContain('"code": "E_USAGE"');
    } finally {
      io.restore();
    }
  });
});
