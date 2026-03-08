---
id: "202603081731-DYC4GW"
title: "Remove repo-only bootstrap references from install surfaces"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "install"
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
doc_version: 3
doc_updated_at: "2026-03-08T17:31:59.480Z"
doc_updated_by: "CODER"
description: "Treat npm-installed agentplane as the primary product surface by removing runtime/help/managed-file references to docs artifacts that are not shipped in the npm package or installed into user repositories."
id_source: "generated"
---
## Summary

Remove repo-only bootstrap references from install surfaces

Treat npm-installed agentplane as the primary product surface by removing runtime/help/managed-file references to docs artifacts that are not shipped in the npm package or installed into user repositories.

## Scope

- In scope: Treat npm-installed agentplane as the primary product surface by removing runtime/help/managed-file references to docs artifacts that are not shipped in the npm package or installed into user repositories.
- Out of scope: unrelated refactors not required for "Remove repo-only bootstrap references from install surfaces".

## Plan

1. Implement the change for "Remove repo-only bootstrap references from install surfaces".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
