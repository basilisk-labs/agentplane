---
id: "202604191200-WGK57W"
title: "Record hosted publish evidence in release task closure"
result_summary: "Merged via PR #483."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T13:24:10.412Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T13:40:09.063Z"
  updated_by: "CODER"
  note: "Added hosted release-evidence follow-up via publish workflow: successful publish-result now resolves the release task, writes canonical Verification evidence into the task README on a task-close branch, and opens/auto-merges a follow-up PR; validated by release-task-evidence script tests, publish workflow contract, eslint, prettier, and workflow lint."
commit:
  hash: "c26b7c23afb447d4d2d76c7e158fffb459967652"
  message: "release: Record hosted publish evidence in release task closure (WGK57W) (#483)"
comments:
  -
    author: "CODER"
    body: "Start: record hosted publish evidence in release task closure so release tasks close with published version, release URL, and install-smoke facts instead of only canonical DONE state."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #483 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-19T13:24:13.623Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: record hosted publish evidence in release task closure so release tasks close with published version, release URL, and install-smoke facts instead of only canonical DONE state."
  -
    type: "verify"
    at: "2026-04-19T13:40:09.063Z"
    author: "CODER"
    state: "ok"
    note: "Added hosted release-evidence follow-up via publish workflow: successful publish-result now resolves the release task, writes canonical Verification evidence into the task README on a task-close branch, and opens/auto-merges a follow-up PR; validated by release-task-evidence script tests, publish workflow contract, eslint, prettier, and workflow lint."
  -
    type: "status"
    at: "2026-04-19T14:08:22.246Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #483 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-19T14:08:22.252Z"
doc_updated_by: "INTEGRATOR"
description: "Extend hosted close handling for release-tagged tasks so DONE task artifacts record published package versions, release URL, and install-smoke evidence instead of only a generic merged-on-main note."
sections:
  Summary: |-
    Record hosted publish evidence in release task closure
    
    Extend hosted close handling for release-tagged tasks so DONE task artifacts record published package versions, release URL, and install-smoke evidence instead of only a generic merged-on-main note.
  Scope: |-
    - In scope: Extend hosted close handling for release-tagged tasks so DONE task artifacts record published package versions, release URL, and install-smoke evidence instead of only a generic merged-on-main note.
    - Out of scope: unrelated refactors not required for "Record hosted publish evidence in release task closure".
  Plan: |-
    1. Implement the change for "Record hosted publish evidence in release task closure".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Record hosted publish evidence in release task closure". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T13:40:09.063Z — VERIFY — ok
    
    By: CODER
    
    Note: Added hosted release-evidence follow-up via publish workflow: successful publish-result now resolves the release task, writes canonical Verification evidence into the task README on a task-close branch, and opens/auto-merges a follow-up PR; validated by release-task-evidence script tests, publish workflow contract, eslint, prettier, and workflow lint.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T13:24:13.661Z, excerpt_hash=sha256:376e899f4e8e37657333f7fe09462247d48031669befa648f234018ddb2dcd2c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Record hosted publish evidence in release task closure

Extend hosted close handling for release-tagged tasks so DONE task artifacts record published package versions, release URL, and install-smoke evidence instead of only a generic merged-on-main note.

## Scope

- In scope: Extend hosted close handling for release-tagged tasks so DONE task artifacts record published package versions, release URL, and install-smoke evidence instead of only a generic merged-on-main note.
- Out of scope: unrelated refactors not required for "Record hosted publish evidence in release task closure".

## Plan

1. Implement the change for "Record hosted publish evidence in release task closure".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Record hosted publish evidence in release task closure". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T13:40:09.063Z — VERIFY — ok

By: CODER

Note: Added hosted release-evidence follow-up via publish workflow: successful publish-result now resolves the release task, writes canonical Verification evidence into the task README on a task-close branch, and opens/auto-merges a follow-up PR; validated by release-task-evidence script tests, publish workflow contract, eslint, prettier, and workflow lint.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T13:24:13.661Z, excerpt_hash=sha256:376e899f4e8e37657333f7fe09462247d48031669befa648f234018ddb2dcd2c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
