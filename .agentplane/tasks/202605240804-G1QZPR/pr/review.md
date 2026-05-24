# PR Review

Created: 2026-05-24T08:06:48.364Z

## Task

- Task: `202605240804-G1QZPR`
- Title: Fix branch_pr publication edge cases
- Status: DOING
- Branch: `task/202605240804-G1QZPR/fix-publication-edge-cases`
- Canonical task record: `.agentplane/tasks/202605240804-G1QZPR/README.md`

## Verification

- State: ok
- Note: Verified: branch_pr publication edge-case fixes and quality-gate fixture refresh pass local routed checks.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-24T08:06:48.364Z
- Branch: task/202605240804-G1QZPR/fix-publication-edge-cases
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../backends/task-backend.local-handoff.test.ts    |  53 +++++++++++
 .../backends/task-backend/local-backend-read.ts    |  26 +++++-
 .../src/cli/run-cli.core.tasks.incidents.test.ts   |  24 +++++
 .../src/commands/pr/integrate/cmd.test.ts          |  88 ++++++++++++++++++
 .../pr/integrate/internal/github-pr-merge.ts       |  58 +++++++-----
 .../src/commands/pr/internal/auto-commit.test.ts   | 102 +++++++++++++++++++++
 .../src/commands/pr/internal/auto-commit.ts        |  49 +++++++++-
 packages/testkit/src/cli-harness.ts                |  16 ++++
 8 files changed, 386 insertions(+), 30 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
