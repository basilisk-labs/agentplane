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
Quality gate passed for the focused context init change: targeted CLI/context tests, changed-file
lint, and policy routing check all passed before commit 580810a78.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T08:41:29.698Z
- Branch: task/202605190830-W0ZCVH/interactive-context-init
- Head: 580810a78fec

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../agentplane/src/cli/run-cli.core.init.test.ts   | 110 ++++
 .../src/commands/context/context.command.ts        |  43 +-
 .../src/commands/context/context.spec.ts           |   5 +-
 4 files changed, 727 insertions(+), 3 deletions(-)
```

</details>
