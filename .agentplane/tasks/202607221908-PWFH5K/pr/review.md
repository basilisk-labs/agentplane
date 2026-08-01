# PR Review

Created: 2026-08-01T18:48:16.365Z

## Task

- Task: `202607221908-PWFH5K`
- Title: Enforce mandatory release dependency closure
- Status: DOING
- Branch: `task/202607221908-PWFH5K/enforce-mandatory-release-dependency-closure`
- Canonical task record: `.agentplane/tasks/202607221908-PWFH5K/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T18:52:52.216Z
- Branch: task/202607221908-PWFH5K/enforce-mandatory-release-dependency-closure
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/internal/v0.7-refactor-plan.md                |   6 +
 docs/internal/v0.7-release-task-closure.json       |  85 ++++++++
 .../release/task-registry-ready-script.test.ts     | 158 +++++++++++++-
 scripts/checks/check-task-state.mjs                |  38 ++--
 scripts/lib/release-task-closure.mjs               | 237 +++++++++++++++++++++
 5 files changed, 506 insertions(+), 18 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
