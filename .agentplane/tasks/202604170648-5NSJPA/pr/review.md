# PR Review

Created: 2026-04-17T09:28:18.874Z
Branch: task/202604170648-5NSJPA/markdown-first-assets

## Summary

Move recipe assets to markdown-first loading

Prefer markdown-first loading for recipe-owned agents and skills while keeping structured manifests only where schema is required.

## Scope

- In scope: Prefer markdown-first loading for recipe-owned agents and skills while keeping structured manifests only where schema is required.
- Out of scope: unrelated refactors not required for "Move recipe assets to markdown-first loading".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Moved vendored recipe agents and skills to markdown-first loading and propagated text content through compiled recipe assets.

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

- Updated: 2026-04-17T09:42:38.542Z
- Branch: task/202604170648-5NSJPA/markdown-first-assets
- Head: 1420142651ea

```text
 .agentplane/agents/ORCHESTRATOR.json               |   2 +-
 .agentplane/tasks/202604170852-ZE2GGY/README.md    | 123 ++++++
 .../tasks/202604170852-ZE2GGY/pr/diffstat.txt      |  61 +++
 .../tasks/202604170852-ZE2GGY/pr/github-body.md    |  93 +++++
 .../tasks/202604170852-ZE2GGY/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604170852-ZE2GGY/pr/meta.json |  14 +
 .../tasks/202604170852-ZE2GGY/pr/notes.jsonl       |   0
 .agentplane/tasks/202604170852-ZE2GGY/pr/review.md | 117 ++++++
 .../tasks/202604170852-ZE2GGY/pr/verify.log        |   0
 .agentplane/tasks/202604170905-XSJXC0/README.md    | 130 +++++++
 .../tasks/202604170905-XSJXC0/pr/diffstat.txt      |  74 ++++
 .../tasks/202604170905-XSJXC0/pr/github-body.md    | 106 ++++++
 .../tasks/202604170905-XSJXC0/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604170905-XSJXC0/pr/meta.json |  14 +
 .../tasks/202604170905-XSJXC0/pr/notes.jsonl       |   0
 .agentplane/tasks/202604170905-XSJXC0/pr/review.md | 130 +++++++
 .../tasks/202604170905-XSJXC0/pr/verify.log        |   0
 packages/agentplane/assets/RUNNER.md               |   2 +-
 .../agentplane/assets/agents/ORCHESTRATOR.json     |   2 +-
 .../run-cli.core.help-snap.test.ts.snap            |  40 +-
 .../agentplane/src/cli/recipes-bundled.test.ts     |  92 -----
 packages/agentplane/src/cli/recipes-bundled.ts     |  44 ---
 .../src/cli/run-cli.core.help-snap.test.ts         |   8 +-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  35 +-
 .../agentplane/src/cli/run-cli.recipes.test.ts     | 413 ++++++++++++++++-----
 .../agentplane/src/cli/run-cli.scenario.test.ts    |  74 ++--
 .../agentplane/src/cli/run-cli.test-helpers.ts     |  57 ++-
 .../src/cli/run-cli/command-catalog/project.ts     |  42 ++-
 .../agentplane/src/cli/run-cli/commands/init.ts    |  56 +--
 .../src/cli/run-cli/commands/init/recipes.ts       |  71 ++--
 .../src/commands/recipes.catalog-install.test.ts   |  69 ++--
 .../agentplane/src/commands/recipes.list.test.ts   |  31 +-
 .../src/commands/recipes.scenario.test.ts          |   4 +-
 .../src/commands/recipes.test-helpers.ts           | 186 +++++++---
 packages/agentplane/src/commands/recipes.ts        |  22 +-
 .../agentplane/src/commands/recipes/add.command.ts |  43 +++
 .../src/commands/recipes/detach.command.ts         |  26 ++
 .../agentplane/src/commands/recipes/impl/apply.ts  |  77 ++--
 .../src/commands/recipes/impl/commands.ts          |   3 +
 .../src/commands/recipes/impl/commands/add.ts      | 122 ++++++
 .../src/commands/recipes/impl/commands/detach.ts   | 102 +++++
 .../src/commands/recipes/impl/commands/explain.ts  |  61 +--
 .../src/commands/recipes/impl/commands/info.ts     |  25 +-
 .../src/commands/recipes/impl/commands/install.ts  |  91 ++---
 .../src/commands/recipes/impl/commands/list.ts     |  26 +-
 .../src/commands/recipes/impl/commands/remove.ts   |   2 +
 .../src/commands/recipes/impl/commands/update.ts   | 122 ++++++
 .../src/commands/recipes/impl/constants.ts         |   3 +-
 .../src/commands/recipes/impl/manifest.ts          |  18 +-
 .../src/commands/recipes/impl/overlay-project.ts   | 193 ++++++++--
 .../agentplane/src/commands/recipes/impl/paths.ts  |  23 +-
 .../recipes/impl/project-installed-recipes.ts      | 133 ++-----
 .../commands/recipes/impl/project-recipe-state.ts  | 120 ++++++
 .../src/commands/recipes/impl/project-registry.ts  | 127 +++++++
 .../src/commands/recipes/impl/resolver.test.ts     |   2 +-
 .../src/commands/recipes/impl/resolver.ts          |   9 +-
 .../src/commands/recipes/impl/scenario.ts          |   1 -
 .../agentplane/src/commands/recipes/impl/types.ts  |  10 +-
 .../src/commands/recipes/info.command.ts           |   4 +-
 .../src/commands/recipes/install.spec.ts           |   8 +-
 .../src/commands/recipes/list.command.ts           |   8 +-
 .../src/commands/recipes/update.command.ts         |  45 +++
 .../src/commands/scenario/execute.command.ts       |   8 +-
 .../src/commands/scenario/impl/commands.ts         |  10 +-
 .../src/commands/scenario/info.command.ts          |   8 +-
 .../src/commands/scenario/list.command.ts          |   6 +-
 .../src/commands/scenario/run.command.ts           |  10 +-
 .../src/commands/scenario/scenario.command.ts      |  14 +-
 .../src/runner/context/base-prompts.test.ts        |  27 +-
 .../agentplane/src/runner/context/base-prompts.ts  |  50 ++-
 .../src/runner/context/recipe-context.ts           |  57 ++-
 .../usecases/scenario-materialize-task.test.ts     |  41 +-
 .../agentplane/src/runner/usecases/task-run.ts     |   2 +-
 .../src/runtime/behavior/resolve.test.ts           |   6 +-
 .../agentplane/src/runtime/capabilities/recipe.ts  | 134 ++++---
 .../src/runtime/capabilities/resolve.test.ts       |  11 +-
 packages/core/schemas/config.schema.json           |  14 +-
 packages/core/src/config/config-schema.ts          |  14 +-
 packages/core/src/config/config.ts                 |   3 +-
 packages/recipes/src/constants.ts                  |   5 +-
 packages/recipes/src/manifest.ts                   |  95 ++---
 packages/recipes/src/scenario.ts                   |   1 -
 packages/recipes/src/types.ts                      | 118 ++++--
 packages/spec/examples/config.json                 |   2 +-
 packages/spec/schemas/config.schema.json           |  14 +-
 85 files changed, 3141 insertions(+), 1027 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
