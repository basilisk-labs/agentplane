Task: `202605180515-4CAK13`
Title: Fix open branch_pr feedback issues
Canonical task record: `.agentplane/tasks/202605180515-4CAK13/README.md`

## Summary

Fix open branch_pr feedback issues

Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests.

## Scope

- In scope: Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests.
- Out of scope: unrelated refactors not required for "Fix open branch_pr feedback issues".

## Verification

- State: ok
- Note:

```text
Post-commit verification refresh. Command: bun test
packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts --runInBand; Result: pass;
Evidence: 1 metadata-only task artifact freshness regression passed on branch head after PR
publication. Scope: issue #3854. Command: bun test
packages/agentplane/src/commands/task/start.unit.test.ts
packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand; Result: pass; Evidence:
command exits 0 under Bun with 9 intentional skips instead of runner API crashes. Scope: issue #3845
raw Bun command contract. Prior full verification remains recorded in the same task README for
typecheck, format, hotspot, lint, policy, Vitest unit coverage, and PR validation coverage.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T05:51:51.896Z
- Branch: task/202605180515-4CAK13/fix-open-branch-pr-feedback
- Head: 83713612298d

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 .../cli/run-cli.core.pr-flow.pr-feedback.test.ts   | 128 +++++
 .../src/commands/task/finish.state.unit.test.ts    |  56 ++-
 .../src/commands/task/start.unit.test.ts           |  11 +-
 scripts/release/release-task-evidence.mjs          |   9 +-
 scripts/workflow/prepare-hosted-task-closure.mjs   |   9 +-
 6 files changed, 734 insertions(+), 31 deletions(-)
```

</details>
