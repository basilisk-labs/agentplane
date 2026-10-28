Task: `202610261945-E06QX2`
Title: Accept an authentic first-attempt unsupported required check correction with exact retained kernel proof
Canonical task record: `.agentplane/tasks/202610261945-E06QX2/README.md`

## Summary

Accept an authentic first-attempt unsupported required check correction with exact retained kernel proof

Repair generic required-check-correction validation for a native first-attempt unsupported declared check. Bind the failed WorkOrder, accepted result, validation receipt, and native validation without trusting synthetic state. Preserve rejection of forged proofs and executable check failures.

## Scope

- In scope: Repair generic required-check-correction validation for a native first-attempt unsupported declared check. Bind the failed WorkOrder, accepted result, validation receipt, and native validation without trusting synthetic state. Preserve rejection of forged proofs and executable check failures.
- Out of scope: unrelated refactors not required for "Accept an authentic first-attempt unsupported required check correction with exact retained kernel proof".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-26T20:26:35.434Z
- Branch: task/202610261945-E06QX2/accept-an-authentic-first-attempt-unsupported-re
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/core/src/tasks/task-kernel/kernel.ts      |  43 +++++--
 .../task-kernel/required-check-correction.test.ts  | 142 ++++++++++++++++++---
 2 files changed, 155 insertions(+), 30 deletions(-)
```

</details>
