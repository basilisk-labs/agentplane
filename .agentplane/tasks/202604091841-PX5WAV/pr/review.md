# PR Review

Created: 2026-04-09T18:59:43.960Z
Branch: task/202604091841-PX5WAV/tracked-closure-state

## Summary

Persist merged branch_pr task closure state onto main

Make merged branch_pr tasks land in tracked main history as DONE with reconciled PR metadata, so pulling origin/main does not reopen them as DOING or require local normalize dirt.

## Scope

- In scope: Make merged branch_pr tasks land in tracked main history as DONE with reconciled PR metadata, so pulling origin/main does not reopen them as DOING or require local normalize dirt.
- Out of scope: unrelated refactors not required for "Persist merged branch_pr task closure state onto main".

## Verification

### Plan

1. Reproduce the stale branch_pr closure state with a focused fixture or regression harness. Expected: the current code shows how merged tasks can remain DOING or OPEN on main after pull.
2. Run the fixed closure or reconciliation path. Expected: tracked task README and pr/meta land as DONE and MERGED in repository history instead of only in local normalize output.
3. Run targeted task-list/doctor or reconcile regressions plus eslint. Expected: the affected merged tasks no longer reappear as DOING on main and the touched checks exit 0.

### Current Status

- State: ok
- Note: Verified that task hosted-close-pr accepts multiple task ids, with targeted hosted-close regressions and a live batch run that opened closure PRs #215-#219 for the current stale merged tasks.

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

- Updated: 2026-04-09T19:08:30.603Z
- Branch: task/202604091841-PX5WAV/tracked-closure-state
- Head: 8c719b6b998c

```text
 .agentplane/tasks/202604091841-PX5WAV/README.md    | 129 +++++++++++++++++++++
 .../tasks/202604091841-PX5WAV/pr/diffstat.txt      |   3 +
 .../tasks/202604091841-PX5WAV/pr/github-body.md    |  50 ++++++++
 .../tasks/202604091841-PX5WAV/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091841-PX5WAV/pr/meta.json |  14 +++
 .../tasks/202604091841-PX5WAV/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091841-PX5WAV/pr/review.md |  57 +++++++++
 .../tasks/202604091841-PX5WAV/pr/verify.log        |   0
 .../commands/task/hosted-close-pr.command.test.ts  |  34 ++++++
 .../src/commands/task/hosted-close-pr.command.ts   |  48 +++++---
 10 files changed, 322 insertions(+), 14 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
