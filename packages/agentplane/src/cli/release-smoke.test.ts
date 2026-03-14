import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  commitAll,
  configureGitUser,
  mkGitRepoRoot,
  pathExists,
  registerAgentplaneHome,
  silenceStdIO,
} from "./run-cli.test-helpers.js";

registerAgentplaneHome();
let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

describe("release smoke", () => {
  it(
    "upgrade restores workflow runtime artifacts even when managed files are otherwise unchanged",
    { timeout: 120_000 },
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
    "upgrade --migrate-task-docs recovers a legacy README v2 task without a manual export step",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      let taskId = "";
      try {
        expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
        io.restore();

        io = captureStdIO();
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
        expect(await runCli(["task", "export", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }
      await commitAll(root, "✨ fixture: legacy readme v2");

      io = captureStdIO();
      const doctorWarn = vi.spyOn(console, "error").mockImplementation(() => {
        /* captured separately for assertion */
      });
      try {
        expect(await runCli(["doctor", "--root", root])).toBe(0);
        const doctorOutput = `${io.stdout}\n${io.stderr}\n${doctorWarn.mock.calls.flat().join("\n")}`;
        expect(doctorOutput).toContain("agentplane task migrate-doc --all");
        expect(doctorOutput).toContain("active legacy");
      } finally {
        doctorWarn.mockRestore();
        io.restore();
      }

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
      expect(migratedTask?.doc).toContain("Legacy task placeholder.");

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
    "upgrade --migrate-task-docs repairs incomplete policy tree drift and legacy task docs in one release-smoke path",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      let taskId = "";
      try {
        expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
        io.restore();

        io = captureStdIO();
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

      io = captureStdIO();
      try {
        expect(await runCli(["task", "export", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

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
        expect(doctorOutput).toContain("agentplane task migrate-doc --all");
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
      expect(migratedReadme).toContain("## Findings");
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
});
