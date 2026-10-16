Task: `202610160558-WCR70H`
Title: Match operational review projections to normalized Task readback
Canonical task record: `.agentplane/tasks/202610160558-WCR70H/README.md`

## Summary

Match operational review projections to normalized Task readback

Repair the reproduced recovery loop where canonical accepted evaluator findings retain trailing whitespace but Task compatibility readback trims strings. Normalize only the expected compatibility quality-review representation with the existing backend normalizer before comparison; preserve raw accepted EVAL, reports, projection and review/authority identity digests. Extend the two nearest projection/recovery tests to prove LF and whitespace readback idempotence, restored then unchanged recovery and strict changed-field rejection. Preserve existing completed source and native history. No Factory task/controller/runtime publication changes.

## Scope

- In scope: Repair the reproduced recovery loop where canonical accepted evaluator findings retain trailing whitespace but Task compatibility readback trims strings. Normalize only the expected compatibility quality-review representation with the existing backend normalizer before comparison; preserve raw accepted EVAL, reports, projection and review/authority identity digests. Extend the two nearest projection/recovery tests to prove LF and whitespace readback idempotence, restored then unchanged recovery and strict changed-field rejection. Preserve existing completed source and native history. No Factory task/controller/runtime publication changes.
- Out of scope: unrelated refactors not required for "Match operational review projections to normalized Task readback".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-16T06:32:54.426Z
- Branch: task/202610160558-WCR70H/match-operational-review-projections-to-normaliz
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../kernel-operational-projection-recovery.test.ts | 209 ++++++++++++++++++++-
 .../task/kernel-operational-projection.test.ts     |  99 ++++++++++
 .../commands/task/kernel-operational-projection.ts |  25 +--
 3 files changed, 321 insertions(+), 12 deletions(-)
```

</details>
