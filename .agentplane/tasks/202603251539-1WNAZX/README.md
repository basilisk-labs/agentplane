---
id: "202603251539-1WNAZX"
title: "Consolidate upgrade and release into one operator pipeline"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract the shared operator-run shell first, then rewire release and upgrade around that seam without collapsing their command-specific guards or prompts."
events:
  -
    type: "status"
    at: "2026-03-27T18:10:41.859Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract the shared operator-run shell first, then rewire release and upgrade around that seam without collapsing their command-specific guards or prompts."
doc_version: 3
doc_updated_at: "2026-03-27T18:10:41.861Z"
doc_updated_by: "CODER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
