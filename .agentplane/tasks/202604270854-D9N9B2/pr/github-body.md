## Summary

Introduce runner run repository contracts

Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation.

## Scope

- In scope: Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation.
- Out of scope: unrelated refactors not required for "Introduce runner run repository contracts".

## Verification

- State: ok
- Note: Command: bun run test:project -- agentplane packages/agentplane/src/runner; Result: pass, 16 files and 77 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts; Result: pass, 5 files and 19 tests. Command: bun run typecheck; Result: pass after framework:dev:bootstrap refreshed local package exports. Scope: existing RunnerRunRepository and task runner projection contracts on current main.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T05:39:03.730Z
- Branch: task/202604270854-D9N9B2/runner-run-repository-contracts
- Head: a51c23fa55fb

```text
No changes detected.
```

</details>
