# PR Review

Created: 2026-06-08T16:28:14.734Z

## Task

- Task: `202606081626-MH14DH`
- Title: Fix direct workflow closeout regressions from GitHub issues
- Status: DOING
- Branch: `task/202606081626-MH14DH/fix-direct-workflow-closeout-regressions-from-gi`
- Canonical task record: `.agentplane/tasks/202606081626-MH14DH/README.md`

## Verification

- State: ok
- Note: Verified: review fix preserves runner startup for approved TODO direct tasks while started direct tasks without runner state route to verify-show.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T16:28:14.734Z
- Branch: task/202606081626-MH14DH/fix-direct-workflow-closeout-regressions-from-gi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.core.lifecycle.finish-close-commit.test.ts |   7 +-
 ...cli.core.route-decision.direct-closeout.test.ts | 104 +++++++++++++++++++++
 .../src/commands/shared/reconcile-check.test.ts    |  18 ++--
 .../commands/shared/route-decision-next-action.ts  |  28 +++++-
 4 files changed, 144 insertions(+), 13 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
