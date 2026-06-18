# PR Review

Created: 2026-06-18T19:46:23.792Z

## Task

- Task: `202606181941-HP0WZT`
- Title: Fix close dirty-state regressions
- Status: DOING
- Branch: `task/202606181941-HP0WZT/fix-close-dirty-state-regressions`
- Canonical task record: `.agentplane/tasks/202606181941-HP0WZT/README.md`

## Verification

- State: ok
- Note: Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local-handoff.test.ts. Result: pass. Evidence: 1 test passed; empty task dirs ignored while non-empty missing README still warns. Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts. Result: pass. Evidence: 22 tests passed, including close-commit pre-mutation validation. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: agentplane doctor. Result: pass. Evidence: doctor OK; unrelated warnings remain for old DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing commit hashes.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-18T19:46:23.792Z
- Branch: task/202606181941-HP0WZT/fix-close-dirty-state-regressions
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend.local-handoff.test.ts           |  5 ++++-
 .../src/backends/task-backend/local-backend-read.ts           | 11 ++++++-----
 2 files changed, 10 insertions(+), 6 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
