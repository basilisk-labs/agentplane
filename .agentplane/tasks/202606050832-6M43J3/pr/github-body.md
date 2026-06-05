Task: `202606050832-6M43J3`
Title: Recognize legacy pre-merge closure markers after rebase merge
Canonical task record: `.agentplane/tasks/202606050832-6M43J3/README.md`

## Summary

Recognize legacy pre-merge closure markers after rebase merge

Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct.

## Scope

- In scope: Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct.
- Out of scope: unrelated refactors not required for "Recognize legacy pre-merge closure markers after rebase merge".

## Verification

- State: ok
- Note:

```bash
agentplane task verify-show 202606050832-6M43J3 | Result: pass | Evidence: blueprint code.branch_pr, \
  snapshot current, code_pr evidence required. Command: bunx vitest run \
  packages/agentplane/src/commands/task/hosted-close.command.test.ts \
  packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config \
  vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 \
  --hookTimeout 60000 | Result: pass | Evidence: 2 files, 9 tests passed. Command: node \
  node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts \
  packages/agentplane/src/commands/task/hosted-close.command.test.ts \
  packages/agentplane/src/commands/task/finish-execute-close.ts \
  packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts \
  packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts | Result: pass | Evidence: no \
  output. Command: bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts \
  packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts \
  packages/agentplane/src/commands/task/hosted-close.command.ts \
  packages/agentplane/src/commands/task/finish-execute-close.ts \
  packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check | Result: pass | \
  Evidence: All matched files use Prettier code style. Command: bun run --filter=agentplane \
  typecheck | Result: pass | Evidence: exited 0. Command: bun run --filter=agentplane build | \
  Result: pass | Evidence: dist/cli.js and release manifest generated.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-05T08:33:23.598Z
- Branch: task/202606050832-6M43J3/legacy-premerge-marker
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
