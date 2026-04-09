# PR Review

Created: 2026-04-09T13:11:17.142Z
Branch: task/202604091257-AD043V/hosted-close-open-pr

## Summary

Add helper to open pending hosted-close PRs from task-close branches

Add a first-class command that opens the protected-main closure PR from an existing remote task-close branch when GitHub Actions can only leave a manual handoff comment.

## Scope

- In scope: Add a first-class command that opens the protected-main closure PR from an existing remote task-close branch when GitHub Actions can only leave a manual handoff comment.
- Out of scope: unrelated refactors not required for "Add helper to open pending hosted-close PRs from task-close branches".

## Verification

### Plan

1. Simulate a merged task PR with an existing remote task-close branch and no open closure PR. Expected: the new helper opens the correct protected-main closure PR.
2. Run focused command tests for title/body resolution and already-open/no-branch cases. Expected: the helper is deterministic and rejects inconsistent state clearly.
3. Run relevant lint/tests. Expected: command help and GitHub interaction paths remain valid.

### Current Status

- State: ok
- Note: Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted wait-remote/task-hosted-close coverage for the hosted-close PR helper path.

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

- Updated: 2026-04-09T14:21:06.178Z
- Branch: task/202604091257-AD043V/hosted-close-open-pr
- Head: 12fac7c77362

```text
 .agentplane/tasks/202604091257-AD043V/README.md    | 118 +++++++
 .../tasks/202604091257-AD043V/pr/diffstat.txt      |   0
 .../tasks/202604091257-AD043V/pr/github-body.md    |  50 +++
 .../tasks/202604091257-AD043V/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091257-AD043V/pr/meta.json |  17 +
 .../tasks/202604091257-AD043V/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091257-AD043V/pr/review.md |  57 +++
 .../tasks/202604091257-AD043V/pr/verify.log        |   0
 docs/user/cli-reference.generated.mdx              |  30 ++
 .../run-cli.core.help-snap.test.ts.snap            |   2 +
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 310 ++++++++++++++++-
 .../src/cli/run-cli/command-catalog/task.ts        |   6 +
 .../src/commands/task/hosted-close-pr.command.ts   | 384 +++++++++++++++++++++
 packages/agentplane/src/commands/task/index.ts     |   4 +
 .../agentplane/src/commands/task/task.command.ts   |   4 +
 15 files changed, 982 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
