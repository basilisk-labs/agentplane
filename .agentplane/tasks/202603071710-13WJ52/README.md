---
id: "202603071710-13WJ52"
title: "Make diagnostics state-oriented"
result_summary: "Unified state-oriented diagnostics across doctor, upgrade, release apply, and close-commit flows."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603071710-A2MHWZ"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T18:55:29.817Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T19:09:25.223Z"
  updated_by: "CODER"
  note: "Passed: bunx vitest run packages/agentplane/src/shared/diagnostics.test.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts; bun run lint:core -- packages/agentplane/src/shared/diagnostics.ts packages/agentplane/src/shared/diagnostics.test.ts packages/agentplane/src/shared/errors.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/commands/release/apply.command.ts packages/agentplane/src/commands/release/apply.test.ts; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs."
commit:
  hash: "50c95a2422cada81b517976692b8d83cea9699f5"
  message: "🩺 cli: make diagnostics state-oriented"
comments:
  -
    author: "CODER"
    body: "Start: refactor the highest-friction diagnostics so users first see the detected state, then the likely cause, then one exact recovery action, beginning with doctor, upgrade, finish, and release-related surfaces."
  -
    author: "CODER"
    body: "Verified: state/cause/action diagnostics now render consistently across doctor, upgrade, release apply, and deterministic close-commit failures."
events:
  -
    type: "status"
    at: "2026-03-07T18:54:50.673Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refactor the highest-friction diagnostics so users first see the detected state, then the likely cause, then one exact recovery action, beginning with doctor, upgrade, finish, and release-related surfaces."
  -
    type: "verify"
    at: "2026-03-07T19:09:25.223Z"
    author: "CODER"
    state: "ok"
    note: "Passed: bunx vitest run packages/agentplane/src/shared/diagnostics.test.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts; bun run lint:core -- packages/agentplane/src/shared/diagnostics.ts packages/agentplane/src/shared/diagnostics.test.ts packages/agentplane/src/shared/errors.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/commands/release/apply.command.ts packages/agentplane/src/commands/release/apply.test.ts; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs."
  -
    type: "status"
    at: "2026-03-07T19:09:26.774Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: state/cause/action diagnostics now render consistently across doctor, upgrade, release apply, and deterministic close-commit failures."
doc_version: 2
doc_updated_at: "2026-03-07T19:09:26.774Z"
doc_updated_by: "CODER"
description: "Refactor key doctor, upgrade, finish, and release diagnostics to report detected state, likely cause, and exact recovery action."
id_source: "generated"
---
## Summary

Make diagnostics state-oriented

Refactor key doctor, upgrade, finish, and release diagnostics to report detected state, likely cause, and exact recovery action.

## Scope

- In scope: Refactor key doctor, upgrade, finish, and release diagnostics to report detected state, likely cause, and exact recovery action..
- Out of scope: unrelated refactors not required for "Make diagnostics state-oriented".

## Plan

1. Define a shared diagnostic shape that reports detected state, likely cause, and exact next action, then apply it to the most user-facing failure paths. 2. Refactor doctor, upgrade, finish, and release diagnostics so each high-friction message explains the state first and points to one concrete recovery command. 3. Add focused regression tests plus docs/help updates to keep the new diagnostic shape stable across CLI surfaces.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T19:09:25.223Z — VERIFY — ok

By: CODER

Note: Passed: bunx vitest run packages/agentplane/src/shared/diagnostics.test.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts; bun run lint:core -- packages/agentplane/src/shared/diagnostics.ts packages/agentplane/src/shared/diagnostics.test.ts packages/agentplane/src/shared/errors.ts packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/commands/release/apply.command.ts packages/agentplane/src/commands/release/apply.test.ts; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T18:55:22.856Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
