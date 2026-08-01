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
  it("keeps fast help outside project and task preparation", async () => {
    const previousTrace = process.env.AGENTPLANE_TRACE;
    process.env.AGENTPLANE_TRACE = "1";
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "config", "show", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("config show");
      expect(io.stderr).not.toContain('"component":"command-session"');
    } finally {
      if (previousTrace === undefined) {
        delete process.env.AGENTPLANE_TRACE;
      } else {
        process.env.AGENTPLANE_TRACE = previousTrace;
      }
      io.restore();
    }
  });

  it("resolves config commands through project and config nodes only", async () => {
    const root = await mkGitRepoRoot();
    await writeConfig(root, defaultConfig());
    const previousTrace = process.env.AGENTPLANE_TRACE;
    process.env.AGENTPLANE_TRACE = "1";
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).toContain('"capability":"project"');
      expect(io.stderr).toContain('"capability":"config"');
      expect(io.stderr).toContain('"input_bytes":');
      expect(io.stderr).toContain('"output_bytes":');
      expect(io.stderr).toContain('"dependencies":');
      expect(io.stderr).toContain('"fingerprint_inputs":');
      expect(io.stderr).toContain('"invalidation_reasons":["no_prior_observation"]');
      expect(io.stderr).toContain('"cacheability":"exact"');
      expect(io.stderr).not.toContain('"node":"command_context"');
      expect(io.stderr).not.toContain('"capability":"provider"');
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

  it("keeps runtime explain available outside a configured project", async () => {
    const root = await mkTempDir();
    const previousTrace = process.env.AGENTPLANE_TRACE;
    process.env.AGENTPLANE_TRACE = "1";
    const io = captureStdIO();
    try {
      const code = await runCli(["runtime", "explain", "--json", "--root", root]);
      expect(code).toBe(0);
      expect(JSON.parse(io.stdout)).toMatchObject({
        repoCliExpectation: { state: "unconfigured" },
      });
      expect(io.stderr).toContain('"capability":"project"');
      expect(io.stderr).toContain('"capability":"config"');
      expect(io.stderr).not.toContain('"node":"command_context"');
      expect(io.stderr).not.toContain('"capability":"provider"');
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
    config.agents.approvals.require_plan = false;
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
      expect(io.stderr).toContain('"component":"preparation-graph"');
      expect(io.stderr).toContain('"node":"task_backend_read"');
      expect(io.stderr).toContain('"node":"policy_authority_decision"');
      expect(io.stderr).toContain('"cacheability":"none"');

      const nextCode = await runCli(["task", "next-action", taskId, "--explain", "--root", root]);
      expect(nextCode).toBe(0);
      expect(io.stderr).toContain('"node":"task_context_assembly"');
      expect(io.stderr).toContain('"node":"prompt_compilation"');
      expect(io.stderr).toContain('"node":"blueprint_resolution"');
      expect(io.stderr).toContain('"node":"knowledge_retrieval"');
      expect(io.stderr).toContain('"node":"rendering"');
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

  it("traces the branch_pr preparation graph without implicit provider access", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);

    const createIo = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Trace branch preparation",
        "--description",
        "Measure branch_pr preparation without remote access.",
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
      expect(io.stdout).toContain("branch_pr");
      expect(io.stderr).toContain('"node":"task_backend_read"');
      expect(io.stderr).toContain('"node":"policy_authority_decision"');
      expect(io.stderr).not.toContain('"node":"remote_provider_state"');
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
