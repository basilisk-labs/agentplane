---
id: "202604241137-V5SYC4"
title: "v0.3 freeze G3: guard release parity against freeze artifact drift"
result_summary: "G3 complete: release parity now requires FREEZE.v0.3.md for 0.3.x, checks it references the current agentplane version, rejects stale freeze artifacts after leaving 0.3.x, and keeps bootstrap docs compatible with the pruned dist contour."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604241137-PT2V56"
tags:
  - "code"
  - "release"
  - "v0.3"
verify:
  - "bun run release:ci-check"
  - "node scripts/check-release-parity.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T13:57:13.580Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T14:36:18.009Z"
  updated_by: "CODER"
  note: "Verified G3: node scripts/check-release-parity.mjs passes; bun run release:ci-check completed successfully including release-ci-base, workflow coverage, significant coverage, and release-critical suites; focused parity/bootstrap tests pass; typecheck, lint:core, docs:bootstrap:check, git diff --check, and doctor pass."
commit:
  hash: "5eac9cc82a7b47e0e50a3295b79d26ff6f4fd244"
  message: "🧊 V5SYC4 task: guard freeze parity"
comments:
  -
    author: "CODER"
    body: "Start: Extending release parity to guard FREEZE.v0.3.md against 0.3 version drift and stale 0.4 transition state, with focused regression tests and release CI verification."
  -
    author: "CODER"
    body: "Verified: node scripts/check-release-parity.mjs passes; bun run release:ci-check completed successfully including release-ci-base, workflow coverage, significant coverage, and release-critical suites; focused parity/bootstrap tests pass; typecheck, lint:core, docs:bootstrap:check, git diff --check, and doctor pass."
events:
  -
    type: "status"
    at: "2026-04-24T13:57:22.530Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extending release parity to guard FREEZE.v0.3.md against 0.3 version drift and stale 0.4 transition state, with focused regression tests and release CI verification."
  -
    type: "verify"
    at: "2026-04-24T14:36:18.009Z"
    author: "CODER"
    state: "ok"
    note: "Verified G3: node scripts/check-release-parity.mjs passes; bun run release:ci-check completed successfully including release-ci-base, workflow coverage, significant coverage, and release-critical suites; focused parity/bootstrap tests pass; typecheck, lint:core, docs:bootstrap:check, git diff --check, and doctor pass."
  -
    type: "status"
    at: "2026-04-24T14:36:44.244Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: node scripts/check-release-parity.mjs passes; bun run release:ci-check completed successfully including release-ci-base, workflow coverage, significant coverage, and release-critical suites; focused parity/bootstrap tests pass; typecheck, lint:core, docs:bootstrap:check, git diff --check, and doctor pass."
doc_version: 3
doc_updated_at: "2026-04-24T14:36:44.245Z"
doc_updated_by: "CODER"
description: "Update release parity checks so FREEZE.v0.3.md tracks the current 0.3 package version and future 0.4 transition is explicit."
sections:
  Summary: |-
    v0.3 freeze G3: guard release parity against freeze artifact drift
    
    Update release parity checks so FREEZE.v0.3.md tracks the current 0.3 package version and future 0.4 transition is explicit.
  Scope: |-
    - In scope: Update release parity checks so FREEZE.v0.3.md tracks the current 0.3 package version and future 0.4 transition is explicit.
    - Out of scope: unrelated refactors not required for "v0.3 freeze G3: guard release parity against freeze artifact drift".
  Plan: |-
    1. Extend scripts/lib/release-version-parity.mjs so release parity validates FREEZE.v0.3.md against the current agentplane package version: required and version-matching for 0.3.x, rejected as stale outside 0.3.x.
    2. Add regression coverage in check-release-parity script tests for correct freeze, missing/drifted 0.3 freeze, and stale freeze during a 0.4 transition.
    3. Run node scripts/check-release-parity.mjs, bun run release:ci-check, focused parity tests, typecheck/format/diff checks, bootstrap/doctor if runtime state requires it.
  Verify Steps: |-
    1. Run `bun run release:ci-check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node scripts/check-release-parity.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T14:36:18.009Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified G3: node scripts/check-release-parity.mjs passes; bun run release:ci-check completed successfully including release-ci-base, workflow coverage, significant coverage, and release-critical suites; focused parity/bootstrap tests pass; typecheck, lint:core, docs:bootstrap:check, git diff --check, and doctor pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:57:22.565Z, excerpt_hash=sha256:78773bf7e84a229bd29c76b3d78938d7d2190bde95540325c4b82390fbaae175
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze G3: guard release parity against freeze artifact drift

Update release parity checks so FREEZE.v0.3.md tracks the current 0.3 package version and future 0.4 transition is explicit.

## Scope

- In scope: Update release parity checks so FREEZE.v0.3.md tracks the current 0.3 package version and future 0.4 transition is explicit.
- Out of scope: unrelated refactors not required for "v0.3 freeze G3: guard release parity against freeze artifact drift".

## Plan

1. Extend scripts/lib/release-version-parity.mjs so release parity validates FREEZE.v0.3.md against the current agentplane package version: required and version-matching for 0.3.x, rejected as stale outside 0.3.x.
2. Add regression coverage in check-release-parity script tests for correct freeze, missing/drifted 0.3 freeze, and stale freeze during a 0.4 transition.
3. Run node scripts/check-release-parity.mjs, bun run release:ci-check, focused parity tests, typecheck/format/diff checks, bootstrap/doctor if runtime state requires it.

## Verify Steps

1. Run `bun run release:ci-check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node scripts/check-release-parity.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T14:36:18.009Z — VERIFY — ok

By: CODER

Note: Verified G3: node scripts/check-release-parity.mjs passes; bun run release:ci-check completed successfully including release-ci-base, workflow coverage, significant coverage, and release-critical suites; focused parity/bootstrap tests pass; typecheck, lint:core, docs:bootstrap:check, git diff --check, and doctor pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:57:22.565Z, excerpt_hash=sha256:78773bf7e84a229bd29c76b3d78938d7d2190bde95540325c4b82390fbaae175

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
