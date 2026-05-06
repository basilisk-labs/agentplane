---
id: "202605060915-6GW4NW"
title: "Gate trusted local blueprints before runner materialization"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605060915-N3MJJ1"
  - "202605060915-RDNE1Q"
tags:
  - "blueprints"
  - "code"
  - "runner"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T10:36:12.735Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T14:57:33.819Z"
  updated_by: "INTEGRATOR"
  note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
commit:
  hash: "2e72b6ee9fa45c8fe63fafb02a7919ea687c2153"
  message: "Merge pull request #976 from basilisk-labs/task-close/202605060915-0EDRBK/3b4f6276caab"
comments:
  -
    author: "ENGINEER"
    body: "Start: gate trusted local blueprints before runner materialization."
  -
    author: "INTEGRATOR"
    body: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
events:
  -
    type: "status"
    at: "2026-05-06T10:36:12.936Z"
    author: "ENGINEER"
    from: "TODO"
    to: "DOING"
    note: "Start: gate trusted local blueprints before runner materialization."
  -
    type: "verify"
    at: "2026-05-06T10:37:24.815Z"
    author: "ENGINEER"
    state: "ok"
    note: "Runner preparation now fails closed on invalid project-local blueprint trust before bundle materialization."
  -
    type: "verify"
    at: "2026-05-06T14:57:33.819Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
  -
    type: "status"
    at: "2026-05-06T14:58:16.684Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
doc_version: 3
doc_updated_at: "2026-05-06T14:58:16.684Z"
doc_updated_by: "INTEGRATOR"
description: "Ensure trusted project-local blueprints cannot enter task snapshots or runner bundles unless the trust config, compatibility report, and explicit selection rules all pass."
sections:
  Summary: |-
    Gate trusted local blueprints before runner materialization

    Ensure trusted project-local blueprints cannot enter task snapshots or runner bundles unless the trust config, compatibility report, and explicit selection rules all pass.
  Scope: |-
    - In scope: Ensure trusted project-local blueprints cannot enter task snapshots or runner bundles unless the trust config, compatibility report, and explicit selection rules all pass.
    - Out of scope: unrelated refactors not required for "Gate trusted local blueprints before runner materialization".
  Plan: "Gate runner materialization on project-local blueprint trust compatibility: before resolving runner blueprint plans, load trusted project-local registry; fail closed with validation errors if trust config or local blueprint files are invalid. Cover accepted trusted ids and invalid config refusal."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T10:37:24.815Z — VERIFY — ok

    By: ENGINEER

    Note: Runner preparation now fails closed on invalid project-local blueprint trust before bundle materialization.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:36:12.936Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-S7TK13-blueprint-local-governance/.agentplane/tasks/202605060915-6GW4NW/blueprint/resolved-snapshot.json
    - old_digest: 48d92797c48d15c2f26a232e682ea17361f61ae75fe083b9bacbab4567e4e11b
    - current_digest: 48d92797c48d15c2f26a232e682ea17361f61ae75fe083b9bacbab4567e4e11b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-6GW4NW

    ### 2026-05-06T14:57:33.819Z — VERIFY — ok

    By: INTEGRATOR

    Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:37:24.819Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Gate trusted local blueprints before runner materialization

Ensure trusted project-local blueprints cannot enter task snapshots or runner bundles unless the trust config, compatibility report, and explicit selection rules all pass.

## Scope

- In scope: Ensure trusted project-local blueprints cannot enter task snapshots or runner bundles unless the trust config, compatibility report, and explicit selection rules all pass.
- Out of scope: unrelated refactors not required for "Gate trusted local blueprints before runner materialization".

## Plan

Gate runner materialization on project-local blueprint trust compatibility: before resolving runner blueprint plans, load trusted project-local registry; fail closed with validation errors if trust config or local blueprint files are invalid. Cover accepted trusted ids and invalid config refusal.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T10:37:24.815Z — VERIFY — ok

By: ENGINEER

Note: Runner preparation now fails closed on invalid project-local blueprint trust before bundle materialization.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:36:12.936Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-S7TK13-blueprint-local-governance/.agentplane/tasks/202605060915-6GW4NW/blueprint/resolved-snapshot.json
- old_digest: 48d92797c48d15c2f26a232e682ea17361f61ae75fe083b9bacbab4567e4e11b
- current_digest: 48d92797c48d15c2f26a232e682ea17361f61ae75fe083b9bacbab4567e4e11b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605060915-6GW4NW

### 2026-05-06T14:57:33.819Z — VERIFY — ok

By: INTEGRATOR

Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:37:24.819Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
