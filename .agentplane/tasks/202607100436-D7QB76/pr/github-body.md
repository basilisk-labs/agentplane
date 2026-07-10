Task: `202607100436-D7QB76`
Title: Anchor evaluator reviews for metadata-only tasks
Canonical task record: `.agentplane/tasks/202607100436-D7QB76/README.md`

## Summary

Anchor evaluator reviews for metadata-only tasks

For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit.

## Scope

- In scope: For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit.
- Out of scope: unrelated refactors not required for "Anchor evaluator reviews for metadata-only tasks".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T10:34:39.342Z
- Branch: task/202607100436-D7QB76/anchor-evaluator-reviews-for-metadata-only-tasks
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-run.command.test.ts        | 96 +++++++++++++++++++---
 .../src/commands/evaluator/evaluator.command.ts    | 14 +++-
 .../task/finish.quality-review-target.unit.test.ts | 33 ++++++++
 3 files changed, 131 insertions(+), 12 deletions(-)
```

</details>
