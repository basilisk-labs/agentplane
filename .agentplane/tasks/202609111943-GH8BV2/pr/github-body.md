Task: `202609111943-GH8BV2`
Title: Allow an approved repository-effect-only scope extension to recover a legacy execution contract with empty scope root...
Canonical task record: `.agentplane/tasks/202609111943-GH8BV2/README.md`

## Summary

Allow an approved repository-effect-only scope extension to recover a legacy execution contract with empty scope roots without widening repository paths

Reproduce the blocked recovery from task 202609111417-V1737V: the supervisor emits an exact scope extension containing repository_effects=[tests] and scope_roots=[], but task scope extend fails with 'Execution declaration with repository effects requires scope_roots.' Preserve exact request matching and fail-closed authority. Implement the smallest safe legacy-compatibility path and regression coverage, then use it to resume the blocked task.

## Scope

- In scope: Reproduce the blocked recovery from task 202609111417-V1737V: the supervisor emits an exact scope extension containing repository_effects=[tests] and scope_roots=[], but task scope extend fails with 'Execution declaration with repository effects requires scope_roots.' Preserve exact request matching and fail-closed authority. Implement the smallest safe legacy-compatibility path and regression coverage, then use it to resume the blocked task.
- Out of scope: unrelated refactors not required for "Allow an approved repository-effect-only scope extension to recover a legacy execution contract with empty scope roots without widening repository paths".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-11T20:01:18.988Z
- Branch: task/202609111943-GH8BV2/allow-an-approved-repository-effect-only-scope-e
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/task/scope-extend.ts   |  1 +
 .../src/runtime/task-routing/resolve.test.ts       | 35 ++++++++++++++++++++++
 .../agentplane/src/runtime/task-routing/resolve.ts | 11 +++++--
 3 files changed, 45 insertions(+), 2 deletions(-)
```

</details>
