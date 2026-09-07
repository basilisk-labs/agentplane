Task: `202609071413-GESADH`
Title: Repair evaluator review identity for interleaved task artifact commits in GitHub issue #5892
Canonical task record: `.agentplane/tasks/202609071413-GESADH/README.md`

## Summary

Repair evaluator review identity for interleaved task artifact commits in GitHub issue #5892

User approved testing and sequential fixes for the seven audited open GitHub issues, with issue comments and closure after verified resolution. Handle issue #5892 first. Reproduce a verified direct task A evaluated while HEAD contains only task B artifacts. Define a coherent reviewed SHA contract, prevent a recorded passing review with missing identity, preserve implementation versus review snapshot semantics, and cover evaluator to normal finish behavior without force or fabricated commits. Preserve unrelated work. Other issues remain follow-up work; do not expand this implementation to them.

## Scope

- In scope: User approved testing and sequential fixes for the seven audited open GitHub issues, with issue comments and closure after verified resolution. Handle issue #5892 first. Reproduce a verified direct task A evaluated while HEAD contains only task B artifacts. Define a coherent reviewed SHA contract, prevent a recorded passing review with missing identity, preserve implementation versus review snapshot semantics, and cover evaluator to normal finish behavior without force or fabricated commits. Preserve unrelated work. Other issues remain follow-up work; do not expand this implementation to them.
- Out of scope: unrelated refactors not required for "Repair evaluator review identity for interleaved task artifact commits in GitHub issue #5892".

## Verification

- State: needs_rework
- Note:

```text
Rework required: GitHub verify-contract failed because new direct regressions pushed two existing
test files over the oversized-test budget. Move the direct cases to the already approved
direct-closeout suite and rerun the unchanged declared checks.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T14:25:59.378Z
- Branch: task/202609071413-GESADH/repair-evaluator-review-identity-for-interleaved
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...cli.core.route-decision.direct-closeout.test.ts | 225 ++++++++++++++++++++-
 .../commands/evaluator/evaluator-review-apply.ts   |   8 +
 .../evaluator/evaluator-run.command.test.ts        |  34 ----
 .../src/commands/shared/quality-review-target.ts   |   5 +
 4 files changed, 237 insertions(+), 35 deletions(-)
```

</details>
