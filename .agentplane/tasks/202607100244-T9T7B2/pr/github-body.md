Task: `202607100244-T9T7B2`
Title: Prefer merged PR commit when reconciling included batch tasks
Canonical task record: `.agentplane/tasks/202607100244-T9T7B2/README.md`

## Summary

Prefer merged PR commit when reconciling included batch tasks

For v0.6.22, make release task reconciliation close verified included batch tasks after GitHub rebase merges by preferring the primary PR merge_commit over the rewritten-away branch task commit, while preserving the task commit fallback when merged PR metadata is unavailable.

## Scope

- In scope: For v0.6.22, make release task reconciliation close verified included batch tasks after GitHub rebase merges by preferring the primary PR merge_commit over the rewritten-away branch task commit, while preserving the task commit fallback when merged PR metadata is unavailable.
- Out of scope: unrelated refactors not required for "Prefer merged PR commit when reconciling included batch tasks".

## Verification

- State: ok
- Note:

```text
Review fix passed: focused reconciliation 3/3, AgentPlane typecheck, lint:core, ci:contract, and
full fast suite 361 files / 2,144 tests.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T03:00:20.329Z
- Branch: task/202607100244-T9T7B2/prefer-merged-pr-commit-when-reconciling-include
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607092209-F33MNN/README.md    |   1 +
 .agentplane/tasks/202607100106-YP0PYE/README.md    |  11 +-
 .agentplane/tasks/202607100106-YP0PYE/pr/meta.json |   7 +-
 .../run-cli.core.release-tasks-reconcile.test.ts   | 210 +++++++++++++++++++++
 .../commands/release/tasks-reconcile.command.ts    |  11 +-
 5 files changed, 232 insertions(+), 8 deletions(-)
```

</details>
