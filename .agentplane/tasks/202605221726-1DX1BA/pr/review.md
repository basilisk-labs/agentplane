# PR Review

Created: 2026-05-22T21:26:43.927Z

## Task

- Task: `202605221726-1DX1BA`
- Title: Make flow repair apply safe branch_pr repairs
- Status: DOING
- Branch: `task/202605221726-1DX1BA/flow-repair-safe-apply`
- Canonical task record: `.agentplane/tasks/202605221726-1DX1BA/README.md`

## Verification

- State: ok
- Note: Evaluator check: safe-apply is bounded to deterministic local repairs, JSON output remains machine-readable during nested pr update, and provider merge/approval steps are explicitly skipped.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
