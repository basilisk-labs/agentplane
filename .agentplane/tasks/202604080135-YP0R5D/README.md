---
id: "202604080135-YP0R5D"
title: "Explain deferred incidents promotion at findings append time"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T01:37:33.439Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-08T04:10:15.216Z"
  updated_by: "CODER"
  note: |-
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: repo-local runtime bootstrapped successfully in the fresh worktree before targeted CLI tests.
    Scope: framework checkout readiness only.
    
    Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/commands/task/findings.unit.test.ts
    Result: pass
    Evidence: 4 tests passed, including new stderr expectations for deferred promotion and local-only task-local output.
    Scope: task findings add CLI contract and finding block helpers.
    
    Command: bun x eslint packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/commands/task/findings.unit.test.ts
    Result: pass
    Evidence: no lint errors on touched files.
    Scope: touched implementation and tests only.
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-08T04:10:15.216Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: repo-local runtime bootstrapped successfully in the fresh worktree before targeted CLI tests.
      Scope: framework checkout readiness only.
      
      Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/commands/task/findings.unit.test.ts
      Result: pass
      Evidence: 4 tests passed, including new stderr expectations for deferred promotion and local-only task-local output.
      Scope: task findings add CLI contract and finding block helpers.
      
      Command: bun x eslint packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/commands/task/findings.unit.test.ts
      Result: pass
      Evidence: no lint errors on touched files.
      Scope: touched implementation and tests only.
doc_version: 3
doc_updated_at: "2026-04-08T04:10:15.219Z"
doc_updated_by: "CODER"
description: "task findings add still appends promotable findings silently, so operators expect incidents.md to update immediately. Add explicit CLI diagnostics and contract coverage for deferred promotion through finish or incidents collect."
sections:
  Summary: |-
    Explain deferred incidents promotion at findings append time
    
    task findings add still appends promotable findings silently, so operators expect incidents.md to update immediately. Add explicit CLI diagnostics and contract coverage for deferred promotion through finish or incidents collect.
  Scope: |-
    - In scope: task findings add still appends promotable findings silently, so operators expect incidents.md to update immediately. Add explicit CLI diagnostics and contract coverage for deferred promotion through finish or incidents collect.
    - Out of scope: unrelated refactors not required for "Explain deferred incidents promotion at findings append time".
  Plan: |-
    1. Inspect current task findings add output and identify the missing deferred-promotion signal.
    2. Add deterministic CLI diagnostics that distinguish task-local append from shared incident registry writes.
    3. Add regression tests for promotable and local-only paths and verify them.
  Verify Steps: |-
    1. Make task findings add explain that incidents.md updates are deferred until finish or incidents collect.
    2. Add CLI contract coverage for promotable and local-only findings output.
    3. Run the targeted findings/incidents test suite.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-08T04:10:15.216Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: repo-local runtime bootstrapped successfully in the fresh worktree before targeted CLI tests.
    Scope: framework checkout readiness only.
    
    Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/commands/task/findings.unit.test.ts
    Result: pass
    Evidence: 4 tests passed, including new stderr expectations for deferred promotion and local-only task-local output.
    Scope: task findings add CLI contract and finding block helpers.
    
    Command: bun x eslint packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/commands/task/findings.unit.test.ts
    Result: pass
    Evidence: no lint errors on touched files.
    Scope: touched implementation and tests only.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T01:37:33.062Z, excerpt_hash=sha256:b15b85b3860c4e8dce77a32243fcf13fd5984b5e9de911bc0541b94edc3f1c8a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Explain deferred incidents promotion at findings append time

task findings add still appends promotable findings silently, so operators expect incidents.md to update immediately. Add explicit CLI diagnostics and contract coverage for deferred promotion through finish or incidents collect.

## Scope

- In scope: task findings add still appends promotable findings silently, so operators expect incidents.md to update immediately. Add explicit CLI diagnostics and contract coverage for deferred promotion through finish or incidents collect.
- Out of scope: unrelated refactors not required for "Explain deferred incidents promotion at findings append time".

## Plan

1. Inspect current task findings add output and identify the missing deferred-promotion signal.
2. Add deterministic CLI diagnostics that distinguish task-local append from shared incident registry writes.
3. Add regression tests for promotable and local-only paths and verify them.

## Verify Steps

1. Make task findings add explain that incidents.md updates are deferred until finish or incidents collect.
2. Add CLI contract coverage for promotable and local-only findings output.
3. Run the targeted findings/incidents test suite.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-08T04:10:15.216Z — VERIFY — ok

By: CODER

Note: Command: bun run framework:dev:bootstrap
Result: pass
Evidence: repo-local runtime bootstrapped successfully in the fresh worktree before targeted CLI tests.
Scope: framework checkout readiness only.

Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/commands/task/findings.unit.test.ts
Result: pass
Evidence: 4 tests passed, including new stderr expectations for deferred promotion and local-only task-local output.
Scope: task findings add CLI contract and finding block helpers.

Command: bun x eslint packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/commands/task/findings.unit.test.ts
Result: pass
Evidence: no lint errors on touched files.
Scope: touched implementation and tests only.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T01:37:33.062Z, excerpt_hash=sha256:b15b85b3860c4e8dce77a32243fcf13fd5984b5e9de911bc0541b94edc3f1c8a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
