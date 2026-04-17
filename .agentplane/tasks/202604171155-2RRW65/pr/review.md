# PR Review

Created: 2026-04-17T12:44:27.988Z
Branch: task/202604171155-2RRW65/collapse-recipe-wrappers

## Summary

Collapse recipes transition wrappers

Remove duplicated normalize/manifest/scenario transition layers under commands/recipes/impl and import recipe-domain logic directly from @agentplaneorg/recipes where the CLI no longer needs a boundary shim.

## Scope

- In scope: Remove duplicated normalize/manifest/scenario transition layers under commands/recipes/impl and import recipe-domain logic directly from @agentplaneorg/recipes where the CLI no longer needs a boundary shim.
- Out of scope: unrelated refactors not required for "Collapse recipes transition wrappers".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: recipe-domain transition wrappers were removed and CLI/runtime consumers now import domain helpers directly from @agentplaneorg/recipes.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
