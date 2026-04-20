---
id: "202604191638-CQKMQN"
title: "Repoint medium CLI test imports to canonical testkit surfaces"
result_summary: "The medium-risk CLI batch no longer depends on run-cli.test-helpers.ts; the remaining shim consumers are now concentrated in the heavier CLI suites reserved for the next atom."
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
  state: "approved"
  updated_at: "2026-04-19T16:52:16.268Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T16:55:10.713Z"
  updated_by: "CODER"
  note: "Medium-risk CLI shim migration batch passed."
commit:
  hash: "0c08922c2548d8596f7eb575154307a341e6c942"
  message: "🧪 tests: migrate medium cli run-cli shim batch"
comments:
  -
    author: "CODER"
    body: "Start: migrate the medium-risk CLI batch off packages/agentplane/src/cli/run-cli.test-helpers.ts by repointing selected help, prompts, recipes, scenario, smoke, and task-close tests to the testing compatibility entrypoint, while deferring the heaviest CLI suites to the next atom."
  -
    author: "CODER"
    body: "Verified: moved the selected medium-risk CLI batch off packages/agentplane/src/cli/run-cli.test-helpers.ts, kept helper behavior unchanged via the testing compatibility entrypoint, confirmed the migrated files no longer import the shim, and reran the targeted CLI suites."
events:
  -
    type: "status"
    at: "2026-04-19T16:52:16.257Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the medium-risk CLI batch off packages/agentplane/src/cli/run-cli.test-helpers.ts by repointing selected help, prompts, recipes, scenario, smoke, and task-close tests to the testing compatibility entrypoint, while deferring the heaviest CLI suites to the next atom."
  -
    type: "verify"
    at: "2026-04-19T16:55:10.713Z"
    author: "CODER"
    state: "ok"
    note: "Medium-risk CLI shim migration batch passed."
  -
    type: "status"
    at: "2026-04-19T16:55:32.257Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: moved the selected medium-risk CLI batch off packages/agentplane/src/cli/run-cli.test-helpers.ts, kept helper behavior unchanged via the testing compatibility entrypoint, confirmed the migrated files no longer import the shim, and reran the targeted CLI suites."
doc_version: 3
doc_updated_at: "2026-04-19T16:55:32.259Z"
doc_updated_by: "CODER"
description: "Epic E′. Move the first medium-sized batch of CLI tests from run-cli.test-helpers.ts to canonical testkit entrypoints while preserving existing coverage."
sections:
  Summary: |-
    Repoint medium CLI test imports to canonical testkit surfaces
    
    Epic E′. Move the first medium-sized batch of CLI tests from run-cli.test-helpers.ts to canonical testkit entrypoints while preserving existing coverage.
  Scope: |-
    - In scope: Epic E′. Move the first medium-sized batch of CLI tests from run-cli.test-helpers.ts to canonical testkit entrypoints while preserving existing coverage.
    - Out of scope: unrelated refactors not required for "Repoint medium CLI test imports to canonical testkit surfaces".
  Plan: "1. Migrate a medium-risk CLI batch off run-cli.test-helpers.ts, focusing on help, prompts, recipes, scenario, smoke, and selected task/close tests. 2. Leave the heaviest CLI suites such as pr-flow.pr, tasks.query, init, upgrade, and backend-sync for the next atom. 3. Run focused Vitest coverage for the migrated CLI batch and record verification evidence. 4. Finish with a task-scoped commit once the batch is green."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T16:55:10.713Z — VERIFY — ok
    
    By: CODER
    
    Note: Medium-risk CLI shim migration batch passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:52:16.287Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: rg -n 'run-cli\.test-helpers\.js' packages/agentplane/src/cli/help.all-commands.contract.test.ts packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/cli-smoke.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts packages/agentplane/src/cli/run-cli.core.pr-close.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
    Result: pass
    Evidence: no matches returned.
    Scope: selected medium-risk CLI consumer batch.
    
    Command: bunx vitest run packages/agentplane/src/cli/help.all-commands.contract.test.ts packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/cli-smoke.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts packages/agentplane/src/cli/run-cli.core.pr-close.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
    Result: pass
    Evidence: 19 files passed, 114 tests passed.
    Scope: medium-risk CLI consumers moved off the run-cli shim.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Repoint medium CLI test imports to canonical testkit surfaces

Epic E′. Move the first medium-sized batch of CLI tests from run-cli.test-helpers.ts to canonical testkit entrypoints while preserving existing coverage.

## Scope

- In scope: Epic E′. Move the first medium-sized batch of CLI tests from run-cli.test-helpers.ts to canonical testkit entrypoints while preserving existing coverage.
- Out of scope: unrelated refactors not required for "Repoint medium CLI test imports to canonical testkit surfaces".

## Plan

1. Migrate a medium-risk CLI batch off run-cli.test-helpers.ts, focusing on help, prompts, recipes, scenario, smoke, and selected task/close tests. 2. Leave the heaviest CLI suites such as pr-flow.pr, tasks.query, init, upgrade, and backend-sync for the next atom. 3. Run focused Vitest coverage for the migrated CLI batch and record verification evidence. 4. Finish with a task-scoped commit once the batch is green.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T16:55:10.713Z — VERIFY — ok

By: CODER

Note: Medium-risk CLI shim migration batch passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:52:16.287Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: rg -n 'run-cli\.test-helpers\.js' packages/agentplane/src/cli/help.all-commands.contract.test.ts packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/cli-smoke.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts packages/agentplane/src/cli/run-cli.core.pr-close.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
Result: pass
Evidence: no matches returned.
Scope: selected medium-risk CLI consumer batch.

Command: bunx vitest run packages/agentplane/src/cli/help.all-commands.contract.test.ts packages/agentplane/src/cli/measure-cli-cold-path-script.test.ts packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/cli-smoke.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts packages/agentplane/src/cli/run-cli.core.pr-close.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
Result: pass
Evidence: 19 files passed, 114 tests passed.
Scope: medium-risk CLI consumers moved off the run-cli shim.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
