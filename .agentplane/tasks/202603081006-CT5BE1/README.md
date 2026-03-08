---
id: "202603081006-CT5BE1"
title: "Add dual-read compatibility for task README v2 and v3"
result_summary: "Dual-read compatibility for task README v2/v3 is now enforced across metadata validation, task export/lint, backend writes, and lifecycle gates."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603081006-5MRPTV"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T10:23:52.540Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved compatibility-first runtime work before flipping templates to README v3."
verification:
  state: "ok"
  updated_at: "2026-03-08T10:38:20.940Z"
  updated_by: "CODER"
  note: "Targeted core/task tests, lint, builds, routing check, and doctor passed; dual-read compatibility and version-preserving write paths are covered."
commit:
  hash: "19cd97e14d22408b48ba4b509a0bff13704b5078"
  message: "🧩 CT5BE1 task: add README v2/v3 dual-read compatibility"
comments:
  -
    author: "CODER"
    body: "Start: add dual-read compatibility for task README v2 and v3 before changing task new/scaffold defaults."
  -
    author: "CODER"
    body: "Verified: dual-read compatibility now accepts doc_version=2 and doc_version=3, preserves task doc versions on lifecycle writes, and treats Notes/Findings as version-aware observation sections."
events:
  -
    type: "status"
    at: "2026-03-08T10:23:58.961Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add dual-read compatibility for task README v2 and v3 before changing task new/scaffold defaults."
  -
    type: "verify"
    at: "2026-03-08T10:38:20.940Z"
    author: "CODER"
    state: "ok"
    note: "Targeted core/task tests, lint, builds, routing check, and doctor passed; dual-read compatibility and version-preserving write paths are covered."
  -
    type: "status"
    at: "2026-03-08T10:38:47.195Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: dual-read compatibility now accepts doc_version=2 and doc_version=3, preserves task doc versions on lifecycle writes, and treats Notes/Findings as version-aware observation sections."
doc_version: 2
doc_updated_at: "2026-03-08T10:38:47.195Z"
doc_updated_by: "CODER"
description: "Teach task readers and lifecycle commands to understand both legacy v2 and new v3 task README formats without breaking old projects."
id_source: "generated"
---
## Summary

Add dual-read compatibility for task README v2 and v3

Teach task readers and lifecycle commands to understand both legacy v2 and new v3 task README formats without breaking old projects.

## Scope

- In scope: Teach task readers and lifecycle commands to understand both legacy v2 and new v3 task README formats without breaking old projects..
- Out of scope: unrelated refactors not required for "Add dual-read compatibility for task README v2 and v3".

## Plan

1. Widen task README metadata and export validation so doc_version=2 and doc_version=3 are both accepted.
2. Make lifecycle readers and gates treat Notes/Findings as version-aware task-local observation sections where needed.
3. Add regression tests proving legacy v2 tasks and v3 tasks both remain operable before template defaults switch.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

1. Run targeted task/lint/schema tests that cover task README metadata and lifecycle gates. Expected: v2 and v3 task records both pass.
2. Exercise lifecycle flows that previously hard-coded Notes. Expected: v3 Findings-based tasks are accepted without regressing v2 behavior.
3. Run agentplane doctor after the code changes. Expected: no new errors or warnings in this repository.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T10:38:20.940Z — VERIFY — ok

By: CODER

Note: Targeted core/task tests, lint, builds, routing check, and doctor passed; dual-read compatibility and version-preserving write paths are covered.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T10:23:58.961Z, excerpt_hash=sha256:b16cfa373391c89fd9a9e18b17a7396dd46cf3515553e0114bccd23aec49509d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
