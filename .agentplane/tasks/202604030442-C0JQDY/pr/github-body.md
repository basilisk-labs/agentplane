## Summary

F-006 Introduce approval runtime

Make approvals a first-class runtime gateway for network, filesystem, git, and config mutations.

## Scope

- In scope: Make approvals a first-class runtime gateway for network, filesystem, git, and config mutations.
- Out of scope: unrelated refactors not required for "F-006 Introduce approval runtime".

## Verification

### Plan

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Introduced a first-class approval runtime, threaded it into the canonical execution context, and routed config/fs/git/network mutation paths through the shared gateway; verified with typecheck plus approval, config, recipes, release, and context test suites.

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

- Updated: 2026-04-03T10:56:04.072Z
- Branch: task/202604030442-C0JQDY/approval-runtime
- Head: f8ce249848d3

```text
 .../agentplane/src/cli/run-cli/commands/config.ts  |  13 ++
 .../commands/recipes/impl/commands/cache-prune.ts  |  15 ++
 .../src/commands/recipes/impl/commands/remove.ts   |  10 +-
 .../src/commands/release/apply.command.ts          |   8 +
 .../src/commands/shared/approval-requirements.ts   | 133 +--------------
 packages/agentplane/src/runtime/approvals/index.ts |  13 ++
 .../src/runtime/approvals/runtime.test.ts          |  86 ++++++++++
 .../agentplane/src/runtime/approvals/runtime.ts    | 187 +++++++++++++++++++++
 packages/agentplane/src/runtime/approvals/types.ts |  37 ++++
 .../src/usecases/context/resolve-context.ts        |   6 +-
 10 files changed, 377 insertions(+), 131 deletions(-)
```

</details>
