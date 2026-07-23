# PR Review

Created: 2026-07-23T13:29:09.130Z

## Task

- Task: `202607231327-W084MM`
- Title: Reconcile semantic clone baseline drift
- Status: DOING
- Branch: `task/202607231327-W084MM/reconcile-semantic-clone-baseline-drift`
- Canonical task record: `.agentplane/tasks/202607231327-W084MM/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T13:47:53.947Z
- Branch: task/202607231327-W084MM/reconcile-semantic-clone-baseline-drift
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/internal/sync-github.test.ts   | 91 +++++++++++++++++++++-
 .../src/commands/pr/internal/sync-github.ts        | 50 ++++--------
 packages/core/src/config/workflow-contract.test.ts | 62 ++++++++++++++-
 packages/core/src/config/workflow-contract.ts      | 19 +----
 4 files changed, 170 insertions(+), 52 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
