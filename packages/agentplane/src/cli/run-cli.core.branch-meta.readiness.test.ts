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
  it("ready reports readiness details", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const depId = "202601301111-READY01";
    const taskId = "202601301111-READY02";

    await runCliSilent([
      "task",
      "add",
      depId,
      "--title",
      "Dep task",
      "--description",
      "Dep",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--root",
      root,
    ]);
    await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Main task",
      "--description",
      "Main",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--depends-on",
      depId,
      "--root",
      root,
    ]);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    await runCliSilent([
      "verify",
      depId,
      "--ok",
      "--by",
      "TESTER",
      "--note",
      "Ok to finish dependency",
      "--quiet",
      "--root",
      root,
    ]);
    await runCliSilent([
      "finish",
      depId,
      "--author",
      "INTEGRATOR",
      "--body",
      "Verified: dependency completed for readiness test; checks done locally; no issues found.",
      "--result",
      "ready: finish dependency",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["ready", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`Task: ${taskId}`);
      expect(io.stdout).toContain("✅ ready");
    } finally {
      io.restore();
    }
  });

  it("ready reports missing dependencies", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = "202601301111-READY03";
    await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Waiting task",
      "--description",
      "Waiting",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--depends-on",
      "202601301111-MISSING",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["ready", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(io.stdout).toContain("missing deps");
      expect(io.stdout).toContain("⚠️ not ready");
    } finally {
      io.restore();
    }
  });

  it("quickstart prints CLI help output", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["quickstart", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("agentplane quickstart");
      expect(io.stdout).toContain("agentplane init");
    } finally {
      io.restore();
    }
  });

  it("quickstart --json emits compact machine-readable payload", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["quickstart", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        source_of_truth?: { workflow_policy?: string };
        lines?: string[];
      };
      expect(payload.source_of_truth?.workflow_policy).toBe("AGENTS.md|CLAUDE.md");
      expect(Array.isArray(payload.lines)).toBe(true);
      expect((payload.lines ?? []).some((line) => line.includes("agentplane init"))).toBe(true);
    } finally {
      io.restore();
    }
  });

  it("preflight --json aggregates readiness in one command", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--mode", "full", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        mode?: unknown;
        project_detected?: unknown;
        config_loaded?: { ok?: unknown };
        quickstart_loaded?: { ok?: unknown };
        task_list_loaded?: { ok?: unknown };
        current_branch?: { ok?: unknown };
        workflow_mode?: unknown;
        harness_health?: { status?: string; reasons?: string[] };
        next_actions?: unknown;
      };
      expect(payload.mode).toBe("full");
      expect(payload.project_detected).toBe(true);
      expect(payload.config_loaded).toMatchObject({ ok: true });
      expect(payload.quickstart_loaded).toMatchObject({ ok: true });
      expect(payload.task_list_loaded).toMatchObject({ ok: true });
      expect(payload.current_branch).toMatchObject({ ok: true });
      expect(payload.workflow_mode).toBe("direct");
      expect(payload.harness_health?.status).toBe("warn");
      expect(payload.harness_health?.reasons).toContain("workflow_contract_invalid");
      expect(Array.isArray(payload.next_actions)).toBe(true);
    } finally {
      io.restore();
    }
  });

  it("preflight --json uses quick mode by default and skips task backend probe", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        mode?: unknown;
        task_list_loaded?: { ok?: unknown; error?: string };
        harness_health?: { status?: string; reasons?: string[] };
      };
      expect(payload.mode).toBe("quick");
      expect(payload.task_list_loaded?.ok).toBe(false);
      expect(payload.task_list_loaded?.error).toContain("skipped in quick mode");
      expect(payload.harness_health?.status).toBe("warn");
      expect(payload.harness_health?.reasons).toEqual(
        expect.arrayContaining(["workflow_contract_invalid"]),
      );
    } finally {
      io.restore();
    }
  });

  it("preflight --json supports workflow kill-switch via env", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const prev = process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT;
    process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT = "off";
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        workflow_loaded?: { ok?: boolean; error?: string };
        harness_health?: { status?: string; reasons?: string[] };
      };
      expect(payload.workflow_loaded?.ok).toBe(true);
      expect(payload.workflow_loaded?.error).toContain("workflow checks disabled");
      expect(payload.harness_health?.status).toBe("ok");
      expect(payload.harness_health?.reasons).toEqual([]);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT;
      else process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT = prev;
    }
  });

  it("preflight --json in non-project suggests init", async () => {
    const root = await mkTempDir();
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        project_detected?: unknown;
        next_actions?: { command?: string }[];
      };
      expect(payload.project_detected).toBe(false);
      const commands = Array.isArray(payload.next_actions)
        ? payload.next_actions.map((v) => String(v.command ?? ""))
        : [];
      expect(commands).toContain("agentplane init");
    } finally {
      io.restore();
    }
  });
});
