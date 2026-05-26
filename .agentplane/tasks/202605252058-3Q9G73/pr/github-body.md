Task: `202605252058-3Q9G73`
Title: Expand commit subject naming coverage
Canonical task record: `.agentplane/tasks/202605252058-3Q9G73/README.md`

## Summary

Expand commit subject naming coverage

Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability.

## Scope

- In scope: Extend commit subject policy to classify task commits, semantic hosted commits, merge transport commits, and known bot dependency commits so recent branch_pr history fits a documented naming convention without weakening task-bound traceability.
- Out of scope: unrelated refactors not required for "Expand commit subject naming coverage".

## Verification

- State: ok
- Note:

```text
Verified review feedback fix for default Git merge subject variants. Commands passed: bun test
packages/core/src/commit/commit-policy.test.ts (29 pass, 66 assertions), bun run format:changed, bun
run typecheck.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T21:01:26.272Z
- Branch: task/202605252058-3Q9G73/expand-commit-subject-naming-coverage
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/internal/pr-paths.test.ts      |  4 +-
 packages/core/src/commit/commit-policy.test.ts     | 54 ++++++++++++++++++++++
 packages/core/src/commit/commit-policy.ts          | 46 ++++++++++++++++--
 3 files changed, 99 insertions(+), 5 deletions(-)
```

</details>
