Task: `202608102112-AY0H1F`
Title: Repair exactly-once external episode recovery
Canonical task record: `.agentplane/tasks/202608102112-AY0H1F/README.md`

## Summary

Repair exactly-once external episode recovery

Make task advance consume an external-agent envelope exactly once only after its result is durably applied. Prevent read-only workspace-resolution packets from creating fresh intents, let stale in-flight intents transition to a recoverable terminal state after state-fingerprint drift, issue a fresh replacement transition without replaying old output, and return deterministic recovery instructions without manual journal edits.

## Scope

- In scope: Make task advance consume an external-agent envelope exactly once only after its result is durably applied. Prevent read-only workspace-resolution packets from creating fresh intents, let stale in-flight intents transition to a recoverable terminal state after state-fingerprint drift, issue a fresh replacement transition without replaying old output, and return deterministic recovery instructions without manual journal edits.
- Out of scope: unrelated refactors not required for "Repair exactly-once external episode recovery".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-10T21:13:13.244Z
- Branch: task/202608102112-AY0H1F/exactly-once-external-episode-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
