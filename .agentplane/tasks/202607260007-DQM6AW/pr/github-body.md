Task: `202607260007-DQM6AW`
Title: Prepare semantic conflict rework routes
Canonical task record: `.agentplane/tasks/202607260007-DQM6AW/README.md`

## Summary

Make a queued protected-PR conflict actionable for a semantic CODER without turning the CLI into a semantic resolver. The CLI must prepare current bounded context and a task-scoped handoff, then fail closed whenever that context is stale or incomplete.

## Scope

In scope: branch_pr queue conflict detection, provider-backed freshness and provenance, a bounded conflict-rework packet, next-action and worktree handoff routing, invalidation, and focused tests. Current concrete regression: THDN 202607252223-THDN0G PR #4626 has head 040d8df0eaf431e2292eb161efe80e1466ffbd8e and provider reports DIRTY or CONFLICTING after main e27c938698668ce242243d166f8c7c1b64cce88f. Out of scope: choosing semantic resolution, applying conflict hunks, automatic git rebase or merge, automatic force-push, silent branch rewrite, direct provider merge, or generic queue redesign.

## Verification

- State: needs_rework
- Note:

```text
Rework: full lint is not clean, and stale queue or handoff identity can still unlock the semantic
conflict route.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T00:55:55.843Z
- Branch: task/202607260007-DQM6AW/prepare-semantic-conflict-rework-routes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  24 +
 .../cli/run-cli.core.pr-conflict-rework.test.ts    | 349 +++++++++++
 .../src/cli/run-cli/command-catalog/project.ts     |   3 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../src/commands/pr/conflict-rework.test.ts        | 409 +++++++++++++
 .../agentplane/src/commands/pr/conflict-rework.ts  | 650 +++++++++++++++++++++
 packages/agentplane/src/commands/pr/flow-status.ts |  24 +
 .../pr/integrate/internal/github-protection.ts     |  35 +-
 .../src/commands/pr/internal/sync-github.test.ts   |  68 ++-
 .../src/commands/pr/internal/sync-github.ts        | 111 +++-
 packages/agentplane/src/commands/pr/pr.command.ts  |  16 +
 packages/agentplane/src/commands/pr/pr.spec.ts     |  58 +-
 .../src/commands/shared/route-decision-blockers.ts |  25 +
 .../src/commands/shared/route-decision-types.ts    |   2 +
 .../src/commands/shared/route-decision.ts          |  21 +-
 .../agentplane/src/commands/shared/route-oracle.ts |   2 +
 .../src/commands/shared/workflow-step-branch.ts    |  16 +-
 .../src/commands/shared/workflow-step-factory.ts   |  61 ++
 .../shared/workflow-step-projections.test.ts       | 222 +++++++
 .../commands/shared/workflow-step-projections.ts   |  10 +-
 .../src/commands/shared/workflow-step.ts           |   2 +
 .../src/commands/task/next-action.command.ts       |  22 +
 22 files changed, 2094 insertions(+), 40 deletions(-)
```

</details>
