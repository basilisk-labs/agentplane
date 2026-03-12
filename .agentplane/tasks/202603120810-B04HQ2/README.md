---
id: "202603120810-B04HQ2"
title: "Add explicit full-doc mode to task doc set"
result_summary: "Explicit full-doc mode added to task doc set."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "tasks"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T08:12:30.478Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T08:21:37.300Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 70 tests passed and 1 help snapshot written; Scope: explicit full-doc mode, task doc validation order, and help usage text."
commit:
  hash: "3ab67918d49b405048d996608a0dfc884ae1ca53"
  message: "✨ B04HQ2 task: add explicit task doc full-doc mode"
comments:
  -
    author: "CODER"
    body: "Start: add an explicit full-doc mode to task doc set while preserving the existing multi-heading fallback for compatibility."
  -
    author: "CODER"
    body: "Verified: task doc set now supports an explicit full-doc mode and still preserves the old multi-heading compatibility path."
events:
  -
    type: "status"
    at: "2026-03-12T08:18:49.313Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add an explicit full-doc mode to task doc set while preserving the existing multi-heading fallback for compatibility."
  -
    type: "verify"
    at: "2026-03-12T08:21:37.300Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 70 tests passed and 1 help snapshot written; Scope: explicit full-doc mode, task doc validation order, and help usage text."
  -
    type: "status"
    at: "2026-03-12T08:21:43.404Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task doc set now supports an explicit full-doc mode and still preserves the old multi-heading compatibility path."
doc_version: 3
doc_updated_at: "2026-03-12T08:21:43.404Z"
doc_updated_by: "CODER"
description: "Add a first-class full-doc update path so agents do not need the overloaded section-plus-file convention for whole README replacements."
id_source: "generated"
---
## Summary

Add explicit full-doc mode to task doc set

Add a first-class full-doc update path so agents do not need the overloaded section-plus-file convention for whole README replacements.

## Scope

- In scope: Add a first-class full-doc update path so agents do not need the overloaded section-plus-file convention for whole README replacements.
- Out of scope: unrelated refactors not required for "Add explicit full-doc mode to task doc set".

## Plan

1. Add an explicit full-doc mode to task doc set without breaking current multi-heading detection. 2. Update help text and examples. 3. Cover validation and README write behavior with tests.

## Verify Steps

- Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000
- Expected: explicit full-doc mode validates cleanly and applies README replacements without the overloaded section trick.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T08:21:37.300Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 70 tests passed and 1 help snapshot written; Scope: explicit full-doc mode, task doc validation order, and help usage text.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T08:18:49.313Z, excerpt_hash=sha256:bbf8b87750a34b824014f93c9e9972da1e013fa9f0df03b4bfd2a1bbe44e2d8a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
