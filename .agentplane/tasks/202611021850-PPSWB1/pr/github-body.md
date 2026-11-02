Task: `202611021850-PPSWB1`
Title: Publish retry-safe exact native quarantine artifacts
Canonical task record: `.agentplane/tasks/202611021850-PPSWB1/README.md`

## Summary

Publish retry-safe exact native quarantine artifacts

Complete the user-approved exact seven-file quarantine publication for sb. Port immutable approved source89f99678 and fix verified review PRRT_kwDORCLmJM6yyPJy. Preserve old completed Task, PR6968, data, credentials and guards. No historical Task execution or DONE/PASS assignment.

## Scope

- In scope: Complete the user-approved exact seven-file quarantine publication for sb. Port immutable approved source89f99678 and fix verified review PRRT_kwDORCLmJM6yyPJy. Preserve old completed Task, PR6968, data, credentials and guards. No historical Task execution or DONE/PASS assignment.
- Out of scope: unrelated refactors not required for "Publish retry-safe exact native quarantine artifacts".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-11-02T19:03:17.300Z
- Branch: task/202611021850-PPSWB1/publish-retry-safe-exact-native-quarantine-artif
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../branch-task-artifact-ownership.test.ts         |  61 +++
 .../pr/internal/branch-task-artifact-ownership.ts  |  29 +-
 .../native-quarantine-artifact-proof.test.ts       | 192 +++++++
 .../shared/native-quarantine-artifact-proof.ts     | 325 ++++++++++++
 ...ernel-repository-coordinator-quarantine.test.ts | 578 +++++++++++++++++++++
 .../task/kernel-repository-coordinator.test.ts     |   6 +
 .../commands/task/kernel-repository-coordinator.ts |  42 +-
 7 files changed, 1222 insertions(+), 11 deletions(-)
```

</details>
