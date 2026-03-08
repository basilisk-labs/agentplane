---
id: "202603081218-FS24HK"
title: "Make standard pre-push contour path-aware"
result_summary: "Made the standard fast pre-push contour path-aware for isolated hook and CI-routing changes by adding a targeted hooks bucket with focused selector and hook regression coverage."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T12:21:23.330Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T12:25:29.657Z"
  updated_by: "CODER"
  note: "Added a targeted hooks bucket for narrow pre-push/CI-routing changes. Selector regressions, targeted lint, and AGENTPLANE_FAST_CHANGED_FILES-driven fast CI now route scripts/run-pre-push-hook.mjs plus local-ci-selection.mjs to targeted:hooks instead of full-fast; the remaining cost is concentrated in run-cli.core.hooks.test.ts for the next bucket-splitting task."
commit:
  hash: "ef098557868eeadc5505d1d349b2f7d08344cd57"
  message: "⚡ FS24HK task: make standard pre-push contour path-aware"
comments:
  -
    author: "CODER"
    body: "Start: add a narrow pre-push/CI-routing bucket so standard fast pre-push runs stop paying for the blanket full-fast suite on isolated hook-selection changes."
  -
    author: "CODER"
    body: "Verified: narrow pre-push and CI-routing changes now route to a targeted hooks contour instead of the blanket full-fast suite."
events:
  -
    type: "status"
    at: "2026-03-08T12:21:27.108Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a narrow pre-push/CI-routing bucket so standard fast pre-push runs stop paying for the blanket full-fast suite on isolated hook-selection changes."
  -
    type: "verify"
    at: "2026-03-08T12:25:29.657Z"
    author: "CODER"
    state: "ok"
    note: "Added a targeted hooks bucket for narrow pre-push/CI-routing changes. Selector regressions, targeted lint, and AGENTPLANE_FAST_CHANGED_FILES-driven fast CI now route scripts/run-pre-push-hook.mjs plus local-ci-selection.mjs to targeted:hooks instead of full-fast; the remaining cost is concentrated in run-cli.core.hooks.test.ts for the next bucket-splitting task."
  -
    type: "status"
    at: "2026-03-08T12:25:45.577Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: narrow pre-push and CI-routing changes now route to a targeted hooks contour instead of the blanket full-fast suite."
doc_version: 3
doc_updated_at: "2026-03-08T12:25:45.577Z"
doc_updated_by: "CODER"
description: "Replace the current one-size-fits-all standard pre-push broad path with scope-aware routing so narrow code changes do not always pay for the full blanket test sweep."
id_source: "generated"
---
## Summary

Make standard pre-push contour path-aware

Replace the current one-size-fits-all standard pre-push broad path with scope-aware routing so narrow code changes do not always pay for the full blanket test sweep.

## Scope

- In scope: Replace the current one-size-fits-all standard pre-push broad path with scope-aware routing so narrow code changes do not always pay for the full blanket test sweep..
- Out of scope: unrelated refactors not required for "Make standard pre-push contour path-aware".

## Plan

1. Extend the current changed-file selector so standard pre-push runs can recognize a narrow pre-push/CI-routing scope instead of treating every scripts-level change as broad infrastructure. 2. Teach run-local-ci fast mode to execute a targeted contour for that scope, with focused lint/tests that cover the hook routing and selector logic without paying for the blanket full-fast suite. 3. Add regression coverage for the new selector path and verify the optimized bucket by running the fast CI path with AGENTPLANE_FAST_CHANGED_FILES set to representative pre-push/CI-routing files.

## Verify Steps

1. Run the selector regression tests. Expected: pre-push/CI-routing-only changed files resolve to a targeted bucket instead of broad full-fast. 2. Run lint on the touched selector and hook files. Expected: the new routing path is clean and the focused file set has no lint violations. 3. Run fast local CI with AGENTPLANE_FAST_CHANGED_FILES set to representative pre-push/CI-routing files. Expected: the new targeted contour passes without falling back to the blanket full-fast suite.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T12:25:29.657Z — VERIFY — ok

By: CODER

Note: Added a targeted hooks bucket for narrow pre-push/CI-routing changes. Selector regressions, targeted lint, and AGENTPLANE_FAST_CHANGED_FILES-driven fast CI now route scripts/run-pre-push-hook.mjs plus local-ci-selection.mjs to targeted:hooks instead of full-fast; the remaining cost is concentrated in run-cli.core.hooks.test.ts for the next bucket-splitting task.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T12:21:27.108Z, excerpt_hash=sha256:ceb8ed8f74241c4a884f76ba0c293e3e6c9f2fb95ea1a7f8bd370413fd11b416

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
