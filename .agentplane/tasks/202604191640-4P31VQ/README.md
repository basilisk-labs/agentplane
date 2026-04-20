---
id: "202604191640-4P31VQ"
title: "Move lazy command loading next to command specs"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T06:58:20.472Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T07:00:38.379Z"
  updated_by: "CODER"
  note: "Verified loader co-location step: command-catalog files contain no dynamic import() calls; command-catalog/help contract tests passed; agentplane typecheck, prettier check, and framework bootstrap passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: co-locate lazy command loading metadata with command/domain modules and simplify aggregate catalog files."
events:
  -
    type: "status"
    at: "2026-04-20T06:58:21.016Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: co-locate lazy command loading metadata with command/domain modules and simplify aggregate catalog files."
  -
    type: "verify"
    at: "2026-04-20T07:00:38.379Z"
    author: "CODER"
    state: "ok"
    note: "Verified loader co-location step: command-catalog files contain no dynamic import() calls; command-catalog/help contract tests passed; agentplane typecheck, prettier check, and framework bootstrap passed."
doc_version: 3
doc_updated_at: "2026-04-20T07:00:38.381Z"
doc_updated_by: "CODER"
description: "Epic D′. Co-locate lazy command loading metadata with command specs and simplify catalog modules."
sections:
  Summary: |-
    Move lazy command loading next to command specs
    
    Epic D′. Co-locate lazy command loading metadata with command specs and simplify catalog modules.
  Scope: |-
    - In scope: Epic D′. Co-locate lazy command loading metadata with command specs and simplify catalog modules.
    - Out of scope: unrelated refactors not required for "Move lazy command loading next to command specs".
  Plan: "1. Inspect command catalog entry shapes after declareCommand migration and identify where dynamic import paths remain. 2. Move command loader declarations out of aggregate catalog modules into domain-adjacent catalog helpers next to the command specs/runners, keeping aggregate modules as composition only. 3. Preserve command ids, dispatch needs, and canonical invocation metadata without changing runtime behavior. 4. Run command-catalog/help contract tests, typecheck, formatter, rebuild framework runtime, commit, verify, and finish."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T07:00:38.379Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified loader co-location step: command-catalog files contain no dynamic import() calls; command-catalog/help contract tests passed; agentplane typecheck, prettier check, and framework bootstrap passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T06:58:21.022Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Move lazy command loading next to command specs

Epic D′. Co-locate lazy command loading metadata with command specs and simplify catalog modules.

## Scope

- In scope: Epic D′. Co-locate lazy command loading metadata with command specs and simplify catalog modules.
- Out of scope: unrelated refactors not required for "Move lazy command loading next to command specs".

## Plan

1. Inspect command catalog entry shapes after declareCommand migration and identify where dynamic import paths remain. 2. Move command loader declarations out of aggregate catalog modules into domain-adjacent catalog helpers next to the command specs/runners, keeping aggregate modules as composition only. 3. Preserve command ids, dispatch needs, and canonical invocation metadata without changing runtime behavior. 4. Run command-catalog/help contract tests, typecheck, formatter, rebuild framework runtime, commit, verify, and finish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T07:00:38.379Z — VERIFY — ok

By: CODER

Note: Verified loader co-location step: command-catalog files contain no dynamic import() calls; command-catalog/help contract tests passed; agentplane typecheck, prettier check, and framework bootstrap passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T06:58:21.022Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
