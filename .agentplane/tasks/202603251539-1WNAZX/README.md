---
id: "202603251539-1WNAZX"
title: "Consolidate upgrade and release into one operator pipeline"
result_summary: "Merged on GitHub main via PR #26 after the shared operator pipeline landed."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603251538-CMY5ZN"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T18:10:41.317Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T18:17:54.146Z"
  updated_by: "CODER"
  note: "Introduced a shared operator pipeline shell for release apply and upgrade, rewired both flows through the common init/preflight/materialize/execute/finalize shape without collapsing their domain-specific commit/tag/managed-file semantics, and verified the seam with focused release/upgrade regressions plus build, lint, and format checks."
commit:
  hash: "fcdacf8d387309457d3bbf2790c58f0524cedba4"
  message: "1WNAZX: consolidate release and upgrade onto a shared operator shell (#26)"
comments:
  -
    author: "CODER"
    body: "Start: extract the shared operator-run shell first, then rewire release and upgrade around that seam without collapsing their command-specific guards or prompts."
  -
    author: "INTEGRATOR"
    body: "Verified: Merged on GitHub main via PR #26 after the shared operator pipeline landed."
events:
  -
    type: "status"
    at: "2026-03-27T18:10:41.859Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract the shared operator-run shell first, then rewire release and upgrade around that seam without collapsing their command-specific guards or prompts."
  -
    type: "verify"
    at: "2026-03-27T18:17:54.146Z"
    author: "CODER"
    state: "ok"
    note: "Introduced a shared operator pipeline shell for release apply and upgrade, rewired both flows through the common init/preflight/materialize/execute/finalize shape without collapsing their domain-specific commit/tag/managed-file semantics, and verified the seam with focused release/upgrade regressions plus build, lint, and format checks."
  -
    type: "status"
    at: "2026-03-27T19:07:13.693Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Merged on GitHub main via PR #26 after the shared operator pipeline landed."
doc_version: 3
doc_updated_at: "2026-03-27T19:07:13.693Z"
doc_updated_by: "INTEGRATOR"
description: "Refactor upgrade and release flows onto a shared operator pipeline for source acquisition, reconcile, verification, and post-apply side effects, so both surfaces reuse one execution model instead of parallel bespoke orchestration stacks."
sections:
  Summary: |-
    Consolidate upgrade and release into one operator pipeline
    
    Refactor upgrade and release flows onto a shared operator pipeline for source acquisition, reconcile, verification, and post-apply side effects, so both surfaces reuse one execution model instead of parallel bespoke orchestration stacks.
  Scope: |-
    - In scope: Refactor upgrade and release flows onto a shared operator pipeline for source acquisition, reconcile, verification, and post-apply side effects, so both surfaces reuse one execution model instead of parallel bespoke orchestration stacks.
    - Out of scope: unrelated refactors not required for "Consolidate upgrade and release into one operator pipeline".
  Plan: |-
    1. Extract a shared operator-run shell for upgrade and release that owns common preflight, source materialization, and finalize hooks without collapsing flow-specific policy or prompts.
    2. Rewire release and upgrade commands to call the shared operator pipeline while keeping their command-specific options, guardrails, and output contracts intact.
    3. Run focused upgrade/release/operator regressions and minimal builds, then record any remaining asymmetry explicitly in Findings.
  Verify Steps: |-
    1. Run focused operator-pipeline coverage around the extracted shared shell. Expected: common preflight, source materialization, and finalize hooks execute through one typed path without changing task-specific behavior.
    2. Run targeted upgrade and release regressions. Expected: both commands preserve their existing guardrails, prompts, and output contracts while using the shared operator pipeline internally.
    3. Run the smallest relevant builds. Expected: agentplane and any touched package compile cleanly, and any remaining upgrade-vs-release asymmetry is explicit in Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-27T18:17:54.146Z — VERIFY — ok
    
    By: CODER
    
    Note: Introduced a shared operator pipeline shell for release apply and upgrade, rewired both flows through the common init/preflight/materialize/execute/finalize shape without collapsing their domain-specific commit/tag/managed-file semantics, and verified the seam with focused release/upgrade regressions plus build, lint, and format checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T18:10:41.861Z, excerpt_hash=sha256:2fe576f9389a6a9e84654f4e251bf3b3f65e2261fcf5923646fde67f6b9e1592
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Consolidate upgrade and release into one operator pipeline

Refactor upgrade and release flows onto a shared operator pipeline for source acquisition, reconcile, verification, and post-apply side effects, so both surfaces reuse one execution model instead of parallel bespoke orchestration stacks.

## Scope

- In scope: Refactor upgrade and release flows onto a shared operator pipeline for source acquisition, reconcile, verification, and post-apply side effects, so both surfaces reuse one execution model instead of parallel bespoke orchestration stacks.
- Out of scope: unrelated refactors not required for "Consolidate upgrade and release into one operator pipeline".

## Plan

1. Extract a shared operator-run shell for upgrade and release that owns common preflight, source materialization, and finalize hooks without collapsing flow-specific policy or prompts.
2. Rewire release and upgrade commands to call the shared operator pipeline while keeping their command-specific options, guardrails, and output contracts intact.
3. Run focused upgrade/release/operator regressions and minimal builds, then record any remaining asymmetry explicitly in Findings.

## Verify Steps

1. Run focused operator-pipeline coverage around the extracted shared shell. Expected: common preflight, source materialization, and finalize hooks execute through one typed path without changing task-specific behavior.
2. Run targeted upgrade and release regressions. Expected: both commands preserve their existing guardrails, prompts, and output contracts while using the shared operator pipeline internally.
3. Run the smallest relevant builds. Expected: agentplane and any touched package compile cleanly, and any remaining upgrade-vs-release asymmetry is explicit in Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-27T18:17:54.146Z — VERIFY — ok

By: CODER

Note: Introduced a shared operator pipeline shell for release apply and upgrade, rewired both flows through the common init/preflight/materialize/execute/finalize shape without collapsing their domain-specific commit/tag/managed-file semantics, and verified the seam with focused release/upgrade regressions plus build, lint, and format checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T18:10:41.861Z, excerpt_hash=sha256:2fe576f9389a6a9e84654f4e251bf3b3f65e2261fcf5923646fde67f6b9e1592

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
