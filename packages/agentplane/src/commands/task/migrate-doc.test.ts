import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { mkGitRepoRoot, writeDefaultConfig } from "../../cli/run-cli.test-helpers.js";

import { cmdTaskMigrateDoc } from "./migrate-doc.js";

describe("cmdTaskMigrateDoc", () => {
  it("adds missing Plan/Verification sections and approval frontmatter without losing content (idempotent)", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = "202601010000-ABCDEF";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    const readmePath = path.join(taskDir, "README.md");
    await mkdir(taskDir, { recursive: true });

    const legacy = `---
id: "${taskId}"
title: "Legacy task"
status: "TODO"
priority: "low"
owner: "CODER"
depends_on: []
tags: []
verify: []
comments: []
doc_version: 2
doc_updated_at: "2026-01-01T00:00:00.000Z"
doc_updated_by: "CODER"
description: "Legacy"
id_source: "generated"
---
## Summary

Keep me.

## Scope

Keep scope.
`;

    await writeFile(readmePath, legacy, "utf8");

    const code = await cmdTaskMigrateDoc({ cwd: root, rootOverride: root, args: [taskId] });
    expect(code).toBe(0);

    const migrated = await readFile(readmePath, "utf8");
    expect(migrated).toContain("plan_approval:");
    expect(migrated).toContain("verification:");
    expect(migrated).toContain("## Plan");
    expect(migrated).toContain("## Verification");
    expect(migrated).toContain("Keep me.");
    expect(migrated).toContain("Keep scope.");

    const code2 = await cmdTaskMigrateDoc({ cwd: root, rootOverride: root, args: [taskId] });
    expect(code2).toBe(0);
    const migrated2 = await readFile(readmePath, "utf8");
    expect(migrated2).toBe(migrated);
  });
});
