Task: `202605310706-GV6ECK`
Title: Fix verify ghost session progress output
Canonical task record: `.agentplane/tasks/202605310706-GV6ECK/README.md`

## Summary

Fix verify ghost session progress output

Resolve GitHub issue #4324 by ensuring agentplane verify emits an early non-quiet progress line before backend mutation work, so cloud backend waits are visible instead of appearing as a no-output ghost session.

## Scope

- In scope: Resolve GitHub issue #4324 by ensuring agentplane verify emits an early non-quiet progress line before backend mutation work, so cloud backend waits are visible instead of appearing as a no-output ghost session.
- Out of scope: unrelated refactors not required for "Fix verify ghost session progress output".

## Verification

- State: ok
- Note:

```text
Verified: early verify progress remains covered; focused unit test, typecheck, format:changed,
check-routing, doctor, and hotspots:check pass after tightening the test under the oversized
baseline.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-31T07:09:59.491Z
- Branch: task/202605310706-GV6ECK/verify-ghost-progress
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/verify-record-execute.ts     |  5 ++
 .../src/commands/task/verify-record.unit.test.ts   | 62 ++++++++++++++++++++++
 2 files changed, 67 insertions(+)
```

</details>
