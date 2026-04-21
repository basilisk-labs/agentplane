---
id: "202604210858-4CBZRT"
title: "Pin Vitest and coverage provider exactly"
result_summary: "Pinned Vitest and coverage provider to exact 4.0.18 versions."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "dependencies"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:01:26.741Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:11:03.429Z"
  updated_by: "CODER"
  note: "Root package metadata now pins vitest and @vitest/coverage-v8 exactly to 4.0.18. Verification: package metadata node check passed; bun vitest list --config vitest.workspace.ts --project fast succeeded and loaded the workspace."
commit:
  hash: "43c65c48f495a804017ff403daafc4e358035f51"
  message: "✅ 4CBZRT code: done"
comments:
  -
    author: "CODER"
    body: "Start: Pin Vitest and coverage provider exactly in package metadata and verify the workspace still loads."
  -
    author: "CODER"
    body: "Verified: Vitest dependency ranges are pinned exactly and the workspace fast project loads under Vitest 4.0.18."
events:
  -
    type: "status"
    at: "2026-04-21T09:01:29.094Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Pin Vitest and coverage provider exactly in package metadata and verify the workspace still loads."
  -
    type: "verify"
    at: "2026-04-21T09:11:03.429Z"
    author: "CODER"
    state: "ok"
    note: "Root package metadata now pins vitest and @vitest/coverage-v8 exactly to 4.0.18. Verification: package metadata node check passed; bun vitest list --config vitest.workspace.ts --project fast succeeded and loaded the workspace."
  -
    type: "status"
    at: "2026-04-21T09:13:07.491Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Vitest dependency ranges are pinned exactly and the workspace fast project loads under Vitest 4.0.18."
doc_version: 3
doc_updated_at: "2026-04-21T09:13:07.492Z"
doc_updated_by: "CODER"
description: "Pin Vitest and @vitest/coverage-v8 to exact versions to reduce patch-release instability from fresh major tooling drift."
sections:
  Summary: "Change Vitest and coverage-provider dependency ranges from caret ranges to exact versions used by the workspace."
  Scope: "In scope: root package metadata and lockfile changes. Out of scope: Vitest upgrades, workspace-project restructuring, and coverage threshold changes."
  Plan: |-
    1. Inspect package metadata and lockfile for current Vitest versions.
    2. Replace caret ranges for vitest and @vitest/coverage-v8 with exact versions.
    3. Refresh lockfile if needed.
    4. Run the fastest test command that validates Vitest workspace loading.
  Verify Steps: |-
    - package metadata contains exact versions for vitest and @vitest/coverage-v8.
    - Lockfile resolves the same exact versions.
    - A targeted Vitest workspace command starts successfully.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:11:03.429Z — VERIFY — ok
    
    By: CODER
    
    Note: Root package metadata now pins vitest and @vitest/coverage-v8 exactly to 4.0.18. Verification: package metadata node check passed; bun vitest list --config vitest.workspace.ts --project fast succeeded and loaded the workspace.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:01:29.107Z, excerpt_hash=sha256:7add40bc8d073612ba443a7f14ddc6195d2d0c7537cab9c19df8a65f30b69734
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert package metadata and lockfile changes for this task only."
  Findings: "Source input: AUDIT M-5 and REFACTORING_PLAN E.6."
id_source: "generated"
---
## Summary

Change Vitest and coverage-provider dependency ranges from caret ranges to exact versions used by the workspace.

## Scope

In scope: root package metadata and lockfile changes. Out of scope: Vitest upgrades, workspace-project restructuring, and coverage threshold changes.

## Plan

1. Inspect package metadata and lockfile for current Vitest versions.
2. Replace caret ranges for vitest and @vitest/coverage-v8 with exact versions.
3. Refresh lockfile if needed.
4. Run the fastest test command that validates Vitest workspace loading.

## Verify Steps

- package metadata contains exact versions for vitest and @vitest/coverage-v8.
- Lockfile resolves the same exact versions.
- A targeted Vitest workspace command starts successfully.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:11:03.429Z — VERIFY — ok

By: CODER

Note: Root package metadata now pins vitest and @vitest/coverage-v8 exactly to 4.0.18. Verification: package metadata node check passed; bun vitest list --config vitest.workspace.ts --project fast succeeded and loaded the workspace.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:01:29.107Z, excerpt_hash=sha256:7add40bc8d073612ba443a7f14ddc6195d2d0c7537cab9c19df8a65f30b69734

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert package metadata and lockfile changes for this task only.

## Findings

Source input: AUDIT M-5 and REFACTORING_PLAN E.6.
