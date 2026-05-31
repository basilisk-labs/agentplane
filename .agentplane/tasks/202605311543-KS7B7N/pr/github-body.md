Task: `202605311543-KS7B7N`
Title: Detect landed included tasks in route oracle
Canonical task record: `.agentplane/tasks/202605311543-KS7B7N/README.md`

## Batch Tasks

- Primary: `202605311543-KS7B7N`
- Closure policy: `all_or_fail`
- Included: `202605311543-0VPDRD`
- Included: `202605311543-3H1G55`
- Included: `202605311543-6N3TMM`
- Included: `202605311543-NWXTSG`
- Included: `202605311543-QH9XXK`
- Included: `202605311543-R282E5`
- Included: `202605311543-SCWWPR`
- Included: `202605311543-SEMKC7`

## Summary

Detect landed included tasks in route oracle

Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.

## Scope

- In scope: Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.
- Out of scope: unrelated refactors not required for "Detect landed included tasks in route oracle".

## Verification

- State: ok
- Note:

```text
Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run
--filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs;
bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR
open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now
resolves to included_task_closure_needed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-31T15:53:25.815Z
- Branch: task/202605311543-KS7B7N/release-recovery-cli-improvements
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/workflow.branch_pr.md           |   6 +-
 .agentplane/tasks/202605311543-0VPDRD/README.md    | 175 +++++++
 .../blueprint/resolved-snapshot.json               | 577 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  24 +
 .agentplane/tasks/202605311543-3H1G55/README.md    | 175 +++++++
 .../blueprint/resolved-snapshot.json               | 577 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  24 +
 .agentplane/tasks/202605311543-6N3TMM/README.md    | 175 +++++++
 .../blueprint/resolved-snapshot.json               | 577 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  24 +
 .agentplane/tasks/202605311543-NWXTSG/README.md    | 175 +++++++
 .../blueprint/resolved-snapshot.json               | 577 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  24 +
 .agentplane/tasks/202605311543-QH9XXK/README.md    | 175 +++++++
 .../blueprint/resolved-snapshot.json               | 402 ++++++++++++++
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  24 +
 .agentplane/tasks/202605311543-R282E5/README.md    | 175 +++++++
 .../blueprint/resolved-snapshot.json               | 577 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  24 +
 .agentplane/tasks/202605311543-SCWWPR/README.md    | 175 +++++++
 .../blueprint/resolved-snapshot.json               | 577 +++++++++++++++++++++
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  24 +
 .agentplane/tasks/202605311543-SEMKC7/README.md    | 177 +++++++
 .../blueprint/resolved-snapshot.json               | 440 ++++++++++++++++
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 +++
 .../quality-report.json                            |  24 +
 .../agentplane/assets/policy/workflow.branch_pr.md |   6 +-
 .../run-cli.core.help-snap.test.ts.snap            |   5 +
 .../src/cli/run-cli/command-catalog/core.ts        |   8 +
 .../src/cli/run-cli/command-loaders/core.ts        |   4 +
 .../src/commands/branch/cleanup-merged.ts          |  51 +-
 .../src/commands/cleanup/merged.command.ts         |  18 +
 .../src/commands/evaluator/evaluator.command.ts    |   1 +
 .../agentplane/src/commands/finish.spec.shared.ts  |   5 +
 packages/agentplane/src/commands/finish.spec.ts    |  10 +-
 packages/agentplane/src/commands/pr/check.ts       |  53 ++
 .../src/commands/pr/internal/sync-github.ts        |  50 +-
 .../commands/release/tasks-reconcile.command.ts    |  64 +++
 .../src/commands/shared/merged-branch-cleanup.ts   |  54 +-
 .../commands/shared/route-decision-next-action.ts  |  30 ++
 .../src/commands/shared/route-decision.ts          |  10 +
 .../agentplane/src/commands/shared/route-oracle.ts |   9 +-
 .../src/commands/task/finish-execute-close.ts      |   1 +
 .../src/commands/task/finish-execute-commit.ts     |   9 +
 .../agentplane/src/commands/task/finish-execute.ts |   4 +-
 .../agentplane/src/commands/task/finish-shared.ts  |  12 +
 .../agentplane/src/commands/task/finish-types.ts   |   1 +
 62 files changed, 7036 insertions(+), 41 deletions(-)
```

</details>
