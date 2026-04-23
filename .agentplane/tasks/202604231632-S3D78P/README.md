---
id: "202604231632-S3D78P"
title: "Fix release preflight lint drift"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T16:32:28.515Z"
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
    body: "Start: remove the unused import in apply.preflight.git.ts and rerun the exact lint/prettier checks that blocked the server push."
events:
  -
    type: "status"
    at: "2026-04-23T16:32:29.180Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the unused import in apply.preflight.git.ts and rerun the exact lint/prettier checks that blocked the server push."
doc_version: 3
doc_updated_at: "2026-04-23T16:32:29.191Z"
doc_updated_by: "CODER"
description: "Remove the unused import left in packages/agentplane/src/commands/release/apply.preflight.git.ts after the hotspot decomposition so pre-push lint passes without changing release behavior."
sections:
  Summary: |-
    Fix release preflight lint drift
    
    Remove the unused import left in packages/agentplane/src/commands/release/apply.preflight.git.ts after the hotspot decomposition so pre-push lint passes without changing release behavior.
  Scope: |-
    - In scope: Remove the unused import left in packages/agentplane/src/commands/release/apply.preflight.git.ts after the hotspot decomposition so pre-push lint passes without changing release behavior.
    - Out of scope: unrelated refactors not required for "Fix release preflight lint drift".
  Plan: "Remove the unused import left in packages/agentplane/src/commands/release/apply.preflight.git.ts after the release preflight hotspot refactor, then rerun the exact lint/prettier checks that blocked push and close the task without changing release behavior."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Fix release preflight lint drift

Remove the unused import left in packages/agentplane/src/commands/release/apply.preflight.git.ts after the hotspot decomposition so pre-push lint passes without changing release behavior.

## Scope

- In scope: Remove the unused import left in packages/agentplane/src/commands/release/apply.preflight.git.ts after the hotspot decomposition so pre-push lint passes without changing release behavior.
- Out of scope: unrelated refactors not required for "Fix release preflight lint drift".

## Plan

Remove the unused import left in packages/agentplane/src/commands/release/apply.preflight.git.ts after the release preflight hotspot refactor, then rerun the exact lint/prettier checks that blocked push and close the task without changing release behavior.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
