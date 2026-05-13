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
import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
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
} from "@agentplane/testkit";
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
      expect(await pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).toBe(true);
      expect(
        await pathExists(path.join(root, ".agentplane", "workflows", "last-known-good.md")),
      ).toBe(true);
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
    await rm(path.join(root, ".agentplane", "workflows", "last-known-good.md"), { force: true });
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
          expect(code, `stdout:\n${io.stdout}\nstderr:\n${io.stderr}`).toBe(0);
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
      const workflowText = await readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8");
      expect(workflowText).toContain("require_plan: false");
      expect(workflowText).toContain("require_network: false");
      expect(workflowText).toContain("profile: aggressive");
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

  it("evaluator list/show exposes prompt modules without evaluator run", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const evaluatorsDir = path.join(root, ".agentplane", "evaluators");
    await mkdir(evaluatorsDir, { recursive: true });
    await writeFile(
      path.join(evaluatorsDir, "custom-review.md"),
      [
        "---",
        "id: custom-review",
        "title: Custom Review",
        "version: 1",
        "status: preview",
        "profile: EVALUATOR",
        "tags:",
        "  - review",
        "---",
        "",
        "# Custom Review",
        "",
        "Review the diff.",
        "",
      ].join("\n"),
      "utf8",
    );

    const listIo = captureStdIO();
    try {
      const code = await runCli(["evaluator", "list", "--root", root]);
      expect(code).toBe(0);
      expect(listIo.stdout).toContain("custom-review");
      expect(listIo.stdout).toContain("recovery-context");
    } finally {
      listIo.restore();
    }

    const showIo = captureStdIO();
    try {
      const code = await runCli(["evaluator", "show", "custom-review", "--root", root]);
      expect(code).toBe(0);
      expect(showIo.stdout).toContain("# Custom Review");
      expect(showIo.stdout).toContain("Review the diff.");
    } finally {
      showIo.restore();
    }

    const helpIo = captureStdIO();
    try {
      const code = await runCli(["help", "evaluator", "--root", root]);
      expect(code).toBe(0);
      expect(helpIo.stdout).toContain("evaluator list");
      expect(helpIo.stdout).toContain("evaluator show");
      expect(helpIo.stdout).not.toContain("evaluator run");
    } finally {
      helpIo.restore();
    }
  });
});
