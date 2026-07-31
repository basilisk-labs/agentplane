import { rm } from "node:fs/promises";
import path from "node:path";

import { captureStdIO, installRunCliIntegrationHarness, mkTempDir } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

describe("runCli CommandSession", () => {
  it("traces only the declared output node for a metadata-only command", async () => {
    const root = await mkTempDir();
    const outPath = path.join(root, "cli-reference.mdx");
    const previousTrace = process.env.AGENTPLANE_TRACE;
    process.env.AGENTPLANE_TRACE = "1";
    const io = captureStdIO();
    try {
      const code = await runCli(["docs", "cli", "--out", outPath]);
      expect(code).toBe(0);
      expect(io.stderr).toContain('"component":"command-session"');
      expect(io.stderr).toContain('"event":"preparation_node"');
      expect(io.stderr).toContain('"capability":"output"');
      expect(io.stderr).toContain('"node":"output"');
      expect(io.stderr).not.toContain('"node":"project"');
      expect(io.stderr).not.toContain('"node":"config"');
      expect(io.stderr).not.toContain('"node":"command_context"');
    } finally {
      if (previousTrace === undefined) {
        delete process.env.AGENTPLANE_TRACE;
      } else {
        process.env.AGENTPLANE_TRACE = previousTrace;
      }
      io.restore();
      await rm(root, { force: true, recursive: true });
    }
  });
});
