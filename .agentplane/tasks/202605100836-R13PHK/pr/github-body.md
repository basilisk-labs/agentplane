Task: `202605100836-R13PHK`
Title: Pre-v0.5: add Git mutation kind diagnostics type
Canonical task record: `.agentplane/tasks/202605100836-R13PHK/README.md`

## Summary

Pre-v0.5: add Git mutation kind diagnostics type

Introduce a GitMutationKind type for implementation_commit, lifecycle_commit, pr_artifact_update, close_tail, integration, and hook_check. Use it initially for diagnostics/logging without behavior changes.

## Scope

- In scope: Introduce a GitMutationKind type for implementation_commit, lifecycle_commit, pr_artifact_update, close_tail, integration, and hook_check. Use it initially for diagnostics/logging without behavior changes.
- Out of scope: unrelated refactors not required for "Pre-v0.5: add Git mutation kind diagnostics type".

## Verification

- State: ok
- Note: Verified GitMutationKind diagnostics type and staging metadata path.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T10:32:39.718Z
- Branch: task/202605100836-R13PHK/git-mutation-kind
- Head: 164524bc59f9

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 .../src/commands/guard/impl/allow.test.ts          |  37 ++
 .../agentplane/src/commands/guard/impl/allow.ts    |  33 ++
 .../src/commands/guard/impl/comment-commit.ts      |   1 +
 .../src/commands/guard/impl/commit-refresh.ts      |   1 +
 .../agentplane/src/commands/guard/impl/commit.ts   |   2 +
 packages/agentplane/src/shared/git-mutation.ts     |  28 ++
 7 files changed, 607 insertions(+)
```

</details>
