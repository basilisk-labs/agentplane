Task: `202605181835-BQ9T2P`
Title: Apply safe Dependabot root dependency bumps
Canonical task record: `.agentplane/tasks/202605181835-BQ9T2P/README.md`

## Summary

Apply safe Dependabot root dependency bumps

Apply the low-risk root dependency updates from Dependabot PR #3899: @types/node 25.9.0 and @typescript-eslint/eslint-plugin/parser 8.59.4, without taking major/breaking dependency PRs.

## Scope

- In scope: Apply the low-risk root dependency updates from Dependabot PR #3899: @types/node 25.9.0 and @typescript-eslint/eslint-plugin/parser 8.59.4, without taking major/breaking dependency PRs.
- Out of scope: unrelated refactors not required for "Apply safe Dependabot root dependency bumps".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T18:57:06.381Z
- Branch: task/202605181835-BQ9T2P/safe-root-deps
- Head: 07335ebf4291

```text
 .../blueprint/resolved-snapshot.json               | 571 +++++++++++++++++++++
 bun.lock                                           |  68 ++-
 package.json                                       |   6 +-
 3 files changed, 625 insertions(+), 20 deletions(-)
```

</details>
