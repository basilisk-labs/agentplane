---
id: "202604171910-FN9AQ6"
title: "Unblock refactor pushes by formatting global pre-push offenders"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "format"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T19:11:23.094Z"
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
    body: "Start: format the current pre-push offenders only, keep the diff whitespace-only, and publish the unblock branch so the remaining refactor work can be pushed."
events:
  -
    type: "status"
    at: "2026-04-17T19:11:45.915Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: format the current pre-push offenders only, keep the diff whitespace-only, and publish the unblock branch so the remaining refactor work can be pushed."
doc_version: 3
doc_updated_at: "2026-04-17T19:11:45.948Z"
doc_updated_by: "CODER"
description: "Format the repository files currently failing the shared pre-push formatter so the remaining refactor task branches can be pushed and merged without unrelated hook failures."
sections:
  Summary: |-
    Unblock refactor pushes by formatting global pre-push offenders
    
    Format the repository files currently failing the shared pre-push formatter so the remaining refactor task branches can be pushed and merged without unrelated hook failures.
  Scope: |-
    - In scope: Format the repository files currently failing the shared pre-push formatter so the remaining refactor task branches can be pushed and merged without unrelated hook failures.
    - Out of scope: unrelated refactors not required for "Unblock refactor pushes by formatting global pre-push offenders".
  Plan: |-
    1. Implement the change for "Unblock refactor pushes by formatting global pre-push offenders".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Inspect the formatter-only diff in the 14 currently failing paths. Expected: edits are whitespace/layout-only and do not change runtime behavior.
    2. Run bun run format:check. Expected: Prettier reports zero offending files.
    3. Push the task branch to origin. Expected: the shared pre-push hook no longer fails on formatting for this branch.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Unblock refactor pushes by formatting global pre-push offenders

Format the repository files currently failing the shared pre-push formatter so the remaining refactor task branches can be pushed and merged without unrelated hook failures.

## Scope

- In scope: Format the repository files currently failing the shared pre-push formatter so the remaining refactor task branches can be pushed and merged without unrelated hook failures.
- Out of scope: unrelated refactors not required for "Unblock refactor pushes by formatting global pre-push offenders".

## Plan

1. Implement the change for "Unblock refactor pushes by formatting global pre-push offenders".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Inspect the formatter-only diff in the 14 currently failing paths. Expected: edits are whitespace/layout-only and do not change runtime behavior.
2. Run bun run format:check. Expected: Prettier reports zero offending files.
3. Push the task branch to origin. Expected: the shared pre-push hook no longer fails on formatting for this branch.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
