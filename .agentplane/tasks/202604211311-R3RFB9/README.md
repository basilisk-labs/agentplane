---
id: "202604211311-R3RFB9"
title: "Add zero-regression command catalog cycle gate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604211311-6RM7SK"
tags:
  - "architecture"
  - "ci"
  - "tooling"
verify:
  - "bun run arch:check"
  - "bun run test:project -- cli-unit"
  - "node scripts/check-depcruise-known-violations.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:11:37.544Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T13:39:14.178Z"
  updated_by: "CODER"
  note: "Command: bun run arch:check; Result: pass; Evidence: dependency-cruiser known violations OK count=8 max=49 and no new dependency violations. Command: node scripts/check-depcruise-known-violations.mjs; Result: pass. Scope review: depcruise config now has a targeted no-catalog-cycle guard."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: adding a targeted dependency-cruiser guard and lowering the catalog-cycle baseline after the D-prime command catalog refactor."
events:
  -
    type: "status"
    at: "2026-04-21T13:22:03.925Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding a targeted dependency-cruiser guard and lowering the catalog-cycle baseline after the D-prime command catalog refactor."
  -
    type: "verify"
    at: "2026-04-21T13:39:14.178Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run arch:check; Result: pass; Evidence: dependency-cruiser known violations OK count=8 max=49 and no new dependency violations. Command: node scripts/check-depcruise-known-violations.mjs; Result: pass. Scope review: depcruise config now has a targeted no-catalog-cycle guard."
doc_version: 3
doc_updated_at: "2026-04-21T13:39:14.189Z"
doc_updated_by: "CODER"
description: "Introduce a targeted dep-cruiser gate for command-catalog cycles and lower the known-violations baseline after D-prime refactor removes current catalog cycles."
sections:
  Summary: |-
    Add zero-regression command catalog cycle gate
    
    Introduce a targeted dep-cruiser gate for command-catalog cycles and lower the known-violations baseline after D-prime refactor removes current catalog cycles.
  Scope: |-
    - In scope: Introduce a targeted dep-cruiser gate for command-catalog cycles and lower the known-violations baseline after D-prime refactor removes current catalog cycles.
    - Out of scope: unrelated refactors not required for "Add zero-regression command catalog cycle gate".
  Plan: "Scope: make command catalog cycles non-regressable. Steps: 1. Measure post-refactor dep-cruiser no-circular count. 2. Lower .dependency-cruiser-known-violations.json to the new count. 3. Add a specific rule or checker assertion that new cli/run-cli/command-catalog cycles fail clearly. 4. Add/update tests for baseline growth behavior if checker behavior changes. Acceptance: arch:check fails on a synthetic new catalog cycle or baseline growth; normal arch:check passes."
  Verify Steps: |-
    1. Review the requested outcome for "Add zero-regression command catalog cycle gate". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T13:39:14.178Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run arch:check; Result: pass; Evidence: dependency-cruiser known violations OK count=8 max=49 and no new dependency violations. Command: node scripts/check-depcruise-known-violations.mjs; Result: pass. Scope review: depcruise config now has a targeted no-catalog-cycle guard.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:22:03.952Z, excerpt_hash=sha256:58e903225ee7633a078933e3760ad1c9aafd926aee0f9d666013d32d7ed29083
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add zero-regression command catalog cycle gate

Introduce a targeted dep-cruiser gate for command-catalog cycles and lower the known-violations baseline after D-prime refactor removes current catalog cycles.

## Scope

- In scope: Introduce a targeted dep-cruiser gate for command-catalog cycles and lower the known-violations baseline after D-prime refactor removes current catalog cycles.
- Out of scope: unrelated refactors not required for "Add zero-regression command catalog cycle gate".

## Plan

Scope: make command catalog cycles non-regressable. Steps: 1. Measure post-refactor dep-cruiser no-circular count. 2. Lower .dependency-cruiser-known-violations.json to the new count. 3. Add a specific rule or checker assertion that new cli/run-cli/command-catalog cycles fail clearly. 4. Add/update tests for baseline growth behavior if checker behavior changes. Acceptance: arch:check fails on a synthetic new catalog cycle or baseline growth; normal arch:check passes.

## Verify Steps

1. Review the requested outcome for "Add zero-regression command catalog cycle gate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T13:39:14.178Z — VERIFY — ok

By: CODER

Note: Command: bun run arch:check; Result: pass; Evidence: dependency-cruiser known violations OK count=8 max=49 and no new dependency violations. Command: node scripts/check-depcruise-known-violations.mjs; Result: pass. Scope review: depcruise config now has a targeted no-catalog-cycle guard.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:22:03.952Z, excerpt_hash=sha256:58e903225ee7633a078933e3760ad1c9aafd926aee0f9d666013d32d7ed29083

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
