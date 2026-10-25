# PR Review

Created: 2026-10-25T01:17:13.320Z

## Task

- Task: `202610250050-X3VP32`
- Title: Guard canonical local lifecycle against unresolved external-agent intent
- Status: DOING
- Branch: `task/202610250050-X3VP32/guard-canonical-local-lifecycle-against-unresolv`
- Canonical task record: `.agentplane/tasks/202610250050-X3VP32/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-25T01:17:13.320Z
- Branch: task/202610250050-X3VP32/guard-canonical-local-lifecycle-against-unresolv
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend.cloud.test.ts        |  20 +-
 .../external-agent-read-only-observation.test.ts   | 205 ++++++++++++++++++++-
 .../task/external-agent-read-only-recovery.ts      | 129 +++++++++++++
 .../task/external-agent-supervisor-recovery.ts     |  60 +++---
 .../kernel-completed-provider-workflow.test.ts     |  58 ++++++
 .../task/kernel-completed-provider-workflow.ts     |  11 ++
 .../kernel-provider-effect-coordinator.test.ts     |  32 ++++
 .../task/kernel-provider-effect-coordinator.ts     |  11 ++
 8 files changed, 489 insertions(+), 37 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
