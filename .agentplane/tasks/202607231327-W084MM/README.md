---
id: "202607231327-W084MM"
title: "Reconcile semantic clone baseline drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
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
  state: "ok"
  updated_at: "2026-07-23T13:49:28.104Z"
  updated_by: "TESTER"
  note: "Focused Vitest passed 20/20; clone report/check restored 88 clones with unchanged baseline blob 007f3b87; schemas, typecheck, scoped lint, formatting, all 8 critical CLI chunks, and full ci:contract passed. Independent review PASS after retry/env/argsPrefix characterization was added; RF-04 and agentplane-loops remained untouched."
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
  -
    type: "verify"
    at: "2026-07-23T13:49:28.104Z"
    author: "TESTER"
    state: "ok"
    note: "Focused Vitest passed 20/20; clone report/check restored 88 clones with unchanged baseline blob 007f3b87; schemas, typecheck, scoped lint, formatting, all 8 critical CLI chunks, and full ci:contract passed. Independent review PASS after retry/env/argsPrefix characterization was added; RF-04 and agentplane-loops remained untouched."
doc_version: 3
doc_updated_at: "2026-07-23T13:49:28.377Z"
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
    ### 2026-07-23T13:49:28.104Z — VERIFY — ok

    By: TESTER

    Note: Focused Vitest passed 20/20; clone report/check restored 88 clones with unchanged baseline blob 007f3b87; schemas, typecheck, scoped lint, formatting, all 8 critical CLI chunks, and full ci:contract passed. Independent review PASS after retry/env/argsPrefix characterization was added; RF-04 and agentplane-loops remained untouched.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T13:29:09.073Z, excerpt_hash=sha256:28f5df4d5115492140c57c7dc84792e377d081f044122ce93581756968dcff3a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607231327-W084MM-reconcile-semantic-clone-baseline-drift/.agentplane/tasks/202607231327-W084MM/blueprint/resolved-snapshot.json
    - old_digest: 184054b8946d30b879c0d991fc150e42c70c1345fa909de5794a8fbe17aecbc3
    - current_digest: 184054b8946d30b879c0d991fc150e42c70c1345fa909de5794a8fbe17aecbc3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607231327-W084MM

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607231327-W084MM
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

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
### 2026-07-23T13:49:28.104Z — VERIFY — ok

By: TESTER

Note: Focused Vitest passed 20/20; clone report/check restored 88 clones with unchanged baseline blob 007f3b87; schemas, typecheck, scoped lint, formatting, all 8 critical CLI chunks, and full ci:contract passed. Independent review PASS after retry/env/argsPrefix characterization was added; RF-04 and agentplane-loops remained untouched.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T13:29:09.073Z, excerpt_hash=sha256:28f5df4d5115492140c57c7dc84792e377d081f044122ce93581756968dcff3a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607231327-W084MM-reconcile-semantic-clone-baseline-drift/.agentplane/tasks/202607231327-W084MM/blueprint/resolved-snapshot.json
- old_digest: 184054b8946d30b879c0d991fc150e42c70c1345fa909de5794a8fbe17aecbc3
- current_digest: 184054b8946d30b879c0d991fc150e42c70c1345fa909de5794a8fbe17aecbc3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607231327-W084MM

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607231327-W084MM
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only the two helper extractions and their focused tests.
- Do not raise or regenerate scripts/baselines/clone-baseline.json to make the check pass.
- Do not modify RF-04 capture artifacts or dependency edges.

## Findings

Clean main d7a29cb4 and the RF-04 branch both report 91 clones against the unchanged baseline ceiling of 88. Historical jscpd v5 tracing attributes the three increments to 4VB97J workflow optional roots, YGWMA2 intentional mirrored public task exports, and YFYT83 repeated GitHub lookup transport. RF-04 files occur in none of the 91 clone pairs. This task removes the two deduplicable sources and preserves the intentional public entrypoint mirror without changing the baseline.
