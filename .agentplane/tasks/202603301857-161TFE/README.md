---
id: "202603301857-161TFE"
title: "Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery"
result_summary: "integrate: squash task/202603301857-161TFE/migrate-group-commands-to-derived-discovery"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202603301857-M5MBBB"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T10:47:11.961Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T10:59:25.983Z"
  updated_by: "CODER"
  note: "Focused R5.2 verification passed: eslint clean, relevance-only vitest slice passed (179 tests + targeted task doc usage case), and diff stays limited to group-root discovery modules/tests. A broader unrelated baseline failure in run-cli.core.misc task-show metadata handling was reproduced on main and documented in Findings, so it does not block this task."
commit:
  hash: "32ed48b0461cb643a4e147ac96c8a9a18a6046c7"
  message: "🧩 161TFE integrate: squash task/202603301857-161TFE/migrate-group-commands-to-derived-discovery"
comments:
  -
    author: "CODER"
    body: "Start: migrate group/root command usage errors onto lazy canonical child discovery so manual child-spec arrays disappear unless a command intentionally overrides visibility."
  -
    author: "CODER"
    body: "Start: replace manual group child-spec arrays with lazy canonical derived discovery in group entry modules without introducing a static command-catalog cycle."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-161TFE/pr."
events:
  -
    type: "status"
    at: "2026-03-31T10:53:21.294Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate group/root command usage errors onto lazy canonical child discovery so manual child-spec arrays disappear unless a command intentionally overrides visibility."
  -
    type: "status"
    at: "2026-03-31T10:54:01.385Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: replace manual group child-spec arrays with lazy canonical derived discovery in group entry modules without introducing a static command-catalog cycle."
  -
    type: "verify"
    at: "2026-03-31T10:59:25.983Z"
    author: "CODER"
    state: "ok"
    note: "Focused R5.2 verification passed: eslint clean, relevance-only vitest slice passed (179 tests + targeted task doc usage case), and diff stays limited to group-root discovery modules/tests. A broader unrelated baseline failure in run-cli.core.misc task-show metadata handling was reproduced on main and documented in Findings, so it does not block this task."
  -
    type: "status"
    at: "2026-03-31T11:02:30.187Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-161TFE/pr."
doc_version: 3
doc_updated_at: "2026-03-31T11:02:30.192Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 5 / R5.2 from REFACTOR.md. group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children."
sections:
  Summary: |-
    Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery
    
    Implement Epic 5 / R5.2 from REFACTOR.md. group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
  Scope: |-
    - In scope: Implement Epic 5 / R5.2 from REFACTOR.md. group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
    - Out of scope: unrelated refactors not required for "Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery".
  Plan: |-
    1. Audit the current implementation and tests around group command entry modules to isolate the exact behavior gap for R5.2.
    2. Implement the smallest change set that satisfies the REFACTOR contract: group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering group command entry modules. Expected: the behavior described by R5.2 is observable and stable.
    2. Inspect the final diff for 202603301857-161TFE. Expected: scope stays limited to group command entry modules plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - Command: `bunx eslint packages/agentplane/src/cli/group-command.ts packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/commands/workflow.command.ts packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/commands/guard/guard.command.ts packages/agentplane/src/commands/hooks/hooks.command.ts packages/agentplane/src/commands/backend/sync.command.ts packages/agentplane/src/commands/branch/base.command.ts packages/agentplane/src/commands/recipes/cache.command.ts packages/agentplane/src/commands/cleanup/merged.command.ts packages/agentplane/src/commands/recipes/recipes.command.ts packages/agentplane/src/commands/release/release.command.ts packages/agentplane/src/commands/pr/pr.command.ts packages/agentplane/src/commands/scenario/scenario.command.ts packages/agentplane/src/commands/task/handoff.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/commands/task/plan.command.ts packages/agentplane/src/commands/task/verify.command.ts packages/agentplane/src/commands/task/doc.command.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts`
      Result: pass
      Evidence: eslint exited clean with no diagnostics.
      Scope: lazy derived subcommand lookup helper, migrated group root handlers, and the focused contract test added for R5.2.
    - Command: `bunx vitest run packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`
      Result: pass
      Evidence: 10 files passed; 179 tests passed.
      Scope: canonical graph lookup plus migrated usage/help behavior for task, guard, hooks, pr, recipes, scenario, workflow/runtime/release/backend/branch base/cleanup group roots.
    - Command: `bunx vitest run packages/agentplane/src/cli/run-cli.core.misc.test.ts -t "task doc rejects unknown subcommands"`
      Result: pass
      Evidence: 1 test passed; 10 skipped.
      Scope: `task doc` group-root usage error path after migrating to lazy derived child discovery.
    - Command: `git diff --stat`
      Result: pass
      Evidence: 20 files changed, 95 insertions(+), 209 deletions(-).
      Scope: final diff stays limited to group-command helper/tests, migrated group entry modules, and task-local documentation.
    ### 2026-03-31T10:59:25.983Z — VERIFY — ok
    By: CODER
    Note: Focused R5.2 verification passed: eslint clean, relevance-only vitest slice passed (179 tests + targeted task doc usage case), and diff stays limited to group-root discovery modules/tests. A broader unrelated baseline failure in run-cli.core.misc task-show metadata handling was reproduced on main and documented in Findings, so it does not block this task.
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:54:01.386Z, excerpt_hash=sha256:cfc353dece39cd2200eb70da4a7e950b3d188f49476b69c9582023ae001f7fc3
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Broader regression slice note: `bunx vitest run packages/agentplane/src/cli/run-cli.core.misc.test.ts -t \"task show fails when required doc metadata is missing\"` still fails on both the task worktree and `main` with `expected 3 to be 4`; reproduced as pre-existing baseline drift outside R5.2 scope, so it was documented but not changed here."
id_source: "generated"
---
## Summary

Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery

Implement Epic 5 / R5.2 from REFACTOR.md. group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.

## Scope

- In scope: Implement Epic 5 / R5.2 from REFACTOR.md. group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
- Out of scope: unrelated refactors not required for "Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery".

## Plan

1. Audit the current implementation and tests around group command entry modules to isolate the exact behavior gap for R5.2.
2. Implement the smallest change set that satisfies the REFACTOR contract: group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering group command entry modules. Expected: the behavior described by R5.2 is observable and stable.
2. Inspect the final diff for 202603301857-161TFE. Expected: scope stays limited to group command entry modules plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- Command: `bunx eslint packages/agentplane/src/cli/group-command.ts packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/commands/workflow.command.ts packages/agentplane/src/commands/runtime.command.ts packages/agentplane/src/commands/guard/guard.command.ts packages/agentplane/src/commands/hooks/hooks.command.ts packages/agentplane/src/commands/backend/sync.command.ts packages/agentplane/src/commands/branch/base.command.ts packages/agentplane/src/commands/recipes/cache.command.ts packages/agentplane/src/commands/cleanup/merged.command.ts packages/agentplane/src/commands/recipes/recipes.command.ts packages/agentplane/src/commands/release/release.command.ts packages/agentplane/src/commands/pr/pr.command.ts packages/agentplane/src/commands/scenario/scenario.command.ts packages/agentplane/src/commands/task/handoff.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/commands/task/plan.command.ts packages/agentplane/src/commands/task/verify.command.ts packages/agentplane/src/commands/task/doc.command.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts`
  Result: pass
  Evidence: eslint exited clean with no diagnostics.
  Scope: lazy derived subcommand lookup helper, migrated group root handlers, and the focused contract test added for R5.2.
- Command: `bunx vitest run packages/agentplane/src/cli/group-command.test.ts packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.group-root-usage.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`
  Result: pass
  Evidence: 10 files passed; 179 tests passed.
  Scope: canonical graph lookup plus migrated usage/help behavior for task, guard, hooks, pr, recipes, scenario, workflow/runtime/release/backend/branch base/cleanup group roots.
- Command: `bunx vitest run packages/agentplane/src/cli/run-cli.core.misc.test.ts -t "task doc rejects unknown subcommands"`
  Result: pass
  Evidence: 1 test passed; 10 skipped.
  Scope: `task doc` group-root usage error path after migrating to lazy derived child discovery.
- Command: `git diff --stat`
  Result: pass
  Evidence: 20 files changed, 95 insertions(+), 209 deletions(-).
  Scope: final diff stays limited to group-command helper/tests, migrated group entry modules, and task-local documentation.
### 2026-03-31T10:59:25.983Z — VERIFY — ok
By: CODER
Note: Focused R5.2 verification passed: eslint clean, relevance-only vitest slice passed (179 tests + targeted task doc usage case), and diff stays limited to group-root discovery modules/tests. A broader unrelated baseline failure in run-cli.core.misc task-show metadata handling was reproduced on main and documented in Findings, so it does not block this task.
VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:54:01.386Z, excerpt_hash=sha256:cfc353dece39cd2200eb70da4a7e950b3d188f49476b69c9582023ae001f7fc3
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Broader regression slice note: `bunx vitest run packages/agentplane/src/cli/run-cli.core.misc.test.ts -t "task show fails when required doc metadata is missing"` still fails on both the task worktree and `main` with `expected 3 to be 4`; reproduced as pre-existing baseline drift outside R5.2 scope, so it was documented but not changed here.
