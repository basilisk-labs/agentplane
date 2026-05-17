# PR Review

Created: 2026-05-17T17:11:43.008Z

## Task

- Task: `202605171345-TJCXSV`
- Title: Add first-success demo command
- Status: DOING
- Branch: `task/202605171345-TJCXSV/first-success-demo`
- Canonical task record: `.agentplane/tasks/202605171345-TJCXSV/README.md`

## Verification

- State: ok
- Note: Demo command verified: focused tests, help/quickstart tests, docs freshness checks, policy routing, typecheck, lint, formatting, bootstrap, and temp-repo demo smoke all passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:26:13.167Z
- Branch: task/202605171345-TJCXSV/first-success-demo
- Head: 389af5111a87

```text
 .../blueprint/resolved-snapshot.json               | 535 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |  32 ++
 .../run-cli.core.help-snap.test.ts.snap            | 348 ++++++++++++++
 packages/agentplane/src/cli/command-guide.test.ts  |   5 +-
 packages/agentplane/src/cli/command-guide.ts       |  12 +-
 packages/agentplane/src/cli/command-invocations.ts |   1 +
 packages/agentplane/src/cli/command-snippets.ts    |   1 +
 .../agentplane/src/cli/run-cli.core.demo.test.ts   |  68 +++
 .../src/cli/run-cli/command-catalog/core.ts        |   7 +
 .../src/cli/run-cli/command-loaders/core.ts        |   2 +
 .../src/cli/run-cli/commands/core/demo.ts          | 259 ++++++++++
 11 files changed, 1261 insertions(+), 9 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
