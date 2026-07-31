import { rm } from "node:fs/promises";
import path from "node:path";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  mkTempDir,
  writeConfig,
} from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "./core-imports.js";
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

  it("keeps local task routes lazy and does not resolve provider capabilities", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const createIo = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Inspect local route laziness",
        "--description",
        "Keep remote preparation lazy.",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = createIo.stdout.trim();
    } finally {
      createIo.restore();
    }

    const previousTrace = process.env.AGENTPLANE_TRACE;
    process.env.AGENTPLANE_TRACE = "1";
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "status", taskId, "--route", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).toContain('"capability":"route.local"');
      expect(io.stderr).not.toContain('"capability":"route.remote"');
      expect(io.stderr).not.toContain('"capability":"provider"');
    } finally {
      if (previousTrace === undefined) {
        delete process.env.AGENTPLANE_TRACE;
      } else {
        process.env.AGENTPLANE_TRACE = previousTrace;
      }
      io.restore();
    }
  });
});
