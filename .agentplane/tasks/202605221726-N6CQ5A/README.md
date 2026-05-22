---
id: "202605221726-N6CQ5A"
title: "Add compact active task route summary"
result_summary: "Merged via PR #4036."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "performance"
  - "workflow"
verify:
  - "Confirm full historical task listing remains available through an explicit option."
  - "Run CLI cold-path benchmark or focused performance check for active task listing."
  - "Run targeted task list route-summary tests."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:29.477Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T20:50:12.190Z"
  updated_by: "EVALUATOR"
  note: "Verified: reviewed active task route summary implementation; --all keeps full history, default listing stays active-only, SQLite projection status filtering is bounded, and full-fast local CI passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T20:50:12.190Z"
  updated_by: "EVALUATOR"
  note: "Verified: reviewed active task route summary implementation; --all keeps full history, default listing stays active-only, SQLite projection status filtering is bounded, and full-fast local CI passed."
  evaluated_sha: "f5cdf07a0ee3ff13aa0fff0b397b86e8ebc67c49"
  blueprint_digest: "619487b6e07fee9641f376c44b700d5a7959fb3c8f0d91424bbf0774a61fea50"
  evidence_refs:
    - ".agentplane/tasks/202605221726-N6CQ5A/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-N6CQ5A-active-route-summary/.agentplane/tasks/202605221726-N6CQ5A/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "ddf3257dd4a532d34ea379fe50e70a1a0524febd"
  message: "Merge pull request #4036 from basilisk-labs/task/202605221726-N6CQ5A/active-route-summary"
comments:
  -
    author: "CODER"
    body: "Start: implementing compact active task route summary to avoid full historical startup scans while preserving explicit full listing access and route blockers."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4036 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-22T20:36:46.543Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing compact active task route summary to avoid full historical startup scans while preserving explicit full listing access and route blockers."
  -
    type: "verify"
    at: "2026-05-22T20:49:30.800Z"
    author: "CODER"
    state: "ok"
    note: "Verified: compact active task list defaults to active statuses with --all preserving historical output; SQLite projection hot path accepts status filters; targeted tests, typecheck, docs freshness, benchmark smoke, and full-fast local CI passed."
  -
    type: "verify"
    at: "2026-05-22T20:50:12.190Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: reviewed active task route summary implementation; --all keeps full history, default listing stays active-only, SQLite projection status filtering is bounded, and full-fast local CI passed."
  -
    type: "status"
    at: "2026-05-22T21:22:11.282Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4036 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-22T21:22:11.288Z"
doc_updated_by: "INTEGRATOR"
description: "Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work."
sections:
  Summary: |-
    Add compact active task route summary

    Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work.
  Scope: |-
    - In scope: Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work.
    - Out of scope: unrelated refactors not required for "Add compact active task route summary".
  Plan: "Add a compact active route summary for task list/startup surfaces. Keep full historical listing available behind an explicit flag. Verify that DOING, BLOCKED, MERGED_PENDING_CLOSE, unreadable tasks, stale PR metadata, and stale worktrees are summarized without printing thousands of DONE tasks."
  Verify Steps: |-
    1. Run targeted task list route-summary tests.
    2. Run a CLI cold-path benchmark or focused performance check for active task listing.
    3. Confirm full historical task listing remains available through an explicit option.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T20:49:30.800Z — VERIFY — ok

    By: CODER

    Note: Verified: compact active task list defaults to active statuses with --all preserving historical output; SQLite projection hot path accepts status filters; targeted tests, typecheck, docs freshness, benchmark smoke, and full-fast local CI passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T20:36:46.543Z, excerpt_hash=sha256:844b2ba7bf78d67cfc6b3a321e6fb4cb32a7eb0e00c69f383e15370561066a7a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-N6CQ5A-active-route-summary/.agentplane/tasks/202605221726-N6CQ5A/blueprint/resolved-snapshot.json
    - old_digest: 619487b6e07fee9641f376c44b700d5a7959fb3c8f0d91424bbf0774a61fea50
    - current_digest: 619487b6e07fee9641f376c44b700d5a7959fb3c8f0d91424bbf0774a61fea50
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-N6CQ5A

    ### 2026-05-22T20:50:12.190Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: reviewed active task route summary implementation; --all keeps full history, default listing stays active-only, SQLite projection status filtering is bounded, and full-fast local CI passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T20:49:30.835Z, excerpt_hash=sha256:844b2ba7bf78d67cfc6b3a321e6fb4cb32a7eb0e00c69f383e15370561066a7a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-N6CQ5A-active-route-summary/.agentplane/tasks/202605221726-N6CQ5A/blueprint/resolved-snapshot.json
    - old_digest: 619487b6e07fee9641f376c44b700d5a7959fb3c8f0d91424bbf0774a61fea50
    - current_digest: 619487b6e07fee9641f376c44b700d5a7959fb3c8f0d91424bbf0774a61fea50
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-N6CQ5A

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Default task list now returns the active route surface only; explicit --all returns the 2799-line historical list in this checkout.
      Impact: Startup and agent handoff context avoid flooding agents with DONE history while preserving full audit access.
      Resolution: Implemented active-status projection filters, updated CLI docs, moved the new regression test into a dedicated file to keep oversized baselines stable, and verified with focused plus full-fast checks.

    - Observation: The implementation preserves explicit historical audit access while shrinking default agent startup output.
      Impact: The change unblocks downstream agent context tasks and reduces repeated active-work inspection noise.
      Resolution: Proceed with amended one-commit PR #4036 and hosted checks.
id_source: "generated"
---
## Summary

Add compact active task route summary

Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work.

## Scope

- In scope: Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work.
- Out of scope: unrelated refactors not required for "Add compact active task route summary".

## Plan

Add a compact active route summary for task list/startup surfaces. Keep full historical listing available behind an explicit flag. Verify that DOING, BLOCKED, MERGED_PENDING_CLOSE, unreadable tasks, stale PR metadata, and stale worktrees are summarized without printing thousands of DONE tasks.

## Verify Steps

1. Run targeted task list route-summary tests.
2. Run a CLI cold-path benchmark or focused performance check for active task listing.
3. Confirm full historical task listing remains available through an explicit option.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T20:49:30.800Z — VERIFY — ok

By: CODER

Note: Verified: compact active task list defaults to active statuses with --all preserving historical output; SQLite projection hot path accepts status filters; targeted tests, typecheck, docs freshness, benchmark smoke, and full-fast local CI passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T20:36:46.543Z, excerpt_hash=sha256:844b2ba7bf78d67cfc6b3a321e6fb4cb32a7eb0e00c69f383e15370561066a7a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-N6CQ5A-active-route-summary/.agentplane/tasks/202605221726-N6CQ5A/blueprint/resolved-snapshot.json
- old_digest: 619487b6e07fee9641f376c44b700d5a7959fb3c8f0d91424bbf0774a61fea50
- current_digest: 619487b6e07fee9641f376c44b700d5a7959fb3c8f0d91424bbf0774a61fea50
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-N6CQ5A

### 2026-05-22T20:50:12.190Z — VERIFY — ok

By: EVALUATOR

Note: Verified: reviewed active task route summary implementation; --all keeps full history, default listing stays active-only, SQLite projection status filtering is bounded, and full-fast local CI passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T20:49:30.835Z, excerpt_hash=sha256:844b2ba7bf78d67cfc6b3a321e6fb4cb32a7eb0e00c69f383e15370561066a7a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-N6CQ5A-active-route-summary/.agentplane/tasks/202605221726-N6CQ5A/blueprint/resolved-snapshot.json
- old_digest: 619487b6e07fee9641f376c44b700d5a7959fb3c8f0d91424bbf0774a61fea50
- current_digest: 619487b6e07fee9641f376c44b700d5a7959fb3c8f0d91424bbf0774a61fea50
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-N6CQ5A

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Default task list now returns the active route surface only; explicit --all returns the 2799-line historical list in this checkout.
  Impact: Startup and agent handoff context avoid flooding agents with DONE history while preserving full audit access.
  Resolution: Implemented active-status projection filters, updated CLI docs, moved the new regression test into a dedicated file to keep oversized baselines stable, and verified with focused plus full-fast checks.

- Observation: The implementation preserves explicit historical audit access while shrinking default agent startup output.
  Impact: The change unblocks downstream agent context tasks and reduces repeated active-work inspection noise.
  Resolution: Proceed with amended one-commit PR #4036 and hosted checks.
