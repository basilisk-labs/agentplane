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
Verified: integrated strict AgentPlane Hermes projection contract with structured lifecycle comment
payloads, runner status/inspect/log pointers, real local projection in reconcile, and
AGENTPLANE_HERMES_LANE_REGISTRY-only registry reads. Checks passed: node
.agentplane/policy/check-routing.mjs; bunx vitest run packages/agentplane/src/commands/hermes; bun
run --filter=agentplane build; bun run docs:cli:check; bun run docs:recipes:check; bun run
ci:recipes; bun run format:changed; rg confirmed no ARKADY/fallback/legacy/backward strings in
Hermes integration surfaces.
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
 docs/recipes-inventory.json                        |  39 ++
 docs/recipes/hermes-agentplane.mdx                 |  90 ++++
 docs/recipes/index.mdx                             |   1 +
 docs/user/cli-reference.generated.mdx              | 135 ++++++
 docs/workflow-guides/hermes-kanban.mdx             | 214 +++++++++
 docs/workflow-guides/index.mdx                     |   5 +
 integrations/hermes-agentplane-plugin/README.md    | 104 ++++
 integrations/hermes-agentplane-plugin/__init__.py  | 228 +++++++++
 .../bin/hermes-agentplane-spawn.mjs                |  46 ++
 integrations/hermes-agentplane-plugin/package.json |  13 +
 integrations/hermes-agentplane-plugin/plugin.yaml  |   6 +
 .../hermes-agentplane-plugin/src/index.mjs         |  47 ++
 .../src/cli/run-cli/command-catalog/project.ts     |  20 +
 .../src/cli/run-cli/command-loaders/project.ts     |  23 +
 .../src/commands/hermes/hermes-runtime.ts          | 364 ++++++++++++++
 .../src/commands/hermes/hermes.command.test.ts     | 401 ++++++++++++++++
 .../src/commands/hermes/hermes.command.ts          | 527 +++++++++++++++++++++
 19 files changed, 2265 insertions(+), 1 deletion(-)
```

</details>
