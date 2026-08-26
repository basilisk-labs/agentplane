# PR Review

Created: 2026-08-26T02:00:01.912Z

## Task

- Task: `202608252330-9RCWZQ`
- Title: Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch
- Status: DOING
- Branch: `task/202608252330-9RCWZQ/allow-exact-sha-release-tasks-to-open-hosted-prs`
- Canonical task record: `.agentplane/tasks/202608252330-9RCWZQ/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-26T02:46:09.863Z
- Branch: task/202608252330-9RCWZQ/allow-exact-sha-release-tasks-to-open-hosted-prs
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-flow.pr-open.git.test.ts   |  35 ++--
 .../run-cli.core.pr-flow.pr-open.network.test.ts   |  79 +++++++-
 .../src/commands/pr/internal/git-host-identity.ts  |   2 +-
 .../src/commands/pr/internal/provider-base.test.ts | 202 +++++++++++++++++++++
 .../src/commands/pr/internal/provider-base.ts      | 111 +++++++++++
 .../src/commands/pr/internal/sync-github.test.ts   |  44 +++++
 .../agentplane/src/commands/pr/internal/sync.ts    |  19 +-
 7 files changed, 465 insertions(+), 27 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
