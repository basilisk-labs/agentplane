Task: `202609140657-5REY71`
Title: Add supervisor-owned base synchronization before semantic work on stale branch_pr candidates
Canonical task record: `.agentplane/tasks/202609140657-5REY71/README.md`

## Summary

Add supervisor-owned base synchronization before semantic work on stale branch_pr candidates

Implement a deterministic AgentPlane lifecycle route for an already-started branch_pr task whose approved WorkItem requires its preserved candidate branch to adopt an exact newer qualified base before semantic edits. The supervisor must own the Git or provider synchronization, bind it to exact branch/head/base identities, preserve existing candidate commits and unrelated work, fail closed on conflict or stale identity, and issue the next semantic packet only after verified base ancestry. An external semantic executor must never be asked to rebase, merge, cherry-pick, commit, force-push, or rewrite Git history. Cover the release-task failure demonstrated by task 202609121424-49XXT3, then integrate the fix through protected branch_pr workflow so that release 0.7.9 can resume.

## Scope

- In scope: Implement a deterministic AgentPlane lifecycle route for an already-started branch_pr task whose approved WorkItem requires its preserved candidate branch to adopt an exact newer qualified base before semantic edits. The supervisor must own the Git or provider synchronization, bind it to exact branch/head/base identities, preserve existing candidate commits and unrelated work, fail closed on conflict or stale identity, and issue the next semantic packet only after verified base ancestry. An external semantic executor must never be asked to rebase, merge, cherry-pick, commit, force-push, or rewrite Git history. Cover the release-task failure demonstrated by task 202609121424-49XXT3, then integrate the fix through protected branch_pr workflow so that release 0.7.9 can resume.
- Out of scope: unrelated refactors not required for "Add supervisor-owned base synchronization before semantic work on stale branch_pr candidates".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-14T07:56:33.783Z
- Branch: task/202609140657-5REY71/add-supervisor-owned-base-synchronization-before
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/branch/sync-task-base.test.ts     | 126 ++++++++++++++
 .../src/commands/branch/sync-task-base.ts          | 165 ++++++++++++++++++
 .../commands/shared/branch-base-sync-route.test.ts | 184 +++++++++++++++++++++
 .../src/commands/shared/branch-base-sync-route.ts  | 164 ++++++++++++++++++
 .../src/commands/shared/route-decision.ts          |  11 ++
 .../src/commands/shared/side-effect-authority.ts   |   1 +
 .../commands/shared/workflow-operation-effects.ts  |   1 +
 .../commands/shared/workflow-operation-prefix.ts   |   1 +
 .../workflow-operation-projection.registry.test.ts |  10 ++
 .../shared/workflow-operation-projection.ts        |   3 +
 .../src/commands/shared/workflow-postconditions.ts |   6 +
 .../shared/workflow-step-branch-base-sync.ts       |  63 +++++++
 .../commands/shared/workflow-step-branch-state.ts  |  18 ++
 .../src/commands/shared/workflow-step-branch.ts    |  22 +--
 .../commands/shared/workflow-step-fingerprint.ts   |   1 +
 .../workflow-step-projections-routing.test.ts      |  57 +++++++
 .../src/commands/shared/workflow-step.ts           |   7 +
 .../task/branch-task-supervisor-operations.test.ts |  60 ++++++-
 .../task/branch-task-supervisor-operations.ts      |  20 +++
 19 files changed, 902 insertions(+), 18 deletions(-)
```

</details>
