Task: `202608022324-9VCYWG`
Title: Complete the task advance semantic-result round trip
Canonical task record: `.agentplane/tasks/202608022324-9VCYWG/README.md`

## Summary

Complete the task advance semantic-result round trip

Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.

## Scope

- In scope: Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.
- Out of scope: unrelated refactors not required for "Complete the task advance semantic-result round trip".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T23:28:27.052Z
- Branch: task/202608022324-9VCYWG/complete-the-task-advance-semantic-result-round
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
