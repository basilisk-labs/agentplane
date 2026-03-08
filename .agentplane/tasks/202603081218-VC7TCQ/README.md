---
id: "202603081218-VC7TCQ"
title: "Document optimized pre-push quality contours"
result_summary: "Updated testing-and-quality guidance so the pre-push section distinguishes docs-only, task, doctor, hooks, release, upgrade, and guard contours from the intentionally broader full-fast fallback."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603081218-FS24HK"
  - "202603081218-6B393Q"
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T12:36:23.307Z"
  updated_by: "DOCS"
  note: "Updated developer docs to list docs-only, task, doctor, hooks, release, upgrade, and guard fast contours, and documented that generic CLI, mixed, and infra-sensitive changes still fall back to full-fast. docs:site:check and policy routing passed."
commit:
  hash: "b65b887121177a9642952abbdbc3ab4f3fe89b76"
  message: "📝 VC7TCQ docs: explain path-aware pre-push contours"
comments:
  -
    author: "DOCS"
    body: "Start: update the developer docs so the fast pre-push contour explicitly names the supported targeted buckets and the conditions that still trigger the broad full-fast fallback."
  -
    author: "DOCS"
    body: "Verified: developer docs now describe the actual path-aware pre-push contours, including the supported targeted buckets and the remaining broad full-fast fallback for generic CLI and mixed infra changes."
events:
  -
    type: "status"
    at: "2026-03-08T12:35:13.420Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update the developer docs so the fast pre-push contour explicitly names the supported targeted buckets and the conditions that still trigger the broad full-fast fallback."
  -
    type: "verify"
    at: "2026-03-08T12:36:23.307Z"
    author: "DOCS"
    state: "ok"
    note: "Updated developer docs to list docs-only, task, doctor, hooks, release, upgrade, and guard fast contours, and documented that generic CLI, mixed, and infra-sensitive changes still fall back to full-fast. docs:site:check and policy routing passed."
  -
    type: "status"
    at: "2026-03-08T12:36:45.422Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: developer docs now describe the actual path-aware pre-push contours, including the supported targeted buckets and the remaining broad full-fast fallback for generic CLI and mixed infra changes."
doc_version: 3
doc_updated_at: "2026-03-08T12:36:45.422Z"
doc_updated_by: "DOCS"
description: "Update developer guidance so fast, standard, full, and release pre-push contours are explained consistently after the broad-path optimization lands."
id_source: "generated"
---
## Summary

Document optimized pre-push quality contours

Update developer guidance so fast, standard, full, and release pre-push contours are explained consistently after the broad-path optimization lands.

## Scope

- In scope: Update developer guidance so fast, standard, full, and release pre-push contours are explained consistently after the broad-path optimization lands..
- Out of scope: unrelated refactors not required for "Document optimized pre-push quality contours".

## Plan

1. Implement the change for "Document optimized pre-push quality contours".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Open the updated local quality-gate documentation. Expected: it clearly distinguishes docs-only, targeted buckets, and the broad full-fast fallback.
2. Run the relevant docs and routing checks for the changed files. Expected: all checks pass without introducing policy or docs drift.
3. Compare the documented buckets with the current selector implementation. Expected: the docs match the implemented fast CI behavior and do not claim unsupported generic CLI narrowing.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T12:36:23.307Z — VERIFY — ok

By: DOCS

Note: Updated developer docs to list docs-only, task, doctor, hooks, release, upgrade, and guard fast contours, and documented that generic CLI, mixed, and infra-sensitive changes still fall back to full-fast. docs:site:check and policy routing passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T12:36:22.846Z, excerpt_hash=sha256:2c9070a2910aa0e3a7fab20caa00b370bf1666d9e6e4bc2aaa388e2ac91410fa

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the fast pre-push selector is now materially more granular, but generic CLI and mixed infra paths still intentionally fall back to the broad fast contour.
  Impact: the docs must describe the supported buckets precisely and avoid implying that all CLI paths are narrow.
  Resolution: documented the exact docs-only and targeted buckets and called out the remaining full-fast fallback boundary explicitly.
  Promotion: none
