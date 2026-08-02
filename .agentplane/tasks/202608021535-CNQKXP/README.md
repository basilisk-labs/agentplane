---
id: "202608021535-CNQKXP"
title: "Add compatibility retirement inventory and doctor legacy"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "compatibility"
  - "doctor"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run test:critical"
  - "bun run typecheck"
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
  attempts: 0
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-08-02T15:35:03.640Z"
doc_updated_by: "CODER"
description: "Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations."
sections:
  Summary: |-
    Add compatibility retirement inventory and doctor legacy

    Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.
  Scope: |-
    - In scope: Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.
    - Out of scope: unrelated refactors not required for "Add compatibility retirement inventory and doctor legacy".
  Plan: |-
    1. Implement the change for "Add compatibility retirement inventory and doctor legacy".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Add compatibility retirement inventory and doctor legacy". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add compatibility retirement inventory and doctor legacy". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Add compatibility retirement inventory and doctor legacy

Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.

## Scope

- In scope: Introduce a machine-readable compatibility-adapter manifest with introduced_in, deprecated_in, remove_in, migration_command, and usage_probe fields; add agentplane doctor legacy --json; move legacy conflict recovery toward an advanced repair namespace without breaking 0.7 migrations.
- Out of scope: unrelated refactors not required for "Add compatibility retirement inventory and doctor legacy".

## Plan

1. Implement the change for "Add compatibility retirement inventory and doctor legacy".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Add compatibility retirement inventory and doctor legacy". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add compatibility retirement inventory and doctor legacy". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
