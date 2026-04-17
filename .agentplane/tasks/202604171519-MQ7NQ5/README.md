---
id: "202604171519-MQ7NQ5"
title: "Drop redundant platform-critical init-upgrade alias"
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
  - "tooling"
verify:
  - "bun run test:platform-critical:init-upgrade"
  - "node -e \"const scripts=require('./package.json').scripts; if ('test:platform-critical:init-upgrade-backend' in scripts) { throw new Error('duplicate alias still present'); }\""
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T15:19:33.831Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the low-risk duplicate alias cleanup tranche."
verification:
  state: "ok"
  updated_at: "2026-04-17T15:20:29.016Z"
  updated_by: "CODER"
  note: "Verified: rg -n 'test:platform-critical:init-upgrade-backend' -S . returned no matches, the package.json presence check passed, and bun run test:platform-critical:init-upgrade passed with 49 tests after removing the redundant alias from package scripts."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove the duplicate platform-critical init-upgrade alias, confirm there are no direct references left, and keep the canonical script entrypoint unchanged otherwise."
events:
  -
    type: "status"
    at: "2026-04-17T15:19:51.923Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the duplicate platform-critical init-upgrade alias, confirm there are no direct references left, and keep the canonical script entrypoint unchanged otherwise."
  -
    type: "verify"
    at: "2026-04-17T15:20:29.016Z"
    author: "CODER"
    state: "ok"
    note: "Verified: rg -n 'test:platform-critical:init-upgrade-backend' -S . returned no matches, the package.json presence check passed, and bun run test:platform-critical:init-upgrade passed with 49 tests after removing the redundant alias from package scripts."
doc_version: 3
doc_updated_at: "2026-04-17T15:20:29.019Z"
doc_updated_by: "CODER"
description: "Remove the duplicate test:platform-critical:init-upgrade-backend script entry and keep test:platform-critical:init-upgrade as the single canonical platform-critical entrypoint."
sections:
  Summary: |-
    Drop redundant platform-critical init-upgrade alias
    
    Remove the duplicate test:platform-critical:init-upgrade-backend script entry and keep test:platform-critical:init-upgrade as the single canonical platform-critical entrypoint.
  Scope: |-
    - In scope: Remove the duplicate test:platform-critical:init-upgrade-backend script entry and keep test:platform-critical:init-upgrade as the single canonical platform-critical entrypoint.
    - Out of scope: unrelated refactors not required for "Drop redundant platform-critical init-upgrade alias".
  Plan: |-
    1. Remove test:platform-critical:init-upgrade-backend from package scripts and keep test:platform-critical:init-upgrade as the only canonical entrypoint.
    2. Check the repository for direct references to the removed alias and update them only if any remain.
    3. Re-run the canonical init-upgrade suite and confirm the alias is gone.
  Verify Steps: |-
    1. Run `node -e "const scripts=require('./package.json').scripts; if ('test:platform-critical:init-upgrade-backend' in scripts) { throw new Error('duplicate alias still present'); }"`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:platform-critical:init-upgrade`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T15:20:29.016Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: rg -n 'test:platform-critical:init-upgrade-backend' -S . returned no matches, the package.json presence check passed, and bun run test:platform-critical:init-upgrade passed with 49 tests after removing the redundant alias from package scripts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T15:19:51.930Z, excerpt_hash=sha256:14ea94700372510ec6b6b325fe5f77728d33771f60aa9133c96a9f9bc860cb31
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Drop redundant platform-critical init-upgrade alias

Remove the duplicate test:platform-critical:init-upgrade-backend script entry and keep test:platform-critical:init-upgrade as the single canonical platform-critical entrypoint.

## Scope

- In scope: Remove the duplicate test:platform-critical:init-upgrade-backend script entry and keep test:platform-critical:init-upgrade as the single canonical platform-critical entrypoint.
- Out of scope: unrelated refactors not required for "Drop redundant platform-critical init-upgrade alias".

## Plan

1. Remove test:platform-critical:init-upgrade-backend from package scripts and keep test:platform-critical:init-upgrade as the only canonical entrypoint.
2. Check the repository for direct references to the removed alias and update them only if any remain.
3. Re-run the canonical init-upgrade suite and confirm the alias is gone.

## Verify Steps

1. Run `node -e "const scripts=require('./package.json').scripts; if ('test:platform-critical:init-upgrade-backend' in scripts) { throw new Error('duplicate alias still present'); }"`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:platform-critical:init-upgrade`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T15:20:29.016Z — VERIFY — ok

By: CODER

Note: Verified: rg -n 'test:platform-critical:init-upgrade-backend' -S . returned no matches, the package.json presence check passed, and bun run test:platform-critical:init-upgrade passed with 49 tests after removing the redundant alias from package scripts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T15:19:51.930Z, excerpt_hash=sha256:14ea94700372510ec6b6b325fe5f77728d33771f60aa9133c96a9f9bc860cb31

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
