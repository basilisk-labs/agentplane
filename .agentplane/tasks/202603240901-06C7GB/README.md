---
id: "202603240901-06C7GB"
title: "Separate raw trace from result manifest semantics"
result_summary: "Runner result manifests now keep machine-style summaries and labeled artifact references while leaving raw assistant output in trace-side artifacts instead of embedding prose-derived summaries."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603240901-SMEDN1"
tags:
  - "code"
  - "runner"
  - "contracts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T09:27:26.667Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T09:33:51.755Z"
  updated_by: "CODER"
  note: "Result-manifest and adapter tests passed; source builds passed after narrowing result.json to machine-style summaries and labeled artifact references without embedding assistant prose."
commit:
  hash: "8327a83f81cb9f0e8fa10a0e1b9ad719bb05d9e4"
  message: "✅ 06C7GB code: done"
comments:
  -
    author: "CODER"
    body: "Start: narrow result.json to machine-style English summaries and artifact references while keeping raw assistant output only in trace-side artifacts."
  -
    author: "CODER"
    body: "Verified: narrowed result.json to machine-style English summaries and labeled artifact references, kept assistant output in trace-side artifacts, and passed focused manifest/adapter tests plus source builds."
events:
  -
    type: "status"
    at: "2026-03-24T09:27:36.851Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: narrow result.json to machine-style English summaries and artifact references while keeping raw assistant output only in trace-side artifacts."
  -
    type: "verify"
    at: "2026-03-24T09:33:51.755Z"
    author: "CODER"
    state: "ok"
    note: "Result-manifest and adapter tests passed; source builds passed after narrowing result.json to machine-style summaries and labeled artifact references without embedding assistant prose."
  -
    type: "status"
    at: "2026-03-24T09:33:58.301Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: narrowed result.json to machine-style English summaries and labeled artifact references, kept assistant output in trace-side artifacts, and passed focused manifest/adapter tests plus source builds."
doc_version: 3
doc_updated_at: "2026-03-24T09:33:58.302Z"
doc_updated_by: "CODER"
description: "Keep raw assistant output in trace artifacts only and narrow result.json to machine-style summaries, artifact references, metrics, and structured status information rather than raw prose-derived summaries."
sections:
  Summary: "Keep raw assistant output in trace artifacts only and narrow result.json to machine-style summaries, artifact references, metrics, and structured status information rather than raw prose-derived summaries."
  Scope: |-
    - In scope: remove raw assistant prose from result manifest summary fields and keep it in trace-side artifacts only.
    - In scope: preserve machine-readable status, metrics, timestamps, and artifact references in result.json.
    - Out of scope: task-facing README sanitization, trace config knobs, or documentation updates.
  Plan: |-
    1. Inspect result-manifest and adapter result assembly paths to identify where raw assistant prose enters result.json today.
    2. Refactor the result contract so summaries stay machine-style English and raw assistant text remains available only via trace-side artifacts.
    3. Update focused tests around manifests and adapters, then verify the narrowed contract before finishing with one task-scoped commit.
  Verify Steps: |-
    1. Inspect the result-manifest path. Expected: result.json contains machine-style English summaries plus artifact references, but no embedded assistant prose.
    2. Run focused runner result-manifest and adapter tests. Expected: success, failure, and malformed-manifest paths still pass with the narrowed summary contract.
    3. Run a source build for the touched package. Expected: TypeScript/build checks pass after the manifest semantics refactor.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T09:33:51.755Z — VERIFY — ok
    
    By: CODER
    
    Note: Result-manifest and adapter tests passed; source builds passed after narrowing result.json to machine-style summaries and labeled artifact references without embedding assistant prose.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T09:27:36.852Z, excerpt_hash=sha256:1f741e6c27237f9c32425c367129a7ca6d29e59cb4ab497f4d8e0013246e8153
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit.
    - Re-run the focused result-manifest and adapter tests plus build to confirm the prior manifest behavior is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Keep raw assistant output in trace artifacts only and narrow result.json to machine-style summaries, artifact references, metrics, and structured status information rather than raw prose-derived summaries.

## Scope

- In scope: remove raw assistant prose from result manifest summary fields and keep it in trace-side artifacts only.
- In scope: preserve machine-readable status, metrics, timestamps, and artifact references in result.json.
- Out of scope: task-facing README sanitization, trace config knobs, or documentation updates.

## Plan

1. Inspect result-manifest and adapter result assembly paths to identify where raw assistant prose enters result.json today.
2. Refactor the result contract so summaries stay machine-style English and raw assistant text remains available only via trace-side artifacts.
3. Update focused tests around manifests and adapters, then verify the narrowed contract before finishing with one task-scoped commit.

## Verify Steps

1. Inspect the result-manifest path. Expected: result.json contains machine-style English summaries plus artifact references, but no embedded assistant prose.
2. Run focused runner result-manifest and adapter tests. Expected: success, failure, and malformed-manifest paths still pass with the narrowed summary contract.
3. Run a source build for the touched package. Expected: TypeScript/build checks pass after the manifest semantics refactor.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T09:33:51.755Z — VERIFY — ok

By: CODER

Note: Result-manifest and adapter tests passed; source builds passed after narrowing result.json to machine-style summaries and labeled artifact references without embedding assistant prose.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T09:27:36.852Z, excerpt_hash=sha256:1f741e6c27237f9c32425c367129a7ca6d29e59cb4ab497f4d8e0013246e8153

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit.
- Re-run the focused result-manifest and adapter tests plus build to confirm the prior manifest behavior is restored.

## Findings
