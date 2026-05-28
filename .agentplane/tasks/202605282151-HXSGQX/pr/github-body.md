Task: `202605282151-HXSGQX`
Title: Task brief command decomposition
Canonical task record: `.agentplane/tasks/202605282151-HXSGQX/README.md`

## Summary

Task brief command decomposition

Decompose packages/agentplane/src/commands/task/brief.command.ts by extracting pure brief assembly/rendering helpers while preserving task brief output and reducing hotspot pressure for agent-facing context commands. Verify with focused task brief CLI tests, typecheck, lint, arch deps, format, and hotspot report.

## Scope

- In scope: Decompose packages/agentplane/src/commands/task/brief.command.ts by extracting pure brief assembly/rendering helpers while preserving task brief output and reducing hotspot pressure for agent-facing context commands. Verify with focused task brief CLI tests, typecheck, lint, arch deps, format, and hotspot report.
- Out of scope: unrelated refactors not required for "Task brief command decomposition".

## Verification

- State: ok
- Note:

```text
Verification passed. Commands: bunx vitest run
packages/agentplane/src/cli/run-cli.core.route-decision.test.ts
packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts --config vitest.workspace.ts
(2 files, 13 tests passed); bun run arch:deps (no dependency violations); bun run typecheck
(passed); bun run lint:core (passed); bun run format:changed (passed); node
scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600
--test-warning-lines 1000 --oversized-test-lines 1300 (passed, runtime warnings 42 -> 41).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T21:52:17.186Z
- Branch: task/202605282151-HXSGQX/task-brief-command-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
