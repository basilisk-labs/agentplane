---
id: "202603231533-CSXCMG"
title: "Expand runner base prompt assembly"
result_summary: "Expanded base prompt assembly with framework and recipe-aware prompt blocks."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603231533-0PZ3B1"
tags:
  - "code"
  - "runner"
  - "prompting"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T16:21:50.427Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T16:25:26.980Z"
  updated_by: "CODER"
  note: "Verified framework runner prompt loading, prompt precedence ordering, and recipe-local prompt materialization through base-prompts and scenario execute coverage; source builds and doctor pass."
commit:
  hash: "1032140308f009518dcd567cae2f754b7a81ebaf"
  message: "✅ CSXCMG code: done"
comments:
  -
    author: "CODER"
    body: "Start: expand runner base prompt assembly with an explicit framework runner prompt plus recipe-aware prompt blocks, then verify ordering and scenario integration through unit and CLI coverage."
  -
    author: "CODER"
    body: "Verified: added a framework runner prompt, preserved framework-policy-owner precedence, materialized recipe-local prompt blocks for scenario execution, and passed targeted tests, source builds, and doctor."
events:
  -
    type: "status"
    at: "2026-03-23T16:21:57.510Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: expand runner base prompt assembly with an explicit framework runner prompt plus recipe-aware prompt blocks, then verify ordering and scenario integration through unit and CLI coverage."
  -
    type: "verify"
    at: "2026-03-23T16:25:26.980Z"
    author: "CODER"
    state: "ok"
    note: "Verified framework runner prompt loading, prompt precedence ordering, and recipe-local prompt materialization through base-prompts and scenario execute coverage; source builds and doctor pass."
  -
    type: "status"
    at: "2026-03-23T16:26:03.805Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added a framework runner prompt, preserved framework-policy-owner precedence, materialized recipe-local prompt blocks for scenario execution, and passed targeted tests, source builds, and doctor."
doc_version: 3
doc_updated_at: "2026-03-23T16:26:03.805Z"
doc_updated_by: "CODER"
description: "Broaden runner base prompts beyond the gateway and owner profile so shared execution bundles include the framework-level runner prompt and relevant recipe-local prompt context without breaking precedence."
sections:
  Summary: |-
    Expand runner base prompt assembly
    
    Broaden runner base prompts beyond the gateway and owner profile so shared execution bundles include the framework-level runner prompt and relevant recipe-local prompt context without breaking precedence.
  Scope: |-
    - In scope: Broaden runner base prompts beyond the gateway and owner profile so shared execution bundles include the framework-level runner prompt and relevant recipe-local prompt context without breaking precedence.
    - Out of scope: unrelated refactors not required for "Expand runner base prompt assembly".
  Plan: |-
    1. Add a framework-level runner prompt block and a recipe-aware prompt collector that can derive recipe-local prompt blocks without violating prompt precedence.
    2. Wire task/scenario runner preparation so recipe-backed executions pass recipe context into base prompt assembly and expose the new blocks in bundle.json.
    3. Extend unit and CLI scenario coverage to lock prompt ordering, fallback behavior, and recipe prompt materialization.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts`. Expected: base prompt assembly includes the framework runner prompt, preserves gateway/owner precedence, and recipe-backed scenario execution bundles recipe-local prompt blocks.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: the new prompt loader and runner wiring build cleanly from source.
    3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new runner/runtime integrity findings are introduced.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T16:25:26.980Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified framework runner prompt loading, prompt precedence ordering, and recipe-local prompt materialization through base-prompts and scenario execute coverage; source builds and doctor pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:21:57.511Z, excerpt_hash=sha256:01022309798fc988b10b726bdf964be15d41ed5375b271c84750eea16c9886d1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Expand runner base prompt assembly

Broaden runner base prompts beyond the gateway and owner profile so shared execution bundles include the framework-level runner prompt and relevant recipe-local prompt context without breaking precedence.

## Scope

- In scope: Broaden runner base prompts beyond the gateway and owner profile so shared execution bundles include the framework-level runner prompt and relevant recipe-local prompt context without breaking precedence.
- Out of scope: unrelated refactors not required for "Expand runner base prompt assembly".

## Plan

1. Add a framework-level runner prompt block and a recipe-aware prompt collector that can derive recipe-local prompt blocks without violating prompt precedence.
2. Wire task/scenario runner preparation so recipe-backed executions pass recipe context into base prompt assembly and expose the new blocks in bundle.json.
3. Extend unit and CLI scenario coverage to lock prompt ordering, fallback behavior, and recipe prompt materialization.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts`. Expected: base prompt assembly includes the framework runner prompt, preserves gateway/owner precedence, and recipe-backed scenario execution bundles recipe-local prompt blocks.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: the new prompt loader and runner wiring build cleanly from source.
3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new runner/runtime integrity findings are introduced.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T16:25:26.980Z — VERIFY — ok

By: CODER

Note: Verified framework runner prompt loading, prompt precedence ordering, and recipe-local prompt materialization through base-prompts and scenario execute coverage; source builds and doctor pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:21:57.511Z, excerpt_hash=sha256:01022309798fc988b10b726bdf964be15d41ed5375b271c84750eea16c9886d1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
