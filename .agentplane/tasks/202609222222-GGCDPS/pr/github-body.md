Task: `202609222222-GGCDPS`
Title: Run canonical post-completion integration operations from the authoritative base checkout
Canonical task record: `.agentplane/tasks/202609222222-GGCDPS/README.md`

## Summary

Run canonical post-completion integration operations from the authoritative base checkout

Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations.

## Scope

- In scope: Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations.
- Out of scope: unrelated refactors not required for "Run canonical post-completion integration operations from the authoritative base checkout".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-22T22:31:00.808Z
- Branch: task/202609222222-GGCDPS/canonical-integration-base-checkout
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/commands/task/ordinary-advance-step.ts     | 7 ++++++-
 .../agentplane/src/commands/task/roadmap-advance-one-step.test.ts  | 4 +++-
 2 files changed, 9 insertions(+), 2 deletions(-)
```

</details>
