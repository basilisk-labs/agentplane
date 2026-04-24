---
id: "202604241137-PT2V56"
title: "v0.3 freeze G2: accept ADR for v0.3 surface freeze"
status: "TODO"
priority: "high"
owner: "DOCS"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604241137-DFNX5S"
tags:
  - "adr"
  - "docs"
  - "v0.3"
verify:
  - "rg -n 'Accepted|0\\.3|0\\.4' docs/adr/0011-v0.3-surface-freeze.md"
  - "test -f docs/adr/0011-v0.3-surface-freeze.md"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-24T11:37:26.754Z"
doc_updated_by: "DOCS"
description: "Add ADR 0011 defining the frozen v0.3 public surface, allowed internal refactors, and migration pointer toward v0.4."
sections:
  Summary: |-
    v0.3 freeze G2: accept ADR for v0.3 surface freeze
    
    Add ADR 0011 defining the frozen v0.3 public surface, allowed internal refactors, and migration pointer toward v0.4.
  Scope: |-
    - In scope: Add ADR 0011 defining the frozen v0.3 public surface, allowed internal refactors, and migration pointer toward v0.4.
    - Out of scope: unrelated refactors not required for "v0.3 freeze G2: accept ADR for v0.3 surface freeze".
  Plan: |-
    1. Implement the change for "v0.3 freeze G2: accept ADR for v0.3 surface freeze".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 freeze G2: accept ADR for v0.3 surface freeze". Expected: the visible result matches ## Summary and stays inside approved scope.
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

v0.3 freeze G2: accept ADR for v0.3 surface freeze

Add ADR 0011 defining the frozen v0.3 public surface, allowed internal refactors, and migration pointer toward v0.4.

## Scope

- In scope: Add ADR 0011 defining the frozen v0.3 public surface, allowed internal refactors, and migration pointer toward v0.4.
- Out of scope: unrelated refactors not required for "v0.3 freeze G2: accept ADR for v0.3 surface freeze".

## Plan

1. Implement the change for "v0.3 freeze G2: accept ADR for v0.3 surface freeze".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "v0.3 freeze G2: accept ADR for v0.3 surface freeze". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
