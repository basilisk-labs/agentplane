## Summary

Cut over recipes to project overlays

Replace scenario-centric recipes with project overlays, activation state, and compiled runtime bundle.

## Scope

- In scope: Replace scenario-centric recipes with project overlays, activation state, and compiled runtime bundle.
- Out of scope: unrelated refactors not required for "Cut over recipes to project overlays".

## Verification

- State: ok
- Note: Overlay cutover and framework runtime bootstrap checks passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-16T19:28:12.742Z
- Branch: task/202604161712-0N90F5/recipes-overlays
- Head: 80c6dce91ba9

```text
 bun.lock                                           |   9 +-
 packages/agentplane/package.json                   |   1 +
 .../src/cli/bootstrap-framework-dev-script.test.ts |  65 ++++-
 .../src/cli/run-cli/commands/init/recipes.ts       |   7 +-
 packages/agentplane/src/commands/recipes.ts        |  17 ++
 .../src/commands/recipes/active.command.ts         |  19 ++
 .../src/commands/recipes/disable.command.ts        |  17 ++
 .../src/commands/recipes/enable.command.ts         |  17 ++
 .../src/commands/recipes/explain-active.command.ts |  18 ++
 .../agentplane/src/commands/recipes/impl/apply.ts  |  30 +-
 .../src/commands/recipes/impl/commands.ts          |   4 +
 .../src/commands/recipes/impl/commands/active.ts   |  57 ++++
 .../src/commands/recipes/impl/commands/disable.ts  |  26 ++
 .../src/commands/recipes/impl/commands/enable.ts   |  44 +++
 .../recipes/impl/commands/explain-active.ts        |  24 ++
 .../src/commands/recipes/impl/commands/explain.ts  |  38 ++-
 .../src/commands/recipes/impl/commands/info.ts     |  29 +-
 .../src/commands/recipes/impl/commands/install.ts  |   5 +
 .../src/commands/recipes/impl/commands/list.ts     |  17 +-
 .../src/commands/recipes/impl/commands/remove.ts   |   3 +
 .../src/commands/recipes/impl/constants.ts         |  41 +--
 .../src/commands/recipes/impl/manifest.ts          | 324 ++-------------------
 .../src/commands/recipes/impl/overlay-project.ts   | 217 ++++++++++++++
 .../agentplane/src/commands/recipes/impl/paths.ts  |  12 +
 .../src/commands/recipes/impl/resolver.ts          |   1 +
 .../src/commands/recipes/impl/scenario.ts          |   1 +
 .../agentplane/src/commands/recipes/impl/types.ts  | 303 +++----------------
 .../agentplane/src/runner/context/base-prompts.ts  |  94 +++++-
 packages/agentplane/src/runner/types.ts            |   5 +
 .../agentplane/src/runner/usecases/task-run.ts     |   1 +
 .../agentplane/src/runtime/behavior/resolve.ts     |  43 ++-
 packages/agentplane/src/runtime/behavior/types.ts  |   2 +
 .../agentplane/src/runtime/capabilities/recipe.ts  |  25 +-
 packages/agentplane/tsconfig.json                  |   2 +-
 packages/core/schemas/config.schema.json           |  10 +-
 packages/core/src/config/config-schema.ts          |  10 +-
 packages/core/src/config/config.ts                 |   1 +
 packages/recipes/package.json                      |  26 +-
 packages/recipes/src/index.test.ts                 |   2 +-
 packages/recipes/src/index.ts                      |   3 +-
 packages/recipes/src/manifest.ts                   | 223 +++++++++++++-
 packages/recipes/src/overlay.ts                    |  75 +++++
 packages/recipes/src/scenario.ts                   |   1 +
 packages/recipes/src/types.ts                      | 162 ++++++++++-
 packages/spec/schemas/config.schema.json           |  10 +-
 scripts/bootstrap-framework-dev.mjs                |  60 ++--
 tsconfig.base.json                                 |   4 +-
 47 files changed, 1404 insertions(+), 701 deletions(-)
```

</details>
