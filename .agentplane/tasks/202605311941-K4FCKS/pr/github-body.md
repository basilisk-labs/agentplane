Task: `202605311941-K4FCKS`
Title: Design and scaffold Hermes adapter
Canonical task record: `.agentplane/tasks/202605311941-K4FCKS/README.md`

## Summary

Design and scaffold Hermes adapter

Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.

## Scope

- In scope: Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.
- Out of scope: unrelated refactors not required for "Design and scaffold Hermes adapter".

## Verification

- State: ok
- Note:

```text
Verified Hermes plugin shim and image requirements update: remote Hermes image smoke passed with
PYTHONPATH=/opt/hermes (plugin registers CLI command, patches kanban_db.dispatch_once, treats
agentplane-coder as spawnable, extracts Agentplane task id); bunx vitest run
packages/agentplane/src/commands/hermes passed; node import check for
integrations/hermes-agentplane-plugin/src/index.mjs passed; node
.agentplane/policy/check-routing.mjs passed; bun run format:changed passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-31T19:42:09.859Z
- Branch: task/202605311941-K4FCKS/design-and-scaffold-hermes-adapter
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 README.md                                          |   1 +
 docs/user/cli-reference.generated.mdx              | 100 ++++++
 docs/workflow-guides/hermes-kanban.mdx             | 214 +++++++++++
 docs/workflow-guides/index.mdx                     |   5 +
 integrations/hermes-agentplane-plugin/README.md    | 104 ++++++
 integrations/hermes-agentplane-plugin/__init__.py  | 228 ++++++++++++
 .../bin/hermes-agentplane-spawn.mjs                |  46 +++
 integrations/hermes-agentplane-plugin/package.json |  13 +
 integrations/hermes-agentplane-plugin/plugin.yaml  |   6 +
 .../hermes-agentplane-plugin/src/index.mjs         |  47 +++
 .../src/cli/run-cli/command-catalog/project.ts     |  17 +
 .../src/cli/run-cli/command-loaders/project.ts     |  19 +
 .../src/commands/hermes/hermes.command.test.ts     | 120 +++++++
 .../src/commands/hermes/hermes.command.ts          | 395 +++++++++++++++++++++
 14 files changed, 1315 insertions(+)
```

</details>
