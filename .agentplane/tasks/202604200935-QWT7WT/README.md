---
id: "202604200935-QWT7WT"
title: "Migrate bootstrap freshness check to generated artifact helper"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "refactor"
  - "scripts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T09:35:37.317Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: migrate the generated doc freshness portion of the bootstrap check to the shared artifact-check helper without changing bootstrap parity assertions."
events:
  -
    type: "status"
    at: "2026-04-20T09:35:37.846Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the generated doc freshness portion of the bootstrap check to the shared artifact-check helper without changing bootstrap parity assertions."
doc_version: 3
doc_updated_at: "2026-04-20T09:35:37.858Z"
doc_updated_by: "CODER"
description: "Use the shared generated artifact check wrapper for the agent bootstrap generated doc while keeping bootstrap-specific parity assertions local to the script."
sections:
  Summary: |-
    Migrate bootstrap freshness check to generated artifact helper
    
    Use the shared generated artifact check wrapper for the agent bootstrap generated doc while keeping bootstrap-specific parity assertions local to the script.
  Scope: |-
    - In scope: Use the shared generated artifact check wrapper for the agent bootstrap generated doc while keeping bootstrap-specific parity assertions local to the script.
    - Out of scope: unrelated refactors not required for "Migrate bootstrap freshness check to generated artifact helper".
  Plan: |-
    1. Replace the bootstrap generated-doc freshness section with defineGeneratedArtifactCheck/runScriptMain from scripts/lib/generated-artifacts.mjs.
    2. Preserve all bootstrap-specific parity assertions and CLI dist preflight behavior.
    3. Run docs bootstrap freshness check plus format/lint gates.
    4. Commit implementation, record verification, and finish the task.
  Verify Steps: |-
    1. Review the requested outcome for "Migrate bootstrap freshness check to generated artifact helper". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Migrate bootstrap freshness check to generated artifact helper

Use the shared generated artifact check wrapper for the agent bootstrap generated doc while keeping bootstrap-specific parity assertions local to the script.

## Scope

- In scope: Use the shared generated artifact check wrapper for the agent bootstrap generated doc while keeping bootstrap-specific parity assertions local to the script.
- Out of scope: unrelated refactors not required for "Migrate bootstrap freshness check to generated artifact helper".

## Plan

1. Replace the bootstrap generated-doc freshness section with defineGeneratedArtifactCheck/runScriptMain from scripts/lib/generated-artifacts.mjs.
2. Preserve all bootstrap-specific parity assertions and CLI dist preflight behavior.
3. Run docs bootstrap freshness check plus format/lint gates.
4. Commit implementation, record verification, and finish the task.

## Verify Steps

1. Review the requested outcome for "Migrate bootstrap freshness check to generated artifact helper". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
