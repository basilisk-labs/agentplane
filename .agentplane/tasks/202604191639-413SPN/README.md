---
id: "202604191639-413SPN"
title: "Extract Redmine backend API modules"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T08:23:06.640Z"
  updated_by: "CODER"
  note: "Verified Redmine backend module extraction: focused Redmine/backend Vitest slice passed (77 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap refreshed the repo-local runtime."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split Redmine backend sync responsibilities into focused modules while preserving public backend behavior."
events:
  -
    type: "status"
    at: "2026-04-20T08:02:23.717Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split Redmine backend sync responsibilities into focused modules while preserving public backend behavior."
  -
    type: "verify"
    at: "2026-04-20T08:23:06.640Z"
    author: "CODER"
    state: "ok"
    note: "Verified Redmine backend module extraction: focused Redmine/backend Vitest slice passed (77 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap refreshed the repo-local runtime."
doc_version: 3
doc_updated_at: "2026-04-20T08:23:06.644Z"
doc_updated_by: "CODER"
description: "Epic C′. Break Redmine backend code into focused issue, project, user, mapping, and rate-limit modules."
sections:
  Summary: |-
    Extract Redmine backend API modules
    
    Epic C′. Break Redmine backend code into focused issue, project, user, mapping, and rate-limit modules.
  Scope: |-
    - In scope: Epic C′. Break Redmine backend code into focused issue, project, user, mapping, and rate-limit modules.
    - Out of scope: unrelated refactors not required for "Extract Redmine backend API modules".
  Plan: "1. Split Redmine backend sync code by responsibility without changing the public RedmineBackend API: shared context/types, task-id generation/canonical migration, write operations, sync push/pull/conflict, and status inference. 2. Keep a compatibility facade for current imports and update only where this reduces coupling. 3. Run focused Redmine backend tests plus typecheck, lint:core, format check, and framework bootstrap before committing and finishing."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T08:23:06.640Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified Redmine backend module extraction: focused Redmine/backend Vitest slice passed (77 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap refreshed the repo-local runtime.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T08:02:23.729Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Extract Redmine backend API modules

Epic C′. Break Redmine backend code into focused issue, project, user, mapping, and rate-limit modules.

## Scope

- In scope: Epic C′. Break Redmine backend code into focused issue, project, user, mapping, and rate-limit modules.
- Out of scope: unrelated refactors not required for "Extract Redmine backend API modules".

## Plan

1. Split Redmine backend sync code by responsibility without changing the public RedmineBackend API: shared context/types, task-id generation/canonical migration, write operations, sync push/pull/conflict, and status inference. 2. Keep a compatibility facade for current imports and update only where this reduces coupling. 3. Run focused Redmine backend tests plus typecheck, lint:core, format check, and framework bootstrap before committing and finishing.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T08:23:06.640Z — VERIFY — ok

By: CODER

Note: Verified Redmine backend module extraction: focused Redmine/backend Vitest slice passed (77 tests), agentplane typecheck passed, lint:core passed, prettier check passed, and framework:dev:bootstrap refreshed the repo-local runtime.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T08:02:23.729Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
