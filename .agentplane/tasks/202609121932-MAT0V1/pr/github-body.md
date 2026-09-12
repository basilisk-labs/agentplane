Task: `202609121932-MAT0V1`
Title: Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task ...
Canonical task record: `.agentplane/tasks/202609121932-MAT0V1/README.md`

## Summary

Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.

Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.

## Scope

- In scope: Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.
- Out of scope: unrelated refactors not required for "Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T20:21:12.655Z
- Branch: task/202609121932-MAT0V1/fix-branch-pr-dependency-readiness-after-a-depen
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...i.core.task-advance.worktree-resolution.test.ts | 47 ++++++++++++++++++++--
 .../commands/branch/work-resume-planning-base.ts   | 26 ++++++++----
 2 files changed, 62 insertions(+), 11 deletions(-)
```

</details>
