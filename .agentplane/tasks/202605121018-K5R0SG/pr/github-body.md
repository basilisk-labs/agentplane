Task: `202605121018-K5R0SG`
Title: Restore scoped init behavior with parent git detection
Canonical task record: `.agentplane/tasks/202605121018-K5R0SG/README.md`

## Summary

Restore scoped init behavior with parent git detection

Keep parent Git detection visible in init planning without blocking the existing contract that init --yes in a child directory initializes that child as the target repository.

## Scope

- In scope: Keep parent Git detection visible in init planning without blocking the existing contract that init --yes in a child directory initializes that child as the target repository.
- Out of scope: unrelated refactors not required for "Restore scoped init behavior with parent git detection".

## Verification

- State: ok
- Note: Verified scoped init behavior after removing the hard nested-root blocker: init dry-run reports parentGitRoot without writing nested state, and critical scope-leak/symlink tests pass.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-12T10:25:40.560Z
- Branch: task/202605121018-K5R0SG/restore-init-scope
- Head: a0c2e3284602

```text
 .../blueprint/resolved-snapshot.json               | 512 +++++++++++++++++++++
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  12 +-
 .../src/cli/run-cli/commands/init/orchestrate.ts   |   9 -
 3 files changed, 519 insertions(+), 14 deletions(-)
```

</details>
