---
id: "202605050638-94VF2Q"
title: "Make github-body.md a minimal hosted PR projection"
result_summary: "Reduced github-body.md to a hosted PR projection and prevented stale upstream base from adding old task noise to PR evidence."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T06:39:47.734Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T07:19:17.702Z"
  updated_by: "CODER"
  note: "Focused review-template tests, artifact snapshot tests, ESLint, Prettier, routing check, and local-base PR evidence regeneration passed."
commit:
  hash: "4f4a0026cd695f311009fe742f084ad7c4094e3f"
  message: "🔀 94VF2Q integrate: Minimize hosted PR body"
comments:
  -
    author: "CODER"
    body: "Start: trimming github-body.md to a minimal hosted PR projection while keeping canonical review and lifecycle detail in task artifacts."
  -
    author: "INTEGRATOR"
    body: "Verified: merged minimal hosted PR body into main after focused renderer, artifact snapshot, lint, format, routing, and local-base PR evidence checks."
events:
  -
    type: "status"
    at: "2026-05-05T06:48:17.457Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: trimming github-body.md to a minimal hosted PR projection while keeping canonical review and lifecycle detail in task artifacts."
  -
    type: "verify"
    at: "2026-05-05T07:09:27.429Z"
    author: "CODER"
    state: "ok"
    note: "Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed."
  -
    type: "verify"
    at: "2026-05-05T07:19:17.702Z"
    author: "CODER"
    state: "ok"
    note: "Focused review-template tests, artifact snapshot tests, ESLint, Prettier, routing check, and local-base PR evidence regeneration passed."
  -
    type: "status"
    at: "2026-05-05T07:19:44.539Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged minimal hosted PR body into main after focused renderer, artifact snapshot, lint, format, routing, and local-base PR evidence checks."
doc_version: 3
doc_updated_at: "2026-05-05T07:19:44.540Z"
doc_updated_by: "INTEGRATOR"
description: "Trim branch_pr pr/github-body.md to the hosted-review payload only: task id, title, summary/scope, verification status, and raw evidence. Avoid copying the full local review document or rollback/risk content that already lives in the task README."
sections:
  Summary: |-
    Make github-body.md a minimal hosted PR projection
    
    Trim branch_pr pr/github-body.md to the hosted-review payload only: task id, title, summary/scope, verification status, and raw evidence. Avoid copying the full local review document or rollback/risk content that already lives in the task README.
  Scope: |-
    - In scope: Trim branch_pr pr/github-body.md to the hosted-review payload only: task id, title, summary/scope, verification status, and raw evidence. Avoid copying the full local review document or rollback/risk content that already lives in the task README.
    - Out of scope: unrelated refactors not required for "Make github-body.md a minimal hosted PR projection".
  Plan: |-
    1. Identify which fields GitHub PR creation and update actually require from github-body.md.
    2. Trim github-body.md rendering to hosted-facing content only: task identity, summary/scope, verification status, handoff notes when present, and raw evidence.
    3. Avoid copying rollback/risk/local review sections that already live in the task README.
    4. Update tests and snapshots for PR title/body validation.
    5. Verify PR open/update/check flows with focused tests.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T07:09:27.429Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T06:48:17.457Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-05-05T07:19:17.702Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused review-template tests, artifact snapshot tests, ESLint, Prettier, routing check, and local-base PR evidence regeneration passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T07:09:27.436Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make github-body.md a minimal hosted PR projection

Trim branch_pr pr/github-body.md to the hosted-review payload only: task id, title, summary/scope, verification status, and raw evidence. Avoid copying the full local review document or rollback/risk content that already lives in the task README.

## Scope

- In scope: Trim branch_pr pr/github-body.md to the hosted-review payload only: task id, title, summary/scope, verification status, and raw evidence. Avoid copying the full local review document or rollback/risk content that already lives in the task README.
- Out of scope: unrelated refactors not required for "Make github-body.md a minimal hosted PR projection".

## Plan

1. Identify which fields GitHub PR creation and update actually require from github-body.md.
2. Trim github-body.md rendering to hosted-facing content only: task identity, summary/scope, verification status, handoff notes when present, and raw evidence.
3. Avoid copying rollback/risk/local review sections that already live in the task README.
4. Update tests and snapshots for PR title/body validation.
5. Verify PR open/update/check flows with focused tests.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T07:09:27.429Z — VERIFY — ok

By: CODER

Note: Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T06:48:17.457Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-05-05T07:19:17.702Z — VERIFY — ok

By: CODER

Note: Focused review-template tests, artifact snapshot tests, ESLint, Prettier, routing check, and local-base PR evidence regeneration passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T07:09:27.436Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
