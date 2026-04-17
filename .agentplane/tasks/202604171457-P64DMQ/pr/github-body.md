## Summary

Repair DONE branch_pr artifact reconciliation after head-branch deletion

Make branch_pr normalization and doctor stop flagging shipped DONE tasks when the GitHub PR is merged but the head branch has already been deleted, and reconcile the three stale archive tasks.

## Scope

- In scope: Make branch_pr normalization and doctor stop flagging shipped DONE tasks when the GitHub PR is merged but the head branch has already been deleted, and reconcile the three stale archive tasks.
- Out of scope: unrelated refactors not required for "Repair DONE branch_pr artifact reconciliation after head-branch deletion".

## Verification

- State: ok
- Note: Doctor no longer flags DONE branch_pr drift once the task branch is gone; added regression coverage for deleted-branch artifacts.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T15:05:21.018Z
- Branch: task/202604171457-P64DMQ/repair-done-branch-pr-artifacts
- Head: c2a855d08dd7

```text
 .../agentplane/src/commands/doctor.command.test.ts | 140 ++++++++++++++++++++-
 .../src/commands/task/hosted-merge-sync.ts         |   4 +
 2 files changed, 143 insertions(+), 1 deletion(-)
```

</details>
