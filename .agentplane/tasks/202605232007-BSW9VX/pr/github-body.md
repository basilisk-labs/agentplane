Task: `202605232007-BSW9VX`
Title: Use linear PR merges and clean hosted-close messages
Canonical task record: `.agentplane/tasks/202605232007-BSW9VX/README.md`

## Summary

Use linear PR merges and clean hosted-close messages

Reduce branch_pr history noise while preserving source PR history by using linear/rebase merges where supported and improving hosted close PR/commit message clarity.

## Scope

- In scope: Reduce branch_pr history noise while preserving source PR history by using linear/rebase merges where supported and improving hosted close PR/commit message clarity.
- Out of scope: unrelated refactors not required for "Use linear PR merges and clean hosted-close messages".

## Verification

- State: ok
- Note:

```text
Command:
TMPDIR="/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tmp/test-tmp"
bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts
packages/agentplane/src/commands/guard/impl/close-message.test.ts
packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts
packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts
packages/agentplane/src/cli/command-guide.test.ts; Result: pass; Evidence: 5 test files passed, 42
tests passed after Codex review fixes. Scope: rebase-preferred merge with merge fallback,
multi-command verification parsing, hosted-close title/workflow contracts. Command: bunx eslint
packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts
packages/agentplane/src/commands/pr/integrate/cmd.test.ts
packages/agentplane/src/commands/guard/impl/close-message.ts
packages/agentplane/src/commands/guard/impl/close-message.test.ts
packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts
packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts
packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts; Result: pass; Evidence:
eslint exited 0 with no output. Scope: touched TypeScript files. Command: git diff --check; Result:
pass; Evidence: no whitespace errors. Scope: full diff. Command: gh pr checks 4118 --watch
--interval 15; Result: pass before review-fix re-push; Evidence: hosted CI on rebased head 405fb8260
was green before addressing review comments. Scope: GitHub hosted gate.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T20:09:30.180Z
- Branch: task/202605232007-BSW9VX/linear-merge-messages
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/task-hosted-close.yml            |  4 +-
 docs/user/branching-and-pr-artifacts.mdx           |  6 +-
 docs/user/commands.mdx                             |  2 +-
 docs/user/task-lifecycle.mdx                       |  6 +-
 docs/user/workflow.mdx                             |  6 +-
 packages/agentplane/src/cli/command-guide.test.ts  |  2 +-
 packages/agentplane/src/cli/command-guide.ts       |  2 +-
 .../cli/prepare-hosted-task-closure-script.test.ts | 25 ++++++
 .../src/commands/guard/impl/close-message.test.ts  | 31 ++++++++
 .../src/commands/guard/impl/close-message.ts       | 19 ++++-
 .../src/commands/pr/integrate/cmd.test.ts          |  7 +-
 .../pr/integrate/internal/github-pr-merge.ts       | 91 +++++++++++++++++++---
 .../task/hosted-close-workflow-contract.test.ts    |  5 +-
 scripts/workflow/prepare-hosted-task-closure.mjs   | 12 ++-
 14 files changed, 188 insertions(+), 30 deletions(-)
```

</details>
