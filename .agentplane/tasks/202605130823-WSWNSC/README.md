---
id: "202605130823-WSWNSC"
title: "Persist GitHub PR identity for open branch_pr artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "bug"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T08:23:59.090Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T08:39:31.692Z"
  updated_by: "CODER"
  note: "Verified: GitHub PR identity persistence now records OPEN pull request metadata in branch_pr PR artifacts, while focused tests confirm pr open creation and pr update hydration behavior."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the approved PR identity persistence fix in the task worktree, keep merged lifecycle semantics scoped to MERGED only, add focused regression tests for pr open/update OPEN identity hydration, and run the declared verification checks before handoff."
events:
  -
    type: "status"
    at: "2026-05-13T08:24:28.848Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved PR identity persistence fix in the task worktree, keep merged lifecycle semantics scoped to MERGED only, add focused regression tests for pr open/update OPEN identity hydration, and run the declared verification checks before handoff."
  -
    type: "verify"
    at: "2026-05-13T08:39:31.692Z"
    author: "CODER"
    state: "ok"
    note: "Verified: GitHub PR identity persistence now records OPEN pull request metadata in branch_pr PR artifacts, while focused tests confirm pr open creation and pr update hydration behavior."
doc_version: 3
doc_updated_at: "2026-05-13T08:39:31.699Z"
doc_updated_by: "CODER"
description: "Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests."
sections:
  Summary: |-
    Persist GitHub PR identity for open branch_pr artifacts
    
    Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests.
  Scope: |-
    - In scope: Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests.
    - Out of scope: unrelated refactors not required for "Persist GitHub PR identity for open branch_pr artifacts".
  Plan: |-
    1. Update PR sync GitHub metadata persistence so observed OPEN/CLOSED/MERGED PR identity is recorded in task pr/meta.json.
    2. Preserve merged artifact lifecycle semantics only for MERGED PRs.
    3. Add focused tests proving pr open and pr update persist OPEN GitHub identity.
    4. Run targeted tests plus routing/doctor checks and record verification evidence.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T08:39:31.692Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: GitHub PR identity persistence now records OPEN pull request metadata in branch_pr PR artifacts, while focused tests confirm pr open creation and pr update hydration behavior.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T08:24:28.848Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts | Result: pass | Evidence: 3 pass, 0 fail, 22 expect calls.
    Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts | Result: pass | Evidence: 4 pass, 0 fail, 24 expect calls.
    Command: bun run typecheck | Result: pass | Evidence: tsc -b completed with exit code 0.
    Command: bun run lint:core | Result: pass | Evidence: eslint packages scripts eslint.config.cjs vitest.config.ts completed with exit code 0.
    Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK.
    Command: ap doctor | Result: pass | Evidence: doctor OK with 0 errors and 0 warnings.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130823-WSWNSC-persist-pr-identity/.agentplane/tasks/202605130823-WSWNSC/blueprint/resolved-snapshot.json
    - old_digest: af11500a959eac30b62cc377d5d6cb5b0e189af4716b1b5569f8e4eeeb59d410
    - current_digest: af11500a959eac30b62cc377d5d6cb5b0e189af4716b1b5569f8e4eeeb59d410
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130823-WSWNSC
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The first direct exact-file eslint attempt used an invalid invocation for this repo and failed on unresolved test helper types across untouched lines; the canonical lint:core command passed.
      Impact: No residual product impact; verification relies on the project lint command instead of the invalid ad hoc exact-file invocation.
      Resolution: Recorded canonical lint:core pass, typecheck pass, focused regression tests, policy routing, and doctor.
id_source: "generated"
---
## Summary

Persist GitHub PR identity for open branch_pr artifacts

Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests.

## Scope

- In scope: Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests.
- Out of scope: unrelated refactors not required for "Persist GitHub PR identity for open branch_pr artifacts".

## Plan

1. Update PR sync GitHub metadata persistence so observed OPEN/CLOSED/MERGED PR identity is recorded in task pr/meta.json.
2. Preserve merged artifact lifecycle semantics only for MERGED PRs.
3. Add focused tests proving pr open and pr update persist OPEN GitHub identity.
4. Run targeted tests plus routing/doctor checks and record verification evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T08:39:31.692Z — VERIFY — ok

By: CODER

Note: Verified: GitHub PR identity persistence now records OPEN pull request metadata in branch_pr PR artifacts, while focused tests confirm pr open creation and pr update hydration behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T08:24:28.848Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts | Result: pass | Evidence: 3 pass, 0 fail, 22 expect calls.
Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts | Result: pass | Evidence: 4 pass, 0 fail, 24 expect calls.
Command: bun run typecheck | Result: pass | Evidence: tsc -b completed with exit code 0.
Command: bun run lint:core | Result: pass | Evidence: eslint packages scripts eslint.config.cjs vitest.config.ts completed with exit code 0.
Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK.
Command: ap doctor | Result: pass | Evidence: doctor OK with 0 errors and 0 warnings.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130823-WSWNSC-persist-pr-identity/.agentplane/tasks/202605130823-WSWNSC/blueprint/resolved-snapshot.json
- old_digest: af11500a959eac30b62cc377d5d6cb5b0e189af4716b1b5569f8e4eeeb59d410
- current_digest: af11500a959eac30b62cc377d5d6cb5b0e189af4716b1b5569f8e4eeeb59d410
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130823-WSWNSC

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The first direct exact-file eslint attempt used an invalid invocation for this repo and failed on unresolved test helper types across untouched lines; the canonical lint:core command passed.
  Impact: No residual product impact; verification relies on the project lint command instead of the invalid ad hoc exact-file invocation.
  Resolution: Recorded canonical lint:core pass, typecheck pass, focused regression tests, policy routing, and doctor.
