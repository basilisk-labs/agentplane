/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  copyFile,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";

import {
  defaultConfig,
  extractTaskSuffix,
  readTask,
  renderTaskReadme,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "./run-cli.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("workflow build --validate --dry-run validates candidate without publishing", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "agents", "ORCHESTRATOR.json"),
      '{\n  "role": "orchestrator"\n}\n',
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await runCli(["workflow", "build", "--validate", "--dry-run", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("## Prompt Template");
      expect(await pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).toBe(false);
    } finally {
      io.restore();
    }
  });

  it("workflow restore recovers active workflow from last-known-good snapshot", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "agents", "ORCHESTRATOR.json"),
      '{\n  "role": "orchestrator"\n}\n',
      "utf8",
    );

    const ioBuild = captureStdIO();
    try {
      const code = await runCli(["workflow", "build", "--validate", "--root", root]);
      expect(code).toBe(0);
    } finally {
      ioBuild.restore();
    }

    const workflowPath = path.join(root, ".agentplane", "WORKFLOW.md");
    await writeFile(workflowPath, "---\nversion: bad\n---\n\n## Prompt Template\nx\n", "utf8");

    const ioRestore = captureStdIO();
    try {
      const code = await runCli(["workflow", "restore", "--root", root]);
      expect(code).toBe(0);
      const restored = await readFile(workflowPath, "utf8");
      expect(restored).toContain("## Prompt Template");
      expect(restored).toContain("last_known_good");
    } finally {
      ioRestore.restore();
    }
  });

  it("workflow restore fails with actionable error when snapshot is missing", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["workflow", "restore", "--root", root]);
      expect(code).toBe(1);
      expect(io.stderr).toContain("workflow restore failed");
      expect(io.stderr).toContain("WF_MISSING_FILE");
    } finally {
      io.restore();
    }
  });

  it(
    "workflow debug/sync/land run built-in core operations and write evidence files",
    { timeout: 180_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);
      await runCliSilent(["init", "--yes", "--root", root]);
      // workflow playbooks invoke the repo-local bin entrypoint in a subprocess.
      // In test runs, that bin may still point to an older built artifact, so mirror
      // the active workflow contract to the legacy root path to keep the playbook
      // behavior deterministic while unit tests run against source modules.
      await copyFile(path.join(root, ".agentplane", "WORKFLOW.md"), path.join(root, "WORKFLOW.md"));
      const modes = ["debug", "sync", "land"] as const;

      for (const mode of modes) {
        const io = captureStdIO();
        try {
          const code = await runCli(["workflow", mode, "--root", root]);
          expect(code).toBe(0);
          const match = /Evidence:\s+(.+\.json)/.exec(io.stdout);
          expect(match).not.toBeNull();
          const evidenceRel = String(match?.[1] ?? "").trim();
          const evidencePath = path.join(root, evidenceRel);
          expect(await pathExists(evidencePath)).toBe(true);
          const payload = JSON.parse(await readFile(evidencePath, "utf8")) as {
            mode?: string;
            status?: string;
            commands?: unknown[];
          };
          expect(payload.mode).toBe(mode);
          expect(payload.status).toBe("success");
          expect(Array.isArray(payload.commands)).toBe(true);
          expect((payload.commands ?? []).length).toBeGreaterThan(0);
        } finally {
          io.restore();
        }
      }
    },
  );

  it("profile set applies preset defaults to config", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["profile", "set", "light", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("light");
      const rawConfig = JSON.parse(
        await readFile(path.join(root, ".agentplane", "config.json"), "utf8"),
      ) as {
        agents?: { approvals?: { require_plan?: boolean; require_network?: boolean } };
        execution?: { profile?: string };
      };
      expect(rawConfig.agents?.approvals?.require_plan).toBe(false);
      expect(rawConfig.agents?.approvals?.require_network).toBe(false);
      expect(rawConfig.execution?.profile).toBe("aggressive");
    } finally {
      io.restore();
    }
  });

  it("role prints role guidance", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["role", "CODER", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("### CODER");
      expect(io.stdout).toContain("agentplane task start-ready");
    } finally {
      io.restore();
    }
  });

  it("role --json emits compact role payload", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["role", "CODER", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as { role?: string; builtin_guide?: string[] };
      expect(payload.role).toBe("CODER");
      expect(Array.isArray(payload.builtin_guide)).toBe(true);
      expect(
        (payload.builtin_guide ?? []).some((line) => line.includes("agentplane task start-ready")),
      ).toBe(true);
    } finally {
      io.restore();
    }
  });

  it("agents lists agent json files", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Code changes" }, null, 2),
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await runCli(["agents", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("ID");
      expect(io.stdout).toContain("CODER");
    } finally {
      io.restore();
    }
  });
});
