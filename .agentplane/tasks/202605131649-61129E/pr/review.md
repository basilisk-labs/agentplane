# PR Review

Created: 2026-05-13T16:51:39.705Z

## Task

- Task: `202605131649-61129E`
- Title: Align public CLI docs with user command surface
- Status: DOING
- Branch: `task/202605131649-61129E/public-cli-docs-surface`
- Canonical task record: `.agentplane/tasks/202605131649-61129E/README.md`

## Verification

- State: ok
- Note: Verified docs/code alignment: docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, package build, and targeted docs-cli test passed. Generated CLI reference now contains cleanup merged and excludes group roots plus advanced/internal docs surface.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T17:35:14.916Z
- Branch: task/202605131649-61129E/public-cli-docs-surface
- Head: e3ec4ca1a1eb

```text
 .../blueprint/resolved-snapshot.json               |  512 ++++++
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
 docs/user/cli-reference.generated.mdx              | 1893 +-------------------
 docs/user/commands.mdx                             |   67 +-
 docs/user/local-context.mdx                        |    7 +-
 docs/user/setup.mdx                                |   12 -
 docs/user/task-lifecycle.mdx                       |   36 +-
 docs/user/tasks-and-backends.mdx                   |   26 +-
 docs/user/website-ia.mdx                           |    6 +-
 docs/user/workflow-migration.mdx                   |   23 +-
 docs/user/workflow.mdx                             |   10 +-
 docs/workflow-guides/branch-pr.mdx                 |    4 +-
 .../src/cli/run-cli.core.docs-cli.test.ts          |    6 +
 .../agentplane/src/cli/run-cli/registry.run.ts     |    7 +-
 packages/agentplane/src/cli/spec/docs-render.ts    |   21 +-
 scripts/checks/check-agent-onboarding-scenario.mjs |   16 +-
 scripts/checks/check-docs-ia.mjs                   |    1 -
 website/sidebars.ts                                |   35 -
 website/static/llms-full.txt                       |  753 ++++----
 32 files changed, 1109 insertions(+), 2570 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
