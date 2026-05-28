Task: `202605281934-ZA0BEE`
Title: Route decision module decomposition
Canonical task record: `.agentplane/tasks/202605281934-ZA0BEE/README.md`

## Summary

Route decision module decomposition

Decompose the route decision hotspot into focused, testable modules without changing route semantics. Keep the public command behavior stable while isolating pure route classification, hosted/PR state interpretation, blocker formatting, and next-command rendering so agents receive the same or better next-action guidance from smaller code units.

## Scope

- In scope: Decompose the route decision hotspot into focused, testable modules without changing route semantics. Keep the public command behavior stable while isolating pure route classification, hosted/PR state interpretation, blocker formatting, and next-command rendering so agents receive the same or better next-action guidance from smaller code units.
- Out of scope: unrelated refactors not required for "Route decision module decomposition".

## Verification

- State: ok
- Note:

```text
Route decision decomposition verified: facade reduced to 335 lines, blockers/next-action/types
extracted into focused modules, route-decision CLI tests passed, typecheck passed, hotspot threshold
check passed, format:changed passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T19:34:55.525Z
- Branch: task/202605281934-ZA0BEE/route-decision-module-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
