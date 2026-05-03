---
id: "202605031524-BDT05P"
title: "Validate branch_pr batch included tasks before PR publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031524-HNAHQK"
tags:
  - "branch-pr"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T15:24:48.569Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T15:47:41.124Z"
  updated_by: "CODER"
  note: "branch_pr batch include-task validation implemented and focused checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: validate branch_pr batch included tasks before PR publication."
events:
  -
    type: "status"
    at: "2026-05-03T15:39:14.961Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: validate branch_pr batch included tasks before PR publication."
  -
    type: "verify"
    at: "2026-05-03T15:47:41.124Z"
    author: "CODER"
    state: "ok"
    note: "branch_pr batch include-task validation implemented and focused checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T15:47:41.136Z"
doc_updated_by: "CODER"
description: "Add validation for included batch tasks so pr open/update rejects missing, already done, unverified, duplicate, or conflicting included task ids before a primary PR can advertise a batch."
sections:
  Summary: |-
    Validate branch_pr batch included tasks before PR publication
    
    Add validation for included batch tasks so pr open/update rejects missing, already done, unverified, duplicate, or conflicting included task ids before a primary PR can advertise a batch.
  Scope: |-
    - In scope: Add validation for included batch tasks so pr open/update rejects missing, already done, unverified, duplicate, or conflicting included task ids before a primary PR can advertise a batch.
    - Out of scope: unrelated refactors not required for "Validate branch_pr batch included tasks before PR publication".
  Plan: "Depends on HNAHQK. Scope: validate included batch tasks before a primary PR is opened or updated. Add checks for unknown ids, duplicate ids, DONE tasks, missing verification where required, and branch ownership conflicts when discoverable. Acceptance: pr open/update fails with actionable E_VALIDATION messages for invalid included tasks and still accepts valid verified included tasks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T15:47:41.124Z — VERIFY — ok
    
    By: CODER
    
    Note: branch_pr batch include-task validation implemented and focused checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T15:39:14.961Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: pr open now validates batch include-task ids before writing/publishing PR artifacts: unknown, duplicate, primary self-include, DONE, non-ok verification, active branch ownership, and existing PR metadata conflicts.
      Impact: Invalid batch PRs fail early instead of creating primary PR metadata that cannot be safely cascaded during closure.
      Resolution: Verification: bun test packages/agentplane/src/commands/pr/internal/batch-validation.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run typecheck; bun run check:types-files; bun run format:check; git diff --check; node .agentplane/policy/check-routing.mjs.
id_source: "generated"
---
## Summary

Validate branch_pr batch included tasks before PR publication

Add validation for included batch tasks so pr open/update rejects missing, already done, unverified, duplicate, or conflicting included task ids before a primary PR can advertise a batch.

## Scope

- In scope: Add validation for included batch tasks so pr open/update rejects missing, already done, unverified, duplicate, or conflicting included task ids before a primary PR can advertise a batch.
- Out of scope: unrelated refactors not required for "Validate branch_pr batch included tasks before PR publication".

## Plan

Depends on HNAHQK. Scope: validate included batch tasks before a primary PR is opened or updated. Add checks for unknown ids, duplicate ids, DONE tasks, missing verification where required, and branch ownership conflicts when discoverable. Acceptance: pr open/update fails with actionable E_VALIDATION messages for invalid included tasks and still accepts valid verified included tasks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T15:47:41.124Z — VERIFY — ok

By: CODER

Note: branch_pr batch include-task validation implemented and focused checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T15:39:14.961Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: pr open now validates batch include-task ids before writing/publishing PR artifacts: unknown, duplicate, primary self-include, DONE, non-ok verification, active branch ownership, and existing PR metadata conflicts.
  Impact: Invalid batch PRs fail early instead of creating primary PR metadata that cannot be safely cascaded during closure.
  Resolution: Verification: bun test packages/agentplane/src/commands/pr/internal/batch-validation.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run typecheck; bun run check:types-files; bun run format:check; git diff --check; node .agentplane/policy/check-routing.mjs.
