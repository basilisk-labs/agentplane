Task: `202609111337-ZJ6AFT`
Title: Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887
Canonical task record: `.agentplane/tasks/202609111337-ZJ6AFT/README.md`

## Summary

Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887

GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887

## Scope

- In scope: GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887.
- Out of scope: unrelated refactors not required for "Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887".

## Verification

- State: needs_rework
- Note:

```text
Rework: Declared check failed: bunx --no-install vitest run
packages/agentplane/src/commands/task/run-render.test.ts
packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-11T14:42:47.871Z
- Branch: task/202609111337-ZJ6AFT/report-trace-backed-runner-activity-and-safe-liv
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/run-render.test.ts           | 157 +++++++++++++++++++++
 .../agentplane/src/commands/task/run-render.ts     |  45 ++++--
 .../src/runner/usecases/task-run-inspect.ts        | 145 +++++++++++++++++++
 3 files changed, 339 insertions(+), 8 deletions(-)
```

</details>
