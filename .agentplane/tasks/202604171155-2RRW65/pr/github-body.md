## Summary

Collapse recipes transition wrappers

Remove duplicated normalize/manifest/scenario transition layers under commands/recipes/impl and import recipe-domain logic directly from @agentplaneorg/recipes where the CLI no longer needs a boundary shim.

## Scope

- In scope: Remove duplicated normalize/manifest/scenario transition layers under commands/recipes/impl and import recipe-domain logic directly from @agentplaneorg/recipes where the CLI no longer needs a boundary shim.
- Out of scope: unrelated refactors not required for "Collapse recipes transition wrappers".

## Verification

- State: ok
- Note: Verified: recipe-domain transition wrappers were removed and CLI/runtime consumers now import domain helpers directly from @agentplaneorg/recipes.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T12:54:22.885Z
- Branch: task/202604171155-2RRW65/collapse-recipe-wrappers
- Head: 47ad2e773850

```text
 packages/agentplane/src/commands/recipes.ts        |  12 +-
 .../agentplane/src/commands/recipes/impl/apply.ts  |  10 +-
 .../src/commands/recipes/impl/commands/add.ts      |   2 +-
 .../src/commands/recipes/impl/commands/detach.ts   |   2 +-
 .../src/commands/recipes/impl/commands/explain.ts  |   2 +-
 .../src/commands/recipes/impl/commands/install.ts  |   9 +-
 .../src/commands/recipes/impl/commands/update.ts   |   2 +-
 .../agentplane/src/commands/recipes/impl/index.ts  |   3 +-
 .../src/commands/recipes/impl/installed-recipes.ts |  10 +-
 .../src/commands/recipes/impl/manifest.ts          |  13 -
 .../src/commands/recipes/impl/normalize.ts         |  61 ----
 .../recipes/impl/project-installed-recipes.ts      |  10 +-
 .../commands/recipes/impl/project-recipe-state.ts  |   2 +-
 .../src/commands/recipes/impl/project-registry.ts  |  15 +-
 .../src/commands/recipes/impl/resolver.ts          |   4 +-
 .../src/commands/recipes/impl/scenario.test.ts     |   3 +-
 .../src/commands/recipes/impl/scenario.ts          | 319 ---------------------
 .../agentplane/src/commands/recipes/impl/types.ts  |  48 ----
 .../src/runner/context/recipe-context.ts           |   8 +-
 .../agentplane/src/runtime/capabilities/recipe.ts  |   2 +-
 20 files changed, 57 insertions(+), 480 deletions(-)
```

</details>
