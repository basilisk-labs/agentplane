---
id: "202603081006-9Y3YGR"
title: "Simplify Verification layout for README v3"
result_summary: "Simplified README v3 Verification to markers-only layout and covered migration plus verification compatibility with targeted tests, builds, and doctor."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603081006-0GEVRW"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T11:06:38.941Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T11:14:15.759Z"
  updated_by: "CODER"
  note: "Targeted task verification tests, builds, and doctor passed; README v3 verification now normalizes to a results-only append block while preserving doc_version=2 compatibility."
commit:
  hash: "5185161c4802e7f933bc9ff1ac56d0bc59a6bc3c"
  message: "🧾 9Y3YGR task: simplify README v3 verification layout"
comments:
  -
    author: "CODER"
    body: "Start: simplify README v3 Verification to a results-only append block and keep verify-record normalization compatible with legacy sections."
  -
    author: "CODER"
    body: "Verified: README v3 now uses a results-only Verification block, while verify and migrate paths keep doc_version=2 compatibility and normalize legacy v3 layouts."
events:
  -
    type: "status"
    at: "2026-03-08T11:06:42.982Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: simplify README v3 Verification to a results-only append block and keep verify-record normalization compatible with legacy sections."
  -
    type: "verify"
    at: "2026-03-08T11:14:15.759Z"
    author: "CODER"
    state: "ok"
    note: "Targeted task verification tests, builds, and doctor passed; README v3 verification now normalizes to a results-only append block while preserving doc_version=2 compatibility."
  -
    type: "status"
    at: "2026-03-08T11:14:37.557Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: README v3 now uses a results-only Verification block, while verify and migrate paths keep doc_version=2 compatibility and normalize legacy v3 layouts."
doc_version: 3
doc_updated_at: "2026-03-08T11:14:37.557Z"
doc_updated_by: "CODER"
description: "Remove plan-like scaffolding from Verification and keep it as an append-only result log compatible with verify commands."
id_source: "generated"
---
## Summary

Simplify Verification layout for README v3

Remove plan-like scaffolding from Verification and keep it as an append-only result log compatible with verify commands.

## Scope

- In scope: Remove plan-like scaffolding from Verification and keep it as an append-only result log compatible with verify commands..
- Out of scope: unrelated refactors not required for "Simplify Verification layout for README v3".

## Plan

1. Replace the README v3 Verification template with a minimal append-only results block while keeping verification frontmatter behavior unchanged.
2. Update verify-record and migrate-doc normalization so existing Verification sections without markers are upgraded into the minimal results-only layout.
3. Adjust targeted task/verification tests, rerun focused checks plus build/doctor, then finish and push main.

## Verify Steps

1. Create or scaffold a README v3 task. Expected: the Verification section contains only the append-only marker block, without embedded Plan/Results subheadings.
2. Record verification on a task with an empty or legacy Verification section. Expected: verify commands preserve compatibility but normalize README v3 tasks to the results-only layout.
3. Run targeted verification/template tests, builds, and doctor. Expected: the new Verification layout passes without widening unrelated task-doc regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T11:14:15.759Z — VERIFY — ok

By: CODER

Note: Targeted task verification tests, builds, and doctor passed; README v3 verification now normalizes to a results-only append block while preserving doc_version=2 compatibility.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T11:06:42.982Z, excerpt_hash=sha256:0951834707ce1bc18511df9b1477dc190b42c5e8bf5d9f4a19188ec164cbadcb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
