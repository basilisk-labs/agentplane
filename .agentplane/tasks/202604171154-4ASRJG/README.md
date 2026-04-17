---
id: "202604171154-4ASRJG"
title: "Activate init-selected recipes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T12:04:45.907Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T12:08:17.113Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 3 test files, 83 tests passed; init-selected recipe now lands in registry as active=true and is visible through recipes active plus recipes explain-active.
    Scope: init recipe selection flow, recipe add activation path, and focused CLI acceptance around active overlay state.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: auto-activate recipes selected during init while keeping plain recipes add behavior explicit."
events:
  -
    type: "status"
    at: "2026-04-17T12:05:04.943Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: auto-activate recipes selected during init while keeping plain recipes add behavior explicit."
  -
    type: "verify"
    at: "2026-04-17T12:08:17.113Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: 3 test files, 83 tests passed; init-selected recipe now lands in registry as active=true and is visible through recipes active plus recipes explain-active.
      Scope: init recipe selection flow, recipe add activation path, and focused CLI acceptance around active overlay state.
doc_version: 3
doc_updated_at: "2026-04-17T12:08:17.117Z"
doc_updated_by: "CODER"
description: "Make init activate recipes selected from the cache-backed picker so init produces active overlays instead of inert vendored packages."
sections:
  Summary: |-
    Activate init-selected recipes
    
    Make init activate recipes selected from the cache-backed picker so init produces active overlays instead of inert vendored packages.
  Scope: |-
    - In scope: Make init activate recipes selected from the cache-backed picker so init produces active overlays instead of inert vendored packages.
    - Out of scope: unrelated refactors not required for "Activate init-selected recipes".
  Plan: |-
    1. Implement the change for "Activate init-selected recipes".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T12:08:17.113Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000\nResult: pass\nEvidence: 3 test files, 83 tests passed; init-selected recipe now lands in registry as active=true and is visible through recipes active plus recipes explain-active.\nScope: init recipe selection flow, recipe add activation path, and focused CLI acceptance around active overlay state.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:05:04.950Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Activate init-selected recipes

Make init activate recipes selected from the cache-backed picker so init produces active overlays instead of inert vendored packages.

## Scope

- In scope: Make init activate recipes selected from the cache-backed picker so init produces active overlays instead of inert vendored packages.
- Out of scope: unrelated refactors not required for "Activate init-selected recipes".

## Plan

1. Implement the change for "Activate init-selected recipes".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T12:08:17.113Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --update --hookTimeout 60000 --testTimeout 60000\nResult: pass\nEvidence: 3 test files, 83 tests passed; init-selected recipe now lands in registry as active=true and is visible through recipes active plus recipes explain-active.\nScope: init recipe selection flow, recipe add activation path, and focused CLI acceptance around active overlay state.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:05:04.950Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
