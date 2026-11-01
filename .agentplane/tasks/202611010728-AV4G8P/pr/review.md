# PR Review

Created: 2026-11-01T08:22:38.255Z

## Task

- Task: `202611010728-AV4G8P`
- Title: Retire stale writable semantic admissions before legacy quarantine
- Status: DOING
- Branch: `task/202611010728-AV4G8P/retire-stale-writable-semantic-admissions-before`
- Canonical task record: `.agentplane/tasks/202611010728-AV4G8P/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-11-01T08:22:38.255Z
- Branch: task/202611010728-AV4G8P/retire-stale-writable-semantic-admissions-before
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...run-cli.core.stale-admission-retirement.test.ts | 625 +++++++++++++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../task/stale-admission-retirement-evidence.ts    | 212 +++++++
 .../stale-admission-retirement-recovery.test.ts    | 161 ++++++
 .../task/stale-admission-retirement-validation.ts  | 431 ++++++++++++++
 .../task/stale-admission-retirement.command.ts     | 134 +++++
 .../task/stale-admission-retirement.test.ts        | 102 ++++
 .../commands/task/stale-admission-retirement.ts    | 158 ++++++
 9 files changed, 1834 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
