## Summary

Let branch_pr finish close committed task artifacts without self-dirty failure

Fix finish --close-commit so branch_pr closeout can commit the task README and task PR artifacts that finish itself just updated, instead of failing on a self-generated dirty working tree.

## Scope

- In scope: Fix finish --close-commit so branch_pr closeout can commit the task README and task PR artifacts that finish itself just updated, instead of failing on a self-generated dirty working tree.
- Out of scope: unrelated refactors not required for "Let branch_pr finish close committed task artifacts without self-dirty failure".

## Verification

### Plan

1. In a branch_pr base checkout, run finish --close-commit for a verified task whose finish path updates the task README and PR artifacts. Expected: finish completes and creates the deterministic close commit instead of failing with Working tree is dirty.
2. Confirm the close commit stages the task README plus task PR artifacts needed for branch_pr closure. Expected: close commit records only task-scoped artifacts and leaves no unintended tracked changes.
3. Re-run closeout for 9CPEMF, RM6TDD, and C3ZHCX. Expected: all three tasks can be finished canonically after integrate without manual git restore workarounds.

### Current Status

- State: ok
- Note: Invalidated memoized git status after branch_pr PR artifact refresh so deterministic close commits see fresh task artifact changes; verified targeted guard/finish unit tests and eslint.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-09T22:58:26.918Z
- Branch: task/202604092232-YJ4245/finish-close-dirty-fix
- Head: 46ab715bc0be

```text
 .agentplane/tasks/202604092201-9CPEMF/README.md    | 143 +++++++++++++++++++++
 .../tasks/202604092201-9CPEMF/pr/diffstat.txt      |  17 +++
 .../tasks/202604092201-9CPEMF/pr/github-body.md    |  68 ++++++++++
 .../tasks/202604092201-9CPEMF/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604092201-9CPEMF/pr/meta.json |  17 +++
 .../tasks/202604092201-9CPEMF/pr/notes.jsonl       |   0
 .agentplane/tasks/202604092201-9CPEMF/pr/review.md |  75 +++++++++++
 .../tasks/202604092201-9CPEMF/pr/verify.log        |   0
 .agentplane/tasks/202604092232-YJ4245/README.md    | 117 +++++++++++++++++
 .../tasks/202604092232-YJ4245/pr/diffstat.txt      |   0
 .../tasks/202604092232-YJ4245/pr/github-body.md    |  50 +++++++
 .../tasks/202604092232-YJ4245/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604092232-YJ4245/pr/meta.json |  17 +++
 .../tasks/202604092232-YJ4245/pr/notes.jsonl       |   0
 .agentplane/tasks/202604092232-YJ4245/pr/review.md |  57 ++++++++
 .../tasks/202604092232-YJ4245/pr/verify.log        |   0
 .../src/cli/run-cli.core.incidents.test.ts         |  84 ++++++++++++
 .../agentplane/src/cli/run-cli.core.tasks.test.ts  |   2 +
 .../agentplane/src/commands/guard/impl/commands.ts |   3 +
 .../src/commands/guard/impl/commands.unit.test.ts  |   9 ++
 .../src/commands/incidents/collect.command.ts      |   6 +-
 .../agentplane/src/commands/incidents/shared.ts    |  51 +++++++-
 .../src/commands/pr/integrate/internal/finalize.ts |   2 +
 packages/agentplane/src/commands/task/finish.ts    |   4 +
 .../src/commands/task/hosted-close.command.ts      |   2 +
 .../agentplane/src/commands/task/verify-record.ts  |   2 +
 26 files changed, 719 insertions(+), 9 deletions(-)
```

</details>
