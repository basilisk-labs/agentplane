---
id: "202607221854-PGPR3J"
title: "Complete typed use-case and CLI rendering boundaries"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202607221854-SDPFN0"
tags:
  - "cli"
  - "milestone-rc2"
  - "refactor"
  - "rendering"
  - "rf-25"
  - "use-case"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run guards:check"
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T19:12:11.698Z"
doc_updated_by: "PLANNER"
description: "RF-25e fan-in: integrate the typed-result/rendering work proven by every command-family slice, remove remaining internal subprocess/stdout orchestration, and validate centralized output/error/exit compatibility."
sections:
  Summary: |-
    Complete typed use-case and CLI rendering boundaries

    Integrate the typed-result and renderer contracts from all command-family vertical slices, remove the last internal subprocess/stdout orchestration paths, and validate centralized human/plain/JSON/error compatibility.
  Scope: |-
    - In scope: integrate typed result/error and renderer contracts from all five command-family slices, resolve only shared renderer/casing/exit conflicts, remove remaining internal AgentPlane subprocess or stdout parsing, and run repository-wide compatibility snapshots.
    - Out of scope: performing family-specific use-case migrations inside this fan-in task.
  Plan: |-
    1. Confirm CommandSession fan-in and all five vertical slices are DONE.
    2. Integrate shared result/error unions, casing transforms, renderers, and exit mappings.
    3. Remove the final internal subprocess/stdout parsing paths and ratchet them in architecture guards.
    4. Run repository-wide human/plain/JSON/error compatibility snapshots.
    5. Treat any remaining family-local migration as rework for its owning slice.
  Verify Steps: |-
    1. Resolve dependency closure. Expected: all five vertical slices and CommandSession fan-in are DONE.
    2. Trace every supervisor/internal operation. Expected: no AgentPlane subprocess, rendered shell command, or stdout parse remains.
    3. Render representative results/errors through human, plain, and JSON modes. Expected: centralized casing, guidance, remediation, exit, and compatibility snapshots pass.
    4. Run critical tests, guards, contract CI, typecheck, and a repository search for forbidden orchestration.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the cross-family renderer integration while preserving independently merged typed use cases.
    - Restore only centralized compatibility renderers, never internal subprocess/stdout parsing.
    - Re-run family and repository-wide snapshots before retry.
  Findings: ""
id_source: "generated"
---
## Summary

Complete typed use-case and CLI rendering boundaries

Integrate the typed-result and renderer contracts from all command-family vertical slices, remove the last internal subprocess/stdout orchestration paths, and validate centralized human/plain/JSON/error compatibility.

## Scope

- In scope: integrate typed result/error and renderer contracts from all five command-family slices, resolve only shared renderer/casing/exit conflicts, remove remaining internal AgentPlane subprocess or stdout parsing, and run repository-wide compatibility snapshots.
- Out of scope: performing family-specific use-case migrations inside this fan-in task.

## Plan

1. Confirm CommandSession fan-in and all five vertical slices are DONE.
2. Integrate shared result/error unions, casing transforms, renderers, and exit mappings.
3. Remove the final internal subprocess/stdout parsing paths and ratchet them in architecture guards.
4. Run repository-wide human/plain/JSON/error compatibility snapshots.
5. Treat any remaining family-local migration as rework for its owning slice.

## Verify Steps

1. Resolve dependency closure. Expected: all five vertical slices and CommandSession fan-in are DONE.
2. Trace every supervisor/internal operation. Expected: no AgentPlane subprocess, rendered shell command, or stdout parse remains.
3. Render representative results/errors through human, plain, and JSON modes. Expected: centralized casing, guidance, remediation, exit, and compatibility snapshots pass.
4. Run critical tests, guards, contract CI, typecheck, and a repository search for forbidden orchestration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the cross-family renderer integration while preserving independently merged typed use cases.
- Restore only centralized compatibility renderers, never internal subprocess/stdout parsing.
- Re-run family and repository-wide snapshots before retry.

## Findings
