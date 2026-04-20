---
id: "202604191617-EXZQDW"
title: "Collapse agentplane testing helpers into testkit reexports"
result_summary: "The agentplane testing compatibility layer is now thin and build-safe: packages/agentplane/src/testing delegates to packages/testkit/dist entrypoints, and test-only helper implementations no longer live in agentplane/src."
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
  - "testkit"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T16:22:34.662Z"
  updated_by: "CODER"
  note: "Testing compatibility layer migration checks passed."
commit:
  hash: "3a44cd72f9a59c0f7218475d1d89418da5bcd8ff"
  message: "🧪 testkit: collapse testing compat layer"
comments:
  -
    author: "CODER"
    body: "Start: collapse packages/agentplane/src/testing into compatibility reexports over @agentplane/testkit while keeping existing import paths stable, then verify the affected compatibility consumers and runtime snapshot in direct mode."
  -
    author: "CODER"
    body: "Verified: collapsed packages/agentplane/src/testing into compatibility reexports, kept existing import paths stable, reran focused compatibility-consumer tests, confirmed non-test agentplane sources no longer import vitest, rebuilt testkit and agentplane successfully, and refreshed the repo-local runtime snapshot after the watched-source updates."
events:
  -
    type: "status"
    at: "2026-04-19T16:17:58.393Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: collapse packages/agentplane/src/testing into compatibility reexports over @agentplane/testkit while keeping existing import paths stable, then verify the affected compatibility consumers and runtime snapshot in direct mode."
  -
    type: "verify"
    at: "2026-04-19T16:22:34.662Z"
    author: "CODER"
    state: "ok"
    note: "Testing compatibility layer migration checks passed."
  -
    type: "status"
    at: "2026-04-19T16:23:31.381Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: collapsed packages/agentplane/src/testing into compatibility reexports, kept existing import paths stable, reran focused compatibility-consumer tests, confirmed non-test agentplane sources no longer import vitest, rebuilt testkit and agentplane successfully, and refreshed the repo-local runtime snapshot after the watched-source updates."
doc_version: 3
doc_updated_at: "2026-04-19T16:23:31.383Z"
doc_updated_by: "CODER"
description: "Continue epic E′ by turning packages/agentplane/src/testing into a compatibility layer over packages/testkit/src so agentplane/src no longer owns test-only helper implementations."
sections:
  Summary: |-
    Collapse agentplane testing helpers into testkit reexports
    
    Continue epic E′ by turning packages/agentplane/src/testing into a compatibility layer over packages/testkit/src so agentplane/src no longer owns test-only helper implementations.
  Scope: |-
    - In scope: Continue epic E′ by turning packages/agentplane/src/testing into a compatibility layer over packages/testkit/src so agentplane/src no longer owns test-only helper implementations.
    - Out of scope: unrelated refactors not required for "Collapse agentplane testing helpers into testkit reexports".
  Plan: "1. Replace packages/agentplane/src/testing helper implementations with thin reexports to packages/testkit/src equivalents. 2. Keep compatibility entrypoints intact so existing agentplane test imports continue to resolve. 3. Run focused tests that import the testing compatibility layer plus @agentplane/testkit typecheck. 4. Refresh the repo-local runtime snapshot if watched-source changes require it. 5. Record verification and finish with task-scoped commit evidence."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T16:22:34.662Z — VERIFY — ok
    
    By: CODER
    
    Note: Testing compatibility layer migration checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:17:59.352Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: rg -n "from \"vitest\"|from 'vitest'" packages/agentplane/src --glob '!**/*.test.ts'
    Result: pass
    Evidence: no matches returned.
    Scope: non-test sources under packages/agentplane/src.
    
    Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/shared/runtime-source.test.ts
    Result: pass
    Evidence: 6 files and 18 tests passed.
    Scope: testing compatibility consumers and runtime-env compatibility paths.
    
    Command: bun run --filter=@agentplane/testkit typecheck
    Result: pass
    Evidence: exited with code 0.
    Scope: @agentplane/testkit type surface.
    
    Command: bun run --filter=@agentplane/testkit build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0 after switching compatibility reexports to testkit dist entrypoints.
    Scope: package build contract for the compatibility layer.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: rebuilt core and agentplane, runtime verify reported active 0.3.15 matches repository expectation.
    Scope: repo-local runtime snapshot after watched-source updates in packages/agentplane/src/testing.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Collapse agentplane testing helpers into testkit reexports

Continue epic E′ by turning packages/agentplane/src/testing into a compatibility layer over packages/testkit/src so agentplane/src no longer owns test-only helper implementations.

## Scope

- In scope: Continue epic E′ by turning packages/agentplane/src/testing into a compatibility layer over packages/testkit/src so agentplane/src no longer owns test-only helper implementations.
- Out of scope: unrelated refactors not required for "Collapse agentplane testing helpers into testkit reexports".

## Plan

1. Replace packages/agentplane/src/testing helper implementations with thin reexports to packages/testkit/src equivalents. 2. Keep compatibility entrypoints intact so existing agentplane test imports continue to resolve. 3. Run focused tests that import the testing compatibility layer plus @agentplane/testkit typecheck. 4. Refresh the repo-local runtime snapshot if watched-source changes require it. 5. Record verification and finish with task-scoped commit evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T16:22:34.662Z — VERIFY — ok

By: CODER

Note: Testing compatibility layer migration checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:17:59.352Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: rg -n "from \"vitest\"|from 'vitest'" packages/agentplane/src --glob '!**/*.test.ts'
Result: pass
Evidence: no matches returned.
Scope: non-test sources under packages/agentplane/src.

Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/shared/runtime-source.test.ts
Result: pass
Evidence: 6 files and 18 tests passed.
Scope: testing compatibility consumers and runtime-env compatibility paths.

Command: bun run --filter=@agentplane/testkit typecheck
Result: pass
Evidence: exited with code 0.
Scope: @agentplane/testkit type surface.

Command: bun run --filter=@agentplane/testkit build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited with code 0 after switching compatibility reexports to testkit dist entrypoints.
Scope: package build contract for the compatibility layer.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: rebuilt core and agentplane, runtime verify reported active 0.3.15 matches repository expectation.
Scope: repo-local runtime snapshot after watched-source updates in packages/agentplane/src/testing.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
