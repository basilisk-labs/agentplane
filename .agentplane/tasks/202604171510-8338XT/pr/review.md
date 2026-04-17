# PR Review

Created: 2026-04-17T15:13:35.592Z
Branch: task/202604171510-8338XT/testkit-facade

## Summary

Expose CLI harness via @agentplane/testkit facade

Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim.

## Scope

- In scope: Move the CLI test helper implementation out of the old src/cli path, expose @agentplane/testkit/cli as the canonical import surface, and keep legacy agentplane-only imports working through a compatibility shim.
- Out of scope: unrelated refactors not required for "Expose CLI harness via @agentplane/testkit facade".

## Verification

### Plan

1. Run `bun run test:testkit`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: bun run test:testkit, bunx vitest run packages/agentplane/src/cli/run-cli.test-helpers.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts --hookTimeout 60000 --testTimeout 60000, and bun run typecheck all pass after moving the CLI test helper implementation into packages/agentplane/src/testing, exposing @agentplane/testkit/cli, and rewriting direct test imports to the new facade.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T18:43:02.149Z
- Branch: task/202604171510-8338XT/testkit-facade
- Head: 35c63b7a1dcb

```text
 bun.lock                                           |   3 +
 packages/agentplane/package.json                   |   3 +
 .../src/backends/task-backend.load.test.ts         |   2 +-
 .../src/backends/task-backend.local.test.ts        |   2 +-
 .../src/backends/task-backend.redmine.test.ts      |   2 +-
 .../agentplane/src/backends/task-backend.test.ts   |   2 +-
 .../src/backends/task-backend/redmine/live.test.ts |   2 +-
 packages/agentplane/src/cli/cli-smoke.test.ts      |   2 +-
 .../src/cli/help.all-commands.contract.test.ts     |   2 +-
 .../src/cli/measure-cli-cold-path-script.test.ts   |   2 +-
 packages/agentplane/src/cli/prompts.test.ts        |   2 +-
 packages/agentplane/src/cli/release-smoke.test.ts  |   2 +-
 .../src/cli/run-cli.core.backend-sync.test.ts      |   2 +-
 .../cli/run-cli.core.branch-meta.readiness.test.ts |   2 +-
 ...n-cli.core.branch-meta.sync-maintenance.test.ts |   2 +-
 .../src/cli/run-cli.core.branch-meta.test.ts       |   2 +-
 ...n-cli.core.branch-meta.workflow-profile.test.ts |   2 +-
 .../src/cli/run-cli.core.codex-plugin.test.ts      |   2 +-
 .../src/cli/run-cli.core.docs-cli.test.ts          |   2 +-
 .../src/cli/run-cli.core.group-root-usage.test.ts  |   2 +-
 .../cli/run-cli.core.guard.commit-wrapper.test.ts  |   2 +-
 .../agentplane/src/cli/run-cli.core.guard.test.ts  |   2 +-
 .../src/cli/run-cli.core.help-contract.test.ts     |   2 +-
 .../src/cli/run-cli.core.help-snap.test.ts         |   2 +-
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  |   2 +-
 .../src/cli/run-cli.core.incidents.test.ts         |   2 +-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   2 +-
 .../run-cli.core.lifecycle.block-finish.test.ts    |   2 +-
 .../src/cli/run-cli.core.lifecycle.test.ts         |   2 +-
 .../src/cli/run-cli.core.lifecycle.verify.test.ts  |   2 +-
 .../agentplane/src/cli/run-cli.core.misc.test.ts   |   2 +-
 .../cli/run-cli.core.pr-close-superseded.test.ts   |   2 +-
 .../src/cli/run-cli.core.pr-close.test.ts          |   2 +-
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    |   2 +-
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts |   2 +-
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |   2 +-
 .../src/cli/run-cli.core.pr-flow.test.ts           |   2 +-
 .../src/cli/run-cli.core.task-handoff.test.ts      |   2 +-
 .../src/cli/run-cli.core.task-hosted-close.test.ts |   2 +-
 .../src/cli/run-cli.core.tasks.doc-write.test.ts   |   2 +-
 .../src/cli/run-cli.core.tasks.export.test.ts      |   2 +-
 .../src/cli/run-cli.core.tasks.findings.test.ts    |   2 +-
 .../run-cli.core.tasks.normalize-migrate.test.ts   |   2 +-
 .../src/cli/run-cli.core.tasks.query.test.ts       |   2 +-
 .../cli/run-cli.core.tasks.scaffold-derive.test.ts |   2 +-
 .../agentplane/src/cli/run-cli.core.tasks.test.ts  |   2 +-
 packages/agentplane/src/cli/run-cli.core.test.ts   |   2 +-
 .../src/cli/run-cli.core.upgrade.test.ts           |   2 +-
 .../agentplane/src/cli/run-cli.recipes.test.ts     |   2 +-
 .../agentplane/src/cli/run-cli.scenario.test.ts    |   2 +-
 .../src/cli/run-cli.test-helpers.test.ts           |   2 +-
 .../agentplane/src/cli/run-cli.test-helpers.ts     | 909 +--------------------
 .../src/commands/guard/impl/comment-commit.test.ts |   2 +-
 .../src/commands/recipes.transaction.test.ts       |   2 +-
 .../agentplane/src/commands/release/apply.test.ts  |   2 +-
 .../agentplane/src/commands/release/plan.test.ts   |   2 +-
 .../src/commands/runtime.command.test.ts           |   2 +-
 .../src/commands/shared/task-backend.test.ts       |   2 +-
 .../src/commands/task/migrate-doc.test.ts          |   2 +-
 .../src/commands/upgrade.agent-mode.test.ts        |   2 +-
 .../src/commands/upgrade.cleanup.test.ts           |   2 +-
 .../commands/upgrade.json-merge.stability.test.ts  |   2 +-
 .../agentplane/src/commands/upgrade.merge.test.ts  |   2 +-
 .../agentplane/src/commands/upgrade.safety.test.ts |   2 +-
 .../src/commands/workflow.maintenance.test.ts      |   2 +-
 .../src/commands/workflow.task-doc.test.ts         |   2 +-
 packages/agentplane/src/commands/workflow.test.ts  |   2 +-
 .../src/commands/workflow.verify-hooks.test.ts     |   2 +-
 .../src/runner/context/task-context.test.ts        |   2 +-
 .../usecases/scenario-materialize-task.test.ts     |   2 +-
 .../src/runner/usecases/task-run-lifecycle.test.ts |   2 +-
 packages/agentplane/src/testing/cli-harness.ts     | 908 ++++++++++++++++++++
 packages/agentplane/src/testing/index.ts           |   1 +
 packages/testkit/package.json                      |   6 +-
 packages/testkit/src/cli.test.ts                   |  10 +
 packages/testkit/src/cli.ts                        |   1 +
 packages/testkit/tsconfig.json                     |   3 +-
 tsconfig.base.json                                 |   5 +-
 vitest.config.ts                                   |   5 +
 79 files changed, 1011 insertions(+), 979 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
