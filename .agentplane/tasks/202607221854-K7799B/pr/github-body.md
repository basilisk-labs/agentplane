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

- State: ok
- Note:

```text
Fresh verification for implementation SHA 48e131c52b3b. Per-command Command/Result/Evidence/Scope
records are stored in Findings. Focused layering: 5/5 pass; doctor --dev: errors=0/OK; trust
ratchet: 0; architecture violations: 0; typecheck: pass; compatibility readers: 42/42 pass;
ci:contract: pass including schemas and 8 lifecycle invariants. Flake classification: none; no test
retries.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T18:09:19.425Z
- Branch: task/202607221854-K7799B/close-all-agentplane-0-7-architecture-guard-viol
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/architecture/layering.imports.test.ts      | 97 ++--------------------
 .../src/commands/doctor/layering.test.ts           | 82 ++++++++++++++++++
 .../agentplane/src/commands/doctor/layering.ts     | 96 ++++++++++++++-------
 3 files changed, 154 insertions(+), 121 deletions(-)
```

</details>
