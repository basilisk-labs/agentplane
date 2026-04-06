---
id: "202604062101-7WG8WG"
title: "Report explicit incident promotion outcome in lifecycle commands"
result_summary: "Merged via PR #90."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T21:02:48.022Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T21:11:54.220Z"
  updated_by: "CODER"
  note: "Verification made incident promotion outcomes explicit in finish, integrate, and hosted-close. Commands: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts. Result: pass. Evidence: lifecycle commands now report either promoted incident count or explicit no-op, and focused contract suites passed. Scope: incidents collection messaging across finish, integrate, and hosted-close."
commit:
  hash: "191e3cfb8f09d3c434859a3151d5a97621263b44"
  message: "workflow: Report explicit incident promotion outcome in lifecycle commands (7WG8WG) (#90)"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: PR #90 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "verify"
    at: "2026-04-06T21:09:51.040Z"
    author: "CODER"
    state: "ok"
    note: "Verified: finish, integrate, and hosted-close now emit explicit incident promotion outcome messaging, including unchanged-registry output when no promotable external findings exist. Commands: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts."
  -
    type: "verify"
    at: "2026-04-06T21:11:54.220Z"
    author: "CODER"
    state: "ok"
    note: "Verification made incident promotion outcomes explicit in finish, integrate, and hosted-close. Commands: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts. Result: pass. Evidence: lifecycle commands now report either promoted incident count or explicit no-op, and focused contract suites passed. Scope: incidents collection messaging across finish, integrate, and hosted-close."
  -
    type: "status"
    at: "2026-04-06T22:14:15.206Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: PR #90 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-06T22:14:15.212Z"
doc_updated_by: "INTEGRATOR"
description: "Make finish, integrate, and hosted-close report whether incidents were promoted or why the registry stayed unchanged so operators can distinguish no-op from breakage."
sections:
  Summary: |-
    Report explicit incident promotion outcome in lifecycle commands
    
    Make finish, integrate, and hosted-close report whether incidents were promoted or why the registry stayed unchanged so operators can distinguish no-op from breakage.
  Scope: |-
    - In scope: Make finish, integrate, and hosted-close report whether incidents were promoted or why the registry stayed unchanged so operators can distinguish no-op from breakage.
    - Out of scope: unrelated refactors not required for "Report explicit incident promotion outcome in lifecycle commands".
  Plan: "1. Audit finish, integrate, and hosted-close outputs around incident promotion. 2. Emit explicit non-quiet diagnostics for promoted vs unchanged registry outcomes. 3. Lock the behavior with CLI contract tests and targeted verification."
  Verify Steps: |-
    - Run focused vitest coverage for finish, integrate, and hosted-close output paths.
    - Run eslint on the touched lifecycle command source/tests.
    - Smoke-check at least one non-quiet lifecycle path to confirm incident outcome messaging is explicit.
  Verification: |-
    - Command: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts
    - Result: pass
    - Evidence: 5 files passed, 76 tests passed, including explicit incident outcome coverage for finish, integrate, and hosted-close.
    - Scope: task lifecycle output paths and incident promotion messaging.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T21:09:51.040Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: finish, integrate, and hosted-close now emit explicit incident promotion outcome messaging, including unchanged-registry output when no promotable external findings exist. Commands: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:09:49.272Z, excerpt_hash=sha256:2520b3fa32cafbb99862acc5df24ed8420efab8dc602d1352f63a7cb7764c5c3
    
    ### 2026-04-06T21:11:54.220Z — VERIFY — ok
    
    By: CODER
    
    Note: Verification made incident promotion outcomes explicit in finish, integrate, and hosted-close. Commands: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts. Result: pass. Evidence: lifecycle commands now report either promoted incident count or explicit no-op, and focused contract suites passed. Scope: incidents collection messaging across finish, integrate, and hosted-close.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:09:51.047Z, excerpt_hash=sha256:2520b3fa32cafbb99862acc5df24ed8420efab8dc602d1352f63a7cb7764c5c3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - finish, integrate, and hosted-close now emit explicit non-quiet incident outcome messages.
    - When no external findings are promotable, the registry stays unchanged and the command now says so explicitly.
id_source: "generated"
---
## Summary

Report explicit incident promotion outcome in lifecycle commands

Make finish, integrate, and hosted-close report whether incidents were promoted or why the registry stayed unchanged so operators can distinguish no-op from breakage.

## Scope

- In scope: Make finish, integrate, and hosted-close report whether incidents were promoted or why the registry stayed unchanged so operators can distinguish no-op from breakage.
- Out of scope: unrelated refactors not required for "Report explicit incident promotion outcome in lifecycle commands".

## Plan

1. Audit finish, integrate, and hosted-close outputs around incident promotion. 2. Emit explicit non-quiet diagnostics for promoted vs unchanged registry outcomes. 3. Lock the behavior with CLI contract tests and targeted verification.

## Verify Steps

- Run focused vitest coverage for finish, integrate, and hosted-close output paths.
- Run eslint on the touched lifecycle command source/tests.
- Smoke-check at least one non-quiet lifecycle path to confirm incident outcome messaging is explicit.

## Verification

- Command: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts
- Result: pass
- Evidence: 5 files passed, 76 tests passed, including explicit incident outcome coverage for finish, integrate, and hosted-close.
- Scope: task lifecycle output paths and incident promotion messaging.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T21:09:51.040Z — VERIFY — ok

By: CODER

Note: Verified: finish, integrate, and hosted-close now emit explicit incident promotion outcome messaging, including unchanged-registry output when no promotable external findings exist. Commands: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:09:49.272Z, excerpt_hash=sha256:2520b3fa32cafbb99862acc5df24ed8420efab8dc602d1352f63a7cb7764c5c3

### 2026-04-06T21:11:54.220Z — VERIFY — ok

By: CODER

Note: Verification made incident promotion outcomes explicit in finish, integrate, and hosted-close. Commands: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts. Result: pass. Evidence: lifecycle commands now report either promoted incident count or explicit no-op, and focused contract suites passed. Scope: incidents collection messaging across finish, integrate, and hosted-close.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:09:51.047Z, excerpt_hash=sha256:2520b3fa32cafbb99862acc5df24ed8420efab8dc602d1352f63a7cb7764c5c3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- finish, integrate, and hosted-close now emit explicit non-quiet incident outcome messages.
- When no external findings are promotable, the registry stays unchanged and the command now says so explicitly.
