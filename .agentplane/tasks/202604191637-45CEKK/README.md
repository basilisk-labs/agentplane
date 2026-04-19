---
id: "202604191637-45CEKK"
title: "Migrate non-CLI consumers off run-cli test shim"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testkit"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T16:45:10.528Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T16:48:41.470Z"
  updated_by: "CODER"
  note: "Non-CLI run-cli shim migration checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: migrate the non-CLI consumers of packages/agentplane/src/cli/run-cli.test-helpers.ts onto canonical testkit or testing compatibility entrypoints, keep helper behavior unchanged, and verify the touched command, backend, and runner test surfaces in direct mode."
events:
  -
    type: "status"
    at: "2026-04-19T16:45:32.734Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the non-CLI consumers of packages/agentplane/src/cli/run-cli.test-helpers.ts onto canonical testkit or testing compatibility entrypoints, keep helper behavior unchanged, and verify the touched command, backend, and runner test surfaces in direct mode."
  -
    type: "verify"
    at: "2026-04-19T16:48:41.470Z"
    author: "CODER"
    state: "ok"
    note: "Non-CLI run-cli shim migration checks passed."
doc_version: 3
doc_updated_at: "2026-04-19T16:48:41.480Z"
doc_updated_by: "CODER"
description: "Epic E′. Move command, backend, and runner test consumers from packages/agentplane/src/cli/run-cli.test-helpers.ts to canonical @agentplane/test surfaces without widening helper APIs."
sections:
  Summary: |-
    Migrate non-CLI consumers off run-cli test shim
    
    Epic E′. Move command, backend, and runner test consumers from packages/agentplane/src/cli/run-cli.test-helpers.ts to canonical @agentplane/test surfaces without widening helper APIs.
  Scope: |-
    - In scope: Epic E′. Move command, backend, and runner test consumers from packages/agentplane/src/cli/run-cli.test-helpers.ts to canonical @agentplane/test surfaces without widening helper APIs.
    - Out of scope: unrelated refactors not required for "Migrate non-CLI consumers off run-cli test shim".
  Plan: "1. Find non-CLI test files outside packages/agentplane/src/cli that still import run-cli.test-helpers.ts. 2. Repoint those imports to canonical testkit or testing compatibility entrypoints without changing helper behavior. 3. Run focused tests covering commands, backends, and runner consumers touched by the migration. 4. Record verification and finish with task-scoped commit evidence."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T16:48:41.470Z — VERIFY — ok
    
    By: CODER
    
    Note: Non-CLI run-cli shim migration checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:45:32.757Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: rg -n 'run-cli\.test-helpers\.js' packages/agentplane/src --glob '!packages/agentplane/src/cli/**'
    Result: pass
    Evidence: no matches returned.
    Scope: non-CLI consumers under commands, backends, and runner.
    
    Command: bunx vitest run packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts packages/agentplane/src/commands/workflow.task-doc.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/commands/upgrade.agent-mode.test.ts packages/agentplane/src/commands/upgrade.cleanup.test.ts packages/agentplane/src/commands/upgrade.json-merge.stability.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend/redmine/live.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/context/task-context.test.ts
    Result: pass
    Evidence: 24 files passed, 239 tests passed, 2 skipped.
    Scope: commands, backends, and runner consumers migrated off the run-cli shim.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate non-CLI consumers off run-cli test shim

Epic E′. Move command, backend, and runner test consumers from packages/agentplane/src/cli/run-cli.test-helpers.ts to canonical @agentplane/test surfaces without widening helper APIs.

## Scope

- In scope: Epic E′. Move command, backend, and runner test consumers from packages/agentplane/src/cli/run-cli.test-helpers.ts to canonical @agentplane/test surfaces without widening helper APIs.
- Out of scope: unrelated refactors not required for "Migrate non-CLI consumers off run-cli test shim".

## Plan

1. Find non-CLI test files outside packages/agentplane/src/cli that still import run-cli.test-helpers.ts. 2. Repoint those imports to canonical testkit or testing compatibility entrypoints without changing helper behavior. 3. Run focused tests covering commands, backends, and runner consumers touched by the migration. 4. Record verification and finish with task-scoped commit evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T16:48:41.470Z — VERIFY — ok

By: CODER

Note: Non-CLI run-cli shim migration checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:45:32.757Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: rg -n 'run-cli\.test-helpers\.js' packages/agentplane/src --glob '!packages/agentplane/src/cli/**'
Result: pass
Evidence: no matches returned.
Scope: non-CLI consumers under commands, backends, and runner.

Command: bunx vitest run packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/commands/workflow.maintenance.test.ts packages/agentplane/src/commands/workflow.task-doc.test.ts packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/commands/upgrade.agent-mode.test.ts packages/agentplane/src/commands/upgrade.cleanup.test.ts packages/agentplane/src/commands/upgrade.json-merge.stability.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend/redmine/live.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/runner/context/task-context.test.ts
Result: pass
Evidence: 24 files passed, 239 tests passed, 2 skipped.
Scope: commands, backends, and runner consumers migrated off the run-cli shim.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
