# PR Review

Created: 2026-05-31T19:42:09.859Z

## Task

- Task: `202605311941-K4FCKS`
- Title: Design and scaffold Hermes adapter
- Status: DOING
- Branch: `task/202605311941-K4FCKS/design-and-scaffold-hermes-adapter`
- Canonical task record: `.agentplane/tasks/202605311941-K4FCKS/README.md`

## Verification

- State: ok
- Note: Verified Hermes plugin shim and image requirements update: remote Hermes image smoke passed with PYTHONPATH=/opt/hermes (plugin registers CLI command, patches kanban_db.dispatch_once, treats agentplane-coder as spawnable, extracts Agentplane task id); bunx vitest run packages/agentplane/src/commands/hermes passed; node import check for integrations/hermes-agentplane-plugin/src/index.mjs passed; node .agentplane/policy/check-routing.mjs passed; bun run format:changed passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-31T19:42:09.859Z
- Branch: task/202605311941-K4FCKS/design-and-scaffold-hermes-adapter
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 README.md                                          |   1 +
 docs/user/cli-reference.generated.mdx              | 100 ++++++
 docs/workflow-guides/hermes-kanban.mdx             | 206 +++++++++++
 docs/workflow-guides/index.mdx                     |   5 +
 integrations/hermes-agentplane-plugin/README.md    |  40 +++
 .../bin/hermes-agentplane-spawn.mjs                |  46 +++
 integrations/hermes-agentplane-plugin/package.json |  13 +
 .../hermes-agentplane-plugin/src/index.mjs         |  47 +++
 .../src/cli/run-cli/command-catalog/project.ts     |  17 +
 .../src/cli/run-cli/command-loaders/project.ts     |  19 +
 .../src/commands/hermes/hermes.command.test.ts     | 120 +++++++
 .../src/commands/hermes/hermes.command.ts          | 395 +++++++++++++++++++++
 12 files changed, 1009 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
