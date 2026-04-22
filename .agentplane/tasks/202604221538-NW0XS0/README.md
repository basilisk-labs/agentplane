---
id: "202604221538-NW0XS0"
title: "Create framework prompt module registry"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604221538-P6WRV2"
  - "202604221538-Y7ES2P"
tags:
  - "architecture"
  - "code"
  - "prompt-assembly"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:16.614Z"
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
doc_updated_at: "2026-04-22T15:38:16.416Z"
doc_updated_by: "PLANNER"
description: "Convert bundled AGENTS, policy, agent, and runner prompt assets into a framework module registry while preserving current installed output."
sections:
  Summary: |-
    Create framework prompt module registry

    Convert bundled AGENTS, policy, agent, and runner prompt assets into a framework module registry while preserving current installed output.
  Scope: |-
    - In scope: Convert bundled AGENTS, policy, agent, and runner prompt assets into a framework module registry while preserving current installed output.
    - Out of scope: unrelated refactors not required for "Create framework prompt module registry".
  Plan: |-
    Goal: Create framework prompt module registry

    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.

    Acceptance:
    - Bundled assets are addressable as framework modules without changing current init output.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.

    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
  Verify Steps: |-
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

Create framework prompt module registry

Convert bundled AGENTS, policy, agent, and runner prompt assets into a framework module registry while preserving current installed output.

## Scope

- In scope: Convert bundled AGENTS, policy, agent, and runner prompt assets into a framework module registry while preserving current installed output.
- Out of scope: unrelated refactors not required for "Create framework prompt module registry".

## Plan

Goal: Create framework prompt module registry

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Bundled assets are addressable as framework modules without changing current init output.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

## Verify Steps

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
