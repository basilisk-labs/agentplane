Task: `202609201334-1WQ1PD`
Title: Accept canonical release task metadata in release readiness
Canonical task record: `.agentplane/tasks/202609201334-1WQ1PD/README.md`

## Summary

Accept canonical release task metadata in release readiness

Fix the 0.7.10 release gate so an active Task Kernel release task is recognized by task_kind=release plus exact version tag instead of one legacy title string. Preserve fail-closed checks and add focused regression coverage.

## Scope

- In scope: Fix the 0.7.10 release gate so an active Task Kernel release task is recognized by task_kind=release plus exact version tag instead of one legacy title string. Preserve fail-closed checks and add focused regression coverage.
- Out of scope: unrelated refactors not required for "Accept canonical release task metadata in release readiness".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T13:42:01.726Z
- Branch: task/202609201334-1WQ1PD/canonical-1wq1pd
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../release/task-registry-ready-script.test.ts     | 44 ++++++++++++++++++++--
 scripts/checks/check-task-state.mjs                |  4 +-
 2 files changed, 44 insertions(+), 4 deletions(-)
```

</details>
