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
Verified commit subject naming coverage expansion. Commands passed: bun test
packages/core/src/commit/commit-policy.test.ts (29 pass), node .agentplane/policy/check-routing.mjs
(policy routing OK), bun run typecheck (tsc -b passed), bun run format:changed (Prettier passed).
Diff remained limited to commit policy, focused tests, and task README.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T21:01:26.272Z
- Branch: task/202605252058-3Q9G73/expand-commit-subject-naming-coverage
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/core/src/commit/commit-policy.test.ts | 52 ++++++++++++++++++++++++++
 packages/core/src/commit/commit-policy.ts      | 44 ++++++++++++++++++++--
 2 files changed, 92 insertions(+), 4 deletions(-)
```

</details>
