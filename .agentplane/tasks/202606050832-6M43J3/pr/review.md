# PR Review

Created: 2026-06-05T08:33:23.598Z

## Task

- Task: `202606050832-6M43J3`
- Title: Recognize legacy pre-merge closure markers after rebase merge
- Status: DOING
- Branch: `task/202606050832-6M43J3/legacy-premerge-marker`
- Canonical task record: `.agentplane/tasks/202606050832-6M43J3/README.md`

## Verification

- State: ok
- Note: Verified on implementation commit bd3b3bcbd. Command: agentplane task verify-show 202606050832-6M43J3 | Result: pass | Evidence: blueprint code.branch_pr, snapshot current. Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 | Result: pass | Evidence: 2 files, 9 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts | Result: pass | Evidence: no output. Command: bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check | Result: pass | Evidence: All matched files use Prettier code style. Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: exited 0. Command: bun run --filter=agentplane build | Result: pass | Evidence: dist/cli.js and release manifest generated.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-05T08:33:23.598Z
- Branch: task/202606050832-6M43J3/legacy-premerge-marker
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202606050808-HP5P63/README.md    | 25 ++++++++++++++---
 .agentplane/tasks/202606050808-HP5P63/pr/meta.json |  6 ++++
 .../commands/shared/pr-meta/pre-merge-closure.ts   | 15 +++++++++-
 .../src/commands/task/finish-execute-close.ts      |  1 +
 .../task/finish.pre-merge-closure.unit.test.ts     |  9 +++++-
 .../src/commands/task/hosted-close.command.test.ts | 32 +++++++++++++++++-----
 .../src/commands/task/hosted-close.command.ts      | 10 +++++--
 7 files changed, 83 insertions(+), 15 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
