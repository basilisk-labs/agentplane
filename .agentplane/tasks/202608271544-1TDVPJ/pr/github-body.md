Task: `202608271544-1TDVPJ`
Title: Modernize exact-result recovery fixtures
Canonical task record: `.agentplane/tasks/202608271544-1TDVPJ/README.md`

## Summary

Modernize exact-result recovery fixtures

Repair the effect-recovery CLI suite using real committed Git execution bases and canonical structured planner results. Fresh main 2c9a2f5 reproduces 11 failures out of 15 before intended recovery assertions because execution bases are unborn. Preserve exact operation keys, replacement authority, durable received-result recovery, single-use consumption, replay rejection, retirement, and stale-plan rejection. Limit edits to run-cli.core.task-advance-effect-recovery.test.ts and an optional local test-only helper. Do not change production recovery semantics, lifecycle gates, policy, CI, or timeouts.

## Scope

- In scope: Repair the effect-recovery CLI suite using real committed Git execution bases and canonical structured planner results. Fresh main 2c9a2f5 reproduces 11 failures out of 15 before intended recovery assertions because execution bases are unborn. Preserve exact operation keys, replacement authority, durable received-result recovery, single-use consumption, replay rejection, retirement, and stale-plan rejection. Limit edits to run-cli.core.task-advance-effect-recovery.test.ts and an optional local test-only helper. Do not change production recovery semantics, lifecycle gates, policy, CI, or timeouts.
- Out of scope: unrelated refactors not required for "Modernize exact-result recovery fixtures".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T15:46:45.984Z
- Branch: task/202608271544-1TDVPJ/modernize-exact-result-recovery-fixtures
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 74 ++++++++++++++--------
 .../cli/task-advance-effect-recovery.testkit.ts    | 64 +++++++++++++++++++
 2 files changed, 112 insertions(+), 26 deletions(-)
```

</details>
