Task: `202605100832-EATWKQ`
Title: Consolidate branch_pr umbrella and finalize flow
Canonical task record: `.agentplane/tasks/202605100832-EATWKQ/README.md`

## Summary

Consolidate branch_pr umbrella and finalize flow

Clarify and harden branch_pr umbrella-task batching, cleanup/finalize behavior after hosted merges, and integration queue conflict prevention without weakening verification or task traceability.

## Scope

- In scope: Clarify and harden branch_pr umbrella-task batching, cleanup/finalize behavior after hosted merges, and integration queue conflict prevention without weakening verification or task traceability.
- Out of scope: unrelated refactors not required for "Consolidate branch_pr umbrella and finalize flow".

## Verification

- State: ok
- Note: Implemented branch_pr umbrella-task guidance, cleanup merged --finalize, and integration queue base-overlap stale detection. Checks passed: targeted vitest 26/26, prettier check, eslint changed TS files, docs:cli:check, policy routing, ap doctor.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T08:38:58.273Z
- Branch: task/202605100832-EATWKQ/umbrella-finalize
- Head: 7e43b58b7956

```text
 .../blueprint/resolved-snapshot.json               | 497 +++++++++++++++++++++
 docs/user/branching-and-pr-artifacts.mdx           |  15 +
 docs/user/cli-reference.generated.mdx              |   7 +
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    |   3 +-
 .../src/commands/branch/cleanup-merged.ts          |   8 +
 .../src/commands/cleanup/merged.command.ts         |  20 +-
 .../src/commands/integrate-queue.command.ts        |  40 +-
 .../src/commands/pr/integrate/queue-state.test.ts  |  31 ++
 .../src/commands/pr/integrate/queue-state.ts       |  19 +
 9 files changed, 632 insertions(+), 8 deletions(-)
```

</details>
