---
id: "202604260643-JNXQR1"
title: "Refactor overlay project helpers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T06:43:16.105Z"
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
    body: "Start: Extract overlay compilation and publish/readback helpers from commands/recipes/impl/overlay-project.ts into focused sibling modules while preserving overlay bundle and asset registry behavior."
events:
  -
    type: "status"
    at: "2026-04-26T06:43:16.151Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract overlay compilation and publish/readback helpers from commands/recipes/impl/overlay-project.ts into focused sibling modules while preserving overlay bundle and asset registry behavior."
doc_version: 3
doc_updated_at: "2026-04-26T06:43:16.179Z"
doc_updated_by: "CODER"
description: "Extract overlay compilation and publish/readback helpers from commands/recipes/impl/overlay-project.ts into focused sibling modules while preserving overlay bundle and asset registry behavior."
sections:
  Summary: |-
    Refactor overlay project helpers
    
    Extract overlay compilation and publish/readback helpers from commands/recipes/impl/overlay-project.ts into focused sibling modules while preserving overlay bundle and asset registry behavior.
  Scope: |-
    - In scope: Extract overlay compilation and publish/readback helpers from commands/recipes/impl/overlay-project.ts into focused sibling modules while preserving overlay bundle and asset registry behavior.
    - Out of scope: unrelated refactors not required for "Refactor overlay project helpers".
  Plan: "1. Split commands/recipes/impl/overlay-project.ts into focused helpers for overlay compilation and publish/readback while preserving overlay bundle, asset registry, and active recipe behavior. 2. Keep transactional publish semantics, content normalization, and readback validation unchanged. 3. Run focused overlay-project and recipes.transaction tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks."
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

Refactor overlay project helpers

Extract overlay compilation and publish/readback helpers from commands/recipes/impl/overlay-project.ts into focused sibling modules while preserving overlay bundle and asset registry behavior.

## Scope

- In scope: Extract overlay compilation and publish/readback helpers from commands/recipes/impl/overlay-project.ts into focused sibling modules while preserving overlay bundle and asset registry behavior.
- Out of scope: unrelated refactors not required for "Refactor overlay project helpers".

## Plan

1. Split commands/recipes/impl/overlay-project.ts into focused helpers for overlay compilation and publish/readback while preserving overlay bundle, asset registry, and active recipe behavior. 2. Keep transactional publish semantics, content normalization, and readback validation unchanged. 3. Run focused overlay-project and recipes.transaction tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.

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
