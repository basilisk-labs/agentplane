Task: `202605171721-K2EP8Y`
Title: Fix website dependency PR lockfile drift
Canonical task record: `.agentplane/tasks/202605171721-K2EP8Y/README.md`

## Summary

Fix website dependency PR lockfile drift

Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed.

## Scope

- In scope: Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed.
- Out of scope: unrelated refactors not required for "Fix website dependency PR lockfile drift".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:26:29.415Z
- Branch: task/202605171721-K2EP8Y/website-dependency-lockfile
- Head: 87a84e0cdbda

```text
 bun.lock              | 8 ++++++--
 website/package.json  | 4 +++-
 website/tsconfig.json | 1 +
 3 files changed, 10 insertions(+), 3 deletions(-)
```

</details>
