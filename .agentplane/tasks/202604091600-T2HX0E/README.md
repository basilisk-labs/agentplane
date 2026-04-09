---
id: "202604091600-T2HX0E"
title: "Add near-duplicate guardrails to task new"
result_summary: "Merged via PR #202."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "ux"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T16:01:34.847Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T16:29:25.067Z"
  updated_by: "CODER"
  note: "Verified: targeted vitest, format:check, and docs:cli:check passed after formatting task/new.ts and regenerating CLI docs."
commit:
  hash: "6392f0dde9f88a36ceccc7b8d3d8d655940830e0"
  message: "ux/workflow: Add near-duplicate guardrails to task new (T2HX0E) (#202)"
comments:
  -
    author: "CODER"
    body: "Start: add duplicate-intake guardrails so task new stops silently forking equivalent branch_pr work into parallel task shells."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #202 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-09T16:01:45.022Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add duplicate-intake guardrails so task new stops silently forking equivalent branch_pr work into parallel task shells."
  -
    type: "verify"
    at: "2026-04-09T16:23:56.328Z"
    author: "CODER"
    state: "ok"
    note: "Verified: target vitest and eslint passed; task new now blocks near-duplicate open titles unless --allow-duplicate is explicit."
  -
    type: "verify"
    at: "2026-04-09T16:29:25.067Z"
    author: "CODER"
    state: "ok"
    note: "Verified: targeted vitest, format:check, and docs:cli:check passed after formatting task/new.ts and regenerating CLI docs."
  -
    type: "status"
    at: "2026-04-09T16:49:02.786Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #202 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-09T16:49:02.792Z"
doc_updated_by: "INTEGRATOR"
description: "Warn or block task new when an open task with a highly similar title already exists so branch_pr work does not fork into duplicate task shells and root-checkout drift."
sections:
  Summary: |-
    Add near-duplicate guardrails to task new
    
    Warn or block task new when an open task with a highly similar title already exists so branch_pr work does not fork into duplicate task shells and root-checkout drift.
  Scope: |-
    - In scope: Warn or block task new when an open task with a highly similar title already exists so branch_pr work does not fork into duplicate task shells and root-checkout drift.
    - Out of scope: unrelated refactors not required for "Add near-duplicate guardrails to task new".
  Plan: |-
    1. Implement the change for "Add near-duplicate guardrails to task new".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Reproduce task new with an existing open task whose title is highly similar. Expected: the command warns or blocks deterministically instead of silently creating another task shell.
    2. Run targeted task-new tests. Expected: non-duplicate task creation still works unchanged while similar-title duplicates trigger the new guardrail.
    3. Verify operators can intentionally bypass the guard when necessary. Expected: the override path remains explicit and traceable.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T16:23:56.328Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: target vitest and eslint passed; task new now blocks near-duplicate open titles unless --allow-duplicate is explicit.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:01:45.034Z, excerpt_hash=sha256:ab2df02470dab39f4ce45e60eb7a437ebdbeb51e3f26429779736ff4b46a72fc
    
    ### 2026-04-09T16:29:25.067Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: targeted vitest, format:check, and docs:cli:check passed after formatting task/new.ts and regenerating CLI docs.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:23:56.336Z, excerpt_hash=sha256:ab2df02470dab39f4ce45e60eb7a437ebdbeb51e3f26429779736ff4b46a72fc
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add near-duplicate guardrails to task new

Warn or block task new when an open task with a highly similar title already exists so branch_pr work does not fork into duplicate task shells and root-checkout drift.

## Scope

- In scope: Warn or block task new when an open task with a highly similar title already exists so branch_pr work does not fork into duplicate task shells and root-checkout drift.
- Out of scope: unrelated refactors not required for "Add near-duplicate guardrails to task new".

## Plan

1. Implement the change for "Add near-duplicate guardrails to task new".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Reproduce task new with an existing open task whose title is highly similar. Expected: the command warns or blocks deterministically instead of silently creating another task shell.
2. Run targeted task-new tests. Expected: non-duplicate task creation still works unchanged while similar-title duplicates trigger the new guardrail.
3. Verify operators can intentionally bypass the guard when necessary. Expected: the override path remains explicit and traceable.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T16:23:56.328Z — VERIFY — ok

By: CODER

Note: Verified: target vitest and eslint passed; task new now blocks near-duplicate open titles unless --allow-duplicate is explicit.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:01:45.034Z, excerpt_hash=sha256:ab2df02470dab39f4ce45e60eb7a437ebdbeb51e3f26429779736ff4b46a72fc

### 2026-04-09T16:29:25.067Z — VERIFY — ok

By: CODER

Note: Verified: targeted vitest, format:check, and docs:cli:check passed after formatting task/new.ts and regenerating CLI docs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T16:23:56.336Z, excerpt_hash=sha256:ab2df02470dab39f4ce45e60eb7a437ebdbeb51e3f26429779736ff4b46a72fc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
