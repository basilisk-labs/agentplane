/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
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
import { extractTaskSuffix } from "@agentplaneorg/core/commit";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import { getVersion } from "../meta/version.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
  loadPolicyTemplates,
} from "../agents/agents-template.js";
import { renderPolicyGatewayTemplateText } from "../shared/policy-gateway.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createRecipeArchive,
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

function normalizeSlashes(value: string): string {
  return value.replaceAll("\\", "/");
}

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("init rejects missing flags in non-tty mode", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Non-interactive init requires");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane init");
      expect(io.stderr).toContain("agentplane help init --compact");
    } finally {
      io.restore();
    }
  });

  it("init --setup-profile works in non-tty mode without explicit workflow flags", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--setup-profile", "light", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(".agentplane");
    } finally {
      io.restore();
    }

    const config = JSON.parse(
      await readFile(path.join(root, ".agentplane", "config.json"), "utf8"),
    ) as {
      workflow_mode: string;
      agents: {
        approvals: { require_network: boolean; require_plan: boolean; require_verify: boolean };
      };
    };
    expect(config.workflow_mode).toBe("direct");
    expect(config.agents.approvals.require_network).toBe(false);
    expect(config.agents.approvals.require_plan).toBe(false);
    expect(config.agents.approvals.require_verify).toBe(false);
  });

  it("init --setup-profile developer applies full-harness defaults in non-tty mode", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--root", root, "--setup-profile", "developer"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(".agentplane");
    } finally {
      io.restore();
    }

    const config = JSON.parse(
      await readFile(path.join(root, ".agentplane", "config.json"), "utf8"),
    ) as {
      agents: {
        approvals: { require_network: boolean; require_plan: boolean; require_verify: boolean };
      };
      execution: { profile: string; unsafe_actions_requiring_explicit_user_ok: string[] };
    };
    expect(config.agents.approvals.require_network).toBe(true);
    expect(config.agents.approvals.require_plan).toBe(true);
    expect(config.agents.approvals.require_verify).toBe(true);
    expect(config.execution.profile).toBe("conservative");
    expect(config.execution.unsafe_actions_requiring_explicit_user_ok).toContain(
      "Network actions when approvals are disabled.",
    );
  });

  it("init scopes to the target directory (does not climb to a parent git repo)", async () => {
    const parent = await mkGitRepoRoot();
    // Simulate a parent workspace with existing agentplane files that would conflict if init
    // accidentally targeted the parent git root.
    await writeDefaultConfig(parent);
    await mkdir(path.join(parent, ".agentplane", "backends", "local"), { recursive: true });
    await writeFile(
      path.join(parent, ".agentplane", "backends", "local", "backend.json"),
      '{"id":"local","version":"1","settings":{}}\n',
      "utf8",
    );
    await mkdir(path.join(parent, ".agentplane", "backends", "redmine"), { recursive: true });
    await writeFile(
      path.join(parent, ".agentplane", "backends", "redmine", "backend.json"),
      '{"id":"redmine","version":"1","settings":{}}\n',
      "utf8",
    );

    const child = path.join(parent, "magic_fresh_directory");
    await mkdir(child, { recursive: true });

    // Allow commits in the newly initialized child repo without requiring repo-local git config.
    const originalEnv = { ...process.env };
    process.env.GIT_AUTHOR_NAME = "Test User";
    process.env.GIT_AUTHOR_EMAIL = "test@example.com";
    process.env.GIT_COMMITTER_NAME = "Test User";
    process.env.GIT_COMMITTER_EMAIL = "test@example.com";

    const cwdSpy = vi.spyOn(process, "cwd").mockReturnValue(child);
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes"]);
      expect(code).toBe(0);
      expect(await pathExists(path.join(child, ".git"))).toBe(true);
      expect(await pathExists(path.join(child, ".agentplane", "config.json"))).toBe(true);
      expect(io.stderr).not.toContain("Init conflicts detected");
    } finally {
      io.restore();
      cwdSpy.mockRestore();
      process.env = originalEnv;
    }
  });

  it("init rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--wat", "x", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown option: --wat");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane init");
    } finally {
      io.restore();
    }
  });

  it("init rejects unexpected arguments", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unexpected argument: extra");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane init");
    } finally {
      io.restore();
    }
  });

  it("init rejects invalid --ide values", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--ide", "vscode", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid value for --ide: vscode");
      expect(io.stderr).toContain("expected one of");
    } finally {
      io.restore();
    }
  });

  it("init rejects invalid --workflow values", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--workflow", "fast", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid value for --workflow: fast");
      expect(io.stderr).toContain("expected one of");
    } finally {
      io.restore();
    }
  });

  it("init rejects invalid --hooks values", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--hooks", "maybe", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid value for --hooks");
    } finally {
      io.restore();
    }
  });

  it("init refuses to overwrite existing config", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    await runCliSilent(["init", "--yes", "--root", root]);
    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--root", root]);
      expect(code).toBe(4);
      const error = normalizeSlashes(io.stderr);
      expect(error).toContain("Init conflicts detected");
      expect(error).toContain(".agentplane/config.json");
    } finally {
      io.restore();
    }
  });

  it("init surfaces unmanaged hook conflicts before writing agentplane files", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    await mkdir(path.join(root, ".git", "hooks"), { recursive: true });
    await writeFile(path.join(root, ".git", "hooks", "commit-msg"), "custom", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--hooks", "yes", "--root", root]);
      expect(code).toBe(4);
      const error = normalizeSlashes(io.stderr);
      expect(error).toContain("Init conflicts detected");
      expect(error).toContain(".git/hooks/commit-msg");
    } finally {
      io.restore();
    }

    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(false);
  });

  it("init vendors selected cached recipes into the project", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const { archivePath } = await createRecipeArchive({ id: "viewer", version: "1.2.3" });
    await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--recipes", "viewer", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(
      await pathExists(
        path.join(root, ".agentplane", "recipes", "packages", "viewer", "manifest.json"),
      ),
    ).toBe(true);
    expect(
      JSON.parse(
        await readFile(path.join(root, ".agentplane", "recipes", "registry.json"), "utf8"),
      ),
    ).toMatchObject({
      recipes: [
        expect.objectContaining({
          id: "viewer",
          path: "packages/viewer",
          active: true,
        }),
      ],
    });

    const activeIo = captureStdIO();
    try {
      const code = await runCli(["recipes", "active", "--root", root]);
      expect(code).toBe(0);
      expect(activeIo.stdout).toContain("viewer@1.2.3 [project_overlay]");
    } finally {
      activeIo.restore();
    }

    const explainIo = captureStdIO();
    try {
      const code = await runCli(["recipes", "explain-active", "--root", root]);
      expect(code).toBe(0);
      expect(explainIo.stdout).toContain('"id": "viewer"');
      expect(explainIo.stdout).toContain('"kind": "overlay_bundle"');
    } finally {
      explainIo.restore();
    }
  });

  it("init lists conflicts for existing files by default", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const agentplaneDir = path.join(root, ".agentplane");
    const configPath = path.join(agentplaneDir, "config.json");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.join(agentplaneDir, "backends", "local"), { recursive: true });
    await writeFile(configPath, "legacy-config", "utf8");
    await writeFile(backendPath, "legacy-backend", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--root", root]);
      expect(code).toBe(4);
      const error = normalizeSlashes(io.stderr);
      expect(error).toContain("Init conflicts detected");
      expect(error).toContain(".agentplane/config.json");
      expect(error).toContain(".agentplane/backends/local/backend.json");
      expect(error).toContain("--force");
      expect(error).toContain("--backup");
    } finally {
      io.restore();
    }
  });

  it("init does not write agent files before reporting config/backend conflicts", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const agentplaneDir = path.join(root, ".agentplane");
    const configPath = path.join(agentplaneDir, "config.json");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.join(agentplaneDir, "backends", "local"), { recursive: true });
    await writeFile(configPath, "legacy-config", "utf8");
    await writeFile(backendPath, "legacy-backend", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--root", root]);
      expect(code).toBe(4);
      expect(await pathExists(path.join(root, "AGENTS.md"))).toBe(false);
      expect(await pathExists(path.join(root, ".agentplane", "agents", "CODER.json"))).toBe(false);
      const error = normalizeSlashes(io.stderr);
      expect(error).toContain("Init conflicts detected");
      expect(error).toContain(".agentplane/config.json");
      expect(error).toContain(".agentplane/backends/local/backend.json");
    } finally {
      io.restore();
    }
  });

  it("init --force overwrites conflicting files", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const agentplaneDir = path.join(root, ".agentplane");
    const configPath = path.join(agentplaneDir, "config.json");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.join(agentplaneDir, "backends", "local"), { recursive: true });
    await writeFile(configPath, "legacy-config", "utf8");
    await writeFile(backendPath, "legacy-backend", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--force", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const configText = await readFile(configPath, "utf8");
    expect(configText).toContain('"workflow_mode": "direct"');
  });

  it("init --backup preserves conflicting files with timestamped backups", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const agentplaneDir = path.join(root, ".agentplane");
    const configPath = path.join(agentplaneDir, "config.json");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.join(agentplaneDir, "backends", "local"), { recursive: true });
    await writeFile(configPath, "legacy-config", "utf8");
    await writeFile(backendPath, "legacy-backend", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--backup", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const agentplaneEntries = await readdir(agentplaneDir);
    expect(agentplaneEntries.some((entry) => entry.startsWith("config.json.bak-"))).toBe(true);

    const backendEntries = await readdir(path.join(agentplaneDir, "backends", "local"));
    expect(backendEntries.some((entry) => entry.startsWith("backend.json.bak-"))).toBe(true);

    const configText = await readFile(configPath, "utf8");
    expect(configText).toContain('"workflow_mode": "direct"');
  });
});
