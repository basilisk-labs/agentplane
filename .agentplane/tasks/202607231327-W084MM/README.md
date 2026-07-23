---
id: "202607231327-W084MM"
title: "Reconcile semantic clone baseline drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "refactor"
  - "trust"
  - "v0.7"
verify:
  - "bun run ci:contract"
  - "bun run clone:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-23T13:27:53.516Z"
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
    body: "Start: remove two deduplicable main clone regressions without changing the clone baseline or public API."
events:
  -
    type: "status"
    at: "2026-07-23T13:29:09.073Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove two deduplicable main clone regressions without changing the clone baseline or public API."
doc_version: 3
doc_updated_at: "2026-07-23T13:29:09.073Z"
doc_updated_by: "CODER"
description: "Remove the two deduplicable semantic clone regressions already present on main, preserve intentional public barrel parity, then refresh the reviewed jscpd baseline so clone:check is truthful before RF-04 integration."
sections:
  Summary: |-
    Reconcile semantic clone baseline drift

    Remove the two deduplicable semantic clone regressions already present on main, preserve intentional public barrel parity, then refresh the reviewed jscpd baseline so clone:check is truthful before RF-04 integration.
  Scope: |-
    - Replace the duplicated v1/v2 optional workflow root definitions with one shared schema shape while preserving both contracts.
    - Replace three duplicated GitHub API transport blocks with one private retrying JSON helper while preserving each callers validation and failure semantics.
    - Do not change the mirrored public task export entrypoints or scripts/baselines/clone-baseline.json.
    - Restore clone:check from 91 to the existing baseline ceiling of 88; keep RF-04 files and semantics untouched.
  Plan: |-
    1. Add focused characterization coverage for workflow optional roots and all three GitHub PR lookup routes.
    2. Extract one shared WORKFLOW_OPTIONAL_ROOT_SHAPE and spread it into both workflow schema versions.
    3. Extract a private runGithubApiJson transport helper and route branch, number, and prefix lookups through it without changing caller-specific validation or catch behavior.
    4. Run targeted tests, TypeScript, scoped lint, schemas, and clone report/check; require exactly the existing clone ceiling without baseline mutation.
    5. Run critical and ci:contract, record independent review, publish a narrow PR, integrate into main, then rebase and finish RF-04.
  Verify Steps: |-
    1. Run focused Vitest for workflow-contract and sync-github. Expected: v1/v2 optional roots and branch/number/prefix transport plus malformed/error semantics pass.
    2. Run bun run clone:report and bun run clone:check. Expected: clone count is at most the unchanged baseline ceiling of 88; no baseline file changes.
    3. Run bun run schemas:check, bun run typecheck, and scoped lint. Expected: all pass.
    4. Run bun run test:critical and bun run ci:contract. Expected: all pass.
    5. Confirm RF-04 task branch and agentplane-loops remain unchanged by this task.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert only the two helper extractions and their focused tests.
    - Do not raise or regenerate scripts/baselines/clone-baseline.json to make the check pass.
    - Do not modify RF-04 capture artifacts or dependency edges.
  Findings: "Clean main d7a29cb4 and the RF-04 branch both report 91 clones against the unchanged baseline ceiling of 88. Historical jscpd v5 tracing attributes the three increments to 4VB97J workflow optional roots, YGWMA2 intentional mirrored public task exports, and YFYT83 repeated GitHub lookup transport. RF-04 files occur in none of the 91 clone pairs. This task removes the two deduplicable sources and preserves the intentional public entrypoint mirror without changing the baseline."
id_source: "generated"
---
## Summary

Reconcile semantic clone baseline drift

Remove the two deduplicable semantic clone regressions already present on main, preserve intentional public barrel parity, then refresh the reviewed jscpd baseline so clone:check is truthful before RF-04 integration.

## Scope

- Replace the duplicated v1/v2 optional workflow root definitions with one shared schema shape while preserving both contracts.
- Replace three duplicated GitHub API transport blocks with one private retrying JSON helper while preserving each callers validation and failure semantics.
- Do not change the mirrored public task export entrypoints or scripts/baselines/clone-baseline.json.
- Restore clone:check from 91 to the existing baseline ceiling of 88; keep RF-04 files and semantics untouched.

## Plan

1. Add focused characterization coverage for workflow optional roots and all three GitHub PR lookup routes.
2. Extract one shared WORKFLOW_OPTIONAL_ROOT_SHAPE and spread it into both workflow schema versions.
3. Extract a private runGithubApiJson transport helper and route branch, number, and prefix lookups through it without changing caller-specific validation or catch behavior.
4. Run targeted tests, TypeScript, scoped lint, schemas, and clone report/check; require exactly the existing clone ceiling without baseline mutation.
5. Run critical and ci:contract, record independent review, publish a narrow PR, integrate into main, then rebase and finish RF-04.

## Verify Steps

1. Run focused Vitest for workflow-contract and sync-github. Expected: v1/v2 optional roots and branch/number/prefix transport plus malformed/error semantics pass.
2. Run bun run clone:report and bun run clone:check. Expected: clone count is at most the unchanged baseline ceiling of 88; no baseline file changes.
3. Run bun run schemas:check, bun run typecheck, and scoped lint. Expected: all pass.
4. Run bun run test:critical and bun run ci:contract. Expected: all pass.
5. Confirm RF-04 task branch and agentplane-loops remain unchanged by this task.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only the two helper extractions and their focused tests.
- Do not raise or regenerate scripts/baselines/clone-baseline.json to make the check pass.
- Do not modify RF-04 capture artifacts or dependency edges.

## Findings

Clean main d7a29cb4 and the RF-04 branch both report 91 clones against the unchanged baseline ceiling of 88. Historical jscpd v5 tracing attributes the three increments to 4VB97J workflow optional roots, YGWMA2 intentional mirrored public task exports, and YFYT83 repeated GitHub lookup transport. RF-04 files occur in none of the 91 clone pairs. This task removes the two deduplicable sources and preserves the intentional public entrypoint mirror without changing the baseline.
