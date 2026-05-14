# PR Review

Created: 2026-05-14T20:56:19.246Z

## Task

- Task: `202605142055-F5M77X`
- Title: Release AgentPlane v0.6.1
- Status: DOING
- Branch: `task/202605142055-F5M77X/release-v0-6-1`
- Canonical task record: `.agentplane/tasks/202605142055-F5M77X/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T21:55:22.319Z
- Branch: task/202605142055-F5M77X/release-v0-6-1
- Head: 01eeaf15192b

```text
 .../blueprint/resolved-snapshot.json               | 417 +++++++++++++++++++++
 docs/releases/v0.6.1.md                            | 178 +++++++++
 .../run-cli.core.help-snap.test.ts.snap            | 380 +++++++++++++++++--
 ...n-cli.core.lifecycle.start-commit.basic.test.ts |   4 +
 ...-cli.core.lifecycle.start-commit.format.test.ts |   2 +
 ...n-cli.core.lifecycle.start-commit.paths.test.ts |   8 +
 ...-cli.core.lifecycle.start-commit.policy.test.ts |   2 +
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    |   7 +-
 ...run-cli.core.pr-flow.integrate-failures.test.ts |   7 +-
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |   7 +-
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |   7 +-
 ...n-cli.core.pr-flow.integrate-validation.test.ts |   7 +-
 .../src/cli/run-cli.core.pr-flow.test.ts           |   2 +
 .../src/cli/run-cli.core.task-hosted-close.test.ts |   1 +
 .../src/workflow-runtime/validate-frontmatter.ts   |   1 +
 packages/core/src/config/workflow-file.ts          |   2 +
 packages/testkit/src/hooks.ts                      |   7 +-
 17 files changed, 1010 insertions(+), 29 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
