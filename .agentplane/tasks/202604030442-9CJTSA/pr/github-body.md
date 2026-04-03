## Summary

F-003 Introduce capability registry

Define a reusable capability model and registry for commands, skills, tools, agents, and runners.

## Scope

- In scope: Define a reusable capability model and registry for commands, skills, tools, agents, and runners.
- Out of scope: unrelated refactors not required for "F-003 Introduce capability registry".

## Verification

### Plan

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/capabilities/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/policy-decision.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --hookTimeout 60000 --testTimeout 60000.

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

- Updated: 2026-04-03T09:59:51.106Z
- Branch: task/202604030442-9CJTSA/capability-registry
- Head: 7bce712c17f1

```text
 packages/agentplane/src/runner/artifacts.test.ts   |  47 +++++
 packages/agentplane/src/runner/artifacts.ts        |   2 +
 .../src/runner/context/recipe-context.ts           |   5 +
 packages/agentplane/src/runner/types.ts            |   4 +
 .../usecases/scenario-materialize-task.test.ts     |  20 ++
 .../agentplane/src/runner/usecases/task-run.ts     |   6 +
 .../agentplane/src/runtime/capabilities/backend.ts | 139 +++++++++++++
 .../agentplane/src/runtime/capabilities/index.ts   |  18 ++
 .../agentplane/src/runtime/capabilities/recipe.ts  | 155 +++++++++++++++
 .../src/runtime/capabilities/registry.ts           |  91 +++++++++
 .../src/runtime/capabilities/resolve.test.ts       | 215 +++++++++++++++++++++
 .../agentplane/src/runtime/capabilities/runner.ts  |  89 +++++++++
 .../agentplane/src/runtime/capabilities/types.ts   |  49 +++++
 .../src/usecases/context/resolve-context.ts        |   9 +
 .../usecases/context/resolve-context.unit.test.ts  |  50 ++++-
 15 files changed, 896 insertions(+), 3 deletions(-)
```

</details>
