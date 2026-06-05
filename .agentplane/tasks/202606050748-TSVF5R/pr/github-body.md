Task: `202606050748-TSVF5R`
Title: Tolerate rebased pre-merge closure in hosted-close
Canonical task record: `.agentplane/tasks/202606050748-TSVF5R/README.md`

## Summary

Tolerate rebased pre-merge closure in hosted-close

Fix hosted-close so a task already closed before merge does not fail when GitHub rebase merge rewrites the recorded pre_merge_closure basis commit and the original branch SHA is absent in the hosted close checkout.

## Scope

- In scope: Fix hosted-close so a task already closed before merge does not fail when GitHub rebase merge rewrites the recorded pre_merge_closure basis commit and the original branch SHA is absent in the hosted close checkout.
- Out of scope: unrelated refactors not required for "Tolerate rebased pre-merge closure in hosted-close".

## Verification

- State: ok
- Note:

```text
Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts --config
vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000
--hookTimeout 60000. Result: pass; 1 file / 6 tests passed. Command: node
node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts
packages/agentplane/src/commands/task/hosted-close.command.test.ts. Result: pass. Command: bun run
--filter=agentplane typecheck. Result: pass. Command: bun run --filter=agentplane build. Result:
pass. Review fix: missing basis tolerance now requires explicit matching pr_number.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-05T07:48:57.074Z
- Branch: task/202606050748-TSVF5R/tolerate-rebased-pre-merge-closure
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/hosted-close.command.test.ts | 58 ++++++++++++++++++++++
 .../src/commands/task/hosted-close.command.ts      | 19 ++++++-
 2 files changed, 76 insertions(+), 1 deletion(-)
```

</details>
