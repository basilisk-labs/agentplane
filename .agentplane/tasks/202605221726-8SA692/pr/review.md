# PR Review

Created: 2026-05-22T23:15:03.831Z

## Task

- Task: `202605221726-8SA692`
- Title: Add combined hosted lifecycle status report
- Status: DOING
- Branch: `task/202605221726-8SA692/hosted-lifecycle-status-report`
- Canonical task record: `.agentplane/tasks/202605221726-8SA692/README.md`

## Verification

- State: ok
- Note: Evaluator check: combined report extends the existing branch_pr flow surface without adding a second lifecycle truth; unavailable GitHub/provider state degrades into explicit unchecked reasons and local queue/handoff evidence remains visible.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T23:15:03.831Z
- Branch: task/202605221726-8SA692/hosted-lifecycle-status-report
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.pr-flow.status.test.ts    |  57 ++++++++
 packages/agentplane/src/commands/pr/flow-status.ts | 162 +++++++++++++++++++++
 2 files changed, 219 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
