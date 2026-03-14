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

import {
  defaultConfig,
  extractTaskSuffix,
  readTask,
  renderTaskReadme,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
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

function normalizeSlashes(value: string): string {
  return value.replaceAll("\\", "/");
}

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("upgrade applies bundle changes by default and cleans backup artifacts", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "legacy agents", "utf8");
    await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "agents", "ORCHESTRATOR.json"),
      '{"legacy":true}\n',
      "utf8",
    );

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "AGENTS.md": "# AGENTS\n\nUpdated\n",
      ".agentplane/agents/ORCHESTRATOR.json": '{"updated":true}\n',
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "upgrade",
        "--bundle",
        bundlePath,
        "--checksum",
        checksumPath,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Upgrade applied");
      expect(io.stdout).toContain("Upgrade commit:");
    } finally {
      io.restore();
    }

    const agentsText = await readFile(path.join(root, "AGENTS.md"), "utf8");
    expect(agentsText).toContain("Updated");

    const agentEntries = await readdir(path.join(root, ".agentplane", "agents"));
    expect(agentEntries.some((entry) => entry.startsWith("ORCHESTRATOR.json.bak-"))).toBe(false);
    const rootEntries = await readdir(root);
    expect(rootEntries.some((entry) => entry.startsWith("AGENTS.md.bak-"))).toBe(false);

    const execFileAsync = promisify(execFile);
    const { stdout: subjectOut } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const subject = String(subjectOut ?? "").trim();
    expect(subject).toContain("upgrade: apply framework");
  });

  it("upgrade --dry-run reports changes without modifying files", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "legacy agents", "utf8");

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "AGENTS.md": "# AGENTS\n\nUpdated\n",
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "upgrade",
        "--dry-run",
        "--bundle",
        bundlePath,
        "--checksum",
        checksumPath,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Upgrade dry-run");
    } finally {
      io.restore();
    }

    const agentsText = await readFile(path.join(root, "AGENTS.md"), "utf8");
    expect(agentsText).toContain("legacy agents");
    const rootEntries = await readdir(root);
    expect(rootEntries.some((entry) => entry.startsWith("AGENTS.md.bak-"))).toBe(false);
  });

  it(
    "upgrade restores workflow runtime artifacts even when managed files are otherwise unchanged",
    { timeout: 60_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      try {
        const code = await runCli(["init", "--yes", "--root", root]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      const workflowPath = path.join(root, ".agentplane", "WORKFLOW.md");
      const lastKnownGoodPath = path.join(root, ".agentplane", "workflows", "last-known-good.md");
      await rm(workflowPath, { force: true });
      await rm(lastKnownGoodPath, { force: true });
      await commitAll(root, "✨ fixture: remove workflow runtime artifacts");

      io = captureStdIO();
      try {
        const code = await runCli(["upgrade", "--yes", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("Workflow artifacts refreshed:");
      } finally {
        io.restore();
      }

      expect(await pathExists(workflowPath)).toBe(true);
      expect(await pathExists(lastKnownGoodPath)).toBe(true);
      const workflowText = await readFile(workflowPath, "utf8");
      const snapshotText = await readFile(lastKnownGoodPath, "utf8");
      expect(snapshotText).toBe(workflowText);

      io = captureStdIO();
      const doctorSpy = vi.spyOn(console, "error").mockImplementation(() => {
        /* captured separately for assertion */
      });
      try {
        const code = await runCli(["doctor", "--root", root]);
        expect(code).toBe(0);
        const output = `${io.stdout}\n${io.stderr}\n${doctorSpy.mock.calls.flat().join("\n")}`;
        expect(output).not.toContain("WF_MISSING_FILE");
      } finally {
        doctorSpy.mockRestore();
        io.restore();
      }
    },
  );

  it(
    "recovers a legacy README v2 task after upgrade via task migrate-doc and export",
    { timeout: 60_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      try {
        const code = await runCli(["init", "--yes", "--root", root]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      io = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Legacy README migration target",
          "--description",
          "Exercise the README v2 to v3 recovery path.",
          "--priority",
          "med",
          "--owner",
          "TESTER",
          "--tag",
          "code",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const match = /\b\d{12}-[A-Z0-9]{6}\b/.exec(io.stdout);
        expect(match).not.toBeNull();
        taskId = match?.[0] ?? "";
      } finally {
        io.restore();
      }

      const taskDir = path.join(root, ".agentplane", "tasks", taskId);
      const readmePath = path.join(taskDir, "README.md");
      const legacyReadme = `---
id: "${taskId}"
title: "Legacy README migration target"
status: "TODO"
priority: "med"
owner: "TESTER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-03-08T00:00:00.000Z"
doc_updated_by: "TESTER"
description: "Exercise the README v2 to v3 recovery path."
id_source: "generated"
---
## Summary

Legacy README migration target

Exercise the README v2 to v3 recovery path.

## Scope

- In scope: legacy README v2 recovery.
- Out of scope: unrelated refactors.

## Plan

1. Upgrade the framework files.
2. Migrate task docs.

## Verify Steps

### Scope
- Primary tag: \`code\`

### Checks
- Confirm upgrade and migration work end to end.

### Evidence / Commands
- Record the recovery commands.

### Pass criteria
- The project ends on README v3.

## Verification

### Plan

Legacy verification plan.

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the upgrade commit.

## Notes

- Legacy task placeholder.
`;
      await writeFile(readmePath, legacyReadme, "utf8");

      io = captureStdIO();
      try {
        const code = await runCli(["task", "export", "--root", root]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
      await commitAll(root, "✨ fixture: legacy readme v2");

      io = captureStdIO();
      const doctorWarn = vi.spyOn(console, "error").mockImplementation(() => {
        /* captured separately for assertion */
      });
      try {
        const code = await runCli(["doctor", "--root", root]);
        expect(code).toBe(0);
        const doctorOutput = `${io.stdout}\n${io.stderr}\n${doctorWarn.mock.calls.flat().join("\n")}`;
        expect(doctorOutput).toContain("agentplane task migrate-doc --all");
        expect(doctorOutput).toContain("active legacy");
      } finally {
        doctorWarn.mockRestore();
        io.restore();
      }

      io = captureStdIO();
      try {
        const code = await runCli(["upgrade", "--yes", "--root", root]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      io = captureStdIO();
      try {
        const code = await runCli(["task", "migrate-doc", "--all", "--root", root]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      io = captureStdIO();
      try {
        const code = await runCli(["task", "export", "--root", root]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      const migratedReadme = await readFile(readmePath, "utf8");
      expect(migratedReadme).toContain("doc_version: 3");
      expect(migratedReadme).toContain("revision: 1");
      expect(migratedReadme).toContain("sections:");
      expect(migratedReadme).toContain("## Findings");
      expect(migratedReadme).not.toContain("## Notes");
      expect(migratedReadme).not.toContain("### Plan");
      expect(migratedReadme).not.toContain("### Results");

      const tasksExportText = await readFile(path.join(root, ".agentplane", "tasks.json"), "utf8");
      const tasksExport = JSON.parse(tasksExportText) as {
        tasks?: {
          id?: string;
          doc_version?: number;
          revision?: number;
          sections?: Record<string, string>;
        }[];
      };
      const migratedTask = tasksExport.tasks?.find((task) => task.id === taskId);
      expect(migratedTask?.doc_version).toBe(3);
      expect(migratedTask?.revision).toBe(1);

      io = captureStdIO();
      const doctorClean = vi.spyOn(console, "error").mockImplementation(() => {
        /* captured separately for assertion */
      });
      try {
        const code = await runCli(["doctor", "--root", root]);
        expect(code).toBe(0);
        const doctorOutput = `${io.stdout}\n${io.stderr}\n${doctorClean.mock.calls.flat().join("\n")}`;
        expect(doctorOutput).not.toContain("agentplane task migrate-doc --all");
        expect(doctorOutput).not.toContain("active legacy");
      } finally {
        doctorClean.mockRestore();
        io.restore();
      }
    },
  );

  it("upgrade fails on dirty tracked tree before applying in default apply mode", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "legacy agents", "utf8");
    await writeFile(path.join(root, "tracked.txt"), "dirty\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "tracked.txt"], { cwd: root, env: cleanGitEnv() });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root, env: cleanGitEnv() });
    await writeFile(path.join(root, "tracked.txt"), "dirty changed\n", "utf8");

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "AGENTS.md": "# AGENTS\n\nUpdated\n",
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "upgrade",
        "--bundle",
        bundlePath,
        "--checksum",
        checksumPath,
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("requires a clean tracked working tree");
    } finally {
      io.restore();
    }
  });

  it("upgrade requires --yes in non-tty mode when require_network=true and it would fetch remote assets", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["upgrade", "--remote", "--dry-run", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("--yes");
    } finally {
      io.restore();
    }
  });

  it("upgrade validates bundle/checksum flag combinations", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "AGENTS.md": "# AGENTS\n\nUpdated\n",
    });

    const cases = [
      {
        args: ["upgrade", "--bundle", bundlePath, "--root", root],
        msg: "Options --bundle and --checksum must be provided together",
      },
      {
        args: ["upgrade", "--checksum", checksumPath, "--root", root],
        msg: "Options --bundle and --checksum must be provided together",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli(entry.args);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
        expect(io.stderr).toContain("Usage:");
        expect(io.stderr).toContain("agentplane upgrade");
        expect(io.stderr).toContain("agentplane help upgrade --compact");
      } finally {
        io.restore();
      }
    }
  });

  it("upgrade parses extended flags with a bundle", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "legacy agents", "utf8");

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "AGENTS.md": "# AGENTS\n\nUpdated\n",
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "upgrade",
        "--dry-run",
        "--no-backup",
        "--tag",
        "v1.0.0",
        "--asset",
        "agentplane-upgrade.tar.gz",
        "--checksum-asset",
        "agentplane-upgrade.tar.gz.sha256",
        "--bundle",
        bundlePath,
        "--checksum",
        checksumPath,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Upgrade dry-run");
    } finally {
      io.restore();
    }
  });

  it("upgrade rejects non-github framework sources", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const configPath = path.join(root, ".agentplane", "config.json");
    const config = JSON.parse(await readFile(configPath, "utf8")) as Record<string, unknown>;
    (config.framework as Record<string, unknown>).source = "https://example.com/agentplane";
    await writeFile(configPath, JSON.stringify(config, null, 2), "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["upgrade", "--remote", "--dry-run", "--root", root]);
      expect(code).toBe(1);
      expect(io.stderr).toContain("Invalid field config.framework.source: expected GitHub URL");
    } finally {
      io.restore();
    }
  });

  it("upgrade rejects unexpected positional args", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["upgrade", "extra"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unexpected argument: extra");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane upgrade");
    } finally {
      io.restore();
    }
  });
});
