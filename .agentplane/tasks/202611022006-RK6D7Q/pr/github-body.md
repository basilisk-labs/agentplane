Task: `202611022006-RK6D7Q`
Title: Preserve quarantine proof across commit recovery
Canonical task record: `.agentplane/tasks/202611022006-RK6D7Q/README.md`

## Summary

Preserve quarantine proof across commit recovery

Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from implementation92392374a299acca735c2331bc63d9bae4c84866, preserve PR6969 and all historical Task/evidence, and fix reviewed post-commit recovery bypass PRRT_kwDORCLmJM6y1t5j. No old Task execution or DONE/PASS assignment; data, credentials and runtime guards remain preserved.

## Scope

- In scope: Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from implementation92392374a299acca735c2331bc63d9bae4c84866, preserve PR6969 and all historical Task/evidence, and fix reviewed post-commit recovery bypass PRRT_kwDORCLmJM6y1t5j. No old Task execution or DONE/PASS assignment; data, credentials and runtime guards remain preserved.
- Out of scope: unrelated refactors not required for "Preserve quarantine proof across commit recovery".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-11-02T20:19:24.720Z
- Branch: task/202611022006-RK6D7Q/preserve-quarantine-proof-across-commit-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../branch-task-artifact-ownership.test.ts         |  61 ++
 .../pr/internal/branch-task-artifact-ownership.ts  |  29 +-
 .../native-quarantine-artifact-proof.test.ts       | 192 ++++++
 .../shared/native-quarantine-artifact-proof.ts     | 325 +++++++++
 ...ernel-repository-coordinator-quarantine.test.ts | 747 +++++++++++++++++++++
 .../task/kernel-repository-coordinator.test.ts     |   6 +
 .../commands/task/kernel-repository-coordinator.ts |  57 +-
 7 files changed, 1406 insertions(+), 11 deletions(-)
```

</details>
