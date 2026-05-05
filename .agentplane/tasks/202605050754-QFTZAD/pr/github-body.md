Task: `202605050754-QFTZAD`
Title: Generate Obsidian task navigation
Canonical task record: `.agentplane/tasks/202605050754-QFTZAD/README.md`

## Summary

Generate Obsidian task navigation

Add an Obsidian-friendly generated Markdown projection under .agentplane so task READMEs remain canonical while users and agents can browse tasks by status, tag, owner, and dependency links.

## Scope

- In scope: Add an Obsidian-friendly generated Markdown projection under .agentplane so task READMEs remain canonical while users and agents can browse tasks by status, tag, owner, and dependency links.
- Out of scope: unrelated refactors not required for "Generate Obsidian task navigation".

## Verification

- State: ok
- Note: Reverified after fixing Docs CI IA handling for generated Obsidian navigation paths.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T08:18:04.961Z
- Branch: task/202605050754-QFTZAD/obsidian-task-index
- Head: e4eb0ad15425

```text
 .gitignore                                         |   5 +
 docs/user/cli-reference.generated.mdx              |  25 ++
 docs/user/commands.mdx                             |  12 +
 docs/user/tasks-and-backends.mdx                   |  24 ++
 .../src/cli/run-cli/command-catalog/task.ts        |   3 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 packages/agentplane/src/commands/task/index.ts     |   1 +
 .../src/commands/task/obsidian.command.ts          |  44 +++
 packages/agentplane/src/commands/task/obsidian.ts  | 345 +++++++++++++++++++++
 .../src/commands/task/obsidian.unit.test.ts        | 173 +++++++++++
 .../src/runtime/shared/runtime-artifacts.ts        |   5 +
 scripts/check-docs-ia.mjs                          |   6 +-
 12 files changed, 646 insertions(+), 1 deletion(-)
```

</details>
