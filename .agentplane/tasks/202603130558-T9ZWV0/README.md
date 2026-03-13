---
id: "202603130558-T9ZWV0"
title: "Emit release-ready manifest from successful Core CI"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "release"
  - "code"
  - "ci"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T05:58:20.810Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T06:03:11.711Z"
  updated_by: "CODER"
  note: "Verified release-ready manifest generation: targeted script regressions, workflow lint, prettier, and eslint passed; Core CI now emits a single release-ready artifact only after the release-relevant gates pass and only when the checkout is actually release-ready."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a deterministic release-ready manifest producer to Core CI so successful release SHAs emit one canonical publish artifact for downstream workflows and recovery tooling."
events:
  -
    type: "status"
    at: "2026-03-13T05:59:45.465Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a deterministic release-ready manifest producer to Core CI so successful release SHAs emit one canonical publish artifact for downstream workflows and recovery tooling."
  -
    type: "verify"
    at: "2026-03-13T06:03:11.711Z"
    author: "CODER"
    state: "ok"
    note: "Verified release-ready manifest generation: targeted script regressions, workflow lint, prettier, and eslint passed; Core CI now emits a single release-ready artifact only after the release-relevant gates pass and only when the checkout is actually release-ready."
doc_version: 3
doc_updated_at: "2026-03-13T06:03:11.712Z"
doc_updated_by: "CODER"
description: "Add a release-ready artifact/job in Core CI that records the exact publishable SHA, version, tag, notes path, and published-state metadata only after the release-relevant gates pass."
id_source: "generated"
---
## Summary

Emit release-ready manifest from successful Core CI

Add a release-ready artifact/job in Core CI that records the exact publishable SHA, version, tag, notes path, and published-state metadata only after the release-relevant gates pass.

## Scope

- In scope: Add a release-ready artifact/job in Core CI that records the exact publishable SHA, version, tag, notes path, and published-state metadata only after the release-relevant gates pass.
- Out of scope: unrelated refactors not required for "Emit release-ready manifest from successful Core CI".

## Plan

1. Add a deterministic release-ready manifest generator for release-eligible SHAs in Core CI. 2. Persist the manifest as a GitHub Actions artifact only when the exact release gates pass. 3. Cover the manifest contract with targeted tests and workflow review.

## Verify Steps

1. Run targeted workflow/static validation for the touched Core CI files. Expected: workflow syntax and command contracts stay valid.
2. Run targeted tests for the release-ready manifest generator/contract. Expected: only release-eligible SHAs emit the manifest, and the artifact includes exact SHA/version/tag/notes fields.
3. Review the Core CI path. Expected: release-ready metadata is emitted only after the release-relevant gates pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T06:03:11.711Z — VERIFY — ok

By: CODER

Note: Verified release-ready manifest generation: targeted script regressions, workflow lint, prettier, and eslint passed; Core CI now emits a single release-ready artifact only after the release-relevant gates pass and only when the checkout is actually release-ready.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T05:59:45.466Z, excerpt_hash=sha256:f7d7f0533413d719012285099150fb217e99b3a0680095a81abf3b2d92c8baf8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
