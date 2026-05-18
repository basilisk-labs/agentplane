# PR Review

Created: 2026-05-17T17:11:05.091Z

## Task

- Task: `202605171455-ZS8AE7`
- Title: Configurable branch naming contract
- Status: DOING
- Branch: `task/202605171455-ZS8AE7/branch-naming-contract`
- Canonical task record: `.agentplane/tasks/202605171455-ZS8AE7/README.md`

## Verification

- State: ok
- Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/core/src/git/git-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; Result: pass; Evidence: 5 files, 75 tests passed. Command: bunx vitest run packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; Result: pass; Evidence: 2 files, 8 tests passed. Command: bun scripts/generate/sync-schemas.mjs check; Result: pass; Evidence: schemas OK. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: exit 0 with 2 pre-existing branch_pr drift warnings. Command: git diff --check; Result: pass. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:40:09.677Z
- Branch: task/202605171455-ZS8AE7/branch-naming-contract
- Head: 5264872abdb0

```text
 .../blueprint/resolved-snapshot.json               | 535 +++++++++++++++++++++
 docs/user/branching-and-pr-artifacts.mdx           |   7 +-
 docs/user/commands.mdx                             |   4 +
 docs/user/configuration.mdx                        |  14 +
 docs/user/task-lifecycle.mdx                       |   4 +
 docs/user/workflow.mdx                             |   5 +
 .../agentplane/assets/policy/workflow.branch_pr.md |   5 +
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    |   1 +
 .../src/cli/run-cli.core.pr-flow.test.ts           |  72 +++
 .../src/commands/branch/cleanup-merged.ts          |   8 +-
 .../agentplane/src/commands/branch/work-start.ts   |  13 +-
 .../src/commands/hooks/run.commit-msg.ts           |   1 +
 .../src/commands/hooks/run.pre-commit.ts           |   6 +-
 .../agentplane/src/commands/hooks/task-context.ts  |  19 +-
 packages/agentplane/src/commands/pr/flow-status.ts |  14 +-
 .../agentplane/src/commands/task/finish-close.ts   |  12 +-
 .../commands/task/finish.close-tail.unit.test.ts   |   3 +-
 .../src/commands/task/hosted-close-pr.precheck.ts  |  21 +-
 .../task/hosted-merge-sync/local-branch.ts         |  18 +-
 packages/core/schemas/config.schema.json           | 274 +++++++++--
 packages/core/src/config/config.test.ts            |  17 +
 packages/core/src/config/schema.impl.ts            |  12 +-
 packages/core/src/config/workflow-file.ts          |   2 +-
 packages/core/src/git/git-worktree.test.ts         |  57 +++
 packages/core/src/git/git-worktree.ts              |  39 +-
 packages/core/src/git/index.ts                     |   4 +
 packages/core/src/index.ts                         |   4 +
 packages/spec/schemas/config.schema.json           | 274 +++++++++--
 schemas/config.schema.json                         | 274 +++++++++--
 scripts/release/release-task-evidence.mjs          |  34 +-
 scripts/workflow/prepare-hosted-task-closure.mjs   |  43 +-
 31 files changed, 1620 insertions(+), 176 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
