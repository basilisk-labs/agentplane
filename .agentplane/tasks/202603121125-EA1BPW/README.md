---
id: "202603121125-EA1BPW"
title: "Patch stabilization: narrow fast-CI contours after split suites"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T11:26:47.107Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the first patch-hardening task because the fast-CI selector already lags behind recently split suites."
verification:
  state: "ok"
  updated_at: "2026-03-12T11:30:49.856Z"
  updated_by: "CODER"
  note: "Verified targeted fast-CI bucket routing for split CLI suites."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: update local CI bucket selection so split lifecycle and guard suites route to targeted contours instead of broad fallback buckets."
events:
  -
    type: "status"
    at: "2026-03-12T11:26:48.467Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update local CI bucket selection so split lifecycle and guard suites route to targeted contours instead of broad fallback buckets."
  -
    type: "verify"
    at: "2026-03-12T11:30:49.856Z"
    author: "CODER"
    state: "ok"
    note: "Verified targeted fast-CI bucket routing for split CLI suites."
doc_version: 3
doc_updated_at: "2026-03-12T11:30:49.858Z"
doc_updated_by: "CODER"
description: "Update local CI selection so new split CLI integration suites hit targeted buckets instead of broad full-fast fallbacks."
id_source: "generated"
---
## Summary

Patch stabilization: narrow fast-CI contours after split suites

Update local CI selection so new split CLI integration suites hit targeted buckets instead of broad full-fast fallbacks.

## Scope

- In scope: Update local CI selection so new split CLI integration suites hit targeted buckets instead of broad full-fast fallbacks.
- Out of scope: unrelated refactors not required for "Patch stabilization: narrow fast-CI contours after split suites".

## Plan

1. Update local CI selection patterns for the split run-cli lifecycle and guard suites.
2. Add or refresh targeted selection tests that prove changed files map to targeted buckets instead of full-fast.
3. Run the targeted selector tests and a focused build if touched files require it.

## Verify Steps

- Change detection for split run-cli lifecycle or guard suites resolves to targeted fast buckets.
- No selector regression sends these suites to full-fast without justification.
- Focused tests pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T11:30:49.856Z — VERIFY — ok

By: CODER

Note: Verified targeted fast-CI bucket routing for split CLI suites.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T11:26:48.467Z, excerpt_hash=sha256:40ba747c2261282c23046364ae6bc5ed99980f3e96136bc31247c8bf7228df57

Details:

Checks:
- bun x vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000
- ./node_modules/.bin/eslint scripts/lib/local-ci-selection.mjs packages/agentplane/src/cli/local-ci-selection.test.ts
- bun run --filter=@agentplaneorg/core build
- bun run --filter=agentplane build

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
