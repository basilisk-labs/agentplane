---
id: "202603081453-Z6BN1X"
title: "Document canonical workflow test scripts"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T15:16:43.364Z"
  updated_by: "ORCHESTRATOR"
  note: "Docs should now treat canonical workflow scripts and workflow contract checks as part of the standard quality model."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: sync developer testing docs with the new canonical workflow scripts, workflow bucket, and workflow command-contract enforcement."
events:
  -
    type: "status"
    at: "2026-03-08T15:16:50.648Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: sync developer testing docs with the new canonical workflow scripts, workflow bucket, and workflow command-contract enforcement."
doc_version: 3
doc_updated_at: "2026-03-08T15:16:50.648Z"
doc_updated_by: "DOCS"
description: "Update developer CI documentation to explain which named scripts own workflow test and coverage execution, and how GitHub workflows should call them instead of embedding test runner command lines."
id_source: "generated"
---
## Summary

Document canonical workflow test scripts

Update developer CI documentation to explain which named scripts own workflow test and coverage execution, and how GitHub workflows should call them instead of embedding test runner command lines.

## Scope

- In scope: Update developer CI documentation to explain which named scripts own workflow test and coverage execution, and how GitHub workflows should call them instead of embedding test runner command lines.
- Out of scope: unrelated refactors not required for "Document canonical workflow test scripts".

## Plan

1. Update developer testing docs to document the new canonical workflow scripts: `test:platform-critical`, `test:workflow-coverage`, `test:significant-coverage`, and `workflows:command-check`.
2. Update the pre-push and CI documentation so workflow-related changes clearly route through the dedicated workflow bucket and the remote workflows-lint contract check.
3. Run docs checks, record verification, and close the task.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
