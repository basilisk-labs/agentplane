---
id: "202605281934-ZA0BEE"
title: "Route decision module decomposition"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "agent-efficiency"
  - "code"
  - "refactor"
  - "route-oracle"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T19:34:36.129Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T19:39:40.365Z"
  updated_by: "CODER"
  note: "Route decision decomposition verified: facade reduced to 335 lines, blockers/next-action/types extracted into focused modules, route-decision CLI tests passed, typecheck passed, hotspot threshold check passed, format:changed passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T19:40:03.838Z"
  updated_by: "EVALUATOR"
  note: "Route decision facade decomposed into focused modules with unchanged CLI route-decision behavior."
  evaluated_sha: "68b96584c9a3aba4ca7823af4115b599558bfc62"
  blueprint_digest: "cba1b8dabedfca03e084b837fcea290fe2bd08ab57aa5c5f8c1f9ca106f5a9e5"
  evidence_refs:
    - ".agentplane/tasks/202605281934-ZA0BEE/README.md"
    - ".agentplane/tasks/202605281934-ZA0BEE/quality/20260528-194003838-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605281934-ZA0BEE/quality/20260528-194003838-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605281934-ZA0BEE/quality/20260528-194003838-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605281934-ZA0BEE/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/route-decision.ts"
    - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
    - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
    - "packages/agentplane/src/commands/shared/route-decision-types.ts"
  findings:
    - "Evidence: route-decision facade is 335 lines; extracted blockers, next-action, and shared types modules; vitest route-decision suites passed; typecheck, hotspot check, and format:changed passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose route decision internals from the dedicated branch_pr worktree while preserving the public route oracle output and verifying with targeted tests plus typecheck."
events:
  -
    type: "status"
    at: "2026-05-28T19:34:55.410Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose route decision internals from the dedicated branch_pr worktree while preserving the public route oracle output and verifying with targeted tests plus typecheck."
  -
    type: "verify"
    at: "2026-05-28T19:39:40.365Z"
    author: "CODER"
    state: "ok"
    note: "Route decision decomposition verified: facade reduced to 335 lines, blockers/next-action/types extracted into focused modules, route-decision CLI tests passed, typecheck passed, hotspot threshold check passed, format:changed passed."
doc_version: 3
doc_updated_at: "2026-05-28T19:39:40.390Z"
doc_updated_by: "CODER"
description: "Decompose the route decision hotspot into focused, testable modules without changing route semantics. Keep the public command behavior stable while isolating pure route classification, hosted/PR state interpretation, blocker formatting, and next-command rendering so agents receive the same or better next-action guidance from smaller code units."
sections:
  Summary: |-
    Route decision module decomposition

    Decompose the route decision hotspot into focused, testable modules without changing route semantics. Keep the public command behavior stable while isolating pure route classification, hosted/PR state interpretation, blocker formatting, and next-command rendering so agents receive the same or better next-action guidance from smaller code units.
  Scope: |-
    - In scope: Decompose the route decision hotspot into focused, testable modules without changing route semantics. Keep the public command behavior stable while isolating pure route classification, hosted/PR state interpretation, blocker formatting, and next-command rendering so agents receive the same or better next-action guidance from smaller code units.
    - Out of scope: unrelated refactors not required for "Route decision module decomposition".
  Plan: |-
    1. Split route decision into focused internal modules while preserving exported behavior.
    2. Extract pure blocker/phase formatting and next-command rendering helpers with unit coverage.
    3. Keep packages/agentplane/src/commands/shared/route-decision.ts as the compatibility facade and reduce its responsibility/line count.
    4. Extend existing route decision tests or add narrow tests for unchanged next-action output.
    5. Verify with targeted tests, hotspot report check, typecheck, and changed-file formatting.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T19:39:40.365Z — VERIFY — ok

    By: CODER

    Note: Route decision decomposition verified: facade reduced to 335 lines, blockers/next-action/types extracted into focused modules, route-decision CLI tests passed, typecheck passed, hotspot threshold check passed, format:changed passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T19:34:55.410Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605281934-ZA0BEE-route-decision-module-decomposition/.agentplane/tasks/202605281934-ZA0BEE/blueprint/resolved-snapshot.json
    - old_digest: cba1b8dabedfca03e084b837fcea290fe2bd08ab57aa5c5f8c1f9ca106f5a9e5
    - current_digest: cba1b8dabedfca03e084b837fcea290fe2bd08ab57aa5c5f8c1f9ca106f5a9e5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281934-ZA0BEE

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Route decision module decomposition

Decompose the route decision hotspot into focused, testable modules without changing route semantics. Keep the public command behavior stable while isolating pure route classification, hosted/PR state interpretation, blocker formatting, and next-command rendering so agents receive the same or better next-action guidance from smaller code units.

## Scope

- In scope: Decompose the route decision hotspot into focused, testable modules without changing route semantics. Keep the public command behavior stable while isolating pure route classification, hosted/PR state interpretation, blocker formatting, and next-command rendering so agents receive the same or better next-action guidance from smaller code units.
- Out of scope: unrelated refactors not required for "Route decision module decomposition".

## Plan

1. Split route decision into focused internal modules while preserving exported behavior.
2. Extract pure blocker/phase formatting and next-command rendering helpers with unit coverage.
3. Keep packages/agentplane/src/commands/shared/route-decision.ts as the compatibility facade and reduce its responsibility/line count.
4. Extend existing route decision tests or add narrow tests for unchanged next-action output.
5. Verify with targeted tests, hotspot report check, typecheck, and changed-file formatting.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T19:39:40.365Z — VERIFY — ok

By: CODER

Note: Route decision decomposition verified: facade reduced to 335 lines, blockers/next-action/types extracted into focused modules, route-decision CLI tests passed, typecheck passed, hotspot threshold check passed, format:changed passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T19:34:55.410Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605281934-ZA0BEE-route-decision-module-decomposition/.agentplane/tasks/202605281934-ZA0BEE/blueprint/resolved-snapshot.json
- old_digest: cba1b8dabedfca03e084b837fcea290fe2bd08ab57aa5c5f8c1f9ca106f5a9e5
- current_digest: cba1b8dabedfca03e084b837fcea290fe2bd08ab57aa5c5f8c1f9ca106f5a9e5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281934-ZA0BEE

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
