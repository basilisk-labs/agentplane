# PR Review

Created: 2026-05-06T15:19:21.500Z

## Task

- Task: `202605061518-ZJM8VR`
- Title: Separate framework dev CLI help surface
- Status: DOING
- Branch: `task/202605061518-ZJM8VR/cli-help-surfaces`
- Canonical task record: `.agentplane/tasks/202605061518-ZJM8VR/README.md`

## Verification

- State: ok
- Note: Verified CLI help surface split: normal help hides release/framework and advanced maintenance commands, framework checkout help exposes Framework Dev, docs reference is fresh, focused tests and typecheck passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T15:33:50.801Z
- Branch: task/202605061518-ZJM8VR/cli-help-surfaces
- Head: 50464e6f79a7

```text
 .../blueprint/resolved-snapshot.json               |  498 +++
 docs/user/cli-reference.generated.mdx              | 3820 ++++++++++----------
 docs/user/commands.mdx                             |   17 +
 .../src/cli/run-cli.core.help-contract.test.ts     |   34 +-
 packages/agentplane/src/cli/run-cli.ts             |   28 +-
 .../src/cli/run-cli/command-catalog.test.ts        |   23 +
 .../agentplane/src/cli/run-cli/command-catalog.ts  |   17 +
 .../src/cli/run-cli/command-catalog/core.ts        |   71 +-
 .../src/cli/run-cli/command-catalog/kernel.ts      |    7 +
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |    7 +-
 .../src/cli/run-cli/command-catalog/project.ts     |    6 +-
 .../src/cli/run-cli/command-catalog/task.ts        |  164 +-
 .../agentplane/src/cli/run-cli/registry.run.ts     |    5 +-
 packages/agentplane/src/cli/spec/docs-render.ts    |   31 +-
 packages/agentplane/src/cli/spec/help-render.ts    |   31 +-
 packages/agentplane/src/cli/spec/help.ts           |   11 +-
 16 files changed, 2804 insertions(+), 1966 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
