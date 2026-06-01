# PR Review

Created: 2026-06-01T08:22:02.401Z

## Task

- Task: `202606010805-1H64FF`
- Title: Close commits must include all task artifacts
- Status: DOING
- Branch: `task/202606010805-1H64FF/close-commits-must-include-all-task-artifacts`
- Canonical task record: `.agentplane/tasks/202606010805-1H64FF/README.md`

## Verification

- State: ok
- Note: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts => pass, 12 tests; Command: bun vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts => pass, 5 tests; Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts => pass, 13 tests; Command: bun run docs:cli:check => pass; Command: node .agentplane/policy/check-routing.mjs => policy routing OK; Command: git diff --check => pass; Command: git status --short --untracked-files=all => only intentional task implementation and task evidence changes remain.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T08:22:02.401Z
- Branch: task/202606010805-1H64FF/close-commits-must-include-all-task-artifacts
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              | 10 ++---
 packages/agentplane/src/cli/reason-codes.ts        |  2 +-
 ...run-cli.core.guard.commit-wrapper.close.test.ts | 10 +++--
 packages/agentplane/src/commands/commit.spec.ts    |  6 +--
 packages/agentplane/src/commands/finish.spec.ts    |  4 +-
 .../guard/impl/commands.commit-close.unit.test.ts  | 46 ++++++++++++++++++++++
 .../src/commands/guard/impl/commit-stage.ts        | 14 ++++++-
 7 files changed, 77 insertions(+), 15 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
