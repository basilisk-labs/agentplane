## Summary

Introduce command-layer backend capability helpers

Add a command/shared capability facade over task backend traits so command services stop branching on backendId/local-backend checks directly.

## Scope

- In scope: Add a command/shared capability facade over task backend traits so command services stop branching on backendId/local-backend checks directly.
- Out of scope: unrelated refactors not required for "Introduce command-layer backend capability helpers".

## Verification

- State: ok
- Note: Backend capability facade now drives local-task-store routing in shared task command paths; focused and full fast-suite verification passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T06:39:23.537Z
- Branch: task/202604180617-MV8SE2/backend-capability-facade
- Head: 6cfd5f685792

```text
No changes detected.
```

</details>
