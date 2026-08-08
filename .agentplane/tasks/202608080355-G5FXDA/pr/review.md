# PR Review

Created: 2026-08-08T03:55:51.970Z

## Task

- Task: `202608080355-G5FXDA`
- Title: Correct stale plan comparison in next-action diagnostics
- Status: DOING
- Branch: `task/202608080355-G5FXDA/correct-stale-plan-comparison-in-next-action-dia`
- Canonical task record: `.agentplane/tasks/202608080355-G5FXDA/README.md`

## Verification

- State: ok
- Note: Evaluator findings are resolved: future plans must provide mutually consistent nextVersion and nextTag, and version ordering now uses precision-safe BigInt components; 15 focused scenarios and the full contract gate pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T04:02:57.138Z
- Branch: task/202608080355-G5FXDA/correct-stale-plan-comparison-in-next-action-dia
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../release/release-next-action-script.test.ts     | 90 ++++++++++++++++++++++
 scripts/release/next-action.mjs                    | 46 ++++++++++-
 2 files changed, 135 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
