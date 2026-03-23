---
id: "202603231310-Y9DZYE"
title: "R12: Add scenario execute shared flow"
result_summary: "Scenario execution now reuses the common runner flow: materialize task, inject recipe context, execute adapter, and persist recipe-targeted bundle/run artifacts."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on:
  - "202603231310-E9DEDP"
tags:
  - "code"
  - "cli"
  - "recipes"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:55.887Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T15:07:09.947Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u
    Result: pass
    Evidence: 5 files, 48 tests passed; scenario execute now materializes a task, runs the shared runner with target.kind=recipe_scenario, task run stayed green, Codex adapter integration stayed green, and help snapshots were updated to the live contract.
    Scope: packages/agentplane/src/commands/scenario/execute.command.ts, packages/agentplane/src/runner/usecases/task-run.ts, packages/agentplane/src/cli/run-cli.scenario.test.ts, packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/scenario/execute.command.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/runner/context/recipe-context.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/index.ts
    Result: pass
    Evidence: no lint errors on the shared scenario-execute runner path.
    Scope: modified scenario execute and shared runner files for R12
commit:
  hash: "6d4820569b58113ba8d3eea63deb35015cf3db78"
  message: "✅ Y9DZYE code: done"
comments:
  -
    author: "CODER"
    body: "Start: replace the scenario execute placeholder with the shared flow that materializes a recipe-backed task, passes recipe context into the common runner bundle, and executes the configured adapter through the same task-run path."
  -
    author: "CODER"
    body: "Verified: scenario execute now creates a recipe-backed task, routes it through the shared task runner path with recipe_scenario bundle metadata, and keeps task run behavior and help output consistent."
events:
  -
    type: "status"
    at: "2026-03-23T15:06:49.707Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the scenario execute placeholder with the shared flow that materializes a recipe-backed task, passes recipe context into the common runner bundle, and executes the configured adapter through the same task-run path."
  -
    type: "verify"
    at: "2026-03-23T15:07:09.947Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u
      Result: pass
      Evidence: 5 files, 48 tests passed; scenario execute now materializes a task, runs the shared runner with target.kind=recipe_scenario, task run stayed green, Codex adapter integration stayed green, and help snapshots were updated to the live contract.
      Scope: packages/agentplane/src/commands/scenario/execute.command.ts, packages/agentplane/src/runner/usecases/task-run.ts, packages/agentplane/src/cli/run-cli.scenario.test.ts, packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap
      
      Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/scenario/execute.command.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/runner/context/recipe-context.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/index.ts
      Result: pass
      Evidence: no lint errors on the shared scenario-execute runner path.
      Scope: modified scenario execute and shared runner files for R12
  -
    type: "status"
    at: "2026-03-23T15:07:18.450Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: scenario execute now creates a recipe-backed task, routes it through the shared task runner path with recipe_scenario bundle metadata, and keeps task run behavior and help output consistent."
doc_version: 3
doc_updated_at: "2026-03-23T15:07:22.368Z"
doc_updated_by: "CODER"
description: "Implement scenario execute as recipe resolution plus task materialization plus the shared task runner flow."
sections:
  Summary: |-
    R12: Add scenario execute shared flow
    
    Implement scenario execute as recipe resolution plus task materialization plus the shared task runner flow.
  Scope: |-
    - In scope: Implement scenario execute as recipe resolution plus task materialization plus the shared task runner flow.
    - Out of scope: unrelated refactors not required for "R12: Add scenario execute shared flow".
  Plan: |-
    1. Add scenario execute command parsing and handler wiring.
    2. Resolve and validate the requested scenario, materialize the task, and invoke the shared task-run flow.
    3. Keep scenario run as preview-only and add typed failure coverage for missing, incompatible, and ambiguous scenarios.
  Verify Steps: |-
    1. Run scenario execute success-path tests. Expected: a task is created and a runner invocation is prepared or executed through the shared flow.
    2. Run missing, incompatible, and ambiguous scenario tests. Expected: each path fails with a typed error and no hidden partial state.
    3. Run scenario run help or tests. Expected: preview-only semantics remain unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T15:07:09.947Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u
    Result: pass
    Evidence: 5 files, 48 tests passed; scenario execute now materializes a task, runs the shared runner with target.kind=recipe_scenario, task run stayed green, Codex adapter integration stayed green, and help snapshots were updated to the live contract.
    Scope: packages/agentplane/src/commands/scenario/execute.command.ts, packages/agentplane/src/runner/usecases/task-run.ts, packages/agentplane/src/cli/run-cli.scenario.test.ts, packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/scenario/execute.command.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/runner/context/recipe-context.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/index.ts
    Result: pass
    Evidence: no lint errors on the shared scenario-execute runner path.
    Scope: modified scenario execute and shared runner files for R12
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T15:06:49.708Z, excerpt_hash=sha256:a088e80de03fe0d9347a6529e5dc4f04985ba3ee90ccf273693ef78c41efbe0d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R12: Add scenario execute shared flow

Implement scenario execute as recipe resolution plus task materialization plus the shared task runner flow.

## Scope

- In scope: Implement scenario execute as recipe resolution plus task materialization plus the shared task runner flow.
- Out of scope: unrelated refactors not required for "R12: Add scenario execute shared flow".

## Plan

1. Add scenario execute command parsing and handler wiring.
2. Resolve and validate the requested scenario, materialize the task, and invoke the shared task-run flow.
3. Keep scenario run as preview-only and add typed failure coverage for missing, incompatible, and ambiguous scenarios.

## Verify Steps

1. Run scenario execute success-path tests. Expected: a task is created and a runner invocation is prepared or executed through the shared flow.
2. Run missing, incompatible, and ambiguous scenario tests. Expected: each path fails with a typed error and no hidden partial state.
3. Run scenario run help or tests. Expected: preview-only semantics remain unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T15:07:09.947Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u
Result: pass
Evidence: 5 files, 48 tests passed; scenario execute now materializes a task, runs the shared runner with target.kind=recipe_scenario, task run stayed green, Codex adapter integration stayed green, and help snapshots were updated to the live contract.
Scope: packages/agentplane/src/commands/scenario/execute.command.ts, packages/agentplane/src/runner/usecases/task-run.ts, packages/agentplane/src/cli/run-cli.scenario.test.ts, packages/agentplane/src/cli/__snapshots__/run-cli.core.help-snap.test.ts.snap

Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/scenario/execute.command.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/runner/context/recipe-context.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/index.ts
Result: pass
Evidence: no lint errors on the shared scenario-execute runner path.
Scope: modified scenario execute and shared runner files for R12

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T15:06:49.708Z, excerpt_hash=sha256:a088e80de03fe0d9347a6529e5dc4f04985ba3ee90ccf273693ef78c41efbe0d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
