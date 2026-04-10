---
id: "202604100138-87X9YD"
title: "Use finish-style incident no-op guidance in branch_pr closeout flows"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T01:50:04.440Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-10T01:57:40.502Z"
  updated_by: "CODER"
  note: "Focused regression checks passed: targeted vitest for integrate and hosted-close incident no-op messaging plus eslint on the touched command/test files."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inspect integrate and hosted-close incident output, switch their no-op rendering to the finish-style guidance path, and cover the behavior with focused regression tests."
events:
  -
    type: "status"
    at: "2026-04-10T01:50:27.883Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect integrate and hosted-close incident output, switch their no-op rendering to the finish-style guidance path, and cover the behavior with focused regression tests."
  -
    type: "verify"
    at: "2026-04-10T01:57:40.502Z"
    author: "CODER"
    state: "ok"
    note: "Focused regression checks passed: targeted vitest for integrate and hosted-close incident no-op messaging plus eslint on the touched command/test files."
doc_version: 3
doc_updated_at: "2026-04-10T01:57:40.504Z"
doc_updated_by: "CODER"
description: "branch_pr integrate and hosted-close currently render generic incident collection messages, which obscures why incidents.md stays unchanged when only plain verify/finish text exists. Reuse finish-context messaging so operators get explicit next steps during base-side closeout."
sections:
  Summary: |-
    Use finish-style incident no-op guidance in branch_pr closeout flows
    
    branch_pr integrate and hosted-close currently render generic incident collection messages, which obscures why incidents.md stays unchanged when only plain verify/finish text exists. Reuse finish-context messaging so operators get explicit next steps during base-side closeout.
  Scope: |-
    - In scope: branch_pr integrate and hosted-close currently render generic incident collection messages, which obscures why incidents.md stays unchanged when only plain verify/finish text exists. Reuse finish-context messaging so operators get explicit next steps during base-side closeout.
    - Out of scope: unrelated refactors not required for "Use finish-style incident no-op guidance in branch_pr closeout flows".
  Plan: "1. Inspect branch_pr closeout paths that collect incidents on the base branch and confirm where they still use generic no-op messaging. 2. Reuse the finish-context incident explanation in integrate and hosted-close so plain verify/finish text clearly explains why incidents.md stayed unchanged. 3. Add focused regression coverage for the updated closeout messaging and run the touched tests plus eslint."
  Verify Steps: |-
    1. Run the focused integrate/hosted-close regression coverage for plain incident no-op cases. Expected: both base-side closeout paths emit explicit incidents.md guidance instead of the generic no-op text.
    2. Run the touched lint/test slice for the closeout command files. Expected: the context reuse stays green with no new lint failures.
    3. Inspect operator-facing output for branch_pr closeout when no structured incident finding exists. Expected: it explains that plain verify/finish text stayed task-local and points at the structured next step.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T01:57:40.502Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused regression checks passed: targeted vitest for integrate and hosted-close incident no-op messaging plus eslint on the touched command/test files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T01:50:27.888Z, excerpt_hash=sha256:54cefba9ccaffed3371327e92bf2b92b05ec36147f4869e2cdd9c9fb9663fb45
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Use finish-style incident no-op guidance in branch_pr closeout flows

branch_pr integrate and hosted-close currently render generic incident collection messages, which obscures why incidents.md stays unchanged when only plain verify/finish text exists. Reuse finish-context messaging so operators get explicit next steps during base-side closeout.

## Scope

- In scope: branch_pr integrate and hosted-close currently render generic incident collection messages, which obscures why incidents.md stays unchanged when only plain verify/finish text exists. Reuse finish-context messaging so operators get explicit next steps during base-side closeout.
- Out of scope: unrelated refactors not required for "Use finish-style incident no-op guidance in branch_pr closeout flows".

## Plan

1. Inspect branch_pr closeout paths that collect incidents on the base branch and confirm where they still use generic no-op messaging. 2. Reuse the finish-context incident explanation in integrate and hosted-close so plain verify/finish text clearly explains why incidents.md stayed unchanged. 3. Add focused regression coverage for the updated closeout messaging and run the touched tests plus eslint.

## Verify Steps

1. Run the focused integrate/hosted-close regression coverage for plain incident no-op cases. Expected: both base-side closeout paths emit explicit incidents.md guidance instead of the generic no-op text.
2. Run the touched lint/test slice for the closeout command files. Expected: the context reuse stays green with no new lint failures.
3. Inspect operator-facing output for branch_pr closeout when no structured incident finding exists. Expected: it explains that plain verify/finish text stayed task-local and points at the structured next step.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T01:57:40.502Z — VERIFY — ok

By: CODER

Note: Focused regression checks passed: targeted vitest for integrate and hosted-close incident no-op messaging plus eslint on the touched command/test files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T01:50:27.888Z, excerpt_hash=sha256:54cefba9ccaffed3371327e92bf2b92b05ec36147f4869e2cdd9c9fb9663fb45

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
