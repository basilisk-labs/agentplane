# PR Review

Created: 2026-07-10T02:47:15.009Z

## Task

- Task: `202607100244-T9T7B2`
- Title: Prefer merged PR commit when reconciling included batch tasks
- Status: DOING
- Branch: `task/202607100244-T9T7B2/prefer-merged-pr-commit-when-reconciling-include`
- Canonical task record: `.agentplane/tasks/202607100244-T9T7B2/README.md`

## Verification

- State: ok
- Note: Focused reconciliation regression 3/3 passed; AgentPlane typecheck, lint:core, ci:contract, and fast suite 361 files / 2,144 tests all passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T02:47:15.009Z
- Branch: task/202607100244-T9T7B2/prefer-merged-pr-commit-when-reconciling-include
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607092209-F33MNN/README.md    |   1 +
 .agentplane/tasks/202607100106-YP0PYE/README.md    |  11 +-
 .agentplane/tasks/202607100106-YP0PYE/pr/meta.json |   7 +-
 .../run-cli.core.release-tasks-reconcile.test.ts   | 181 +++++++++++++++++++++
 .../commands/release/tasks-reconcile.command.ts    |   4 +-
 5 files changed, 198 insertions(+), 6 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
