Task: `202610241441-K30QXX`
Title: Retire drifted unanswered read-only supervisor intent with valid verification
Canonical task record: `.agentplane/tasks/202610241441-K30QXX/README.md`

## Summary

Retire drifted unanswered read-only supervisor intent with valid verification

Recover a stale issued or prepared read-only task-worktree observation after task-state drift only when exact supervisor intent identity matches and no result exists. Preserve current-boundary, result-present and mutation-capable behavior. Reuse the independently reviewed two-file implementation from blocked task 202610241410-R84RC3 under new native worktree authority; its mandatory lint:ci check does not exist. Native plan must use valid focused tests, lint:core and ci:local:full.

## Scope

- In scope: Recover a stale issued or prepared read-only task-worktree observation after task-state drift only when exact supervisor intent identity matches and no result exists. Preserve current-boundary, result-present and mutation-capable behavior. Reuse the independently reviewed two-file implementation from blocked task 202610241410-R84RC3 under new native worktree authority; its mandatory lint:ci check does not exist. Native plan must use valid focused tests, lint:core and ci:local:full.
- Out of scope: unrelated refactors not required for "Retire drifted unanswered read-only supervisor intent with valid verification".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run lint:core
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-24T17:29:04.845Z
- Branch: task/202610241441-K30QXX/retire-drifted-unanswered-read-only-supervisor-i
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../external-agent-read-only-observation.test.ts   | 213 ++++++++++++++++++++-
 .../task/external-agent-supervisor-recovery.ts     | 118 +++++++-----
 2 files changed, 283 insertions(+), 48 deletions(-)
```

</details>
