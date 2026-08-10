---
id: "202608101223-ZCA7JG"
title: "Accept verification records for metadata-only branch_pr tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lifecycle"
  - "verification"
verify:
  - "bun run typecheck"
  - "bun vitest run packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.worktree.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-10T12:23:51.944Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "8993e891fdf4aabc57db9131c64f8f7e58b7dd3a"
  message: "🐛 ZCA7JG lifecycle: accept metadata-only verification records"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation complete: metadata-only verification records now match only when both semantic targets are null; focused regression, mismatch, stale-metadata, and concrete-details checks pass."
events:
  -
    type: "status"
    at: "2026-08-10T12:25:44.373Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-10T12:31:17.475Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation complete: metadata-only verification records now match only when both semantic targets are null; focused regression, mismatch, stale-metadata, and concrete-details checks pass."
    commit: "8993e891fdf4aabc57db9131c64f8f7e58b7dd3a"
doc_version: 3
doc_updated_at: "2026-08-10T12:31:17.475Z"
doc_updated_by: "CODER"
description: "Allow branch_pr tasks whose reviewable result consists only of managed task metadata to persist and satisfy verification without fabricating an implementation SHA. Preserve freshness checks for semantic code changes and add a regression reproducing PR 4809 where resolveQualityReviewTargetSha returns null."
sections:
  Summary: |-
    Accept verification records for metadata-only branch_pr tasks

    Allow branch_pr tasks whose reviewable result consists only of managed task metadata to persist and satisfy verification without fabricating an implementation SHA. Preserve freshness checks for semantic code changes and add a regression reproducing PR 4809 where resolveQualityReviewTargetSha returns null.
  Scope: |-
    - In scope: Allow branch_pr tasks whose reviewable result consists only of managed task metadata to persist and satisfy verification without fabricating an implementation SHA. Preserve freshness checks for semantic code changes and add a regression reproducing PR 4809 where resolveQualityReviewTargetSha returns null.
    - Out of scope: unrelated refactors not required for "Accept verification records for metadata-only branch_pr tasks".
  Plan: "1. Add focused tests proving that a valid verification record with implementation_sha=null is accepted only when the current branch_pr quality target is also null and the task verification metadata, Verify Steps digest, record digest, and concrete check details all match. 2. Preserve the existing rejection behavior when a semantic implementation SHA exists, the record SHA differs, details are not concrete, or task metadata is stale. 3. Update the verification-record acceptance logic without weakening code-task freshness. 4. Run the focused verification/route tests, typecheck, and routing policy check. 5. Record the fix as the prerequisite that unblocks metadata-only recovery PR #4809."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun vitest run packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.worktree.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: A current verification record with implementation_sha=null was rejected before metadata and digest validation because matchesCurrentVerification required evaluatedSha to be truthy.
      Impact: Metadata-only branch_pr tasks could never satisfy verification after recording their implementation receipt, blocking PR integration and cleanup even when all concrete checks passed.
      Resolution: Accept null implementation_sha only when the current semantic review target is also null; keep metadata, scope digest, record digest, concrete-details, and semantic-SHA mismatch checks unchanged.
extensions:
  workflow_route_baseline:
    start_head_sha: "27671e9b8cdec21b1170719a87019f703cec9526"
    version: 1
id_source: "generated"
---
## Summary

Accept verification records for metadata-only branch_pr tasks

Allow branch_pr tasks whose reviewable result consists only of managed task metadata to persist and satisfy verification without fabricating an implementation SHA. Preserve freshness checks for semantic code changes and add a regression reproducing PR 4809 where resolveQualityReviewTargetSha returns null.

## Scope

- In scope: Allow branch_pr tasks whose reviewable result consists only of managed task metadata to persist and satisfy verification without fabricating an implementation SHA. Preserve freshness checks for semantic code changes and add a regression reproducing PR 4809 where resolveQualityReviewTargetSha returns null.
- Out of scope: unrelated refactors not required for "Accept verification records for metadata-only branch_pr tasks".

## Plan

1. Add focused tests proving that a valid verification record with implementation_sha=null is accepted only when the current branch_pr quality target is also null and the task verification metadata, Verify Steps digest, record digest, and concrete check details all match. 2. Preserve the existing rejection behavior when a semantic implementation SHA exists, the record SHA differs, details are not concrete, or task metadata is stale. 3. Update the verification-record acceptance logic without weakening code-task freshness. 4. Run the focused verification/route tests, typecheck, and routing policy check. 5. Record the fix as the prerequisite that unblocks metadata-only recovery PR #4809.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun vitest run packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.worktree.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: A current verification record with implementation_sha=null was rejected before metadata and digest validation because matchesCurrentVerification required evaluatedSha to be truthy.
  Impact: Metadata-only branch_pr tasks could never satisfy verification after recording their implementation receipt, blocking PR integration and cleanup even when all concrete checks passed.
  Resolution: Accept null implementation_sha only when the current semantic review target is also null; keep metadata, scope digest, record digest, concrete-details, and semantic-SHA mismatch checks unchanged.
