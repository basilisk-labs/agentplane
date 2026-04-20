---
id: "202604191640-FSC2WS"
title: "Trim release apply pipeline orchestrator"
status: "DOING"
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
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T08:33:17.513Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T08:40:34.964Z"
  updated_by: "CODER"
  note: "Verified release apply pipeline extraction: apply.test.ts passed (18 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap completed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move release apply pipeline step logic into focused modules while keeping the pipeline API stable."
events:
  -
    type: "status"
    at: "2026-04-20T08:33:22.325Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move release apply pipeline step logic into focused modules while keeping the pipeline API stable."
  -
    type: "verify"
    at: "2026-04-20T08:40:34.964Z"
    author: "CODER"
    state: "ok"
    note: "Verified release apply pipeline extraction: apply.test.ts passed (18 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap completed."
doc_version: 3
doc_updated_at: "2026-04-20T08:40:34.968Z"
doc_updated_by: "CODER"
description: "Epic C′. Move step logic out of release apply pipeline orchestration so the main file only coordinates explicit phases."
sections:
  Summary: |-
    Trim release apply pipeline orchestrator
    
    Epic C′. Move step logic out of release apply pipeline orchestration so the main file only coordinates explicit phases.
  Scope: |-
    - In scope: Epic C′. Move step logic out of release apply pipeline orchestration so the main file only coordinates explicit phases.
    - Out of scope: unrelated refactors not required for "Trim release apply pipeline orchestrator".
  Plan: "1. Split release apply pipeline helper logic into focused modules under commands/release/apply.pipeline/ for plan input resolution, repo-state matching, command state, push preflight, mutation, and finalize/reporting. 2. Keep apply.pipeline.ts as the compact orchestration facade preserving runReleaseCommandPipeline exports and behavior. 3. Run release apply focused tests plus typecheck, lint:core, prettier check, and framework bootstrap before committing."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T08:40:34.964Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified release apply pipeline extraction: apply.test.ts passed (18 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap completed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T08:33:22.333Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Trim release apply pipeline orchestrator

Epic C′. Move step logic out of release apply pipeline orchestration so the main file only coordinates explicit phases.

## Scope

- In scope: Epic C′. Move step logic out of release apply pipeline orchestration so the main file only coordinates explicit phases.
- Out of scope: unrelated refactors not required for "Trim release apply pipeline orchestrator".

## Plan

1. Split release apply pipeline helper logic into focused modules under commands/release/apply.pipeline/ for plan input resolution, repo-state matching, command state, push preflight, mutation, and finalize/reporting. 2. Keep apply.pipeline.ts as the compact orchestration facade preserving runReleaseCommandPipeline exports and behavior. 3. Run release apply focused tests plus typecheck, lint:core, prettier check, and framework bootstrap before committing.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T08:40:34.964Z — VERIFY — ok

By: CODER

Note: Verified release apply pipeline extraction: apply.test.ts passed (18 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap completed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T08:33:22.333Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
