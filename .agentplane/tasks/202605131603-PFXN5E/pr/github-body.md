Task: `202605131603-PFXN5E`
Title: Automate branch_pr merge queue finalization
Canonical task record: `.agentplane/tasks/202605131603-PFXN5E/README.md`

## Summary

Automate branch_pr merge queue finalization

Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop.

## Scope

- In scope: Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop.
- Out of scope: unrelated refactors not required for "Automate branch_pr merge queue finalization".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/integrate-queue.spec.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli/commands/init/execution.test.ts packages/agentplane/src/cli/command-guide.test.ts | Result: pass | Evidence: 5 files, 28 tests passed. Command: bun run typecheck | Result: pass | Evidence: tsc -b completed. Command: bunx eslint touched TS files | Result: pass | Evidence: no lint output after numeric separator fix. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: git diff --check | Result: pass | Evidence: no whitespace errors.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T18:30:21.702Z
- Branch: task/202605131603-PFXN5E/automate-merge-queue
- Head: bf0a9545d028

```text
 .agentplane/policy/workflow.branch_pr.md           |   9 +-
 .../blueprint/resolved-snapshot.json               | 514 +++++++++++++++++++++
 .github/workflows/publish.yml                      |   4 +-
 .github/workflows/task-hosted-close.yml            |   4 +-
 docs/user/cli-reference.generated.mdx              |   1 +
 .../agentplane/assets/policy/workflow.branch_pr.md |   9 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |   4 +-
 packages/agentplane/src/cli/command-guide.test.ts  |   6 +-
 packages/agentplane/src/cli/command-guide.ts       |   7 +-
 ...n-cli.core.pr-flow.integrate-validation.test.ts |  10 +-
 .../cli/run-cli/commands/init/execution.test.ts    |  49 ++
 .../src/cli/run-cli/commands/init/execution.ts     |  56 ++-
 .../src/cli/run-cli/commands/init/model.ts         |   1 +
 .../src/cli/run-cli/commands/init/orchestrate.ts   |   7 +
 .../src/commands/integrate-queue.command.ts        | 137 +++---
 .../src/commands/integrate-queue.spec.ts           |   9 +
 .../src/commands/pr/integrate/cmd.test.ts          | 188 +++++++-
 .../agentplane/src/commands/pr/integrate/cmd.ts    |  83 +++-
 .../pr/integrate/internal/github-pr-merge.ts       | 268 +++++++++++
 .../task/hosted-close-workflow-contract.test.ts    |   5 +-
 packages/core/schemas/task-handoff.schema.json     |   5 +-
 .../core/src/tasks/task-artifact-schema.handoff.ts |   5 +-
 packages/spec/schemas/task-handoff.schema.json     |   5 +-
 schemas/task-handoff.schema.json                   |   5 +-
 24 files changed, 1269 insertions(+), 122 deletions(-)
```

</details>
