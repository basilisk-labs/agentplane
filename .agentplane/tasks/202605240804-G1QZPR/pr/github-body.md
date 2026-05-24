Task: `202605240804-G1QZPR`
Title: Fix branch_pr publication edge cases
Canonical task record: `.agentplane/tasks/202605240804-G1QZPR/README.md`

## Summary

Fix branch_pr publication edge cases

Fix GitHub issues #4123, #4124, and #4125 by hardening GitHub merge fallback id handling, handoff-only task directory scans, and PR artifact amend targeting.

## Scope

- In scope: Fix GitHub issues #4123, #4124, and #4125 by hardening GitHub merge fallback id handling, handoff-only task directory scans, and PR artifact amend targeting.
- Out of scope: unrelated refactors not required for "Fix branch_pr publication edge cases".

## Verification

- State: ok
- Note: Verified: branch_pr publication edge-case fixes and quality-gate fixture refresh pass local routed checks.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-24T08:06:48.364Z
- Branch: task/202605240804-G1QZPR/fix-publication-edge-cases
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../backends/task-backend.local-handoff.test.ts    |  53 +++++++++++
 .../backends/task-backend/local-backend-read.ts    |  26 +++++-
 .../src/cli/run-cli.core.tasks.incidents.test.ts   |  24 +++++
 .../src/commands/pr/integrate/cmd.test.ts          |  88 ++++++++++++++++++
 .../pr/integrate/internal/github-pr-merge.ts       |  58 +++++++-----
 .../src/commands/pr/internal/auto-commit.test.ts   | 102 +++++++++++++++++++++
 .../src/commands/pr/internal/auto-commit.ts        |  49 +++++++++-
 packages/testkit/src/cli-harness.ts                |  16 ++++
 8 files changed, 386 insertions(+), 30 deletions(-)
```

</details>
