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

- State: ok
- Note:

```text
Evaluator reruns now preserve an ancestral reviewed SHA across managed quality, PR, blueprint, and
README advances while still selecting new task-local or code work. Focused 2/12, targeted 10/133,
typecheck, lint, ci:contract, test:fast 364/2157, policy routing, and doctor passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T10:49:25.932Z
- Branch: task/202607100436-D7QB76/anchor-evaluator-reviews-for-metadata-only-tasks
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator/evaluator-run.command.test.ts        | 154 +++++++++++++++++++--
 .../src/commands/evaluator/evaluator.command.ts    |  44 +++++-
 .../task/finish.quality-review-target.unit.test.ts |  33 +++++
 3 files changed, 219 insertions(+), 12 deletions(-)
```

</details>
