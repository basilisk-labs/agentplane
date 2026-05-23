---
id: "202605231803-M9TK2M"
title: "Fix agent context cognitive-load regressions"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "context"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Confirm branch_pr next commands include a generated safe slug instead of a literal <slug> placeholder."
  - "Confirm task active shows a DOING task that task status can load directly."
  - "Confirm task brief text/JSON marks fallback Verify Steps quality and shows compact source confidence."
  - "Run focused route-decision and task active/brief CLI tests."
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T18:05:57.254Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T18:33:07.368Z"
  updated_by: "CODER"
  note: "Focused CLI regression tests, typecheck, lint, format, and live task active/brief checks passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix agent-facing active selector, task brief confidence/verification quality, and concrete branch_pr next commands for reduced cognitive load."
events:
  -
    type: "status"
    at: "2026-05-23T18:12:08.370Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix agent-facing active selector, task brief confidence/verification quality, and concrete branch_pr next commands for reduced cognitive load."
  -
    type: "verify"
    at: "2026-05-23T18:33:07.368Z"
    author: "CODER"
    state: "ok"
    note: "Focused CLI regression tests, typecheck, lint, format, and live task active/brief checks passed."
doc_version: 3
doc_updated_at: "2026-05-23T18:33:07.401Z"
doc_updated_by: "CODER"
description: "Fix active work selection and task brief guidance so agents can reliably choose active work, see confidence/verification quality, and execute generated branch_pr next commands without manual context stitching."
sections:
  Summary: |-
    Fix agent context cognitive-load regressions

    Fix active work selection and task brief guidance so agents can reliably choose active work, see confidence/verification quality, and execute generated branch_pr next commands without manual context stitching.
  Scope: |-
    - In scope: Fix active work selection and task brief guidance so agents can reliably choose active work, see confidence/verification quality, and execute generated branch_pr next commands without manual context stitching.
    - Out of scope: unrelated refactors not required for "Fix agent context cognitive-load regressions".
  Plan: "Fix the agent-facing context path end to end: make task active agree with direct task status, classify fallback Verify Steps as weak context, print compact source confidence in task brief text, and generate concrete branch_pr work start commands with safe slugs. Keep changes scoped to CLI task context surfaces and focused tests."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `Run focused route-decision and task active/brief CLI tests.`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `Confirm task active shows a DOING task that task status can load directly.`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `Confirm task brief text/JSON marks fallback Verify Steps quality and shows compact source confidence.`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `Confirm branch_pr next commands include a generated safe slug instead of a literal <slug> placeholder.`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T18:33:07.368Z — VERIFY — ok

    By: CODER

    Note: Focused CLI regression tests, typecheck, lint, format, and live task active/brief checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T18:12:08.370Z, excerpt_hash=sha256:7fd41c828c1e9b1e699ca19565c93d7fa1bf730556c31d76628294bddd13c066

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231803-M9TK2M-fix-agent-context-load/.agentplane/tasks/202605231803-M9TK2M/blueprint/resolved-snapshot.json
    - old_digest: dfd1919ccf47036866e124bb695395240c5a6f44bb51658ae3dd329569c3656c
    - current_digest: dfd1919ccf47036866e124bb695395240c5a6f44bb51658ae3dd329569c3656c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605231803-M9TK2M

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: task active --status DOING returns the active task; task brief reports fallback Verify Steps quality and compact source confidence; route-decision emits generated work start slug commands.
      Impact: Agents receive concrete next commands and source-quality signals instead of stale-empty active lists, hidden fallback Verify Steps, or literal slug placeholders.
      Resolution: Added projection empty canonical fallback, Verify Steps quality/source confidence, and generated safe worktree slugs with regression coverage.
id_source: "generated"
---
## Summary

Fix agent context cognitive-load regressions

Fix active work selection and task brief guidance so agents can reliably choose active work, see confidence/verification quality, and execute generated branch_pr next commands without manual context stitching.

## Scope

- In scope: Fix active work selection and task brief guidance so agents can reliably choose active work, see confidence/verification quality, and execute generated branch_pr next commands without manual context stitching.
- Out of scope: unrelated refactors not required for "Fix agent context cognitive-load regressions".

## Plan

Fix the agent-facing context path end to end: make task active agree with direct task status, classify fallback Verify Steps as weak context, print compact source confidence in task brief text, and generate concrete branch_pr work start commands with safe slugs. Keep changes scoped to CLI task context surfaces and focused tests.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `Run focused route-decision and task active/brief CLI tests.`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `Confirm task active shows a DOING task that task status can load directly.`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `Confirm task brief text/JSON marks fallback Verify Steps quality and shows compact source confidence.`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `Confirm branch_pr next commands include a generated safe slug instead of a literal <slug> placeholder.`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T18:33:07.368Z — VERIFY — ok

By: CODER

Note: Focused CLI regression tests, typecheck, lint, format, and live task active/brief checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T18:12:08.370Z, excerpt_hash=sha256:7fd41c828c1e9b1e699ca19565c93d7fa1bf730556c31d76628294bddd13c066

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231803-M9TK2M-fix-agent-context-load/.agentplane/tasks/202605231803-M9TK2M/blueprint/resolved-snapshot.json
- old_digest: dfd1919ccf47036866e124bb695395240c5a6f44bb51658ae3dd329569c3656c
- current_digest: dfd1919ccf47036866e124bb695395240c5a6f44bb51658ae3dd329569c3656c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605231803-M9TK2M

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: task active --status DOING returns the active task; task brief reports fallback Verify Steps quality and compact source confidence; route-decision emits generated work start slug commands.
  Impact: Agents receive concrete next commands and source-quality signals instead of stale-empty active lists, hidden fallback Verify Steps, or literal slug placeholders.
  Resolution: Added projection empty canonical fallback, Verify Steps quality/source confidence, and generated safe worktree slugs with regression coverage.
