---
id: "202608021534-J5G235"
title: "Reduce the v0.7.1 CLI dead-code and barrel baseline"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "knip"
  - "maintenance"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run knip:check"
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
doc_updated_at: "2026-08-02T15:34:55.192Z"
doc_updated_by: "CODER"
description: "Audit dynamic entrypoints, remove declaration-only AgentPlane CLI exports and unnecessary internal barrel re-exports, reduce the CLI-package Knip baseline by 60-80 percent where evidence permits, preserve @agentplaneorg/core compatibility, and ratchet against future growth."
sections:
  Summary: |-
    Reduce the v0.7.1 CLI dead-code and barrel baseline

    Audit dynamic entrypoints, remove declaration-only AgentPlane CLI exports and unnecessary internal barrel re-exports, reduce the CLI-package Knip baseline by 60-80 percent where evidence permits, preserve @agentplaneorg/core compatibility, and ratchet against future growth.
  Scope: |-
    - In scope: Audit dynamic entrypoints, remove declaration-only AgentPlane CLI exports and unnecessary internal barrel re-exports, reduce the CLI-package Knip baseline by 60-80 percent where evidence permits, preserve @agentplaneorg/core compatibility, and ratchet against future growth.
    - Out of scope: unrelated refactors not required for "Reduce the v0.7.1 CLI dead-code and barrel baseline".
  Plan: |-
    1. Implement the change for "Reduce the v0.7.1 CLI dead-code and barrel baseline".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Reduce the v0.7.1 CLI dead-code and barrel baseline". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Reduce the v0.7.1 CLI dead-code and barrel baseline". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Reduce the v0.7.1 CLI dead-code and barrel baseline

Audit dynamic entrypoints, remove declaration-only AgentPlane CLI exports and unnecessary internal barrel re-exports, reduce the CLI-package Knip baseline by 60-80 percent where evidence permits, preserve @agentplaneorg/core compatibility, and ratchet against future growth.

## Scope

- In scope: Audit dynamic entrypoints, remove declaration-only AgentPlane CLI exports and unnecessary internal barrel re-exports, reduce the CLI-package Knip baseline by 60-80 percent where evidence permits, preserve @agentplaneorg/core compatibility, and ratchet against future growth.
- Out of scope: unrelated refactors not required for "Reduce the v0.7.1 CLI dead-code and barrel baseline".

## Plan

1. Implement the change for "Reduce the v0.7.1 CLI dead-code and barrel baseline".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Reduce the v0.7.1 CLI dead-code and barrel baseline". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Reduce the v0.7.1 CLI dead-code and barrel baseline". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
