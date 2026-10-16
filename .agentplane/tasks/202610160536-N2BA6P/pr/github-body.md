Task: `202610160536-N2BA6P`
Title: Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree
Canonical task record: `.agentplane/tasks/202610160536-N2BA6P/README.md`

## Summary

Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree

Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround.

## Scope

- In scope: Generic AgentPlane correctness: with an explicit registered internal development base and stale primary checkout, planning and semantic intent remain bound to the internal base, while deterministic worktree.prepare must invoke Git worktree creation from the same-repository canonical primary. Validate common-dir, task/base identity, and refusal of nested/foreign topology. Add a real native lifecycle regression reproducing stale primary plus registered base. No Factory-specific logic, policy bypass, false receipts, or manual workaround.
- Out of scope: unrelated refactors not required for "Prepare branch-pr worktrees from canonical primary when execution is routed through a registered internal base worktree".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-16T06:01:07.740Z
- Branch: task/202610160536-N2BA6P/prepare-branch-pr-worktrees-from-canonical-prima
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...i.core.task-advance.worktree-resolution.test.ts | 221 ++++++++++++++++++++-
 .../src/commands/shared/worktree-topology.test.ts  |  75 ++++++-
 .../src/commands/shared/worktree-topology.ts       |  89 ++++++++-
 .../task/branch-task-supervisor-operations.test.ts |  49 ++++-
 .../task/branch-task-supervisor-operations.ts      |  29 ++-
 5 files changed, 455 insertions(+), 8 deletions(-)
```

</details>
