---
id: "202605221744-XBKXEW"
title: "Add active work selector for agents"
result_summary: "Merged via PR #4064."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605221726-N6CQ5A"
tags:
  - "cli"
  - "code"
  - "performance"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "Confirm selector output includes next action, owner, dependency readiness, blocker count, and source freshness without printing historical DONE tasks."
  - "Run a focused cold-path or projection-cache performance check for the selector."
  - "Run targeted tests for active work selector ordering and filters."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:44:58.141Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T02:25:28.088Z"
  updated_by: "EVALUATOR"
  note: "Evaluator pass: active selector output includes ranked active TODO/DOING backlog only, dependency readiness, next actions, blocker counts, owner/priority, and live_local freshness; focused and full query-listing tests, typecheck, lint, format, docs check, knip baseline, task-scope check, bootstrap, smoke, and benchmark evidence passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T02:25:28.088Z"
  updated_by: "EVALUATOR"
  note: "Evaluator pass: active selector output includes ranked active TODO/DOING backlog only, dependency readiness, next actions, blocker counts, owner/priority, and live_local freshness; focused and full query-listing tests, typecheck, lint, format, docs check, knip baseline, task-scope check, bootstrap, smoke, and benchmark evidence passed."
  evaluated_sha: "a2a529d8f9d1a8c61c2ccf6ef2176e5a6f0f70f8"
  blueprint_digest: "16216c233d54e7696af1fc4a2e680684402c82633025ae2f35468e401d922cd5"
  evidence_refs:
    - ".agentplane/tasks/202605221744-XBKXEW/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-XBKXEW-active-work-selector/.agentplane/tasks/202605221744-XBKXEW/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "bd3edbaa1c83788a9a58210d08db4351b74be086"
  message: "Merge pull request #4064 from basilisk-labs/task/202605221744-XBKXEW/active-work-selector"
comments:
  -
    author: "CODER"
    body: "Start: implement active work selector for agents with ordering, filters, and focused performance evidence."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4064 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T02:15:04.429Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement active work selector for agents with ordering, filters, and focused performance evidence."
  -
    type: "verify"
    at: "2026-05-23T02:24:43.525Z"
    author: "CODER"
    state: "ok"
    note: "Implemented task active selector with owner/status/tag filters, ranking, dependency readiness, blocker counts, next action, and live_local freshness; focused tests, docs generation, typecheck, lint, format, bootstrap, and local smoke passed."
  -
    type: "verify"
    at: "2026-05-23T02:25:28.088Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator pass: active selector output includes ranked active TODO/DOING backlog only, dependency readiness, next actions, blocker counts, owner/priority, and live_local freshness; focused and full query-listing tests, typecheck, lint, format, docs check, knip baseline, task-scope check, bootstrap, smoke, and benchmark evidence passed."
  -
    type: "status"
    at: "2026-05-23T02:54:58.809Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4064 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T02:54:58.817Z"
doc_updated_by: "INTEGRATOR"
description: "Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog."
sections:
  Summary: |-
    Add active work selector for agents

    Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog.
  Scope: |-
    - In scope: Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog.
    - Out of scope: unrelated refactors not required for "Add active work selector for agents".
  Plan: "Build a compact active work selector for agents on top of the active task route summary. It should make the safest next task/action obvious, preserve explicit filters, and keep full historical listing behind the existing explicit path."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `Run targeted tests for active work selector ordering and filters.`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `Confirm selector output includes next action, owner, dependency readiness, blocker count, and source freshness without printing historical DONE tasks.`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `Run a focused cold-path or projection-cache performance check for the selector.`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T02:24:43.525Z — VERIFY — ok

    By: CODER

    Note: Implemented task active selector with owner/status/tag filters, ranking, dependency readiness, blocker counts, next action, and live_local freshness; focused tests, docs generation, typecheck, lint, format, bootstrap, and local smoke passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T02:15:04.429Z, excerpt_hash=sha256:f338ac5f31bbab3804d25ab2f30df5b386a33af8c24e2670589f3e3427b259fb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-XBKXEW-active-work-selector/.agentplane/tasks/202605221744-XBKXEW/blueprint/resolved-snapshot.json
    - old_digest: 16216c233d54e7696af1fc4a2e680684402c82633025ae2f35468e401d922cd5
    - current_digest: 16216c233d54e7696af1fc4a2e680684402c82633025ae2f35468e401d922cd5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221744-XBKXEW

    ### 2026-05-23T02:25:28.088Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator pass: active selector output includes ranked active TODO/DOING backlog only, dependency readiness, next actions, blocker counts, owner/priority, and live_local freshness; focused and full query-listing tests, typecheck, lint, format, docs check, knip baseline, task-scope check, bootstrap, smoke, and benchmark evidence passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T02:24:43.556Z, excerpt_hash=sha256:f338ac5f31bbab3804d25ab2f30df5b386a33af8c24e2670589f3e3427b259fb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-XBKXEW-active-work-selector/.agentplane/tasks/202605221744-XBKXEW/blueprint/resolved-snapshot.json
    - old_digest: 16216c233d54e7696af1fc4a2e680684402c82633025ae2f35468e401d922cd5
    - current_digest: 16216c233d54e7696af1fc4a2e680684402c82633025ae2f35468e401d922cd5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221744-XBKXEW

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Cold-path local benchmark over current registry: 3 runs with node dist CLI were 2.87s, 0.43s, 0.44s real time; first run includes cold process/cache cost and steady runs stay under 0.5s.
      Impact: Agents can ask for current active work without scanning DONE history and can prioritize ready unblocked tasks before waiting tasks.
      Resolution: Use agentplane task active or --json for machine-readable selector output.

    - Observation: Smoke output ranked the active DOING task first, two ready TODO CODER tasks next, and the DOCS task with incomplete XBKXEW dependency last; DONE tasks were absent.
      Impact: Selector behavior matches the documented active-work contract and is suitable for agent startup/backlog routing.
      Resolution: Proceed to PR publication and hosted checks.
id_source: "generated"
---
## Summary

Add active work selector for agents

Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog.

## Scope

- In scope: Add an agent-oriented active work selector that ranks TODO, DOING, BLOCKED, and anomaly tasks by actionable next step, ownership, dependency readiness, and route blockers instead of forcing agents to scan the full backlog.
- Out of scope: unrelated refactors not required for "Add active work selector for agents".

## Plan

Build a compact active work selector for agents on top of the active task route summary. It should make the safest next task/action obvious, preserve explicit filters, and keep full historical listing behind the existing explicit path.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `Run targeted tests for active work selector ordering and filters.`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `Confirm selector output includes next action, owner, dependency readiness, blocker count, and source freshness without printing historical DONE tasks.`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `Run a focused cold-path or projection-cache performance check for the selector.`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T02:24:43.525Z — VERIFY — ok

By: CODER

Note: Implemented task active selector with owner/status/tag filters, ranking, dependency readiness, blocker counts, next action, and live_local freshness; focused tests, docs generation, typecheck, lint, format, bootstrap, and local smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T02:15:04.429Z, excerpt_hash=sha256:f338ac5f31bbab3804d25ab2f30df5b386a33af8c24e2670589f3e3427b259fb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-XBKXEW-active-work-selector/.agentplane/tasks/202605221744-XBKXEW/blueprint/resolved-snapshot.json
- old_digest: 16216c233d54e7696af1fc4a2e680684402c82633025ae2f35468e401d922cd5
- current_digest: 16216c233d54e7696af1fc4a2e680684402c82633025ae2f35468e401d922cd5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221744-XBKXEW

### 2026-05-23T02:25:28.088Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator pass: active selector output includes ranked active TODO/DOING backlog only, dependency readiness, next actions, blocker counts, owner/priority, and live_local freshness; focused and full query-listing tests, typecheck, lint, format, docs check, knip baseline, task-scope check, bootstrap, smoke, and benchmark evidence passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T02:24:43.556Z, excerpt_hash=sha256:f338ac5f31bbab3804d25ab2f30df5b386a33af8c24e2670589f3e3427b259fb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221744-XBKXEW-active-work-selector/.agentplane/tasks/202605221744-XBKXEW/blueprint/resolved-snapshot.json
- old_digest: 16216c233d54e7696af1fc4a2e680684402c82633025ae2f35468e401d922cd5
- current_digest: 16216c233d54e7696af1fc4a2e680684402c82633025ae2f35468e401d922cd5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221744-XBKXEW

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Cold-path local benchmark over current registry: 3 runs with node dist CLI were 2.87s, 0.43s, 0.44s real time; first run includes cold process/cache cost and steady runs stay under 0.5s.
  Impact: Agents can ask for current active work without scanning DONE history and can prioritize ready unblocked tasks before waiting tasks.
  Resolution: Use agentplane task active or --json for machine-readable selector output.

- Observation: Smoke output ranked the active DOING task first, two ready TODO CODER tasks next, and the DOCS task with incomplete XBKXEW dependency last; DONE tasks were absent.
  Impact: Selector behavior matches the documented active-work contract and is suitable for agent startup/backlog routing.
  Resolution: Proceed to PR publication and hosted checks.
