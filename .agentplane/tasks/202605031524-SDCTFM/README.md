---
id: "202605031524-SDCTFM"
title: "Cascade hosted branch_pr closure across batch tasks"
result_summary: "Merged via PR #831."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605031524-BDT05P"
tags:
  - "branch-pr"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T15:24:51.164Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T16:01:08.728Z"
  updated_by: "CODER"
  note: "hosted-close now cascades branch_pr batch closure to included tasks."
commit:
  hash: "250062787dd23288a1120488d7ebe901257bd7fc"
  message: "Merge pull request #831 from basilisk-labs/task/202605031524-SDCTFM/batch-hosted-close-cascade"
comments:
  -
    author: "CODER"
    body: "Start: cascade hosted branch_pr closure across primary and included batch tasks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #831 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-03T15:52:29.173Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: cascade hosted branch_pr closure across primary and included batch tasks."
  -
    type: "verify"
    at: "2026-05-03T16:01:08.728Z"
    author: "CODER"
    state: "ok"
    note: "hosted-close now cascades branch_pr batch closure to included tasks."
  -
    type: "status"
    at: "2026-05-03T16:05:33.128Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #831 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T16:05:33.133Z"
doc_updated_by: "INTEGRATOR"
description: "Teach integrate/hosted-close/hosted-close-pr recovery to close primary and included batch tasks atomically after a merged primary PR, recording DONE status, commit evidence, and task README close artifacts for every included task."
sections:
  Summary: |-
    Cascade hosted branch_pr closure across batch tasks
    
    Teach integrate/hosted-close/hosted-close-pr recovery to close primary and included batch tasks atomically after a merged primary PR, recording DONE status, commit evidence, and task README close artifacts for every included task.
  Scope: |-
    - In scope: Teach integrate/hosted-close/hosted-close-pr recovery to close primary and included batch tasks atomically after a merged primary PR, recording DONE status, commit evidence, and task README close artifacts for every included task.
    - Out of scope: unrelated refactors not required for "Cascade hosted branch_pr closure across batch tasks".
  Plan: "Depends on BDT05P. Scope: make primary PR merge/hosted-close close every included batch task atomically. Read batch membership from primary PR metadata, require every included task has verification evidence, write DONE status/commit/result for primary plus included tasks, and create close artifacts for each. Acceptance: hosted-close test with primary plus two included tasks leaves all tasks DONE and records merge evidence."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T16:01:08.728Z — VERIFY — ok
    
    By: CODER
    
    Note: hosted-close now cascades branch_pr batch closure to included tasks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T15:52:29.173Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: hosted-close resolves pr/meta batch membership, closes primary plus included tasks with one merge commit, handles partial retries, and stages included task artifacts in the close commit.
      Impact: A primary PR merge can no longer leave verified included leaf tasks in DOING solely because hosted-close only updated the primary task.
      Resolution: Verification: bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --test-name-pattern 'included branch_pr batch'; bun test packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --test-name-pattern 'included branch_pr batch|records first-class'; bun run typecheck; bun run format:check; bun run check:types-files; git diff --check; node .agentplane/policy/check-routing.mjs.
id_source: "generated"
---
## Summary

Cascade hosted branch_pr closure across batch tasks

Teach integrate/hosted-close/hosted-close-pr recovery to close primary and included batch tasks atomically after a merged primary PR, recording DONE status, commit evidence, and task README close artifacts for every included task.

## Scope

- In scope: Teach integrate/hosted-close/hosted-close-pr recovery to close primary and included batch tasks atomically after a merged primary PR, recording DONE status, commit evidence, and task README close artifacts for every included task.
- Out of scope: unrelated refactors not required for "Cascade hosted branch_pr closure across batch tasks".

## Plan

Depends on BDT05P. Scope: make primary PR merge/hosted-close close every included batch task atomically. Read batch membership from primary PR metadata, require every included task has verification evidence, write DONE status/commit/result for primary plus included tasks, and create close artifacts for each. Acceptance: hosted-close test with primary plus two included tasks leaves all tasks DONE and records merge evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T16:01:08.728Z — VERIFY — ok

By: CODER

Note: hosted-close now cascades branch_pr batch closure to included tasks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T15:52:29.173Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: hosted-close resolves pr/meta batch membership, closes primary plus included tasks with one merge commit, handles partial retries, and stages included task artifacts in the close commit.
  Impact: A primary PR merge can no longer leave verified included leaf tasks in DOING solely because hosted-close only updated the primary task.
  Resolution: Verification: bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --test-name-pattern 'included branch_pr batch'; bun test packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --test-name-pattern 'included branch_pr batch|records first-class'; bun run typecheck; bun run format:check; bun run check:types-files; git diff --check; node .agentplane/policy/check-routing.mjs.
