Task: `202606050808-HP5P63`
Title: Tolerate pre-merge DONE commit after rebase merge
Canonical task record: `.agentplane/tasks/202606050808-HP5P63/README.md`

## Summary

Tolerate pre-merge DONE commit after rebase merge

Hosted-close must treat a pre-merge closure DONE commit that records the original implementation commit as already closed after GitHub rebase merge rewrites the merge SHA. Reproduce the PR #4457 failure and add a regression so hosted close no-ops only for matching task/pr closure metadata, without masking stale branch conflicts.

## Scope

- In scope: Hosted-close must treat a pre-merge closure DONE commit that records the original implementation commit as already closed after GitHub rebase merge rewrites the merge SHA. Reproduce the PR #4457 failure and add a regression so hosted close no-ops only for matching task/pr closure metadata, without masking stale branch conflicts.
- Out of scope: unrelated refactors not required for "Tolerate pre-merge DONE commit after rebase merge".

## Verification

- State: ok
- Note:

```bash
agentplane task verify-show 202606050808-HP5P63 | Result: pass | Evidence: blueprint \
  quality.regression, snapshot current, code-regression evidence required. Command: bunx vitest run \
  packages/agentplane/src/commands/task/hosted-close.command.test.ts --config vitest.workspace.ts \
  --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 | Result: \
  pass | Evidence: 1 file, 8 tests passed, including missing pre-merge basis bound to task close \
  commit. Command: node node_modules/eslint/bin/eslint.js \
  packages/agentplane/src/commands/task/hosted-close.command.ts \
  packages/agentplane/src/commands/task/hosted-close.command.test.ts | Result: pass | Evidence: no \
  lint output. Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: exited 0. \
  Command: bun run --filter=agentplane build | Result: pass | Evidence: dist/cli.js build and \
  release manifest generation passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-05T08:08:46.250Z
- Branch: task/202606050808-HP5P63/rebase-premerge-done
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
