Task: `202605251936-1HC32Z`
Title: Fix active task selector projection fallback
Canonical task record: `.agentplane/tasks/202605251936-1HC32Z/README.md`

## Summary

Fix active task selector projection fallback

Fix the task list/task active selector path so active TODO tasks visible to direct task lookup are not silently hidden by stale or incomplete projection state.

## Scope

- In scope: Fix the task list/task active selector path so active TODO tasks visible to direct task lookup are not silently hidden by stale or incomplete projection state.
- Out of scope: unrelated refactors not required for "Fix active task selector projection fallback".

## Verification

- State: ok
- Note:

```bash
bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts; \
  Result: pass; Evidence: 1 file, 12 tests passed. Scope: regression for native projection fallback \
  when DONE dependency rows hide active tasks. Command: bun run test:project -- cli-core \
  packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts \
  packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts; Result: pass; Evidence: 2 \
  files, 26 tests passed. Scope: active/list query behavior. Command: bun run test:project -- \
  cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; Result: pass; Evidence: \
  1 file, 9 tests passed. Scope: route context commands. Command: bun run typecheck; Result: pass. \
  Scope: repository TypeScript build graph. Command: node .agentplane/policy/check-routing.mjs and \
  ap doctor; Result: pass; Evidence: policy routing OK and doctor OK. Scope: policy/workspace \
  health.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T19:41:23.691Z
- Branch: task/202605251936-1HC32Z/fix-active-task-selector-projection-fallback
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/task-backend.test.ts       | 42 ++++++++++++++++++++++
 .../agentplane/src/commands/shared/task-backend.ts | 19 +++++++++-
 2 files changed, 60 insertions(+), 1 deletion(-)
```

</details>
