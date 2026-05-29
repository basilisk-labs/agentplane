---
id: "202605290133-HM89S8"
title: "Blueprint builtins registry decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "hotspot"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T01:33:36.249Z"
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
    author: "CODER"
    body: "Start: decompose builtin blueprint registry into focused modules while preserving blueprint ordering, ids, and validation semantics."
events:
  -
    type: "status"
    at: "2026-05-29T01:33:59.380Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose builtin blueprint registry into focused modules while preserving blueprint ordering, ids, and validation semantics."
doc_version: 3
doc_updated_at: "2026-05-29T01:33:59.380Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/blueprints/builtins.ts by extracting builtin node sequences and common blueprint entries while preserving builtin blueprint registry semantics and reducing the runtime hotspot warning count."
sections:
  Summary: |-
    Blueprint builtins registry decomposition

    Decompose packages/agentplane/src/blueprints/builtins.ts by extracting builtin node sequences and common blueprint entries while preserving builtin blueprint registry semantics and reducing the runtime hotspot warning count.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/blueprints/builtins.ts by extracting builtin node sequences and common blueprint entries while preserving builtin blueprint registry semantics and reducing the runtime hotspot warning count.
    - Out of scope: unrelated refactors not required for "Blueprint builtins registry decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract builtin node sequences and common blueprint entry groups from packages/agentplane/src/blueprints/builtins.ts into focused modules.
    3. Preserve BUILTIN_BLUEPRINTS ordering and all blueprint ids/evidence/policy semantics.
    4. Verify with blueprint validation tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - BUILTIN_BLUEPRINTS remains behaviorally equivalent: same ids, order, node/evidence metadata, and specialized blueprint insertion point.
    - builtins.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 26 to 25 without introducing new warning-sized runtime modules.
    - No unrelated blueprint validation or routing behavior changes.
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

Blueprint builtins registry decomposition

Decompose packages/agentplane/src/blueprints/builtins.ts by extracting builtin node sequences and common blueprint entries while preserving builtin blueprint registry semantics and reducing the runtime hotspot warning count.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/builtins.ts by extracting builtin node sequences and common blueprint entries while preserving builtin blueprint registry semantics and reducing the runtime hotspot warning count.
- Out of scope: unrelated refactors not required for "Blueprint builtins registry decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract builtin node sequences and common blueprint entry groups from packages/agentplane/src/blueprints/builtins.ts into focused modules.
3. Preserve BUILTIN_BLUEPRINTS ordering and all blueprint ids/evidence/policy semantics.
4. Verify with blueprint validation tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- BUILTIN_BLUEPRINTS remains behaviorally equivalent: same ids, order, node/evidence metadata, and specialized blueprint insertion point.
- builtins.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 26 to 25 without introducing new warning-sized runtime modules.
- No unrelated blueprint validation or routing behavior changes.

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
