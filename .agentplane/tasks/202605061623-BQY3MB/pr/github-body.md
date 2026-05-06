Task: `202605061623-BQY3MB`
Title: Add Obsidian projection cleanup command
Canonical task record: `.agentplane/tasks/202605061623-BQY3MB/README.md`

## Summary

Add Obsidian projection cleanup command

Add a CLI command that removes only the generated Obsidian task navigation projection files while preserving canonical task READMEs and non-generated user files.

## Scope

- In scope: Add a CLI command that removes only the generated Obsidian task navigation projection files while preserving canonical task READMEs and non-generated user files.
- Out of scope: unrelated refactors not required for "Add Obsidian projection cleanup command".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T16:29:07.444Z
- Branch: task/202605061623-BQY3MB/obsidian-clean
- Head: d48d13c59f46

```text
 .../blueprint/resolved-snapshot.json               | 498 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |  21 +
 docs/user/commands.mdx                             |   3 +
 docs/user/tasks-and-backends.mdx                   |   9 +
 .../src/cli/run-cli/command-catalog/task.ts        |  11 +-
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/commands/task/obsidian.command.ts          |  27 +-
 packages/agentplane/src/commands/task/obsidian.ts  |  86 +++-
 .../src/commands/task/obsidian.unit.test.ts        |  71 +++
 9 files changed, 721 insertions(+), 9 deletions(-)
```

</details>
