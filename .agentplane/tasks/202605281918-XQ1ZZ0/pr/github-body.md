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
Verified current PR head after nested workflow hotspot guardrail fix and evaluator evidence refresh.
Checks passed: bun test packages/agentplane/src/cli/hotspot-report-script.test.ts; node
scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600
--test-warning-lines 1000 --oversized-test-lines 1300; bun run typecheck; bun run arch:check; bun
run knip:check; bun run lint:core; bun run format:changed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T19:19:31.204Z
- Branch: task/202605281918-XQ1ZZ0/hotspot-baseline-refactor-guardrails
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/hotspot-report-script.test.ts          | 85 ++++++++++++++++++++++
 scripts/checks/hotspot-report.mjs                  | 71 ++++++++++++++++++
 2 files changed, 156 insertions(+)
```

</details>
