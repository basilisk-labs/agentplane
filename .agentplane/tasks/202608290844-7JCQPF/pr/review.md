# PR Review

Created: 2026-08-29T08:47:59.220Z

## Task

- Task: `202608290844-7JCQPF`
- Title: Allow state-bound WorkItem implementation results to reopen DONE tasks
- Status: DOING
- Branch: `task/202608290844-7JCQPF/allow-state-bound-workitem-implementation-result`
- Canonical task record: `.agentplane/tasks/202608290844-7JCQPF/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-29T08:47:59.220Z
- Branch: task/202608290844-7JCQPF/allow-state-bound-workitem-implementation-result
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 24 ++++++-
 .../shared/task-scope-extension-request.ts         |  8 ++-
 .../external-agent-implementation-authority.ts     | 20 +++---
 .../src/commands/task/scope-extend.test.ts         | 84 ++++++++++++++++++++++
 4 files changed, 124 insertions(+), 12 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
