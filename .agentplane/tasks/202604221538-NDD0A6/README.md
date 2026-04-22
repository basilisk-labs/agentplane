---
id: "202604221538-NDD0A6"
title: "Add prompt module fixtures and schema docs"
status: "TODO"
priority: "med"
owner: "DOCS"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604221538-P6WRV2"
  - "202604221538-RJMG6E"
  - "202604221538-Y7ES2P"
tags:
  - "docs"
  - "prompt-assembly"
  - "schemas"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:15.264Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T15:38:15.067Z"
doc_updated_by: "PLANNER"
description: "Add canonical fixtures and developer-facing schema notes for framework modules, recipe modules, repo overrides, and invalid mutation cases."
sections:
  Summary: |-
    Add prompt module fixtures and schema docs

    Add canonical fixtures and developer-facing schema notes for framework modules, recipe modules, repo overrides, and invalid mutation cases.
  Scope: |-
    - In scope: Add canonical fixtures and developer-facing schema notes for framework modules, recipe modules, repo overrides, and invalid mutation cases.
    - Out of scope: unrelated refactors not required for "Add prompt module fixtures and schema docs".
  Plan: |-
    Goal: Add prompt module fixtures and schema docs

    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.

    Acceptance:
    - Fixtures cover valid TDD, PRD, roadmap, naming, and invalid raw-patch recipe examples.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.

    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
  Verify Steps: |-
    1. Review the requested outcome for "Add prompt module fixtures and schema docs". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Add prompt module fixtures and schema docs

Add canonical fixtures and developer-facing schema notes for framework modules, recipe modules, repo overrides, and invalid mutation cases.

## Scope

- In scope: Add canonical fixtures and developer-facing schema notes for framework modules, recipe modules, repo overrides, and invalid mutation cases.
- Out of scope: unrelated refactors not required for "Add prompt module fixtures and schema docs".

## Plan

Goal: Add prompt module fixtures and schema docs

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Fixtures cover valid TDD, PRD, roadmap, naming, and invalid raw-patch recipe examples.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

## Verify Steps

1. Review the requested outcome for "Add prompt module fixtures and schema docs". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
