## Summary

F-002 Introduce AgentplaneExecutionContext

Create one canonical execution context for task, recipe, and runner paths.

## Scope

- In scope: Create one canonical execution context for task, recipe, and runner paths.
- Out of scope: unrelated refactors not required for "F-002 Introduce AgentplaneExecutionContext".

## Verification

### Plan

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.

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

- Updated: 2026-04-03T09:35:47.427Z
- Branch: task/202604030442-Y53F5X/agentplane-execution-context
- Head: 851552f13674

```text
 .agentplane/tasks/202604030442-Y53F5X/README.md    | 127 +++++++++++++++++++--
 .../tasks/202604030442-Y53F5X/pr/diffstat.txt      |  20 ++++
 .../tasks/202604030442-Y53F5X/pr/github-body.md    |  69 +++++++++++
 .../tasks/202604030442-Y53F5X/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604030442-Y53F5X/pr/meta.json |  14 +++
 .../tasks/202604030442-Y53F5X/pr/notes.jsonl       |   0
 .agentplane/tasks/202604030442-Y53F5X/pr/review.md |  76 ++++++++++++
 .../tasks/202604030442-Y53F5X/pr/verify.log        |   0
 packages/agentplane/src/cli/run-cli.ts             |   4 +-
 .../runner/usecases/scenario-materialize-task.ts   |  18 +--
 .../src/runner/usecases/task-run-inspect.ts        |  16 +--
 .../runner/usecases/task-run-lifecycle-shared.ts   |  17 ++-
 .../agentplane/src/runner/usecases/task-run.ts     |  27 +++--
 .../src/usecases/context/resolve-context.ts        | 117 +++++++++++++++++--
 .../usecases/context/resolve-context.unit.test.ts  |  94 ++++++++++++++-
 .../src/usecases/task/task-list-usecase.ts         |   4 +-
 .../usecases/task/task-list-usecase.unit.test.ts   |   2 +-
 .../src/usecases/task/task-new-usecase.ts          |   8 +-
 18 files changed, 544 insertions(+), 70 deletions(-)
```

</details>
