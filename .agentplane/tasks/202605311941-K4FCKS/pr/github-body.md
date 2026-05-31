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
Verified after commit 71b1e0af1: policy routing, Hermes vitest suite, agentplane build, CLI docs
check, recipes inventory check, changed-format check, git diff checks, and Hermes recipe
install/add/explain smoke all passed. Submodule recipe commit ed7fea3 is included via updated
submodule pointer.
```
- Canonical workflow state lives in the task README.

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
 .../src/commands/hermes/hermes.command.ts          | 731 +++++++++++++++++++++
 18 files changed, 1955 insertions(+), 1 deletion(-)
```

</details>
