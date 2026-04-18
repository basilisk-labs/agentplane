---
id: "202604172036-V15617"
title: "Decompose release apply command into explicit phases"
result_summary: "Merged via PR #436."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "release"
verify:
  - "bun run lint:core"
  - "bun run test:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T05:30:48.224Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-18T05:41:55.812Z"
  updated_by: "CODER"
  note: "Release apply/release candidate now run through a shared pipeline module; lint:core and test:fast are green, and release apply acceptance tests stayed green after the extraction."
commit:
  hash: "71c8fe7dc318a562a8b08669be747d28f154b369"
  message: "refactor/release: Decompose release apply command into explicit phases (V15617) (#436)"
comments:
  -
    author: "CODER"
    body: "Start: extract shared release-apply pipeline phases so release apply and release candidate stop duplicating init/preflight/execute/finalize orchestration while preserving behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #436 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-18T05:30:58.182Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract shared release-apply pipeline phases so release apply and release candidate stop duplicating init/preflight/execute/finalize orchestration while preserving behavior."
  -
    type: "verify"
    at: "2026-04-18T05:41:55.812Z"
    author: "CODER"
    state: "ok"
    note: "Release apply/release candidate now run through a shared pipeline module; lint:core and test:fast are green, and release apply acceptance tests stayed green after the extraction."
  -
    type: "status"
    at: "2026-04-18T05:49:28.008Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #436 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-18T05:49:28.014Z"
doc_updated_by: "INTEGRATOR"
description: "Split the release apply command into deterministic planning, validation, mutation, and reporting phases so the release workflow stops relying on one oversized orchestration file."
sections:
  Summary: |-
    Decompose release apply command into explicit phases
    
    Split the release apply command into deterministic planning, validation, mutation, and reporting phases so the release workflow stops relying on one oversized orchestration file.
  Scope: |-
    - In scope: Split the release apply command into deterministic planning, validation, mutation, and reporting phases so the release workflow stops relying on one oversized orchestration file.
    - Out of scope: unrelated refactors not required for "Decompose release apply command into explicit phases".
  Plan: |-
    1. Implement the change for "Decompose release apply command into explicit phases".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-18T05:41:55.812Z — VERIFY — ok
    
    By: CODER
    
    Note: Release apply/release candidate now run through a shared pipeline module; lint:core and test:fast are green, and release apply acceptance tests stayed green after the extraction.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T05:30:58.197Z, excerpt_hash=sha256:6a52fa9919b2a85431f853e5d4ee21d781173a416f24000b5a0bdd62ac62bdd1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Decompose release apply command into explicit phases

Split the release apply command into deterministic planning, validation, mutation, and reporting phases so the release workflow stops relying on one oversized orchestration file.

## Scope

- In scope: Split the release apply command into deterministic planning, validation, mutation, and reporting phases so the release workflow stops relying on one oversized orchestration file.
- Out of scope: unrelated refactors not required for "Decompose release apply command into explicit phases".

## Plan

1. Implement the change for "Decompose release apply command into explicit phases".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-18T05:41:55.812Z — VERIFY — ok

By: CODER

Note: Release apply/release candidate now run through a shared pipeline module; lint:core and test:fast are green, and release apply acceptance tests stayed green after the extraction.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T05:30:58.197Z, excerpt_hash=sha256:6a52fa9919b2a85431f853e5d4ee21d781173a416f24000b5a0bdd62ac62bdd1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
