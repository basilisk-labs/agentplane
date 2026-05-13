Task: `202605131649-61129E`
Title: Align public CLI docs with user command surface
Canonical task record: `.agentplane/tasks/202605131649-61129E/README.md`

## Summary

Align public CLI docs with user command surface

Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands.

## Scope

- In scope: Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands.
- Out of scope: unrelated refactors not required for "Align public CLI docs with user command surface".

## Verification

- State: ok
- Note: Addressed PR review comment r3236216569: group-only CLI docs filtering now treats optional single-token dispatch args named cmd/command/subcommand as group dispatchers, not only variadic dispatchers. Rebuilt generated CLI reference and confirmed task doc/task verify wrappers are absent while task run remains.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:04:02.835Z
- Branch: task/202605131649-61129E/public-cli-docs-surface
- Head: 50e8397902b3

```text
 .../blueprint/resolved-snapshot.json               |  512 +++++
 docs/README.md                                     |    8 +-
 .../documentation-information-architecture.mdx     |   11 +-
 docs/developer/harness-dev.mdx                     |   56 +
 docs/help/broken-workflow-runbook.mdx              |    9 +-
 docs/help/troubleshooting-by-symptom.mdx           |   18 +-
 docs/help/troubleshooting.mdx                      |   78 +-
 docs/index.mdx                                     |   32 -
 docs/user/agent-change-record.mdx                  |    5 +-
 docs/user/agent-discovery.mdx                      |    4 +-
 docs/user/backends.mdx                             |    3 +-
 docs/user/backends/local.mdx                       |    3 +-
 docs/user/backends/redmine.mdx                     |   12 +-
 docs/user/branching-and-pr-artifacts.mdx           |    2 +-
 docs/user/breaking-changes.mdx                     |    3 +-
 docs/user/cli-reference.generated.mdx              | 2049 +-------------------
 docs/user/commands.mdx                             |   67 +-
 docs/user/local-context.mdx                        |    7 +-
 docs/user/setup.mdx                                |   12 -
 docs/user/task-lifecycle.mdx                       |   36 +-
 docs/user/tasks-and-backends.mdx                   |   26 +-
 docs/user/website-ia.mdx                           |    6 +-
 docs/user/workflow-migration.mdx                   |   23 +-
 docs/user/workflow.mdx                             |   10 +-
 docs/workflow-guides/branch-pr.mdx                 |    4 +-
 .../src/cli/run-cli.core.docs-cli.test.ts          |    9 +
 .../agentplane/src/cli/run-cli/registry.run.ts     |    7 +-
 packages/agentplane/src/cli/spec/docs-render.ts    |   20 +-
 scripts/checks/check-agent-onboarding-scenario.mjs |   16 +-
 scripts/checks/check-docs-ia.mjs                   |    1 -
 website/sidebars.ts                                |   35 -
 website/static/llms-full.txt                       |  753 +++----
 32 files changed, 1164 insertions(+), 2673 deletions(-)
```

</details>
