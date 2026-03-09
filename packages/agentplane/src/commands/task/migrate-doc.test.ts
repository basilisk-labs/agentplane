import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { mkGitRepoRoot, writeDefaultConfig } from "../../cli/run-cli.test-helpers.js";

import { cmdTaskMigrateDoc } from "./migrate-doc.js";

describe("cmdTaskMigrateDoc", () => {
  it("migrates legacy doc_version=2 tasks to README v3 without losing content (idempotent)", async () => {
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

    const code = await cmdTaskMigrateDoc({
      cwd: root,
      rootOverride: root,
      all: false,
      quiet: false,
      taskIds: [taskId],
    });
    expect(code).toBe(0);

    const migrated = await readFile(readmePath, "utf8");
    expect(migrated).toContain("plan_approval:");
    expect(migrated).toContain("verification:");
    expect(migrated).toContain("doc_version: 3");
    expect(migrated).toContain("## Plan");
    expect(migrated).toContain("## Verify Steps");
    expect(migrated).toContain("## Verification");
    expect(migrated).toContain("## Findings");
    expect(migrated).not.toContain("## Notes");
    expect(migrated).not.toContain("### Plan");
    expect(migrated).not.toContain("### Results");
    expect(migrated).toContain("Keep me.");
    expect(migrated).toContain("Keep scope.");

    const code2 = await cmdTaskMigrateDoc({
      cwd: root,
      rootOverride: root,
      all: false,
      quiet: false,
      taskIds: [taskId],
    });
    expect(code2).toBe(0);
    const migrated2 = await readFile(readmePath, "utf8");
    expect(migrated2).toBe(migrated);
  });

  it("preserves legacy Context content without keeping it in the canonical v3 section order", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = "202601011559-C0N7";
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

## Context

Legacy context that should not stay in the canonical v3 contract.

## Scope

Keep scope.
`;

    await writeFile(readmePath, legacy, "utf8");

    const code = await cmdTaskMigrateDoc({
      cwd: root,
      rootOverride: root,
      all: false,
      quiet: false,
      taskIds: [taskId],
    });
    expect(code).toBe(0);

    const migrated = await readFile(readmePath, "utf8");
    expect(migrated).toContain("## Context");
    expect(migrated).toContain("Legacy context that should not stay in the canonical v3 contract.");
    expect(migrated.indexOf("## Context")).toBeGreaterThan(migrated.indexOf("## Findings"));
  });

  it("normalizes date-only timestamps in approval and verification notes to ISO updated_at when the date matches", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = "202601020000-ABCDEF";
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
plan_approval:
  state: "approved"
  updated_at: "2026-01-02T03:04:05.006Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-01-02."
verification:
  state: "ok"
  updated_at: "2026-01-02T06:07:08.009Z"
  updated_by: "CODER"
  note: "Verified locally on 2026-01-02: bun run test:cli passed."
comments: []
doc_version: 2
doc_updated_at: "2026-01-02T00:00:00.000Z"
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
    const code = await cmdTaskMigrateDoc({
      cwd: root,
      rootOverride: root,
      all: false,
      quiet: false,
      taskIds: [taskId],
    });
    expect(code).toBe(0);

    const migrated = await readFile(readmePath, "utf8");
    expect(migrated).toContain('note: "Approved in chat on 2026-01-02T03:04:05.006Z."');
    expect(migrated).toContain(
      'note: "Verified locally on 2026-01-02T06:07:08.009Z: bun run test:cli passed."',
    );
  });

  it("does not rewrite note timestamps when the note date does not match updated_at", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = "202601030000-ABCDEF";
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
plan_approval:
  state: "approved"
  updated_at: "2026-01-03T03:04:05.006Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-01-02."
comments: []
doc_version: 2
doc_updated_at: "2026-01-03T00:00:00.000Z"
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
    const code = await cmdTaskMigrateDoc({
      cwd: root,
      rootOverride: root,
      all: false,
      quiet: false,
      taskIds: [taskId],
    });
    expect(code).toBe(0);

    const migrated = await readFile(readmePath, "utf8");
    expect(migrated).toContain('note: "Approved in chat on 2026-01-02."');
    expect(migrated).not.toContain('note: "Approved in chat on 2026-01-03T03:04:05.006Z."');
  });

  it("normalizes doc_version=3 verification sections to results-only layout", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = "202601040000-ABCDEF";
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
doc_version: 3
doc_updated_at: "2026-01-04T00:00:00.000Z"
doc_updated_by: "CODER"
description: "Legacy"
id_source: "generated"
---
## Summary

Keep me.

## Scope

Keep scope.

## Verification

### Plan

Legacy verification notes.

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->
`;

    await writeFile(readmePath, legacy, "utf8");
    const code = await cmdTaskMigrateDoc({
      cwd: root,
      rootOverride: root,
      all: false,
      quiet: false,
      taskIds: [taskId],
    });
    expect(code).toBe(0);

    const migrated = await readFile(readmePath, "utf8");
    expect(migrated).toContain("## Verification");
    expect(migrated).toContain("Legacy verification notes.");
    expect(migrated).toContain("<!-- BEGIN VERIFICATION RESULTS -->");
    expect(migrated).not.toContain("### Plan");
    expect(migrated).not.toContain("### Results");
  });

  it("normalizes escaped newlines in doc_version=3 summary, scope, and frontmatter description", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = "202601040001-ABCDEF";
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
comments:
  -
    author: "CODER"
    body: "${String.raw`Start line 1\nStart line 2\nStart line 3`}"
doc_version: 3
doc_updated_at: "2026-01-04T00:00:00.000Z"
doc_updated_by: "CODER"
description: "${String.raw`Line one\n\nLine two`}"
id_source: "generated"
---
## Summary

${String.raw`Line one\n\nLine two`}

## Scope

- In scope: ${String.raw`Line one\n\nLine two`}.

## Plan

1. Keep ${String.raw`line one\nline two\nline three`}.

## Verify Steps

1. Review. Expected: okay.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert.

## Findings
`;

    await writeFile(readmePath, legacy, "utf8");
    const code = await cmdTaskMigrateDoc({
      cwd: root,
      rootOverride: root,
      all: false,
      quiet: false,
      taskIds: [taskId],
    });
    expect(code).toBe(0);

    const migrated = await readFile(readmePath, "utf8");
    expect(migrated).toContain("description: |-");
    expect(migrated).toContain("  Line one");
    expect(migrated).toContain("  Line two");
    expect(migrated).toContain("Line one\n\nLine two");
    expect(migrated).not.toContain(String.raw`Line one\n\nLine two`);
    expect(migrated).toContain("body: |-");
  });

  it("migrates all requested legacy task READMEs to v3 and leaves existing v3 tasks intact", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const legacyTaskId = "202601050000-AAAAAA";
    const currentTaskId = "202601050001-BBBBBB";
    const legacyTaskDir = path.join(root, ".agentplane", "tasks", legacyTaskId);
    const currentTaskDir = path.join(root, ".agentplane", "tasks", currentTaskId);
    await mkdir(legacyTaskDir, { recursive: true });
    await mkdir(currentTaskDir, { recursive: true });

    await writeFile(
      path.join(legacyTaskDir, "README.md"),
      `---
id: "${legacyTaskId}"
title: "Legacy task"
status: "TODO"
priority: "low"
owner: "CODER"
depends_on: []
tags: []
verify: []
comments: []
doc_version: 2
doc_updated_at: "2026-01-05T00:00:00.000Z"
doc_updated_by: "CODER"
description: "Legacy"
id_source: "generated"
---
## Summary

Legacy summary.

## Scope

Legacy scope.

## Notes

Legacy follow-up.
`,
      "utf8",
    );

    const currentV3 = `---
id: "${currentTaskId}"
title: "Current task"
status: "TODO"
priority: "low"
owner: "CODER"
depends_on: []
tags: []
verify: []
comments: []
doc_version: 3
doc_updated_at: "2026-01-05T00:00:00.000Z"
doc_updated_by: "CODER"
description: "Current"
id_source: "generated"
---
## Summary

Current summary.

## Scope

Current scope.

## Plan

1. Keep.

## Verify Steps

1. Review. Expected: okay.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert.

## Findings

Already normalized.
`;
    await writeFile(path.join(currentTaskDir, "README.md"), currentV3, "utf8");

    const code = await cmdTaskMigrateDoc({
      cwd: root,
      rootOverride: root,
      all: true,
      quiet: false,
      taskIds: [],
    });
    expect(code).toBe(0);

    const migratedLegacy = await readFile(path.join(legacyTaskDir, "README.md"), "utf8");
    const migratedCurrent = await readFile(path.join(currentTaskDir, "README.md"), "utf8");
    expect(migratedLegacy).toContain("doc_version: 3");
    expect(migratedLegacy).toContain("## Findings");
    expect(migratedLegacy).toContain("Legacy follow-up.");
    expect(migratedLegacy).not.toContain("## Notes");
    expect(migratedCurrent).toContain("doc_version: 3");
    expect(migratedCurrent).toContain("plan_approval:");
    expect(migratedCurrent).toContain("verification:");
    expect(migratedCurrent).toContain("Current summary.");
    expect(migratedCurrent).toContain("Already normalized.");
    expect(migratedCurrent).not.toContain("## Notes");
  });

  it("refreshes the local tasks export snapshot automatically after migration", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = "202601060000-CCCCCC";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    const readmePath = path.join(taskDir, "README.md");
    const exportPath = path.join(root, ".agentplane", "tasks.json");
    await mkdir(taskDir, { recursive: true });

    const currentV3 = `---
id: "${taskId}"
title: "Current task"
status: "TODO"
priority: "low"
owner: "CODER"
depends_on: []
tags: []
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-01-06T00:00:00.000Z"
doc_updated_by: "CODER"
description: "Current"
id_source: "generated"
---
## Summary

Current summary.

## Scope

Current scope.

## Plan

1. Keep.

## Verify Steps

1. Review. Expected: okay.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert.

## Findings

Already normalized.
`;

    await writeFile(readmePath, currentV3, "utf8");
    await writeFile(
      exportPath,
      JSON.stringify(
        {
          schema_version: 1,
          tasks: [
            {
              id: taskId,
              title: "Current task",
              status: "TODO",
              priority: "low",
              owner: "CODER",
              depends_on: [],
              tags: [],
              verify: [],
              comments: [],
              doc_version: 2,
              doc_updated_at: "2026-01-06T00:00:00.000Z",
              doc_updated_by: "CODER",
              description: "Current",
              id_source: "generated",
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    const code = await cmdTaskMigrateDoc({
      cwd: root,
      rootOverride: root,
      all: false,
      quiet: false,
      taskIds: [taskId],
    });
    expect(code).toBe(0);

    const exported = JSON.parse(await readFile(exportPath, "utf8")) as {
      tasks?: { id?: string; doc_version?: number }[];
    };
    expect(exported.tasks?.find((task) => task.id === taskId)?.doc_version).toBe(3);
  });
});
