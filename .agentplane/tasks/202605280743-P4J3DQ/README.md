---
id: "202605280743-P4J3DQ"
title: "Gate context policy during upgrade"
status: "DOING"
priority: "med"
owner: "UPGRADER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
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
doc_version: 3
doc_updated_at: "2026-05-28T07:43:53.013Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
