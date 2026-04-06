# PR Review

Created: 2026-04-06T19:52:25.011Z
Branch: task/202604061916-40FZNK/stale-open-pr-doctor

## Summary

Detect stale open PR drift for DONE tasks

Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.

## Scope

- In scope: Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.
- Out of scope: unrelated refactors not required for "Detect stale open PR drift for DONE tasks".

## Verification

### Plan

1. Run `bun test packages/agentplane/src/commands/doctor.command.test.ts -t "warns when a DONE branch_pr task still has open PR artifacts"`. Expected: the targeted doctor regression test passes and the warning text mentions stale open PR artifacts for DONE tasks.
2. Run `bun x eslint packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts`. Expected: lint exits 0.
3. Run `agentplane doctor` in a branch_pr repo with unreconciled DONE PR metadata. Expected: doctor surfaces a warning before operators drift into manual GitHub cleanup.

### Current Status

- State: ok
- Note: Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch.

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

- Updated: 2026-04-06T19:56:13.883Z
- Branch: task/202604061916-40FZNK/stale-open-pr-doctor
- Head: 7ffa4648de0a

```text
 .agentplane/tasks/202604061916-40FZNK/README.md    | 127 +++++++++++++++
 .../tasks/202604061916-40FZNK/pr/diffstat.txt      |   0
 .../tasks/202604061916-40FZNK/pr/github-body.md    |  52 ++++++
 .../tasks/202604061916-40FZNK/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604061916-40FZNK/pr/meta.json |  14 ++
 .../tasks/202604061916-40FZNK/pr/notes.jsonl       |   0
 .agentplane/tasks/202604061916-40FZNK/pr/review.md |  59 +++++++
 .../tasks/202604061916-40FZNK/pr/verify.log        |   0
 .../agentplane/src/commands/doctor.command.test.ts | 180 +++++++++++++++++++++
 packages/agentplane/src/commands/doctor.run.ts     |   6 +-
 .../agentplane/src/commands/doctor/branch-pr.ts    |  62 ++++++-
 .../src/commands/task/hosted-merge-sync.ts         |  47 ++++++
 12 files changed, 546 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
