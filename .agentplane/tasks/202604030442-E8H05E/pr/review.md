# PR Review

Created: 2026-04-03T13:40:36.755Z
Branch: task/202604030442-E8H05E/explain-hooks

## Summary

F-009 Introduce explain hooks

Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs.

## Scope

- In scope: Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs.
- Out of scope: unrelated refactors not required for "F-009 Introduce explain hooks".

## Verification

### Plan

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Implemented framework explain hooks, threaded machine-readable payloads into canonical context and runner bundles, and verified with typecheck plus targeted vitest for explain/context/runner/CLI flows.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-03T13:53:40.925Z
- Branch: task/202604030442-E8H05E/explain-hooks
- Head: b2e825bc4b59

```text
 .../src/cli/run-cli.core.tasks.query.test.ts       |  56 +++++
 .../agentplane/src/cli/run-cli.scenario.test.ts    |  37 +++
 packages/agentplane/src/runner/types.ts            |   2 +
 .../agentplane/src/runner/usecases/task-run.ts     |  26 +++
 packages/agentplane/src/runtime/explain/index.ts   |   6 +
 .../agentplane/src/runtime/explain/resolve.test.ts | 247 +++++++++++++++++++++
 packages/agentplane/src/runtime/explain/resolve.ts |  71 ++++++
 packages/agentplane/src/runtime/explain/types.ts   |  30 +++
 .../src/usecases/context/resolve-context.ts        |  40 ++--
 .../usecases/context/resolve-context.unit.test.ts  |  31 +++
 10 files changed, 532 insertions(+), 14 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
