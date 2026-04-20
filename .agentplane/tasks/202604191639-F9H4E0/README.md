---
id: "202604191639-F9H4E0"
title: "Modularize hosted merge sync workflow"
result_summary: "Split hosted merge sync into typed phase modules for GitHub lookup, PR metadata IO, task/meta builders, local branch-pr scanning, and orchestration facade."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "task"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T07:06:33.487Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T07:11:36.028Z"
  updated_by: "CODER"
  note: "Verified hosted merge sync split: facade now 181 LoC; phase modules are each <=175 LoC; hosted-merge-sync and normalize/migrate focused tests passed; agentplane typecheck, lint:core, prettier, and framework bootstrap passed."
commit:
  hash: "e38eb0cb5d765cb0496bd5a55b2aeee189eaa0aa"
  message: "♻️ F9H4E0 task: modularize hosted merge sync"
comments:
  -
    author: "CODER"
    body: "Start: split hosted merge sync workflow into phase modules while preserving public API."
  -
    author: "CODER"
    body: "Verified: hosted-merge-sync facade is 181 LoC; phase modules are <=175 LoC; hosted merge sync and normalize/migrate tests passed; typecheck, lint:core, prettier, and framework bootstrap passed."
events:
  -
    type: "status"
    at: "2026-04-20T07:06:33.930Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split hosted merge sync workflow into phase modules while preserving public API."
  -
    type: "verify"
    at: "2026-04-20T07:11:36.028Z"
    author: "CODER"
    state: "ok"
    note: "Verified hosted merge sync split: facade now 181 LoC; phase modules are each <=175 LoC; hosted-merge-sync and normalize/migrate focused tests passed; agentplane typecheck, lint:core, prettier, and framework bootstrap passed."
  -
    type: "status"
    at: "2026-04-20T07:11:51.737Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: hosted-merge-sync facade is 181 LoC; phase modules are <=175 LoC; hosted merge sync and normalize/migrate tests passed; typecheck, lint:core, prettier, and framework bootstrap passed."
doc_version: 3
doc_updated_at: "2026-04-20T07:11:51.738Z"
doc_updated_by: "CODER"
description: "Epic C′. Split hosted merge sync into explicit fetch, delta, apply, and event phases."
sections:
  Summary: |-
    Modularize hosted merge sync workflow
    
    Epic C′. Split hosted merge sync into explicit fetch, delta, apply, and event phases.
  Scope: |-
    - In scope: Epic C′. Split hosted merge sync into explicit fetch, delta, apply, and event phases.
    - Out of scope: unrelated refactors not required for "Modularize hosted merge sync workflow".
  Plan: "1. Split hosted-merge-sync.ts by phase without changing exported API: types, Git/GitHub fetch helpers, PR metadata IO, task/meta mutation builders, local branch-pr scan, and orchestration. 2. Keep hosted-merge-sync.ts as the public facade/orchestrator and re-export existing public types/functions. 3. Preserve behavior for hosted PR event target derivation, local merged metadata reconciliation, local shipped branch_pr scans, and gh env sanitization. 4. Run hosted-merge-sync unit tests, normalize/migrate CLI coverage for sync-hosted-merges, typecheck, formatter, framework bootstrap, commit, verify, and finish."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T07:11:36.028Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified hosted merge sync split: facade now 181 LoC; phase modules are each <=175 LoC; hosted-merge-sync and normalize/migrate focused tests passed; agentplane typecheck, lint:core, prettier, and framework bootstrap passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T07:06:33.936Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Modularize hosted merge sync workflow

Epic C′. Split hosted merge sync into explicit fetch, delta, apply, and event phases.

## Scope

- In scope: Epic C′. Split hosted merge sync into explicit fetch, delta, apply, and event phases.
- Out of scope: unrelated refactors not required for "Modularize hosted merge sync workflow".

## Plan

1. Split hosted-merge-sync.ts by phase without changing exported API: types, Git/GitHub fetch helpers, PR metadata IO, task/meta mutation builders, local branch-pr scan, and orchestration. 2. Keep hosted-merge-sync.ts as the public facade/orchestrator and re-export existing public types/functions. 3. Preserve behavior for hosted PR event target derivation, local merged metadata reconciliation, local shipped branch_pr scans, and gh env sanitization. 4. Run hosted-merge-sync unit tests, normalize/migrate CLI coverage for sync-hosted-merges, typecheck, formatter, framework bootstrap, commit, verify, and finish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T07:11:36.028Z — VERIFY — ok

By: CODER

Note: Verified hosted merge sync split: facade now 181 LoC; phase modules are each <=175 LoC; hosted-merge-sync and normalize/migrate focused tests passed; agentplane typecheck, lint:core, prettier, and framework bootstrap passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T07:06:33.936Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
