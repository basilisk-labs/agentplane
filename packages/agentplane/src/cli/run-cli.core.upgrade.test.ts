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
import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
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
import { withContextPolicyGatewayText } from "../shared/policy-gateway.js";

function normalizeSlashes(value: string): string {
  return value.replaceAll("\\", "/");
}

const WORKFLOW_RUNTIME_ARTIFACTS_TIMEOUT_MS = os.platform() === "win32" ? 120_000 : 60_000;

installRunCliIntegrationHarness();

describe("runCli", () => {
  it(
    "upgrade applies bundle changes by default and cleans backup artifacts",
    { timeout: 60_000 },
    async () => {
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
        expect(io.stderr).not.toContain("task migrate-doc --all");
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
    },
  );

  it("upgrade renders managed markdown assets before writing installed policy files", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "legacy agents", "utf8");
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "policy", "dod.code.md"), "legacy policy\n");

    const { bundlePath, checksumPath } = await createUpgradeBundle({
      "policy/dod.code.md": [
        '<!-- ap:fragment id="policy.dod.code.body.dod.code" slot="body" mutability="replaceable" -->',
        "",
        "# DoD: code",
        "",
        "Rendered policy body.",
        "<!-- /ap:fragment -->",
      ].join("\n"),
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
    } finally {
      io.restore();
    }

    const policyText = await readFile(
      path.join(root, ".agentplane", "policy", "dod.code.md"),
      "utf8",
    );
    expect(policyText).toContain("Rendered policy body.");
    expect(policyText).not.toContain("ap:fragment");
  });

  it(
    "upgrade removes context policy references for workspaces without context layer",
    { timeout: WORKFLOW_RUNTIME_ARTIFACTS_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      try {
        expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      const gatewayPath = path.join(root, "AGENTS.md");
      const gatewayText = await readFile(gatewayPath, "utf8");
      await writeFile(gatewayPath, withContextPolicyGatewayText(gatewayText), "utf8");
      await rm(path.join(root, ".agentplane", "policy", "context.must.md"), { force: true });
      await commitAll(root, "fixture: stale context gateway without context layer");

      io = captureStdIO();
      try {
        expect(await runCli(["upgrade", "--yes", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      const upgradedGateway = await readFile(gatewayPath, "utf8");
      expect(upgradedGateway).not.toContain("@.agentplane/policy/context.must.md");
      await expect(
        pathExists(path.join(root, ".agentplane", "policy", "context.must.md")),
      ).resolves.toBe(false);

      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("node", [".agentplane/policy/check-routing.mjs"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      expect(String(stdout ?? "")).toContain("policy routing OK");
    },
  );

  it(
    "upgrade installs context policy only for initialized context workspaces",
    { timeout: WORKFLOW_RUNTIME_ARTIFACTS_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      try {
        expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
        expect(await runCli(["context", "init", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      const contextPolicyPath = path.join(root, ".agentplane", "policy", "context.must.md");
      await rm(contextPolicyPath, { force: true });
      await commitAll(root, "fixture: missing context policy in initialized context workspace");

      io = captureStdIO();
      try {
        expect(await runCli(["upgrade", "--yes", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      const gatewayText = await readFile(path.join(root, "AGENTS.md"), "utf8");
      const contextPolicyText = await readFile(contextPolicyPath, "utf8");
      expect(gatewayText).toContain("@.agentplane/policy/context.must.md");
      expect(contextPolicyText).toContain("ap context search");
      expect(contextPolicyText).not.toContain("ap:fragment");

      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("node", [".agentplane/policy/check-routing.mjs"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      expect(String(stdout ?? "")).toContain("policy routing OK");
    },
  );

  it(
    "upgrade includes runtime .gitignore cache lines in the upgrade commit",
    { timeout: WORKFLOW_RUNTIME_ARTIFACTS_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      try {
        expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      const gitignorePath = path.join(root, ".gitignore");
      const gitignoreBeforeUpgrade = await readFile(gitignorePath, "utf8");
      const staleGitignore = gitignoreBeforeUpgrade
        .split(/\r?\n/u)
        .filter(
          (line) =>
            line !== ".agentplane/cache.sqlite" &&
            line !== ".agentplane/cache.sqlite-wal" &&
            line !== ".agentplane/cache.sqlite-shm",
        )
        .join("\n");
      await writeFile(gitignorePath, `${staleGitignore.trimEnd()}\n`, "utf8");
      await commitAll(root, "fixture: stale runtime gitignore");

      io = captureStdIO();
      try {
        expect(await runCli(["upgrade", "--yes", "--root", root])).toBe(0);
        expect(io.stdout).toContain("Upgrade commit:");
      } finally {
        io.restore();
      }

      const gitignoreText = await readFile(gitignorePath, "utf8");
      expect(gitignoreText).toContain(".agentplane/cache.sqlite");
      expect(gitignoreText).toContain(".agentplane/cache.sqlite-wal");
      expect(gitignoreText).toContain(".agentplane/cache.sqlite-shm");

      const execFileAsync = promisify(execFile);
      const { stdout: statusOut } = await execFileAsync(
        "git",
        ["status", "--short", "--untracked-files=no"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      expect(String(statusOut ?? "").trim()).toBe("");

      const { stdout: showOut } = await execFileAsync(
        "git",
        ["show", "--name-only", "--format=", "HEAD"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      expect(String(showOut ?? "")).toContain(".gitignore");
    },
  );

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
    { timeout: WORKFLOW_RUNTIME_ARTIFACTS_TIMEOUT_MS },
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
    "upgrade commits tracked legacy config removal when migrating to WORKFLOW-only config",
    { timeout: WORKFLOW_RUNTIME_ARTIFACTS_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      const configPath = path.join(root, ".agentplane", "config.json");
      const workflowPath = path.join(root, ".agentplane", "WORKFLOW.md");
      const lastKnownGoodPath = path.join(root, ".agentplane", "workflows", "last-known-good.md");
      await mkdir(path.dirname(configPath), { recursive: true });
      await writeFile(configPath, JSON.stringify(defaultConfig(), null, 2) + "\n", "utf8");
      await commitAll(root, "✨ fixture: tracked legacy config");

      const io = captureStdIO();
      try {
        const code = await runCli(["upgrade", "--yes", "--no-backup", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("Upgrade commit:");
      } finally {
        io.restore();
      }

      await expect(pathExists(configPath)).resolves.toBe(false);
      await expect(pathExists(workflowPath)).resolves.toBe(true);
      await expect(pathExists(lastKnownGoodPath)).resolves.toBe(true);

      const execFileAsync = promisify(execFile);
      const { stdout: statusOut } = await execFileAsync(
        "git",
        ["status", "--short", "--untracked-files=no"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      expect(String(statusOut ?? "").trim()).toBe("");

      const { stdout: showOut } = await execFileAsync(
        "git",
        ["show", "--name-status", "--format=", "--no-renames", "HEAD"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      expect(String(showOut ?? "")).toContain("D\t.agentplane/config.json");
      expect(String(showOut ?? "")).toContain("A\t.agentplane/WORKFLOW.md");
    },
  );

  it(
    "recovers a legacy README v2 task after upgrade via task migrate-doc",
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

      await commitAll(root, "✨ fixture: legacy readme v2");

      io = captureStdIO();
      const doctorWarn = vi.spyOn(console, "error").mockImplementation(() => {
        /* captured separately for assertion */
      });
      try {
        const code = await runCli(["doctor", "--root", root]);
        expect(code).toBe(0);
        const doctorOutput = `${io.stdout}\n${io.stderr}\n${doctorWarn.mock.calls.flat().join("\n")}`;
        expect(doctorOutput).not.toContain("agentplane task migrate-doc --all");
        expect(doctorOutput).not.toContain("active legacy");
      } finally {
        doctorWarn.mockRestore();
        io.restore();
      }

      io = captureStdIO();
      try {
        const code = await runCli(["upgrade", "--yes", "--root", root]);
        expect(code).toBe(0);
        expect(io.stderr).not.toContain(
          "upgrade post-check: task README migration follow-up detected",
        );
        expect(io.stderr).not.toContain("task README format is still on legacy v2");
        expect(io.stderr).not.toContain("agentplane task migrate-doc --all");
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

      const migratedReadme = await readFile(readmePath, "utf8");
      expect(migratedReadme).toContain("doc_version: 3");
      expect(migratedReadme).toContain("revision: 1");
      expect(migratedReadme).toContain("sections:");
      expect(migratedReadme).toContain("Findings:");
      expect(migratedReadme).not.toContain("## Notes");
      expect(migratedReadme).not.toContain("### Plan");
      expect(migratedReadme).not.toContain("### Results");

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

  it(
    "upgrade --migrate-task-docs recovers a legacy README v2 task in one run",
    { timeout: 60_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      try {
        expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      io = captureStdIO();
      let taskId = "";
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Legacy README bridge target",
            "--description",
            "Exercise the opt-in upgrade README bridge.",
            "--priority",
            "med",
            "--owner",
            "TESTER",
            "--tag",
            "code",
            "--root",
            root,
          ]),
        ).toBe(0);
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
title: "Legacy README bridge target"
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
description: "Exercise the opt-in upgrade README bridge."
id_source: "generated"
---
## Summary

Legacy README bridge target

Exercise the opt-in upgrade README bridge.

## Scope

- In scope: legacy README v2 recovery.
- Out of scope: unrelated refactors.

## Plan

1. Upgrade the framework files.
2. Migrate task docs in the same run.

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

      await commitAll(root, "✨ fixture: legacy readme v2 for upgrade bridge");

      io = captureStdIO();
      try {
        expect(await runCli(["upgrade", "--yes", "--migrate-task-docs", "--root", root])).toBe(0);
        expect(io.stdout).toContain("Task README migration: changed=1");
        expect(io.stderr).not.toContain("agentplane task migrate-doc --all");
      } finally {
        io.restore();
      }

      const migratedReadme = await readFile(readmePath, "utf8");
      expect(migratedReadme).toContain("doc_version: 3");
      expect(migratedReadme).toContain("revision: 1");
      expect(migratedReadme).toContain("sections:");
      expect(migratedReadme).toContain("Findings:");
      expect(migratedReadme).not.toContain("## Notes");
      expect(migratedReadme).not.toContain("### Plan");
      expect(migratedReadme).not.toContain("### Results");

      expect(migratedReadme).toContain("Legacy task placeholder.");

      io = captureStdIO();
      const doctorClean = vi.spyOn(console, "error").mockImplementation(() => {
        /* captured separately for assertion */
      });
      try {
        expect(await runCli(["doctor", "--root", root])).toBe(0);
        const doctorOutput = `${io.stdout}\n${io.stderr}\n${doctorClean.mock.calls.flat().join("\n")}`;
        expect(doctorOutput).not.toContain("agentplane task migrate-doc --all");
        expect(doctorOutput).not.toContain("active legacy");
      } finally {
        doctorClean.mockRestore();
        io.restore();
      }
    },
  );

  it(
    "upgrade --migrate-task-docs repairs incomplete policy tree drift and legacy task docs together",
    { timeout: 60_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      try {
        expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      io = captureStdIO();
      let taskId = "";
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Legacy README drift target",
            "--description",
            "Exercise combined policy-tree drift and legacy README recovery.",
            "--priority",
            "med",
            "--owner",
            "TESTER",
            "--tag",
            "code",
            "--root",
            root,
          ]),
        ).toBe(0);
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
title: "Legacy README drift target"
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
description: "Exercise combined policy-tree drift and legacy README recovery."
id_source: "generated"
---
## Summary

Legacy README drift target

Exercise combined policy-tree drift and legacy README recovery.

## Scope

- In scope: policy-tree drift and legacy README recovery.
- Out of scope: unrelated refactors.

## Plan

1. Remove a managed policy file.
2. Repair the repo with upgrade plus task-doc migration.

## Verify Steps

### Scope
- Primary tag: \`code\`

### Checks
- Confirm upgrade restores the missing policy file and migrates the task README.

### Evidence / Commands
- Record the recovery commands.

### Pass criteria
- The repo ends with a complete policy tree and README v3.

## Verification

### Plan

Legacy verification plan.

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the recovery commit.

## Notes

- Legacy task placeholder.
`;
      await writeFile(readmePath, legacyReadme, "utf8");

      const missingPolicyPath = path.join(root, ".agentplane", "policy", "workflow.upgrade.md");
      await rm(missingPolicyPath, { force: true });
      await commitAll(root, "✨ fixture: incomplete policy tree and legacy readme");

      io = captureStdIO();
      const doctorBefore = vi.spyOn(console, "error").mockImplementation(() => {
        /* captured separately for assertion */
      });
      try {
        expect(await runCli(["doctor", "--root", root])).toBe(1);
        const doctorOutput = `${io.stdout}\n${io.stderr}\n${doctorBefore.mock.calls.flat().join("\n")}`;
        expect(doctorOutput).toContain("framework-managed policy tree is incomplete");
        expect(doctorOutput).toContain("Next action: agentplane upgrade --yes");
        expect(doctorOutput).not.toContain("agentplane task migrate-doc --all");
      } finally {
        doctorBefore.mockRestore();
        io.restore();
      }

      io = captureStdIO();
      try {
        expect(await runCli(["upgrade", "--yes", "--migrate-task-docs", "--root", root])).toBe(0);
        expect(io.stdout).toContain("Task README migration: changed=1");
      } finally {
        io.restore();
      }

      expect(await pathExists(missingPolicyPath)).toBe(true);
      const migratedReadme = await readFile(readmePath, "utf8");
      expect(migratedReadme).toContain("doc_version: 3");
      expect(migratedReadme).toContain("Findings:");
      expect(migratedReadme).not.toContain("## Notes");

      io = captureStdIO();
      const doctorAfter = vi.spyOn(console, "error").mockImplementation(() => {
        /* captured separately for assertion */
      });
      try {
        expect(await runCli(["doctor", "--root", root])).toBe(0);
        const doctorOutput = `${io.stdout}\n${io.stderr}\n${doctorAfter.mock.calls.flat().join("\n")}`;
        expect(doctorOutput).not.toContain("framework-managed policy tree is incomplete");
        expect(doctorOutput).not.toContain("agentplane task migrate-doc --all");
      } finally {
        doctorAfter.mockRestore();
        io.restore();
      }
    },
  );

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
    const config = defaultConfig() as unknown as Record<string, unknown>;
    (config.framework as Record<string, unknown>).source = "https://example.com/agentplane";
    await writeConfig(root, config as ReturnType<typeof defaultConfig>);

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
