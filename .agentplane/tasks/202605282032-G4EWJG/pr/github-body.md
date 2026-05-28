Task: `202605282032-G4EWJG`
Title: Guard commit implementation decomposition
Canonical task record: `.agentplane/tasks/202605282032-G4EWJG/README.md`

## Summary

Guard commit implementation decomposition

Decompose packages/agentplane/src/commands/guard/impl/commit.ts into smaller focused modules without changing guard behavior. Preserve existing command contracts, keep public exports stable, and verify with targeted guard tests plus typecheck/lint/hotspot checks.

## Scope

- In scope: Decompose packages/agentplane/src/commands/guard/impl/commit.ts into smaller focused modules without changing guard behavior. Preserve existing command contracts, keep public exports stable, and verify with targeted guard tests plus typecheck/lint/hotspot checks.
- Out of scope: unrelated refactors not required for "Guard commit implementation decomposition".

## Verification

- State: ok
- Note: Guard commit decomposition verified locally.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T20:32:58.005Z
- Branch: task/202605282032-G4EWJG/guard-commit-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/guard/impl/commit-close.ts        | 231 +++++++++++++
 .../src/commands/guard/impl/commit-runner.ts       | 150 ++++++++
 .../agentplane/src/commands/guard/impl/commit.ts   | 376 +--------------------
 3 files changed, 387 insertions(+), 370 deletions(-)
```

</details>
