---
id: "202604161300-QJGXXY"
title: "Audit and reclassify stale open workflow incidents"
result_summary: "Merged via PR #358."
status: "DONE"
priority: "med"
owner: "INTEGRATOR"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "incidents"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-16T13:07:23.734Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-16T13:17:13.581Z"
  updated_by: "INTEGRATOR"
  note: "Verified: active registry reduced to genuinely open incidents only; archived stabilized and externally mitigated entries; node .agentplane/policy/check-routing.mjs; bun run format:check."
commit:
  hash: "664425fbd5453066d9c33f631c1ead764877d5fd"
  message: "incidents/workflow: Audit and reclassify stale open workflow incidents (QJGXXY) (#358)"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: audit the open incident registry against current main, reclassify stale entries instead of deleting them, and leave only genuinely unresolved incidents open."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #358 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-16T13:07:23.739Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: audit the open incident registry against current main, reclassify stale entries instead of deleting them, and leave only genuinely unresolved incidents open."
  -
    type: "verify"
    at: "2026-04-16T13:17:13.581Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified: active registry reduced to genuinely open incidents only; archived stabilized and externally mitigated entries; node .agentplane/policy/check-routing.mjs; bun run format:check."
  -
    type: "status"
    at: "2026-04-16T13:28:11.609Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #358 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-16T13:28:11.616Z"
doc_updated_by: "INTEGRATOR"
description: "Review the incidents registry entries that still say state=open even though later work appears to have implemented the required behavior. Verify each open incident against current main, then reclassify stale entries to stabilized or externally mitigated and leave only genuinely unresolved incidents open."
sections:
  Summary: |-
    Audit and reclassify stale open workflow incidents
    
    Review the incidents registry entries that still say state=open even though later work appears to have implemented the required behavior. Verify each open incident against current main, then reclassify stale entries to stabilized or externally mitigated and leave only genuinely unresolved incidents open.
  Scope: |-
    - In scope: Review the incidents registry entries that still say state=open even though later work appears to have implemented the required behavior. Verify each open incident against current main, then reclassify stale entries to stabilized or externally mitigated and leave only genuinely unresolved incidents open.
    - Out of scope: unrelated refactors not required for "Audit and reclassify stale open workflow incidents".
  Plan: "1. Audit every incident that still has state=open against the current main behavior and the later tasks already landed in main. 2. Reclassify stale open incidents to stabilized when the rule is now enforced in-repo, or to externally mitigated when the repository now has deterministic local recovery but the remaining risk is purely external. 3. Leave only genuinely unresolved incidents open, then verify the registry diff is limited to incident-state truth and stays within policy constraints."
  Verify Steps: |-
    1. Review the requested outcome for "Audit and reclassify stale open workflow incidents". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-16T13:17:13.581Z — VERIFY — ok
    
    By: INTEGRATOR
    
    Note: Verified: active registry reduced to genuinely open incidents only; archived stabilized and externally mitigated entries; node .agentplane/policy/check-routing.mjs; bun run format:check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T13:07:23.749Z, excerpt_hash=sha256:c27afb1176ebe6ef0bf8c54c777df5441f6b43fe981684092d9f8d34689cf171
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Audit and reclassify stale open workflow incidents

Review the incidents registry entries that still say state=open even though later work appears to have implemented the required behavior. Verify each open incident against current main, then reclassify stale entries to stabilized or externally mitigated and leave only genuinely unresolved incidents open.

## Scope

- In scope: Review the incidents registry entries that still say state=open even though later work appears to have implemented the required behavior. Verify each open incident against current main, then reclassify stale entries to stabilized or externally mitigated and leave only genuinely unresolved incidents open.
- Out of scope: unrelated refactors not required for "Audit and reclassify stale open workflow incidents".

## Plan

1. Audit every incident that still has state=open against the current main behavior and the later tasks already landed in main. 2. Reclassify stale open incidents to stabilized when the rule is now enforced in-repo, or to externally mitigated when the repository now has deterministic local recovery but the remaining risk is purely external. 3. Leave only genuinely unresolved incidents open, then verify the registry diff is limited to incident-state truth and stays within policy constraints.

## Verify Steps

1. Review the requested outcome for "Audit and reclassify stale open workflow incidents". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-16T13:17:13.581Z — VERIFY — ok

By: INTEGRATOR

Note: Verified: active registry reduced to genuinely open incidents only; archived stabilized and externally mitigated entries; node .agentplane/policy/check-routing.mjs; bun run format:check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T13:07:23.749Z, excerpt_hash=sha256:c27afb1176ebe6ef0bf8c54c777df5441f6b43fe981684092d9f8d34689cf171

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
