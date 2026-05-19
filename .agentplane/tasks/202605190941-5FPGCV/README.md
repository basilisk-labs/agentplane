---
id: "202605190941-5FPGCV"
title: "Gate release on task registry reconciliation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-05-19T09:43:55.892Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T09:52:04.837Z"
  updated_by: "CODER"
  note: "Verified release task registry gate: focused task-registry-ready tests passed, task-state normal check still passes, candidate dry-run includes release:tasks:check before incidents."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement pre-release task registry reconciliation gate as part of the approved batch PR owned by P1Q6BB."
events:
  -
    type: "status"
    at: "2026-05-19T09:44:08.311Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement pre-release task registry reconciliation gate as part of the approved batch PR owned by P1Q6BB."
  -
    type: "verify"
    at: "2026-05-19T09:52:04.837Z"
    author: "CODER"
    state: "ok"
    note: "Verified release task registry gate: focused task-registry-ready tests passed, task-state normal check still passes, candidate dry-run includes release:tasks:check before incidents."
doc_version: 3
doc_updated_at: "2026-05-19T09:52:04.855Z"
doc_updated_by: "CODER"
description: "Add a pre-release gate that detects stale local DOING tasks and unreadable task files before release candidate or publish readiness, with clear remediation guidance."
sections:
  Summary: |-
    Gate release on task registry reconciliation

    Add a pre-release gate that detects stale local DOING tasks and unreadable task files before release candidate or publish readiness, with clear remediation guidance.
  Scope: |-
    - In scope: Add a pre-release gate that detects stale local DOING tasks and unreadable task files before release candidate or publish readiness, with clear remediation guidance.
    - Out of scope: unrelated refactors not required for "Gate release on task registry reconciliation".
  Plan: "Batch included task. Add pre-release task registry reconciliation gate. Acceptance: release candidate/prepublish blocks before publication when local registry contains stale DOING tasks or unreadable task files, and clean current main passes."
  Verify Steps: |-
    1. Run focused registry release-readiness tests. Expected: clean registry passes; stale DOING and unreadable task files fail with actionable output.
    2. Run release:prepublish:fast or the release gate subset. Expected: pass on current clean main.
    3. Run task listing/status smoke. Expected: current local registry remains DOING=0.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T09:52:04.837Z — VERIFY — ok

    By: CODER

    Note: Verified release task registry gate: focused task-registry-ready tests passed, task-state normal check still passes, candidate dry-run includes release:tasks:check before incidents.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T09:44:08.311Z, excerpt_hash=sha256:f1a1f009a496a46cf646522752d3865a5c5cb28f44b8709c60171793e940f28a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-5FPGCV/blueprint/resolved-snapshot.json
    - old_digest: ff3fb28575c47364bc10dca795ee2d6e83a30547f7f5ac3bf33787d03b2dfa76
    - current_digest: ff3fb28575c47364bc10dca795ee2d6e83a30547f7f5ac3bf33787d03b2dfa76
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605190941-5FPGCV

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: task-registry-ready-script.test.ts passed; bun run task-state:check passed; release:candidate:prepare --json lists release:tasks:check before release:incidents:check.
      Impact: Release candidate/publish readiness now blocks stale DOING task registry state without breaking ordinary PR task-state checks.
      Resolution: Added release:tasks:check and publish workflow task registry gate.
id_source: "generated"
---
## Summary

Gate release on task registry reconciliation

Add a pre-release gate that detects stale local DOING tasks and unreadable task files before release candidate or publish readiness, with clear remediation guidance.

## Scope

- In scope: Add a pre-release gate that detects stale local DOING tasks and unreadable task files before release candidate or publish readiness, with clear remediation guidance.
- Out of scope: unrelated refactors not required for "Gate release on task registry reconciliation".

## Plan

Batch included task. Add pre-release task registry reconciliation gate. Acceptance: release candidate/prepublish blocks before publication when local registry contains stale DOING tasks or unreadable task files, and clean current main passes.

## Verify Steps

1. Run focused registry release-readiness tests. Expected: clean registry passes; stale DOING and unreadable task files fail with actionable output.
2. Run release:prepublish:fast or the release gate subset. Expected: pass on current clean main.
3. Run task listing/status smoke. Expected: current local registry remains DOING=0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T09:52:04.837Z — VERIFY — ok

By: CODER

Note: Verified release task registry gate: focused task-registry-ready tests passed, task-state normal check still passes, candidate dry-run includes release:tasks:check before incidents.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T09:44:08.311Z, excerpt_hash=sha256:f1a1f009a496a46cf646522752d3865a5c5cb28f44b8709c60171793e940f28a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605190941-P1Q6BB-release-pipeline-hardening/.agentplane/tasks/202605190941-5FPGCV/blueprint/resolved-snapshot.json
- old_digest: ff3fb28575c47364bc10dca795ee2d6e83a30547f7f5ac3bf33787d03b2dfa76
- current_digest: ff3fb28575c47364bc10dca795ee2d6e83a30547f7f5ac3bf33787d03b2dfa76
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605190941-5FPGCV

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: task-registry-ready-script.test.ts passed; bun run task-state:check passed; release:candidate:prepare --json lists release:tasks:check before release:incidents:check.
  Impact: Release candidate/publish readiness now blocks stale DOING task registry state without breaking ordinary PR task-state checks.
  Resolution: Added release:tasks:check and publish workflow task registry gate.
