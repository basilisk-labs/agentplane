Task: `202608052127-XWDY4R`
Title: Keep release diagnostics on the current published target
Canonical task record: `.agentplane/tasks/202608052127-XWDY4R/README.md`

## Summary

Keep release diagnostics on the current published target

Prevent release next-action from mixing the current package/tag target with stale local release-plan SHA and hosted evidence; add regression coverage, merge the fix, and publish the verified v0.7.4 patch release.

## Scope

In scope: a consolidated post-release audit and fix set for installation and upgrade surfaces, package exports and assets, direct and branch_pr task lifecycle variants, automatic context generation and budget/safety boundaries, evaluator and provider handoffs, stale/concurrent/crash/authority recovery, release plan/evidence/idempotency diagnostics, token and latency regression, release notes/version artifacts, and one final patch publication. Out of scope: unrelated dependency upgrades, new product features, deletion of ambiguous task branches or user artifacts, and TypeScript 7 compiler migration.

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-05T21:29:23.465Z
- Branch: task/202608052127-XWDY4R/keep-release-diagnostics-on-the-current-publishe
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-conflict-rework.test.ts    | 1093 ++++++++++----------
 ...n-cli.core.task-advance-effect-recovery.test.ts |  177 ++++
 .../evaluator/evaluator-execute-supervisor.ts      |   10 +
 .../evaluator/evaluator-execute.command.test.ts    |   56 +
 .../release-evidence-collect-script.test.ts        |  211 ++++
 .../release/release-next-action-script.test.ts     |   95 +-
 .../task/branch-task-supervisor-artifact-commit.ts |   46 +
 .../task/branch-task-supervisor-episodes.ts        |   54 +-
 .../commands/task/branch-task-supervisor.test.ts   |   24 +
 .../task/external-agent-exchange-authority.ts      |   42 +-
 .../task/external-agent-planning-authority.ts      |   57 +
 .../src/commands/task/external-agent-supervisor.ts |   50 +-
 .../runner/supervisor-execution-episode.test.ts    |   35 +
 .../src/runner/supervisor-execution-episode.ts     |   43 +
 packages/core/src/schemas/index.ts                 |    1 +
 scripts/release/evidence-collect.mjs               |  305 +++++-
 scripts/release/next-action.mjs                    |   95 +-
 scripts/release/state.mjs                          |   49 +
 18 files changed, 1791 insertions(+), 652 deletions(-)
```

</details>
