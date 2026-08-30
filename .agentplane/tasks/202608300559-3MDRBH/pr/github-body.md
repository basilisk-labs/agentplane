Task: `202608300559-3MDRBH`
Title: Preserve semantic conflict resolutions in evaluator target selection
Canonical task record: `.agentplane/tasks/202608300559-3MDRBH/README.md`

## Summary

Preserve semantic conflict resolutions in evaluator target selection

Fix the reproduced review-target defect that skips every base-sync merge when an older evaluated SHA exists. Distinguish a clean automatic base synchronization from a semantic conflict resolution, keep semantic merge changes inside the exact reviewed implementation identity, and add a regression using real Git merge parents. This bootstrap blocks fresh qualification of AP-RUNTIME-001 PR #5880 after resolution commit 26b69b0fe. Preserve evidence and task state; never hand-edit quality receipts or weaken freshness checks.

## Scope

- In scope: Fix the reproduced review-target defect that skips every base-sync merge when an older evaluated SHA exists. Distinguish a clean automatic base synchronization from a semantic conflict resolution, keep semantic merge changes inside the exact reviewed implementation identity, and add a regression using real Git merge parents. This bootstrap blocks fresh qualification of AP-RUNTIME-001 PR #5880 after resolution commit 26b69b0fe. Preserve evidence and task state; never hand-edit quality receipts or weaken freshness checks.
- Out of scope: unrelated refactors not required for "Preserve semantic conflict resolutions in evaluator target selection".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T06:43:40.429Z
- Branch: task/202608300559-3MDRBH/preserve-semantic-conflict-resolutions-in-evalua
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/quality-review-merge.ts    |  59 ++++++++
 .../commands/shared/quality-review-target.test.ts  | 160 +++++++++++++++++++++
 .../src/commands/shared/quality-review-target.ts   |  21 +++
 3 files changed, 240 insertions(+)
```

</details>
