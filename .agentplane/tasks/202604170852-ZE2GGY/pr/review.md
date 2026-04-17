# PR Review

Created: 2026-04-17T08:53:54.266Z
Branch: task/202604170852-ZE2GGY/remove-scenario-domain

## Summary

Remove top-level scenario CLI domain

Remove the standalone scenario command surface and route recipe scenarios through recipe-owned assets instead of a framework-level domain.

## Scope

- In scope: Remove the standalone scenario command surface and route recipe scenarios through recipe-owned assets instead of a framework-level domain.
- Out of scope: unrelated refactors not required for "Remove top-level scenario CLI domain".

## Verification

### Plan

1. Review the requested outcome for "Remove top-level scenario CLI domain". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Removed the top-level scenario CLI namespace; scenario commands now live under recipes scenario, and help/runtime prompts were updated to match.

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

- Updated: 2026-04-17T09:04:27.482Z
- Branch: task/202604170852-ZE2GGY/remove-scenario-domain
- Head: 2a55ee5d8275

```text
 .agentplane/agents/ORCHESTRATOR.json               |   2 +-
 packages/agentplane/assets/RUNNER.md               |   2 +-
 .../agentplane/assets/agents/ORCHESTRATOR.json     |   2 +-
 .../run-cli.core.help-snap.test.ts.snap            |  38 ++---
 .../agentplane/src/cli/recipes-bundled.test.ts     |  92 ----------
 packages/agentplane/src/cli/recipes-bundled.ts     |  44 -----
 .../src/cli/run-cli.core.help-snap.test.ts         |   8 +-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  35 ++--
 .../agentplane/src/cli/run-cli.recipes.test.ts     | 157 +++++++++--------
 .../agentplane/src/cli/run-cli.scenario.test.ts    |  74 ++++++---
 .../agentplane/src/cli/run-cli.test-helpers.ts     |   2 +-
 .../src/cli/run-cli/command-catalog/project.ts     |  34 +++-
 .../agentplane/src/cli/run-cli/commands/init.ts    |  56 ++++---
 .../src/cli/run-cli/commands/init/recipes.ts       |  71 ++++----
 .../src/commands/recipes.catalog-install.test.ts   |  64 +++++--
 .../agentplane/src/commands/recipes.list.test.ts   |  31 ++--
 .../src/commands/recipes.scenario.test.ts          |   2 +-
 .../src/commands/recipes.test-helpers.ts           | 148 ++++++++++++++---
 packages/agentplane/src/commands/recipes.ts        |  14 ++
 .../agentplane/src/commands/recipes/add.command.ts |  43 +++++
 .../agentplane/src/commands/recipes/impl/apply.ts  |  33 ++--
 .../src/commands/recipes/impl/commands.ts          |   1 +
 .../src/commands/recipes/impl/commands/add.ts      | 113 +++++++++++++
 .../src/commands/recipes/impl/commands/explain.ts  |  53 +++---
 .../src/commands/recipes/impl/commands/info.ts     |  25 +--
 .../src/commands/recipes/impl/commands/install.ts  |  91 +++++-----
 .../src/commands/recipes/impl/commands/list.ts     |  26 +--
 .../src/commands/recipes/impl/commands/remove.ts   |   2 +
 .../src/commands/recipes/impl/constants.ts         |   2 +
 .../src/commands/recipes/impl/manifest.ts          |  18 +-
 .../src/commands/recipes/impl/overlay-project.ts   | 185 +++++++++++++++++----
 .../agentplane/src/commands/recipes/impl/paths.ts  |  23 ++-
 .../recipes/impl/project-installed-recipes.ts      |  49 +++---
 .../src/commands/recipes/impl/project-registry.ts  | 125 ++++++++++++++
 .../src/commands/recipes/impl/resolver.ts          |   9 +-
 .../src/commands/recipes/impl/scenario.ts          |   1 -
 .../agentplane/src/commands/recipes/impl/types.ts  |   6 +-
 .../src/commands/recipes/info.command.ts           |   4 +-
 .../src/commands/recipes/install.spec.ts           |   8 +-
 .../src/commands/recipes/list.command.ts           |   8 +-
 .../src/commands/scenario/execute.command.ts       |   8 +-
 .../src/commands/scenario/impl/commands.ts         |  10 +-
 .../src/commands/scenario/info.command.ts          |   8 +-
 .../src/commands/scenario/list.command.ts          |   6 +-
 .../src/commands/scenario/run.command.ts           |  10 +-
 .../src/commands/scenario/scenario.command.ts      |  14 +-
 .../src/runner/context/recipe-context.ts           |  49 ++++--
 .../usecases/scenario-materialize-task.test.ts     |  41 ++++-
 .../agentplane/src/runner/usecases/task-run.ts     |   2 +-
 .../agentplane/src/runtime/capabilities/recipe.ts  | 133 ++++++++++-----
 .../src/runtime/capabilities/resolve.test.ts       |  10 +-
 packages/core/schemas/config.schema.json           |  14 +-
 packages/core/src/config/config-schema.ts          |  14 +-
 packages/core/src/config/config.ts                 |   3 +-
 packages/recipes/src/constants.ts                  |   4 +-
 packages/recipes/src/manifest.ts                   |  94 +++++------
 packages/recipes/src/scenario.ts                   |   1 -
 packages/recipes/src/types.ts                      | 100 ++++++++---
 packages/spec/examples/config.json                 |   2 +-
 packages/spec/schemas/config.schema.json           |  14 +-
 60 files changed, 1419 insertions(+), 819 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
