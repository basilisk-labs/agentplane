---
id: "202604191640-E9P7BS"
title: "Extract process supervision lifecycle modules"
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
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T08:24:05.679Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T08:28:14.635Z"
  updated_by: "CODER"
  note: "Verified process supervision extraction: focused runner supervision/lifecycle Vitest slice passed (11 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap refreshed the repo-local runtime."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract process supervision lifecycle responsibilities into focused modules while preserving runner behavior."
events:
  -
    type: "status"
    at: "2026-04-20T08:24:11.589Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract process supervision lifecycle responsibilities into focused modules while preserving runner behavior."
  -
    type: "verify"
    at: "2026-04-20T08:28:14.635Z"
    author: "CODER"
    state: "ok"
    note: "Verified process supervision extraction: focused runner supervision/lifecycle Vitest slice passed (11 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap refreshed the repo-local runtime."
doc_version: 3
doc_updated_at: "2026-04-20T08:28:14.639Z"
doc_updated_by: "CODER"
description: "Epic C′. Break runner process supervision into focused start, stop, timeout, heartbeat, and recovery modules."
sections:
  Summary: |-
    Extract process supervision lifecycle modules
    
    Epic C′. Break runner process supervision into focused start, stop, timeout, heartbeat, and recovery modules.
  Scope: |-
    - In scope: Epic C′. Break runner process supervision into focused start, stop, timeout, heartbeat, and recovery modules.
    - Out of scope: unrelated refactors not required for "Extract process supervision lifecycle modules".
  Plan: "1. Inspect process-supervision.ts and identify cohesive lifecycle responsibilities: process start, event/heartbeat observation, timeout handling, and cleanup/error normalization. 2. Extract focused modules under runner/process-supervision/ while preserving existing exports and behavior. 3. Keep process-supervision.ts as a compact facade/orchestrator and run focused runner tests plus typecheck, lint:core, prettier check, and framework bootstrap before committing."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T08:28:14.635Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified process supervision extraction: focused runner supervision/lifecycle Vitest slice passed (11 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap refreshed the repo-local runtime.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T08:24:11.597Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Extract process supervision lifecycle modules

Epic C′. Break runner process supervision into focused start, stop, timeout, heartbeat, and recovery modules.

## Scope

- In scope: Epic C′. Break runner process supervision into focused start, stop, timeout, heartbeat, and recovery modules.
- Out of scope: unrelated refactors not required for "Extract process supervision lifecycle modules".

## Plan

1. Inspect process-supervision.ts and identify cohesive lifecycle responsibilities: process start, event/heartbeat observation, timeout handling, and cleanup/error normalization. 2. Extract focused modules under runner/process-supervision/ while preserving existing exports and behavior. 3. Keep process-supervision.ts as a compact facade/orchestrator and run focused runner tests plus typecheck, lint:core, prettier check, and framework bootstrap before committing.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T08:28:14.635Z — VERIFY — ok

By: CODER

Note: Verified process supervision extraction: focused runner supervision/lifecycle Vitest slice passed (11 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap refreshed the repo-local runtime.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T08:24:11.597Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
