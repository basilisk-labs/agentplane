---
id: "202603081006-SDFADJ"
title: "Extend task migrate-doc for README v2 to v3 migration"
result_summary: "Extended task migrate-doc into a real v2-to-v3 migrator with doc_version promotion, Findings migration, canonical v3 ordering, preserved extra sections, and bulk/idempotent coverage."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603081006-BD4X83"
  - "202603081006-9Y3YGR"
  - "202603081006-CT5BE1"
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T11:21:37.600Z"
  updated_by: "CODER"
  note: "Extended task migrate-doc to upgrade legacy README v2 tasks into v3 with Findings, doc_version promotion, preserved extra sections, and targeted migrate-doc/lifecycle tests plus builds and doctor passing."
commit:
  hash: "4b922007fc719a46db01b9df358c89a4bc331c58"
  message: "♻️ SDFADJ task: migrate legacy task docs to README v3"
comments:
  -
    author: "CODER"
    body: "Start: extend task migrate-doc to normalize legacy README v2 tasks into README v3 with Findings, new Verification layout, and idempotent migration behavior."
  -
    author: "CODER"
    body: "Verified: task migrate-doc now upgrades legacy README v2 tasks into README v3, promotes Notes into Findings, preserves extra sections, and keeps existing v3 files compatible while normalizing required metadata."
events:
  -
    type: "status"
    at: "2026-03-08T11:17:07.896Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend task migrate-doc to normalize legacy README v2 tasks into README v3 with Findings, new Verification layout, and idempotent migration behavior."
  -
    type: "verify"
    at: "2026-03-08T11:21:37.600Z"
    author: "CODER"
    state: "ok"
    note: "Extended task migrate-doc to upgrade legacy README v2 tasks into v3 with Findings, doc_version promotion, preserved extra sections, and targeted migrate-doc/lifecycle tests plus builds and doctor passing."
  -
    type: "status"
    at: "2026-03-08T11:21:57.863Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task migrate-doc now upgrades legacy README v2 tasks into README v3, promotes Notes into Findings, preserves extra sections, and keeps existing v3 files compatible while normalizing required metadata."
doc_version: 3
doc_updated_at: "2026-03-08T11:21:57.863Z"
doc_updated_by: "CODER"
description: "Add explicit migration from legacy task README v2 to the new v3 format, including dry-run and stable normalization rules."
id_source: "generated"
---
## Summary

Extend task migrate-doc for README v2 to v3 migration

Add explicit migration from legacy task README v2 to the new v3 format, including dry-run and stable normalization rules.

## Scope

- In scope: Add explicit migration from legacy task README v2 to the new v3 format, including dry-run and stable normalization rules..
- Out of scope: unrelated refactors not required for "Extend task migrate-doc for README v2 to v3 migration".

## Plan

1. Extend task migrate-doc so legacy README v2 tasks are upgraded to doc_version=3 with Findings, v3 section ordering, and normalized Verification while preserving existing content. 2. Add migration coverage for single-task, --all, and dry-run/idempotent paths so old projects can be normalized without manual README surgery. 3. Run targeted migrate-doc/lifecycle checks plus build and doctor, then verify, finish, and push main.

## Verify Steps

1. Migrate a README v2 task with Notes and legacy Verification. Expected: output is doc_version=3 with Findings, preserved content, and a results-only Verification block. 2. Run task migrate-doc on repeated or bulk inputs. Expected: migration is idempotent, supports --all, and does not rewrite already-normalized tasks unexpectedly. 3. Run targeted migrate-doc tests, builds, and doctor. Expected: legacy-to-v3 migration passes without breaking current task lifecycle behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T11:21:37.600Z — VERIFY — ok

By: CODER

Note: Extended task migrate-doc to upgrade legacy README v2 tasks into v3 with Findings, doc_version promotion, preserved extra sections, and targeted migrate-doc/lifecycle tests plus builds and doctor passing.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T11:17:07.896Z, excerpt_hash=sha256:e91deab19801ac61b8332f8be83b5f13c4d1bbfed0e1a3e7a8e42e893249f49b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
