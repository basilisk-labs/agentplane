---
id: "202605050638-F7A5MV"
title: "Reduce branch_pr review.md to a compact review index"
result_summary: "Reduced branch_pr review.md to a compact local index while preserving legacy review validation."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T06:39:44.168Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T07:05:01.777Z"
  updated_by: "CODER"
  note: "Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed."
commit:
  hash: "492829396289052136f6aec69ce7053c75ba434a"
  message: "🔀 F7A5MV integrate: Compact branch_pr review index"
comments:
  -
    author: "CODER"
    body: "Start: reducing branch_pr review.md to a compact review index that avoids copying canonical task sections while preserving review-specific evidence and handoff context."
  -
    author: "INTEGRATOR"
    body: "Verified: merged compact review index into main after focused renderer, artifact snapshot, lint, format, routing, and PR artifact checks."
events:
  -
    type: "status"
    at: "2026-05-05T06:47:55.991Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reducing branch_pr review.md to a compact review index that avoids copying canonical task sections while preserving review-specific evidence and handoff context."
  -
    type: "verify"
    at: "2026-05-05T07:05:01.777Z"
    author: "CODER"
    state: "ok"
    note: "Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed."
  -
    type: "status"
    at: "2026-05-05T07:07:14.149Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged compact review index into main after focused renderer, artifact snapshot, lint, format, routing, and PR artifact checks."
doc_version: 3
doc_updated_at: "2026-05-05T07:07:14.150Z"
doc_updated_by: "INTEGRATOR"
description: "Replace the full duplicated branch_pr pr/review.md projection with a compact review index that references the canonical task README and preserves only review-specific facts: branch, related tasks, handoff notes, and raw evidence links or summary."
sections:
  Summary: |-
    Reduce branch_pr review.md to a compact review index
    
    Replace the full duplicated branch_pr pr/review.md projection with a compact review index that references the canonical task README and preserves only review-specific facts: branch, related tasks, handoff notes, and raw evidence links or summary.
  Scope: |-
    - In scope: Replace the full duplicated branch_pr pr/review.md projection with a compact review index that references the canonical task README and preserves only review-specific facts: branch, related tasks, handoff notes, and raw evidence links or summary.
    - Out of scope: unrelated refactors not required for "Reduce branch_pr review.md to a compact review index".
  Plan: |-
    1. Define the minimal review.md contract as an index rather than a full task README copy.
    2. Update branch_pr renderers and validators to preserve required review-specific facts without duplicating Summary, Scope, Verification, Risks, and Rollback content wholesale.
    3. Keep backward compatibility for existing full review.md artifacts.
    4. Add tests proving review.md can be compact and still pass pr check/integrate validation.
    5. Verify focused tests plus artifact-language checks.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T07:05:01.777Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T06:47:55.991Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Reduce branch_pr review.md to a compact review index

Replace the full duplicated branch_pr pr/review.md projection with a compact review index that references the canonical task README and preserves only review-specific facts: branch, related tasks, handoff notes, and raw evidence links or summary.

## Scope

- In scope: Replace the full duplicated branch_pr pr/review.md projection with a compact review index that references the canonical task README and preserves only review-specific facts: branch, related tasks, handoff notes, and raw evidence links or summary.
- Out of scope: unrelated refactors not required for "Reduce branch_pr review.md to a compact review index".

## Plan

1. Define the minimal review.md contract as an index rather than a full task README copy.
2. Update branch_pr renderers and validators to preserve required review-specific facts without duplicating Summary, Scope, Verification, Risks, and Rollback content wholesale.
3. Keep backward compatibility for existing full review.md artifacts.
4. Add tests proving review.md can be compact and still pass pr check/integrate validation.
5. Verify focused tests plus artifact-language checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T07:05:01.777Z — VERIFY — ok

By: CODER

Note: Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T06:47:55.991Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
