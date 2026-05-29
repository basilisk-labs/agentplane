Task: `202605281918-XQ1ZZ0`
Title: Hotspot baseline and refactor guardrails
Canonical task record: `.agentplane/tasks/202605281918-XQ1ZZ0/README.md`

## Summary

Hotspot baseline and refactor guardrails

Create a machine-readable hotspot baseline and guardrails for agent-critical refactors so each decomposition task proves reduced coupling and does not introduce new oversized agent-critical modules.

## Scope

- In scope: Create a machine-readable hotspot baseline and guardrails for agent-critical refactors so each decomposition task proves reduced coupling and does not introduce new oversized agent-critical modules.
- Out of scope: unrelated refactors not required for "Hotspot baseline and refactor guardrails".

## Verification

- State: ok
- Note:

```text
Hotspot guardrail report rebased onto current main and now exposes agent_critical_runtime_warnings
on top of zero runtime hotspots. Checks passed: bun test
packages/agentplane/src/cli/hotspot-report-script.test.ts (11 pass); node
scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600
--test-warning-lines 1000 --oversized-test-lines 1300 (runtime warnings 0, oversized runtime 0,
agent-critical runtime warnings 0); bun run typecheck; bun run arch:check; bun run knip:check; bun
run lint:core; bun run format:changed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T19:19:31.204Z
- Branch: task/202605281918-XQ1ZZ0/hotspot-baseline-refactor-guardrails
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/hotspot-report-script.test.ts          | 65 ++++++++++++++++++++
 scripts/checks/hotspot-report.mjs                  | 70 ++++++++++++++++++++++
 2 files changed, 135 insertions(+)
```

</details>
