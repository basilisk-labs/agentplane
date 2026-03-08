---
id: "202603081315-H2E5Q5"
title: "Fix literal newline escaping in task README sections"
result_summary: "Task README rendering now preserves literal escape tokens when intentional and normalizes multiline-like escaped newlines into readable README output."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603081315-NV76YZ"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T13:30:14.452Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T13:41:35.008Z"
  updated_by: "TESTER"
  note: "targeted vitest, lint, builds, migrate-doc, and doctor passed"
commit:
  hash: "407702e6e1e60fbde10e203bc0ab2c458d065181"
  message: "🔧 H2E5Q5 task: normalize multiline task README rendering"
comments:
  -
    author: "CODER"
    body: "Start: reproducing literal newline leakage across task README rendering and write paths; scope is renderer/template normalization plus deterministic cleanup of affected task docs."
  -
    author: "CODER"
    body: "Verified: targeted task-readme, migrate-doc, and task-new tests passed; lint, local builds, migrate-doc --all, and doctor all succeeded."
events:
  -
    type: "status"
    at: "2026-03-08T13:30:20.210Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing literal newline leakage across task README rendering and write paths; scope is renderer/template normalization plus deterministic cleanup of affected task docs."
  -
    type: "verify"
    at: "2026-03-08T13:41:35.008Z"
    author: "TESTER"
    state: "ok"
    note: "targeted vitest, lint, builds, migrate-doc, and doctor passed"
  -
    type: "status"
    at: "2026-03-08T13:42:14.617Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: targeted task-readme, migrate-doc, and task-new tests passed; lint, local builds, migrate-doc --all, and doctor all succeeded."
doc_version: 3
doc_updated_at: "2026-03-08T13:42:14.617Z"
doc_updated_by: "CODER"
description: "Find why some task README sections render literal \\\\n sequences instead of actual line breaks, then fix the write path and normalize affected examples or fixtures."
id_source: "generated"
---
## Summary

- Problem: some task README files show literal `\n` instead of real line breaks in human-readable text.
- Target outcome: new and normalized task READMEs render body sections cleanly, and multiline task metadata stays readable.
- Constraint: do not break YAML/frontmatter roundtrip or task lifecycle writers.

## Scope

### In scope
- Reproduce newline escaping across task README creation and update paths.
- Fix the write/render path for human-readable task text.
- Normalize affected repository task README examples or fixtures when the change is deterministic.

### Out of scope
- Broad redesign of task metadata beyond newline rendering.
- Unrelated task README contract changes.

## Plan

1. Trace where escaped `\n` enters task README body and frontmatter rendering.
2. Fix the renderer/template so human-readable fields normalize to real line breaks without corrupting stored task data.
3. Normalize affected repository task READMEs and run targeted lifecycle and doctor checks.

## Verify Steps

1. Create or update a task README from a description or body value containing literal `\n` sequences. Expected: human-readable body sections render real line breaks instead of visible `\n` text.
2. Render and parse a task README with multiline frontmatter fields. Expected: YAML stays valid and task metadata roundtrips without loss.
3. Run targeted task README tests and `agentplane doctor`. Expected: touched paths pass without README-format regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T13:41:35.008Z — VERIFY — ok

By: TESTER

Note: targeted vitest, lint, builds, migrate-doc, and doctor passed

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T13:40:42.403Z, excerpt_hash=sha256:260b35005870ed4ed059a64fc79ae29985fbc509ec095ac5d47110fa9b0462f4

Details:

bunx vitest run packages/core/src/tasks/task-readme.test.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000
bun run lint:core -- packages/core/src/tasks/task-readme.ts packages/core/src/tasks/task-readme.test.ts packages/agentplane/src/commands/task/doc-template.ts packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts
bun run --filter=@agentplaneorg/core build
bun run --filter=agentplane build
agentplane task migrate-doc --all
agentplane doctor

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the task README renderer/template change.
2. Re-run targeted task README and lifecycle checks to confirm legacy rendering is restored.

## Findings

- Observation: literal `\n` leaked into human-readable task text through two paths: README v3 body template copied raw `description`, and YAML frontmatter renderer serialized multiline human fields as escaped JSON strings.
  Impact: task README files looked broken and noisy, and multiline descriptions, notes, and bodies were harder to scan.
  Resolution: normalized multiline-like escaped newlines in the README body template, rendered multiline frontmatter fields as YAML block scalars, and re-ran `agentplane task migrate-doc --all` to normalize the archive.
  Promotion: tooling
