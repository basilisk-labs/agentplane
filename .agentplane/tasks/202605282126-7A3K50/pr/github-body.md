Task: `202605282126-7A3K50`
Title: PR integrate merge strategy decomposition
Canonical task record: `.agentplane/tasks/202605282126-7A3K50/README.md`

## Summary

PR integrate merge strategy decomposition

Decompose packages/agentplane/src/commands/pr/integrate/internal/merge.ts into focused merge strategy helper modules without changing squash merge, merge commit, rebase fast-forward, task artifact collision handling, integration mutation lock behavior, or verify execution semantics. Reduce the merge strategy file below the hotspot warning threshold when safe.

## Scope

- In scope: Decompose packages/agentplane/src/commands/pr/integrate/internal/merge.ts into focused merge strategy helper modules without changing squash merge, merge commit, rebase fast-forward, task artifact collision handling, integration mutation lock behavior, or verify execution semantics. Reduce the merge strategy file below the hotspot warning threshold when safe.
- Out of scope: unrelated refactors not required for "PR integrate merge strategy decomposition".

## Verification

- State: ok
- Note: PR integrate merge strategy decomposition verified locally.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T21:26:47.182Z
- Branch: task/202605282126-7A3K50/pr-integrate-merge-strategy-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../pr/integrate/internal/merge-artifacts.ts       | 106 ++++++++++
 .../pr/integrate/internal/merge-mutation.ts        | 115 +++++++++++
 .../src/commands/pr/integrate/internal/merge.ts    | 218 +--------------------
 3 files changed, 223 insertions(+), 216 deletions(-)
```

</details>
