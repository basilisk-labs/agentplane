Task: `202607221854-K7799B`
Title: Close all AgentPlane 0.7 architecture guard violations
Canonical task record: `.agentplane/tasks/202607221854-K7799B/README.md`

## Summary

Close all AgentPlane 0.7 architecture guard violations

RF-27b: reduce the trust/architecture baseline to zero for automatic verdicts, agent-owned observations, untyped durable boundaries, shell orchestration, duplicate task views, undeclared capabilities, and direct OS/Git/network imports in migrated use cases.

## Scope

- In scope: eliminate every v0.7 ratchet baseline entry, tighten dependency rules, ensure new use cases use ports, remove compatibility code whose window ends at 0.7, and document any intentionally retained public v1 reader separately from violations.
- Out of scope: hiding unresolved violations by broad exclusions or resetting the baseline upward.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T18:09:19.425Z
- Branch: task/202607221854-K7799B/close-all-agentplane-0-7-architecture-guard-viol
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/architecture/layering.imports.test.ts      | 97 ++--------------------
 .../src/commands/doctor/layering.test.ts           | 62 ++++++++++++++
 .../agentplane/src/commands/doctor/layering.ts     | 94 ++++++++++++++-------
 3 files changed, 132 insertions(+), 121 deletions(-)
```

</details>
