---
id: "202603120810-B04HQ2"
title: "Add explicit full-doc mode to task doc set"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add an explicit full-doc mode to task doc set while preserving the existing multi-heading fallback for compatibility."
events:
  -
    type: "status"
    at: "2026-03-12T08:18:49.313Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add an explicit full-doc mode to task doc set while preserving the existing multi-heading fallback for compatibility."
doc_version: 3
doc_updated_at: "2026-03-12T08:18:49.313Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
