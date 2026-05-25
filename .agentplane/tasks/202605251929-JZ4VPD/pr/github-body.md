Task: `202605251929-JZ4VPD`
Title: Optimize branch_pr pr check artifact fallback
Canonical task record: `.agentplane/tasks/202605251929-JZ4VPD/README.md`

## Summary

Optimize branch_pr pr check artifact fallback

Verify and optimize branch_pr pr check behavior when base checkout lacks branch-local task PR artifacts that exist on the task branch and are expected to land after GitHub PR merge.

## Scope

- In scope: Verify and optimize branch_pr pr check behavior when base checkout lacks branch-local task PR artifacts that exist on the task branch and are expected to land after GitHub PR merge.
- Out of scope: unrelated refactors not required for "Optimize branch_pr pr check artifact fallback".

## Verification

- State: ok
- Note:

```text
Verified: pr check now reads branch_pr PR artifacts from a remote-only task branch when the base
checkout lacks the local PR packet, while existing stale-local and invalid-artifact checks remain
strict. Checks: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts
--runInBand; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs;
targeted eslint/prettier on changed files. Full lint:core was attempted but terminated after hanging
on whole-repo ESLint processes.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T19:30:36.177Z
- Branch: task/202605251929-JZ4VPD/optimize-branch-pr-pr-check-artifact-fallback
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ....core.pr-flow.pr-check-remote-artifacts.test.ts | 93 +++++++++++++++++++++
 packages/agentplane/src/commands/pr/check.ts       | 27 +++++-
 .../commands/pr/internal/pr-artifact-snapshot.ts   | 95 +++++++++++++++++++---
 .../src/commands/pr/internal/pr-paths.ts           | 18 +++-
 4 files changed, 213 insertions(+), 20 deletions(-)
```

</details>
