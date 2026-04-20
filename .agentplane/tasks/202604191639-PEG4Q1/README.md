---
id: "202604191639-PEG4Q1"
title: "Modularize guard command dispatcher"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 2
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "guard"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T08:00:24.363Z"
  updated_by: "CODER"
  note: "Verified guard dispatcher split: commands.ts is a 4-line facade; clean/suggest/guard-commit are separate subcommand modules; commit diagnostics are separated from commit flow; focused guard tests passed; agentplane typecheck, lint:core, prettier check, and framework bootstrap passed."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-20T08:00:24.363Z"
    author: "CODER"
    state: "ok"
    note: "Verified guard dispatcher split: commands.ts is a 4-line facade; clean/suggest/guard-commit are separate subcommand modules; commit diagnostics are separated from commit flow; focused guard tests passed; agentplane typecheck, lint:core, prettier check, and framework bootstrap passed."
doc_version: 3
doc_updated_at: "2026-04-20T08:00:24.375Z"
doc_updated_by: "CODER"
description: "Epic C′. Split guard command implementations by subcommand and reduce branch density in the entry module."
sections:
  Summary: |-
    Modularize guard command dispatcher
    
    Epic C′. Split guard command implementations by subcommand and reduce branch density in the entry module.
  Scope: |-
    - In scope: Epic C′. Split guard command implementations by subcommand and reduce branch density in the entry module.
    - Out of scope: unrelated refactors not required for "Modularize guard command dispatcher".
  Plan: |-
    1. Implement the change for "Modularize guard command dispatcher".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T08:00:24.363Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified guard dispatcher split: commands.ts is a 4-line facade; clean/suggest/guard-commit are separate subcommand modules; commit diagnostics are separated from commit flow; focused guard tests passed; agentplane typecheck, lint:core, prettier check, and framework bootstrap passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:39:51.711Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Modularize guard command dispatcher

Epic C′. Split guard command implementations by subcommand and reduce branch density in the entry module.

## Scope

- In scope: Epic C′. Split guard command implementations by subcommand and reduce branch density in the entry module.
- Out of scope: unrelated refactors not required for "Modularize guard command dispatcher".

## Plan

1. Implement the change for "Modularize guard command dispatcher".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T08:00:24.363Z — VERIFY — ok

By: CODER

Note: Verified guard dispatcher split: commands.ts is a 4-line facade; clean/suggest/guard-commit are separate subcommand modules; commit diagnostics are separated from commit flow; focused guard tests passed; agentplane typecheck, lint:core, prettier check, and framework bootstrap passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:39:51.711Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
