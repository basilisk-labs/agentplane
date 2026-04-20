---
id: "202604191642-V16766"
title: "Adopt tsup and subpath exports for core packages"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "build"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T14:16:18.888Z"
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
    body: "Start: Adding tsup build configs and subpath exports for core and recipes while preserving tsc typecheck and release parity behavior."
events:
  -
    type: "status"
    at: "2026-04-20T14:16:25.796Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding tsup build configs and subpath exports for core and recipes while preserving tsc typecheck and release parity behavior."
doc_version: 3
doc_updated_at: "2026-04-20T14:16:25.810Z"
doc_updated_by: "CODER"
description: "Epic K and I′. Introduce tsup builds and subpath exports for core and recipes where they improve package shape and tree shaking."
sections:
  Summary: |-
    Adopt tsup and subpath exports for core packages
    
    Epic K and I′. Introduce tsup builds and subpath exports for core and recipes where they improve package shape and tree shaking.
  Scope: |-
    - In scope: Epic K and I′. Introduce tsup builds and subpath exports for core and recipes where they improve package shape and tree shaking.
    - Out of scope: unrelated refactors not required for "Adopt tsup and subpath exports for core packages".
  Plan: "Adopt tsup only for publishable library packages: add tsup config for @agentplaneorg/core and @agentplaneorg/recipes, expose core subpath exports for git/fs/logger/schemas/tasks/process, keep the root tsc build/typecheck contract green, and verify generated dist plus release parity. Network/package-lock changes are expected only for the tsup dev dependency."
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

Adopt tsup and subpath exports for core packages

Epic K and I′. Introduce tsup builds and subpath exports for core and recipes where they improve package shape and tree shaking.

## Scope

- In scope: Epic K and I′. Introduce tsup builds and subpath exports for core and recipes where they improve package shape and tree shaking.
- Out of scope: unrelated refactors not required for "Adopt tsup and subpath exports for core packages".

## Plan

Adopt tsup only for publishable library packages: add tsup config for @agentplaneorg/core and @agentplaneorg/recipes, expose core subpath exports for git/fs/logger/schemas/tasks/process, keep the root tsc build/typecheck contract green, and verify generated dist plus release parity. Network/package-lock changes are expected only for the tsup dev dependency.

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
