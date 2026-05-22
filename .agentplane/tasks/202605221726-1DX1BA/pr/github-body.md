Task: `202605221726-1DX1BA`
Title: Make flow repair apply safe branch_pr repairs
Canonical task record: `.agentplane/tasks/202605221726-1DX1BA/README.md`

## Summary

Make flow repair apply safe branch_pr repairs

Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated.

## Scope

- In scope: Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated.
- Out of scope: unrelated refactors not required for "Make flow repair apply safe branch_pr repairs".

## Verification

- State: ok
- Note:

```text
Evaluator check: safe-apply is bounded to deterministic local repairs, JSON output remains
machine-readable during nested pr update, and provider merge/approval steps are explicitly skipped.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T21:26:43.927Z
- Branch: task/202605221726-1DX1BA/flow-repair-safe-apply
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.route-decision.test.ts    |  56 +++++++++
 .../agentplane/src/commands/flow/repair.command.ts | 130 +++++++++++++++++++--
 packages/agentplane/src/commands/pr/update.ts      |   3 +-
 3 files changed, 181 insertions(+), 8 deletions(-)
```

</details>
