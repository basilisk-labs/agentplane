---
id: "202605280743-P4J3DQ"
title: "Gate context policy during upgrade"
status: "DOING"
priority: "med"
owner: "UPGRADER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T07:43:50.592Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T07:44:38.448Z"
  updated_by: "UPGRADER"
  note: "Verified upgrade gating for context policy: typecheck passed; full upgrade suite passed; combined targeted vitest passed; policy routing and builtin asset freshness passed; ap config show and ap quickstart passed after repo-local rebuild."
  attempts: 0
commit: null
comments:
  -
    author: "UPGRADER"
    body: "Start: implementing verified upgrade gating for context policy installation and preserving regression evidence."
events:
  -
    type: "status"
    at: "2026-05-28T07:43:53.013Z"
    author: "UPGRADER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing verified upgrade gating for context policy installation and preserving regression evidence."
  -
    type: "verify"
    at: "2026-05-28T07:44:38.448Z"
    author: "UPGRADER"
    state: "ok"
    note: "Verified upgrade gating for context policy: typecheck passed; full upgrade suite passed; combined targeted vitest passed; policy routing and builtin asset freshness passed; ap config show and ap quickstart passed after repo-local rebuild."
doc_version: 3
doc_updated_at: "2026-05-28T07:44:38.500Z"
doc_updated_by: "UPGRADER"
description: "Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage."
sections:
  Summary: |-
    Gate context policy during upgrade

    Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage.
  Scope: |-
    - In scope: Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage.
    - Out of scope: unrelated refactors not required for "Gate context policy during upgrade".
  Plan: |-
    Plan:
    1. Keep packaged AGENTS/CLAUDE gateway context-free by default.
    2. Make context init own context.must.md installation and gateway overlay.
    3. Make upgrade install/retain context policy only when .agentplane/context/agentplane.context.yaml exists.
    4. Cover both non-context and initialized-context upgrade paths with regression tests.
    5. Verify typecheck, targeted vitest suites, routing check, generated assets check, and CLI quickstart.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T07:44:38.448Z — VERIFY — ok

    By: UPGRADER

    Note: Verified upgrade gating for context policy: typecheck passed; full upgrade suite passed; combined targeted vitest passed; policy routing and builtin asset freshness passed; ap config show and ap quickstart passed after repo-local rebuild.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T07:43:53.013Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605280743-P4J3DQ/blueprint/resolved-snapshot.json
    - old_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
    - current_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605280743-P4J3DQ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Gate context policy during upgrade

Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage.

## Scope

- In scope: Fix upgrade so context.must.md is installed only for repositories with initialized context layer, and add regression coverage.
- Out of scope: unrelated refactors not required for "Gate context policy during upgrade".

## Plan

Plan:
1. Keep packaged AGENTS/CLAUDE gateway context-free by default.
2. Make context init own context.must.md installation and gateway overlay.
3. Make upgrade install/retain context policy only when .agentplane/context/agentplane.context.yaml exists.
4. Cover both non-context and initialized-context upgrade paths with regression tests.
5. Verify typecheck, targeted vitest suites, routing check, generated assets check, and CLI quickstart.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T07:44:38.448Z — VERIFY — ok

By: UPGRADER

Note: Verified upgrade gating for context policy: typecheck passed; full upgrade suite passed; combined targeted vitest passed; policy routing and builtin asset freshness passed; ap config show and ap quickstart passed after repo-local rebuild.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T07:43:53.013Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605280743-P4J3DQ/blueprint/resolved-snapshot.json
- old_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
- current_digest: 5a757ffdef075e49edafea4e2924f0ed2d08ea61f3069df5e04f329f052ebe2c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605280743-P4J3DQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
