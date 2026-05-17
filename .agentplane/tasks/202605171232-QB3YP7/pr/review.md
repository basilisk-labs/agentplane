# PR Review

Created: 2026-05-17T12:33:23.626Z

## Task

- Task: `202605171232-QB3YP7`
- Title: Fix blueprint explain context kind help
- Status: DOING
- Branch: `task/202605171232-QB3YP7/blueprint-help-context-kind`
- Canonical task record: `.agentplane/tasks/202605171232-QB3YP7/README.md`

## Verification

- State: ok
- Note: Focused checks passed: Vitest cli-core help/blueprint tests, docs:cli:check, ESLint on touched TS files, Prettier check, policy routing, and git diff --check.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T12:37:46.911Z
- Branch: task/202605171232-QB3YP7/blueprint-help-context-kind
- Head: 62216c9e602b

```text
 .../blueprint/resolved-snapshot.json               | 529 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   2 +-
 .../run-cli.core.help-snap.test.ts.snap            | 340 +------------
 .../src/cli/run-cli.core.blueprint.test.ts         |  37 ++
 .../src/commands/blueprint/blueprint.specs.ts      |   2 +-
 5 files changed, 574 insertions(+), 336 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
