Task: `202605221726-QRQFM9`
Title: Promote MERGED_PENDING_CLOSE to first-class task state
Canonical task record: `.agentplane/tasks/202605221726-QRQFM9/README.md`

## Summary

Promote MERGED_PENDING_CLOSE to first-class task state

Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work.

## Scope

- In scope: Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work.
- Out of scope: unrelated refactors not required for "Promote MERGED_PENDING_CLOSE to first-class task state".

## Verification

- State: ok
- Note:

```text
Evaluator check: projection tests cover task list/search/next; release readiness now has a distinct
MERGED_PENDING_CLOSE failure path, while DONE remains unchanged and still requires hosted close
metadata.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T23:52:55.420Z
- Branch: task/202605221726-QRQFM9/merged-pending-close-state
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../release/task-registry-ready-script.test.ts     | 46 +++++++++++++++++++++-
 scripts/checks/check-task-state.mjs                | 34 +++++++++++++++-
 2 files changed, 77 insertions(+), 3 deletions(-)
```

</details>
