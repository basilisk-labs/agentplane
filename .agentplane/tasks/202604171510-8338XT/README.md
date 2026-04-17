---
id: "202604171510-8338XT"
title: "Expose CLI harness via @agentplane/testkit facade"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "tests"
verify:
  - "bun run test:testkit"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T15:11:29.578Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the visible replacement for the testkit facade tranche after task-record drift on the earlier ID."
verification:
  state: "ok"
  updated_at: "2026-04-17T15:17:55.489Z"
  updated_by: "CODER"
  note: "Verified: bun run test:testkit, bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000, and bun run typecheck all pass after moving the CLI test helper implementation into packages/agentplane/src/testing, exposing @agentplane/testkit/cli, and rewriting direct test imports to the new facade."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: move the CLI test-helper implementation out of the old cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep only the minimum compatibility shim needed for remaining in-package helpers."
events:
  -
    type: "status"
    at: "2026-04-17T15:13:35.565Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move the CLI test-helper implementation out of the old cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep only the minimum compatibility shim needed for remaining in-package helpers."
  -
    type: "verify"
    at: "2026-04-17T15:17:55.489Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run test:testkit, bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000, and bun run typecheck all pass after moving the CLI test helper implementation into packages/agentplane/src/testing, exposing @agentplane/testkit/cli, and rewriting direct test imports to the new facade."
doc_version: 3
doc_updated_at: "2026-04-17T15:17:55.492Z"
doc_updated_by: "CODER"
description: "Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim."
sections:
  Summary: |-
    Expose CLI harness via @agentplane/testkit facade
    
    Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim.
  Scope: |-
    - In scope: Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim.
    - Out of scope: unrelated refactors not required for "Expose CLI harness via @agentplane/testkit facade".
  Plan: |-
    1. Move the CLI helper implementation out of packages/agentplane/src/cli into a dedicated internal testing module.
    2. Expose @agentplane/testkit/cli as the canonical import surface, update agentplane test imports, and keep the legacy agentplane-only path as a compatibility shim for in-package helpers.
    3. Re-run targeted harness tests, test:testkit, and typecheck before recording any residual boundary issues.
  Verify Steps: |-
    1. Run `bun run test:testkit`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T15:17:55.489Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run test:testkit, bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000, and bun run typecheck all pass after moving the CLI test helper implementation into packages/agentplane/src/testing, exposing @agentplane/testkit/cli, and rewriting direct test imports to the new facade.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T15:13:35.571Z, excerpt_hash=sha256:7e3d42eb1761598e1cd7faa92dd7b606c6f941a456c3dad9d7fd224cb7c71b78
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: packages/agentplane/src/commands/recipes.test-helpers.ts still consumes the legacy shim path and was intentionally left in place to avoid folding a separate recipes-helper migration into this task.
      Impact: The canonical CLI test-harness import is now @agentplane/testkit/cli, but one in-package helper still depends on the compatibility shim.
      Resolution: Keep the shim for now and schedule recipes.test-helpers migration as a follow-up if the team wants to eliminate the last legacy import path.
id_source: "generated"
---
## Summary

Expose CLI harness via @agentplane/testkit facade

Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim.

## Scope

- In scope: Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim.
- Out of scope: unrelated refactors not required for "Expose CLI harness via @agentplane/testkit facade".

## Plan

1. Move the CLI helper implementation out of packages/agentplane/src/cli into a dedicated internal testing module.
2. Expose @agentplane/testkit/cli as the canonical import surface, update agentplane test imports, and keep the legacy agentplane-only path as a compatibility shim for in-package helpers.
3. Re-run targeted harness tests, test:testkit, and typecheck before recording any residual boundary issues.

## Verify Steps

1. Run `bun run test:testkit`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T15:17:55.489Z — VERIFY — ok

By: CODER

Note: Verified: bun run test:testkit, bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000, and bun run typecheck all pass after moving the CLI test helper implementation into packages/agentplane/src/testing, exposing @agentplane/testkit/cli, and rewriting direct test imports to the new facade.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T15:13:35.571Z, excerpt_hash=sha256:7e3d42eb1761598e1cd7faa92dd7b606c6f941a456c3dad9d7fd224cb7c71b78

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: packages/agentplane/src/commands/recipes.test-helpers.ts still consumes the legacy shim path and was intentionally left in place to avoid folding a separate recipes-helper migration into this task.
  Impact: The canonical CLI test-harness import is now @agentplane/testkit/cli, but one in-package helper still depends on the compatibility shim.
  Resolution: Keep the shim for now and schedule recipes.test-helpers migration as a follow-up if the team wants to eliminate the last legacy import path.
