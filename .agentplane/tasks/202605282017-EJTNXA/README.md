---
id: "202605282017-EJTNXA"
title: "Evaluator command decomposition"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "agent-efficiency"
  - "code"
  - "evaluator"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T20:17:58.889Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T20:21:29.143Z"
  updated_by: "CODER"
  note: "Evaluator command decomposition verified: evaluator.command.ts reduced from 455 to 365 lines, quality artifact rendering/helpers extracted, evaluator run focused tests passed, typecheck passed, lint:core passed, format:changed passed, hotspot threshold check passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose evaluator command internals in the dedicated branch_pr worktree while preserving evaluator run behavior, quality report artifacts, and task README updates."
events:
  -
    type: "status"
    at: "2026-05-28T20:18:18.748Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose evaluator command internals in the dedicated branch_pr worktree while preserving evaluator run behavior, quality report artifacts, and task README updates."
  -
    type: "verify"
    at: "2026-05-28T20:21:29.143Z"
    author: "CODER"
    state: "ok"
    note: "Evaluator command decomposition verified: evaluator.command.ts reduced from 455 to 365 lines, quality artifact rendering/helpers extracted, evaluator run focused tests passed, typecheck passed, lint:core passed, format:changed passed, hotspot threshold check passed."
doc_version: 3
doc_updated_at: "2026-05-28T20:21:29.169Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/evaluator/evaluator.command.ts into focused evaluator command modules without changing evaluator CLI behavior. Extract option parsing/report construction/persistence helpers so quality-review evidence remains easier for agents to inspect and future evaluator changes touch smaller files."
sections:
  Summary: |-
    Evaluator command decomposition

    Decompose packages/agentplane/src/commands/evaluator/evaluator.command.ts into focused evaluator command modules without changing evaluator CLI behavior. Extract option parsing/report construction/persistence helpers so quality-review evidence remains easier for agents to inspect and future evaluator changes touch smaller files.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/evaluator/evaluator.command.ts into focused evaluator command modules without changing evaluator CLI behavior. Extract option parsing/report construction/persistence helpers so quality-review evidence remains easier for agents to inspect and future evaluator changes touch smaller files.
    - Out of scope: unrelated refactors not required for "Evaluator command decomposition".
  Plan: |-
    1. Inspect evaluator.command.ts and evaluator tests to identify extraction seams.
    2. Extract pure evaluator report/quality artifact helpers without changing evaluator run CLI output or task README writes.
    3. Keep evaluator.command.ts as the command facade and reduce hotspot line count below the warning threshold.
    4. Run evaluator-focused tests plus typecheck, lint, format, and hotspot threshold check.
    5. Open branch_pr, wait for hosted CI, merge to main, and close task lifecycle.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T20:21:29.143Z — VERIFY — ok

    By: CODER

    Note: Evaluator command decomposition verified: evaluator.command.ts reduced from 455 to 365 lines, quality artifact rendering/helpers extracted, evaluator run focused tests passed, typecheck passed, lint:core passed, format:changed passed, hotspot threshold check passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T20:18:18.748Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282017-EJTNXA-evaluator-command-decomposition/.agentplane/tasks/202605282017-EJTNXA/blueprint/resolved-snapshot.json
    - old_digest: ab4abe2d89a62a67484ee6f40ff476601da6f3570e7a51e62c085636edc96e33
    - current_digest: ab4abe2d89a62a67484ee6f40ff476601da6f3570e7a51e62c085636edc96e33
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282017-EJTNXA

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Evaluator command decomposition

Decompose packages/agentplane/src/commands/evaluator/evaluator.command.ts into focused evaluator command modules without changing evaluator CLI behavior. Extract option parsing/report construction/persistence helpers so quality-review evidence remains easier for agents to inspect and future evaluator changes touch smaller files.

## Scope

- In scope: Decompose packages/agentplane/src/commands/evaluator/evaluator.command.ts into focused evaluator command modules without changing evaluator CLI behavior. Extract option parsing/report construction/persistence helpers so quality-review evidence remains easier for agents to inspect and future evaluator changes touch smaller files.
- Out of scope: unrelated refactors not required for "Evaluator command decomposition".

## Plan

1. Inspect evaluator.command.ts and evaluator tests to identify extraction seams.
2. Extract pure evaluator report/quality artifact helpers without changing evaluator run CLI output or task README writes.
3. Keep evaluator.command.ts as the command facade and reduce hotspot line count below the warning threshold.
4. Run evaluator-focused tests plus typecheck, lint, format, and hotspot threshold check.
5. Open branch_pr, wait for hosted CI, merge to main, and close task lifecycle.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T20:21:29.143Z — VERIFY — ok

By: CODER

Note: Evaluator command decomposition verified: evaluator.command.ts reduced from 455 to 365 lines, quality artifact rendering/helpers extracted, evaluator run focused tests passed, typecheck passed, lint:core passed, format:changed passed, hotspot threshold check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T20:18:18.748Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282017-EJTNXA-evaluator-command-decomposition/.agentplane/tasks/202605282017-EJTNXA/blueprint/resolved-snapshot.json
- old_digest: ab4abe2d89a62a67484ee6f40ff476601da6f3570e7a51e62c085636edc96e33
- current_digest: ab4abe2d89a62a67484ee6f40ff476601da6f3570e7a51e62c085636edc96e33
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282017-EJTNXA

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
