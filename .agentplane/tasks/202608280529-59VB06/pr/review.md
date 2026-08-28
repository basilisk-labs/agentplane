# PR Review

Created: 2026-08-28T05:33:24.733Z

## Task

- Task: `202608280529-59VB06`
- Title: Recover stale evaluator exchanges without accepting obsolete verdicts
- Status: DOING
- Branch: `task/202608280529-59VB06/recover-stale-evaluator-exchanges-without-accept`
- Canonical task record: `.agentplane/tasks/202608280529-59VB06/README.md`

## Verification

- State: needs_rework
- Note: Needs rework: exact regression-command correction; the same proved review defects remain unresolved.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-28T06:07:05.168Z
- Branch: task/202608280529-59VB06/recover-stale-evaluator-exchanges-without-accept
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...li.core.task-advance.evaluator-recovery.test.ts | 363 +++++++++++++++++++++
 .../task/external-agent-evaluator-recovery.test.ts |  48 +++
 .../task/external-agent-evaluator-recovery.ts      | 120 +++++++
 .../task/external-agent-supervisor-recovery.ts     |   8 +
 4 files changed, 539 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
