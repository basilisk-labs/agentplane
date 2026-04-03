## Summary

F-004 Introduce precedence core

Formalize framework-level behavior precedence and traceable conflict resolution.

## Scope

- In scope: Formalize framework-level behavior precedence and traceable conflict resolution.
- Out of scope: unrelated refactors not required for "F-004 Introduce precedence core".

## Verification

### Plan

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/behavior/resolve.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-03T10:23:01.706Z
- Branch: task/202604030442-YD0K3G/precedence-core
- Head: 09db9a0c5e57

```text
 .../src/runner/context/base-prompts.test.ts        |  41 +++-
 .../agentplane/src/runner/context/base-prompts.ts  | 233 ++++++++++++++++-----
 packages/agentplane/src/runner/types.ts            |   2 +
 packages/agentplane/src/runtime/behavior/index.ts  |   8 +
 .../src/runtime/behavior/resolve.test.ts           | 113 ++++++++++
 .../agentplane/src/runtime/behavior/resolve.ts     | 103 +++++++++
 packages/agentplane/src/runtime/behavior/types.ts  |  31 +++
 7 files changed, 481 insertions(+), 50 deletions(-)
```

</details>
