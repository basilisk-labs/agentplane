Task: `202605130947-V6846F`
Title: Optimize CLI read-heavy startup paths
Canonical task record: `.agentplane/tasks/202605130947-V6846F/README.md`

## Summary

Optimize CLI read-heavy startup paths

Analyze the current AgentPlane CLI performance code after recent changes and implement behavior-preserving speedups for hot read-heavy paths.

## Scope

- In scope: Analyze the current AgentPlane CLI performance code after recent changes and implement behavior-preserving speedups for hot read-heavy paths.
- Out of scope: unrelated refactors not required for "Optimize CLI read-heavy startup paths".

## Verification

- State: ok
- Note: Implemented unified SQLite projection cache with embedded better-sqlite3 driver. Evidence: focused Vitest 32/32 passed; exact-file ESLint passed; targeted TS compile passed; framework bootstrap passed; cold-path benchmark after native rebuild improved task_list 1159.331ms -> 355.393ms, task_search 1123.773ms -> 366.110ms, task_next 1164.330ms -> 371.164ms.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T09:48:18.945Z
- Branch: task/202605130947-V6846F/cli-perf-read-paths
- Head: 1c600c3bd0a7

```text
No changes detected.
```

</details>
