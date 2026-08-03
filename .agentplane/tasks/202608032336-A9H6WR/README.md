---
id: "202608032336-A9H6WR"
title: "Preflight the provider binary before release qualification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "qualification"
  - "v0.7.1"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T23:36:26.133Z"
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
    at: "2026-08-03T23:37:55.508Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T23:37:55.508Z"
doc_updated_by: "CODER"
description: "Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures."
sections:
  Summary: |-
    Preflight the provider binary before release qualification

    Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures.
  Scope: |-
    - In scope: Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures.
    - Out of scope: unrelated refactors not required for "Preflight the provider binary before release qualification".
  Plan: "1. Add an import-safe provider runtime preflight to the v0.7.1 qualification runner that validates the exact requested version against the same trusted ChatGPT.app Codex binary used by RF-04. 2. Execute the preflight before any selected local scenario and skip it for non-provider audit and dry-run selection. 3. Add focused contract tests for provider, non-provider, dry-run, and mismatch propagation; run local static checks and hosted CI before integration."
  Verify Steps: |-
    1. Run the focused release qualification contract tests. Expected: provider execution invokes the exact-binary preflight before scenario work; non-provider and dry-run paths do not invoke it; a version mismatch fails without starting a scenario.
    2. Run TypeScript type checking, ESLint, and Prettier checks for the touched qualification files. Expected: all pass.
    3. Run a no-provider dry-run and a provider preflight probe with the actual bundled version. Expected: dry-run remains side-effect free; the matching bundled version passes; a deliberately wrong version fails before any qualification scenario log is created.
    4. Complete independent evaluator review and hosted PR verification. Expected: no blocking findings and all required checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "11d4d73a0c693b71adde9e54880c411153214b37"
    version: 1
id_source: "generated"
---
## Summary

Preflight the provider binary before release qualification

Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures.

## Scope

- In scope: Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures.
- Out of scope: unrelated refactors not required for "Preflight the provider binary before release qualification".

## Plan

1. Add an import-safe provider runtime preflight to the v0.7.1 qualification runner that validates the exact requested version against the same trusted ChatGPT.app Codex binary used by RF-04. 2. Execute the preflight before any selected local scenario and skip it for non-provider audit and dry-run selection. 3. Add focused contract tests for provider, non-provider, dry-run, and mismatch propagation; run local static checks and hosted CI before integration.

## Verify Steps

1. Run the focused release qualification contract tests. Expected: provider execution invokes the exact-binary preflight before scenario work; non-provider and dry-run paths do not invoke it; a version mismatch fails without starting a scenario.
2. Run TypeScript type checking, ESLint, and Prettier checks for the touched qualification files. Expected: all pass.
3. Run a no-provider dry-run and a provider preflight probe with the actual bundled version. Expected: dry-run remains side-effect free; the matching bundled version passes; a deliberately wrong version fails before any qualification scenario log is created.
4. Complete independent evaluator review and hosted PR verification. Expected: no blocking findings and all required checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
