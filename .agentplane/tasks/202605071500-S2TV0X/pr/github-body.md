Task: `202605071500-S2TV0X`
Title: Retry cloud push batch chunks
Canonical task record: `.agentplane/tasks/202605071500-S2TV0X/README.md`

## Summary

Retry cloud push batch chunks

Make cloud push batch uploads resilient to transient fetch failures by retrying individual chunk requests before aborting the full sync.

## Scope

- In scope: Make cloud push batch uploads resilient to transient fetch failures by retrying individual chunk requests before aborting the full sync.
- Out of scope: unrelated refactors not required for "Retry cloud push batch chunks".

## Verification

- State: ok
- Note: Cloud batch chunk retry implemented and checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T02:53:00.152Z
- Branch: task/202605071500-S2TV0X/retry-cloud-batch
- Head: 61377a2f510b

```text
 .../blueprint/resolved-snapshot.json               | 386 +++++++++++++++++++++
 .../src/backends/task-backend.cloud.test.ts        |  58 ++++
 .../src/backends/task-backend/cloud-backend.ts     |  76 +++-
 3 files changed, 501 insertions(+), 19 deletions(-)
```

</details>
