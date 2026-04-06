# PR Review

Created: 2026-04-06T19:44:19.445Z
Branch: task/202604061916-2860KH/branch-pr-incidents

## Summary

Promote incidents during branch_pr integrate and hosted-close

Make branch_pr closure paths promote reusable external incidents into .agentplane/policy/incidents.md the same way direct finish already does, and lock the behavior with tests.

## Scope

- In scope: Make branch_pr closure paths promote reusable external incidents into .agentplane/policy/incidents.md the same way direct finish already does, and lock the behavior with tests.
- Out of scope: unrelated refactors not required for "Promote incidents during branch_pr integrate and hosted-close".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts -t "treats \.agentplane/policy as an allow-policy prefix|classifies incidents registry under \.agentplane/policy as policy|promotes structured external incident candidates into the incident registry|task hosted-close closes a merged branch_pr task exactly once"`. Expected: all targeted tests pass, proving policy classification plus direct/integrate/hosted-close incident promotion.
2. Run `bun x eslint packages/agentplane/src/shared/protected-paths.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: lint exits 0.
3. Run `agentplane task show 202604061916-2860KH` after `bun run framework:dev:bootstrap`. Expected: repo-local runtime is current and the task artifacts remain loadable for branch_pr publication.

### Current Status

- State: ok
- Note: Full test:fast passed after fixing finalize integrate mock coverage for the incidents path; targeted vitest and eslint for incidents/protected-paths remain green.

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

- Updated: 2026-04-06T20:09:35.646Z
- Branch: task/202604061916-2860KH/branch-pr-incidents
- Head: 10fe64e955bf

```text
 .agentplane/tasks/202604061916-2860KH/README.md    | 145 +++++++++++++++++++++
 .../tasks/202604061916-2860KH/pr/diffstat.txt      |  18 +++
 .../tasks/202604061916-2860KH/pr/github-body.md    |  67 ++++++++++
 .../tasks/202604061916-2860KH/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604061916-2860KH/pr/meta.json |  14 ++
 .../tasks/202604061916-2860KH/pr/notes.jsonl       |   0
 .agentplane/tasks/202604061916-2860KH/pr/review.md |  74 +++++++++++
 .../tasks/202604061916-2860KH/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts | 113 ++++++++++++++++
 .../src/cli/run-cli.core.task-hosted-close.test.ts |  44 +++++++
 .../agentplane/src/commands/guard/impl/commands.ts |   5 +-
 .../pr/integrate/internal/finalize.test.ts         |  21 +++
 .../src/commands/pr/integrate/internal/finalize.ts |  13 ++
 .../agentplane/src/commands/task/finish-shared.ts  |   3 +-
 packages/agentplane/src/commands/task/finish.ts    |   1 +
 .../src/commands/task/hosted-close.command.ts      |  13 ++
 .../agentplane/src/shared/protected-paths.test.ts  |  25 ++++
 packages/agentplane/src/shared/protected-paths.ts  |   2 +
 18 files changed, 556 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
