Task: `202607221908-PWFH5K`
Title: Enforce mandatory release dependency closure
Canonical task record: `.agentplane/tasks/202607221908-PWFH5K/README.md`

## Summary

Enforce mandatory release dependency closure

RF-27 release guard: automatically prove that every required open v0.7 implementation, migration, documentation, and gate task is an ancestor of the final 0.7.0 release task.

## Scope

- In scope: a generic task-DAG closure checker, required/optional release-task classification, cycle/missing/non-ancestor diagnostics, tests including RF-02/RF-20 omissions, and release/contract CI integration.
- Out of scope: inferring semantic completion from tags alone; the final release plan declares the required root and allowed optional tasks.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T18:48:16.365Z
- Branch: task/202607221908-PWFH5K/enforce-mandatory-release-dependency-closure
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
