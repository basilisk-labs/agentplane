# PR Review

Created: 2026-04-09T23:54:20.222Z
Branch: task/202604092339-VSV0CZ/idempotent-finish-retry

## Summary

Make finish closeout idempotent after partial DONE retries

If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit.

## Scope

- In scope: If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit.
- Out of scope: unrelated refactors not required for "Make finish closeout idempotent after partial DONE retries".

## Verification

### Plan

1. Simulate a finish path where task status flips to DONE but close commit creation fails. Expected: the task metadata reflects a single DONE transition.
2. Rerun finish --force for the same task/result after clearing the blocking condition. Expected: the close commit is created without duplicate DONE comments or duplicate status events.
3. Run targeted regression tests. Expected: retrying closeout is idempotent while distinct finish inputs still append the expected new metadata.

### Current Status

- State: ok
- Note: Verified: targeted finish retry unit tests and eslint passed for idempotent DONE closeout handling.

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

- Updated: 2026-04-09T23:59:21.088Z
- Branch: task/202604092339-VSV0CZ/idempotent-finish-retry
- Head: 79615659a8c5

```text
 .agentplane/tasks/202604092339-VSV0CZ/README.md    | 117 +++++++++++++++++++++
 .../tasks/202604092339-VSV0CZ/pr/diffstat.txt      |   0
 .../tasks/202604092339-VSV0CZ/pr/github-body.md    |  50 +++++++++
 .../tasks/202604092339-VSV0CZ/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604092339-VSV0CZ/pr/meta.json |  14 +++
 .../tasks/202604092339-VSV0CZ/pr/notes.jsonl       |   0
 .agentplane/tasks/202604092339-VSV0CZ/pr/review.md |  57 ++++++++++
 .../tasks/202604092339-VSV0CZ/pr/verify.log        |   0
 .../agentplane/src/commands/task/finish-shared.ts  |  56 ++++++++++
 .../src/commands/task/finish.unit.test.ts          |  93 ++++++++++++++++
 10 files changed, 388 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
