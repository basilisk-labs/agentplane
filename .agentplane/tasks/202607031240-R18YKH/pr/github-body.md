Task: `202607031240-R18YKH`
Title: Improve actionable context wiki connectivity reports
Canonical task record: `.agentplane/tasks/202607031240-R18YKH/README.md`

## Summary

Improve actionable context wiki connectivity reports

Make context wiki reports more useful after assimilation by surfacing actionable orphan remediation suggestions, add regression coverage, and prepare a user-facing YouTube comment response about AgentPlane context design tradeoffs.

## Scope

- In scope: Make context wiki reports more useful after assimilation by surfacing actionable orphan remediation suggestions, add regression coverage, and prepare a user-facing YouTube comment response about AgentPlane context design tradeoffs.
- Out of scope: unrelated refactors not required for "Improve actionable context wiki connectivity reports".

## Verification

- State: ok
- Note: Verified lint-corrected wiki report implementation.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-03T12:41:24.469Z
- Branch: task/202607031240-R18YKH/improve-wiki-connectivity-reports
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/wiki-reports.ts           | 174 ++++++++++++++++++---
 .../src/commands/context/wiki-reports.unit.test.ts |  83 ++++++++++
 2 files changed, 235 insertions(+), 22 deletions(-)
```

</details>
