Task: `202610080929-405MZ2`
Title: Retry task-local stable snapshot drift during competing controller reads
Canonical task record: `.agentplane/tasks/202610080929-405MZ2/README.md`

## Summary

Retry task-local stable snapshot drift during competing controller reads

Repair the genuine release 0.7.13 hosted CI blocker observed in PR6065 run37754884982 at ff669b6d09067e87e98a9cfa5fad6459c281d874: kernel-task-lifecycle.test.ts grants one dispatch across competing local controllers fails when atomic README replacement occurs between lstat and open. KernelBackendAdapter.read already performs bounded retries but recognizes only the older task-specific changed-path error. Extend only the adapter retry classifier to exact task-specific stable-snapshot drift errors. Preserve full containment/no-follow/regular-file/size/parser checks on every fresh attempt and current retry bound; do not weaken stable-file security or swallow unrelated failures. Add deterministic before-read/while-read drift, exhaustion and symlink/nonregular/oversize/parser/foreign-task negative regressions in adapter tests. Keep existing real contention test unchanged and include it in focused validation. User authorizes all necessary release repairs, validation and main integration. Preserve actual hosted failure and mandatory full CI/hosted gates.

## Scope

- In scope: Repair the genuine release 0.7.13 hosted CI blocker observed in PR6065 run37754884982 at ff669b6d09067e87e98a9cfa5fad6459c281d874: kernel-task-lifecycle.test.ts grants one dispatch across competing local controllers fails when atomic README replacement occurs between lstat and open. KernelBackendAdapter.read already performs bounded retries but recognizes only the older task-specific changed-path error. Extend only the adapter retry classifier to exact task-specific stable-snapshot drift errors. Preserve full containment/no-follow/regular-file/size/parser checks on every fresh attempt and current retry bound; do not weaken stable-file security or swallow unrelated failures. Add deterministic before-read/while-read drift, exhaustion and symlink/nonregular/oversize/parser/foreign-task negative regressions in adapter tests. Keep existing real contention test unchanged and include it in focused validation. User authorizes all necessary release repairs, validation and main integration. Preserve actual hosted failure and mandatory full CI/hosted gates.
- Out of scope: unrelated refactors not required for "Retry task-local stable snapshot drift during competing controller reads".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-08T09:42:27.858Z
- Branch: task/202610080929-405MZ2/retry-task-local-stable-snapshot-drift-during-co
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-backend/kernel-backend-adapter.test.ts    | 45 ++++++++++++++++++++++
 .../task-backend/kernel-backend-adapter.ts         | 12 +++++-
 2 files changed, 55 insertions(+), 2 deletions(-)
```

</details>
