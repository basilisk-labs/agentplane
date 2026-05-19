Task: `202605190830-W0ZCVH`
Title: Make context init interactive
Canonical task record: `.agentplane/tasks/202605190830-W0ZCVH/README.md`

## Summary

Make context init interactive

Add a TTY dialog for user-run agentplane context init with basic mode information and a three-mode selection: minimal, adaptive, maximum-assimilation. Preserve explicit profile flags and non-interactive defaults.

## Scope

- In scope: Add a TTY dialog for user-run agentplane context init with basic mode information and a three-mode selection: minimal, adaptive, maximum-assimilation. Preserve explicit profile flags and non-interactive defaults.
- Out of scope: unrelated refactors not required for "Make context init interactive".

## Verification

- State: ok
- Note:

```text
Re-verified current PR head 4118cece7b9f after commit amend and PR publication. Focused checks
remain the same passing set recorded in the task details.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T08:42:12.992Z
- Branch: task/202605190830-W0ZCVH/interactive-context-init
- Head: 4118cece7b9f

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../agentplane/src/cli/run-cli.core.init.test.ts   | 110 ++++
 .../src/commands/context/context.command.ts        |  43 +-
 .../src/commands/context/context.spec.ts           |   5 +-
 4 files changed, 727 insertions(+), 3 deletions(-)
```

</details>
