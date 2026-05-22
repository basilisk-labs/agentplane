---
id: "202605221110-36993E"
title: "Harden legacy upgrade dirty state handling"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "upgrade"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T11:10:17.040Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T11:28:58.936Z"
  updated_by: "CODER"
  note: "Focused upgrade hardening verified: prettier check, targeted ESLint, typecheck, git diff --check, upgrade regression suite 15/15, release-smoke legacy upgrade suite 3/3, doctor OK, policy routing OK."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: harden legacy upgrade handling so safe old-repo tracked drift emits warnings and does not block framework upgrade application."
events:
  -
    type: "status"
    at: "2026-05-22T11:18:26.791Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden legacy upgrade handling so safe old-repo tracked drift emits warnings and does not block framework upgrade application."
  -
    type: "verify"
    at: "2026-05-22T11:28:58.936Z"
    author: "CODER"
    state: "ok"
    note: "Focused upgrade hardening verified: prettier check, targeted ESLint, typecheck, git diff --check, upgrade regression suite 15/15, release-smoke legacy upgrade suite 3/3, doctor OK, policy routing OK."
doc_version: 3
doc_updated_at: "2026-05-22T11:28:58.955Z"
doc_updated_by: "CODER"
description: "Allow old repositories to upgrade across safe legacy dirty states with explicit warnings instead of aborting on unrelated tracked edits."
sections:
  Summary: |-
    Harden legacy upgrade dirty state handling

    Allow old repositories to upgrade across safe legacy dirty states with explicit warnings instead of aborting on unrelated tracked edits.
  Scope: |-
    - In scope: Allow old repositories to upgrade across safe legacy dirty states with explicit warnings instead of aborting on unrelated tracked edits.
    - Out of scope: unrelated refactors not required for "Harden legacy upgrade dirty state handling".
  Plan: |-
    1. Update upgrade preflight so safe unrelated tracked edits in old repos warn instead of aborting, while still preserving user-owned managed-path edits.
    2. Add regression fixtures for dirty unrelated tracked files and manual managed policy edits during upgrade.
    3. Run focused upgrade tests plus routing/doctor checks.
    4. Open PR, wait for hosted checks, merge to main, and finish the task.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T11:28:58.936Z — VERIFY — ok

    By: CODER

    Note: Focused upgrade hardening verified: prettier check, targeted ESLint, typecheck, git diff --check, upgrade regression suite 15/15, release-smoke legacy upgrade suite 3/3, doctor OK, policy routing OK.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T11:18:26.791Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221110-36993E-harden-legacy-upgrade/.agentplane/tasks/202605221110-36993E/blueprint/resolved-snapshot.json
    - old_digest: ba192d5ae374ef07683dfe6de1fd5c19510f3c52fea0fc3e2a7f95afe4b08c6a
    - current_digest: ba192d5ae374ef07683dfe6de1fd5c19510f3c52fea0fc3e2a7f95afe4b08c6a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221110-36993E

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Legacy upgrade now preserves pre-existing tracked edits as .agentplane/.upgrade/user-dirty/tracked.patch, warns the user, unstages pre-existing staged edits before upgrade commit, and leaves unrelated tracked edits out of the upgrade commit.
      Impact: Old repositories with unrelated dirty tracked files or staged local edits can still receive the framework upgrade without silently committing user changes.
      Resolution: Added prepareTrackedTreeForUpgrade and regression coverage for unstaged and staged dirty tracked files.
id_source: "generated"
---
## Summary

Harden legacy upgrade dirty state handling

Allow old repositories to upgrade across safe legacy dirty states with explicit warnings instead of aborting on unrelated tracked edits.

## Scope

- In scope: Allow old repositories to upgrade across safe legacy dirty states with explicit warnings instead of aborting on unrelated tracked edits.
- Out of scope: unrelated refactors not required for "Harden legacy upgrade dirty state handling".

## Plan

1. Update upgrade preflight so safe unrelated tracked edits in old repos warn instead of aborting, while still preserving user-owned managed-path edits.
2. Add regression fixtures for dirty unrelated tracked files and manual managed policy edits during upgrade.
3. Run focused upgrade tests plus routing/doctor checks.
4. Open PR, wait for hosted checks, merge to main, and finish the task.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T11:28:58.936Z — VERIFY — ok

By: CODER

Note: Focused upgrade hardening verified: prettier check, targeted ESLint, typecheck, git diff --check, upgrade regression suite 15/15, release-smoke legacy upgrade suite 3/3, doctor OK, policy routing OK.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T11:18:26.791Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221110-36993E-harden-legacy-upgrade/.agentplane/tasks/202605221110-36993E/blueprint/resolved-snapshot.json
- old_digest: ba192d5ae374ef07683dfe6de1fd5c19510f3c52fea0fc3e2a7f95afe4b08c6a
- current_digest: ba192d5ae374ef07683dfe6de1fd5c19510f3c52fea0fc3e2a7f95afe4b08c6a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221110-36993E

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Legacy upgrade now preserves pre-existing tracked edits as .agentplane/.upgrade/user-dirty/tracked.patch, warns the user, unstages pre-existing staged edits before upgrade commit, and leaves unrelated tracked edits out of the upgrade commit.
  Impact: Old repositories with unrelated dirty tracked files or staged local edits can still receive the framework upgrade without silently committing user changes.
  Resolution: Added prepareTrackedTreeForUpgrade and regression coverage for unstaged and staged dirty tracked files.
