---
id: "202605221715-E6HQJ1"
title: "Print release-ready resolver diagnostics in publish workflow"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "diagnostics"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:17:09.994Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T17:37:28.318Z"
  updated_by: "CODER"
  note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
events:
  -
    type: "status"
    at: "2026-05-22T17:17:56.868Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:28.318Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
doc_version: 3
doc_updated_at: "2026-05-22T17:37:28.339Z"
doc_updated_by: "CODER"
description: "Expose state, run id, conclusion, and next action when publish detect cannot resolve release-ready source."
sections:
  Summary: |-
    Print release-ready resolver diagnostics in publish workflow

    Expose state, run id, conclusion, and next action when publish detect cannot resolve release-ready source.
  Scope: |-
    - In scope: Expose state, run id, conclusion, and next action when publish detect cannot resolve release-ready source.
    - Out of scope: unrelated refactors not required for "Print release-ready resolver diagnostics in publish workflow".
  Plan: "Expose release-ready resolver failure diagnostics in publish workflow logs and outputs. Verify failed detect run prints state, run id, conclusion, and next action."
  Verify Steps: |-
    1. Run publish workflow contract tests.
    2. Run resolver script tests for failure payload.
    3. Confirm workflow logs print diagnostic payload when resolver exits nonzero.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:28.318Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:56.868Z, excerpt_hash=sha256:02fb460edbdbf122b538490749b3a8f7e2d8338e690e1937b5588fd7601440dc

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-E6HQJ1/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 4a0d0547249b15d6fdcf523f32d93b681067e130c52120ab693fc401daa762cb
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221715-E6HQJ1

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Print release-ready resolver diagnostics in publish workflow

Expose state, run id, conclusion, and next action when publish detect cannot resolve release-ready source.

## Scope

- In scope: Expose state, run id, conclusion, and next action when publish detect cannot resolve release-ready source.
- Out of scope: unrelated refactors not required for "Print release-ready resolver diagnostics in publish workflow".

## Plan

Expose release-ready resolver failure diagnostics in publish workflow logs and outputs. Verify failed detect run prints state, run id, conclusion, and next action.

## Verify Steps

1. Run publish workflow contract tests.
2. Run resolver script tests for failure payload.
3. Confirm workflow logs print diagnostic payload when resolver exits nonzero.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:28.318Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:56.868Z, excerpt_hash=sha256:02fb460edbdbf122b538490749b3a8f7e2d8338e690e1937b5588fd7601440dc

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-E6HQJ1/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 4a0d0547249b15d6fdcf523f32d93b681067e130c52120ab693fc401daa762cb
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221715-E6HQJ1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
