---
id: "202605230831-GKV94B"
title: "Add release next-action diagnostic"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T09:15:21.128Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T09:24:57.474Z"
  updated_by: "CODER"
  note: "Implemented release next-action diagnostic expansion. Evidence: bun test packages/agentplane/src/commands/release/release-next-action-script.test.ts (2 pass, 14 expects); bun run lint:core passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extend release next-action diagnostics with release SHA, release-ready source, publish status, registry/tag/release truth, and focused tests."
events:
  -
    type: "status"
    at: "2026-05-23T09:15:33.351Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend release next-action diagnostics with release SHA, release-ready source, publish status, registry/tag/release truth, and focused tests."
  -
    type: "verify"
    at: "2026-05-23T09:24:57.474Z"
    author: "CODER"
    state: "ok"
    note: "Implemented release next-action diagnostic expansion. Evidence: bun test packages/agentplane/src/commands/release/release-next-action-script.test.ts (2 pass, 14 expects); bun run lint:core passed."
doc_version: 3
doc_updated_at: "2026-05-23T09:24:57.487Z"
doc_updated_by: "CODER"
description: "Provide one compact command that reports release SHA, release-ready artifact, publish status, npm/tag/release truth, and the next manual action."
sections:
  Summary: |-
    Add release next-action diagnostic

    Provide one compact command that reports release SHA, release-ready artifact, publish status, npm/tag/release truth, and the next manual action.
  Scope: |-
    - In scope: Provide one compact command that reports release SHA, release-ready artifact, publish status, npm/tag/release truth, and the next manual action.
    - Out of scope: unrelated refactors not required for "Add release next-action diagnostic".
  Plan: "1. Extend release state with optional GitHub/tag/release-ready diagnostics needed by release:next-action. 2. Update release:next-action to print release SHA, release-ready artifact/source, publish workflow status, registry/tag/release truth, and one manual next command. 3. Add focused regression tests for the new diagnostic contract and run targeted checks."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T09:24:57.474Z — VERIFY — ok

    By: CODER

    Note: Implemented release next-action diagnostic expansion. Evidence: bun test packages/agentplane/src/commands/release/release-next-action-script.test.ts (2 pass, 14 expects); bun run lint:core passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T09:15:33.351Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-GKV94B-release-next-action-diagnostic/.agentplane/tasks/202605230831-GKV94B/blueprint/resolved-snapshot.json
    - old_digest: 0125320d098ffa1c05525878358f1d490ce0cfe78436b17c88be8b66bd6a09ba
    - current_digest: 0125320d098ffa1c05525878358f1d490ce0cfe78436b17c88be8b66bd6a09ba
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605230831-GKV94B

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add release next-action diagnostic

Provide one compact command that reports release SHA, release-ready artifact, publish status, npm/tag/release truth, and the next manual action.

## Scope

- In scope: Provide one compact command that reports release SHA, release-ready artifact, publish status, npm/tag/release truth, and the next manual action.
- Out of scope: unrelated refactors not required for "Add release next-action diagnostic".

## Plan

1. Extend release state with optional GitHub/tag/release-ready diagnostics needed by release:next-action. 2. Update release:next-action to print release SHA, release-ready artifact/source, publish workflow status, registry/tag/release truth, and one manual next command. 3. Add focused regression tests for the new diagnostic contract and run targeted checks.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T09:24:57.474Z — VERIFY — ok

By: CODER

Note: Implemented release next-action diagnostic expansion. Evidence: bun test packages/agentplane/src/commands/release/release-next-action-script.test.ts (2 pass, 14 expects); bun run lint:core passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T09:15:33.351Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605230831-GKV94B-release-next-action-diagnostic/.agentplane/tasks/202605230831-GKV94B/blueprint/resolved-snapshot.json
- old_digest: 0125320d098ffa1c05525878358f1d490ce0cfe78436b17c88be8b66bd6a09ba
- current_digest: 0125320d098ffa1c05525878358f1d490ce0cfe78436b17c88be8b66bd6a09ba
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605230831-GKV94B

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
