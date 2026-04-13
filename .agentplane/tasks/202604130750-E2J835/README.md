---
id: "202604130750-E2J835"
title: "Make release apply branch_pr-aware for protected-main publish"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T07:54:05.957Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T08:07:19.262Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass. Evidence: 12/12 tests passed, including new branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: release apply routing/reporting/tests for protected-main publication."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement branch_pr-safe release apply behavior for non-base branches, keep final publish deferred to main automation after merge, and validate the new candidate push/reporting path with focused release tests."
events:
  -
    type: "status"
    at: "2026-04-13T07:55:31.247Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement branch_pr-safe release apply behavior for non-base branches, keep final publish deferred to main automation after merge, and validate the new candidate push/reporting path with focused release tests."
  -
    type: "verify"
    at: "2026-04-13T08:07:19.262Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass. Evidence: 12/12 tests passed, including new branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: release apply routing/reporting/tests for protected-main publication."
doc_version: 3
doc_updated_at: "2026-04-13T08:07:19.268Z"
doc_updated_by: "CODER"
description: "When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge."
sections:
  Summary: |-
    Make release apply branch_pr-aware for protected-main publish
    
    When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.
  Scope: |-
    - In scope: When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.
    - Out of scope: unrelated refactors not required for "Make release apply branch_pr-aware for protected-main publish".
  Plan: "Release hardening plan: make release apply --push branch_pr-aware on non-base branches by pushing only the current task branch as a release candidate, skipping local tag creation/push, and emitting explicit reporting that final publication is deferred to the main-driven publish workflow after merge. Verify with targeted release apply tests and task branch lifecycle checks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T08:07:19.262Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass. Evidence: 12/12 tests passed, including new branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: release apply routing/reporting/tests for protected-main publication.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T07:55:31.266Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Observed during verification: when `work start` was invoked from a manually created base worktree through the supported global-binary override, the nested task worktree still needed a local `bun install --frozen-lockfile` before repo-local test execution. This bootstrap gap is separate from the release-apply routing fix and should be handled as follow-up workflow hardening."
id_source: "generated"
---
## Summary

Make release apply branch_pr-aware for protected-main publish

When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.

## Scope

- In scope: When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.
- Out of scope: unrelated refactors not required for "Make release apply branch_pr-aware for protected-main publish".

## Plan

Release hardening plan: make release apply --push branch_pr-aware on non-base branches by pushing only the current task branch as a release candidate, skipping local tag creation/push, and emitting explicit reporting that final publication is deferred to the main-driven publish workflow after merge. Verify with targeted release apply tests and task branch lifecycle checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T08:07:19.262Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass. Evidence: 12/12 tests passed, including new branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: release apply routing/reporting/tests for protected-main publication.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T07:55:31.266Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observed during verification: when `work start` was invoked from a manually created base worktree through the supported global-binary override, the nested task worktree still needed a local `bun install --frozen-lockfile` before repo-local test execution. This bootstrap gap is separate from the release-apply routing fix and should be handled as follow-up workflow hardening.
