# PR Review

Created: 2026-08-05T21:28:48.428Z

## Task

- Task: `202608052127-XWDY4R`
- Title: Keep release diagnostics on the current published target
- Status: DOING
- Branch: `task/202608052127-XWDY4R/keep-release-diagnostics-on-the-current-publishe`
- Canonical task record: `.agentplane/tasks/202608052127-XWDY4R/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-05T21:29:23.465Z
- Branch: task/202608052127-XWDY4R/keep-release-diagnostics-on-the-current-publishe
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-conflict-rework.test.ts    |   3 +-
 .../release-evidence-collect-script.test.ts        | 211 ++++++++++++++
 .../release/release-next-action-script.test.ts     |  95 ++++++-
 scripts/release/evidence-collect.mjs               | 305 +++++++++++++++++++--
 scripts/release/next-action.mjs                    |  95 +++++--
 scripts/release/state.mjs                          |  49 ++++
 6 files changed, 711 insertions(+), 47 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
