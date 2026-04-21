---
id: "202604211311-WZCXTF"
title: "Migrate git and process imports to core subpaths"
result_summary: "Migrated git and process symbols from root @agentplaneorg/core to @agentplaneorg/core/git and @agentplaneorg/core/process, including compatibility re-export shims; added Vitest aliases for published core subpaths. Evidence: bun run typecheck, bun run test:project -- cli-unit, bun run arch:check."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604211311-RJTGRK"
tags:
  - "architecture"
  - "build"
  - "code"
verify:
  - "bun run arch:check"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:11:50.597Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T15:56:39.972Z"
  updated_by: "CODER"
  note: "Verified: bun run typecheck passed; bun run test:project -- cli-unit passed (56 files, 624 tests); bun run arch:check passed. Also confirmed no root @agentplaneorg/core imports or exports remain for git/process symbols and added Vitest aliases for core subpaths."
commit:
  hash: "d3a24a0eb959462dabf0e41928f25be2aeacbd85"
  message: "♻️ WZCXTF core: use git and process subpaths"
comments:
  -
    author: "CODER"
    body: "Start: migrate git and process symbols from root @agentplaneorg/core imports to the published core subpath exports using the completed inventory map."
  -
    author: "CODER"
    body: "Verified: git/process imports now resolve through core subpaths and monorepo tests understand those subpaths."
events:
  -
    type: "status"
    at: "2026-04-21T15:49:56.744Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate git and process symbols from root @agentplaneorg/core imports to the published core subpath exports using the completed inventory map."
  -
    type: "verify"
    at: "2026-04-21T15:56:39.972Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck passed; bun run test:project -- cli-unit passed (56 files, 624 tests); bun run arch:check passed. Also confirmed no root @agentplaneorg/core imports or exports remain for git/process symbols and added Vitest aliases for core subpaths."
  -
    type: "status"
    at: "2026-04-21T15:56:47.707Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: git/process imports now resolve through core subpaths and monorepo tests understand those subpaths."
doc_version: 3
doc_updated_at: "2026-04-21T15:56:47.707Z"
doc_updated_by: "CODER"
description: "Switch git and process-related callsites from @agentplaneorg/core root imports to @agentplaneorg/core/git and @agentplaneorg/core/process."
sections:
  Summary: |-
    Migrate git and process imports to core subpaths
    
    Switch git and process-related callsites from @agentplaneorg/core root imports to @agentplaneorg/core/git and @agentplaneorg/core/process.
  Scope: |-
    - In scope: Switch git and process-related callsites from @agentplaneorg/core root imports to @agentplaneorg/core/git and @agentplaneorg/core/process.
    - Out of scope: unrelated refactors not required for "Migrate git and process imports to core subpaths".
  Plan: "Scope: migrate the lowest-risk subpath import families first. Steps: 1. Update git helper imports to @agentplaneorg/core/git. 2. Update runProcess/exec-related imports to @agentplaneorg/core/process. 3. Remove obsolete command-layer git shim imports where the replacement is direct. 4. Keep public root exports intact for external consumers. Acceptance: root core import count decreases materially; typecheck and relevant CLI unit tests pass."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T15:56:39.972Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck passed; bun run test:project -- cli-unit passed (56 files, 624 tests); bun run arch:check passed. Also confirmed no root @agentplaneorg/core imports or exports remain for git/process symbols and added Vitest aliases for core subpaths.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T15:49:56.780Z, excerpt_hash=sha256:2585a485d79b31e74f0133e0f7c22d658e7b7ee6be5aa00878bb539030fdbde3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate git and process imports to core subpaths

Switch git and process-related callsites from @agentplaneorg/core root imports to @agentplaneorg/core/git and @agentplaneorg/core/process.

## Scope

- In scope: Switch git and process-related callsites from @agentplaneorg/core root imports to @agentplaneorg/core/git and @agentplaneorg/core/process.
- Out of scope: unrelated refactors not required for "Migrate git and process imports to core subpaths".

## Plan

Scope: migrate the lowest-risk subpath import families first. Steps: 1. Update git helper imports to @agentplaneorg/core/git. 2. Update runProcess/exec-related imports to @agentplaneorg/core/process. 3. Remove obsolete command-layer git shim imports where the replacement is direct. 4. Keep public root exports intact for external consumers. Acceptance: root core import count decreases materially; typecheck and relevant CLI unit tests pass.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T15:56:39.972Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck passed; bun run test:project -- cli-unit passed (56 files, 624 tests); bun run arch:check passed. Also confirmed no root @agentplaneorg/core imports or exports remain for git/process symbols and added Vitest aliases for core subpaths.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T15:49:56.780Z, excerpt_hash=sha256:2585a485d79b31e74f0133e0f7c22d658e7b7ee6be5aa00878bb539030fdbde3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
