Task: `202609150654-H0X3YJ`
Title: Fix active-runtime install reuse on v0.6
Canonical task record: `.agentplane/tasks/202609150654-H0X3YJ/README.md`

## Summary

Fix active-runtime install reuse on v0.6

Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish.

## Scope

- In scope: Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish.
- Out of scope: unrelated refactors not required for "Fix active-runtime install reuse on v0.6".

## Verification

- State: ok
- Note:

```text
Verified: refreshed blueprint snapshot after quality evidence; declared local checks and hosted CI
passed on exact PR head f1812244cda2702c92dad22dc159e1f4afc01b60.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-16T19:29:04.838Z
- Branch: task/202609150654-H0X3YJ/fix-active-runtime-reuse-v0-6
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/branch/work-start.materialize.test.ts | 37 +++++++++++++++-
 .../src/commands/branch/work-start.materialize.ts  | 51 +++++++++++++++++++---
 2 files changed, 80 insertions(+), 8 deletions(-)
```

</details>
