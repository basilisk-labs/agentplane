# PR Review

Created: 2026-05-25T19:41:23.691Z

## Task

- Task: `202605251936-1HC32Z`
- Title: Fix active task selector projection fallback
- Status: DOING
- Branch: `task/202605251936-1HC32Z/fix-active-task-selector-projection-fallback`
- Canonical task record: `.agentplane/tasks/202605251936-1HC32Z/README.md`

## Verification

- State: ok
- Note: Follow-up after review: preserved native projection fast path for done-only rows and added no-active selector guidance instead of a canonical fallback scan. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts; Result: pass; Evidence: 2 files, 27 tests passed. Command: bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts; Result: pass; Evidence: 1 file, 12 tests passed. Command: bun run typecheck, bun run format:check, node .agentplane/policy/check-routing.mjs, ap doctor; Result: pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T19:41:23.691Z
- Branch: task/202605251936-1HC32Z/fix-active-task-selector-projection-fallback
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.tasks.active.test.ts      | 34 ++++++++++++++++++
 .../src/commands/shared/task-backend.test.ts       | 41 ++++++++++++++++++++++
 .../agentplane/src/commands/task/active.command.ts |  5 +++
 3 files changed, 80 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
