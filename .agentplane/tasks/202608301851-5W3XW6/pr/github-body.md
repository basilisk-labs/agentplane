Task: `202608301851-5W3XW6`
Title: Recover unstarted task worktrees pinned before the approved planning baseline
Canonical task record: `.agentplane/tasks/202608301851-5W3XW6/README.md`

## Summary

Recover unstarted task worktrees pinned before the approved planning baseline

M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.

## Scope

- In scope: M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.
- Out of scope: unrelated refactors not required for "Recover unstarted task worktrees pinned before the approved planning baseline".

## Verification

- State: pending
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T18:53:26.210Z
- Branch: task/202608301851-5W3XW6/recover-unstarted-task-worktrees-pinned-before-t
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/harness-dev.mdx                     |  25 ++
 docs/user/cli-reference.generated.mdx              |   3 +
 ...i.core.task-advance.worktree-resolution.test.ts | 188 ++++++++++++++-
 .../commands/branch/work-resume-planning-base.ts   | 260 +++++++++++++++++++++
 .../src/commands/branch/work-resume.command.ts     |  51 +++-
 5 files changed, 523 insertions(+), 4 deletions(-)
```

</details>
