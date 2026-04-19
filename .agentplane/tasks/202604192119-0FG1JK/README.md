---
id: "202604192119-0FG1JK"
title: "Apply formatting to final push-gate drift files"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "maintenance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T21:19:47.663Z"
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
    body: "Start: apply formatter-only cleanup to the two files still failing pre-push format:check."
events:
  -
    type: "status"
    at: "2026-04-19T21:19:48.114Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: apply formatter-only cleanup to the two files still failing pre-push format:check."
doc_version: 3
doc_updated_at: "2026-04-19T21:19:48.120Z"
doc_updated_by: "CODER"
description: "After resolving lint drift, pre-push still fails format:check on packages/agentplane/src/commands/guard/impl/policy.ts and packages/core/src/process/run-process.ts. Run formatter only on the reported files, verify format:check, and unblock the branch push."
sections:
  Summary: |-
    Apply formatting to final push-gate drift files
    
    After resolving lint drift, pre-push still fails format:check on packages/agentplane/src/commands/guard/impl/policy.ts and packages/core/src/process/run-process.ts. Run formatter only on the reported files, verify format:check, and unblock the branch push.
  Scope: |-
    - In scope: After resolving lint drift, pre-push still fails format:check on packages/agentplane/src/commands/guard/impl/policy.ts and packages/core/src/process/run-process.ts. Run formatter only on the reported files, verify format:check, and unblock the branch push.
    - Out of scope: unrelated refactors not required for "Apply formatting to final push-gate drift files".
  Plan: "1. Run formatter only on the two files named by pre-push. 2. Verify format:check passes and the diff remains formatter-only. 3. Commit and close the task so the branch can be pushed without mixing more logic changes."
  Verify Steps: |-
    1. Review the requested outcome for "Apply formatting to final push-gate drift files". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Apply formatting to final push-gate drift files

After resolving lint drift, pre-push still fails format:check on packages/agentplane/src/commands/guard/impl/policy.ts and packages/core/src/process/run-process.ts. Run formatter only on the reported files, verify format:check, and unblock the branch push.

## Scope

- In scope: After resolving lint drift, pre-push still fails format:check on packages/agentplane/src/commands/guard/impl/policy.ts and packages/core/src/process/run-process.ts. Run formatter only on the reported files, verify format:check, and unblock the branch push.
- Out of scope: unrelated refactors not required for "Apply formatting to final push-gate drift files".

## Plan

1. Run formatter only on the two files named by pre-push. 2. Verify format:check passes and the diff remains formatter-only. 3. Commit and close the task so the branch can be pushed without mixing more logic changes.

## Verify Steps

1. Review the requested outcome for "Apply formatting to final push-gate drift files". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
