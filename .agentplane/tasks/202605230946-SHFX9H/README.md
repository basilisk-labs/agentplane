---
id: "202605230946-SHFX9H"
title: "Use shared isRecord guard in batch metadata code"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T09:47:02.754Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T09:48:58.551Z"
  updated_by: "CODER"
  note: "Implemented shared guard reuse. Evidence: bun run guards:check passed; bun test packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts passed (5 tests, 49 expects); bun run lint:core passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix release-blocking guards:check by reusing shared isRecord guard in branch_pr batch metadata code."
events:
  -
    type: "status"
    at: "2026-05-23T09:47:16.507Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix release-blocking guards:check by reusing shared isRecord guard in branch_pr batch metadata code."
  -
    type: "verify"
    at: "2026-05-23T09:48:58.551Z"
    author: "CODER"
    state: "ok"
    note: "Implemented shared guard reuse. Evidence: bun run guards:check passed; bun test packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts passed (5 tests, 49 expects); bun run lint:core passed."
doc_version: 3
doc_updated_at: "2026-05-23T09:48:58.565Z"
doc_updated_by: "CODER"
description: "Replace local isRecord helpers introduced in branch_pr batch metadata paths with the shared guard so release guards:check passes."
sections:
  Summary: |-
    Use shared isRecord guard in batch metadata code

    Replace local isRecord helpers introduced in branch_pr batch metadata paths with the shared guard so release guards:check passes.
  Scope: |-
    - In scope: Replace local isRecord helpers introduced in branch_pr batch metadata paths with the shared guard so release guards:check passes.
    - Out of scope: unrelated refactors not required for "Use shared isRecord guard in batch metadata code".
  Plan: "1. Replace local isRecord guard definitions in branch_pr batch metadata paths with the shared guard import. 2. Run guards:check plus focused batch/release next-action tests. 3. Merge through branch_pr before resuming v0.6.8 release."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T09:48:58.551Z — VERIFY — ok

    By: CODER

    Note: Implemented shared guard reuse. Evidence: bun run guards:check passed; bun test packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts passed (5 tests, 49 expects); bun run lint:core passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T09:47:16.507Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230946-SHFX9H-shared-isrecord-guard/.agentplane/tasks/202605230946-SHFX9H/blueprint/resolved-snapshot.json
    - old_digest: 86b82b03aa83c95f9304e1d1163b7b1b7bb097225ec1a04a1d5ef8bd64499c67
    - current_digest: 86b82b03aa83c95f9304e1d1163b7b1b7bb097225ec1a04a1d5ef8bd64499c67
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230946-SHFX9H

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Use shared isRecord guard in batch metadata code

Replace local isRecord helpers introduced in branch_pr batch metadata paths with the shared guard so release guards:check passes.

## Scope

- In scope: Replace local isRecord helpers introduced in branch_pr batch metadata paths with the shared guard so release guards:check passes.
- Out of scope: unrelated refactors not required for "Use shared isRecord guard in batch metadata code".

## Plan

1. Replace local isRecord guard definitions in branch_pr batch metadata paths with the shared guard import. 2. Run guards:check plus focused batch/release next-action tests. 3. Merge through branch_pr before resuming v0.6.8 release.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T09:48:58.551Z — VERIFY — ok

By: CODER

Note: Implemented shared guard reuse. Evidence: bun run guards:check passed; bun test packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts packages/agentplane/src/commands/release/release-next-action-script.test.ts passed (5 tests, 49 expects); bun run lint:core passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T09:47:16.507Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230946-SHFX9H-shared-isrecord-guard/.agentplane/tasks/202605230946-SHFX9H/blueprint/resolved-snapshot.json
- old_digest: 86b82b03aa83c95f9304e1d1163b7b1b7bb097225ec1a04a1d5ef8bd64499c67
- current_digest: 86b82b03aa83c95f9304e1d1163b7b1b7bb097225ec1a04a1d5ef8bd64499c67
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230946-SHFX9H

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
