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
Adjusted test placement to avoid expanding the oversized init test file; context init behavior and
changed-file lint remain verified.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T08:47:20.394Z
- Branch: task/202605190830-W0ZCVH/interactive-context-init
- Head: 3f83c7ecb5f4

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .../src/cli/run-cli.core.context-init.test.ts      | 117 +++++
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   1 -
 .../src/commands/context/context.command.ts        |  43 +-
 .../src/commands/context/context.spec.ts           |   5 +-
 5 files changed, 734 insertions(+), 4 deletions(-)
```

</details>
