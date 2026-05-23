---
id: "202605231100-W8XDSA"
title: "Fix workflow_dispatch aggregate CI for evidence branches"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "quality"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T11:00:36.904Z"
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
    body: "Start: fix workflow_dispatch PR verification aggregate for manually dispatched evidence branch CI."
events:
  -
    type: "status"
    at: "2026-05-23T11:00:44.109Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix workflow_dispatch PR verification aggregate for manually dispatched evidence branch CI."
doc_version: 3
doc_updated_at: "2026-05-23T11:00:44.109Z"
doc_updated_by: "CODER"
description: "Allow manually dispatched Core CI runs without an exact release SHA to satisfy PR verification from normal full-fast jobs without requiring a skipped release-ready manifest."
sections:
  Summary: |-
    Fix workflow_dispatch aggregate CI for evidence branches

    Allow manually dispatched Core CI runs without an exact release SHA to satisfy PR verification from normal full-fast jobs without requiring a skipped release-ready manifest.
  Scope: |-
    - In scope: Allow manually dispatched Core CI runs without an exact release SHA to satisfy PR verification from normal full-fast jobs without requiring a skipped release-ready manifest.
    - Out of scope: unrelated refactors not required for "Fix workflow_dispatch aggregate CI for evidence branches".
  Plan: "Fix .github/workflows/ci.yml aggregate PR verification so workflow_dispatch runs without an exact sha (manual branch validation, e.g. release evidence PRs) do not require release-ready. Add/adjust tests or at minimum validate YAML logic with actionlint/shell reasoning, then merge through branch_pr and rerun the blocked evidence Core CI."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix workflow_dispatch aggregate CI for evidence branches". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix workflow_dispatch aggregate CI for evidence branches". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Fix workflow_dispatch aggregate CI for evidence branches

Allow manually dispatched Core CI runs without an exact release SHA to satisfy PR verification from normal full-fast jobs without requiring a skipped release-ready manifest.

## Scope

- In scope: Allow manually dispatched Core CI runs without an exact release SHA to satisfy PR verification from normal full-fast jobs without requiring a skipped release-ready manifest.
- Out of scope: unrelated refactors not required for "Fix workflow_dispatch aggregate CI for evidence branches".

## Plan

Fix .github/workflows/ci.yml aggregate PR verification so workflow_dispatch runs without an exact sha (manual branch validation, e.g. release evidence PRs) do not require release-ready. Add/adjust tests or at minimum validate YAML logic with actionlint/shell reasoning, then merge through branch_pr and rerun the blocked evidence Core CI.

## Verify Steps

PLANNER fallback scaffold for "Fix workflow_dispatch aggregate CI for evidence branches". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix workflow_dispatch aggregate CI for evidence branches". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
