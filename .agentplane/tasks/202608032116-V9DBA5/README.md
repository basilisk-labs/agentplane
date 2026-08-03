---
id: "202608032116-V9DBA5"
title: "Restore ACR generation in hosted close qualification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "hosted-close"
  - "qualification"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "node scripts/checks/run-vitest-suite.mjs v0.7-hosted"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T21:35:26.625Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T21:35:42.291Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T21:35:42.291Z"
doc_updated_by: "CODER"
description: "Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure."
sections:
  Summary: |-
    Restore ACR generation in hosted close qualification

    Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure.
  Scope: |-
    - In scope: Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure.
    - Out of scope: unrelated refactors not required for "Restore ACR generation in hosted close qualification".
  Plan: |-
    1. Reproduce the hosted-close ACR omission with traceable failure evidence and identify the exact generateAcr contract violation.
    2. Apply the smallest implementation fix so hosted-close persists a valid tracked acr.json for each finished task; mandatory hosted-close ACR refresh must fail with actionable evidence instead of returning success without the artifact, while unrelated finish behavior remains compatible.
    3. Add focused unit coverage for refresh failure semantics and extend the real hosted-close regression to prove acr.json creation, tracking, and idempotent rerun.
    4. Run focused tests, bun run test:critical, and node scripts/checks/run-vitest-suite.mjs v0.7-hosted; record residual risk and rollback by reverting the task commits.
  Verify Steps: |-
    PLANNER fallback scaffold for "Restore ACR generation in hosted close qualification". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Restore ACR generation in hosted close qualification". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "aa93de810c57ada6039cfb942818ab3eae45a92d"
    version: 1
id_source: "generated"
---
## Summary

Restore ACR generation in hosted close qualification

Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure.

## Scope

- In scope: Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure.
- Out of scope: unrelated refactors not required for "Restore ACR generation in hosted close qualification".

## Plan

1. Reproduce the hosted-close ACR omission with traceable failure evidence and identify the exact generateAcr contract violation.
2. Apply the smallest implementation fix so hosted-close persists a valid tracked acr.json for each finished task; mandatory hosted-close ACR refresh must fail with actionable evidence instead of returning success without the artifact, while unrelated finish behavior remains compatible.
3. Add focused unit coverage for refresh failure semantics and extend the real hosted-close regression to prove acr.json creation, tracking, and idempotent rerun.
4. Run focused tests, bun run test:critical, and node scripts/checks/run-vitest-suite.mjs v0.7-hosted; record residual risk and rollback by reverting the task commits.

## Verify Steps

PLANNER fallback scaffold for "Restore ACR generation in hosted close qualification". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Restore ACR generation in hosted close qualification". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
