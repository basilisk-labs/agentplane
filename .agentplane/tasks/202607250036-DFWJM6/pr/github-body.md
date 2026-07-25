Task: `202607250036-DFWJM6`
Title: Publish rebased PR branches with an explicit force-with-lease
Canonical task record: `.agentplane/tasks/202607250036-DFWJM6/README.md`

## Summary

Publish rebased PR branches with an explicit force-with-lease

Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.

## Scope

- In scope: Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.
- Out of scope: unrelated refactors not required for "Publish rebased PR branches with an explicit force-with-lease".

## Verification

- State: ok
- Note:

```text
Independent review PASS at 8d06aecb: 20/20 focused publication tests passed; exact repo-bound
force-with-lease and all fail-closed cases verified; typecheck, lint:core, hotspots, architecture,
task-state, task lint, routing, diff-check, and doctor passed. Unchanged website lint baseline
remains outside scope.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T01:04:43.697Z
- Branch: task/202607250036-DFWJM6/force-with-lease-pr-publish
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/branch-publication.test.ts     | 452 +++++++++++++++++++++
 .../src/commands/pr/branch-publication.ts          | 284 +++++++++++++
 .../src/commands/pr/internal/sync-github.ts        |   2 +-
 packages/agentplane/src/commands/pr/open.ts        | 138 +------
 4 files changed, 740 insertions(+), 136 deletions(-)
```

</details>
