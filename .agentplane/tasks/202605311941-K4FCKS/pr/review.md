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
- Note: Verified CI guard fix after commit 8d55becc7: bun run lint:core passed; bunx vitest run packages/agentplane/src/commands/hermes passed; bunx vitest run legacy-cli-regressions, bun-compiled-cli smoke, and targeted release-smoke passed; bun run test:fast passed with 336 files / 2003 tests; format/schema/docs checks passed.
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
 agentplane-recipes                                 |   2 +-
 docs/recipes-inventory.json                        |  34 +
 docs/recipes/hermes-agentplane.mdx                 |  62 ++
 docs/recipes/index.mdx                             |   1 +
 docs/user/cli-reference.generated.mdx              | 135 ++++
 docs/workflow-guides/hermes-kanban.mdx             | 214 ++++++
 docs/workflow-guides/index.mdx                     |   5 +
 integrations/hermes-agentplane-plugin/README.md    | 104 +++
 integrations/hermes-agentplane-plugin/__init__.py  | 228 +++++++
 .../bin/hermes-agentplane-spawn.mjs                |  46 ++
 integrations/hermes-agentplane-plugin/package.json |  13 +
 integrations/hermes-agentplane-plugin/plugin.yaml  |   6 +
 .../hermes-agentplane-plugin/src/index.mjs         |  47 ++
 .../src/cli/run-cli/command-catalog/project.ts     |  20 +
 .../src/cli/run-cli/command-loaders/project.ts     |  23 +
 .../src/commands/hermes/hermes.command.test.ts     | 284 ++++++++
 .../src/commands/hermes/hermes.command.ts          | 745 +++++++++++++++++++++
 18 files changed, 1969 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
