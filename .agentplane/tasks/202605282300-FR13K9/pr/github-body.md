Task: `202605282300-FR13K9`
Title: Insights command report decomposition
Canonical task record: `.agentplane/tasks/202605282300-FR13K9/README.md`

## Summary

Insights command report decomposition

Decompose packages/agentplane/src/commands/insights/insights.command.ts by extracting insights report model/build/render helpers and issue body rendering helpers into focused modules while preserving CLI behavior and reducing hotspot warning count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/insights/insights.command.ts by extracting insights report model/build/render helpers and issue body rendering helpers into focused modules while preserving CLI behavior and reducing hotspot warning count.
- Out of scope: unrelated refactors not required for "Insights command report decomposition".

## Verification

- State: ok
- Note:

```text
Insights command report decomposition completed. Verified with insights report/issue/error-map
tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 37 -> 36).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T23:00:26.850Z
- Branch: task/202605282300-FR13K9/insights-report-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
