---
id: "202603231310-XVJMRV"
title: "R8: Add task run dry-run flow"
result_summary: "Implemented task run dry-run flow with runner artifacts and prepared invocation output."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on:
  - "202603231310-T3Z3TQ"
tags:
  - "code"
  - "cli"
  - "runner"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:49.112Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T14:23:48.605Z"
  updated_by: "CODER"
  note: "task run dry-run flow verified end-to-end."
commit:
  hash: "bf2395cf5df97980a00152e0ee70ecd29eb55ab1"
  message: "✅ XVJMRV code: done"
comments:
  -
    author: "CODER"
    body: "Start: wire task run into bundle assembly, artifact creation, and adapter preparation so --dry-run materializes runner artifacts and prints the selected adapter/invocation without executing Codex."
  -
    author: "CODER"
    body: "Verified: wired task run --dry-run into shared bundle assembly, artifact materialization, adapter preparation, and CLI reporting while keeping the real execution path explicitly deferred."
events:
  -
    type: "status"
    at: "2026-03-23T14:15:23.595Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: wire task run into bundle assembly, artifact creation, and adapter preparation so --dry-run materializes runner artifacts and prints the selected adapter/invocation without executing Codex."
  -
    type: "verify"
    at: "2026-03-23T14:23:48.605Z"
    author: "CODER"
    state: "ok"
    note: "task run dry-run flow verified end-to-end."
  -
    type: "status"
    at: "2026-03-23T14:23:55.262Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: wired task run --dry-run into shared bundle assembly, artifact materialization, adapter preparation, and CLI reporting while keeping the real execution path explicitly deferred."
doc_version: 3
doc_updated_at: "2026-03-23T14:23:59.722Z"
doc_updated_by: "CODER"
description: "Implement task run dry-run so it materializes bundle and run artifacts without invoking Codex."
sections:
  Summary: |-
    R8: Add task run dry-run flow
    
    Implement task run dry-run so it materializes bundle and run artifacts without invoking Codex.
  Scope: |-
    - In scope: Implement task run dry-run so it materializes bundle and run artifacts without invoking Codex.
    - Out of scope: unrelated refactors not required for "R8: Add task run dry-run flow".
  Plan: |-
    1. Add the task run command handler and wire it to the shared task runner flow.
    2. Materialize run artifacts and bundle snapshots in dry-run mode.
    3. Add CLI tests that assert selected adapter, run id, and artifact paths.
  Verify Steps: |-
    1. Run agentplane task run <task-id> --dry-run on a fixture task. Expected: run artifacts are written and no external runner is called.
    2. Inspect stdout for the dry-run summary. Expected: selected adapter and artifact paths are shown.
    3. Run task-run CLI regression tests. Expected: the new dry-run path is covered and stable.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T14:23:48.605Z — VERIFY — ok
    
    By: CODER
    
    Note: task run dry-run flow verified end-to-end.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T14:15:23.596Z, excerpt_hash=sha256:5d2d03c5a62064f5cddc041bc0a56edc2e6ce5f68f9cccd82b60577492c92212
    
    Details:
    
    - Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u
      Result: pass
      Evidence: 2 files, 34 tests passed; task run --dry-run materializes bundle artifacts, help snapshots updated, and non-dry-run path remains explicitly blocked.
      Scope: task run CLI surface, dry-run artifact creation, stdout summary, and help contract.
    - Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run.spec.ts packages/agentplane/src/runner/index.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
      Result: pass
      Evidence: no lint findings after command/usecase typing cleanup.
      Scope: new task-run usecase, task run command/spec, runner exports, and CLI regression test.
    - Command: ./node_modules/.bin/prettier --check packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run.spec.ts packages/agentplane/src/runner/index.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
      Result: pass
      Evidence: all matched task-run files use Prettier code style.
      Scope: modified task-run TypeScript files formatting.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R8: Add task run dry-run flow

Implement task run dry-run so it materializes bundle and run artifacts without invoking Codex.

## Scope

- In scope: Implement task run dry-run so it materializes bundle and run artifacts without invoking Codex.
- Out of scope: unrelated refactors not required for "R8: Add task run dry-run flow".

## Plan

1. Add the task run command handler and wire it to the shared task runner flow.
2. Materialize run artifacts and bundle snapshots in dry-run mode.
3. Add CLI tests that assert selected adapter, run id, and artifact paths.

## Verify Steps

1. Run agentplane task run <task-id> --dry-run on a fixture task. Expected: run artifacts are written and no external runner is called.
2. Inspect stdout for the dry-run summary. Expected: selected adapter and artifact paths are shown.
3. Run task-run CLI regression tests. Expected: the new dry-run path is covered and stable.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T14:23:48.605Z — VERIFY — ok

By: CODER

Note: task run dry-run flow verified end-to-end.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T14:15:23.596Z, excerpt_hash=sha256:5d2d03c5a62064f5cddc041bc0a56edc2e6ce5f68f9cccd82b60577492c92212

Details:

- Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u
  Result: pass
  Evidence: 2 files, 34 tests passed; task run --dry-run materializes bundle artifacts, help snapshots updated, and non-dry-run path remains explicitly blocked.
  Scope: task run CLI surface, dry-run artifact creation, stdout summary, and help contract.
- Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run.spec.ts packages/agentplane/src/runner/index.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
  Result: pass
  Evidence: no lint findings after command/usecase typing cleanup.
  Scope: new task-run usecase, task run command/spec, runner exports, and CLI regression test.
- Command: ./node_modules/.bin/prettier --check packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/commands/task/run.command.ts packages/agentplane/src/commands/task/run.spec.ts packages/agentplane/src/runner/index.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
  Result: pass
  Evidence: all matched task-run files use Prettier code style.
  Scope: modified task-run TypeScript files formatting.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
