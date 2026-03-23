---
id: "202603231907-B3BEW8"
title: "Propagate recipe run_profile policy through custom runner execution"
result_summary: "runner: custom adapter recipe run_profile propagation"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T19:08:15.933Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T19:25:48.150Z"
  updated_by: "CODER"
  note: "Propagated resolved recipe run_profile policy through custom runner execution, exported recipe-scenario policy metadata via runner env, and verified custom adapter plus scenario execute coverage with prettier, eslint, targeted vitest, and source builds."
commit:
  hash: "0acec7d413705caf1a3ee1958278016777976243"
  message: "✅ B3BEW8 code: done"
comments:
  -
    author: "CODER"
    body: "Start: propagate resolved recipe run_profile policy through custom runner execution so recipe-defined invocation controls are honored by the adapter and covered by targeted tests."
  -
    author: "CODER"
    body: "Verified: Propagated resolved recipe run_profile policy through custom runner execution, exported recipe-scenario policy metadata via runner env, and verified custom adapter plus scenario execute coverage with prettier, eslint, targeted vitest, and source builds."
events:
  -
    type: "status"
    at: "2026-03-23T19:19:54.986Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: propagate resolved recipe run_profile policy through custom runner execution so recipe-defined invocation controls are honored by the adapter and covered by targeted tests."
  -
    type: "verify"
    at: "2026-03-23T19:25:48.150Z"
    author: "CODER"
    state: "ok"
    note: "Propagated resolved recipe run_profile policy through custom runner execution, exported recipe-scenario policy metadata via runner env, and verified custom adapter plus scenario execute coverage with prettier, eslint, targeted vitest, and source builds."
  -
    type: "status"
    at: "2026-03-23T19:26:03.712Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Propagated resolved recipe run_profile policy through custom runner execution, exported recipe-scenario policy metadata via runner env, and verified custom adapter plus scenario execute coverage with prettier, eslint, targeted vitest, and source builds."
doc_version: 3
doc_updated_at: "2026-03-23T19:26:03.712Z"
doc_updated_by: "CODER"
description: "Expose resolved recipe run_profile execution policy consistently to custom runners and verify custom and codex adapters honor the same execution metadata surface."
sections:
  Summary: |-
    Propagate recipe run_profile policy through custom runner execution
    
    Expose resolved recipe run_profile execution policy consistently to custom runners and verify custom and codex adapters honor the same execution metadata surface.
  Scope: |-
    - In scope: Expose resolved recipe run_profile execution policy consistently to custom runners and verify custom and codex adapters honor the same execution metadata surface.
    - Out of scope: unrelated refactors not required for "Propagate recipe run_profile policy through custom runner execution".
  Plan: |-
    1. Define the normalized run_profile execution fields that every runner adapter must see, regardless of adapter type.
    2. Extend the custom runner adapter env/invocation surface to expose the same recipe policy metadata that codex already receives.
    3. Verify parity with adapter tests so recipe execution policies stay adapter-neutral.
  Verify Steps: |-
    1. Run custom and codex adapter tests with a recipe selection that sets mode, sandbox, network, approval, artifact, and exit-contract metadata. Expected: both adapters expose the normalized policy surface deterministically.
    2. Inspect prepared runner invocation metadata for a scenario execute path. Expected: recipe policy fields are available without adapter-specific guesswork.
    3. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Expected: shared execution policy changes compile cleanly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T19:25:48.150Z — VERIFY — ok
    
    By: CODER
    
    Note: Propagated resolved recipe run_profile policy through custom runner execution, exported recipe-scenario policy metadata via runner env, and verified custom adapter plus scenario execute coverage with prettier, eslint, targeted vitest, and source builds.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:19:54.988Z, excerpt_hash=sha256:9b5d52c6b1dccfd4607dd19f0b6cd084c3f11a6a4d66bf07a76076e36cab6e26
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Propagate recipe run_profile policy through custom runner execution

Expose resolved recipe run_profile execution policy consistently to custom runners and verify custom and codex adapters honor the same execution metadata surface.

## Scope

- In scope: Expose resolved recipe run_profile execution policy consistently to custom runners and verify custom and codex adapters honor the same execution metadata surface.
- Out of scope: unrelated refactors not required for "Propagate recipe run_profile policy through custom runner execution".

## Plan

1. Define the normalized run_profile execution fields that every runner adapter must see, regardless of adapter type.
2. Extend the custom runner adapter env/invocation surface to expose the same recipe policy metadata that codex already receives.
3. Verify parity with adapter tests so recipe execution policies stay adapter-neutral.

## Verify Steps

1. Run custom and codex adapter tests with a recipe selection that sets mode, sandbox, network, approval, artifact, and exit-contract metadata. Expected: both adapters expose the normalized policy surface deterministically.
2. Inspect prepared runner invocation metadata for a scenario execute path. Expected: recipe policy fields are available without adapter-specific guesswork.
3. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Expected: shared execution policy changes compile cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T19:25:48.150Z — VERIFY — ok

By: CODER

Note: Propagated resolved recipe run_profile policy through custom runner execution, exported recipe-scenario policy metadata via runner env, and verified custom adapter plus scenario execute coverage with prettier, eslint, targeted vitest, and source builds.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:19:54.988Z, excerpt_hash=sha256:9b5d52c6b1dccfd4607dd19f0b6cd084c3f11a6a4d66bf07a76076e36cab6e26

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
