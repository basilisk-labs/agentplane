---
id: "202604070443-T8F4ZZ"
title: "Skip broad pre-commit test-fast for artifact-only and docs-only staged changes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "testing"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T04:57:50.194Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T05:08:19.072Z"
  updated_by: "CODER"
  note: "Focused vitest passed for local-ci-selection and pre-commit-test-fast-script; eslint passed for the new pre-commit test-fast script, selector updates, and tests."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a pre-commit fast path that skips broad test-fast for artifact-only and docs-policy-only staged changes while keeping code-bearing commits on the current path."
events:
  -
    type: "status"
    at: "2026-04-07T04:58:23.846Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a pre-commit fast path that skips broad test-fast for artifact-only and docs-policy-only staged changes while keeping code-bearing commits on the current path."
  -
    type: "verify"
    at: "2026-04-07T05:02:55.290Z"
    author: "CODER"
    state: "ok"
    note: "Focused vitest passed for local-ci-selection, pre-commit-hook-script, and pre-commit-test-fast-script; eslint passed for hook selector and helper scripts."
  -
    type: "verify"
    at: "2026-04-07T05:08:19.072Z"
    author: "CODER"
    state: "ok"
    note: "Focused vitest passed for local-ci-selection and pre-commit-test-fast-script; eslint passed for the new pre-commit test-fast script, selector updates, and tests."
doc_version: 3
doc_updated_at: "2026-04-07T05:08:19.083Z"
doc_updated_by: "CODER"
description: "Avoid running the full pre-commit test-fast suite for commits that only touch task artifacts or docs/policy paths, so unrelated worker timeouts do not block workflow bookkeeping commits."
sections:
  Summary: |-
    Skip broad pre-commit test-fast for artifact-only and docs-only staged changes
    
    Avoid running the full pre-commit test-fast suite for commits that only touch task artifacts or docs/policy paths, so unrelated worker timeouts do not block workflow bookkeeping commits.
  Scope: |-
    - In scope: Avoid running the full pre-commit test-fast suite for commits that only touch task artifacts or docs/policy paths, so unrelated worker timeouts do not block workflow bookkeeping commits.
    - Out of scope: unrelated refactors not required for "Skip broad pre-commit test-fast for artifact-only and docs-only staged changes".
  Plan: "1. Inspect the current pre-commit hook path and classify staged changes into artifact-only/docs-policy-only versus code-bearing buckets using the existing local CI selector surfaces where possible. 2. Add the smallest hook-side fast path that skips broad test-fast when staged changes are limited to task artifacts or docs/policy paths, while preserving formatting/lint checks and keeping code-bearing commits on the existing path. 3. Add focused tests for the staged-file classification and hook decision so artifact-only/docs-only commits skip broad tests but mixed/code commits still run them."
  Verify Steps: |-
    1. Run focused tests for the staged-file selection or pre-commit decision path on an artifact-only or docs-only staged set. Expected: broad test-fast is skipped and the hook reports the skip reason.
    2. Run focused tests for a code-bearing staged set. Expected: the hook still selects the broad test path instead of skipping it.
    3. Run eslint on the touched hook or selection files and any new tests. Expected: lint exits 0.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T05:02:55.290Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused vitest passed for local-ci-selection, pre-commit-hook-script, and pre-commit-test-fast-script; eslint passed for hook selector and helper scripts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T04:58:23.855Z, excerpt_hash=sha256:e3ebff84249c962b5bf4b6f3d95d665a5b93552550e462f3dc60bf0e9a410f9b
    
    ### 2026-04-07T05:08:19.072Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused vitest passed for local-ci-selection and pre-commit-test-fast-script; eslint passed for the new pre-commit test-fast script, selector updates, and tests.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T05:02:55.294Z, excerpt_hash=sha256:e3ebff84249c962b5bf4b6f3d95d665a5b93552550e462f3dc60bf0e9a410f9b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Skip broad pre-commit test-fast for artifact-only and docs-only staged changes

Avoid running the full pre-commit test-fast suite for commits that only touch task artifacts or docs/policy paths, so unrelated worker timeouts do not block workflow bookkeeping commits.

## Scope

- In scope: Avoid running the full pre-commit test-fast suite for commits that only touch task artifacts or docs/policy paths, so unrelated worker timeouts do not block workflow bookkeeping commits.
- Out of scope: unrelated refactors not required for "Skip broad pre-commit test-fast for artifact-only and docs-only staged changes".

## Plan

1. Inspect the current pre-commit hook path and classify staged changes into artifact-only/docs-policy-only versus code-bearing buckets using the existing local CI selector surfaces where possible. 2. Add the smallest hook-side fast path that skips broad test-fast when staged changes are limited to task artifacts or docs/policy paths, while preserving formatting/lint checks and keeping code-bearing commits on the existing path. 3. Add focused tests for the staged-file classification and hook decision so artifact-only/docs-only commits skip broad tests but mixed/code commits still run them.

## Verify Steps

1. Run focused tests for the staged-file selection or pre-commit decision path on an artifact-only or docs-only staged set. Expected: broad test-fast is skipped and the hook reports the skip reason.
2. Run focused tests for a code-bearing staged set. Expected: the hook still selects the broad test path instead of skipping it.
3. Run eslint on the touched hook or selection files and any new tests. Expected: lint exits 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T05:02:55.290Z — VERIFY — ok

By: CODER

Note: Focused vitest passed for local-ci-selection, pre-commit-hook-script, and pre-commit-test-fast-script; eslint passed for hook selector and helper scripts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T04:58:23.855Z, excerpt_hash=sha256:e3ebff84249c962b5bf4b6f3d95d665a5b93552550e462f3dc60bf0e9a410f9b

### 2026-04-07T05:08:19.072Z — VERIFY — ok

By: CODER

Note: Focused vitest passed for local-ci-selection and pre-commit-test-fast-script; eslint passed for the new pre-commit test-fast script, selector updates, and tests.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T05:02:55.294Z, excerpt_hash=sha256:e3ebff84249c962b5bf4b6f3d95d665a5b93552550e462f3dc60bf0e9a410f9b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
