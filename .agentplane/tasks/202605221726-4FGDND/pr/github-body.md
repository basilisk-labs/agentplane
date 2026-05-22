Task: `202605221726-4FGDND`
Title: Add integration queue stale handoff recovery
Canonical task record: `.agentplane/tasks/202605221726-4FGDND/README.md`

## Summary

Add integration queue stale handoff recovery

Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata.

## Scope

- In scope: Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata.
- Out of scope: unrelated refactors not required for "Add integration queue stale handoff recovery".

## Verification

- State: ok
- Note:

```text
Evaluator check: recovery is bounded to provider-terminal states; OPEN provider PRs are retained,
MERGED waits for close-tail evidence, and CLOSED/not_found become rework instead of being silently
released.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T22:00:49.427Z
- Branch: task/202605221726-4FGDND/integration-queue-handoff-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/integrate-queue-recovery.test.ts  | 127 +++++++++++++++++++++
 .../src/commands/integrate-queue-recovery.ts       |  51 +++++++++
 .../src/commands/integrate-queue.command.ts        |  56 +++++++++
 3 files changed, 234 insertions(+)
```

</details>
